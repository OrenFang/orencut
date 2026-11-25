import type {FC} from 'react';
import {DISPLAY, HEIGHT, Ink, LILAC, MONO, PAPER, WIDTH, sheetStyle} from './drawing';
import {segmentBState, series} from './timing';

type Scene = NonNullable<NonNullable<ReturnType<typeof segmentBState>>['cost']>;

const units = [
  {x: 168, width: 520, title: '01 首次预览出片（10 min）'},
  {x: 699, width: 521, title: '02 局部返修重渲（+10 min）'},
  {x: 1231, width: 521, title: '03 最终成片交付（+10 min）'},
] as const;

const CostTimelineB: FC<{frame: number; fills: Scene['fills']}> = ({frame, fills}) => {
  const enter = series(frame, 3242, [0, .08, .2, .36, .55, .7, .82, .91, .97, 1]);
  return (
    <g data-layer="b-duration-timeline" opacity={enter} transform={`translate(0 ${(1 - enter) * 11})`}>
      <Ink x={160} y={657} size={24} family={MONO} weight={600} fill="#a0a0a0">0 min</Ink>
      <Ink x={746} y={657} size={24} family={MONO} weight={600} align="end" fill={fills[0] > .01 ? PAPER : '#a0a0a0'}>10 min · ¥0.36</Ink>
      <Ink x={1260} y={657} size={24} family={MONO} weight={600} align="end" fill={fills[1] > .01 ? PAPER : '#a0a0a0'}>20 min · ¥0.72</Ink>
      <Ink x={1760} y={657} size={24} family={MONO} weight={600} align="end" fill={fills[2] > .01 ? LILAC : '#a0a0a0'}>30 min · ¥1.1</Ink>
      <rect x={160} y={676} width={1600} height={79} rx={19} fill="#ffffff" fillOpacity={.08} />
      {units.map(({x, width, title}, i) => {
        const fillWidth = width * fills[i];
        const label = <Ink x={x + width / 2} y={724} size={27} align="middle" fill="#878788">{title}</Ink>;
        return (
          <g key={title} data-b-cost-stage={i + 1}>
            <defs>
              <clipPath id={`ft-b-step-${i}`}><rect x={x} y={685} width={width} height={60} rx={13} /></clipPath>
              <clipPath id={`ft-b-step-filling-${i}`}><rect x={x} y={685} width={fillWidth} height={60} /></clipPath>
            </defs>
            <g clipPath={`url(#ft-b-step-${i})`}>
              <rect x={x} y={685} width={width} height={60} fill="#151517" fillOpacity={.7} />
              {label}
              {fillWidth > 0 && <g clipPath={`url(#ft-b-step-filling-${i})`}>
                <rect x={x} y={685} width={width} height={60} fill={i === 2 ? LILAC : '#525254'} />
                <Ink x={x + width / 2} y={724} size={27} align="middle" fill={i === 2 ? '#171719' : PAPER}>{title}</Ink>
              </g>}
            </g>
          </g>
        );
      })}
      <Ink x={960} y={797} size={24} family={MONO} weight={600} align="middle" fill="#969492">
        实测数据：EP260 整片单次开机 11 分钟 ≈ ¥0.39 · 渲完自动关机停费
      </Ink>
    </g>
  );
};

export const AmountB: FC<{frame: number; state: Scene}> = ({frame, state}) => {
  const enter = series(frame, 3235, [0, .07, .13, .22, .31, .42, .52, .62, .71, .78, .84, .89, .93, .96, .985, 1]);
  const heading = state.halfHour
    ? '算上预览 + 局部返修 + 最终版 · 累计开机 30 分钟'
    : '一条 3–5 分钟片子 · 单次渲染开机约 10 分钟';
  const summary = state.halfHour
    ? '累计开机半小时，渲染成本也就 1 块钱左右'
    : '单次 1080p / 4K 出片只要几毛钱';
  return (
    <svg data-layer="b-cost" width={WIDTH} height={HEIGHT} style={sheetStyle}>
      <g data-layer="b-cost-heading" opacity={enter} transform={`translate(0 ${(1 - enter) * 19})`}>
        <Ink x={960} y={225} size={36} align="middle" fill="#cccbcd">{heading}</Ink>
        <Ink x={state.final ? 655 : 590} y={459} size={220} family={DISPLAY} weight={400}
          fill={state.halfHour ? LILAC : PAPER}>{`¥${state.amount}`}</Ink>
        <Ink x={state.final ? 1174 : 1238} y={456} size={48} fill="#d7d8d9">
          {state.halfHour ? '/ 期' : '/ 次'}
        </Ink>
        <Ink x={960} y={554} size={44} align="middle">{summary}</Ink>
      </g>
      {frame >= 3243 && <CostTimelineB frame={frame} fills={state.fills} />}
    </svg>
  );
};
export { CostTimelineB };
