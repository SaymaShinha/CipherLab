import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, ShieldCheck, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/* Tool Navigation                                                            */
/* -------------------------------------------------------------------------- */

const toolGroups = [
  {
    title: "Encryption",
    description: "Protect data with modern encryption algorithms",
    links: [
      {
        name: "AES-256-GCM",
        path: "/tools/encryption/aes-256-gcm",
      },
      {
        name: "AES-256-CBC",
        path: "/tools/encryption/aes-256-cbc",
      },
      {
        name: "ChaCha20",
        path: "/tools/encryption/chacha20",
      },
      {
        name: "Cryptography Message",
        path: "/tools/encryption/cryptography-message",
      },
      {
        name: "Custom Encryption",
        path: "/tools/encryption/custom-encryption",
      },
    ],
  },

  {
    title: "Authentication & Keys",
    description: "Authentication, key derivation, JWT and key management",
    links: [
      {
        name: "HMAC Generator",
        path: "/tools/authentication-keys/hmac",
      },
      {
        name: "PBKDF2 Generator",
        path: "/tools/authentication-keys/pbkdf2",
      },
      {
        name: "RSA Key Pair Generator",
        path: "/tools/authentication-keys/rsa-key-pair",
      },
      {
        name: "JWT Decoder & Inspector",
        path: "/tools/authentication-keys/jwt-decoder",
      },
    ],
  },

  {
    title: "Hashing",
    description: "Generate hashes and verify data integrity",
    links: [
      {
        name: "SHA Hash Generator",
        path: "/tools/hashing/sha-hash",
      },
      {
        name: "SHA-256",
        path: "/tools/hashing/sha-256",
      },
      {
        name: "SHA-384",
        path: "/tools/hashing/sha-384",
      },
      {
        name: "SHA-512",
        path: "/tools/hashing/sha-512",
      },
      {
        name: "SHA-3",
        path: "/tools/hashing/sha-3",
      },
      {
        name: "Checksum Calculator",
        path: "/tools/hashing/checksum",
      },
      {
        name: "File Hash Generator",
        path: "/tools/hashing/file-hash",
      },
    ],
  },

  {
    title: "Encoding",
    description: "Encode and decode common data formats",
    links: [
      {
        name: "Base64",
        path: "/tools/encoding/base64",
      },
      {
        name: "Base64URL",
        path: "/tools/encoding/base64url",
      },
      {
        name: "Hex",
        path: "/tools/encoding/hex",
      },
    ],
  },

  {
    title: "Security",
    description: "Generate secure passwords, random data and identifiers",
    links: [
      {
        name: "Password Strength Analyzer",
        path: "/tools/security/password-strength",
      },
      {
        name: "Secure Password Generator",
        path: "/tools/security/password-generator",
      },
      {
        name: "Random Bytes Generator",
        path: "/tools/security/random-bytes",
      },
      {
        name: "UUID & ULID Generator",
        path: "/tools/security/uuid-ulid",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Navigation Link                                                            */
/* -------------------------------------------------------------------------- */

function navLinkClass({ isActive }) {
  return [
    "text-sm font-medium transition-colors",
    isActive ? "text-white" : "text-slate-400 hover:text-white",
  ].join(" ");
}

/* -------------------------------------------------------------------------- */
/* Navbar                                                                     */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const toolsRef = useRef(null);

  /* Close Tools dropdown when clicking outside */
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

  /* Close everything */
  function closeMenus() {
    setMobileOpen(false);
    setToolsOpen(false);
  }

  /* Close mobile menu after navigation */
  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070A12]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Main Navbar                                                       */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            className="group flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 shadow-lg shadow-indigo-500/10 transition group-hover:bg-indigo-500/20">
              <ShieldCheck size={20} className="text-indigo-400" />
            </div>

            <div>
              <div className="text-base font-bold tracking-tight text-white">
                Cipher<span className="text-indigo-400">Lab</span>
              </div>

              <div className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500 sm:block">
                Cryptography Toolkit
              </div>
            </div>
          </Link>

          {/* ---------------------------------------------------------------- */}
          {/* Desktop Navigation                                               */}
          {/* ---------------------------------------------------------------- */}

          <nav className="hidden items-center gap-7 md:flex">
            {/* Tools Dropdown */}
            <div ref={toolsRef} className="relative">
              <button
                type="button"
                onClick={() => setToolsOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={toolsOpen}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Tools
                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    toolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {toolsOpen && (
                <div className="absolute left-1/2 top-11 w-[760px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0D111C]/98 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
                  <div className="max-h-[65vh] overflow-y-auto pr-1">
                    <div className="grid grid-cols-2 gap-3">
                      {toolGroups.map((group) => (
                        <div
                          key={group.title}
                          className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                        >
                          <h3 className="mb-1 text-sm font-semibold text-white">
                            {group.title}
                          </h3>

                          <p className="mb-3 text-xs leading-relaxed text-slate-500">
                            {group.description}
                          </p>

                          <div className="space-y-1">
                            {group.links.map((link) => (
                              <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setToolsOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Learn */}
            <NavLink to="/learn/cryptography-basics" className={navLinkClass}>
              Learn
            </NavLink>

            {/* About */}
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            {/* Contact */}
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
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
            >
              <ShieldCheck size={16} />
              Start Encrypting
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
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Mobile Navigation                                                   */}
        {/* ------------------------------------------------------------------ */}

        {mobileOpen && (
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 py-5 md:hidden">
            <div className="space-y-1">
              {/* Home */}
              <NavLink
                to="/"
                onClick={closeMobile}
                className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Home
              </NavLink>

              {/* Tools */}
              <div className="pt-3">
                <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Tools
                </div>

                {toolGroups.map((group) => (
                  <div key={group.title} className="mb-4">
                    <div className="px-3 py-1.5 text-xs font-semibold text-indigo-400">
                      {group.title}
                    </div>

                    {group.links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={closeMobile}
                        className="block rounded-lg px-5 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* Learn */}
              <NavLink
                to="/learn/cryptography-basics"
                onClick={closeMobile}
                className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Learn
              </NavLink>

              {/* About */}
              <NavLink
                to="/about"
                onClick={closeMobile}
                className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                About
              </NavLink>

              {/* Contact */}
              <NavLink
                to="/contact"
                onClick={closeMobile}
                className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Contact
              </NavLink>

              {/* Mobile CTA */}
              <Link
                to="/tools/encryption/aes-256-gcm"
                onClick={closeMobile}
                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
              >
                <ShieldCheck size={16} />
                Start Encrypting
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
