import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Info,
  KeyRound,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  UnlockKeyhole,
} from "lucide-react";

import ToolLayout from "../../components/ToolLayout.jsx";
import CopyButton from "../../components/CopyButton.jsx";
import ClearButton from "../../components/ClearButton.jsx";

/* =========================================================
   CONSTANTS
========================================================= */

const VERSION = 3;

const DICTIONARY_SIZE = 256;

const DEFAULT_ITERATIONS = 310000;
const MIN_ITERATIONS = 100000;
const MAX_ITERATIONS = 1000000;

const SALT_LENGTH = 16;

const GCM_IV_LENGTH = 12;
const BLOCK_IV_LENGTH = 16;

const HMAC_LENGTH = 32;

/* =========================================================
   KDF IDs
========================================================= */

const KDF_ID = {
  "PBKDF2-SHA-256": 1,
  "PBKDF2-SHA-512": 2,
  "HKDF-SHA-256": 3,
  "HKDF-SHA-512": 4,
};

const ID_TO_KDF = Object.fromEntries(
  Object.entries(KDF_ID).map(([name, id]) => [id, name]),
);

/* =========================================================
   ENCRYPTION IDs
========================================================= */

const ENCRYPTION_ID = {
  "AES-256-GCM": 1,
  "AES-256-CBC": 2,
  "AES-256-CTR": 3,
};

const ID_TO_ENCRYPTION = Object.fromEntries(
  Object.entries(ENCRYPTION_ID).map(([name, id]) => [id, name]),
);

/* =========================================================
   ENCODING IDs
========================================================= */

const ENCODING_ID = {
  "256-WORD": 1,
  BASE64: 2,
  HEX: 3,
};

const ID_TO_ENCODING = Object.fromEntries(
  Object.entries(ENCODING_ID).map(([name, id]) => [id, name]),
);

/* =========================================================
   KDF DEFINITIONS
========================================================= */

const KDFS = {
  "PBKDF2-SHA-256": {
    id: "PBKDF2-SHA-256",
    label: "PBKDF2-SHA-256",
    description: "Password-based key derivation using PBKDF2 and SHA-256.",
    passwordBased: true,
  },

  "PBKDF2-SHA-512": {
    id: "PBKDF2-SHA-512",
    label: "PBKDF2-SHA-512",
    description: "Password-based key derivation using PBKDF2 and SHA-512.",
    passwordBased: true,
  },

  "HKDF-SHA-256": {
    id: "HKDF-SHA-256",
    label: "HKDF-SHA-256",
    description:
      "HKDF using SHA-256. Designed primarily for high-entropy key material.",
    passwordBased: false,
  },

  "HKDF-SHA-512": {
    id: "HKDF-SHA-512",
    label: "HKDF-SHA-512",
    description:
      "HKDF using SHA-512. Designed primarily for high-entropy key material.",
    passwordBased: false,
  },
};

/* =========================================================
   ENCRYPTION DEFINITIONS
========================================================= */

const ENCRYPTION_ALGORITHMS = {
  "AES-256-GCM": {
    id: "AES-256-GCM",
    label: "AES-256-GCM",
    description: "Authenticated AES encryption using Galois/Counter Mode.",
    authenticated: true,
  },

  "AES-256-CBC": {
    id: "AES-256-CBC",
    label: "AES-256-CBC",
    description:
      "AES encryption using Cipher Block Chaining with additional HMAC authentication.",
    authenticated: true,
  },

  "AES-256-CTR": {
    id: "AES-256-CTR",
    label: "AES-256-CTR",
    description:
      "AES encryption using Counter Mode with additional HMAC authentication.",
    authenticated: true,
  },
};

/* =========================================================
   ENCODINGS
========================================================= */

const ENCODINGS = {
  "256-WORD": {
    id: "256-WORD",
    label: "256-Word Encoding",
    description:
      "Represents encrypted package bytes using a custom 256-word dictionary.",
  },

  BASE64: {
    id: "BASE64",
    label: "Base64",
    description: "Standard Base64 representation of the encrypted package.",
  },

  HEX: {
    id: "HEX",
    label: "Hexadecimal",
    description: "Two hexadecimal characters represent every package byte.",
  },
};

/* =========================================================
   EXAMPLE DICTIONARY
========================================================= */

