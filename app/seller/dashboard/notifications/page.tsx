const notifications = [
  {
    id: "n1",
    title: "New order received",
    message: "Order #HB-2091 includes 2 items and is ready for processing.",
    time: "5 min ago",
    type: "order",
    unread: true,
  },
  {
    id: "n2",
    title: "Low stock alert",
    message: "Snake Plant is down to 3 units. Consider restocking soon.",
    time: "22 min ago",
    type: "inventory",
    unread: true,
  },
  {
    id: "n3",
    title: "Payout processed",
    message: "Weekly payout of NPR 8,450 has been sent to your account.",
    time: "2 hours ago",
    type: "finance",
    unread: false,
  },
  {
    id: "n4",
    title: "Product approved",
    message: "Your product 'Ceramic Pot Set' is now live in the storefront.",
    time: "Yesterday",
    type: "system",
    unread: false,
  },
];

const badgeClass = (type: string) => {
  if (type === "order") return "bg-[#e7f1ff] text-[#214f95]";
  if (type === "inventory") return "bg-[#fff4e4] text-[#7a5617]";
  if (type === "finance") return "bg-[#e8f8ec] text-[#1f6a35]";
  return "bg-[#f1f2f5] text-[#4d5763]";
};

export default function SellerNotificationsPage() {
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-[#1e3d2c]">Notifications</h2>
        <p className="text-sm text-[#48664f]">
          You have {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}.
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm border border-[#d7e5d8] space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`rounded-lg border p-4 ${
              item.unread ? "border-[#c3dcc7] bg-[#f5fbf6]" : "border-[#e3ece4] bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-[#23412d]">{item.title}</h3>
              <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${badgeClass(item.type)}`}>
                {item.type}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{item.message}</p>
            <div className="mt-2 text-xs text-[#678469]">{item.time}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
