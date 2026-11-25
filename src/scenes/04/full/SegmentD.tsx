import { demoAsset as staticFile } from '../../../demo-media';
import type {CSSProperties, FC, SVGProps} from 'react';
import {AbsoluteFill, Img, useCurrentFrame} from 'remotion';
import {FinanceCases} from './d/FinanceCases';
import {workflowDocuments} from './d/workflowDocuments';

// Demo 04 · [5296,6916), always on the source/global 30 fps clock.
// Frame controls below are independent of the voice, captions and corner mark.
const T = {
  start: 5296, chapterOut: 5332, chapterEnd: 5343, quote: 5369,
  minute: 5489, fourMinutes: 5645, quoteOut: 5680, paperEnd: 5691,
  barA: 5681, barB: 5700, tenfold: 5770, barOut: 5820, barEnd: 5831,
  green: 6261, ask: 6265, tools: 6339, why: 6430, askOut: 6504,
  ideas: 6503, askEnd: 6513, ideaFirst: 6510,
  docStart: 6765, ideaEnd: 6775, end: 6916,
} as const;
const W = 1920;
const H = 1080;
const INK = '#18181a';
const WHITE = '#fdfdfd';
const PURPLE = '#d6beff';
const RED = '#eb6c6b';
const DISPLAY = '"system-ui", "PingFang SC", sans-serif';
const TEXT = '"system-ui", "PingFang SC", sans-serif';
const MONO = '"FT Mono", monospace';
const rgbaBlack = 'rgba(0,0,0,.33)';
const place = (left: number, top: number, width: number, height: number): CSSProperties => ({position: 'absolute', left, top, width, height});
const FULL = place(0, 0, W, H);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (t: number) => Math.max(0, Math.min(1, t));
const ramp = (f: number, a: number, b: number) => clamp((f - a) / (b - a));
const smooth = (f: number, a: number, b: number) => {
  const t = ramp(f, a, b);
  return t * t * (3 - 2 * t);
};
const sample = (frame: number, first: number, values: readonly number[]) => {
  const i = Math.max(0, Math.min(values.length - 1, frame - first));
  return lerp(values[Math.floor(i)], values[Math.ceil(i)], i % 1);
};
const rise = (f: number, start: number, length: number, distance: number) => ({
  opacity: smooth(f, start - 1, start + length),
  dy: distance * (1 - smooth(f, start - 1, start + length)),
});
const Ink: FC<SVGProps<SVGTextElement>> = (props) => <text fontFamily={DISPLAY} fill={WHITE} {...props} />;
const Sans: FC<SVGProps<SVGTextElement>> = (props) => <Ink fontFamily={TEXT} fontWeight={900} {...props} />;
const Plate: FC<SVGProps<SVGSVGElement>> = ({style, ...props}) => <svg width={W} height={H} style={{...FULL, display: 'block', overflow: 'visible', ...style}} {...props} />;

// The source shows the white variant from the f5296 cut, even on the temporary white chapter pane.
// The purple variant is visible in the outgoing C frame f5295, not inside D.
export const brandLightD = (_frame: number): boolean => false;

