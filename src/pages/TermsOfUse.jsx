import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  FileText,
  Gavel,
  Info,
  LockKeyhole,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import SEO from "../components/SEO.jsx";

export default function TermsOfUse() {
  return (
    <>
      <SEO
        title="Terms of Use | CipherLab"
        description="Read the CipherLab Terms of Use covering responsible use of cryptography and security tools, tool output, security limitations, prohibited activities, availability, intellectual property, and policy changes."
        canonical="/terms-of-use"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.08] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">
                <Gavel size={14} />
                Website Terms
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Terms of Use
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                These terms explain the conditions for using CipherLab and its
                cryptography, security, encoding, hashing, and educational
                resources.
              </p>

              <p className="mt-5 text-sm font-medium text-slate-400">
                Last updated: October 5, 2026
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            {/* =================================================
                TABLE OF CONTENTS
            ================================================== */}

            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">
                  On this page
                </p>

                <nav className="mt-4 space-y-2 text-sm">
                  <TocLink href="#acceptance">Acceptance</TocLink>
                  <TocLink href="#about-cipherlab">About CipherLab</TocLink>
                  <TocLink href="#tool-use">Use of tools</TocLink>
                  <TocLink href="#tool-output">Tool output</TocLink>
                  <TocLink href="#security">Security limitations</TocLink>
                  <TocLink href="#responsibility">Your responsibility</TocLink>
                  <TocLink href="#prohibited-use">Prohibited use</TocLink>
                  <TocLink href="#intellectual-property">
                    Intellectual property
                  </TocLink>
                  <TocLink href="#third-party-services">
                    Third-party services
                  </TocLink>
                  <TocLink href="#availability">Availability</TocLink>
                  <TocLink href="#disclaimer">Disclaimer</TocLink>
                  <TocLink href="#changes">Changes</TocLink>
                </nav>
              </div>
            </aside>

            {/* =================================================
                TERMS CONTENT
            ================================================== */}

            <article className="min-w-0">
              <div className="space-y-8">
                <PolicySection
                  id="acceptance"
                  number="01"
                  title="Acceptance of these terms"
                  icon={<CheckCircle2 size={19} />}
                >
                  <p>
                    By accessing or using CipherLab, you agree to follow these
                    Terms of Use and to use the website and its tools
                    responsibly.
                  </p>

                  <p>
                    If you do not agree with these terms, you should not use the
                    website or its tools.
                  </p>

                  <div className="mt-5 rounded-2xl border border-indigo-400/20 bg-indigo-400/5 p-5">
                    <div className="flex items-start gap-3">
                      <Info
                        size={20}
                        className="mt-0.5 shrink-0 text-indigo-400"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          Please use your judgment
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-300">
                          CipherLab provides general-purpose tools and
                          educational information. You are responsible for
                          determining whether a particular tool or technique is
                          suitable for your situation.
                        </p>
                      </div>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection
                  id="about-cipherlab"
                  number="02"
                  title="About CipherLab"
                  icon={<BookOpen size={19} />}
                >
                  <p>
                    CipherLab is a web-based resource focused on practical
                    cryptography, security utilities, data encoding, hashing,
                    key-related operations, and educational material.
                  </p>

                  <p>
                    The website is intended to help users understand and perform
                    common technical operations through accessible browser-based
                    tools and explanatory content.
                  </p>

                  <p>
                    CipherLab is not intended to replace professional
                    cybersecurity advice, security audits, legal advice, or
                    specialized security engineering.
                  </p>
                </PolicySection>

                <PolicySection
                  id="tool-use"
                  number="03"
                  title="Use of CipherLab tools"
                  icon={<Wrench size={19} />}
                >
                  <p>
                    You may use the available tools for lawful personal,
                    educational, development, testing, research, and other
                    legitimate purposes, subject to these terms and applicable
                    laws.
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <UseCard
                      title="Appropriate use"
                      text="Learning cryptographic concepts, testing data transformations, checking hashes, generating development values, and other legitimate technical activities."
                      icon={<CheckCircle2 size={18} />}
                    />

                    <UseCard
                      title="Use responsibly"
                      text="Review the algorithm, parameters, implementation, and security assumptions before relying on output for an important application."
                      icon={<ShieldCheck size={18} />}
                    />
                  </div>
                </PolicySection>

                <PolicySection
                  id="tool-output"
                  number="04"
                  title="Tool output"
                  icon={<FileText size={19} />}
                >
                  <p>
                    CipherLab tools may generate hashes, encoded values,
                    ciphertext, keys, random data, identifiers, analysis
                    results, or other technical output.
                  </p>

                  <p>
                    Output should be reviewed before being used in production
                    systems, security-sensitive workflows, legal processes, or
                    other situations where incorrect or unsuitable output could
                    cause harm.
                  </p>

                  <p>
                    The existence of a particular algorithm or option in a
                    CipherLab tool does not mean that it is appropriate for
                    every security scenario.
                  </p>

                  <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          Verify security-sensitive output
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-300">
                          For production cryptographic systems, verify the
                          algorithm, parameters, key management, randomness,
                          implementation, and surrounding application design
                          rather than relying solely on a generated result.
                        </p>
                      </div>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection
                  id="security"
                  number="05"
                  title="Security limitations"
                  icon={<LockKeyhole size={19} />}
                >
                  <p>
                    No website, browser, operating system, device, or
                    cryptographic implementation can provide an absolute
                    guarantee of security in every environment.
                  </p>

                  <p>
                    The security of information handled through CipherLab can be
                    affected by your device, browser configuration, browser
                    extensions, malware, operating system, network, account
                    security, key management practices, and other surrounding
                    systems.
                  </p>

                  <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
                    <div className="flex items-start gap-3">
                      <ShieldAlert
                        size={20}
                        className="mt-0.5 shrink-0 text-red-400"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          Do not treat the website as a secure vault
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-300">
                          Do not assume that using a browser-based tool makes a
                          secret automatically safe. Avoid entering passwords,
                          private keys, API credentials, recovery codes, or
                          other highly sensitive secrets unless you understand
                          the risks and the specific tool's implementation.
                        </p>
                      </div>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection
                  id="responsibility"
                  number="06"
                  title="Your responsibility"
                  icon={<ShieldCheck size={19} />}
                >
                  <p>
                    You are responsible for your use of CipherLab and for
                    determining whether the website and its tools are
                    appropriate for your intended purpose.
                  </p>

                  <p>
                    You are also responsible for protecting any credentials,
                    keys, files, or other sensitive information on your own
                    device and for maintaining appropriate backups where
                    necessary.
                  </p>

                  <p>
                    Before using cryptographic output in an important system,
                    you should understand the relevant algorithm, key
                    management, encoding, authentication, and implementation
                    requirements.
                  </p>
                </PolicySection>

                <PolicySection
                  id="prohibited-use"
                  number="07"
                  title="Prohibited use"
                  icon={<ShieldAlert size={19} />}
                >
                  <p>
                    You must not use CipherLab to facilitate unlawful activity,
                    abuse, unauthorized access, fraud, harassment, or other
                    conduct prohibited by applicable law.
                  </p>

                  <p>
                    You must not intentionally interfere with the website,
                    attempt to compromise its infrastructure, circumvent
                    security controls, abuse services, or disrupt access for
                    other users.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <ProhibitedItem>
                      Unauthorized access or intrusion
                    </ProhibitedItem>

                    <ProhibitedItem>
                      Deliberate service disruption
                    </ProhibitedItem>

                    <ProhibitedItem>
                      Abuse of website infrastructure
                    </ProhibitedItem>

                    <ProhibitedItem>
                      Fraudulent or unlawful activity
                    </ProhibitedItem>
                  </div>
                </PolicySection>

                <PolicySection
                  id="intellectual-property"
                  number="08"
                  title="Intellectual property"
                  icon={<FileText size={19} />}
                >
                  <p>
                    Unless otherwise indicated, the CipherLab website, including
                    its original interface, branding, written content, design
                    elements, and software components, may be protected by
                    applicable intellectual-property laws.
                  </p>

                  <p>
                    You may use the website and its tools for their intended
                    purposes, but you should not copy, redistribute, reproduce,
                    or commercially exploit protected website content or
                    components in ways that violate applicable rights or laws.
                  </p>

                  <p>
                    Third-party libraries, algorithms, standards, trademarks,
                    and other referenced materials remain subject to their
                    respective licenses and rights.
                  </p>
                </PolicySection>

                <PolicySection
                  id="third-party-services"
                  number="09"
                  title="Third-party services"
                  icon={<Info size={19} />}
                >
                  <p>
                    CipherLab may use third-party services for functions such as
                    hosting, email delivery, analytics, advertising, security,
                    or other infrastructure.
                  </p>

                  <p>
                    Third-party services may have their own terms, privacy
                    policies, cookies, limitations, and requirements. Your use
                    of a feature that depends on a third-party service may
                    therefore also be subject to that provider's applicable
                    terms.
                  </p>
                </PolicySection>

                <PolicySection
                  id="availability"
                  number="10"
                  title="Availability and changes"
                  icon={<RefreshCw size={19} />}
                >
                  <p>
                    CipherLab is provided as an evolving website. Tools,
                    algorithms, features, educational content, interfaces, and
                    routes may be added, modified, temporarily unavailable, or
                    discontinued.
                  </p>

                  <p>
                    We may also perform maintenance or make technical changes
                    that temporarily affect availability or functionality.
                  </p>

                  <p>
                    We do not guarantee that every tool or feature will remain
                    available indefinitely or that a particular implementation
                    will remain unchanged.
                  </p>
                </PolicySection>

                <PolicySection
                  id="disclaimer"
                  number="11"
                  title="Disclaimer"
                  icon={<AlertCircle size={19} />}
                >
                  <p>
                    CipherLab and its tools are provided on an "as available"
                    basis for general-purpose use. Information and tool output
                    are provided without a guarantee that they will always be
                    complete, accurate, current, error-free, or suitable for a
                    particular purpose.
                  </p>

                  <p>
                    You should independently verify important technical
                    information and security decisions, especially when they
                    affect production systems, confidential information,
                    financial matters, legal obligations, or personal safety.
                  </p>

                  <p>
                    Nothing on CipherLab should be interpreted as professional
                    legal, financial, cybersecurity, or other specialized
                    advice.
                  </p>
                </PolicySection>

                <PolicySection
                  id="changes"
                  number="12"
                  title="Changes to these terms"
                  icon={<RefreshCw size={19} />}
                >
                  <p>
                    These Terms of Use may be updated as CipherLab develops,
                    introduces new functionality, changes its services, or
                    responds to applicable requirements.
                  </p>

                  <p>
                    When changes are made, the revised version will be published
                    on this page and the "Last updated" date will be changed
                    accordingly.
                  </p>

                  <p>
                    Your continued use of CipherLab after updated terms are
                    published may constitute acceptance of the revised terms, to
                    the extent permitted by applicable law.
                  </p>
                </PolicySection>

                {/* =================================================
                    FINAL SUMMARY
                ================================================== */}

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-white/[0.025] to-emerald-500/5 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                      <Gavel size={20} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-white">In short</h2>

                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Use CipherLab lawfully and responsibly, understand the
                        security properties and limitations of the tools you
                        use, and independently verify important results before
                        relying on them in security-sensitive or production
                        environments.
                      </p>

                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        By using the website, you acknowledge that CipherLab is
                        a general-purpose technical and educational resource
                        rather than a substitute for professional security
                        engineering or specialized advice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

/* =========================================================
   Reusable Components
========================================================= */

function PolicySection({ id, number, title, icon, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold tracking-[0.15em] text-indigo-400">
              {number}
            </span>

            <span className="text-slate-600">/</span>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              {title}
            </h2>
          </div>

          <div className="mt-5 space-y-4 text-[15px] leading-8 text-slate-300">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}

function ProhibitedItem({ children }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">
      <AlertCircle size={16} className="shrink-0 text-red-400" />
      <span>{children}</span>
    </div>
  );
}

function TocLink({ href, children }) {
  return (
    <a
      href={href}
      className="block rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
    >
      {children}
    </a>
  );
}
