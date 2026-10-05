// src/pages/learn/PasswordHashingVsEncryption.jsx

import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  KeyRound,
  Lock,
  Shield,
  ShieldAlert,
  Sparkles,
  Unlock,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function PasswordHashingVsEncryption() {
  const toc = [
    ["01", "The fundamental difference", "difference"],
    ["02", "Encryption explained", "encryption"],
    ["03", "Password hashing explained", "hashing"],
    ["04", "Why SHA-256 alone is not enough", "sha256"],
    ["05", "What is a salt?", "salt"],
    ["06", "Password hashing algorithms", "algorithms"],
    ["07", "When should you use encryption?", "use-encryption"],
    ["08", "Quick decision guide", "decision"],
    ["09", "Common mistakes", "mistakes"],
    ["10", "Frequently asked questions", "faq"],
  ];

  return (
    <>
      <SEO
        title="Password Hashing vs Encryption | What's the Difference?"
        description="Learn the difference between password hashing and encryption, why passwords should normally use dedicated password hashing functions, and how salts and key derivation functions protect stored credentials."
        canonical="/learn/password-hashing-vs-encryption"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            {/* Desktop table of contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  On this page
                </p>

                <nav className="mt-4 space-y-1">
                  {toc.map(([number, title, id]) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="group flex items-start gap-2 rounded-lg px-2 py-2 text-xs leading-5 text-slate-500 transition hover:bg-white/[0.04] hover:text-indigo-300"
                    >
                      <span className="shrink-0 font-mono text-[10px] text-indigo-400/70">
                        {number}
                      </span>

                      <span>{title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="min-w-0">
              {/* Mobile contents */}
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.025] p-5 lg:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  On this page
                </p>

                <div className="mt-4 grid gap-1 sm:grid-cols-2">
                  {toc.map(([number, title, id]) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-indigo-300"
                    >
                      <span className="font-mono text-[10px] text-indigo-400">
                        {number}
                      </span>
                      {title}
                    </a>
                  ))}
                </div>
              </div>

              {/* Key takeaway */}
              <section className="mb-8 rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.07] p-6 sm:p-7">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                    <Sparkles size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">
                      Key takeaway
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">
                      <strong className="text-white">
                        Encryption and password hashing solve different
                        problems.
                      </strong>{" "}
                      Encryption is designed to make data recoverable with the
                      appropriate key. Password hashing is designed to verify
                      a password without storing the original password in a
                      normally recoverable form.
                    </p>
                  </div>
                </div>
              </section>

              <div className="space-y-8">
                <ArticleSection
                  id="difference"
                  number="01"
                  title="The Fundamental Difference"
                  eyebrow="Start with the purpose"
                >
                  <p>
                    Encryption and password hashing are both cryptographic
                    techniques, but they have fundamentally different goals.
                    Choosing between them should start with one question:
                    <strong className="text-white">
                      {" "}
                      does the application need to recover the original data?
                    </strong>
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <ConceptCard
                      icon={<Unlock size={20} />}
                      title="Encryption"
                      label="Recoverable"
                      description="Protects information while preserving the ability to recover the original plaintext using the appropriate key."
                      tone="indigo"
                    />

                    <ConceptCard
                      icon={<KeyRound size={20} />}
                      title="Password hashing"
                      label="Verification"
                      description="Produces a password verifier that can be checked during login without requiring the original password to be recovered."
                      tone="emerald"
                    />
                  </div>

                  <ComparisonTable
                    rows={[
                      ["Primary goal", "Confidentiality", "Password verification"],
                      ["Recover original value?", "Yes, with a key", "Normally no"],
                      ["Uses a secret key?", "Yes", "Uses a password + salt + parameters"],
                      ["Typical examples", "AES-GCM, ChaCha20-Poly1305", "Argon2id, scrypt, bcrypt, PBKDF2"],
                    ]}
                  />
                </ArticleSection>

                <ArticleSection
                  id="encryption"
                  number="02"
                  title="Encryption Explained"
                  eyebrow="Protect data that must remain recoverable"
                >
                  <p>
                    Encryption transforms readable plaintext into ciphertext.
                    An authorized party can later decrypt that ciphertext when
                    the required key and encryption parameters are available.
                  </p>

                  <FlowBox
                    items={[
                      ["01", "Plaintext", "Readable information"],
                      ["02", "Encryption", "Algorithm + key"],
                      ["03", "Ciphertext", "Protected data"],
                      ["04", "Decryption", "Authorized key"],
                      ["05", "Plaintext", "Original information"],
                    ]}
                  />

                  <p>
                    This makes encryption appropriate for information that an
                    application or authorized user needs to retrieve later.
                    Examples include encrypted files, private application
                    records, backups, and messages.
                  </p>

                  <InfoBanner
                    icon={<Lock size={18} />}
                    title="Important"
                    tone="indigo"
                  >
                    Encryption does not eliminate the need for secure key
                    management. If an attacker obtains the encryption key,
                    encrypted data may become readable.
                  </InfoBanner>
                </ArticleSection>

                <ArticleSection
                  id="hashing"
                  number="03"
                  title="Password Hashing Explained"
                  eyebrow="Verify without storing the password itself"
                >
                  <p>
                    A password hashing system processes a user's password with
                    a unique salt and a password-oriented hashing or key
                    derivation function. The resulting verifier and the
                    parameters needed to reproduce it can be stored.
                  </p>

                  <FlowBox
                    items={[
                      ["01", "Password", "User's secret"],
                      ["02", "Random salt", "Unique per password"],
                      ["03", "Password KDF", "Deliberately expensive computation"],
                      ["04", "Verifier", "Stored credential representation"],
                    ]}
                  />

                  <p>
                    When the user logs in, the application processes the
                    supplied password using the stored salt and parameters.
                    The resulting value can then be checked against the stored
                    verifier.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <FeatureCard
                      icon={<Shield size={18} />}
                      title="Slow by design"
                      description="Password KDFs are designed to make large numbers of guesses more expensive."
                    />

                    <FeatureCard
                      icon={<Sparkles size={18} />}
                      title="Unique salts"
                      description="A unique random salt prevents identical passwords from automatically producing identical stored values."
                    />

                    <FeatureCard
                      icon={<KeyRound size={18} />}
                      title="Parameters matter"
                      description="The selected algorithm and cost parameters affect the security and performance of password verification."
                    />
                  </div>
                </ArticleSection>

                <ArticleSection
                  id="sha256"
                  number="04"
                  title="Why Ordinary SHA-256 Is Not Enough"
                  eyebrow="Fast hashing and password hashing have different jobs"
                >
                  <InfoBanner
                    icon={<ShieldAlert size={18} />}
                    title="Do not confuse a general-purpose hash with a password KDF"
                    tone="amber"
                  >
                    Fast cryptographic hashes such as SHA-256 are useful for
                    many integrity and fingerprinting tasks. Password storage
                    requires a function deliberately designed to make password
                    guessing more expensive.
                  </InfoBanner>

                  <p>
                    Modern attackers can perform very large numbers of
                    calculations when testing password guesses. A fast
                    general-purpose hash is optimized to calculate quickly,
                    which is useful for many applications but undesirable when
                    the goal is to slow down password guessing.
                  </p>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-5 sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                      Conceptual comparison
                    </p>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
                        <p className="font-semibold text-white">
                          General-purpose hash
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Designed to calculate efficiently.
                        </p>
                      </div>

                      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5">
                        <p className="font-semibold text-white">
                          Password KDF
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Designed to make password guessing substantially more
                          expensive.
                        </p>
                      </div>
                    </div>
                  </div>
                </ArticleSection>

                <ArticleSection
                  id="salt"
                  number="05"
                  title="What Is a Salt?"
                  eyebrow="Random, unique, and normally stored with the verifier"
                >
                  <p>
                    A salt is random, non-secret data associated with a
                    password verifier. A properly generated unique salt means
                    that two identical passwords do not automatically produce
                    identical stored values.
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <SaltCard
                      title="Unique"
                      description="Generate a fresh random salt for each password record."
                    />

                    <SaltCard
                      title="Non-secret"
                      description="A salt does not normally need to be hidden from someone who sees the stored verifier."
                    />

                    <SaltCard
                      title="Stored"
                      description="The salt and the parameters required for verification can normally be stored alongside the verifier."
                    />
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                    <p className="font-mono text-sm leading-7 text-cyan-300">
                      Password + unique salt + KDF parameters
                      <br />
                      ↓
                      <br />
                      Password verifier
                    </p>
                  </div>
                </ArticleSection>

                <ArticleSection
                  id="algorithms"
                  number="06"
                  title="Password Hashing Algorithms"
                  eyebrow="Use established, maintained implementations"
                >
                  <p>
                    Several established password hashing and key-derivation
                    algorithms are available. The appropriate choice depends
                    on the application's requirements, platform, available
                    libraries, and operational constraints.
                  </p>

                  <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
                    <table className="w-full min-w-[680px] text-left">
                      <thead className="bg-white/[0.04]">
                        <tr className="text-xs uppercase tracking-wider text-slate-500">
                          <th className="px-5 py-4">Algorithm</th>
                          <th className="px-5 py-4">Category</th>
                          <th className="px-5 py-4">Key characteristic</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/10">
                        <AlgorithmRow
                          name="Argon2id"
                          category="Password hashing"
                          characteristic="Modern memory-hard design"
                        />
                        <AlgorithmRow
                          name="scrypt"
                          category="Password hashing"
                          characteristic="Memory-hard design"
                        />
                        <AlgorithmRow
                          name="bcrypt"
                          category="Password hashing"
                          characteristic="Established password hashing function"
                        />
                        <AlgorithmRow
                          name="PBKDF2"
                          category="Password-based derivation"
                          characteristic="Widely standardized and supported"
                        />
                      </tbody>
                    </table>
                  </div>

                  <InfoBanner
                    icon={<CheckCircle2 size={18} />}
                    title="Prefer established libraries"
                    tone="green"
                  >
                    Applications should generally use a reputable,
                    well-maintained implementation rather than attempting to
                    implement a password hashing algorithm from scratch.
                  </InfoBanner>
                </ArticleSection>

                <ArticleSection
                  id="use-encryption"
                  number="07"
                  title="When Should You Use Encryption?"
                  eyebrow="Recoverability is the deciding factor"
                >
                  <p>
                    Encryption is appropriate when authorized users or
                    applications need to recover the original information
                    later.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <UseCard
                      title="Encrypted documents"
                      description="Protect documents that authorized users need to read later."
                    />

                    <UseCard
                      title="Private messages"
                      description="Protect message contents while allowing authorized recipients to recover them."
                    />

                    <UseCard
                      title="Sensitive application data"
                      description="Protect information that an application must retrieve during normal operation."
                    />

                    <UseCard
                      title="Backups"
                      description="Protect stored backup data while preserving future recovery."
                    />
                  </div>

                  <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
                    <p className="text-sm leading-7 text-amber-100">
                      <strong className="text-amber-200">
                        What about passwords?
                      </strong>{" "}
                      Passwords used for authentication generally should not be
                      stored as ordinary reversible ciphertext simply so the
                      application can verify them later.
                    </p>
                  </div>
                </ArticleSection>

                <ArticleSection
                  id="decision"
                  number="08"
                  title="Quick Decision Guide"
                  eyebrow="Choose the primitive based on the job"
                >
                  <div className="space-y-3">
                    <Decision
                      question="Do you need to recover the original data?"
                      answer="Use an appropriate encryption scheme when confidentiality and authorized recovery are required."
                    />

                    <Decision
                      question="Do you only need to verify a password?"
                      answer="Use a dedicated password hashing or key-derivation function designed for password storage."
                    />

                    <Decision
                      question="Do you need authentication with a shared secret?"
                      answer="Consider HMAC or authenticated encryption depending on the protocol and security requirements."
                    />

                    <Decision
                      question="Do you need a data fingerprint?"
                      answer="A cryptographic hash such as SHA-256 may be appropriate for the specific integrity or fingerprinting task."
                    />
                  </div>
                </ArticleSection>

                <ArticleSection
                  id="mistakes"
                  number="09"
                  title="Common Password Security Mistakes"
                  eyebrow="Small implementation decisions can have large consequences"
                >
                  <div className="grid gap-4">
                    <Mistake
                      title="Encrypting passwords for login verification"
                      description="If the application only needs to verify a password, storing a reversible representation creates an unnecessary recovery path."
                    />

                    <Mistake
                      title="Using a fast hash directly"
                      description="A general-purpose hash is not automatically an appropriate password-storage mechanism."
                    />

                    <Mistake
                      title="Reusing one salt"
                      description="Each password record should normally have its own randomly generated salt."
                    />

                    <Mistake
                      title="Ignoring KDF parameters"
                      description="Password hashing security depends not only on the algorithm but also on appropriate cost parameters and implementation."
                    />

                    <Mistake
                      title="Implementing cryptography from scratch"
                      description="Established, reviewed, and maintained cryptographic libraries are generally safer than custom implementations."
                    />
                  </div>
                </ArticleSection>

                <ArticleSection
                  id="faq"
                  number="10"
                  title="Frequently Asked Questions"
                  eyebrow="Common questions about passwords and encryption"
                >
                  <div className="divide-y divide-white/10">
                    <FAQ
                      question="Can encrypted passwords be decrypted?"
                      answer="If passwords are stored using reversible encryption, anyone who obtains the encryption key may potentially recover them. This is one reason password verification normally uses dedicated password hashing rather than reversible encryption."
                    />

                    <FAQ
                      question="Can I decrypt a password hash?"
                      answer="A password hash is not intended to be decrypted. An attacker may still attempt guesses and compare their results, which is why password-specific functions, unique salts, and appropriate cost parameters matter."
                    />

                    <FAQ
                      question="Is SHA-256 a password hashing algorithm?"
                      answer="SHA-256 is a cryptographic hash function, but it is designed to be fast. Password storage generally calls for a password-oriented hashing or key-derivation function rather than simply applying SHA-256 to a password."
                    />

                    <FAQ
                      question="Why do password hashes contain a salt?"
                      answer="A unique salt makes identical passwords produce different stored results and helps prevent attackers from efficiently reusing precomputed results across many password records."
                    />

                    <FAQ
                      question="Should the salt be secret?"
                      answer="No. The salt is normally stored with the password verifier. Its purpose is uniqueness and resistance to certain precomputation strategies, not secrecy."
                    />

                    <FAQ
                      question="Should I implement Argon2 or bcrypt myself?"
                      answer="Generally no. Use a reputable and maintained library that correctly implements the algorithm and provides appropriate password-verification APIs."
                    />
                  </div>
                </ArticleSection>

                {/* Related resources */}
                <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/[0.10] to-transparent p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">
                    <BookIcon />
                    Continue learning
                  </div>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                    Explore more cryptography concepts
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                    Build your understanding step by step with practical
                    explanations and browser-based cryptography tools.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <RelatedLink
                      to="/learn/cryptography-basics"
                      title="Cryptography Basics"
                      description="Start with the core concepts."
                    />

                    <RelatedLink
                      to="/learn/password-based-encryption"
                      title="Password-Based Encryption"
                      description="Learn how passwords can derive encryption keys."
                    />

                    <RelatedLink
                      to="/tools"
                      title="Cryptography Tools"
                      description="Experiment with practical browser-based tools."
                    />

                    <RelatedLink
                      to="/"
                      title="Explore CipherLab"
                      description="Browse the complete CipherLab toolkit."
                    />
                  </div>
                </section>

                {/* Final CTA */}
                <section className="overflow-hidden rounded-3xl border border-indigo-400/20 bg-indigo-500/[0.08]">
                  <div className="relative p-6 sm:p-9">
                    <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                        <KeyRound size={20} />
                      </div>

                      <h2 className="mt-5 text-2xl font-bold text-white">
                        Ready to explore password-based encryption?
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                        Learn how a password can be processed through a
                        key-derivation function to produce material suitable
                        for an encryption system.
                      </p>

                      <Link
                        to="/learn/password-based-encryption"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400"
                      >
                        Continue Learning
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
            </article>
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
    <header className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.16),transparent_32%),radial-gradient(circle_at_10%_60%,rgba(14,165,233,0.07),transparent_28%)]" />

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Link
          to="/learn/cryptography-basics"
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-indigo-300"
        >
          <ChevronRight size={14} className="rotate-180" />
          Cryptography Basics
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold text-indigo-300">
            <KeyRound size={14} />
            Password Security
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-500">
            <Clock3 size={13} />
            8 min read
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          Password Hashing
          <span className="text-indigo-400"> vs </span>
          Encryption
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
          Understand why password verification and data encryption are
          different security problems—and why choosing the wrong approach can
          expose credentials or sensitive information.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <HeroTag>Passwords</HeroTag>
          <HeroTag>Hashing</HeroTag>
          <HeroTag>Encryption</HeroTag>
          <HeroTag>KDFs</HeroTag>
          <HeroTag>Salts</HeroTag>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Article components                                                         */
