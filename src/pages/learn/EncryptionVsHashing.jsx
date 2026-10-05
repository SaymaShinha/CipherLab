import {
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function EncryptionVsHashing() {
  return (
    <>
      <SEO
        title="Encryption vs Hashing: What's the Difference?"
        description="Learn the difference between encryption and hashing, how they work, when to use each, password security, encryption keys, cryptographic hashes, and data integrity."
        canonical="/learn/encryption-vs-hashing"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.08] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300">
                <Sparkles size={15} />
                Cryptography Basics
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Encryption vs Hashing
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Encryption and hashing are both important security concepts, but
                they solve fundamentally different problems.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ConceptBadge icon={<LockKeyhole size={15} />}>
                  Encryption
                </ConceptBadge>

                <ConceptBadge icon={<Fingerprint size={15} />}>
                  Hashing
                </ConceptBadge>

                <ConceptBadge icon={<ShieldCheck size={15} />}>
                  Data security
                </ConceptBadge>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTRODUCTION
        ====================================================== */}

        <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <IntroCard
              icon={<LockKeyhole size={21} />}
              title="Encryption"
              description="Protects information by making it unreadable to unauthorized people while allowing an authorized party to recover the original data."
            />

            <IntroCard
              icon={<Fingerprint size={21} />}
              title="Hashing"
              description="Creates a fixed-size representation of data that is designed to be computationally difficult to reverse."
            />
          </div>

          {/* =================================================
              CORE IDEA
          ================================================== */}

          <section className="mt-14 scroll-mt-24">
            <SectionHeading
              number="01"
              title="The simplest way to remember the difference"
            />

            <p className="max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              The key question is whether you need to recover the original
              information later.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <ComparisonCard
                icon={<LockKeyhole />}
                title="Need the original data later?"
                answer="Use encryption."
                description="Encryption is designed to be reversible when the correct key is available."
                positive
              />

              <ComparisonCard
                icon={<Fingerprint />}
                title="Only need a fingerprint of the data?"
                answer="Use hashing."
                description="A cryptographic hash produces a digest rather than a reversible encrypted message."
                positive
              />
            </div>
          </section>

          {/* =================================================
              ENCRYPTION
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="02" title="What is encryption?" />

            <div className="space-y-5 text-base leading-8 text-slate-400 sm:text-lg">
              <p>
                Encryption transforms readable information, called{" "}
                <strong className="text-white">plaintext</strong>, into
                protected information called{" "}
                <strong className="text-white">ciphertext</strong>.
              </p>

              <p>
                A cryptographic key controls the encryption operation. When the
                appropriate key and required parameters are available, the
                ciphertext can be decrypted back into the original information.
              </p>
            </div>

            <FlowBox
              tone="indigo"
              items={[
                "Plaintext",
                "Encryption algorithm",
                "Secret key",
                "Ciphertext",
              ]}
            />

            <InfoBox>
              <strong className="text-white">Main purpose:</strong>{" "}
              confidentiality — keeping information secret from unauthorized
              parties.
            </InfoBox>
          </section>

          {/* =================================================
              HASHING
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="03" title="What is hashing?" />

            <div className="space-y-5 text-base leading-8 text-slate-400 sm:text-lg">
              <p>
                A cryptographic hash function takes input data of varying size
                and produces a fixed-size output called a{" "}
                <strong className="text-white">digest</strong> or{" "}
                <strong className="text-white">hash</strong>.
              </p>

              <p>
                Cryptographic hash functions are designed so that finding the
                original input from the digest is computationally impractical
                for appropriately chosen modern algorithms.
              </p>
            </div>

            <FlowBox
              tone="cyan"
              items={["Input data", "Hash function", "Fixed-size digest"]}
            />

            <InfoBox tone="cyan">
              <strong className="text-white">Main purpose:</strong> creating a
              compact fingerprint that can be used for integrity and
              verification-related tasks.
            </InfoBox>
          </section>

          {/* =================================================
              SIDE BY SIDE
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="04" title="Encryption vs hashing" />

            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
              <div className="grid md:grid-cols-2">
                {/* Encryption */}
                <div className="border-b border-white/10 bg-indigo-400/[0.04] p-6 md:border-b-0 md:border-r sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                      <LockKeyhole size={20} />
                    </div>

                    <h3 className="text-xl font-bold text-white">Encryption</h3>
                  </div>

                  <div className="mt-6 space-y-4">
                    <FeatureItem>Uses a cryptographic key</FeatureItem>
                    <FeatureItem>Designed to be reversible</FeatureItem>
                    <FeatureItem>Produces ciphertext</FeatureItem>
                    <FeatureItem>
                      Primarily protects confidentiality
                    </FeatureItem>
                    <FeatureItem>
                      Suitable for data that must be recovered
                    </FeatureItem>
                  </div>
                </div>

                {/* Hashing */}
                <div className="bg-cyan-400/[0.03] p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                      <Fingerprint size={20} />
                    </div>

                    <h3 className="text-xl font-bold text-white">Hashing</h3>
                  </div>

                  <div className="mt-6 space-y-4">
                    <FeatureItem>Uses a hash function</FeatureItem>
                    <FeatureItem>Designed to be one-way</FeatureItem>
                    <FeatureItem>Produces a digest</FeatureItem>
                    <FeatureItem>
                      Useful for integrity and verification
                    </FeatureItem>
                    <FeatureItem>
                      Suitable when the original data is not needed
                    </FeatureItem>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              TABLE
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="05" title="Key differences at a glance" />

            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="bg-white/[0.04]">
                    <tr>
                      <th className="px-5 py-4 font-semibold text-slate-300">
                        Property
                      </th>

                      <th className="px-5 py-4 font-semibold text-indigo-300">
                        Encryption
                      </th>

                      <th className="px-5 py-4 font-semibold text-cyan-300">
                        Hashing
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/10">
                    <ComparisonRow
                      property="Reversible?"
                      encryption="Yes, with the appropriate key"
                      hashing="Designed to be one-way"
                    />

                    <ComparisonRow
                      property="Primary output"
                      encryption="Ciphertext"
                      hashing="Digest"
                    />

                    <ComparisonRow
                      property="Requires a key?"
                      encryption="Yes"
                      hashing="Not for the hash function itself"
                    />

                    <ComparisonRow
                      property="Main security goal"
                      encryption="Confidentiality"
                      hashing="Integrity / fingerprinting"
                    />

                    <ComparisonRow
                      property="Typical use"
                      encryption="Protecting recoverable data"
                      hashing="Verification and integrity"
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* =================================================
              USE CASES
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="06" title="When should you use each?" />

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <UseCaseCard
                icon={<LockKeyhole />}
                title="Use encryption when..."
                items={[
                  "You need to recover the original data.",
                  "You need to protect private information.",
                  "You need confidentiality during storage or transmission.",
                  "An authorized party needs to decrypt the information later.",
                ]}
              />

              <UseCaseCard
                icon={<Fingerprint />}
                title="Use hashing when..."
                items={[
                  "You need a compact fingerprint of data.",
                  "You want to detect whether data changed.",
                  "You need to compare data without storing the original representation.",
                  "You need a cryptographic primitive for another security construction.",
                ]}
              />
            </div>
          </section>

          {/* =================================================
              PASSWORDS
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="07" title="What about passwords?" />

            <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <KeyRound size={20} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Passwords need special treatment
                  </h3>

                  <div className="mt-4 space-y-4 text-sm leading-7 text-slate-400 sm:text-base">
                    <p>
                      Passwords should not normally be stored using ordinary
                      reversible encryption simply because the application needs
                      to verify them later.
                    </p>

                    <p>
                      Instead, password storage commonly uses dedicated password
                      hashing or password-based key derivation mechanisms
                      designed to make large-scale guessing more expensive.
                    </p>

                    <p>
                      Examples include password hashing schemes and key
                      derivation functions such as PBKDF2. The appropriate
                      choice depends on the application's requirements and
                      threat model.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              COMMON MISTAKES
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="08" title="Common mistakes" />

            <div className="mt-8 grid gap-4">
              <Mistake
                title="Trying to decrypt a hash"
                text="A cryptographic hash is not intended to be decrypted. If you need to recover the original information, encryption is the appropriate concept."
              />

              <Mistake
                title="Using encryption to store passwords"
                text="Password verification normally calls for password hashing or an appropriate password-based key derivation mechanism rather than ordinary reversible encryption."
              />

              <Mistake
                title="Assuming every hash is secure"
                text="Older algorithms can have known weaknesses or may be unsuitable for modern security requirements. Algorithm choice matters."
              />

              <Mistake
                title="Thinking encryption alone solves everything"
                text="Secure cryptographic systems also require correct key management, randomness, authentication, parameter handling, and implementation."
              />
            </div>
          </section>

          {/* =================================================
              SIMPLE MEMORY RULE
          ================================================== */}

          <section className="mt-16">
            <div className="rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-6 text-center sm:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-400">
                <Sparkles size={22} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white">
                A simple rule to remember
              </h2>

              <div className="mx-auto mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
                <MemoryCard
                  icon={<LockKeyhole />}
                  title="Need it back?"
                  answer="Encrypt it."
                />

                <MemoryCard
                  icon={<Fingerprint />}
                  title="Need a fingerprint?"
                  answer="Hash it."
                />
              </div>
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================== */}

          <section className="mt-16 border-t border-white/10 pt-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Explore cryptography tools
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Now that you understand the difference, experiment with
                encryption and hashing using CipherLab's browser-based tools.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/tools/encryption/aes-256-gcm"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                >
                  Try AES-256-GCM
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/tools/hashing/sha-256"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                >
                  Try SHA-256
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* =================================================
              SITE NOTICE
          ================================================== */}

          <div className="mt-12 flex items-start gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-emerald-400"
            />

            <p className="text-sm leading-6 text-emerald-200/60">
              CipherLab provides browser-based tools and educational resources
              for practical cryptography and security learning.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}