const Desk: FC<{frame: number}> = ({frame}) => {
  const green = frame >= T.green;
  // The source background is shallow-focus, with a slow breathing crop; replacement photos are independent.
  const drift = green ? smooth(frame, T.green, T.end - 1) : smooth(frame, T.chapterOut, T.green - 1);
  const photo = staticFile(green ? 'full-web/desk-green.jpg' : 'full-web/desk-blue.jpg');
  const camera = green ?
    `translate(${lerp(208, 185, drift)}px, ${lerp(-11, -27, drift)}px) scale(${lerp(1.18, 1.22, drift)})` :
    `translate(${lerp(-20, 16, drift)}px, ${lerp(96, 109, drift)}px) rotate(6deg) skewX(25deg) scale(${lerp(1.28, 1.34, drift)}, ${lerp(1.33, 1.41, drift)})`;
  return <AbsoluteFill data-layer={green ? 'd-desk-green' : 'd-desk-blue'} style={{overflow: 'hidden', background: INK}}>
    <Img src={photo} alt="" showInTimeline={false} style={{
      ...FULL, objectFit: 'cover', transform: camera,
      filter: green ? 'blur(17px) saturate(.68) brightness(.94)' : 'blur(10px) grayscale(1) sepia(.87) saturate(1.28) brightness(.58)',
    }} />
    {!green && <Img src={photo} alt="" showInTimeline={false} style={{
      ...FULL, objectFit: 'cover', transform: camera,
      filter: 'blur(10px) grayscale(1) sepia(1) hue-rotate(150deg) saturate(1.27) brightness(.68)',
      maskImage: 'linear-gradient(#000 3%, #000 12%, transparent 32%, transparent 48%, #000 70%)',
    }} />}
    <div style={{...FULL, background: green ?
      'radial-gradient(ellipse at 34% 21%,rgba(87,100,66,.19),transparent 61%), radial-gradient(ellipse at 72% 17%,rgba(18,87,83,.37),transparent 59%),linear-gradient(110deg,rgba(66,57,41,.49),rgba(11,14,15,.06) 49%,rgba(9,20,25,.30))' :
      'radial-gradient(ellipse at 85% 10%,rgba(26,91,107,.58),transparent 51%),linear-gradient(110deg,rgba(23,23,25,.93) 0%,rgba(19,20,23,.47) 40%,rgba(20,34,36,.16) 67%,rgba(9,24,30,.22))',
    }} />
    <div style={{...FULL, background: green ? 'linear-gradient(0deg,rgba(14,14,17,.47),transparent 51%)' :
      'linear-gradient(180deg,rgba(19,19,23,.33),transparent 53%,rgba(11,13,17,.33))'}} />
  </AbsoluteFill>;
};

const Chapter: FC<{frame: number}> = ({frame}) => {
  const edge = sample(frame, 5296, [1920,1920,1884,1777,1518,1082,841,724,663,637,625,620]);
  const pushRight = sample(frame, 5331, [0,1,7,43,124,256,427,622,823,1009,1165,1276,1300]);
  const pushLeft = sample(frame, 5331, [0,3,15,39,89,149,215,305,414,538,600,620,620]);
  const drop = sample(frame, 5300, [225,163,110,61,31,15,6,2,0]);
  const wipe = sample(frame, 5305, [0,23,150,323,560,900,1034,1050]);
  return <AbsoluteFill data-layer="d-chapter-04" style={{overflow: 'hidden'}}>
    {pushLeft < 620 && <div style={{...place(0, 0, 620, H), backgroundColor: INK, transform: `translateX(${-pushLeft}px)`}}>
      <svg width={620} height={H} style={{display: 'block'}}>
        <defs><clipPath id="d-part-four-window"><rect x={0} y={386} width={620} height={242}/></clipPath></defs>
        <g clipPath="url(#d-part-four-window)">
          <Ink x={310} y={586 + drop} fontSize={215} textAnchor="middle" fill={PURPLE}>04</Ink>
        </g>
        <Ink x={310} y={677} fontSize={28} textAnchor="middle" fontFamily={MONO} fontWeight={600}
          opacity={sample(frame, 5304, [0,.29,.66,.84,1])} fill="#929295">PART 04</Ink>
      </svg>
    </div>}
    {edge + pushRight < W && <div style={{...place(edge + pushRight, 0, W - 620, H), background: '#fff'}}>
      <svg width={1300} height={H} style={{display: 'block'}}>
        <defs><clipPath id="d-part-four-copy"><rect x={110} y={398} width={wipe} height={278}/></clipPath></defs>
        <g clipPath="url(#d-part-four-copy)">
          <Ink x={110} y={552} fontSize={144} fill={INK}>行业对比与案例</Ink>
          <Sans x={111} y={652} fontSize={44} fill="#6d6d71">不到 20 元 vs 外包 1,000–6,000 元 · 真实成片</Sans>
        </g>
      </svg>
    </div>}
  </AbsoluteFill>;
};

