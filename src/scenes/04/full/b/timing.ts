// All index values are global source frames at 30 fps, never Sequence-local time.
export const B_START = 2282;
export const B_END = 3602;

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
export const phase = (frame: number, first: number, last: number) => clamp01((frame - first) / (last - first));
export const easeOut = (p: number) => 1 - (1 - p) ** 3;
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const series = (frame: number, first: number, values: readonly number[]) => {
  const at = Math.max(0, Math.min(frame - first, values.length - 1));
  const i = Math.floor(at);
  return mix(values[i], values[Math.ceil(at)], at - i);
};

// The source retains the white-filled, dark-outlined wordmark throughout 02,
// including the white chapter page and the mixed-background wipe.
export const brandLightB = (_frame: number): boolean => false;

const chapterAt = (frame: number) => {
  if (frame >= 2329) return null;
  const exits = frame >= 2319;
  return {
    whiteX: exits
      ? series(frame, 2318, [620, 626, 662, 744, 874, 1044, 1239, 1441, 1628, 1783, 1894])
      : series(frame, 2282, [1920, 1920, 1884, 1777, 1518, 1082, 841, 724, 662, 631, 620]),
    panelX: exits
      ? series(frame, 2318, [0, -3, -21, -60, -123, -206, -301, -398, -489, -565, -619])
      : 0,
    rankX: series(frame, 2287, [-219, -104, -49, -20, -5, 0]),
    rankY: series(frame, 2287, [151, 94, 55, 31, 17, 9, 5, 2, 1, 0]),
    rankOn: frame >= 2287,
    partAlpha: series(frame, 2290, [0, .18, .48, .76, .93, 1]),
    titleMask: series(frame, 2289, [0, 3, 22, 68, 158, 342, 686]),
  };
};

const tenMinuteCents = [0, 8, 15, 21, 25, 29, 31, 33, 34, 35, 35, 35, 36] as const;
const halfHourCents = [36, 36, 41, 49, 56, 63, 69, 75, 80, 84, 88, 91, 94, 96, 99, 100, 102, 103,
  104, 105, 106, 107, 107, 108, 108, 109, 109, 109, 109, 109, 110] as const;
const cumulative = [138, 141, 142, 144, 145, 146, 147, 147, 148, 148, 148, 149] as const;

const previewFill = [0, .079, .265, .427, .56, .667, .752, .815, .865, .902, .931, .95, .965, .977, .985, .995, 1] as const;
const reRenderFill = [0, .025, .226, .403, .549, .666, .756, .823, .872, .91, .937, .956, .969, .981, .992, 1] as const;
const deliveryAnchors = [[3442, 0], [3443, .079], [3444, .148], [3445, .213], [3446, .276], [3447, .338],
  [3448, .393], [3450, .497], [3453, .626], [3465, .896], [3472, .956], [3477, .975], [3480, .983], [3483, 1]] as const;

const deliveryFill = (frame: number) => {
  for (let i = 1; i < deliveryAnchors.length; i++) {
    const [end, value] = deliveryAnchors[i];
    if (frame <= end) {
      const [start, from] = deliveryAnchors[i - 1];
      return mix(from, value, phase(frame, start, end));
    }
  }
  return 1;
};

const costAt = (frame: number) => {
  if (frame < 3236) return null;
  const halfHour = frame >= 3412;
  const final = frame >= 3494;
  const cents = halfHour ? series(frame, 3412, halfHourCents) : series(frame, 3311, tenMinuteCents);
  return {
    halfHour,
    final,
    amount: final ? '1.1' : (cents / 100).toFixed(2),
    // Three fills are separately clocked; the second and third are not a
    // continuous function of the already changing headline amount.
    fills: [series(frame, 3309, previewFill), series(frame, 3411, reRenderFill), deliveryFill(frame)] as const,
  };
};

export const segmentBState = (frame: number) => {
  if (frame < B_START || frame >= B_END) return null;
  return {
    frame,
    chapter: chapterAt(frame),
    total: (series(frame, 3500, cumulative) / 10).toFixed(1),
    cost: costAt(frame),
  };
};