const EXAMPLE_DICTIONARY_TEXT = `
A secure cryptographic system requires careful engineering and thoughtful implementation.
Security depends on strong algorithms reliable randomness careful key management and correct
handling of encrypted information. Modern encryption protects private messages sensitive files
personal records confidential communication and valuable digital information. A well designed
system should use established cryptographic primitives rather than inventing mathematical
algorithms from scratch. Password based key derivation transforms a human password into a
cryptographic key while a unique random salt prevents identical passwords from producing identical
derived keys. Authenticated encryption can provide confidentiality together with integrity so
that unauthorized changes to encrypted data can be detected. Random nonces and initialization
vectors must be generated correctly and should never be reused where the selected algorithm
prohibits reuse. Cryptographic output can be represented using different encodings depending on
the requirements of a particular application. Base64 is convenient for transporting binary data
through text systems while hexadecimal is simple to inspect and debug. A custom word based
encoding can make encrypted data easier to read aloud or distinguish visually, but the words do
not make the underlying encryption stronger. Anyone using a custom dictionary must preserve the
exact dictionary because changing even one word can make previously encoded data impossible to
decode. The password and dictionary should be protected separately from the encrypted message.
Browser based cryptography can be useful for local tools because plaintext can remain inside the
browser instead of being uploaded to a remote server. Developers should still understand that
security depends on the surrounding application, browser environment, password quality, and
correct implementation. Strong encryption is only one part of a complete security design.
Applications should minimize sensitive information, validate inputs, handle errors safely, and
avoid exposing secrets through logs or analytics. Educational cryptography tools are useful for
understanding encryption, key derivation, salts, nonces, ciphertext, authentication, encoding,
and secure data handling. Responsible security engineering favors peer reviewed algorithms,
careful testing, explicit formats, and conservative defaults. Confidentiality means unauthorized
people cannot read protected information. Integrity means unauthorized modifications can be
detected. Authentication helps verify that protected data was produced by the expected process.
Availability means legitimate users can access information when required. Good cryptographic
software combines these properties with careful operational practices and sensible user
interfaces. Security should never depend on secrecy of an algorithm. Instead, protection should
come from strong keys, established primitives, correct parameters, and safe implementation.
`;

/* =========================================================
   TEXT / BYTE HELPERS
========================================================= */

function textToBytes(text) {
  return new TextEncoder().encode(text);
}

function bytesToText(bytes) {
  return new TextDecoder().decode(bytes);
}

function randomBytes(length) {
  const result = new Uint8Array(length);
  crypto.getRandomValues(result);
  return result;
}

function concatBytes(...arrays) {
  const total = arrays.reduce((sum, array) => sum + array.length, 0);

  const result = new Uint8Array(total);

  let offset = 0;

  for (const array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }

  return result;
}

function uint32ToBytes(value) {
  return new Uint8Array([
    (value >>> 24) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 8) & 0xff,
    value & 0xff,
  ]);
}

function bytesToUint32(bytes, offset = 0) {
  return (
    ((bytes[offset] << 24) |
      (bytes[offset + 1] << 16) |
      (bytes[offset + 2] << 8) |
      bytes[offset + 3]) >>>
    0
  );
}

/* =========================================================
   CONSTANT-TIME COMPARISON
========================================================= */

function constantTimeEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  let difference = 0;

  for (let i = 0; i < a.length; i++) {
    difference |= a[i] ^ b[i];
  }

  return difference === 0;
}

/* =========================================================
   SHA-256
========================================================= */

async function sha256(bytes) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
}

async function dictionaryFingerprint(dictionary) {
  return sha256(textToBytes(dictionary.join("|")));
}

