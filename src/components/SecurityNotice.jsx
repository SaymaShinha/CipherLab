import { CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";

export default function SecurityNotice({
  title = "Processed in your browser",
  description = "This tool performs its operation locally in your browser. Your input is not intentionally uploaded to a CipherLab server.",
  compact = false,
}) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/5 px-3 py-2 text-xs text-emerald-300">
        <ShieldCheck size={15} />
        <span>{title}</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4 sm:p-5">
      <div className="flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          <LockKeyhole size={18} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-emerald-300">{title}</h3>

            <CheckCircle2 size={15} className="text-emerald-400" />
          </div>

          <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
