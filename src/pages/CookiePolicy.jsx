import {
  AlertCircle,
  CheckCircle2,
  Cookie,
  Eye,
  Settings2,
  ShieldCheck,
} from "lucide-react";

import SEO from "../components/SEO.jsx";

export default function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy | CipherLab"
        description="Learn how CipherLab may use cookies and similar technologies for website functionality, preferences, analytics, and advertising."
        canonical="/cookie-policy"
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
                <Cookie size={14} />
                Privacy & Cookies
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Cookie Policy
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                This policy explains what cookies and similar technologies are,
                how they may be used on CipherLab, and how you can manage them
                through your browser.
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
            {/* Table of contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">
                  On this page
                </p>

                <nav className="mt-4 space-y-2 text-sm">
                  <TocLink href="#what-are-cookies">What are cookies?</TocLink>

                  <TocLink href="#how-cipherlab-uses-cookies">
                    How CipherLab may use cookies
                  </TocLink>

                  <TocLink href="#types-of-cookies">Types of cookies</TocLink>

                  <TocLink href="#third-party-services">
                    Third-party services
                  </TocLink>

                  <TocLink href="#managing-cookies">Managing cookies</TocLink>

                  <TocLink href="#local-storage">Local browser storage</TocLink>

                  <TocLink href="#updates">Policy updates</TocLink>
                </nav>
              </div>
            </aside>

            {/* Article */}
            <article className="min-w-0">
              <div className="space-y-8">
                <PolicySection
                  id="what-are-cookies"
                  number="01"
                  title="What are cookies?"
                >
                  <p>
                    Cookies are small pieces of information that a website may
                    store in your web browser. They can help websites remember
                    certain information between visits or during a browsing
                    session.
                  </p>

                  <p>
                    Cookies can serve different purposes, including essential
                    functionality, preferences, analytics, security, and
                    advertising.
                  </p>
                </PolicySection>

                <PolicySection
                  id="how-cipherlab-uses-cookies"
                  number="02"
                  title="How CipherLab may use cookies"
                >
                  <p>
                    CipherLab may use cookies or similar technologies when
                    needed to operate, understand, improve, or monetize the
                    website.
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <PurposeCard
                      icon={<CheckCircle2 size={19} />}
                      title="Essential functionality"
                      text="Technologies may be used when necessary for website features or basic functionality."
                    />

                    <PurposeCard
                      icon={<Settings2 size={19} />}
                      title="Preferences"
                      text="Cookies or browser storage may help remember certain settings or preferences."
                    />

                    <PurposeCard
                      icon={<Eye size={19} />}
                      title="Analytics"
                      text="If analytics services are enabled, similar technologies may help us understand how the website is used."
                    />

                    <PurposeCard
                      icon={<ShieldCheck size={19} />}
                      title="Security"
                      text="Certain technologies may support security, abuse prevention, or reliable operation."
                    />
                  </div>
                </PolicySection>

                <PolicySection
                  id="types-of-cookies"
                  number="03"
                  title="Types of cookies"
                >
                  <p>
                    Depending on the services and features enabled on CipherLab,
                    cookies can generally be grouped into several categories.
                  </p>

                  <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[620px] text-left text-sm">
                        <thead className="bg-white/[0.05]">
                          <tr>
                            <th className="px-5 py-4 font-semibold text-white">
                              Type
                            </th>

                            <th className="px-5 py-4 font-semibold text-white">
                              Purpose
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-white/10">
                          <CookieRow
                            type="Essential"
                            description="Used for functionality that may be necessary for the website to operate."
                          />

                          <CookieRow
                            type="Preference"
                            description="May remember settings or choices made during browsing."
                          />

                          <CookieRow
                            type="Analytics"
                            description="May help understand website usage and improve content or functionality."
                          />

                          <CookieRow
                            type="Advertising"
                            description="May be used by advertising providers to deliver or measure advertisements where applicable."
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection
                  id="third-party-services"
                  number="04"
                  title="Third-party services"
                >
                  <p>
                    CipherLab may use third-party services for functions such as
                    analytics, advertising, hosting, security, or other website
                    operations.
                  </p>

                  <p>
                    When such services are enabled, the relevant provider may
                    use cookies, local storage, pixels, or other technologies
                    according to its own policies and configuration.
                  </p>

                  <div className="mt-5 flex gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
                    <AlertCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-amber-400"
                    />

                    <div>
                      <h3 className="font-semibold text-white">
                        Third-party technologies
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-slate-300">
                        Third-party cookies and similar technologies are
                        controlled by the providers that operate those services.
                        Their use may change when services, advertising
                        providers, or website functionality change.
                      </p>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection
                  id="managing-cookies"
                  number="05"
                  title="Managing cookies"
                >
                  <p>
                    Most modern browsers provide settings that allow you to
                    control cookies. Depending on your browser, you may be able
                    to view, block, restrict, or delete stored cookies.
                  </p>

                  <p>
                    Blocking certain cookies can sometimes affect the
                    functionality or appearance of websites that depend on them.
                  </p>

                  <div className="mt-5 rounded-2xl border border-indigo-400/20 bg-indigo-400/5 p-5">
                    <div className="flex items-start gap-3">
                      <Settings2
                        size={20}
                        className="mt-0.5 shrink-0 text-indigo-400"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          Browser controls
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-300">
                          To manage cookies, open your browser's privacy or
                          site-settings controls. The exact options vary between
                          browsers and devices.
                        </p>
                      </div>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection
                  id="local-storage"
                  number="06"
                  title="Local storage and similar technologies"
                >
                  <p>
                    Websites can also use browser technologies such as
                    localStorage or sessionStorage. These are different from
                    traditional HTTP cookies but can similarly store information
                    on your device.
                  </p>

                  <p>
                    CipherLab tools may use browser-side storage when a feature
                    requires information to persist between interactions or
                    sessions. The exact use depends on the individual tool or
                    website feature.
                  </p>

                  <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
                    <div className="flex items-start gap-3">
                      <ShieldCheck
                        size={20}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          Do not store secrets unnecessarily
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-300">
                          Avoid storing passwords, private keys, API tokens, or
                          other highly sensitive information in browser storage
                          unless you fully understand the security implications.
                        </p>
                      </div>
                    </div>
                  </div>
                </PolicySection>

                <PolicySection id="updates" number="07" title="Policy updates">
                  <p>
                    This Cookie Policy may be updated when CipherLab adds or
                    changes website functionality, analytics, advertising,
                    storage mechanisms, or third-party services.
                  </p>

                  <p>
                    The updated version will be published on this page with a
                    revised "Last updated" date.
                  </p>
                </PolicySection>

                {/* Final notice */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-white/[0.03] to-emerald-500/5 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                      <Cookie size={20} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-white">In short</h2>

                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Cookies and similar browser technologies can support
                        website functionality, preferences, analytics, security,
                        and advertising. Their actual use on CipherLab may
                        depend on the features and third-party services
                        currently enabled on the website.
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

function PolicySection({ id, number, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-lg bg-indigo-400/10 px-2.5 py-1.5 text-xs font-bold tracking-wider text-indigo-300">
          {number}
        </span>

        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {title}
          </h2>

          <div className="mt-5 space-y-4 text-[15px] leading-8 text-slate-300">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function PurposeCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}

function CookieRow({ type, description }) {
  return (
    <tr className="bg-slate-950/50">
      <td className="px-5 py-4 align-top font-semibold text-indigo-300">
        {type}
      </td>

      <td className="px-5 py-4 align-top leading-6 text-slate-300">
        {description}
      </td>
    </tr>
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