/* =========================================================
   HEX
========================================================= */

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(value) {
  const hex = value.trim();

  if (!hex || !/^[0-9a-fA-F]+$/.test(hex) || hex.length % 2 !== 0) {
    throw new Error("Invalid hexadecimal ciphertext.");
  }

  const result = new Uint8Array(hex.length / 2);

  for (let i = 0; i < result.length; i++) {
    result[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return result;
}

/* =========================================================
   BASE64
========================================================= */

function bytesToBase64(bytes) {
  let binary = "";

  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

function base64ToBytes(value) {
  try {
    const normalized = value.replace(/\s+/g, "").trim();

    const binary = atob(normalized);

    const result = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      result[i] = binary.charCodeAt(i);
    }

    return result;
  } catch {
    throw new Error("Invalid Base64 ciphertext.");
  }
}

/* =========================================================
   DICTIONARY
========================================================= */

function extractWords(text) {
  const matches = text.match(/[A-Za-z]+(?:['-][A-Za-z]+)*/g) || [];

  const normalized = matches
    .map((word) => word.toLowerCase().replace(/['-]/g, "").trim())
    .filter(Boolean);

  return [...new Set(normalized)];
}

function selectDictionary(sourceText) {
  const words = extractWords(sourceText);

  if (words.length < DICTIONARY_SIZE) {
    throw new Error(
      `The dictionary source contains only ${words.length} unique words. At least 256 unique words are required.`,
    );
  }

  const selected = [];

  const beginning = words.slice(0, 85);

  const middleStart = Math.floor((words.length - 86) / 2);

  const middle = words.slice(middleStart, middleStart + 86);

  const ending = words.slice(-85);

  for (const word of [...beginning, ...middle, ...ending]) {
    if (!selected.includes(word)) {
      selected.push(word);
    }
  }

  for (const word of words) {
    if (selected.length >= DICTIONARY_SIZE) {
      break;
    }

    if (!selected.includes(word)) {
      selected.push(word);
    }
  }

  return selected.slice(0, DICTIONARY_SIZE);
}

function bytesToWords(bytes, dictionary) {
  if (dictionary.length !== DICTIONARY_SIZE) {
    throw new Error("A complete 256-word dictionary is required.");
  }

  return Array.from(bytes)
    .map((byte) => dictionary[byte])
    .join(" ");
}

function wordsToBytes(value, dictionary) {
  if (dictionary.length !== DICTIONARY_SIZE) {
    throw new Error("A complete 256-word dictionary is required.");
  }

  const lookup = new Map(
    dictionary.map((word, index) => [word.toLowerCase(), index]),
  );

  const words = value.trim().split(/\s+/).filter(Boolean);

  const result = new Uint8Array(words.length);

  for (let i = 0; i < words.length; i++) {
    const index = lookup.get(words[i].toLowerCase());

    if (index === undefined) {
      throw new Error(`Unknown dictionary word: "${words[i]}".`);
    }

    result[i] = index;
  }

  return result;
}

/* =========================================================
   KDF
========================================================= */

/*
 * We derive 64 bytes instead of only 32.
 *
 * First 32 bytes:
 *   AES-256 encryption key
 *
 * Second 32 bytes:
 *   HMAC-SHA-256 authentication key
 *
 * This is particularly important for AES-CBC and AES-CTR,
 * because those modes do not authenticate ciphertext.
 */

async function deriveKeyMaterial({ password, salt, kdf, iterations }) {
  const passwordBytes = textToBytes(password);

  let bits;

  if (kdf === "PBKDF2-SHA-256" || kdf === "PBKDF2-SHA-512") {
    const baseKey = await crypto.subtle.importKey(
      "raw",
      passwordBytes,
      "PBKDF2",
      false,
      ["deriveBits"],
    );

    bits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations,
        hash: kdf === "PBKDF2-SHA-256" ? "SHA-256" : "SHA-512",
      },
      baseKey,
      512,
    );
  } else if (kdf === "HKDF-SHA-256" || kdf === "HKDF-SHA-512") {
    const baseKey = await crypto.subtle.importKey(
      "raw",
      passwordBytes,
      "HKDF",
      false,
      ["deriveBits"],
    );

    bits = await crypto.subtle.deriveBits(
      {
        name: "HKDF",
        salt,
        info: textToBytes("Custom Cryptography Builder v3"),
        hash: kdf === "HKDF-SHA-256" ? "SHA-256" : "SHA-512",
      },
      baseKey,
      512,
    );
  } else {
    throw new Error(`Unsupported KDF: ${kdf}`);
  }

  return new Uint8Array(bits);
}

async function importEncryptionKey(keyBytes, encryption) {
  return crypto.subtle.importKey(
    "raw",
    keyBytes,
    {
      name:
        encryption === "AES-256-GCM"
          ? "AES-GCM"
          : encryption === "AES-256-CBC"
            ? "AES-CBC"
            : "AES-CTR",
    },
    false,
    ["encrypt", "decrypt"],
  );
}

async function importHmacKey(keyBytes) {
  return crypto.subtle.importKey(
    "raw",
    keyBytes,
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign", "verify"],
  );
}

/* =========================================================
   ENCRYPTION
========================================================= */

async function encryptData({ plaintext, encryptionKey, iv, encryption }) {
  const data = textToBytes(plaintext);

  if (encryption === "AES-256-GCM") {
    return new Uint8Array(
      await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
          tagLength: 128,
        },
        encryptionKey,
        data,
      ),
    );
  }

  if (encryption === "AES-256-CBC") {
    return new Uint8Array(
      await crypto.subtle.encrypt(
        {
          name: "AES-CBC",
          iv,
        },
        encryptionKey,
        data,
      ),
    );
  }

  if (encryption === "AES-256-CTR") {
    return new Uint8Array(
      await crypto.subtle.encrypt(
        {
          name: "AES-CTR",
          counter: iv,
          length: 64,
        },
        encryptionKey,
        data,
      ),
    );
  }

  throw new Error(`Unsupported encryption algorithm: ${encryption}`);
}

async function decryptData({ ciphertext, encryptionKey, iv, encryption }) {
  if (encryption === "AES-256-GCM") {
    return new Uint8Array(
      await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
          tagLength: 128,
        },
        encryptionKey,
        ciphertext,
      ),
    );
  }

  if (encryption === "AES-256-CBC") {
    return new Uint8Array(
      await crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv,
        },
        encryptionKey,
        ciphertext,
      ),
    );
  }

  if (encryption === "AES-256-CTR") {
    return new Uint8Array(
      await crypto.subtle.decrypt(
        {
          name: "AES-CTR",
          counter: iv,
          length: 64,
        },
        encryptionKey,
        ciphertext,
      ),
    );
  }

  throw new Error(`Unsupported encryption algorithm: ${encryption}`);
}

/* =========================================================
   PACKAGE HEADER
========================================================= */

/*
 * Package structure:
 *
 * Byte 0       VERSION
 * Byte 1       KDF ID
 * Byte 2       ENCRYPTION ID
 * Byte 3       ENCODING ID
 *
 * Bytes 4-7    KDF iterations
 *
 * Byte 8       Salt length
 * Byte 9       IV length
 *
 * Bytes 10-41  Dictionary SHA-256 fingerprint
 *
 * Then:
 *
 * Salt
 * IV
 * Ciphertext
 * HMAC-SHA-256
 */

function createHeader({
  kdf,
  encryption,
  encoding,
  iterations,
  saltLength,
  ivLength,
  dictionaryFingerprintBytes,
}) {
  return concatBytes(
    new Uint8Array([
      VERSION,
      KDF_ID[kdf],
      ENCRYPTION_ID[encryption],
      ENCODING_ID[encoding],
    ]),

    uint32ToBytes(iterations),

    new Uint8Array([saltLength, ivLength]),

    dictionaryFingerprintBytes,
  );
}

