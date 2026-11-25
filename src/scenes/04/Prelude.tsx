import { demoAsset as staticFile } from '../../demo-media';
import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';

const DISPLAY = '"system-ui", "system-ui", "PingFang SC", sans-serif';
const TEXT = '"system-ui", "PingFang SC", sans-serif';
const MONO = '"FT Mono", ui-monospace, monospace';
const WHITE = '#fff';
const LAVENDER = '#d6beff';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const at = (frame: number, frames: readonly number[], values: readonly number[]) => interpolate(frame, frames, values, clamp);
const easeOut = (x: number) => 1 - (1 - x) ** 3;
const appear = (frame: number, inFrame: number, outFrame: number) => at(frame, [inFrame, outFrame], [0, 1]);
const numberWithCommas = new Intl.NumberFormat('en-US');

const headline = [
  {value: '1', x: 411, width: 122, cue: 28, numeral: true},
  {value: '0', x: 534, width: 123, cue: 31, numeral: true},
  {value: '4', x: 657, width: 130, cue: 33, numeral: true},
  {value: '条', x: 885, width: 216, cue: 36, numeral: false},
  {value: '视', x: 1099, width: 209, cue: 39, numeral: false},
  {value: '频', x: 1298, width: 213, cue: 40, numeral: false},
] as const;

const Headline: React.FC<{frame: number}> = ({frame}) => {
  const relocate = at(frame, [108, 110, 112, 114, 117, 120, 124], [0, 0.09, 0.32, 0.56, 0.8, 0.95, 1]);
  const scale = 1 - 0.14 * relocate;
  const clipWidth = at(frame, [1, 3, 6, 9, 12, 15, 18], [0, 62, 248, 309, 383, 543, 682]);
  return (
    <div style={{position: 'absolute', inset: 0, transformOrigin: '960px 0px', transform: `translate(${-346 * relocate}px, ${70 * relocate}px) scale(${scale})`}}>
      <svg width={1920} height={830} viewBox="0 0 1920 830" style={{display: 'block', overflow: 'visible'}}>
        <defs><clipPath id="prelude-intro-clip"><rect x={620} y={176} width={clipWidth} height={110} /></clipPath></defs>
        <text x={624} y={255} textLength={671} lengthAdjust="spacingAndGlyphs" fontFamily={TEXT} fontSize={54} fontWeight={900} fill="#f4f3f6" clipPath="url(#prelude-intro-clip)">
          最近一个月 · AI 全自动发了
        </text>
        {headline.map(({value, x, width, cue, numeral}) => {
          const drop = at(frame, [cue, cue + 1, cue + 3, cue + 5], [-187, -129, -40, 0]);
          const opacity = at(frame, [cue - 1, cue, cue + 1], [0, 0.12, 1]);
          const baseline = numeral ? 485 : value === '频' ? 492 - 9 * relocate : 494 - 11 * relocate;
          const size = numeral ? 208 : value === '频' ? 214 - 7 * relocate : 207;
          return <text key={value} x={x} y={baseline + drop} opacity={opacity} textLength={width} lengthAdjust="spacingAndGlyphs" fontFamily={DISPLAY} fontSize={size} fontWeight={400} fill={numeral ? LAVENDER : WHITE}>{value}</text>;
        })}
      </svg>
    </div>
  );
};

const Totals: React.FC<{frame: number}> = ({frame}) => {
  const fans = Math.round(at(frame, [111, 114, 117, 120, 124, 129, 135, 138, 141], [0, 20173, 35496, 44141, 49620, 52054, 52622, 52664, 52666]));
  const plays = Math.round(at(frame, [138, 141, 144, 147, 150, 153, 156, 159, 162], [0, 583, 998, 1211, 1312, 1358, 1377, 1384, 1386]));
  const fanText = '+' + numberWithCommas.format(fans);
  const playText = numberWithCommas.format(plays);
  const fanWidth = 58 + (fanText.length - 1) * 64 - (fans >= 1000 ? 31 : 0);
  const playWidth = playText.length * 43 - (plays >= 1000 ? 28 : 0);
  const firstX = 614 - (fanWidth + 119) / 2;
  const secondX = 614 - (playWidth + 210) / 2;
  return (
    <svg width={1920} height={850} viewBox="0 0 1920 850" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <g opacity={appear(frame, 108, 114)} transform={`translate(0 ${37 * (1 - easeOut(appear(frame, 109, 122)))})`} fontFamily={DISPLAY} fontWeight={400}>
        <text x={firstX} y={652} textLength={96} lengthAdjust="spacingAndGlyphs" fontSize={50} fill={WHITE}>涨粉</text>
        <text x={firstX + 118} y={660} textLength={fanWidth} lengthAdjust="spacingAndGlyphs" fontSize={113} fill={LAVENDER}>{fanText}</text>
      </g>
      <g opacity={appear(frame, 137, 142)} fill={WHITE} fontWeight={900}>
        <text x={secondX} y={746} textLength={109} lengthAdjust="spacingAndGlyphs" fontFamily={TEXT} fontSize={36}>播放量</text>
        <text x={secondX + 131} y={744} textLength={playWidth} lengthAdjust="spacingAndGlyphs" fontFamily={DISPLAY} fontSize={64} fontWeight={400}>{playText}</text>
        <text x={secondX + 151 + playWidth} y={744} textLength={58} lengthAdjust="spacingAndGlyphs" fontFamily={DISPLAY} fontSize={64} fontWeight={400}>万</text>
      </g>
    </svg>
  );
};

