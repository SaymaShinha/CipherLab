import { ArrowUpRight, GitBranch, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const toolLinks = [
  {
    label: "AES-256-GCM",
    path: "/tools/encryption/aes-256-gcm",
  },
  {
    label: "SHA-256",
    path: "/tools/hashing/sha-256",
  },
  {
    label: "SHA-512",
    path: "/tools/hashing/sha-512",
  },
  {
    label: "Base64",
    path: "/tools/encoding/base64",
  },
  {
    label: "Password Generator",
    path: "/tools/security/password-generator",
  },
];

const learnLinks = [
  {
    label: "Cryptography Basics",
    path: "/learn/cryptography-basics",
  },
  {
    label: "Encryption vs Hashing",
    path: "/learn/encryption-vs-hashing",
  },
  {
    label: "AES-256 Explained",
    path: "/learn/aes-256-explained",
  },
  {
    label: "Salt & IV",
    path: "/learn/salt-and-iv",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070D]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10">
                <ShieldCheck size={20} className="text-indigo-400" />
              </div>

              <span className="text-lg font-bold text-white">
                Cipher<span className="text-indigo-400">Lab</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              Modern browser-based cryptography tools for encryption, hashing,
              encoding, and security workflows.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Browser-based processing
            </div>
          </div>

          {/* Tools */}
          <div>
            <h2 className="text-sm font-semibold text-white">Popular Tools</h2>

            <ul className="mt-4 space-y-2.5">
              {toolLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h2 className="text-sm font-semibold text-white">Learn</h2>

            <ul className="mt-4 space-y-2.5">
              {learnLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-500 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-sm font-semibold text-white">CipherLab</h2>

            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-slate-500 hover:text-white"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-500 hover:text-white"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-slate-500 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-of-use"
                  className="text-sm text-slate-500 hover:text-white"
                >
                  Terms of Use
                </Link>
              </li>

              <li>
                <Link
                  to="/cookie-policy"
                  className="text-sm text-slate-500 hover:text-white"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CipherLab. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <span>Built for privacy-conscious users.</span>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-slate-500 transition hover:text-white"
            >
              <GitBranch size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
