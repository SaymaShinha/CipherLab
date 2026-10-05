// src/pages/learn/WhatIsHMAC.jsx

import {
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";

const concepts = [
  {
    icon: KeyRound,
    title: "Secret key",
    description:
      "HMAC requires a shared secret key known to the parties that need to create or verify the authentication code.",
  },
  {
    icon: Fingerprint,
    title: "Message",
    description:
      "The original message is processed together with the secret key to produce a fixed-length authentication code.",
  },
  {
    icon: ShieldCheck,
    title: "Verification",
    description:
      "A recipient who knows the secret key can independently calculate the HMAC and compare the result.",
  },
];

export default function WhatIsHMAC() {
  return (
    <>
      <SEO
        title="What Is HMAC? | Hash-Based Message Authentication"
        description="Learn what HMAC is, how HMAC-SHA-256 works, why a secret key is required, and how HMAC provides message authentication and integrity."
        canonical="/learn/what-is-hmac"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        <Hero />

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <ArticleSection number="01" title="What Is HMAC?">
              <p>
                HMAC stands for{" "}
                <strong>Hash-based Message Authentication Code</strong>. It is a
                construction that combines a cryptographic hash function with a
                secret key to produce an authentication code for a message.
              </p>

              <p>
                HMAC is designed to help a recipient determine whether a message
                was created by someone who possesses the shared secret key and
                whether the message was modified after the HMAC was generated.
              </p>

              <p>
                Common combinations include HMAC-SHA-256, HMAC-SHA-384, and
                HMAC-SHA-512.
              </p>
            </ArticleSection>

            <section>
              <SectionHeading number="02" title="How HMAC Works" />

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {concepts.map((item) => (
                  <ConceptCard key={item.title} {...item} />
                ))}
              </div>
            </section>

            <ArticleSection number="03" title="HMAC-SHA-256 Example">
              <CodeBox>
                Message + Secret Key
                {"\n\n"}↓{"\n\n"}
                HMAC-SHA-256
                {"\n\n"}↓{"\n\n"}
                Authentication Tag
              </CodeBox>

              <p className="mt-5">
                Suppose an application sends a request containing an amount,
                timestamp, and account identifier. The sender can calculate an
                HMAC over the request data using a shared secret. The receiver
                performs the same calculation and checks whether the generated
                authentication code matches.
              </p>
            </ArticleSection>

            <ArticleSection number="04" title="HMAC vs Hashing">
              <Comparison
                rows={[
                  ["SHA-256", "Hash function", "No secret key required"],
                  [
                    "HMAC-SHA-256",
                    "Message authentication",
                    "Requires secret key",
                  ],
                  [
                    "SHA-256",
                    "Integrity fingerprint",
                    "Anyone can calculate it",
                  ],
                  [
                    "HMAC",
                    "Authenticated integrity",
                    "Only key holders can create valid codes",
                  ],
                ]}
              />

              <p className="mt-5">
                A plain hash does not prove who generated a message. Anyone who
                knows the message can calculate its hash. HMAC adds a secret key
                so that producing a valid authentication code requires
                possession of that key.
              </p>
            </ArticleSection>

            <ArticleSection number="05" title="What HMAC Does Not Provide">
              <ul>
                <li>HMAC does not encrypt the message.</li>
                <li>HMAC does not hide the contents of a message.</li>
                <li>HMAC does not provide public-key authentication.</li>
                <li>
                  HMAC does not protect a secret key if the key is exposed.
                </li>
              </ul>

              <p className="mt-5">
                If confidentiality is required, authenticated encryption such as
                AES-GCM may be more appropriate.
              </p>
            </ArticleSection>

            <ArticleSection number="06" title="Common HMAC Uses">
              <div className="grid gap-4 sm:grid-cols-2">
                <UseCard title="API authentication">
                  Verify that API requests were generated by a party holding the
                  shared secret.
                </UseCard>

                <UseCard title="Webhook verification">
                  Confirm that incoming webhook data was produced by a trusted
                  sender.
                </UseCard>

                <UseCard title="Data integrity">
                  Detect unauthorized modification of authenticated data.
                </UseCard>

                <UseCard title="Token systems">
                  Authenticate structured data when a shared secret is
                  appropriate.
                </UseCard>
              </div>
            </ArticleSection>

            <ArticleSection number="07" title="Security Considerations">
              <ul>
                <li>Use a strong randomly generated secret key.</li>
                <li>Protect the key as sensitive secret material.</li>
                <li>Use a modern hash such as SHA-256 or SHA-512.</li>
                <li>
                  Do not place secret keys directly in public frontend code.
                </li>
                <li>Use constant-time comparison where appropriate.</li>
              </ul>
            </ArticleSection>

            <CTA
              title="Try HMAC in CipherLab"
              description="Generate HMAC values directly in your browser and explore how keyed authentication differs from ordinary hashing."
              to="/tools/authentication-keys/hmac"
            />
          </div>
        </div>
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/learn/cryptography-basics"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-white"
        >
          ← Back to Cryptography Basics
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
          <LockKeyhole size={14} />
          Authentication
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What Is HMAC?
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          A practical guide to Hash-based Message Authentication Codes, secret
          keys, message integrity, and HMAC-SHA-256.
        </p>
      </div>
    </section>
  );
}

function ArticleSection({ number, title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <SectionHeading number={number} title={title} />

      <div className="prose prose-invert mt-5 max-w-none prose-p:text-slate-400 prose-p:leading-8 prose-li:text-slate-400 prose-li:leading-7">
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
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

function Comparison({ rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-4 py-3">Technology</th>
            <th className="px-4 py-3">Purpose</th>
            <th className="px-4 py-3">Key</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => (
                <td key={cell} className="px-4 py-4 text-slate-300">
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

function UseCard({ title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex gap-3">
        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{children}</p>
        </div>
      </div>
    </div>
  );
}

function CTA({ title, description, to }) {
  return (
    <section className="rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.07] p-6 sm:p-8">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        {description}
      </p>

      <Link
        to={to}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Open HMAC Tool
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