const QUOTE_TABLE = [
  ['价格', '150 元 / 分钟'], ['做什么', '字幕、配图、简单动画'], ['质量', '约 70 分'], ['交付时间', '一期约 48 小时'],
] as const;
const RATES = {human: '180-250', round: '700-1,000', auto: '约 4.7', measure: '元 / 分钟'} as const;
const QuotePaper: FC<{frame: number}> = ({frame}) => {
  const op = sample(frame, T.quote, [.10,.31,.49,.64,.78,.89,.95,.98,.995,1]);
  const dx = sample(frame, T.quote, [-40,-32,-24,-16,-11,-7,-4,-2,-1,0]);
  const dy = sample(frame, T.quote, [14,12,9,6,4,3,2,1,0]);
  return <g data-layer="d-quote-paper" opacity={op} transform={`translate(${120 + dx} ${184 + dy})`}>
    <defs>
      <linearGradient id="d-paper-surface"><stop stopColor="#fefefe"/><stop offset=".88" stopColor="#fcfcfd"/><stop offset="1" stopColor="#eeeef1"/></linearGradient>
      <linearGradient id="d-paper-rolled"><stop stopColor="#2b2a35"/><stop offset="1" stopColor="#dedde6"/></linearGradient>
    </defs>
    <path d="M0 30Q0 0 30 0H750Q765 0 754 8H748V536L756 543Q763 550 743 551H30Q0 551 0 521Z" fill="#ededf2" style={{filter: `drop-shadow(2px 17px 34px ${rgbaBlack})`}} />
    <path d="M734 3H761L751 13V531L758 544H737Z" fill="url(#d-paper-rolled)"/>
    <rect x={1} y={17} width={724} height={509} rx={19} fill="url(#d-paper-surface)" />
    <Sans x={56} y={103} fontSize={30} fontWeight={600} fill="#56545f">常规剪辑 · 按分钟</Sans>
    {QUOTE_TABLE.map(([label, value], index) => (<g key={label}>
      <Sans x={56} y={189 + index * 66} fontSize={23} fontWeight={500} fill="#666370">{label}</Sans>
      <Sans x={192} y={189 + index * 66} fontSize={index === 0 ? 38 : 25} fill="#202024">{value}</Sans>
    </g>))}
    <Sans x={56} y={463} fontSize={24} fontWeight={500} fill="#6f6b76">成本高、速度慢、质量一般</Sans>
    <Sans x={0} y={597} fontSize={23} fontWeight={500} fill="#a4a3a9">常规动效数据剪辑外包市场行情参考</Sans>
    <Sans x={744} y={597} textAnchor="end" fontSize={19} fontWeight={500} fill="#a4a3a9">原作口径 · 报价图解</Sans>
  </g>;
};

