import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
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

      <div className="min-h-screen">
        {localProcessing && (
          <div className="hidden rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1 text-[10px] font-medium text-emerald-400 sm:block">
            Local processing
          </div>
        )}
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.13),transparent_35%)]" />

          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <Link
              to="/"
              className="mb-7 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to CipherLab
            </Link>

            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-400">
                {toolLabel}
              </div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/10 bg-indigo-400/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-300">
                <ShieldCheck size={13} />
                {category}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                {description}
              </p>
            </div>
          </div>
        </section>

        {/* Main */}
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="space-y-8">
            {/* Intro */}
            {intro && (
              <section className="prose prose-invert max-w-none prose-p:text-slate-400 prose-p:leading-7">
                {intro}
              </section>
            )}

            {/* Security notice */}
            <SecurityNotice />

            {/* Tool */}
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D111C] shadow-2xl shadow-black/20">
              <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-400">
                      Interactive Tool
                    </div>

                    <h2 className="mt-1 text-base font-semibold text-white">
                      {title}
                    </h2>
                  </div>

                  <div className="hidden rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1 text-[10px] font-medium text-emerald-400 sm:block">
                    Local processing
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">{children}</div>
            </section>

            {/* How to use */}
            {howToUse.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                <SectionHeading number="01" title="How to Use" />

                <ol className="mt-5 space-y-3">
                  {howToUse.map((step, index) => (
                    <li key={`${index}-${step}`} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-semibold text-indigo-400">
                        {index + 1}
                      </span>

                      <span className="pt-1 text-sm leading-6 text-slate-400">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Features */}
            {features.length > 0 && (
              <section>
                <SectionHeading number="02" title="Features" />

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                    >
                      <h3 className="text-sm font-semibold text-white">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
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
                <SectionHeading number="03" title="Example" />

                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0D111C]">
                  {example}
                </div>
              </section>
            )}

            {/* About */}
            {aboutContent && (
              <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
                <SectionHeading number="04" title={aboutTitle} />

                <div className="prose prose-invert mt-5 max-w-none prose-p:text-slate-400 prose-p:leading-7 prose-li:text-slate-400">
                  {aboutContent}
                </div>
              </section>
            )}

            {/* Use cases */}
            {useCases.length > 0 && (
              <section>
                <SectionHeading number="05" title="Common Use Cases" />

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {useCases.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                    >
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
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
                />

                <div className="mt-5 space-y-3">
                  {faqItems.map((item, index) => (
                    <details
                      key={item.question || index}
                      className="group rounded-2xl border border-white/10 bg-white/[0.02]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-white">
                        {item.question}

                        <ChevronDown
                          size={17}
                          className="shrink-0 text-slate-500 transition group-open:rotate-180"
                        />
                      </summary>

                      <div className="border-t border-white/10 px-5 py-4 text-sm leading-7 text-slate-500">
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
                <SectionHeading number="07" title="Related Tools" />

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-indigo-400/20 hover:bg-indigo-500/[0.04]"
                    >
                      <h3 className="text-sm font-semibold text-white">
                        {tool.name}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {tool.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-400">
                        Open
                        <ExternalLink
                          size={12}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

function SectionHeading({ number, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-bold tracking-[0.18em] text-indigo-400">
        {number}
      </span>

      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
      </div>
    </div>
  );
}
