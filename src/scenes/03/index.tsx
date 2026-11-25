import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Film} from './Film';
import timeline from './timeline.json';

export function Root() {
  return <Composition id="FT1003" component={Film} width={1080} height={1920} fps={timeline.fps} durationInFrames={timeline.totalFrames}/>;
}
