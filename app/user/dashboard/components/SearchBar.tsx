export default function SearchBar() {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-3 w-full max-w-3xl bg-[#e3ebdf] px-6 py-3 rounded-full shadow">
        🔍
        <input
          type="text"
          placeholder="Search for plants, plots and combos....."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>
    </div>
  );
}
