import { useState } from "react";
import ToolLayout from "../../components/ToolLayout.jsx";
import { arrayBufferToHex, formatBytes } from "../../utils/securityUtils.js";
import { related } from "../../data/securityTools.js";
export default function FileHashPage() {
  const [file, setFile] = useState(null);
  const [algorithms, setAlgorithms] = useState(["SHA-256", "SHA-512"]);
  const [results, setResults] = useState([]);
  const [busy, setBusy] = useState(false);
  const calculate = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const data = await file.arrayBuffer();
      const out = [];
      for (const algorithm of algorithms) {
        const digest = await crypto.subtle.digest(algorithm, data);
        out.push({ algorithm, value: arrayBufferToHex(digest) });
      }
      setResults(out);
    } finally {
      setBusy(false);
    }
  };
  const toggle = (a) =>
    setAlgorithms((x) =>
      x.includes(a) ? x.filter((v) => v !== a) : [...x, a],
    );
  return (
    <ToolLayout
      title="File Hash Generator"
      description="Calculate SHA-256, SHA-384 and SHA-512 hashes for files directly in your browser."
      category="Hashing & Verification"
      canonical="/tools/security/file-hash"
      relatedTools={related("hashing", ["/tools/security/file-hash"])}
      howToUse={[
        "Choose a file from your device.",
        "Select one or more hash algorithms.",
        "Calculate the hashes.",
        "Compare them with a trusted published value when verifying a download.",
      ]}
      features={[
        {
          title: "Multiple algorithms",
          description: "Calculate SHA-256, SHA-384 and SHA-512 file hashes.",
        },
        {
          title: "Local file processing",
          description:
            "The selected file is read by your browser and is not uploaded by this page.",
        },
      ]}
      aboutContent={
        <>
          <p>
            File hashes are commonly published alongside software downloads so
            users can verify that a downloaded file has the same contents as the
            publisher's reference file.
          </p>
          <p>
            Matching hashes do not prove that a file is trustworthy by
            themselves; compare against a trusted source and consider the
            signature or distribution mechanism as well.
          </p>
        </>
      }
      useCases={[
        {
          title: "Download verification",
          description: "Compare a downloaded file with a publisher's checksum.",
        },
        {
          title: "Backup integrity",
          description:
            "Record hashes and later compare them to detect changes.",
        },
      ]}
      faqItems={[
        {
          question: "Is my file uploaded?",
          answer:
            "This implementation uses the browser's File and Web Crypto APIs and does not send the file to a server.",
        },
        {
          question: "Which hash should I use?",
          answer:
            "SHA-256 is a common practical choice. SHA-384 and SHA-512 are also supported when required.",
        },
      ]}
      relatedTools={related("hashing", ["/tools/security/file-hash"])}
    >
      <div className="space-y-5">
        <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[.02] p-6 text-center">
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setResults([]);
            }}
            className="sr-only"
          />
          <span className="text-sm font-semibold text-white">
            {file ? file.name : "Choose a file"}
          </span>
          <span className="mt-1 text-xs text-slate-500">
            {file ? formatBytes(file.size) : "The file stays in your browser"}
          </span>
        </label>
        <div className="grid gap-2 sm:grid-cols-3">
          {["SHA-256", "SHA-384", "SHA-512"].map((a) => (
            <label
              key={a}
              className="rounded-xl border border-white/10 p-3 text-sm text-slate-300"
            >
              <input
                type="checkbox"
                checked={algorithms.includes(a)}
                onChange={() => toggle(a)}
                className="mr-2"
              />
              {a}
            </label>
          ))}
        </div>
        <button
          disabled={!file || !algorithms.length || busy}
          onClick={calculate}
          className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          {busy ? "Calculating..." : "Calculate File Hashes"}
        </button>
        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((r) => (
              <div
                key={r.algorithm}
                className="rounded-xl border border-white/10 bg-black/30 p-4"
              >
                <div className="text-xs font-semibold text-indigo-400">
                  {r.algorithm}
                </div>
                <code className="mt-2 block break-all text-sm leading-6 text-slate-300">
                  {r.value}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(r.value)}
                  className="mt-3 rounded-lg border border-white/10 px-3 py-2 text-xs"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
