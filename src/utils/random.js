// src/utils/random.js

/**
 * Cryptographically secure random integer in [0, max).
 * Uses rejection sampling to avoid modulo bias.
 */
export function secureRandomInt(max) {
  if (!Number.isInteger(max) || max <= 0) {
    throw new Error("max must be a positive integer");
  }

  const limit = 256 - (256 % max);
  const buffer = new Uint8Array(1);

  let value;

  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);

  return value % max;
}

/**
 * Cryptographically secure random selection from a string.
 */
export function randomChar(characters) {
  if (!characters) {
    throw new Error("Character set cannot be empty");
  }

  return characters[secureRandomInt(characters.length)];
}

/**
 * Fisher-Yates shuffle using cryptographically secure randomness.
 */
export function secureShuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = secureRandomInt(i + 1);

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Generate a cryptographically secure password.
 */
export function generateSecurePassword({
  length = 20,
  uppercase = true,
  lowercase = true,
  numbers = true,
  symbols = true,
} = {}) {
  const groups = [];

  if (uppercase) groups.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (lowercase) groups.push("abcdefghijklmnopqrstuvwxyz");
  if (numbers) groups.push("0123456789");
  if (symbols) groups.push("!@#$%^&*()-_=+[]{};:,.?/");

  if (groups.length === 0) {
    throw new Error("Select at least one character type");
  }

  if (length < groups.length) {
    throw new Error(
      `Password length must be at least ${groups.length} characters`,
    );
  }

  const password = [];

  // Guarantee at least one character from every selected group.
  groups.forEach((group) => {
    password.push(randomChar(group));
  });

  const allCharacters = groups.join("");

  while (password.length < length) {
    password.push(randomChar(allCharacters));
  }

  return secureShuffle(password).join("");
}

/**
 * Generate random bytes.
 */
export function generateRandomBytes(length) {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error("Length must be a positive integer");
  }

  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);

  return bytes;
}

/**
 * Convert bytes to hexadecimal.
 */
export function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Convert bytes to Base64.
 */
export function bytesToBase64(bytes) {
  let binary = "";

  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(
      ...bytes.subarray(i, Math.min(i + chunkSize, bytes.length)),
    );
  }

  return btoa(binary);
}

/**
 * Convert bytes to Base64URL.
 */
export function bytesToBase64Url(bytes) {
  return bytesToBase64(bytes)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
