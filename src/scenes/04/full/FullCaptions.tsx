import React from 'react';
import {useCurrentFrame} from 'remotion';
import {FT_FONTS, useFredFonts} from '../fonts';
import cueData from './captions-full.json';

export type FullCaptionCue = Readonly<{
  startFrame: number;
  endFrame: number;
  text: string;
  solidInkFromFrame?: number;
}>;

const cues: readonly FullCaptionCue[] = cueData;

/** Absolute frame. The frozen opening [0,900) is never overlaid by this layer. */
export const fullCaptionAtFrame = (frame: number): FullCaptionCue | undefined => {
  if (!Number.isInteger(frame) || frame < 900 || frame >= 7827) return undefined;
  return cues.find(({startFrame, endFrame}) => startFrame <= frame && frame < endFrame);
};

export const FullCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = fullCaptionAtFrame(frame);
  useFredFonts();
  if (!cue) return null;

  const solidInk = cue.solidInkFromFrame !== undefined && frame >= cue.solidInkFromFrame;
  return (
    <div
      lang="zh-CN"
      data-ft-caption={cue.startFrame}
      style={{
        position: 'absolute',
        zIndex: 800,
        top: 954,
        left: '50%',
        transform: 'translateX(-50%)',
        height: 102,
        // At f900 reuse the approved placement for the cue already on screen.
        // After its next text cut, raise the native continuation's ink baseline 1 px.
        padding: cue.startFrame === 900 ? '0 23px' : '0 23px 2px',
        boxSizing: 'border-box',
        borderRadius: 17,
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        background: '#000',
        fontFamily: `"${FT_FONTS.caption}", sans-serif`,
        fontWeight: 400,
        fontSize: 47.5,
        lineHeight: 1,
        fontSynthesis: 'none',
        // Same face and geometry; the reference hard-switches to thicker ink at f7547.
        WebkitTextStroke: solidInk ? '0px' : '0.8px #000',
        whiteSpace: 'pre',
        pointerEvents: 'none',
      }}
    >
      {cue.text}
    </div>
  );
};
