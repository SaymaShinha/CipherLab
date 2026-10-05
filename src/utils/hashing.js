import { sha256, sha384, sha512 } from "@noble/hashes/sha2.js";

import { sha3_256, sha3_384, sha3_512 } from "@noble/hashes/sha3.js";

import { hmac } from "@noble/hashes/hmac.js";

import { bytesToHex } from "@noble/hashes/utils.js";

const encoder = new TextEncoder();

export function hashSHA256(value) {
  return bytesToHex(sha256(encoder.encode(value)));
}

export function hashSHA384(value) {
  return bytesToHex(sha384(encoder.encode(value)));
}

export function hashSHA512(value) {
  return bytesToHex(sha512(encoder.encode(value)));
}

export function hashSHA3_256(value) {
  return bytesToHex(sha3_256(encoder.encode(value)));
}

export function hashSHA3_384(value) {
  return bytesToHex(sha3_384(encoder.encode(value)));
}

export function hashSHA3_512(value) {
  return bytesToHex(sha3_512(encoder.encode(value)));
}

export function hmacSHA256(message, secret) {
  return bytesToHex(
    hmac(sha256, encoder.encode(secret), encoder.encode(message)),
  );
}
