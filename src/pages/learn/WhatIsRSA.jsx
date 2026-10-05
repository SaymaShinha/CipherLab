// src/pages/learn/WhatIsRSA.jsx

import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function WhatIsRSA() {
  return (
    <>
      <SEO
        title="What Is RSA? | Public-Key Cryptography Explained"
        description="Learn what RSA is, how public and private keys work, RSA encryption and signatures, and when RSA is used in modern cryptography."
        canonical="/learn/what-is-rsa"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <ArticleSection number="01" title="What Is RSA?">
              <p>
                RSA is a public-key cryptographic algorithm named after Ron
                Rivest, Adi Shamir, and Leonard Adleman. Unlike symmetric
                encryption, RSA uses a mathematically related public key and
                private key.
              </p>

              <p>
                The public key can be distributed to others, while the private
                key must remain secret.
              </p>
            </ArticleSection>

            <ArticleSection number="02" title="Public Key vs Private Key">
              <div className="grid gap-4 md:grid-cols-2">
                <KeyCard
                  title="Public key"
                  icon={LockKeyhole}
                  description="Can generally be shared. It is used by other parties for operations such as encryption or signature verification, depending on the RSA scheme."
                />

                <KeyCard
                  title="Private key"
                  icon={KeyRound}
                  description="Must remain secret. It is used for operations such as decryption or creating digital signatures."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="03" title="RSA Encryption Concept">
              <CodeBox>
                Plaintext
                {"\n"}↓{"\n"}
                Recipient's Public Key
                {"\n"}↓{"\n"}
                RSA Encryption
                {"\n"}↓{"\n"}
                Ciphertext
                {"\n\n"}
                Recipient's Private Key
                {"\n"}↓{"\n"}
                RSA Decryption
                {"\n"}↓{"\n"}
                Plaintext
              </CodeBox>

              <p className="mt-5">
                In practice, RSA encryption should use a standardized padding
                scheme such as RSA-OAEP rather than raw textbook RSA.
              </p>
            </ArticleSection>

            <ArticleSection number="04" title="RSA Digital Signatures">
              <p>
                RSA can also be used for digital signatures. In this model, a
                sender uses the private key to create a signature, and others
                use the corresponding public key to verify it.
              </p>

              <CodeBox>
                Message
                {"\n"}↓{"\n"}
                Signature Algorithm + Private Key
                {"\n"}↓{"\n"}
                Digital Signature
                {"\n\n"}
                Public Key
                {"\n"}↓{"\n"}
                Signature Verification
              </CodeBox>
            </ArticleSection>

            <ArticleSection number="05" title="RSA vs Symmetric Encryption">
              <Comparison
                rows={[
                  ["RSA", "Asymmetric", "Public/private key pair"],
                  ["AES", "Symmetric", "Shared secret key"],
                  [
                    "RSA",
                    "Key establishment/signatures",
                    "Generally more computationally expensive",
                  ],
                  [
                    "AES",
                    "Bulk encryption",
                    "Efficient for large amounts of data",
                  ],
                ]}
              />

              <p className="mt-5">
                Modern systems frequently combine asymmetric and symmetric
                cryptography. Public-key cryptography can establish or protect
                key material, while symmetric encryption handles the actual bulk
                data.
              </p>
            </ArticleSection>

            <ArticleSection number="06" title="Important RSA Security Rules">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Protect private keys carefully.",
                  "Use sufficiently large RSA keys when RSA is appropriate.",
                  "Use RSA-OAEP for encryption rather than textbook RSA.",
                  "Use standardized signature schemes such as RSA-PSS where appropriate.",
                  "Do not implement RSA mathematics yourself for production cryptography.",
                  "Prefer modern libraries and established protocols.",
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
              title="Generate an RSA Key Pair"
              description="Experiment with browser-based RSA key generation for learning and development."
              to="/tools/authentication-keys/rsa-key-pair"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="text-xs font-medium text-slate-500 hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold text-indigo-300">
          <KeyRound size={14} />
          Public-Key Cryptography
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is RSA?
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Learn how RSA public and private keys work, how RSA encryption differs
          from signatures, and where asymmetric cryptography fits into modern
          security systems.
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

function KeyCard({ title, icon: Icon, description }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <Icon size={20} className="text-indigo-300" />
      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
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
            <th className="px-4 py-3">Algorithm</th>
            <th className="px-4 py-3">Type</th>
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
        Open RSA Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
