// src/components/ToolCard.jsx

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ToolCard({ tool }) {
  const Icon = tool.icon;

  return (
    <Link
      to={tool.path}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
    >
      {tool.featured && (
        <span className="absolute right-4 top-4 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-700">
          Featured
        </span>
      )}

      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        <Icon size={21} strokeWidth={2} />
      </div>

      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-slate-900">{tool.name}</h3>
      </div>

      <p className="flex-1 text-sm leading-6 text-slate-600">
        {tool.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs font-semibold text-slate-400">
          {tool.category}
        </span>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 transition group-hover:gap-2">
          Open tool
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
