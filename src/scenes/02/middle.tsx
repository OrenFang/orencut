import React from 'react';
import {B,Check,DARK,F,GOLD,H,INK,In,L,Mark,P,Panel,Pill,ShotProps,Stroke,T,W,enter,interpolateKeys,mix,pretty,ratio,smooth} from './core';
import {Graphic,Poster,ThumbnailWall,Tile,TileKind} from './graphics';
import {Photo,PhotoId,SourceTag} from './media';

const set:TileKind[]=['tracks','rank','network','capital','yield','cash'];
const trim=[{kind:'rank',x:61},{kind:'yield',x:287},{kind:'network',x:513},{kind:'capital',x:739},{kind:'map',x:965},{kind:'cash',x:1191}] as const;
function Lego({f}:{f:number}){
 const u=smooth(f,1873,1910), lock=enter(f,1931,1949), initial=enter(f,1824,1855);
 const handoff=smooth(f,1858,1873);
 return <>
  {f<1873?<>
   {handoff>0&&<Tile kind="cash" x={582} y={279} w={276} h={153} f={87} style={{transform:`rotate(${-6*handoff}deg)`,boxShadow:'0 0 0 2px #c3ab6e55'}}/>}
   <Graphic kind="cash" marginBill={{profit:1,framing:1,phase:1819}} x={582} y={279} w={276} h={153} style={{transform:`rotate(${-6*handoff}deg)`,opacity:1-handoff,boxShadow:'0 0 0 2px #c3ab6e55'}}/>
  </>:<Tile kind="cash" x={mix(582,1191,u)} y={mix(279,264,u)} w={mix(276,185,u)} h={mix(153,107,u)} f={87} style={{transform:`rotate(${mix(-6,0,u)}deg)`,boxShadow:'0 0 0 2px #c3ab6e55'}}/>}
  {trim.slice(0,-1).map(({kind,x},i)=><In key={kind} f={f} at={1878+i*5} d={14} dx={22} dy={3}><Tile kind={kind} x={x} y={264} w={185} h={107} style={{boxShadow:i===2&&f>=1938?'0 0 0 3px #d3b8ff, 0 0 20px #d3b8ff32':undefined,opacity:i===2?1:mix(.8,.94,lock)}}/></In>)}
  <Pill x={mix(493,479,u)} y={mix(172,397,u)} w={mix(453,482,u)} h={mix(72,62,u)} white size={37} style={{opacity:initial}}>{f<1876?<>为什么不做成<Mark>模板</Mark>？</>:f<1919?<>组件<Mark>像搭积木</Mark></>:<>AI 只<Mark>搬积木</Mark>、填内容</>}</Pill>
  {f>=1945&&f<1973&&<B x={698+14*(1-lock)} y={370} w={38} h={52} style={{opacity:lock}}><svg viewBox="0 0 28 34" width="30" height="39"><path d="M3 2L3 27L9 21L14 31L18 29L13 19L23 19Z" fill="#fff9" stroke="#e9dfff" strokeWidth="1.4"/></svg></B>}
 </>;
}
function ComponentsWall({f}:{f:number}){
 const value=pretty(interpolateKeys(f,[[2265,0],[2270,23],[2278,65],[2286,94],[2294,107]]));
 return <>
  <ThumbnailWall x={-102-(f-2265)*.5} y={-176} w={326} h={181} cols={6} count={30} gap={18} style={{opacity:.56,transform:`rotate(-14deg) scale(${1.05+(f-2265)*.0026})`}}/>
  <B x={0} y={0} w={W} h={H} style={{background:'radial-gradient(ellipse,#18181819 20%,#18181857 70%)'}}/>
  <div data-ft-components={value}><T x={0} y={193} w={W} align="center" size={229} style={{textShadow:'3px 9px 16px #0009'}}>{value}</T></div>
  <T x={0} y={400} w={W} align="center" size={45}>块财经<Mark dark>积木</Mark></T>
 </>;
}
function Recombine({f}:{f:number}){
 const u=smooth(f,2340,2357);
 return <>
  {set.map((kind,i)=><Tile key={i} kind={kind} x={mix(165+i*190,78+i*100,u)} y={mix(214,315,u)} w={mix(157,89,u)} h={mix(93,52,u)} style={{opacity:mix(.69,.33,u)}}/>)}
  {[1,5,2,0].map((j,i)=><In key={j} f={f} at={2344+i*2} d={10} dx={12} dy={3}><Tile kind={set[j]} x={844+i*132} y={309} w={126} h={70} style={{boxShadow:'0 0 0 2px #e5caff75,0 5px 10px #0009'}}/></In>)}
  <T x={218} y={435} w={320} align="center" size={29} color="#a8a7a7">复用 六成</T><T x={845} y={435} w={519} align="center" size={29} color={L}>每期新做 四成</T>
 </>;
}
const manualHead='星哥说 · 决定表';
const manualRows=[
 ['画幅和规格','横版、竖版都能做，每期只做 Demo 要的那一种，不默认两个…'],
 ['时长','看内容丰富度：横版 8–15 分钟，竖版 3–8 分钟'],
 ['结尾','回答主问题 → 一句判断或金句 → 评论区选择题（2–3 个具…'],
 ['开头签名','钩子之后：「大家好，欢迎来到 Demo，一个真正希望你…'],
 ['颜色','横竖都只用金、红、黑（暗底 + XG.gold + XG.red，THEMES…'],
 ['英文字幕','横竖都加：每条中文字幕下一行小号英文，AI 翻译，不人工…'],
 ['BGM','先从 BGM 库挑（100_星哥说改版/08_BGM库/，001–015 生…'],
 ['音效','只用 Seed Audio 精选库（锣、击鼓叮当类）…'],
];
const ruleRows=[{key:'颜色',a:'横竖都只用',b:'金、红、黑',c:''},{key:'不用',a:'不用：轰炸动效（',b:'砸下、震屏、闪白',c:'）'},{key:'节奏',a:'舞台每 ',b:'4–6 秒',c:'换一次'}];
function Manual({f}:{f:number}){
 const spread=smooth(f,2608,2629), heading=1-smooth(f,2636,2647);
 return <>
  <Panel x={330} y={143} w={780} h={479} white r={20} style={f<2629?{opacity:mix(.96,1,spread),transform:`translateY(${(1-spread)*4}px) scaleX(${mix(.81,1,spread)})`}:{opacity:1,transform:'translateY(0px)'}}>
   <T x={36} y={30} size={38}>{manualHead}</T><T x={339} y={40} size={24} face="code" color="#535359">xingge/SKILL.md</T>
   {manualRows.map(([key,val],i)=><B key={key} x={36} y={96+i*49} w={715} h={45} style={{borderBottom:'1px solid #e5e4e9',overflow:'hidden'}}><T x={0} y={5} size={22} face="body" weight={900}>{key}</T><T x={164} y={5} size={20} face="body" color="#707077">{val}</T></B>)}
  </Panel>
  {f<2647&&<div data-ft-manual-tag="审美" style={{position:'absolute',inset:0,opacity:heading*interpolateKeys(f,[[2608,.68],[2610,1]])}}>
    <Pill x={mix(665,635,enter(f,2607,2612))} y={113} w={mix(110,170,enter(f,2607,2612))} h={56} white size={39}>审美</Pill>
  </div>}
  <In f={f} at={2636} d={11} dy={-14}><Pill x={489} y={104} w={462} h={67} white size={44}>Skill 就是一本<Mark>工作手册</Mark></Pill></In>
 </>;
}
function Rules({f}:{f:number}){
 const i=f<2839?0:f<2900?1:2, u=enter(f,2733,2753);
 return <>
  <Panel x={mix(330,82,u)} y={142} w={mix(780,722,u)} h={480} white r={19}>
   <T x={37} y={30} size={38}>{manualHead}</T><T x={341} y={42} size={24} face="code" color="#535359">xingge/SKILL.md</T>
   {ruleRows.map((rule,j)=><B key={rule.key} x={36} y={103+j*124} w={654} h={88} style={{opacity:i===j?1:i>j?.82:.29}}><T x={0} y={0} size={24} face="body" weight={900} color="#66676c">{rule.key}</T><T x={0} y={39} size={35} face="body" weight={900}>{rule.a}<Mark>{rule.b}</Mark>{rule.c}</T></B>)}
  </Panel>
  <In key={i} f={f} at={[2740,2839,2900][i]} d={9} dy={7}>
   <Graphic kind={(['gold','capital','cash'] as const)[i]} f={f-[2733,2833,2892][i]} x={833} y={211} w={536} h={305} variant={i===2?1:0}/>
   {i===0?<B x={942} y={546} w={418} h={60} style={{display:'flex',gap:19,alignItems:'center',fontFamily:F.body,fontWeight:900,fontSize:30}}>{[['#ddb363','金'],['#e55a48','红'],['#18181a','黑']].map(([c,l])=><span key={l} style={{display:'inline-flex',alignItems:'center',gap:10}}><span style={{width:45,height:45,borderRadius:24,background:c,border:'1.5px solid #fff7'}}/>{l}</span>)}</B>:i===1?<T x={834} y={551} w={536} align="center" size={30}>砸下 ×　震屏 ×　闪白 ×</T>:<><Stroke d="M840 571 H1366" color={L} width={2.5} progress={enter(f,2903,2920)}/><Stroke d="M842 563V579 M1365 563V579" color={L} width={3}/><T x={836} y={588} w={535} align="center" size={27}>每 <Mark dark>4–6 秒</Mark> 一次变化</T></>}
  </In>
 </>;
}
function Audit({f}:{f:number}){
 const rows=['闪帧','黑场','亮度突变','1 fps 联系表'];
 return <Panel x={329} y={145} w={782} h={474} white style={{opacity:enter(f,2976,2985)}}>
  <T x={39} y={36} size={24} face="body" color="#7b7980">014 交付说明 · 检查结果</T>
  {rows.map((s,i)=><In key={s} f={f} at={2981+i*12} d={7} dy={8}><T x={41} y={103+i*86} size={43} color="#242428">{s}</T><T x={453} y={109+i*86} w={210} align="right" size={38} face="body" weight={900} color={P}>{i===3?'逐张看过':'0'}</T><Check x={693} y={100+i*86} d={55}/></In>)}
  <T x={41} y={447} size={15} color="#76747c" face="body">原片中的自检示例（不是本次复刻的检测结果）</T>
 </Panel>;
}
const contactPhotos:PhotoId[]=['factory','industrial','lab','city','datacenter','landscape','energy','trading','press','speaker'];
const palette=['#bab097','#d4ac58','#8e886b','#b3bb80','#ad533c'];
export function ReviewSheet({x,y,w,h,count=68,cols=11,r=6,opacity=1}:{x:number;y:number;w:number;h:number;count?:number;cols?:number;r?:number;opacity?:number}){
 const gap=Math.max(1.1,w*.003), rows=Math.ceil(count/cols), a=(w-(cols+1)*gap)/cols, b=(h-(rows+1)*gap)/rows;
 return <B x={x} y={y} w={w} h={h} style={{borderRadius:r,background:'#1b1b1c',overflow:'hidden',opacity,boxShadow:'0 7px 20px #0005'}}>
  {Array.from({length:count},(_,i)=>{
   const x1=gap+(i%cols)*(a+gap),y1=gap+Math.floor(i/cols)*(b+gap),photo=((i*7+i%cols)%13)<7;
   return photo ? <Photo key={i} id={contactPhotos[(i*7+i%cols)%contactPhotos.length]} x={x1} y={y1} w={a} h={b} tint={.18+(i%3)*.09} r={r*.36}/> :
   <B key={i} x={x1} y={y1} w={a} h={b} style={{background:`linear-gradient(125deg,${i%4===0?'#173049':'#2d2920'},#1b1b1a)`,borderRadius:r*.36,overflow:'hidden'}}>
    <B x={a*.12} y={b*.17} w={a*.39} h={Math.max(1,b*.043)} style={{background:'#ae9b71'}}/>
    {[.19,.37,.53,.69,.84].map((xx,k)=>{const v=.12+((i+3)*(k+4)%7)*.051;return <B key={k} x={a*xx} y={b*(.78-v)} w={a*.081} h={b*v} style={{background:palette[(i+k)%palette.length]}}/>;})}
    <B x={a*.1} y={b*.78} w={a*.81} h={1} style={{background:'#91887c67'}}/>
   </B>;
  })}
 </B>;
}
export const irisRadius=(f:number,start=3161)=>interpolateKeys(f-start,[[0,822],[1,735],[2,650],[3,550],[4,447],[5,343],[6,241],[7,156],[8,83],[9,30],[10,2],[11,0]]);
function Contact({f}:{f:number}){
 const v=smooth(f,3150,3165), count=Math.round(interpolateKeys(f,[[3083,1],[3096,32],[3107,68]]));
 const w=mix(1103,402,v),h=mix(496,386,v),x=(W-w)/2,y=mix(100,204,v);
 return <>
  <ReviewSheet x={x} y={y} w={w} h={h}/>
  {f<3156&&<><B x={x+((count-1)%11)*100} y={y+Math.floor((count-1)/11)*70} w={102} h={75} style={{border:'2px solid #d6beff',boxShadow:'0 0 9px #e2cef9a6',borderRadius:5}}/><T x={0} y={604} w={W} align="center" size={30}>抽帧一览 · 第 <Mark dark>{count}</Mark> / 68 张</T><T x={0} y={644} w={W} align="center" face="body" size={17} color="#a09da1">独立缩略图示意 · 不是本次 QA 联系表</T></>}
 </>;
}
export function Middle({id,f,start}:ShotProps){
 switch(id){
  case 'lego':return <Lego f={f}/>;
  case 'nodes':{const capital=f>=2077;return <><Graphic kind={capital?'capital':'network'} x={275} y={117} w={890} h={476} f={f-(capital?2077:start)+8}/><Pill x={570} y={93} w={300} h={68} white size={38}>{capital?'资金流向':'人物关系图'}</Pill></>}
  case 'map':{const rank=f>=2197;return <><Graphic kind={rank?'rank':'map'} x={268} y={124} w={906} h={509} f={f-(rank?2197:start)+4} drill/><Pill x={570} y={96} w={300} h={67} white size={39}>{rank?'排名赛跑':'地球推到城市'}</Pill></>}
  case 'panels':return <ComponentsWall f={f}/>;
  case 'strip':return <Recombine f={f}/>;
  case 'posters':return <><ThumbnailWall f={f-start+4} x={125} y={155} w={230} h={118} gap={10} count={15} outlined stagger={1.4}/><In f={f} at={2438} d={10}><Pill x={531} y={600} w={378} h={59} white size={37}>就像搭<Mark>积木</Mark>一样</Pill></In></>;
  case 'rails':return <>
   <T x={115} y={562} size={32}>下限</T><ThumbnailWall f={f-start+7} x={118} y={609} w={75} h={45} cols={15} count={15} gap={4} outlined/>
   <B x={116} y={662} w={1184} h={3} style={{background:'#a491aa'}}/>
   <In f={f} at={2536} d={11} dy={0}><B x={116} y={137} w={1190} h={1} style={{borderTop:'3px dashed #ae9cb7'}}/><T x={112} y={146} size={32} color={L}>上限</T><T x={0} y={265} w={W} align="center" size={161}>?</T></In>
  </>;
  case 'manual':return <Manual f={f}/>;
  case 'rules':return <Rules f={f}/>;
  case 'audit':return <Audit f={f}/>;
  case 'contact':return <Contact f={f}/>;
  default:return null;
 }
}
