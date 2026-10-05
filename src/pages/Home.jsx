import {
  ArrowRight,
  Binary,
  BookOpen,
  CheckCircle2,
  Code2,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../components/SEO.jsx";
import ToolCard from "../components/ToolCard.jsx";

const popularTools = [
  {
    name: "AES-256-GCM",
    description:
      "Encrypt and decrypt text using authenticated AES-256-GCM encryption directly in your browser.",
    path: "/tools/encryption/aes-256-gcm",
    category: "Encryption",
    icon: LockKeyhole,
    featured: true,
  },
  {
    name: "SHA-256",
    description:
      "Generate a SHA-256 cryptographic hash for text using browser-based cryptographic APIs.",
    path: "/tools/hashing/sha-256",
    category: "Hashing",
    icon: Fingerprint,
  },
  {
    name: "Base64",
    description:
      "Encode or decode text using the widely supported Base64 representation.",
    path: "/tools/encoding/base64",
    category: "Encoding",
    icon: Code2,
  },
  {
    name: "Password Generator",
    description:
      "Generate strong random passwords using cryptographically secure browser randomness.",
    path: "/tools/security/password-generator",
    category: "Security",
    icon: KeyRound,
  },
];

const categories = [
  {
    title: "Encryption",
    description:
      "Protect readable data with modern encryption algorithms and understand how encrypted data is produced.",
    icon: LockKeyhole,
    path: "/tools/encryption/aes-256-gcm",
    count: "5 tools",
  },
  {
    title: "Hashing",
    description:
      "Create cryptographic fingerprints and learn how hashes are used for integrity and verification.",
    icon: Fingerprint,
    path: "/tools/hashing/sha-hash",
    count: "7 tools",
  },
  {
    title: "Encoding",
    description:
      "Convert data between common representations such as Base64, Base64URL, and hexadecimal.",
    icon: Binary,
    path: "/tools/encoding/base64",
    count: "3 tools",
  },
  {
    title: "Security",
    description:
      "Generate passwords, random bytes, identifiers, and other useful security-related values.",
    icon: ShieldCheck,
    path: "/tools/security/password-generator",
    count: "4 tools",
  },
];

const benefits = [
  "No account required",
  "Browser-based tools",
  "Modern Web APIs",
  "Educational resources",
];

const learningTopics = [
  {
    number: "01",
    title: "Encryption vs Hashing",
    description:
      "Learn why encryption is reversible while cryptographic hashing is designed as a one-way operation.",
    path: "/learn/encryption-vs-hashing",
  },
  {
    number: "02",
    title: "AES-256 Explained",
    description:
      "Understand symmetric encryption, AES-256-GCM, keys, nonces, and authentication tags.",
    path: "/learn/aes-256-explained",
  },
  {
    number: "03",
    title: "Password-Based Encryption",
    description:
      "Learn how passwords can be transformed into cryptographic keys using key derivation functions.",
    path: "/learn/password-based-encryption",
  },
  {
    number: "04",
    title: "Salt, IV & Nonce",
    description:
      "Understand why salts and encryption nonces exist and why their security requirements differ.",
    path: "/learn/salt-and-iv",
  },
];

export default function Home() {
  return (
    <>
      <SEO
        title="CipherLab | Modern Browser-Based Cryptography & Security Tools"
        description="CipherLab provides free browser-based tools for encryption, hashing, encoding, key derivation, password generation, random data, and practical cryptography education."
        canonical="/"
      />

      <main className="bg-slate-950 text-slate-200">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[-180px] h-[600px] w-[850px] -translate-x-1/2 rounded-full bg-indigo-600/[0.09] blur-[130px]" />

            <div className="absolute right-[-100px] top-72 h-80 w-80 rounded-full bg-cyan-500/[0.05] blur-[110px]" />

            <div className="absolute bottom-0 left-[-100px] h-72 w-72 rounded-full bg-violet-500/[0.04] blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pb-24 lg:pt-28">
            <div className="mx-auto max-w-5xl text-center">
              {/* Badge */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-indigo-300">
                <Sparkles size={14} />
                Practical cryptography toolkit
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
                Cryptography tools.
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Clear. Practical. Browser-based.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                CipherLab brings together practical tools for encryption,
                hashing, encoding, authentication, password generation, and
                security utilities — together with clear explanations of the
                technology behind them.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/tools/encryption/aes-256-gcm"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/15 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  <LockKeyhole size={17} />
                  Try AES-256-GCM
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/learn/cryptography-basics"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <BookOpen size={17} />
                  Learn Cryptography
                </Link>
              </div>
            </div>

            {/* Trust strip */}
            <div className="mx-auto mt-14 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-sm sm:mt-16 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-slate-300"
                  >
                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-emerald-400"
                    />

                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTRODUCTION
        ====================================================== */}

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-400">
                  What is CipherLab?
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  A practical place to work with cryptography.
                </h2>
              </div>

              <div className="space-y-5 text-sm leading-7 text-slate-300 sm:text-base">
                <p>
                  Cryptography is used throughout modern software to protect
                  information, verify data integrity, authenticate messages,
                  establish keys, and generate secure values.
                </p>

                <p>
                  CipherLab provides interactive browser-based utilities that
                  let you experiment with these concepts while learning what the
                  underlying operations actually do.
                </p>

                <p>
                  The goal is not simply to produce an output. Each tool is
                  accompanied by explanations, examples, security
                  considerations, and guidance about appropriate use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            POPULAR TOOLS
        ====================================================== */}

        <section className="border-t border-white/10 bg-[#090D16]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-400">
                  Start here
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Popular cryptography tools
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  Explore commonly used tools for encryption, hashing, encoding,
                  and generating security-related values.
                </p>
              </div>

              <Link
                to="/tools/encryption/aes-256-gcm"
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 transition hover:text-indigo-300"
              >
                Explore tools
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {popularTools.map((tool) => (
                <ToolCard key={tool.path} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CATEGORIES
        ====================================================== */}

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-400">
                Browse the toolkit
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Tools organized around real security tasks.
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                Choose a category to find tools for the type of cryptographic or
                security operation you want to perform.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.title}
                    to={category.path}
                    className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-indigo-400/25 hover:bg-indigo-500/[0.045]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-indigo-400 transition group-hover:border-indigo-400/20 group-hover:bg-indigo-500/10">
                        <Icon size={20} />
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-slate-400">
                        {category.count}
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-bold text-white">
                      {category.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {category.description}
                    </p>

                    <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                      Browse category
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}

        <section className="border-t border-white/10 bg-[#090D16]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-bold text-emerald-400">
                  <ShieldCheck size={14} />
                  Browser-based processing
                </div>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Work with supported data
                  <br />
                  directly in your browser.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                  Many CipherLab tools are designed so that the selected
                  operation can be performed on your device rather than
                  requiring a remote processing service. This can be useful when
                  experimenting with text, hashes, encodings, and other
                  non-sensitive test data.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <FeaturePoint
                    icon={<Zap size={17} />}
                    title="Immediate results"
                    text="Run supported operations interactively without creating an account."
                  />

                  <FeaturePoint
                    icon={<Code2 size={17} />}
                    title="Web technologies"
                    text="Use browser capabilities such as the Web Crypto API where appropriate."
                  />

                  <FeaturePoint
                    icon={<ShieldCheck size={17} />}
                    title="Privacy-conscious"
                    text="Supported client-side operations can avoid unnecessary server transmission."
                  />

                  <FeaturePoint
                    icon={<BookOpen size={17} />}
                    title="Learn as you use"
                    text="Read explanations alongside the interactive tools."
                  />
                </div>
              </div>

              {/* Visual workflow */}
              <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/20 sm:p-7">
                <div className="flex items-center gap-2 border-b border-white/10 pb-5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                  <span className="text-xs font-bold text-slate-200">
                    CipherLab workflow
                  </span>

                  <span className="ml-auto text-[10px] font-medium text-slate-500">
                    Browser
                  </span>
                </div>

                <div className="py-6">
                  <WorkflowStep
                    number="01"
                    title="Choose a tool"
                    text="Select encryption, hashing, encoding, or another security utility."
                  />

                  <WorkflowLine />

                  <WorkflowStep
                    number="02"
                    title="Provide input"
                    text="Enter test data or other information appropriate for the selected operation."
                  />

                  <WorkflowLine />

                  <WorkflowStep
                    number="03"
                    title="Run the operation"
                    text="The browser performs the supported client-side operation."
                  />

                  <WorkflowLine />

                  <WorkflowStep
                    number="04"
                    title="Understand the result"
                    text="Review the output together with the relevant security explanation."
                  />
                </div>

                <div className="rounded-xl border border-indigo-400/15 bg-indigo-400/[0.06] p-4">
                  <p className="text-xs font-semibold leading-5 text-indigo-300">
                    Important: browser-based processing does not automatically
                    make every operation safe for highly sensitive production
                    data. Always understand the implementation and your threat
                    model before using cryptographic software.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            LEARNING
        ====================================================== */}

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-400">
                  Learn
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Understand the concepts behind the tools.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  Cryptography is easier to use responsibly when you understand
                  what each primitive does, what problem it solves, and what
                  mistakes to avoid.
                </p>
              </div>

              <Link
                to="/learn/cryptography-basics"
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 transition hover:text-indigo-300"
              >
                Browse all guides
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {learningTopics.map((topic) => (
                <LearningCard key={topic.path} {...topic} />
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            SECURITY PRINCIPLES
        ====================================================== */}

        <section className="border-t border-white/10 bg-[#090D16]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-400">
                <ShieldCheck size={22} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-indigo-400">
                Security-conscious design
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Tools are only useful when you understand their limits.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                CipherLab aims to explain not only how a tool works, but also
                where it is appropriate and what its limitations are. Choosing
                an algorithm, key-management strategy, or password mechanism
                should always depend on the actual security requirements of the
                application.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
              <PrincipleCard
                title="Use the right primitive"
                text="Encryption, hashing, encoding, authentication, and key derivation solve different problems."
              />

              <PrincipleCard
                title="Protect your keys"
                text="Strong algorithms cannot compensate for exposed, reused, or poorly managed cryptographic keys."
              />

              <PrincipleCard
                title="Understand the context"
                text="A demonstration or development utility should not automatically be treated as a complete production security system."
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-400">
              <LockKeyhole size={22} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to explore cryptography?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Start with an interactive security tool, or begin with the
              fundamentals and build your understanding step by step.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/tools/encryption/aes-256-gcm"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-400"
              >
                Open AES-256-GCM
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/learn/cryptography-basics"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <BookOpen size={17} />
                Start Learning
              </Link>
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

function FeaturePoint({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-400">
          {icon}
        </div>

        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>

      <p className="mt-3 text-xs leading-6 text-slate-300">{text}</p>
    </div>
  );
}

function WorkflowStep({ number, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-400/[0.06] text-[10px] font-black text-indigo-400">
        {number}
      </div>

      <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>

        <p className="mt-1 text-xs leading-6 text-slate-300">{text}</p>
      </div>
    </div>
  );
}

function WorkflowLine() {
  return <div className="ml-5 h-5 border-l border-white/10" />;
}

function LearningCard({ number, title, description, path }) {
  return (
    <Link
      to={path}
      className="group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-indigo-400/25 hover:bg-indigo-500/[0.04]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-xs font-black text-indigo-400">
        {number}
      </div>

      <div>
        <h3 className="text-base font-bold text-white">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>

        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-indigo-400">
          Read guide
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}

function PrincipleCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-center">
      <h3 className="text-base font-bold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
    </div>
  );
}
