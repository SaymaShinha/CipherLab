import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, UnlockKeyhole } from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";

import {
  bytesToHex,
  deriveAESKey,
  randomBytes,
  stringToBytes,
  bytesToString,
  uint8ToBase64,
  base64ToUint8,
  PBKDF2_ITERATIONS,
} from "../../utils/crypto.js";

const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const TAG_LENGTH = 128;
const VERSION = 1;

async function encrypt(message, password) {
  const salt = randomBytes(SALT_LENGTH);
  const iv = randomBytes(IV_LENGTH);

  const key = await deriveAESKey(password, salt);

  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
        tagLength: TAG_LENGTH,
      },
      key,
      stringToBytes(message),
    ),
  );

  const packet = new Uint8Array(
    1 + salt.length + iv.length + ciphertext.length,
  );

  let offset = 0;

  packet[offset++] = VERSION;

  packet.set(salt, offset);
  offset += salt.length;

  packet.set(iv, offset);
  offset += iv.length;

  packet.set(ciphertext, offset);

  return uint8ToBase64(packet);
}

async function decrypt(encoded, password) {
  const packet = base64ToUint8(encoded);

  const minimum = 1 + SALT_LENGTH + IV_LENGTH + TAG_LENGTH / 8;

  if (packet.length < minimum) {
    throw new Error("Invalid encrypted data.");
  }

  let offset = 0;

  const version = packet[offset++];

  if (version !== VERSION) {
    throw new Error("Unsupported encrypted data version.");
  }

  const salt = packet.slice(offset, offset + SALT_LENGTH);

  offset += SALT_LENGTH;

  const iv = packet.slice(offset, offset + IV_LENGTH);

  offset += IV_LENGTH;

  const ciphertext = packet.slice(offset);

  const key = await deriveAESKey(password, salt);

  try {
    const plaintext = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
        tagLength: TAG_LENGTH,
      },
      key,
      ciphertext,
    );

    return bytesToString(new Uint8Array(plaintext));
  } catch {
    throw new Error(
      "Decryption failed. Check the password and encrypted data.",
    );
  }
}

