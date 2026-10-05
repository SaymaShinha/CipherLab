import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import SEO from "../../components/SEO.jsx";

export default function SaltAndIV() {
  return (
    <>
      <SEO
        title="Salt vs IV vs Nonce: What's the Difference?"
        description="Learn the difference between cryptographic salts, initialization vectors, and nonces, including how they are generated, whether they need to be secret, and why AES-GCM nonce reuse is dangerous."
        canonical="/learn/salt-and-iv"
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
                Salt vs IV vs Nonce
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Salts, initialization vectors, and nonces are all values used
                alongside cryptographic operations, but they solve different
                problems and have different requirements.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <HeroBadge icon={<Database size={15} />}>Salt</HeroBadge>

                <HeroBadge icon={<LockKeyhole size={15} />}>IV</HeroBadge>

                <HeroBadge icon={<Fingerprint size={15} />}>Nonce</HeroBadge>

                <HeroBadge icon={<ShieldCheck size={15} />}>Security</HeroBadge>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTRO
        ====================================================== */}

        <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <section>
            <div className="grid gap-5 md:grid-cols-3">
              <ConceptCard
                icon={<Database />}
                title="Salt"
                subtitle="Password derivation"
                text="Additional input used with password hashing or key derivation."
              />

              <ConceptCard
                icon={<LockKeyhole />}
                title="IV"
                subtitle="Encryption construction"
                text="An initialization value used by certain encryption modes."
              />

              <ConceptCard
                icon={<Fingerprint />}
                title="Nonce"
                subtitle="Number used once"
                text="A value intended to be used according to the uniqueness requirements of a cryptographic construction."
              />
            </div>
          </section>

          {/* =================================================
              SALT
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="01" title="What is a salt?" />

            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-5 text-base leading-8 text-slate-400 sm:text-lg">
                <p>
                  A <strong className="text-white">salt</strong> is additional
                  input supplied to a password hashing or password-based key
                  derivation process.
                </p>

                <p>
                  Salts are particularly useful because two identical passwords
                  can produce different derived values when different salts are
                  used.
                </p>

                <p>
                  A properly generated salt also makes precomputed lookup
                  approaches much less useful because an attacker cannot simply
                  reuse one precomputed result for every account or password
                  record.
                </p>
              </div>

              <ExampleBox tone="cyan">
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Example
                </div>

                <div className="mt-4 space-y-3 font-mono text-sm">
                  <div>
                    Password:
                    <span className="ml-2 text-white">hunter2</span>
                  </div>

                  <div>
                    Salt A:
                    <span className="ml-2 text-cyan-300">8f31...a92c</span>
                  </div>

                  <div>
                    Salt B:
                    <span className="ml-2 text-cyan-300">c412...71ef</span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  The same password can produce different derived values when
                  different salts are used.
                </p>
              </ExampleBox>
            </div>
          </section>

          {/* =================================================
              IV
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="02" title="What is an IV?" />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-400 sm:text-lg">
              <p>
                An{" "}
                <strong className="text-white">
                  Initialization Vector (IV)
                </strong>{" "}
                is an additional input used by certain encryption algorithms and
                modes.
              </p>

              <p>
                The exact requirements for an IV depend on the cryptographic
                construction. Some constructions require unpredictability, while
                others primarily require uniqueness.
              </p>

              <p>
                This is why there is no single universal rule such as "every IV
                must be random." The algorithm and mode determine the correct
                requirement.
              </p>
            </div>

            <InfoBox>
              <strong className="text-white">Important:</strong> An IV is not
              automatically a secret key. In many encryption systems it can be
              stored or transmitted alongside the ciphertext.
            </InfoBox>
          </section>

          {/* =================================================
              NONCE
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="03" title="What is a nonce?" />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-400 sm:text-lg">
              <p>
                A <strong className="text-white">nonce</strong> is commonly
                described as a value intended to be used once within a
                particular cryptographic context.
              </p>

              <p>
                The precise requirement depends on the algorithm. For some
                constructions, uniqueness is the critical property. For others,
                additional requirements may apply.
              </p>

              <p>
                AES-GCM is an important example where nonce uniqueness is
                critical for a given key.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-red-400/20 bg-red-400/5 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-400/10 text-red-400">
                  <AlertTriangle size={22} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    AES-GCM nonce reuse is dangerous
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                    With AES-GCM, the same nonce must not be reused with the
                    same encryption key. Reusing a nonce under the same key can
                    seriously compromise the security guarantees of GCM.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              COMPARISON
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="04" title="Salt vs IV vs nonce" />

            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-white/[0.04]">
                    <tr>
                      <th className="px-5 py-4 font-semibold text-slate-300">
                        Property
                      </th>

                      <th className="px-5 py-4 font-semibold text-cyan-300">
                        Salt
                      </th>

                      <th className="px-5 py-4 font-semibold text-indigo-300">
                        IV
                      </th>

                      <th className="px-5 py-4 font-semibold text-violet-300">
                        Nonce
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/10">
                    <ComparisonRow
                      property="Common purpose"
                      salt="Password derivation"
                      iv="Encryption construction"
                      nonce="Algorithm-specific unique value"
                    />

                    <ComparisonRow
                      property="Secret?"
                      salt="Normally no"
                      iv="Normally no"
                      nonce="Normally no"
                    />

                    <ComparisonRow
                      property="Main requirement"
                      salt="Usually unique"
                      iv="Depends on construction"
                      nonce="Often unique"
                    />

                    <ComparisonRow
                      property="Used with"
                      salt="Password / KDF"
                      iv="Encryption mode"
                      nonce="Encryption or authentication construction"
                    />

                    <ComparisonRow
                      property="Can be stored with output?"
                      salt="Usually yes"
                      iv="Usually yes"
                      nonce="Usually yes"
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* =================================================
              SECRET?
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="05" title="Do they need to be secret?" />

            <div className="grid gap-5 md:grid-cols-3">
              <PublicValueCard
                icon={<Database />}
                title="Salt"
                text="A salt normally does not need to be secret. It is commonly stored alongside the derived value."
              />

              <PublicValueCard
                icon={<LockKeyhole />}
                title="IV"
                text="An IV is often transmitted or stored with ciphertext because it is not the encryption key."
              />

              <PublicValueCard
                icon={<Fingerprint />}
                title="Nonce"
                text="A nonce generally does not need to be secret, but its required uniqueness or other properties must be respected."
              />
            </div>

            <InfoBox tone="emerald">
              <strong className="text-emerald-300">Remember:</strong> secrecy
              and uniqueness are different security properties. A value can be
              public while still needing to be unique.
            </InfoBox>
          </section>

          {/* =================================================
              SALT WORKFLOW
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading
              number="06"
              title="How a salt is used with PBKDF2"
            />

            <p className="max-w-3xl text-base leading-8 text-slate-400">
              A password-based key derivation process can use a salt together
              with the password and other parameters to produce key material.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8">
              <FlowStep
                number="1"
                icon={<KeyRound />}
                title="Password"
                text="The user's password is supplied as the secret input."
              />

              <FlowArrow />

              <FlowStep
                number="2"
                icon={<Database />}
                title="Salt"
                text="A unique salt is supplied as additional input."
              />

              <FlowArrow />

              <FlowStep
                number="3"
                icon={<RefreshCwIcon />}
                title="PBKDF2"
                text="The derivation function performs its configured computation."
              />

              <FlowArrow />

              <FlowStep
                number="4"
                icon={<KeyRound />}
                title="Derived key"
                text="The resulting key material can be used by an appropriate cryptographic construction."
              />
            </div>
          </section>

          {/* =================================================
              AES GCM WORKFLOW
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading
              number="07"
              title="How a nonce is used with AES-GCM"
            />

            <p className="max-w-3xl text-base leading-8 text-slate-400">
              AES-GCM uses a nonce as part of its authenticated encryption
              construction. The nonce does not replace the encryption key.
            </p>

            <div className="mt-8 rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <ProcessCard
                  number="1"
                  title="Secret key"
                  text="Protects the encryption operation."
                  icon={<KeyRound />}
                />

                <ProcessCard
                  number="2"
                  title="Unique nonce"
                  text="Must not be reused with the same key."
                  icon={<Fingerprint />}
                />

                <ProcessCard
                  number="3"
                  title="AES-GCM"
                  text="Produces authenticated ciphertext."
                  icon={<LockKeyhole />}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    size={19}
                    className="mt-0.5 shrink-0 text-red-400"
                  />

                  <p className="text-sm leading-7 text-slate-400">
                    <strong className="text-red-300">Critical rule:</strong>{" "}
                    never intentionally reuse an AES-GCM nonce with the same
                    key.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              WHAT THEY ARE NOT
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="08" title="What they are not" />

            <div className="grid gap-4">
              <NotAKey
                title="A salt is not an encryption key"
                text="A salt is additional input for password hashing or key derivation. It does not replace the secret key."
              />

              <NotAKey
                title="An IV is not a password"
                text="An IV is an algorithm-specific input. It does not provide the secrecy normally expected from a cryptographic key."
              />

              <NotAKey
                title="A nonce is not automatically random"
                text="Some constructions require uniqueness rather than unpredictability. Always follow the requirements of the specific algorithm."
              />

              <NotAKey
                title="Public does not mean unimportant"
                text="A salt, IV, or nonce can often be public while still needing correct generation and handling."
              />
            </div>
          </section>

          {/* =================================================
              COMMON MISTAKES
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="09" title="Common mistakes" />

            <div className="grid gap-4">
              <Mistake
                title="Reusing an AES-GCM nonce"
                text="Reusing a nonce with the same AES-GCM key can compromise the security guarantees of the construction."
              />

              <Mistake
                title="Using one salt for every password"
                text="Password-derived values should normally use independently generated salts rather than a single global salt."
              />

              <Mistake
                title="Treating every IV the same"
                text="IV requirements differ between algorithms and modes. Some constructions need unpredictability while others primarily require uniqueness."
              />

              <Mistake
                title="Trying to keep the salt secret"
                text="Salt security comes from correct generation and use, not from treating the salt as a password or encryption key."
              />
            </div>
          </section>

          {/* =================================================
              MEMORY RULE
          ================================================== */}

          <section className="mt-16">
            <div className="rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-6 text-center sm:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-400">
                <Sparkles size={22} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white">
                A simple way to remember
              </h2>

              <div className="mx-auto mt-7 grid max-w-3xl gap-4 md:grid-cols-3">
                <MemoryCard
                  icon={<Database />}
                  title="Salt"
                  text="Adds unique context to password derivation."
                />

                <MemoryCard
                  icon={<LockKeyhole />}
                  title="IV"
                  text="Provides initialization input to certain encryption constructions."
                />

                <MemoryCard
                  icon={<Fingerprint />}
                  title="Nonce"
                  text="Provides a value intended to satisfy an algorithm's usage requirements, often uniqueness."
                />
              </div>
            </div>
          </section>

          {/* =================================================
              TAKEAWAY
          ================================================== */}

          <section className="mt-16">
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">Key takeaway</h2>

                  <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                    Salts, IVs, and nonces may all look like random bytes, but
                    their security roles are different. A salt is commonly
                    associated with password derivation, while an IV or nonce is
                    associated with a cryptographic construction such as
                    encryption.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                    None of these values should be handled based on appearance
                    alone. The exact generation, uniqueness, unpredictability,
                    and reuse requirements come from the cryptographic algorithm
                    being used.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              CTA
          ================================================== */}

          <section className="mt-16 border-t border-white/10 pt-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Explore the related cryptography tools
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Put these concepts into practice with PBKDF2 key derivation and
                AES-256-GCM encryption tools.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a
                  href="/tools/authentication-keys/pbkdf2"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                >
                  PBKDF2 Generator
                </a>

                <a
                  href="/tools/encryption/aes-256-gcm"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                >
                  AES-256-GCM
                </a>
              </div>
            </div>
          </section>

          {/* =================================================
              NOTICE
          ================================================== */}

          <div className="mt-12 flex items-start gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-emerald-400"
            />

            <p className="text-sm leading-6 text-emerald-200/60">
              CipherLab provides browser-based cryptography tools and
              educational resources. Always follow the requirements of the
              specific cryptographic algorithm and mode you are implementing.
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

