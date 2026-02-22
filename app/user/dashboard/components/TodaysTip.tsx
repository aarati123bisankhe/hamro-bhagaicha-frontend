import { useEffect, useState } from "react";

export default function TodaysTip() {
  const tips = [
    {
      title: "Humidity Helper",
      description:
        "Group plants together to create a micro-climate with higher humidity, or use a pebble tray with water.",
    },
    {
      title: "Feeding Time",
      description:
        "Feed your plants during their growing season (spring and summer) with a balanced liquid fertilizer every 2–4 weeks.",
    },
    {
      title: "Watering Wisdom",
      description:
        "Most indoor plants prefer to dry out slightly between waterings. Check the top inch of soil before watering.",
    },
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#edf5ea] to-[#dfead8] 
      rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">

      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl ">
          💡
        </div>

        <h4 className="font-semibold text-lg text-[#2f5d3a]">
          Today's Plant Tip
        </h4>
      </div>

      <div
        key={currentTip}
        className="transition-opacity duration-500 ease-in-out"
      >
        <p className="font-semibold text-[#1f3d27]">
          {tips[currentTip].title}
        </p>

        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
          {tips[currentTip].description}
        </p>
      </div>

      <div className="flex gap-2 mt-5">
        {tips.map((_, index) => (
          <span
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentTip === index
                ? "w-6 bg-[#2f5d3a]"
                : "w-2 bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}