import {
  ArrowRight,
  BookOpen,
  Braces,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  Layers3,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

const topics = [
  {
    number: "01",
    icon: <Layers3 size={20} />,
    title: "Encryption vs Hashing",
    description:
      "Understand the difference between reversible encryption and one-way cryptographic hashing.",
    path: "/learn/encryption-vs-hashing",
    category: "Core concept",
  },
  {
    number: "02",
    icon: <LockKeyhole size={20} />,
    title: "AES-256 Explained",
    description:
      "Learn how AES-256 works, including keys, GCM mode, nonces, ciphertext, and authentication tags.",
    path: "/learn/aes-256-explained",
    category: "Encryption",
  },
  {
    number: "03",
    icon: <KeyRound size={20} />,
    title: "Password-Based Encryption",
    description:
      "Learn how password-based systems use key derivation functions such as PBKDF2 to produce cryptographic keys.",
    path: "/learn/password-based-encryption",
    category: "Key derivation",
  },
  {
    number: "04",
    icon: <ShieldCheck size={20} />,
    title: "Salt, IV & Nonce",
    description:
      "Understand salts, initialization vectors, nonces, and how these values are used in cryptographic systems.",
    path: "/learn/salt-and-iv",
    category: "Cryptographic values",
  },
  {
    number: "05",
    icon: <Fingerprint size={20} />,
    title: "What is HMAC?",
    description:
      "Learn how HMAC combines a secret key with a hash function to authenticate messages and detect tampering.",
    path: "/learn/what-is-hmac",
    category: "Authentication",
  },
  {
    number: "06",
    icon: <KeyRound size={20} />,
    title: "What is PBKDF2?",
    description:
      "Understand password-based key derivation, salts, iterations, derived keys, and password-guessing resistance.",
    path: "/learn/what-is-pbkdf2",
    category: "Key derivation",
  },
  {
    number: "07",
    icon: <LockKeyhole size={20} />,
    title: "What is AES-GCM?",
    description:
      "Explore authenticated encryption with AES-GCM and understand ciphertext, authentication tags, keys, and nonces.",
    path: "/learn/what-is-aes-gcm",
    category: "Encryption",
  },
  {
    number: "08",
    icon: <KeyRound size={20} />,
    title: "What is RSA?",
    description:
      "Learn the fundamentals of RSA public-key cryptography, key pairs, encryption, signatures, and practical limitations.",
    path: "/learn/what-is-rsa",
    category: "Public-key cryptography",
  },
  {
    number: "09",
    icon: <Fingerprint size={20} />,
    title: "What is SHA-256?",
    description:
      "Understand cryptographic hashing, fixed-length digests, avalanche behavior, integrity checking, and common uses.",
    path: "/learn/what-is-sha-256",
    category: "Hashing",
  },
  {
    number: "10",
    icon: <Braces size={20} />,
    title: "What is Base64?",
    description:
      "Learn why Base64 is an encoding format rather than encryption and where Base64 is commonly used.",
    path: "/learn/what-is-base64",
    category: "Encoding",
  },
  {
    number: "11",
    icon: <RefreshCw size={20} />,
    title: "Cryptographic Randomness",
    description:
      "Understand why secure randomness matters for passwords, keys, salts, nonces, tokens, and other security values.",
    path: "/learn/cryptographic-randomness",
    category: "Security fundamentals",
  },
  {
    number: "12",
    icon: <ShieldCheck size={20} />,
    title: "Password Hashing vs Encryption",
    description:
      "Learn why passwords should normally be protected with dedicated password hashing or key derivation rather than reversible encryption.",
    path: "/learn/password-hashing-vs-encryption",
    category: "Password security",
  },
];

const learningStages = [
  {
    number: "01",
    title: "Start with concepts",
    text: "Learn what encryption, hashing, keys, authentication, and encoding actually do.",
  },
  {
    number: "02",
    title: "Understand primitives",
    text: "Explore AES-GCM, SHA-256, HMAC, PBKDF2, RSA, and secure randomness.",
  },
  {
    number: "03",
    title: "Understand implementation",
    text: "Learn about passwords, salts, IVs, nonces, authentication tags, and key management.",
  },
  {
    number: "04",
    title: "Practice with tools",
    text: "Use CipherLab's browser-based tools to experiment with the concepts you have learned.",
  },
];

export default function CryptographyBasics() {
  return (
    <>
      <SEO
        title="Cryptography Basics | Encryption, Hashing, AES, RSA & Security"
        description="Learn cryptography basics through practical guides covering encryption, hashing, AES-GCM, RSA, HMAC, PBKDF2, SHA-256, Base64, password security, salts, nonces, and cryptographic randomness."
        canonical="/learn/cryptography-basics"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        {/* =========================================================
            HERO
        ========================================================== */}

        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.06),transparent_28%)]" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300">
                <Sparkles size={15} />
                CipherLab Learning Hub
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Cryptography Basics
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
                Build a practical understanding of the cryptographic
                technologies used to protect information, verify data,
                authenticate messages, and secure modern applications.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <HeroBadge icon={<LockKeyhole size={15} />}>
                  Encryption
                </HeroBadge>

                <HeroBadge icon={<Fingerprint size={15} />}>Hashing</HeroBadge>

                <HeroBadge icon={<KeyRound size={15} />}>
                  Key derivation
                </HeroBadge>

                <HeroBadge icon={<ShieldCheck size={15} />}>
                  Authentication
                </HeroBadge>

                <HeroBadge icon={<Braces size={15} />}>Encoding</HeroBadge>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            INTRO
        ========================================================== */}

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                  <BookOpen size={21} />
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                    Fundamentals
                  </div>

                  <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                    What is cryptography?
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
                <p>
                  Cryptography is the study and practice of protecting
                  information using mathematical techniques, algorithms, and
                  carefully designed protocols.
                </p>

                <p>
                  Modern cryptographic systems can provide confidentiality,
                  integrity, authentication, and mechanisms for establishing
                  trust between systems.
                </p>

                <p>
                  Cryptography is more than simply turning readable text into
                  unreadable text. Different primitives solve different
                  problems. Encryption protects information, hashing creates
                  fingerprints, message authentication detects tampering, and
                  key derivation turns passwords or other inputs into
                  cryptographic keys.
                </p>

                <p>
                  These guides are designed to explain those differences in
                  practical language before you start using the corresponding
                  tools.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                Recommended path
              </div>

              <h2 className="mt-3 text-xl font-bold text-white">
                Learn in the right order
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Start with the fundamental distinction between encryption and
                hashing. Then move into algorithms, authentication, key
                derivation, password protection, and secure randomness.
              </p>

              <div className="mt-7 space-y-4">
                {learningStages.map((stage) => (
                  <LearningStage key={stage.number} stage={stage} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            QUICK OVERVIEW
        ========================================================== */}

        <section className="border-y border-white/10 bg-white/[0.015]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <OverviewCard
                icon={<LockKeyhole size={19} />}
                number="05"
                title="Encryption"
                text="Tools and guides for protecting information with cryptographic algorithms."
              />

              <OverviewCard
                icon={<Fingerprint size={19} />}
                number="07"
                title="Hashing"
                text="Learn about digests, fingerprints, integrity checks, and password protection."
              />

              <OverviewCard
                icon={<KeyRound size={19} />}
                number="04"
                title="Keys & Authentication"
                text="Explore HMAC, PBKDF2, RSA, key pairs, and authenticated data."
              />

              <OverviewCard
                icon={<WandSparkles size={19} />}
                number="03"
                title="Security Fundamentals"
                text="Understand secure randomness, passwords, nonces, salts, and safe implementation."
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            GUIDES
        ========================================================== */}

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
              Learning guides
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Explore cryptography topics
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-400">
              Work through these guides to understand the purpose, terminology,
              security properties, and practical considerations behind common
              cryptographic technologies.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <TopicCard key={topic.path} topic={topic} />
            ))}
          </div>
        </section>

        {/* =========================================================
            HOW THE CONCEPTS CONNECT
        ========================================================== */}

        <section className="border-y border-white/10 bg-white/[0.015]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                Putting it together
              </div>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                How the pieces connect
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-400">
                Real applications often combine several cryptographic primitives
                rather than relying on a single algorithm.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-5">
              <FlowCard
                number="01"
                title="Password"
                text="Human-readable secret"
              />

              <FlowArrow />

              <FlowCard
                number="02"
                title="PBKDF2"
                text="Derives a cryptographic key"
              />

              <FlowArrow />

              <FlowCard
                number="03"
                title="AES-GCM"
                text="Encrypts and authenticates data"
              />
            </div>

            <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-center">
              <p className="text-sm leading-7 text-slate-400">
                A secure design may also rely on a cryptographically secure
                random generator to create salts and nonces, while HMAC, digital
                signatures, or other mechanisms can provide authentication
                depending on the protocol.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            CORE CONCEPTS
        ========================================================== */}

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
              Core concepts
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The building blocks of modern cryptography
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-400">
              Understanding these concepts makes it easier to choose the right
              cryptographic primitive and recognize common implementation
              mistakes.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ConceptCard
              icon={<LockKeyhole />}
              title="Encryption"
              text="Transforms readable information into ciphertext so that authorized parties can recover the original data."
            />

            <ConceptCard
              icon={<Fingerprint />}
              title="Hashing"
              text="Produces a fixed-size digest that can be used as a fingerprint for data integrity and verification."
            />

            <ConceptCard
              icon={<KeyRound />}
              title="Keys"
              text="Cryptographic values control operations such as encryption, decryption, authentication, or signing."
            />

            <ConceptCard
              icon={<ShieldCheck />}
              title="Authentication"
              text="Helps verify that data came from a trusted source or was not modified unexpectedly."
            />
          </div>
        </section>

        {/* =========================================================
            IMPORTANT DISTINCTIONS
        ========================================================== */}

        <section className="border-y border-white/10 bg-white/[0.015]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-5 md:grid-cols-2">
              <DistinctionCard
                title="Encryption is not encoding"
                icon={<LockKeyhole size={20} />}
                text="Encryption is designed to provide confidentiality and requires a cryptographic key. Encoding such as Base64 changes representation so data can be transported or stored conveniently. Base64 does not make secret information secure."
              />

              <DistinctionCard
                title="Hashing is not encryption"
                icon={<Fingerprint size={20} />}
                text="A cryptographic hash produces a digest rather than encrypted data that can simply be decrypted. Hashes are useful for integrity and verification, while encryption is used when authorized recovery of the original information is required."
              />

              <DistinctionCard
                title="PBKDF2 is not encryption"
                icon={<KeyRound size={20} />}
                text="PBKDF2 is a password-based key derivation function. It processes a password and salt through repeated operations to derive key material. The derived key can then be used with an encryption algorithm."
              />

              <DistinctionCard
                title="Randomness matters"
                icon={<RefreshCw size={20} />}
                text="Keys, salts, nonces, tokens, and generated passwords often depend on unpredictable random values. Cryptographic applications should use a secure randomness source rather than ordinary predictable random functions."
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            SECURITY NOTE
        ========================================================== */}

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <ShieldCheck size={22} />
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  Security principle
                </div>

                <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Strong algorithms still require careful implementation
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  Choosing a well-established algorithm is only one part of
                  building a secure system. Key management, secure randomness,
                  password handling, nonce uniqueness, authentication, protocol
                  design, and correct library usage are also important.
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                  These guides are educational resources. For production
                  security systems, follow established standards and use
                  well-maintained cryptographic libraries and protocols rather
                  than designing your own cryptographic scheme.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PRACTICAL TOOLS
        ========================================================== */}

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                Learn → experiment
              </div>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Turn concepts into practice
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                After reading a guide, use the corresponding CipherLab tool to
                experiment with cryptographic operations directly in your
                browser.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/tools/encryption/aes-256-gcm"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
                >
                  Try AES-256-GCM
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/tools/authentication-keys/hmac"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                >
                  Explore HMAC
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/tools/security/password-generator"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                >
                  Generate a Password
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================== */}

        <section className="border-t border-white/10 bg-white/[0.015]">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-400">
                <BookOpen size={22} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                Keep learning
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Cryptography becomes easier to understand when you connect
                individual concepts together. Explore the guides, compare
                related primitives, and then experiment with the tools.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/learn/encryption-vs-hashing"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                >
                  Start with the fundamentals
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                >
                  Browse CipherLab
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* =========================================================
   Components
