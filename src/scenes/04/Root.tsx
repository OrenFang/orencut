import { demoAsset as staticFile } from '../../demo-media';
import React from 'react';
import {AbsoluteFill, Composition, useCurrentFrame} from 'remotion';
import {Brand} from './Brand';
import {Captions} from './Captions';
import {Cost, COST_START, CHAPTER_START} from './Cost';
import {useDemoFonts} from './fonts';
import {Prelude} from './Prelude';
import {Wall} from './Wall';

// Keep the measured source-frame grid. The old stage and the first Q&A glyph
// coexist on f419–421. Cost's opaque white chapter covers the still-live wall.
const PRELUDE_OUT_EXCLUSIVE = 422;

const Assembly: React.FC = () => {
  const frame = useCurrentFrame();
  useDemoFonts();
  return (
    <AbsoluteFill lang="zh-CN" style={{overflow: 'hidden', backgroundColor: '#17171a'}}>
      <Wall />
      {frame < PRELUDE_OUT_EXCLUSIVE ? <Prelude /> : null}
      {frame >= COST_START ? <Cost /> : null}
      <Captions />
      <Brand light={frame >= CHAPTER_START} />
      {/* Studio audition only; production renders muted and stream-copies the original AAC. */}
      <></>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Demo04"
    component={Assembly}
    durationInFrames={900}
    fps={30}
    width={1920}
    height={1080}
  />
);
