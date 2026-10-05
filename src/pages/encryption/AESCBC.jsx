import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";

import {
  deriveAESCBCCKey,
  randomBytes,
  stringToBytes,
  bytesToString,
  uint8ToBase64,
  base64ToUint8,
} from "../../utils/crypto.js";

const SALT_LENGTH = 16;
const IV_LENGTH = 16;
const VERSION = 1;

async function encryptCBC(message, password) {
  const salt = randomBytes(SALT_LENGTH);
  const iv = randomBytes(IV_LENGTH);

  const key = await deriveAESCBCCKey(password, salt);

  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv,
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

async function decryptCBC(encoded, password) {
  const packet = base64ToUint8(encoded);

  if (packet.length < 1 + SALT_LENGTH + IV_LENGTH) {
    throw new Error("Invalid encrypted data.");
  }

  let offset = 0;

  const version = packet[offset++];

  if (version !== VERSION) {
    throw new Error("Unsupported data version.");
  }

  const salt = packet.slice(offset, offset + SALT_LENGTH);

  offset += SALT_LENGTH;

  const iv = packet.slice(offset, offset + IV_LENGTH);

  offset += IV_LENGTH;

  const ciphertext = packet.slice(offset);

  const key = await deriveAESCBCCKey(password, salt);

  try {
    const plaintext = await crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv,
      },
      key,
      ciphertext,
    );

    return bytesToString(new Uint8Array(plaintext));
  } catch {
    throw new Error("Decryption failed. Check the password or encrypted data.");
  }
}

export default function AESCBC() {
  const [mode, setMode] = useState("encrypt");
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const process = async () => {
    setError("");
    setResult("");

    if (!input.trim()) {
      setError("Enter data first.");
      return;
    }

    if (password.length < 8) {
      setError("Use at least 8 password characters.");
      return;
    }

    try {
      setResult(
        mode === "encrypt"
          ? await encryptCBC(input, password)
          : await decryptCBC(input, password),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed.");
    }
  };

  return (
    <ToolLayout
      title="AES-256-CBC Encryption"
      description="Encrypt and decrypt text using AES-256-CBC with password-derived keys."
      canonical="/tools/encryption/aes-256-cbc"
      category="Encryption"
      intro={
        <>
          <p>
            AES-CBC is an established block cipher mode that remains relevant
            for compatibility with existing systems.
          </p>

          <div className="mt-5 flex gap-3 rounded-xl border border-amber-400/10 bg-amber-400/5 p-4">
            <AlertTriangle size={18} className="shrink-0 text-amber-400" />

            <p className="text-sm leading-6 text-amber-200/80">
              CBC encryption does not authenticate ciphertext. For new
              applications, authenticated encryption such as AES-GCM is
              generally preferable.
            </p>
          </div>
        </>
      }
      howToUse={[
        "Choose Encrypt or Decrypt.",
        "Enter the text or encrypted payload.",
        "Enter the password.",
        "Run the operation.",
        "Copy the result.",
      ]}
      features={[
        {
          title: "AES-256",
          description: "Uses a 256-bit AES key.",
        },
        {
          title: "PBKDF2",
          description: "Derives the encryption key from the password.",
        },
        {
          title: "Random salt and IV",
          description: "Fresh values are generated for each encryption.",
        },
        {
          title: "Browser-based",
          description: "Operations run locally in the browser.",
        },
      ]}
      aboutTitle="AES-CBC vs AES-GCM"
      aboutContent={
        <>
          <p>
            AES-CBC encrypts blocks of data using a chaining construction and an
            initialization vector.
          </p>

          <p>
            Unlike GCM, CBC by itself does not provide an authentication tag.
            This means ciphertext integrity must be handled separately if
            authenticity is required.
          </p>

          <p>
            For new application designs, authenticated encryption such as
            AES-GCM is generally the better default.
          </p>
        </>
      }
      useCases={[
        {
          title: "Legacy compatibility",
          description: "Work with systems that already use AES-CBC.",
        },
        {
          title: "Learning",
          description: "Understand block cipher modes.",
        },
        {
          title: "Testing",
          description: "Create AES-CBC test values.",
        },
        {
          title: "Migration work",
          description:
            "Compare older encryption designs with modern alternatives.",
        },
      ]}
      relatedTools={[
        {
          name: "AES-256-GCM",
          path: "/tools/encryption/aes-256-gcm",
          description: "Use authenticated AES encryption.",
        },
        {
          name: "ChaCha20",
          path: "/tools/encryption/chacha20",
          description: "Explore another modern authenticated cipher.",
        },
      ]}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1">
          {["encrypt", "decrypt"].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setMode(value);
                setResult("");
                setError("");
              }}
              className={`rounded-lg px-4 py-3 text-sm font-semibold capitalize ${
                mode === value
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder={
            mode === "encrypt" ? "Enter message..." : "Paste encrypted data..."
          }
          className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
        />

        {error && (
          <div className="rounded-xl border border-red-400/10 bg-red-400/5 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={process}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {mode === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>

          <ClearButton
            onClick={() => {
              setInput("");
              setPassword("");
              setResult("");
              setError("");
            }}
            disabled={!input && !password && !result && !error}
          />
        </div>

        {result && (
          <div>
            <div className="mb-2 flex justify-between">
              <h3 className="text-sm font-semibold text-white">Result</h3>

              <CopyButton text={result} />
            </div>

            <textarea
              value={result}
              readOnly
              rows={8}
              className="w-full rounded-xl bg-black/20 p-4 font-mono text-sm text-slate-300 outline-none"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
