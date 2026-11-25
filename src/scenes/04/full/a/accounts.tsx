import type {FC} from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Canvas, H, Ink, P, ProductMark, W, at} from './basics';
import {chapterAt, phaseAt, rmbAt, totalAt, worksScrollAt} from './state';

type SceneProps = {frame: number; pose: ReturnType<typeof phaseAt>};

export const AChapter: FC<{frame: number}> = ({frame}) => {
  const pose = chapterAt(frame);
  if (!pose) return null;
  return <>
    {pose.panelX > -620 && <div data-a-layer="chapter-panel" style={{
      ...at(0,0,620,H), backgroundColor:P.dark, transform:`translateX(${pose.panelX}px)`,
    }}>
      <svg width={620} height={H} style={{display:'block'}}>
        <defs><clipPath id="ft-a-rank-mask"><rect x={0} y={353} width={620} height={284}/></clipPath></defs>
        <g clipPath="url(#ft-a-rank-mask)"><Ink x={310} y={589} size={220} fill={P.lavender} family="display" anchor="middle">01</Ink></g>
        <text x={310} y={678} fontSize={30} fontFamily={'"FT Mono", monospace'} fontWeight={600} fill="#929294" textAnchor="middle">PART 01</text>
      </svg>
    </div>}
    <Canvas>
      <defs><clipPath id="ft-a-cut-copy"><rect x={730} y={403} width={688} height={280}/></clipPath></defs>
      <g data-a-layer="chapter-copy" transform={`translate(${pose.copyX} 0)`}>
        <g clipPath="url(#ft-a-cut-copy)">
          <Ink x={730} y={551} size={144} fill={P.dark} family="display">账号订阅</Ink>
          <Ink x={731} y={651} size={44} fill="#6d6c71">最大头的一笔 · 按 104 条产量均摊</Ink>
        </g>
      </g>
    </Canvas>
  </>;
};

const tabs = [
  {x:92,w:266,n:'01',title:'账号订阅'},
  {x:368,w:255,n:'02',title:'云端渲染'},
  {x:636,w:258,n:'03',title:'声音字幕'},
  {x:906,w:257,n:'04',title:'杂项均摊'},
];

export const ABookRail: FC<SceneProps> = ({frame,pose}) => {
  if (!pose.nav) return null;
  const total = totalAt(frame);
  return <Canvas style={{opacity:pose.nav}}>
    <g data-a-layer="book-rail" data-total={total}>
      {tabs.map((t,i) => <g key={t.n}>
        <rect x={t.x} y={42} width={t.w} height={70} rx={35} fill={i === 0 ? P.dark : '#f1f1f3'}
          style={i === 0 ? {filter:'drop-shadow(0 9px 10px rgba(24,24,26,.2))'} : undefined}/>
        <Ink x={t.x+21} y={85} size={20} fill={i === 0 ? P.lavender : '#aaaab0'} family="mono">{t.n}</Ink>
        <Ink x={t.x+55} y={86} size={25} fill={i === 0 ? P.white : '#a4a4ab'}>{t.title}</Ink>
        {i === 0 && <Ink x={t.x+174} y={85} size={21} fill={P.lavender} family="mono">¥13.8</Ink>}
      </g>)}
      <rect x={1190} y={42} width={228} height={70} rx={35} fill="#f3f1fb"/>
      <Ink x={1284 - (total.length>3 ? 12 : 0)} y={86} size={23} fill={P.gray} anchor="end">累计</Ink>
      <Ink x={1294 - (total.length>3 ? 12 : 0)} y={90} size={36} fill={P.purple} family="display">{`¥${total}`}</Ink>
    </g>
  </Canvas>;
};

const RMBFormat = new Intl.NumberFormat('en-US');
const rmbW = (v: string) => Array.from(v).reduce((w,c)=>w + (c === ',' ? 27 : 62), 82);

