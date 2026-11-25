import type {FC} from 'react';
import {AbsoluteFill} from 'remotion';
import {ImageLayer, Ink, LILAC, MONO, PAPER, box} from './drawing';
import {easeOut, mix, phase, series} from './timing';

type Thumb = Readonly<{asset: string; starts: number; lasts: number; alt: string; replacement?: {at: number; asset: string; alt: string}}>;
const chunks: readonly Thumb[] = [
  {asset: 'web/library.jpg', starts: 3115, lasts: 12, alt: 'Demo 公开视觉库'},
  {asset: 'full-web/renderer-example.jpg', starts: 3130, lasts: 23, alt: 'Demo 官网公开作品审看区'},
  {asset: 'web/demo-finance.jpg', starts: 3151, lasts: 20, alt: '独立行情素材缩图'},
  {asset: 'web/wall-09.jpg', starts: 3161, lasts: 23, alt: 'Demo 官方公开作品截图'},
  {asset: 'web/wall-11.jpg', starts: 3115, lasts: 16, alt: '公开案例缩图'},
  {asset: 'web/demo-anime.jpg', starts: 3128, lasts: 22, alt: '公开案例缩图'},
  {asset: 'web/wall-02.jpg', starts: 3145, lasts: 27, alt: 'Demo 官方公开作品截图',
    replacement: {at: 3084, asset: 'web/wall-08.jpg', alt: 'Demo 官方公开工作流作品截图'}},
  {asset: 'web/wall-12.jpg', starts: 3174, lasts: 24, alt: 'Demo 官方公开作品截图'},
  {asset: 'web/wall-04.jpg', starts: 3115, lasts: 12, alt: '暖色实拍案例缩图',
    replacement: {at: 3166, asset: 'web/wall-05.jpg', alt: 'Demo 官方公开作品截图'}},
  {asset: 'web/wall-03.jpg', starts: 3129, lasts: 19, alt: 'Demo 官方公开作品截图'},
  {asset: 'web/wall-01.jpg', starts: 3141, lasts: 18, alt: 'Demo 官方公开作品截图'},
  {asset: 'web/wall-06.jpg', starts: 3166, lasts: 30, alt: 'Demo 官方公开作品截图'},
];

const workflowBg = '0 16px 42px rgba(5,5,8,.44)';

const SeqB: FC<{frame: number}> = ({frame}) => {
  const progressPoints = Math.max(0, (frame - 2895) * .0974 + .46);
  const progressWidth = Math.min(1620, progressPoints * 16.2);
  const entry = series(frame, 2813, [0, .05, .13, .23, .35, .49, .63, .75, .86, .94, .98, 1]);
  return (
    <div data-layer="b-sequential-window" style={{...box(110, 185, 1700, 195), opacity: entry,
      transform: `translateY(${(1 - entry) * 18}px)`, borderRadius: 27, backgroundColor: '#212123', boxShadow: workflowBg}}>
      <svg width={1700} height={195} style={{display: 'block'}}>
        <defs><clipPath id="ft-b-seq-progress"><rect x={40} y={93} width={1620} height={54} rx={12} /></clipPath></defs>
        <Ink x={40} y={60} size={34} fill="#d5d5d6">传统剪辑软件 · 单条时间线从头到尾慢慢导</Ink>
        <Ink x={1660} y={58} size={29} family={MONO} weight={600} fill="#ff8286" align="end">
          {`${Math.round(progressPoints)}% · 顺序排队`}
        </Ink>
        <g clipPath="url(#ft-b-seq-progress)">
          <rect x={40} y={93} width={1620} height={54} fill="#151517" />
          {progressWidth > 0 && <rect x={40} y={93} width={progressWidth} height={54} fill="#555556" />}
          <rect x={40 + progressWidth} y={93} width={6} height={54} fill="#ff8286" />
        </g>
      </svg>
    </div>
  );
};

const ChunkB: FC<{chunk: Thumb; index: number; frame: number}> = ({chunk, index, frame}) => {
  const col = index % 4;
  const row = Math.floor(index / 4);
  const progress = phase(frame, chunk.starts, chunk.starts + chunk.lasts);
  const activation = easeOut(Math.min(1, progress * 1.58));
  const media = chunk.replacement && frame >= chunk.replacement.at ? chunk.replacement : chunk;
  const assetMotion = phase(frame, 3001, 3249);
  const objectPosition = media.asset === 'web/library.jpg' ? `50% ${mix(8, 22, assetMotion)}%` : '50% 50%';
  return (
    <div data-b-chunk={index + 1} style={{...box(288 + col * 346, 88 + row * 124, 330, 109), borderRadius: 9,
      overflow: 'hidden', backgroundColor: '#151517'}}>
      <ImageLayer asset={media.asset} alt={media.alt} style={{...box(69, 0, 192, 109), objectFit: 'cover', objectPosition,
        opacity: mix(.32, .98, activation)}} />
      <svg width={330} height={109} style={{...box(0, 0, 330, 109), display: 'block'}}>
        <rect x={10} y={5} width={72} height={28} rx={5} fill="#131318" fillOpacity={.72} />
        <Ink x={17} y={26} size={19} family={MONO} weight={600} fill={activation > .5 ? '#e6d5ff' : '#9996a1'}>
          {`块 #${index + 1}`}
        </Ink>
        <rect y={103} width={330} height={6} fill="#111113" />
        {progress > 0 && <rect y={103} width={330 * progress} height={6} fill={LILAC} />}
      </svg>
    </div>
  );
};

const ParallelB: FC<{frame: number}> = ({frame}) => {
  const entry = series(frame, 3000, [0, .06, .18, .32, .45, .59, .70, .80, .9, .96, 1]);
  const running = frame >= 3114;
  const count = frame === 3116 ? 3 : Math.round(phase(frame, 3114, 3204) * 100);
  return (
    <div data-layer="b-parallel-window" style={{...box(110, 410, 1700, 475), borderRadius: 27, overflow: 'hidden',
      backgroundColor: '#212123', boxShadow: workflowBg, opacity: entry, transform: `translateY(${(1 - entry) * 22}px)`}}>
      <svg width={1700} height={475} style={{...box(0, 0, 1700, 475), display: 'block'}}>
        <Ink x={40} y={65} size={39}>Remotion · 万帧切块多机并行渲染</Ink>
        <Ink x={694} y={64} size={19} weight={500} fill="#908b99">流程示意</Ink>
        <Ink x={1660} y={61} size={29} family={MONO} weight={600} fill="#ddccff" align="end">
          {running ? `${count}% · 多开几台成倍提速` : '切分分块中...'}
        </Ink>
        {[0, 1, 2].map(row => <Ink key={row} x={40} y={153 + row * 124} size={23} fill="#e0e0e1" family={MONO} weight={600}>
          {`4090 节点 #0${row + 1}`}
        </Ink>)}
      </svg>
      {chunks.map((chunk, i) => <ChunkB key={i} frame={frame} index={i} chunk={chunk} />)}
    </div>
  );
};

export const WorkflowB: FC<{frame: number}> = ({frame}) => {
  const out = series(frame, 3234, [1, 1, 1, .989, .963, .923, .873, .812, .735, .645, .55, .447,
    .36, .27, .181, .113, .057, .025, 0]);
  return (
    <AbsoluteFill data-layer="b-workflow" style={{opacity: out, color: PAPER, fontSynthesis: 'none'}}>
      <SeqB frame={frame} />
      {frame >= 3001 && <ParallelB frame={frame} />}
    </AbsoluteFill>
  );
};