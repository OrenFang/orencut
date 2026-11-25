import type {CSSProperties, FC, ReactNode} from 'react';
import {Img, staticFile} from 'remotion';

const DISPLAY = '"FT Display", "PingFang SC", sans-serif';
const TEXT = '"FT Text", "PingFang SC", sans-serif';
const MONO = '"FT Mono", monospace';
const LILAC = '#d5bfff';
const WHITE = '#fff';

const media = {
  desk: 'full-web/desk-green.jpg',
  finance: 'full-web/case-finance.jpg',
  pixel: 'web/wall-08.jpg',
  pixelWarm: 'full-web/case-pixel.jpg',
  tutorial: 'full-web/case-tutorial.jpg',
  anime: 'full-web/case-anime.jpg',
  dashboard: 'full-web/case-dashboard.jpg',
  profile: 'full-web/case-profile.jpg',
  night: 'full-web/render-bg.jpg',
  horse: 'full-web/test-deepseek.jpg',
  darkAI: 'web/wall-12.jpg',
  software: 'web/wall-01.jpg',
  notes: 'web/wall-03.jpg',
  darkNotes: 'web/wall-09.jpg',
  warmScene: 'web/wall-04.jpg',
  animeWarm: 'web/demo-anime.jpg',
} as const;

const rect = (left: number, top: number, width: number, height: number): CSSProperties =>
  ({position: 'absolute', left, top, width, height});
const tile = (x: number, y: number, w: number, h: number, radius = 15): CSSProperties => ({
  ...rect(x, y, w, h), overflow: 'hidden', borderRadius: radius, background: '#121214',
});
const fill: CSSProperties = {position: 'absolute', inset: 0, width: '100%', height: '100%'};
const ramp = (frame: number, begin: number, end: number) => Math.max(0, Math.min(1, (frame - begin) / (end - begin)));

interface StillProps {
  src: string;
  style?: CSSProperties;
  filter?: string;
  position?: string;
  scale?: number;
  opacity?: number;
}
const Still: FC<StillProps> = ({src, style, filter, position = 'center', scale = 1, opacity = 1}) => {
  const url = staticFile(src);
  return <Img src={url} data-e-src={url} alt="" style={{...fill, display: 'block', objectFit: 'cover',
    objectPosition: position, transform: `scale(${scale})`, filter, opacity, ...style}} />;
};

const labelStyle = (left: number, top: number): CSSProperties => ({
  position: 'absolute', left, top, color: WHITE, background: 'rgba(15,15,17,.77)',
  padding: '4px 13px', borderRadius: 13, fontFamily: TEXT, fontWeight: 900,
  fontSize: 23, lineHeight: '28px', whiteSpace: 'nowrap',
});
const Label: FC<{x?: number; y?: number; children: ReactNode}> = ({x = 14, y = 14, children}) => (
  <div style={labelStyle(x, y)}>{children}</div>
);
const PairFooter: FC<{accent?: boolean; children: ReactNode; end: string}> = ({accent = false, children, end}) => (
  <div style={{position: 'absolute', inset: 'auto 0 0', height: 65, background: '#212125',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 22px 0 19px',
    boxSizing: 'border-box', whiteSpace: 'nowrap', fontFamily: TEXT}}>
    <span style={{color: accent ? LILAC : '#e6e6e8', fontWeight: 900, fontSize: 21}}>{children}</span>
    <span style={{color: '#8b8b8f', fontWeight: 500, fontSize: 16}}>{end}</span>
  </div>
);

const montage = [
  [media.finance, 7059], ['web/wall-06.jpg', 7086], ['web/wall-09.jpg', 7111], [media.pixel, 7116],
  ['web/wall-05.jpg', 7133], [media.anime, 7141], ['web/wall-10.jpg', 7145], [media.tutorial, 7150],
] as const;

