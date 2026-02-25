"use client";

import { CalendarClock, Check, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NotificationSidebar from "../components/NotificationSidebar";
import ProfileSidebar from "../components/ProfileSidebar";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../components/useCart";
import { type CareType, useCareSchedule } from "../components/useCareSchedule";

const careTypeLabels: Record<CareType, string> = {
  watering: "Watering",
  fertilizing: "Fertilizing",
  mist: "Mist Spray",
  pruning: "Pruning",
};

const defaultDate = new Date().toISOString().slice(0, 10);

export default function CareSchedulePage() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [plantName, setPlantName] = useState("");
  const [careType, setCareType] = useState<CareType>("watering");
  const [frequencyDays, setFrequencyDays] = useState(3);
  const [nextDueDate, setNextDueDate] = useState(defaultDate);
  const [notes, setNotes] = useState("");

  const { items, addTask, removeTask, completeTask, clearTasks } = useCareSchedule();
  const {
    items: cartItems,
    itemCount,
    subtotal,
    increaseQty,
    decreaseQty,
    removeItem,
  } = useCart();

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate));
  }, [items]);

  const today = new Date().toISOString().slice(0, 10);

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedName = plantName.trim();
    if (!normalizedName) return;

    addTask({
      plantName: normalizedName,
      careType,
      frequencyDays,
      nextDueDate,
      notes: notes.trim() || undefined,
    });

    setPlantName("");
    setCareType("watering");
    setFrequencyDays(3);
    setNextDueDate(defaultDate);
    setNotes("");
  };

  return (
    <>
      <Header
        onProfileClick={() => setProfileOpen(true)}
        onNotificationClick={() => setNotificationOpen(true)}
        onCartClick={() => setCartOpen(true)}
        cartCount={itemCount}
      />

      <main className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-center gap-2 text-sm text-[#5f5f5f]">
            <Link href="/user/dashboard" className="hover:text-[#1f4f2a]">
              Home
            </Link>
            <span>&gt;</span>
            <span className="font-semibold text-[#1f4f2a]">Care Schedule</span>
          </div>

          <h2 className="text-3xl font-semibold text-[#1f4f2a]">Plant Care Schedule</h2>
          <p className="mt-2 text-base text-[#446549]">
            Set reminders for watering, fertilizing, misting, and pruning.
          </p>

          <section className="mt-8 rounded-3xl border border-[#d5ddce] bg-[#edf3e8] p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1f4f2a]">Add New Reminder</h3>
            <form
              onSubmit={handleAddTask}
              className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5"
            >
              <input
                value={plantName}
                onChange={(event) => setPlantName(event.target.value)}
                placeholder="Plant name"
                className="rounded-xl border border-[#c6d4be] bg-white px-3 py-2 text-sm outline-none ring-[#8fb494] focus:ring-2"
                required
              />

              <select
                value={careType}
                onChange={(event) => setCareType(event.target.value as CareType)}
                className="rounded-xl border border-[#c6d4be] bg-white px-3 py-2 text-sm outline-none ring-[#8fb494] focus:ring-2"
              >
                <option value="watering">Watering</option>
                <option value="fertilizing">Fertilizing</option>
                <option value="mist">Mist Spray</option>
                <option value="pruning">Pruning</option>
              </select>

              <input
                type="number"
                min={1}
                value={frequencyDays}
                onChange={(event) => setFrequencyDays(Number(event.target.value))}
                className="rounded-xl border border-[#c6d4be] bg-white px-3 py-2 text-sm outline-none ring-[#8fb494] focus:ring-2"
                placeholder="Frequency (days)"
                required
              />

              <input
                type="date"
                value={nextDueDate}
                onChange={(event) => setNextDueDate(event.target.value)}
                className="rounded-xl border border-[#c6d4be] bg-white px-3 py-2 text-sm outline-none ring-[#8fb494] focus:ring-2"
                required
              />

              <button
                type="submit"
                className="rounded-xl bg-[#2f5d3a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#264a2e]"
              >
                Save Reminder
              </button>
            </form>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Optional notes (eg. use half-strength fertilizer)"
              rows={2}
              className="mt-3 w-full rounded-xl border border-[#c6d4be] bg-white px-3 py-2 text-sm outline-none ring-[#8fb494] focus:ring-2"
            />
          </section>

          <section className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-[#1f4f2a]">Upcoming Tasks</h3>
              {items.length > 0 && (
                <button
                  onClick={clearTasks}
                  className="rounded-xl border border-[#e8c8c8] bg-[#fff2f2] px-4 py-2 text-sm font-semibold text-[#b74841] transition hover:bg-[#ffeaea]"
                >
                  Clear All
                </button>
              )}
            </div>

            {sortedItems.length === 0 ? (
              <div className="mt-4 rounded-3xl border border-dashed border-[#c9d9c4] bg-[#f1f6ee] p-10 text-center">
                <CalendarClock className="mx-auto h-10 w-10 text-[#567a5f]" />
                <h4 className="mt-3 text-xl font-semibold text-[#22462e]">
                  No care reminders yet
                </h4>
                <p className="mt-2 text-sm text-[#5f7d65]">
                  Add your first reminder to stay on top of plant care.
                </p>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {sortedItems.map((item) => {
                  const isDue = item.nextDueDate <= today;

                  return (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-[#d7e2d1] bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5d7c62]">
                            {careTypeLabels[item.careType]}
                          </p>
                          <h4 className="text-lg font-semibold text-[#1f4f2a]">
                            {item.plantName}
                          </h4>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            isDue
                              ? "bg-[#fce9e8] text-[#b74841]"
                              : "bg-[#e7f2e4] text-[#2f5d3a]"
                          }`}
                        >
                          {isDue ? "Due today" : "Upcoming"}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-[#48684e]">
                        Next: {item.nextDueDate} • Every {item.frequencyDays} days
                      </p>
                      {item.notes && (
                        <p className="mt-1 text-xs text-[#628069]">{item.notes}</p>
                      )}

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() => completeTask(item.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#e7f2e4] px-3 py-1.5 text-xs font-semibold text-[#2f5d3a] transition hover:bg-[#d8eacc]"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Mark Done
                        </button>
                        <button
                          onClick={() => removeTask(item.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#fce9e8] px-3 py-1.5 text-xs font-semibold text-[#b74841] transition hover:bg-[#f9dddd]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
      <ProfileSidebar open={profileOpen} onClose={() => setProfileOpen(false)} />
      <NotificationSidebar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
      />
    </>
  );
}
