import type {FC} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AmountB} from './b/Amount';
import {BackdropB, ChapterB, ConsoleB, PricingB, TopLedgerB} from './b/Cloud';
import {DARK} from './b/drawing';
import {segmentBState, series} from './b/timing';
import {WorkflowB} from './b/Workflow';

export {brandLightB} from './b/timing';

/** FredTalk 04 · Chapter 02. Mount on the 1920×1080 master clock, not in a shifted Sequence. */
export const SegmentB: FC = () => {
  const frame = useCurrentFrame();
  const state = segmentBState(frame);
  if (!state) return null;
  const priceOut = series(frame, 2812, [1, .992, .962, .908, .823, .718, .591, .46, .34, .229, .143, .077, .022, 0]);
  return (
    <AbsoluteFill data-layer="fred04-segment-b" style={{backgroundColor: DARK, overflow: 'hidden', fontSynthesis: 'none', pointerEvents: 'none'}}>
      {frame >= 2319 && <>
        <BackdropB frame={frame} />
        <TopLedgerB frame={frame} total={state.total} />
      </>}
      {frame >= 2447 && priceOut > 0 && <>
        <PricingB frame={frame} opacity={priceOut} />
        {frame >= 2639 && <ConsoleB frame={frame} opacity={priceOut} />}
      </>}
      {frame >= 2814 && frame < 3252 && <WorkflowB frame={frame} />}
      {state.cost && <AmountB frame={frame} state={state.cost} />}
      {state.chapter && <ChapterB frame={frame} state={state.chapter} />}
    </AbsoluteFill>
  );
};