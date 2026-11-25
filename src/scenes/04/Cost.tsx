import type {CSSProperties, FC, ReactNode} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

// Global 30 fps coordinates. Prelude is still fading on f419–421.
export const COST_START = 419;
export const CHAPTER_START = 866;
const COST_END = 900;

const DISPLAY = '"FT Display", "PingFang SC", sans-serif';
const TEXT = '"FT Text", "PingFang SC", sans-serif';
const MONO = '"FT Mono", monospace';
const PURPLE = '#d6bfff';
const WHITE = '#ffffff';
const PANEL = '#18181a';
const CARD = '#212123';
const SECONDARY = '#6d6c71';
const RED = '#e64a50';
const W = 1920;
const H = 1080;

const series = (frame: number, start: number, values: readonly number[]) => {
  const i = Math.max(0, Math.min(frame - start, values.length - 1));
  const left = Math.floor(i);
  return values[left] + (values[Math.ceil(i)] - values[left]) * (i - left);
};

const place = (left: number, top: number, width: number, height: number): CSSProperties => ({
  position: 'absolute', left, top, width, height,
});

const canvas: CSSProperties = {...place(0, 0, W, H), display: 'block', overflow: 'visible'};
const cardShadow = '0 21px 38px rgba(0,0,0,.46)';

type InkProps = {
  x: number;
  y: number;
  size: number;
  fill: string;
  middle?: boolean;
  family?: string;
  weight?: number;
  children: ReactNode;
};

const Ink: FC<InkProps> = ({x, y, size, fill, middle, family = DISPLAY, weight = 400, children}) => (
  <text x={x} y={y} fill={fill} fontFamily={family} fontWeight={weight} fontSize={size}
    textAnchor={middle ? 'middle' : 'start'}>{children}</text>
);

const HEADING = '评论区问得最多的问题';

const QuestionHeading: FC<{frame: number}> = ({frame}) => (
  <g data-layer="cost-heading">
    {Array.from(HEADING).map((glyph, i) => {
      const f = frame - i;
      const alpha = series(f, COST_START - 1, [0, .5, .86, .99, 1]);
      if (alpha === 0) return null;
      const dy = series(f, COST_START, [18, 12, 8, 5, 3, 2, 1, .5, 0]);
      return (
        <g opacity={alpha} key={i}>
          <Ink x={680 + i * 56} y={208 + dy} size={56} fill="#cfcfd1" family={TEXT} weight={900}>
            {glyph}
          </Ink>
        </g>
      );
    })}
  </g>
);

const QUESTIONS = [
  {id: '01', x: 260, at: 541, copy: 'Token 是不是烧飞了？', rise: [24, 5, 0], zoom: [.964, .993, 1], alpha: [1]},
  {id: '02', x: 1000, at: 580, copy: '一条成本是不是超级高？', rise: [42, 14, 0], zoom: [.94, .978, 1], alpha: [.48, 1]},
] as const;

type Question = typeof QUESTIONS[number];

const QuestionCard: FC<{frame: number; q: Question}> = ({frame, q}) => {
  if (frame < q.at) return null;
  const rise = series(frame, q.at, q.rise);
  const scale = series(frame, q.at, q.zoom);
  // Only the ink dims; the two panels remain opaque and the red mark stays above it.
  const textDim = frame < 649 ? 1 : .375;
  const strikePx = series(frame, 646, [0, 33, 197, 325, 417, 478, 519, 544, 561, 570, 576, 579, 581, 583, 583, 584]);
  return (
    <div data-layer={`cost-question-${q.id}`} style={{
      ...place(q.x, 280, 660, 194),
      borderRadius: 30,
      backgroundColor: CARD,
      boxShadow: cardShadow,
      transform: `translateY(${rise}px) scale(${scale})`,
      opacity: series(frame, q.at, q.alpha),
    }}>
      <svg width={660} height={194} style={{display: 'block', overflow: 'visible'}}>
        <Ink x={41} y={62} size={26} fill="#959597" family={TEXT}>评论区高频疑问</Ink>
        <Ink x={240} y={61} size={26} fill="#959597" family={TEXT}>·</Ink>
        <Ink x={271} y={62} size={24} fill="#959597" family={MONO} weight={600}>{q.id}</Ink>
        <g opacity={textDim}>
          <Ink x={42} y={141} size={60} fill={WHITE}>{q.copy}</Ink>
        </g>
        {strikePx > 0 ? (
          <path data-layer="cost-strike" d="M 38.5 126.5 H 622.5"
            pathLength={584} strokeDasharray={`${strikePx} 584`}
            stroke={RED} strokeWidth={9} strokeLinecap="round" fill="none" />
        ) : null}
      </svg>
    </div>
  );
};

const Verdict: FC<{frame: number}> = ({frame}) => {
  if (frame < 650) return null;
  const alpha = series(frame, 650, [.25, .48, .67, .79, .875, .92, .958, .977, .991, 1]);
  const dy = series(frame, 650, [33, 22, 14, 8, 4, 2, 1, .6, .25, 0]);
  return (
    <g data-layer="cost-verdict" opacity={alpha} transform={`translate(0 ${dy})`}>
      <Ink x={252} y={719} size={118} fill={WHITE}>
        完全不是，<tspan fill={PURPLE}>便宜到你不敢信</tspan>
      </Ink>
    </g>
  );
};

