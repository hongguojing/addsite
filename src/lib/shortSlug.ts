export function toShortSlug(input: string, maxLength = 5): string {
  const normalized = input.trim().toLowerCase();

  let hash = 2166136261;
  for (let i = 0; i < normalized.length; i += 1) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const base = alphabet.length;
  let value = hash >>> 0;
  let out = "";

  for (let i = 0; i < maxLength; i += 1) {
    out = alphabet[value % base] + out;
    value = Math.floor(value / base);
  }

  return out;
}
