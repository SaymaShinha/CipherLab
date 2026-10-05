import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  KeyRound,
  Layers3,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
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
      "Learn how AES-256 works, including GCM mode, keys, nonces, ciphertext, and authentication tags.",
    path: "/learn/aes-256-explained",
    category: "Encryption",
  },
  {
    number: "03",
    icon: <KeyRound size={20} />,
    title: "Password-Based Encryption",
    description:
      "Learn how passwords can be processed with PBKDF2 to derive cryptographic keys.",
    path: "/learn/password-based-encryption",
    category: "Key derivation",
  },
  {
    number: "04",
    icon: <ShieldCheck size={20} />,
    title: "Salt & IV",
    description:
      "Understand salts, initialization vectors, nonces, and why these values matter in cryptographic systems.",
    path: "/learn/salt-and-iv",
    category: "Cryptographic values",
  },
];

export default function CryptographyBasics() {
  return (
    <>
      <SEO
        title="Cryptography Basics: Encryption, Hashing, Keys & Security"
        description="Learn cryptography basics through practical guides covering encryption, hashing, AES-256, passwords, PBKDF2, salts, IVs, keys, and authentication."
        canonical="/learn/cryptography-basics"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.08] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300">
                <Sparkles size={15} />
                Cryptography Learning Hub
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Cryptography Basics
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Build a practical understanding of the cryptographic concepts
                used to protect information, verify data, and secure modern
                applications.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <HeroBadge icon={<LockKeyhole size={15} />}>
                  Encryption
                </HeroBadge>

                <HeroBadge icon={<Layers3 size={15} />}>Hashing</HeroBadge>

                <HeroBadge icon={<KeyRound size={15} />}>
                  Key derivation
                </HeroBadge>

                <HeroBadge icon={<ShieldCheck size={15} />}>
                  Authentication
                </HeroBadge>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTRODUCTION
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-400/10 p-2.5 text-indigo-400">
                  <BookOpen size={21} />
                </div>

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  What is cryptography?
                </h2>
              </div>

              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-400 sm:text-base">
                <p>
                  Cryptography is the study and practice of protecting
                  information using mathematical techniques and carefully
                  designed algorithms.
                </p>

                <p>
                  Modern cryptographic systems can help keep information
                  confidential, detect unauthorized changes, authenticate
                  messages, and establish trust between systems.
                </p>

                <p>
                  Instead of treating cryptography as a collection of
                  complicated formulas, these guides focus on understanding what
                  each component does and why it is used.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                Learning path
              </div>

              <h2 className="mt-3 text-xl font-bold text-white">
                Start with the fundamentals
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Begin with the difference between encryption and hashing, then
                explore encryption keys, password-derived keys, salts, IVs, and
                authenticated encryption.
              </p>

              <div className="mt-6 space-y-3">
                <LearningStep number="1" text="Understand the core concepts" />
                <LearningStep
                  number="2"
                  text="Learn how the pieces work together"
                />
                <LearningStep number="3" text="Explore practical examples" />
                <LearningStep number="4" text="Use the corresponding tools" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TOPICS
        ====================================================== */}

        <section className="border-y border-white/10 bg-white/[0.015]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                Guides
              </div>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Explore cryptography topics
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-400">
                Each guide explains an important cryptographic concept in
                practical, easy-to-understand language.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {topics.map((topic) => (
                <TopicCard key={topic.path} topic={topic} />
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CONCEPTS OVERVIEW
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
              Core concepts
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              The building blocks of modern cryptography
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
              These concepts appear repeatedly when working with secure
              applications and cryptographic tools.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ConceptCard
              icon={<LockKeyhole />}
              title="Encryption"
              text="Protects information by transforming readable data into ciphertext."
            />

            <ConceptCard
              icon={<Layers3 />}
              title="Hashing"
              text="Creates a fixed-size representation used for integrity and verification."
            />

            <ConceptCard
              icon={<KeyRound />}
              title="Keys"
              text="Secret or public cryptographic values used by algorithms."
            />

            <ConceptCard
              icon={<ShieldCheck />}
              title="Authentication"
              text="Helps systems detect tampering and verify trusted data."
            />
          </div>
        </section>

        {/* =====================================================
            SECURITY NOTE
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-emerald-400/10 p-2.5 text-emerald-400">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Learn before you implement
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                  Cryptography is sensitive to implementation details. A strong
                  algorithm can still be used incorrectly through poor key
                  management, unsafe randomness, nonce reuse, weak passwords, or
                  incorrect protocol design.
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                  Understanding the purpose and limitations of each component is
                  an important step toward building safer applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to explore?
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Read a guide to understand the concept, then experiment with the
                corresponding cryptography tools in your browser.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/learn/encryption-vs-hashing"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                >
                  Start learning
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/tools/encryption/aes-256-gcm"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                >
                  Explore tools
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

function LearningStep({ number, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-400/10 text-xs font-bold text-indigo-400">
        {number}
      </span>

      <span className="text-sm text-slate-300">{text}</span>
    </div>
  );
}

function TopicCard({ topic }) {
  return (
    <Link
      to={topic.path}
      className="group rounded-3xl border border-white/10 bg-slate-950/60 p-6 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-indigo-400/[0.04] hover:shadow-xl hover:shadow-indigo-950/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
          {topic.icon}
        </div>

        <span className="text-xs font-semibold text-slate-600">
          {topic.number}
        </span>
      </div>

      <div className="mt-6">
        <div className="text-xs font-medium uppercase tracking-wider text-indigo-400/80">
          {topic.category}
        </div>

        <h3 className="mt-2 text-xl font-bold text-white">{topic.title}</h3>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          {topic.description}
        </p>
      </div>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400">
        Read guide
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </Link>
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
