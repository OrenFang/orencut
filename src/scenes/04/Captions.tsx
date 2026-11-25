import React from 'react';
import {useCurrentFrame} from 'remotion';
import cues from './captions.json';
import {FT_FONTS, useDemoFonts} from './fonts';

type CaptionCue = Readonly<{startFrame: number; endFrame: number; text: string}>;

/** Absolute composition frame; endFrame is exclusive. */
export const captionAtFrame = (frame: number): CaptionCue | undefined =>
  cues.find(({startFrame, endFrame}) => startFrame <= frame && frame < endFrame);

export const Captions: React.FC = () => {return null;};
