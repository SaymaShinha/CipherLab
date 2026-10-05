import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Binary,
  ChevronDown,
  Code2,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/* Tool Navigation                                                            */
/* -------------------------------------------------------------------------- */

const toolGroups = [
  {
    title: "Encryption",
    description: "Protect data with modern encryption algorithms",
    icon: LockKeyhole,
    accent: "indigo",
    links: [
      {
        name: "AES-256-GCM",
        description: "Authenticated encryption",
        path: "/tools/encryption/aes-256-gcm",
      },
      {
        name: "AES-256-CBC",
        description: "Block cipher encryption",
        path: "/tools/encryption/aes-256-cbc",
      },
      {
        name: "ChaCha20",
        description: "Modern stream cipher",
        path: "/tools/encryption/chacha20",
      },
      {
        name: "Cryptography Message",
        description: "Word-based encrypted messages",
        path: "/tools/encryption/cryptography-message",
      },
      {
        name: "Custom Encryption",
        description: "Configure encryption options",
        path: "/tools/encryption/custom-encryption",
      },
    ],
  },

  {
    title: "Authentication & Keys",
    description: "Authentication, key derivation, JWT and key management",
    icon: KeyRound,
    accent: "cyan",
    links: [
      {
        name: "HMAC Generator",
        description: "Message authentication codes",
        path: "/tools/authentication-keys/hmac",
      },
      {
        name: "PBKDF2 Generator",
        description: "Password-based key derivation",
        path: "/tools/authentication-keys/pbkdf2",
      },
      {
        name: "RSA Key Pair Generator",
        description: "Generate RSA public/private keys",
        path: "/tools/authentication-keys/rsa-key-pair",
      },
      {
        name: "JWT Decoder & Inspector",
        description: "Inspect JWT structure",
        path: "/tools/authentication-keys/jwt-decoder",
      },
    ],
  },

  {
    title: "Hashing",
    description: "Generate hashes and verify data integrity",
    icon: Fingerprint,
    accent: "violet",
    links: [
      {
        name: "SHA Hash Generator",
        description: "Generate SHA family hashes",
        path: "/tools/hashing/sha-hash",
      },
      {
        name: "SHA-256",
        description: "256-bit cryptographic hash",
        path: "/tools/hashing/sha-256",
      },
      {
        name: "SHA-384",
        description: "384-bit cryptographic hash",
        path: "/tools/hashing/sha-384",
      },
      {
        name: "SHA-512",
        description: "512-bit cryptographic hash",
        path: "/tools/hashing/sha-512",
      },
      {
        name: "SHA-3",
        description: "Keccak-based hash family",
        path: "/tools/hashing/sha-3",
      },
      {
        name: "Checksum Calculator",
        description: "Compare data fingerprints",
        path: "/tools/hashing/checksum",
      },
      {
        name: "File Hash Generator",
        description: "Hash files locally",
        path: "/tools/hashing/file-hash",
      },
    ],
  },

  {
    title: "Encoding",
    description: "Encode and decode common data formats",
    icon: Binary,
    accent: "emerald",
    links: [
      {
        name: "Base64",
        description: "Binary-to-text encoding",
        path: "/tools/encoding/base64",
      },
      {
        name: "Base64URL",
        description: "URL-safe Base64 encoding",
        path: "/tools/encoding/base64url",
      },
      {
        name: "Hex",
        description: "Hexadecimal encoding",
        path: "/tools/encoding/hex",
      },
    ],
  },

  {
    title: "Security",
    description: "Generate secure passwords, random data and identifiers",
    icon: ShieldCheck,
    accent: "amber",
    links: [
      {
        name: "Password Strength Analyzer",
        description: "Evaluate password characteristics",
        path: "/tools/security/password-strength",
      },
      {
        name: "Secure Password Generator",
        description: "Generate random passwords",
        path: "/tools/security/password-generator",
      },
      {
        name: "Random Bytes Generator",
        description: "Generate cryptographic randomness",
        path: "/tools/security/random-bytes",
      },
      {
        name: "UUID & ULID Generator",
        description: "Generate unique identifiers",
        path: "/tools/security/uuid-ulid",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Accent Styles                                                              */
/* -------------------------------------------------------------------------- */

const accentStyles = {
  indigo: {
    icon: "bg-indigo-500/10 text-indigo-400",
    hover: "hover:border-indigo-400/20 hover:bg-indigo-500/[0.05]",
    label: "text-indigo-400",
  },

  cyan: {
    icon: "bg-cyan-500/10 text-cyan-400",
    hover: "hover:border-cyan-400/20 hover:bg-cyan-500/[0.05]",
    label: "text-cyan-400",
  },

  violet: {
    icon: "bg-violet-500/10 text-violet-400",
    hover: "hover:border-violet-400/20 hover:bg-violet-500/[0.05]",
    label: "text-violet-400",
  },

  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400",
    hover: "hover:border-emerald-400/20 hover:bg-emerald-500/[0.05]",
    label: "text-emerald-400",
  },

  amber: {
    icon: "bg-amber-500/10 text-amber-400",
    hover: "hover:border-amber-400/20 hover:bg-amber-500/[0.05]",
    label: "text-amber-400",
  },
};

/* -------------------------------------------------------------------------- */
/* Navigation Link                                                            */
/* -------------------------------------------------------------------------- */

function navLinkClass({ isActive }) {
  return [
    "relative inline-flex items-center text-sm font-medium transition-colors",
    "after:absolute after:-bottom-[21px] after:left-0 after:h-px after:w-full",
    "after:origin-left after:scale-x-0 after:bg-indigo-400",
    "after:transition-transform",
    isActive
      ? "text-white after:scale-x-100"
      : "text-slate-400 hover:text-white",
  ].join(" ");
}

/* -------------------------------------------------------------------------- */
/* Navbar                                                                     */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const toolsRef = useRef(null);

  /* ------------------------------------------------------------------------ */
  /* Outside click                                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    function handleOutsideClick(event) {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setToolsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Escape key                                                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setToolsOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Menu helpers                                                             */
  /* ------------------------------------------------------------------------ */

  function closeMenus() {
    setMobileOpen(false);
    setToolsOpen(false);
  }

  function closeMobile() {
    setMobileOpen(false);
    setToolsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#070A12]/90 shadow-lg shadow-black/10 backdrop-blur-2xl">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================================================================== */}
        {/* Main Navbar                                                        */}
        {/* ================================================================== */}

        <div className="flex h-[68px] items-center justify-between">
          {/* ---------------------------------------------------------------- */}
          {/* Logo                                                             */}
          {/* ---------------------------------------------------------------- */}

          <Link
            to="/"
            onClick={closeMenus}
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/15 to-cyan-500/5 shadow-lg shadow-indigo-500/10 transition duration-200 group-hover:border-indigo-400/40 group-hover:shadow-indigo-500/20">
              <div className="absolute inset-0 rounded-xl bg-indigo-400/5 blur-md transition group-hover:bg-indigo-400/10" />

              <ShieldCheck
                size={21}
                strokeWidth={1.8}
                className="relative text-indigo-400 transition group-hover:text-indigo-300"
              />
            </div>

            <div className="leading-none">
              <div className="text-[17px] font-bold tracking-tight text-white">
                Cipher<span className="text-indigo-400">Lab</span>
              </div>

              <div className="mt-1.5 hidden text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:block">
                Cryptography Toolkit
              </div>
            </div>
          </Link>

          {/* ---------------------------------------------------------------- */}
          {/* Desktop Navigation                                               */}
          {/* ---------------------------------------------------------------- */}

          <nav className="hidden items-center gap-8 md:flex">
            {/* ============================================================ */}
            {/* Tools Dropdown                                                */}
            {/* ============================================================ */}

            <div ref={toolsRef} className="relative">
              <button
                type="button"
                onClick={() => setToolsOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={toolsOpen}
                className={[
                  "group inline-flex items-center gap-1.5 text-sm font-medium",
                  "transition-colors",
                  toolsOpen ? "text-white" : "text-slate-300 hover:text-white",
                ].join(" ")}
              >
                Tools
                <ChevronDown
                  size={15}
                  className={[
                    "text-slate-500 transition-transform duration-200",
                    "group-hover:text-slate-300",
                    toolsOpen ? "rotate-180 text-indigo-400" : "",
                  ].join(" ")}
                />
              </button>

              {/* ========================================================== */}
              {/* Tools Dropdown                                              */}
              {/* ========================================================== */}

              {toolsOpen && (
                <div className="absolute left-1/2 top-[43px] w-[820px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19]/[0.98] shadow-2xl shadow-black/60 backdrop-blur-2xl">
                  {/* Dropdown top accent */}
                  <div className="h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

                  <div className="p-4">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between border-b border-white/[0.07] pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                          <Sparkles size={17} />
                        </div>

                        <div>
                          <h2 className="text-sm font-semibold text-white">
                            Cryptography Tools
                          </h2>

                          <p className="mt-0.5 text-[11px] text-slate-500">
                            Browser-based utilities for developers and learners
                          </p>
                        </div>
                      </div>

                      <div className="hidden items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1.5 sm:flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[10px] font-medium text-emerald-400">
                          Client-side tools
                        </span>
                      </div>
                    </div>

                    {/* Tool groups */}
                    <div className="max-h-[65vh] overflow-y-auto pr-1">
                      <div className="grid grid-cols-2 gap-3">
                        {toolGroups.map((group) => {
                          const Icon = group.icon;
                          const accent = accentStyles[group.accent];

                          return (
                            <div
                              key={group.title}
                              className={[
                                "rounded-xl border border-white/[0.07]",
                                "bg-white/[0.02] p-4 transition duration-200",
                                accent.hover,
                              ].join(" ")}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent.icon}`}
                                >
                                  <Icon size={17} />
                                </div>

                                <div className="min-w-0">
                                  <h3 className="text-sm font-semibold text-white">
                                    {group.title}
                                  </h3>

                                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                                    {group.description}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-3 space-y-0.5">
                                {group.links.map((link) => (
                                  <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setToolsOpen(false)}
                                    className="group/link flex items-center justify-between rounded-lg px-2.5 py-2 transition hover:bg-white/[0.05]"
                                  >
                                    <div className="min-w-0">
                                      <div className="truncate text-xs font-medium text-slate-300 transition group-hover/link:text-white">
                                        {link.name}
                                      </div>

                                      <div className="mt-0.5 truncate text-[10px] text-slate-600 group-hover/link:text-slate-500">
                                        {link.description}
                                      </div>
                                    </div>

                                    <ArrowRight
                                      size={12}
                                      className="ml-3 shrink-0 text-slate-700 opacity-0 transition duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-indigo-400 group-hover/link:opacity-100"
                                    />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dropdown footer */}
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3">
                      <span className="text-[10px] text-slate-600">
                        Cryptography • Hashing • Encoding • Security
                      </span>

                      <Link
                        to="/learn/cryptography-basics"
                        onClick={() => setToolsOpen(false)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400 transition hover:text-indigo-300"
                      >
                        Learn cryptography
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ============================================================ */}
            {/* Learn                                                          */}
            {/* ============================================================ */}

            <NavLink to="/learn/cryptography-basics" className={navLinkClass}>
              Learn
            </NavLink>

            {/* ============================================================ */}
            {/* About                                                          */}
            {/* ============================================================ */}

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            {/* ============================================================ */}
            {/* Contact                                                        */}
            {/* ============================================================ */}

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* ---------------------------------------------------------------- */}
          {/* Desktop CTA                                                       */}
          {/* ---------------------------------------------------------------- */}

          <div className="hidden md:block">
            <Link
              to="/tools/encryption/aes-256-gcm"
              className="group inline-flex items-center gap-2 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-2.5 text-xs font-semibold text-indigo-300 shadow-lg shadow-indigo-950/20 transition duration-200 hover:border-indigo-400/30 hover:bg-indigo-500/20 hover:text-white"
            >
              <LockKeyhole
                size={15}
                className="transition group-hover:scale-105"
              />
              Start Encrypting
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Mobile Button                                                     */}
          {/* ---------------------------------------------------------------- */}

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ================================================================== */}
        {/* Mobile Navigation                                                   */}
        {/* ================================================================== */}

        {mobileOpen && (
          <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto border-t border-white/[0.08] py-5 md:hidden">
            <div className="space-y-1">
              {/* ------------------------------------------------------------ */}
              {/* Mobile Home                                                    */}
              {/* ------------------------------------------------------------ */}

              <NavLink
                to="/"
                onClick={closeMobile}
                className={({ isActive }) =>
                  [
                    "block rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-indigo-500/10 text-white"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white",
                  ].join(" ")
                }
              >
                Home
              </NavLink>

              {/* ------------------------------------------------------------ */}
              {/* Mobile Tools                                                   */}
              {/* ------------------------------------------------------------ */}

              <div className="pt-5">
                <div className="mb-3 flex items-center gap-2 px-3">
                  <Code2 size={13} className="text-indigo-400" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Tools
                  </span>
                </div>

                {toolGroups.map((group) => {
                  const Icon = group.icon;
                  const accent = accentStyles[group.accent];

                  return (
                    <div
                      key={group.title}
                      className="mb-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3"
                    >
                      <div className="flex items-center gap-3 px-2 pb-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent.icon}`}
                        >
                          <Icon size={15} />
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-white">
                            {group.title}
                          </div>

                          <div className="mt-0.5 text-[10px] text-slate-600">
                            {group.links.length} tools
                          </div>
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        {group.links.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            onClick={closeMobile}
                            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
                          >
                            <span>{link.name}</span>

                            <ArrowRight size={12} className="text-slate-700" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ------------------------------------------------------------ */}
              {/* Mobile Main Links                                               */}
              {/* ------------------------------------------------------------ */}

              <div className="border-t border-white/[0.08] pt-4">
                <NavLink
                  to="/learn/cryptography-basics"
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    [
                      "block rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      isActive
                        ? "bg-indigo-500/10 text-white"
                        : "text-slate-300 hover:bg-white/[0.05] hover:text-white",
                    ].join(" ")
                  }
                >
                  Learn
                </NavLink>

                <NavLink
                  to="/about"
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    [
                      "block rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      isActive
                        ? "bg-indigo-500/10 text-white"
                        : "text-slate-300 hover:bg-white/[0.05] hover:text-white",
                    ].join(" ")
                  }
                >
                  About
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    [
                      "block rounded-xl px-3 py-2.5 text-sm font-medium transition",
                      isActive
                        ? "bg-indigo-500/10 text-white"
                        : "text-slate-300 hover:bg-white/[0.05] hover:text-white",
                    ].join(" ")
                  }
                >
                  Contact
                </NavLink>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* Mobile CTA                                                      */}
              {/* ------------------------------------------------------------ */}

              <Link
                to="/tools/encryption/aes-256-gcm"
                onClick={closeMobile}
                className="group mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-indigo-500 hover:to-indigo-400"
              >
                <LockKeyhole size={16} />
                Start Encrypting
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              {/* Privacy indicator */}
              <div className="mt-4 flex items-center justify-center gap-2 py-2 text-[10px] text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                Browser-based cryptography tools
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
