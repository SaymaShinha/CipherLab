// src/pages/learn/CryptographicRandomness.jsx

import {
  ArrowRight,
  CheckCircle2,
  Dice5,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function CryptographicRandomness() {
  return (
    <>
      <SEO
        title="Cryptographic Randomness | Secure Random Number Generation"
        description="Learn what cryptographic randomness is, why secure random values matter, how Web Crypto generates random bytes, and why Math.random should not be used for security."
        canonical="/learn/cryptographic-randomness"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <ArticleSection
              number="01"
              title="What Is Cryptographic Randomness?"
            >
              <p>
                Cryptographic randomness refers to random or unpredictable
                values generated for security-sensitive operations such as
                encryption keys, tokens, nonces, salts, and password generation.
              </p>

              <p>
                Security systems depend on unpredictability. If an attacker can
                predict a supposedly random value, they may be able to recover
                keys, forge tokens, or bypass protections.
              </p>
            </ArticleSection>

            <ArticleSection
              number="02"
              title="Why Ordinary Randomness Is Not Enough"
            >
              <p>
                General-purpose pseudo-random number generators are often
                designed for simulations, games, visual effects, or statistical
                applications. Their output may be unsuitable for secrets.
              </p>

              <div className="rounded-xl border border-red-400/20 bg-red-400/[0.06] p-5">
                <p className="font-mono text-sm text-red-200">
                  Math.random() ≠ cryptographic randomness
                </p>
              </div>
            </ArticleSection>

            <ArticleSection number="03" title="Where Secure Randomness Is Used">
              <div className="grid gap-4 sm:grid-cols-2">
                <UseCard title="Encryption keys">
                  Generate unpredictable secret keys for cryptographic
                  algorithms.
                </UseCard>

                <UseCard title="Nonces and IVs">
                  Generate values required by encryption schemes and protocol
                  designs.
                </UseCard>

                <UseCard title="Password generation">
                  Select characters unpredictably when generating random
                  passwords.
                </UseCard>

                <UseCard title="Security tokens">
                  Create difficult-to-predict session and reset tokens.
                </UseCard>
              </div>
            </ArticleSection>

            <ArticleSection number="04" title="Web Crypto API">
              <p>
                Modern browsers provide the Web Crypto API. Its
                <code className="mx-1 rounded bg-slate-800 px-1.5 py-0.5 text-cyan-300">
                  crypto.getRandomValues()
                </code>
                method can provide cryptographically strong random values
                suitable for many browser-side security operations.
              </p>

              <CodeBox>crypto.getRandomValues(new Uint8Array(32))</CodeBox>

              <p className="mt-5">
                The exact security properties depend on the platform and
                implementation, but Web Crypto is specifically designed for
                cryptographic operations rather than ordinary application
                randomness.
              </p>
            </ArticleSection>

            <ArticleSection number="05" title="Randomness vs Uniqueness">
              <p>
                Randomness and uniqueness are related but different concepts.
                Some protocols require values to be unpredictable, while others
                primarily require that a value never repeats under a particular
                key or context.
              </p>

              <p>
                AES-GCM nonces are an important example: nonce reuse with the
                same key can be dangerous, so systems must carefully guarantee
                the required uniqueness.
              </p>
            </ArticleSection>

            <ArticleSection number="06" title="Secure Randomness Checklist">
              {[
                "Use a cryptographically secure random source for secrets.",
                "Do not use Math.random() to generate security credentials.",
                "Use sufficient random data for the security level required.",
                "Avoid predictable seeds and counters unless a protocol specifically requires them.",
                "Follow the randomness requirements of the cryptographic algorithm being used.",
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
              title="Generate Secure Random Bytes"
              description="Generate random byte sequences using the browser's Web Crypto API."
              to="/tools/security/random-bytes"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="text-xs font-medium text-slate-500 hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
          <Dice5 size={14} />
          Security Fundamentals
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Cryptographic Randomness
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Understand why unpredictability matters and how secure random values
          support keys, tokens, passwords, salts, and cryptographic protocols.
        </p>
      </div>
    </section>
  );
}

function ArticleSection({ number, title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <SectionHeading number={number} title={title} />
      <div className="prose prose-invert mt-5 max-w-none prose-p:text-slate-400 prose-p:leading-8">
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

function UseCard({ title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <LockKeyhole size={18} className="text-emerald-300" />
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
        Open Random Bytes Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