const Quotes: FC<{frame: number}> = ({frame}) => {
  const off = sample(frame, T.quoteOut, [1,.98,.89,.75,.60,.44,.30,.18,.09,.035,.01,0]);
  const lift = sample(frame, T.quoteOut, [0,0,-1,-3,-6,-11,-17,-24,-32,-39,-45,-47]);
  const minute = rise(frame, T.minute, 8, 19);
  const total = rise(frame, T.fourMinutes, 7, 16);
  return <Plate data-layer="d-industry-quotes" style={{opacity: off, transform: `translateY(${lift}px)`}}>
    <QuotePaper frame={frame}/>
    {frame >= T.minute && <g opacity={minute.opacity} transform={`translate(0 ${minute.dy})`}>
      <Sans x={950} y={242} fontSize={36} fill="#c0c3c7">传统剪辑师外包（动效 + 图表）</Sans>
      <Ink x={951} y={400} fontSize={144} textLength={595} lengthAdjust="spacingAndGlyphs">{RATES.human}</Ink>
      <Sans x={1558} y={398} fontSize={44} fill="#eeeeef">{RATES.measure}</Sans>
    </g>}
    {frame >= T.fourMinutes && <g opacity={total.opacity} transform={`translate(0 ${total.dy})`}>
      <path d="M953 489V682" stroke={RED} strokeWidth={6} />
      <Sans x={989} y={519} fontSize={32} fill="#cbc0bb">一条 4 分钟视频 · 光剪辑费</Sans>
      <Ink x={988} y={653} fontSize={122} textLength={610} lengthAdjust="spacingAndGlyphs" fill={RED}>{RATES.round}</Ink>
      <Sans x={1610} y={651} fontSize={40}>元</Sans>
    </g>}
  </Plate>;
};

const Compare: FC<{frame: number}> = ({frame}) => {
  const upper = rise(frame, T.barA, 10, 22);
  const upperBarWidth = sample(frame, T.barA, [0,470,648,774,914,1070,1215,1330,1432,1508,1552,1570,1576]);
  const lower = {opacity: sample(frame, T.barB, [.88,.99,1]), dy: sample(frame, T.barB, [40,4,0])};
  const out = sample(frame, T.barOut, [1,.94,.84,.71,.58,.45,.33,.23,.14,.06,.02,0]);
  const lift = sample(frame, T.barOut, [0,-1,-4,-8,-13,-19,-26,-34,-40,-44,-47,-48]);
  const ratio = sample(frame, T.tenfold, [.08,.36,.69,.9,.985,1]);
  const ratioZoom = sample(frame, T.tenfold, [.95,.965,.979,.992,1]);
  return <Plate data-layer="d-rate-comparison" style={{opacity: out, transform: `translateY(${lift}px)`}}>
    <g opacity={upper.opacity} transform={`translate(0 ${upper.dy})`}>
      <rect x={120} y={184} width={1680} height={270} rx={28} fill="#212123" style={{filter: 'drop-shadow(0 16px 27px #0004)'}} />
      <Sans x={172} y={317} fontSize={39} fill="#d1d0d2">传统外包剪辑师</Sans>
      <Ink x={1211} y={316} fontSize={94} fill={RED} textLength={386} lengthAdjust="spacingAndGlyphs">{RATES.human}</Ink>
      <Sans x={1609} y={316} fontSize={32} fill="#c8c7c9">{RATES.measure}</Sans>
      <rect x={172} y={362} width={upperBarWidth} height={48} rx={24} fill="#e4474c" />
    </g>
    {frame >= T.barB && <g opacity={lower.opacity} transform={`translate(0 ${lower.dy})`}>
      <rect x={120} y={470} width={1680} height={284} rx={29} fill={WHITE} style={{filter: 'drop-shadow(0 16px 27px #0005)'}} />
      <Sans x={172} y={615} fontSize={41} fill={INK}>全自动剪辑工作流（全算上）</Sans>
      <Ink x={1250} y={615} fontSize={110} textLength={340} lengthAdjust="spacingAndGlyphs" fill={INK}>{RATES.auto}</Ink>
      <Sans x={1600} y={615} fontSize={35} fill="#6b6b70">{RATES.measure}</Sans>
      <rect x={172} y={664} width={1576} height={48} rx={24} fill="#efedf2" />
      <rect x={172} y={664} width={49} height={48} rx={24} fill={INK} />
      <Sans x={242} y={698} fontSize={28} fill={INK}>每分钟不到 5 块钱 · 直接差出几十倍</Sans>
      <Sans x={1724} y={696} textAnchor="end" fontSize={18} fontWeight={500} fill="#5c5964">按原作口径复刻</Sans>
    </g>}
    {frame >= T.tenfold && <g opacity={ratio} transform={`translate(960 847) scale(${ratioZoom}) translate(-960 -847)`}>
      <Ink x={960} y={872} textAnchor="middle" fontSize={105} textLength={718} lengthAdjust="spacingAndGlyphs">
        直接差出<tspan fill={PURPLE}>几十倍</tspan>
      </Ink>
    </g>}
  </Plate>;
};

