import type {FC} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ABookRail, AChapter, AClaude, AWorks} from './a/accounts';
import {ACodex, ADeepSeek, AGemini} from './a/alternatives';
import {P} from './a/basics';
import {isFrameA, phaseAt} from './a/state';

/** The chapter's right side and every A content state are light, including f2281. */
export const brandLightA = (frame: number): boolean => isFrameA(frame);

/** Native Remotion scene, mounted on the absolute 30-fps source clock. */
export const SegmentA: FC = () => {
  const frame = useCurrentFrame();
  if (!isFrameA(frame)) return null;
  const pose = phaseAt(frame);
  return <AbsoluteFill lang="zh-CN" data-a="accounts" style={{
    overflow:'hidden', pointerEvents:'none', backgroundColor:P.white,
  }}>
    <AClaude frame={frame} pose={pose} />
    <AWorks frame={frame} pose={pose} />
    <ACodex frame={frame} pose={pose} />
    <ADeepSeek frame={frame} pose={pose} />
    <AGemini frame={frame} pose={pose} />
    <ABookRail frame={frame} pose={pose} />
    <AChapter frame={frame} />
  </AbsoluteFill>;
};
