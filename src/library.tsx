import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import rows from './catalog.json';
import { Episode as Scene01 } from './scenes/01/Episode';
import { Film as Scene02 } from './scenes/02/index';
import { Film as Scene03 } from './scenes/03/Film';
import { FullTimeline as Scene04 } from './scenes/04/FullRoot';
import { Episode as Scene05 } from './scenes/05/index';
import { Episode as Scene06 } from './scenes/06/episode';
import { FT1007 as Scene07 } from './scenes/07/index';
import { Movie as Scene08 } from './scenes/08/index';
import { Episode as Scene09 } from './scenes/09/index';
import { Film as Scene10 } from './scenes/10/index';

export const clips = rows;
const scenes: Record<string, React.ComponentType> = { '01': Scene01, '02': Scene02, '03': Scene03, '04': Scene04, '05': Scene05, '06': Scene06, '07': Scene07, '08': Scene08, '09': Scene09, '10': Scene10 };

export function MotionClip({ id }: { id: string }) {
  const entry = clips.find((clip) => clip.id === id);
  if (!entry) throw new Error(`Unknown clip ${id}`);
  const Scene = scenes[entry.slot];
  return (
    <AbsoluteFill data-motion-scene={entry.slot} style={{ overflow: 'hidden' }}>
      <Sequence from={-entry.window[0]} durationInFrames={entry.window[1]} layout="none">
        <Scene />
      </Sequence>
    </AbsoluteFill>
  );
}
