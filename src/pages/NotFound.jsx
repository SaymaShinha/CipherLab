import {
  ArrowLeft,
  BookOpen,
  Home,
  Search,
  SearchX,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../components/SEO.jsx";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | CipherLab"
        description="The page you requested could not be found. Return to CipherLab or explore cryptography and security tools."
        canonical="/404"
        noIndex
      />

      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 text-slate-200">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />

          <div className="absolute right-1/4 top-1/3 h-56 w-56 rounded-full bg-emerald-500/5 blur-3xl" />
        </div>

        <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl text-center">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-400 shadow-lg shadow-indigo-950/20">
              <SearchX size={30} strokeWidth={1.8} />
            </div>

            {/* Error code */}
            <div className="mt-7 bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-8xl font-black tracking-tighter text-transparent sm:text-9xl">
              404
            </div>

            {/* Heading */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Page not found
            </h1>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-300">
              We couldn't find the page you're looking for. It may have been
              moved, removed, or the address may have been entered incorrectly.
            </p>

            {/* Main actions */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <Home size={17} />
                Back to Home
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3.5 text-sm font-bold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              >
                <ArrowLeft size={17} />
                Go Back
              </button>
            </div>

            {/* Helpful navigation */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                You may want to explore
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <QuickLink
                  to="/tools/encryption/aes-256-gcm"
                  icon={<Wrench size={18} />}
                  title="Security Tools"
                  description="Explore practical tools"
                />

                <QuickLink
                  to="/learn/cryptography-basics"
                  icon={<BookOpen size={18} />}
                  title="Learn Cryptography"
                  description="Build your knowledge"
                />

                <QuickLink
                  to="/tools/security/password-generator"
                  icon={<ShieldCheck size={18} />}
                  title="Security Utilities"
                  description="Useful security tools"
                />
              </div>
            </div>

            {/* Search-style hint */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Search size={15} />
              <span>
                Check the URL or use the navigation above to continue.
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* =========================================================
   Quick Navigation Card
========================================================= */

function QuickLink({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left transition hover:border-indigo-400/20 hover:bg-white/[0.05]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400 transition group-hover:bg-indigo-400/15">
        {icon}
      </div>

      <h2 className="mt-3 text-sm font-semibold text-white">{title}</h2>

      <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
    </Link>
  );
}