const questions = {lead: '很多人常问', beginning: '“你不就是靠', model: 'Claude Code', ending: '吗？”',
  before: '为什么大多数人', emphasis: '跑不通', after: '这个工作流？'} as const;
const ModelPill: FC<{model: 'Claude Code' | 'Gemini'; x: number; width: number}> = ({model, x, width}) => {
  const claude = model === 'Claude Code';
  return <div style={{...place(x, 469, width, 103), display: 'flex', alignItems: 'center', boxSizing: 'border-box',
    gap: 15, padding: '0 32px', color: WHITE, font: `900 40px/1 ${TEXT}`, borderRadius: 23,
    border: '1px solid #ffffff24', background: '#a8a4b02b', whiteSpace: 'nowrap'}}>
    <div style={{width: 65, height: 65, borderRadius: 15, background: claude ? '#d78b65' : 'transparent',
      display: 'grid', placeItems: 'center', flex: 'none'}}>
      <Img src={staticFile(claude ? 'full-web/claude.svg' : 'full-web/gemini.svg')} alt="" showInTimeline={false}
        style={{width: claude ? 51 : 62, height: claude ? 51 : 62, filter: claude ? 'brightness(0) invert(1)' : 'saturate(.64) hue-rotate(14deg)'}} />
    </div>
    {model}
  </div>;
};

const QuestionStage: FC<{frame: number}> = ({frame}) => {
  const into = sample(frame, T.ask, [.28,.57,.83,.94,.985,1]);
  const y = sample(frame, T.ask, [16,9,4,1,0]);
  const tools = rise(frame, T.tools, 9, 20);
  const why = rise(frame, T.why, 7, 18);
  const off = 1 - smooth(frame, T.askOut - 1, T.askEnd);
  const shift = sample(frame, T.askOut, [0,-1,-3,-6,-11,-17,-22,-27,-31,-34,-36,-37]);
  return <AbsoluteFill data-layer="d-claude-question" style={{opacity: off, transform: `translateY(${shift}px)`}}>
    <Plate>
      <g opacity={into} transform={`translate(0 ${y})`}>
        <Sans x={960} y={230} textAnchor="middle" fontSize={28} fontWeight={500} fill="#aaaead">{questions.lead}</Sans>
        <Ink x={98} y={348} fontSize={106} textLength={601} lengthAdjust="spacingAndGlyphs">{questions.beginning}</Ink>
        <Ink x={754} y={348} fontSize={106} fill={PURPLE} textLength={719} lengthAdjust="spacingAndGlyphs">{questions.model}</Ink>
        <Ink x={1527} y={348} fontSize={106} textLength={294} lengthAdjust="spacingAndGlyphs">{questions.ending}</Ink>
      </g>
      {frame >= T.why && <Ink x={960} y={749 + why.dy} textAnchor="middle" fontSize={76} opacity={why.opacity}
        textLength={1160} lengthAdjust="spacingAndGlyphs">
        {questions.before}<tspan fill={PURPLE}>{questions.emphasis}</tspan>{questions.after}
      </Ink>}
    </Plate>
    {frame >= T.tools && <AbsoluteFill style={{opacity: tools.opacity, transform: `translateY(${tools.dy}px)`}}>
      <ModelPill model="Claude Code" x={416} width={404} />
      <ModelPill model="Gemini" x={916} width={292} />
      <Plate>
        <Sans x={864} y={531} fontSize={32} fill="#a5a6a9">/</Sans>
        <Sans x={1246} y={532} fontSize={31} fill="#d2d2d5">能用上的人非常多</Sans>
      </Plate>
    </AbsoluteFill>}
  </AbsoluteFill>;
};