async function createEncryptedPackage({
  kdf,
  encryption,
  encoding,
  iterations,
  salt,
  iv,
  ciphertext,
  dictionary,
  hmacKey,
}) {
  const fingerprint =
    encoding === "256-WORD"
      ? await dictionaryFingerprint(dictionary)
      : new Uint8Array(32);

  const header = createHeader({
    kdf,
    encryption,
    encoding,
    iterations,
    saltLength: salt.length,
    ivLength: iv.length,
    dictionaryFingerprintBytes: fingerprint,
  });

  const authenticatedData = concatBytes(header, salt, iv, ciphertext);

  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", hmacKey, authenticatedData),
  );

  return concatBytes(authenticatedData, signature);
}

/* =========================================================
   PACKAGE PARSER
========================================================= */

function parseEncryptedPackage(bytes) {
  /*
   * Minimum:
   *
   * 42 byte header
   * + 16 byte salt
   * + 12 byte IV
   * + at least 1 byte ciphertext
   * + 32 byte HMAC
   */

  if (bytes.length < 42 + 16 + 12 + 1 + HMAC_LENGTH) {
    throw new Error("Ciphertext package is too short.");
  }

  const version = bytes[0];

  if (version !== VERSION) {
    throw new Error(`Unsupported ciphertext version: ${version}.`);
  }

  const kdf = ID_TO_KDF[bytes[1]];
  const encryption = ID_TO_ENCRYPTION[bytes[2]];
  const encoding = ID_TO_ENCODING[bytes[3]];

  if (!kdf) {
    throw new Error("Unsupported key derivation function.");
  }

  if (!encryption) {
    throw new Error("Unsupported encryption algorithm.");
  }

  if (!encoding) {
    throw new Error("Unsupported output encoding.");
  }

  const iterations = bytesToUint32(bytes, 4);

  if (iterations < MIN_ITERATIONS || iterations > MAX_ITERATIONS) {
    throw new Error("Invalid KDF iteration count.");
  }

  const saltLength = bytes[8];
  const ivLength = bytes[9];

  if (saltLength !== SALT_LENGTH) {
    throw new Error("Invalid salt length.");
  }

  const expectedIvLength =
    encryption === "AES-256-GCM" ? GCM_IV_LENGTH : BLOCK_IV_LENGTH;

  if (ivLength !== expectedIvLength) {
    throw new Error("Invalid IV length for the selected encryption algorithm.");
  }

  const fingerprint = bytes.slice(10, 42);

  const saltStart = 42;

  const ivStart = saltStart + saltLength;

  const ciphertextStart = ivStart + ivLength;

  const tagStart = bytes.length - HMAC_LENGTH;

  if (tagStart <= ciphertextStart) {
    throw new Error("Ciphertext data is missing.");
  }

  return {
    version,
    kdf,
    encryption,
    encoding,
    iterations,
    salt: bytes.slice(saltStart, ivStart),
    iv: bytes.slice(ivStart, ciphertextStart),
    fingerprint,
    ciphertext: bytes.slice(ciphertextStart, tagStart),
    tag: bytes.slice(tagStart),
    authenticatedData: bytes.slice(0, tagStart),
  };
}

/* =========================================================
   ENCRYPT MESSAGE
========================================================= */

async function encryptMessage({
  plaintext,
  password,
  kdf,
  encryption,
  encoding,
  iterations,
  dictionary,
}) {
  if (!plaintext.trim()) {
    throw new Error("Enter a message to encrypt.");
  }

  if (!password) {
    throw new Error("Enter a password.");
  }

  if (
    !Number.isInteger(iterations) ||
    iterations < MIN_ITERATIONS ||
    iterations > MAX_ITERATIONS
  ) {
    throw new Error(
      `Iterations must be between ${MIN_ITERATIONS.toLocaleString()} and ${MAX_ITERATIONS.toLocaleString()}.`,
    );
  }

  if (encoding === "256-WORD" && dictionary.length !== DICTIONARY_SIZE) {
    throw new Error("Generate a valid 256-word dictionary first.");
  }

  const salt = randomBytes(SALT_LENGTH);

  const iv = randomBytes(
    encryption === "AES-256-GCM" ? GCM_IV_LENGTH : BLOCK_IV_LENGTH,
  );

  /*
   * KDF selection genuinely changes the derived bytes.
   */

  const keyMaterial = await deriveKeyMaterial({
    password,
    salt,
    kdf,
    iterations,
  });

  const encryptionKeyBytes = keyMaterial.slice(0, 32);

  const hmacKeyBytes = keyMaterial.slice(32, 64);

  /*
   * Encryption algorithm genuinely changes the
   * cryptographic operation.
   */

  const encryptionKey = await importEncryptionKey(
    encryptionKeyBytes,
    encryption,
  );

  const hmacKey = await importHmacKey(hmacKeyBytes);

  const ciphertext = await encryptData({
    plaintext,
    encryptionKey,
    iv,
    encryption,
  });

  const packageBytes = await createEncryptedPackage({
    kdf,
    encryption,
    encoding,
    iterations,
    salt,
    iv,
    ciphertext,
    dictionary,
    hmacKey,
  });

  if (encoding === "256-WORD") {
    return bytesToWords(packageBytes, dictionary);
  }

  if (encoding === "HEX") {
    return bytesToHex(packageBytes);
  }

  return bytesToBase64(packageBytes);
}