========================================================= */

function HeroBadge({ icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-300">
      <span className="text-indigo-400">{icon}</span>
      {children}
    </div>
  );
}

function LearningStage({ stage }) {
  return (
    <div className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-400/10 text-[11px] font-bold text-indigo-400">
        {stage.number}
      </span>

      <div>
        <h3 className="text-sm font-semibold text-white">{stage.title}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">{stage.text}</p>
      </div>
    </div>
  );
}

function OverviewCard({ icon, number, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
          {icon}
        </div>

        <span className="text-xs font-bold tracking-wider text-slate-600">
          {number}
        </span>
      </div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function TopicCard({ topic }) {
  return (
    <Link
      to={topic.path}
      className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-indigo-400/[0.04] hover:shadow-xl hover:shadow-indigo-950/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400 transition group-hover:bg-indigo-400/15">
          {topic.icon}
        </div>

        <span className="text-xs font-semibold tracking-wider text-slate-600">
          {topic.number}
        </span>
      </div>

      <div className="mt-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-400/80">
          {topic.category}
        </div>

        <h3 className="mt-2 text-xl font-bold text-white">{topic.title}</h3>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          {topic.description}
        </p>
      </div>

      <div className="mt-auto pt-6">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400">
          Read guide
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

function FlowCard({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
      <div className="text-[10px] font-bold tracking-[0.18em] text-indigo-400">
        {number}
      </div>

      <h3 className="mt-2 text-sm font-bold text-white">{title}</h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <ArrowRight size={18} className="text-slate-600" />
    </div>
  );
}

function ConceptCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-indigo-400/20 hover:bg-white/[0.045]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function DistinctionCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
          {icon}
        </div>

        <h3 className="text-base font-bold text-white">{title}</h3>
      </div>

      <div className="mt-4 flex gap-3">
        <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-400" />

        <p className="text-sm leading-7 text-slate-400">{text}</p>
      </div>
    </div>
  );
}
