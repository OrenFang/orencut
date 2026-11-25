import React from 'react';
import {AbsoluteFill, Composition, useCurrentFrame} from 'remotion';
import {Captions} from './Captions';
import {Cost, COST_START,} from './Cost';
import {useFredFonts} from './fonts';
import {Prelude} from './Prelude';
import {Wall} from './Wall';

// Keep the measured source-frame grid. The old stage and the first Q&A glyph
// coexist on f419–421. Cost's opaque white chapter covers the still-live wall.
const PRELUDE_OUT_EXCLUSIVE = 422;

const Assembly: React.FC = () => {
  const frame = useCurrentFrame();
  useFredFonts();
  return (
    <AbsoluteFill lang="zh-CN" style={{overflow: 'hidden', backgroundColor: '#17171a'}}>
      <Wall />
      {frame < PRELUDE_OUT_EXCLUSIVE ? <Prelude /> : null}
      {frame >= COST_START ? <Cost /> : null}
      <Captions />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="FredTalk04"
    component={Assembly}
    durationInFrames={900}
    fps={30}
    width={1920}
    height={1080}
  />
);
