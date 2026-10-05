// src/components/PrivacyBadge.jsx

import { ShieldCheck } from "lucide-react";

export default function PrivacyBadge({
  text = "Your data is processed locally in your browser.",
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-sm text-emerald-800">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
        <ShieldCheck size={17} strokeWidth={2} />
      </div>

      <div className="min-w-0">
        <p className="font-semibold text-emerald-900">
          Privacy-friendly processing
        </p>

        <p className="mt-0.5 leading-5">{text}</p>
      </div>
    </div>
  );
}
