import React from 'react';
import {BigValue,BLUE,SkillBrand,CutVeil,Fill,Flourish,Foot,GOLD,Glyph,Header,HeroText,Media,Panel,Pill,useChapter,useMotion,useStage,WHITE,pos} from './craft';
import {cue,fitPhase,linear,mix,rise} from './clock';

const opening = {
 'launch-units': {title:'首日销量估算', sub:'DAY-ONE UNITS · SENSOR TOWER EST.',value:'2460 万份', tone:'gold', key:'units',foot:'Rockstar Games 官方宣传画面 · 约数为含预购的第三方估算，非发行方披露首日新增'},
 'launch-revenue': {title:'首日流水估算',sub:'DAY-ONE REVENUE · EST.',value:'$23.6 亿',tone:'gold',key:'revenue',foot:'第三方估算（含预购） · Sensor Tower / GamesIndustry.biz · 非发行方首日零售口径'},
 'launch-rating': {title:'Metacritic 媒体评分',sub:'ALL-TIME HIGH · CRITIC REVIEWS',value:'99 分',tone:'silver',key:'rating',foot:'Metacritic · PS5 媒体综合评分；并非玩家分'},
 'zero-gen': {title:'生成式 AI 占比',sub:'ZERO GENERATIVE AI IN ROCKSTAR',value:'0%',tone:'red',key:'zero',foot:'来源：Take-Two CEO Strauss Zelnick · GamesIndustry.biz 采访'},
 'hardware-tease': {title:'AI 抢内存导致的涨价',sub:'THE HIDDEN AI HARDWARE TAX',value:'+¥500',tone:'red',key:'hardware',foot:'原片解读及媒体旧价口径 · 官方通告仅确认新价，未认定 AI 为直接原因'},
} as const;
export type MetricId=keyof typeof opening;
export function OpeningMetric({id}:{id:MetricId}) {
 const {frame:f}=useStage();const m=opening[id];const sc=useChapter();
 const title=useMotion(`${m.key}-title`);const n=useMotion(`${m.key}-num`);
 const units=id==='launch-units', carryUnits=id==='launch-revenue'&&f<114;
 const unitsP=cue(f,'units-num')*fitPhase(f,[[108,1],[112,.67],[113,.22],[114,0]]);
 const handover=id==='launch-rating'&&f<171?['$23.6 亿','gold',171] as const:null;
 const carryZero=id==='hardware-tease'&&f<867?fitPhase(f,[[864,.57],[865,.39],[866,.19],[867,0]]):0;
 const tail=id==='launch-revenue'?mix(.5,1,linear(sc.end-f,0,5)):1;
 return <>
  {(units||carryUnits)&&unitsP>0&&<Fill style={{background:`radial-gradient(ellipse at 50% 44%, rgba(229,151,57,${.57*unitsP}) 0%, rgba(151,78,19,${.38*unitsP}) 48%, rgba(12,8,3,${.21*unitsP}) 79%), linear-gradient(0deg,rgba(19,12,5,${.68*unitsP}),transparent 74%)`}}/>}
  <Header title={m.title} sub={m.sub} top={units?221:208} size={units?62:53} p={units?cue(f,'units-title',q=>q):title} orn={false}/>
  {(units||carryUnits)&&unitsP>0&&<BigValue value="2460 万份" color="gold" p={unitsP} reveal={1} y={398} font={195} blur={f<29?(1-unitsP)*7:f>=112?(1-unitsP)*4:undefined}/>}
  {handover&&<BigValue value={handover[0]} color={handover[1]} p={.63*linear(handover[2]-f,0,5)}/>}
  {carryZero>0&&<BigValue value="0%" color="red" p={carryZero} font={170} reveal={1}/>}
  {!units&&<BigValue value={m.value} color={m.tone} p={n*tail} font={id==='zero-gen'?170:154}/>}
  {id==='zero-gen'&&<div className="subhead" style={{...pos(0,613,1920),textAlign:'center',opacity:n}}>一行生成式 AI 都没有</div>}
  {id==='hardware-tease'&&<div className="subhead" style={{...pos(0,627,1920),textAlign:'center',opacity:n}}>被算进 AI 账单的游戏入场券</div>}
  <Foot style={{opacity:.62*title}}>{m.foot}</Foot>
 </>;
}

