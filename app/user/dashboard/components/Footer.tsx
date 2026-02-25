import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { label: "About Us", href: "/user/dashboard/about-us" },
    { label: "Plant Care Guide", href: "/user/dashboard/plant-care-guide" },
    { label: "Delivery Info", href: "/user/dashboard/delivery-info" },
    { label: "Contact Us", href: "/user/dashboard/contact-us" },
  ];

  return (
<footer className="bg-[#7fb195] px-10 py-14 mt-10 text-white">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            
            <img
              src="/images/logo.png" 
              alt="Hamro Bhagaicha Logo"
              className="w-10 h-10 rounded-full bg-white p-1"
            />
            <div>
              <h4 className="font-bold text-lg">Hamro Bhagaicha</h4>
              <p className="text-sm opacity-90">Your Green Paradise</p>
            </div>
          </div>

          <p className="text-sm opacity-90 max-w-sm">
            Bringing nature closer to you with a curated collection of plants,
            pots, and gardening essentials. Let&apos;s grow together!
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="text-sm space-y-3 opacity-90">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-[#e9f8e4] hover:underline"
                >
                  › {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Connect With Us</h4>

          <p className="text-sm opacity-90 flex items-center gap-2">
            📧 info@hamrobhagaicha.com
          </p>
          <p className="text-sm opacity-90 flex items-center gap-2 mt-2">
            📞 +977 981-2345678
          </p>
        </div>
      </div>

      <div className="border-t border-white/30 mt-10 pt-6 flex justify-between text-sm opacity-90">
        <p>© 2025 Hamro Bhagaicha. All rights reserved.</p>
        
      </div>
    </footer>
  );
}