function HeroBadge({ icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-300">
      <span className="text-indigo-400">{icon}</span>
      {children}
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

function ConceptCard({ icon, title, subtitle, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h2 className="mt-5 text-xl font-bold text-white">{title}</h2>

      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-indigo-400/80">
        {subtitle}
      </div>

      <p className="mt-3 text-sm leading-7 text-slate-500">{text}</p>
    </div>
  );
}

function ExampleBox({ children, tone = "indigo" }) {
  const classes =
    tone === "cyan"
      ? "border-cyan-400/20 bg-cyan-400/5"
      : "border-indigo-400/20 bg-indigo-400/5";

  return <div className={`rounded-3xl border p-6 ${classes}`}>{children}</div>;
}

function InfoBox({ children, tone = "indigo" }) {
  const classes =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-400/5"
      : "border-indigo-400/20 bg-indigo-400/5";

  return (
    <div className={`mt-7 rounded-2xl border p-5 ${classes}`}>
      <p className="text-sm leading-7 text-slate-400">{children}</p>
    </div>
  );
}

function ComparisonRow({ property, salt, iv, nonce }) {
  return (
    <tr>
      <td className="px-5 py-4 font-medium text-white">{property}</td>

      <td className="px-5 py-4 text-slate-400">{salt}</td>

      <td className="px-5 py-4 text-slate-400">{iv}</td>

      <td className="px-5 py-4 text-slate-400">{nonce}</td>
    </tr>
  );
}

function PublicValueCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>
    </div>
  );
}

function FlowStep({ number, icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-indigo-400">
            STEP {number}
          </span>

          <h3 className="font-semibold text-white">{title}</h3>
        </div>

        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="ml-5 py-3 text-slate-600">
      <span className="hidden sm:block">↓</span>
      <span className="sm:hidden">↓</span>
    </div>
  );
}

function ProcessCard({ number, title, text, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
          {icon}
        </div>

        <span className="text-xs font-bold text-slate-600">{number}</span>
      </div>

      <h3 className="mt-5 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function NotAKey({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start gap-3">
        <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-400" />

        <div>
          <h3 className="font-semibold text-white">{title}</h3>

          <p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Mistake({ title, text }) {
  return (
    <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.03] p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle size={19} className="mt-0.5 shrink-0 text-red-400" />

        <div>
          <h3 className="font-semibold text-white">{title}</h3>

          <p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>
        </div>
      </div>
    </div>
  );
}

function MemoryCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function RefreshCwIcon() {
  return <RefreshCw size={20} />;
}
