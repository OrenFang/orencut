import React from 'react';
import {B,Check,F,H,INK,In,L,Mark,P,Panel,Pill,ShotProps,Stroke,T,W,enter,mix,ratio,smooth} from './core';
import {Graphic,Poster,VersionArt} from './graphics';
import {Photo,SourceTag} from './media';
import {ReviewSheet} from './middle';

const numbers=['001','011','014','020'] as const;
const dates=['10–25','10–31','11–04','11–07'] as const;
function PromptIcon({size=47}:{size?:number}){
 return <svg viewBox="0 0 48 48" width={size} height={size} style={{verticalAlign:'middle',marginRight:12}}><rect width="48" height="48" rx="11" fill="#d98465"/>{[0,28,61,93,127,161,196,229,262,294,325].map((a,i)=><path key={a} d={`M24 22 L${i%3===1?26:24} ${[5,8,7,5][i%4]}`} stroke="#fff2df" strokeWidth={i%2?2.6:2.9} strokeLinecap="round" transform={`rotate(${a} 24 24)`}/>)}</svg>;
}
function Prompt({x,y,text='AI',w=151,h=80}:{x:number;y:number;text?:string;w?:number;h?:number}){return <Pill x={x} y={y} w={w} h={h} size={39} style={{borderRadius:22}}><PromptIcon/>{text}</Pill>}
function Versions({f}:{f:number}){
 const sheet=1-smooth(f,3178,3196), focus=smooth(f,3320,3355), intro=enter(f,3186,3208); const exit=1-smooth(f,3381,3392);
 return <>
  {sheet>0&&<div data-ft-version-sheet="true"><ReviewSheet x={mix(525,560,1-sheet)} y={mix(218,234,1-sheet)} w={mix(393,320,1-sheet)} h={mix(363,286,1-sheet)} opacity={sheet}/></div>}
  <B x={0} y={0} w={W} h={H} style={{opacity:intro*exit}}>
   {numbers.map((v,i)=>{const u=enter(f,3186+i*5,3201+i*6),x=mix([135,270,626,982][i],[624,888,1313,1550][i],focus),y=mix(i===0?248:247,243,focus),w=mix(i===0?100:320,[202,570,400,340][i],focus),h=mix(176,342,focus);return <B key={v} x={x} y={y+(1-u)*19} w={w} h={h+130} style={{opacity:u*(i>1?1-focus:1)}}>
    <VersionArt v={i} x={0} y={0} w={w} h={h} style={{boxShadow:'0 4px 12px #0004'}}/>
    {w>176&&<SourceTag x={5} y={h-27} w={Math.min(181,w-10)} size={12} text={i===3?'独立航拍 · 非原样片':'示意替图 · 非原样片'}/>}
    <B x={0} y={h+32} w={w} h={1.5} style={{background:'#0002'}}/>
    <T x={0} y={h+39} w={w} align="center" color={INK} size={35}>{v}</T><T x={0} y={h+76} w={w} align="center" color="#707078" size={18} face="code">{dates[i]}</T>
    {i<2&&f>3229&&<Check x={w-33} y={-21} d={44+focus*15} yes={false}/>}
    {i===0&&f>=3340&&<Pill x={-12} y={-75} w={229} h={49} size={34}>播放 <Mark dark>385 万</Mark></Pill>}
   </B>;})}
   <In f={f} at={3358} d={11} dy={6}><Pill x={606} y={391} w={236} h={59} size={41} white style={{transform:'rotate(-10deg)'}}>现在不用了</Pill></In>
  </B>
 </>;
}
function Score({f}:{f:number}){
 const v=smooth(f,3590,3610), op=enter(f,3385,3394);
 return <>
  {f<3394&&<B x={0} y={0} w={W} h={H} style={{opacity:1-op}}><VersionArt v={0} x={622} y={243} w={202} h={342}/><VersionArt v={1} x={889} y={243} w={551} h={342}/></B>}
  <Panel x={mix(447,149,v)} y={mix(167,161,v)} w={545} h={421} r={20} style={{background:'#19191b',opacity:op,boxShadow:'9px 14px 21px #0005'}}>
   <T x={25} y={35} size={23} color="#a5a3ab" face="body" weight={900}>头部财经账号 · 拆片</T>
   {['节奏','配乐','画面'].map((a,i)=>{const u=enter(f,[3425,3451,3477][i],[3435,3461,3488][i]);return <B key={a} x={23} y={96+i*96} w={499} h={77} style={{opacity:u,transform:`translateX(${(1-u)*22}px)`,borderRadius:9,background:'#2d2d34',boxShadow:'0 2px 5px #0003'}}><T x={27} y={11} size={52}>{a}</T>{f>3615+i*12&&<Check x={431} y={14} d={47} yes={i!==0||f>3640}/>}</B>})}
  </Panel>
  <In f={f} at={3599} d={15} dx={27} dy={0}>
   <T x={749} y={164} w={559} align="center" size={30} color={INK}>我的片子</T><Graphic kind="price" variant={1} x={748} y={220} w={548} h={303} f={f-3580}/><SourceTag x={757} y={493} w={194} text="独立图解 · 非原案例"/>
  </In>
  <In f={f} at={3635} d={14} dy={12}><Pill x={845} y={553} w={359} h={65} size={40}>差在哪，就<Mark dark>改哪</Mark></Pill></In>
 </>;
}
function Stairs({f}:{f:number}){
 return <>
  <In f={f} at={3697} d={13}><Pill x={234} y={135} w={400} h={66} size={45}>一版一版<Mark dark>磨出来</Mark></Pill></In>
  {numbers.map((a,i)=>{const u=enter(f,3702+i*3,3716+i*3), y=470-i*84, x=224+i*254;return <B key={a} x={x} y={y+(1-u)*37} w={226} h={H-y} style={{opacity:u}}>
   <B x={0} y={79} w={226} h={H-y} style={{background:i>0?'linear-gradient(#e3d0ff,#f7f0ff 70%,#fff)':'#fff'}}/>
   <VersionArt v={i} x={0} y={-26} w={226} h={124}/><T x={0} y={-68} w={226} align="center" size={27} color={INK}>{a}</T>
  </B>})}
 </>;
}
function Me({f}:{f:number}){
 const words=['那','我','做','什么','？'];
 return <B x={257} y={317} w={925} h={170} style={{display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.display,fontSize:109,color:INK}}>
  {words.map((a,i)=>{const v=enter(f,3765+i*4,3780+i*4);return <span key={a} style={{display:'inline-block',opacity:v,marginRight:i===4?0:6,color:i===1?P:INK,transform:`translateY(${(1-v)*-45}px) rotate(${(1-v)*(i%2===0?-9:12)}deg)`}}>{a}</span>})}
 </B>;
}
function Jobs({f}:{f:number}){
 const job=['定题','改稿','看成片'];
 return <>{job.map((j,i)=><In key={j} f={f} at={3812+i*4} d={13} dy={20}><Panel x={120+i*416} y={210} w={373} h={339} white r={20} style={{boxShadow:'0 8px 24px #0002'}}>
  <T x={32} y={27} size={55}>{j}</T>
  {i===0?<T x={33} y={111} w={303} size={28} face="body" weight={900} style={{whiteSpace:'normal'}}>一条快 400 万播放的财经视频，<Mark>没有一帧是我剪的</Mark></T>:i===1?<><T x={30} y={112} w={309} size={26} face="body" style={{whiteSpace:'normal'}}>删掉重复铺垫，事实和先后顺序重新核对。</T><T x={30} y={219} size={16} color="#99949d" face="code">脚本修订 · 图层重编</T></>:<><Graphic kind="yield" x={30} y={111} w={315} h={174}/><SourceTag x={37} y={258} w={160} size={12} text="独立示意 · 非原成片"/></>}
  <T x={32} y={302} size={16} face="code" color="#8f8c95">{['001 / README.md','002 / DRAFTS','003 / REVIEW'][i]}</T>
 </Panel></In>)}</>;
}
const comments=['补 AI 内容','产品图去白底','删掉「性能差不多的产品」','营销顺序：先校园大使，再事件营销'];
function Notes({f}:{f:number}){
 return <>
  <In f={f} at={3882} d={8} dy={6}><T x={224} y={113} size={25} face="body" weight={900} color="#6a696e">Fred · 11-01 · 看完 004 影石的意见（节选）</T></In>
  {comments.map((row,i)=><In key={row} f={f} at={3887+i*12} d={12} dx={-20} dy={13}><Pill x={225} y={158+i*81} w={[235,275,464,591][i]} h={66} size={i===3?32:36} style={{fontFamily:F.body,fontWeight:900}}><Mark dark>{i+1}</Mark> {row}</Pill></In>)}
  <In f={f} at={3942} d={13} dx={24} dy={12}><Pill x={855} y={519} w={390} h={70} white size={35}><PromptIcon size={49}/>按意见改完，出 <Mark>v23</Mark></Pill></In>
 </>;
}
function Iteration({f}:{f:number}){
 const after=f>=4042, op=enter(f,3992,4012), num=after?2:1;
 return <>
  <B x={0} y={0} w={W} h={H} style={{opacity:op}}>
   <Photo id="press" x={182} y={165} w={445} h={252} tint={.19} focus="58% 38%"/>
   <B x={182} y={313} w={445} h={104} style={{borderRadius:'0 0 9px 9px',background:'linear-gradient(transparent,#280c0bc9)'}}/>
   <SourceTag x={195} y={382} w={225} text="独立棚拍 · 非 004 样片人物"/>
   <T x={181} y={482} size={41} color={INK}>逐字稿</T><T x={306} y={440} size={123} color={P}>v24.{num}</T>
   <T x={762} y={159} size={16} face="code" color="#77717b">版本结构示意</T>
   {['逐字稿','校对字幕','调整切镜','素材来源','口播与音乐','片尾处理','全片复看','预览校验','最终交付'].map((s,i)=><B key={s} x={761} y={183+i*44} w={531} h={37} style={{borderRadius:6,background:'#fff',boxShadow:'1px 5px 12px #0002',opacity:enter(f,4000+i*4,4008+i*4)*Math.max(.17,1-i*.093)}}><B x={8} y={10} w={18} h={17} style={{border:'1px solid #666'}}/><T x={33} y={6} size={19} face="body" color="#424247">{s} · v24.{num} — 横版</T></B>)}
  </B>
  <In f={f} at={4055} d={13} dy={17}><Pill x={633} y={632} w={404} h={70} size={46}>只动嘴，<Mark dark>一帧没剪</Mark></Pill><Check x={1001} y={570} d={91}/></In>
 </>;
}
function Endpoint({x,y,kind}:{x:number;y:number;kind:number}){return <Panel x={x} y={y} w={237} h={83} white r={22}><Poster n={kind} x={10} y={10} w={107} h={61} r={3}/><T x={128} y={19} size={48} color={INK}>成片</T></Panel>}
function Routes({f}:{f:number}){
 const m=smooth(f,4325,4355), code=enter(f,4333,4360);
 return <>
  <B x={0} y={mix(197,36,m)} w={W} h={367} style={{opacity:mix(1,.25,m)}}>
   <Stroke d="M191 222C302 95 442 396 552 210C663 21 768 2 871 209C992 451 1086 378 1166 221" color="#222224" width={6.5} progress={enter(f,4157,4177)}/>
   <In f={f} at={4156} d={12}><Endpoint x={1119} y={171} kind={3}/></In>
   <In f={f} at={4180} d={10}><Pill x={515} y={174} w={162} h={77} white size={47} style={{borderRadius:23}}>点按钮</Pill></In>
   <In f={f} at={4204} d={10}><Pill x={758} y={176} w={204} h={74} white size={48} style={{borderRadius:22}}>拖时间线</Pill></In>
   <In f={f} at={4227} d={11}><Pill x={519} y={276} w={472} h={51} white size={35} style={{boxShadow:'0 4px 9px #0001'}}>⊕ 机器人坐进驾驶位 <small style={{fontSize:21,color:'#999'}}>示意</small></Pill></In>
  </B>
  <In f={f} at={4156} d={10} dy={7}><Prompt x={111} y={mix(365,208,m)}/></In>
  <B x={0} y={0} w={W} h={H} style={{opacity:code}}>
   <Stroke d="M196 540 H1159" color={P} width={10} progress={code}/><Prompt x={111} y={500}/>
   <Endpoint x={1119} y={500} kind={8}/>
   <Panel x={583} y={498} w={276} h={85} r={23} style={{background:INK,boxShadow:'12px 15px 16px #0005'}}><T x={16} y={15} size={12} face="code" color="#c3b6da">import React from…<br/>import {'{Shot}'}…<br/>clip.fill(frame)…</T><T x={125} y={18} size={51} color={L}>写代码</T></Panel>
  </B>
  <In f={f} at={4395} d={12} dy={12}><Pill x={588} y={622} w={280} h={65} white size={41}><Mark>最短</Mark>的那条路</Pill></In>
 </>;
}
const filmNames=['电影','广告片','纪录片'];
function Split({f}:{f:number}){
 const u=smooth(f,4529,4556), result=enter(f,4555,4575), right=smooth(f,4612,4642), header=enter(f,4470,4486)*(1-u);
 return <>
  <T x={0} y={130} w={W} size={93} align="center" color={INK} style={{opacity:header}}><Mark>两极</Mark>分化</T>
  {Array.from({length:12},(_,i)=>{const z=enter(f,4472+i*1.3,4488+i*1.3);return <Poster key={i} n={i} x={mix(164+(i%7)*166,124+(i%4)*138,u)} y={mix(255+Math.floor(i/7)*96,241+Math.floor(i/4)*78,u)} w={mix(153,124,u)} h={mix(85,70,u)} style={{opacity:z}}/>;})}
  <B x={0} y={0} w={W} h={H} style={{opacity:result}}><T x={124} y={180} size={44} color={INK}>知识类、解说类</T><Prompt x={228} y={551} text="交给 AI" w={235} h={83}/></B>
  {filmNames.map((a,i)=>{const u1=enter(f,4477+i*3,4491+i*4);return <Pill key={a} x={mix([990,496,990][i],926+i*145,right)} y={mix([255,351,351][i],356,right)} w={mix(152,132,right)} h={mix(85,71,right)} size={39} style={{opacity:u1,transform:`translateX(${u*(1-right)*176}px)`,borderRadius:8,boxShadow:'none'}}>{a}</Pill>})}
  <In f={f} at={4615} d={14} dy={18}><T x={922} y={280} size={52} color={INK}>专业影视剪辑</T><T x={923} y={467} size={27} face="body" color="#5e5d65">留下来的少数</T></In>
 </>;
}
function Judgment({f}:{f:number}){
 const dis=enter(f,4795,4808), out=1-enter(f,4843,4846);
 return <>
  <In f={f} at={4712} d={14} dy={12}><Pill x={508} y={150} w={424} h={76} size={42} style={{opacity:out}}>无人出镜的财经号</Pill></In>
  <In f={f} at={4723} d={6} dy={8}><T x={462} y={285} size={81} color={dis>.64?'#b9b9bc':INK} style={{textDecoration:dis>.65?'line-through':'none',textDecorationThickness:5,opacity:out}}>拼的不是{f>=4786?<span style={{marginLeft:24}}>剪辑</span>:null}</T></In>
  <In f={f} at={4797} d={12} dy={18}><T x={0} y={416} w={W} align="center" size={110} color={INK} style={{opacity:1-smooth(f,4850,4860)}}>是<Mark>选题和判断</Mark></T></In>
 </>;
}
const files=['OPEN.tsx','CHEAP.tsx','REAL.tsx','CHART.tsx','LEGO.tsx','TASTE.tsx','REDO.tsx','ME.tsx','JUDGE.tsx','END.tsx'];
function Outro({f}:{f:number}){
 const fold=smooth(f,4912,4929), opacity=enter(f,4854,4873)*(1-smooth(f,4922,4934)),u=enter(f,4928,4941);
 return <>
  {f<4860&&<Judgment f={f}/>}
  {f<4934&&<B x={0} y={0} w={W} h={H} style={{opacity}}>
   <T x={0} y={165} w={W} align="center" size={52} color={INK}><PromptIcon size={48}/>这一条也是 <Mark>AI</Mark> 写的</T>
   <T x={102} y={274} size={19} face="code" color="#96939d">episode / src / scenes</T>
   {files.map((a,i)=>{const j=i%5,k=Math.floor(i/5),v=enter(f,4864+i*3,4877+i*3);return <Panel key={a} x={mix(100+j*254,364+j*143,fold)} y={mix(320+k*88,346+k*37,fold)+(1-v)*17} w={mix(232,146,fold)} h={mix(73,36,fold)} r={9} style={{background:'#27272b',opacity:v,boxShadow:'0 5px 9px #0004'}}><T x={12} y={mix(21,4,fold)} size={mix(25,19,fold)} face="code">{a}</T></Panel>;})}
  </B>}
  {f>=4929&&<Pill x={286} y={266} w={868} h={174} size={99} style={{transform:`scale(${mix(.59,1,u)})`,background:'#18181a',boxShadow:'11px 15px 18px #0006'}}>评论区扣 <Mark dark>Fred</Mark></Pill>}
 </>;
}
export function Late({id,f}:ShotProps){
 switch(id){
  case 'versions':return <Versions f={f}/>;
  case 'score':return <Score f={f}/>;
  case 'stairs':return <Stairs f={f}/>;
  case 'me':return <Me f={f}/>;
  case 'jobs':return <Jobs f={f}/>;
  case 'notes':return <Notes f={f}/>;
  case 'iteration':return <Iteration f={f}/>;
  case 'routes':return <Routes f={f}/>;
  case 'split':return <Split f={f}/>;
  case 'judgment':return <Judgment f={f}/>;
  case 'outro':return <Outro f={f}/>;
  default:return null;
 }
}
