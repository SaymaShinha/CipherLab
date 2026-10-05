import { useState } from "react";
import { Dices } from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";
import { bytesToHex, randomBytes } from "../../utils/crypto.js";

export default function RandomBytes() {
  const [length, setLength] = useState(32);
  const [format, setFormat] = useState("hex");
  const [result, setResult] = useState("");

  const generate = () => {
    const bytes = randomBytes(length);

    if (format === "hex") {
      setResult(bytesToHex(bytes));
      return;
    }

    let binary = "";

    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }

    setResult(btoa(binary));
  };

  return (
    <ToolLayout
      title="Random Bytes Generator"
      description="Generate cryptographically secure random bytes using your browser's Web Crypto API."
      canonical="/tools/security/random-bytes"
      category="Security"
      intro={
        <p>
          Random bytes are fundamental building blocks for cryptographic
          systems. This tool uses the browser's cryptographically secure random
          number generator.
        </p>
      }
      howToUse={[
        "Choose the number of bytes.",
        "Choose hexadecimal or Base64 output.",
        "Click Generate Random Bytes.",
        "Copy the generated value.",
      ]}
      features={[
        {
          title: "CSPRNG",
          description: "Uses crypto.getRandomValues() provided by the browser.",
        },
        {
          title: "Flexible length",
          description:
            "Generate the number of bytes required by your workflow.",
        },
        {
          title: "Hex and Base64",
          description: "Represent the random bytes using common formats.",
        },
        {
          title: "Local generation",
          description: "Randomness is generated directly on your device.",
        },
      ]}
      aboutTitle="What Are Random Bytes?"
      aboutContent={
        <>
          <p>
            A byte contains eight bits and can represent a value from 0 through
            255.
          </p>

          <p>
            Cryptographic systems use unpredictable random values for tasks such
            as salts, initialization vectors, nonces, tokens, and keys.
          </p>
        </>
      }
      useCases={[
        {
          title: "Cryptographic testing",
          description: "Generate test salts, IVs, and nonce values.",
        },
        {
          title: "Developer workflows",
          description: "Create random byte sequences for application testing.",
        },
        {
          title: "Security education",
          description: "Understand byte-oriented cryptographic inputs.",
        },
        {
          title: "Encoding tests",
          description: "Generate random data for Base64 and hexadecimal tests.",
        },
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Byte length
          </label>

          <input
            type="number"
            min="1"
            max="4096"
            value={length}
            onChange={(e) =>
              setLength(
                Math.min(4096, Math.max(1, Number(e.target.value) || 1)),
              )
            }
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1">
          <button
            type="button"
            onClick={() => setFormat("hex")}
            className={`rounded-lg px-4 py-3 text-sm font-semibold ${
              format === "hex"
                ? "bg-indigo-600 text-white"
                : "text-slate-500 hover:text-white"
            }`}
          >
            Hex
          </button>

          <button
            type="button"
            onClick={() => setFormat("base64")}
            className={`rounded-lg px-4 py-3 text-sm font-semibold ${
              format === "base64"
                ? "bg-indigo-600 text-white"
                : "text-slate-500 hover:text-white"
            }`}
          >
            Base64
          </button>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={generate}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            <Dices size={16} />
            Generate Random Bytes
          </button>

          <ClearButton onClick={() => setResult("")} disabled={!result} />
        </div>

        {result && (
          <div>
            <div className="mb-2 flex justify-between">
              <h3 className="text-sm font-semibold text-white">Random Data</h3>

              <CopyButton text={result} />
            </div>

            <textarea
              value={result}
              readOnly
              rows={7}
              className="w-full rounded-xl bg-black/20 p-4 font-mono text-sm leading-7 text-emerald-300 outline-none"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
