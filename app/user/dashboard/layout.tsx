export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f9f7f2] text-[#1c1c1c]">
      {children}
    </div>
  );
}

