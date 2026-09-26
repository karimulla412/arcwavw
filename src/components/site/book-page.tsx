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
            {booking ? "Booking…" : "Confirm & Reserve"}
            {!booking && <ArrowUpRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1400px] bg-paper relative pb-20">
      {/* Trial-used banner — shown when user already used their free trial and has no active membership */}
      {hasUsedTrial && !membership && (
        <div className="mx-5 mt-4 rounded-2xl bg-lime p-4 text-ink">
          <p className="text-sm font-medium">
            You&apos;ve used your free trial. Get a membership to continue booking.
          </p>
          <a
            href="/plans"
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal underline"
          >
            View plans <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

      {/* Top Header */}
      <div className="flex items-center justify-between p-5 pb-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">YOUR WEEK</p>
          <p className="mt-1 text-lg font-bold text-ink">{selectedDayLabel}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white2 shadow-sm hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5 text-ink" />
          </button>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white2 shadow-sm hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5 text-ink" />
          </button>
        </div>
      </div>

      {/* Week Date Selector */}
      <div className="flex gap-3 px-5 pb-4">
        {weekDays.map((d) => {
          const iso = toISO(d);
          const isSelected = iso === selectedDate;
          const isToday = toISO(new Date()) === iso;
          const sessionCount = getSessionCount(iso);
          const dow = d.getDay();

          return (
            <button
              key={iso}
              onClick={() => setSelectedDate(iso)}
              className={`flex flex-1 flex-col items-center rounded-2xl p-3 shadow-sm transition-all cursor-pointer ${
                isSelected
                  ? "bg-ink text-white"
                  : "bg-white2 text-ink hover:bg-paper"
              }`}
            >
              <p className={`text-xs font-medium uppercase tracking-wider ${isSelected ? "text-white/70" : "text-muted-foreground"}`}>
                {isToday ? "TODAY" : DAY_SHORT[dow]}
              </p>
              <p className="mt-1 text-2xl font-bold">{d.getDate()}</p>
              <p className={`mt-0.5 text-[10px] ${isSelected ? "text-white/60" : "text-muted-foreground"}`}>
                {sessionCount > 0 ? `${sessionCount} sessions` : "Quiet"}
              </p>
            </button>
          );
        })}
      </div>

      {/* Status badge */}
      {user && membership && (
        <div className="px-5 pb-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1.5 text-xs font-medium text-teal">
            <Check className="h-3.5 w-3.5" />
            Active member · {remainingCredits} credits remaining
          </div>
        </div>
      )}

      {/* Group / Private toggle */}
      <div className="px-5 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setSessionFilter("group")}
            className={`flex-1 rounded-2xl p-3 text-center transition-all cursor-pointer ${
              sessionFilter === "group"
                ? "bg-ink text-white"
                : "bg-white2 text-ink hover:bg-paper"
            }`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wider ${sessionFilter === "group" ? "text-white/70" : "text-muted-foreground"}`}>Group</p>
            <p className={`mt-1 text-sm font-medium ${sessionFilter === "group" ? "text-white" : "text-ink"}`}>Up to 4 members</p>
          </button>
          <button
            onClick={() => setSessionFilter("private")}
            className={`flex-1 rounded-2xl p-3 text-center transition-all cursor-pointer ${
              sessionFilter === "private"
                ? "bg-ink text-white"
                : "bg-white2 text-ink hover:bg-paper"
            }`}
          >
            <p className={`text-xs font-semibold uppercase tracking-wider ${sessionFilter === "private" ? "text-white/70" : "text-muted-foreground"}`}>Private</p>
            <p className={`mt-1 text-sm font-medium ${sessionFilter === "private" ? "text-white" : "text-ink"}`}>1-on-1 session</p>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loadingSlots ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal" />
          <p className="mt-3 text-sm text-muted-foreground">Loading sessions…</p>
        </div>
      ) : availableSlots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
          <CalendarDays className="h-12 w-12 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No classes scheduled for this day.</p>
          <p className="text-xs text-muted-foreground">Try selecting another date.</p>
        </div>
      ) : (
        <div className="px-5">
          {/* Morning sessions */}
          {morningSlots.length > 0 && (
            <>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">MORNING</p>
              <div className="grid gap-3 md:grid-cols-2">
                {morningSlots.map((s) => (
                  <SessionCard
                    key={s.id}
                    slot={s}
                    isMember={!!(user && membership)}
                    onSelect={() => { setPickedSlot(s); setShowConfirm(true); }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Afternoon sessions */}
          {afternoonSlots.length > 0 && (
            <>
              <p className="mb-3 mt-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">AFTERNOON</p>
              <div className="grid gap-3 md:grid-cols-2">
                {afternoonSlots.map((s) => (
                  <SessionCard
                    key={s.id}
                    slot={s}
                    isMember={!!(user && membership)}
                    onSelect={() => { setPickedSlot(s); setShowConfirm(true); }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Evening sessions */}
          {eveningSlots.length > 0 && (
            <>
              <p className="mb-3 mt-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">EVENING</p>
              <div className="grid gap-3 md:grid-cols-2">
                {eveningSlots.map((s) => (
                  <SessionCard
                    key={s.id}
                    slot={s}
                    isMember={!!(user && membership)}
                    onSelect={() => { setPickedSlot(s); setShowConfirm(true); }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[1400px] -translate-x-1/2 border-t border-line bg-white2">
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
          <p className="mt-0.5 text-sm font-medium text-ink">{slot.booked} of {slot.capacity} booked</p>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${isFull ? "bg-destructive" : "bg-teal"}`}
              style={{ width: progressWidth }}
            />
          </div>
        </div>
        {!isFull && (
          <button
            onClick={onSelect}
            className="ml-4 flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-ink px-5 text-xs font-semibold text-white hover:opacity-90"
          >
            Reserve
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
