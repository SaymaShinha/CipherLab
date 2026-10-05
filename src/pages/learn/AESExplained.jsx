import {
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import SEO from "../../components/SEO.jsx";

export default function AESExplained() {
  return (
    <>
      <SEO
        title="AES-256 Explained: Encryption, GCM, Keys & IVs"
        description="Learn AES-256 encryption in simple terms, including symmetric encryption, GCM mode, encryption keys, nonces, authentication tags, and practical examples."
        canonical="/learn/aes-256-explained"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="border-b border-white/10 bg-gradient-to-b from-indigo-500/10 via-slate-950 to-slate-950">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-sm font-medium text-indigo-300">
                <Sparkles size={15} />
                Cryptography Guide
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                AES-256 Explained
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-400 sm:text-xl">
                Learn how AES-256 works, why AES-GCM is commonly used, and how
                keys, nonces, ciphertext, and authentication tags fit together.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <InfoBadge icon={<LockKeyhole size={16} />}>
                  Symmetric encryption
                </InfoBadge>

                <InfoBadge icon={<KeyRound size={16} />}>256-bit key</InfoBadge>

                <InfoBadge icon={<ShieldCheck size={16} />}>
                  Authenticated encryption
                </InfoBadge>
              </div>
            </div>
          </div>
        </section>

        {/* Article */}
        <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            {/* Main content */}
            <div className="min-w-0">
              <div className="space-y-12">
                {/* Introduction */}
                <Section number="01" title="What is AES?" id="what-is-aes">
                  <p>
                    AES stands for{" "}
                    <strong className="text-white">
                      Advanced Encryption Standard
                    </strong>
                    . It is a widely used symmetric encryption algorithm for
                    protecting digital information.
                  </p>

                  <p>
                    AES is called{" "}
                    <strong className="text-white">symmetric</strong> encryption
                    because the same secret key is used to encrypt and decrypt
                    the data.
                  </p>

                  <SimpleExample>
                    <div className="grid gap-4 sm:grid-cols-3 sm:items-center">
                      <ExampleBox title="Original data">Hello World</ExampleBox>

                      <div className="text-center text-2xl text-indigo-400">
                        →
                      </div>

                      <ExampleBox title="Encrypted data">
                        Unreadable ciphertext
                      </ExampleBox>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                      The encrypted result can only be converted back when the
                      correct secret key and required encryption parameters are
                      available.
                    </p>
                  </SimpleExample>
                </Section>

                {/* AES-256 */}
                <Section
                  number="02"
                  title="What does AES-256 mean?"
                  id="aes-256"
                >
                  <p>
                    The <strong className="text-white">256</strong> in AES-256
                    refers to the size of the encryption key:{" "}
                    <strong className="text-white">256 bits</strong>.
                  </p>

                  <p>AES itself supports three standardized key sizes:</p>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <KeyCard size="128 bits" />
                    <KeyCard size="192 bits" />
                    <KeyCard size="256 bits" highlighted />
                  </div>

                  <p>
                    AES-256 provides a very large keyspace. However, key size is
                    only one part of security. Secure key generation, storage,
                    nonce management, authentication, and correct implementation
                    are equally important.
                  </p>
                </Section>

                {/* Symmetric */}
                <Section
                  number="03"
                  title="What is symmetric encryption?"
                  id="symmetric-encryption"
                >
                  <p>
                    In symmetric encryption, both sides use the same secret key.
                    One side encrypts the information and the other uses the
                    secret key to decrypt it.
                  </p>

                  <div className="my-6 grid gap-4 sm:grid-cols-3 sm:items-center">
                    <ProcessCard
                      icon={<LockKeyhole size={22} />}
                      title="Encrypt"
                      text="Plaintext + secret key"
                    />

                    <div className="hidden text-center text-2xl text-indigo-400 sm:block">
                      →
                    </div>

                    <ProcessCard
                      icon={<ShieldCheck size={22} />}
                      title="Decrypt"
                      text="Ciphertext + secret key"
                    />
                  </div>

                  <Callout>
                    <strong className="text-white">Important:</strong> Anyone
                    who obtains the secret encryption key may be able to decrypt
                    the protected information. Protecting the key is therefore
                    critical.
                  </Callout>
                </Section>

                {/* GCM */}
                <Section number="04" title="What is AES-GCM?" id="aes-gcm">
                  <p>
                    GCM stands for{" "}
                    <strong className="text-white">Galois/Counter Mode</strong>.
                    AES-GCM combines AES encryption with authentication.
                  </p>

                  <p>
                    This means it can provide two important security properties:
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <SecurityCard
                      icon={<LockKeyhole />}
                      title="Confidentiality"
                      text="Keeps the original message hidden from people who do not have the key."
                    />

                    <SecurityCard
                      icon={<ShieldCheck />}
                      title="Integrity & authenticity"
                      text="Detects unauthorized modification of the encrypted data."
                    />
                  </div>

                  <p>
                    This combination is why authenticated encryption modes such
                    as AES-GCM are commonly preferred for new applications.
                  </p>
                </Section>

                {/* IV / Nonce */}
                <Section
                  number="05"
                  title="What is an IV or nonce?"
                  id="iv-nonce"
                >
                  <p>
                    Encryption does not normally operate on the plaintext and
                    key alone. AES-GCM also uses a value commonly called a{" "}
                    <strong className="text-white">nonce</strong>.
                  </p>

                  <p>
                    The nonce provides unique input for an encryption operation.
                    With AES-GCM, nonce management is especially important.
                  </p>

                  <Callout variant="warning">
                    <strong className="text-white">
                      Never reuse a nonce with the same AES-GCM key.
                    </strong>{" "}
                    Incorrect nonce reuse can seriously compromise the security
                    of AES-GCM.
                  </Callout>

                  <p>
                    A nonce does not need to be a secret in the same way the
                    encryption key does. It generally needs to be available when
                    decrypting the ciphertext.
                  </p>
                </Section>

                {/* Authentication tag */}
                <Section
                  number="06"
                  title="What is the authentication tag?"
                  id="authentication-tag"
                >
                  <p>
                    AES-GCM produces an{" "}
                    <strong className="text-white">authentication tag</strong>{" "}
                    along with the ciphertext.
                  </p>

                  <p>
                    During decryption, the tag is checked. If the ciphertext or
                    authenticated information has been modified, verification
                    fails instead of silently returning altered plaintext.
                  </p>

                  <div className="my-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
                    <div className="flex gap-3">
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-emerald-400"
                        size={22}
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          Why this matters
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-400">
                          Encryption should not only hide information. A secure
                          system should also know when protected data has been
                          changed unexpectedly.
                        </p>
                      </div>
                    </div>
                  </div>
                </Section>

                {/* Workflow */}
                <Section
                  number="07"
                  title="How AES-256-GCM works"
                  id="workflow"
                >
                  <p>A simplified AES-256-GCM workflow looks like this:</p>

                  <div className="my-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                    <WorkflowStep
                      number="1"
                      title="Secret key"
                      text="A 256-bit AES key is selected."
                    />

                    <WorkflowStep
                      number="2"
                      title="Plaintext"
                      text="The original readable information is prepared."
                    />

                    <WorkflowStep
                      number="3"
                      title="Unique nonce"
                      text="A nonce is supplied for this encryption operation."
                    />

                    <WorkflowStep
                      number="4"
                      title="AES-GCM encryption"
                      text="The plaintext is encrypted and authenticated."
                    />

                    <WorkflowStep
                      number="5"
                      title="Ciphertext + tag"
                      text="The encrypted data and authentication tag are produced."
                      last
                    />
                  </div>

                  <div className="rounded-2xl border border-indigo-400/20 bg-indigo-400/5 p-6">
                    <div className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
                      Simplified model
                    </div>

                    <div className="mt-5 space-y-2 font-mono text-sm leading-7 text-slate-300">
                      <div>Secret key</div>
                      <div className="text-indigo-400">↓</div>
                      <div>AES-256-GCM</div>
                      <div className="text-indigo-400">↓</div>
                      <div>Plaintext + unique nonce</div>
                      <div className="text-indigo-400">↓</div>
                      <div className="text-white">
                        Ciphertext + authentication tag
                      </div>
                    </div>
                  </div>
                </Section>

                {/* Passwords */}
                <Section
                  number="08"
                  title="What about passwords?"
                  id="passwords"
                >
                  <p>
                    AES requires a cryptographic key. A human password is
                    generally not used directly as an AES key without an
                    appropriate key derivation process.
                  </p>

                  <p>
                    Applications commonly use a{" "}
                    <strong className="text-white">
                      password-based key derivation function
                    </strong>{" "}
                    to derive a cryptographic key from a password.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <MiniConcept
                      title="Password"
                      text="Human-readable secret"
                    />

                    <MiniConcept
                      title="KDF"
                      text="Derives a cryptographic key"
                    />

                    <MiniConcept
                      title="AES key"
                      text="Used by the encryption algorithm"
                    />
                  </div>

                  <Callout>
                    A key derivation function is different from AES itself.
                    Password processing and encryption are separate stages of a
                    secure design.
                  </Callout>
                </Section>

                {/* New applications */}
                <Section
                  number="09"
                  title="Is AES-256-GCM suitable for new applications?"
                  id="new-applications"
                >
                  <p>
                    AES-GCM is a widely used authenticated-encryption
                    construction and is generally a strong choice for new
                    applications when implemented correctly.
                  </p>

                  <p>
                    However, using a strong algorithm is not enough by itself.
                  </p>

                  <div className="space-y-3">
                    <ChecklistItem>
                      Use a cryptographically secure key.
                    </ChecklistItem>

                    <ChecklistItem>
                      Never reuse a GCM nonce with the same key.
                    </ChecklistItem>

                    <ChecklistItem>
                      Protect encryption keys from unauthorized access.
                    </ChecklistItem>

                    <ChecklistItem>
                      Verify the authentication tag during decryption.
                    </ChecklistItem>

                    <ChecklistItem>
                      Use a well-tested cryptographic implementation.
                    </ChecklistItem>
                  </div>
                </Section>

                {/* Practical example */}
                <section
                  id="example"
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-indigo-400/10 p-2.5 text-indigo-300">
                      <Sparkles size={20} />
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                        Practical example
                      </div>

                      <h2 className="mt-1 text-2xl font-bold text-white">
                        Protecting a private message
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 leading-8 text-slate-400">
                    Imagine an application needs to store a private message.
                    Instead of storing the readable message directly, it can
                    encrypt the message using AES-GCM.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-4">
                    <ExampleBox title="Input">Private message</ExampleBox>

                    <ExampleBox title="Key">AES-256 key</ExampleBox>

                    <ExampleBox title="Nonce">Unique nonce</ExampleBox>

                    <ExampleBox title="Result">Ciphertext + tag</ExampleBox>
                  </div>
                </section>

                {/* Key takeaways */}
                <section
                  id="takeaways"
                  className="rounded-3xl border border-indigo-400/20 bg-indigo-400/5 p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-indigo-400" size={24} />

                    <h2 className="text-2xl font-bold text-white">
                      Key takeaways
                    </h2>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Takeaway>
                      AES is a symmetric encryption algorithm.
                    </Takeaway>

                    <Takeaway>AES-256 uses a 256-bit encryption key.</Takeaway>

                    <Takeaway>
                      AES-GCM provides encryption and authentication.
                    </Takeaway>

                    <Takeaway>GCM nonce reuse must be avoided.</Takeaway>

                    <Takeaway>
                      The authentication tag helps detect tampering.
                    </Takeaway>

                    <Takeaway>Secure key management is essential.</Takeaway>
                  </div>
                </section>
              </div>
            </div>

            {/* Table of contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  On this page
                </div>

                <nav className="mt-4 space-y-1">
                  <TocLink href="#what-is-aes">What is AES?</TocLink>
                  <TocLink href="#aes-256">What does AES-256 mean?</TocLink>
                  <TocLink href="#symmetric-encryption">
                    Symmetric encryption
                  </TocLink>
                  <TocLink href="#aes-gcm">What is AES-GCM?</TocLink>
                  <TocLink href="#iv-nonce">IVs & nonces</TocLink>
                  <TocLink href="#authentication-tag">
                    Authentication tag
                  </TocLink>
                  <TocLink href="#workflow">How AES-256-GCM works</TocLink>
                  <TocLink href="#passwords">
                    Passwords & key derivation
                  </TocLink>
                  <TocLink href="#new-applications">New applications</TocLink>
                  <TocLink href="#example">Practical example</TocLink>
                  <TocLink href="#takeaways">Key takeaways</TocLink>
                </nav>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </>
  );
}

/* =========================================================
   Reusable Components
========================================================= */

function InfoBadge({ icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-300">
      <span className="text-indigo-400">{icon}</span>
      {children}
    </div>
  );
}

function Section({ number, title, id, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-400/10 text-xs font-bold text-indigo-400">
          {number}
        </span>

        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
      </div>

      <div className="space-y-5 text-base leading-8 text-slate-400 sm:text-lg">
        {children}
      </div>
    </section>
  );
}

function SimpleExample({ children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
      {children}
    </div>
  );
}

function ExampleBox({ title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </div>

      <div className="mt-2 break-words font-medium text-slate-200">
        {children}
      </div>
    </div>
  );
}

function KeyCard({ size, highlighted = false }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlighted
          ? "border-indigo-400/30 bg-indigo-400/10"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <KeyRound
        size={20}
        className={highlighted ? "text-indigo-400" : "text-slate-500"}
      />

      <div className="mt-3 text-xl font-bold text-white">{size}</div>

      <div className="mt-1 text-sm text-slate-500">AES key size</div>
    </div>
  );
}

function ProcessCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-indigo-400">{icon}</div>

      <h3 className="mt-3 font-semibold text-white">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function SecurityCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-indigo-400">{icon}</div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
    </div>
  );
}

function MiniConcept({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function Callout({ children, variant = "info" }) {
  const warning = variant === "warning";

  return (
    <div
      className={`rounded-2xl border p-5 ${
        warning
          ? "border-amber-400/20 bg-amber-400/5"
          : "border-indigo-400/20 bg-indigo-400/5"
      }`}
    >
      <p className="text-sm leading-7 text-slate-400">{children}</p>
    </div>
  );
}

function WorkflowStep({ number, title, text, last = false }) {
  return (
    <div
      className={`flex gap-4 p-5 ${!last ? "border-b border-white/10" : ""}`}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-400/10 text-sm font-bold text-indigo-400">
        {number}
      </div>

      <div>
        <h3 className="font-semibold text-white">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
      </div>
    </div>
  );
}

function ChecklistItem({ children }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-400" />

      <span className="text-sm leading-6 text-slate-300">{children}</span>
    </div>
  );
}

function Takeaway({ children }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-950/30 p-4">
      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-indigo-400" />

      <span className="text-sm leading-6 text-slate-300">{children}</span>
    </div>
  );
}

function TocLink({ href, children }) {
  return (
    <a
      href={href}
      className="block rounded-lg px-3 py-2 text-sm leading-6 text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
    >
      {children}
    </a>
  );
}
