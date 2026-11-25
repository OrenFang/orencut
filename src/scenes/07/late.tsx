import React from 'react';
import {BLUE,Foot,GOLD,Glyph,Header,HeroText,Media,Panel,Pill,Reel,RED,SourceTag,useChapter,useMotion,useStage,WHITE,pos} from './craft';
import {clamp,cue,fitPhase,linear,mix,rise} from './clock';

export function Limits() {
 const {frame:f}=useStage(); const s=useChapter();const enter=mix(.58,1,rise(f,s.start,10));const p=enter*mix(.40,1,rise(s.end-f,0,10));
 return <>
  <Header title="世界模型的真实天花板" sub="GOOGLE DEEPMIND GENIE 3 · OBSERVATIONS & LIMITS" p={p}/>
  <div style={{...pos(101,204,928,617),opacity:p,overflow:'hidden',borderRadius:15,border:'2px solid #a9b0c66e',background:'#15151a',boxShadow:'0 17px 47px #0008'}}>
   <Media lane="limitLead" width={924} height={615}/>
   <SourceTag text="Genie 3 实机演示" left={26} top={25} font={22}/>
  </div>
  <Panel left={1041} top={202} width={781} height={621} tone="blue" style={{opacity:p}}>
   {[['实时交互帧率','十几 FPS','原片体验口径；官网标称 24 FPS'],['画面连贯时长','仅几分钟','短窗内保留视觉连贯性'],['空间几何记忆','转身变样','原片观察：长时一致性仍受限制']].map(([h,v,detail],i)=>{
    const q=cue(f,`limit${i}`);const pulse=q*(1-linear(q,.8,.2))*.20;
    return <div key={h} className={`row ${q>.13?'red':''}`} style={{...pos(26,33+i*187,724,157),display:'block',padding:'24px 26px',opacity:mix(.33,1,q),boxShadow:`inset 0 0 28px rgba(233,105,82,${pulse})`}}>
     <div className="stat-label">{h}</div><div className="label-small" style={{marginTop:17,fontSize:19}}>{detail}</div>
     <Glyph fill="red" style={{position:'absolute',right:24,top:26,fontSize:37}}>{v}</Glyph>
     <div style={{height:4,position:'absolute',bottom:29,left:27,width:105*q,background:RED,opacity:q*.65}}/>
    </div>;
   })}
  </Panel>
  <Foot style={{opacity:p*.72}}>Google DeepMind 官方模型演示 · 720p／24fps为官网公开规格；右栏为原片观察，非独立性能实测</Foot>
 </>;
}
const creators=[['creator01','AI 3D 场景','5 天','搭出一座重庆城','原片叙述：单人创作者用 AI 工具流完成'],['creator02','AI 概念片','百万+','中国城市版宣传片','原片叙述：重庆 · 上海开放世界风格刷屏'],['creator03','Seedance 2.5','出圈','海外“奶奶版”短片','原片叙述：生成式视频呈现电影级质感']];
export function Examples() {
 const {frame:f}=useStage(); const s=useChapter(); const p=mix(.50,1,rise(f,s.start,12))*mix(.44,1,rise(s.end-f,0,12));
 return <>
  <Header title="海内外刷屏的 AI 开放世界案例" sub="VIRAL CREATOR CASES · VISUALS ARE INDEPENDENT ILLUSTRATIONS" p={p}/>
  {creators.map(([lane,k,num,h,d],i)=>{const q=cue(f,`creator${i}`);return <Panel key={lane} left={99+i*582} top={209} width={545} height={616} tone="blue" orn={false} style={{opacity:p*mix(.30,1,q),background:q>.35?'linear-gradient(146deg,#2a354f,#202739)':'#232a30',transform:`translateY(${mix(13,0,q)}px)`}}>
    <div style={{...pos(24,17,490,260),overflow:'hidden',borderRadius:10,background:'#222733'}}><Media lane={lane} width={490} height={260}/>{q>.36&&<div style={{position:'absolute',bottom:9,left:12,opacity:q}}><Pill tone="soft" font={14}>Genie 3 官方类比 · 非案例原画</Pill></div>}</div>
    <div className="label-small" style={{...pos(24,307),color:GOLD,fontSize:21}}>{k}</div><Glyph style={{...pos(25,348,492),fontSize:68}}>{num}</Glyph>
    <div className="stat-label" style={{...pos(26,447,484),fontSize:29}}>{h}</div><div style={{...pos(27,518,486),fontSize:20,color:'#bab8b2'}}>{d}</div>
   </Panel>;})}
  <Foot style={{opacity:p*.76}}>案例名称、周期与传播量是原片叙述；画面仅以 DeepMind 同构图官方演示类比，不是相应第三方案例原片。</Foot>
 </>;
}
const gapRows=[['惊艳的 10 秒电影般预告片','能逛几分钟的交互 Demo'],['玩几百小时不穿帮的大世界','大量 NPC 行为与记忆逻辑自洽','所有物理和任务规则严丝合缝']];
export function WorldGap() {
 const {frame:f}=useStage();const s=useChapter();const r=useMotion('gap-r');const base=mix(.38,1,rise(f,s.start,12))*mix(.45,1,rise(s.end-f,0,11));
 return <>
  <Header title="10 秒惊艳，离 100 小时大世界有多远？" sub="CINEMATIC AI DEMO VS. LONG-RUNNING OPEN WORLD" p={base}/>
  {[0,1].map(i=>{const p=(i?mix(.36,1,r):mix(.38,1,cue(f,'gap-l0'))*(1-.52*r))*base;return <Panel key={i} left={i?1076:100} top={196} width={745} height={631} tone={i?'red':'blue'} style={{opacity:p}}>
   <Media lane={i?'gapRight':'gapLeft'} left={14} top={14} width={713} height={239} style={{borderRadius:12,filter:`brightness(${i?.83:.89})`}}/>
   <SourceTag text={i?'可持续 · 3A 大世界':'视效强 · 分钟级可玩'} left={28} top={27} tone={i?'red':''} font={20}/>
   <Glyph fill={i?'red':'gold'} gradient style={{...pos(24,276,705),fontSize:59}}>{i?'几百小时':'10 秒 — 几分钟'}</Glyph>
   {i===1&&<span style={{...pos(389,302),fontSize:26,color:'#ffcabd',fontWeight:850}}>持久大世界</span>}
   {gapRows[i].map((text,j)=>{const q=cue(f,`gap-${i?'r':'l'}${j}`);return <div key={text} className={`row ${i?'red':''}`} style={{...pos(23,370+j*78,696,64),fontSize:25,opacity:mix(.22,1,q)}}><strong style={{fontFamily:'system-ui',color:i?RED:GOLD}}>0{j+1}</strong>{text}</div>;})}
  </Panel>;})}
  <div style={{...pos(902,398,117,132),opacity:base,border:'2px solid #dfa86f85',borderRadius:19,background:r>.5?'#5e281f':'#332719',textAlign:'center',paddingTop:11}}><Glyph fill={r>.5?'red':'gold'} style={{fontSize:58}}>≫</Glyph><div className="label-small" style={{marginTop:6,color:'#ffe3a3'}}>量级差距</div></div>
  <Foot style={{opacity:base*.63}}>左窗：Google DeepMind 官方 Genie 3 演示 / 右窗：Rockstar Games GTA VI 官方宣传；为量级对比，非性能基准</Foot>
 </>;
}
export function PartThree({carry=false}:{carry?:boolean}) {
 const {frame:f}=useStage();const q=useMotion('question-flip'),p=useMotion('third-title');const exit=carry?.35*linear(6033-f,0,5):mix(.52,1,linear(6031-f,0,11));
 return <>
  {!carry&&f<5975&&<div style={{...pos(624,242,674),textAlign:'center',transform:`perspective(1100px) rotateY(${q*88}deg) scale(${mix(.95,.72,q)})`,opacity:mix(1,.04,q)}}><Glyph style={{fontSize:424,textShadow:'0 9px 20px #000'}}>?</Glyph></div>}
  <HeroText a="多掏 500 块" b="是谁收走的" sub="PART 3 · THE AI HARDWARE TAX" size={116} y={282} color="red" p1={p*exit} p2={p*exit}/>
 </>;
}
export function Wallet() {
 const {frame:f}=useStage();const p=useMotion('door-first'),q=useMotion('door-second');
 const fading=mix(.18,1,rise(6197-f,0,12));
 return <>{f<6033&&<PartThree carry/>}<HeroText a="挡在了开发大门外面" b="却没挡在玩家钱包外面" y={303} size={91} color="red" p1={p*fading} p2={q*fading}/></>;
}
const chain=[['源头','AI 数据中心','算力扩张','chain01','算力基建继续扩张','服务器争用更多内存','挤产能','CAPACITY'],['传导','内存与闪存','一路上涨','chain02','DRAM 和闪存走高','产能向高利润服务器倾斜','抬成本','COST'],['落点','消费级硬件','价格承压','chain03','游戏主机使用消费级元件','原片讨论硬件物料成本上涨','玩家钱包','ENTRY COST']];
export function HardwareChain() {
 const {frame:f}=useStage();const s=useChapter();const p=mix(.38,1,rise(f,s.start,10))*mix(.45,1,rise(s.end-f,0,11));
 return <>
  <Header title="AI 是怎么让游戏机涨价的" sub="HOW THE AI DATA CENTER BOOM MAY PRESSURE CONSOLES" p={p}/>
  {chain.map(([tag,h,em,lane,x,y,foot,en],i)=>{
   const q=cue(f,`chain${i}`),other=cue(f,`chain${i}b`);const k=i<2?cue(f,`chain${i+1}`):0;const left=113+582*i;
   return <React.Fragment key={lane}>
    <Panel left={left} top={226} width={527} height={590} tone={i===2&&q>.45?'red':'blue'} style={{opacity:p*mix(.28,Math.max(.64,1-k*.23),q),background:q<.05?'#252831':undefined,overflow:'hidden'}}>
     <div className="label-small" style={pos(29,31)}>{tag}</div>
     <Glyph fill={q>0?'silver':'blue'} style={{...pos(28,65,486),fontSize:37}}>{h} <span style={{color:GOLD,fontSize:21}}>{em}</span></Glyph>
     <Media lane={lane} left={28} top={134} width={467} height={193} style={{borderRadius:8,background:'#1b1d22',filter:'brightness(.88)'}}/>
    {i===1&&f>=6359&&f<6638&&<div className="label-small" style={{...pos(28,333,467),fontSize:14,textAlign:'center',color:'#d5d8de'}}>SK hynix · 服务器 DRAM（非 PS5 零件）</div>}
     {q<.03&&<Glyph style={{...pos(28,186,467),textAlign:'center',opacity:.26,fontSize:121}}>?</Glyph>}
     {q>.03&&<><div className="row" style={{...pos(27,357,470,67),opacity:mix(.22,1,q),fontSize:23}}>◆　{x}</div><div className="row" style={{...pos(27,439,470,66),opacity:mix(.19,1,other),fontSize:22}}>◆　{y}</div><div style={{...pos(27,520),opacity:q}}><Pill tone="gold-solid" font={23}>{foot} <span style={{marginLeft:11,fontSize:13}}>{en}</span></Pill></div></>}
    </Panel>
    {i>0&&<div style={{...pos(left-56,475,51,60),opacity:p*q,color:GOLD,fontSize:42,fontWeight:800,textAlign:'center'}}>→</div>}
   </React.Fragment>;
  })}
  <Foot>原片的产业链解读 · Microsoft 数据中心、SK hynix 服务器 DRAM、PlayStation 官方媒体 · 图片不构成调价归因证据</Foot>
 </>;
}

