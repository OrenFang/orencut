import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Arrow,Backdrop,Chip,Media,Mono,Note,Num,P,Surface,Text,at,font} from './primitives';
import type {Key} from './primitives';
import {GraphicCover,WaveGlyph} from './Pipeline';
import {cue,ease,lerp,phase,st} from './timing';
import type {Chapter} from './timing';

type Props={f:number;c:Chapter};
export function TimeCompare({f,c}:Props){
 const a=ease(f,'timeOld'), b=ease(f,'timeNew');
 return <><Backdrop kind="key" frame={f-c.start}/>
  <Text x={216} y={318} size={42} color="#dedcda" style={{opacity:a}}>以前 · 手动做一期</Text>
  <Text x={214} y={395} size={254} display color={b>.2?'#9c9996':'#fff'} style={{opacity:a}}>20<span style={{fontFamily:font.body,fontWeight:900,fontSize:57,marginLeft:20}}>小时</span></Text>
  <div style={{...at(211,501,401*b,9),background:'#e05157',borderRadius:7,opacity:b}}/>
  <Arrow x={875} y={512} w={158} color="#eeedea" style={{opacity:b}}/>
  <Text x={1122} y={318} size={42} color="#dedcda" style={{opacity:b}}>现在 · 我只花</Text>
  <Text x={1116} y={397} size={254} display color={P.lav} style={{opacity:b,transform:`translateY(${22*(1-b)}px)`}}>30<span style={{fontFamily:font.body,fontWeight:900,fontSize:62,color:'#fff',marginLeft:20}}>分钟</span></Text>
  <Text x={214} y={795} size={23} color="#a3a1a4" style={{fontFamily:font.mono,fontWeight:600,opacity:a}}>fred-fu.com / auto-editing · 效率对比</Text>
 </>;
}

const marks=[
 {id:'railResearch',text:'查资料',time:'23:29',asset:'release'},
 {id:'railOriginal',text:'找原片',time:'23:32',asset:'stage'},
 {id:'railWriting',text:'写稿',time:'23:51',asset:'writer'},
 {id:'railWave',text:'配音',time:'00:02',asset:'audacity'},
 {id:'railFinish',text:'剪完',time:'01:23',asset:'fire'},
 {id:'railPost',text:'发布',time:'02:17',asset:'phone'},
] as const;
const markX=(i:number)=>200+304*i;
function Clip({i,x,y}:{i:number;x:number;y:number}){
 const key=marks[i].asset;
 if(i===3) return <Surface x={x} y={y} w={241} h={136} dark style={{borderRadius:13}}><WaveGlyph width={241} height={136} color="#893bf6"/></Surface>;
 if(i===4) return <GraphicCover x={x} y={y} w={241} h={136}/>;
 if(i===2) return <Surface x={x} y={y} w={241} h={136} dark style={{borderRadius:13,background:'#292c2e'}}><Text x={17} y={22} size={19} color="#ddd" style={{fontFamily:font.mono,fontWeight:600,whiteSpace:'pre-line',lineHeight:1.6}}>021_案例_逐字稿<br/>稿_v1.md<br/>v2.md</Text></Surface>;
 return <Media name={key as Key} x={x} y={y} w={241} h={136} position={i===0?'center 10%':undefined} style={{boxShadow:'0 10px 20px #0006'}}/>;
}

