// src/pages/learn/WhatIsPBKDF2.jsx

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  KeyRound,
  Lock,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Timer,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

const concepts = [
  {
    icon: KeyRound,
    title: "Password",
    description:
      "The human-chosen secret or other low-entropy input from which key material is derived.",
  },
  {
    icon: Database,
    title: "Salt",
    description:
      "A random, non-secret value that makes each password derivation distinct.",
  },
  {
    icon: RefreshCw,
    title: "Iterations",
    description:
      "Repeated computational work that increases the cost of deriving a key from a password.",
  },
  {
    icon: SlidersHorizontal,
    title: "Output length",
    description:
      "Determines how much derived key material the application requests from PBKDF2.",
  },
];

export default function WhatIsPBKDF2() {
  return (
    <>
      <SEO
        title="What Is PBKDF2? PBKDF2 Password-Based Key Derivation Explained | CipherLab"
        description="Learn what PBKDF2 is, how password-based key derivation works, what salts and iterations do, how PBKDF2 differs from password hashing and encryption, and how it compares with Argon2id and scrypt."
        canonical="/learn/what-is-pbkdf2"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <KeyTakeaway />

            <ArticleSection number="01" title="What Is PBKDF2?">
              <p>
                PBKDF2 stands for{" "}
                <strong className="text-white">
                  Password-Based Key Derivation Function 2
                </strong>
                . It is a standardized password-based key derivation mechanism
                designed to transform a password or other low-entropy secret
                into cryptographic key material.
              </p>

              <p>
                Passwords are generally much easier to guess than randomly
                generated cryptographic keys. PBKDF2 addresses this problem by
                deliberately making each derivation computationally expensive.
              </p>

              <p>
                The resulting key material can then be used by another
                cryptographic algorithm. For example, an application can derive
                an AES key from a password and use that key with an
                authenticated encryption algorithm.
              </p>

              <InfoBanner>
                PBKDF2 is a <strong>key derivation function</strong>. It is not
                itself an encryption algorithm.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection
              number="02"
              title="Why Do We Need Password-Based Key Derivation?"
            >
              <p>
                Modern encryption algorithms are designed to use keys with
                enough entropy to resist guessing. Human-created passwords often
                do not have that property.
              </p>

              <p>
                If an application directly converted a password into an
                encryption key without an appropriate derivation process, weak
                passwords could be much easier to attack.
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <FlowCard
                  icon={KeyRound}
                  title="Human password"
                  text="Usually memorable and potentially predictable."
                />

                <FlowCard
                  icon={Timer}
                  title="PBKDF2"
                  text="Adds controlled computational work to the derivation."
                />

                <FlowCard
                  icon={Lock}
                  title="Cryptographic key"
                  text="Can be supplied to an appropriate cryptographic primitive."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="03" title="The PBKDF2 Inputs">
              <div className="grid gap-4 sm:grid-cols-2">
                {concepts.map((item) => (
                  <InfoCard key={item.title} {...item} />
                ))}
              </div>

              <p className="mt-6">
                PBKDF2's parameters matter. The password, salt, iteration count,
                pseudorandom function, and requested output length all
                contribute to the resulting derived value.
              </p>
            </ArticleSection>

            <ArticleSection number="04" title="How PBKDF2 Works">
              <p>
                PBKDF2 repeatedly applies a pseudorandom function, or PRF, to
                password-derived material and the salt. The process produces one
                or more blocks of derived output that are combined to form the
                requested key material.
              </p>

              <CodeBox>
                {`Password
   +
Salt
   +
Iteration Count
   +
Pseudorandom Function
   +
Output Length
   ↓
PBKDF2
   ↓
Derived Key Material`}
              </CodeBox>

              <p className="mt-5">
                The repeated work is intentional. An attacker attempting many
                password guesses must perform the derivation for each candidate
                password, increasing the cost of large-scale guessing attacks.
              </p>
            </ArticleSection>

            <ArticleSection number="05" title="What Is the PBKDF2 Salt?">
              <p>
                A salt is an additional value supplied to the derivation
                function. It is normally generated randomly and does not need to
                be kept secret.
              </p>

              <p>
                The important property is that different password-derived values
                should use independent salts. The same password combined with
                different salts produces different derived results.
              </p>

              <CodeBox>
                {`Password + Salt A
       ↓
     PBKDF2
       ↓
    Key A

Password + Salt B
       ↓
     PBKDF2
       ↓
    Key B`}
              </CodeBox>

              <InfoBanner>
                A salt is not a password and it is not an encryption key. Its
                purpose is to make password derivations distinct and defeat
                attacks that depend on precomputed password values.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="06" title="Why Iterations Matter">
              <p>
                PBKDF2 performs its underlying pseudorandom-function operation
                repeatedly. The iteration count controls how much computational
                work is required.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <MetricCard
                  title="Lower cost"
                  text="Faster derivation, but less work for an attacker per password guess."
                />

                <MetricCard
                  title="Higher cost"
                  text="More computational work for both legitimate users and attackers."
                />

                <MetricCard
                  title="Balanced cost"
                  text="The goal is a parameter appropriate for the application's environment."
                />
              </div>

              <p className="mt-6">
                Increasing the iteration count is not a magic substitute for
                choosing an appropriate password-storage design. Applications
                should select parameters according to their threat model,
                platform, performance requirements, and current security
                guidance.
              </p>
            </ArticleSection>

            <ArticleSection number="07" title="What Is the PRF in PBKDF2?">
              <p>
                PRF stands for{" "}
                <strong className="text-white">Pseudorandom Function</strong>.
                PBKDF2 uses a PRF as the underlying keyed primitive during the
                repeated derivation process.
              </p>

              <p>
                In modern implementations, HMAC-based PRFs are commonly used.
                For example, PBKDF2-HMAC-SHA-256 uses HMAC-SHA-256 as its
                pseudorandom function.
              </p>

              <CodeBox>
                {`Password
   +
Salt
   +
Iterations
   +
HMAC-SHA-256 PRF
   ↓
PBKDF2-HMAC-SHA-256
   ↓
Derived Key`}
              </CodeBox>

              <p className="mt-5">
                It is important to specify the complete PBKDF2 construction,
                including the underlying PRF, rather than referring only to
                "PBKDF2" when interoperability matters.
              </p>
            </ArticleSection>

            <ArticleSection number="08" title="PBKDF2 Is Not Encryption">
              <p>
                PBKDF2 does not encrypt or decrypt plaintext. It produces
                derived key material from a password and associated parameters.
              </p>

              <p>
                A common password-based encryption architecture looks like this:
              </p>

              <CodeBox>
                {`Password
   ↓
PBKDF2 + Random Salt
   ↓
Encryption Key
   ↓
AES-256-GCM
   ↓
Ciphertext + Authentication Data`}
              </CodeBox>

              <p className="mt-5">
                The encryption algorithm provides confidentiality and, when an
                authenticated-encryption mode such as AES-GCM is used, integrity
                and authenticity of the protected ciphertext.
              </p>

              <Link
                to="/learn/what-is-aes-gcm"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
              >
                Learn about AES-GCM
                <ArrowRight size={15} />
              </Link>
            </ArticleSection>

            <ArticleSection number="09" title="PBKDF2 for Password Storage">
              <p>
                PBKDF2 can also be used in password authentication systems. In
                that setting, the application does not need to recover the
                original password.
              </p>

              <p>
                Instead, the application stores the parameters and derived
                password-verification value. When a user signs in, the supplied
                password is processed using the stored parameters and the
                resulting value is checked against the stored value.
              </p>

              <CodeBox>
                {`Registration:
Password + Random Salt
        ↓
PBKDF2
        ↓
Stored Verification Value

Login:
Entered Password + Stored Salt
        ↓
PBKDF2
        ↓
Compare with Stored Value`}
              </CodeBox>

              <InfoBanner>
                Password storage and password-based encryption are related but
                different use cases. Password storage generally needs a
                password-hashing or password-verification design, while
                password-based encryption needs a recoverable encryption key.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="10" title="PBKDF2 vs Password Hashing">
              <Comparison
                headers={["Concept", "Purpose", "Recoverable?"]}
                rows={[
                  [
                    "PBKDF2",
                    "Derive key material from a password",
                    "Depends on how the output is used",
                  ],
                  [
                    "Password hashing",
                    "Store a password verifier",
                    "Normally no",
                  ],
                  [
                    "Encryption",
                    "Protect plaintext confidentiality",
                    "Yes, with the appropriate key",
                  ],
                ]}
              />

              <p className="mt-5">
                PBKDF2 is a password-based key derivation mechanism that can be
                used in more than one architecture. Whether its output is
                treated as a password verifier or as encryption key material
                depends on the application's design.
              </p>
            </ArticleSection>

            <ArticleSection number="11" title="PBKDF2 vs Argon2id vs scrypt">
              <Comparison
                headers={[
                  "KDF",
                  "Main characteristic",
                  "Typical consideration",
                ]}
                rows={[
                  [
                    "PBKDF2",
                    "CPU-oriented repeated work",
                    "Broad standardization and compatibility",
                  ],
                  [
                    "scrypt",
                    "Memory-hard password processing",
                    "Designed to increase memory requirements for attackers",
                  ],
                  [
                    "Argon2id",
                    "Modern memory-hard password hashing",
                    "Strong modern choice for password storage when supported",
                  ],
                ]}
              />

              <p className="mt-5">
                These functions are not interchangeable simply because they all
                accept passwords. Their parameters, security properties,
                supported environments, and recommended use cases differ.
              </p>

              <p>
                For new password-storage systems, developers should consult
                current security guidance and choose a password-hashing design
                appropriate to the platform rather than automatically selecting
                PBKDF2.
              </p>
            </ArticleSection>

            <ArticleSection number="12" title="Salt vs Secret Key">
              <Comparison
                headers={["Property", "Salt", "Secret key"]}
                rows={[
                  ["Must be secret?", "No", "Yes"],
                  [
                    "Purpose",
                    "Make derivations unique",
                    "Provide secret cryptographic material",
                  ],
                  [
                    "Can be stored with output?",
                    "Usually yes",
                    "No, not when secrecy is required",
                  ],
                  [
                    "Randomness?",
                    "Should normally be generated appropriately",
                    "Should have strong cryptographic randomness",
                  ],
                ]}
              />

              <p className="mt-5">
                Confusing salts with secret keys is a common cryptography
                mistake. A salt is intentionally non-secret, while a secret key
                is security-critical confidential material.
              </p>
            </ArticleSection>

            <ArticleSection number="13" title="Output Length and Derived Keys">
              <p>
                PBKDF2 allows an application to request a particular amount of
                derived key material. The required length depends on the
                cryptographic algorithm that will consume the output.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <OutputCard
                  title="Short output"
                  text="Useful when a downstream primitive requires a relatively small key."
                />

                <OutputCard
                  title="Longer output"
                  text="Can provide multiple key-sized portions when the design explicitly requires them."
                />

                <OutputCard
                  title="Exact specification"
                  text="The sender and receiver must agree on the requested length for interoperability."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="14" title="Common PBKDF2 Mistakes">
              <div className="space-y-3">
                <Mistake
                  title="Using a fixed salt for every password"
                  text="A single global salt defeats the purpose of giving each password-derived value an independent salt."
                />

                <Mistake
                  title="Treating the salt as a secret"
                  text="Salts are normally stored alongside the derived value. Their security does not depend on secrecy."
                />

                <Mistake
                  title="Using an outdated or arbitrary work factor"
                  text="Iteration parameters should be selected deliberately and reviewed as hardware and security guidance change."
                />

                <Mistake
                  title="Confusing PBKDF2 with encryption"
                  text="PBKDF2 derives key material. It does not provide encryption or decryption by itself."
                />

                <Mistake
                  title="Assuming every password problem needs PBKDF2"
                  text="Password hashing, password-based encryption, and general-purpose key derivation have different requirements."
                />

                <Mistake
                  title="Inventing a custom password scheme"
                  text="Cryptographic constructions should use established standards and well-reviewed libraries rather than custom formulas."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="15" title="Security Checklist">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Generate a fresh, appropriate salt for each password-derived value.",
                  "Use a well-reviewed implementation rather than implementing PBKDF2 from scratch.",
                  "Specify the complete PBKDF2 configuration when interoperability matters.",
                  "Choose a work factor appropriate for the deployment environment.",
                  "Protect passwords and derived encryption keys appropriately.",
                  "Use a suitable password-hashing scheme for password storage.",
                  "Use authenticated encryption when password-derived keys protect confidential data.",
                  "Review parameters periodically as hardware capabilities change.",
                  "Never publish application secrets or master keys in frontend source code.",
                  "Follow current platform and security guidance for cryptographic parameter selection.",
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
                  question="What does PBKDF2 stand for?"
                  answer="PBKDF2 stands for Password-Based Key Derivation Function 2. It is a standardized mechanism for deriving cryptographic key material from a password or other low-entropy secret."
                />

                <FAQ
                  question="Is PBKDF2 encryption?"
                  answer="No. PBKDF2 derives key material. An encryption algorithm such as AES-GCM must be used separately when confidentiality is required."
                />

                <FAQ
                  question="What is a PBKDF2 salt?"
                  answer="A salt is a non-secret value used as an input to the derivation. Using an independent salt for each password-derived value makes identical passwords produce different results."
                />

                <FAQ
                  question="Does the PBKDF2 salt need to be secret?"
                  answer="No. The salt is normally stored alongside the derived value or encryption metadata. Its purpose is uniqueness rather than secrecy."
                />

                <FAQ
                  question="What does the PBKDF2 iteration count do?"
                  answer="It controls the amount of repeated computational work performed during derivation. Higher work factors generally make password guessing more expensive, while also increasing legitimate computation."
                />

                <FAQ
                  question="What is PBKDF2-HMAC-SHA-256?"
                  answer="It is a PBKDF2 configuration that uses HMAC-SHA-256 as the underlying pseudorandom function."
                />

                <FAQ
                  question="Is PBKDF2 good for password storage?"
                  answer="PBKDF2 is a standardized password-based derivation mechanism and can be used for password verification. For new password-storage systems, developers should evaluate current guidance and modern password-hashing alternatives such as Argon2id when supported."
                />

                <FAQ
                  question="Is PBKDF2 better than Argon2id?"
                  answer="There is no universal answer. Argon2id is designed as a modern memory-hard password-hashing function, while PBKDF2 has broad standardization and compatibility. The appropriate choice depends on the specific application and requirements."
                />

                <FAQ
                  question="Can PBKDF2 generate an AES key?"
                  answer="Yes. An application can use PBKDF2 to derive key material of an appropriate length and then use that material as a key for a compatible encryption algorithm, provided the overall construction is designed correctly."
                />

                <FAQ
                  question="Can the same salt be used with different passwords?"
                  answer="A salt does not have to be globally unique across every password, but password-storage systems should normally generate an independent random salt for each stored password-derived value."
                />
              </div>
            </ArticleSection>

            <RelatedResources />

            <CTA
              title="Try PBKDF2 in CipherLab"
              description="Experiment with password-based key derivation and observe how changing the password, salt, PRF, iteration count, and output length changes the derived result."
              to="/tools/authentication-keys/pbkdf2"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_35%),radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold text-indigo-300">
          <KeyRound size={14} />
          Password-Based Key Derivation
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is PBKDF2?
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Learn how PBKDF2 turns passwords into cryptographic key material using
          salts, iteration counts, pseudorandom functions, and configurable
          output lengths.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {[
            "PBKDF2",
            "HMAC-SHA-256",
            "Password Derivation",
            "Salt",
            "Iterations",
            "Key Derivation",
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

function InfoCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-white/20">
      <Icon size={19} className="text-indigo-300" />

      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function FlowCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <Icon size={20} className="text-cyan-300" />

      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function MetricCard({ title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <Timer size={18} className="text-indigo-300" />

      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function OutputCard({ title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <SlidersHorizontal size={18} className="text-cyan-300" />

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
      <table className="w-full min-w-[650px] text-left text-sm">
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
            PBKDF2 deliberately makes password-based derivation more expensive
            by repeatedly applying a pseudorandom function. Salts make
            individual derivations distinct, while the work factor determines
            how much computation is required.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Mistakes / FAQ                                                             */
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
        <KeyRound size={20} className="text-indigo-300" />

        <h2 className="text-xl font-bold text-white">Continue Learning</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <RelatedLink
          title="Cryptography Basics"
          description="Learn the foundations of encryption, hashing, authentication, keys, and encoding."
          to="/learn/cryptography-basics"
        />

        <RelatedLink
          title="What Is AES-GCM?"
          description="Understand authenticated encryption, nonces, authentication tags, and AES-256-GCM."
          to="/learn/what-is-aes-gcm"
        />

        <RelatedLink
          title="Password Hashing vs Encryption"
          description="Understand why password hashing and encryption solve different security problems."
          to="/learn/password-hashing-vs-encryption"
        />

        <RelatedLink
          title="HMAC Explained"
          description="Learn how keyed message authentication works with HMAC and HMAC-SHA-256."
          to="/learn/what-is-hmac"
        />
      </div>
    </section>
  );
}

function RelatedLink({ title, description, to }) {
  return (
    <Link
      to={to}
      className="group rounded-xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-indigo-400/30 hover:bg-white/[0.04]"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>

        <ArrowRight
          size={16}
          className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-indigo-300"
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
        Open PBKDF2 Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