const pictureData={
 'npc-detail': {title:'全网刷屏的 NPC 细节', sub:'EVERYONE IS TALKING ABOUT THE NPCS',main:'npcMain',inset:'npcInset',label:'海滩作息 · 路人记忆 · 细节拉满',small:'NPC 的生活细节',insetEn:'VICE CITY · STREET & COAST',hint:'Rockstar Games · Grand Theft Auto VI 官方预告；按原构图匹配',labelCue:'npc-label',insetCue:'npc-inset'},
 'handcrafted': {title:'Rockstar North 强硬确认',sub:'HANDCRAFTED BUILDING BY BUILDING · AUG 2026',main:'handMain',inset:'handInset',label:'一栋楼一栋楼、一条街一条街手工搭出来',small:'核心世界 · 手工打磨',insetEn:'ROCKSTAR GAMES · GTA VI',hint:'官方预告作场景说明 · “手工打造”可核对到 Strauss Zelnick 采访；未取得 8 月独立声明画面',labelCue:'hand-label',insetCue:'hand-inset'},
 'genie': {title:'Google DeepMind · Genie 3', sub:'INTERACTIVE WORLD MODEL · REAL-TIME GENERATION',main:'genieMain',inset:'genieInset',label:'几张图 / 一句话 → 实时生成可交互世界',small:'可交互驾驶与转向',insetEn:'GENIE 3 官方演示 · 720P 模型',hint:'来源：Google DeepMind · Genie 3 官方模型演示（生成世界，非实拍）',labelCue:'genie-label',insetCue:'genie-inset'},
} as const;
export type FeatureId=keyof typeof pictureData;
export function PictureFeature({id}:{id:FeatureId}) {
 const {frame:f}=useStage();const s=useChapter(); const d=pictureData[id];
 const isNpc=id==='npc-detail';
 const onset=Math.max(.14,rise(f,s.start,12));const out=Math.max(.35,rise(s.end-f,0,9));
 const p=onset*out*(isNpc?fitPhase(f,[[566,1],[571,.62],[574,.24]]):1);
 const label=useMotion(d.labelCue), inset=useMotion(d.insetCue);
 const x=isNpc?fitPhase(f,[[473,0],[474,.58],[476,.86],[484,1]]):label;
 const reveal=isNpc&&x>0?1:x;
 const y=isNpc&&f>=452?Math.max(.86,inset):inset;
 return <>
  <Header title={d.title} sub={d.sub} p={p} size={id==='genie'?51:47}/>
  <div style={{...pos(230,190,1460,640),opacity:p,transform:`scale(${mix(1.014,1,p)})`,filter:`blur(${(1-onset)*5}px)`,background:'#121216',boxShadow:'0 10px 52px #000a',overflow:'hidden',borderRadius:3}}>
   <Media lane={d.main} width={1460} height={640} alt={d.title} style={{opacity:.96}}/>
   <Fill style={{background:'linear-gradient(0deg,#08060855,transparent 29%)'}}/>
   <div style={{...pos(29,548),opacity:x,transform:`translateY(${(1-x)*12}px)`,clipPath:`inset(0 ${100-reveal*100}% 0 0)`}}><Pill tone="gold-solid" font={27}>{d.label}</Pill></div>
  </div>
  {y>0&&<Panel left={1249} top={519} width={524} height={302} tone="blue" orn={false} style={{borderRadius:16,background:'#273145',opacity:p*y,transform:`translate(${(1-y)*37}px,${(1-y)*12}px)`}}>
   <Media lane={d.inset} left={13} top={12} width={494} height={198} style={{borderRadius:10}} alt={d.small}/>
   <Glyph style={{...pos(19,214),fontSize:29}}>{d.small}</Glyph><div className="label-small" style={pos(19,254)}>{d.insetEn}</div>
  </Panel>}
  <Foot style={{opacity:.63*p}}>{d.hint}</Foot>
 </>;
}

