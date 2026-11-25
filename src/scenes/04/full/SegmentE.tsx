import type {CSSProperties, FC, ReactNode} from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {CaseVisuals} from './e/CaseVisuals';

const START = 6916;
const END = 7827;
const DESK_IN = 6953;
const CHAPTER_OUT = 6963;
const TAIL_OUT = 7763;
const TITLE_IN = 7752;
const W = 1920;
const H = 1080;
const DISPLAY = '"FT Display", "PingFang SC", sans-serif';
const TEXT = '"FT Text", "PingFang SC", sans-serif';
const MONO = '"FT Mono", monospace';
const INK = '#18181a';
const LILAC = '#d5bfff';
const WHITE = '#fff';

const box = (left: number, top: number, width: number, height: number): CSSProperties =>
  ({position: 'absolute', left, top, width, height});
const artboard: CSSProperties = {...box(0, 0, W, H), display: 'block'};
const sample = (frame: number, start: number, values: readonly number[]): number => {
  const t = Math.max(0, Math.min(frame - start, values.length - 1));
  const i = Math.floor(t);
  return values[i] + (values[Math.ceil(t)] - values[i]) * (t - i);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

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
const InkText: FC<InkProps> = ({x, y, size, fill, middle, family = DISPLAY, weight = 400, children}) => (
  <text x={x} y={y} fill={fill} fontFamily={family} fontWeight={weight} fontSize={size}
    textAnchor={middle ? 'middle' : 'start'}>{children}</text>
);

// The source 05 chapter keeps the white-filled, dark-outlined wordmark on paper too.
export const brandLightE = (_frame: number): boolean => false;

const Chapter: FC<{frame: number}> = ({frame}) => {
  const exiting = frame >= DESK_IN;
  const paperX = exiting
    ? sample(frame, DESK_IN, [626, 662, 744, 874, 1046, 1239, 1441, 1628, 1783, 1894, 1920])
    : sample(frame, 6917, [1920, 1884, 1777, 1518, 1082, 841, 724, 662, 631, 620]);
  const leftX = exiting ? -sample(frame, DESK_IN, [3, 20, 60, 123, 207, 301, 399, 494, 570, 620]) : 0;
  const rankX = sample(frame, 6921, [-218, -104, -49, -19, -5, 0]);
  const rankDrop = sample(frame, 6921, [150, 93, 54, 30, 17, 9, 4, 2, 1, 0]);
  const partAlpha = sample(frame, 6924, [0, .30, .61, .80, .94, 1]);
  const reveal = sample(frame, 6924, [0, 35, 73, 164, 345, 665, 680]);
  const slideCopy = sample(frame, 6925, [17, 0]);

  return (
    <AbsoluteFill data-layer="e-chapter" style={{backgroundColor: exiting ? 'transparent' : INK}}>
      <div data-layer="e-chapter-rank" style={{...box(leftX, 0, 620, H), background: INK, overflow: 'hidden'}}>
        <svg width={620} height={H} style={{display: 'block'}}>
          <defs><clipPath id="ft-e-rank-window"><rect x={0} y={352} width={620} height={285} /></clipPath></defs>
          {frame >= 6921 && <g clipPath="url(#ft-e-rank-window)">
            <InkText x={310 + rankX} y={589 + rankDrop} size={220} fill={LILAC} middle>05</InkText>
          </g>}
          {partAlpha > 0 && <g opacity={partAlpha}>
            <InkText x={310 + rankX} y={678} size={30} fill="#929294" family={MONO} weight={600} middle>PART 05</InkText>
          </g>}
        </svg>
      </div>
      {paperX < W && <div data-layer="e-chapter-paper" style={{...box(paperX, 0, W - 620, H), background: WHITE}}>
        {reveal > 0 && <svg width={1300} height={H} style={{display: 'block'}}>
          <defs><clipPath id="ft-e-chapter-copy-window">
            <rect x={110} y={402} width={reveal} height={280} />
          </clipPath></defs>
          <g clipPath="url(#ft-e-chapter-copy-window)">
            <InkText x={110 + slideCopy} y={551} size={144} fill={INK}>适合谁</InkText>
            <InkText x={110 + slideCopy} y={651} size={44} fill="#69696e" family={TEXT} weight={900}>
              四类最能立刻用上这套工作流的人
            </InkText>
          </g>
        </svg>}
      </div>}
    </AbsoluteFill>
  );
};

const Desk: FC<{frame: number}> = ({frame}) => {
  const src = staticFile('full-web/desk-green.jpg');
  const into = sample(frame, DESK_IN, [.51, .59, .68, .77, .85, .91, .96, .98, 1]);
  const closingShade = sample(frame, 7754, [0, .025, .13, .25, .38, .5, .63, .71, .77, .79, .81]);
  return (
    <AbsoluteFill data-layer="e-desk" style={{overflow: 'hidden', background: '#191b1d', opacity: into}}>
      <Img src={src} data-e-src={src} alt="" style={{...box(0, 0, W, H),
        objectFit: 'cover', transform: 'translateX(-96px) scale(1.17)',
        filter: `blur(${14 + 7 * closingShade}px) contrast(.84) brightness(1.08) saturate(.88)`}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 49% 5%, rgba(26,106,83,.37), transparent 65%), linear-gradient(140deg,rgba(12,18,17,.06),transparent 54%,rgba(19,17,22,.28))'}} />
      <AbsoluteFill data-layer="e-desk-tail-shade" style={{background: '#17191d', opacity: closingShade}} />
    </AbsoluteFill>
  );
};

const audience = [
  {id: '01', entry: 6957, active: 7016, panel: 7012, label: 'AI 时代想转型的剪辑师',
    note: '以前一帧一帧死磕 · 现在一人管多条流水线，效率收入翻倍'},
  {id: '02', entry: 6962, active: 7242, panel: 7242, label: '自己管业务的老板',
    note: '把专业内容做成流量 · 不用花大价钱养剪辑团队'},
  {id: '03', entry: 6966, active: 7416, panel: 7416, label: 'MCN 和内容工作室',
    note: '批量跑矩阵号 · 把单条制作成本直接打穿'},
  {id: '04', entry: 6971, active: 7578, panel: 7578, label: '想稳定日更的个人博主',
    note: '不再被剪辑卡死产能 · 精力全放选题和表达'},
] as const;
type Audience = typeof audience[number];

const AudienceRow: FC<{frame: number; item: Audience; order: number; active: boolean}> = ({frame, item, order, active}) => {
  if (frame < item.entry) return null;
  const docked = frame >= 7016;
  const folding = sample(frame, 7010, [0, .024, .073, .12, .22, .342, .52, .655, .76, .86, .927, .975, 1, 1]);
  const x = sample(frame, 7010, [260, 254, 246, 234, 217, 198, 161, 144, 127, 112, 102, 96, 92, 90]);
  const w = sample(frame, 7010, [1400, 1376, 1342, 1293, 1218, 1120, 1012, 918, 830, 752, 690, 650, 632, 630]);
  const top = mix(205, 164, folding) + (docked ? 116 : 160) * order;
  const enterX = sample(frame, item.entry, [8, 4, 2, .5, 0]);
  const enterY = sample(frame, item.entry, [18, 12, 8, 5, 3, 1, 0]);
  const exitX = sample(frame, 7750, [0, 1, 2, 4, 7, 11, 15, 19, 23, 26, 29, 32, 34]);
  const height = docked ? (active ? 98 : 95) : 128;
  const modalDim = docked && !active;
  return (
    <div data-layer={`e-row-${item.id}`} data-active={active} style={{
      ...box(x + (modalDim ? 10 : 0), top + (modalDim ? 2 : 0), w - (modalDim ? 20 : 0), height),
      borderRadius: 24, overflow: 'hidden',
      background: active ? WHITE : modalDim ? 'rgba(31,31,33,.52)' : 'rgba(33,33,35,.81)',
      boxShadow: active ? '0 14px 24px rgba(0,0,0,.22)' : '0 15px 30px rgba(0,0,0,.13)',
      transform: `translate(${enterX + exitX}px, ${enterY}px)`,
      opacity: sample(frame, item.entry, [.12, .32, .54, .72, .85, .96, 1]),
    }}>
      <svg width={w} height={height} style={{display: 'block'}}>
        <InkText x={docked ? 32 : 38} y={docked ? 59 : 80} size={docked ? 32 : 46}
          fill={active ? INK : modalDim ? '#877c98' : LILAC} family={MONO} weight={600}>
          {item.id}
        </InkText>
        <InkText x={docked ? 92 : 116} y={docked ? 60 : 87} size={docked ? 34 : 66}
          fill={active ? INK : modalDim ? '#838384' : WHITE}>
          {item.label}
        </InkText>
      </svg>
    </div>
  );
};

const AudiencePanel: FC<{frame: number; item: Audience}> = ({frame, item}) => {
  const first = item.id === '01';
  const alpha = first
    ? sample(frame, item.panel, [.08, .15, .23, .34, .45, .59, .73, .86, .95, 1])
    : sample(frame, item.panel, [.20, .34, .49, .63, .75, .85, .92, .971, 1]);
  const shift = first ? 0 : sample(frame, item.panel, [42, 26, 15, 8, 4, 2, .5, 0]);
  const tailScale = sample(frame, 7750, [1, 1, .999, .998, .997, .995, .991, .986, .980, .976, .972, .969, .966]);
  return (
    <div data-layer={`e-panel-${item.id}`} style={{...box(760, 165, 1060, 730),
      background: '#212123', borderRadius: 32, boxShadow: '0 28px 56px rgba(0,0,0,.40)',
      transform: `translateX(${shift}px) scale(${tailScale})`, opacity: alpha}}>
      <svg width={1060} height={730} style={{display: 'block'}}>
        <InkText x={40} y={86} size={42} fill={LILAC} family={MONO} weight={600}>{item.id}</InkText>
        <InkText x={110} y={87} size={56} fill={WHITE}>{item.label}</InkText>
        <InkText x={40} y={680} size={32} fill="#e2e2e4" family={TEXT} weight={900}>{item.note}</InkText>
      </svg>
      <div data-layer="e-panel-media" style={{...box(40, 141, 980, 475), borderRadius: 24,
        overflow: 'hidden', background: 'linear-gradient(163deg,#151517,#141416 55%,#18181a)'}}>
        <CaseVisuals id={item.id} frame={frame} />
      </div>
    </div>
  );
};

const AudienceStage: FC<{frame: number}> = ({frame}) => {
  const selected = [...audience].reverse().find(item => frame >= item.active)?.id;
  const panel = [...audience].reverse().find(item => frame >= item.panel);
  return (
    <AbsoluteFill data-layer="e-audience" style={{opacity: sample(frame, 7750,
      [1, .974, .929, .864, .748, .613, .465, .343, .217, .117, .052, .018, .007, 0])}}>
      {audience.map((item, order) => <AudienceRow key={item.id} item={item} order={order} frame={frame} active={selected === item.id} />)}
      {panel && <AudiencePanel key={panel.id} frame={frame} item={panel} />}
    </AbsoluteFill>
  );
};

const EndTitle: FC<{frame: number}> = ({frame}) => {
  const opacity = sample(frame, TITLE_IN, [.018, .055, .104, .20, .35, .49, .64, .76, .87, .94, .981, .997, 1]);
  const rise = sample(frame, TITLE_IN, [27, 23, 19, 16, 13, 11, 8, 5, 3, 1, 0]);
  return (
    <svg width={W} height={H} data-layer="e-end-title" style={{...artboard, opacity, transform: `translateY(${rise}px)`}}>
      <InkText x={268} y={576} size={102} fill={WHITE}>FredTalk</InkText>
      <InkText x={836} y={576} size={102} fill={LILAC}>全自动剪辑工作流</InkText>
    </svg>
  );
};

export const SegmentE: FC = () => {
  const frame = useCurrentFrame();
  if (frame < START || frame >= END) return null;
  return (
    <AbsoluteFill data-layer="e-stage" style={{overflow: 'hidden', pointerEvents: 'none',
      fontSynthesis: 'none', background: INK}}>
      {frame >= DESK_IN && <Desk frame={frame} />}
      {frame >= audience[0].entry && frame < TAIL_OUT && <AudienceStage frame={frame} />}
      {frame < CHAPTER_OUT && <Chapter frame={frame} />}
      {frame >= TITLE_IN && <EndTitle frame={frame} />}
    </AbsoluteFill>
  );
};
