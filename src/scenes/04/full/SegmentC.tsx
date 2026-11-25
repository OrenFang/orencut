import type {FC} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {RateStrip, SoundChapter} from './c/chapters';
import {MiscCosts} from './c/misc';
import {Settlement} from './c/settlement';
import {Transcription, VoiceCloning} from './c/voice';

const START = 3602;
const END = 5296;

/** C is a light stage throughout. Return false outside this seat's coverage. */
export const brandLightC = (frame: number): boolean => frame >= START && frame < END;

/** Absolute composition frame at 30 fps. Root owns brand, narration captions and full audio. */
export const SegmentC: FC = () => {
  const frame = useCurrentFrame();
  if (frame < START || frame >= END) return null;
  return (
    <AbsoluteFill lang="zh-CN" data-c-frame={frame} style={{backgroundColor: '#fff', overflow: 'hidden', pointerEvents: 'none'}}>
      <RateStrip frame={frame} />
      <SoundChapter frame={frame} />
      <Transcription frame={frame} />
      <VoiceCloning frame={frame} />
      <MiscCosts frame={frame} />
      <Settlement frame={frame} />
    </AbsoluteFill>
  );
};
