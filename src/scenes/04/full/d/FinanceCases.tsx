import type {CSSProperties, FC, SVGProps} from 'react';
import {Img, staticFile} from 'remotion';

const DISPLAY = '"FT Display", "PingFang SC", sans-serif';
const TEXT = '"FT Text", "PingFang SC", sans-serif';
const CAPTION = '"FT Caption", "PingFang SC", sans-serif';
const MONO = '"FT Mono", monospace';
const WHITE = '#f3f3f5';
const LILAC = '#d7bcff';
const GOLD = '#f2c46d';
const CORAL = '#f07871';

const FINANCE_IN = 5820;
const FINANCE_OUT = 6071;
const CASES_OUT = 6261; // f6260 still fully composed; f6261 is the green backdrop hard cut.

const place = (left: number, top: number, width: number, height: number): CSSProperties => ({
  position: 'absolute', left, top, width, height,
});
const canvas = place(0, 0, 1920, 1080);
const fit: CSSProperties = {...place(0, 0, 0, 0), width: '100%', height: '100%'};
const panel = {borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 34px rgba(0,0,0,.26)'};
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const ramp = (frame: number, a: number, b: number) => Math.max(0, Math.min(1, (frame - a) / (b - a)));
const smooth = (frame: number, a: number, b: number) => {
  const t = ramp(frame, a, b);
  return t * t * (3 - 2 * t);
};
const series = (frame: number, first: number, values: readonly number[]) => {
  const i = Math.max(0, Math.min(values.length - 1, frame - first));
  return lerp(values[Math.floor(i)], values[Math.ceil(i)], i % 1);
};
const curve = (frame: number, knots: readonly (readonly [number, number])[]) => {
  if (frame <= knots[0][0]) return knots[0][1];
  for (let i = 1; i < knots.length; i++) {
    const [end, value] = knots[i];
    if (frame <= end) return lerp(knots[i - 1][1], value, ramp(frame, knots[i - 1][0], end));
  }
  return knots[knots.length - 1][1];
};

const Ink: FC<SVGProps<SVGTextElement>> = (props) => (
  <text fill={WHITE} fontFamily={DISPLAY} {...props} />
);

const EpisodeTag: FC<{children: string; onLight?: boolean; kind: '独立替图' | '图解复刻'}> = ({children, onLight = false, kind}) => (<>
  <div style={{position: 'absolute', zIndex: 2, left: 14, top: 13, padding: '3px 11px 4px',
    borderRadius: 8, background: onLight ? '#303034' : 'rgba(15,15,19,.76)', color: '#fff',
    font: `900 22px/1.16 ${TEXT}`, whiteSpace: 'nowrap'}}>{children}</div>
  <div data-asset-disclosure={kind} style={{position: 'absolute', zIndex: 3, right: 14, top: 13,
    padding: '4px 9px 5px', borderRadius: 6, background: '#17141eef', color: '#eee4ff',
    font: `900 18px/1.12 ${TEXT}`, whiteSpace: 'nowrap'}}>{kind}</div>
</>);

type Media = {
  file: string;
  size: readonly [number, number];
  crop: readonly [number, number, number, number]; // half-open source-pixel edge box
  flipX?: boolean;
};

/** Map a documented pixel crop directly into its clipping box; no canvas/baked composites. */
const MediaCrop: FC<{asset: Media; alt?: string; style?: CSSProperties}> = ({asset, alt = '', style}) => {
  const [left, top, right, bottom] = asset.crop;
  const [width, height] = asset.size;
  const w = right - left;
  const h = bottom - top;
  return <div style={{...fit, overflow: 'hidden', transform: asset.flipX ? 'scaleX(-1)' : undefined, ...style}}>
    <Img src={staticFile(asset.file)} alt={alt} name={asset.file} showInTimeline={false}
      style={{position: 'absolute', left: `${-100 * left / w}%`, top: `${-100 * top / h}%`,
        width: `${100 * width / w}%`, height: `${100 * height / h}%`, maxWidth: 'none', maxHeight: 'none'}} />
  </div>;
};

const FINANCE_AMBIENT: Media = {file: 'full-web/case-finance.jpg', size: [1280, 720], crop: [620, 0, 1025, 720]};
const FINANCE_INSERT: Media = {...FINANCE_AMBIENT, crop: [596, 32, 1204, 656]};

// All shopping labels are quotes from the original diagram, not a regenerated order/account.
const BILLS = [
  {title: '厨房纸 · 抖音电商', small: '省 ¥10.47', amount: '¥27.9 → 17.43', accent: GOLD},
  {title: '羽绒服 · 同款同尺码', small: '退单重买', amount: '便宜 ¥40', accent: GOLD},
  {title: '凑单 · 满200减25', small: '', amount: '满200减25', accent: WHITE},
] as const;

const BillDiagram: FC<{frame: number; opacity: number}> = ({frame, opacity}) => (
  <svg data-layer="finance-editorial-bills" width={364} height={306} viewBox="0 0 364 306" style={{
    ...place(25, 137, 364, 306), opacity, overflow: 'visible',
  }}>
    <defs>
      <linearGradient id="fc-bill-row" x1="0" x2="1" y1="0" y2="0">
        <stop stopColor="#373f54" /><stop offset="1" stopColor="#262c38" />
      </linearGradient>
    </defs>
    <rect x="1.5" y="1.5" width="361" height="303" rx="10" fill="#101722" fillOpacity=".95"
      stroke="#9fadd5" strokeOpacity=".43" strokeWidth="2" />
    <Ink x={182} y={35} fontSize={24} textAnchor="middle" fontStyle="italic">小A的三笔账</Ink>
    <Ink x={182} y={56} fontSize={13} textAnchor="middle" fill="#a0a9ba" fontFamily={TEXT}>原片图解复刻</Ink>
    {BILLS.map((row, i) => {
      const live = i < 2 ? 1 : smooth(frame, 6000, 6008);
      return <g key={row.title} transform={`translate(13 ${70 + i * 72})`}>
        <rect width="338" height="65" rx="4" fill="url(#fc-bill-row)" opacity={lerp(.34, 1, live)} />
        <Ink x={13} y={51} fontSize={42} fill="#80899e" opacity={lerp(.19, .46, live)}>{i + 1}</Ink>
        {live > 0 && <g opacity={live}>
          <Ink x={50} y={24} fontFamily={TEXT} fontWeight={900} fontSize={17}>{row.title}</Ink>
          <Ink x={50} y={52} fill={row.accent} fontSize={24} fontStyle="italic">{row.amount}</Ink>
          {row.small && <>
            <rect x="234" y="9" width="88" height="19" rx="3" fill={i === 0 ? '#e5b963' : '#bd553f'} />
            <Ink x={278} y={23} fill={i === 0 ? '#261b0f' : WHITE} textAnchor="middle"
              fontFamily={TEXT} fontWeight={900} fontSize={13}>{row.small}</Ink>
          </>}
        </g>}
      </g>;
    })}
  </svg>
);

const PortraitExample: FC<{frame: number}> = ({frame}) => {
  const photo = frame < 5927 ? 0 : 1 - smooth(frame, 5994, 5998);
  const enter = series(frame, FINANCE_IN, [.045, .075, .13, .22, .32, .44, .55, .66, .78, .88, .94, .985, 1]);
  const y = series(frame, FINANCE_IN, [68, 64, 58, 50, 42, 34, 26, 18, 12, 8, 4, 2, 0]);
  const x = series(frame, FINANCE_IN, [4, 4, 2, 2, 2, 2, 2, 0]);
  return <div data-layer="finance-portrait" style={{...place(217, 147, 414, 737), ...panel,
    opacity: enter, transform: `translate(${x}px, ${y}px)`, background: '#070810'}}>
    <MediaCrop asset={FINANCE_AMBIENT} style={{
      transform: 'scale(1.14)', filter: 'blur(17px) brightness(.47) saturate(.78)',
    }} />
    <div style={{...fit, background: 'linear-gradient(180deg,#090810 0%,transparent 34%,#090810 100%)'}} />
    {photo < 1 && <BillDiagram frame={frame} opacity={1 - photo} />}
    {photo > 0 && <div data-layer="finance-independent-insert" style={{...place(55, 117, 304, 312),
      borderRadius: 6, overflow: 'hidden', opacity: photo, boxShadow: '0 6px 26px #0008'}}>
      <MediaCrop asset={FINANCE_INSERT} alt="独立财经素材" style={{
        transform: `scale(${lerp(1, 1.05, ramp(frame, 5927, 5995))})`,
      }} />
      <span style={{position: 'absolute', left: 10, bottom: 11, borderRadius: 4, padding: '4px 8px',
        font: `900 15px ${TEXT}`, background: '#e9bd6e', color: '#2a1d1a'}}>独立行情照片</span>
    </div>}
    <EpisodeTag kind="独立替图">EP231 · 9:16 竖版</EpisodeTag>
    <div style={{...place(20, 509, 374, 36), color: WHITE, textAlign: 'center',
      font: `400 25px/1.32 ${CAPTION}`, textShadow: '0 2px 6px #000'}}>
      {photo >= .5 ? '独立图像替代' : frame < 5995 ? '原片消费案例 · 图解复刻' : '为了凑满200减25'}
    </div>
  </div>;
};

const PROFIT_KEYS = [[5823,0],[5827,59],[5828,76],[5829,91],[5830,104],[5831,117],[5832,129],
  [5835,160],[5838,183],[5841,199],[5844,210],[5847,217],[5850,221],[5853,222]] as const;

const Profit: FC<{frame: number}> = ({frame}) => {
  const value = Math.round(curve(frame, PROFIT_KEYS));
  const h = 199 * value / 222;
  return <g data-layer="finance-profit-bars">
    <Ink x={77} y={122} fontSize={27} fontStyle="italic">前三季度利润</Ink>
    <Ink x={77} y={141} fontSize={11} fontFamily={MONO} letterSpacing="1.2" fill="#a6a4a4">NET PROFIT · Q1–Q3 · 亿元</Ink>
    <Ink x={62} y={225} fontSize={52} fill="url(#fc-gold)" fontStyle="italic"
      opacity={series(frame, 5856, [0, .25, .72, .96, 1])}>+212%</Ink>
    <path d="M120 380H416" stroke="#a5aab0" strokeOpacity=".55" strokeWidth="1" />
    <path d="M144 380V324Q144 316 151 316H233Q240 316 240 324V380Z" fill="url(#fc-blue)"
      stroke="#869bbe" strokeOpacity=".5" strokeWidth="1.5" />
    <Ink x={191} y={307} textAnchor="middle" fontSize={26} fontStyle="italic">71<tspan fontSize="15"> 亿</tspan></Ink>
    <Ink x={191} y={405} textAnchor="middle" fontSize={22} fontStyle="italic">2025</Ink>
    {value > 0 && <>
      <path d={`M300 380V${388 - h}Q300 ${380 - h} 308 ${380 - h}H388Q396 ${380 - h} 396 ${388 - h}V380Z`}
        fill="url(#fc-gold)" stroke="#f9d888" strokeOpacity=".58" strokeWidth="1.5" />
      <Ink x={348} y={372 - h} textAnchor="middle" fontSize={28} fill={GOLD} fontStyle="italic">{value}<tspan fontSize="15"> 亿</tspan></Ink>
    </>}
    <Ink x={348} y={405} textAnchor="middle" fontSize={22} fontStyle="italic">2026</Ink>
  </g>;
};

// Shape reenacted from the visible trajectory; no fabricated ticks, dates or intermediate prices.
const MARKET_TRACE = 'M568 264L580 246 586 251 595 231 601 246 608 250 615 231 621 237 630 217 638 229 645 232 651 242 657 236 664 245 672 260 678 247 683 270 691 250 699 273 705 268 712 277 716 267 722 289 728 279 735 290 744 275 750 289 757 281 764 292 769 287 775 292 784 284 790 292 798 282 805 288 811 281 819 290 826 281 833 285 842 282 848 301 855 298 861 313 868 307 874 315 879 315 886 325 891 318 898 332 905 324 911 337 917 333 923 342 930 328 939 342 948 351';
const TRACE_KEYS = [[5880,0],[5882,.02],[5895,.16],[5904,.23],[5940,.56],[5972,.94],[5977,1]] as const;

const Market: FC<{frame: number}> = ({frame}) => {
  const edge = ramp(frame, 5863, 5867);
  const draw = curve(frame, TRACE_KEYS);
  return <g data-layer="finance-market-trace" opacity={edge}>
    <defs>
      <clipPath id="fc-market-track-clip"><rect x="563" y="196" width={389 * draw} height="170" /></clipPath>
    </defs>
    <Ink x={568} y={122} fontSize={27} fontStyle="italic">市值</Ink>
    <Ink x={568} y={141} fontSize="11" fontFamily={MONO} letterSpacing="1.2" fill="#a6a4a4">MARKET CAP · 亿元 · MAY – NOV 16</Ink>
    {frame >= 5894 && <g opacity={ramp(frame, 5893, 5898)}>
      <path d="M630 217H959" stroke={GOLD} strokeOpacity=".31" strokeDasharray="5 6" />
      <circle cx="630" cy="217" r="7" fill={GOLD} style={{filter: 'drop-shadow(0 0 7px #f9b54a)'}} />
      <Ink x={630} y={203} textAnchor="middle" fontSize={25} fill={GOLD} fontStyle="italic">1.67 万亿</Ink>
    </g>}
    {draw > 0 && <g clipPath="url(#fc-market-track-clip)">
      <path d={MARKET_TRACE} fill="none" stroke="url(#fc-line)" strokeWidth="11" strokeOpacity=".21"
        style={{filter: 'blur(5px)'}} />
      <path d={MARKET_TRACE} fill="none" stroke="url(#fc-line)" strokeWidth="3.5"
        strokeLinejoin="round" strokeLinecap="round" />
    </g>}
    {frame >= 5978 && <g opacity={ramp(frame, 5977, 5984)}>
      <circle cx="948" cy="351" r="7" fill={CORAL} style={{filter: 'drop-shadow(0 0 8px #fb6255)'}} />
      <Ink x={958} y={387} textAnchor="end" fontSize={26} fill={CORAL} fontStyle="italic">4818 亿</Ink>
    </g>}
    {frame >= 5987 && <Ink x={963} y={194} textAnchor="end" fill={CORAL} fontSize="49" fontStyle="italic"
      opacity={series(frame, 5987, [.28, .71, .96, 1])}>-71%</Ink>}
  </g>;
};

const FinanceChart: FC<{frame: number}> = ({frame}) => {
  const pan = smooth(frame, 5872, 5885);
  const settle = smooth(frame, 6006, 6018);
  const x = lerp(lerp(162, -431, pan), 0, settle);
  const y = lerp(-69, 0, settle);
  const scale = lerp(1.25, 1, settle);
  const summary = series(frame, 6003, [.16, .42, .69, .84, .94, 1]);
  const intro = series(frame, FINANCE_IN, [.072, .15, .24, .34, .46, .57, .66, .74, .82, .92, .97, .99, 1]);
  const enterX = series(frame, FINANCE_IN, [64, 60, 54, 48, 40, 32, 24, 18, 12, 6, 2, 0]);
  return <div data-layer="finance-landscape" style={{...place(679, 147, 1024, 577), ...panel,
    transform: `translateX(${enterX}px)`, opacity: intro, background: 'radial-gradient(ellipse at 30% 48%,#111d2c 0%,#080d16 49%,#06070a 88%)'}}>
    <div style={{...place(76, lerp(230, 94, settle), 650, 160), pointerEvents: 'none', opacity: .13,
      transform: `translateX(${lerp(28, 250, pan) - 92 * settle}px) rotate(${lerp(31, -5, settle)}deg)`,
      background: 'radial-gradient(ellipse at center,#dbd2b576 0%,#96aec674 34%,transparent 72%)', filter: 'blur(31px)'}} />
    <svg width={1024} height={577} style={{...fit, display: 'block'}}>
      <defs>
        <linearGradient id="fc-blue" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#5a6b92" /><stop offset="1" stopColor="#2b354d" />
        </linearGradient>
        <linearGradient id="fc-gold" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#f8da85" /><stop offset="1" stopColor="#b48838" />
        </linearGradient>
        <linearGradient id="fc-line" x1="0" x2="1" y1="0" y2="0">
          <stop stopColor="#fff0bd" /><stop offset=".35" stopColor="#e7b17a" /><stop offset="1" stopColor="#e6574f" />
        </linearGradient>
      </defs>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <path d="M512 165V411" stroke="#9ca9ba" strokeOpacity=".14" />
        <Profit frame={frame} />
        {frame >= 5864 && <Market frame={frame} />}
        {frame >= 6003 && <g opacity={summary}>
          <circle cx="512" cy="269" r="30" stroke="#d2aa62" fill="#09101a" strokeWidth="1.5" />
          <Ink x={512} y={277} textAnchor="middle" fill={GOLD} fontSize="27" fontStyle="italic">VS</Ink>
        </g>}
      </g>
      {frame >= 6003 && <g opacity={summary}>
        <Ink x={512} y={57} textAnchor="middle" fontSize="31" fontStyle="italic">生意越做越大，市值却跌掉七成</Ink>
        <Ink x={512} y={83} textAnchor="middle" fontFamily={MONO} fontSize="12" letterSpacing="2.3" fill="#b9baca">PROFIT UP · MARKET CAP DOWN</Ink>
      </g>}
      <Ink x={19} y={489} fontFamily={TEXT} fontSize="12" fill="#ababba" opacity={.67}>
        原片来源标注：公司三季报（归母净利 222.38 亿元，+211.81%）；新浪行情收盘价 × 总股本约 11.78 亿股估算
      </Ink>
      <Ink x={512} y={533} textAnchor="middle" fontFamily={CAPTION} fontSize="34">
        {frame >= 6003 ? '生意越做越大市值却跌掉了七成' : frame >= 5956 ? '跌到了不到五千亿' :
          frame >= 5874 ? '可它的市值从最高一万六千多亿' : '今年前三季度它的利润涨了两倍多'}
      </Ink>
    </svg>
    <EpisodeTag kind="图解复刻">EP233 · 16:9 横版</EpisodeTag>
    <div style={{position: 'absolute', right: 19, bottom: 19, color: '#a5a5b2',
      font: `600 13px ${TEXT}`}}>图解复刻 · 原片口径</div>
  </div>;
};

const PriceStrip: FC<{frame: number}> = ({frame}) => {
  if (frame < 5932) return null;
  const opacity = series(frame, 5932, [.63, .97, 1]);
  const dy = series(frame, 5932, [11, 2, 0]);
  const strike = frame < 5998 ? 0 : series(frame, 5998, [.22, .56, .86, .98, 1]);
  const quote = series(frame, 6000, [.51, .93, 1]);
  return <div data-layer="finance-price" style={{...place(679, 748, 1024, 137), borderRadius: 25,
    border: '1px solid rgba(255,255,255,.13)', boxSizing: 'border-box',
    background: '#202024', boxShadow: '0 9px 26px #0003', opacity, transform: `translateY(${dy}px)`}}>
    <svg width={1024} height={137} style={{display: 'block'}}>
      <Ink x={48} y={92} fontSize={26} fontFamily={TEXT} fontWeight={900} fill="#b9b8bc">市面找人剪</Ink>
      <Ink x={193} y={103} fontSize={84} fill={CORAL} opacity={lerp(1, .54, strike)}
        textLength={246} lengthAdjust="spacingAndGlyphs">¥6,000</Ink>
      {strike > 0 && <path data-layer="price-strike" d={`M183 73H${183 + strike * 258}`}
        stroke={CORAL} strokeWidth="6" strokeLinecap="round" />}
      {frame >= 6000 && <g opacity={quote} transform={`translate(${series(frame, 6000, [9, 2, 0])} 0)`}>
        <path d="M472 73H498M487 60L498 73 487 86" stroke="#97949b" strokeWidth="4" fill="none" />
        <Ink x={540} y={96} fontSize={26} fontFamily={TEXT} fontWeight={900} fill="#ceccd1">这套流程</Ink>
        <Ink x={655} y={104} fontSize={94} fill={LILAC} textLength="253" lengthAdjust="spacingAndGlyphs">约¥19</Ink>
        <Ink x={928} y={97} fontSize={25} fontFamily={TEXT} fontWeight={600} fill="#a6a3ac">/ 条</Ink>
      </g>}
      <Ink x={996} y={24} textAnchor="end" fontFamily={TEXT} fontSize={14} fill="#a29da9">原片报价 · 图解复刻</Ink>
    </svg>
  </div>;
};

const FinanceStage: FC<{frame: number}> = ({frame}) => {
  const out = series(frame, 6060, [1, .94, .85, .73, .62, .50, .37, .28, .17, .09, .02, 0]);
  const slide = series(frame, 6060, [0,-6,-14,-24,-36,-48,-60,-70,-78,-86,-90,-92]);
  const title = series(frame, FINANCE_IN, [0,.008,.024,.089,.179,.303,.441,.58,.72,.85,.94,1]);
  return <div data-layer="finance-stage" style={{...canvas, opacity: out, transform: `translateX(${slide}px)`}}>
    <svg width={1920} height={150} style={{...place(0, 0, 1920, 150), opacity: title}}>
      <Ink x={218} y={119} fontSize={52}>小Lin说风格</Ink>
      <Ink x={529} y={114} fill="#babbbe" fontFamily={TEXT} fontWeight={900} fontSize="25">
        高信息密度财经解读 · 横竖版图解复刻
      </Ink>
    </svg>
    <PortraitExample frame={frame} />
    <FinanceChart frame={frame} />
    <PriceStrip frame={frame} />
  </div>;
};

const ANIME_SOLO: Media = {file: 'web/wall-11.jpg', size: [1080, 540], crop: [24, 0, 888, 486], flipX: true};
const ANIME_DUO: Media = {file: 'web/demo-anime.jpg', size: [1280, 720], crop: [0, 0, 1280, 720]};
const PIXEL_WARM: Media = {file: 'web/wall-10.jpg', size: [1080, 540], crop: [106, 124, 969, 364]};
const PIXEL_NAVY: Media = {file: 'web/wall-07.jpg', size: [1080, 540], crop: [415, 124, 1025, 290]};
const HORSE_STILL: Media = {file: 'full-web/test-deepseek.jpg', size: [1280, 720], crop: [0, 0, 1280, 720]};

const CASE_W = 544;
const CASE_H = 306;
const CASES_IN = 6061;
const CASES = [
  {key: 'anime', x: 116, at: 6062, defocus: 6119, episode: 'EP234 · 二次元双女主',
    title: '二次元日漫科普', detail: '双音色对话 · 动作立绘全自动'},
  {key: 'pixel', x: 688, at: 6119, defocus: 6149, episode: 'EP156 · 像素风闯关',
    title: '像素游戏闯关风', detail: '精灵动画 · 零手动剪辑输出'},
  {key: 'tutorial', x: 1260, at: 6149, defocus: 6190, episode: 'EP70 · DeepSeek 实战',
    title: '深度技术实战教程', detail: '立体 3D + 实操演示自动合成'},
] as const;

type CaseSpec = typeof CASES[number];

const PIXEL_TILES = [
  {x: 84, at: 6140, label: '配音', d: 'M4 0H16V2H18V12H16V17H4V12H2V2H4Z M0 12H3V17H6V20H14V17H17V12H20V18H17V22H12V26H17V29H3V26H8V22H3V18H0Z'},
  {x: 208, at: 6155, label: '字幕', d: 'M1 2H25V23H1Z M4 5V19H22V5Z M6 11H13V14H6Z M15 11H20V14H15Z M6 16H20V18H6Z'},
  {x: 331, at: 6170, label: '像素动画', d: 'M0 2H26V22H0Z M4 6V18H22V6Z M8 26H18V29H8Z M11 20H15V26H11Z M10 8H13V10H17V13H13V15H10Z'},
  {x: 465, at: 6197, label: '成片', d: 'M0 5H4V9H8V6H10V1H14V6H17V9H21V5H25L22 21H3Z M4 24H21V27H4Z'},
] as const;

const PixelExample: FC<{frame: number}> = ({frame}) => {
  if (frame < 6130) {
    return <div data-layer="pixel-warm" style={{...fit,
      background: 'repeating-conic-gradient(from 5deg at 49% 55%, #9b352b 0deg 15deg, #bb4b2e 15deg 30deg)'}}>
      <div style={{...place(29, 91, 486, 135), boxShadow: '0 6px 0 #552020, 0 12px 30px #4d1c1d'}}>
        <MediaCrop asset={PIXEL_WARM} alt="独立像素画面：应用架构图" />
      </div>
    </div>;
  }
  const relax = .52 * smooth(frame, 6241, 6246);
  return <div data-layer="pixel-navy" style={{...fit, background: 'linear-gradient(170deg,#1c2851,#11162e)'}}>
    <div style={{...fit, background: 'repeating-linear-gradient(0deg,#080a1b21 0px 2px,transparent 2px 5px)'}} />
    <MediaCrop asset={PIXEL_NAVY} alt="独立像素画面：像素关卡底纹"
      style={{...place(25, 107, 365, 99), boxShadow: '0 5px 0 #09172a'}} />
    <svg width={CASE_W} height={CASE_H} style={fit}>
      <path d="M412 107H518V206H412Z" fill="#f1d599" stroke="#b79861" strokeWidth="4" />
      <path d="M416 187H515V203H416Z" fill="#bb925b" />
      <path d="M24 216H520V229H24Z" fill="#35436d" />
      <path d="M25 222H518" stroke="#546287" strokeWidth="5" strokeDasharray="10 6" />
      {PIXEL_TILES.map((tile, i) => {
        const dim = 1 - smooth(frame, tile.at - 1, tile.at + 5) * (1 - relax);
        return <g key={tile.label}>
          <path d={tile.d} transform={`translate(${tile.x - 16} 127) scale(1.26)`} fillRule="evenodd"
            fill={i % 2 ? '#344a67' : '#ae7136'} shapeRendering="crispEdges" />
          <Ink x={tile.x} y={177} textAnchor="middle" fill="#272936" fontFamily={TEXT} fontSize="17" fontWeight={900}>
            {tile.label}
          </Ink>
          <rect x={tile.x - 57} y="107" width={i === 3 ? 110 : 119} height="99" fill="#0c1329" opacity={.75 * dim} />
        </g>;
      })}
      <Ink x={272} y={277} textAnchor="middle" fontFamily={TEXT} fontSize="16" fill="#a6aabf">像素动效 · 图解复刻</Ink>
    </svg>
  </div>;
};

const TutorialExample: FC<{frame: number}> = ({frame}) => frame < 6164 ? (
  <div data-layer="tutorial-independent-photo" style={{...fit, background: '#41251e'}}>
    <MediaCrop asset={HORSE_STILL} alt="独立实拍：骑者与马在日落时的剪影" />
    <div style={{position: 'absolute', bottom: 13, right: 15, color: '#fff',
      font: `600 16px ${TEXT}`, textShadow: '0 1px 3px #000'}}>独立实拍 · 非模型输出</div>
  </div>
) : (
  <svg data-layer="tutorial-editorial-diagram" width={CASE_W} height={CASE_H} style={{...fit, background: '#fcfcfd'}}>
    <Ink x={23} y={164} fontFamily={MONO} letterSpacing="2" fontSize={13} fill="#73717b">MODEL</Ink>
    <Ink x={128} y={176} fontFamily={TEXT} fontWeight={900} fontSize={46} fill="#18171c">理解　思考</Ink>
    <path d="M119 291H430" stroke="#9758eb" strokeOpacity=".8" strokeWidth="2.5" />
    <path d="M119 291V280M430 291V277" stroke="#9758eb" strokeOpacity=".55" strokeWidth="2" />
    <Ink x={274} y={280} textAnchor="middle" fontFamily={TEXT} fontWeight={600} fontSize={16} fill="#55505f">
      原片概念图解 · 非软件界面
    </Ink>
  </svg>
);

const CaseCard: FC<{frame: number; spec: CaseSpec}> = ({frame, spec}) => {
  if (frame < spec.at) return null;
  const first = spec.key === 'anime';
  const focus = 1 - smooth(frame, spec.defocus - 1, spec.defocus + 2);
  const light = Math.max(focus, smooth(frame, 6185, 6192));
  const alpha = series(frame, spec.at, first ? [.09, .2, .34, .49, .64, .77, .87, .94, 1] : [.29, .56, .79, .94, 1]);
  const introY = series(frame, spec.at, first ? [24, 18, 10, 6, 4, 2, 0] : [33, 24, 13, 6, 2, 0]);
  const whiteTutorial = spec.key === 'tutorial' && frame >= 6164;
  return <div data-layer={`finance-case-${spec.key}`} style={{
    ...place(spec.x, 220, CASE_W, 400), opacity: alpha, transformOrigin: '50% 153px',
    transform: `translateY(${introY - 18 * focus}px) scale(${1 + .035 * focus})`,
  }}>
    <div style={{...place(0, 0, CASE_W, CASE_H), ...panel, borderRadius: 18,
      background: '#101222', filter: `brightness(${lerp(.65, 1, light)})`}}>
      {spec.key === 'anime' && (frame < 6192 ? (
        <MediaCrop asset={ANIME_SOLO} alt="独立动画剧照：蓝紫夜色中的单角色" />
      ) : (
        <MediaCrop asset={ANIME_DUO} alt="独立动画剧照：冷暖对照的双角色" />
      ))}
      {spec.key === 'pixel' && <PixelExample frame={frame} />}
      {spec.key === 'tutorial' && <TutorialExample frame={frame} />}
      <EpisodeTag onLight={whiteTutorial} kind="独立替图">{spec.episode}</EpisodeTag>
    </div>
    <div style={{...place(0, 318, CASE_W, 43), textAlign: 'center',
      font: `900 32px/43px ${TEXT}`, color: focus > .4 ? '#dacbf4' : WHITE, opacity: lerp(.67, 1, light)}}>
      {spec.title}
    </div>
    <div style={{...place(0, 364, CASE_W, 32), textAlign: 'center',
      font: `500 22px/29px ${TEXT}`, color: '#b4b4bc', opacity: lerp(.62, .94, light)}}>
      {spec.detail}
    </div>
  </div>;
};

const CaseStage: FC<{frame: number}> = ({frame}) => {
  const header = series(frame, CASES_IN, [.11, .18, .31, .44, .54, .65, .76, .86, .93, 1]);
  const zoom = series(frame, 6191, [.93, .976, 1]);
  return <div data-layer="finance-case-wall" style={canvas}>
    <svg width={1920} height={205} style={{...place(0, 0, 1920, 205), opacity: header}}>
      <Ink x={960} y={154} textAnchor="middle" fontSize={46} fontFamily={TEXT} fontWeight={900}>
        同一套工作流 · 多种爆款风格实时成片
      </Ink>
      <Ink x={960} y={182} textAnchor="middle" fontFamily={TEXT} fontSize={17} fontWeight={600} fill="#b8b9c4">
        原片案例标签 · 画面为独立替代与图解复刻
      </Ink>
    </svg>
    {CASES.map(spec => <CaseCard key={spec.key} frame={frame} spec={spec} />)}
    {frame >= 6191 && <svg data-layer="finance-cases-verdict" width={1920} height={1080} style={canvas}>
      <g opacity={series(frame, 6191, [.76, .99, 1])}
        transform={`translate(960 792) scale(${zoom}) translate(-960 -792)`}>
        <Ink x={960} y={823} textAnchor="middle" fontSize={104} textLength={1273} lengthAdjust="spacingAndGlyphs">
          这类风格，做起来都<tspan fill={LILAC}>非常容易</tspan>
        </Ink>
      </g>
    </svg>}
  </div>;
};

/** Transparent 1920×1080 overlay. `frame` is always the source/global 30 fps frame. */
export const FinanceCases: FC<{frame:number}> = ({frame}) => {
  if (frame < FINANCE_IN || frame >= CASES_OUT) return null;
  return <div data-layer="finance-cases" style={{...canvas, pointerEvents: 'none', overflow: 'hidden', fontSynthesis: 'none'}}>
    {frame < FINANCE_OUT && <FinanceStage frame={frame} />}
    {frame >= CASES_IN && <CaseStage frame={frame} />}
  </div>;
};
