// src/pages/learn/WhatIsSHA256.jsx

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Fingerprint,
  Hash,
  KeyRound,
  Lock,
  ShieldCheck,
  Signature,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

const properties = [
  {
    title: "Deterministic",
    description: "The same input produces the same SHA-256 digest every time.",
  },
  {
    title: "Fixed output size",
    description:
      "SHA-256 always produces a 256-bit digest regardless of input size.",
  },
  {
    title: "Avalanche effect",
    description:
      "A small change to the input should cause a substantial change in the resulting digest.",
  },
  {
    title: "One-way design",
    description:
      "A cryptographic hash is designed so that recovering a suitable input from a digest is computationally difficult.",
  },
];

export default function WhatIsSHA256() {
  return (
    <>
      <SEO
        title="What Is SHA-256? SHA-256 Hashing Explained | CipherLab"
        description="Learn what SHA-256 is, how cryptographic hashing works, what a 256-bit digest means, collision and preimage resistance, common uses, HMAC, digital signatures, password hashing, and SHA-256 security practices."
        canonical="/learn/what-is-sha-256"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <KeyTakeaway />

            <ArticleSection number="01" title="What Is SHA-256?">
              <p>
                SHA-256 is a cryptographic hash function belonging to the{" "}
                <strong className="text-white">SHA-2 family</strong> of
                standardized hash algorithms. It accepts an input of arbitrary
                length and produces a fixed-size{" "}
                <strong className="text-white">256-bit digest</strong>.
              </p>

              <p>
                The digest can be thought of as a compact fingerprint of the
                input. If the input changes, the resulting digest should change
                dramatically.
              </p>

              <p>
                SHA-256 is widely used as a building block in integrity
                verification, digital signatures, certificates, authentication
                systems, content-addressing systems, and many other
                cryptographic protocols.
              </p>

              <InfoBanner>
                SHA-256 is a <strong>hash function</strong>, not an encryption
                algorithm. A hash does not provide a reversible way to recover
                the original input.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="02" title="How Cryptographic Hashing Works">
              <p>
                A hash function takes input data and transforms it into a
                digest. The input can be a short sentence, a large file, or
                structured data.
              </p>

              <CodeBox>
                {`Input data
    ↓
SHA-256
    ↓
256-bit digest`}
              </CodeBox>

              <p className="mt-5">
                The digest has a fixed size even when the input does not. A
                one-character message and a multi-gigabyte file can both produce
                a SHA-256 digest containing exactly 256 bits.
              </p>
            </ArticleSection>

            <ArticleSection number="03" title="What Does 256-Bit Mean?">
              <p>
                SHA-256 produces 256 bits of output. Since one byte contains
                eight bits, the digest contains 32 bytes.
              </p>

              <CodeBox>
                {`256 bits ÷ 8
= 32 bytes

32 bytes × 2 hexadecimal characters
= 64 hexadecimal characters`}
              </CodeBox>

              <p className="mt-5">
                A SHA-256 digest is commonly displayed as hexadecimal text. Each
                byte is represented by two hexadecimal characters, so a normal
                hexadecimal SHA-256 representation contains 64 characters.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <MetricCard title="Digest size" value="256 bits" />

                <MetricCard title="Byte length" value="32 bytes" />

                <MetricCard title="Hex length" value="64 characters" />
              </div>
            </ArticleSection>

            <ArticleSection number="04" title="Important Properties of SHA-256">
              <div className="grid gap-4 sm:grid-cols-2">
                {properties.map((property) => (
                  <PropertyCard key={property.title} {...property} />
                ))}
              </div>
            </ArticleSection>

            <ArticleSection number="05" title="The Avalanche Effect">
              <p>
                A useful property of cryptographic hash functions is the
                avalanche effect. A tiny change in the input should produce a
                substantially different digest.
              </p>

              <CodeBox>
                {`Input A:
Hello CipherLab

        ↓ SHA-256

Digest A


Input B:
hello CipherLab

        ↓ SHA-256

Digest B

Digest A ≠ Digest B`}
              </CodeBox>

              <p className="mt-5">
                Changing only the capitalization of one character can produce a
                completely different-looking digest. This makes hashes useful as
                compact fingerprints of data.
              </p>
            </ArticleSection>

            <ArticleSection number="06" title="SHA-256 Is Not Encryption">
              <Comparison
                headers={["Property", "SHA-256", "Encryption"]}
                rows={[
                  [
                    "Primary purpose",
                    "Create a cryptographic digest",
                    "Protect confidentiality",
                  ],
                  ["Uses a secret key?", "Not normally", "Yes"],
                  [
                    "Output",
                    "Fixed-size digest",
                    "Ciphertext generally related to plaintext size",
                  ],
                  ["Reversible?", "No", "Yes, with the appropriate key"],
                  [
                    "Typical use",
                    "Integrity and fingerprints",
                    "Confidentiality",
                  ],
                ]}
              />

              <p className="mt-5">
                If an application needs to hide the contents of a message, a
                hash is the wrong primitive. It needs an appropriate encryption
                construction.
              </p>
            </ArticleSection>

            <ArticleSection number="07" title="Collision Resistance">
              <p>
                A collision occurs when two different inputs produce the same
                hash value.
              </p>

              <CodeBox>
                {`Input A ──→ SHA-256 ──→ Digest X
Input B ──→ SHA-256 ──→ Digest X

If A ≠ B but the digest is identical,
the inputs form a collision.`}
              </CodeBox>

              <p className="mt-5">
                Cryptographic hash functions are designed to make deliberately
                finding useful collisions computationally difficult. Collision
                resistance is an important property when hashes are used in
                signatures, certificates, integrity systems, and other
                security-sensitive constructions.
              </p>

              <InfoBanner>
                Collision resistance does not mean that collisions are
                mathematically impossible. Because SHA-256 has a finite output
                space and can accept arbitrary-length inputs, collisions must
                exist in principle. The security goal is that finding practical
                harmful collisions is computationally infeasible.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection
              number="08"
              title="Preimage and Second-Preimage Resistance"
            >
              <p>
                Cryptographic hash functions have several related security
                properties. Two important concepts are preimage resistance and
                second-preimage resistance.
              </p>

              <Comparison
                headers={["Property", "Question being resisted"]}
                rows={[
                  [
                    "Preimage resistance",
                    "Given a digest, how difficult is it to find an input producing it?",
                  ],
                  [
                    "Second-preimage resistance",
                    "Given one input, how difficult is it to find a different input with the same digest?",
                  ],
                  [
                    "Collision resistance",
                    "How difficult is it to find any two different inputs with the same digest?",
                  ],
                ]}
              />
            </ArticleSection>

            <ArticleSection number="09" title="SHA-256 for File Integrity">
              <p>
                One practical use of SHA-256 is verifying that downloaded or
                transferred data has not changed.
              </p>

              <CodeBox>
                {`Original file
     ↓
 SHA-256
     ↓
Expected digest

Downloaded file
     ↓
 SHA-256
     ↓
Calculated digest

Expected digest
      =
Calculated digest
      ↓
Likely unchanged`}
              </CodeBox>

              <p className="mt-5">
                This technique is useful when a trusted digest is available
                through a separate trustworthy channel. Simply calculating a
                hash of an untrusted download does not by itself prove that the
                file came from the expected publisher.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <UseCard
                  icon={FileCheck2}
                  title="File verification"
                  text="Compare a calculated digest with a trusted published digest."
                />

                <UseCard
                  icon={Fingerprint}
                  title="Data fingerprint"
                  text="Use a compact digest to identify or compare data."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="10" title="SHA-256 and Digital Signatures">
              <p>
                Hash functions are commonly used together with digital
                signatures. Instead of signing a large message directly, a
                signature system can hash the message and operate on the digest
                as part of the signature process.
              </p>

              <CodeBox>
                {`Message
   ↓
SHA-256
   ↓
Message Digest
   ↓
Signature Algorithm + Private Key
   ↓
Digital Signature`}
              </CodeBox>

              <p className="mt-5">
                During verification, the recipient can calculate the digest of
                the received message and use the signature scheme to determine
                whether the signed data is authentic and unchanged.
              </p>

              <InfoBanner>
                SHA-256 itself does not create a digital signature. It can be
                one component of a larger signature construction.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="11" title="SHA-256 and HMAC">
              <p>
                A plain SHA-256 hash does not contain a secret key. Anyone who
                knows the input can calculate its digest.
              </p>

              <p>
                When an application needs a shared secret for message
                authentication, HMAC can combine a secret key with a hash
                function.
              </p>

              <CodeBox>
                {`Message + Secret Key
        ↓
   HMAC-SHA-256
        ↓
Authentication Code`}
              </CodeBox>

              <p className="mt-5">
                This makes HMAC fundamentally different from calculating a
                simple SHA-256 digest.
              </p>

              <Link
                to="/learn/what-is-hmac"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
              >
                Learn what HMAC is
                <ArrowRight size={15} />
              </Link>
            </ArticleSection>

            <ArticleSection number="12" title="SHA-256 and Passwords">
              <p>
                SHA-256 is fast by design. That is useful for many integrity
                applications, but it makes plain SHA-256 a poor choice for
                storing passwords.
              </p>

              <p>
                An attacker who obtains a database containing plain SHA-256
                password hashes can potentially test very large numbers of
                password guesses quickly.
              </p>

              <Comparison
                headers={[
                  "Approach",
                  "Typical characteristic",
                  "Password storage?",
                ]}
                rows={[
                  [
                    "SHA-256",
                    "Fast general-purpose hash",
                    "Generally inappropriate alone",
                  ],
                  [
                    "PBKDF2",
                    "Configurable computational work",
                    "Can be used in password-verification designs",
                  ],
                  [
                    "scrypt",
                    "Memory-hard password processing",
                    "Designed for password-related use",
                  ],
                  [
                    "Argon2id",
                    "Modern memory-hard password hashing",
                    "Strong modern option when supported",
                  ],
                ]}
              />

              <p className="mt-5">
                Password storage requires a design specifically intended to
                resist password-guessing attacks rather than simply applying a
                fast general-purpose hash.
              </p>

              <Link
                to="/learn/what-is-pbkdf2"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
              >
                Learn about PBKDF2
                <ArrowRight size={15} />
              </Link>
            </ArticleSection>

            <ArticleSection number="13" title="SHA-256 vs SHA-512 vs SHA-3">
              <p>
                SHA-256 is part of the SHA-2 family. It is not the only modern
                cryptographic hash function available.
              </p>

              <Comparison
                headers={["Algorithm", "Family", "Digest size"]}
                rows={[
                  ["SHA-256", "SHA-2", "256 bits"],
                  ["SHA-512", "SHA-2", "512 bits"],
                  ["SHA3-256", "SHA-3", "256 bits"],
                  ["SHA3-512", "SHA-3", "512 bits"],
                ]}
              />

              <p className="mt-5">
                SHA-2 and SHA-3 use different internal designs. The fact that
                two algorithms produce the same digest length does not mean that
                they are the same algorithm or construction.
              </p>
            </ArticleSection>

            <ArticleSection number="14" title="Common SHA-256 Mistakes">
              <div className="space-y-3">
                <Mistake
                  title="Calling SHA-256 encryption"
                  text="SHA-256 is a cryptographic hash function. It does not encrypt plaintext or provide a decryption operation."
                />

                <Mistake
                  title="Using plain SHA-256 for passwords"
                  text="SHA-256 is intentionally fast, which makes large-scale password guessing easier. Use an appropriate password-hashing design instead."
                />

                <Mistake
                  title="Assuming a hash proves authenticity"
                  text="Anyone can calculate a SHA-256 digest. A plain hash does not prove who created the data."
                />

                <Mistake
                  title="Treating a hash as a secret"
                  text="A digest is normally not secret. Its value can be publicly calculated from the input."
                />

                <Mistake
                  title="Using a hash as a message authentication code"
                  text="If authentication using a shared secret is required, use a suitable construction such as HMAC rather than simply hashing a message."
                />

                <Mistake
                  title="Comparing hashes without considering encoding"
                  text="The same binary digest can have different textual representations, such as hexadecimal or Base64. Systems must agree on representation when comparing text."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="15" title="SHA-256 Security Checklist">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Use a trusted cryptographic implementation.",
                  "Do not describe SHA-256 as encryption.",
                  "Do not use plain SHA-256 as a password-storage mechanism.",
                  "Use HMAC when a shared secret is required for message authentication.",
                  "Use an appropriate digital-signature scheme when authenticity is required.",
                  "Use a trusted source for published file-integrity digests.",
                  "Be consistent about binary, hexadecimal, and Base64 representations.",
                  "Do not invent custom cryptographic constructions around SHA-256.",
                  "Use a modern cryptographic protocol instead of relying on a hash alone.",
                  "Review algorithm choices as security standards and requirements evolve.",
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

            <ArticleSection number="16" title="Frequently Asked Questions">
              <div className="space-y-4">
                <FAQ
                  question="What does SHA-256 stand for?"
                  answer="SHA-256 refers to the 256-bit member of the SHA-2 family of Secure Hash Algorithms. It produces a 256-bit cryptographic digest."
                />

                <FAQ
                  question="Is SHA-256 encryption?"
                  answer="No. SHA-256 is a cryptographic hash function. Hashing is designed to produce a digest rather than a reversible ciphertext."
                />

                <FAQ
                  question="Can SHA-256 be decrypted?"
                  answer="There is no decryption operation for SHA-256. A system can test candidate inputs by hashing them and comparing the resulting digest, but the original input is not recovered through a SHA-256 decryption process."
                />

                <FAQ
                  question="How long is a SHA-256 hash?"
                  answer="The binary SHA-256 digest is 256 bits, or 32 bytes. When represented as hexadecimal, it normally contains 64 characters."
                />

                <FAQ
                  question="Does SHA-256 always produce the same result?"
                  answer="Yes. SHA-256 is deterministic. The same exact input produces the same digest when processed with the same algorithm."
                />

                <FAQ
                  question="Why does changing one character change the whole hash?"
                  answer="Cryptographic hash functions are designed with an avalanche effect, where small input changes should cause substantial changes throughout the resulting digest."
                />

                <FAQ
                  question="Can two different files have the same SHA-256 hash?"
                  answer="In principle, collisions must exist because SHA-256 has a finite output space while its input space is effectively much larger. The security goal is to make deliberately finding a practical collision computationally infeasible."
                />

                <FAQ
                  question="Is SHA-256 good for passwords?"
                  answer="Plain SHA-256 is generally not appropriate for password storage because it is fast. Passwords should be processed with a password-hashing or key-derivation design intended to make guessing expensive."
                />

                <FAQ
                  question="What is HMAC-SHA-256?"
                  answer="HMAC-SHA-256 is an HMAC construction that uses SHA-256 as its underlying hash function. Unlike a plain SHA-256 digest, HMAC incorporates a secret key for message authentication."
                />

                <FAQ
                  question="What is the difference between SHA-256 and SHA3-256?"
                  answer="Both produce 256-bit digests, but they belong to different hash families and use different internal constructions. SHA-256 belongs to SHA-2, while SHA3-256 belongs to SHA-3."
                />
              </div>
            </ArticleSection>

            <RelatedResources />

            <CTA
              title="Generate a SHA-256 Hash"
              description="Calculate SHA-256 digests directly in your browser and explore how different inputs produce different cryptographic fingerprints."
              to="/tools/hashing/sha-256"
            />
          </div>
        </div>
      </main>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.13),transparent_35%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.10),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
          <Hash size={14} />
          Cryptographic Hashing
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is SHA-256?
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Understand SHA-256 hashing, 256-bit digests, avalanche behavior,
          collision resistance, file integrity, HMAC, digital signatures, and
          password-security considerations.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {[
            "SHA-256",
            "SHA-2",
            "Hashing",
            "256-bit Digest",
            "Integrity",
            "HMAC",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Article Components                                                         */
/* -------------------------------------------------------------------------- */

function ArticleSection({ number, title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <SectionHeading number={number} title={title} />

      <div className="prose prose-invert mt-5 max-w-none prose-p:text-slate-400 prose-p:leading-8 prose-li:text-slate-400 prose-li:leading-7 prose-strong:text-white">
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

function PropertyCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-white/20">
      <ShieldCheck size={19} className="text-cyan-300" />

      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5 text-center">
      <p className="text-xs uppercase tracking-wider text-slate-600">{title}</p>

      <p className="mt-2 font-mono text-lg font-bold text-cyan-300">{value}</p>
    </div>
  );
}

function UseCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <Icon size={19} className="text-indigo-300" />

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

function Comparison({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="bg-white/[0.04]">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            {headers.map((header) => (
              <th key={header} className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr
              key={row.join("-")}
              className="transition hover:bg-white/[0.025]"
            >
              {row.map((cell, index) => (
                <td
                  key={`${cell}-${index}`}
                  className={`px-4 py-4 ${
                    index === 0 ? "font-medium text-white" : "text-slate-400"
                  }`}
                >
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

/* -------------------------------------------------------------------------- */
/* Banners                                                                    */
/* -------------------------------------------------------------------------- */

function InfoBanner({ children }) {
  return (
    <div className="mt-5 rounded-xl border border-indigo-400/20 bg-indigo-400/[0.05] p-5 text-sm leading-7 text-indigo-200">
      {children}
    </div>
  );
}

function KeyTakeaway() {
  return (
    <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6 sm:p-8">
      <div className="flex gap-4">
        <ShieldCheck size={24} className="mt-0.5 shrink-0 text-emerald-300" />

        <div>
          <h2 className="text-lg font-bold text-white">Key takeaway</h2>

          <p className="mt-2 text-sm leading-7 text-slate-400">
            SHA-256 is a cryptographic hash function that converts arbitrary
            input into a 256-bit digest. It is useful for fingerprints and
            integrity-related constructions, but it does not provide
            confidentiality and should not be treated as encryption or plain
            password storage.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Mistakes                                                                   */
/* -------------------------------------------------------------------------- */

function Mistake({ title, text }) {
  return (
    <div className="rounded-xl border border-red-400/10 bg-red-400/[0.025] p-5">
      <div className="flex gap-3">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-300" />

        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

function FAQ({ question, answer }) {
  return (
    <details className="group rounded-xl border border-white/10 bg-slate-950/60">
      <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-white">
        <div className="flex items-center justify-between gap-4">
          <span>{question}</span>

          <span className="text-lg leading-none text-slate-600 transition group-open:rotate-45">
            +
          </span>
        </div>
      </summary>

      <div className="border-t border-white/10 px-5 py-4 text-sm leading-7 text-slate-500">
        {answer}
      </div>
    </details>
  );
}

/* -------------------------------------------------------------------------- */
/* Related Resources                                                          */
/* -------------------------------------------------------------------------- */

function RelatedResources() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <Fingerprint size={20} className="text-cyan-300" />

        <h2 className="text-xl font-bold text-white">Continue Learning</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <RelatedLink
          title="Cryptography Basics"
          description="Build a foundation in encryption, hashing, authentication, keys, and encoding."
          to="/learn/cryptography-basics"
        />

        <RelatedLink
          title="What Is HMAC?"
          description="Learn how SHA-256 can be used as part of a keyed message-authentication construction."
          to="/learn/what-is-hmac"
        />

        <RelatedLink
          title="What Is PBKDF2?"
          description="Understand why plain SHA-256 is different from password-based key derivation."
          to="/learn/what-is-pbkdf2"
        />

        <RelatedLink
          title="Password Hashing vs Encryption"
          description="Understand the difference between storing password verifiers and encrypting recoverable data."
          to="/learn/password-hashing-vs-encryption"
        />
      </div>
    </section>
  );
}

function RelatedLink({ title, description, to }) {
  return (
    <Link
      to={to}
      className="group rounded-xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.04]"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>

        <ArrowRight
          size={16}
          className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300"
        />
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA                                                                        */
/* -------------------------------------------------------------------------- */

function CTA({ title, description, to }) {
  return (
    <section className="rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.07] p-6 sm:p-8">
      <h2 className="text-xl font-bold text-white">{title}</h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        {description}
      </p>

      <Link
        to={to}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
      >
        Open SHA-256 Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
