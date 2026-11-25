import React from 'react';
import {useCurrentFrame} from 'remotion';
import cues from './captions.json';
import {FT_FONTS, useFredFonts} from './fonts';

type CaptionCue = Readonly<{startFrame: number; endFrame: number; text: string}>;

/** Absolute composition frame; endFrame is exclusive. */
export const captionAtFrame = (frame: number): CaptionCue | undefined =>
  cues.find(({startFrame, endFrame}) => startFrame <= frame && frame < endFrame);

export const Captions: React.FC = () => {
  const cue = captionAtFrame(useCurrentFrame());
  useFredFonts();
  if (!cue) return null;

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
        padding: '0 23px',
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
        // Trim the local face's fill to the narrower strokes measured in the source.
        WebkitTextStroke: '0.8px #000',
        whiteSpace: 'pre',
        pointerEvents: 'none',
      }}
    >
      {cue.text}
    </div>
  );
};
