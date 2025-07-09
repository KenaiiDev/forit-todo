type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mt-6 max-w-2xl">
      <svg
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" /* ... */
      />
      <input
        placeholder="Search through your universe..."
        className="w-full pl-12 pr-4 py-3 bg-slate-800/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-white placeholder-purple-300 text-lg"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
