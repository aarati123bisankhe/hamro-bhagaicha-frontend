"use client";

import { useAdminUiSettings } from "./useAdminUiSettings";

const stats = [
  { label: "Revenue (Today)", value: "NRP 1,200.10", delta: "+15%", tone: "good" },
  { label: "New Orders", value: "45", delta: "+8%", tone: "good" },
  { label: "Low Stock Alerts", value: "8", delta: "Needs action", tone: "warn" },
  { label: "New Users", value: "20", delta: "+12%", tone: "good" },
] as const;

const recentOrders = [
  { id: "HBZ1234567", customer: "Niya Sharma", amount: "NRP 2,450", status: "Packed", time: "1 min ago" },
  { id: "HBZ1234568", customer: "Rohan Thapa", amount: "NRP 1,280", status: "Confirmed", time: "2 min ago" },
  { id: "HBZ1234569", customer: "Alina Gurung", amount: "NRP 3,790", status: "Shipped", time: "6 min ago" },
] as const;

export default function DashboardCards() {
  const { isDarkMode } = useAdminUiSettings();

  return (
    <div className="space-y-6">
      <section
        className={`relative overflow-hidden rounded-2xl border p-6 md:p-8 ${
          isDarkMode
            ? "border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 via-slate-900 to-slate-950 text-slate-100"
            : "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50 text-slate-900"
        }`}
      >
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`text-sm ${isDarkMode ? "text-emerald-200" : "text-emerald-700"}`}>Admin Overview</p>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">Hamro Bhagaicha Performance Board</h1>
            <p className={`mt-2 max-w-2xl text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Track revenue, incoming orders, and urgent inventory movement in one place.
            </p>
          </div>
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              isDarkMode ? "border-emerald-400/30 bg-emerald-500/10" : "border-emerald-200 bg-emerald-100/70"
            }`}
          >
            <p className={`${isDarkMode ? "text-emerald-200" : "text-emerald-700"}`}>Monthly Growth</p>
            <p className="text-xl font-semibold">+23.4%</p>
          </div>
        </div>
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl ${
            isDarkMode ? "bg-emerald-500/20" : "bg-emerald-300/40"
          }`}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const deltaClass =
            stat.tone === "warn"
              ? isDarkMode
                ? "text-amber-300"
                : "text-amber-700"
              : isDarkMode
                ? "text-emerald-300"
                : "text-emerald-700";

          return (
            <article
              key={stat.label}
              className={`rounded-xl border p-5 shadow-sm ${
                isDarkMode ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{stat.label}</p>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              <p className={`mt-2 text-sm font-medium ${deltaClass}`}>{stat.delta}</p>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div
          className={`rounded-xl border p-5 xl:col-span-2 ${
            isDarkMode ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <button
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                isDarkMode
                  ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className={`flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center md:justify-between ${
                  isDarkMode ? "border-slate-700 bg-slate-950/40" : "border-slate-200 bg-slate-50"
                }`}
              >
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    {order.customer} • {order.amount}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      order.status === "Packed"
                        ? isDarkMode
                          ? "bg-amber-500/20 text-amber-200"
                          : "bg-amber-100 text-amber-700"
                        : order.status === "Confirmed"
                          ? isDarkMode
                            ? "bg-sky-500/20 text-sky-200"
                            : "bg-sky-100 text-sky-700"
                          : isDarkMode
                            ? "bg-emerald-500/20 text-emerald-200"
                            : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{order.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`rounded-xl border p-5 ${
            isDarkMode ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"
          }`}
        >
          <h2 className="text-lg font-semibold">Action Queue</h2>
          <ul className="mt-4 space-y-3">
            <li
              className={`rounded-lg border p-3 text-sm ${
                isDarkMode ? "border-amber-500/20 bg-amber-500/10 text-amber-100" : "border-amber-200 bg-amber-50 text-amber-800"
              }`}
            >
              8 items are below restock threshold.
            </li>
            <li
              className={`rounded-lg border p-3 text-sm ${
                isDarkMode ? "border-sky-500/20 bg-sky-500/10 text-sky-100" : "border-sky-200 bg-sky-50 text-sky-800"
              }`}
            >
              3 refund requests need approval.
            </li>
            <li
              className={`rounded-lg border p-3 text-sm ${
                isDarkMode
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800"
              }`}
            >
              14 new product reviews awaiting moderation.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
