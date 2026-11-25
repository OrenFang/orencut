import React from 'react';
import {B,DARK,F,GOLD,GridTexture,H,In,L,Mark,Panel,Stroke,T,W,enter,interpolateKeys,mix,pretty,ratio} from './core';
import {playbackValue} from './graphics';

function DeepSeekPlaque({y,opacity}:{y:number;opacity:number}){
 return <div data-ft-deepseek-plaque="true" style={{position:'absolute',left:541,top:y,width:358,height:111,display:'flex',justifyContent:'center',alignItems:'center',gap:8,background:'#dbdbd7',color:'#181817',boxShadow:'0 4px 12px #0007',opacity}}>
  <svg width="68" height="42" viewBox="0 0 68 42" aria-hidden="true"><path d="M2 11c10 3 15 1 23 8 8-2 12-13 22-13q12 0 15 12c3 6-1 13-11 16-15 5-32 3-40-8C6 21 6 15 2 11Zm16 9 5-3c-2-2-4-4-8-4Zm36-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor" fillRule="evenodd"/></svg>
  <span style={{fontFamily:F.body,fontSize:56,fontWeight:900,letterSpacing:-3}}>deepseek</span>
 </div>;
}
function TimelineTail({f}:{f:number}){
 const exit=ratio(f,78,85), third=ratio(f,103,107), late=f>=104;
 const value=pretty(playbackValue(f));
 return <div data-ft-opening-dim="pressed" style={{position:'absolute',inset:0,background:DARK}}>
  <B x={0} y={0} w={W} h={H} style={{opacity:.45,background:'radial-gradient(ellipse at 46% 48%,#211d15,#181713 75%)'}}>
   <GridTexture color="#917c3716" step={92}/>
   <T x={-13} y={33} size={24} face="body" weight={900} color="#d8d3c4">梁文锋和DeepSeek　<span style={{color:'#79756a'}}>02　03</span></T>
   <B x={0} y={69} w={208} h={2} style={{background:'#93794b'}}/>
   <B x={0} y={505} w={1370} h={7} style={{background:'#8e7349',borderRadius:4,boxShadow:'0 0 8px #bd9a5a42'}}/>
   <T x={-8} y={252} size={72} face="body" weight={900} color="#8d7447">2023.4</T>
   <T x={-9} y={345} size={46} face="body" weight={900} color="#8e8c80">官方宣布做 AGI</T>
   <B x={97} y={486} w={44} h={44} style={{borderRadius:7,border:'3px solid #9a7b4a',background:'#282417'}}/>
   <B x={695} y={482} w={50} h={50} style={{borderRadius:8,background:late?'#252116':'#bc9955',boxShadow:late?'inset 0 0 0 3px #b39862':'0 0 30px #d5aa55a0'}}/>
   <T x={500} y={553} w={440} align="center" size={74} face="body" weight={900} color="#c8a15c">2023.7</T>
   <T x={450} y={650} w={540} align="center" size={51} face="body" weight={900} color="#d7d2c5">成立 DeepSeek</T>
   {late&&<B x={0} y={0} w={W} h={H} style={{opacity:third}}>
    <T x={1166} y={252} w={300} align="center" size={72} face="body" weight={900} color="#ddbd79">2025.1</T>
    <T x={1196} y={346} w={240} align="center" size={51} face="body" weight={900} color="#e5e0d0">R1 发布</T>
    <B x={1295} y={484} w={53} h={47} style={{borderRadius:7,border:'3px solid #e4bc6f',background:'#c8a360',boxShadow:'0 0 27px #e4bc6fa0'}}/>
   </B>}
  </B>
  <DeepSeekPlaque y={284} opacity={interpolateKeys(f,[[78,.08],[82,.24],[85,.45],[107,.45]])}/>
  {f<85&&<Panel x={365} y={248-75*exit} w={709} h={223} r={22} style={{background:'#19181c',opacity:.76*(1-exit)}}>
   <div data-ft-count={value} style={{position:'absolute',inset:'7px 13px 28px',fontFamily:F.display,display:'flex',alignItems:'center',justifyContent:'center',gap:19,whiteSpace:'nowrap'}}>
    <span style={{fontSize:48,alignSelf:'center',transform:'translateY(12px)'}}>播放</span><span style={{color:L,fontSize:115,lineHeight:1,fontVariantNumeric:'tabular-nums',letterSpacing:-1,transform:'translateY(-4px)'}}>{value}</span>
   </div>
   <T x={0} y={156} w={709} align="center" size={22} color="#a8a6aa" face="code">抖音后台 · DeepSeek 融 1000 亿</T>
  </Panel>}
 </div>;
}
const industries=[['宁德时代','电池'],['GEELY','造车'],['Midea','家电'],['美团','外卖']] as const;
function GroupedDiagram({f}:{f:number}){
 return <div data-ft-opening-diagram="grouped" style={{position:'absolute',inset:0,background:'#181816'}}>
  <B x={0} y={0} w={W} h={H} style={{opacity:.47}}>
   <T x={-7} y={29} size={25} face="body" weight={900} color="#d9c8a5">02 一千亿谁押的 <span style={{color:'#73694f'}}>03</span></T>
   <B x={0} y={66} w={218} h={3} style={{background:'#968053'}}/>
   <T x={15} y={85} size={39} color={GOLD}>芯片</T>
   <Panel x={-15} y={145} w={438} h={132} r={6} style={{background:'#24221c',border:'1px solid #9e81475e'}}><T x={86} y={17} size={44} face="body" weight={900}>石溪资本</T><T x={86} y={72} size={27} face="body" color="#d6c8ae">兆易创新背后</T></Panel>
   <T x={119} y={283} size={37} face="body" color="#cab99a">存储芯片</T>
   <Panel x={-15} y={333} w={438} h={132} r={6} style={{background:'#24221c',border:'1px solid #9e81475e'}}><T x={24} y={25} size={42} face="body" weight={900}>芯聚源</T></Panel>
   <T x={119} y={486} size={37} face="body" color="#cab99a">芯片制造</T>
   <T x={541} y={119} w={358} align="center" size={38} face="body" weight={900} color="#dfd5c1">第二轮投资方 · <span style={{color:GOLD}}>据报道</span></T>
   <T x={1058} y={85} size={42} color={GOLD}>2 产业</T>
   <Stroke d="M423 202L550 420 M423 390L550 447 M894 416L1054 190 M894 425L1054 310 M894 440L1054 423 M894 450L1054 538" color="#a68951" width={4}/>
   {industries.map(([name,kind],i)=><B key={name} x={1056} y={145+i*111} w={376} h={85} style={{borderRadius:6,border:'1px solid #9e814760',background:'#22211d'}}>
    <B x={13} y={7} w={211} h={68} style={{display:'grid',placeItems:'center',background:'#dddcd4',color:i===3?'#7b5b0c':'#143b63',fontFamily:F.body,fontWeight:900,fontSize:i===0?31:35}}>{name}</B>
    <T x={240} y={17} size={39} face="body" weight={900}>{kind}</T>
   </B>)}
   <DeepSeekPlaque y={370} opacity={1}/>
   <T x={4} y={645} size={37} color={GOLD}>互联网<br/>与投资机构</T>
   {([['腾讯','Tencent',126],['网易','NetEase',142]] as const).map(([name,word,at],i)=>f>=at&&<B key={name} x={0} y={0} w={W} h={H} style={{opacity:enter(f,at-1,at+6)}}>
    <Stroke d={`M720 482L${365+i*292} 618`} color="#a68951" width={4}/>
    <Panel x={239+i*292} y={618} w={252} h={123} r={5} style={{background:'#29251d',border:'2px solid #a689516b'}}><T x={22} y={10} w={206} align="center" size={35} face="body" weight={900} color={i===0?'#19416d':'#722923'} style={{background:'#dddcd4',padding:'4px 0'}}>{word}</T><T x={14} y={70} w={224} align="center" size={30} face="body">{name}</T></Panel>
   </B>)}
   <T x={4} y={774} size={15} face="body" color="#aaa08f">原片图解复述 · 非实时披露</T>
  </B>
 </div>;
}
const words=[['全',81],['是',83],['A',87],['I',89],['剪',93],['的',94]] as const;
// Early routes only [78,168) here. Later carried-in snapshots retain the previous appearance.
export function OpeningRepair({f}:{f:number}){
 return <>
  {f<108?<TimelineTail f={f}/>:<GroupedDiagram f={f}/>}
  {f>=81&&<B x={115} y={247} w={1210} h={235} style={{textAlign:'center',whiteSpace:'nowrap',fontFamily:F.display,fontSize:122,letterSpacing:1,filter:'drop-shadow(0 5px 10px #0007)'}}>
   {words.map(([a,at])=><span key={a} data-ft-hook-word={f>=at?a:undefined} style={{display:'inline-block',verticalAlign:'middle',transform:`translateY(${mix(-54,0,enter(f,at,at+8))}px)`,margin:a==='A'?'0 0 0 20px':a==='I'?'0 20px 0 0':'0',opacity:f>=at?1:0,color:a==='A'||a==='I'?L:'#fff'}}>{a}</span>)}
  </B>}
  {f>=115&&<div data-ft-hook-subhead="true" style={{position:'absolute',inset:0}}><In f={f} at={114} d={9} dy={15}><T x={0} y={444} w={W} align="center" size={49}>看完这期， <Mark dark>你也能会</Mark></T></In></div>}
 </>;
}
