import { useState } from "react";
import { Hash } from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";

import {
  hashSHA3_256,
  hashSHA3_384,
  hashSHA3_512,
} from "../../utils/hashing.js";

export default function SHA3() {
  const [variant, setVariant] = useState("256");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    const fn =
      variant === "256"
        ? hashSHA3_256
        : variant === "384"
          ? hashSHA3_384
          : hashSHA3_512;

    setResult(fn(input));
  };

  return (
    <ToolLayout
      title="SHA-3 Hash Generator"
      description="Generate SHA-3 cryptographic hashes using SHA3-256, SHA3-384, or SHA3-512."
      canonical="/tools/hashing/sha-3"
      category="Hashing"
      intro={
        <p>
          SHA-3 is a NIST-standardized cryptographic hash family based on the
          Keccak sponge construction. Choose from SHA3-256, SHA3-384, and
          SHA3-512.
        </p>
      }
      howToUse={[
        "Choose a SHA-3 digest size.",
        "Enter your text.",
        "Generate the digest.",
        "Copy the result.",
      ]}
      features={[
        {
          title: "Multiple variants",
          description: "Generate SHA3-256, SHA3-384, or SHA3-512.",
        },
        {
          title: "Modern standard",
          description: "Uses the FIPS 202 SHA-3 family.",
        },
        {
          title: "Local processing",
          description: "Hashing occurs in the browser.",
        },
        {
          title: "Copy support",
          description: "Copy the digest with one click.",
        },
      ]}
      aboutTitle="What Is SHA-3?"
      aboutContent={
        <>
          <p>
            SHA-3 is a family of cryptographic hash functions standardized by
            NIST and based on Keccak.
          </p>

          <p>
            SHA-3 uses a sponge construction rather than the Merkle-Damgård
            construction used by SHA-2.
          </p>
        </>
      }
      useCases={[
        {
          title: "Cryptographic testing",
          description: "Generate SHA-3 test values.",
        },
        {
          title: "Integrity",
          description: "Create fingerprints for data.",
        },
        {
          title: "Research",
          description: "Explore an alternative modern hash construction.",
        },
        {
          title: "Learning",
          description: "Compare SHA-2 and SHA-3.",
        },
      ]}
      relatedTools={[
        {
          name: "SHA-256",
          path: "/tools/hashing/sha-256",
          description: "Generate SHA-256 hashes.",
        },
        {
          name: "SHA-512",
          path: "/tools/hashing/sha-512",
          description: "Generate SHA-512 hashes.",
        },
      ]}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-black/20 p-1">
          {["256", "384", "512"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => {
                setVariant(size);
                setResult("");
              }}
              className={`rounded-lg px-3 py-3 text-sm font-semibold ${
                variant === size
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              SHA3-{size}
            </button>
          ))}
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder="Enter text..."
          className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={generate}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            <Hash size={16} />
            Generate SHA3-{variant}
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
              <h3 className="text-sm font-semibold text-white">
                SHA3-{variant} Digest
              </h3>
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
