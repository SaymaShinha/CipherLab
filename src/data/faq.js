// src/data/faq.js

export const faqData = {
  "aes-gcm": [
    {
      question: "What is AES-GCM?",
      answer:
        "AES-GCM is an authenticated encryption mode that provides confidentiality and integrity. It encrypts data while also producing an authentication tag that helps detect unauthorized modification.",
    },
    {
      question: "Is AES-256-GCM secure?",
      answer:
        "AES-256-GCM is a modern authenticated encryption construction when implemented correctly and used with strong keys, unique nonces, and appropriate key management.",
    },
    {
      question: "Does this tool upload my plaintext?",
      answer:
        "No. Encryption is performed in your browser using the Web Crypto API. The plaintext is not intentionally sent to a server by the tool.",
    },
    {
      question: "Is Base64 encryption?",
      answer:
        "No. Base64 is an encoding format. It changes how bytes are represented but does not provide confidentiality.",
    },
  ],

  sha256: [
    {
      question: "What is SHA-256?",
      answer:
        "SHA-256 is a member of the SHA-2 family of cryptographic hash functions. It produces a fixed 256-bit digest from arbitrary input.",
    },
    {
      question: "Can SHA-256 be decrypted?",
      answer:
        "No. SHA-256 is designed as a one-way hash function rather than an encryption algorithm. An original input is not recovered by decrypting the digest.",
    },
    {
      question: "Does the same input always produce the same SHA-256 hash?",
      answer:
        "Yes. Deterministic hashing means the same exact byte sequence produces the same digest.",
    },
  ],

  sha512: [
    {
      question: "What is SHA-512?",
      answer:
        "SHA-512 is a SHA-2 cryptographic hash function that produces a 512-bit digest.",
    },
    {
      question: "Is SHA-512 encryption?",
      answer:
        "No. SHA-512 is hashing, not encryption. It does not provide a method for recovering the original input.",
    },
  ],

  sha384: [
    {
      question: "What is SHA-384?",
      answer:
        "SHA-384 is a SHA-2 hash function that produces a 384-bit digest.",
    },
    {
      question: "Can SHA-384 be reversed?",
      answer:
        "Cryptographic hashes are designed to make recovering an original input from the digest computationally impractical in general.",
    },
  ],

  sha3: [
    {
      question: "What is SHA-3?",
      answer:
        "SHA-3 is a family of cryptographic hash functions standardized by NIST and based on the Keccak sponge construction.",
    },
    {
      question: "How is SHA-3 different from SHA-2?",
      answer:
        "SHA-3 uses a different underlying construction from SHA-2. Both families provide standardized cryptographic hash functions but are based on different designs.",
    },
  ],

  base64: [
    {
      question: "Is Base64 encryption?",
      answer:
        "No. Base64 is an encoding scheme used to represent binary data using ASCII characters. Anyone who understands Base64 can decode it.",
    },
    {
      question: "Why is Base64 useful?",
      answer:
        "Base64 is useful when binary data needs to be represented as text, such as in JSON, HTML, email, configuration files, and data URLs.",
    },
  ],

  base64url: [
    {
      question: "What is Base64URL?",
      answer:
        "Base64URL is a URL-safe variation of Base64 that replaces characters that can have special meanings in URLs.",
    },
    {
      question: "Is Base64URL secure?",
      answer:
        "No. Base64URL is encoding, not encryption. It should never be treated as a security mechanism.",
    },
  ],

  hex: [
    {
      question: "What is hexadecimal encoding?",
      answer:
        "Hexadecimal represents each byte using two hexadecimal characters. It is commonly used when displaying binary data in a readable form.",
    },
    {
      question: "Is hexadecimal encryption?",
      answer:
        "No. Hexadecimal is simply another representation of bytes and does not protect data from being read.",
    },
  ],

  hmac: [
    {
      question: "What is HMAC?",
      answer:
        "HMAC is a keyed message authentication code. It combines a secret key with a hash function to allow a recipient with the same secret to verify message integrity and authenticity.",
    },
    {
      question: "Can HMAC be decrypted?",
      answer:
        "No. HMAC produces an authentication value rather than encrypted ciphertext.",
    },
  ],

  "password-generator": [
    {
      question: "Are the passwords generated randomly?",
      answer:
        "Yes. The generator uses the browser's cryptographically secure random number generator rather than ordinary predictable random functions.",
    },
    {
      question: "Does the password leave my browser?",
      answer:
        "The generator is designed to create passwords locally in your browser and does not need a server to generate them.",
    },
    {
      question: "How long should a password be?",
      answer:
        "Longer is generally better. For important accounts, use a unique password generated and stored by a reputable password manager.",
    },
  ],

  "random-bytes": [
    {
      question: "What are random bytes?",
      answer:
        "Random bytes are sequences of values from 0 through 255 generated from a random source. Cryptographically secure random bytes are commonly used for keys, salts, nonces, tokens, and identifiers.",
    },
    {
      question: "Is crypto.getRandomValues secure?",
      answer:
        "The Web Crypto API provides cryptographically strong random values intended for security-sensitive browser applications.",
    },
  ],

  "aes-cbc": [
    {
      question: "What is AES-CBC?",
      answer:
        "AES-CBC is a block-cipher mode that uses AES with cipher block chaining. It provides confidentiality but does not inherently authenticate the ciphertext.",
    },
    {
      question: "Should I use AES-CBC for new applications?",
      answer:
        "For new applications, an authenticated encryption mode such as AES-GCM is generally preferable because it can provide confidentiality and integrity together.",
    },
  ],

  chacha20: [
    {
      question: "What is ChaCha20?",
      answer:
        "ChaCha20 is a modern stream cipher. ChaCha20-Poly1305 combines ChaCha20 encryption with Poly1305 authentication to create an authenticated encryption construction.",
    },
    {
      question: "Why use ChaCha20-Poly1305?",
      answer:
        "ChaCha20-Poly1305 provides confidentiality and authentication and is widely used in modern security protocols.",
    },
  ],

  cryptography: [
    {
      question: "What encryption algorithm does this tool use?",
      answer:
        "The tool uses AES-256-GCM, an authenticated encryption mode available through the browser Web Crypto API.",
    },
    {
      question: "Is my message sent to a server?",
      answer:
        "The encryption and decryption operations are performed locally in your browser. The tool does not require an application backend to perform the cryptographic operation.",
    },
    {
      question: "Can I decrypt the message without the password?",
      answer:
        "You need the correct password to decrypt the message. AES-GCM authentication also causes decryption to fail if the encrypted data has been altered.",
    },
    {
      question: "Why does the encrypted result look like English words?",
      answer:
        "The encrypted binary data is converted into tokens from a fixed 256-word dictionary. The words are encoding tokens and do not represent the original meaning of the message.",
    },
    {
      question: "What happens if I lose my password?",
      answer:
        "There is no password recovery mechanism in this browser-based tool. Keep the password safe because the encrypted message cannot normally be recovered without the correct password.",
    },
    {
      question: "Is AES-256-GCM suitable for protecting messages?",
      answer:
        "AES-256-GCM is a widely used authenticated encryption construction. However, security also depends on the password, key derivation parameters, implementation, and how the encrypted data and password are handled.",
    },
  ],

  "encryption-vs-hashing": [
    {
      question: "What is the difference between encryption and hashing?",
      answer:
        "Encryption is designed to be reversible with the appropriate key. Hashing is designed to produce a fixed-length digest that is not intended to be reversed.",
    },
    {
      question: "Should passwords be encrypted?",
      answer:
        "Passwords normally should not be stored using reversible encryption. They should be processed with a password hashing or password-based key derivation function designed for password storage.",
    },
  ],

  "aes-explained": [
    {
      question: "What does AES stand for?",
      answer:
        "AES stands for Advanced Encryption Standard. It is a symmetric block cipher standardized for protecting digital information.",
    },
    {
      question: "What is AES-GCM?",
      answer:
        "AES-GCM is an authenticated encryption mode using AES. It provides encryption together with integrity protection.",
    },
  ],

  "password-encryption": [
    {
      question: "Should passwords be encrypted before storage?",
      answer:
        "Generally no. Password databases should normally store password-derived verification values using an appropriate password hashing or KDF scheme rather than reversible encryption.",
    },
    {
      question: "What is a password KDF?",
      answer:
        "A password-based key derivation function deliberately makes password processing more expensive and combines the password with a salt.",
    },
  ],

  "salt-and-iv": [
    {
      question: "What is a salt?",
      answer:
        "A salt is a random value commonly used with password hashing and key derivation. It helps prevent identical passwords from producing identical derived values.",
    },
    {
      question: "What is an IV?",
      answer:
        "An initialization vector is an input used by certain encryption modes. Its required size and reuse rules depend on the specific algorithm and mode.",
    },
    {
      question: "Should a salt or IV be secret?",
      answer:
        "Usually no. They normally need to be unpredictable or unique according to the construction, but they are generally stored or transmitted alongside the protected data.",
    },
  ],

  "cryptography-basics": [
    {
      question: "What is cryptography?",
      answer:
        "Cryptography is the study and practice of protecting information using mathematical techniques.",
    },
    {
      question: "What is a cryptographic key?",
      answer:
        "A cryptographic key is secret or public information used by a cryptographic algorithm to perform operations such as encryption, authentication, or signing.",
    },
  ],
};
