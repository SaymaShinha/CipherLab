import {
  BookOpen,
  Code2,
  Fingerprint,
  Globe2,
  KeyRound,
  Layers3,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import SEO from "../components/SEO.jsx";

export default function About() {
  return (
    <>
      <SEO
        title="About CipherLab | Browser-Based Cryptography & Security Tools"
        description="Learn about CipherLab, a browser-based toolkit for cryptography, hashing, encoding, key derivation, security utilities, and practical security education."
        canonical="/about"
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
                About CipherLab
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Practical cryptography,
                <br />
                explained clearly.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                CipherLab is a browser-based collection of cryptography,
                security, hashing, encoding, and developer tools designed to
                make technical concepts easier to explore and understand.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <HeroBadge icon={<LockKeyhole size={15} />}>
                  Cryptography
                </HeroBadge>

                <HeroBadge icon={<ShieldCheck size={15} />}>Security</HeroBadge>

                <HeroBadge icon={<Code2 size={15} />}>
                  Developer tools
                </HeroBadge>

                <HeroBadge icon={<BookOpen size={15} />}>
                  Learning resources
                </HeroBadge>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTRO
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <SectionLabel>What is CipherLab?</SectionLabel>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                A practical place to explore security concepts
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-400 sm:text-base">
                <p>
                  Cryptography is used throughout modern software. It protects
                  private information, verifies data, authenticates messages,
                  derives keys, and helps applications communicate securely.
                </p>

                <p>
                  However, understanding cryptography can be difficult when
                  algorithms, parameters, keys, salts, nonces, encoding formats,
                  and implementation details are presented without context.
                </p>

                <p>
                  CipherLab brings practical tools and educational explanations
                  together so users can experiment with cryptographic concepts
                  while learning what those operations actually mean.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                <Globe2 size={21} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-white">
                Built for the web
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                CipherLab is designed around modern browser capabilities,
                allowing many operations to be performed directly on the user's
                device.
              </p>

              <div className="mt-6 space-y-3">
                <SmallPoint text="No unnecessary complexity" />
                <SmallPoint text="Accessible from a modern browser" />
                <SmallPoint text="Practical interactive tools" />
                <SmallPoint text="Learning alongside experimentation" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            PRINCIPLES
        ====================================================== */}

        <section className="border-y border-white/10 bg-white/[0.015]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="max-w-2xl">
              <SectionLabel>Our approach</SectionLabel>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built around useful security principles
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-400">
                CipherLab focuses on practical tools, understandable
                explanations, and responsible communication about security.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <PrincipleCard
                icon={<ShieldCheck />}
                title="Security-conscious"
                text="Tools and explanations aim to use appropriate cryptographic primitives and avoid misleading claims about absolute security."
              />

              <PrincipleCard
                icon={<Fingerprint />}
                title="Privacy-conscious"
                text="Where a tool is designed for local browser processing, the operation can take place on the user's device instead of requiring a remote processing service."
              />

              <PrincipleCard
                icon={<BookOpen />}
                title="Education first"
                text="The learning section explains why cryptographic mechanisms exist and how different components work together."
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            TOOL CATEGORIES
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center">
            <SectionLabel>What you'll find</SectionLabel>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Tools for different security tasks
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
              CipherLab brings several related categories together so users can
              move from one security task to another without switching between
              unrelated utilities.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              icon={<LockKeyhole />}
              title="Encryption"
              text="Explore authenticated encryption and other cryptographic constructions."
            />

            <CategoryCard
              icon={<Layers3 />}
              title="Hashing"
              text="Generate cryptographic hashes and work with data integrity concepts."
            />

            <CategoryCard
              icon={<KeyRound />}
              title="Keys & Authentication"
              text="Work with HMAC, PBKDF2, RSA keys, and JWT inspection."
            />

            <CategoryCard
              icon={<Code2 />}
              title="Security Utilities"
              text="Generate passwords, random bytes, identifiers, and other security-related values."
            />
          </div>
        </section>

        {/* =====================================================
            BROWSER PROCESSING
        ====================================================== */}

        <section className="border-y border-white/10 bg-white/[0.015]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionLabel>Browser-based processing</SectionLabel>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                  Designed to use your browser where practical
                </h2>

                <div className="mt-5 space-y-4 text-base leading-8 text-slate-400">
                  <p>
                    Modern browsers provide powerful cryptographic capabilities
                    through APIs such as the Web Crypto API.
                  </p>

                  <p>
                    When a CipherLab tool is specifically designed to process
                    data locally, the operation can happen inside the browser
                    without requiring the input to be uploaded to a CipherLab
                    processing server.
                  </p>

                  <p>
                    This can be particularly useful when experimenting with
                    passwords, plaintext, keys, hashes, or files that users
                    would prefer to keep on their own device.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                  <ShieldCheck size={23} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Local processing principle
                </h3>

                <div className="mt-6 space-y-4">
                  <ProcessPoint
                    number="1"
                    text="Your browser receives the tool and its code."
                  />

                  <ProcessPoint
                    number="2"
                    text="The supported cryptographic operation runs locally."
                  />

                  <ProcessPoint
                    number="3"
                    text="The result is displayed in your browser."
                  />
                </div>

                <p className="mt-6 text-xs leading-6 text-slate-500">
                  Local processing depends on the individual tool and its
                  implementation. Always review the relevant tool's behavior
                  before entering sensitive information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            EDUCATIONAL CONTENT
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
            <div>
              <SectionLabel>Learning resources</SectionLabel>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Learn the concepts behind the tools
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-400">
                A cryptographic utility is more useful when you understand what
                it is doing and why its parameters matter.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="space-y-5">
                <LearningTopic
                  title="Encryption vs hashing"
                  text="Understand why encryption is reversible while cryptographic hashing is designed to be one-way."
                />

                <LearningTopic
                  title="AES-256"
                  text="Learn about symmetric encryption, keys, GCM, nonces, ciphertext, and authentication tags."
                />

                <LearningTopic
                  title="Password-based key derivation"
                  text="Understand PBKDF2, salts, iterations, derived keys, and the difference between key derivation and password storage."
                />

                <LearningTopic
                  title="Salts, IVs and nonces"
                  text="Learn why these values exist and why their requirements depend on the cryptographic construction."
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RESPONSIBLE SECURITY
        ====================================================== */}

        <section className="border-y border-white/10 bg-white/[0.015]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <SectionLabel>Responsible security information</SectionLabel>

                  <h2 className="mt-3 text-2xl font-bold text-white">
                    Strong algorithms still require correct implementation
                  </h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-slate-400 sm:text-base">
                    <p>
                      CipherLab does not present cryptography as magic or
                      describe any algorithm as "unbreakable."
                    </p>

                    <p>
                      Real-world security depends on many factors, including
                      algorithm selection, key management, randomness,
                      parameters, passwords, implementation details, software
                      updates, device security, and the surrounding application
                      architecture.
                    </p>

                    <p>
                      The goal of CipherLab is therefore not simply to provide
                      an output. It is to help users understand the operation
                      and the assumptions behind it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHO IT IS FOR
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center">
            <SectionLabel>Who is CipherLab for?</SectionLabel>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built for curious technical users
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
              CipherLab is intended for anyone who wants to explore cryptography
              through practical tools and clear explanations.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <AudienceCard
              icon={<Code2 />}
              title="Developers"
              text="Quickly experiment with cryptographic operations during development."
            />

            <AudienceCard
              icon={<BookOpen />}
              title="Students"
              text="Explore cryptography concepts through interactive examples."
            />

            <AudienceCard
              icon={<KeyRound />}
              title="Researchers"
              text="Inspect, compare, and experiment with cryptographic values."
            />

            <AudienceCard
              icon={<Sparkles />}
              title="Curious users"
              text="Learn how everyday security mechanisms work."
            />
          </div>
        </section>

        {/* =====================================================
            WHAT CIPHERLAB DOES NOT CLAIM
        ====================================================== */}

        <section className="border-y border-white/10 bg-white/[0.015]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="max-w-3xl">
              <SectionLabel>Important limitations</SectionLabel>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                A tool is not a complete security system
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-400">
                A correctly generated hash, key, password, or ciphertext does
                not automatically make an application secure. Cryptography is
                one part of a much larger security system.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Limitation
                title="Correct algorithms matter"
                text="Different security goals require different cryptographic constructions."
              />

              <Limitation
                title="Key management matters"
                text="A strong encryption algorithm cannot protect a key that is exposed or improperly handled."
              />

              <Limitation
                title="Implementation matters"
                text="Incorrect parameters, nonce reuse, weak randomness, or protocol mistakes can undermine strong algorithms."
              />

              <Limitation
                title="Context matters"
                text="Security recommendations should consider the application's threat model and requirements."
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-400">
            <ShieldCheck size={23} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
            Explore, experiment, and learn
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            CipherLab brings practical security tools and educational resources
            together so you can understand not only the result of a
            cryptographic operation, but also the concepts behind it.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Explore CipherLab
            </a>

            <a
              href="/learn/cryptography-basics"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
            >
              Start learning
            </a>
          </div>
        </section>
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

function PrincipleCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-500">{text}</p>
    </div>
  );
}

function CategoryCard({ icon, title, text }) {
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

function SmallPoint({ text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />

      <span className="text-sm leading-6 text-slate-400">{text}</span>
    </div>
  );
}

function ProcessPoint({ number, text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-xs font-bold text-emerald-400">
        {number}
      </span>

      <span className="text-sm leading-6 text-slate-300">{text}</span>
    </div>
  );
}

function LearningTopic({ title, text }) {
  return (
    <div className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>
    </div>
  );
}

function AudienceCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function Limitation({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>
    </div>
  );
}
