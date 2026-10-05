import { useState } from "react";
import ToolLayout from "../../components/ToolLayout.jsx";
import { arrayBufferToBase64, arrayBufferToHex, textToBytes } from "../../utils/securityUtils.js";
import { related } from "../../data/securityTools.js";

export default function SHAHashPage() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [encoding, setEncoding] = useState("hex");
  const [result, setResult] = useState("");

  const generate = async () => {
    const digest = await crypto.subtle.digest(algorithm, textToBytes(text));
    setResult(encoding === "hex" ? arrayBufferToHex(digest) : arrayBufferToBase64(digest));
  };

  return <ToolLayout title="SHA-256, SHA-384 & SHA-512 Hash Generator" description="Generate SHA-2 cryptographic hashes directly in your browser." category="Hashing Tool" canonical="/security/hash-generator"
    howToUse={["Enter text to hash.", "Choose SHA-256, SHA-384 or SHA-512.", "Choose hexadecimal or Base64 output.", "Generate and copy the result."]}
    features={[{ title:"SHA-2 family", description:"Generate SHA-256, SHA-384 and SHA-512 digests." }, { title:"Local processing", description:"Text is processed in your browser using Web Crypto." }]}
    aboutContent={<><p>SHA-256, SHA-384 and SHA-512 are members of the SHA-2 family of cryptographic hash functions. A hash is a one-way digest, not encrypted text.</p><p>Hash values are commonly used to detect changes to data, verify downloads and support cryptographic protocols.</p></>}
    useCases={[{ title:"File verification", description:"Compare a calculated digest with a published hash." }, { title:"Development", description:"Test expected hash values while building applications." }]}
    faqItems={[{ question:"Can a SHA hash be decrypted?", answer:"No. A cryptographic hash is designed as a one-way function. Attackers can still guess inputs, so hashes should not be treated as encryption." }, { question:"Which should I choose?", answer:"SHA-256 is a common general-purpose choice. SHA-384 and SHA-512 produce longer digests." }]}
    relatedTools={related("/security/hash-generator")}
  >
    <div className="space-y-5">
      <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text to hash..." className="min-h-36 w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none focus:border-indigo-400/50" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-slate-400">Algorithm<select value={algorithm} onChange={(e)=>setAlgorithm(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#111827] p-3 text-white"><option>SHA-256</option><option>SHA-384</option><option>SHA-512</option></select></label>
        <label className="text-sm text-slate-400">Output<select value={encoding} onChange={(e)=>setEncoding(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#111827] p-3 text-white"><option value="hex">Hex</option><option value="base64">Base64</option></select></label>
      </div>
      <button onClick={generate} className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-400">Generate Hash</button>
      {result && <Output value={result} />}
    </div>
  </ToolLayout>;
}

function Output({ value }) { return <div className="rounded-xl border border-white/10 bg-black/30 p-4"><div className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">Result</div><code className="break-all text-sm leading-7 text-slate-300">{value}</code><button onClick={()=>navigator.clipboard.writeText(value)} className="mt-4 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5">Copy</button></div>; }
