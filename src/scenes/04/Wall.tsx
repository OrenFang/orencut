import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

const BACK = '#17171a';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const OVERSCAN = 96;
const WIDTH = 1920;

type Lane = {
  x: number;
  y: number;
  w: number;
  h: number;
  gap: number;
  tilt: number;
  skew: number;
  speed: number;
  lead: number;
  ids: readonly number[];
  replace?: {index: number; id: number; start: number; end: number};
};

// Origins are the upper left corners of actual row-zero tiles at f0. Each
// strip remains a single slanted plane; its phase continues across every cue.
const LANES: readonly Lane[] = [
  {x: -72, y: 182, w: 493, h: 243, gap: 31, tilt: -11.4, skew: 0, speed: 3.68, lead: 41, ids: [1, 2, 3, 8, 5, 11, 4, 10, 9, 6, 7, 14], replace: {index: 1, id: 8, start: 31, end: 44}},
  {x: 222, y: 395, w: 526, h: 286, gap: 29, tilt: -12.3, skew: -5.1, speed: -3.26, lead: 13, ids: [5, 10, 9, 3, 12, 11, 7, 8, 6, 2, 1, 13]},
  {x: 516, y: 638, w: 550, h: 309, gap: 32, tilt: -13.2, skew: 0.4, speed: 4.08, lead: 49, ids: [9, 14, 14, 4, 2, 5, 13, 1, 6, 8, 12, 11]},
  {x: 906, y: 904, w: 570, h: 304, gap: 34, tilt: -13.9, skew: 2.7, speed: -4.05, lead: 12, ids: [2, 8, 10, 11, 3, 7, 4, 12, 9, 1, 13, 5]},
  {x: 353, y: 1303, w: 592, h: 320, gap: 35, tilt: -14.6, skew: 3.1, speed: 4.28, lead: 35, ids: [5, 9, 3, 10, 1, 12, 2, 4, 6, 8, 7, 11]},
];

const wrap = (n: number, length: number) => ((n % length) + length) % length;
const tileSrc = (id: number) => staticFile(`web/${id === 13 ? 'demo-finance.jpg' : id === 14 ? 'demo-anime.jpg' : `wall-${String(id).padStart(2, '0')}.jpg`}`);

const Strip: React.FC<{lane: Lane; frame: number}> = ({lane, frame}) => {
  const {x, y, w, h, gap, tilt, skew, speed, lead, ids, replace} = lane;
  const pitch = w + gap;
  const cosine = Math.cos(tilt * Math.PI / 180);
  const leadIn = interpolate(frame, [0, 8, 16, 24, 40], [0, 0.56, 0.82, 0.98, 1], clamp);
  const localShift = (speed * frame + Math.sign(speed) * lead * leadIn) / cosine;
  // Only mount cells that can intersect the overscan, but retain real strip
  // indices so the same tile follows a continuous track in random-access render.
  const first = Math.floor(((-OVERSCAN - x) / cosine - localShift - w - 100) / pitch);
  const last = Math.ceil(((WIDTH + OVERSCAN - x) / cosine - localShift + 80) / pitch);
  return (
    <div style={{position: 'absolute', left: x + OVERSCAN, top: y + OVERSCAN, width: 1, height: h, transformOrigin: '0 0', transform: `rotate(${tilt}deg) skewX(${skew}deg)`}}>
      {Array.from({length: last - first + 1}, (_, offset) => {
        const index = first + offset;
        const id = ids[wrap(index, ids.length)];
        const phase = replace && index === replace.index ? interpolate(frame, [replace.start, replace.end], [0, 1], clamp) : 0;
        return (
          <div key={index} style={{position: 'absolute', left: index * pitch + localShift, top: 0, width: w, height: h, borderRadius: 18, overflow: 'hidden', background: '#222126'}}>
            {phase < 1 ? <Img alt="" src={tileSrc(id)} style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover', filter: id === 14 ? 'brightness(.7) saturate(1.19)' : undefined}} /> : null}
            {phase > 0 && replace ? <Img alt="" src={tileSrc(replace.id)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: phase}} /> : null}
            {id === 14 ? <AbsoluteFill style={{background: 'linear-gradient(115deg,#4e1c6b60,transparent 59%,#ad4f284a)'}} /> : null}
          </div>
        );
      })}
    </div>
  );
};

export const Wall: React.FC = () => {
  const frame = useCurrentFrame();
  const blur = interpolate(frame, [0, 200, 205, 212, 412, 419, 428, 435], [0.35, 0.35, 9, 17, 17, 6, 20, 23], clamp);
  const light = interpolate(frame, [0, 34, 45, 139, 198, 213, 412, 419, 430], [0.49, 0.49, 0.455, 0.47, 0.52, 0.38, 0.38, 0.51, 0.39], clamp);
  const veil = interpolate(frame, [0, 200, 213, 412, 419, 430], [0.10, 0.10, 0.18, 0.18, 0.07, 0.29], clamp);
  return (
    <AbsoluteFill data-wall style={{background: BACK, overflow: 'hidden', pointerEvents: 'none'}}>
      <div style={{position: 'absolute', inset: -OVERSCAN, filter: `brightness(${light}) blur(${blur}px)`}}>
        {LANES.map((lane, index) => <Strip lane={lane} frame={frame} key={index} />)}
      </div>
      <AbsoluteFill style={{backgroundColor: `rgba(23, 23, 26, ${veil})`, backgroundImage: 'radial-gradient(ellipse at 48% 49%, transparent 37%, rgba(9,9,11,.16) 100%)'}} />
    </AbsoluteFill>
  );
};
