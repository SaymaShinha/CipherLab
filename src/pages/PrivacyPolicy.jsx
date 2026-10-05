import {
  AlertCircle,
  CheckCircle2,
  Cookie,
  Database,
  Eye,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import SEO from "../components/SEO.jsx";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | CipherLab"
        description="Read the CipherLab Privacy Policy to understand how information may be handled when using our browser-based cryptography, security tools, website, and contact services."
        canonical="/privacy-policy"
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
                <ShieldCheck size={14} />
                Privacy & Data
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Privacy Policy
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                This policy explains how information may be handled when you
                visit CipherLab, use its tools, interact with the website, or
                contact us.
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
                  <TocLink href="#overview">Overview</TocLink>
                  <TocLink href="#information-we-collect">
                    Information we may collect
                  </TocLink>
                  <TocLink href="#tool-input">Tool input & processing</TocLink>
                  <TocLink href="#browser-storage">Browser storage</TocLink>
                  <TocLink href="#analytics">Analytics</TocLink>
                  <TocLink href="#advertising">Advertising</TocLink>
                  <TocLink href="#contact-information">
                    Contact information
                  </TocLink>
                  <TocLink href="#third-party-services">
                    Third-party services
                  </TocLink>
                  <TocLink href="#data-security">Data security</TocLink>
                  <TocLink href="#children">Children's privacy</TocLink>
                  <TocLink href="#changes">Changes</TocLink>
                </nav>
              </div>
            </aside>

            {/* =================================================
                POLICY CONTENT
            ================================================== */}

            <article className="min-w-0">
              <div className="space-y-8">
                <PolicySection
                  id="overview"
                  number="01"
                  title="Overview"
                  icon={<ShieldCheck size={19} />}
                >
                  <p>
                    CipherLab provides browser-based cryptography, security,
                    encoding, hashing, and educational tools. We aim to minimize
                    unnecessary collection of personal information and to be
                    transparent about how information may be handled.
                  </p>

                  <p>
                    Different parts of the website may use different
                    technologies. For example, a client-side tool may process an
                    input in your browser, while a contact form may use a
                    third-party email delivery service.
                  </p>

                  <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          Privacy-conscious approach
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-300">
                          Where a tool is specifically implemented for
                          client-side processing, its operation is designed to
                          avoid intentionally sending the tool input to a
                          CipherLab processing server.
                        </p>
                      </div>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection
                  id="information-we-collect"
                  number="02"
                  title="Information we may collect"
                  icon={<Database size={19} />}
                >
                  <p>
                    The information handled by CipherLab depends on how you use
                    the website and which services are enabled.
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <InformationCard
                      icon={<Eye size={18} />}
                      title="Technical information"
                      text="Hosting, security, analytics, or other website services may process technical information such as browser, device, or request data."
                    />

                    <InformationCard
                      icon={<Mail size={18} />}
                      title="Information you provide"
                      text="If you contact us, we may receive information such as your name, email address, subject, and message."
                    />

                    <InformationCard
                      icon={<Cookie size={18} />}
                      title="Cookies & storage"
                      text="Cookies or browser storage may be used for functionality, preferences, analytics, security, or advertising where applicable."
                    />

                    <InformationCard
                      icon={<FileText size={18} />}
                      title="Tool information"
                      text="Some tools may process information you enter directly in your browser. The behavior depends on the specific tool."
                    />
                  </div>
                </PolicySection>

                <PolicySection
                  id="tool-input"
                  number="03"
                  title="Tool input and processing"
                  icon={<LockKeyhole size={19} />}
                >
                  <p>
                    Many CipherLab utilities are designed to perform supported
                    operations directly within your browser. Examples can
                    include hashing, encoding, random-value generation, and
                    cryptographic operations implemented using browser APIs.
                  </p>

                  <p>
                    When a tool performs an operation entirely in the browser,
                    CipherLab does not intentionally send that input to a
                    CipherLab processing server as part of the operation.
                  </p>

                  <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          Important security reminder
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-300">
                          Browser-based processing should not be interpreted as
                          a guarantee that information is safe in every
                          environment. Avoid entering highly sensitive
                          production secrets into demonstration or educational
                          tools unless you have reviewed the implementation and
                          understand the associated risks.
                        </p>
                      </div>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection
                  id="browser-storage"
                  number="04"
                  title="Browser storage"
                  icon={<Database size={19} />}
                >
                  <p>
                    Some website features may use technologies such as
                    localStorage, sessionStorage, cookies, or similar browser
                    storage mechanisms.
                  </p>

                  <p>
                    Browser storage can allow a website to remember information
                    or preferences between interactions. Storage behavior
                    depends on the specific feature and implementation.
                  </p>

                  <p>
                    You can generally inspect or remove browser-stored
                    information through your browser's privacy and site
                    settings.
                  </p>
                </PolicySection>

                <PolicySection
                  id="analytics"
                  number="05"
                  title="Analytics and measurement"
                  icon={<Eye size={19} />}
                >
                  <p>
                    CipherLab may use analytics or similar measurement services
                    to understand how visitors interact with the website,
                    identify usability problems, and improve content and
                    functionality.
                  </p>

                  <p>
                    If such services are enabled, the relevant providers may
                    process technical or usage information according to their
                    own privacy policies and configuration.
                  </p>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <p className="text-sm leading-7 text-slate-300">
                      Third-party analytics should only be considered part of
                      the site's data practices when those services are actually
                      enabled. This policy may be updated when analytics
                      providers or configurations change.
                    </p>
                  </div>
                </PolicySection>

                <PolicySection
                  id="advertising"
                  number="06"
                  title="Advertising"
                  icon={<Eye size={19} />}
                >
                  <p>
                    CipherLab may display advertising in the future or may use
                    advertising services when applicable.
                  </p>

                  <p>
                    Advertising providers may use cookies, identifiers, local
                    storage, pixels, or similar technologies to deliver,
                    personalize, measure, or limit advertisements, subject to
                    their applicable policies and user choices.
                  </p>

                  <div className="mt-5 rounded-2xl border border-indigo-400/20 bg-indigo-400/5 p-5">
                    <div className="flex items-start gap-3">
                      <ShieldCheck
                        size={20}
                        className="mt-0.5 shrink-0 text-indigo-400"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          Advertising transparency
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-300">
                          Advertising technologies and their data practices are
                          generally controlled by the advertising provider. If
                          advertising is enabled, users should also review the
                          provider's applicable privacy and cookie information.
                        </p>
                      </div>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection
                  id="contact-information"
                  number="07"
                  title="Contact information"
                  icon={<Mail size={19} />}
                >
                  <p>
                    If you contact CipherLab through the contact form, the
                    information you submit may include your name, email address,
                    subject, and message.
                  </p>

                  <p>
                    This information may be used to understand and respond to
                    your request, investigate reported issues, provide
                    appropriate support, and maintain reasonable communication
                    records.
                  </p>

                  <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-red-400"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          Do not send secrets
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-300">
                          Never include passwords, private keys, API tokens,
                          recovery codes, financial credentials, or other
                          confidential secrets in a support message.
                        </p>
                      </div>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection
                  id="third-party-services"
                  number="08"
                  title="Third-party services"
                  icon={<UserCheck size={19} />}
                >
                  <p>
                    CipherLab may rely on third-party providers for services
                    such as hosting, email delivery, analytics, advertising,
                    security, or other website infrastructure.
                  </p>

                  <p>
                    These providers may process information according to their
                    own terms, privacy policies, technical configurations, and
                    applicable requirements.
                  </p>

                  <p>
                    When third-party services are introduced or materially
                    changed, this Privacy Policy should be reviewed and updated
                    where appropriate.
                  </p>
                </PolicySection>

                <PolicySection
                  id="data-security"
                  number="09"
                  title="Data security"
                  icon={<LockKeyhole size={19} />}
                >
                  <p>
                    CipherLab aims to use reasonable technical and
                    organizational measures appropriate to the services it
                    operates. However, no website, browser, network, or
                    electronic transmission can be guaranteed to be completely
                    secure.
                  </p>

                  <p>
                    Users should take appropriate precautions when handling
                    sensitive information and should avoid placing confidential
                    secrets into tools or forms unless the intended security
                    properties have been verified.
                  </p>
                </PolicySection>

                <PolicySection
                  id="children"
                  number="10"
                  title="Children's privacy"
                  icon={<UserCheck size={19} />}
                >
                  <p>
                    CipherLab is intended primarily as a general-purpose
                    educational and developer resource. We do not intentionally
                    request unnecessary personal information from children.
                  </p>

                  <p>
                    If you believe that a child has provided personal
                    information through the website in a manner that should be
                    addressed, please contact us so the situation can be
                    reviewed.
                  </p>
                </PolicySection>

                <PolicySection
                  id="changes"
                  number="11"
                  title="Changes to this policy"
                  icon={<FileText size={19} />}
                >
                  <p>
                    This Privacy Policy may be updated when CipherLab's
                    functionality, data practices, third-party services, or
                    applicable requirements change.
                  </p>

                  <p>
                    When changes are made, the revised policy will be published
                    on this page and the "Last updated" date will be changed
                    accordingly.
                  </p>
                </PolicySection>

                {/* =================================================
                    FINAL SUMMARY
                ================================================== */}

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-white/[0.025] to-emerald-500/5 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Our privacy approach
                      </h2>

                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        CipherLab aims to provide useful cryptography and
                        security tools while minimizing unnecessary information
                        collection. Where supported tools process data locally,
                        the design aims to avoid intentionally sending that tool
                        input to a CipherLab processing server.
                      </p>

                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        Because website functionality and third-party services
                        can change, this policy should be read together with the
                        Cookie Policy and the current behavior of the website.
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

function InformationCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
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
