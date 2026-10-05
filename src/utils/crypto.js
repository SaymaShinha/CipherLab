const pbKDF2_ITERATIONS = 310000;
const KEY_LENGTH = 256;

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export function stringToBytes(value) {
  return textEncoder.encode(value);
}

export function bytesToString(value) {
  return textDecoder.decode(value);
}

export function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function hexToBytes(hex) {
  const clean = hex.trim().replace(/\s+/g, "");

  if (!/^[0-9a-fA-F]*$/.test(clean)) {
    throw new Error("Invalid hexadecimal data.");
  }

  if (clean.length % 2 !== 0) {
    throw new Error(
      "Hexadecimal data must contain an even number of characters.",
    );
  }

  const result = new Uint8Array(clean.length / 2);

  for (let i = 0; i < result.length; i++) {
    result[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }

  return result;
}

export function randomBytes(length) {
  if (!Number.isInteger(length) || length < 1) {
    throw new Error("Invalid byte length.");
  }

  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);

  return bytes;
}

export async function deriveAESKey(password, salt) {
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: pbKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    passwordKey,
    {
      name: "AES-GCM",
      length: KEY_LENGTH,
    },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function deriveAESCBCCKey(password, salt) {
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: pbKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    passwordKey,
    {
      name: "AES-CBC",
      length: KEY_LENGTH,
    },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function sha256Text(text) {
  const hash = await crypto.subtle.digest("SHA-256", textEncoder.encode(text));

  return bytesToHex(new Uint8Array(hash));
}

export function uint8ToBase64(bytes) {
  let binary = "";

  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

export function base64ToUint8(value) {
  const binary = atob(value.replace(/\s+/g, ""));

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

export const PBKDF2_ITERATIONS = pbKDF2_ITERATIONS;
