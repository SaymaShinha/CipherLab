import { useState } from "react";
import { Hash } from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";
import { hashSHA256 } from "../../utils/hashing.js";

export default function SHA256() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    setResult(hashSHA256(input));
  };

  return (
    <ToolLayout
      title="SHA-256 Hash Generator"
      description="Generate SHA-256 cryptographic hashes from text directly in your browser."
      canonical="/tools/hashing/sha-256"
      category="Hashing"
      intro={
        <p>
          SHA-256 is a member of the SHA-2 family of cryptographic hash
          functions. It converts input data into a fixed-length 256-bit digest.
        </p>
      }
      howToUse={[
        "Enter text in the input field.",
        "Click Generate SHA-256.",
        "Review the hexadecimal digest.",
        "Copy the hash when needed.",
      ]}
      features={[
        {
          title: "256-bit digest",
          description:
            "Produces a fixed 64-character hexadecimal representation.",
        },
        {
          title: "One-way function",
          description:
            "Designed to make recovering the original input computationally impractical.",
        },
        {
          title: "Local processing",
          description: "The hash is calculated in your browser.",
        },
        {
          title: "Instant copy",
          description: "Copy the resulting digest with one click.",
        },
      ]}
      aboutTitle="What Is SHA-256?"
      aboutContent={
        <>
          <p>
            SHA-256 is a cryptographic hash function standardized as part of the
            SHA-2 family.
          </p>

          <p>
            Unlike encryption, hashing is not designed to be reversible. The
            same input produces the same digest, while small changes to the
            input produce a substantially different result.
          </p>
        </>
      }
      useCases={[
        {
          title: "File fingerprints",
          description: "Compare hashes to detect whether data has changed.",
        },
        {
          title: "Integrity checking",
          description: "Use a digest as a compact fingerprint of data.",
        },
        {
          title: "Developer testing",
          description: "Generate known SHA-256 values for application testing.",
        },
        {
          title: "Learning",
          description: "Explore the behavior of cryptographic hash functions.",
        },
      ]}
      relatedTools={[
        {
          name: "SHA-512",
          path: "/tools/hashing/sha-512",
          description: "Generate a 512-bit SHA-2 digest.",
        },
        {
          name: "SHA-3",
          path: "/tools/hashing/sha-3",
          description: "Explore the SHA-3 family.",
        },
        {
          name: "AES-256-GCM",
          path: "/tools/encryption/aes-256-gcm",
          description: "Encrypt data instead of hashing it.",
        },
      ]}
    >
      <div className="space-y-5">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder="Enter text to hash..."
          className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
        />

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={generate}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            <Hash size={16} />
            Generate SHA-256
          </button>

          <ClearButton
            onClick={() => {
              setInput("");
              setResult("");
            }}
            disabled={!input && !result}
          />
        </div>

        {result && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">
                SHA-256 Digest
              </h3>

              <CopyButton text={result} />
            </div>

            <div className="break-all rounded-xl border border-white/10 bg-black/20 p-5 font-mono text-sm leading-7 text-indigo-300">
              {result}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
