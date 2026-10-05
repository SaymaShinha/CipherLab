// src/pages/learn/PasswordHashingVsEncryption.jsx

import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Lock,
  ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function PasswordHashingVsEncryption() {
  return (
    <>
      <SEO
        title="Password Hashing vs Encryption | What's the Difference?"
        description="Learn why passwords should normally be stored using dedicated password hashing functions rather than reversible encryption, and understand salts, KDFs, and encryption keys."
        canonical="/learn/password-hashing-vs-encryption"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <ArticleSection number="01" title="The Fundamental Difference">
              <p>
                Encryption is designed to protect data while preserving the
                ability to recover the original plaintext with the appropriate
                key.
              </p>

              <p>
                Password hashing is designed for a different purpose: verifying
                a password without needing to store the original password in
                recoverable form.
              </p>
            </ArticleSection>

            <ArticleSection number="02" title="Encryption">
              <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/[0.06] p-5">
                <CodeBox>
                  Plaintext
                  {"\n"}↓{"\n"}
                  Encryption Key
                  {"\n"}↓{"\n"}
                  Ciphertext
                  {"\n"}↓{"\n"}
                  Decryption Key
                  {"\n"}↓{"\n"}
                  Plaintext
                </CodeBox>
              </div>

              <p className="mt-5">
                Encryption is appropriate when the application needs to recover
                the original data later, such as protected documents or
                encrypted messages.
              </p>
            </ArticleSection>

            <ArticleSection number="03" title="Password Hashing">
              <CodeBox>
                Password + Random Salt
                {"\n"}↓{"\n"}
                Password Hashing / KDF
                {"\n"}↓{"\n"}
                Stored Password Verifier
              </CodeBox>

              <p className="mt-5">
                During login, the supplied password is processed using the
                stored parameters and compared with the stored verifier. The
                original password does not need to be recovered.
              </p>
            </ArticleSection>

            <ArticleSection
              number="04"
              title="Why Ordinary SHA-256 Is Not Enough"
            >
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
                <div className="flex gap-3">
                  <ShieldAlert
                    size={20}
                    className="mt-0.5 shrink-0 text-amber-300"
                  />

                  <p className="text-sm leading-7 text-amber-100">
                    Fast cryptographic hashes are excellent for many integrity
                    and fingerprinting tasks, but password storage needs a
                    deliberately expensive password hashing or derivation
                    function.
                  </p>
                </div>
              </div>

              <p className="mt-5">
                Attackers can test huge numbers of guesses against fast hash
                functions. Dedicated password hashing functions are designed to
                make large-scale guessing substantially more expensive.
              </p>
            </ArticleSection>

            <ArticleSection number="05" title="Salt and Password Hashing">
              <p>
                A salt is random, non-secret data associated with a password
                hash. A unique salt means identical passwords do not
                automatically result in identical stored values.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <Info title="Unique">
                  A fresh salt should normally be generated for each password
                  record.
                </Info>

                <Info title="Non-secret">
                  The salt does not need to be hidden from attackers.
                </Info>

                <Info title="Stored">
                  The salt and required algorithm parameters can normally be
                  stored with the password verifier.
                </Info>
              </div>
            </ArticleSection>

            <ArticleSection number="06" title="Password Hashing Algorithms">
              <Comparison
                rows={[
                  ["Argon2id", "Password hashing", "Modern memory-hard design"],
                  ["scrypt", "Password hashing", "Memory-hard design"],
                  [
                    "bcrypt",
                    "Password hashing",
                    "Established password hashing",
                  ],
                  [
                    "PBKDF2",
                    "Key derivation / password processing",
                    "Widely standardized",
                  ],
                ]}
              />

              <p className="mt-5">
                The best choice depends on the application, platform,
                operational requirements, and available libraries. Use a
                well-maintained implementation rather than implementing these
                algorithms yourself.
              </p>
            </ArticleSection>

            <ArticleSection number="07" title="When Should You Use Encryption?">
              <div className="grid gap-4 sm:grid-cols-2">
                <UseCard title="Encrypted documents">
                  Use encryption when the original document must be recoverable
                  by an authorized party.
                </UseCard>

                <UseCard title="Private messages">
                  Encryption protects message confidentiality while allowing
                  authorized recipients to decrypt the content.
                </UseCard>

                <UseCard title="Sensitive application data">
                  Encryption can protect data that an application needs to
                  retrieve later.
                </UseCard>

                <UseCard title="Passwords">
                  Passwords should generally not be stored using ordinary
                  reversible encryption merely for login verification.
                </UseCard>
              </div>
            </ArticleSection>

            <ArticleSection number="08" title="Quick Decision Guide">
              <div className="space-y-3">
                <Decision
                  question="Do you need to recover the original data?"
                  answer="Use encryption when confidentiality is required."
                />

                <Decision
                  question="Do you only need to verify a password?"
                  answer="Use a dedicated password hashing function."
                />

                <Decision
                  question="Do you need message authentication with a shared secret?"
                  answer="Consider HMAC or authenticated encryption depending on the requirements."
                />

                <Decision
                  question="Do you only need a data fingerprint?"
                  answer="A cryptographic hash such as SHA-256 may be appropriate."
                />
              </div>
            </ArticleSection>

            <CTA
              title="Explore Password-Based Encryption"
              description="Learn how a password can be transformed into an encryption key using a key-derivation function."
              to="/learn/password-based-encryption"
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
          Password Security
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Password Hashing vs Encryption
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Understand why password verification and data encryption are different
          problems—and why using the wrong one can weaken security.
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

function Info({ title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <Lock size={18} className="text-indigo-300" />
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{children}</p>
    </div>
  );
}

function UseCard({ title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <CheckCircle2 size={18} className="text-emerald-400" />
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{children}</p>
    </div>
  );
}

function Decision({ question, answer }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <h3 className="text-sm font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{answer}</p>
    </div>
  );
}

function Comparison({ rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Algorithm</th>
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
        Continue Learning
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
