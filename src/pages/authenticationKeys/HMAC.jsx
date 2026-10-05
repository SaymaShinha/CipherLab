import { useState } from "react";
import { ShieldCheck } from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";
import { hmacSHA256 } from "../../utils/hashing.js";

export default function HMAC() {
  const [message, setMessage] = useState("");
  const [secret, setSecret] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    if (!message || !secret) return;

    setResult(hmacSHA256(message, secret));
  };

  return (
    <ToolLayout
      title="HMAC-SHA256 Generator"
      description="Generate HMAC-SHA256 message authentication codes locally in your browser."
      canonical="/tools/security/hmac"
      category="Security"
      intro={
        <p>
          HMAC combines a cryptographic hash function with a secret key to
          provide message authentication. This tool generates HMAC-SHA256
          values.
        </p>
      }
      howToUse={[
        "Enter the message.",
        "Enter the secret key.",
        "Generate the HMAC.",
        "Copy the resulting authentication code.",
      ]}
      features={[
        {
          title: "HMAC-SHA256",
          description: "Uses HMAC with SHA-256.",
        },
        {
          title: "Secret key",
          description: "Combines the message with a secret value.",
        },
        {
          title: "Local processing",
          description: "The HMAC is calculated in your browser.",
        },
        {
          title: "Hex output",
          description: "Returns a standard hexadecimal representation.",
        },
      ]}
      aboutTitle="What Is HMAC?"
      aboutContent={
        <>
          <p>
            HMAC stands for Hash-based Message Authentication Code. It combines
            a secret key with a cryptographic hash function.
          </p>

          <p>
            Unlike an ordinary hash, an HMAC requires knowledge of the secret
            key to produce a valid authentication code.
          </p>
        </>
      }
      useCases={[
        {
          title: "API authentication",
          description: "Understand signed API request designs.",
        },
        {
          title: "Message integrity",
          description: "Explore keyed message authentication.",
        },
        {
          title: "Developer testing",
          description: "Generate HMAC-SHA256 test values.",
        },
        {
          title: "Security learning",
          description: "Understand the difference between hashes and MACs.",
        },
      ]}
      relatedTools={[
        {
          name: "SHA-256",
          path: "/tools/hashing/sha-256",
          description: "Generate an unkeyed cryptographic hash.",
        },
        {
          name: "AES-256-GCM",
          path: "/tools/encryption/aes-256-gcm",
          description: "Use authenticated encryption.",
        },
      ]}
    >
      <div className="space-y-5">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={7}
          placeholder="Enter message..."
          className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
        />

        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter secret key..."
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={generate}
            disabled={!message || !secret}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40"
          >
            <ShieldCheck size={16} />
            Generate HMAC
          </button>

          <ClearButton
            onClick={() => {
              setMessage("");
              setSecret("");
              setResult("");
            }}
            disabled={!message && !secret && !result}
          />
        </div>

        {result && (
          <div>
            <div className="mb-2 flex justify-between">
              <h3 className="text-sm font-semibold text-white">HMAC-SHA256</h3>

              <CopyButton text={result} />
            </div>

            <div className="break-all rounded-xl bg-black/20 p-5 font-mono text-sm leading-7 text-indigo-300">
              {result}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
