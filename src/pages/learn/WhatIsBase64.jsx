// src/pages/learn/WhatIsBase64.jsx

import {
  ArrowRight,
  Binary,
  CheckCircle2,
  FileCode2,
  ShieldAlert,
  Database,
  Globe2,
  Mail,
  Code2,
  LockKeyhole,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

export default function WhatIsBase64() {
  return (
    <>
      <SEO
        title="What Is Base64? Encoding vs Encryption Explained | CipherLab"
        description="Learn what Base64 encoding is, how binary data becomes text, how Base64 padding works, Base64URL, MIME Base64, common use cases, size overhead, and why Base64 is not encryption."
        canonical="/learn/what-is-base64"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <KeyTakeaway />

            <ArticleSection number="01" title="What Is Base64?">
              <p>
                Base64 is an{" "}
                <strong className="text-white">encoding format</strong> used to
                represent binary data using a restricted set of printable
                characters.
              </p>

              <p>
                Computers routinely work with binary data such as images, files,
                cryptographic values, and raw bytes. Some systems, however, are
                designed primarily around text. Base64 provides a convenient way
                to represent those bytes as text.
              </p>

              <p>
                Base64 is therefore about{" "}
                <strong className="text-white">representation</strong>, not
                secrecy.
              </p>

              <InfoBanner>
                Base64 does not encrypt information. Anyone who receives a
                Base64 string can decode it without knowing a secret key.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="02" title="How Base64 Works">
              <p>
                Base64 operates on groups of three input bytes, which contain 24
                bits. Those 24 bits are divided into four groups of 6 bits. Each
                6-bit value maps to one character in the Base64 alphabet.
              </p>

              <CodeBox>
                {`3 bytes
  ↓
24 bits
  ↓
4 groups × 6 bits
  ↓
4 Base64 characters`}
              </CodeBox>

              <p className="mt-5">
                Standard Base64 uses 64 characters: 26 uppercase letters, 26
                lowercase letters, 10 digits, plus (+), and slash (/).
              </p>

              <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
                <div className="font-mono text-xs uppercase tracking-wider text-slate-600">
                  Base64 alphabet
                </div>

                <div className="mt-3 break-all font-mono text-sm leading-7 text-cyan-300">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
                </div>
              </div>
            </ArticleSection>

            <ArticleSection number="03" title="A Simple Base64 Example">
              <p>Suppose the original text is:</p>

              <CodeBox>hello</CodeBox>

              <p className="mt-5">
                When the UTF-8 bytes representing this text are Base64 encoded,
                the result is:
              </p>

              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] p-5 font-mono text-lg text-cyan-300">
                aGVsbG8=
              </div>

              <p className="mt-5">
                Decoding that Base64 value produces the original bytes again,
                which can then be interpreted as the original UTF-8 text.
              </p>

              <CodeBox>
                {`"hello"
   ↓ encode
"aGVsbG8="
   ↓ decode
"hello"`}
              </CodeBox>

              <InfoBanner>
                Base64 encoding and decoding are reversible. The encoded value
                is not intended to be a secret.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection number="04" title="Why Does Base64 Use Padding?">
              <p>
                Base64 normally processes input in groups of three bytes. When
                the input length is not divisible by three, padding characters
                may be added to complete the final group.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <ExampleCard
                  title="1 byte"
                  value="xx=="
                  description="Two padding characters may be required."
                />

                <ExampleCard
                  title="2 bytes"
                  value="xxx="
                  description="One padding character may be required."
                />

                <ExampleCard
                  title="3 bytes"
                  value="xxxx"
                  description="No padding is required."
                />
              </div>

              <p>
                The equals sign (=) is therefore not part of the normal
                64-character alphabet. It is used as padding in the standard
                Base64 representation.
              </p>
            </ArticleSection>

            <ArticleSection number="05" title="Base64 Makes Data Larger">
              <p>
                Base64 is convenient, but the encoded representation generally
                requires more characters than the original binary data.
              </p>

              <p>
                Three bytes of input become four Base64 characters. This means
                Base64 introduces approximately{" "}
                <strong className="text-white">33% overhead</strong> for large
                inputs, before considering any additional formatting.
              </p>

              <Comparison
                headers={[
                  "Input",
                  "Base64 representation",
                  "Approximate effect",
                ]}
                rows={[
                  ["3 bytes", "4 characters", "33% representation overhead"],
                  ["30 bytes", "40 characters", "33% representation overhead"],
                  [
                    "300 bytes",
                    "400 characters",
                    "33% representation overhead",
                  ],
                ]}
              />

              <p className="mt-5">
                For this reason, Base64 is usually not a compression mechanism.
                If reducing file size is the goal, compression should be
                considered separately.
              </p>
            </ArticleSection>

            <ArticleSection number="06" title="Base64 Is Not Encryption">
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
                <div className="flex gap-3">
                  <ShieldAlert
                    size={20}
                    className="mt-0.5 shrink-0 text-amber-300"
                  />

                  <div>
                    <h3 className="font-semibold text-amber-100">
                      Base64 provides no confidentiality
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-amber-100/80">
                      Base64 does not use a secret key. It simply converts bytes
                      into another representation. If the encoded value contains
                      sensitive information, encoding it with Base64 does not
                      make that information secure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <SecurityCard
                  icon={Binary}
                  title="Encoding"
                  text="Changes how information is represented."
                />

                <SecurityCard
                  icon={LockKeyhole}
                  title="Encryption"
                  text="Uses cryptographic techniques to provide confidentiality."
                />

                <SecurityCard
                  icon={ShieldAlert}
                  title="Hashing"
                  text="Produces a digest designed for specific one-way verification use cases."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="07" title="Base64 vs Base64URL">
              <p>
                Standard Base64 uses plus (+) and slash (/) as two characters in
                its alphabet. Those characters can require special handling in
                URLs and filenames.
              </p>

              <p>
                Base64URL modifies the representation by using hyphen (-) and
                underscore (_) instead.
              </p>

              <Comparison
                rows={[
                  [
                    "Base64",
                    "Uses + and /",
                    "General-purpose Base64 representation",
                  ],
                  [
                    "Base64URL",
                    "Uses - and _",
                    "Designed to be safer to place in URLs and filenames",
                  ],
                ]}
              />

              <p className="mt-5">
                Base64URL is commonly encountered in web-oriented formats and
                protocols where URL-safe characters are preferred.
              </p>
            </ArticleSection>

            <ArticleSection number="08" title="Where Is Base64 Used?">
              <div className="grid gap-4 sm:grid-cols-2">
                <UseCard
                  icon={Mail}
                  title="Email"
                  text="Binary attachments can be represented using text-oriented email encoding mechanisms."
                />

                <UseCard
                  icon={Globe2}
                  title="Data URLs"
                  text="Small images and other resources can be embedded directly into URLs using Base64."
                />

                <UseCard
                  icon={Code2}
                  title="APIs"
                  text="Binary values can sometimes be represented as strings inside JSON or other text-oriented formats."
                />

                <UseCard
                  icon={Database}
                  title="Configuration"
                  text="Small binary values can be stored in systems that primarily accept textual configuration."
                />

                <UseCard
                  icon={FileCode2}
                  title="Web Development"
                  text="Developers may use Base64 when a text representation of binary content is convenient."
                />

                <UseCard
                  icon={Binary}
                  title="Cryptography"
                  text="Ciphertext, keys, hashes, and other byte sequences are sometimes serialized as Base64 for transport."
                />
              </div>
            </ArticleSection>

            <ArticleSection number="09" title="Base64 in APIs and Cryptography">
              <p>
                Cryptographic algorithms operate on bytes, while many APIs
                transport data as text. Base64 can bridge that representation
                gap.
              </p>

              <CodeBox>
                {`Binary ciphertext
       ↓
     Base64
       ↓
Text-safe string
       ↓
      API
       ↓
     Base64
       ↓
Original ciphertext bytes`}
              </CodeBox>

              <p className="mt-5">
                This does not mean Base64 itself provides cryptographic
                protection. The security comes from the cryptographic algorithm
                that produced the underlying bytes.
              </p>

              <InfoBanner>
                If encrypted data is Base64 encoded, there are two separate
                operations: encryption protects the data, while Base64 makes the
                resulting bytes easier to represent as text.
              </InfoBanner>
            </ArticleSection>

            <ArticleSection
              number="10"
              title="Encoding vs Encryption vs Hashing"
            >
              <Comparison
                headers={["Concept", "Primary purpose", "Secret key required?"]}
                rows={[
                  ["Encoding", "Change representation", "No"],
                  [
                    "Encryption",
                    "Protect confidentiality",
                    "Yes, in normal symmetric/asymmetric encryption workflows",
                  ],
                  [
                    "Hashing",
                    "Produce a digest for verification or indexing",
                    "Not normally",
                  ],
                ]}
              />

              <p className="mt-5">
                These technologies may appear together in real applications, but
                they solve different problems. Understanding the distinction is
                particularly important when handling passwords, authentication
                data, tokens, and encrypted content.
              </p>
            </ArticleSection>

            <ArticleSection number="11" title="Common Base64 Misconceptions">
              <div className="space-y-3">
                <Misconception
                  title="“Base64 encrypts my data.”"
                  text="No. Base64 is encoding and does not provide confidentiality."
                />

                <Misconception
                  title="“A strange-looking Base64 string is secure.”"
                  text="An encoded value may look unreadable to a person, but that does not make it cryptographically protected."
                />

                <Misconception
                  title="“Base64 hides passwords.”"
                  text="Base64 should never be used as a password-protection mechanism."
                />

                <Misconception
                  title="“Base64 compresses data.”"
                  text="Base64 generally increases the size of the representation rather than compressing it."
                />

                <Misconception
                  title="“Changing Base64 characters makes encryption.”"
                  text="Changing or customizing an encoding alphabet does not automatically create a secure encryption algorithm."
                />
              </div>
            </ArticleSection>

            <ArticleSection
              number="12"
              title="Important Characteristics of Base64"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Base64 is an encoding scheme, not encryption.",
                  "Encoding and decoding are reversible.",
                  "No secret key is required for normal Base64 encoding.",
                  "Standard Base64 uses 64 primary alphabet characters.",
                  "The equals sign may be used for padding.",
                  "Base64 increases the size of binary data.",
                  "Base64 does not provide authentication.",
                  "Base64 does not protect sensitive information.",
                  "Base64URL uses URL-friendly characters.",
                  "Base64 is useful when binary data must travel through text-oriented systems.",
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
                  question="Is Base64 encryption?"
                  answer="No. Base64 is an encoding format. It does not use a secret key and does not provide confidentiality."
                />

                <FAQ
                  question="Can Base64 be decoded?"
                  answer="Yes. Base64 is designed to be reversible. Anyone with the encoded value can normally decode it."
                />

                <FAQ
                  question="Why does Base64 end with =?"
                  answer="The equals sign can be used as padding when the input length is not an exact multiple of three bytes."
                />

                <FAQ
                  question="Is Base64 secure for passwords?"
                  answer="No. Base64 should not be used to protect passwords. Passwords require appropriate password hashing and secure credential-management practices."
                />

                <FAQ
                  question="Does Base64 make files smaller?"
                  answer="No. Base64 generally makes the representation larger. For large inputs, the overhead is approximately one third."
                />

                <FAQ
                  question="What is Base64URL?"
                  answer="Base64URL is a URL-friendly variation of Base64 that replaces characters such as + and / with - and _."
                />

                <FAQ
                  question="Can Base64 contain encrypted data?"
                  answer="Yes. Encrypted binary data is sometimes Base64 encoded so that it can be transported or stored as text. The encryption provides security; Base64 only changes the representation."
                />

                <FAQ
                  question="Does Base64 provide integrity protection?"
                  answer="No. Base64 does not authenticate or protect data against modification. If integrity is required, a suitable cryptographic authentication mechanism should be used."
                />
              </div>
            </ArticleSection>

            <RelatedResources />

            <CTA
              title="Try Base64 Encoding"
              description="Encode and decode text or binary-compatible data directly in your browser with CipherLab's Base64 tool."
              to="/tools/encoding/base64"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_35%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="text-xs font-medium text-slate-500 transition hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
          <Binary size={14} />
          Data Encoding
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is Base64?
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Learn how Base64 represents binary data as text, how padding and
          Base64URL work, where encoding is used, and why Base64 should never be
          confused with encryption.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {[
            "Encoding",
            "Binary Data",
            "Base64URL",
            "Padding",
            "APIs",
            "Cryptography",
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

function CodeBox({ children }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-5 font-mono text-sm leading-7 text-cyan-300">
      {children}
    </pre>
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

function SecurityCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <Icon size={19} className="text-indigo-300" />

      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function ExampleCard({ title, value, description }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <div className="text-xs uppercase tracking-wider text-slate-600">
        {title}
      </div>

      <div className="mt-3 font-mono text-lg text-cyan-300">{value}</div>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function Comparison({ headers = ["Format", "Alphabet", "Purpose"], rows }) {
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

function Misconception({ title, text }) {
  return (
    <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-5">
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
    <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6 sm:p-8">
      <div className="flex gap-4">
        <Binary size={24} className="mt-0.5 shrink-0 text-cyan-300" />

        <div>
          <h2 className="text-lg font-bold text-white">Key takeaway</h2>

          <p className="mt-2 text-sm leading-7 text-slate-400">
            Base64 is a reversible way to represent binary data as text. It is
            useful for interoperability, APIs, email, URLs, and data
            serialization, but it provides no confidentiality, authentication,
            or password protection.
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
        <FileCode2 size={20} className="text-indigo-300" />

        <h2 className="text-xl font-bold text-white">Continue Learning</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <RelatedLink
          title="Cryptography Basics"
          description="Learn the fundamental differences between encoding, encryption, hashing, keys, and cryptographic algorithms."
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
          title="Base64 Tool"
          description="Encode and decode Base64 values directly in your browser."
          to="/tools/encoding/base64"
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
        Open Base64 Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
