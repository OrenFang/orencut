import type {CSSProperties, FC, ReactNode} from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {at, box, Canvas, GRAY, Ink, INK, InsetCaption, LAVENDER, lerp, Photo, rise, settle, smooth, SOFT_SHADOW,
  Stamp, TEXT, WEB} from './stage';

const CARD_W = 548;
const CARD_H = 446;
const PREVIEW_H = 308;
const CARDS = [
  {title: '封面生图与质检', note: '多比例封面生成与抽帧核对', start: 4551, x: 104},
  {title: '辅助素材补充', note: '按需生成的 B-roll 与补充镜头', start: 4577, x: 686},
  {title: '工程与素材存储', note: '快照留存与公共素材库归档', start: 4616, x: 1268},
] as const;

const CategoryCard: FC<{frame: number; data: typeof CARDS[number]; children: ReactNode}> = ({frame, data, children}) => {
  if (frame < data.start) return null;
  const p = at(frame, [[data.start - 1, 0], [data.start, .25], [data.start + 2, .73], [data.start + 6, .98], [data.start + 11, 1]]);
  return (
    <div data-c-misc-card={data.title} style={{...box(data.x, 200, CARD_W, CARD_H), ...rise(p, 31),
      background: '#fff', borderRadius: 27, boxShadow: '0 12px 26px rgba(15,15,16,.15)', overflow: 'hidden'}}>
      <div style={{...box(0, 0, CARD_W, PREVIEW_H), overflow: 'hidden'}}>{children}</div>
      <Canvas width={CARD_W} height={CARD_H}>
        <Ink x={29} y={364} size={36} family={TEXT} weight={900}>{data.title}</Ink>
        <Ink x={29} y={405} size={25} fill={GRAY} family={TEXT} weight={900}>{data.note}</Ink>
      </Canvas>
    </div>
  );
};

// Four real shot thumbnails from the Mixkit viewport; the dense QA board is editorial, not a recording of execution.
const STOCK_TILES = [[7, 6, 456, 258], [479, 6, 928, 257], [7, 278, 456, 528], [479, 278, 928, 528]] as const;
const stockTile = (tile: number, w: number, h: number, focus = .5): CSSProperties => {
  const [l, t, r, b] = STOCK_TILES[tile];
  const k = Math.max(w / (r - l), h / (b - t));
  return {
    backgroundImage: `url("${staticFile(WEB.stock)}")`, backgroundRepeat: 'no-repeat',
    backgroundSize: `${937 * k}px ${537 * k}px`,
    backgroundPosition: `${-(l * k + ((r - l) * k - w) * focus)}px ${-(t * k + ((b - t) * k - h) * .48)}px`,
  };
};

const CoverGrid: FC<{frame: number}> = ({frame}) => (
  <AbsoluteFill aria-label="Mixkit 实景缩略图；多比例取景版式示例" style={{backgroundColor: '#19191b'}}>
    <Photo src={WEB.stock} alt="" style={{width: 1, height: 1, opacity: 0}} />
    <AbsoluteFill style={{transform: `scale(${1 + .021 * smooth(frame, 4554, 4663)})`, display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: '80px 163px 63px', gap: 1}}>
      {Array.from({length: 18}, (_, i) => {
        const y = Math.floor(i / 6);
        const col = i % 6;
        const which = y === 1 ? [1, 1, 0, 3, 3, 3][col] : (i + y) % 4;
        return <div key={i} style={{...stockTile(which, 90.5, [80, 163, 63][y], .35 + (col % 3) * .16),
          filter: `brightness(${y === 0 ? .46 : y === 1 ? .82 : .69}) saturate(.78)`}} />;
      })}
    </AbsoluteFill>
  </AbsoluteFill>
);

const CorrectionTile: FC<{frame: number; index: number}> = ({frame, index}) => {
  const trigger = index === 0 ? 4639 : 4645;
  if (frame < trigger) return null;
  const entered = settle(frame, trigger - 1, trigger + 8);
  const swapStart = index === 0 ? 4749 : 4754;
  const swap = settle(frame, swapStart, swapStart + 9);
  const cross = settle(frame, index === 0 ? 4691 : 4735, index === 0 ? 4701 : 4747);
  const x = index === 0 ? 63 : 285;
  const y = 85 - (index === 1 ? 3 * (1 - entered) : 0);
  const label = index === 0 ? '画面是假的' : '动画是套的';
  const correction = index === 0 ? '真实画面' : '组件';
  return (
    <div style={{...box(x, y, 199, 121), ...rise(entered, 20), transform: `translateY(${(1 - entered) * 20}px) scale(${1 - .07 * (1 - entered)})`}}>
      <div style={{...box(0, 0, 199, 121), overflow: 'hidden', borderRadius: 12, background: INK,
        boxShadow: '5px 9px 13px rgba(0,0,0,.26)'}}>
        {swap < 1 ? <Canvas width={199} height={121} style={{opacity: 1 - swap,
          transform: `translateY(${-37 * swap}px) scale(${1 - .07 * swap})`}}>
          <Ink x={99.5} y={51} size={26} fill="#707075" align="middle">0{index + 1}</Ink>
          <Ink x={99.5} y={87} size={28} fill="#fff" align="middle">{label}</Ink>
        </Canvas> : null}
        {frame > swapStart ? (
          <div data-c-support-real={index + 1} style={{...box(0, 0, 199, 121), ...rise(swap, 29)}}>
            {index === 0 ? <div aria-label="独立图库中的真实电车缩略图" style={{...box(0, 0, 199, 121),
              ...stockTile(1, 199, 121), filter: 'brightness(.73) saturate(.73)'}} /> :
              <Photo src={WEB.graphics} alt="真实公开的 FredTalk 组件目录"
                style={{objectPosition: '57% 28%', filter: 'brightness(.59) saturate(.73)'}} />}
            <div style={{...box(0, 0, 199, 121), background: 'linear-gradient(180deg, transparent 22%, rgba(15,15,17,.80))'}} />
            <Canvas width={199} height={121}>
              <Ink x={12} y={104} size={27} fill="#fff"><tspan fill={LAVENDER}>0{index + 1}</tspan> {correction}</Ink>
            </Canvas>
          </div>
        ) : null}
      </div>
      {cross > 0 && index === 0 && swap < .67 ? <Stamp cross size={31} style={{...box(180, -9, 31, 31),
        opacity: cross * (1 - swap), transform: `scale(${.70 + .30 * cross})`}} /> : null}
      {swap > .55 ? <Stamp size={31} style={{...box(177, -8, 31, 31), opacity: swap}} /> : null}
    </div>
  );
};

