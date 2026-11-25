import React from 'react';
import {Backdrop,Badge,Deco,En,F,GOLD,Tag,X,mix,panel,turn} from './kit';
import type {SceneProps} from './index';

// Reused FT14 object model: a separate ladder, three persistent rows of rooms, foundation,
// map camera and editorial overlays. Dense English sublabels fit their measured isolated columns.
const LEVELS=[['聊天','CHATBOTS'],['推理','REASONERS'],['Agent','AGENTS'],['创新','INNOVATORS'],['组织','ORGANIZATIONS']];
const FLOORS=[
 {floor:'3F',title:'平台',sub:'工作室 · 干一类活',en:'PLATFORMS · THE STUDIO',cells:[['视频','VIDEO',''],['设计','DESIGN','◉'],['建站','WEBSITES','◕'],['搜索','SEARCH','◔'],['搭建','BUILD AGENTS','Co/Di'],['聚合','MODEL HUBS','OR/硅']]},
 {floor:'2F',title:'Agent',sub:'手脚 · 负责做',en:'AGENTS · HANDS & FEET',cells:[['编程 · 电脑','CODING · COMPUTER','◎/✺/DS'],['办公','OFFICE','✺/WB'],['浏览器','BROWSER','◌'],['常驻','ALWAYS ON','◆']]},
 {floor:'1F',title:'模型',sub:'大脑 · 负责想',en:'MODELS · THE BRAIN',cells:[['语言','LANGUAGE','◎/✺/DS'],['图片','IMAGE','✦/字'],['视频','VIDEO','字/海'],['声音','AUDIO','豆/♪'],['更多','3D · WORLD · ROB','◕/G'],['编程','CODING','✺/◎']]},
];
const mapIds=['mapCover','levels','mapMarker','mapFloor','mapGround','mapModel','mapModelBack','mapCode','mapAgent','mapAgentApps','mapPlatform','mapWorkflow','mapPlatformApps','mapAll','mapAxis','mapAdvice','mapTips','mapFade'];
export const isMap=(id:string)=>mapIds.includes(id);
const agentRooms=[9944,10096,10264,10395];
const platformRooms=[12428,12472,12522,12597,12650,12723];
const topCues=[722,805,911,1006,1096];
const qCues=[13912,14022,14081];
const ease=(f:number,start:number,d=13)=>turn(f,start,start+d);
const qtext=[['它在哪一层？','WHICH FLOOR?'],['背后是哪个大脑？','WHICH BRAIN?'],['帮我省掉哪一步？','WHICH STEP DOES IT SAVE?']];
const mapOriginY=424*.48;
const ladderBaseline=91;
const closeFloorBaseline=224;
const settledFloorBaseline=125;
const floorPullStart=1752;
// Right ladder edge and shared bottom edge, measured in the source's 960 × 540 space.
const floorPull=[
 [882,224],[881,223],[881,223],[880,222],[879,220],[878,217],[875,214],
 [873,209],[869,204],[865,197],[859,188],[853,179],[846,169],[838,159],
 [832,151],[826,144],[822,139],[818,135],[815,132],[813,129],[812,128],
 [811,127],[810,126],[809,126],[809,125],
] as const;
const levelPush=[
 [562,809,125],[565,811,127],[568,817,135],[571,828,147],[573,841,162],
 [575,856,182],[577,867,199],[579,874,211],[581,878,218],[583,881,222],[585,882,224],
] as const;
function mapCamera(right:number,baseline:number){
 const zoom=1+(right-809)/331;
 const y=baseline-mapOriginY-(ladderBaseline-mapOriginY)*zoom;
 const shade=(baseline-settledFloorBaseline)/(closeFloorBaseline-settledFloorBaseline);
 return {zoom,y,shade};
}
function floorCamera(f:number){
 const index=Math.max(0,Math.min(f-floorPullStart,floorPull.length-1));
 const [right,baseline]=floorPull[index];
 return mapCamera(right,baseline);
}
function levelCamera(f:number){
 const next=levelPush.findIndex(([at])=>f<=at);
 if(next===0)return mapCamera(levelPush[0][1],levelPush[0][2]);
 if(next===-1){
  const [,right,baseline]=levelPush[levelPush.length-1];
  return mapCamera(right,baseline);
 }
 const [start,leftRight,leftBaseline]=levelPush[next-1];
 const [end,right,baseline]=levelPush[next];
 const progress=(f-start)/(end-start);
 return mapCamera(mix(leftRight,right,progress),mix(leftBaseline,baseline,progress));
}
function measure(id:string,f:number){
 const level=id==='levels', intro=id==='mapCover', floors=id==='mapMarker'||id==='mapFloor';
 const ideas=id==='mapTips'||id==='mapFade', outro=id==='mapFade';
 const axis=id==='mapAxis'||id==='mapAdvice';
 const arrive=ideas?ease(f,14258,20):0;
 const camera=level?levelCamera(f):floorCamera(f);
 const lang=id==='mapGround'||id==='mapModel'?ease(f,2429,30):0;
 const zoomModels=id==='mapCode'?1-.12*ease(f,8405,20):id==='mapAgent'?.88+.1*ease(f,8515,15):0;
 const z=level||floors?camera.zoom:lang?mix(1,1.16,lang):id==='mapModelBack'?1.16:zoomModels?1.10*zoomModels:id==='mapAgentApps'?1.12:id==='mapPlatform'?.99+.07*ease(f,11434,20):id==='mapPlatformApps'?1.16:ideas?.99+.19*arrive:axis?.98:1;
 const x=ideas?mix(124,151,arrive):axis?149:151;
 const y=level||floors?camera.y:lang?mix(37,-11,lang):id==='mapModelBack'?-52:id==='mapCode'?15+39*ease(f,8405,20):id==='mapAgent'?55-21*ease(f,8515,15):id==='mapAgentApps'?-8:id==='mapPlatformApps'?71:ideas?mix(33,113,arrive):37;
 const isCloseup=id==='mapPlatformApps';
 return {level,intro,floors,ideas,outro,axis,z,x,y,isCloseup,cameraShade:camera.shade};
}
function rowLens(id:string,f:number,row:number){
 const focus=(i:number)=>i===row;
 let light=0;
 if(id==='mapCover')return {v:mix(.45,.95,ease(f,[329,325,321][row],12)),hi:0};
 if(id==='levels')return {v:.41,hi:0};
 if(id==='mapMarker'||id==='mapFloor'){
  const a=[2014,1920,1828][row], next=[2183,2014,1920][row];
  light=ease(f,a)*(1-ease(f,next));const base=.42+.37*ease(f,2172,16);return {v:mix(base,1,light),hi:light};
 }
 if(['mapGround','mapModel'].includes(id)){light=focus(2)?ease(f,2452):0;return {v:mix(.57,1,light),hi:light};}
 if(id==='mapModelBack'||id==='mapWorkflow')return {v:focus(2)?1:.48,hi:Number(focus(2))};
 if(id==='mapCode'||id==='mapAgent'){const p=ease(f,8514);light=focus(2)?1-p:focus(1)?p:0;return {v:mix(.49,1,light),hi:light};}
 if(id==='mapAgentApps')return {v:focus(1)?1:focus(2)?.72:.44,hi:Number(focus(1))};
 if(id==='mapPlatform'||id==='mapPlatformApps'){light=focus(0)?id==='mapPlatform'?ease(f,11424,16):1:0;return {v:mix(.54,1,light),hi:light};}
 if(id==='mapAxis'||id==='mapAdvice'){
  if(f<13236)return {v:1,hi:0};
  const a=ease(f,13236)*(1-ease(f,13336)),b=ease(f,13336)*(1-ease(f,13419)),c=ease(f,13419)*(1-ease(f,13528)),d=ease(f,13561)*(1-ease(f,13714)),e=ease(f,13714);
  light=[Math.max(a,d),Math.max(c,e),b][row];
  let neutral=1-ease(f,13236)+ease(f,13528)*(1-ease(f,13561));return {v:mix(.50,1,Math.min(1,light+neutral)),hi:light};
 }
 if(id==='mapTips'){light=focus(2)?ease(f,14022)*(1-ease(f,14080)):0;return {v:row===2?1:1-.49*ease(f,14022)*(1-ease(f,14080)),hi:light};}
 return {v:1,hi:0};
}
function room(id:string,f:number,row:number,col:number){
 if(['mapCover','levels','mapMarker','mapFloor'].includes(id))return {hot:0,icon:0};
 if(['mapGround','mapModel'].includes(id)){const hot=row===2&&col===0?ease(f,2481):0;return {hot,icon:row===2&&col===0?ease(f,2483):0};}
 if(id==='mapModelBack'){const cues=[4914,4974,4991,5018];const hot=row===2&&col<4?col?ease(f,cues[col]):1:0;return {hot,icon:row===2&&col<4?col?ease(f,cues[col]+4,9):1:0};}
 if(id==='mapCode'||id==='mapAgent')return {hot:Number(row===2),icon:Number(row===2)};
 if(id==='mapAgentApps')return {hot:row===1?ease(f,agentRooms[col]):0,icon:row===2?1:row===1?ease(f,agentRooms[col]+6):0};
 if(id==='mapPlatform')return {hot:row===0&&col===0?ease(f,11489):0,icon:Number(row>0)};
 if(id==='mapPlatformApps')return {hot:row===0?ease(f,platformRooms[col]):0,icon:row>0?1:col===0?0:ease(f,platformRooms[col]+6)};
 return {hot:1,icon:row===0&&col===0?0:1};
}
function InMapChip({title,en,f,at}:{title:string;en:string;f:number;at:number}){const p=ease(f,at);return <X x={16} y={9} w={247} h={42} style={{...panel(false,true),padding:'5px 10px',opacity:p,transform:`translateY(${7*(1-p)}px)`}}><F size={15}>{title}</F><En size={8} style={{marginTop:1}}>{en}</En></X>}
const levelInk:React.CSSProperties={display:'inline-block',transform:'skewX(-11deg) scaleY(.84)',transformOrigin:'left center',fontStyle:'normal',lineHeight:.94,letterSpacing:'.07em'};
const chipReveal=[.38,.84,.96,1];
function LevelSourceChip({f}:{f:number}){
 if(f<607)return null;
 const opacity=chipReveal[Math.min(f-607,chipReveal.length-1)];
 return <X x={15} y={7} w={281} h={43} style={{border:'1px solid #554433',borderRadius:7,background:'linear-gradient(165deg,#17191c,#0b0e13)',padding:'5px 12px',opacity,whiteSpace:'nowrap'}}>
  <F size={15.5} style={{...levelInk,letterSpacing:'.15em'}}>OpenAI　·　AI 的五个等级</F>
  <En size={7.7} color="#8c929b" style={{letterSpacing:'.23em',marginTop:2}}>BLOOMBERG · JULY 2024</En>
 </X>;
}
function levelTile(active:boolean,halo:number):React.CSSProperties{
 return {
  background:active?'linear-gradient(160deg,#3e465a,#252c3d)':'linear-gradient(155deg,#1c222c,#111722)',
  borderColor:active?'#747d96':'#363c49',
  boxShadow:halo>0?`0 0 ${13*halo}px #a3afd367,inset 0 0 0 1px #dde7ff21`:'inset 0 0 0 1px #dde7ff12',
 };
}
const markerRise=[45,38.5,17.2,10.6,6.6,4.1,2.5,1.6,.8,0];
const mapArrivalOpacity=[.10,.40,.62,.80,.88,.93,.96,.98,.99,1];
const mapArrivalBlur=[9,6,5,3.2,2.2,1.2,.4,0];
function FloorMarker({f,cardTop,zoom}:{f:number;cardTop:number;zoom:number}){
 const age=f-1596;
 if(age<0)return null;
 const offset=markerRise[Math.min(age,markerRise.length-1)];
 const y=Math.max(-48,(2-cardTop)/zoom)+offset;
 return <X x={58} y={y} w={72} h={-y} style={{overflow:'hidden',opacity:age===0?.42:1,pointerEvents:'none'}}>
  <X x={0} y={0} w={1.3} h={-y} style={{background:'#e2b458',boxShadow:'0 0 4px #ebbd63a6'}}/>
  <X w={71} h={25} style={{display:'grid',placeItems:'center',borderRadius:'0 4px 4px 0',background:'linear-gradient(160deg,#f5d99a,#dcad57)',color:'#201705'}}><F size={13} color="#201705" style={{...levelInk,textShadow:'none'}}>我们在这</F></X>
 </X>;
}
export function MapScene({shot,f,local}:SceneProps){
 const id=shot.id, m=measure(id,f),isInitial=['mapCover','levels','mapGround','mapModelBack','mapCode','mapAgentApps','mapPlatform','mapWorkflow','mapPlatformApps','mapAll'].includes(id);
 const showP=id==='mapMarker'?mapArrivalOpacity[Math.min(local,mapArrivalOpacity.length-1)]:isInitial?ease(f,shot.start-1,15):1;
 const blur=id==='mapMarker'?mapArrivalBlur[Math.min(local,mapArrivalBlur.length-1)]:(1-showP)*5;
 const earlyF=['mapCover','mapFloor','mapMarker'].includes(id);const foundation=earlyF?mix(.35,1,ease(f,id==='mapCover'?321:2183,16)):m.level?.29:1;
 const l4=m.outro?ease(f,14346,12):0;const qExit=1-ease(f,14257,13);
 const mapType=m.level||m.floors;
 const zoom=mapType?m.z:m.z*mix(.97,1,showP), top=m.y;
 return <>{m.level||m.floors?<X w={960} h={540} style={{filter:'brightness(.58)'}}><Backdrop t={f/30}/></X>:<Backdrop t={f/30}/>} {m.intro&&<InMapChip title="一张地图 · 一共三层" en="ONE MAP · THREE FLOORS" at={238} f={f}/>} {m.level&&<LevelSourceChip f={f}/>} {id==='mapWorkflow'&&<InMapChip title="一楼的模型 · 在这里全用上了" en="MODELS AT WORK · MANY UNDER ONE ROOF" f={f} at={12160}/>}
 <X x={m.x} y={top} w={658} h={424} style={{transformOrigin:'50% 48%',transform:`scale(${zoom})`,opacity:showP,filter:`blur(${blur}px)`}}>
 {LEVELS.map(([a,b],i)=>{const at=topCues[i],hot=m.level?(f>=at?1:0):m.intro?.36:m.floors||m.ideas?1:.87;const h=m.level?53+11*i+(i===4?1:0):55+10*i;const halo=ease(f,at-3,3)*(1-ease(f,at+2,10));return <X key={a} x={134*i} y={91-h} w={124} h={h} style={{...panel(hot>.43),borderStyle:l4>.2&&i===3?'dashed':'solid',borderColor:l4>.2&&i===3?'#d0aa59':undefined,opacity:.46+.54*hot,boxShadow:panel().boxShadow,...(m.level?levelTile(hot>0,halo):m.floors?levelTile(true,0):undefined)}}>
 <X x={10} y={h-(mapType?39:43)} w={104} style={{whiteSpace:'nowrap'}}><F size={17.6} style={mapType?levelInk:undefined}>{a}</F><En size={7.8} style={{marginTop:1}}>{b}</En></X><X x={88} y={6} w={25} style={{textAlign:'right'}}><F size={13} color={GOLD} style={mapType?levelInk:undefined}>L{i+1}</F></X>
 {i===2&&m.floors&&<FloorMarker f={f} cardTop={top+mapOriginY+(ladderBaseline-h-mapOriginY)*zoom} zoom={zoom}/>}
 {i===2&&m.ideas&&<X x={49} y={-28} style={{opacity:ease(f,13819),whiteSpace:'nowrap'}}><Tag>我们在这</Tag><X x={9} y={22} h={14} style={{borderLeft:`1px solid ${GOLD}`}}/></X>}
 {i===3&&l4>0&&<X x={9} y={6} style={{opacity:l4}}><F size={10} color={GOLD}>下一步 →</F></X>}
 </X>})}
 <X x={297} y={91}><Deco/></X>
 <X x={7} y={99} w={644} h={317} style={{...panel(false),background:mapType?'#11151dd9':'#111827e6',borderRadius:12}}>
 {FLOORS.map((r,i)=>{const {v,hi}=rowLens(id,f,i),cw=(468-(r.cells.length-1)*5)/r.cells.length;return <X key={r.floor} x={6} y={8+i*89} w={630} h={84} style={{...panel(hi>.40,hi>.42),background:mapType&&hi<=.42?'linear-gradient(135deg,#2b3038,#1c2029)':hi>.42?'linear-gradient(127deg,#303b52,#242c3f)':'linear-gradient(100deg,#252e3f,#1b2330)',opacity:v}}>
 <X x={11} y={12} w={136}><F size={m.level?21.5:23} style={mapType?levelInk:undefined}><span style={{color:GOLD}}>{r.floor}</span> {r.title}</F><div style={{font:'900 11.9px Mi,sans-serif',color:'#e1e8f5',marginTop:3,whiteSpace:'nowrap',...(mapType?levelInk:undefined)}}>{r.sub}</div><En size={7.4} style={{letterSpacing:'.09em'}}>{r.en}</En></X>
 {r.cells.map(([name,en,icons],col)=>{const active=room(id,f,i,col);return <X key={name} x={149+col*(cw+5)} y={8} w={cw} h={67} style={{...panel(active.hot>.36),borderRadius:6,padding:'5px 5px',overflow:'hidden',background:mapType?'#171b24':active.hot>.36?'linear-gradient(135deg,#465779,#29374f)':'#212b3c',whiteSpace:'nowrap',...(mapType?{border:'1px dashed #444850',boxShadow:'none'}:undefined)}}>
  <F size={name.length>4?12.4:14.5} style={mapType?levelInk:{letterSpacing:'.02em'}}>{name}</F><En size={en==='3D · WORLD · ROB'?6.6:name.length>4?7.1:7.3} style={{letterSpacing:en==='3D · WORLD · ROB'?'.01em':'.065em',transform:en==='3D · WORLD · ROB'?'scaleX(.90)':undefined,transformOrigin:'top left',marginTop:2}}>{en}</En>{icons&&<X x={5} y={39} w={cw-10} style={{display:'flex',gap:2,opacity:active.icon,transform:`translateY(${(1-active.icon)*5}px)`}}>{icons.split('/').map((g,j)=><Badge key={g} text={g} index={(j+col)%7} size={18}/>)}</X>}
 </X>})}</X>})}
 <X x={6} y={278} w={630} h={30} style={{...panel(false,true),padding:'3px 9px',borderRadius:5,opacity:foundation,background:'linear-gradient(98deg,#1a1b13 0%,#102247 63%,#374222 98%)',whiteSpace:'nowrap'}}><F size={16.7} color={GOLD} style={mapType?levelInk:undefined}>地基 · 算力</F><span style={{font:'600 8px Mi,sans-serif',letterSpacing:'.17em',color:'#c9ced8',marginLeft:9}}>GPU · DATA CENTERS · POWER</span></X>
 </X></X>
 {(m.level||(m.floors&&m.cameraShade>0))&&<X y={388} w={960} h={152} style={{background:'linear-gradient(180deg,transparent 0%,#03040866 30%,#020305cf 59%,#020305 100%)',opacity:m.level?mix(.48,1,m.cameraShade):m.cameraShade,pointerEvents:'none'}}/>}
 {(m.isCloseup||m.outro)&&<X y={m.outro?416:430} w={960} h={m.outro?124:110} style={{background:'linear-gradient(0deg,#080a0e 8%,#080a0ee8 35%,#080a0e58 77%,transparent)',pointerEvents:'none',opacity:m.outro?ease(f,14258,18):1}}/>}
 {m.axis&&<X x={31} y={127} w={107} h={275} style={{textAlign:'center',opacity:ease(f,13144)}}><F size={21} color={GOLD}>↑</F><div><F size={13}>越往上越省事</F></div><En size={7.5}>EASIER</En><div style={{margin:'9px auto',width:1,height:148,background:'linear-gradient(#dabe78,#83a4c7)'}}/><F size={21} color="#90b0d4">↓</F><div><F size={13}>越往下越自由</F></div><En size={7.5}>MORE CONTROL</En></X>}
 {id==='mapAdvice'&&<>{f<13714&&<X x={801} y={151} w={140} style={{opacity:ease(f,13562)}}><Tag>新手从这开始</Tag></X>}{f>=13714&&<X x={801} y={237} w={139} style={{opacity:ease(f,13715)}}><Tag>搭自己的流程</Tag></X>}</>}
 {m.ideas&&qtext.map(([txt,en],i)=>{const p=ease(f,qCues[i])*qExit;return p>0?<X key={txt} x={781+(1-p)*12} y={154+i*83} w={164} h={72} style={{...panel(false,i===(f>=14081?2:f>=14022?1:0)),padding:'7px 9px',opacity:p,whiteSpace:'nowrap'}}><F size={13} color={GOLD}>{i+1}</F><div><F size={13.4} style={{letterSpacing:0}}>{txt}</F></div><En size={6.8} style={{letterSpacing:'.06em',marginTop:3}}>{en}</En></X>:null})}
 </>
}