const IDEA_CARDS = [
  {title: '认知', note: '怎么拆选题、定角度', at: T.ideaFirst, focus: 6613},
  {title: '能力', note: '怎么控镜头与节奏', at: 6524, focus: 6633},
  {title: '经验', note: '哪里丑必须打回返修', at: 6539, focus: 6652},
  {title: '审美', note: '什么画面才叫高级', at: 6554, focus: 6672},
] as const;
const IdeaStage: FC<{frame: number}> = ({frame}) => {
  const off = 1 - smooth(frame, T.docStart - 1, T.ideaEnd);
  const header = rise(frame, T.ideas, 9, 16);
  return <Plate data-layer="d-workflow-moat" style={{opacity: off, transform: `translateY(${-28 * (1 - off)}px)`}}>
    <Sans x={960} y={202 + header.dy} textAnchor="middle" fontSize={50} fill="#d7d8db" opacity={header.opacity}>真正拉开差距的本质</Sans>
    {IDEA_CARDS.map((card, i) => {
      if (frame < card.at) return null;
      const entry = {opacity: sample(frame, card.at, [.77,.98,1]), dy: sample(frame, card.at, [25,5,0])};
      const active = smooth(frame, card.focus - 1, card.focus + 7);
      const pulse = Math.sin(Math.PI * smooth(frame, card.focus, card.focus + 16)) * 2.5;
      const x = 110 + i * 432;
      const y0 = 269 + entry.dy - pulse;
      return <g key={card.title} data-layer={`d-moat-${i + 1}`} opacity={entry.opacity} transform={`translate(${x} ${y0})`}>
        <rect width={404} height={472} rx={29} fill="#212123" style={{filter: 'drop-shadow(0 14px 26px #0006)'}} />
        <Ink x={36} y={74} fontFamily={MONO} fontWeight={600} fontSize={29} fill="#d4c1fa">0{i + 1}</Ink>
        <Ink x={36} y={271} fontSize={130} textLength={256} lengthAdjust="spacingAndGlyphs">{card.title}</Ink>
        <rect x={34} y={368} width={336} height={2} fill="#ffffff" opacity={lerp(.035, .078, active)} />
        <Sans x={36} y={421} fontSize={30} fill="#e9e7ea" opacity={lerp(.26, .94, active)}>{card.note}</Sans>
      </g>;
    })}
  </Plate>;
};

