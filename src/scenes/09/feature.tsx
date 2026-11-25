import React from 'react';
import {Backdrop,Badge,CenterBox,Deco,En,F,GOLD,Header,Tag,X,mix,panel,turn} from './kit';
import {Clip,MediaNote,Pic} from './media';
import type {SceneProps} from './index';

export function Phone({f=0,bridge=false}:{f?:number;bridge?:boolean}){
 // Editorial object drawing, not a recreated or executed product UI.
 return <X w={960} h={540} style={{overflow:'hidden',background:'linear-gradient(120deg,#2e2726,#282523 60%,#0e1319)'}}><svg width="960" height="540" viewBox="0 0 960 540" style={{position:'absolute',filter:bridge?'blur(.25px)':'blur(6px)',transform:`scale(${1+f*.0007})`,transformOrigin:'48% 51%'}}><defs><linearGradient id="skin" x2="0.8" y2="1"><stop stopColor="#886d60"/><stop offset="1" stopColor="#392e2a"/></linearGradient><linearGradient id="glass" x2="0" y2="1"><stop stopColor="#779ab8"/><stop offset="1" stopColor="#394857"/></linearGradient></defs><path d="M0 80Q157 86 276 181L376 282Q403 303 366 318L268 286 222 274 262 321Q296 370 258 385L149 332 0 300Z" fill="url(#skin)" opacity=".88"/><path d="M960 20Q785 45 684 130L644 204 595 226Q569 256 596 266L648 258 582 310Q568 342 600 351L710 303 750 295 960 296Z" fill="url(#skin)"/><g transform={bridge?'translate(474 261) rotate(-27) scale(1.27 1.04)':'translate(462 281) rotate(-6) scale(1.08 .66)'}><rect x="-183" y="-67" width="366" height="142" rx="29" fill="#0a0f15" stroke="#635b51" strokeWidth="8"/><rect x="-172" y="-58" width="344" height="124" rx="24" fill="url(#glass)"/>{bridge&&<text x="0" y="8" textAnchor="middle" fill="#0e2348" fontFamily="Mi, sans-serif" fontWeight="900" fontSize="32">DeepSeek</text>}</g><path d="M0 0h960v540H0z" fill="#04060a" opacity=".32"/></svg><X w={960} h={540} style={{background:'radial-gradient(ellipse at 53% 40%,transparent 24%,#050505bb 85%),linear-gradient(0deg,#0a0909 2%,transparent 32%)'}}/>{bridge&&<MediaNote x={16} y={17}>手机端 · 示意</MediaNote>}</X>
}
// The settled grid was measured at f36. The final centers and rotations are
// read from the f52 pose, with obscured card edges estimated from neighboring frames.
const openerColumns = [80, 191, 307, 423, 539, 655, 770];
const openerRows = [
  [
    ['ChatGPT', 76, 345, 241, 1], ['Claude', 70, 396, 242, -4], ['Gemini', 68, 804, 284, 9],
    ['DeepSeek', 88, 982, 281, 0], ['Kimi', 44, 1259, 246, -15], ['豆包', 35, 1439, 302, -12],
    ['千问', 34, 1646, 265, 6],
  ],
  [
    ['元宝', 36, 366, 385, -6], ['智谱', 35, 579, 350, -2], ['MiniMax', 70, 838, 389, -3],
    ['Codex', 63, 1021, 282, 0], ['Claude\nCode', 51, 1227, 406, -5], ['Cursor', 70, 1334, 345, 14],
    ['WorkBuddy', 86, 1645, 394, 11],
  ],
  [
    ['Cowork', 74, 268, 411, -15], ['Manus', 64, 577, 377, 2], ['Comet', 62, 632, 481, 8],
    ['OpenClaw', 80, 831, 394, -14], ['即梦', 35, 1305, 466, -3], ['可灵', 36, 1335, 535, 5],
    ['海螺', 36, 1647, 451, 13],
  ],
  [
    ['Seedance', 85, 266, 621, 7], ['Seedream', 86, 460, 546, 13], ['Nano\nBanana', 53, 816, 601, 12],
    ['Midjourney', 86, 877, 561, -6], ['Suno', 51, 1191, 540, 14], ['小云雀', 51, 1439, 512, 12],
    ['LibTV', 60, 1647, 621, 7],
  ],
  [
    ['Flova', 55, 264, 661, -6], ['Lovart', 66, 374, 649, -5], ['Stitch', 62, 662, 658, -4],
    ['Lovable', 66, 988, 747, 14], ['秒哒', 35, 1060, 683, -2], ['扣子', 35, 1381, 691, 11],
    ['Dify', 41, 1647, 675, 2],
  ],
  [
    ['n8n', 38, 267, 789, -4], ['NotebookLM', 93, 623, 748, -14], ['秘塔', 36, 600, 717, -16],
    ['Perplexity', 80, 898, 747, 12], ['OpenRouter', 93, 1289, 781, 1],
    ['硅基流动', 70, 1320, 756, -5], ['Copilot', 61, 1647, 786, 0],
  ],
] as const;