export function RailBody({f,limit=5,inset=false}:{f:number;limit?:number;inset?:boolean}){
 const pick=Math.min(limit,marks.reduce((p,o,i)=>f>=cue(o.id).start?i:p,-1));
 const last=pick<0?0:pick, released=pick>=5;
 const active=phase(f,marks[last].id), progress=last===0?200:lerp(markX(last-1),markX(last),active);
 const retire=phase(f,'phoneShrink'), showClock=inset?1:1-retire, begin=1-phase(f,'railResearch');
 const wrap=inset?1:1-retire;
 const endResult=last>=4?st(f,cue('railFinish').start+8,20):0;
 return <>
  <Media name="release" x={120} y={139} w={320} h={148} position="center 9%" style={{opacity:wrap,boxShadow:'0 12px 28px #0008'}}/>
  <Text x={0} y={164} w={1920} size={211} display color="#fff" style={{textAlign:'center',opacity:showClock,fontVariantNumeric:'tabular-nums'}}>{marks[last].time}</Text>
  {/* 164 + 211 × 1.13 = 402.43; leave the clock its complete line box. */}
  {pick<0&&<Text x={0} y={410} w={1920} size={44} color="#fff" style={{textAlign:'center',opacity:begin}}><span style={{color:P.lav}}>☾</span> 发完一段话，我去睡了</Text>}
  <div style={{...at(196,637,1526,5),background:'#444446',borderRadius:10}}/>
  {pick>=0&&<div style={{...at(196,637,Math.max(7,progress-196),6),background:P.lav,borderRadius:10}}/>}
  {marks.map((item,i)=>{
   const a=i<=limit?ease(f,item.id):0, x=markX(i);
   return <React.Fragment key={item.id}>
    <div style={{...at(x-8-a*10,640-8-a*10,16+a*20,16+a*20),background:a>.12?P.lav:'#3c3b3d',borderRadius:100}}/>
    {i===0||a>0?<Text x={x-140} y={680} w={280} size={29} color={i===0?'#8f8d90':P.lav} style={{textAlign:'center',fontFamily:font.mono,fontWeight:600,opacity:i===0?1:a}}>{i===0?'23:29 开工':item.time}</Text>:null}
    {a>0&&<div style={{opacity:a,transform:`translateY(${24*(1-a)}px)`}}><Clip i={i} x={x-120} y={410}/><Text x={x-140} y={556} w={280} size={38} color="#fff" style={{textAlign:'center'}}>{item.text}</Text></div>}
   </React.Fragment>;
  })}
  {endResult>0&&<><svg width="1920" height="1080" style={{...at(0,0,1920,1080),opacity:endResult}}><path d="M200 746v22h1216v-22" fill="none" stroke={P.lav} strokeWidth="5"/></svg><Text x={384} y={800} w={980} size={79} color="#fff" display style={{textAlign:'center',opacity:endResult}}><span style={{fontFamily:font.mono,fontWeight:600,color:'#b3afb4',fontSize:32,marginRight:16}}>1 小时 54 分</span>不到 <span style={{color:P.lav}}>2</span> 小时剪完</Text></>}
  {released&&!inset&&retire===0&&<Note x={1273} y={816} onDark>原片自述时序 · 卡片为独立示例</Note>}
 </>;
}
export function CaseStudy({f,c}:Props){
 const entry=ease(f,'newsArticle'), shrink=ease(f,'newsShrink');
 if(c.id==='news'){
   const ww=lerp(1110,320,shrink),hh=lerp(507,148,shrink), xx=lerp(405,120,shrink),yy=lerp(195,139,shrink);
   return <>
    {entry>0&&<Media name="release" x={xx} y={yy} w={ww} h={hh} r={22} position="center 6%" style={{opacity:entry,boxShadow:'0 18px 35px #0008'}}/>}
    <Note x={xx} y={yy+hh+18} onDark style={{opacity:entry*(1-shrink),fontSize:27}}>NVIDIA 2025 GTC 官方新闻稿 · 独立示例，不是原叙述事件的证据</Note>
   </>;
 }
 const mini=ease(f,'phoneShrink'), phone=ease(f,'phoneAppear'), stats=ease(f,'phoneAnalytics');
 return <>
  <AbsoluteFill style={{transformOrigin:'115px 653px',transform:`translate(${mini*18}px,${mini*53}px) scale(${1-mini*.34})`}}><RailBody f={f}/></AbsoluteFill>
  <Note x={100} y={104} onDark style={{opacity:(1-mini)*.94}}>原片自述｜说明图，不证明发布或新闻事件</Note>
  {phone>0&&<div style={{opacity:phone,transform:`translateX(${40*(1-phone)}px)`}}>
    <Media name="phone" x={1384} y={141} w={435} h={752} r={35} fit="contain" style={{background:'#140c1f',boxShadow:'0 12px 36px #0009'}}/>
    <Chip x={1387} y={918} purple size={23}>独立手机示例 · 非发布记录</Chip>
  </div>}
  {stats>0&&<div style={{opacity:stats,transform:`translateY(${22*(1-stats)}px)`}}><Media name="dash" x={227} y={156} w={639} h={373} shadow/><Note x={232} y={532} onDark>Grafana 官方示例 · 非原片播放量</Note></div>}
 </>;
}

const benefit=[['效率','一期我只花','30','分钟'],['质量','单集播放破','400','万'],['速度','不到','2','小时剪完']];
export function Benefits({f,c}:Props){
 return <><Backdrop kind="city" frame={f-c.start}/>
  {benefit.map(([title,label,num,unit],i)=>{
   const a=ease(f,`benefit${i+1}`), x=160+i*635;
   return <React.Fragment key={title}>
    <Text x={x} y={289} w={360} size={160} display color={`rgba(255,255,255,${.18+.82*a})`} style={{textAlign:'center'}}>{title}</Text>
    <div style={{...at(x,520,360,5),background:'#99969d88',opacity:a}}/>
    <Text x={x} y={565} w={360} size={37} color="#e7e5e5" style={{textAlign:'center',opacity:a}}>{label}</Text>
    <Text x={x} y={622} w={360} size={45} color="#fff" style={{textAlign:'center',opacity:a}}><Num color={P.lav} style={{fontSize:112,marginRight:12}}>{num}</Num>{unit}</Text>
   </React.Fragment>;
  })}
 </>;
}