const agenda=[{lane:'agenda01',name:'为何零 AI',en:'WHY ROCKSTAR SAID NO'},{lane:'agenda02',name:'AI 卡在哪',en:'WHERE AI HITS A WALL'},{lane:'agenda03',name:'涨到 4500',en:'HOW AI RAISED THE PRICE'}] as const;
export function Agenda({carry=false}:{carry?:boolean}) {
 const {frame:f}=useStage(); const top=rise(f,1116,8);
 const active=f>=1297?2:f>=1210&&f<1289?1:f>=1128&&f<1203?0:-1;
 const tail=fitPhase(f,[[1407,1],[1413,.60],[1415,.23],[1416,.10]]);
 return <>
  {agenda.map((a,i)=>{const p=cue(f,a.lane); if(p===0) return null; const focus=i===active;
   return <div key={a.lane} style={{...pos(i*640,0,640,1080),isolation:'isolate',borderRight:'1px solid #d5baa452',overflow:'hidden',transform:`translateY(${mix(900,0,p)}px)`,opacity:p*tail,filter:tail<1?`blur(${(1-tail)*10}px)`:undefined}}>
    <Media lane={a.lane} width={640} height={1080} style={{filter:`brightness(${focus?.87:.60})`,transform:'scale(1.005)'}}/>
    <Fill style={{background:'linear-gradient(180deg,#02020475,#05060818 36%,#0a0a0e77 54%,#08090df0 100%)'}}/>
    <Glyph fill={focus?'gold':'silver'} style={{...pos(39,207),fontSize:106,opacity:focus?.74:.33}}>0{i+1}</Glyph>
    <Glyph fill={focus?'gold':'silver'} gradient={focus} style={{...pos(28,454,584),fontSize:62,textAlign:'center'}}>{a.name}</Glyph>
    <div className="subhead" style={{...pos(28,542,584),textAlign:'center',fontSize:14}}>{a.en}</div>
    <div style={{...pos(0,1074,640,6),background:'#dfbb62',opacity:focus?.8:.25}}/>
   </div>;
  })}
  <Header title="今天拆开三笔账" sub="THREE QUESTIONS FOR TODAY" size={44} p={top*(carry?.9:1)*tail} top={58} orn={false}/>
 </>;
}
export function Paradox() {
 const {frame:f}=useStage();const a=useMotion('paradox-line1'),b=cue(f,'paradox-line2',q=>q);
 return <><HeroText a="最火的游戏拒绝了 AI" b="却处处被 AI 改写账本" size={79} y={295} p1={a*mix(.35,1,linear(1126-f,0,13))} p2={b*mix(.32,1,linear(1126-f,0,13))} revealSecond={f>=1069&&f<1074?1:undefined}/>{f>=1118&&<Agenda carry/>}</>;
}
export function CarryParadox() {
 const {frame:f}=useStage(); if(f>=1132) return null;
 const t=.45*linear(1132-f,0,9);
 return <HeroText a="最火的游戏拒绝了 AI" b="却处处被 AI 改写账本" size={79} y={295} p1={t} p2={t}/>;
}
export function Skill() {
 const {frame:f}=useStage();
 const p=fitPhase(f,[[1417,.23],[1420,.83],[1424,1],[1571,1],[1573,.80],[1575,.44]]);
 const cta=fitPhase(f,[[1539,0],[1540,.48],[1541,.78],[1543,.95],[1546,1],[1570,1],[1572,.89],[1573,.69],[1574,.48],[1575,0]]);
 const ctaScale=fitPhase(f,[[1539,1.065],[1540,1.057],[1541,1.042],[1542,1.026],[1545,1.008],[1548,1]]);
 const items=[
  ['选题研究',291,150,1448],['写稿',455,96,1454],['配音',566,96,1461],
  ['找素材',679,123,1467],['剪辑',815,96,1474],['出片',924,96,1481],
 ] as const;
 return <>
  <div style={{...pos(307,147,1306,644),opacity:p,transform:`scale(${mix(.98,1,p)})`,
   filter:`blur(${(1-p)*3}px)`,borderRadius:20,boxShadow:'0 10px 48px #000a,0 0 20px #d2a65e26'}}>
   <svg width="1306" height="644" viewBox="0 0 1306 644" style={pos(0,0)}>
    <defs>
     <linearGradient id="skill-panel-neutral" x1="0" y1="0" x2="0" y2="1">
      <stop stopColor="#191919"/><stop offset=".38" stopColor="#09090a"/><stop offset="1" stopColor="#020203"/>
     </linearGradient>
     <linearGradient id="skill-panel-rim" x1="0" y1="0" x2="1" y2="1">
      <stop stopColor="#e3dacf"/><stop offset=".48" stopColor="#aca382"/><stop offset=".77" stopColor="#d0b475"/><stop offset="1" stopColor="#81714e"/>
     </linearGradient>
     <linearGradient id="skill-title-gold" x1="0" y1="0" x2="0" y2="1">
      <stop stopColor="#f9e1b0"/><stop offset=".45" stopColor="#edc676"/><stop offset="1" stopColor="#c99547"/>
     </linearGradient>
     <linearGradient id="skill-title-silver" x1="0" y1="0" x2="0" y2="1">
      <stop stopColor="#f9faff"/><stop offset="1" stopColor="#c6ced9"/>
     </linearGradient>
     <linearGradient id="skill-pill-dark" x1="0" y1="0" x2="0" y2="1">
      <stop stopColor="#3a2f19"/><stop offset="1" stopColor="#251d10"/>
     </linearGradient>
    </defs>
    <rect x="1.3" y="1.3" width="1303.4" height="641.4" rx="20" fill="url(#skill-panel-neutral)" stroke="url(#skill-panel-rim)" strokeWidth="2.6"/>
    <g fill="none" stroke="#b7a06d" strokeWidth="1.3" opacity=".66">
     <path d="M13 603V622Q13 631 22 631H42 M18 611Q20 624 34 625 M8 626Q16 628 19 636"/>
     <path d="M1293 603V622Q1293 631 1284 631H1264 M1288 611Q1286 624 1272 625 M1298 626Q1290 628 1287 636"/>
    </g>
    <g textAnchor="middle" style={displayFont}>
     <text x="652" y="211" textLength="244" lengthAdjust="spacingAndGlyphs" fontSize="46"
      transform={fitItalicInk(652,194,.80)} fill="url(#skill-title-silver)">本期视频由</text>
     <text x="652" y="320" textLength="829" lengthAdjust="spacingAndGlyphs" fontSize="89"
      transform={fitItalicInk(652,291,.79)} fill="url(#skill-title-gold)">FredTalk Skill</text>
     <text x="650" y="418" textLength="435" lengthAdjust="spacingAndGlyphs" fontSize="58"
      transform={fitItalicInk(650,400,.84)} fill="url(#skill-title-silver)">全自动剪辑输出</text>
    </g>
    {items.map(([label,x,width,onset])=>{
     const active=fitPhase(f,[[onset-1,0],[onset,.41],[onset+2,1]]);
     return <g key={label} opacity={mix(.31,1,active)}>
      <rect x={x} y="474" width={width} height="53" rx="10" fill="url(#skill-pill-dark)" stroke="#89744c" strokeWidth="1.5"/>
      <text x={x+width/2} y="514" textAnchor="middle" fontFamily="FT07CN,sans-serif" fontSize="27"
       letterSpacing=".7" fontWeight="880" fill="#f0e5c5">{label}</text>
     </g>;
    })}
   </svg>
   <div style={{...pos(0,16,1306),textAlign:'center'}}><Flourish color={GOLD} w={123}/></div>
   <div style={{...pos(0,63,1306),textAlign:'center',transform:'scale(.80)'}}><SkillBrand/></div>
  </div>
  {cta>0&&<div style={{...pos(570,810,780,89),opacity:cta*p,transform:`scale(${ctaScale})`,
   filter:`blur(${(1-cta)*3}px)`,borderRadius:14,border:'1.3px solid #e97a5f',
   background:'linear-gradient(180deg,#ef6b52,#b42e24)',boxShadow:'0 3px 19px #b6433760'}}>
   <svg width="780" height="89" viewBox="0 0 780 89" style={pos(0,0)}>
    <text x="389" y="61" textAnchor="middle" textLength="689" lengthAdjust="spacingAndGlyphs"
     fontSize="46" style={displayFont} transform={fitItalicInk(389,43,.84)} fill="#fff3eb">有兴趣　·　评论区扣 Fred</text>
   </svg>
  </div>}
 </>;
}
// Each column rolls independently. Values between the audited face/half-roll anchors are fitted, not transcription.
const revenueWheel: readonly (readonly [number,number,number,number])[]=[
 [1578,0,0,0],[1584,0,0,0],[1593,.00,.08,7.82],[1594,.00,1.28,11.08],[1595,0,2,14],
 [1596,1.16,4.32,17.25],[1599,6,10,24],[1600,7,12,26],[1601,8,13,28],
 [1605,11,18,35],[1606,11.18,19.18,36],[1607,11.57,19.57,36.57],[1624,12,23,46],
];
const columns=[1,2,3].map(i=>revenueWheel.map(row=>[row[0],row[i]] as const));
// Editable block numerals with the same fitted wheel positions as the original render.
const revenueDigits = [
 'M10 1H134Q143 1 143 12V132Q143 143 132 143H11Q1 143 1 132V12Q1 1 10 1ZM50 33V111H94V33Z',
 'M31 1H97V111H133V143H10V111H51V32H22Z',
 'M11 1H133Q143 1 143 11V73Q143 83 133 83H51V111H143V143H11Q1 143 1 133V81Q1 71 11 71H94V33H51V45H1V12Q1 1 11 1Z',
 'M3 1H132Q143 1 143 12V55Q143 66 133 70Q143 75 143 86V132Q143 143 132 143H3V112H94V83H14V58H94V33H3Z',
 'M2 1H52V70H94V1H143V143H94V101H12Q2 101 2 91Z',
 'M2 1H143V33H51V54H132Q143 54 143 65V132Q143 143 132 143H2V111H94V84H2Z',
 'M11 1H143V33H52V52H133Q143 52 143 63V132Q143 143 132 143H11Q1 143 1 132V12Q1 1 11 1ZM51 81V112H94V81Z',
 'M2 1H143V30L91 143H35L87 33H2Z',
 'M10 1H132Q143 1 143 12V57Q143 66 133 71Q143 76 143 86V132Q143 143 132 143H11Q1 143 1 132V86Q1 76 11 71Q1 66 1 57V12Q1 1 10 1ZM51 31V57H93V31ZM51 84V113H93V84Z',
 'M10 1H133Q143 1 143 12V132Q143 143 132 143H2V111H93V93H11Q1 93 1 82V12Q1 1 10 1ZM50 32V63H93V32Z',
] as const;

