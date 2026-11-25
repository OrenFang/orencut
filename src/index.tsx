import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { clips, MotionClip } from './library';

function LibraryRoot() {
  return clips.map((clip) => (
    <Composition
      key={clip.id}
      id={`Motion${clip.id}`}
      component={MotionClip}
      defaultProps={{ id: clip.id }}
      fps={clip.fps}
      durationInFrames={clip.frames}
      width={clip.portrait ? 1080 : 1920}
      height={clip.portrait ? 1920 : 1080}
    />
  ));
}

registerRoot(LibraryRoot);
