// src/pages/learn/WhatIsBase64.jsx

import {
  ArrowRight,
  Binary,
  CheckCircle2,
  FileCode2,
  ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function WhatIsBase64() {
  return (
    <>
      <SEO
        title="What Is Base64? | Encoding vs Encryption Explained"
        description="Learn what Base64 encoding is, how Base64 represents binary data as text, where it is used, and why Base64 is not encryption."
        canonical="/learn/what-is-base64"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <ArticleSection number="01" title="What Is Base64?">
              <p>
                Base64 is an <strong>encoding format</strong> that represents
                binary data using a limited set of text characters. It is useful
                when binary data needs to be transported through systems that
                are designed primarily for text.
              </p>

              <p>
                Base64 is not an encryption algorithm and does not provide
                confidentiality.
              </p>
            </ArticleSection>

            <ArticleSection number="02" title="How Base64 Works">
              <CodeBox>
                Binary data
                {"\n"}↓{"\n"}
                Groups of 6 bits
                {"\n"}↓{"\n"}
                Base64 character mapping
                {"\n"}↓{"\n"}
                Text representation
              </CodeBox>

              <p className="mt-5">
                Standard Base64 uses a 64-character alphabet consisting of
                uppercase letters, lowercase letters, digits, plus, and slash.
                Padding using an equals sign can appear at the end.
              </p>
            </ArticleSection>

            <ArticleSection number="03" title="Base64 Is Not Encryption">
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
                <div className="flex gap-3">
                  <ShieldAlert
                    size={20}
                    className="mt-0.5 shrink-0 text-amber-300"
                  />

                  <p className="text-sm leading-7 text-amber-100">
                    Anyone who can read Base64 can decode it. Base64 does not
                    use a secret key and should never be used as a substitute
                    for encryption.
                  </p>
                </div>
              </div>
            </ArticleSection>

            <ArticleSection number="04" title="Where Base64 Is Used">
              <div className="grid gap-4 sm:grid-cols-2">
                <UseCard title="Email">
                  Binary attachments can be represented in text-based email
                  transport formats.
                </UseCard>

                <UseCard title="Data URLs">
                  Images and other small binary resources can be embedded in
                  URLs using Base64.
                </UseCard>

                <UseCard title="APIs">
                  Binary values can sometimes be represented as strings inside
                  JSON or other text-oriented formats.
                </UseCard>

                <UseCard title="Configuration">
                  Small binary values can be stored in systems that primarily
                  accept textual configuration.
                </UseCard>
              </div>
            </ArticleSection>

            <ArticleSection number="05" title="Base64 vs Base64URL">
              <Comparison
                rows={[
                  ["Base64", "+ and / characters", "General-purpose encoding"],
                  [
                    "Base64URL",
                    "- and _ characters",
                    "URL and filename friendly",
                  ],
                ]}
              />

              <p className="mt-5">
                Base64URL modifies the alphabet so encoded values can be used
                more conveniently in URLs and related contexts.
              </p>
            </ArticleSection>

            <ArticleSection number="06" title="Encoding vs Encryption">
              {[
                ["Encoding", "Changes representation", "No secret required"],
                ["Encryption", "Protects confidentiality", "Key required"],
                ["Hashing", "Creates a digest", "Designed to be one-way"],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="mb-3 grid gap-2 rounded-xl border border-white/10 bg-slate-950/60 p-4 sm:grid-cols-3"
                >
                  <strong className="text-white">{row[0]}</strong>
                  <span className="text-slate-400">{row[1]}</span>
                  <span className="text-slate-500">{row[2]}</span>
                </div>
              ))}
            </ArticleSection>

            <ArticleSection number="07" title="Important Characteristics">
              <ul>
                <li>Base64 increases the size of binary data.</li>
                <li>It is reversible encoding, not one-way hashing.</li>
                <li>It does not authenticate data.</li>
                <li>It does not hide sensitive information.</li>
                <li>
                  It is useful for interoperability between text-based systems.
                </li>
              </ul>
            </ArticleSection>

            <CTA
              title="Try Base64"
              description="Encode and decode Base64 data directly in your browser."
              to="/tools/encoding/base64"
            />
          </div>
        </div>
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="text-xs font-medium text-slate-500 hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
          <Binary size={14} />
          Data Encoding
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is Base64?
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Learn how Base64 represents binary data as text and why encoding
          should never be confused with encryption.
        </p>
      </div>
    </section>
  );
}

function ArticleSection({ number, title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <SectionHeading number={number} title={title} />
      <div className="prose prose-invert mt-5 max-w-none prose-p:text-slate-400 prose-p:leading-8 prose-li:text-slate-400">
        {children}
      </div>
    </section>
  );
}

function SectionHeading({ number, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs font-bold text-indigo-400">
        {number}
      </span>
      <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
    </div>
  );
}

function CodeBox({ children }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-5 font-mono text-sm leading-7 text-cyan-300">
      {children}
    </pre>
  );
}

function UseCard({ title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <FileCode2 size={18} className="text-cyan-300" />
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{children}</p>
    </div>
  );
}

function Comparison({ rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Format</th>
            <th className="px-4 py-3">Alphabet</th>
            <th className="px-4 py-3">Purpose</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => (
                <td key={cell} className="px-4 py-4 text-slate-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CTA({ title, description, to }) {
  return (
    <section className="rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.07] p-6 sm:p-8">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>

      <Link
        to={to}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Open Base64 Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
