/** Pastel tile colour per company, with a deeper shade for the photo-less silhouette. */
export const TONES = [
  { tile: "#cff3e2", deep: "#38a27a" },
  { tile: "#cde5ff", deep: "#3c84d6" },
  { tile: "#ffedb0", deep: "#d6a100" },
  { tile: "#ffd8e1", deep: "#de5c7b" },
  { tile: "#e0d8ff", deep: "#7a62e5" },
] as const;

export type Tone = (typeof TONES)[number];

export function toneAt(index: number): Tone {
  return TONES[index % TONES.length];
}
