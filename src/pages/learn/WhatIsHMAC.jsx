// src/pages/learn/WhatIsHMAC.jsx

import {
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  AlertTriangle,
  Database,
  Globe2,
  RefreshCw,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

const concepts = [
  {
    icon: KeyRound,
    title: "Secret key",
    description:
      "HMAC requires a shared secret key. Only parties that possess the key should be able to generate valid authentication codes.",
  },
  {
    icon: Fingerprint,
    title: "Message",
    description:
      "The message or data is processed together with the secret key to produce a fixed-length authentication code.",
  },
  {
    icon: ShieldCheck,
    title: "Verification",
    description:
      "A recipient with the same secret key can independently calculate the expected HMAC and verify the received message.",
  },
];

export default function WhatIsHMAC() {
  return (
    <>
      <SEO
        title="What Is HMAC? HMAC-SHA-256 Explained | CipherLab"
        description="Learn what HMAC is, how HMAC-SHA-256 works, why a secret key is required, how message authentication works, common API and webhook uses, and important HMAC security practices."
        canonical="/learn/what-is-hmac"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <KeyTakeaway />

            <ArticleSection number="01" title="What Is HMAC?">
              <p>
                HMAC stands for{" "}
                <strong className="text-white">
                  Hash-based Message Authentication Code
                </strong>
                . It is a cryptographic construction that combines a
                cryptographic hash function with a secret key to authenticate
                data.
              </p>

              <p>
                HMAC helps a recipient determine whether a message was produced
                by someone who possesses the shared secret key and whether the
                authenticated data was modified after the HMAC was generated.
              </p>

              <p>
                Common constructions include HMAC-SHA-256, HMAC-SHA-384, and
                HMAC-SHA-512. The hash function and key together determine the
                resulting authentication code.
              </p>

              <InfoBanner>
                HMAC provides authentication and integrity. It does{" "}
                <strong>not encrypt</strong> the underlying message.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="02" title="The Three Main Parts of HMAC">
              <div className="grid gap-4 md:grid-cols-3">
                {concepts.map((item) => (
                  <ConceptCard key={item.title} {...item} />
                ))}
              </div>

              <p className="mt-6">
                The sender and receiver must have access to the same secret key.
                The message itself does not have to be secret, but an attacker
                must not obtain the secret key if the authentication guarantee
                is to remain meaningful.
              </p>
            </ArticleSection>

            <ArticleSection number="03" title="How HMAC Works">
              <p>
                HMAC is not simply a normal hash with the secret key appended to
                the message. It uses a defined construction involving the hash
                function, a normalized key, and inner and outer padding.
              </p>

              <CodeBox>
                {`Secret Key
    ↓
Key Processing
    ↓
Inner / Outer Padding
    ↓
Message + Key Material
    ↓
Cryptographic Hash
    ↓
HMAC Output`}
              </CodeBox>

              <p className="mt-5">
                The standardized construction is important because simply
                inventing a formula such as{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-300">
                  SHA-256(key + message)
                </code>{" "}
                is not equivalent to using HMAC.
              </p>
            </ArticleSection>

            <ArticleSection number="04" title="HMAC-SHA-256 Example">
              <p>
                HMAC-SHA-256 uses SHA-256 as the underlying cryptographic hash
                function.
              </p>

              <CodeBox>
                {`Message + Secret Key
        ↓
   HMAC-SHA-256
        ↓
256-bit Authentication Code`}
              </CodeBox>

              <p className="mt-5">
                Imagine an API request contains information such as an account
                identifier, amount, and timestamp. The sender can authenticate
                the request by calculating an HMAC over a precisely defined
                representation of those values.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <DataRow
                  label="Message"
                  value="amount=250&account=12345&timestamp=..."
                />

                <DataRow label="Secret" value="Shared private API secret" />

                <DataRow label="Algorithm" value="HMAC-SHA-256" />

                <DataRow label="Result" value="Authentication code" />
              </div>

              <p className="mt-5">
                The receiving system independently calculates the expected HMAC
                using its copy of the secret. If the values match, the message
                can pass the authentication check, subject to the application's
                other security requirements.
              </p>
            </ArticleSection>

            <ArticleSection number="05" title="HMAC Verification">
              <p>
                Verification is the process of checking whether the received
                message and supplied authentication code are consistent with the
                shared secret.
              </p>

              <CodeBox>
                {`Received Message
       +
Received HMAC
       +
Shared Secret
       ↓
Recalculate HMAC
       ↓
Compare Safely
   ↓          ↓
 Match      Mismatch
   ↓          ↓
Accept      Reject`}
              </CodeBox>

              <p className="mt-5">
                Applications should use an appropriate constant-time comparison
                mechanism when comparing authentication codes in security
                sensitive contexts. This helps avoid certain timing-based
                side-channel risks.
              </p>

              <InfoBanner>
                A matching HMAC does not automatically mean that every aspect of
                a request is safe. Applications may also need replay protection,
                timestamps, authorization checks, input validation, and secure
                transport.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="06" title="HMAC vs Ordinary Hashing">
              <Comparison
                headers={["Technology", "Purpose", "Secret key"]}
                rows={[
                  ["SHA-256", "General-purpose cryptographic hash", "No"],
                  ["HMAC-SHA-256", "Keyed message authentication", "Yes"],
                  ["SHA-512", "General-purpose cryptographic hash", "No"],
                  ["HMAC-SHA-512", "Keyed message authentication", "Yes"],
                ]}
              />

              <p className="mt-5">
                A normal cryptographic hash does not prove that the person who
                generated the hash possessed a secret. Anyone who has the
                message can calculate its SHA-256 hash.
              </p>

              <p>
                HMAC adds a secret key. An attacker who knows only the message
                but does not possess the key should not be able to generate a
                valid HMAC.
              </p>
            </ArticleSection>

            <ArticleSection number="07" title="HMAC vs Encryption">
              <Comparison
                headers={["Property", "HMAC", "Encryption"]}
                rows={[
                  [
                    "Primary goal",
                    "Authentication and integrity",
                    "Confidentiality",
                  ],
                  ["Hides the message?", "No", "Yes"],
                  [
                    "Uses a secret?",
                    "Yes",
                    "Usually yes for symmetric encryption",
                  ],
                  [
                    "Recover original plaintext?",
                    "Not applicable",
                    "Yes, with appropriate key",
                  ],
                ]}
              />

              <p className="mt-5">
                If an application needs to keep data secret, HMAC by itself is
                not sufficient. Encryption is required for confidentiality.
              </p>

              <p>
                Some systems need both confidentiality and authentication. In
                those cases, an authenticated-encryption construction such as
                AES-GCM can provide both properties in one construction.
              </p>

              <Link
                to="/learn/what-is-aes-gcm"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
              >
                Learn about AES-GCM
                <ArrowRight size={15} />
              </Link>
            </ArticleSection>

            <ArticleSection number="08" title="HMAC vs Digital Signatures">
              <p>
                HMAC and digital signatures can both authenticate data, but they
                use different trust models.
              </p>

              <Comparison
                headers={["Property", "HMAC", "Digital Signature"]}
                rows={[
                  ["Key model", "Shared secret", "Private/public key pair"],
                  ["Verification key", "Same secret key", "Public key"],
                  ["Public verification", "No", "Yes"],
                  [
                    "Typical examples",
                    "HMAC-SHA-256",
                    "Ed25519, ECDSA, RSA signatures",
                  ],
                ]}
              />

              <p className="mt-5">
                HMAC is useful when the communicating parties can securely share
                a secret. Digital signatures are useful when verification needs
                to be performed using a public key rather than distributing a
                shared secret.
              </p>
            </ArticleSection>

            <ArticleSection number="09" title="Common HMAC Uses">
              <div className="grid gap-4 sm:grid-cols-2">
                <UseCard
                  icon={Globe2}
                  title="API Authentication"
                  text="Authenticate requests between systems that share a secret key."
                />

                <UseCard
                  icon={RefreshCw}
                  title="Webhook Verification"
                  text="Verify that incoming webhook data was generated by a party possessing the expected secret."
                />

                <UseCard
                  icon={Database}
                  title="Data Integrity"
                  text="Detect unauthorized modification of authenticated messages or records."
                />

                <UseCard
                  icon={UserCheck}
                  title="Token Authentication"
                  text="Authenticate structured token data in systems where a shared secret is appropriate."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="10" title="HMAC for API Requests">
              <p>
                A common API pattern is to construct a canonical representation
                of a request and calculate an HMAC over that representation.
              </p>

              <CodeBox>
                {`HTTP Method
    +
Request Path
    +
Timestamp
    +
Request Body
    ↓
Canonical Message
    +
Secret Key
    ↓
HMAC-SHA-256
    ↓
Request Signature`}
              </CodeBox>

              <p className="mt-5">
                The server reconstructs the same canonical message and
                calculates the expected HMAC. Both sides must agree exactly on
                how the request is serialized, because even a small difference
                in the authenticated bytes produces a different result.
              </p>

              <InfoBanner>
                A robust API authentication scheme should also consider replay
                attacks. A valid HMAC does not by itself guarantee that a
                request is fresh.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="11" title="HMAC for Webhooks">
              <p>
                Webhook providers often send data to a URL controlled by another
                application. The receiving application needs a way to determine
                whether the incoming request was generated by the expected
                provider.
              </p>

              <CodeBox>
                {`Webhook Body
     +
Shared Webhook Secret
     ↓
HMAC-SHA-256
     ↓
Signature

Receiver:
Body + Secret
     ↓
Expected Signature
     ↓
Compare with received signature`}
              </CodeBox>

              <p className="mt-5">
                The exact signature format varies between services. Developers
                should follow the provider's documented signing and verification
                procedure rather than inventing a custom scheme.
              </p>
            </ArticleSection>

            <ArticleSection number="12" title="What HMAC Does Not Provide">
              <div className="space-y-3">
                <Limitation
                  title="No confidentiality"
                  text="HMAC does not encrypt the message. Anyone who can access the message can normally read it."
                />

                <Limitation
                  title="No public verification"
                  text="Because the verification party needs the shared secret, HMAC is not equivalent to a public-key digital signature."
                />

                <Limitation
                  title="No automatic replay protection"
                  text="An attacker may be able to replay a valid authenticated message unless the protocol includes freshness controls."
                />

                <Limitation
                  title="No protection after key compromise"
                  text="If an attacker obtains the secret key, they may be able to generate valid HMACs."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="13" title="HMAC Security Considerations">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Use a strong randomly generated secret key.",
                  "Keep HMAC secrets out of public frontend code.",
                  "Store secrets using appropriate server-side secret management.",
                  "Use a modern cryptographic hash such as SHA-256 or SHA-512.",
                  "Use constant-time comparison where appropriate.",
                  "Define exactly which bytes are authenticated.",
                  "Use timestamps, nonces, or sequence values when replay protection is required.",
                  "Protect secrets during transmission and storage.",
                  "Rotate compromised or unnecessarily long-lived secrets.",
                  "Follow established protocol and provider specifications instead of inventing custom constructions.",
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

            <ArticleSection number="14" title="Common HMAC Mistakes">
              <div className="space-y-3">
                <Mistake
                  title="Putting the secret in frontend JavaScript"
                  text="A secret embedded in client-side JavaScript should be considered exposed to users and attackers. Server-held secrets are required when the secret must remain confidential."
                />

                <Mistake
                  title="Hashing without a secret"
                  text="A plain SHA-256 hash is not a substitute for HMAC when the goal is keyed message authentication."
                />

                <Mistake
                  title="Changing the authenticated message"
                  text="The sender and receiver must authenticate exactly the same byte representation. Different serialization or canonicalization produces a different HMAC."
                />

                <Mistake
                  title="Using HMAC as encryption"
                  text="HMAC does not hide data. Use authenticated encryption or another appropriate encryption design when confidentiality is required."
                />

                <Mistake
                  title="Ignoring replay attacks"
                  text="A valid HMAC can still be replayed if the protocol does not include appropriate freshness controls."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="15" title="Frequently Asked Questions">
              <div className="space-y-4">
                <FAQ
                  question="What does HMAC stand for?"
                  answer="HMAC stands for Hash-based Message Authentication Code. It combines a cryptographic hash function with a secret key to authenticate data."
                />

                <FAQ
                  question="Is HMAC encryption?"
                  answer="No. HMAC does not encrypt or hide the message. It provides authentication and integrity."
                />

                <FAQ
                  question="Is HMAC the same as SHA-256?"
                  answer="No. SHA-256 is a cryptographic hash function. HMAC-SHA-256 is a keyed authentication construction that uses SHA-256 internally."
                />

                <FAQ
                  question="Does HMAC require a secret key?"
                  answer="Yes. The shared secret is fundamental to HMAC's authentication property."
                />

                <FAQ
                  question="Can anyone verify an HMAC?"
                  answer="Normally, verification requires access to the same secret key. This is different from a digital signature, where a public key can be distributed for verification."
                />

                <FAQ
                  question="Does HMAC prevent replay attacks?"
                  answer="Not by itself. A protocol generally needs timestamps, nonces, sequence numbers, or another freshness mechanism when replay protection is required."
                />

                <FAQ
                  question="Which is better, HMAC-SHA-256 or HMAC-SHA-512?"
                  answer="Both are established HMAC constructions. The appropriate choice depends on the application's protocol, platform, compatibility requirements, and security design."
                />

                <FAQ
                  question="Can HMAC be used to encrypt a password?"
                  answer="HMAC is not a password-encryption mechanism. Password storage should normally use a password hashing function such as Argon2id, scrypt, bcrypt, or an appropriate standardized password-based construction."
                />
              </div>
            </ArticleSection>

            <RelatedResources />

            <CTA
              title="Try HMAC in CipherLab"
              description="Generate HMAC values directly in your browser and explore the difference between ordinary hashing and keyed message authentication."
              to="/tools/authentication-keys/hmac"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
          <LockKeyhole size={14} />
          Message Authentication
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is HMAC?
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Learn how Hash-based Message Authentication Codes work, how
          HMAC-SHA-256 authenticates messages, and how HMAC differs from
          ordinary hashing, encryption, and digital signatures.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {[
            "HMAC",
            "HMAC-SHA-256",
            "Message Integrity",
            "API Authentication",
            "Webhooks",
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

function ConceptCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20">
      <Icon size={20} className="text-cyan-300" />

      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
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

function DataRow({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-2 break-words text-sm font-medium text-slate-300">
        {value}
      </div>
    </div>
  );
}

function Comparison({ headers = ["Technology", "Purpose", "Key"], rows }) {
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

function UseCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-white/20">
      <Icon size={18} className="text-cyan-300" />

      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function Limitation({ title, text }) {
  return (
    <div className="flex gap-4 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-5">
      <AlertTriangle size={19} className="mt-0.5 shrink-0 text-amber-300" />

      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function Mistake({ title, text }) {
  return (
    <div className="rounded-xl border border-red-400/10 bg-red-400/[0.025] p-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
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
    <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6 sm:p-8">
      <div className="flex gap-4">
        <ShieldCheck size={24} className="mt-0.5 shrink-0 text-emerald-300" />

        <div>
          <h2 className="text-lg font-bold text-white">Key takeaway</h2>

          <p className="mt-2 text-sm leading-7 text-slate-400">
            HMAC uses a secret key together with a cryptographic hash function
            to authenticate data. It can help detect unauthorized modification
            and establish that a valid HMAC was generated by someone possessing
            the secret, but it does not encrypt the message.
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
        <Fingerprint size={20} className="text-indigo-300" />

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
          title="HMAC Tool"
          description="Generate HMAC values in your browser and experiment with keyed message authentication."
          to="/tools/authentication-keys/hmac"
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
        Open HMAC Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
