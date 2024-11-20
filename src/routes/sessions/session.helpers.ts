import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import crypto from "node:crypto";

export function generateToken() {
  const UInt8Size = 20;

  const bytes = new Uint8Array(UInt8Size);
  crypto.getRandomValues(bytes);

  return encodeBase32LowerCaseNoPadding(bytes);
}

export function generateTokenHash(token: string) {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
}
