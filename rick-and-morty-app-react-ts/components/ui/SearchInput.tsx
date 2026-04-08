"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar personaje...",
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-md">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-4 py-2.5 rounded-xl
          bg-zinc-900 border border-zinc-700
          text-zinc-100 placeholder-zinc-500
          focus:outline-none focus:border-green-500
          focus:ring-1 focus:ring-green-500
          transition-colors text-sm
        "
      />
    </div>
  );
}