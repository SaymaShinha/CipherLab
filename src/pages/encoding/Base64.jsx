import { useState } from "react";
import { Code2 } from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";
import { encodeBase64, decodeBase64 } from "../../utils/encoding.js";

export default function Base64() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const process = () => {
    setError("");

    try {
      setResult(mode === "encode" ? encodeBase64(input) : decodeBase64(input));
    } catch {
      setResult("");
      setError("Invalid Base64 input.");
    }
  };

  return (
    <ToolLayout
      title="Base64 Encoder & Decoder"
      description="Encode and decode text using Base64 directly in your browser."
      canonical="/tools/encoding/base64"
      category="Encoding"
      intro={
        <p>
          Base64 is an encoding format that represents binary data using
          printable characters. It is encoding, not encryption, and should not
          be used to protect sensitive information.
        </p>
      }
      howToUse={[
        "Choose Encode or Decode.",
        "Enter your text or Base64 data.",
        "Run the conversion.",
        "Copy the result.",
      ]}
      features={[
        {
          title: "Encode and decode",
          description: "Convert between UTF-8 text and Base64.",
        },
        {
          title: "Unicode support",
          description: "Handles normal Unicode text through UTF-8 conversion.",
        },
        {
          title: "Local processing",
          description: "Conversion occurs in the browser.",
        },
        {
          title: "Copy result",
          description: "Copy the converted data instantly.",
        },
      ]}
      aboutTitle="What Is Base64?"
      aboutContent={
        <>
          <p>
            Base64 is a binary-to-text encoding scheme commonly used when binary
            data needs to travel through text-oriented systems.
          </p>

          <p>
            Base64 does not provide confidentiality. Anyone who has Base64 data
            can decode it.
          </p>
        </>
      }
      useCases={[
        {
          title: "API testing",
          description: "Inspect or generate Base64 values used by APIs.",
        },
        {
          title: "Data transport",
          description: "Represent binary data as printable text.",
        },
        {
          title: "Developer workflows",
          description: "Quickly encode and decode test values.",
        },
        {
          title: "Learning",
          description:
            "Understand the difference between encoding and encryption.",
        },
      ]}
      relatedTools={[
        {
          name: "Base64URL",
          path: "/tools/encoding/base64url",
          description: "Use a URL-safe Base64 representation.",
        },
        {
          name: "Hex",
          path: "/tools/encoding/hex",
          description: "Convert text to hexadecimal.",
        },
      ]}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1">
          {[
            ["encode", "Encode"],
            ["decode", "Decode"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setMode(value);
                setResult("");
                setError("");
              }}
              className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                mode === value
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder={mode === "encode" ? "Enter text..." : "Enter Base64..."}
          className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
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
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            <Code2 size={16} />
            {mode === "encode" ? "Encode" : "Decode"}
          </button>

          <ClearButton
            onClick={() => {
              setInput("");
              setResult("");
              setError("");
            }}
            disabled={!input && !result && !error}
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
              className="w-full rounded-xl bg-black/20 p-4 font-mono text-sm leading-7 text-slate-300 outline-none"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
