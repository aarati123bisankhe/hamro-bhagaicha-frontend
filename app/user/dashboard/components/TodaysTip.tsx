"use client";

import { useEffect, useState } from "react";

const tips = [
  {
    emoji: "💧",
    title: "Watering Wisdom",
    description:
      "Check the top inch of soil before watering. Most indoor plants prefer a light dry-out between waterings.",
    frequency: "Every 2-5 days",
    level: "Beginner",
  },
  {
    emoji: "🌤️",
    title: "Light Balance",
    description:
      "Rotate pots every week so each side receives equal light and the plant grows evenly.",
    frequency: "Weekly",
    level: "Easy",
  },
  {
    emoji: "🌱",
    title: "Feeding Time",
    description:
      "During active growth, use balanced liquid fertilizer in low dose every 2-4 weeks.",
    frequency: "Every 2-4 weeks",
    level: "Intermediate",
  },
];

export default function TodaysTip() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const activeTip = tips[currentTip];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#cfddc8] bg-gradient-to-br from-[#f3f9ee] via-[#e8f3df] to-[#dce9d1] p-6 shadow-md transition hover:shadow-lg">
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#9bc78f]/30 blur-2xl" />
      <div className="pointer-events-none absolute -left-10 bottom-2 h-24 w-24 rounded-full bg-[#c5deb8]/40 blur-xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f7d65]">
            Daily Green Boost
          </p>
          <h4 className="mt-1 text-xl font-bold text-[#21452c]">
            Today&apos;s Plant Tip
          </h4>
        </div>
      </div>

      <div
        key={currentTip}
        className="relative mt-5 rounded-2xl border border-[#d7e6cf] bg-white/85 p-5 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{activeTip.emoji}</span>
          <div>
            <p className="text-lg font-semibold text-[#1f3f28]">{activeTip.title}</p>
            <p className="text-xs font-medium text-[#5e7a62]">{activeTip.level}</p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-7 text-[#2f4f37]">{activeTip.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#e3f0de] px-3 py-1 text-xs font-semibold text-[#31573c]">
            {activeTip.frequency}
          </span>
          <span className="rounded-full bg-[#edf5e8] px-3 py-1 text-xs font-semibold text-[#47654d]">
            Plant Parent Tip
          </span>
        </div>
      </div>

      <div className="relative mt-5 flex items-center">
        <div className="flex gap-2">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTip(index)}
              aria-label={`Show tip ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentTip === index ? "w-8 bg-[#2f5d3a]" : "w-2.5 bg-[#9db8a1]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
