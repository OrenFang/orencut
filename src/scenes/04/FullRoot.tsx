import { demoAsset as staticFile } from '../../demo-media';
import React from 'react';
import {AbsoluteFill, Composition, useCurrentFrame} from 'remotion';
import {Brand} from './Brand';
import {Captions} from './Captions';
import {Cost, COST_START, CHAPTER_START} from './Cost';
import {Prelude} from './Prelude';
import {Wall} from './Wall';
import {useDemoFonts} from './fonts';
import {FullCaptions} from './full/FullCaptions';
import {SegmentA, brandLightA} from './full/SegmentA';
import {SegmentB, brandLightB} from './full/SegmentB';
import {SegmentC, brandLightC} from './full/SegmentC';
import {SegmentD, brandLightD} from './full/SegmentD';
import {SegmentE, brandLightE} from './full/SegmentE';

export const FULL_SEGMENTS = [
  {id: 'A', from: 900, to: 2282, Scene: SegmentA, brandLight: brandLightA},
  {id: 'B', from: 2282, to: 3602, Scene: SegmentB, brandLight: brandLightB},
  {id: 'C', from: 3602, to: 5296, Scene: SegmentC, brandLight: brandLightC},
  {id: 'D', from: 5296, to: 6916, Scene: SegmentD, brandLight: brandLightD},
  {id: 'E', from: 6916, to: 7827, Scene: SegmentE, brandLight: brandLightE},
] as const;

export const FullTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  useDemoFonts();
  const opener = frame < 900;
  const active = opener ? undefined : FULL_SEGMENTS.find(({from, to}) => from <= frame && frame < to);
  if (!opener && !active) throw new Error(`Demo04Full: no scene for absolute frame ${frame}`);

  return (
    <AbsoluteFill lang="zh-CN" data-ft-frame={frame} data-ft-segment={active?.id ?? 'opening'}
      style={{overflow: 'hidden', backgroundColor: '#17171a'}}>
      {active ? <>
        <active.Scene />
        <FullCaptions />
        <Brand light={active.brandLight(frame)} />
      </> : <>
        {/* Editable Studio preview: reproduce the locked old Root's layered JSX exactly. */}
        <Wall />
        {frame < 422 ? <Prelude /> : null}
        {frame >= COST_START ? <Cost /> : null}
        <Captions />
        <Brand light={frame >= CHAPTER_START} />
      </>}
      {/* Studio only; production is --muted and stream-copies the original AAC once. */}
      <></>
    </AbsoluteFill>
  );
};

export const FullRoot: React.FC = () => (
  <Composition id="Demo04Full" component={FullTimeline} durationInFrames={7827}
    fps={30} width={1920} height={1080} />
);