type Doc = typeof workflowDocuments[number];
const DocPage: FC<{frame: number; doc: Doc; index: number}> = ({frame, doc, index}) => {
  const on = {
    opacity: sample(frame, T.docStart, [.055,.13,.21,.30,.43,.55,.67,.78,.86,.93,.98,1]),
    dy: sample(frame, T.docStart, [60,55,48,40,32,24,18,13,9,6,2,0]),
  };
  const slide = smooth(frame, 6785, 6880);
  const top = 210 + on.dy;
  const firstSourceLine = Number(doc.url.match(/#L(\d+)/)?.[1] ?? 1);
  const header = doc.caption;
  return <article data-layer={`d-public-doc-${index + 1}`} data-source={doc.url} data-sha256={doc.sha256} aria-label={`${doc.filename} · ${doc.caption}`}
    style={{...place(90 + index * 588, top, 566, 645), opacity: on.opacity, overflow: 'hidden', borderRadius: 28,
      background: '#fdfdfe', color: '#292a31', boxShadow: '0 14px 32px #0006'}}>
    <div style={{...place(0,0,566,50), display: 'flex', alignItems: 'center', gap: 12, boxSizing: 'border-box', padding: '0 21px',
      background: 'linear-gradient(180deg,#f5f4f7,#eeedf2)', borderBottom: '1px solid #d8d7df'}}>
      <i style={{display: 'block', width: 12, height: 12, borderRadius: 8, background: '#8962e8', flex: 'none'}} />
      <i style={{display: 'block', width: 11, height: 11, borderRadius: 8, background: '#b0aeb8', flex: 'none'}} />
      <b style={{font: `600 ${index === 1 ? 15 : 20}px/1 ${MONO}`, marginLeft: 8, whiteSpace: 'nowrap'}}>{doc.filename}</b>
      <span style={{font: `500 19px/1 ${TEXT}`, color: '#5f5d67', whiteSpace: 'nowrap'}}>· {header}</span>
      <span style={{marginLeft: 'auto', font: `900 15px/1 ${TEXT}`, color: '#594282', whiteSpace: 'nowrap'}}>示例</span>
    </div>
    <div style={{...place(0, 50, 566, 595), overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 24, right: 24, top: 18 - (index === 0 ? 27 : 0) * slide,
        font: `500 ${index === 2 ? 11.5 : 9.7}px/${index === 2 ? 1.47 : index === 1 ? 1.16 : 1.24} ${TEXT}`, overflowWrap: 'anywhere'}}>
        {doc.lines.map((line, i) => {
          if (!line) return <div key={i} style={{height: index === 0 ? 5 : 7}} />;
          const heading = /^#{1,4} /.test(line);
          const row = /^\|/.test(line);
          return <div key={i} style={{display: 'grid', gridTemplateColumns: index === 2 ? '1fr' : '24px 1fr',
            gap: 7, borderBottom: index === 1 && row ? '1px solid #ebebf0' : undefined,
            fontWeight: heading ? 900 : 500, paddingBottom: index === 1 ? .8 : 0, marginTop: heading && i > 0 ? 3 : 0}}>
            {index < 2 && <span style={{color: '#797783', font: `600 8px/1.4 ${MONO}`, textAlign: 'right'}}>{firstSourceLine + i}</span>}
            <span style={index === 1 ? {whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'clip'} : undefined}>{line}</span>
          </div>;
        })}
        {index === 2 && <div style={{height: 10, marginTop: 10, background: '#eeedf0'}} />}
      </div>
    </div>
  </article>;
};

const WorkflowStage: FC<{frame: number}> = ({frame}) => {
  const title = rise(frame, T.docStart, 7, 12);
  return <AbsoluteFill data-layer="d-public-workflow-docs">
    <Plate>
      <Ink x={960} y={158 + title.dy} textAnchor="middle" fontSize={65} textLength={1250}
        lengthAdjust="spacingAndGlyphs" opacity={title.opacity}>
        AI 自己不会 · 全靠人把经验<tspan fill={PURPLE}>沉淀进规则里</tspan>
      </Ink>
    </Plate>
    {workflowDocuments.map((doc, index) => <DocPage key={doc.url} frame={frame} doc={doc} index={index} />)}
  </AbsoluteFill>;
};

export const SegmentD: FC = () => {
  const frame = useCurrentFrame();
  if (frame < T.start || frame >= T.end) return null;
  return <AbsoluteFill data-segment="D" style={{overflow: 'hidden', pointerEvents: 'none', backgroundColor: INK, fontSynthesis: 'none'}}>
    {frame >= T.chapterOut && <Desk frame={frame} />}
    {frame < T.chapterEnd && <Chapter frame={frame} />}
    {frame >= T.quote && frame < T.paperEnd && <Quotes frame={frame} />}
    {frame >= T.barA && frame < T.barEnd && <Compare frame={frame} />}
    <FinanceCases frame={frame} />
    {frame >= T.ask && frame < T.askEnd && <QuestionStage frame={frame} />}
    {frame >= T.ideas && frame < T.ideaEnd && <IdeaStage frame={frame} />}
    {frame >= T.docStart && <WorkflowStage frame={frame} />}
  </AbsoluteFill>;
};