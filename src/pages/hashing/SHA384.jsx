import { useState } from "react";
import { Hash } from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";
import { hashSHA384 } from "../../utils/hashing.js";

export default function SHA384() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  return (
    <ToolLayout
      title="SHA-384 Hash Generator"
      description="Generate SHA-384 cryptographic hashes from text in your browser."
      canonical="/tools/hashing/sha-384"
      category="Hashing"
      intro={
        <p>
          SHA-384 is a member of the SHA-2 family that produces a 384-bit
          cryptographic digest.
        </p>
      }
      howToUse={[
        "Enter text.",
        "Click Generate SHA-384.",
        "Review the digest.",
        "Copy the result.",
      ]}
      features={[
        {
          title: "384-bit digest",
          description: "Produces a fixed-length cryptographic digest.",
        },
        {
          title: "SHA-2",
          description: "Uses the SHA-384 SHA-2 algorithm.",
        },
        {
          title: "Local",
          description: "Runs directly in your browser.",
        },
        {
          title: "Copy",
          description: "Copy the digest instantly.",
        },
      ]}
      aboutTitle="What Is SHA-384?"
      aboutContent={
        <p>
          SHA-384 is a truncated SHA-512 construction from the SHA-2 family. It
          produces a 384-bit digest and is commonly used where a SHA-2 hash with
          a larger digest than SHA-256 is desired.
        </p>
      }
      useCases={[
        {
          title: "Integrity checking",
          description: "Create a cryptographic fingerprint of data.",
        },
        {
          title: "Testing",
          description: "Generate SHA-384 test vectors.",
        },
        {
          title: "Developer tools",
          description: "Inspect and compare digest values.",
        },
        {
          title: "Learning",
          description: "Explore different SHA-2 digest sizes.",
        },
      ]}
    >
      <div className="space-y-5">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder="Enter text to hash..."
          className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setResult(hashSHA384(input))}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            <Hash size={16} />
            Generate SHA-384
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
            <div className="mb-2 flex justify-between">
              <h3 className="text-sm font-semibold text-white">Digest</h3>
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