const displayFont = {fontFamily:'FT07Display,FT07CN,sans-serif',fontWeight:900};
function fitItalicInk(x:number,y:number,scale=.82) {
 return `translate(${x} ${y}) skewX(-12) scale(1 ${scale}) translate(${-x} ${-y})`;
}

function RevenueWheels({positions}:{positions:readonly number[]}) {
 const starts = [17, 165, 381];
 const pitch = 156;
 const face = positions.map(position => Math.round(position)%10);
 return <svg width="533" height="162" viewBox="0 0 533 162" style={pos(588,418)}
  aria-label={`${face[0]}${face[1]}.${face[2]}`}>
   <defs>
    <clipPath id="revenue-wheels-clip"><rect width="533" height="162"/></clipPath>
    <linearGradient id="revenue-reel-cream" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
     <stop stopColor="#fffbee"/><stop offset=".55" stopColor="#fff6dc"/><stop offset="1" stopColor="#fff1d4"/>
    </linearGradient>
   </defs>
   <g fill="url(#revenue-reel-cream)" fillRule="evenodd" clipPath="url(#revenue-wheels-clip)"
    style={{filter:'drop-shadow(0 0 12px #fff1cc37)'}}>
    {positions.map((position,index)=>{
     const step=Math.floor(position);
     const offset=(position-step)*pitch;
     return <g key={index} transform={`translate(${starts[index]} ${8-offset})`}>
      {[0,1].map(item=><path key={item} d={revenueDigits[(step+item)%10]}
       transform={`translate(0 ${item*pitch}) translate(69 72) skewX(-8) translate(-69 -72) scale(.97 1)`}/>)}
     </g>;
    })}
    <path d="M329 98H352L350 114H327Z"/>
   </g>
 </svg>;
}