// f37 is the last perfectly aligned frame. f38 starts the scatter and f39
// shows the faint question and gold text. The labels stay until the f112 cut.
const scatterCues = [
  [37, 0], [38, .045], [39, .18], [40, .34], [42, .57],
  [44, .75], [46, .88], [48, .95], [51, .99], [54, 1],
] as const;
function openerScatter(f:number) {
  for (let index = 1; index < scatterCues.length; index++) {
    const [fromFrame, fromValue] = scatterCues[index - 1];
    const [toFrame, toValue] = scatterCues[index];
    if (f <= toFrame) return mix(fromValue, toValue, Math.max(0, (f - fromFrame) / (toFrame - fromFrame)));
  }
  return 1;
}

const openerLettering:React.CSSProperties = {
  fontFamily: 'Rui, Mi, sans-serif', fontWeight: 900,
};

function openerInkPose(x:number, fromY:number, toY:number, heightScale:number) {
  return `translate(${x} ${toY}) skewX(-13) scale(1 ${heightScale}) translate(${-x} ${-fromY})`;
}

function Opener({f}:SceneProps) {
  const header = turn(f, .7, 6.6);
  const spread = openerScatter(f);
  const question = turn(f, 38, 52);
  const gold = turn(f, 38, 52);
  return <>
    <Phone f={f}/>
    <svg width="960" height="540" viewBox="0 0 960 540" aria-hidden="true"
      style={{position:'absolute',opacity:header,filter:`blur(${2.6 * (1 - header)}px)`}}>
      <g transform="translate(480 26.5)" fill="none" stroke="#a1a0a3" strokeWidth=".55">
        <path d="M-31.5 0H-8 M8 0h23.5 M-8 0q5-4 8 0q3 4 8 0q-5-4-8 0q-3 4-8 0Z"/>
        <path d="M0-3.3L1.9 0 0 3.3-1.9 0Z" fill="#9c9ba0"/>
      </g>
      <text x="480" y="62" textAnchor="middle" textLength="392" lengthAdjust="spacingAndGlyphs" transform={openerInkPose(480, 53, 52, .8)}
        fill="#e9eaf0" fontSize="27" style={openerLettering}>2026　·　这么多 AI 工具</text>
      <text x="480" y="85" textAnchor="middle" textLength="203" lengthAdjust="spacingAndGlyphs"
        fill="#96969d" fontFamily="Mi, sans-serif" fontSize="12" fontWeight="600">SO MANY AI TOOLS IN 2026</text>
    </svg>
    {openerRows.map((row, rowIndex) => row.map(([name, inkWidth, finalX, finalY, rotation], column) => {
      const x = openerColumns[column];
      const y = 100 + rowIndex * 54;
      const enterAt = 1.55 + (rowIndex * 7 + column) * 5 / 7;
      const enter = turn(f, enterAt, enterAt + 4.1);
      if (enter === 0) return null;
      const lines = name.split('\n');
      const stacked = lines.length > 1;
      const textSize = stacked ? 13.2 : name.length >= 9 ? 14.4 : 17.2;
      return <X key={name} x={mix(x, finalX / 2 - 53.5, spread)} y={mix(y, finalY / 2 - 21.5, spread)}
        w={107} h={43} style={{
          border: '0.65px solid #6d7088', borderRadius: 8,
          background: 'linear-gradient(180deg,#3a4054 0%,#2b3244 63%,#292f3f 100%)',
          boxShadow: '0 4px 9px #0004', opacity: enter * (1 - .43 * spread),
          transform: `rotate(${rotation * spread}deg) scale(${1 + .20 * (1 - enter)})`,
          filter: spread ? `blur(${1.35 * spread}px)` : undefined,
        }}>
        <svg width="107" height="43" viewBox="0 0 107 43" style={{position:'absolute',inset:0,overflow:'visible'}}>
          <g transform={openerInkPose(53.5, 23.5, 21, stacked ? .86 : .74)}>
            {lines.map((line, lineIndex) => <text key={line} x="53.5"
              y={stacked ? 17.5 + lineIndex * 15 : 27.5} textAnchor="middle"
              textLength={stacked ? inkWidth * line.length / Math.max(...lines.map(word => word.length)) : inkWidth}
              lengthAdjust="spacingAndGlyphs" fill="#edf0fa" fontSize={textSize} style={openerLettering}>{line}</text>)}
          </g>
        </svg>
      </X>;
    }))}
    {question > 0 && <svg width="960" height="540" viewBox="0 0 960 540" aria-hidden="true" style={{position:'absolute',inset:0}}>
      <defs>
        <linearGradient id="opener-gold" x1="0" x2="0" y1="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#f0d783"/><stop offset="1" stopColor="#a97535"/>
        </linearGradient>
      </defs>
      <g opacity={question} style={{transformOrigin:'480px 232px',transform:`scale(${1 + .20 * (1 - question)})`}} fill="#e9e6de">
        <path d="M438 164.5h86.8l-6.8 53.3-34.5 25.8-2.6 17.9h-34.1l4.4-31.5 33.6-23.7 2.5-12.2h-51.7Z"/>
        <path d="M445.7 271.8h34.5l-4.3 26.7h-34.5Z"/>
      </g>
      <text x="477.5" y="399" textAnchor="middle" textLength="247" lengthAdjust="spacingAndGlyphs"
        transform={openerInkPose(477.5, 389, 387, .8)}
        opacity={gold} fill="url(#opener-gold)" fontSize="29.5" style={openerLettering}>到底都有什么用？</text>
    </svg>}
  </>;
}
function City({p}:{p:number}){return <svg width="960" height="540" style={{position:'absolute',opacity:.70}}><rect width="960" height="540" fill="#0a0a0b"/><g transform="translate(474 259) rotate(-31)">{Array.from({length:8},(_,i)=><g key={i} transform={`translate(${(i%4)*169-382} ${Math.floor(i/4)*251-242+i%4*21})`}><path d="M0 40L97 8 151 58 152 214 65 176 0 209Z" fill={i%3?'#171716':'#201911'} stroke="#373834" strokeWidth="1"/>{Array.from({length:15},(_,j)=><path key={j} d={`M${j*10} ${35+12*Math.sin(j*.16)}v175 M0 ${48+j*10}h150`} fill="none" stroke="#89918f" opacity={.05+.29*p} strokeWidth=".65"/>)}</g>)}</g><rect width="960" height="540" fill="#020207" opacity={.13+.08*p}/></svg>}
function Lab({f}:{f:number}){return <svg viewBox="0 0 960 540" width="960" height="540" style={{position:'absolute',opacity:.70,filter:'blur(.35px)'}}><defs><linearGradient id="labwall" x2="0" y2="1"><stop stopColor="#582b0c"/><stop offset="1" stopColor="#15120c"/></linearGradient><linearGradient id="labpip" x2="0" y2="1"><stop stopColor="#a96b25"/><stop offset="1" stopColor="#4f341a"/></linearGradient></defs><rect width="960" height="540" fill="url(#labwall)"/><path d="M98 196L176 112 643 68 843 138 758 218 303 262Z" stroke="#ab6b28" strokeWidth="6" fill="#372616"/><path d="M163 194L780 126 752 215 271 273Z" fill="url(#labpip)"/>{Array.from({length:9},(_,i)=><path key={i} fill="#e3ac56" opacity={.53+i*.032} d={`M${211+i*62} ${240-i*6+Math.sin(f/58)*13}l14 -5 -2 76 -5 20 -5 -15z`}/>)}<path d="M87 431L298 376 871 389 957 443Z" fill="#433421"/><circle cx="112" cy="171" r="160" fill="#d4832326"/></svg>}
function Chip({f}:{f:number}){return <svg width="960" height="540" style={{position:'absolute',opacity:.7}}><g transform={`translate(480 273) rotate(${-15+f*.09})`}><rect x="-152" y="-152" width="304" height="304" rx="16" fill="#173038" stroke="#748e79" strokeWidth="3"/>{Array.from({length:26},(_,i)=><g key={i} stroke="#8d9e69" strokeWidth="2" opacity={.25+.30*(i%3)/2}><path d={`M${-140+i*11} -145v55l8 12 0 12M${-140+i*11} 145v-55l-8 -12v-12 M145 ${-140+i*11}h-55l-12 8h-12 M-145 ${-140+i*11}h55l12 -8h12`}/></g>)}<rect x="-88" y="-88" width="176" height="176" rx="11" fill="#1e292d" stroke="#9ba28e"/><rect x="-66" y="-66" width="132" height="132" rx="9" fill="#183943" opacity=".8"/></g></svg>}
function Pylons(){return <svg width="960" height="540" style={{position:'absolute',opacity:.55}}><path d="M0 363L129 318l117 38 162-42 138 38 160-45 254 34v199H0Z" fill="#192626"/>{[143,416,658,822].map((x,i)=><g key={x} transform={`translate(${x} ${130+i%2*25}) scale(${1-i*.095})`} fill="none" stroke="#81959c" strokeWidth="3"><path d="M-36 274l32-124L-17 9h33L4 150l32 124M-31 257l56-48-45-39 37-40-28-34 24-38L-18 22m44 183-55 42m23-97 15 0m-41-71h69m-78 39h89m-79-73h68"/><path d="M-44 45Q74 81 267 55M-39 79Q95 115 277 87M-45 120Q86 153 265 126" strokeWidth="1"/></g>)}</svg>}
function Desk(){return <svg width="100%" height="100%" viewBox="0 0 720 317" preserveAspectRatio="xMidYMid slice" style={{display:'block'}}><defs><linearGradient id="desk" x2="0" y2="1"><stop stopColor="#213e3c"/><stop offset="1" stopColor="#3c312c"/></linearGradient></defs><rect width="720" height="317" fill="url(#desk)"/>{[18,103,301,393,525,625].map((x,i)=><path key={x} d={`M${x} 0l${i%2?12:-8} 212`} stroke="#72877d" opacity=".32" strokeWidth="7"/>)}<path d="M0 216L720 178v139H0z" fill="#44362d"/><path d="M270 175l208-16 44 72-218 30z" fill="#9b9e9e" stroke="#bfc3c1" strokeWidth="3"/>{Array.from({length:11},(_,i)=><path key={i} d={`M${282+i*17} 181l21 44`} stroke="#293337" strokeWidth="4" opacity=".74"/>)}<path d="M720 62Q695 43 660 62L583 137 507 169Q463 177 441 193Q430 201 448 207l44-3 30 6 58-10 140-45Z" fill="#ab826e"/><path d="M210 181q9-21 33-14l21 7-15 60h-36z" fill="#c5b9a7"/></svg>}
function HeroText({primary,hero,en,p,q,variant='warm'}:{primary:string;hero:string;en:string;p:number;q:number;variant?:'warm'|'steel'|'code'}){return <X x={47} y={variant==='code'?178:variant==='steel'?185:169} w={866} style={{textAlign:'center'}}><div style={{opacity:p,transform:`translateY(${6*(1-p)}px)`}}><F size={variant==='steel'?28:30}>{primary}</F></div><div style={{margin:'9px auto',clipPath:`inset(0 ${(1-q)*100}% 0 0)`,display:'table'}}><F size={variant==='warm'&&hero==='算力'?83:hero.startsWith('99%')?63:43} color={GOLD} style={{textShadow:'0 0 21px #e7a8393e,0 5px 2px #130e08'}}>{hero}</F></div><En size={10} style={{opacity:q}}>{en}</En></X>}
function EndCard({f}:{f:number}){
 const card=turn(f,14489,14510),call=turn(f,14582,14598);
 return <><Backdrop kind="warm" t={(f-14489)/30}/>{card>0&&<CenterBox x={180} y={90+9*(1-card)} w={600} h={280} style={{opacity:card,transform:`scale(${.965+.035*card})`,borderColor:'#9f9163',borderRadius:8,boxShadow:'0 13px 55px #0008,inset 0 0 0 2px #cfbf8118'}}><X x={14} y={55} w={572} style={{whiteSpace:'nowrap'}}><F size={27}>你最常用的 AI 工具是哪个？</F></X><X x={20} y={120} w={560} style={{display:'flex',justifyContent:'center',gap:14}}>{['1F 模型','2F Agent','3F 平台'].map(txt=><span key={txt} style={{border:'1px dashed #85785e',padding:'8px 13px',borderRadius:5}}><F size={19}>{txt}</F></span>)}</X><X y={186} w={600}><F size={24} color={GOLD}>它在第几层？</F></X></CenterBox>}{call>0&&<X x={385} y={395+(1-call)*6} w={190} h={43} style={{background:'linear-gradient(#ed674a,#ba2f22)',border:'1px solid #e7755d',borderRadius:7,display:'grid',placeItems:'center',opacity:call,filter:`blur(${(1-call)*4}px)`,boxShadow:'0 2px 12px #d7333055'}}><F size={17}>评论区告诉我</F></X>}</>;
}
export function Feature({route,shot,f,local}:SceneProps&{route:string}){
 const t=local/30;
 if(route==='phone')return <Opener shot={shot} f={f} local={local}/>;
 if(route==='phoneBridge')return <Phone f={local} bridge/>;
 if(route==='headline')return <><City p={turn(local,19,37)}/><HeroText primary={shot.title} hero="99% 的人都懂" en="AFTER THIS VIDEO" p={turn(local,5,19)} q={turn(local,31,41)}/></>;
 if(route==='science')return <><Backdrop kind="warm" t={t}/><Lab f={f}/><X w={960} h={540} style={{background:'radial-gradient(ellipse at 50% 41%,transparent 11%,#0403018c 87%),linear-gradient(0deg,#090809 0%,transparent 27%)'}}/><HeroText primary="AI 帮科学家" hero="做出数学和物理新结果" en="OPENAI · NEW RESEARCH RESULTS · OCT 2026" p={turn(local,6,18)} q={turn(local,16,29)}/></>;
 if(route==='ground')return <><Backdrop kind="silver" t={t}/><Chip f={local}/><X w={960} h={540} style={{opacity:turn(f,2243,2250)*(1-turn(f,2275,2284))}}><Pic name="rack" alt="NVIDIA GB200 NVL72 官方机柜图" style={{objectFit:'cover',filter:'brightness(.56)'}}/><MediaNote x={12} y={12}>NVIDIA · 官方机柜图</MediaNote></X><X w={960} h={540} style={{opacity:turn(f,2275,2284)}}><Backdrop kind="silver" t={t}/><Pylons/></X><HeroText primary={shot.title} hero="算力" en="GPU · DATA CENTERS · POWER" p={turn(local,4,15)} q={turn(local,11,24)}/></>;
 if(route==='codeHeadline')return <><Backdrop kind="silver" t={t}/><X x={83} y={64} w={797} h={318} style={{transform:'rotate(-10deg)',font:'900 42px monospace',lineHeight:1.7,color:'#599bc789',filter:'blur(2px)',whiteSpace:'nowrap',overflow:'hidden'}}>{'{ request → model → code }'}<br/>{'review  →  change  →  verify'}<br/>{'…'}</X><HeroText primary="一楼里 · 进化最快" hero="写代码的能力" en="CODING CAPABILITY · FASTEST IMPROVEMENT" p={turn(local,9,24)} q={turn(local,29,45)} variant="code"/></>;
 if(route==='advisor'||route==='agentMetaphor'){
  const agent=route==='agentMetaphor';return <><Backdrop kind="silver" t={t}/>{agent&&<X x={295} y={20} w={665} h={426} style={{opacity:.70}}><Pic name="codex" alt="Codex 桌面产品官网展示画面" style={{objectFit:'cover',objectPosition:'center top',filter:'brightness(.7)'}}/><MediaNote x={476} y={5}>Codex · 官方界面</MediaNote></X>}<X w={960} h={540} style={{background:'radial-gradient(ellipse at 50% 45%,#151820b0 0%,#121a2140 53%,transparent 79%)'}}/><HeroText primary={agent?'二楼的 Agent':'一楼的模型'} hero={agent?'配了一台电脑和一双手':'隔着屏幕出主意的军师'} en={agent?'2F · AN AGENT GETS A COMPUTER AND HANDS':'1F · A MODEL CAN ONLY ADVISE'} p={turn(local,agent?0:-7,13)} q={turn(local,agent?21:12,agent?34:26)} variant="steel"/></>;
 }
 if(route==='promo'){
  const card = Math.max(0, Math.min(1, (f - 360) * .2));
  const callStep = Math.max(0, Math.min(9, f - 460));
  const call = [0,.36,.66,.86,.97,1,1,1,1,1][callStep];
  const callScale = [1.06,1.057,1.044,1.026,1.016,1.009,1.005,1.002,1.001,1][callStep];
  const pills = [
    ['查资料',153.5,60,379], ['写稿',222,46,386], ['配音',276.5,46,392],
    ['找素材',331,60,399], ['剪辑',399,47,405], ['出片',454.5,46,412],
  ] as const;
  return <>
    <Backdrop kind="warm" t={t}/>
    {card > 0 && <X x={153} y={73.5+5*(1-card)} w={654} h={323}
      style={{opacity:card,filter:`blur(${(1-card)*3}px)`,borderRadius:10,boxShadow:'0 14px 40px #0009,0 0 7px #c5a96d2b'}}>
      <svg width="654" height="323" viewBox="0 0 654 323" style={{display:'block',overflow:'visible'}}>
        <defs>
          <linearGradient id="promo-card-fill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#1a1a1b"/><stop offset=".37" stopColor="#0c0c0d"/><stop offset="1" stopColor="#020203"/>
          </linearGradient>
          <linearGradient id="promo-card-rim" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d3cec2"/><stop offset=".48" stopColor="#a29778"/>
            <stop offset=".71" stopColor="#ab9564"/><stop offset="1" stopColor="#5c513a"/>
          </linearGradient>
          <linearGradient id="promo-white" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#fafbff"/><stop offset="1" stopColor="#c4cbd5"/>
          </linearGradient>
          <linearGradient id="promo-gold" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#f8dfaa"/><stop offset=".49" stopColor="#edc477"/><stop offset="1" stopColor="#c5964a"/>
          </linearGradient>
          <linearGradient id="promo-pill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#352b18"/><stop offset="1" stopColor="#241d10"/>
          </linearGradient>
        </defs>
        <rect x=".6" y=".6" width="652.8" height="321.8" rx="10" fill="url(#promo-card-fill)" stroke="url(#promo-card-rim)" strokeWidth="1.2"/>
        <g transform="translate(327 12.5)" fill="none" stroke="#aa9b76" strokeWidth=".45">
          <path d="M-29 0H-6 M6 0h23 M-6 0q4-3 6 0q2 3 6 0q-4-3-6 0q-2 3-6 0Z"/>
          <path d="M0-2.5L1.3 0 0 2.5-1.3 0Z" fill="#aa9b76"/>
        </g>
        <g fill="none" stroke="#ad9462" strokeWidth=".55" opacity=".63">
          <path d="M7 303v8q0 6 6 6h9 M10 307q1 7 9 7 M6 314q4 1 5 5"/>
          <path d="M647 303v8q0 6-6 6h-9 M644 307q-1 7-9 7 M648 314q-4 1-5 5"/>
        </g>
        <text x="327" y="59" textAnchor="middle" textLength="108" lengthAdjust="spacingAndGlyphs"
          fontFamily="Mi, sans-serif" fontSize="29" fontWeight="900" fill="#fff">FredTalk</text>
        <text x="325.5" y="103" textAnchor="middle" textLength="122" lengthAdjust="spacingAndGlyphs"
          fontSize="23" style={openerLettering} transform={openerInkPose(325.5,97.5,96,.82)} fill="url(#promo-white)">本期视频由</text>
        <text x="326.5" y="154" textAnchor="middle" textLength="414" lengthAdjust="spacingAndGlyphs"
          fontSize="43" style={openerLettering} transform={openerInkPose(326.5,144,144,.79)} fill="url(#promo-gold)">FredTalk Skill</text>
        <text x="325" y="205" textAnchor="middle" textLength="216" lengthAdjust="spacingAndGlyphs"
          fontSize="29" style={openerLettering} transform={openerInkPose(325,198.5,198,.82)} fill="url(#promo-white)">全自动剪辑输出</text>
        {pills.map(([label,x,width,start]) => {
          const active = turn(f,start-.15,start+1.7);
          const center = x + width/2;
          return <g key={label} opacity={.22+.78*active}>
            <rect x={x} y="237.5" width={width} height="26" rx="5" fill="url(#promo-pill)" stroke="#8d784f" strokeWidth=".7"/>
            <text x={center} y="255.5" textAnchor="middle" textLength={label.length*13} lengthAdjust="spacingAndGlyphs"
              fontSize="14" style={openerLettering} transform={openerInkPose(center,252,251.25,.82)} fill="#f2e4bb">{label}</text>
          </g>;
        })}
      </svg>
    </X>}
    {call>0 && <X x={284} y={406+3*(1-call)} w={392} h={45}
      style={{
        background:'linear-gradient(#ed684b,#ac3125)',border:'1px solid #e57054',borderRadius:7,
        opacity:call,boxShadow:'0 2px 11px #e34d303c',filter:`blur(${(1-call)*2.6}px)`,transform:`scale(${callScale})`,
      }}>
      <svg width="392" height="45" viewBox="0 0 392 45" style={{display:'block'}}>
        <text x="194.5" y="29" textAnchor="middle" textLength="346" lengthAdjust="spacingAndGlyphs"
          fontSize="23" style={openerLettering} transform={openerInkPose(194.5,24,24,.84)} fill="#fff4ed">有兴趣 · 评论区扣 Fred</text>
      </svg>
    </X>}
  </>;
 }
 if(route==='definition'){
  const p=turn(f,8574,8592);return <><Backdrop kind="warm" t={t}/><CenterBox x={130} y={111+9*(1-p)} w={700} h={249} style={{opacity:p}}><X x={29} y={-13}><Tag>Anthropic 的定义</Tag></X><X x={41} y={43}><F size={62} color="#ba9f5b60">“</F></X><X y={73} w={700} style={{opacity:turn(f,8586,8600)}}><F size={32}>一个模型，用着工具</F></X><X y={135} w={700} style={{opacity:turn(f,8607,8626)}}><F size={34} color={GOLD}>根据结果，一圈一圈地循环</F></X></CenterBox><X x={29} y={439}><En size={8.5}>引文：Anthropic · Building effective agents（画面译文按参考）</En></X></>;
 }
 if(route==='working'){
  const p=turn(local,-2,14), q=turn(f,1302,1317);return <><Backdrop kind="warm" t={t}/><Header title={shot.title} en="AGENTS ARE ALREADY AT WORK" f={f} start={1242}/><X x={115} y={96} w={730} h={319} style={{opacity:p,overflow:'hidden',borderRadius:4}}><Desk/><MediaNote x={8} y={6}>工作场景 · 示意</MediaNote></X><X x={134} y={368} style={{opacity:turn(f,1252,1264)}}><Tag>OpenAI 今年没公开定级</Tag></X><X x={627} y={259} w={259} h={155} style={{...panel(),padding:7,opacity:q,transform:`translateY(${7*(1-q)}px)`}}><X x={8} y={8} w={241} h={102} style={{overflow:'hidden',borderRadius:4,background:'#091019'}}><Pic name="claude" alt="Claude Code 官方审阅界面"/></X><X x={10} y={115} w={237} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><F size={16}>Claude Code</F><En size={8}>官方界面</En></X></X></>;
 }
 if(route==='workflowDemo'){
  return <><Backdrop kind="silver" t={t}/><Header title={shot.title} en="HOW FREDTALK IS MADE" f={f} start={11135}/><X x={114} y={95} w={732} h={322} style={{...panel(false),borderRadius:6,overflow:'hidden',background:'#0d141a'}}><X w={594} h={322} style={{overflow:'hidden',background:'#0b0d0e'}}><Pic name="claude" alt="Anthropic 官方 Claude Code 审阅界面" style={{objectFit:'contain'}}/><MediaNote x={12} y={9}>Claude Code · 官方界面</MediaNote></X><X x={594} w={138} h={322} style={{background:'linear-gradient(0deg,#8c919a,#d9d8d8 30%,#f0f0ee)',borderLeft:'1px solid #52535b'}}/><X x={608} y={145} w={110} style={{textAlign:'center'}}><F size={13} color="#333540" style={{textShadow:'none'}}>并行工作</F><En color="#42444f" size={8}>分工示意</En></X></X>{f>=11265&&<X x={628} y={257} w={257} h={157} style={{...panel(),opacity:turn(f,11264,11277),overflow:'hidden'}}><X x={7} y={7} w={243} h={105} style={{background:'#252e54'}}><Pic name="codex" alt="OpenAI 官方 Codex 桌面界面"/></X><X x={10} y={119} w={236} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><F size={16}>Codex · 资料查找</F><En size={8}>官方界面</En></X></X>}<X x={114} y={431}><En size={9}>独立公开界面说明分工 · 非 FredTalk 私有工作区或本期执行结果</En></X></>;
 }
 if(route==='actualVideo')return <><Backdrop kind="black" t={t}/><Header title={shot.title} en="FREDTALK B-ROLL · MADE ON LIBTV" f={f} start={12298}/><X x={114} y={94} w={732} h={322} style={{overflow:'hidden',background:'#07080a',borderRadius:4}}><Clip name="libtvDemo" from={12295}/><MediaNote x={10} y={8}>LibTV 官方案例 · 非原片所述驾驶镜头</MediaNote></X></>;
 if(route==='codeModels')return <><Backdrop kind="silver" t={t}/><Header title={shot.title} en="TOP CODING MODELS · NOV 2026" f={f} start={8177}/>{['Claude Fable 5.2','GPT-6.2'].map((txt,i)=>{const p=turn(f,[8224,8263][i],[8243,8282][i]);return <CenterBox key={txt} x={116+382*i} y={129+7*(1-p)} w={347} h={258} style={{opacity:.21+.79*p,transform:`scale(${.97+.03*p})`}}><X y={54} w={347}><Badge text={i?'◎':'✺'} size={83}/><div style={{marginTop:16}}><F size={25} color={GOLD}>{txt}</F></div><En size={9}>{i?'OPENAI':'ANTHROPIC'}</En></X></CenterBox>})}</>;
 if(route==='mapDeclaration'){
  // Both old lines are fully hidden here. Preserve the exact underlying JSX at
  // f14399 (last frame of the previous production window) and the initial beat.
  if(f<=14403)return <><Backdrop t={t} crisp/><HeroText primary="名字会一直换" hero="这张地图会一直管用" en="TOOLS CHANGE · THE MAP STAYS" p={0} q={0}/></>;
  const white=turn(f,14403,14408),gold=turn(f,14421,14425);
  const centered={display:'grid',placeItems:'center',whiteSpace:'nowrap',lineHeight:1} as const;
  return <><Backdrop t={t} crisp/>
   {white>0&&<X x={47} y={155} w={866} h={58} style={{...centered,opacity:white}}><F size={46}>名字会一直换</F></X>}
   {gold>0&&<X x={47} y={225} w={866} h={64} style={{...centered,opacity:gold}}><F size={57} color={GOLD} style={{textShadow:'0 0 21px #e7a8393e,0 5px 2px #130e08'}}>这张地图会一直管用</F></X>}
   <X x={47} y={301} w={866} style={{textAlign:'center'}}><En size={10} style={{opacity:turn(f,14425,14439)}}>TOOLS CHANGE · THE MAP STAYS</En></X>
  </>;
 }
 if(route==='outro')return <EndCard f={f}/>;
 throw new Error('Unknown native chapter '+route);
}
