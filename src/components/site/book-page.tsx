"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Home,
  CalendarDays,
  CalendarCheck,
  CreditCard,
  User,
  Check,
  ArrowLeft,
  Mail,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

const DAY_SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface Slot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string | null;
  className: string;
  capacity: number;
  sessionType: string;
}

interface AvailableSlot extends Slot {
  booked: number;
  remaining: number;
  slotLabel: string;
}

function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hr = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hr}:${m.toString().padStart(2, "0")} ${period}`;
}

function getTimeOfDay(time: string): "morning" | "afternoon" | "evening" {
  const h = parseInt(time.split(":")[0]);
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}

function toISO(d: Date): string {
  const c = new Date(d);
  c.setMinutes(c.getMinutes() - c.getTimezoneOffset());
  return c.toISOString().slice(0, 10);
}

export function BookPage({
  slots,
  user,
  membership,
  hasUsedTrial = false,
}: {
  slots: Slot[];
  user: { id: string; name: string; email: string; phone: string } | null;
  membership: { id: string; planName: string; totalClasses: number; usedClasses: number; bonusClasses: number; classesPerWeek: number; status: string } | null;
  hasUsedTrial?: boolean;
}) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(toISO(new Date()));
  const [weekOffset, setWeekOffset] = useState(0);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [pickedSlot, setPickedSlot] = useState<AvailableSlot | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [guestInfo, setGuestInfo] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });
  const [sessionFilter, setSessionFilter] = useState<"group" | "private">("group");

  const remainingCredits = membership
    ? Math.max(0, membership.totalClasses + membership.bonusClasses - membership.usedClasses)
    : 0;

  // Generate 4 days from the week offset
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + weekOffset * 4);
  const weekDays = Array.from({ length: 4 }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  const selectedDateObj = new Date(selectedDate + "T00:00:00");
  const selectedDayLabel = selectedDateObj.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" });

  // Fetch slots when date changes
  useEffect(() => {
    if (!selectedDate) return;
    let cancelled = false;
    setLoadingSlots(true);
    (async () => {
      try {
        const res = await fetch(`/api/slots/available?date=${selectedDate}`);
        const data = await res.json();
        if (!cancelled) setAvailableSlots(data.slots || []);
      } catch {
        if (!cancelled) toast({ title: "Failed to load slots", variant: "destructive" });
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    })();
    return () => { cancelled = true; };
  }, [selectedDate, toast]);

  // Count sessions for a given date
  function getSessionCount(dateISO: string): number {
    const d = new Date(dateISO + "T00:00:00");
    const dow = d.getDay();
    return slots.filter((s) => s.dayOfWeek === dow).length;
  }

  // Group slots by time of day AND by session type
  const filteredSlots = availableSlots.filter((s) => s.sessionType === sessionFilter);
  const morningSlots = filteredSlots.filter((s) => getTimeOfDay(s.startTime) === "morning");
  const afternoonSlots = filteredSlots.filter((s) => getTimeOfDay(s.startTime) === "afternoon");
  const eveningSlots = filteredSlots.filter((s) => getTimeOfDay(s.startTime) === "evening");

  async function handleBook() {
    if (!pickedSlot) return;
    if (!user) {
      if (!guestInfo.name || !guestInfo.phone || !guestInfo.email) {
        toast({ title: "Please fill all fields", variant: "destructive" });
        return;
      }
    }
    setBooking(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "daily",
          name: user?.name || guestInfo.name,
          phone: user?.phone || guestInfo.phone,
          email: user?.email || guestInfo.email,
          userId: user?.id || null,
          membershipId: membership?.id || null,
          date: selectedDate,
          slotId: pickedSlot.id,
          slotLabel: pickedSlot.slotLabel,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setBookingSuccess(true);
      toast({ title: "Session booked!", description: pickedSlot.slotLabel });
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setBooking(false);
    }
  }

  // Success screen
  if (bookingSuccess && pickedSlot) {
    return (
      <div className="mx-auto min-h-screen max-w-[1400px] bg-paper">
        <div className="flex min-h-screen flex-col items-center justify-center p-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-ink">You&apos;re booked in!</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {pickedSlot.className} · {selectedDayLabel} · {formatTime(pickedSlot.startTime)}
          </p>
          <div className="mt-8 flex flex-col gap-3 w-full">
            <a href="/account" className="flex h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-white hover:opacity-90">
              Go to dashboard
            </a>
            <button onClick={() => { setBookingSuccess(false); setPickedSlot(null); setShowConfirm(false); }} className="flex h-12 w-full items-center justify-center rounded-full border border-line bg-white2 text-sm font-semibold text-ink hover:bg-paper">
              Book another session
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Confirm dialog
  if (showConfirm && pickedSlot) {
    return (
      <div className="mx-auto min-h-screen max-w-[1400px] bg-paper">
        <div className="p-5">
          <button onClick={() => setShowConfirm(false)} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="mt-6 rounded-2xl bg-white2 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal">
                <CalendarDays className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-ink">{pickedSlot.className}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedDayLabel} · {formatTime(pickedSlot.startTime)}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="text-xs font-medium text-muted-foreground">Payment</span>
              <span className="text-sm font-semibold text-teal">
                {user && membership ? "1 credit · Included" : "Pay at studio"}
              </span>
            </div>
          </div>

          {!user && (
            <div className="mt-6 space-y-4 rounded-2xl bg-white2 p-5 shadow-sm">
              <p className="text-sm font-semibold text-ink">Your details</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Name</Label>
                  <Input
                    className="rounded-xl border-line bg-paper text-ink focus-visible:border-teal"
                    value={guestInfo.name}
                    onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Phone</Label>
                  <Input
                    className="rounded-xl border-line bg-paper text-ink focus-visible:border-teal"
                    value={guestInfo.phone}
                    onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Email</Label>
                  <Input
                    type="email"
                    className="rounded-xl border-line bg-paper text-ink focus-visible:border-teal"
                    value={guestInfo.email}
                    onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleBook}
            disabled={booking}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {booking ? "Booking…" : (membership ? "Confirm Booking" : "Confirm Free Trial")}
            {!booking && <ArrowUpRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1400px] bg-paper relative pb-24 md:pb-12">
      {/* Trial-used banner */}
      {hasUsedTrial && !membership && (
        <div className="mx-5 mt-6 rounded-xl bg-lime p-4 text-ink md:mx-10">
          <p className="text-sm font-medium">
            You&apos;ve used your free trial. Get a membership to continue booking.
          </p>
          <a href="/plans" className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline">
            View plans <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

      {/* Main Professional Layout */}
      <div className="flex flex-col gap-8 p-5 md:p-10 lg:flex-row lg:items-start lg:gap-12">
        
        {/* Left Column: Calendar & Filters */}
        <div className="w-full shrink-0 lg:sticky lg:top-8 lg:w-[360px] space-y-6">
          <div className="rounded-2xl bg-white2 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-ink mb-4">Select Date</h2>
            <Calendar
              mode="single"
              selected={new Date(selectedDate + "T00:00:00")}
              onSelect={(date) => {
                if (date) setSelectedDate(toISO(date));
              }}
              className="mx-auto"
            />
          </div>

          <div className="rounded-2xl bg-white2 p-5 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-ink">Session Type</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSessionFilter("group")}
                className={`flex-1 rounded-xl p-3 text-center transition-all cursor-pointer ${
                  sessionFilter === "group"
                    ? "bg-ink text-white shadow-md"
                    : "bg-paper text-ink hover:bg-muted"
                }`}
              >
                <p className="text-sm font-bold uppercase tracking-wider">Group</p>
                <p className="mt-0.5 text-xs opacity-70">Up to 4 members</p>
              </button>
              <button
                onClick={() => setSessionFilter("private")}
                className={`flex-1 rounded-xl p-3 text-center transition-all cursor-pointer ${
                  sessionFilter === "private"
                    ? "bg-ink text-white shadow-md"
                    : "bg-paper text-ink hover:bg-muted"
                }`}
              >
                <p className="text-sm font-bold uppercase tracking-wider">Private</p>
                <p className="mt-0.5 text-xs opacity-70">1-on-1 session</p>
              </button>
            </div>
          </div>

          {user && membership && (
            <div className="rounded-2xl bg-teal/10 p-5 text-teal border border-teal/20">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <p className="font-semibold text-lg">Active Member</p>
              </div>
              <p className="mt-1 text-sm">{remainingCredits} credits remaining</p>
            </div>
          )}
        </div>

        {/* Right Column: Sessions Schedule */}
        <div className="flex-1 space-y-8">
          <div className="flex items-end justify-between border-b border-line pb-4">
            <div>
              <h1 className="text-3xl font-bold text-ink">{selectedDayLabel}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {availableSlots.length > 0 ? `Showing ${filteredSlots.length} available sessions` : "Checking schedule..."}
              </p>
            </div>
          </div>

          {loadingSlots ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal" />
              <p className="mt-3 text-sm text-muted-foreground">Loading sessions…</p>
            </div>
          ) : filteredSlots.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line py-24 text-center">
              <CalendarDays className="h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-4 text-lg font-medium text-ink">No {sessionFilter} sessions</p>
              <p className="mt-1 text-sm text-muted-foreground">Try selecting a different date or session type.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {morningSlots.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Morning</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {morningSlots.map((s) => (
                      <SessionCard key={s.id} slot={s} isMember={!!(user && membership)} onSelect={() => { setPickedSlot(s); setShowConfirm(true); }} />
                    ))}
                  </div>
                </div>
              )}
              {afternoonSlots.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Afternoon</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {afternoonSlots.map((s) => (
                      <SessionCard key={s.id} slot={s} isMember={!!(user && membership)} onSelect={() => { setPickedSlot(s); setShowConfirm(true); }} />
                    ))}
                  </div>
                </div>
              )}
              {eveningSlots.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Evening</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {eveningSlots.map((s) => (
                      <SessionCard key={s.id} slot={s} isMember={!!(user && membership)} onSelect={() => { setPickedSlot(s); setShowConfirm(true); }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar (Mobile only) */}
      <div className="md:hidden fixed bottom-0 left-1/2 z-40 w-full max-w-[1400px] -translate-x-1/2 border-t border-line bg-white2">
        <div className="flex items-center justify-around px-2 py-2">
          <NavItem icon={Home} label="Home" href="/" />
          <NavItem icon={CalendarDays} label="Sessions" href="/book" active />
          <NavItem icon={CalendarCheck} label="Bookings" href="/account" />
          <NavItem icon={CreditCard} label="Membership" href="/plans" />
          <NavItem icon={User} label="Profile" href="/account/profile" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Session Card Component ---------- */
function SessionCard({
  slot,
  isMember,
  onSelect,
}: {
  slot: AvailableSlot;
  isMember: boolean;
  onSelect: () => void;
}) {
  const isFull = slot.remaining <= 0;
  const isAlmostFull = slot.remaining <= 1 && !isFull;
  const progressPct = Math.min(100, Math.round((slot.booked / slot.capacity) * 100));
  const progressWidth = `${Math.max(8, (slot.booked / slot.capacity) * 100)}%`;

  // Calculate duration
  let duration = "50 min";
  if (slot.endTime) {
    const [sh, sm] = slot.startTime.split(":").map(Number);
    const [eh, em] = slot.endTime.split(":").map(Number);
    const mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins > 0) duration = `${mins} min`;
  }

  return (
    <div className="rounded-2xl bg-white2 p-5 shadow-sm">
      {/* Top row: time + duration */}
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-ink">{formatTime(slot.startTime)}</p>
        <p className="text-sm text-muted-foreground">{duration}</p>
      </div>

      {/* Tags */}
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-full bg-teal px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          {slot.sessionType === "private" ? "PRIVATE" : "GROUP"}
        </span>
        {isAlmostFull && (
          <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            ALMOST FULL
          </span>
        )}
        {isFull && (
          <span className="rounded-full bg-destructive/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-destructive">
            FULL
          </span>
        )}
      </div>

      {/* Bottom section */}
      <div className="mt-4 flex items-end justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{isMember ? "1 credit" : "Pay at studio"}</p>
          <p className="mt-0.5 text-sm font-medium text-ink">{slot.capacity - slot.booked} spots left</p>
        </div>
        {!isFull && (
          <button
            onClick={onSelect}
            className="ml-4 flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-ink px-5 text-xs font-semibold text-white hover:opacity-90"
          >
            {!isMember ? "Book Free Trial" : "Book"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Bottom Nav Item ---------- */
function NavItem({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: any;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <a href={href} className={`flex cursor-pointer flex-col items-center gap-1 px-3 py-1.5 ${
      active ? "rounded-full bg-ink" : ""
    }`}>
      <Icon className={`h-5 w-5 ${active ? "text-white" : "text-muted-foreground"}`} />
      <span className={`text-[10px] font-medium ${active ? "text-white" : "text-muted-foreground"}`}>
        {label}
      </span>
    </a>
  );
}