export function LaunchReel() {
 const {frame:f}=useStage(); const foot=useMotion('revenue-foot');
 const p=fitPhase(f,[[1577,0],[1578,.31],[1579,.68],[1586,1]]);
 const unit=fitPhase(f,[[1633,0],[1634,.35],[1641,1]]);
 const glow=fitPhase(f,[[1629,0],[1630,.25],[1636,1]]);
 const positions=columns.map(track=>fitPhase(f,track));
 const notes=foot*mix(.3,1,linear(1687-f,0,3));
 return <>
  <div style={{...pos(0,72,1920),opacity:p,transform:`translateY(${(1-p)*-12}px)`,filter:`blur(${(1-p)*5}px)`}}>
   <Flourish w={132}/>
  </div>
  <div style={{...pos(568,332,568,330),opacity:p,borderRadius:13,
   border:'1px solid #9d805d42',background:'linear-gradient(180deg,#07090f,#12151e 39%,#06070c 100%)',
   boxShadow:`0 19px 31px #0009,0 0 ${13+12*glow}px rgba(215,164,89,${.15+.17*glow})`}}>
   {[0,326].map(top=><div key={top} style={{...pos(-15,top,598,3),borderRadius:3,
    background:'linear-gradient(90deg,transparent,#c29e68 12%,#ffdfa1 47%,#d9ae62 84%,transparent)',
    boxShadow:'0 0 7px #f5c07342'}}/>)}
  </div>
  <div style={{...pos(0,0,1920,1080),opacity:p}}>
   <RevenueWheels positions={positions}/>
  </div>
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{...pos(0,0),pointerEvents:'none'}}>
   <defs>
    <linearGradient id="revenue-title-silver" x1="0" y1="0" x2="0" y2="1">
     <stop stopColor="#fbfcff"/><stop offset="1" stopColor="#c8cfdf"/>
    </linearGradient>
    <linearGradient id="revenue-unit-gold" x1="0" y1="0" x2="0" y2="1">
     <stop stopColor="#fbe0a5"/><stop offset="1" stopColor="#f4c36b"/>
    </linearGradient>
   </defs>
   <g opacity={p} style={displayFont}>
    <text x="959" y="152" textAnchor="middle" textLength="580" lengthAdjust="spacingAndGlyphs"
     fontSize="56" transform={fitItalicInk(959,132,.78)} fill="url(#revenue-title-silver)">GTA6　首日流水估算</text>
    <text x="959" y="198" textAnchor="middle" textLength="636" lengthAdjust="spacingAndGlyphs"
     fontFamily="FT07CN,sans-serif" fontWeight="650" fontSize="23" fill="#9497a4">DAY-ONE LAUNCH ESTIMATE · NOV 19, 2026</text>
    <text x="506" y="526" textAnchor="middle" textLength="78" lengthAdjust="spacingAndGlyphs"
     fontSize="90" transform={fitItalicInk(506,494,.89)} fill="#e2b45d"
     style={{filter:'drop-shadow(0 0 13px #f4b75d65)'}}>$</text>
    <text x="1309" y="555" textAnchor="middle" textLength="281" lengthAdjust="spacingAndGlyphs"
     fontSize="85" transform={fitItalicInk(1309,519,.94)} opacity={unit} fill="url(#revenue-unit-gold)">亿美元</text>
   </g>
   <g opacity={notes} fontFamily="FT07CN,sans-serif" textAnchor="middle">
    <path d="M385 735H497 M1423 735H1535" stroke="#a2885f" strokeOpacity=".50" strokeWidth="1"/>
    <text x="955" y="746" textLength="874" lengthAdjust="spacingAndGlyphs"
     fontSize="31" fontWeight="740" fill="#e1deeb">含预购在内约 2460 万份（Sensor Tower 第三方估算）</text>
    <text x="958" y="785" fontSize="18" fontWeight="590" letterSpacing="1.5"
     fill="#a6a6af">TAKE-TWO 另报首日零售额 $37.9 亿（公司估算）· 统计口径不同</text>
    <text x="957" y="824" fontSize="15" fontStyle="italic"
     fill="#83828b">Source: Sensor Tower / Make Tech Easier (2026-11-20)</text>
   </g>
  </svg>
 </>;
}
export function Benchmarks() {
 const {frame:f}=useStage();const s=useChapter();const p=mix(.5,1,rise(f,s.start,10))*mix(.45,1,rise(s.end-f,0,9));
 const grow=useMotion('bench-bars'),grow2=useMotion('bench-two'),rate=useMotion('bench-rating'),leave=useMotion('bench-leave');
 const chart=[{x:193,y:0,h:116,p:grow,c:'#91afd8',c2:'#3c5177',v:'$8.0 亿',caption:'GTA5 (2013)',sub:'TAKE-TWO OFFICIAL'},{x:528,y:0,h:254,p:grow2,c:'#ffe096',c2:'#c18727',v:'$23.6 亿',caption:'GTA6（含预购）',sub:'≈24.6M UNITS · 第三方'}];
 return <>
  <Header title="首日核弹级爆发数据" sub="GTA6 DAY-ONE BENCHMARKS · THIRD-PARTY EST. & METACRITIC" p={p}/>
  <Panel left={110} top={194} width={842} height={643} tone="blue" style={{opacity:p}}>
   <div style={pos(38,31)}><div className="stat-label">首日流水对比（亿美元）</div><div className="label-small" style={{marginTop:7}}>DAY-ONE REVENUE · OFFICIAL VS. THIRD-PARTY EST.</div></div>
   <div style={{...pos(57,523,718,2),background:'#7e899e60'}}/>
   {chart.map((r,i)=><React.Fragment key={r.caption}>
    <div style={{...pos(r.x-22,522-r.h*r.p,145,r.h*r.p),background:`linear-gradient(180deg,${r.c},${r.c2})`,borderRadius:'14px 14px 0 0',boxShadow:`0 0 ${20*r.p}px ${r.c}38`,borderTop:r.p>.01?'1px solid #fff6':'none'}}/>
    <div style={{...pos(r.x-88,511-r.h*r.p-56,277),textAlign:'center',opacity:r.p}}>{i===1&&<div style={{position:'absolute',left:54,top:-53}}><Pill font={21}>≈ 3 倍爆发</Pill></div>}<Glyph style={{fontSize:37}} fill={i===1?'gold':'blue'} gradient={i===1}>{r.v}</Glyph></div>
    <div style={{...pos(r.x-94,542,290),textAlign:'center',color:i===1?GOLD:WHITE}}><div className="stat-label">{r.caption}</div><div className="label-small" style={{fontSize:15}}>{r.sub}</div></div>
   </React.Fragment>)}
  </Panel>
  <Panel left={991} top={194} width={819} height={369} style={{opacity:p*mix(.41,1,rate)}}>
   <svg viewBox="0 0 250 250" width="250" height="250" style={pos(54,57)}><circle cx="125" cy="125" r="110" fill="#0c0c0f66" stroke="#f4df9940" strokeWidth="15"/><circle cx="125" cy="125" r="110" pathLength="100" strokeDasharray={`${99*rate} 100`} transform="rotate(-90 125 125)" strokeLinecap="round" fill="none" stroke="#f2ce72" strokeWidth="15" opacity={rate}/></svg>
   <div style={{...pos(56,130,250),textAlign:'center'}}><Glyph fill={rate>.01?'gold':'silver'} style={{fontSize:79}}>{rate>.01?`${Math.min(99,Math.round(rate*99))}`:'—'}</Glyph><div className="label-small">METACRITIC · PS5</div></div>
   <div style={pos(351,63,430)}><div className="label-small" style={{color:GOLD,fontSize:21}}>媒体评分 · 历史最高</div><Glyph style={{fontSize:47,margin:'22px 0 29px'}}>追平游戏史纪录</Glyph><Pill font={24}>0 条中差评（原片时点）</Pill></div>
  </Panel>
  <Panel left={991} top={598} width={819} height={239} tone="blue" orn={false} style={{opacity:p*mix(.28,1,leave)}}>
   <div style={pos(35,49,523)}><div className="label-small" style={{fontSize:19}}>发售当天社会热度外溢</div><Glyph style={{fontSize:35,margin:'15px 0 9px'}}>海外职场请假申请</Glyph><div className="label-small">早期报道估算区间上限 · BambooHR / Money</div></div>
   <Glyph fill="gold" gradient style={{...pos(569,72,234),fontSize:66}}>+17%</Glyph>
  </Panel>
  <Foot>Take-Two 2013 公告 / 第三方估算（含预购） / Metacritic PS5 / Money 引述 BambooHR（+9%～17% 区间，非全球）</Foot>
 </>;
}
function TwoAITitle({p}:{p:number}) {return <Header title="先分清两套完全不同的 AI" sub="TRADITIONAL GAME AI VS. GENERATIVE AI" p={p}/>;}
export function PartOne({carry=false}:{carry?:boolean}) {
 const {frame:f}=useStage();const p=cue(f,'chapter-one')*(carry?.20:mix(.54,1,linear(2394-f,0,7)));
 return <><Glyph fill="silver" style={{...pos(677,189,566),textAlign:'center',fontSize:236,opacity:p*.16}}>01</Glyph><HeroText a="最火的游戏" b="为何拒绝 AI" sub="PART 1 · WHY ZERO GENERATIVE AI" y={306} size={125} lineGap={22} p1={p} p2={p}/>{!carry&&f>=2392&&<TwoAITitle p={f===2392?.38:.64}/>}</>;
}
const aidata=[['传统游戏 AI','TRADITIONAL GAME AI','规则控制',['NPC 躲车、对话、巡逻行为','程序员写规则和状态机','机器学习等辅助优化']],['生成式 AI','GENERATIVE AI','内容生成',['大模型自动画图或贴图','AI 编写台词与合成配音','直接生成 3D 场景和资产']]] as const;
export function TwoAIs() {
 const {frame:f}=useStage();const ch=useChapter();const p=mix(.23,1,rise(f,ch.start,13))*mix(.3,1,rise(ch.end-f,0,10));const a=useMotion('ai-trad'),b=useMotion('ai-gen');
 return <>
  <TwoAITitle p={f<2407?Math.max(p,f===2394?.84:1):p}/>
  {f<2395&&<PartOne carry/>}
  <svg width="1920" height="404" style={{...pos(0,132),opacity:p}} viewBox="0 0 1920 404"><path d="M960 89v50H505v38M960 139H1415v38" stroke="#9aabcb7a" strokeWidth="2" fill="none"/><circle cx="960" cy="139" r="4" fill="#f6d17d"/></svg>
  <div style={{...pos(0,142,1920),textAlign:'center',opacity:p}}><Pill tone="soft" font={27} style={{padding:'9px 47px'}}>游戏开发里的“AI”</Pill></div>
  {aidata.map(([h,en,tag,rows],i)=>{
   const focus=i===0?Math.max(.34,mix(.32,1,a)-b*.42):mix(.31,1,b); const excluded=i===1&&f>=2837;
   return <Panel key={h} left={i?1018:111} top={313} width={791} height={503} tone={i?(b>.62?'red':''):'blue'} style={{opacity:p*focus,transform:`translateY(${mix(14,0,i?b:a)}px)`}}>
    <Glyph fill={i?'gold':'silver'} style={{...pos(31,38),fontSize:48}}>{h}</Glyph><div className="label-small" style={pos(33,105)}>{en}</div>
    {excluded?<div style={{position:'absolute',right:30,top:46}}><Pill tone="red" font={20}>GTA6 制作中 · 占比为零</Pill></div>:<div style={pos(581,46)}><Pill tone={i?'red':'blue'} font={24}>{tag}</Pill></div>}
    {rows.map((text,j)=>{const q=cue(f,`ai-${i?'gen':'trad'}${j}`);return <div key={text} className={`row ${i?'red':''}`} style={{...pos(31,151+j*104,724,82),fontSize:27,opacity:mix(.27,1,q),transform:`translateX(${mix(10,0,q)}px)`}}>{excluded?<>{text}<span style={{marginLeft:'auto',fontSize:31,color:'#ff8774'}}>×</span></>:<><span style={{fontSize:17,color:i?GOLD:BLUE}}>◆</span>{text}</>}</div>;})}
   </Panel>;
  })}
 </>;
}
export function Interview() {
 const s=useChapter();const {frame:f}=useStage();const t=mix(.35,1,rise(f,s.start,9))*mix(.12,1,rise(s.end-f,0,11)), hi=useMotion('quote-highlight'), foot=useMotion('quote-foot');
 return <>
  <Header title="Take-Two CEO 采访原话" sub="STRAUSS ZELNICK · GAMESINDUSTRY.BIZ INTERVIEW · FEB 2026" p={t}/>
  <div className="paper" style={{...pos(422,190,1076,573),opacity:t,filter:`blur(${(1-t)*6}px)`,transform:`translateY(${(1-t)*9}px)`}}>
   <Media lane="interview" width={1076} height={573} alt="GamesRadar+ 实际报道标题截图"/>
   <div style={{position:'absolute',inset:0,mixBlendMode:'multiply',opacity:hi}}>{[[62,29.4,33,9.1],[1.7,42.1,91,9.7],[1.55,54.1,22.9,8.8]].map(([x,y,w,h],i)=><span key={i} style={{position:'absolute',left:`${x}%`,top:`${y}%`,width:`${w}%`,height:`${h}%`,background:'#f9e15fa1',borderRadius:5,transform:`scaleX(${hi})`,transformOrigin:'left'}}/>)}</div>
  </div>
  <Foot style={{opacity:t*mix(.48,.81,foot)}}>截图：GamesRadar+（2026.02.04）；原访谈：GamesIndustry.biz · CEO 陈述，非对开发流程的独立审计</Foot>
 </>;
}
export function Reputation() {
 const s=useChapter();const {frame:f}=useStage();const l=useMotion('risk-left'),r=useMotion('risk-right'),v=useMotion('risk-row');const p=mix(.45,1,rise(f,s.start,10))*mix(.6,1,rise(s.end-f,0,9));
 const items=[{left:98,c:'blue' as const,h:'数百个 AI 试点',sub:'Take-Two 公司内部',eyebrow:'效率端 · EFFICIENCY',bg:'riskLeft',detail:'降本提效是公司的企业级工具',p:l*mix(1,.48,r),tags:['流程自动化','非核心制作']},{left:1021,c:'red' as const,h:'数十亿美元口碑',sub:'GTA6 这一块金字招牌',eyebrow:'一旦翻车 · IRREVERSIBLE COST',bg:'riskRight',detail:'任何可见 AI 味都会损害信任',p:mix(.35,1,r),tags:['× 露馅的台词','× 穿帮的贴图']}];
 return <>
  <Header title="不是不会用 AI，是这块招牌不敢赌" sub="CORPORATE EFFICIENCY VS. IRREVERSIBLE REPUTATION COST" p={p}/>
  {items.map(card=><Panel key={card.bg} left={card.left} top={260} width={796} height={440} tone={card.c} style={{opacity:p*card.p}}>
   <Media lane={card.bg} left={575} top={20} width={198} height={128} style={{borderRadius:10,opacity:.9}}/>
   <div style={pos(30,23)}><Pill tone={card.c} font={16}>{card.eyebrow}</Pill></div>
   <div className="label-small" style={{...pos(33,92),fontSize:21}}>{card.sub}</div><Glyph fill={card.c==='blue'?'silver':'red'} style={{...pos(29,143,731),fontSize:56}}>{card.h}</Glyph>
   <div style={{...pos(34,251,718),fontSize:29,fontWeight:850}}>{card.detail}</div>
   <div style={{...pos(34,323,718),display:'flex',gap:14}}>{card.tags.map(x=><Pill key={x} tone={card.c} font={22}>{x}</Pill>)}</div>
  </Panel>)}
  <div style={{...pos(902,386,113,113),borderRadius:'50%',display:'grid',placeItems:'center',background:r>.5?'#4c211a':'#3b3020',border:`2px solid ${r>.5?'#e87f6a':'#bb9857'}`,opacity:p,boxShadow:'0 0 31px #eba8613b'}}><Glyph fill={r>.5?'red':'gold'} style={{fontSize:54}}>{r>.5?'≠':'VS'}</Glyph></div>
  <Panel left={98} top={732} width={1720} height={103} style={{opacity:p*mix(.26,1,v),background:v>.05?'linear-gradient(90deg,#685229a9,#1d150cdd)':'#17223384',borderRadius:15}} orn={false}>
   <div style={pos(25,24)}><Pill tone="gold-solid" font={21}>R 星押注</Pill></div><Glyph fill="gold" style={{...pos(188,25,1480),fontSize:36}}>押上全部身家，赌「全手工」金字招牌</Glyph>
  </Panel>
 </>;
}
export function PartTwo({carry=false}:{carry?:boolean}) {
 const {frame:f}=useStage();const p=useMotion('p2-line1'),q=useMotion('p2-line2');const exit=carry?.28:mix(.45,1,linear(4276-f,0,6));
 return <>
  {!carry&&<><Media lane={f<4240?'bg':'genieMain'} left={0} top={361} width={1920} height={388} style={{boxShadow:'0 8px 75px #000',filter:'brightness(.81)'}}/><CutVeil amount={.16}/><Glyph style={{...pos(104,141),fontSize:119,opacity:.25*p}}>02</Glyph></>}
  <HeroText a="今天的 AI" b="做到哪一步" sub="PART 2 · WHERE AI STANDS TODAY" y={298} size={carry?105:119} lineGap={carry?18:29} p1={p*exit} p2={q*exit}/>
 </>;
}
