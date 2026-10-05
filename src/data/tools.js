import {
  Braces,
  Binary,
  Code2,
  FileCode2,
  Fingerprint,
  Hash,
  KeyRound,
  Link2,
  LockKeyhole,
  MessageSquareLock,
  Palette,
  RefreshCw,
  ShieldCheck,
  Shuffle,
  Timer,
  Type,
  WandSparkles,
} from "lucide-react";

export const tools = [
  // =========================
  // FORMATTING
  // =========================

  {
    name: "JSON Formatter",
    slug: "json-formatter",
    path: "/tools/json-formatter",
    description:
      "Format and beautify JSON data into a clean, readable structure.",
    category: "Formatting",
    icon: Braces,
    keywords: ["json", "format", "beautify", "pretty print"],
  },

  {
    name: "JSON Validator",
    slug: "json-validator",
    path: "/tools/json-validator",
    description: "Validate JSON syntax and identify malformed JSON data.",
    category: "Formatting",
    icon: ShieldCheck,
    keywords: ["json", "validate", "validator", "syntax"],
  },

  {
    name: "HTML Formatter",
    slug: "html-formatter",
    path: "/tools/html-formatter",
    description:
      "Format HTML markup into a cleaner and easier-to-read structure.",
    category: "Formatting",
    icon: FileCode2,
    keywords: ["html", "format", "beautify", "markup"],
  },

  // =========================
  // ENCODING
  // =========================

  {
    name: "Base64 Encoder",
    slug: "base64",
    path: "/tools/base64",
    description: "Encode and decode UTF-8 text using Base64 encoding.",
    category: "Encoding",
    icon: Binary,
    keywords: ["base64", "encode", "decode", "encoding"],
  },

  {
    name: "Base64URL Encoder",
    slug: "base64url",
    path: "/tools/base64url",
    description: "Encode and decode text using URL-safe Base64 representation.",
    category: "Encoding",
    icon: Link2,
    keywords: ["base64url", "base64", "url", "encode", "decode"],
  },

  {
    name: "Hex Encoder",
    slug: "hex",
    path: "/tools/hex",
    description:
      "Convert UTF-8 text to hexadecimal and decode hexadecimal values.",
    category: "Encoding",
    icon: Hash,
    keywords: ["hex", "hexadecimal", "encode", "decode", "bytes"],
  },

  {
    name: "URL Encoder",
    slug: "url-encoder",
    path: "/tools/url-encoder",
    description: "Encode or decode URL components safely in your browser.",
    category: "Encoding",
    icon: Link2,
    keywords: ["url", "encode", "decode", "uri", "percent encoding"],
  },

  {
    name: "HTML Encoder",
    slug: "html-encoder",
    path: "/tools/html-encoder",
    description: "Convert HTML-sensitive characters into HTML entities.",
    category: "Encoding",
    icon: Code2,
    keywords: ["html", "encode", "entities", "escape"],
  },

  // =========================
  // TEXT
  // =========================

  {
    name: "Text Case Converter",
    slug: "text-case-converter",
    path: "/tools/text-case-converter",
    description:
      "Convert text between uppercase, lowercase, title case, camel case, and more.",
    category: "Text",
    icon: Type,
    keywords: [
      "text",
      "case",
      "uppercase",
      "lowercase",
      "camel case",
      "title case",
    ],
  },

  {
    name: "Word Counter",
    slug: "word-counter",
    path: "/tools/word-counter",
    description: "Count words, characters, sentences, lines, and paragraphs.",
    category: "Text",
    icon: Type,
    keywords: ["word", "counter", "character", "text", "count"],
  },

  {
    name: "Slug Generator",
    slug: "slug-generator",
    path: "/tools/slug-generator",
    description: "Generate clean, URL-friendly slugs from titles and text.",
    category: "Text",
    icon: WandSparkles,
    keywords: ["slug", "url", "seo", "permalink"],
  },

  // =========================
  // GENERATORS
  // =========================

  {
    name: "UUID Generator",
    slug: "uuid-generator",
    path: "/tools/uuid-generator",
    description:
      "Generate random UUID v4 identifiers using secure browser randomness.",
    category: "Generators",
    icon: RefreshCw,
    keywords: ["uuid", "guid", "identifier", "random"],
  },

  {
    name: "Password Generator",
    slug: "password-generator",
    path: "/tools/password-generator",
    description:
      "Generate strong random passwords using cryptographically secure browser randomness.",
    category: "Generators",
    icon: KeyRound,
    keywords: ["password", "generator", "secure password", "random password"],
    featured: true,
  },

  {
    name: "Random Bytes",
    slug: "random-bytes",
    path: "/tools/random-bytes",
    description:
      "Generate cryptographically secure random bytes in hexadecimal, Base64, or Base64URL format.",
    category: "Generators",
    icon: Shuffle,
    keywords: ["random", "bytes", "crypto", "random bytes", "entropy"],
  },

  // =========================
  // CONVERTERS
  // =========================

  {
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    path: "/tools/timestamp-converter",
    description:
      "Convert Unix timestamps to readable dates and convert dates back to timestamps.",
    category: "Converters",
    icon: Timer,
    keywords: ["timestamp", "unix", "date", "time", "epoch"],
  },

  {
    name: "Color Converter",
    slug: "color-converter",
    path: "/tools/color-converter",
    description: "Convert colors between HEX, RGB, and HSL formats.",
    category: "Converters",
    icon: Palette,
    keywords: ["color", "hex", "rgb", "hsl", "converter"],
  },

  // =========================
  // HASHING
  // =========================

  {
    name: "SHA-256",
    slug: "sha256",
    path: "/tools/sha256",
    description:
      "Generate SHA-256 cryptographic hashes from text directly in your browser.",
    category: "Hashing",
    icon: Fingerprint,
    keywords: ["sha256", "sha-256", "hash", "hashing", "digest"],
    featured: true,
  },

  {
    name: "SHA-384",
    slug: "sha384",
    path: "/tools/sha384",
    description: "Generate SHA-384 cryptographic hashes from text.",
    category: "Hashing",
    icon: Fingerprint,
    keywords: ["sha384", "sha-384", "hash", "hashing", "digest"],
  },

  {
    name: "SHA-512",
    slug: "sha512",
    path: "/tools/sha512",
    description: "Generate SHA-512 cryptographic hashes from text.",
    category: "Hashing",
    icon: Fingerprint,
    keywords: ["sha512", "sha-512", "hash", "hashing", "digest"],
  },

  {
    name: "SHA-3",
    slug: "sha3",
    path: "/tools/sha3",
    description:
      "Generate SHA-3 cryptographic hashes using multiple SHA-3 variants.",
    category: "Hashing",
    icon: Hash,
    keywords: ["sha3", "sha-3", "keccak", "hash", "digest"],
  },

  // =========================
  // CRYPTOGRAPHY
  // =========================

  {
    name: "AES-256-GCM",
    slug: "aes-gcm",
    path: "/tools/aes-gcm",
    description:
      "Encrypt and decrypt text using AES-256-GCM with password-based key derivation.",
    category: "Cryptography",
    icon: LockKeyhole,
    keywords: [
      "aes",
      "aes-256",
      "aes-gcm",
      "encryption",
      "decryption",
      "cryptography",
    ],
    featured: true,
  },

  {
    name: "AES-CBC",
    slug: "aes-cbc",
    path: "/tools/aes-cbc",
    description:
      "Explore AES-CBC encryption while learning why authenticated encryption is preferred for new applications.",
    category: "Cryptography",
    icon: LockKeyhole,
    keywords: ["aes", "aes-cbc", "cbc", "encryption", "cryptography"],
  },

  {
    name: "ChaCha20-Poly1305",
    slug: "chacha20",
    path: "/tools/chacha20",
    description:
      "Encrypt and decrypt data using the authenticated ChaCha20-Poly1305 construction.",
    category: "Cryptography",
    icon: MessageSquareLock,
    keywords: [
      "chacha20",
      "chacha20-poly1305",
      "poly1305",
      "encryption",
      "cryptography",
    ],
    featured: true,
  },

  {
    name: "Custom Encryption Chain",
    slug: "custom-encryption",
    path: "/tools/custom-encryption",
    description:
      "Build a custom multi-layer encryption chain by selecting and ordering authenticated encryption algorithms.",
    category: "Cryptography",
    icon: LockKeyhole,
    keywords: [
      "custom encryption",
      "combined encryption",
      "encryption chain",
      "multi layer encryption",
      "aes",
      "chacha20",
      "cryptography",
    ],
  },

  {
    name: "HMAC",
    slug: "hmac",
    path: "/tools/hmac",
    description:
      "Generate keyed message authentication codes for message integrity and authentication.",
    category: "Cryptography",
    icon: KeyRound,
    keywords: [
      "hmac",
      "authentication",
      "message authentication",
      "integrity",
      "hash",
    ],
  },
];

export const toolCategories = [
  "All",
  "Formatting",
  "Encoding",
  "Text",
  "Generators",
  "Converters",
  "Hashing",
  "Cryptography",
];

export const featuredTools = tools.filter((tool) => tool.featured);

export function getToolByPath(path) {
  return tools.find((tool) => tool.path === path);
}

export function getToolsByCategory(category) {
  if (!category || category === "All") {
    return tools;
  }

  return tools.filter((tool) => tool.category === category);
}

export function searchTools(query) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return tools;
  }

  return tools.filter((tool) => {
    const searchableText = [
      tool.name,
      tool.description,
      tool.category,
      ...(tool.keywords || []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalized);
  });
}

export default tools;
