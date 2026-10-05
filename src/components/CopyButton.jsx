import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ text = "", label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      {copied ? (
        <>
          <Check size={15} />
          Copied
        </>
      ) : (
        <>
          <Copy size={15} />
          {label}
        </>
      )}
    </button>
  );
}