const ParallelExample: FC<{frame: number}> = ({frame}) => {
  const reveal = ramp(frame, 7057, 7172);
  const reset = frame >= 7223;
  const filled = frame < 7046 || reset ? 10 : 1 + Math.floor(9 * reveal);
  const screenScale = 1 + .045 * ramp(frame, 7012, 7122);
  return <>
    <div data-layer="e-before-cut" style={{...tile(20, 50, 395, 376), boxShadow: '0 8px 22px rgba(0,0,0,.23)'}}>
      <Still src={media.desk} position="58% 48%" scale={screenScale}
        filter="sepia(.76) saturate(1.12) brightness(1.27)" style={{height: 313}} />
      <div style={{...fill, height: 314, background: 'radial-gradient(ellipse at 43% 28%, rgba(230,154,78,.16), transparent 60%), linear-gradient(0deg, rgba(0,0,0,.73), transparent 68%)'}} />
      <PairFooter end="单线手剪">以前一帧一帧死磕</PairFooter>
    </div>
    <div data-layer="e-parallel-cut" style={{...tile(432, 50, 528, 376), outline: '1px solid rgba(196,178,227,.30)', outlineOffset: -1}}>
      <Still src={media.night} filter="blur(5px) brightness(.62) saturate(.70)" scale={1.08}
        position="54% 56%" style={{height: 311}} />
      <div style={{...fill, height: 312, background: 'linear-gradient(180deg, rgba(6,8,9,.65), transparent 37%, rgba(12,11,12,.45))'}} />
      <div style={{position: 'absolute', top: 16, left: 23, color: '#e7e6e9', fontSize: 17,
        fontFamily: TEXT, fontWeight: 500, whiteSpace: 'nowrap'}}>
        <span style={{fontFamily: MONO, fontWeight: 600}}>EP209 · 24h</span> 多条流水线实录
      </div>
      <svg width={172} height={180} style={rect(67, 47, 172, 180)} viewBox="0 0 172 180">
        <circle cx={86} cy={81} r={73} fill="rgba(17,17,20,.62)" />
        <circle cx={86} cy={81} r={69} fill="none" stroke="#505051" strokeWidth={12} opacity={.72} />
        {Array.from({length: 10}, (_, i) => (
          <circle key={i} cx={86} cy={81} r={69} pathLength={100} fill="none" strokeWidth={12}
            strokeDasharray="8.9 91.1" transform={`rotate(${-87 + i * 36} 86 81)`}
            stroke={i < filled ? WHITE : '#48484b'} />
        ))}
        <path d="M86 13v8 M86 141v9 M19 81h9 M145 81h8" fill="none" stroke="#99999b" strokeOpacity={.65} />
        <rect x={85} y={3} width={8} height={16} rx={1} fill={LILAC} transform="rotate(6 89 11)" />
        <text x={50} y={96} fill={WHITE} fontFamily={DISPLAY} fontSize={38}>24</text>
        <text x={93} y={92} fill={WHITE} fontFamily={TEXT} fontWeight={900} fontSize={15}>小时</text>
        <text x={86} y={171} textAnchor="middle" fill={WHITE} fontFamily={TEXT} fontWeight={900} fontSize={14}>
          做完一期，就排下一期
        </text>
      </svg>
      {!reset && montage.map(([src, enter], i) => frame >= enter && (
        <div key={src} style={{...tile(292 + 92 * (i % 2), 31 + 42 * Math.floor(i / 2), 84, 37, 3),
          opacity: ramp(frame, enter - 1, enter + 4), border: '1px solid rgba(210,199,178,.35)'}}>
          <Still src={src} />
        </div>
      ))}
      {frame >= 7139 && !reset && <div style={{position: 'absolute', right: 81, bottom: 80, color: WHITE,
        fontFamily: TEXT, fontWeight: 900, fontSize: 14}}>
        一天 <span style={{fontFamily: DISPLAY, fontWeight: 400, color: LILAC, fontSize: 26}}>5-10</span> 期
      </div>}
      <PairFooter accent end="全自动并行">一人管多条流水线 · 效率翻倍</PairFooter>
    </div>
  </>;
};

const productionMarkers = [
  {at: 7242, time: '23:31'}, {at: 7263, time: '23:32'}, {at: 7284, time: '23:51'},
  {at: 7302, time: '00:02'}, {at: 7341, time: '01:23'}, {at: 7395, time: '02:17'},
] as const;
const miniclips = [media.software, media.tutorial, media.dashboard, media.pixel, media.notes, media.anime] as const;

