export default function TodaysTip() {
  return (
    <div className="bg-[#e3ebdf] rounded-2xl p-6 shadow flex items-start gap-4">
      <div className="text-3xl">💡</div>
      <div>
        <h4 className="font-semibold text-[#2f5d3a]">Today's Tip</h4>
        <p className="font-medium text-sm">Humidity Helper</p>
        <p className="text-sm text-gray-700 mt-1">
          Group plants together to create a micro-climate with higher humidity,
          or use a pebble tray with water.
        </p>
      </div>
    </div>
  );
}
