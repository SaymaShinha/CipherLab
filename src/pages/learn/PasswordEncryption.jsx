import {
  ArrowRight,
  CheckCircle2,
  Database,
  KeyRound,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function PasswordEncryption() {
  return (
    <>
      <SEO
        title="Password-Based Encryption Explained: PBKDF2, Salts & Keys"
        description="Learn how password-based key derivation works, how PBKDF2 converts passwords into cryptographic keys, why salts and iterations matter, and how derived keys can be used with AES-256-GCM."
        canonical="/learn/password-based-encryption"
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
                Key Derivation & Password Security
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Password-Based Encryption
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Learn how a human-readable password can be transformed into a
                cryptographic key using a password-based key derivation
                function.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <HeroBadge icon={<KeyRound size={15} />}>
                  Key derivation
                </HeroBadge>

                <HeroBadge icon={<RefreshCw size={15} />}>PBKDF2</HeroBadge>

                <HeroBadge icon={<Database size={15} />}>Salt</HeroBadge>

                <HeroBadge icon={<LockKeyhole size={15} />}>
                  AES-256-GCM
                </HeroBadge>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTRODUCTION
        ====================================================== */}

        <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <section>
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <SectionLabel>Introduction</SectionLabel>

                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  Why can't we use a password directly?
                </h2>

                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-400 sm:text-base">
                  <p>
                    Human-created passwords are usually much less random than
                    cryptographic keys. People tend to choose passwords that are
                    memorable, reusable, or based on predictable patterns.
                  </p>

                  <p>
                    Cryptographic algorithms, however, are designed to work with
                    keys that have sufficient length and randomness.
                  </p>

                  <p>
                    A{" "}
                    <strong className="text-white">
                      password-based key derivation function
                    </strong>{" "}
                    can bridge this gap by transforming a password into a
                    fixed-length cryptographic key.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-6 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                  <KeyRound size={21} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-white">
                  The core idea
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Don't treat a human password as if it were already a strong
                  cryptographic key. Derive an appropriate key first.
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-4 font-mono text-sm text-indigo-300">
                  Password
                  <br />
                  ↓
                  <br />
                  Key Derivation
                  <br />
                  ↓
                  <br />
                  Cryptographic Key
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              WHAT IS KDF
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading
              number="01"
              title="What is a key derivation function?"
            />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-400">
              <p>
                A{" "}
                <strong className="text-white">
                  Key Derivation Function (KDF)
                </strong>{" "}
                is a cryptographic function that derives one or more keys from
                an input value.
              </p>

              <p>
                When the input is a password, a password-based KDF can be
                configured to make each password guess computationally more
                expensive.
              </p>

              <p>
                This matters because attackers may try many possible passwords.
                Increasing the work required for each guess can increase the
                cost of large-scale guessing attacks.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <ConceptCard
                icon={<KeyRound />}
                title="Input"
                text="A password or other secret input."
              />

              <ConceptCard
                icon={<Database />}
                title="Salt"
                text="An additional value used during derivation."
              />

              <ConceptCard
                icon={<RefreshCw />}
                title="Work factor"
                text="Configurable computation that increases derivation cost."
              />
            </div>
          </section>

          {/* =================================================
              PBKDF2
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="02" title="What is PBKDF2?" />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-400">
              <p>
                <strong className="text-white">PBKDF2</strong> stands for
                Password-Based Key Derivation Function 2. It is a standardized
                password-based key derivation mechanism specified in{" "}
                <strong className="text-white">RFC 8018</strong>.
              </p>

              <p>
                PBKDF2 repeatedly applies a pseudorandom function using the
                password, salt, and an iteration count to derive the requested
                key material.
              </p>

              <p>
                The result is a cryptographic key suitable for use by another
                cryptographic algorithm when the resulting construction and
                parameters are appropriate.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                  <RefreshCw size={20} />
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    PBKDF2 concept
                  </div>

                  <h3 className="mt-1 text-lg font-bold text-white">
                    Repeated computation
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                Instead of producing a key with a single inexpensive operation,
                PBKDF2 performs a configurable number of computational
                iterations. This makes each password guess more expensive.
              </p>
            </div>
          </section>

          {/* =================================================
              SALT
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="03" title="Why is a salt important?" />

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Database size={21} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  A salt is not a password
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                  A salt is an additional value supplied to the derivation
                  process. It is normally generated independently and does not
                  need to be kept secret.
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                  For password-related systems, salts should generally be unique
                  so that identical passwords do not automatically produce
                  identical derived values.
                </p>
              </div>

              <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white">
                  What does the salt help with?
                </h3>

                <div className="mt-6 space-y-4">
                  <CheckItem>
                    Reduces the usefulness of precomputed lookup tables.
                  </CheckItem>

                  <CheckItem>
                    Makes identical passwords produce different derived results
                    when different salts are used.
                  </CheckItem>

                  <CheckItem>
                    Gives each password-derived value its own random context.
                  </CheckItem>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
              <p className="text-sm leading-7 text-slate-400">
                <strong className="text-amber-300">Important:</strong> a salt is
                not a secret encryption key. Its purpose is different, and it is
                normally stored alongside the derived value or encrypted data as
                required by the design.
              </p>
            </div>
          </section>

          {/* =================================================
              WORKFLOW
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading
              number="04"
              title="Password-based encryption workflow"
            />

            <p className="max-w-3xl text-base leading-8 text-slate-400">
              A common conceptual design is to derive a cryptographic key from a
              password and then provide that key to an encryption algorithm.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8">
              <WorkflowStep
                number="1"
                icon={<KeyRound />}
                title="User password"
                text="The user provides a password or passphrase."
              />

              <WorkflowArrow />

              <WorkflowStep
                number="2"
                icon={<Database />}
                title="Random salt"
                text="A unique salt is generated for the derivation."
              />

              <WorkflowArrow />

              <WorkflowStep
                number="3"
                icon={<RefreshCw />}
                title="PBKDF2"
                text="The password and salt are processed using a configured iteration count."
              />

              <WorkflowArrow />

              <WorkflowStep
                number="4"
                icon={<KeyRound />}
                title="Derived key"
                text="PBKDF2 produces key material of the required length."
              />

              <WorkflowArrow />

              <WorkflowStep
                number="5"
                icon={<LockKeyhole />}
                title="Authenticated encryption"
                text="The derived key can be used with an encryption construction such as AES-GCM."
              />
            </div>
          </section>

          {/* =================================================
              PARAMETERS
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="05" title="Important PBKDF2 parameters" />

            <div className="grid gap-5 sm:grid-cols-2">
              <ParameterCard
                title="Password"
                description="The human-provided secret from which key material is derived."
              />

              <ParameterCard
                title="Salt"
                description="An additional value that should generally be unique for each password-derived result."
              />

              <ParameterCard
                title="Iterations"
                description="Controls how many computational rounds PBKDF2 performs."
              />

              <ParameterCard
                title="Hash / PRF"
                description="The pseudorandom function used internally by the PBKDF2 construction."
              />

              <ParameterCard
                title="Derived key length"
                description="Determines how many bits of key material are produced."
              />
            </div>
          </section>

          {/* =================================================
              ITERATIONS
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="06" title="Why do iterations matter?" />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-400">
              <p>
                Password guessing is fundamentally a repeated process. An
                attacker can test one candidate password after another.
              </p>

              <p>
                PBKDF2 increases the amount of computation required for each
                candidate by performing many iterations.
              </p>

              <p>
                A higher iteration count generally means more work per guess,
                but the appropriate value depends on the application's
                performance requirements, deployment environment, and current
                security guidance.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <WorkFactorCard
                title="Low work"
                text="Fast derivation, but less resistance to large numbers of guesses."
              />

              <WorkFactorCard
                title="Higher work"
                text="More computation is required for each password candidate."
              />

              <WorkFactorCard
                title="Application-specific"
                text="Choose parameters through testing and current security guidance."
              />
            </div>
          </section>

          {/* =================================================
              ENCRYPTION VS PASSWORD HASHING
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading
              number="07"
              title="Password-based encryption is not the same as password storage"
            />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-6 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                  <LockKeyhole size={21} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Password-based encryption
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                  The password is used to derive a key that protects data that
                  must later be recovered.
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-4 font-mono text-xs leading-7 text-indigo-300">
                  Password
                  <br />
                  ↓
                  <br />
                  KDF
                  <br />
                  ↓
                  <br />
                  Encryption key
                  <br />
                  ↓
                  <br />
                  Ciphertext
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <ShieldCheck size={21} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Password storage
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                  When an application only needs to verify a password, it
                  normally should not need to recover the original password.
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-4 font-mono text-xs leading-7 text-cyan-300">
                  Password
                  <br />
                  ↓
                  <br />
                  Password hashing / KDF
                  <br />
                  ↓
                  <br />
                  Stored verification value
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
              <p className="text-sm leading-7 text-slate-400">
                <strong className="text-emerald-300">Key distinction:</strong>{" "}
                password-based encryption is intended to help derive keys for
                protecting recoverable data. Password storage has a different
                goal and should normally use a password-hashing scheme designed
                specifically for credential verification.
              </p>
            </div>
          </section>

          {/* =================================================
              ALTERNATIVES
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="08" title="Is PBKDF2 the only option?" />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-400">
              <p>
                No. PBKDF2 is one established password-based key derivation
                mechanism, but it is not the only option available.
              </p>

              <p>
                Depending on the application, threat model, platform, and
                security requirements, developers may also consider modern
                password hashing or key derivation functions such as{" "}
                <strong className="text-white">scrypt</strong> or{" "}
                <strong className="text-white">Argon2</strong>.
              </p>

              <p>
                The best choice should be based on current security guidance and
                the actual requirements of the system rather than simply
                selecting an algorithm because it is popular.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <AlgorithmCard
                title="PBKDF2"
                text="Established password-based KDF with configurable iterations."
              />

              <AlgorithmCard
                title="scrypt"
                text="Password-based function designed to make memory usage part of the cost."
              />

              <AlgorithmCard
                title="Argon2"
                text="Modern password hashing and key derivation family with configurable resource costs."
              />
            </div>
          </section>

          {/* =================================================
              SECURITY CONSIDERATIONS
          ================================================== */}

          <section className="mt-16 scroll-mt-24">
            <SectionHeading number="09" title="Security considerations" />

            <div className="grid gap-4">
              <SecurityItem
                title="Use a unique salt"
                text="Avoid reusing the same salt across independent password-derived values."
              />

              <SecurityItem
                title="Use a suitable work factor"
                text="The computational cost should be selected using current guidance and tested against the application's environment."
              />

              <SecurityItem
                title="Protect the password"
                text="A strong KDF cannot compensate for passwords exposed through insecure application design or logging."
              />

              <SecurityItem
                title="Protect derived keys"
                text="Once a key has been derived, it should be handled according to the security requirements of the encryption system."
              />

              <SecurityItem
                title="Use authenticated encryption"
                text="When protecting recoverable data, consider an authenticated encryption construction such as AES-GCM so that tampering can be detected."
              />
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
                    A password is not automatically a cryptographic key.
                    Password-based key derivation functions such as PBKDF2 can
                    transform password material into derived key material while
                    deliberately increasing the computational cost of guessing.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                    Salts provide unique context for the derivation, while
                    parameters such as the iteration count control the
                    computational work. The resulting key can then be used by an
                    appropriate cryptographic construction.
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
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-400">
                <Workflow size={22} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                Try password-based key derivation
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Experiment with PBKDF2 parameters and see how passwords, salts,
                iterations, hash functions, and derived key lengths affect the
                result.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/tools/authentication-keys/pbkdf2"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                >
                  Open PBKDF2 Generator
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/learn/aes-256-explained"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                >
                  Learn AES-256
                  <ArrowRight size={16} />
                </Link>
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
              educational resources. Cryptographic parameters should be chosen
              according to the application's requirements and current security
              guidance.
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

function SectionLabel({ children }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
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

function ConceptCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />

      <span className="text-sm leading-6 text-slate-300">{children}</span>
    </div>
  );
}

function WorkflowStep({ number, icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <div className="flex-1">
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

function WorkflowArrow() {
  return (
    <div className="ml-5 py-3 text-slate-600">
      <ArrowRight className="hidden sm:block" size={17} />
      <span className="sm:hidden">↓</span>
    </div>
  );
}

function ParameterCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-500">{description}</p>
    </div>
  );
}

function WorkFactorCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-400">
        <RefreshCw size={17} />
      </div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function AlgorithmCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-sm font-bold text-indigo-400">{title}</div>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function SecurityItem({ title, text }) {
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
