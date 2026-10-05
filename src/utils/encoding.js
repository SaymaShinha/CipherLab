export function encodeBase64(value) {
  const bytes = new TextEncoder().encode(value);

  let binary = "";

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

export function decodeBase64(value) {
  const binary = atob(value.replace(/\s+/g, ""));

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new TextDecoder().decode(bytes);
}

export function encodeBase64Url(value) {
  return encodeBase64(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function decodeBase64Url(value) {
  let normalized = value.replace(/-/g, "+").replace(/_/g, "/");

  while (normalized.length % 4 !== 0) {
    normalized += "=";
  }

  return decodeBase64(normalized);
}

export function encodeHex(value) {
  const bytes = new TextEncoder().encode(value);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function decodeHex(value) {
  const clean = value.trim().replace(/\s+/g, "");

  if (!/^[0-9a-fA-F]*$/.test(clean)) {
    throw new Error("Invalid hexadecimal input.");
  }

  if (clean.length % 2 !== 0) {
    throw new Error(
      "Hexadecimal input must contain an even number of characters.",
    );
  }

  const bytes = new Uint8Array(clean.length / 2);

  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }

  return new TextDecoder().decode(bytes);
}
