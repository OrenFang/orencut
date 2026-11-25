import React from 'react';
import {B,Check,DARK,F,GOLD,GridTexture,H,INK,In,L,Mark,Panel,Pill,ShotProps,T,W,enter,interpolateKeys,mix,pretty,ratio,smooth} from './core';
import {Graphic,GraphicKind,ThumbnailWall,Tile,TileKind,playbackValue} from './graphics';
import {FilmClip,Photo,PhotoId,SourceTag} from './media';
import {OpeningRepair} from './opening-repair';

function Opening({f}:{f:number}){
 const left=smooth(f,43,49), right=enter(f,45,53), value=pretty(playbackValue(f));
 const alpha=1-smooth(f,76,105);
 return <B x={0} y={0} w={W} h={H} style={{opacity:alpha,background:'radial-gradient(ellipse at 46% 48%,#211d15,#181713 75%)'}}>
   <GridTexture color="#917c3716" step={92}/>
   <T x={-13} y={33} size={24} face="body" weight={900} color="#d8d3c4">梁文锋和DeepSeek　<span style={{color:'#79756a'}}>02　03</span></T>
   <B x={0} y={69} w={208} h={2} style={{background:'#93794b'}}/>
   <B x={0} y={505} w={1370} h={7} style={{background:'#8e7349',borderRadius:4,boxShadow:'0 0 8px #bd9a5a42'}}/>
   <T x={-8} y={252} size={72} face="body" weight={900} color={left>.1?'#8d7447':'#ddbd79'}>2023.4</T>
   <T x={-9} y={345} size={46} face="body" weight={900} color={left>.1?'#8e8c80':'#e5e0d0'}>官方宣布做 AGI</T>
   <B x={97} y={486} w={44} h={44} style={{borderRadius:7,border:`3px solid ${left>.1?'#9a7b4a':'#e4bc6f'}`,background:left>.1?'#282417':'#c8a360',boxShadow:left>.1?'none':'0 0 27px #e4bc6fa0'}}/>
   <B x={695} y={482} w={50} h={50} style={{borderRadius:8,background:'#bc9955',boxShadow:'0 0 30px #d5aa55a0',opacity:right,transform:`scale(${mix(.7,1,right)})`}}/>
   <T x={500} y={553+18*(1-right)} w={440} align="center" size={74} face="body" weight={900} color="#c8a15c" style={{opacity:right}}>2023.7</T>
   <T x={450} y={650+12*(1-right)} w={540} align="center" size={51} face="body" weight={900} color="#d7d2c5" style={{opacity:right}}>成立 DeepSeek</T>
   <Panel x={f===0?378:365} y={248} w={f===0?684:709} h={223} r={22} style={{background:'#19181c'}}>
    <div data-ft-count={value} style={{position:'absolute',inset:'7px 13px 28px',fontFamily:F.display,display:'flex',alignItems:'center',justifyContent:'center',gap:19,whiteSpace:'nowrap'}}>
     <span style={{fontSize:48,alignSelf:'center',transform:'translateY(12px)'}}>播放</span><span style={{color:L,fontSize:115,lineHeight:1,fontVariantNumeric:'tabular-nums',letterSpacing:-1,transform:'translateY(-4px)'}}>{value}</span>
    </div>
    <T x={0} y={156} w={709} align="center" size={22} color="#a8a6aa" face="code">抖音后台 · DeepSeek 融 1000 亿</T>
   </Panel>
  </B>;
}
function Hook({f}:{f:number}){
 const z=smooth(f,83,122),exit=smooth(f,167,175);
 const words=['全','是','AI','剪','的'];
 return <>
  <Graphic kind="network" variant={3} f={80} x={-20} y={-24} w={1480} h={832} r={0} style={{opacity:.44*z,transform:`scale(${1+.12*z})`}}/>
  {f<106&&<Opening f={f}/>}
  <B x={115} y={247} w={1210} h={235} style={{opacity:1-exit,textAlign:'center',whiteSpace:'nowrap',fontFamily:F.display,fontSize:122,letterSpacing:1,filter:'drop-shadow(0 5px 10px #0007)'}}>
   {words.map((a,i)=>{const phase=[81,83,88,94,97][i],u=enter(f,phase,phase+8);return <span key={a} style={{display:'inline-block',verticalAlign:'middle',transform:`translateY(${mix(-54,0,u)}px)`,margin:i===2?'0 20px':'0',opacity:f>=phase?1:0,color:i===2?L:'#fff'}}>{a}</span>})}
  </B>
  <In f={f} at={103} d={19} dy={23}><T x={0} y={439} w={W} align="center" size={49}>看完这期， <Mark dark>你也能会</Mark></T></In>
 </>;
}
function News({f}:{f:number}){
 const f0=f-168, items:readonly [PhotoId,number,number,number,number,string][]=[['energy',0,138,474,257,'10 吉瓦'],['datacenter',718,159,473,259,'6 吉瓦'],['lab',32,428,452,320,'10 吉瓦']];
 return <>
  <Photo id="industrial" x={0} y={0} w={W} h={H} r={0} tint={.58} style={{transform:`scale(${1.03+.0015*f0})`}}/>
  <B x={0} y={0} w={W} h={94} style={{background:'linear-gradient(0deg,#14131100,#232019b7)',borderLeft:`5px solid ${GOLD}`}}/>
  <T x={14} y={20} size={34} face="body" weight={900}>能源投入，从哪找素材？</T>
  {items.map(([id,x,y,w,h,val],i)=><In key={id} f={f} at={167+i*5} d={14} dy={24}><Photo id={id} x={x} y={y} w={w} h={h} r={3} tint={.05}/><B x={x+w-12} y={y+12} w={169} h={123} style={{background:'#151410bb'}}/><T x={x+w+2} y={y+26} size={46} color="#efd28d" face="body" weight={900}>{val}</T><T x={x+w+7} y={y+85} size={14} color="#f4ead1" face="body">原片举例数值</T></In>)}
  <SourceTag x={26} y={668} w={217} text="独立财经场景 · 非原新闻"/>
  {f<177&&<B x={0} y={0} w={W} h={H} style={{opacity:1-ratio(f,168,176)}}><Hook f={167}/></B>}
 </>;
}
const wallAngle = -9.2;
function WallBacking({f,amount=1}:{f:number;amount?:number}){
 return <B x={0} y={0} w={W} h={H} style={{opacity:amount,overflow:'hidden',background:DARK}}>
  <ThumbnailWall x={-151-(f-274)*.55} y={-137-(f-274)*.4} w={319} h={178} cols={6} count={30} gap={14} outlined style={{transform:`rotate(${wallAngle}deg) scale(${1.08+smooth(f,278,345)*.09})`,opacity:.88}}/>
  <B x={0} y={0} w={W} h={H} style={{background:'radial-gradient(ellipse,#08080925,#08080959)'}}/>
 </B>;
}
function Example({f}:{f:number}){
 const z=smooth(f,333,371),tag=enter(f,396,407),y=249,h=452;
 return <>
  {f<370&&<WallBacking f={f} amount={1-smooth(f,342,369)}/>}
  <B x={mix(500,310,z)} y={mix(280,y,z)} w={mix(308,820,z)} h={mix(177,h,z)} style={{transform:`rotate(${mix(wallAngle,0,z)}deg)`,borderRadius:14,overflow:'hidden',boxShadow:'0 14px 28px #0008'}}>
   <FilmClip id="city" start={333} end={425} trim={28} x={0} y={0} w={mix(308,820,z)} h={mix(177,h,z)} r={0}/>
   <T x={13} y={13} size={20} color="#fff" face="body" weight={900} style={{textShadow:'0 2px 6px #000'}}>独立城市实拍</T>
   {tag>0&&<B x={0} y={272} w={465*tag} h={39} style={{background:'#d6b772ed',overflow:'hidden'}}><T x={10} y={6} size={19} color="#221e14" face="body" weight={900}>十几期财经视频 · 画面关系示意</T></B>}
  </B>
 </>;
}
function Stack({f}:{f:number}){
 const u=smooth(f,425,455),last=1-smooth(f,489,499);
 const types=['city','tracks','cash','network'] as const, caps=['画面','图表','组件','审美'];
 return <B x={0} y={0} w={W} h={H} style={{opacity:last}}>
  {f<435&&<B x={0} y={0} w={W} h={H} style={{opacity:1-ratio(f,426,435)}}><Photo id="city" x={310} y={249} w={820} h={452}/><SourceTag x={326} y={267} w={161} text="独立城市实拍"/></B>}
  <B x={mix(325,244,u)} y={mix(178,133,u)} w={781} h={565} style={{perspective:1100}}>
   {types.map((kind,i)=>{const z=enter(f,425+i*3,434+i*7);return <B key={kind} x={94+i*4} y={mix(253-i*15,369-i*87,u)} w={675} h={266} style={{transform:`rotateX(${mix(12,48,u)}deg) rotateZ(${mix(-6,-18,u)}deg) translateY(${(1-z)*65}px)`,opacity:z,borderRadius:14,background:'#24231d',boxShadow:'0 22px 35px #0009'}}><Tile kind={kind} x={0} y={0} w={675} h={266} style={{border:'1px solid #a78d5655'}}/>{i===3&&<T x={33} y={28} size={29} face="body" weight={900} style={{textShadow:'0 2.5px 4px #171512'}}>颜色只用 黑 金 红<br/>不用 砸下 黑屏 闪白<br/>每 4–6 秒一次变化</T>}</B>})}
  </B>
  {caps.map((c,i)=><In key={c} f={f} at={431+i*7} d={11} dx={35} dy={0}><Pill x={1122} y={445-i*84} w={185} h={62} size={39} white><Mark>0{i+1}</Mark> {c}</Pill></In>)}
 </B>;
}
function Announcement({f}:{f:number}){
 const u=smooth(f,553,572);
 return <>
  {f<502&&<B x={0} y={0} w={W} h={H} style={{opacity:.08*(1-ratio(f,499,502))}}><Stack f={487}/></B>}
  <In f={f} at={500} d={10} dy={13} s={.93}><Pill x={380} y={mix(294,200,u)} w={680} h={105} size={59}>你用 AI 剪的视频</Pill></In>
  <In f={f} at={557} d={11} dy={23}><T x={170} y={mix(438,372,u)} w={1100} align="center" size={115} color={INK}>一看就很<Mark>廉价</Mark></T></In>
 </>;
}
function FactoryBridge({f}:{f:number}){
 const grow=smooth(f,898,916),shrink=smooth(f,923,937);
 const x=mix(mix(159,0,grow),300,shrink), y=mix(mix(217,0,grow),141,shrink), w=mix(mix(530,W,grow),840,shrink), h=mix(mix(302,H,grow),474,shrink);
 const r=f<916?mix(16,0,grow):14*shrink;
 const emphasize=f<916||f>=921;
 return <B x={x} y={y} w={w} h={h} style={{overflow:'hidden',borderRadius:r,boxShadow:'0 11px 21px #0005'}}>
  {f<902?<Photo id="factory" x={0} y={0} w={w} h={h} r={0} tint={.38}/>:<FilmClip id="factory" start={902} end={990} trim={2} x={0} y={0} w={w} h={h} r={0} tint={.38}/>}
  {f>=906&&f<941&&emphasize&&<><B x={0} y={h*.775} w={w*.434} h={h*.176} style={{background:'#ca4c3f',opacity:enter(f,905,909)}}/><T x={w*.024} y={h*.797} size={w*.047} face="body" weight={900} style={{fontStyle:'italic'}}>+10%</T><T x={w*.019} y={h*.731} size={w*.021} face="body" weight={900} color="#fff9e8" style={{textShadow:'0 1px 5px #000'}}>原片举例 · 非画面所示工厂业绩</T></>}
  {f>=905&&<SourceTag x={6} y={8} w={w*.31} size={Math.max(12,w*.013)} text="独立工厂实拍"/>}
  {f<912&&<T x={23} y={h-62} size={44} style={{opacity:1-smooth(f,903,912),textShadow:'0 2px 5px #000'}}>01 示例画面</T>}
 </B>;
}
function Fault({f}:{f:number}){
 const shift=interpolateKeys(f,[[724,0],[730,.72],[738,1]]),fade=1-smooth(f,898,911);
 const titleWidth=mix(740,540,shift), titleHeight=mix(106,72,shift);
 return <>
  <Pill x={(W-titleWidth)/2} y={mix(308,112,shift)} w={titleWidth} h={titleHeight} size={mix(59,43,shift)} style={{opacity:fade}}>一眼就能看出是<Mark dark>AI</Mark>做的</Pill>
  {[0,1].map(i=>{
    const mount=enter(f,726+i*7,730+i*7), flip=smooth(f,818+i*12,846+i*12), transformed=flip<.5?flip*180:(flip-1)*180;
    const x=165+i*585,y=224,w=526,h=316;
    const rise=i===0?18*(1-smooth(f,730,738)):0;
    return <B key={i} x={x} y={y-rise} w={w} h={h} style={{perspective:1300,opacity:mount*(i===0&&f>=897?0:fade)}}>
     <Panel x={0} y={0} w={w} h={h} r={22} style={{transform:`rotateY(${transformed}deg)`,background:'#18181a'}}>
      {flip<.5?<><T x={0} y={86} w={w} align="center" color="#77767b" size={42}>{i?'02':'01'}</T><T x={0} y={146} w={w} align="center" size={65}>{i?'动画是套的':'画面是假的'}</T></>:<>
       {i===0?<Photo id="factory" x={0} y={0} w={w} h={h} r={0} tint={.38}/>:<Graphic kind="capital" x={0} y={0} w={w} h={h} r={0} f={70}/>}
       <T x={22} y={h-67} size={49} style={{textShadow:'0 2px 4px #000'}}>{i?'02 组件':'01 示例画面'}</T></>}
     </Panel>
     {f>=783+i*15&&<Check x={484} y={-32} yes={flip>.5} d={67}/>} 
    </B>
  })}
  {f>=897&&<FactoryBridge f={f}/>}
 </>;
}
function Meter({f,alpha=1}:{f:number;alpha?:number}){
 if(f>=941&&f<=976){
  if(f<957)return null;
  const p=interpolateKeys(f,[[958,0],[959,.025],[960,.073],[962,.145],[966,.4],[972,.534],[976,.55]]);
  const a=interpolateKeys(f,[[957,.6],[958,.88],[959,1]]);
  return <div data-ft-meter-labels="true" data-ft-meter-fill={p} style={{position:'absolute',left:300,top:640,width:840,height:63,opacity:a*alpha}}>
   <B x={0} y={0} w={840} h={18} style={{background:'#27272a',borderRadius:9}}/>
   {p>0&&<B x={0} y={0} w={840*p} h={18} style={{background:L,borderRadius:9}}/>}
   <T x={0} y={24} size={25} face="body" weight={900}>实拍 <Mark dark>50–60%</Mark></T>
   <T x={552} y={24} w={288} align="right" size={25} face="body" weight={900} color="#a2a2a8">其余是图表</T>
  </div>;
 }
 const u=enter(f,944,976);
 return <B x={300} y={640} w={840} h={63} style={{opacity:alpha*enter(f,940,953)}}>
  <B x={0} y={0} w={840} h={18} style={{background:'#27272a',borderRadius:9}}/>
  <B x={0} y={0} w={462*u} h={18} style={{background:L,borderRadius:9}}/>
  <T x={0} y={24} size={25} face="body" weight={900}>实拍 <Mark dark>50–60%</Mark></T>
  <T x={552} y={24} w={288} align="right" size={25} face="body" weight={900} color="#a2a2a8">其余是图表</T>
 </B>;
}
function NextFootageExample({f}:{f:number}){
 const market=f<966;
 return <div data-ft-footage-example={market?'market':'equipment'} style={{position:'absolute',left:300,top:141,width:840,height:474}}>
  <Photo id={market?'trading':'datacenter'} x={0} y={0} w={840} h={474} tint={market?.20:.25} focus={market?'54% 48%':'54% 56%'}/>
  <SourceTag x={14} y={17} w={market?205:237} text={market?'独立交易场景 · 非原案例':'独立设备场景 · 非原报道'}/>
  <T x={18} y={357} size={57} face="body" weight={900} color="#f6dfab" style={{textShadow:'0 3px 9px #000'}}>Demo</T><T x={18} y={415} size={24} face="body" weight={900}>财经新闻 · AI 剪辑</T>
 </div>;
}
function Footage({f}:{f:number}){
 const media:PhotoId=f<1035?'industrial':f<1062?'press':'factory';
 return <>
  {f<960?<FactoryBridge f={f}/>:f<990?<NextFootageExample f={f}/>:<>
   {f<1062?<Photo id={media} x={300} y={141} w={840} h={474} tint={.29} focus={media==='press'?'51% 39%':'50% 50%'}/>:<FilmClip id="factory" start={1062} end={1107} trim={84} x={300} y={141} w={840} h={474} tint={.34}/>}
   <SourceTag x={312} y={574} w={media==='press'?220:187} text={media==='press'?'独立图像 · 并非受访当事人':'独立场景 · 非原报道'}/>
   {f<1033&&<><T x={316} y={498} size={57} face="body" weight={900} color="#f6dfab" style={{textShadow:'0 3px 9px #000'}}>Demo</T><T x={318} y={556} size={24} face="body" weight={900}>财经新闻 · AI 剪辑</T></>}
  </>}
  <Meter f={f}/>
  {['新闻','发布会','工厂'].map((name,i)=><In key={name} f={f} at={1037+i*12} d={10} dy={-9}><Pill x={[465,644,856][i]} y={155} w={[118,152,118][i]} h={61} white size={40}>{name}</Pill></In>)}
 </>;
}
const counts=[[1107,0],[1109,0],[1110,10],[1111,43],[1112,74],[1113,104],[1114,132],[1115,158],[1120,256],[1125,312],[1130,342],[1135,357],[1140,364],[1142,366],[1143,367],[1144,367],[1145,368],[1147,368],[1150,369],[1160,370],[1166,370]] as const;
const indexLines=['city-still.jpg','speaker.jpg','factory-still.jpg','datacenter.jpg','energy.jpg','lab.jpg','industrial.jpg','trading.jpg','landscape.jpg'];
function Hunt({f}:{f:number}){
 const d=f-1107, u=enter(f,1106,1112), value=pretty(interpolateKeys(f,counts)), exit=1-smooth(f,1161,1167);
 return <>
  {d<6&&<B x={0} y={0} w={W} h={H} style={{opacity:1-u}}><Footage f={1106}/></B>}
  <B x={0} y={0} w={W} h={H} style={{opacity:u*exit}}>
   <Photo id="speaker" x={83} y={178} w={559} h={337} tint={.23} focus="52% 44%"/><SourceTag x={97} y={477} w={286} text="独立发布会实景 · 非原受访者"/>
   <Panel x={684} y={263} w={670} h={318} r={13} style={{background:'#242429'}}>
    {indexLines.map((a,i)=><T key={a} x={29} y={23+i*26} size={16.5} face="code" color="#bdbbc3" style={{opacity:enter(f,1110+2*i,1114+2*i)}}>{String(i+1).padStart(2,'0')}　素材索引 / {a}</T>)}
    <T x={30} y={275} size={14} face="body" color="#acabb2">目录为本次替图示意 · 上方数字为原片自述</T>
   </Panel>
   <T x={689} y={178} size={31} face="body" weight={900} color="#a5a5aa">014 期 · AI 下载的素材 <span data-ft-download={value} style={{fontFamily:F.display,fontSize:75,color:L,fontWeight:400,verticalAlign:'middle'}}> {value} </span><span style={{color:'#eee'}}>条</span></T>
  </B>
 </>;
}
const strip:TileKind[]=['city','gold','price','cash','tracks'];
function Reuse({f}:{f:number}){
 return <>
  <In f={f} at={1167} d={8}><T x={80} y={143} size={25} face="body" weight={900} color="#a7a6aa">素材相似 · 收下进入素材库</T></In>
  {strip.map((kind,i)=>{const used=enter(f,1199+i*3,1207+i*3),x=80+i*258;return <In key={i} f={f} at={1167+i*2} d={6} dy={5}><Tile kind={kind} x={x} y={178} w={242} h={134} style={{opacity:1-used}}/><B x={x} y={178} w={242} h={134} style={{opacity:used,border:'1px solid #454549',background:'#1d1d1f',borderRadius:9}}><T x={0} y={46} w={242} align="center" size={25} color="#929197">已用</T></B></In>})}
  <In f={f} at={1219} d={12}><T x={80} y={437} size={25} face="body" weight={900} color="#aaabb0">全片调度 · 每个素材只用一次</T></In>
  {strip.slice().reverse().map((kind,i)=><In key={i} f={f} at={1221+i*3} d={9}><Tile kind={kind} x={80+i*258} y={478} w={242} h={137}/>{f>=1228+i*3&&<Check x={296+i*258} y={462} d={42} white/>}</In>)}
 </>;
}
const snippet=['export function HundredBill({f, cutAt}) {','  const u = enter(f, cutAt, cutAt + 17);','  const cost = 25;','  const total = 100;','  const remain = total - cost;','  return (','    <Bill amount={total}>','      <Segment label="成本"','        amount={cost} progress={u} />','      <Segment label="剩余"','        amount={remain} progress={u} />','    </Bill>','  );','}'];
function CodeView({f}:{f:number}){
 const t=f-1606, profit=enter(f,1734,1755);
 const expand=enter(f,1608,1633),exit=smooth(f,1810,1819);
 const g=1-exit;
 return <B x={0} y={0} w={W} h={H} style={{opacity:1-exit*.08}}>
  <Graphic kind="cash" marginBill={{profit,framing:exit,phase:f}} x={mix(mix(296,75,expand),582,exit)} y={mix(150,279,exit)} w={mix(mix(830,675,expand),276,exit)} h={mix(mix(462,380,expand),153,exit)}/>
  <Panel x={mix(1000,780,expand)} y={150} w={585} h={450} style={{background:'#232329',opacity:expand*g}}>
   <B x={0} y={0} w={585} h={47} style={{background:'#26262a'}}/>
   {['#ff5c56','#ffbf47','#43cf54'].map((c,i)=><B key={c} x={20+i*22} y={18} w={12} h={12} style={{background:c,borderRadius:6}}/>)}
   <T x={94} y={13} size={24} color="#aaa8b0" face="code">S04_HundredBill.tsx · 结构示意</T>
   {snippet.map((s,i)=><React.Fragment key={s}><T x={27} y={52+i*26.3-t*.046} size={16} color="#818088" face="code">{59+i}</T><T x={62} y={50+i*26.3-t*.046} size={18} color={i<5?'#e5dae8':'#eeedf0'} face="code" style={{whiteSpace:'pre'}}>{s}</T></React.Fragment>)}
  </Panel>
  {f<1710?<In f={f} at={1641} d={12}><Pill x={247} y={551} w={331} h={62} white size={38}>一行行<Mark>代码</Mark>写出来</Pill></In>:<>
   <In f={f} at={1705} d={10}><Pill x={202} y={549} w={166} h={61} white size={39} style={{opacity:g}}>数字<Mark>准</Mark></Pill></In>
   <In f={f} at={1774} d={5}><Pill x={405} y={549} w={171} h={61} white size={39} style={{opacity:g}}>字<Mark>不糊</Mark></Pill></In>
  </>}
 </B>;
}
function DataRule({f}:{f:number}){
 const opacity=interpolateKeys(f,[[1429,.22],[1430,.98],[1431,1],[1480,1],[1481,.96],[1482,.63],[1486,.10],[1487,0]]);
 const dy=interpolateKeys(f,[[1429,8],[1431,0],[1481,0],[1486,13]]);
 const card=<Panel x={240} y={518} w={960} h={112.5} white r={22}><T x={36} y={18} size={20} color="#767479" face="body">星哥说制作手册 · 数据图</T><T x={36} y={49} size={38} face="body" weight={900}>拿不到写「<Mark>未取得</Mark>」，不估算。</T></Panel>;
 if(f>=1457&&f<1478)return card;
 return <div data-ft-data-rule="transition" style={{position:'absolute',inset:0,opacity,transform:`translateY(${dy}px)`}}>{card}</div>;
}
export function Early({id,f,start,end}:ShotProps){
 switch(id){
  case 'open':return f<78?<Opening f={f}/>:<OpeningRepair f={f}/>;
  case 'hook':return <OpeningRepair f={f}/>;
  case 'news':return <News f={f}/>;
  case 'map-in':return <><Graphic kind="map" x={0} y={0} w={W} h={H} r={0}/><Pill x={621} y={67} w={198} h={55} size={36}>地图</Pill></>;
  case 'bars-in':return <><Graphic kind="tracks" x={0} y={0} w={W} h={H} r={0}/><Pill x={621} y={67} w={198} h={55} size={36}>图表</Pill></>;
  case 'city':return <><FilmClip id="city" start={start} end={end} trim={5} x={0} y={0} w={W} h={H} r={0}/><Pill x={590} y={72} w={260} h={67} size={40}>新闻画面</Pill><SourceTag x={10} y={15} w={240} text="独立城市实拍 · 台北" size={21}/></>;
  case 'relate':return <><Graphic kind="network" x={0} y={0} w={W} h={H} r={0} f={f-start+15}/><Pill x={590} y={62} w={260} h={60} size={34}>人物关系</Pill></>;
  case 'wall':return <><WallBacking f={f}/>{f<281&&<Graphic kind="network" x={0} y={0} w={W} h={H} r={0} style={{opacity:1-smooth(f,274,281)}}/>}<In f={f} at={282} d={15} dy={16}><T x={0} y={322} w={W} align="center" size={103} style={{textShadow:'0 4px 9px #0008'}}>没有<Mark dark>一帧</Mark>是我剪的</T></In></>;
  case 'example':return <Example f={f}/>;
  case 'stack':return <Stack f={f}/>;
  case 'cheap':return <Announcement f={f}/>;
  case 'fault':return <Fault f={f}/>;
  case 'footage':return <Footage f={f}/>;
  case 'hunt':return <Hunt f={f}/>;
  case 'reuse':return <Reuse f={f}/>;
  case 'data':{
   const kind:GraphicKind=f<1381?'gold':'yield';
   return <>
    <Graphic kind={kind} x={299} y={140} w={844} h={471} f={f-(kind==='yield'?1417:1300)+7}/>
    {f>=1381&&f<1417&&<Panel x={389} y={220} w={660} h={301} white><T x={37} y={25} size={24} face="body" color="#67656e">独立数据来源 · 公开原始时间序列</T><T x={37} y={93} size={44} color="#1d1d25">Federal Reserve / DEMO</T><T x={37} y={160} size={22} face="code" color="#69636d">DGS10 · 2025-01-02 — 2025-06-30</T><T x={37} y={224} size={25} face="body">美国 10 年期国债收益率（%）</T></Panel>}
    {f>=1429&&<DataRule f={f}/>}
   </>;
  }
  case 'bars':{
   const bars=<Graphic kind="tracks" x={294} y={132} w={852} h={478} f={f-start+8} footage={{start,end,trim:12}} style={{transform:`perspective(1080px) rotateY(${mix(-8,-1,smooth(f,1478,1522))}deg)`}}/>;
   return <>
    {f<1487?<>
     <B x={0} y={0} w={W} h={H} style={{opacity:1-smooth(f,1479,1486)}}><Graphic kind="yield" x={299} y={140} w={844} h={471} f={f-1417+7}/></B>
     <B x={0} y={0} w={W} h={H} style={{opacity:smooth(f,1479,1486)}}>{bars}</B>
     <DataRule f={f}/>
    </>:bars}
    <In f={f} at={1529} d={12}><Pill x={524} y={533} w={394} h={56} white size={30}>数据来源<Mark>可核实</Mark></Pill></In>
    <In f={f} at={1566} d={12}><Pill x={569} y={623} w={313} h={56} white size={34}>用代码做<Mark>动画</Mark></Pill></In>
   </>;
  }
  case 'code':return <CodeView f={f}/>;
  default:return null;
 }
}

export { Opening, Fault };
