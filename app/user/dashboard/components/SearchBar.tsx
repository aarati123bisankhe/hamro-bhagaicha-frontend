interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}

export default function SearchBar({
  value = "",
  onChange,
  placeholder = "Search for plants, plots and combos.....",
  onSubmit,
}: SearchBarProps) {
  return (
    <div className="flex justify-center">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.();
        }}
        className="w-full max-w-3xl"
      >
        <div className="flex items-center gap-3 rounded-full bg-[#e3ebdf] px-6 py-3 shadow">
          <button type="submit">🔍</button>
          <input
            type="text"
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </form>
    </div>
  );
}
