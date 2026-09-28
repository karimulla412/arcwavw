"use client";

import { useState } from "react";
import { User, Plus, Search, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export function UsersPanel({ users, reload }: { users: UserType[]; reload: () => void }) {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);

  const filtered = users.filter((u) => {
    const s = search.toLowerCase();
    return u.name.toLowerCase().includes(s) || u.phone.includes(s) || u.email.toLowerCase().includes(s);
  });

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white2"
          />
        </div>
        <Button onClick={() => setCreating(true)} className="rounded-full bg-teal text-white">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((u) => (
          <div key={u.id} className="rounded-2xl bg-white2 p-5 shadow-sm flex flex-col gap-2">
            <p className="font-semibold text-ink text-lg">{u.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" /> {u.phone}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground break-all">
              <Mail className="h-4 w-4 shrink-0" /> {u.email.includes("@placeholder") ? "No Email" : u.email}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Joined {new Date(u.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-10 text-center text-muted-foreground">
            No users found.
          </div>
        )}
      </div>

      {creating && (
        <CreateUserDialog
          onClose={() => setCreating(false)}
          onDone={() => {
            setCreating(false);
            reload();
          }}
        />
      )}
    </div>
  );
}

function CreateUserDialog({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast({ title: "User created", description: "Default password is arcwave123" });
      onDone();
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white2 text-ink">
        <DialogHeader>
          <DialogTitle>Register Walk-in User</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4 mt-4">
          <div className="space-y-1.5">
            <Label>Name *</Label>
            <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="space-y-1.5">
            <Label>Phone *</Label>
            <Input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          </div>
          <div className="space-y-1.5">
            <Label>Email (Optional)</Label>
            <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="rounded-lg bg-teal/10 p-3 text-xs text-teal mt-2">
            Default password will be set to: <strong className="font-mono">arcwave123</strong>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-teal text-white">Create User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
