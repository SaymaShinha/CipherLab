import { useState } from "react";

import { chacha20poly1305 } from "@noble/ciphers/chacha.js";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";

import {
  deriveAESKey,
  randomBytes,
  stringToBytes,
  bytesToString,
  uint8ToBase64,
  base64ToUint8,
} from "../../utils/crypto.js";

async function deriveChaChaKey(password, salt) {
  const key = await deriveAESKey(password, salt);

  return new Uint8Array(await crypto.subtle.exportKey("raw", key));
}

async function encryptChaCha(message, password) {
  const salt = randomBytes(16);
  const nonce = randomBytes(12);

  const key = await deriveChaChaKey(password, salt);

  const cipher = chacha20poly1305(key, nonce);

  const ciphertext = cipher.encrypt(stringToBytes(message));

  const packet = new Uint8Array(
    1 + salt.length + nonce.length + ciphertext.length,
  );

  let offset = 0;

  packet[offset++] = 1;

  packet.set(salt, offset);
  offset += salt.length;

  packet.set(nonce, offset);
  offset += nonce.length;

  packet.set(ciphertext, offset);

  return uint8ToBase64(packet);
}

async function decryptChaCha(encoded, password) {
  const packet = base64ToUint8(encoded);

  if (packet.length < 45) {
    throw new Error("Invalid encrypted data.");
  }

  let offset = 0;

  const version = packet[offset++];

  if (version !== 1) {
    throw new Error("Unsupported data version.");
  }

  const salt = packet.slice(offset, offset + 16);

  offset += 16;

  const nonce = packet.slice(offset, offset + 12);

  offset += 12;

  const ciphertext = packet.slice(offset);

  const key = await deriveChaChaKey(password, salt);

  try {
    const cipher = chacha20poly1305(key, nonce);

    const plaintext = cipher.decrypt(ciphertext);

    return bytesToString(plaintext);
  } catch {
    throw new Error("Decryption failed. Check the password or encrypted data.");
  }
}

export default function ChaCha20() {
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
          ? await encryptChaCha(input, password)
          : await decryptChaCha(input, password),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed.");
    }
  };

  return (
    <ToolLayout
      title="ChaCha20-Poly1305 Encryption"
      description="Encrypt and decrypt text using authenticated ChaCha20-Poly1305 encryption."
      canonical="/tools/encryption/chacha20"
      category="Encryption"
      intro={
        <p>
          ChaCha20-Poly1305 combines the ChaCha20 stream cipher with Poly1305
          authentication. It is a modern authenticated encryption construction
          used in many security protocols.
        </p>
      }
      howToUse={[
        "Choose Encrypt or Decrypt.",
        "Enter the message or encrypted payload.",
        "Enter the password.",
        "Run the operation.",
        "Copy the result.",
      ]}
      features={[
        {
          title: "ChaCha20",
          description: "Uses the ChaCha20 stream cipher.",
        },
        {
          title: "Poly1305",
          description: "Provides authentication for encrypted data.",
        },
        {
          title: "Password-based key",
          description: "Derives a 256-bit key from the password.",
        },
        {
          title: "Local operation",
          description: "Processing occurs in the browser.",
        },
      ]}
      aboutTitle="What Is ChaCha20-Poly1305?"
      aboutContent={
        <>
          <p>
            ChaCha20 is a modern stream cipher designed for high performance and
            strong security.
          </p>

          <p>
            Poly1305 provides message authentication. Together, ChaCha20 and
            Poly1305 provide authenticated encryption.
          </p>
        </>
      }
      useCases={[
        {
          title: "Modern encryption",
          description: "Explore an alternative to AES-GCM.",
        },
        {
          title: "Protocol learning",
          description: "Study authenticated stream-cipher constructions.",
        },
        {
          title: "Developer testing",
          description: "Generate ChaCha20-Poly1305 test payloads.",
        },
        {
          title: "Security education",
          description: "Compare modern authenticated encryption designs.",
        },
      ]}
      relatedTools={[
        {
          name: "AES-256-GCM",
          path: "/tools/encryption/aes-256-gcm",
          description: "Explore authenticated AES encryption.",
        },
        {
          name: "AES-256-CBC",
          path: "/tools/encryption/aes-256-cbc",
          description: "Explore a traditional block cipher mode.",
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
          placeholder="Enter data..."
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
