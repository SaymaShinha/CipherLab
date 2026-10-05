import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";

import SEO from "../components/SEO.jsx";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("sending");
    setErrorMessage("");

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus("error");

      setErrorMessage(
        "The email service is not configured. Please configure the EmailJS environment variables before deploying.",
      );

      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          url: "https://cipher-lab-crypto.vercel.app/",

          name: form.name,
          email: form.email,
          user_email: form.email,
          user_name: form.name,
          title: form.subject,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      console.error("EMAILJS CONTACT ERROR:", error);

      setStatus("error");

      setErrorMessage(
        "We could not send your message right now. Please check your connection and try again.",
      );
    }
  };

  return (
    <>
      <SEO
        title="Contact CipherLab | Questions, Feedback & Support"
        description="Contact CipherLab with questions, suggestions, corrections, feature requests, or reports about cryptography and security tools."
        canonical="/contact"
      />

      <main className="min-h-screen bg-slate-950 text-slate-200">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.09] via-transparent to-transparent" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">
                <Mail size={14} />
                Contact CipherLab
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                We would love to
                <br />
                hear from you.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Have a question about a security tool, found something that does
                not work as expected, or have an idea for a useful feature? Send
                us a message and let us know.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* =================================================
                LEFT INFORMATION
            ================================================== */}

            <div>
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-400">
                  How can we help?
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Tell us what you need
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-300">
                  Whether you are learning cryptography, using one of our
                  developer utilities, or simply exploring security concepts,
                  your questions and feedback help us improve CipherLab.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <ContactCard
                  icon={<MessageSquare size={20} />}
                  title="Questions & support"
                  text="Ask about a tool, its purpose, or how a particular cryptographic operation works."
                />

                <ContactCard
                  icon={<CheckCircle2 size={20} />}
                  title="Feedback & suggestions"
                  text="Tell us what could make CipherLab easier, clearer, or more useful."
                />

                <ContactCard
                  icon={<AlertCircle size={20} />}
                  title="Report a problem"
                  text="Found an incorrect result, unexpected behavior, broken page, or technical issue? Let us know."
                />
              </div>

              {/* Trust information */}
              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Privacy-conscious design
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-300">
                      Many CipherLab tools are designed to process information
                      directly in your browser. The contact form is separate and
                      uses our configured email service to deliver your message.
                    </p>
                  </div>
                </div>
              </div>

              {/* Response expectations */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-slate-300">
                    <Clock3 size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      What to include
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-300">
                      For technical issues, include the tool name, what you
                      expected to happen, and what actually happened. Avoid
                      sending passwords, private keys, or other sensitive
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                CONTACT FORM
            ================================================== */}

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-black/20 sm:p-7 lg:p-8">
              <div className="border-b border-white/10 pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-400">
                  Contact form
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Fill in the form below and provide as much useful context as
                  possible.
                </p>
              </div>

              {/* Success message */}
              {status === "success" && (
                <div
                  role="status"
                  className="mt-6 flex gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <div>
                    <p className="font-semibold text-emerald-300">
                      Message sent successfully.
                    </p>

                    <p className="mt-1 leading-6 text-emerald-200/80">
                      Thank you for contacting CipherLab. We appreciate your
                      message and feedback.
                    </p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {status === "error" && (
                <div
                  role="alert"
                  className="mt-6 flex gap-3 rounded-2xl border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-200"
                >
                  <AlertCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-red-400"
                  />

                  <p className="leading-6">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="Name"
                    htmlFor="name"
                    required
                    icon={<User size={17} />}
                  >
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </FormField>

                  <FormField
                    label="Email"
                    htmlFor="email"
                    required
                    icon={<Mail size={17} />}
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      maxLength={150}
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </FormField>
                </div>

                {/* Subject */}
                <FormField label="Subject" htmlFor="subject" required>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    placeholder="What would you like to tell us?"
                    className={inputClass}
                  />
                </FormField>

                {/* Message */}
                <FormField label="Message" htmlFor="message" required>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={8}
                    placeholder="Describe your question, feedback, suggestion, or issue..."
                    className={`${inputClass} min-h-[180px] resize-y leading-7`}
                  />

                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Minimum 10 characters
                    </span>

                    <span
                      className={
                        form.message.length > 4500
                          ? "font-medium text-amber-400"
                          : "text-slate-500"
                      }
                    >
                      {form.message.length}/5000
                    </span>
                  </div>
                </FormField>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending message...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>

                <div className="flex items-start justify-center gap-2 text-center text-xs leading-5 text-slate-500">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0" />

                  <p>
                    Please do not include passwords, private keys, recovery
                    codes, or other highly sensitive information in your
                    message.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* =====================================================
            FAQ-STYLE INFORMATION
        ====================================================== */}

        <section className="border-t border-white/10 bg-white/[0.015]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-400">
                Before contacting us
              </p>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                A few useful things to know
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <InfoBlock
                title="Technical questions"
                text="When asking about a tool, mention the tool name and describe the input and output you are seeing."
              />

              <InfoBlock
                title="Security concerns"
                text="Never send actual passwords, secret keys, API tokens, recovery phrases, or confidential plaintext through the contact form."
              />

              <InfoBlock
                title="Feature requests"
                text="Useful suggestions are welcome. Explain the problem you are trying to solve so the proposed feature can be evaluated properly."
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <section className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-18">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-400">
            <Mail size={22} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
            Have something to share?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Your questions, corrections, and suggestions help make CipherLab a
            more useful resource for developers and people learning
            cryptography.
          </p>
        </section>
      </main>
    </>
  );
}

/* =========================================================
   Reusable Components
========================================================= */

const inputClass =
  "w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3.5 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 hover:border-white/25 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20";

function FormField({ label, htmlFor, required = false, icon, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-white"
      >
        {icon && <span className="text-indigo-400">{icon}</span>}

        <span>{label}</span>

        {required && (
          <span className="text-red-400" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

function ContactCard({ icon, title, text }) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-indigo-400/20 hover:bg-white/[0.045]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400 transition group-hover:bg-indigo-400/15">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-white">{title}</h3>

        <p className="mt-1.5 text-sm leading-6 text-slate-300">{text}</p>
      </div>
    </div>
  );
}

function InfoBlock({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="text-base font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-300">{text}</p>
    </div>
  );
}
