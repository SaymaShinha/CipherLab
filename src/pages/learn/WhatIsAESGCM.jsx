// src/pages/learn/WhatIsAESGCM.jsx

import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Lock,
  ShieldCheck,
  AlertTriangle,
  Database,
  Fingerprint,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function WhatIsAESGCM() {
  return (
    <>
      <SEO
        title="What Is AES-GCM? AES-256-GCM Explained | CipherLab"
        description="Learn how AES-GCM and AES-256-GCM work, including encryption, authentication tags, nonces, AAD, password-based keys, nonce reuse risks, and practical security considerations."
        canonical="/learn/what-is-aes-gcm"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <KeyTakeaway />

            <ArticleSection number="01" title="What Is AES-GCM?">
              <p>
                AES-GCM is an{" "}
                <strong className="text-white">
                  authenticated encryption mode
                </strong>{" "}
                built using the Advanced Encryption Standard (AES) block cipher.
              </p>

              <p>
                The important feature of GCM is that it provides two forms of
                protection at the same time:{" "}
                <strong className="text-white">confidentiality</strong> and{" "}
                <strong className="text-white">integrity/authenticity</strong>.
              </p>

              <p>
                Confidentiality means an attacker who obtains the ciphertext
                should not be able to determine the original plaintext without
                the encryption key. Integrity protection means that an attacker
                cannot silently modify the protected message without the
                modification being detected during verification.
              </p>

              <InfoBanner>
                AES-GCM is commonly described as an{" "}
                <strong>AEAD construction</strong>: Authenticated Encryption
                with Associated Data.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="02" title="What Does AES-256 Mean?">
              <p>
                AES is a symmetric block cipher standardized as the Advanced
                Encryption Standard. AES supports three key sizes:
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <FeatureCard title="AES-128" text="128-bit encryption key" />
                <FeatureCard title="AES-192" text="192-bit encryption key" />
                <FeatureCard title="AES-256" text="256-bit encryption key" />
              </div>

              <p>
                AES-256 simply means that AES is being used with a{" "}
                <strong className="text-white">256-bit key</strong>. The number
                does not describe the size of the plaintext or ciphertext.
              </p>

              <p>
                AES-256-GCM therefore means AES with a 256-bit key operating in
                Galois/Counter Mode.
              </p>
            </ArticleSection>

            <ArticleSection
              number="03"
              title="What Security Does AES-GCM Provide?"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <InfoCard
                  icon={Lock}
                  title="Confidentiality"
                  text="The plaintext is transformed into ciphertext that should not reveal the protected data without the key."
                />

                <InfoCard
                  icon={ShieldCheck}
                  title="Integrity"
                  text="Authentication detects unauthorized modifications to protected data."
                />

                <InfoCard
                  icon={KeyRound}
                  title="Secret key"
                  text="The cryptographic operations depend on a secret encryption key."
                />

                <InfoCard
                  icon={Fingerprint}
                  title="Authentication"
                  text="The authentication tag allows the recipient to verify that protected data is authentic."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="04" title="How AES-GCM Works">
              <p>
                At a high level, AES-GCM takes a plaintext message, a secret
                key, and a unique nonce. It produces ciphertext and an
                authentication tag.
              </p>

              <CodeBox>
                {`Plaintext
   +
Secret Key
   +
Unique Nonce
   +
Optional AAD
   ↓
 AES-256-GCM
   ↓
Ciphertext + Authentication Tag`}
              </CodeBox>

              <p className="mt-5">
                During decryption, the recipient provides the ciphertext,
                encryption key, nonce, authentication tag, and any required
                associated data. The authentication information is verified
                before the application accepts the resulting plaintext.
              </p>

              <InfoBanner>
                The authentication tag is not a second encryption layer. It is
                verification data used to detect unauthorized changes.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="05" title="What Is a GCM Nonce?">
              <p>
                A nonce is a value used by GCM as part of the encryption
                process. In common AES-GCM usage, a{" "}
                <strong className="text-white">96-bit nonce</strong> is the
                conventional choice.
              </p>

              <p>
                A nonce generally does not need to be secret. The critical
                requirement is that it must be{" "}
                <strong className="text-white">
                  unique for a given encryption key
                </strong>
                .
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <UseCard
                  icon={RefreshCw}
                  title="Unique nonce"
                  text="Each encryption operation should use a nonce that has not previously been used with the same key."
                />

                <UseCard
                  icon={AlertTriangle}
                  title="Nonce reuse"
                  text="Reusing a GCM nonce with the same key can seriously compromise the security guarantees of the construction."
                  warning
                />
              </div>

              <p className="mt-5">
                This is one of the most important operational requirements when
                implementing AES-GCM. A mathematically strong encryption
                algorithm can still become unsafe when its nonce-management
                rules are violated.
              </p>
            </ArticleSection>

            <ArticleSection number="06" title="What Is the Authentication Tag?">
              <p>
                AES-GCM produces an authentication tag along with the
                ciphertext. The tag allows the recipient to verify that the
                protected data has not been modified.
              </p>

              <p>
                Consider an attacker who changes even a small portion of the
                ciphertext. During decryption, the calculated authentication
                value should no longer match the supplied tag.
              </p>

              <CodeBox>
                {`Ciphertext + Tag
       ↓
Authentication Verification
       ↓
   ┌───────────────┐
   │ Valid?        │
   └───────────────┘
      ↓       ↓
    YES       NO
     ↓         ↓
Plaintext    Reject`}
              </CodeBox>

              <p className="mt-5">
                Applications should treat authentication failure as a failed
                decryption operation. They should not silently return
                unauthenticated or partially decrypted data.
              </p>
            </ArticleSection>

            <ArticleSection number="07" title="What Is AAD?">
              <p>
                AAD stands for{" "}
                <strong className="text-white">
                  Additional Authenticated Data
                </strong>
                .
              </p>

              <p>
                AAD allows an application to authenticate information without
                encrypting that information.
              </p>

              <p>
                For example, an encrypted message could contain a visible
                metadata field such as a message identifier, protocol version,
                or record type. That metadata may need integrity protection even
                though it does not need confidentiality.
              </p>

              <CodeBox>
                {`Visible Metadata ──────┐
                       │
                       ├──→ Authentication
                       │
Plaintext + Key + Nonce ─→ Encryption
                              ↓
                    Ciphertext + Tag`}
              </CodeBox>

              <InfoBanner>
                AAD is authenticated but not encrypted. Anyone who can observe
                the message may still be able to see the AAD.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="08" title="AES-GCM vs AES-CBC">
              <Comparison
                rows={[
                  [
                    "AES-GCM",
                    "Authenticated encryption",
                    "Confidentiality + integrity",
                  ],
                  [
                    "AES-CBC",
                    "Encryption mode",
                    "Confidentiality only by itself",
                  ],
                ]}
              />

              <p className="mt-5">
                AES-CBC is an older block-cipher mode that does not provide
                authentication by itself. Systems using CBC generally need a
                separate mechanism to authenticate the ciphertext.
              </p>

              <p>
                AES-GCM combines encryption and authentication into an
                authenticated-encryption design, which can make it a better
                choice for many modern application protocols when implemented
                correctly.
              </p>
            </ArticleSection>

            <ArticleSection number="09" title="AES-GCM Is Not a Password Hash">
              <p>Encryption and password hashing solve different problems.</p>

              <Comparison
                headers={["Property", "AES-GCM", "Password Hashing"]}
                rows={[
                  [
                    "Purpose",
                    "Protect data confidentiality and integrity",
                    "Store/verify passwords without storing plaintext passwords",
                  ],
                  [
                    "Can plaintext be recovered?",
                    "Yes, with the correct key",
                    "Normally no",
                  ],
                  [
                    "Typical algorithms",
                    "AES-GCM",
                    "Argon2id, scrypt, bcrypt, PBKDF2",
                  ],
                  ["Designed for passwords?", "No", "Yes"],
                ]}
              />

              <p className="mt-5">
                If an application starts with a human password and needs an
                encryption key, it should normally use an appropriate{" "}
                <strong className="text-white">
                  password-based key derivation function
                </strong>{" "}
                rather than treating the password itself as an AES key.
              </p>

              <Link
                to="/learn/password-hashing-vs-encryption"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
              >
                Password Hashing vs Encryption
                <ArrowRight size={15} />
              </Link>
            </ArticleSection>

            <ArticleSection number="10" title="Worked Example">
              <p>Imagine an application wants to encrypt the message:</p>

              <div className="rounded-xl border border-white/10 bg-slate-950/70 p-5 font-mono text-sm text-cyan-300">
                "Meet me at 18:30"
              </div>

              <p>A simplified AES-GCM operation could conceptually contain:</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <DataRow label="Plaintext" value="Meet me at 18:30" />
                <DataRow label="Key" value="Secret 256-bit key" />
                <DataRow label="Nonce" value="Unique per encryption" />
                <DataRow label="AAD" value="Optional authenticated metadata" />
              </div>

              <p className="mt-5">
                The resulting package would contain enough information for a
                legitimate recipient to perform authenticated decryption,
                typically including the nonce, ciphertext, and authentication
                tag. The exact serialization format depends on the application.
              </p>

              <InfoBanner>
                The nonce does not need to be hidden. The encryption key does.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="11" title="Common AES-GCM Mistakes">
              <div className="space-y-3">
                <Mistake
                  title="Reusing a nonce"
                  text="Using the same nonce with the same key can destroy important GCM security guarantees."
                />

                <Mistake
                  title="Using the password directly"
                  text="Human passwords generally should not be used directly as AES keys."
                />

                <Mistake
                  title="Ignoring authentication failure"
                  text="Applications should reject data when authentication verification fails."
                />

                <Mistake
                  title="Inventing a custom format"
                  text="Cryptographic primitives should be used through well-reviewed constructions and established formats."
                />

                <Mistake
                  title="Exposing encryption keys"
                  text="A strong cipher cannot protect data if the secret key is easily accessible to attackers."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="12" title="AES-GCM Security Checklist">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Use a strong randomly generated encryption key.",
                  "Use a unique nonce for every encryption under the same key.",
                  "Prefer the conventional 96-bit nonce format when appropriate.",
                  "Verify the authentication tag before accepting plaintext.",
                  "Keep encryption keys separate from ciphertext.",
                  "Use a suitable KDF when deriving keys from passwords.",
                  "Authenticate important metadata using AAD when appropriate.",
                  "Use established cryptographic libraries instead of implementing AES yourself.",
                  "Do not design a custom cryptographic protocol without expert review.",
                  "Plan for secure key storage, rotation, and recovery.",
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

            <ArticleSection number="13" title="Frequently Asked Questions">
              <div className="space-y-4">
                <FAQ
                  question="Is AES-256-GCM secure?"
                  answer="AES-256-GCM is a widely used authenticated-encryption construction when implemented correctly. Security still depends on correct key management, nonce handling, authentication verification, and implementation."
                />

                <FAQ
                  question="Does AES-GCM hide the nonce?"
                  answer="Normally no. The nonce generally does not need to be secret. Its uniqueness under a given key is the critical requirement."
                />

                <FAQ
                  question="Can I reuse an AES-GCM nonce?"
                  answer="You should not reuse a nonce with the same AES-GCM key. Nonce reuse can seriously undermine the security of GCM."
                />

                <FAQ
                  question="Does AES-GCM hash passwords?"
                  answer="No. AES-GCM is an authenticated-encryption construction, not a password-hashing algorithm. Passwords should be handled with password hashing or an appropriate password-based key derivation function depending on the application's goal."
                />

                <FAQ
                  question="What happens if the authentication tag is wrong?"
                  answer="The authentication check should fail and the application should reject the protected message rather than treating the decrypted output as trustworthy."
                />

                <FAQ
                  question="What is the difference between AES-GCM and AES-256-GCM?"
                  answer="AES-GCM describes AES operating in Galois/Counter Mode. AES-256-GCM specifically states that the AES key has a length of 256 bits."
                />
              </div>
            </ArticleSection>

            <RelatedResources />

            <CTA
              title="Try AES-256-GCM"
              description="Experiment with authenticated encryption using CipherLab's browser-based AES-256-GCM tool."
              to="/tools/encryption/aes-256-gcm"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="text-xs font-medium text-slate-500 transition hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
          <ShieldCheck size={14} />
          Authenticated Encryption
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is AES-GCM?
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Learn how AES-256-GCM provides encryption and authentication, why
          nonces matter, how authentication tags detect tampering, and what
          developers should know before using AES-GCM in real applications.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {["AES-256", "GCM", "AEAD", "Nonces", "Authentication Tags"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400"
              >
                {tag}
              </span>
            ),
          )}
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

      <div className="prose prose-invert mt-5 max-w-none prose-p:text-slate-400 prose-p:leading-8 prose-li:text-slate-400 prose-strong:text-white">
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

function InfoCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-white/20">
      <Icon size={19} className="text-cyan-300" />

      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <div className="font-mono text-sm font-bold text-indigo-300">{title}</div>

      <p className="mt-2 text-sm text-slate-500">{text}</p>
    </div>
  );
}

