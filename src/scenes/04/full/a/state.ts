// All inputs are global 1920×1080 / 30 fps source-frame indices.
export const A_START = 900;
export const A_END = 2282;
export const isFrameA = (frame: number) => frame >= A_START && frame < A_END;

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

const sample = (frame: number, first: number, values: readonly number[]) => {
  const i = Math.max(0, Math.min(frame - first, values.length - 1));
  const lo = Math.floor(i);
  return lerp(values[lo], values[Math.ceil(i)], i - lo);
};

export const chapterAt = (frame: number) => {
  if (frame < A_START || frame >= 913) return null;
  const panelRight = sample(frame, 902, [620, 617, 600, 560, 497, 414, 319, 222, 130, 56, 0]);
  return {
    panelX: panelRight - 620,
    copyX: sample(frame, 902, [0, 6, 42, 124, 255, 424, 620, 821, 1008, 1164, 1286, 1367]),
  };
};

// The exact displayed integer values on f1147–1169 (not a recomputed FX feed).
const rmb = [0, 0, 0, 193, 437, 645, 814, 947, 1049, 1126, 1183, 1226, 1258, 1281, 1298, 1310, 1318, 1324, 1328, 1331, 1333, 1333, 1334];
export const rmbAt = (frame: number) => Math.round(sample(frame, 1147, rmb));

// Read off every changed one-decimal value from the exact source-frame crops.
// The long holds do not drift toward the next cue.
const firstTotal = [0, 1.0, 4.0, 6.0, 7.6, 8.9, 9.9, 10.6, 11.2, 11.6, 12.0, 12.2, 12.4, 12.5, 12.6, 12.7, 12.7, 12.8];
const secondTotal = [12.8, 12.9, 13.1, 13.3, 13.4, 13.5, 13.6, 13.6, 13.7, 13.7, 13.7, 13.8];
export const totalAt = (frame: number) => (
  (frame < 1773 ? sample(frame, 1503, firstTotal) : sample(frame, 1773, secondTotal)).toFixed(1)
);

// The independent artwork advances with the measured source strip velocity, not one
// crossfade per thumbnail. The small end-acceleration lets the belt leave in motion.
export const worksScrollAt = (frame: number) =>
  5 * Math.max(0, Math.min(frame, 1588) - 1314) +
  sample(frame, 1588, [0, 6, 13, 24, 37, 52, 68, 85, 103, 121, 140, 160, 180]);

const reveal = (frame: number, first: number, points: readonly number[]) => sample(frame, first - 1, [0, ...points]);
const settle = (frame: number, first: number) => reveal(frame, first, [.12, .32, .53, .69, .81, .89, .95, .98, .995, 1]);

export const phaseAt = (frame: number) => {
  const worksIn = reveal(frame, 1314, [.04, .11, .2, .32, .47, .58, .7, .81, .89, .95, .98, 1]);
  const codexIn = reveal(frame, 1589, [.018,.067,.133,.22,.34,.45,.58,.7,.81,.9,.958,.99,1]);
  const compact = reveal(frame, 1847, [.035,.09,.167,.267,.373,.491,.62,.74,.83,.9,.95,.98,.995,1]);
  const deepseekIn = reveal(frame, 1848, [.04,.12,.21,.32,.435,.56,.685,.79,.876,.945,.985,1]);
  const geminiIn = reveal(frame, 1949, [.02,.07,.145,.24,.34,.45,.56,.66,.76,.84,.907,.952,.981,.995,1]);
  return {
    nav: reveal(frame, 907, [.08, .32, .67, .91, .994, 1]),
    claude: 1 - worksIn,
    claudeTitle: settle(frame, 1018),
    usd: settle(frame, 1105),
    rmb: reveal(frame, 1147, [.06,.26,.48,.65,.79,.88,.943,.978,1]),
    works: worksIn * (1 - codexIn),
    worksIn,
    worksOut: codexIn,
    volume: reveal(frame, 1367, [.22,.395,.566,.73,.84,.91,.96,.986,1]),
    formula: reveal(frame, 1502, [.19,.87,1]),
    codex: codexIn * (1 - geminiIn),
    codexDetails: codexIn * (1 - compact),
    compact,
    allocation: reveal(frame, 1772, [.23,.93,1]),
    deepseek: deepseekIn * (1 - geminiIn),
    deepseekIn,
    gemini: geminiIn,
    geminiWarn: reveal(frame, 2015, [.09,.25,.43,.65,.82,.91,.97,.997,1]),
    geminiSwitch: settle(frame, 2054),
    geminiNote: reveal(frame, 2165, [.56,.985,1]),
  };
};

export const codexWorkAt = (frame: number, index: number) =>
  settle(frame, [1705, 1707, 1710, 1712][index]);