/* =========================================================
   DECRYPT MESSAGE
========================================================= */

async function decryptMessage({ encodedCiphertext, password, dictionary }) {
  if (!encodedCiphertext.trim()) {
    throw new Error("Enter ciphertext to decrypt.");
  }

  if (!password) {
    throw new Error("Enter the password.");
  }

  const value = encodedCiphertext.trim();

  let packageBytes;

  /*
   * The encoding is detected only to turn the
   * text representation back into package bytes.
   *
   * The actual cryptographic configuration is read
   * from the package header afterward.
   */

  if (/^[0-9a-fA-F]+$/.test(value) && value.length % 2 === 0) {
    packageBytes = hexToBytes(value);
  } else if (/\s/.test(value)) {
    packageBytes = wordsToBytes(value, dictionary);
  } else {
    packageBytes = base64ToBytes(value);
  }

  const parsed = parseEncryptedPackage(packageBytes);

  /*
   * Verify dictionary before doing decryption.
   */

  if (parsed.encoding === "256-WORD") {
    if (dictionary.length !== DICTIONARY_SIZE) {
      throw new Error(
        "This ciphertext requires the original 256-word dictionary.",
      );
    }

    const currentFingerprint = await dictionaryFingerprint(dictionary);

    if (!constantTimeEqual(currentFingerprint, parsed.fingerprint)) {
      throw new Error(
        "Dictionary fingerprint mismatch. Use the exact dictionary used during encryption.",
      );
    }
  }

  /*
   * IMPORTANT:
   *
   * We DO NOT use the currently selected UI KDF
   * or encryption algorithm.
   *
   * The package tells us which algorithms were used.
   */

  const keyMaterial = await deriveKeyMaterial({
    password,
    salt: parsed.salt,
    kdf: parsed.kdf,
    iterations: parsed.iterations,
  });

  const encryptionKey = await importEncryptionKey(
    keyMaterial.slice(0, 32),
    parsed.encryption,
  );

  const hmacKey = await importHmacKey(keyMaterial.slice(32, 64));

  /*
   * Verify the complete package before decrypting.
   *
   * This protects CBC and CTR against ciphertext
   * manipulation and also authenticates the metadata.
   */

  const valid = await crypto.subtle.verify(
    "HMAC",
    hmacKey,
    parsed.tag,
    parsed.authenticatedData,
  );

  if (!valid) {
    throw new Error(
      "Authentication failed. The password, ciphertext, configuration, or dictionary may be incorrect or modified.",
    );
  }

  try {
    const plaintextBytes = await decryptData({
      ciphertext: parsed.ciphertext,
      encryptionKey,
      iv: parsed.iv,
      encryption: parsed.encryption,
    });

    return {
      plaintext: bytesToText(plaintextBytes),

      config: {
        kdf: parsed.kdf,
        encryption: parsed.encryption,
        encoding: parsed.encoding,
        iterations: parsed.iterations,
      },
    };
  } catch {
    throw new Error("Decryption failed after authentication.");
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function CustomCryptographyPage() {
  const [kdf, setKdf] = useState("PBKDF2-SHA-256");

  const [encryption, setEncryption] = useState("AES-256-GCM");

  const [encoding, setEncoding] = useState("256-WORD");

  const [iterations, setIterations] = useState(DEFAULT_ITERATIONS);

  const [dictionarySource, setDictionarySource] = useState(
    EXAMPLE_DICTIONARY_TEXT,
  );

  const [dictionary, setDictionary] = useState([]);

  const [dictionaryFingerprintValue, setDictionaryFingerprintValue] =
    useState("");

  const [mode, setMode] = useState("encrypt");

  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");

  const [result, setResult] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const uniqueWordCount = useMemo(
    () => extractWords(dictionarySource).length,
    [dictionarySource],
  );

  const passwordStrength = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;

    if (password.length >= 14) score++;

    if (/[a-z]/.test(password)) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      score++;
    }

    if (!password) {
      return {
        score: 0,
        label: "No password",
      };
    }

    if (score <= 2) {
      return {
        score,
        label: "Weak",
      };
    }

    if (score === 3) {
      return {
        score,
        label: "Moderate",
      };
    }

    if (score === 4) {
      return {
        score,
        label: "Strong",
      };
    }

    return {
      score,
      label: "Very strong",
    };
  }, [password]);

  const currentKdf = KDFS[kdf];

  const currentEncryption = ENCRYPTION_ALGORITHMS[encryption];

  const currentEncoding = ENCODINGS[encoding];

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  /* =======================================================
     DICTIONARY
  ======================================================= */

  const generateDictionary = async () => {
    clearMessages();

    try {
      const generated = selectDictionary(dictionarySource);

      const fingerprint = await dictionaryFingerprint(generated);

      setDictionary(generated);

      setDictionaryFingerprintValue(bytesToHex(fingerprint));

      setSuccess("A valid 256-word dictionary has been generated.");
    } catch (err) {
      setDictionary([]);
      setDictionaryFingerprintValue("");
      setError(err.message);
    }
  };

  const useExampleDictionary = () => {
    setDictionarySource(EXAMPLE_DICTIONARY_TEXT);

    setDictionary([]);
    setDictionaryFingerprintValue("");

    clearMessages();
  };

  /* =======================================================
     ENCRYPT
  ======================================================= */

  const handleEncrypt = async () => {
    clearMessages();
    setLoading(true);

    try {
      const encrypted = await encryptMessage({
        plaintext: message,
        password,
        kdf,
        encryption,
        encoding,
        iterations: Number(iterations),
        dictionary,
      });

      setResult(encrypted);

      setSuccess(`Encrypted using ${kdf} + ${encryption} + ${encoding}.`);
    } catch (err) {
      setResult("");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     DECRYPT
  ======================================================= */

  const handleDecrypt = async () => {
    clearMessages();
    setLoading(true);

    try {
      const decrypted = await decryptMessage({
        encodedCiphertext: message,
        password,
        dictionary,
      });

      setResult(decrypted.plaintext);

      /*
       * Synchronize the UI with the configuration
       * discovered inside the ciphertext.
       */

      setKdf(decrypted.config.kdf);

      setEncryption(decrypted.config.encryption);

      setEncoding(decrypted.config.encoding);

      setIterations(decrypted.config.iterations);

      setSuccess(
        `Decrypted successfully. Detected ${decrypted.config.kdf} + ${decrypted.config.encryption} + ${decrypted.config.encoding}.`,
      );
    } catch (err) {
      setResult("");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setMessage("");
    setPassword("");
    setResult("");
    setError("");
    setSuccess("");
  };

  return (
    <ToolLayout
      title="Custom Cryptography Builder"
      description="Build custom browser-based encryption packages using multiple key derivation functions, AES-256 encryption algorithms, and selectable output encodings."
      canonical="/tools/custom-cryptography"
      category="Cryptography"
      intro={
        <>
          <p>
            Configure the key derivation function, encryption algorithm, and
            output encoding used by the cryptographic package.
          </p>

          <div className="mt-5 flex gap-3 rounded-xl border border-amber-400/10 bg-amber-400/5 p-4">
            <AlertTriangle
              size={18}
              className="mt-0.5 shrink-0 text-amber-400"
            />

            <p className="text-sm leading-6 text-amber-200/80">
              The selected algorithms are actually used during encryption. The
              resulting package stores its cryptographic configuration, allowing
              decryption to automatically determine which KDF and encryption
              algorithm were used.
            </p>
          </div>
        </>
      }
      howToUse={[
        "Choose a key derivation function.",
        "Choose an AES-256 encryption algorithm.",
        "Choose Base64, hexadecimal, or 256-word output.",
        "For 256-word output, generate a dictionary containing at least 256 unique words.",
        "Enter a strong password and message.",
        "Encrypt the message.",
        "For decryption, paste the ciphertext and enter the password. The package automatically determines its KDF, encryption algorithm, encoding, and iteration count.",
      ]}
      features={[
        {
          title: "Multiple KDFs",
          description:
            "PBKDF2-SHA-256, PBKDF2-SHA-512, HKDF-SHA-256, and HKDF-SHA-512.",
        },
        {
          title: "Multiple encryption modes",
          description: "AES-256-GCM, AES-256-CBC, and AES-256-CTR.",
        },
        {
          title: "Authenticated package",
          description:
            "The package uses HMAC-SHA-256 to authenticate its metadata and ciphertext.",
        },
        {
          title: "Self-describing format",
          description:
            "The encrypted package records its KDF, encryption algorithm, encoding, iterations, and other parameters.",
        },
        {
          title: "256-word encoding",
          description:
            "Encrypted bytes can be represented as ordinary English words.",
        },
        {
          title: "Browser-only processing",
          description:
            "Plaintext and passwords are processed locally using the Web Crypto API.",
        },
      ]}
      aboutTitle="How this cryptographic package works"
      aboutContent={
        <>
          <p>
            The password is processed by the selected key derivation function.
            The resulting 512 bits are divided into two 256-bit keys: one for
            AES encryption and one for HMAC authentication.
          </p>

          <p className="mt-4">
            The package then records the selected KDF, encryption algorithm,
            output encoding, iteration count, salt length, IV length, and
            dictionary fingerprint.
          </p>

          <p className="mt-4">
            During decryption, the application reads those values from the
            ciphertext itself. The currently selected dropdown values therefore
            do not control decryption.
          </p>

          <p className="mt-4">
            The final package is authenticated with HMAC-SHA-256. AES-GCM
            additionally provides its own authenticated encryption.
          </p>
        </>
      }
      useCases={[
        "Cryptography education",
        "Encryption algorithm experiments",
        "Developer testing",
        "Encrypted text format experiments",
        "Understanding KDF parameters",
        "Understanding authenticated encryption",
      ]}
      relatedTools={[
        {
          name: "AES-256-GCM",
          path: "/tools/aes-gcm",
          description: "Dedicated AES-256-GCM encryption tool.",
        },
        {
          name: "ChaCha20-Poly1305",
          path: "/tools/chacha20",
          description: "Authenticated ChaCha20-Poly1305 encryption.",
        },
        {
          name: "SHA-256",
          path: "/tools/sha256",
          description: "Generate SHA-256 hashes locally.",
        },
      ]}
    >
      <div className="space-y-5">
        {/* =================================================
            CONFIGURATION
        ================================================= */}

        <div className="rounded-xl border border-white/10 bg-black/20 p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-indigo-500/10 p-2">
              <ShieldCheck size={20} className="text-indigo-400" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                Cryptographic Configuration
              </h2>

              <p className="text-xs text-slate-500">
                Every selected option changes the cryptographic operation.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* KDF */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Key Derivation Function
              </label>

              <div className="relative">
                <select
                  value={kdf}
                  onChange={(e) => {
                    setKdf(e.target.value);
                    clearMessages();
                  }}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-10 text-sm text-white outline-none focus:border-indigo-500/50"
                >
                  {Object.values(KDFS).map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className="bg-slate-900 text-white"
                    >
                      {item.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {currentKdf.description}
              </p>

              {!currentKdf.passwordBased && (
                <div className="mt-3 flex gap-2 rounded-lg border border-amber-400/10 bg-amber-400/5 p-3 text-xs leading-5 text-amber-200/70">
                  <Info size={15} className="mt-0.5 shrink-0 text-amber-400" />

                  <span>
                    HKDF is a real KDF, but it is not designed to slow password
                    guessing. PBKDF2 is preferable for human passwords.
                  </span>
                </div>
              )}
            </div>

            {/* ENCRYPTION */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Encryption Algorithm
              </label>

              <div className="relative">
                <select
                  value={encryption}
                  onChange={(e) => {
                    setEncryption(e.target.value);
                    clearMessages();
                  }}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-10 text-sm text-white outline-none focus:border-indigo-500/50"
                >
                  {Object.values(ENCRYPTION_ALGORITHMS).map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className="bg-slate-900 text-white"
                    >
                      {item.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {currentEncryption.description}
              </p>

              {encryption === "AES-256-GCM" && (
                <div className="mt-3 flex gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/5 p-3 text-xs leading-5 text-emerald-200/70">
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <span>
                    Recommended: GCM provides authenticated encryption.
                  </span>
                </div>
              )}
            </div>

            {/* ENCODING */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Output Encoding
              </label>

              <div className="relative">
                <select
                  value={encoding}
                  onChange={(e) => {
                    setEncoding(e.target.value);
                    clearMessages();
                  }}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-10 text-sm text-white outline-none focus:border-indigo-500/50"
                >
                  {Object.values(ENCODINGS).map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className="bg-slate-900 text-white"
                    >
                      {item.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {currentEncoding.description}
              </p>
            </div>
          </div>

          {/* PIPELINE */}

          <div className="mt-5 rounded-xl border border-indigo-400/10 bg-indigo-400/5 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-300/70">
              Active Pipeline
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-lg bg-black/20 px-3 py-2 text-slate-300">
                Password
              </span>

              <span className="text-slate-600">→</span>

              <span className="rounded-lg bg-black/20 px-3 py-2 font-medium text-indigo-300">
                {kdf}
              </span>

              <span className="text-slate-600">→</span>

              <span className="rounded-lg bg-black/20 px-3 py-2 font-medium text-indigo-300">
                {encryption}
              </span>

              <span className="text-slate-600">→</span>

              <span className="rounded-lg bg-black/20 px-3 py-2 text-slate-300">
                {encoding}
              </span>
            </div>
          </div>

          {/* ITERATIONS */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-white">
              KDF Iterations
            </label>

            <input
              type="number"
              min={MIN_ITERATIONS}
              max={MAX_ITERATIONS}
              step={10000}
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
            />

            <p className="mt-2 text-xs text-slate-500">
              Used as the PBKDF2 iteration count. HKDF does not use iterations,
              but the value remains in the package format for consistent
              versioning.
            </p>
          </div>
        </div>

        {/* =================================================
            DICTIONARY
        ================================================= */}

        {encoding === "256-WORD" && (
          <div className="rounded-xl border border-white/10 bg-black/20 p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-indigo-500/10 p-2">
                <KeyRound size={20} className="text-indigo-400" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-white">
                  256-Word Dictionary
                </h2>

                <p className="text-xs text-slate-500">
                  Each possible byte value maps to one dictionary word.
                </p>
              </div>
            </div>

            <textarea
              value={dictionarySource}
              onChange={(e) => {
                setDictionarySource(e.target.value);

                setDictionary([]);
                setDictionaryFingerprintValue("");
              }}
              rows={7}
              placeholder="Enter at least 256 unique English words..."
              className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Unique words:{" "}
                <span className="font-semibold text-slate-300">
                  {uniqueWordCount.toLocaleString()}
                </span>
                {" / 256"}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={useExampleDictionary}
                  className="rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5"
                >
                  Use Example
                </button>

                <button
                  type="button"
                  disabled={uniqueWordCount < 256}
                  onClick={generateDictionary}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <RefreshCw size={14} />
                  Generate Dictionary
                </button>
              </div>
            </div>

            {dictionary.length === 256 && (
              <>
                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
                  {dictionary.map((word, index) => (
                    <div
                      key={`${word}-${index}`}
                      className="rounded-lg border border-white/5 bg-black/20 px-2 py-2 text-center text-xs text-slate-400"
                    >
                      <span className="mr-1 text-slate-600">{index}</span>

                      {word}
                    </div>
                  ))}
                </div>

                {dictionaryFingerprintValue && (
                  <div className="mt-4 rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="text-xs font-semibold text-slate-400">
                      Dictionary SHA-256 Fingerprint
                    </div>

                    <div className="mt-2 break-all font-mono text-xs leading-6 text-slate-600">
                      {dictionaryFingerprintValue}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* =================================================
            ENCRYPT / DECRYPT
        ================================================= */}

        <div className="rounded-xl border border-white/10 bg-black/20 p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-indigo-500/10 p-2">
              {mode === "encrypt" ? (
                <LockKeyhole size={20} className="text-indigo-400" />
              ) : (
                <UnlockKeyhole size={20} className="text-indigo-400" />
              )}
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                {mode === "encrypt" ? "Encrypt Message" : "Decrypt Message"}
              </h2>

              <p className="text-xs text-slate-500">
                Cryptographic operations happen locally in your browser.
              </p>
            </div>
          </div>

          {/* TABS */}

          <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/20 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("encrypt");
                setMessage("");
                setResult("");
                clearMessages();
              }}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                mode === "encrypt"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Encrypt
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("decrypt");
                setMessage("");
                setResult("");
                clearMessages();
              }}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                mode === "decrypt"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Decrypt
            </button>
          </div>

          {/* MESSAGE */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-white">
              {mode === "encrypt" ? "Message" : "Encrypted Text"}
            </label>

            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                clearMessages();
              }}
              rows={8}
              placeholder={
                mode === "encrypt"
                  ? "Enter the message you want to encrypt..."
                  : "Paste encrypted text here..."
              }
              className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
            />
          </div>

          {/* PASSWORD */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-white">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearMessages();
              }}
              placeholder="Enter a strong password..."
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
            />

            {mode === "encrypt" && (
              <div className="mt-3 rounded-xl border border-white/5 bg-black/20 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Password strength</span>

                  <span className="font-semibold text-slate-300">
                    {passwordStrength.label}
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-5 gap-1">
                  {Array.from({
                    length: 5,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full ${
                        index < passwordStrength.score
                          ? "bg-indigo-500"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CURRENT CONFIG */}

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-black/20 p-3">
              <div className="text-[11px] uppercase tracking-wider text-slate-600">
                KDF
              </div>

              <div className="mt-1 text-xs font-semibold text-slate-300">
                {kdf}
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/20 p-3">
              <div className="text-[11px] uppercase tracking-wider text-slate-600">
                Encryption
              </div>

              <div className="mt-1 text-xs font-semibold text-slate-300">
                {encryption}
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/20 p-3">
              <div className="text-[11px] uppercase tracking-wider text-slate-600">
                Encoding
              </div>

              <div className="mt-1 text-xs font-semibold text-slate-300">
                {encoding}
              </div>
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-5 flex gap-3 rounded-xl border border-red-400/10 bg-red-400/5 p-4 text-sm text-red-300">
              <AlertTriangle size={18} className="mt-0.5 shrink-0" />

              <span>{error}</span>
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="mt-5 flex gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4 text-sm text-emerald-300">
              <Check size={18} className="mt-0.5 shrink-0" />

              <span>{success}</span>
            </div>
          )}

          {/* ACTIONS */}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={mode === "encrypt" ? handleEncrypt : handleDecrypt}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Processing...
                </>
              ) : mode === "encrypt" ? (
                <>
                  <LockKeyhole size={16} />
                  Encrypt
                </>
              ) : (
                <>
                  <UnlockKeyhole size={16} />
                  Decrypt
                </>
              )}
            </button>

            <ClearButton onClick={clearAll} />
          </div>

          {/* RESULT */}

          {result && (
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-white">
                  {mode === "encrypt"
                    ? "Encrypted Result"
                    : "Decrypted Message"}
                </label>

                <CopyButton text={result} />
              </div>

              <textarea
                readOnly
                value={result}
                rows={mode === "encrypt" && encoding === "256-WORD" ? 10 : 7}
                className="w-full rounded-xl bg-black/20 p-4 font-mono text-sm leading-7 text-slate-300 outline-none"
              />
            </div>
          )}
        </div>

        {/* =================================================
            SECURITY NOTE
        ================================================= */}

        <div className="rounded-xl border border-white/10 bg-black/20 p-5">
          <div className="flex gap-3">
            <Info size={18} className="mt-0.5 shrink-0 text-indigo-400" />

            <div>
              <h3 className="text-sm font-semibold text-white">
                Security information
              </h3>

              <div className="mt-3 space-y-3 text-xs leading-6 text-slate-500">
                <p>
                  Changing the KDF changes the derived cryptographic key
                  material. Changing the encryption algorithm changes the actual
                  AES operation. Changing the encoding changes only the
                  representation of the resulting package.
                </p>

                <p>
                  AES-256-GCM is the recommended encryption mode because it
                  provides authenticated encryption. CBC and CTR are
                  additionally protected here with HMAC-SHA-256.
                </p>

                <p>
                  The ciphertext package contains its own algorithm identifiers.
                  Decryption reads these identifiers and does not rely on the
                  current dropdown selections.
                </p>

                <p>
                  PBKDF2 is appropriate for human passwords. HKDF is a genuine
                  KDF but is not designed to make password guessing expensive.
                </p>

                <p>
                  The 256-word dictionary is an encoding mechanism, not an
                  additional layer of encryption. The exact dictionary must be
                  preserved for decryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