const QuestionsStage: FC<{frame: number}> = ({frame}) => {
  if (frame >= 741) return null;
  const alpha = series(frame, 731, [1, .99, .95, .86, .706, .555, .397, .235, .114, .032]);
  const lift = series(frame, 731, [0, -1, -3, -8, -15, -24, -33, -42, -48, -52]);
  return (
    <AbsoluteFill data-layer="cost-questions-stage" style={{opacity: alpha, transform: `translateY(${lift}px)`}}>
      <svg width={W} height={H} style={canvas}>
        <QuestionHeading frame={frame} />
      </svg>
      {QUESTIONS.map(q => <QuestionCard key={q.id} frame={frame} q={q} />)}
      {frame >= 650 ? (
        <svg width={W} height={H} style={canvas}><Verdict frame={frame} /></svg>
      ) : null}
    </AbsoluteFill>
  );
};

const PriceCard: FC<{frame: number}> = ({frame}) => {
  if (frame < 785) return null;
  const alpha = series(frame, 785, [.25, .53, .72, .83, .91, .95, .975, .989, .993, .997, 1]);
  const scale = series(frame, 785, [.949, .961, .977, .987, .992, .995, .998, .9985, 1]);
  return (
    <div data-layer="cost-price-card" style={{
      ...place(510, 456, 900, 260), backgroundColor: CARD, borderRadius: 34, boxShadow: cardShadow,
      opacity: alpha, transform: `scale(${scale})`,
    }}>
      <svg width={900} height={260} style={{display: 'block', overflow: 'visible'}}>
        <Ink x={64} y={108} size={32} fill="#a9a9ab" family={TEXT} weight={900}>3–5 分钟 AI 全自动成片</Ink>
        <Ink x={64} y={171} size={44} fill={WHITE} family={TEXT} weight={900}>四笔账逐项拆开算给你看</Ink>
        <g aria-label="¥ ??">
          <Ink x={549} y={172} size={128} fill={PURPLE}>¥</Ink>
          <Ink x={718} y={174} size={128} fill={PURPLE}>??</Ink>
        </g>
      </svg>
    </div>
  );
};

const PriceStage: FC<{frame: number}> = ({frame}) => {
  if (frame < 737) return null;
  const alpha = series(frame, 737, [.315, .558, .718, .829, .894, .94, .963, .986, .993, 1]);
  const dy = series(frame, 737, [32, 22, 15, 9, 5, 3, 2, 1, .5, 0]);
  return (
    <AbsoluteFill data-layer="cost-price-stage">
      <svg width={W} height={H} style={canvas}>
        <g data-layer="cost-price-title" opacity={alpha} transform={`translate(0 ${dy})`}>
          <Ink x={384} y={359} size={128} fill={WHITE}>
            一期到底花<tspan fill={PURPLE}>多少钱</tspan>？
          </Ink>
        </g>
      </svg>
      <PriceCard frame={frame} />
    </AbsoluteFill>
  );
};

const AccountChapter: FC<{frame: number}> = ({frame}) => {
  const panelWidth = series(frame, CHAPTER_START, [0, 5, 26, 77, 198, 403, 516, 571, 600, 615, 620]);
  const numberDrop = series(frame, 870, [216, 153, 94, 55, 31, 17, 9, 5, 2, 1, 0]);
  const partAlpha = series(frame, 875, [0, .5, .75, .96, .985, 1]);
  const copyMask = series(frame, 873, [0, 4, 24, 69, 158, 342, 664, 688]);
  const copyShift = series(frame, 874, [42, 11, 0]);
  return (
    <AbsoluteFill data-layer="cost-chapter" style={{backgroundColor: WHITE}}>
      {panelWidth > 0 ? (
        <div data-layer="cost-chapter-panel" style={{
          ...place(0, 0, 620, H), backgroundColor: PANEL, transform: `translateX(${panelWidth - 620}px)`,
        }}>
          <svg width={620} height={H} style={{display: 'block'}}>
            <defs><clipPath id="ft-cost-rank-mask"><rect x={0} y={353} width={620} height={284} /></clipPath></defs>
            <g clipPath="url(#ft-cost-rank-mask)">
              <Ink x={310} y={589 + numberDrop} size={220} fill={PURPLE} middle>01</Ink>
            </g>
            <g opacity={partAlpha}>
              <Ink x={310} y={678} size={30} fill="#929294" family={MONO} weight={600} middle>PART 01</Ink>
            </g>
          </svg>
        </div>
      ) : null}
      {copyMask > 0 ? (
        <svg width={W} height={H} style={canvas}>
          <defs><clipPath id="ft-cost-chapter-copy-mask"><rect x={730} y={403} width={copyMask} height={280} /></clipPath></defs>
          <g data-layer="cost-chapter-copy" transform={`translate(${copyShift} 0)`}>
            <g clipPath="url(#ft-cost-chapter-copy-mask)">
              <Ink x={730} y={551} size={144} fill={PANEL}>账号订阅</Ink>
              <Ink x={731} y={651} size={44} fill={SECONDARY} family={TEXT} weight={900}>最大头的一笔 · 按 104 条产量均摊</Ink>
            </g>
          </g>
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};

export const Cost: FC = () => {
  const frame = useCurrentFrame();
  if (frame < COST_START || frame >= COST_END) return null;
  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      {frame < CHAPTER_START ? <>
        <QuestionsStage frame={frame} />
        <PriceStage frame={frame} />
      </> : <AccountChapter frame={frame} />}
    </AbsoluteFill>
  );
};