/* =========================================================
   Reusable Components
========================================================= */

function ConceptBadge({ icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-300">
      <span className="text-indigo-400">{icon}</span>
      {children}
    </div>
  );
}

function IntroCard({ icon, title, description }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h2 className="mt-5 text-xl font-bold text-white">{title}</h2>

      <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function SectionHeading({ number, title }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-400/10 text-xs font-bold text-indigo-400">
        {number}
      </span>

      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function ComparisonCard({
  icon,
  title,
  answer,
  description,
  positive = false,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>

      <div className="mt-3 flex items-center gap-2">
        {positive ? (
          <CheckCircle2 size={18} className="text-emerald-400" />
        ) : (
          <XCircle size={18} className="text-red-400" />
        )}

        <span className="font-semibold text-indigo-300">{answer}</span>
      </div>

      <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p>
    </div>
  );
}

function FlowBox({ items, tone = "indigo" }) {
  const toneClasses =
    tone === "cyan"
      ? {
          border: "border-cyan-400/20",
          background: "bg-cyan-400/5",
          text: "text-cyan-300",
        }
      : {
          border: "border-indigo-400/20",
          background: "bg-indigo-400/5",
          text: "text-indigo-300",
        };

  return (
    <div
      className={`my-7 rounded-3xl border ${toneClasses.border} ${toneClasses.background} p-5 sm:p-6`}
    >
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <div
              className={`rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 font-mono text-sm ${toneClasses.text}`}
            >
              {item}
            </div>

            {index < items.length - 1 && (
              <ArrowRight
                size={16}
                className={`hidden shrink-0 sm:block ${toneClasses.text}`}
              />
            )}

            {index < items.length - 1 && (
              <span className={`text-center ${toneClasses.text} sm:hidden`}>
                ↓
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoBox({ children, tone = "indigo" }) {
  const cyan = tone === "cyan";

  return (
    <div
      className={`rounded-2xl border p-5 ${
        cyan
          ? "border-cyan-400/20 bg-cyan-400/5"
          : "border-indigo-400/20 bg-indigo-400/5"
      }`}
    >
      <p className="text-sm leading-7 text-slate-400">{children}</p>
    </div>
  );
}

function FeatureItem({ children }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />

      <span className="text-sm leading-6 text-slate-300">{children}</span>
    </div>
  );
}

function ComparisonRow({ property, encryption, hashing }) {
  return (
    <tr>
      <td className="px-5 py-4 font-medium text-white">{property}</td>

      <td className="px-5 py-4 text-slate-400">{encryption}</td>

      <td className="px-5 py-4 text-slate-400">{hashing}</td>
    </tr>
  );
}

function UseCaseCard({ icon, title, items }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <FeatureItem key={item}>{item}</FeatureItem>
        ))}
      </div>
    </div>
  );
}

function Mistake({ title, text }) {
  return (
    <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.03] p-5">
      <div className="flex items-start gap-3">
        <XCircle size={19} className="mt-0.5 shrink-0 text-red-400" />

        <div>
          <h3 className="font-semibold text-white">{title}</h3>

          <p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>
        </div>
      </div>
    </div>
  );
}

function MemoryCard({ icon, title, answer }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-medium text-slate-400">{title}</h3>

      <div className="mt-1 text-lg font-bold text-white">{answer}</div>
    </div>
  );
}