const TREND = [
  [0, 133], [17, 149], [36, 157], [55, 124], [72, 127], [92, 127], [113, 105], [132, 113], [151, 135], [170, 136], [190, 132], [208, 143],
  [229, 148], [249, 145], [277, 140], [298, 132], [317, 130], [336, 118], [356, 118], [373, 125], [389, 125], [410, 79], [429, 60], [444, 60],
  [463, 12], [484, 28], [505, 42], [524, 53], [536, 58], [552, 77],
] as const;
const path = TREND.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');

const cards = [
  {label: '净增粉丝', value: '+52,666'},
  {label: '作品播放', value: '1,386 万'},
  {label: '全自动发', value: '104 条'},
] as const;

const Analytics: React.FC<{frame: number}> = ({frame}) => {
  const fromRight = at(frame, [108, 110, 111, 112, 114, 117, 120], [224, 144, 99, 64, 29, 7, 0]);
  const chartWidth = at(frame, [113, 117, 120, 128, 135], [0, 167, 286, 480, 555]);
  return (
    <article aria-label="近一个月账号数据总览" style={{position: 'absolute', left: 1120 + fromRight, top: at(frame, [108, 114, 120], [171, 188, 189]), width: 670, height: 592, borderRadius: 26, overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 15px 42px #0005', transform: 'rotate(1.05deg)', opacity: at(frame, [108, 110, 112, 115, 119], [0, 0.47, 0.79, 0.95, 1]), color: '#141417', fontFamily: TEXT}}>
      <div style={{position: 'absolute', top: 30, left: 35, right: 31, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <strong style={{fontSize: 33, fontWeight: 900, lineHeight: 1.2}}>近一个月账号数据总览</strong>
        <span style={{fontFamily: MONO, fontSize: 22, color: '#414146'}}>10.23-11.21</span>
      </div>
      <div style={{position: 'absolute', left: 35, top: 96, display: 'grid', gridTemplateColumns: '201px 199px 164px', gap: 17}}>
        {cards.map(({label, value}) => (
          <div key={label} style={{borderRadius: 19, height: 113, background: '#f4f4f6', boxSizing: 'border-box', padding: '14px 16px 10px', whiteSpace: 'nowrap'}}>
            <div style={{fontSize: 22, fontWeight: 600, color: '#58575d', lineHeight: 1.28}}>{label}</div>
            <div style={{fontSize: 39, fontWeight: 900, lineHeight: 1.18, letterSpacing: -0.8, marginTop: 5}}>{value}</div>
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 32, right: 30, top: 228, height: 321, borderRadius: 17, background: '#fbfbfc'}}>
        <div style={{position: 'absolute', top: 20, left: 28, fontSize: 21, fontWeight: 600, color: '#515055'}}>每日净增粉丝趋势（后台真实导出）</div>
        <svg width={552} height={197} viewBox="0 0 552 197" style={{position: 'absolute', left: 40, top: 94, overflow: 'visible'}}>
          <defs>
            <linearGradient id="prelude-analytics-area" x1="0" x2="0" y1="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor="#a0a0a3" stopOpacity={0.42} />
              <stop offset="1" stopColor="#cccccf" stopOpacity={0.04} />
            </linearGradient>
            <clipPath id="prelude-analytics-wipe"><rect x={-4} y={0} width={chartWidth} height={192} /></clipPath>
          </defs>
          {[31, 103, 174].map((y) => <line x1={0} x2={552} y1={y} y2={y} key={y} stroke="#e9e8eb" strokeWidth={1} />)}
          <g clipPath="url(#prelude-analytics-wipe)">
            <path d={`${path} L552 174 L0 174 Z`} fill="url(#prelude-analytics-area)" />
            <path d={path} fill="none" stroke="#19191c" strokeWidth={4.9} strokeLinejoin="round" strokeLinecap="round" />
          </g>
          <g fill="#86858a" fontFamily={MONO} fontSize={19}>
            <text x={-10} y={205}>10-23</text>
            <text x={257} y={205} textAnchor="middle">11-06</text>
            <text x={536} y={205} textAnchor="end">11-21</text>
          </g>
        </svg>
      </div>
      <div style={{position: 'absolute', left: 33, bottom: 9, fontSize: 19, letterSpacing: 0.4, color: '#88868d'}}>抖音后台涨粉趋势 + 近一个月全自动产出 104 条</div>
    </article>
  );
};

type Corner = readonly [number, number];

// CSS homogeneous mapping from an editable, flat viewport into its measured
// screen-space quadrilateral (TL, TR, BR, BL). The scrolling page stays flat.
const plane = (w: number, h: number, points: readonly [Corner, Corner, Corner, Corner]) => {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = points;
  const dX1 = x1 - x2, dX2 = x3 - x2, dX3 = x0 - x1 + x2 - x3;
  const dY1 = y1 - y2, dY2 = y3 - y2, dY3 = y0 - y1 + y2 - y3;
  const det = dX1 * dY2 - dX2 * dY1;
  const g = (dX3 * dY2 - dX2 * dY3) / det;
  const v = (dX1 * dY3 - dX3 * dY1) / det;
  const values = [(x1 - x0 + g * x1) / w, (y1 - y0 + g * y1) / w, 0, g / w, (x3 - x0 + v * x3) / h, (y3 - y0 + v * y3) / h, 0, v / h, 0, 0, 1, 0, x0, y0, 0, 1];
  return `matrix3d(${values.map((x) => x.toFixed(9)).join(',')})`;
};

const Library: React.FC<{frame: number}> = ({frame}) => {
  const drift = at(frame, [201, 204, 205, 208, 212], [115, 79, 54, 16, 0]);
  const viewportMatrix = plane(1000, 548, [[912 + drift, 155], [1921 + drift, 108], [1931 + drift, 690], [904 + drift, 674]]);
  const scroll = at(frame, [209, 230, 267, 304, 342, 380, 421], [58, 81, 167, 243, 289, 358, 437]);
  const library = staticFile('web/library.jpg');
  return (
    <div aria-label="剪辑 Skill 组件库预览" style={{position: 'absolute', left: 0, top: 0, width: 1000, height: 548, transform: viewportMatrix, transformOrigin: '0 0', background: '#efedf3', borderRadius: 25, overflow: 'hidden', boxShadow: '0 24px 68px #0008'}}>
      <div style={{position: 'absolute', left: 148, top: 25, width: 690, bottom: 0, overflow: 'hidden'}}>
        <Img src={library} alt="公开组件预览的长页" style={{position: 'absolute', display: 'block', width: '100%', height: 'auto', transform: `translateY(${-25 - scroll}px)`}} />
      </div>
      <div style={{position: 'absolute', left: 148, top: 0, width: 690, height: 25, overflow: 'hidden', background: '#f8f6fb'}}>
        <Img src={library} alt="" style={{display: 'block', width: '100%', height: 'auto'}} />
      </div>
      <div style={{position: 'absolute', left: 17, top: 17, padding: '5px 12px 6px', borderRadius: 10, background: '#242229', color: '#fff', fontFamily: TEXT, fontSize: 23, fontWeight: 900, lineHeight: 1.13, whiteSpace: 'nowrap'}}>
        剪辑 Skill 组件库 · 组件预览
      </div>
    </div>
  );
};

const examples = [
  {file: 'demo-finance.jpg', label: '财经解读', x: 929, motion: -1},
  {file: 'demo-anime.jpg', label: '二次元双女主', x: 1307, motion: 1},
] as const;

const ExampleTiles: React.FC<{frame: number}> = ({frame}) => {
  const rise = easeOut(appear(frame, 256, 266));
  return (
    <>
      {examples.map(({file, label, x, motion}) => (
        <div key={file} style={{position: 'absolute', left: x, top: 703, width: 351, height: 196, borderRadius: 16, overflow: 'hidden', background: '#19191c', boxShadow: '0 13px 32px #0007', opacity: appear(frame, 256, 264), transform: `translateY(${13 * (1 - rise)}px)`}}>
          <Img src={staticFile(`web/${file}`)} alt={label} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: motion > 0 ? 'brightness(.88) contrast(1.04)' : undefined, transform: `translateX(${motion * at(frame, [257, 417], [-5, 5])}px) scale(1.035)`}} />
          <AbsoluteFill style={{background: 'linear-gradient(180deg, #17152122, transparent 31%, transparent 70%, #17152171)'}} />
          <div style={{position: 'absolute', left: 14, top: 10, borderRadius: 6, padding: '3px 7px', fontFamily: TEXT, color: WHITE, fontSize: 22, fontWeight: 900, lineHeight: 1.08, background: '#141318bc'}}>{label}</div>
        </div>
      ))}
    </>
  );
};

const Automation: React.FC<{frame: number}> = ({frame}) => {
  const opacity = at(frame, [201, 204, 210, 214, 411, 414, 417, 420, 421, 422], [0, 0.4, 0.97, 1, 1, 0.9, 0.56, 0.19, 0.075, 0]);
  const stageY = at(frame, [201, 205, 212, 413, 417, 420, 422], [16, 9, 0, 0, -16, -37, -51]);
  const cta = easeOut(appear(frame, 314, 321));
  if (opacity <= 0) return null;
  return (
    <AbsoluteFill data-prelude-automation style={{opacity, transform: `translateY(${stageY}px)`}}>
      <svg width={680} height={440} viewBox="0 0 680 440" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <text x={110} y={202} textLength={524} lengthAdjust="spacingAndGlyphs" fontFamily={MONO} fontSize={28} fontWeight={600} fill="#e1d1fa">THIS VIDEO · 100% AUTO-EDITED</text>
        <text x={110} y={314} textLength={531} lengthAdjust="spacingAndGlyphs" fontFamily={DISPLAY} fontSize={91} fontWeight={400} fill={WHITE}>这期视频也是</text>
        <text x={110} y={414} textLength={442} lengthAdjust="spacingAndGlyphs" fontFamily={DISPLAY} fontSize={89} fontWeight={400} fill={LAVENDER}>全自动剪辑</text>
      </svg>
      <div style={{position: 'absolute', left: 110, top: 466, borderLeft: '4px solid #d6beff', paddingLeft: 29, height: 91, opacity: appear(frame, 255, 263), fontFamily: TEXT, whiteSpace: 'nowrap'}}>
        <div style={{color: WHITE, fontSize: 40, fontWeight: 900, lineHeight: 1.13}}>由剪辑 Skill 直接输出</div>
        <div style={{color: '#c4c2c8', fontSize: 30, fontWeight: 600, lineHeight: 1.22, marginTop: 8}}>从脚本、配音到动画，不需要人工剪</div>
      </div>
      {cta > 0 ? (
        <div style={{position: 'absolute', left: 110, top: 605, width: 553, height: 123, borderRadius: 25, background: WHITE, boxShadow: '0 10px 30px #0004', transform: `translateY(${9 * (1 - cta)}px) scale(${0.9 + 0.1 * cta})`, opacity: appear(frame, 314, 320)}}>
          <svg width={553} height={123} viewBox="0 0 553 123" style={{display: 'block'}}>
            <text x={41} y={74} textLength={271} lengthAdjust="spacingAndGlyphs" fontFamily={TEXT} fontSize={34} fontWeight={600} fill="#525158">感兴趣的评论区扣</text>
            <text x={337} y={84} textLength={174} lengthAdjust="spacingAndGlyphs" fontFamily={DISPLAY} fontSize={68} fontWeight={400} fill="#8554e8">Demo</text>
          </svg>
        </div>
      ) : null}
      <Library frame={frame} />
      {frame > 256 ? <ExampleTiles frame={frame} /> : null}
    </AbsoluteFill>
  );
};

export const Prelude: React.FC = () => {
  const frame = useCurrentFrame();
  const statAlpha = at(frame, [200, 204, 208, 211], [1, 0.63, 0.12, 0]);
  const statY = at(frame, [200, 204, 208, 211], [0, -17, -40, -50]);
  return (
    <AbsoluteFill data-prelude style={{overflow: 'hidden', pointerEvents: 'none'}}>
      {frame > 1 && statAlpha > 0 ? (
        <AbsoluteFill data-prelude-statistics style={{opacity: statAlpha, transform: `translateY(${statY}px)`}}>
          <Headline frame={frame} />
          {frame > 108 ? <Analytics frame={frame} /> : null}
          {frame > 108 ? <Totals frame={frame} /> : null}
        </AbsoluteFill>
      ) : null}
      <Automation frame={frame} />
    </AbsoluteFill>
  );
};

export { Headline, Analytics };
