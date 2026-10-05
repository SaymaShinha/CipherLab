// src/components/ToolLayout.jsx

import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "./SEO.jsx";
import SecurityNotice from "./SecurityNotice.jsx";

export default function ToolLayout({
  title,
  description,
  intro,
  children,
  howToUse = [],
  features = [],
  example,
  aboutTitle = "About This Tool",
  aboutContent,
  useCases = [],
  faqItems = [],
  relatedTools = [],
  category = "Security Tool",
  canonical,
  toolLabel = "Interactive Tool",
  localProcessing = true,
}) {
  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />

      <div className="min-h-screen bg-slate-950 text-slate-200">
        {/* Background atmosphere */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/5 blur-3xl" />
          <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_34%),radial-gradient(circle_at_top_left,rgba(6,182,212,0.06),transparent_30%)]" />

          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-white/[0.04] hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to CipherLab
            </Link>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-300">
                  <Sparkles size={12} />
                  {toolLabel}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  <ShieldCheck size={12} />
                  {category}
                </span>

                {localProcessing && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Local processing
                  </span>
                )}
              </div>

              <h1 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
                {description}
              </p>
            </div>
          </div>
        </section>

        {/* Main content */}
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="space-y-8">
            {/* Intro */}
            {intro && (
              <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-cyan-400" />

                  <h2 className="text-lg font-bold text-white">
                    About This Tool
                  </h2>
                </div>

                <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-p:leading-8 prose-strong:text-white prose-code:text-cyan-300">
                  {intro}
                </div>
              </section>
            )}

            {/* Security notice */}
            <SecurityNotice />

            {/* Interactive tool */}
            <section className="overflow-hidden rounded-2xl border border-indigo-400/15 bg-[#0D111C] shadow-2xl shadow-black/20">
              {/* Tool header */}
              <div className="relative border-b border-white/10 bg-gradient-to-r from-indigo-500/[0.07] via-transparent to-cyan-500/[0.05] px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 ring-1 ring-indigo-400/15">
                      <ShieldCheck size={18} className="text-indigo-300" />
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-400">
                        Interactive Workspace
                      </div>

                      <h2 className="mt-1 text-base font-bold text-white">
                        {title}
                      </h2>
                    </div>
                  </div>

                  {localProcessing && (
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Processed locally
                    </div>
                  )}
                </div>
              </div>

              {/* Tool content */}
              <div className="p-5 sm:p-6">{children}</div>
            </section>

            {/* How to use */}
            {howToUse.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
                <SectionHeading
                  number="01"
                  title="How to Use"
                  description="Follow these steps to get the most from the tool."
                />

                <div className="mt-6 space-y-3">
                  {howToUse.map((step, index) => (
                    <div
                      key={`${index}-${step}`}
                      className="group flex gap-4 rounded-xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-indigo-400/15 hover:bg-slate-950"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 font-mono text-xs font-bold text-indigo-300 ring-1 ring-indigo-400/10">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="pt-1 text-sm leading-6 text-slate-300">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Features */}
            {features.length > 0 && (
              <section>
                <SectionHeading
                  number="02"
                  title="Features"
                  description="What this tool provides."
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {features.map((feature, index) => (
                    <div
                      key={feature.title}
                      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-indigo-400/15 hover:bg-indigo-500/[0.025]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/[0.07] text-xs font-bold text-cyan-300">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <ArrowUpRight
                          size={15}
                          className="text-slate-700 transition group-hover:text-indigo-400"
                        />
                      </div>

                      <h3 className="mt-4 text-sm font-bold text-white">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Example */}
            {example && (
              <section>
                <SectionHeading
                  number="03"
                  title="Example"
                  description="A simple example showing what the operation looks like."
                />

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0D111C] shadow-xl shadow-black/10">
                  {example}
                </div>
              </section>
            )}

            {/* About */}
            {aboutContent && (
              <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
                <SectionHeading
                  number="04"
                  title={aboutTitle}
                  description="Understand the underlying concept and why it matters."
                />

                <div className="prose prose-invert mt-6 max-w-none prose-p:text-slate-300 prose-p:leading-8 prose-li:text-slate-300 prose-strong:text-white prose-code:text-cyan-300">
                  {aboutContent}
                </div>
              </section>
            )}

            {/* Use cases */}
            {useCases.length > 0 && (
              <section>
                <SectionHeading
                  number="05"
                  title="Common Use Cases"
                  description="Practical situations where this tool or concept can be useful."
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {useCases.map((item, index) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                    >
                      <div className="font-mono text-[10px] font-bold tracking-wider text-indigo-400">
                        USE CASE {String(index + 1).padStart(2, "0")}
                      </div>

                      <h3 className="mt-3 text-sm font-bold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {faqItems.length > 0 && (
              <section>
                <SectionHeading
                  number="06"
                  title="Frequently Asked Questions"
                  description="Quick answers to common questions about this tool."
                />

                <div className="mt-6 space-y-3">
                  {faqItems.map((item, index) => (
                    <details
                      key={item.question || index}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-sm font-semibold text-white transition hover:bg-white/[0.025]">
                        <span>{item.question}</span>

                        <ChevronDown
                          size={17}
                          className="shrink-0 text-slate-500 transition duration-200 group-open:rotate-180 group-open:text-indigo-400"
                        />
                      </summary>

                      <div className="border-t border-white/10 bg-slate-950/30 px-5 py-5 text-sm leading-7 text-slate-400">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Related tools */}
            {relatedTools.length > 0 && (
              <section>
                <SectionHeading
                  number="07"
                  title="Related Tools"
                  description="Continue exploring related cryptography and security utilities."
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-indigo-400/20 hover:bg-indigo-500/[0.04]"
                    >
                      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-indigo-500/5 blur-2xl transition group-hover:bg-indigo-500/10" />

                      <div className="relative">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm font-bold text-white">
                            {tool.name}
                          </h3>

                          <ExternalLink
                            size={14}
                            className="shrink-0 text-slate-600 transition group-hover:text-indigo-400"
                          />
                        </div>

                        <p className="mt-3 text-xs leading-5 text-slate-500">
                          {tool.description}
                        </p>

                        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                          Explore tool
                          <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom navigation */}
            <div className="border-t border-white/10 pt-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-white"
              >
                <ArrowLeft size={15} />
                Explore more CipherLab tools
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function SectionHeading({ number, title, description }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-indigo-400">
          {number}
        </span>

        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          {title}
        </h2>
      </div>

      {description && (
        <p className="mt-2 pl-8 text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}