const BusinessExample: FC<{frame: number}> = ({frame}) => {
  const tick = productionMarkers.reduce((i, marker, index) => frame >= marker.at ? index : i, 0);
  const secondView = frame >= 7326 && frame < 7368;
  return <>
    <div style={{...tile(20, 22, 460, 261), boxShadow: '0 7px 20px rgba(0,0,0,.26)'}}>
      <Still src={media.finance} scale={secondView ? 1.09 : 1.03} position={secondView ? '59% 50%' : '46% 50%'}
        filter="brightness(.80) saturate(.79)" />
      <div style={{...fill, background: 'linear-gradient(0deg,rgba(5,6,8,.63),transparent 60%),linear-gradient(115deg,rgba(5,6,8,.43),transparent 70%)'}} />
      <Label x={14} y={13}>EP245 · 商业估值</Label>
      {secondView && <div data-layer="e-valuation-copy" style={{...rect(47, 56, 366, 101), textAlign: 'center',
        color: WHITE, textShadow: '0 2px 8px #141416', opacity: ramp(frame, 7324, 7329)}}>
        <div style={{fontFamily: TEXT, fontSize: 17, fontWeight: 900}}>市场给的估值</div>
        <div style={{fontFamily: MONO, fontSize: 9, fontWeight: 600, letterSpacing: 1}}>VALUATION AT IPO PRICE</div>
        <div style={{marginTop: 9, fontFamily: DISPLAY, fontSize: 33, color: '#f5c56f'}}>超过 1 万亿美元</div>
      </div>}
    </div>
    <div style={{...tile(500, 22, 460, 261), background: '#17171a', boxShadow: '0 7px 20px rgba(0,0,0,.26)'}}>
      <Still src={media.dashboard} scale={1.10} filter="brightness(.34) saturate(.7)" opacity={.21} />
      <div data-layer="e-case-clock" style={{position: 'absolute', left: 28, top: 43, width: 405, fontFamily: DISPLAY, fontSize: 52,
        color: WHITE, textAlign: 'center', lineHeight: 1}}>{productionMarkers[tick].time}</div>
      <div style={{...rect(23, 155, 405, 2), background: '#525155'}} />
      <div style={{...rect(23, 155, Math.min(405, tick * 65 + 30), 2), background: '#c5b2e4'}} />
      {miniclips.slice(0, tick + 1).map((src, i) => (
        <div key={src} style={{...rect(21 + i * 66, 102, 58, 77), textAlign: 'center'}}>
          <div style={tile(0, 0, 58, 33, 4)}><Still src={src} /></div>
          <span style={{...rect(22, 49, 12, 12), borderRadius: 8, background: LILAC}} />
          <span style={{...rect(0, 64, 58, 10), color: '#aeabb2', fontFamily: MONO, fontWeight: 600, fontSize: 10}}>
            {productionMarkers[i].time}
          </span>
        </div>
      ))}
      <Label x={14} y={13}>EP209 · 2h 出片</Label>
    </div>
    <div style={{...tile(20, 368, 940, 82, 20), background: '#242426', boxSizing: 'border-box', padding: '0 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', whiteSpace: 'nowrap'}}>
      <span style={{color: WHITE, fontFamily: TEXT, fontWeight: 900, fontSize: 32}}>专业内容直接做成流量</span>
      <span style={{color: LILAC, fontFamily: DISPLAY, fontSize: 34}}>不用花大价钱养剪辑团队</span>
    </div>
  </>;
};

type SampleTileProps = {
  x: number; y: number; w: number; h: number;
  src: string; alternate?: string; dissolve?: number;
  label?: string; shade?: string; position?: string; scale?: number;
};
const SampleTile: FC<SampleTileProps> = ({x, y, w, h, src, alternate, dissolve = 0, label,
  shade = 'brightness(.88)', position, scale}) => (
  <div style={tile(x, y, w, h)}>
    <Still src={src} position={position} scale={scale} filter={shade} />
    {alternate && dissolve > 0 && <Still src={alternate} filter={shade} opacity={dissolve} />}
    {!!label && <Label>{label}</Label>}
  </div>
);

const StudioExample: FC<{frame: number}> = ({frame}) => <>
  <SampleTile x={48} y={50} w={320} h={180} src={media.finance} label="横版财经" scale={1 + .07 * ramp(frame, 7416, 7550)} />
  <SampleTile x={48} y={246} w={320} h={181} src={media.anime} alternate={media.animeWarm}
    dissolve={.39 * ramp(frame, 7523, 7529)} label="二次元科普" />
  <SampleTile x={384} y={50} w={212} h={377} src={media.dashboard} alternate={media.profile}
    dissolve={ramp(frame, 7523, 7528)} label="竖版实片" />
  <SampleTile x={612} y={50} w={320} h={180} src={media.pixelWarm} alternate={media.pixel}
    dissolve={ramp(frame, 7474, 7479)} label="像素风" />
  <SampleTile x={612} y={246} w={320} h={181} src={media.horse} alternate={media.tutorial}
    dissolve={ramp(frame, 7560, 7566)} label="技术教程" />
</>;

const CreatorExample: FC<{frame: number}> = ({frame}) => {
  const scenic = frame < 7620 || (frame >= 7696 && frame < 7723);
  const darkFourth = frame >= 7647 && frame < 7684;
  return <>
    <div style={{...tile(64, 0, 416, 230), background: '#101012'}}>
      <SampleTile x={103} y={36} w={216} h={152} src={media.darkNotes}
        shade="brightness(.36) saturate(.59)" scale={1.04} />
    </div>
    <SampleTile x={497} y={0} w={416} h={230} src={media.dashboard} shade="brightness(.69) saturate(.86)" scale={1.03} />
    <SampleTile x={64} y={246} w={416} h={230} src={scenic ? media.night : media.profile}
      position={scenic ? '53% center' : 'center'} scale={1 + .045 * ramp(frame, 7585, 7720)}
      shade={scenic ? 'brightness(.95)' : 'brightness(.90)'} />
    <SampleTile x={497} y={246} w={416} h={230} src={darkFourth ? media.darkAI : media.warmScene}
      shade={darkFourth ? 'brightness(.76)' : 'brightness(.83)'} />
  </>;
};

export const CaseVisuals: FC<{id: '01' | '02' | '03' | '04'; frame: number}> = ({id, frame}) => {
  switch (id) {
    case '01': return <ParallelExample frame={frame} />;
    case '02': return <BusinessExample frame={frame} />;
    case '03': return <StudioExample frame={frame} />;
    case '04': return <CreatorExample frame={frame} />;
  }
};