export const AClaude: FC<SceneProps> = ({frame,pose}) => {
  if (!pose.claudeTitle || !pose.claude) return null;
  const displayRmb = RMBFormat.format(rmbAt(frame));
  const amountW = rmbW(displayRmb);
  const rmbLeft = 950 - (215 + 32 + amountW + 28 + 449) / 2;
  const amountX = rmbLeft + 247;
  return <AbsoluteFill data-a-layer="claude-price" style={{
    opacity:pose.claude, transform:`translateY(${-50 * (1-pose.claude)}px)`,
  }}>
    <AbsoluteFill style={{opacity:pose.claudeTitle,transform:`translateY(${19*(1-pose.claudeTitle)}px)`}}>
      <ProductMark logo="claude" x={635} y={211} size={104} shadow/>
      <Canvas>
        <Ink x={767} y={267} size={72} width={426}>Claude Code</Ink>
        <Ink x={767} y={311} size={29} fill={P.gray} width={517}>主力账号 · 写代码 / 做画面 / 编排场景</Ink>
      </Canvas>
    </AbsoluteFill>
    <Canvas>
      {pose.usd > 0 && <g data-a-layer="claude-usd" opacity={pose.usd} transform={`translate(0 ${27*(1-pose.usd)})`}>
        <Ink x={625} y={582} size={220} family="display">$200</Ink>
        <Ink x={1205} y={579} size={48} fill={P.gray} width={91}>/ 月</Ink>
      </g>}
      {pose.rmb > 0 && <g data-a-layer="claude-rmb" data-amount={displayRmb} opacity={pose.rmb}>
        <line x1={320} y1={651} x2={1600} y2={651} stroke="#e4e4e5" strokeWidth={1.5}/>
        <g transform={`translate(0 ${27*(1-pose.rmb)})`}>
          <Ink x={rmbLeft} y={788} size={36} fill={P.gray} width={216}>折合人民币约</Ink>
          <Ink x={amountX} y={787} size={108} fill={P.purple} family="display" width={amountW}>{`¥${displayRmb}`}</Ink>
          <Ink x={amountX+amountW+28} y={788} size={36} fill={P.gray} width={446}>/ 月 (1 USD ≈ 6.67 CNY)</Ink>
        </g>
      </g>}
    </Canvas>
  </AbsoluteFill>;
};

const tapeFiles = [
  'wall-05.jpg','wall-06.jpg','wall-07.jpg','wall-02.jpg','wall-04.jpg','wall-01.jpg',
  'wall-12.jpg','wall-03.jpg','wall-08.jpg','wall-09.jpg','wall-10.jpg','wall-11.jpg',
] as const;
const tapeStep = 364;
const tapeWidth = 344;
const tapeH = 194;

export const AWorks: FC<SceneProps> = ({frame,pose}) => {
  if (!pose.works) return null;
  const offset = 8 + worksScrollAt(frame);
  const first = Math.floor(offset / tapeStep);
  const firstX = first*tapeStep - offset;
  const y = 164 + (1 - pose.worksIn) * 9 + pose.worksOut * 27;
  return <AbsoluteFill data-a-layer="output-division" style={{opacity:pose.works}}>
    <div data-a-layer="work-belt" data-scroll={offset} style={{
      ...at(0,y,W,242), overflow:'hidden', backgroundColor:'#141416',
    }}>
      {Array.from({length:7},(_,i) => {
        const slot = first+i;
        const name = tapeFiles[slot % tapeFiles.length];
        return <div key={slot} style={{
          ...at(firstX + i*tapeStep,23,tapeWidth,tapeH), overflow:'hidden', borderRadius:8, backgroundColor:'#212123',
        }}>
          <Img src={staticFile(`web/${name}`)} alt="" style={{width:'100%',height:'100%',display:'block',objectFit:'cover'}} />
        </div>;
      })}
      {pose.volume > 0 && <div style={{
        ...at(93,21,467,66), borderRadius:14,
        opacity:pose.volume, transform:`translateY(${-13*(1-pose.volume)}px)`,background:'rgba(24,24,26,.93)',
        boxShadow:'0 7px 14px rgba(0,0,0,.21)',
      }}>
        <svg width={467} height={66} style={{display:'block'}}>
          <Ink x={24} y={45} size={27} fill="#f9f9fa" width={194}>近一个月真实产出</Ink>
          <Ink x={233} y={43} size={42} fill={P.lavender} family="display" width={214}>104 条视频</Ink>
        </svg>
      </div>}
    </div>
    <Canvas>
      <g transform={`translate(0 ${22*(1-pose.worksIn)+21*pose.worksOut})`}>
        <Ink x={199} y={524} size={31} fill={P.gray}>Claude Code $200/月</Ink>
        <Ink x={171} y={642} size={115} family="display" width={372}>¥1,334</Ink>
        <Ink x={601} y={638} size={99} fill="#a5a5ad">÷</Ink>
        {pose.volume > 0 && <g data-a-layer="count-104" opacity={pose.volume} transform={`translate(0 ${25*(1-pose.volume)})`}>
          <Ink x={814} y={524} size={29} fill={P.gray}>单月全自动产量</Ink>
          <Ink x={735} y={642} size={115} family="display" width={362}>104 条</Ink>
        </g>}
        {pose.formula > 0 && <g data-a-layer="division-result" opacity={pose.formula} transform={`translate(0 ${20*(1-pose.formula)})`}>
          <Ink x={1128} y={636} size={98} fill="#a5a5ad">=</Ink>
          <Ink x={1415} y={501} size={28} fill={P.purple}>主力单期均摊</Ink>
          <Ink x={1249} y={655} size={157} fill={P.purple} family="display" width={432}>¥12.8</Ink>
          <Ink x={1689} y={654} size={35}>/ 期</Ink>
          <Ink x={953} y={822} size={35} fill={P.gray} anchor="middle" width={1032}>不到 13 块钱 / 期（1,334 ÷ 104 = 12.83 · 产量越高摊得越薄）</Ink>
        </g>}
      </g>
    </Canvas>
  </AbsoluteFill>;
};
