// src/data/articles.js

export const articles = [
  {
    slug: "encryption-vs-hashing",
    title: "Encryption vs Hashing",
    description:
      "Understand the difference between encryption and hashing, when each should be used, and why they solve different security problems.",
    category: "Cryptography",
    readTime: "8 min read",
    path: "/learn/encryption-vs-hashing",
  },

  {
    slug: "aes-explained",
    title: "AES Explained",
    description:
      "Learn how AES works, what AES-128, AES-192 and AES-256 mean, and why encryption modes such as GCM matter.",
    category: "Cryptography",
    readTime: "9 min read",
    path: "/learn/aes-explained",
  },

  {
    slug: "password-encryption",
    title: "Password Encryption and Password Hashing",
    description:
      "Learn why passwords should normally be protected with password hashing or key derivation rather than reversible encryption.",
    category: "Security",
    readTime: "8 min read",
    path: "/learn/password-encryption",
  },

  {
    slug: "salt-and-iv",
    title: "Salt vs IV: What Is the Difference?",
    description:
      "Understand the purpose of salts and initialization vectors and why they are important in cryptographic systems.",
    category: "Cryptography",
    readTime: "7 min read",
    path: "/learn/salt-and-iv",
  },

  {
    slug: "cryptography-basics",
    title: "Cryptography Basics",
    description:
      "A practical introduction to plaintext, ciphertext, keys, hashing, MACs, digital signatures, randomness, and encryption.",
    category: "Security",
    readTime: "10 min read",
    path: "/learn/cryptography-basics",
  },
];

export const getArticleBySlug = (slug) =>
  articles.find((article) => article.slug === slug);

export default articles;
