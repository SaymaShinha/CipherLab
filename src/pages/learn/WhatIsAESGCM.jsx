// src/pages/learn/WhatIsAESGCM.jsx

import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function WhatIsAESGCM() {
  return (
    <>
      <SEO
        title="What Is AES-GCM? | Authenticated Encryption Explained"
        description="Learn what AES-GCM is, how AES-256-GCM works, what nonces and authentication tags do, and why nonce reuse is dangerous."
        canonical="/learn/what-is-aes-gcm"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <ArticleSection number="01" title="What Is AES-GCM?">
              <p>
                AES-GCM combines the AES block cipher with Galois/Counter Mode
                to provide <strong>authenticated encryption</strong>. It is
                designed to protect both the confidentiality and integrity of
                data.
              </p>

              <p>
                AES-GCM is widely used in modern applications because it can
                encrypt data while also producing an authentication tag that
                allows tampering to be detected.
              </p>
            </ArticleSection>

            <ArticleSection number="02" title="What Does AES-256 Mean?">
              <p>
                AES is the Advanced Encryption Standard. AES supports 128-bit,
                192-bit, and 256-bit keys. AES-256 refers to the 256-bit key
                size.
              </p>

              <p>
                The key size is independent from the size of the plaintext.
                AES-256 can encrypt small messages as well as much larger data
                streams when implemented appropriately.
              </p>
            </ArticleSection>

            <ArticleSection number="03" title="How AES-GCM Protects Data">
              <div className="grid gap-4 sm:grid-cols-3">
                <InfoCard
                  icon={Lock}
                  title="Confidentiality"
                  text="Encryption transforms plaintext into ciphertext that should not reveal the original content without the key."
                />

                <InfoCard
                  icon={ShieldCheck}
                  title="Integrity"
                  text="The authentication tag allows the recipient to detect modification of authenticated data."
                />

                <InfoCard
                  icon={KeyRound}
                  title="Secret key"
                  text="The encryption and authentication operations depend on the cryptographic key."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="04" title="The AES-GCM Workflow">
              <CodeBox>
                Plaintext + Key + Unique Nonce
                {"\n"}↓{"\n"}
                AES-256-GCM
                {"\n"}↓{"\n"}
                Ciphertext + Authentication Tag
              </CodeBox>

              <p className="mt-5">
                During decryption, the recipient supplies the key and nonce. The
                authentication tag is checked before the plaintext is accepted.
              </p>
            </ArticleSection>

            <ArticleSection number="05" title="What Is the GCM Nonce?">
              <p>
                GCM uses a nonce, commonly represented as a 96-bit value in
                standard implementations. The nonce does not normally need to be
                secret.
              </p>

              <p>
                The critical requirement is that a nonce must not be reused with
                the same AES-GCM key. A secure application should generate or
                manage nonces so that accidental reuse is prevented.
              </p>

              <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
                <p className="text-sm leading-6 text-amber-200">
                  <strong>Important:</strong> AES-GCM nonce reuse with the same
                  key can seriously compromise security. Never treat nonce
                  uniqueness as optional.
                </p>
              </div>
            </ArticleSection>

            <ArticleSection number="06" title="Authentication Tags">
              <p>
                GCM produces an authentication tag along with the ciphertext.
                The tag is used to verify that the ciphertext and authenticated
                associated data have not been modified.
              </p>

              <p>
                If authentication fails, an application should reject the
                decrypted result rather than treating the plaintext as valid.
              </p>
            </ArticleSection>

            <ArticleSection number="07" title="AES-GCM vs AES-CBC">
              <Comparison
                rows={[
                  [
                    "AES-GCM",
                    "Authenticated encryption",
                    "Confidentiality + integrity",
                  ],
                  [
                    "AES-CBC",
                    "Block cipher mode",
                    "Requires separate authentication",
                  ],
                ]}
              />

              <p className="mt-5">
                AES-CBC can still appear in legacy systems, but it does not
                provide authenticated encryption by itself. Modern application
                designs often prefer an authenticated encryption mode such as
                GCM when appropriate.
              </p>
            </ArticleSection>

            <ArticleSection number="08" title="Common Uses">
              <ul>
                <li>Protecting application data in transit or storage.</li>
                <li>Encrypting sensitive local application data.</li>
                <li>Building authenticated encrypted message formats.</li>
                <li>Educational cryptography and development testing.</li>
              </ul>
            </ArticleSection>

            <ArticleSection number="09" title="Security Checklist">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Use a strong encryption key.",
                  "Never reuse a GCM nonce with the same key.",
                  "Verify authentication before accepting plaintext.",
                  "Protect encryption keys separately from ciphertext.",
                  "Use a proper KDF when starting from a password.",
                  "Do not invent your own cryptographic construction.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/10 bg-slate-950/60 p-4"
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
              </div>
            </ArticleSection>

            <CTA
              title="Try AES-256-GCM"
              description="Use CipherLab's browser-based AES-256-GCM tool to experiment with authenticated encryption."
              to="/tools/encryption/aes-256-gcm"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="text-xs font-medium text-slate-500 hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
          <ShieldCheck size={14} />
          Authenticated Encryption
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is AES-GCM?
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Understand AES-256-GCM, authenticated encryption, nonces,
          authentication tags, and safe implementation principles.
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

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <Icon size={19} className="text-cyan-300" />
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
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
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Mode</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Protection</th>
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
        Open AES-256-GCM
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
