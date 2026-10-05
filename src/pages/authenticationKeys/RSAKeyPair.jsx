import { useState } from "react";
import ToolLayout from "../../components/ToolLayout.jsx";
import { bufferToPem } from "../../utils/securityUtils.js";
import { related } from "../../data/securityTools.js";
export default function RSAKeyPairPage() {
  const [size, setSize] = useState(2048);
  const [hash, setHash] = useState("SHA-256");
  const [keys, setKeys] = useState(null);
  const [busy, setBusy] = useState(false);
  const generate = async () => {
    setBusy(true);
    try {
      const pair = await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: Number(size),
          publicExponent: new Uint8Array([1, 0, 1]),
          hash,
        },
        {
          name: "RSA-OAEP",
          modulusLength: Number(size),
          publicExponent: new Uint8Array([1, 0, 1]),
          hash,
        },
        true,
        ["encrypt", "decrypt"],
      );
      const [pub, priv] = await Promise.all([
        crypto.subtle.exportKey("spki", pair.publicKey),
        crypto.subtle.exportKey("pkcs8", pair.privateKey),
      ]);
      setKeys({
        publicKey: bufferToPem(pub, "PUBLIC KEY"),
        privateKey: bufferToPem(priv, "PRIVATE KEY"),
      });
    } finally {
      setBusy(false);
    }
  };
  return (
    <ToolLayout
      title="RSA Key Pair Generator"
      description="Generate an RSA public/private key pair locally using the Web Crypto API."
      category="Cryptography Tool"
      canonical="/security/rsa-key-pair"
      howToUse={[
        "Choose an RSA modulus size and hash algorithm.",
        "Generate the key pair.",
        "Copy or save the PEM-formatted keys for development and testing.",
        "Never expose a private key that protects real production assets.",
      ]}
      features={[
        {
          title: "Client-side generation",
          description: "The browser creates the key pair using Web Crypto.",
        },
        {
          title: "PEM output",
          description:
            "Public and private keys are exported in standard PEM wrappers.",
        },
      ]}
      aboutContent={
        <>
          <p>
            RSA uses a public/private key pair. The public key can be shared
            while the private key must remain protected.
          </p>
          <p>
            This page is intended for education and development. Production key
            management should use carefully controlled storage, access policies
            and reviewed cryptographic architecture.
          </p>
        </>
      }
      useCases={[
        {
          title: "Development",
          description:
            "Create test keys for applications that use RSA-based cryptography.",
        },
        {
          title: "Learning",
          description:
            "Explore public-key generation and standard key encodings.",
        },
      ]}
      faqItems={[
        {
          question: "Is this a production key-management system?",
          answer:
            "No. It is a client-side development and educational utility. Protect important private keys using an appropriate key-management solution.",
        },
        {
          question: "Why 2048 bits?",
          answer:
            "2048-bit RSA is a common baseline for many applications. Larger keys increase computational cost.",
        },
      ]}
      relatedTools={related("/security/rsa-key-pair")}
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-slate-400">
            RSA size
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#111827] p-3 text-white"
            >
              <option value="2048">2048 bits</option>
              <option value="3072">3072 bits</option>
              <option value="4096">4096 bits</option>
            </select>
          </label>
          <label className="text-sm text-slate-400">
            Hash
            <select
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#111827] p-3 text-white"
            >
              <option>SHA-256</option>
              <option>SHA-384</option>
              <option>SHA-512</option>
            </select>
          </label>
        </div>
        <button
          disabled={busy}
          onClick={generate}
          className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          {busy ? "Generating..." : "Generate RSA Key Pair"}
        </button>
        {keys && (
          <div className="grid gap-5 lg:grid-cols-2">
            <Key title="Public Key" value={keys.publicKey} />
            <Key title="Private Key" value={keys.privateKey} />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
function Key({ title, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
        {title}
      </div>
      <textarea
        readOnly
        value={value}
        className="h-64 w-full resize-none rounded-lg bg-black/20 p-3 font-mono text-xs leading-5 text-slate-300 outline-none"
      />
      <button
        onClick={() => navigator.clipboard.writeText(value)}
        className="mt-3 rounded-lg border border-white/10 px-3 py-2 text-xs"
      >
        Copy
      </button>
    </div>
  );
}
