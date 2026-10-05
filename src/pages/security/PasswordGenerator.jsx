// src/pages/tools/PasswordGenerator.jsx

import { useMemo, useState } from "react";
import {
  Check,
  Dices,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import SEO from "../../components/SEO.jsx";
import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";
import PrivacyBadge from "../../components/PrivacyBadge.jsx";

import { generateSecurePassword } from "../../utils/random.js";
import { faqData } from "../../data/faq.js";
import { tools } from "../../data/tools.js";

const relatedTools = tools.filter((tool) =>
  [
    "/tools/security/random-bytes",
    "/tools/encryption/aes-256-gcm",
    "/tools/authentication-keys/hmac",
  ].includes(tool.path),
);

function getStrength(length, enabledTypes) {
  const score = length + enabledTypes * 8;

  if (score >= 64) {
    return {
      label: "Very Strong",
      description: "Excellent length and character diversity.",
      className: "text-emerald-400",
      barClass: "bg-emerald-400",
      width: "100%",
    };
  }

  if (score >= 48) {
    return {
      label: "Strong",
      description: "Good resistance to common guessing attacks.",
      className: "text-green-400",
      barClass: "bg-green-400",
      width: "78%",
    };
  }

  if (score >= 32) {
    return {
      label: "Moderate",
      description: "Consider increasing length or character diversity.",
      className: "text-amber-400",
      barClass: "bg-amber-400",
      width: "52%",
    };
  }

  return {
    label: "Weak",
    description: "Use a longer password with more character types.",
    className: "text-red-400",
    barClass: "bg-red-400",
    width: "28%",
  };
}

const characterOptions = [
  {
    key: "uppercase",
    label: "Uppercase",
    description: "A–Z",
  },
  {
    key: "lowercase",
    label: "Lowercase",
    description: "a–z",
  },
  {
    key: "numbers",
    label: "Numbers",
    description: "0–9",
  },
  {
    key: "symbols",
    label: "Symbols",
    description: "!@#$%",
  },
];

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const enabledTypes = [uppercase, lowercase, numbers, symbols].filter(
    Boolean,
  ).length;

  const strength = useMemo(
    () => getStrength(length, enabledTypes),
    [length, enabledTypes],
  );

  const generate = () => {
    try {
      const result = generateSecurePassword({
        length,
        uppercase,
        lowercase,
        numbers,
        symbols,
      });

      setPassword(result);
    } catch (error) {
      setPassword("");
      alert(error.message);
    }
  };

  const clear = () => {
    setPassword("");
  };

  const characterState = {
    uppercase,
    lowercase,
    numbers,
    symbols,
  };

  const characterSetters = {
    uppercase: setUppercase,
    lowercase: setLowercase,
    numbers: setNumbers,
    symbols: setSymbols,
  };

  return (
    <>
      <SEO
        title="Secure Password Generator | Random Strong Passwords"
        description="Generate strong random passwords locally in your browser using cryptographically secure randomness. Customize length, uppercase letters, lowercase letters, numbers, and symbols."
        canonical="/tools/security/password-generator"
      />

      <ToolLayout
        title="Secure Password Generator"
        description="Create strong, random passwords with cryptographically secure browser randomness."
        intro={
          <>
            <p>
              A strong password should be long, unpredictable, and unique to the
              account where it is used. CipherLab's password generator creates
              random passwords directly in your browser.
            </p>

            <p className="mt-4">
              The generator uses the browser's cryptographically secure random
              number generator rather than predictable values such as
              <code className="mx-1 rounded bg-slate-800 px-1.5 py-0.5 text-cyan-300">
                Math.random()
              </code>
              . You can control the password length and the character categories
              included in the result.
            </p>
          </>
        }
        howToUse={[
          "Choose a password length between 8 and 128 characters.",
          "Select the character categories you want to include.",
          "Click Generate Password.",
          "Copy the generated password and store it securely.",
        ]}
        features={[
          {
            title: "Cryptographically secure randomness",
            description:
              "Uses the browser's Web Crypto API rather than predictable pseudo-random generation.",
          },
          {
            title: "Flexible length",
            description:
              "Generate passwords from 8 to 128 characters for different security requirements.",
          },
          {
            title: "Character controls",
            description:
              "Choose uppercase letters, lowercase letters, numbers, and symbols.",
          },
          {
            title: "Client-side generation",
            description:
              "Password generation is performed locally by your browser.",
          },
        ]}
        example={
          <div className="p-5">
            <div className="rounded-xl border border-white/10 bg-slate-950 p-5 font-mono text-sm text-slate-300">
              <div>
                <span className="text-slate-500">Length:</span>{" "}
                <span className="text-cyan-300">20</span>
              </div>
              <div>
                <span className="text-slate-500">Uppercase:</span>{" "}
                <span className="text-emerald-300">Yes</span>
              </div>
              <div>
                <span className="text-slate-500">Lowercase:</span>{" "}
                <span className="text-emerald-300">Yes</span>
              </div>
              <div>
                <span className="text-slate-500">Numbers:</span>{" "}
                <span className="text-emerald-300">Yes</span>
              </div>
              <div>
                <span className="text-slate-500">Symbols:</span>{" "}
                <span className="text-emerald-300">Yes</span>
              </div>
            </div>
          </div>
        }
        aboutTitle="What Makes a Password Strong?"
        aboutContent={
          <>
            <p>
              Password strength depends heavily on unpredictability and
              effective password length. A randomly generated password with a
              sufficiently large character set is generally much harder to guess
              than a short password based on predictable information.
            </p>

            <p className="mt-4">
              Avoid names, birthdays, common words, keyboard patterns, repeated
              characters, and passwords that have already been used elsewhere.
              Password reuse is particularly risky because a breach of one
              service can expose accounts that share the same password.
            </p>

            <p className="mt-4">
              For important accounts, use a reputable password manager and
              enable multi-factor authentication whenever it is available.
            </p>
          </>
        }
        useCases={[
          {
            title: "Account security",
            description:
              "Create unique random passwords for websites and online services.",
          },
          {
            title: "Development",
            description:
              "Generate random credentials and test values for development environments.",
          },
          {
            title: "Password managers",
            description:
              "Create high-entropy passwords before saving them in a password manager.",
          },
          {
            title: "Security testing",
            description:
              "Generate controlled random credentials for authorized testing environments.",
          },
        ]}
        faqItems={faqData["password-generator"]}
        relatedTools={relatedTools}
      >
        <div className="space-y-6">
          {/* Privacy */}
          <PrivacyBadge text="Password generation happens locally in your browser." />

          {/* Tool Header */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-slate-900/80 to-cyan-500/10 shadow-2xl">
            <div className="border-b border-white/10 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/20">
                    <LockKeyhole size={21} className="text-indigo-300" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Password Generator
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Configure the password and generate secure random output.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 font-medium text-emerald-300">
                    Web Crypto
                  </span>

                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 font-medium text-cyan-300">
                    Client-side
                  </span>
                </div>
              </div>
            </div>

            {/* Security properties */}
            <div className="grid border-b border-white/10 sm:grid-cols-3">
              <SecurityProperty label="Randomness" value="Cryptographic" />

              <SecurityProperty
                label="Length"
                value={`${length} characters`}
                border
              />

              <SecurityProperty
                label="Character types"
                value={`${enabledTypes} / 4 enabled`}
                border
              />
            </div>

            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_1.1fr]">
              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <label
                        htmlFor="password-length"
                        className="text-sm font-semibold text-white"
                      >
                        Password Length
                      </label>

                      <p className="mt-1 text-xs text-slate-500">
                        Longer passwords generally provide greater resistance to
                        guessing.
                      </p>
                    </div>

                    <span className="rounded-lg border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 font-mono text-sm font-bold text-indigo-300">
                      {length}
                    </span>
                  </div>

                  <input
                    id="password-length"
                    type="range"
                    min="8"
                    max="128"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="range range-primary w-full"
                    aria-label="Password length"
                  />

                  <div className="mt-2 flex justify-between text-[11px] text-slate-600">
                    <span>8</span>
                    <span>32</span>
                    <span>64</span>
                    <span>96</span>
                    <span>128</span>
                  </div>
                </div>

                {/* Character Types */}
                <div>
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-white">
                      Character Types
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Use multiple character categories to increase the
                      available character space.
                    </p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {characterOptions.map((option) => {
                      const checked = characterState[option.key];

                      return (
                        <label
                          key={option.key}
                          className={`group flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 transition ${
                            checked
                              ? "border-indigo-400/30 bg-indigo-500/10"
                              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                                checked
                                  ? "bg-indigo-500/20 text-indigo-300"
                                  : "bg-slate-800 text-slate-500"
                              }`}
                            >
                              {option.description}
                            </div>

                            <div>
                              <div
                                className={`text-sm font-medium ${
                                  checked ? "text-white" : "text-slate-300"
                                }`}
                              >
                                {option.label}
                              </div>

                              <div className="text-xs text-slate-500">
                                {option.description}
                              </div>
                            </div>
                          </div>

                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) =>
                              characterSetters[option.key](e.target.checked)
                            }
                            className="checkbox checkbox-primary checkbox-sm"
                            aria-label={`Include ${option.label}`}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Strength */}
                <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Estimated Strength
                      </div>

                      <div
                        className={`mt-1 text-lg font-bold ${strength.className}`}
                      >
                        {strength.label}
                      </div>
                    </div>

                    <ShieldCheck size={24} className={strength.className} />
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.barClass}`}
                      style={{ width: strength.width }}
                    />
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    {strength.description}
                  </p>
                </div>
              </div>

              {/* Result */}
              <div className="flex flex-col">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Generated Password
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Keep this value private.
                    </p>
                  </div>

                  {password && <CopyButton text={password} />}
                </div>

                <div className="relative flex min-h-[230px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-inner">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

                  <div className="w-full overflow-auto p-5 sm:p-6">
                    {password ? (
                      <div className="break-all font-mono text-lg leading-9 tracking-wide text-slate-100 sm:text-xl">
                        {password}
                      </div>
                    ) : (
                      <div className="flex min-h-[190px] flex-col items-center justify-center text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
                          <Dices size={25} className="text-slate-600" />
                        </div>

                        <p className="mt-4 text-sm font-medium text-slate-400">
                          No password generated yet
                        </p>

                        <p className="mt-1 max-w-xs text-xs leading-5 text-slate-600">
                          Configure the options and click Generate Password.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {password && (
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      {password.length} characters
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-emerald-400">
                      <Check size={14} />
                      Generated locally
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-white/10 bg-slate-950/30 px-5 py-5 sm:px-6">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={generate}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                >
                  <Dices size={17} />
                  Generate Password
                </button>

                {password && (
                  <button
                    type="button"
                    onClick={generate}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <RefreshCw size={17} />
                    Generate Again
                  </button>
                )}

                <ClearButton onClick={clear} disabled={!password} />
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-5">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
                <ShieldCheck size={20} className="text-emerald-300" />
              </div>

              <div>
                <h3 className="font-semibold text-emerald-200">
                  Keep generated passwords private
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Password generation is performed in your browser. The
                  generated password should still be treated as sensitive
                  information. Avoid sending it through chat, email, or
                  untrusted websites, and consider storing it in a reputable
                  password manager.
                </p>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                <Sparkles size={18} className="text-cyan-300" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  How secure password generation works
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  The generator obtains random values from the browser's
                  cryptographically secure randomness source and uses those
                  values to select characters from your chosen character set.
                  This is fundamentally different from using predictable
                  pseudo-random functions for security-sensitive values.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MiniStep
                number="01"
                title="Configure"
                description="Choose length and character types."
              />

              <MiniStep
                number="02"
                title="Generate"
                description="Secure random values select characters."
              />

              <MiniStep
                number="03"
                title="Protect"
                description="Store the result securely and avoid reuse."
              />
            </div>
          </div>

          {/* Practical guidance */}
          <div className="grid gap-4 md:grid-cols-3">
            <GuidanceCard
              title="Prefer length"
              description="Long passwords generally provide more guessing resistance than short passwords with complicated patterns."
            />

            <GuidanceCard
              title="Never reuse"
              description="Use a different password for every important account to reduce the impact of credential breaches."
            />

            <GuidanceCard
              title="Use MFA"
              description="Enable multi-factor authentication where available for an additional layer of account protection."
            />
          </div>
        </div>
      </ToolLayout>
    </>
  );
}

function SecurityProperty({ label, value, border = false }) {
  return (
    <div
      className={`px-5 py-4 ${
        border ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""
      }`}
    >
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-1 text-sm font-semibold text-slate-200">{value}</div>
    </div>
  );
}

function MiniStep({ number, title, description }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
      <div className="font-mono text-xs font-bold text-indigo-400">
        {number}
      </div>

      <h4 className="mt-2 text-sm font-semibold text-white">{title}</h4>

      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function GuidanceCard({ title, description }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
