import { BLOB_COLORS } from "./BlobColours";

export const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const pickRandom = (arr: any[], count: number) => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

export const generateBlobs = (count = 20) => {
  const colors = pickRandom(BLOB_COLORS, count);

  return colors.map((color, i) => ({
    id: i,
    background: color,
    top: `${randomBetween(0, 65)}%`,
    left: `${randomBetween(0, 80)}%`,
    animationDuration: `${randomBetween(10, 30)}s`,
    animationDelay: `-${randomBetween(0, 15)}s`,
  }));
};
