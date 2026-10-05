// src/pages/learn/WhatIsRSA.jsx

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileKey2,
  KeyRound,
  LockKeyhole,
  Network,
  ShieldCheck,
  Signature,
  UnlockKeyhole,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

const keyConcepts = [
  {
    icon: LockKeyhole,
    title: "Public key",
    description:
      "The public key can be distributed to other parties. Depending on the RSA scheme, it can be used to encrypt data or verify a digital signature.",
  },
  {
    icon: KeyRound,
    title: "Private key",
    description:
      "The private key must remain confidential. It is used for operations such as RSA decryption or creating digital signatures.",
  },
  {
    icon: ShieldCheck,
    title: "Mathematical relationship",
    description:
      "The public and private keys are mathematically related, but recovering the private key from a properly generated public key should be computationally impractical.",
  },
];

export default function WhatIsRSA() {
  return (
    <>
      <SEO
        title="What Is RSA? RSA Encryption, Keys & Digital Signatures Explained | CipherLab"
        description="Learn what RSA is, how public and private keys work, RSA-OAEP encryption, RSA-PSS signatures, hybrid encryption, key sizes, common uses, limitations, and RSA security best practices."
        canonical="/learn/what-is-rsa"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <KeyTakeaway />

            <ArticleSection number="01" title="What Is RSA?">
              <p>
                RSA is a{" "}
                <strong className="text-white">
                  public-key cryptographic algorithm
                </strong>{" "}
                named after its inventors: Ron Rivest, Adi Shamir, and Leonard
                Adleman.
              </p>

              <p>
                Unlike symmetric encryption, where the same secret key is used
                for both sides of the cryptographic operation, RSA uses a pair
                of mathematically related keys: a public key and a private key.
              </p>

              <p>
                RSA has historically been used for public-key encryption, key
                establishment, and digital signatures. In modern systems, the
                exact RSA scheme matters: RSA-OAEP is used for encryption, while
                RSA-PSS is a standardized scheme for signatures.
              </p>

              <InfoBanner>
                "RSA" by itself does not completely describe a secure
                construction. The padding and signature scheme are important
                parts of a real RSA implementation.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="02" title="Public Key vs Private Key">
              <div className="grid gap-4 md:grid-cols-3">
                {keyConcepts.map((item) => (
                  <KeyCard key={item.title} {...item} />
                ))}
              </div>

              <p className="mt-6">
                The public key is intended to be shared. The private key is the
                sensitive component that must be protected from unauthorized
                access.
              </p>
            </ArticleSection>

            <ArticleSection number="03" title="How RSA Key Pairs Work">
              <p>
                RSA key generation creates two related keys. The security of RSA
                depends on mathematical properties of large integers and the
                difficulty of certain number-theoretic problems when properly
                sized keys are used.
              </p>

              <CodeBox>
                {`RSA Key Generation
        ↓
Public Key  +  Private Key
        ↓
   Mathematically Related
        ↓
Public key → Can be shared
Private key → Must remain secret`}
              </CodeBox>

              <p className="mt-5">
                Applications normally rely on established cryptographic
                libraries to generate RSA keys. Developers should not attempt to
                implement RSA key generation mathematics themselves for
                production security.
              </p>
            </ArticleSection>

            <ArticleSection number="04" title="RSA Encryption">
              <p>
                RSA encryption can provide confidentiality when a sender wants
                to protect a small piece of data for a recipient who owns the
                corresponding private key.
              </p>

              <CodeBox>
                {`Sender
  │
  │ Plaintext
  ↓
Recipient's Public Key
  ↓
RSA-OAEP Encryption
  ↓
Ciphertext
  │
  │ transmitted
  ↓
Recipient
  ↓
Private Key
  ↓
RSA-OAEP Decryption
  ↓
Plaintext`}
              </CodeBox>

              <p className="mt-5">
                The sender does not need to know the recipient's private key.
                The recipient keeps the private key secret and uses it to
                recover the protected data.
              </p>

              <InfoBanner>
                Modern RSA encryption should use a standardized secure padding
                scheme such as <strong>RSA-OAEP</strong>. Raw textbook RSA
                should not be used for application encryption.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="05" title="Why RSA-OAEP Matters">
              <p>
                RSA is not normally used by itself on arbitrary application
                plaintext. RSA-OAEP provides the padding and randomized encoding
                needed for secure RSA encryption in appropriate applications.
              </p>

              <p>
                OAEP introduces randomness into the encryption process. As a
                result, encrypting the same plaintext multiple times should not
                simply produce the same RSA ciphertext when the scheme is used
                correctly.
              </p>

              <Comparison
                headers={["Construction", "Purpose", "Recommendation"]}
                rows={[
                  [
                    "Textbook RSA",
                    "Basic mathematical RSA operation",
                    "Do not use directly",
                  ],
                  [
                    "RSA-OAEP",
                    "RSA encryption",
                    "Standardized encryption construction",
                  ],
                  [
                    "RSA-PSS",
                    "RSA digital signatures",
                    "Modern signature construction",
                  ],
                ]}
              />
            </ArticleSection>

            <ArticleSection number="06" title="RSA Digital Signatures">
              <p>
                RSA can also be used for digital signatures. In this model, the
                private key is used to create a signature and the corresponding
                public key is used to verify it.
              </p>

              <CodeBox>
                {`Message
   ↓
Hash / Signature Encoding
   +
Private Key
   ↓
RSA-PSS Signature
   ↓
Digital Signature

Verifier
   ↓
Message + Signature + Public Key
   ↓
RSA-PSS Verification
   ↓
Valid / Invalid`}
              </CodeBox>

              <p className="mt-5">
                A valid signature can provide evidence that the signature was
                generated using the corresponding private key and that the
                signed data has not been altered, assuming the key and
                verification system are trustworthy.
              </p>
            </ArticleSection>

            <ArticleSection
              number="07"
              title="RSA Encryption vs RSA Signatures"
            >
              <Comparison
                headers={["Operation", "Key involved", "Primary purpose"]}
                rows={[
                  [
                    "RSA-OAEP encryption",
                    "Recipient public key",
                    "Protect confidentiality",
                  ],
                  [
                    "RSA-OAEP decryption",
                    "Recipient private key",
                    "Recover encrypted data",
                  ],
                  [
                    "RSA-PSS signing",
                    "Signer private key",
                    "Create a digital signature",
                  ],
                  [
                    "RSA-PSS verification",
                    "Signer public key",
                    "Verify a digital signature",
                  ],
                ]}
              />

              <p className="mt-5">
                A common misconception is that RSA simply means "encrypt with
                one key and decrypt with the other." Real-world RSA has
                different standardized constructions for encryption and
                signatures.
              </p>
            </ArticleSection>

            <ArticleSection
              number="08"
              title="Why RSA Is Usually Not Used for Large Files"
            >
              <p>
                RSA is fundamentally different from high-throughput symmetric
                ciphers such as AES. RSA operations are comparatively expensive
                and RSA encryption has strict limits on the amount of plaintext
                that can be directly processed by a given key and padding
                configuration.
              </p>

              <p>
                For this reason, applications commonly use{" "}
                <strong className="text-white">hybrid encryption</strong>.
              </p>

              <CodeBox>
                {`Random Symmetric Key
        ↓
   AES-GCM
        ↓
Large File → Ciphertext

Random Symmetric Key
        ↓
   RSA-OAEP
        ↓
Encrypted AES Key

Final Package
= Encrypted AES Key
+ AES-GCM Ciphertext
+ Required Metadata`}
              </CodeBox>

              <p className="mt-5">
                The symmetric cipher handles the bulk data efficiently, while
                RSA protects the small symmetric key.
              </p>
            </ArticleSection>

            <ArticleSection number="09" title="RSA vs Symmetric Encryption">
              <Comparison
                headers={["Property", "RSA", "AES"]}
                rows={[
                  ["Cryptographic type", "Asymmetric", "Symmetric"],
                  ["Keys", "Public/private pair", "Shared secret key"],
                  [
                    "Large data",
                    "Not generally suitable for bulk encryption",
                    "Designed for efficient bulk encryption",
                  ],
                  [
                    "Common role",
                    "Public-key operations and signatures",
                    "Bulk data encryption",
                  ],
                  [
                    "Key distribution model",
                    "Public key can be shared",
                    "Secret key must be protected",
                  ],
                ]}
              />
            </ArticleSection>

            <ArticleSection number="10" title="RSA vs ECC">
              <p>
                RSA is not the only public-key cryptographic technology.
                Elliptic-curve cryptography provides alternative public-key
                constructions that can achieve comparable security with
                substantially smaller key sizes.
              </p>

              <Comparison
                headers={["Characteristic", "RSA", "ECC-based systems"]}
                rows={[
                  [
                    "Mathematical foundation",
                    "Integer factorization",
                    "Elliptic-curve problems",
                  ],
                  [
                    "Typical key sizes",
                    "Larger",
                    "Smaller for comparable security levels",
                  ],
                  [
                    "Common applications",
                    "Legacy and widely deployed PKI systems",
                    "Modern key agreement and signature systems",
                  ],
                  [
                    "Performance profile",
                    "Can be computationally heavier",
                    "Often efficient with smaller keys",
                  ],
                ]}
              />

              <p className="mt-5">
                Which public-key technology should be used depends on protocol
                compatibility, platform support, security requirements, and
                current standards.
              </p>
            </ArticleSection>

            <ArticleSection number="11" title="RSA Key Sizes">
              <p>
                RSA security depends heavily on key size and correct key
                generation. Larger RSA keys generally provide greater resistance
                to classical attacks but also increase computational and storage
                costs.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <SizeCard
                  title="1024-bit"
                  text="Considered obsolete for modern security applications."
                />

                <SizeCard
                  title="2048-bit"
                  text="Widely deployed historically and still supported by many systems."
                />

                <SizeCard
                  title="3072-bit+"
                  text="Larger sizes can be selected when longer security margins are required."
                />
              </div>

              <p className="mt-5">
                Key-size recommendations can change with standards and threat
                models. Applications should follow current security guidance
                rather than treating a single key size as universally correct.
              </p>
            </ArticleSection>

            <ArticleSection
              number="12"
              title="What RSA Does Not Automatically Provide"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Limitation
                  title="No automatic key trust"
                  text="A public key being available does not automatically prove that it belongs to the person or server you intended to contact."
                />

                <Limitation
                  title="No bulk encryption efficiency"
                  text="RSA is generally not the right primitive for encrypting large files or high-volume data directly."
                />

                <Limitation
                  title="No protection after private-key compromise"
                  text="If an attacker obtains a private key, the security properties that depend on that key can be lost."
                />

                <Limitation
                  title="No quantum resistance"
                  text="RSA is based on classical mathematical assumptions and is not considered resistant to sufficiently capable quantum computers."
                />
              </div>
            </ArticleSection>

            <ArticleSection
              number="13"
              title="RSA in Certificates and Secure Connections"
            >
              <p>
                RSA has historically played an important role in public-key
                infrastructure and digital certificates. A certificate can
                associate a public key with an identity through a trusted
                certificate authority system.
              </p>

              <p>
                Modern secure network protocols can use different public-key
                algorithms depending on the protocol version and configuration.
                RSA may still appear in certificates, signatures, or other
                compatibility-sensitive components.
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <NetworkCard
                  icon={Network}
                  title="Public key"
                  text="Published through a certificate or other trusted mechanism."
                />

                <NetworkCard
                  icon={ShieldCheck}
                  title="Trust"
                  text="A protocol needs a way to establish that the public key belongs to the expected party."
                />

                <NetworkCard
                  icon={Signature}
                  title="Verification"
                  text="Digital signatures can authenticate protocol messages or certificates."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="14" title="Common RSA Mistakes">
              <div className="space-y-3">
                <Mistake
                  title="Using textbook RSA"
                  text="Raw RSA mathematics does not provide the secure randomized padding required for modern application encryption."
                />

                <Mistake
                  title="Using RSA to encrypt large files directly"
                  text="Hybrid encryption is generally a better architecture: use RSA to protect a symmetric key and a symmetric cipher for the actual data."
                />

                <Mistake
                  title="Using the same RSA scheme for every purpose"
                  text="Encryption and signatures use different standardized constructions, such as RSA-OAEP and RSA-PSS."
                />

                <Mistake
                  title="Publishing the private key"
                  text="A private key must remain confidential. Exposing it can undermine the security of the corresponding RSA system."
                />

                <Mistake
                  title="Generating keys with weak randomness"
                  text="Cryptographic keys require secure randomness. Weak random number generation can undermine otherwise strong algorithms."
                />

                <Mistake
                  title="Implementing RSA yourself"
                  text="Production cryptography should use mature, reviewed libraries and established protocols rather than custom RSA implementations."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="15" title="RSA Security Checklist">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Protect RSA private keys with appropriate access controls.",
                  "Generate RSA keys using a trusted cryptographic library.",
                  "Use RSA-OAEP for RSA encryption where RSA encryption is appropriate.",
                  "Use RSA-PSS for modern RSA digital signatures where supported.",
                  "Never use raw textbook RSA in production applications.",
                  "Do not use RSA directly for large amounts of bulk data.",
                  "Use authenticated symmetric encryption for protected application data.",
                  "Validate and manage public-key trust correctly.",
                  "Use key sizes appropriate to current security guidance.",
                  "Plan for cryptographic migration as standards and threat models evolve.",
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
                  question="What does RSA stand for?"
                  answer="RSA is named after Ron Rivest, Adi Shamir, and Leonard Adleman, the researchers who developed the algorithm."
                />

                <FAQ
                  question="What is an RSA public key?"
                  answer="An RSA public key is the shareable part of an RSA key pair. Depending on the scheme, it can be used to encrypt data for the private-key holder or verify signatures created by the private key."
                />

                <FAQ
                  question="What is an RSA private key?"
                  answer="The RSA private key is the confidential part of the key pair. It is used for operations such as decrypting RSA-OAEP ciphertext or generating RSA signatures."
                />

                <FAQ
                  question="Can I encrypt with an RSA private key?"
                  answer="This wording is misleading for modern cryptographic design. RSA encryption and RSA signatures are separate constructions with different security purposes. Digital signatures use the private key to create a signature, which is verified with the public key."
                />

                <FAQ
                  question="What is RSA-OAEP?"
                  answer="RSA-OAEP is a standardized padding and encoding scheme designed for RSA encryption. It should be preferred over raw textbook RSA for appropriate encryption applications."
                />

                <FAQ
                  question="What is RSA-PSS?"
                  answer="RSA-PSS is a standardized probabilistic signature scheme for RSA. It is designed for creating and verifying RSA digital signatures."
                />

                <FAQ
                  question="Why is RSA slower than AES?"
                  answer="RSA uses asymmetric public-key operations based on large-integer mathematics, while AES is a symmetric cipher optimized for efficient bulk data processing. This is why hybrid systems commonly use RSA for key protection and AES for bulk encryption."
                />

                <FAQ
                  question="Can RSA encrypt a whole file?"
                  answer="RSA can only directly process limited amounts of data depending on the key size and padding scheme. For files, hybrid encryption is normally more appropriate: encrypt the file with a symmetric key and protect that key using RSA."
                />

                <FAQ
                  question="Is RSA still secure?"
                  answer="RSA can still be secure when correctly implemented with appropriate key sizes and standardized schemes. However, security depends on the complete construction, implementation, key management, and current threat model rather than the algorithm name alone."
                />

                <FAQ
                  question="Is RSA quantum-safe?"
                  answer="No. RSA is not considered post-quantum secure. Cryptographic systems that need long-term protection may need to consider migration toward post-quantum cryptographic algorithms."
                />
              </div>
            </ArticleSection>

            <RelatedResources />

            <CTA
              title="Generate an RSA Key Pair"
              description="Use CipherLab's browser-based RSA tool to generate a public/private key pair and explore how asymmetric cryptography works."
              to="/tools/authentication-keys/rsa-key-pair"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_35%),radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold text-indigo-300">
          <KeyRound size={14} />
          Public-Key Cryptography
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is RSA?
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Understand RSA public and private keys, RSA-OAEP encryption, RSA-PSS
          signatures, hybrid encryption, key sizes, and the role of public-key
          cryptography in modern security systems.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {[
            "RSA",
            "Public Key",
            "Private Key",
            "RSA-OAEP",
            "RSA-PSS",
            "Digital Signatures",
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

function KeyCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-white/20">
      <Icon size={20} className="text-indigo-300" />

      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function SizeCard({ title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <FileKey2 size={18} className="text-cyan-300" />

      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function NetworkCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <Icon size={20} className="text-cyan-300" />

      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>

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
            RSA is an asymmetric cryptographic system based on a public/private
            key pair. In modern applications, RSA encryption should use a
            standardized scheme such as RSA-OAEP, while RSA digital signatures
            should use an appropriate signature scheme such as RSA-PSS.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Limitations / Mistakes                                                     */
/* -------------------------------------------------------------------------- */

function Limitation({ title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex gap-3">
        <UnlockKeyhole size={18} className="mt-0.5 shrink-0 text-amber-300" />

        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
        </div>
      </div>
    </div>
  );
}

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

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

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
          description="Build a foundation in encryption, hashing, authentication, keys, and encoding."
          to="/learn/cryptography-basics"
        />

        <RelatedLink
          title="What Is AES-GCM?"
          description="Learn how authenticated symmetric encryption protects confidentiality and integrity."
          to="/learn/what-is-aes-gcm"
        />

        <RelatedLink
          title="What Is HMAC?"
          description="Understand keyed message authentication, HMAC-SHA-256, and integrity verification."
          to="/learn/what-is-hmac"
        />

        <RelatedLink
          title="Password-Based Key Derivation"
          description="Learn how PBKDF2 transforms passwords into cryptographic key material."
          to="/learn/what-is-pbkdf2"
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
        Open RSA Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
