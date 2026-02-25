import Link from "next/link";
import { useSiteContent } from "./contentStore";

export default function Footer() {
  const { content } = useSiteContent();
  const quickLinks = content.footer.quickLinks;

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
              <h4 className="font-bold text-lg">{content.footer.brandName}</h4>
              <p className="text-sm opacity-90">{content.footer.tagline}</p>
            </div>
          </div>

          <p className="text-sm opacity-90 max-w-sm">
            {content.footer.aboutText}
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
            📧 {content.footer.email}
          </p>
          <p className="text-sm opacity-90 flex items-center gap-2 mt-2">
            📞 {content.footer.phone}
          </p>
        </div>
      </div>

      <div className="border-t border-white/30 mt-10 pt-6 flex justify-between text-sm opacity-90">
        <p>{content.footer.copyright}</p>
        
      </div>
    </footer>
  );
}
