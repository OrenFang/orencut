import { demoAsset as staticFile } from '../../../../demo-media';
import type {CSSProperties, FC, ReactNode} from 'react';
import {Img} from 'remotion';
import {FT_FONTS} from '../../fonts';

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DARK = '#18181a';
export const PAPER = '#ffffff';
export const LILAC = '#d6bfff';
export const TEXT = `"${FT_FONTS.text}", "PingFang SC", sans-serif`;
export const DISPLAY = `"${FT_FONTS.display}", "PingFang SC", sans-serif`;
export const MONO = `"${FT_FONTS.mono}", "${FT_FONTS.text}", monospace`;

export const box = (left: number, top: number, width: number, height: number): CSSProperties => ({
  position: 'absolute', left, top, width, height,
});

export const sheetStyle = {...box(0, 0, WIDTH, HEIGHT), overflow: 'visible', display: 'block'} as const;

export const Ink: FC<{
  x: number; y: number; size: number; children: ReactNode; fill?: string;
  family?: string; weight?: number; align?: 'start' | 'middle' | 'end';
}> = ({x, y, size, children, fill = PAPER, family = TEXT, weight = 900, align = 'start'}) => (
  <text x={x} y={y} fontFamily={family} fontWeight={weight} fontSize={size}
    textAnchor={align} fill={fill}>{children}</text>
);

export const ImageLayer: FC<{asset: string; alt: string; style: CSSProperties}> = ({asset, alt, style}) => (
  <Img data-b-asset={asset} src={staticFile(asset)} alt={alt} style={{display: 'block', ...style}} />
);

export const SoftCheck: FC<{opacity: number; scale: number}> = ({opacity, scale}) => (
  <g data-layer="b-automatic-check-mark" opacity={opacity}
    transform={`translate(1756 741) scale(${scale})`}>
    <circle r={41} fill={PAPER} />
    <path d="M -15 -1 L -4 10 L 15 -13" stroke="#8554e8" strokeWidth={7}
      strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
);