/* -------------------------------------------------------------------------- */

function ArticleSection({ id, number, title, eyebrow, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-400/[0.07] font-mono text-xs font-bold text-indigo-300">
          {number}
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">
            {eyebrow}
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="mt-7 space-y-5 text-[15px] leading-8 text-slate-400">
        {children}
      </div>
    </section>
  );
}

function ConceptCard({ icon, title, label, description, tone }) {
  const styles =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-400/[0.04]"
      : "border-indigo-400/20 bg-indigo-400/[0.04]";

  const iconStyles =
    tone === "emerald"
      ? "bg-emerald-400/10 text-emerald-300"
      : "bg-indigo-400/10 text-indigo-300";

  return (
    <div className={`rounded-2xl border p-5 ${styles}`}>
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyles}`}
      >
        {icon}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-white">{title}</h3>

        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function FlowBox({ items }) {
  return (
    <div className="my-7 rounded-2xl border border-white/10 bg-slate-950/80 p-4 sm:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0">
        {items.map(([number, title, description], index) => (
          <div
            key={number}
            className="flex min-w-0 flex-1 items-center md:flex-col"
          >
            <div className="flex min-h-[90px] flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 md:block">
              <span className="font-mono text-[10px] text-indigo-400">
                {number}
              </span>

              <div className="md:mt-2">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {description}
                </p>
              </div>
            </div>

            {index < items.length - 1 && (
              <ArrowRight className="mx-2 hidden shrink-0 text-slate-700 md:block" size={16} />
            )}

            {index < items.length - 1 && (
              <div className="my-1 ml-3 h-3 w-px bg-slate-800 md:hidden" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoBanner({ icon, title, tone = "indigo", children }) {
  const classes = {
    amber: "border-amber-400/20 bg-amber-400/[0.05] text-amber-100",
    green: "border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-100",
    indigo: "border-indigo-400/20 bg-indigo-400/[0.05] text-slate-300",
  };

  const iconClasses = {
    amber: "text-amber-300",
    green: "text-emerald-300",
    indigo: "text-indigo-300",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${classes[tone]}`}
      role="note"
    >
      <div className="flex gap-3">
        <span className={`mt-1 shrink-0 ${iconClasses[tone]}`}>{icon}</span>

        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm leading-7 text-slate-400">{children}</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-300">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function SaltCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex items-center gap-2">
        <CheckCircle2 size={17} className="text-emerald-400" />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function AlgorithmRow({ name, category, characteristic }) {
  return (
    <tr className="transition hover:bg-white/[0.025]">
      <td className="px-5 py-4 font-semibold text-white">{name}</td>
      <td className="px-5 py-4 text-sm text-slate-400">{category}</td>
      <td className="px-5 py-4 text-sm text-slate-500">
        {characteristic}
      </td>
    </tr>
  );
}

function UseCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-indigo-400/20">
      <div className="flex items-center gap-2">
        <Check size={17} className="text-emerald-400" />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function Decision({ question, answer }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-sm font-semibold text-white">{question}</p>
      <div className="mt-3 flex gap-2">
        <ArrowRight size={15} className="mt-1 shrink-0 text-indigo-400" />
        <p className="text-sm leading-6 text-slate-500">{answer}</p>
      </div>
    </div>
  );
}

function Mistake({ title, description }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
      <div className="mt-0.5 shrink-0 text-amber-300">
        <ShieldAlert size={18} />
      </div>

      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function FAQ({ question, answer }) {
  return (
    <details className="group py-5 first:pt-0 last:pb-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-semibold text-white marker:hidden">
        <span className="flex items-start gap-3">
          <CircleHelp size={18} className="mt-0.5 shrink-0 text-indigo-400" />
          {question}
        </span>

        <ChevronRight
          size={17}
          className="shrink-0 text-slate-600 transition group-open:rotate-90"
        />
      </summary>

      <p className="mt-3 pl-8 text-sm leading-7 text-slate-500">{answer}</p>
    </details>
  );
}

function RelatedLink({ to, title, description }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-indigo-400/20 hover:bg-indigo-400/[0.04]"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-white transition group-hover:text-indigo-300">
          {title}
        </h3>

        <ArrowRight
          size={16}
          className="shrink-0 text-slate-700 transition group-hover:translate-x-1 group-hover:text-indigo-400"
        />
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </Link>
  );
}

function HeroTag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-slate-500">
      {children}
    </span>
  );
}

function BookIcon() {
  return <span className="text-indigo-300">◆</span>;
}

function ComparisonTable({ rows }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[680px] text-left">
        <thead className="bg-white/[0.04]">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-5 py-4">Aspect</th>
            <th className="px-5 py-4">Encryption</th>
            <th className="px-5 py-4">Password Hashing</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {rows.map(([aspect, encryption, hashing]) => (
            <tr
              key={aspect}
              className="transition hover:bg-white/[0.025]"
            >
              <td className="px-5 py-4 font-medium text-white">
                {aspect}
              </td>

              <td className="px-5 py-4 text-sm leading-6 text-slate-400">
                {encryption}
              </td>

              <td className="px-5 py-4 text-sm leading-6 text-slate-400">
                {hashing}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
