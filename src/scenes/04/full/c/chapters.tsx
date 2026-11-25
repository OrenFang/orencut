import type {FC} from 'react';
import {AbsoluteFill} from 'remotion';
import {at, box, Canvas, GRAY, Ink, INK, LAVENDER, MONO, PURPLE, settle, TEXT} from './stage';

const LABELS = ['账号订阅', '云端渲染', '声音字幕', '杂项均摊'] as const;
const VALUES = ['¥13.8', '¥1.1', '¥1.5', '¥2.5'] as const;
const POSITIONS = [96, 366, 636, 906] as const;

export const RateStrip: FC<{frame: number}> = ({frame}) => {
  if (frame < 3642 || frame >= 4780) return null;
  const active = frame < 4522 ? 2 : 3;
  const enter = settle(frame, 3642, 3653);
  const exit = at(frame, [[4762, 0], [4764, .10], [4767, .36], [4770, .63], [4776, .95], [4780, 1]]);
  const sum = at(frame, [[4404, 14.9], [4407, 15.2], [4410, 15.9], [4413, 16.2], [4416, 16.3], [4419, 16.4],
    [4686, 16.4], [4689, 17], [4692, 18], [4695, 18.5], [4698, 18.8], [4701, 18.9]]);
  return (
    <AbsoluteFill data-c-stage="rate-strip" style={{
      opacity: enter * (1 - exit), transform: `translateY(${-(1 - enter) * 37 - 45 * exit}px)`,
    }}>
      {LABELS.map((label, index) => {
        const selected = active === index;
        const pending = index > active;
        const w = selected ? 266 : 258;
        return (
          <div key={label} data-c-rate={index + 1} data-active={selected ? 'yes' : undefined} style={{
            ...box(POSITIONS[index] - (selected ? 4 : 0), 44, w, 68), borderRadius: 36,
            backgroundColor: selected ? INK : '#f0f0f2',
            boxShadow: selected ? '0 12px 19px rgba(0,0,0,.19)' : undefined,
          }}>
            <Canvas width={w} height={68}>
              <Ink x={20} y={43} size={21} fill={selected ? LAVENDER : pending ? '#9a9ba0' : INK}
                family={MONO} weight={600}>{`0${index + 1}`}</Ink>
              <Ink x={54} y={44} size={26} fill={selected ? '#fff' : pending ? '#9a9ba0' : INK}
                family={TEXT} weight={900}>{label}</Ink>
              {pending ? null : <Ink x={w - 19} y={43} size={23} fill={selected ? LAVENDER : PURPLE}
                family={MONO} weight={600} align="end">{VALUES[index]}</Ink>}
            </Canvas>
          </div>
        );
      })}
      <div data-c-running-total={sum.toFixed(1)} style={{...box(1190, 44, 229, 68), borderRadius: 36, backgroundColor: '#f4f0fb'}}>
        <Canvas width={229} height={68}>
          <Ink x={37} y={43} size={24} fill={GRAY} family={TEXT} weight={900}>累计</Ink>
          <Ink x={191} y={45} size={34} fill={PURPLE} align="end">{`¥${sum.toFixed(1)}`}</Ink>
        </Canvas>
      </div>
    </AbsoluteFill>
  );
};

export const SoundChapter: FC<{frame: number}> = ({frame}) => {
  if (frame < 3603 || frame >= 3649) return null;
  const leftWidth = at(frame, [[3602, 0], [3603, 5], [3604, 26], [3605, 77], [3606, 198], [3607, 403],
    [3608, 516], [3609, 571], [3610, 600], [3611, 615], [3612, 620]]);
  const leftOut = at(frame, [[3638, 0], [3639, 4], [3640, 18], [3641, 60], [3642, 124], [3643, 200],
    [3644, 300], [3645, 398], [3646, 494], [3647, 570], [3648, 618], [3649, 620]]);
  const rightOut = at(frame, [[3638, 0], [3639, 6], [3640, 47], [3641, 132], [3642, 254],
    [3643, 414], [3644, 606], [3645, 820], [3646, 1018], [3647, 1160], [3648, 1243]]);
  const numberDrop = at(frame, [[3606, 216], [3607, 153], [3608, 94], [3609, 55], [3610, 31],
    [3611, 17], [3612, 9], [3613, 5], [3614, 2], [3615, 1], [3616, 0]]);
  const copyMask = at(frame, [[3610, 0], [3611, 16], [3612, 72], [3613, 162], [3614, 330],
    [3615, 662], [3616, 738], [3617, 760]]);
  const copyShift = at(frame, [[3610, 42], [3611, 25], [3612, 5], [3613, 0]]);
  return (
    <AbsoluteFill data-c-stage="sound-chapter">
      <div style={{...box(0, 0, 620, 1080), backgroundColor: INK,
        transform: `translateX(${leftWidth - 620 - leftOut}px)`}}>
        <Canvas width={620}>
          <defs><clipPath id="ft-c-03-number"><rect x={0} y={353} width={620} height={269} /></clipPath></defs>
          <g clipPath="url(#ft-c-03-number)">
            <Ink align="middle" x={310} y={589 + numberDrop} size={220} fill={LAVENDER}>03</Ink>
          </g>
          {frame >= 3611 ? <g opacity={settle(frame, 3610, 3617)}>
            <Ink x={310} y={678} size={30} fill="#929294" align="middle" family={MONO} weight={600}>PART 03</Ink>
          </g> : null}
        </Canvas>
      </div>
      {copyMask > 0 ? (
        <Canvas style={{transform: `translateX(${rightOut + copyShift}px)`}}>
          <defs><clipPath id="ft-c-03-title"><rect x={730} y={403} width={copyMask} height={279} /></clipPath></defs>
          <g clipPath="url(#ft-c-03-title)">
            <Ink x={730} y={551} size={144}>声音和字幕</Ink>
            <Ink x={731} y={651} size={44} fill={GRAY} family={TEXT} weight={900}>优选语音转文字 + 声音复刻模型</Ink>
          </g>
        </Canvas>
      ) : null}
    </AbsoluteFill>
  );
};