const graphPoints=[[92,184],[441,132.5],[670,42.5]] as const;
const prices=[
 {n:'美版 PS5 光驱版', v:'$549.99 → $649.99',change:'+$100',w:.42,c:'#a3c4f5',note:null},
 {n:'国行 PS5 数字版',v:'新建议价 ¥3999',change:'+¥500',w:.56,c:'#f6d282',note:'部分媒体旧价口径'},
 {n:'国行 PS5 Pro',v:'¥5599 → ¥6299',change:'+¥700',w:.69,c:'#fabb6a',note:null},
 {n:'双 11 港版 Pro',v:'原片举例 · 未独立核实',change:'¥14,000',w:.92,c:'#f27a66',note:null},
];
export function PriceChart() {
 const {frame:f}=useStage();const s=useChapter();const p=mix(.47,1,rise(f,s.start,12))*mix(.13,1,rise(s.end-f,0,13));const a=useMotion('ps-line1'),b=useMotion('ps-line2');
 const [p0,p1,p2]=graphPoints; const coord=(v:readonly number[],u:readonly number[],k:number)=>[mix(v[0],u[0],k),mix(v[1],u[1],k)];const q1=coord(p0,p1,a),q2=coord(p1,p2,b);
 return <>
  <Header title="发售近 6 年，PS5 反倒越卖越贵" sub="PS5 PRICE TRAJECTORY & 2026 CHINA / GLOBAL HIKES" p={p}/>
  <Panel left={100} top={194} width={821} height={635} tone="blue" style={{opacity:p}}>
   <div style={pos(33,29)}><div className="stat-label">美版 PS5 逆周期涨价曲线</div><div className="label-small" style={{marginTop:8}}>NORMAL CONSOLE CYCLE VS. ACTUAL PS5 MSRP (USD)</div></div>
   <svg width="748" height="441" viewBox="0 0 748 441" style={pos(32,154)} aria-label="美国光驱版 PS5 建议零售价时间线">
    {[['$650',42],['$550',132],['$450',222],['$350',312]].map(([label,y])=><g key={label}><line x1="61" x2="701" y1={y} y2={y} stroke="#9facbd36" strokeWidth="1.3"/><text x="2" y={Number(y)+7} fill="#b2bccd" fontSize="21">{label}</text></g>)}
    <path d="M92 184 Q410 212 671 302" stroke="#9fb6e49c" strokeWidth="3.3" strokeDasharray="10 9" fill="none"/>
    <text x="410" y="338" fill={BLUE} fontSize="22" fontWeight="850">正常规律：逐年降价（示意）</text>
    <path d={`M${p0.join(',')} L${q1.join(',')}${a===1?` L${q2.join(',')}`:''}`} stroke="#eb6755" strokeWidth="6" fill="none" strokeLinecap="round"/>
    {graphPoints.map(([x,y],i)=>{const t=i===0?1:i===1?clamp((a-.73)*3.7):clamp((b-.73)*3.7);return <g key={i} opacity={t} style={{fontFamily:'system-ui,system-ui',fontWeight:900}}><circle cx={x} cy={y} r={i===2?12:8} fill={[WHITE,GOLD,'#f16d57'][i]}/><text x={i===2?546:x-5} y={y-22} fill={[WHITE,GOLD,RED][i]} fontSize={i===2?30:25} fontStyle="italic">{['$499','$549.99','$649.99'][i]}</text></g>;})}
    {[['2020',68],['2025',409],['2026.04',600]].map(([label,x],i)=><text key={label} x={x} y="398" fill={i===2?RED:'#b6bdcc'} fontSize={i===2?23:21} fontWeight={i===2?800:650}>{label}</text>)}
   </svg>
  </Panel>
  <Panel left={958} top={194} width={861} height={635} style={{opacity:p}}>
   <div style={pos(33,29)}><div className="stat-label">2026 年 4 月调价与市场行情</div><div className="label-small" style={{marginTop:8}}>PLAYSTATION OFFICIAL & SEPARATELY LABELED MARKET FIGURES</div></div>
   {prices.map((r,i)=>{const q=cue(f,`market${i}`);return <div key={r.n} style={{...pos(35,130+i*111,784,92),opacity:mix(.22,1,q)}}>
     <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'center',gap:17,height:41}}><span style={{fontSize:28,fontWeight:840,whiteSpace:'nowrap'}}>{r.n}</span><span style={{fontSize:20,color:'#b6b3b3',whiteSpace:'nowrap'}}>{r.v}</span><Glyph style={{fontSize:34,color:r.c}}>{r.change}</Glyph></div>
     <div className="chip-track" style={{marginTop:14}}><div style={{height:'100%',width:`${100*r.w*q}%`,borderRadius:24,background:`linear-gradient(90deg,${r.c}bd,${r.c})`}}/></div>
     {r.note&&q>.15&&<div className="label-small" style={{position:'absolute',right:1,bottom:0,color:'#c6c2b9',fontSize:14}}>{r.note}</div>}
    </div>;})}
  </Panel>
  <Foot style={{opacity:.72*p}}>PlayStation Blog／PlayStation 中国（2026.03.27 公告，04.02 生效） · 国行旧价口径有分歧 · 港版转售为原片说法</Foot>
 </>;
}
export function EntryPrice() {
 const p=useMotion('price-deck'),q=useMotion('price-unit'),r=useMotion('price-foot');
 return <>
  <Header title="国内玩上 GTA6 的入门门槛" sub="PS5 CONSOLE + GAME · ESTIMATED ENTRY COST IN CHINA" p={p}/>
  <div style={{...pos(92,378,1736),opacity:p,display:'flex',alignItems:'center',justifyContent:'center',gap:23,textAlign:'center'}}>
   <Glyph fill="gold" gradient style={{fontSize:79}}>¥</Glyph><div style={{minWidth:684,padding:'13px 32px 14px',border:'1px solid #ddc2766d',borderRadius:7,background:'linear-gradient(180deg,#1f211f,#070707 80%)',boxShadow:'0 0 53px #dab15a27,inset 0 2px 12px #f0db9819'}}><Reel value="4,500" keys={['price0','price1','price2','price3']} rollHeight={152}/></div>
   <Glyph fill="gold" gradient style={{fontSize:57,opacity:q,transform:`skewX(-9deg) translateX(${(1-q)*19}px)`}}>元左右</Glyph>
  </div>
  <div style={{...pos(112,638,1696),opacity:r,textAlign:'center',color:'#e9e1db',fontSize:25,fontWeight:780}}>主机 + 游戏合计估算 · 实际因版本、地区与渠道而异<div className="label-small" style={{marginTop:13}}>PS5 CONSOLE + GTA VI · FIGURE IN THE ORIGINAL COMMENTARY</div></div>
 </>;
}
export function PartFour({carry=false}:{carry?:boolean}) {
 const {frame:f}=useStage();const p=useMotion('part4')*(carry?linear(7902-f,0,6):1);
 return <div style={{...pos(0,0,1920,1080),opacity:p}}>
  <div style={{...pos(106,mix(293,153,p),979,617),overflow:'hidden',border:'2px solid #c1c4d15e',borderRadius:16,background:'#161a1a',boxShadow:'0 20px 55px #0009'}}><Media lane="chapter4" width={979} height={617}/></div>
  <Glyph style={{...pos(1172,162),fontSize:100,opacity:.3}}>04</Glyph>
  <div style={pos(1165,369,710)}><Glyph style={{fontSize:85}}>整个行业</Glyph><Glyph fill="gold" gradient style={{fontSize:85,marginTop:29}}>账本变了</Glyph><div className="subhead" style={{maxWidth:500,marginTop:32}}>PART 4 · THE NEW MATH OF GAMING</div></div>
 </div>;
}
export function Answer() {
 const {frame:f}=useStage();const p=useMotion('answer')*mix(.32,1,linear(8055-f,0,9));
 return <>{f<7902&&<PartFour carry/>}<HeroText a="现在的 AI" b="确实做不出 GTA6" color="silver" sub="AI CANNOT REPLACE ROCKSTAR TOMORROW" size={92} y={317} p1={p} p2={p}/></>;
}
const rail=[['最后一个',''],['全手工 3A','blue'],['行业账本',''],['彻底变了','red']];
export function FinalBet() {
 const {frame:f}=useStage();const p=useMotion('rail');
 return <Panel left={186} top={733} width={1547} height={167} style={{opacity:p,transform:`translateY(${mix(15,0,p)}px)`,borderRadius:13,background:'#27251de9'}}>
   <div style={pos(21,8)}><Pill tone="gold-solid" font={16}>行业叙事转折</Pill></div>
   <div style={{...pos(205,42,1158,72),display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>{rail.map(([h,t],i)=>{
    const q=cue(f,`rail${i}`);return <span key={h} style={{height:66,borderRadius:9,background:q<.01?'#cab9901c':'transparent',display:'grid',placeItems:'center'}}><Pill tone={t} font={32} style={{opacity:q,width:'100%',height:'100%',justifyContent:'center',border:t?undefined:'none',background:t?undefined:'transparent',color:t?undefined:i===0?WHITE:GOLD}}><Glyph as="span">{h}</Glyph></Pill></span>;
   })}</div>
   <div className="label-small" style={{...pos(0,123,1547),textAlign:'center',fontSize:13}}>THE ORIGINAL COMMENTARY · THE ECONOMIC TERMS HAVE CHANGED</div>
 </Panel>;
}
export function Ledgers() {
 const {frame:f}=useStage();const s=useChapter();const p=mix(.45,1,rise(f,s.start,13))*mix(.48,1,rise(s.end-f,0,10));
 const lines=[['ledger01','第一笔账 · 开发端','几乎无人扛得起十年全手工','除了 Take-Two，下一家大厂算账会把 AI 管线算进去','必算 AI 管线'],['ledger02','第二笔账 · 消费端','AI 算力军备竞赛继续抢芯片','内存与硬件成本算到了玩家头上','玩家共同买单']];
 return <>
  <Header title="从今天起，行业的两笔账彻底变了" sub="THE NEW ECONOMICS OF GAMING · SUPPLY & DEMAND" p={p}/>
  {lines.map(([lane,k,h,detail,tag],i)=>{const q=cue(f,`ledger${i}`);return <Panel key={lane} left={131} top={215+i*318} width={1659} height={279} tone={i?'':'blue'} style={{opacity:p*q,transform:`translateY(${mix(28,0,q)}px)`}}>
   <Media lane={lane} left={33} top={32} width={338} height={210} style={{borderRadius:14,background:'#14171d'}}/>
   <div className="label-small" style={{...pos(415,43,915),fontSize:24,color:i?RED:BLUE}}>{k}</div><Glyph style={{...pos(413,97,880),fontSize:50}}>{h}</Glyph><div style={{...pos(414,181,880),fontSize:25,color:'#dde1e9'}}>{detail}</div>
   <div style={{...pos(1266,93,350),textAlign:'right'}}><Pill tone={i?'red':''} font={31} style={{minHeight:73,padding:'8px 22px 13px'}}><Glyph as="span">{tag}</Glyph></Pill></div>
  </Panel>;})}
 </>;
}
const years=[['2013','旧秩序','GTA5 发售','只有顶级大厂能造虚拟城市','era01'],['2026','普通人 + AI','普通人 + AI','几天做城市 Demo 或短片','era02'],['未来','问题仍未回答','下一代 GTA7','下一代还坚持零生成式 AI 吗？','era03']];
export function Timeframe() {
 const {frame:f}=useStage();const s=useChapter();const p=mix(.37,1,rise(f,s.start,12))*mix(.52,1,rise(s.end-f,0,9));
 return <>
  <Header title="对普通人来说，这是一个奇妙的时代" sub="13 YEARS OF GAMING · FROM STUDIO MONOPOLY TO CREATOR TOOLS" p={p}/>
  <div style={{...pos(196,199,1528,4),background:'linear-gradient(90deg,#677e9e45,#c1b17ea2 47%,#d171594d)',opacity:p}}/>
  {years.map(([year,k,h,desc,lane],i)=>{const q=cue(f,`era${i}`);const x=97+i*584;return <React.Fragment key={year}>
    <div style={{...pos(x,172,548),textAlign:'center',opacity:mix(.35,1,q)*p}}><Pill tone={i===1?'gold-solid':i===2?'red':'blue'} font={21} style={{borderRadius:23,minWidth:155,justifyContent:'center'}}><Glyph as="span">{year}</Glyph></Pill></div>
    <Panel left={x} top={263} width={548} height={550} tone={i===2?'red':'blue'} style={{opacity:p*mix(.24,1,q),transform:`translateY(${mix(16,0,q)}px)`,background:q<.05?'#252831':undefined}} orn={false}>
      <Media lane={lane} left={24} top={23} width={494} height={211} style={{borderRadius:11,background:'#262c32'}}/>
      <div style={pos(25,266)}><Pill tone={i===1?'gold-solid':i===2?'red':'blue'} font={16}>{k}</Pill></div>
      <Glyph style={{...pos(24,331,490),fontSize:47}}>{h}</Glyph><div style={{...pos(25,431,491),fontSize:24,letterSpacing:'.02em',fontWeight:720,color:'#dce0e7'}}>{desc}</div>
    </Panel>
   </React.Fragment>;})}
  <Foot style={{opacity:p*.69}}>2013：Rockstar GTA V 官方媒体 · 2026：Google DeepMind 官方演示（类比） · 未来：提问，无 GTA7 画面</Foot>
 </>;
}
export function Ending() {
 const {frame:f}=useStage();const q=useMotion('end2');
 const p=fitPhase(f,[[9300,0],[9301,.17],[9311,.49],[9330,.87],[9352,1]]);
 return <HeroText a="下一代 GTA7，Rockstar" b="还会坚持零生成式 AI 吗？" y={308} size={88} p1={p} p2={q} revealFirst={p>0?1:undefined}/>;
}
