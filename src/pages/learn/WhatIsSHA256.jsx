// src/pages/learn/WhatIsSHA256.jsx

import { ArrowRight, CheckCircle2, Fingerprint, Hash, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function WhatIsSHA256() {
  return (
    <>
      <SEO
        title="What Is SHA-256? | Secure Hash Algorithm Explained"
        description="Learn what SHA-256 is, how cryptographic hashing works, what a 256-bit digest means, and how SHA-256 is used for integrity and fingerprints."
        canonical="/learn/what-is-sha-256"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <ArticleSection number="01" title="What Is SHA-256?">
              <p>
                SHA-256 is a member of the SHA-2 family of cryptographic hash
                functions. It takes an input of arbitrary length and produces a
                fixed-size <strong>256-bit digest</strong>.
              </p>

              <p>
                Hashing is designed to create a compact fingerprint of data.
                The same input produces the same digest, while even a small
                change to the input should produce a substantially different
                result.
              </p>
            </ArticleSection>

            <ArticleSection number="02" title="Hashing Is Not Encryption">
              <div className="grid gap-4 md:grid-cols-2">
                <InfoCard
                  icon={Hash}
                  title="SHA-256"
                  text="A one-way cryptographic hash function designed to produce a fixed-size digest."
                />

                <InfoCard
                  icon={Fingerprint}
                  title="Encryption"
                  text="A reversible transformation designed to protect confidentiality using a cryptographic key."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="03" title="What Does 256-Bit Mean?">
              <p>
                SHA-256 produces 256 bits of output. Since one byte contains
                eight bits, that corresponds to 32 bytes.
              </p>

              <CodeBox>
                256 bits ÷ 8 = 32 bytes
                {"\n\n"}
                32 bytes × 2 hexadecimal characters = 64 hex characters
              </CodeBox>

              <p className="mt-5">
                When represented as hexadecimal, a SHA-256 digest normally
                contains 64 hexadecimal characters.
              </p>
            </ArticleSection>

            <ArticleSection number="04" title="Important Hash Properties">
              <div className="grid gap-4 sm:grid-cols-2">
                <Info title="Deterministic">
                  The same input produces the same hash.
                </Info>

                <Info title="Fixed output size">
                  SHA-256 always produces a 256-bit digest regardless of input
                  length.
                </Info>

                <Info title="Avalanche effect">
                  Small input changes should cause major changes in the
                  resulting digest.
                </Info>

                <Info title="Preimage resistance">
                  A secure hash is designed to make recovering an input from
                  its digest computationally difficult.
                </Info>
              </div>
            </ArticleSection>

            <ArticleSection number="05" title="Common Uses of SHA-256">
              <ul>
                <li>File integrity verification.</li>
                <li>Digital signatures and certificate systems.</li>
                <li>Data fingerprints.</li>
                <li>Content-addressing systems.</li>
                <li>Checksums where cryptographic integrity is required.</li>
              </ul>
            </ArticleSection>

            <ArticleSection number="06" title="SHA-256 and Passwords">
              <p>
                SHA-256 alone is generally not an appropriate password-storage
                mechanism. Passwords are often low-entropy and attackers can
                calculate huge numbers of fast hashes.
              </p>

              <p>
                Password storage normally requires a dedicated password
                hashing or key-derivation function designed to make guessing
                more expensive, such as Argon2id, scrypt, bcrypt, or PBKDF2
                depending on the environment.
              </p>
            </ArticleSection>

            <ArticleSection number="07" title="Security Notes">
              {[
                "A hash does not hide the original data.",
                "A hash does not prove who created the data.",
                "Use HMAC when a shared secret is required for authentication.",
                "Use authenticated encryption when confidentiality and integrity are both required.",
                "Do not confuse SHA-256 with password encryption.",
              ].map((item) => (
                <div
                  key={item}
                  className="mb-3 flex gap-3 rounded-xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />
                  <span className="text-sm leading-6 text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </ArticleSection>

            <CTA
              title="Generate a SHA-256 Hash"
              description="Calculate SHA-256 digests for text directly in your browser."
              to="/tools/hashing/sha-256"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="text-xs font-medium text-slate-500 hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
          <Hash size={14} />
          Cryptographic Hashing
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is SHA-256?
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          A practical explanation of SHA-256, 256-bit digests, cryptographic
          hashing, integrity verification, and common applications.
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
      <span className="font-mono text-xs font-bold text-indigo-400">{number}</span>
      <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
    </div>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <Icon size={20} className="text-cyan-300" />
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function Info({ title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <ShieldCheck size={18} className="text-indigo-300" />
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{children}</p>
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

function CTA({ title, description, to }) {
  return (
    <section className="rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.07] p-6 sm:p-8">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      <Link
        to={to}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Open SHA-256 Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}