function UseCard({ icon: Icon, title, text, warning = false }) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        warning
          ? "border-amber-400/20 bg-amber-400/[0.05]"
          : "border-white/10 bg-slate-950/60"
      }`}
    >
      <Icon
        size={19}
        className={warning ? "text-amber-300" : "text-emerald-300"}
      />

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

function Comparison({ headers = ["Mode", "Type", "Protection"], rows }) {
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

function DataRow({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-2 text-sm font-medium text-slate-300">{value}</div>
    </div>
  );
}

function Mistake({ title, text }) {
  return (
    <div className="flex gap-4 rounded-xl border border-red-400/10 bg-red-400/[0.03] p-5">
      <AlertTriangle size={19} className="mt-0.5 shrink-0 text-amber-300" />

      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
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

          <span className="text-slate-600 transition group-open:rotate-45">
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

function InfoBanner({ children }) {
  return (
    <div className="mt-5 rounded-xl border border-indigo-400/20 bg-indigo-400/[0.05] p-5 text-sm leading-7 text-indigo-200">
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Key Takeaway                                                               */
/* -------------------------------------------------------------------------- */

function KeyTakeaway() {
  return (
    <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-6 sm:p-8">
      <div className="flex gap-4">
        <ShieldCheck size={24} className="mt-0.5 shrink-0 text-emerald-300" />

        <div>
          <h2 className="text-lg font-bold text-white">Key takeaway</h2>

          <p className="mt-2 text-sm leading-7 text-slate-400">
            AES-GCM is an authenticated-encryption construction that protects
            confidentiality and detects unauthorized modification. Its security
            depends not only on AES itself, but also on correct key management,
            unique nonces, authentication verification, and safe implementation.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Related Resources                                                          */
/* -------------------------------------------------------------------------- */

function RelatedResources() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <Database size={20} className="text-indigo-300" />

        <h2 className="text-xl font-bold text-white">Continue Learning</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <RelatedLink
          title="Cryptography Basics"
          description="Understand encryption, hashing, keys, and cryptographic terminology."
          to="/learn/cryptography-basics"
        />

        <RelatedLink
          title="Password Hashing vs Encryption"
          description="Learn why password hashing and encryption are different security mechanisms."
          to="/learn/password-hashing-vs-encryption"
        />

        <RelatedLink
          title="Password-Based Encryption"
          description="Understand how passwords can be transformed into cryptographic keys."
          to="/learn/password-based-encryption"
        />

        <RelatedLink
          title="Encryption Tools"
          description="Explore CipherLab's browser-based encryption utilities."
          to="/tools/encryption"
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
        Open AES-256-GCM
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
