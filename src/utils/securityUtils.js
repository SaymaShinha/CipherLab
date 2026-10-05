export const bytesToHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

export const bytesToBase64 = (bytes) => {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
};

export const base64ToBytes = (value) => {
  const binary = atob(value);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
};

export const textToBytes = (value) => new TextEncoder().encode(value);

export const arrayBufferToHex = (buffer) => bytesToHex(new Uint8Array(buffer));
export const arrayBufferToBase64 = (buffer) => bytesToBase64(new Uint8Array(buffer));

export const randomBytes = (length) => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
};

export const randomBase64 = (length) => bytesToBase64(randomBytes(length));

export const copyText = async (value) => {
  await navigator.clipboard.writeText(value);
};

export const downloadText = (filename, text, type = "text/plain;charset=utf-8") => {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const escapeHtml = (value) =>
  value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));

export const bufferToPem = (buffer, label) => {
  const base64 = arrayBufferToBase64(buffer);
  const lines = base64.match(/.{1,64}/g)?.join("\n") ?? "";
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`;
};

export const formatBytes = (bytes) => {
  if (!Number.isFinite(bytes) || bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i ? 2 : 0)} ${units[i]}`;
};

export const formatDate = (seconds) => {
  if (!Number.isFinite(seconds)) return "Not provided";
  return new Date(seconds * 1000).toLocaleString();
};

const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export const encodeBase32 = (bytes) => {
  let value = 0;
  let bits = 0;
  let output = "";
  for (const byte of bytes) {
    value = value * 256 + byte;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      output += CROCKFORD[Math.floor(value / 2 ** bits) % 32];
    }
  }
  if (bits > 0) output += CROCKFORD[(value * 2 ** (5 - bits)) % 32];
  return output;
};

export const generateULID = () => {
  const time = Date.now();
  const timeBytes = new Uint8Array(6);
  let t = time;
  for (let i = 5; i >= 0; i--) {
    timeBytes[i] = t & 0xff;
    t = Math.floor(t / 256);
  }
  const random = randomBytes(10);
  return (encodeBase32(timeBytes) + encodeBase32(random)).slice(0, 26);
};

export const generateUUIDv4 = () => {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = randomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = bytesToHex(bytes);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
};

export const generateUUIDv7 = () => {
  const bytes = randomBytes(16);
  const time = BigInt(Date.now());
  for (let i = 5; i >= 0; i--) {
    bytes[i] = Number((time >> BigInt((5 - i) * 8)) & 0xffn);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = bytesToHex(bytes);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
};

export const crc32 = (bytes) => {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
};
