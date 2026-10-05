import { useState } from "react";
import { Hash } from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";
import { hashSHA512 } from "../../utils/hashing.js";

export default function SHA512() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    setResult(hashSHA512(input));
  };

  return (
    <ToolLayout
      title="SHA-512 Hash Generator"
      description="Generate SHA-512 cryptographic hashes from text using a browser-based security tool."
      canonical="/tools/hashing/sha-512"
      category="Hashing"
      intro={
        <p>
          SHA-512 is a SHA-2 cryptographic hash function that produces a 512-bit
          digest represented by 128 hexadecimal characters.
        </p>
      }
      howToUse={[
        "Enter your text.",
        "Click Generate SHA-512.",
        "Review the resulting digest.",
        "Copy the hash.",
      ]}
      features={[
        {
          title: "512-bit digest",
          description: "Produces a 128-character hexadecimal digest.",
        },
        {
          title: "SHA-2 family",
          description: "Uses the SHA-512 member of the SHA-2 family.",
        },
        {
          title: "Browser-based",
          description: "The hash is calculated locally.",
        },
        {
          title: "Fast workflow",
          description: "Generate and copy a digest quickly.",
        },
      ]}
      aboutTitle="What Is SHA-512?"
      aboutContent={
        <>
          <p>SHA-512 is a cryptographic hash function from the SHA-2 family.</p>

          <p>
            It accepts arbitrary input and produces a fixed-length 512-bit
            digest. Hashing is intended to be one-way and is commonly used for
            integrity and fingerprinting.
          </p>
        </>
      }
      useCases={[
        {
          title: "Data integrity",
          description: "Create a strong fingerprint for input data.",
        },
        {
          title: "Testing",
          description: "Generate SHA-512 test vectors.",
        },
        {
          title: "File verification",
          description: "Compare expected and calculated hashes.",
        },
        {
          title: "Learning",
          description: "Study SHA-2 digest sizes and behavior.",
        },
      ]}
      relatedTools={[
        {
          name: "SHA-256",
          path: "/tools/hashing/sha-256",
          description: "Generate a 256-bit SHA-2 digest.",
        },
        {
          name: "SHA-384",
          path: "/tools/hashing/sha-384",
          description: "Generate a 384-bit SHA-2 digest.",
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

        <div className="flex gap-3">
          <button
            type="button"
            onClick={generate}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            <Hash size={16} />
            Generate SHA-512
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
                SHA-512 Digest
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
