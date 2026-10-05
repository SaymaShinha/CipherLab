// src/pages/learn/WhatIsPBKDF2.jsx

import { ArrowRight, CheckCircle2, KeyRound, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function WhatIsPBKDF2() {
  return (
    <>
      <SEO
        title="What Is PBKDF2? | Password-Based Key Derivation"
        description="Learn how PBKDF2 derives cryptographic keys from passwords using salt, iterations, and a pseudorandom function."
        canonical="/learn/what-is-pbkdf2"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <ArticleSection number="01" title="What Is PBKDF2?">
              <p>
                PBKDF2 stands for{" "}
                <strong>Password-Based Key Derivation Function 2</strong>. It is
                a standardized key-derivation mechanism designed to derive
                cryptographic key material from a password or other low-entropy
                secret.
              </p>

              <p>
                Human passwords are usually much weaker than randomly generated
                cryptographic keys. PBKDF2 makes password guessing more
                computationally expensive by repeatedly applying a pseudorandom
                function.
              </p>
            </ArticleSection>

            <ArticleSection number="02" title="The PBKDF2 Inputs">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Password">
                  The secret input from which the derived key is created.
                </InfoCard>

                <InfoCard title="Salt">
                  Random, non-secret data that helps make each derivation unique
                  and prevents simple precomputed attacks.
                </InfoCard>

                <InfoCard title="Iterations">
                  The number of repeated computational operations used during
                  derivation.
                </InfoCard>

                <InfoCard title="Output length">
                  Specifies how many bits of derived key material should be
                  produced.
                </InfoCard>
              </div>
            </ArticleSection>

            <ArticleSection number="03" title="How PBKDF2 Works">
              <CodeBox>
                Password + Salt
                {"\n"}↓{"\n"}
                Repeated PRF operations
                {"\n"}↓{"\n"}
                Derived Key
              </CodeBox>

              <p className="mt-5">
                Increasing the iteration count increases the work required to
                calculate each password-derived key. This affects legitimate
                users as well as attackers, so the selected cost should be
                appropriate for the application's environment.
              </p>
            </ArticleSection>

            <ArticleSection number="04" title="PBKDF2 Is Not Encryption">
              <p>
                PBKDF2 does not encrypt or decrypt data. Its purpose is to
                derive key material from a password.
              </p>

              <p>
                A common architecture is to use PBKDF2 to derive an encryption
                key and then use that key with an encryption algorithm such as
                AES-GCM.
              </p>

              <CodeBox>
                Password
                {"\n"}↓{"\n"}
                PBKDF2 + Salt
                {"\n"}↓{"\n"}
                AES-256 Key
                {"\n"}↓{"\n"}
                AES-256-GCM
                {"\n"}↓{"\n"}
                Ciphertext
              </CodeBox>
            </ArticleSection>

            <ArticleSection number="05" title="Why the Salt Matters">
              <p>
                A salt is normally generated randomly and stored alongside data
                that uses the derived key. It does not need to be secret.
              </p>

              <p>
                Different salts produce different derived keys even when the
                same password is used. This prevents identical passwords from
                automatically producing identical password-derived values.
              </p>
            </ArticleSection>

            <ArticleSection number="06" title="PBKDF2 vs Other KDFs">
              <Comparison
                rows={[
                  [
                    "PBKDF2",
                    "Password-based derivation",
                    "Widely standardized",
                  ],
                  ["scrypt", "Password-based derivation", "Memory-hard"],
                  [
                    "Argon2id",
                    "Password hashing / derivation",
                    "Memory-hard and modern",
                  ],
                ]}
              />

              <p className="mt-5">
                PBKDF2 remains useful because it is widely standardized and
                supported by many platforms. Depending on the application,
                modern memory-hard password hashing or derivation functions such
                as Argon2id or scrypt may be preferable.
              </p>
            </ArticleSection>

            <ArticleSection number="07" title="Security Considerations">
              <ul>
                <li>
                  Generate a fresh random salt for each password-derived value.
                </li>
                <li>
                  Choose an appropriate iteration count for your environment.
                </li>
                <li>
                  Do not treat PBKDF2 output as a replacement for encryption.
                </li>
                <li>Protect the original password and derived key material.</li>
                <li>
                  Consider modern memory-hard alternatives when appropriate.
                </li>
              </ul>
            </ArticleSection>

            <CTA
              title="Try PBKDF2"
              description="Experiment with password-based key derivation and see how salt, iterations, and output length affect the derived result."
              to="/tools/authentication-keys/pbkdf2"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.13),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="text-xs font-medium text-slate-500 hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold text-indigo-300">
          <KeyRound size={14} />
          Key Derivation
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is PBKDF2?
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Understand password-based key derivation, salts, iterations, and why
          PBKDF2 is different from encryption.
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

function InfoCard({ title, children }) {
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

function Comparison({ rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">KDF</th>
            <th className="px-4 py-3">Purpose</th>
            <th className="px-4 py-3">Characteristic</th>
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
        Open PBKDF2 Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
