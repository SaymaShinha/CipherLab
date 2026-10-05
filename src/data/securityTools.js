// src/data/securityTools.js

export const securityTools = [
  {
    name: "SHA Hash Generator",
    path: "/tools/hashing/sha-256",
    description: "Generate SHA-256, SHA-384 and SHA-512 cryptographic hashes.",
  },
  {
    name: "SHA-3 Hash Generator",
    path: "/tools/hashing/sha-3",
    description: "Generate SHA-3 cryptographic hashes locally in your browser.",
  },
  {
    name: "HMAC Generator",
    path: "/tools/security/hmac",
    description: "Generate keyed-hash message authentication codes.",
  },
  {
    name: "PBKDF2 Generator",
    path: "/tools/security/pbkdf2",
    description: "Derive cryptographic keys from passwords using PBKDF2.",
  },
  {
    name: "Password Strength Analyzer",
    path: "/tools/security/password-strength",
    description: "Analyze password length, complexity and common weaknesses.",
  },
  {
    name: "Secure Password Generator",
    path: "/tools/security/password-generator",
    description: "Generate cryptographically secure random passwords.",
  },
  {
    name: "Random Bytes Generator",
    path: "/tools/security/random-bytes",
    description: "Generate cryptographically secure random bytes.",
  },
  {
    name: "RSA Key Pair Generator",
    path: "/tools/security/rsa-key-pair",
    description: "Generate RSA public and private key pairs locally.",
  },
  {
    name: "JWT Decoder & Inspector",
    path: "/tools/security/jwt-decoder",
    description: "Decode and inspect JWT headers and payloads.",
  },
  {
    name: "UUID & ULID Generator",
    path: "/tools/security/uuid-ulid",
    description: "Generate UUID and ULID identifiers.",
  },
  {
    name: "Checksum Calculator",
    path: "/tools/security/checksum",
    description: "Calculate checksums and hashes for data verification.",
  },
  {
    name: "File Hash Generator",
    path: "/tools/security/file-hash",
    description: "Calculate cryptographic hashes for files locally.",
  },
];

/* -------------------------------------------------------------------------- */
/* Related Tools                                                              */
/* -------------------------------------------------------------------------- */

const relatedGroups = {
  hashing: [
    {
      name: "SHA Hash Generator",
      path: "/tools/hashing/sha-256",
      description: "Generate SHA-256, SHA-384 and SHA-512 hashes.",
    },
    {
      name: "SHA-3 Hash Generator",
      path: "/tools/hashing/sha-3",
      description: "Generate SHA-3 cryptographic hashes.",
    },
    {
      name: "Checksum Calculator",
      path: "/tools/security/checksum",
      description: "Calculate checksums and hashes for verification.",
    },
    {
      name: "File Hash Generator",
      path: "/tools/security/file-hash",
      description: "Calculate cryptographic hashes for files.",
    },
  ],

  authentication: [
    {
      name: "HMAC Generator",
      path: "/tools/security/hmac",
      description: "Generate keyed-hash authentication codes.",
    },
    {
      name: "JWT Decoder & Inspector",
      path: "/tools/security/jwt-decoder",
      description: "Decode and inspect JWT headers and payloads.",
    },
    {
      name: "RSA Key Pair Generator",
      path: "/tools/security/rsa-key-pair",
      description: "Generate RSA public and private key pairs.",
    },
    {
      name: "PBKDF2 Generator",
      path: "/tools/security/pbkdf2",
      description: "Derive cryptographic keys from passwords.",
    },
  ],

  password: [
    {
      name: "Password Strength Analyzer",
      path: "/tools/security/password-strength",
      description: "Analyze password strength and common weaknesses.",
    },
    {
      name: "Secure Password Generator",
      path: "/tools/security/password-generator",
      description: "Generate cryptographically secure passwords.",
    },
    {
      name: "PBKDF2 Generator",
      path: "/tools/security/pbkdf2",
      description: "Derive cryptographic keys from passwords.",
    },
    {
      name: "Random Bytes Generator",
      path: "/tools/security/random-bytes",
      description: "Generate cryptographically secure random bytes.",
    },
  ],

  random: [
    {
      name: "Random Bytes Generator",
      path: "/tools/security/random-bytes",
      description: "Generate cryptographically secure random bytes.",
    },
    {
      name: "Secure Password Generator",
      path: "/tools/security/password-generator",
      description: "Generate cryptographically secure passwords.",
    },
    {
      name: "UUID & ULID Generator",
      path: "/tools/security/uuid-ulid",
      description: "Generate UUID and ULID identifiers.",
    },
  ],

  identifiers: [
    {
      name: "UUID & ULID Generator",
      path: "/tools/security/uuid-ulid",
      description: "Generate UUID and ULID identifiers.",
    },
    {
      name: "Random Bytes Generator",
      path: "/tools/security/random-bytes",
      description: "Generate cryptographically secure random bytes.",
    },
  ],

  verification: [
    {
      name: "File Hash Generator",
      path: "/tools/security/file-hash",
      description: "Calculate cryptographic hashes for files.",
    },
    {
      name: "Checksum Calculator",
      path: "/tools/security/checksum",
      description: "Calculate checksums and hashes for verification.",
    },
    {
      name: "SHA Hash Generator",
      path: "/tools/hashing/sha-256",
      description: "Generate SHA-256, SHA-384 and SHA-512 hashes.",
    },
    {
      name: "SHA-3 Hash Generator",
      path: "/tools/hashing/sha-3",
      description: "Generate SHA-3 cryptographic hashes.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Related Tool Helper                                                        */
/* -------------------------------------------------------------------------- */

export function related(group, exclude = []) {
  const tools = relatedGroups[group] || [];

  return tools.filter((tool) => !exclude.includes(tool.path));
}
