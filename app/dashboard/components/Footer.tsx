import { Instagram } from "lucide-react";

export default function Footer() {
  return (
//     <footer className="bg-[#c8d9c5] px-10 py-12 mt-10">
//       <div className="grid md:grid-cols-3 gap-10">
//         <div>
//           <h4 className="font-bold mb-2">Hamro Bhagaicha 🌿</h4>
//           <p className="text-sm text-gray-700">
//             Bringing nature closer to you with a curated collection of plants,
//             pots, and gardening essentials. Let's grow together!
//           </p>
//         </div>

//         <div>
//           <h4 className="font-bold mb-2">Quick Links</h4>
//           <ul className="text-sm space-y-2">
//             <li>› About Us</li>
//             <li>› Plant care guide</li>
//             <li>› Delivery Info</li>
//             <li>› Contact</li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="font-bold mb-2">Contact with us</h4>
//           <p className="text-sm">📧 info@hamrobhaicha.com</p>
//           <p className="text-sm">📞 9879876543</p>
//         </div>
//       </div>

//       <div className=" text-xs mt-10 text-gray-700">
//         © 2025 Hamro Bhagaicha. All rights reserved.
//       </div>
//     </footer>
//   );
// }

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
            pots, and gardening essentials. Let's grow together!
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="text-sm space-y-3 opacity-90">
            <li>› About Us</li>
            <li>› Plant Care Guide</li>
            <li>› Delivery Info</li>
            <li>› Contact</li>
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
