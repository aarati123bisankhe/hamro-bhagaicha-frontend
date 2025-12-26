"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex justify-center items-center min-h-screen p-6"
      style={{
        background: "linear-gradient(135deg, #e3f8e6ff, #686868ff)",
      }}
    >
      <div
        className="flex flex-col md:flex-row w-full max-w-6xl h-[80vh] shadow-xl rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #D8F3DC, #475E4F)",
        }}
      >
        <div className="md:w-1/2 w-full h-1/2 md:h-full">
          <img
            src="/images/image1.png"
            alt="Green plants"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full flex items-center justify-center p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
