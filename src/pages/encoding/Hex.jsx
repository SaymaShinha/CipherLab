// src/pages/encoding/Hex.jsx

import { useState } from "react";
import { ArrowDownUp, Binary } from "lucide-react";

import SEO from "../../components/SEO.jsx";
import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";
import PrivacyBadge from "../../components/PrivacyBadge.jsx";
import { faqData } from "../../data/faq.js";
import { tools } from "../../data/tools.js";

const relatedTools = tools.filter((tool) =>
  [
    "/tools/base64",
    "/tools/base64url",
    "/tools/url-encoder",
    "/tools/html-encoder",
  ].includes(tool.path),
);

function textToHex(text) {
  const bytes = new TextEncoder().encode(text);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function hexToText(hex) {
  const normalized = hex.replace(/\s+/g, "");

  if (!normalized) {
    return "";
  }

  if (!/^[0-9a-fA-F]+$/.test(normalized)) {
    throw new Error(
      "Invalid hexadecimal value. Use only characters 0-9 and A-F.",
    );
  }

  if (normalized.length % 2 !== 0) {
    throw new Error(
      "Invalid hexadecimal value. A hexadecimal byte must contain two characters.",
    );
  }

  const bytes = new Uint8Array(normalized.length / 2);

  for (let i = 0; i < normalized.length; i += 2) {
    bytes[i / 2] = Number.parseInt(normalized.slice(i, i + 2), 16);
  }

  return new TextDecoder("utf-8", {
    fatal: true,
  }).decode(bytes);
}

export default function Hex() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");

    try {
      if (!input.trim()) {
        setOutput("");
        return;
      }

      if (mode === "encode") {
        setOutput(textToHex(input));
      } else {
        setOutput(hexToText(input));
      }
    } catch (conversionError) {
      setOutput("");
      setError(
        conversionError instanceof Error
          ? conversionError.message
          : "Unable to convert the value.",
      );
    }
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setInput("");
    setOutput("");
    setError("");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <>
      <SEO
        title="Hex Encoder & Decoder - Convert Text to Hex Online"
        description="Convert UTF-8 text to hexadecimal and decode hexadecimal values back to text with a free browser-based Hex encoder and decoder."
        canonical="/tools/hex"
      />

      <ToolLayout
        title="Hex Encoder & Decoder"
        description="Convert text to hexadecimal bytes or decode hexadecimal values back into readable UTF-8 text."
        intro={
          <>
            <p>
              Hexadecimal, commonly called hex, is a compact way to represent
              binary data using sixteen symbols: 0–9 and A–F. Each pair of
              hexadecimal characters represents one byte.
            </p>

            <p className="mt-5">
              This tool converts text using UTF-8 encoding, so it also works
              with Unicode characters such as Bengali, Arabic, emoji, and other
              non-ASCII text.
            </p>

            <div className="mt-6">
              <PrivacyBadge text="Conversion is performed locally in your browser. Your text is not uploaded to a server by this tool." />
            </div>
          </>
        }
        howToUse={[
          "Choose Encode Text or Decode Hex.",
          "Enter your text or hexadecimal value.",
          "Click Convert to Hex or Decode Hex.",
          "Copy the resulting value when you are finished.",
        ]}
        features={[
          {
            title: "UTF-8 support",
            description:
              "Correctly converts Unicode text into its UTF-8 byte representation.",
          },
          {
            title: "Encode and decode",
            description:
              "Convert text to hexadecimal or hexadecimal back to text.",
          },
          {
            title: "Input validation",
            description:
              "Detects invalid hexadecimal characters and incomplete byte pairs.",
          },
          {
            title: "Browser-based",
            description:
              "All conversion takes place locally without sending your input to a server.",
          },
        ]}
        example={
          <div className="p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Text
                </p>

                <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-200">
                  Hello
                </pre>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Hexadecimal
                </p>

                <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-200">
                  48656c6c6f
                </pre>
              </div>
            </div>
          </div>
        }
        aboutTitle="What Is Hexadecimal Encoding?"
        aboutContent={
          <>
            <p>
              Hexadecimal is a base-16 number system. Unlike decimal, which uses
              ten digits, hexadecimal uses sixteen symbols: the digits 0–9 and
              the letters A–F.
            </p>

            <p>
              Computers ultimately process information as binary data. Hex
              provides a more compact and readable representation of those
              bytes. One byte contains eight bits and can be represented by
              exactly two hexadecimal characters, from <code>00</code> through{" "}
              <code>ff</code>.
            </p>

            <p>
              Hexadecimal is an encoding or representation format, not an
              encryption method. Converting a value to hex does not protect it
              from being read. Anyone who knows the encoding can convert the
              hexadecimal value back to the original bytes.
            </p>
          </>
        }
        useCases={[
          {
            title: "Developer debugging",
            description:
              "Inspect byte values while troubleshooting applications and protocols.",
          },
          {
            title: "Cryptography",
            description:
              "Represent hashes, keys, random bytes, and other binary values in a readable format.",
          },
          {
            title: "Data inspection",
            description:
              "Examine binary values using a compact hexadecimal representation.",
          },
          {
            title: "Testing",
            description:
              "Create and decode hexadecimal test values quickly in the browser.",
          },
        ]}
        faqItems={faqData["hex"]}
        relatedTools={relatedTools}
      >
        <div className="space-y-5">
          {/* Mode selector */}
          <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
            <button
              type="button"
              onClick={() => handleModeChange("encode")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                mode === "encode"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              <Binary size={17} />
              Encode Text
            </button>

            <button
              type="button"
              onClick={() => handleModeChange("decode")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                mode === "decode"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              <ArrowDownUp size={17} />
              Decode Hex
            </button>
          </div>

          {/* Input */}
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="hex-input"
                className="text-sm font-semibold text-slate-800"
              >
                {mode === "encode" ? "Text Input" : "Hexadecimal Input"}
              </label>

              {mode === "decode" && (
                <span className="text-xs text-slate-400">
                  Spaces are allowed
                </span>
              )}
            </div>

            <textarea
              id="hex-input"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
              }}
              rows={9}
              spellCheck={false}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              placeholder={
                mode === "encode"
                  ? "Enter text, for example: Hello World!"
                  : "Enter hexadecimal, for example: 48656c6c6f20576f726c6421"
              }
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleConvert}
              disabled={!input.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Binary size={17} />

              {mode === "encode" ? "Convert to Hex" : "Decode Hex"}
            </button>

            <ClearButton
              onClick={handleClear}
              disabled={!input && !output && !error}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
            >
              <p className="font-semibold">Conversion error</p>
              <p className="mt-1">{error}</p>
            </div>
          )}

          {/* Output */}
          {output && (
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="font-semibold text-slate-900">
                  {mode === "encode" ? "Hexadecimal Result" : "Decoded Text"}
                </h2>

                <CopyButton text={output} />
              </div>

              <textarea
                value={output}
                readOnly
                rows={9}
                spellCheck={false}
                className="w-full rounded-xl bg-slate-950 p-4 font-mono text-sm leading-7 text-slate-200 outline-none"
              />

              {mode === "encode" && (
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Each pair of hexadecimal characters represents one UTF-8 byte.
                </p>
              )}
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