export default function AESGCM() {
  const [mode, setMode] = useState("encrypt");
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const process = async () => {
    setError("");
    setResult("");

    if (!input.trim()) {
      setError(
        mode === "encrypt"
          ? "Enter a message to encrypt."
          : "Enter encrypted data to decrypt.",
      );
      return;
    }

    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const output =
        mode === "encrypt"
          ? await encrypt(input, password)
          : await decrypt(input, password);

      setResult(output);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Cryptographic operation failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setInput("");
    setPassword("");
    setResult("");
    setError("");
  };

  return (
    <ToolLayout
      title="AES-256-GCM Encryption"
      description="Encrypt and decrypt text using authenticated AES-256-GCM encryption with a password-derived 256-bit key."
      canonical="/tools/encryption/aes-256-gcm"
      category="Encryption"
      intro={
        <>
          <p>
            AES-256-GCM is a modern authenticated encryption mode that provides
            confidentiality and integrity. This tool derives an AES-256 key from
            your password using PBKDF2-SHA-256.
          </p>

          <p className="mt-5">
            Encryption and decryption are performed locally in your browser.
          </p>
        </>
      }
      howToUse={[
        "Choose Encrypt or Decrypt.",
        "Enter your message or encrypted data.",
        "Enter the password used for the operation.",
        "Click the action button.",
        "Copy the resulting data.",
      ]}
      features={[
        {
          title: "AES-256-GCM",
          description:
            "Uses authenticated AES-GCM encryption with a 256-bit key.",
        },
        {
          title: "Password-derived key",
          description: `PBKDF2-SHA-256 derives the encryption key using ${PBKDF2_ITERATIONS.toLocaleString()} iterations.`,
        },
        {
          title: "Random salt and IV",
          description:
            "Fresh cryptographic random values are generated for each encryption operation.",
        },
        {
          title: "Local processing",
          description: "The cryptographic operation runs in your browser.",
        },
      ]}
      aboutTitle="What Is AES-256-GCM?"
      aboutContent={
        <>
          <p>
            AES is a symmetric block cipher standardized by NIST. AES-256 uses a
            256-bit encryption key.
          </p>

          <p>
            GCM, or Galois/Counter Mode, adds authenticated encryption. In
            addition to encrypting the data, it produces an authentication tag
            that allows tampering to be detected during decryption.
          </p>

          <p>
            This tool uses PBKDF2 to derive the AES key from the password rather
            than using the password directly as a cryptographic key.
          </p>
        </>
      }
      useCases={[
        {
          title: "Private notes",
          description:
            "Protect short text that you want to store or transmit securely.",
        },
        {
          title: "Developer testing",
          description:
            "Experiment with authenticated encryption and encrypted payloads.",
        },
        {
          title: "Learning",
          description: "Understand practical password-based encryption.",
        },
        {
          title: "Local data protection",
          description:
            "Encrypt text without sending it to a remote processing service.",
        },
      ]}
      relatedTools={[
        {
          name: "AES-256-CBC",
          path: "/tools/encryption/aes-256-cbc",
          description: "Explore AES encryption using CBC mode.",
        },
        {
          name: "SHA-256",
          path: "/tools/hashing/sha-256",
          description: "Generate a SHA-256 cryptographic hash.",
        },
        {
          name: "Password Generator",
          path: "/tools/security/password-generator",
          description: "Generate stronger random passwords.",
        },
      ]}
      faqItems={[
        {
          question: "Is AES-256-GCM encryption secure?",
          answer:
            "AES-256-GCM is a widely used authenticated encryption construction when implemented and used correctly. The overall security also depends on password strength, key derivation, nonce handling, and the security of the device.",
        },
        {
          question: "Can I decrypt the result without the password?",
          answer:
            "No. The password is used to derive the encryption key. Without the correct password, authenticated decryption should fail.",
        },
        {
          question: "Does the website receive my message?",
          answer:
            "This tool is designed to perform the cryptographic operation locally in the browser rather than intentionally uploading the plaintext to a CipherLab server.",
        },
      ]}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("encrypt");
              setResult("");
              setError("");
            }}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
              mode === "encrypt"
                ? "bg-indigo-600 text-white"
                : "text-slate-500 hover:text-white"
            }`}
          >
            <LockKeyhole size={16} />
            Encrypt
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("decrypt");
              setResult("");
              setError("");
            }}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
              mode === "decrypt"
                ? "bg-indigo-600 text-white"
                : "text-slate-500 hover:text-white"
            }`}
          >
            <UnlockKeyhole size={16} />
            Decrypt
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder={
            mode === "encrypt"
              ? "Enter the message you want to encrypt..."
              : "Paste AES-256-GCM encrypted data..."
          }
          className="w-full resize-y rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10"
        />

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a strong password"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-12 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-400/10 bg-red-400/5 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={process}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-wait disabled:opacity-60"
          >
            {loading
              ? "Processing..."
              : mode === "encrypt"
                ? "Encrypt Message"
                : "Decrypt Message"}
          </button>

          <ClearButton
            onClick={clear}
            disabled={!input && !password && !result && !error}
          />
        </div>

        {result && (
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-white">
                {mode === "encrypt" ? "Encrypted Result" : "Decrypted Result"}
              </h3>

              <CopyButton text={result} />
            </div>

            <textarea
              value={result}
              readOnly
              rows={8}
              className="w-full rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4 font-mono text-sm leading-7 text-slate-300 outline-none"
            />
          </div>
        )}

        <div className="rounded-xl border border-white/10 bg-black/10 p-4">
          <div className="grid gap-3 text-xs sm:grid-cols-4">
            <div>
              <div className="text-slate-600">Algorithm</div>
              <div className="mt-1 font-semibold text-slate-300">
                AES-256-GCM
              </div>
            </div>

            <div>
              <div className="text-slate-600">Key</div>
              <div className="mt-1 font-semibold text-slate-300">256-bit</div>
            </div>

            <div>
              <div className="text-slate-600">KDF</div>
              <div className="mt-1 font-semibold text-slate-300">
                PBKDF2-SHA256
              </div>
            </div>

            <div>
              <div className="text-slate-600">Authentication</div>
              <div className="mt-1 font-semibold text-slate-300">
                128-bit tag
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
