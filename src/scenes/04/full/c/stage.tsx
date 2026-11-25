import { demoAsset as staticFile } from '../../../../demo-media';
import type {CSSProperties, FC, ReactNode} from 'react';
import {Img} from 'remotion';
import {FT_FONTS} from '../../fonts';

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DISPLAY = `"${FT_FONTS.display}", "PingFang SC", sans-serif`;
export const TEXT = `"${FT_FONTS.text}", "PingFang SC", sans-serif`;
export const CAPTION = `"${FT_FONTS.caption}", "PingFang SC", sans-serif`;
export const MONO = `"${FT_FONTS.mono}", "PingFang SC", monospace`;
export const INK = '#18181a';
export const GRAY = '#6d6d70';
export const PURPLE = '#8554e8';
export const LAVENDER = '#d6beff';
export const SOFT_SHADOW = '0 13px 23px rgba(18,18,19,.14)';
export const MEDIA_SHADOW = '0 22px 52px rgba(17,18,20,.36)';

export const WEB = {
  transcript: 'full-web/transcript-ui.jpg',
  stock: 'full-web/stock-library.jpg',
  music: 'full-web/music-fx.jpg',
  graphics: 'full-web/graphics-kit.jpg',
  library: 'web/library.jpg',
  output: 'web/wall-01.jpg',
} as const;

export const box = (left: number, top: number, width: number, height: number): CSSProperties => ({
  position: 'absolute', left, top, width, height,
});
export const clip = (n: number) => Math.min(1, Math.max(0, n));
export const frac = (frame: number, a: number, b: number) => clip((frame - a) / (b - a));
export const lerp = (a: number, b: number, v: number) => a + (b - a) * v;
export const settle = (frame: number, a: number, b: number) => {
  const t = 1 - frac(frame, a, b);
  return 1 - t * t * t;
};
export const smooth = (frame: number, a: number, b: number) => {
  const t = frac(frame, a, b);
  return t * t * (3 - 2 * t);
};
export const at = (frame: number, knots: ReadonlyArray<readonly [number, number]>): number => {
  let [lastFrame, lastValue] = knots[0];
  if (frame <= lastFrame) return lastValue;
  for (let i = 1; i < knots.length; i++) {
    const [nextFrame, nextValue] = knots[i];
    if (frame <= nextFrame) return lerp(lastValue, nextValue, frac(frame, lastFrame, nextFrame));
    lastFrame = nextFrame;
    lastValue = nextValue;
  }
  return lastValue;
};
export const rise = (p: number, distance = 24): CSSProperties => ({
  opacity: p, transform: `translateY(${distance * (1 - p)}px)`,
});

export const Canvas: FC<{width?: number; height?: number; style?: CSSProperties; children: ReactNode}> =
  ({width = WIDTH, height = HEIGHT, style, children}) => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
      style={{...box(0, 0, width, height), display: 'block', overflow: 'visible', ...style}}>
      {children}
    </svg>
  );

type TextProps = {
  x: number;
  y: number;
  size: number;
  fill?: string;
  family?: string;
  weight?: number;
  align?: 'start' | 'middle' | 'end';
  letterSpacing?: number;
  children: ReactNode;
};
export const Ink: FC<TextProps> = ({x, y, size, fill = INK, family = DISPLAY,
  weight = 400, align = 'start', letterSpacing, children}) => (
  <text x={x} y={y} fontSize={size} fill={fill} fontFamily={family} fontWeight={weight}
    textAnchor={align} letterSpacing={letterSpacing}>{children}</text>
);

export const Photo: FC<{src: string; alt: string; style?: CSSProperties}> = ({src, alt, style}) => {
  const url = staticFile(src);
  return (
    <Img src={url} data-c-asset={url} alt={alt} style={{
      ...box(0, 0, 1, 1), width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style,
    }} />
  );
};

/** Local editorial annotation of an inset—not the root narration captions. */
export const InsetCaption: FC<{text: string; width: number; top: number; height?: number; size?: number}> =
  ({text, width, top, height = 48, size = 27}) => (
    <div data-c-inset-caption style={{
      ...box(0, top, width, height), display: 'flex', justifyContent: 'center', alignItems: 'center',
      font: `400 ${size}px/1 ${CAPTION}`, color: '#fff', whiteSpace: 'nowrap',
    }}>
      <span style={{background: '#050506', borderRadius: Math.round(height * .16),
        height, padding: `0 ${Math.round(height * .25)}px`, display: 'flex', alignItems: 'center'}}>{text}</span>
    </div>
  );

export const Stamp: FC<{size: number; cross?: boolean; shadow?: boolean; style?: CSSProperties}> =
  ({size, cross = false, shadow = true, style}) => (
    <svg width={size} height={size} viewBox="0 0 84 84" aria-hidden="true" style={{
      display: 'block', borderRadius: '50%', boxShadow: shadow ? '6px 10px 19px rgba(0,0,0,.26)' : undefined,
      ...style,
    }}>
      <circle cx={42} cy={42} r={42} fill={INK} />
      <path d={cross ? 'M30 30 L54 54 M54 30 L30 54' : 'M26 43 L38 54 L59 30'} fill="none"
        stroke={cross ? '#fff' : LAVENDER} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
