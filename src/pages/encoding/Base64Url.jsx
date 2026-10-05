import { useState } from "react";
import { Link2 } from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";

import { encodeBase64Url, decodeBase64Url } from "../../utils/encoding.js";

export default function Base64Url() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const process = () => {
    setError("");

    try {
      setResult(
        mode === "encode" ? encodeBase64Url(input) : decodeBase64Url(input),
      );
    } catch {
      setResult("");
      setError("Invalid Base64URL input.");
    }
  };

  return (
    <ToolLayout
      title="Base64URL Encoder & Decoder"
      description="Encode and decode URL-safe Base64 data directly in your browser."
      canonical="/tools/encoding/base64url"
      category="Encoding"
      intro={
        <p>
          Base64URL is a URL- and filename-safe variation of Base64. It replaces
          characters that have special meaning in URLs and commonly omits
          padding.
        </p>
      }
      howToUse={[
        "Choose Encode or Decode.",
        "Enter the data.",
        "Run the conversion.",
        "Copy the result.",
      ]}
      features={[
        {
          title: "URL-safe",
          description: "Uses the URL-safe Base64 alphabet.",
        },
        {
          title: "No padding required",
          description: "Encoded output omits trailing equals padding.",
        },
        {
          title: "Unicode support",
          description: "Text is converted through UTF-8.",
        },
        {
          title: "Local processing",
          description: "Conversion runs in your browser.",
        },
      ]}
      aboutTitle="What Is Base64URL?"
      aboutContent={
        <p>
          Base64URL is commonly used when binary data needs to appear safely
          inside URLs, JSON Web Tokens, or other URL-sensitive formats. It is
          encoding rather than encryption.
        </p>
      }
      useCases={[
        {
          title: "JWT",
          description: "Work with Base64URL-encoded JWT components.",
        },
        {
          title: "URL parameters",
          description: "Represent binary values safely inside URLs.",
        },
        {
          title: "API development",
          description: "Inspect URL-safe encoded values.",
        },
        {
          title: "Testing",
          description: "Generate Base64URL test data.",
        },
      ]}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1">
          {["encode", "decode"].map((value) => (
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
          className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
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
            <Link2 size={16} />
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
              rows={7}
              className="w-full rounded-xl bg-black/20 p-4 font-mono text-sm text-slate-300 outline-none"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