const Support: FC<{frame: number}> = ({frame}) => {
  const after = settle(frame, 4636, 4650);
  const head = settle(frame, 4578, 4589);
  const pillW = 280 - 76 * after;
  const pillH = 41 - 12 * after;
  const cue = frame < 4640 ? 'AI剪的视频一眼就能看出来是 AI 做的' : frame < 4661 ? '我觉得原因就两个' :
    frame < 4749 ? '画面是假的动画是套的' : '我这套东西就专门治这两个毛病';
  return (
    <AbsoluteFill data-c-support-diagram style={{background: '#fff'}}>
      <div style={{...box(134 + 38 * after, 115 - 73 * after, pillW, pillH),
        opacity: head, borderRadius: 24, background: INK, boxShadow: '4px 5px 10px rgba(0,0,0,.22)'}}>
        <Canvas width={pillW} height={pillH}>
          <Ink x={pillW / 2} y={pillH * .66} size={26 - 7.1 * after} align="middle" fill="#fff">
            一眼就能看出是<tspan fill={LAVENDER}>AI</tspan>做的
          </Ink>
        </Canvas>
      </div>
      <CorrectionTile frame={frame} index={0} />
      <CorrectionTile frame={frame} index={1} />
      {frame >= 4583 ? <InsetCaption text={cue} width={CARD_W} top={270} height={28} size={16} /> : null}
    </AbsoluteFill>
  );
};

const Storage: FC<{frame: number}> = ({frame}) => {
  const scroll = at(frame, [[4616, 0], [4634, 0], [4662, 13], [4692, 34], [4722, 63], [4755, 92], [4779, 113]]);
  const music = smooth(frame, 4748, 4766);
  return (
    <AbsoluteFill style={{background: '#efedf3'}}>
      <div style={{...box(82, 0, 384, PREVIEW_H), backgroundColor: '#fff', overflow: 'hidden'}}>
        <Photo src={WEB.library} alt="FredTalk 官方公共视觉库长图；独立采集" style={{
          width: 384, height: 813, top: -scroll, objectFit: 'contain',
        }} />
        {frame > 4748 ? (
          <div data-c-sfx-sample style={{...box(0, 210 + 72 * (1 - music), 384, 98), overflow: 'hidden', opacity: .92 * music}}>
            <Photo src={WEB.music} alt="Mixkit 公开音效库卡片；未调用试听或下载" style={{objectPosition: '50% 47%'}} />
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

export const MiscCosts: FC<{frame: number}> = ({frame}) => {
  if (frame < 4551 || frame >= 4780) return null;
  const ended = at(frame, [[4760, 0], [4764, .15], [4767, .44], [4770, .72], [4773, .90], [4779, 1]]);
  const total = at(frame, [[4681, 0], [4682, .22], [4683, .99], [4689, 1]]);
  const center = at(frame, [[4682, 34], [4683, 16], [4684, 6], [4687, 1], [4691, 0]]);
  return (
    <AbsoluteFill data-c-stage="misc" style={{opacity: 1 - ended,
      transform: `scale(${lerp(1, .932, ended)})`, transformOrigin: '960px 410px'}}>
      <CategoryCard frame={frame} data={CARDS[0]}><CoverGrid frame={frame} /></CategoryCard>
      <CategoryCard frame={frame} data={CARDS[1]}><Support frame={frame} /></CategoryCard>
      <CategoryCard frame={frame} data={CARDS[2]}><Storage frame={frame} /></CategoryCard>
      {frame >= 4682 ? (
        <div data-c-misc-total style={{...box(104, 690 + center, 1712, 152), opacity: total,
          background: INK, borderRadius: 25, boxShadow: SOFT_SHADOW}}>
          <Canvas width={1712} height={152}>
            <Ink x={57} y={90} size={36} fill="#cbcbce" family={TEXT} weight={900}>零碎杂项工具 · 按月均摊</Ink>
            <Ink x={1577} y={113} size={91} fill={LAVENDER} align="end">¥2–3</Ink>
            <Ink x={1592} y={112} size={33} fill="#fff" family={TEXT} weight={900}>/ 期</Ink>
          </Canvas>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
