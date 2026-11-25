import type {FC} from 'react';
import {AbsoluteFill} from 'remotion';
import {DARK, DISPLAY, HEIGHT, ImageLayer, Ink, LILAC, MONO, PAPER, SoftCheck, WIDTH, box, sheetStyle} from './drawing';
import {easeOut, mix, phase, segmentBState, series} from './timing';

type ChapterState = NonNullable<NonNullable<ReturnType<typeof segmentBState>>['chapter']>;

export const ChapterB: FC<{state: ChapterState; frame: number}> = ({state, frame}) => {
  const exits = frame >= 2319;
  const titleX = exits ? state.whiteX + 110 : 730;
  return (
    <svg data-layer="b-chapter" width={WIDTH} height={HEIGHT} style={sheetStyle}>
      <defs>
        <clipPath id="ft-b-rank-window"><rect x={0} y={353} width={620} height={284} /></clipPath>
        <clipPath id="ft-b-title-mask"><rect x={titleX} y={403} width={state.titleMask} height={280} /></clipPath>
      </defs>
      <rect x={state.panelX} width={exits ? 620 : state.whiteX} height={HEIGHT} fill={DARK} />
      <rect data-layer="b-chapter-paper" x={state.whiteX} width={WIDTH - state.whiteX} height={HEIGHT} fill={PAPER} />
      {state.rankOn && <g transform={`translate(${state.panelX} 0)`} data-layer="b-chapter-rank">
        <g clipPath="url(#ft-b-rank-window)">
          <Ink x={310 + state.rankX} y={589 + state.rankY} size={220} family={DISPLAY} weight={400} fill={LILAC} align="middle">02</Ink>
        </g>
        {state.partAlpha > 0 && <g opacity={state.partAlpha}>
          <Ink x={310 + state.rankX} y={678} size={30} family={MONO} weight={600} fill="#929294" align="middle">PART 02</Ink>
        </g>}
      </g>}
      {state.titleMask > 0 && <g clipPath="url(#ft-b-title-mask)" data-layer="b-chapter-copy">
        <Ink x={titleX} y={551} size={144} family={DISPLAY} weight={400} fill={DARK}>云端渲染</Ink>
        <Ink x={titleX + 1} y={650} size={44} fill="#6d6c71">按秒计费 · 多机并行成倍提速</Ink>
      </g>}
    </svg>
  );
};

export const BackdropB: FC<{frame: number}> = ({frame}) => {
  const drift = phase(frame, 2320, 3601);
  const opacity = series(frame, 2318, [0, .03, .09, .24, .43, .66, .83, .94, 1]);
  return (
    <AbsoluteFill data-layer="b-render-background" style={{opacity, overflow: 'hidden', backgroundColor: DARK}}>
      <ImageLayer asset="full-web/render-bg.jpg" alt="独立夜景背景"
        style={{...box(0, 0, WIDTH, HEIGHT), objectFit: 'cover', objectPosition: '50% 55%',
          filter: 'blur(19px) brightness(.64) saturate(.68)', transform: `scale(${mix(1.06, 1.09, drift)})`}} />
      <div aria-hidden style={{...box(10, 741, 1170, 96), borderRadius: '50%', transform: 'rotate(-40deg)',
        backgroundColor: '#906e41', filter: 'blur(42px)', opacity: .21, mixBlendMode: 'screen'}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(19,19,21,.84) 0%, rgba(19,19,21,.56) 36%, rgba(16,16,19,.24) 69%, rgba(16,16,19,.44) 100%), radial-gradient(ellipse at 53% 60%, transparent 26%, rgba(16,16,19,.58) 94%)'}} />
    </AbsoluteFill>
  );
};

const nav = [
  {left: 96, width: 258, id: '01', label: '账号订阅', cost: '¥13.8', active: false},
  {left: 362, width: 266, id: '02', label: '云端渲染', cost: '¥1.1', active: true},
  {left: 636, width: 258, id: '03', label: '声音字幕', cost: '', active: false},
  {left: 905, width: 259, id: '04', label: '杂项均摊', cost: '', active: false},
] as const;

export const TopLedgerB: FC<{frame: number; total: string}> = ({frame, total}) => (
  <svg data-layer="b-top-ledger" width={WIDTH} height={HEIGHT} style={sheetStyle}>
    <g opacity={series(frame, 2320, [0, .09, .27, .5, .72, .86, .96, 1])}>
      {nav.map(item => (
        <g key={item.id}>
          <rect x={item.left} y={43} width={item.width} height={70} rx={35} fill={item.active ? PAPER : '#2a2d32'} />
          <Ink x={item.left + 20} y={85} size={20} family={MONO} weight={600}
            fill={item.active ? '#8554d7' : item.cost ? '#d0d0d1' : '#686b70'}>{item.id}</Ink>
          <Ink x={item.left + 53} y={88} size={25}
            fill={item.active ? DARK : item.cost ? '#d0d0d1' : '#686b70'}>{item.label}</Ink>
          {item.cost && <Ink x={item.left + item.width - 20} y={85} size={23} family={MONO} weight={600} align="end"
            fill={item.active ? '#8554d7' : '#ddcbf9'}>{item.cost}</Ink>}
        </g>
      ))}
      <rect x={1190} y={43} width={228} height={70} rx={35} fill="#2a2d32" />
      <Ink x={1228} y={88} size={24} fill="#c7c7ca">累计</Ink>
      <Ink x={1282} y={89} size={34} family={DISPLAY} weight={400} fill={LILAC}>{`¥${total}`}</Ink>
    </g>
  </svg>
);

const priceShift = [0, .02, .04, .09, .15, .225, .31, .40, .68, .76, .83, .895, .944, .978, .993, 1] as const;

