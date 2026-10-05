import { Trash2 } from "lucide-react";

export default function ClearButton({
  onClick,
  disabled = false,
  label = "Clear",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-300 disabled:hover:bg-white disabled:hover:text-slate-700"
    >
      <Trash2 size={17} strokeWidth={2} />
      {label}
    </button>
  );
}
