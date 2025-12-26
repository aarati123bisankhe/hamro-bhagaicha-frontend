export default function Footer() {
  return (
    <footer className="bg-[#c8d9c5] px-10 py-12 mt-10">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <h4 className="font-bold mb-2">Hamro Bhagaicha 🌿</h4>
          <p className="text-sm text-gray-700">
            Bringing nature closer to you with a curated collection of plants,
            pots, and gardening essentials. Let's grow together!
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="text-sm space-y-2">
            <li>› About Us</li>
            <li>› Plant care guide</li>
            <li>› Delivery Info</li>
            <li>› Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2">Contact with us</h4>
          <p className="text-sm">📧 info@hamrobhaicha.com</p>
          <p className="text-sm">📞 9879876543</p>
        </div>
      </div>

      <div className="text-center text-xs mt-10 text-gray-700">
        © 2025 Hamro Bhagaicha. All rights reserved.
      </div>
    </footer>
  );
}