export const PricingB: FC<{frame: number; opacity: number}> = ({frame, opacity}) => {
  const shift = series(frame, 2638, priceShift);
  const position = (centred: number, left: number) => mix(centred, left, shift);
  const lift = series(frame, 2446, [15, 12, 9, 7, 5, 3, 2, 1, 0]);
  const enter = series(frame, 2446, [0, .20, .36, .53, .69, .81, .91, .97, 1]);
  const chip = series(frame, 2557, [0, .28, .53, .72, .83, .91, .97, .993, 1]);
  return (
    <svg data-layer="b-price" width={WIDTH} height={HEIGHT} style={sheetStyle}>
      <g opacity={enter * opacity} transform={`translate(0 ${lift})`}>
        <Ink x={position(800, 114)} y={position(278, 294)} size={32} weight={400} fill="#a2a2a4">按量计费云端显卡主机</Ink>
        <Ink x={position(688, 110)} y={position(379, 379)} size={position(86, 69)} family={DISPLAY} weight={400}>RTX 4090</Ink>
        <Ink x={position(1151, 485)} y={380} size={40} family={DISPLAY} weight={400} fill="#929294">24G</Ink>
        <Ink x={position(606, 117)} y={position(606, 561)} size={position(200, 156)} family={DISPLAY} weight={400} fill={LILAC}>¥2.15</Ink>
        <Ink x={position(1194, 578)} y={position(606, 560)} size={42}>/ 小时</Ink>
        {chip > 0 && <g opacity={chip} transform={`translate(${position(747, 114)} ${position(681, 626) + (1 - chip) * 12})`} data-layer="b-billing-chip">
          <rect width={426} height={65} rx={18} fill="#ffffff" fillOpacity={.089} />
          <Ink x={28} y={43} size={32} fill={LILAC}>按秒计费</Ink>
          <Ink x={174} y={43} size={29} fill="#e1e1e2">约 ¥0.036 / 分钟</Ink>
        </g>}
      </g>
    </svg>
  );
};

export const ConsoleB: FC<{frame: number; opacity: number}> = ({frame, opacity}) => {
  const enter = series(frame, 2638, [0, .03, .07, .12, .19, .28, .37, .48, .59, .7, .8, .88, .94, .98, 1]);
  const stopped = frame >= 2722;
  const stopMix = easeOut(phase(frame, 2721, 2730));
  const checked = easeOut(phase(frame, 2732, 2742));
  const show = enter * opacity;
  return (
    <AbsoluteFill data-layer="b-automatic-window" style={{opacity: show}}>
      <div style={{...box(900, 199, 910, 457), borderRadius: 28, overflow: 'hidden', backgroundColor: '#f7f8fa',
        boxShadow: '0 21px 48px rgba(0,0,0,.29)', transform: `translate(${(1 - enter) * 4}px ${(1 - enter) * 7}px)`}}>
        <div style={{...box(0, 0, 910, 29), backgroundColor: '#eeeeef', borderBottom: '1px solid #eeeeef'}} aria-hidden>
          {['#ed786e', '#e5b267', '#69bc8e'].map((color, i) => <div key={color} style={{...box(9 + i * 14, 9, 8, 8), borderRadius: '50%', backgroundColor: color}} />)}
          <div style={{...box(70, 4, 246, 25), backgroundColor: '#fafafa', borderRadius: '8px 8px 0 0', paddingLeft: 12,
            font: '500 13px "FT Text", sans-serif', lineHeight: '24px', color: '#555558'}}>公开文档 · 非执行记录</div>
        </div>
        <svg width={910} height={108} style={{...box(0, 0, 910, 108), display: 'block'}}>
          <Ink x={30} y={83} size={22} fill="#171719">出片前自动检查 · assemble30.py</Ink>
        </svg>
        <div data-layer="b-console-viewport" style={{...box(31, 105, 848, 352), overflow: 'hidden', backgroundColor: '#f1f4f5'}}>
          <ImageLayer asset="full-web/render-console.jpg" alt="FredTalk 公开渲染源码 assemble30.py，不是后台执行记录"
            style={{...box(mix(0, -20, stopMix), mix(0, -9, stopMix), 810, 405), objectFit: 'contain',
              objectPosition: '50% 0%'}} />
        </div>
        <svg width={910} height={108} style={{...box(0, 0, 910, 108), display: 'block'}}>
          <Ink x={589} y={50} size={17} weight={600} align="end" fill="#66666a">流程示意</Ink>
          <rect x={608} y={21} width={283} height={46} rx={14} fill="#29292c" />
          <circle cx={634} cy={44} r={6} fill={stopped ? '#96969b' : '#46cf7c'} />
          <Ink x={654} y={52} size={22} fill={stopped ? '#d2d2d4' : '#63d995'} family={MONO} weight={600}>
            {stopped ? 'Stopped · 自动断电' : 'Running · 自动出片'}
          </Ink>
        </svg>
      </div>
      <svg width={WIDTH} height={HEIGHT} style={sheetStyle}>
        <g opacity={mix(.41, 1, stopMix)}>
          <Ink x={913} y={710} size={30} fill="#c1bdb4">官方电源接口 · 自动开机渲染，渲完立刻断电</Ink>
          <Ink x={910} y={779} size={66} family={DISPLAY} weight={400} fill={LILAC}>不用的时候<tspan x={1283}>·</tspan><tspan x={1357}>一分钱不花</tspan></Ink>
        </g>
        {checked > 0 && <SoftCheck opacity={checked} scale={mix(.6, 1, checked)} />}
      </svg>
    </AbsoluteFill>
  );
};