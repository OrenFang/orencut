import React from 'react';
import {AbsoluteFill,OffthreadVideo,Sequence,staticFile} from 'remotion';
import {Backdrop,Check,Chip,ImageBarrier,Media,Mono,Note,Num,P,Text,at,font,thumb,wall} from './primitives';
import {cue,ease,inCue,lerp,phase,sampled,st} from './timing';
import type {Chapter} from './timing';

type Props={f:number;c:Chapter};
const fill='#fff';

type WallArt = 'pink'|'summary'|'steps'|'gold'|'index'|'portraits'|'avatar'|'stat'|'road'|'phones'|'phonesDetail'|'workspace'|'quote'|'code'|'api'|'dark'|'audio';
type WallTile = readonly [left:number, width:number, art:WallArt];
const wallRows = [
  {x:241,y:20,h:124, tiles:[[-710,242,'pink'],[-455,227,'summary'],[-215,207,'steps'],[0,246,'gold'],[258,246,'index'],[520,248,'dark']]},
  {x:337,y:139,h:143, tiles:[[-627,295,'dark'],[-314,301,'avatar'],[0,269,'portraits'],[282,254,'stat'],[549,277,'api'],[840,272,'workspace']]},
  {x:-21,y:370,h:145, tiles:[[-632,290,'summary'],[-329,312,'road'],[0,293,'phones'],[307,302,'workspace'],[623,263,'audio'],[899,282,'dark']]},
  {x:403,y:475,h:150, tiles:[[-643,298,'avatar'],[-332,320,'summary'],[0,306,'quote'],[320,231,'code'],[566,306,'phonesDetail'],[886,280,'api']]},
] as const satisfies readonly {x:number;y:number;h:number;tiles:readonly WallTile[]}[];

const wallTracks = [
  [[0,0,0],[30,88,12],[73,171,5],[110,240,-2],[151,302,-17],[190,376,-31],[225,442,-44],[283,552,-65]],
  [[0,0,0],[30,-37,7],[73,-126,28],[110,-211,52],[151,-294,86],[190,-374,107],[225,-441,130],[283,-551,154]],
  [[0,0,0],[30,106,-22],[73,224,-48],[110,310,-72],[151,397,-99],[190,481,-120],[225,558,-138],[283,664,-164]],
  [[0,0,0],[30,-42,-3],[73,-137,1],[110,-219,13],[151,-311,25],[190,-393,40],[225,-466,56],[283,-577,76]],
] as const;

function wallPosition(f:number,index:number) {
  const track=wallTracks[index];
  const next=track.findIndex(point=>point[0]>=f);
  if(next<=0) return track[next===0?0:track.length-1].slice(1) as readonly number[];
  const [start,x,y]=track[next-1], [end,nextX,nextY]=track[next];
  const p=(f-start)/(end-start);
  return [lerp(x,nextX,p),lerp(y,nextY,p)];
}

const cardMark=<span style={{...at(0,5),right:9,textAlign:'right',fontSize:8,letterSpacing:'.035em',fontWeight:900,color:'#4f3d92'}}>FredTalk AI</span>;
const lines=(count:number,color='#b8b3c0')=>Array.from({length:count},(_,i)=><div key={i} style={{height:3,width:`${[72,91,62,85,49,78,60][i%7]}%`,borderRadius:2,background:color,opacity:[.61,.43,.69][i%3]}}/>);

function PhoneFaces({detailed=false}:{detailed?:boolean}) {
  return <div style={{position:'absolute',inset:'11px 14px 9px',display:'flex',gap:detailed?9:13,justifyContent:'center'}}>
    {(detailed?[0,1,2,3]:[0,1,2]).map(i=><div key={i} style={{
      position:'relative',width:detailed?54:64,marginTop:i===0?5:0,borderRadius:8,border:'1.6px solid #28262c',
      background:detailed?'#f7f6f8':'linear-gradient(145deg,#f7f3fd,#e0d8f0)',boxShadow:'2px 5px 7px #0005',overflow:'hidden'
    }}>
      <div style={{position:'absolute',left:'50%',top:4,width:18,height:3,transform:'translateX(-50%)',background:'#27252b',borderRadius:3}}/>
      {detailed?<><div style={{margin:'13px 5px 6px',height:24,background:i===0?'#292431':i===2?'#464380':'#ded7e8',borderRadius:3}}/><div style={{margin:'0 5px',display:'grid',gap:4}}>{lines(8,'#776f86')}</div></>
      :<><div style={{margin:i%2?'25px auto 7px':'17px auto 7px',width:31,height:i===2?14:31,borderRadius:i===2?3:'50%',background:'#c8b6e8'}}/>
        <div style={{margin:'auto',width:i===1?26:46,height:i===2?27:7,borderRadius:3,background:i===1?'#9879cb':'linear-gradient(90deg,#ad94d3,#d8cbea)'}}/></>}
    </div>)}
  </div>;
}

function WallFace({art}:{art:WallArt}) {
  if(art==='steps') return <div style={{position:'absolute',inset:'14px 12px',display:'flex',gap:8}}>
    {['录音\n内容','记录\n整理','记忆\n检索'].map(label=><div key={label} style={{flex:1,display:'grid',placeItems:'center',background:'linear-gradient(155deg,#151518,#060609)',boxShadow:'0 3px 6px #0003',borderRadius:8,color:'#f3f2f5',fontSize:14,fontWeight:900,lineHeight:1.1,textAlign:'center',whiteSpace:'pre-line'}}>{label}</div>)}
  </div>;
  if(art==='phones'||art==='phonesDetail') return <PhoneFaces detailed={art==='phonesDetail'}/>;
  if(art==='portraits') return <div style={{position:'absolute',inset:'10px 10px',display:'flex',overflow:'hidden',background:'#33373b',borderRadius:5}}>
    {(['portraitVlog','portraitOffice','portraitFood'] as const).map((name,i)=><Media key={name} name={name} x={i*83} y={0} w={84} h={124} r={0} position={i===0?'center 38%':'center 42%'} style={{filter:'saturate(.71) contrast(.94)'}}/>)}
  </div>;
  if(art==='gold') return <>
    <Media name="stage" x={0} y={0} w={250} h={132} r={0} position="center 38%" style={{filter:'sepia(.66) saturate(1.23) brightness(.9)'}}/>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(114deg,#34200f95,transparent 56%,#110d08a3),linear-gradient(2deg,#4b2e0d90,transparent 78%)'}}/>
    <div style={{...at(10,47,58,57),borderRadius:3,background:'linear-gradient(153deg,#9b6625,#46331d 65%,#c29444)',opacity:.66}}/>
    <div style={{...at(73,53,31,36),borderRadius:3,background:'linear-gradient(120deg,#6c4021,#d29852)',opacity:.64}}/>
    <b style={{...at(12,6),color:'#f7d728',fontFamily:font.title,fontSize:25,whiteSpace:'nowrap',textShadow:'1px 2px 2px #080502'}}>黑五出图别慌！</b>
    <b style={{...at(109,82),color:'#ffe33c',fontFamily:font.title,fontSize:22,whiteSpace:'nowrap',textShadow:'1px 2px 2px #080502'}}>全自动搞定</b>
  </>;
  if(art==='summary') return <>
    {cardMark}
    <div style={{position:'absolute',inset:'29px 17px 13px',display:'grid',gridTemplateColumns:'1.2fr 1fr 1fr 1fr',gap:7,alignItems:'stretch'}}>
      <div style={{display:'grid',rowGap:6,paddingTop:12}}>{lines(6,'#7b728a')}</div>
      {['分镜','字幕','图表'].map((label,i)=><div key={label} style={{textAlign:'center',padding:'5px 2px',fontSize:10,borderRadius:4,background:i===1?'#ede7f6':'#f3f2f5',color:'#484251'}}>
        <b style={{display:'block',borderRadius:6,background:i===1?'#242129':'#dcd8e2',color:i===1?'#fff':'#4d4659',padding:2}}>{label}</b>
        <div style={{height:43,paddingTop:7,display:'grid',gap:3,justifyItems:'center'}}>{lines(5,'#746d82')}</div>
      </div>)}
    </div>
  </>;
  if(art==='avatar') return <>
    {cardMark}
    <Media name="portraitOffice" x={26} y={15} w={111} h={133} r={6} position="center 31%" style={{filter:'saturate(.62)'}}/>
    <div style={{...at(168,15,88,104),padding:'8px 6px',background:'#29272f',borderRadius:4,display:'grid',justifyItems:'center',gap:3}}>{lines(15,'#aa83db')}</div>
  </>;
  if(art==='pink') return <>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 75% 10%,#d36edb 0%,#f0b9e8 22%,#efeff5 70%)'}}/>
    {cardMark}
    <div style={{...at(15,67,145),color:'#29232d',fontWeight:900,fontSize:21}}>图像生成与剪辑</div>
    <div style={{...at(17,98,143),display:'grid',gap:6}}>{lines(3,'#786d86')}</div>
  </>;
  if(art==='stat'||art==='index'||art==='quote') return <>
    {art!=='index'&&cardMark}
    <div style={{position:'absolute',inset:'19px 10px',textAlign:'center'}}>
      <b style={{display:'block',fontFamily:font.title,fontSize:art==='stat'?27:31,lineHeight:1.16,color:art==='index'?'#f2f0f3':art==='quote'?'#8970b9':'#1b1922'}}>{art==='stat'?'50,500':art==='index'?'02':'留住每天的声音'}</b>
      <div style={{display:'inline-block',marginTop:13,padding:'5px 12px',borderRadius:10,color:art==='quote'?'#b29acf':'#eeeaf3',background:art==='index'?'transparent':'#29252e',fontWeight:900,fontSize:art==='quote'?16:13}}>{art==='stat'?'免费的 AI 设计工具':art==='index'?'PDF · 一键翻译':'整理会议和想法'}</div>
    </div>
  </>;
  if(art==='road') return <>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(172deg,#34422c,#42523b 45%,#253229 57%,#414247 61%,#535359 69%,#32343b 92%)'}}/>
    <Media name="portraitVlog" x={91} y={8} w={132} h={117} r={0} fit="contain" position="center 45%"
      style={{filter:'saturate(.5) brightness(.66)',maskImage:'linear-gradient(90deg,transparent,#000 23%,#000 77%,transparent)'}}/>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(175deg,#24392354,transparent 55%,#10191370 95%)'}}/>
  </>;
  if(art==='audio') return <>
    {cardMark}
    <Media name="audacity" x={34} y={30} w={196} h={84} r={4} position="center 43%"/>
  </>;
  if(art==='code'||art==='workspace') return <>
    {cardMark}
    <Media name={art==='code'?'studio':'doc'} x={13} y={23} w={art==='code'?147:172} h={93} r={4}/>
    <div style={{...at(175,29,90,81),display:'grid',gap:4,padding:5,background:'#2a2731',borderRadius:4}}>{lines(11,art==='code'?'#9d8eac':'#736987')}</div>
  </>;
  return <Media name={art==='api'?'api':'chip'} x={0} y={0} w={270} h={144} r={0}/>;
}

function FilmWall({f,blur=0}:{f:number;blur?:number}) {
  const transitionBlur=lerp(0,1,st(f,238,19));
  return <>
    <ImageBarrier keys={['stage','portraitVlog','portraitOffice','portraitFood','audacity','studio','doc','api','chip']}/>
    <div aria-hidden="true" style={{...at(0,0,960,540),transform:'scale(2)',transformOrigin:'top left',
      background:'#1d1d1f',filter:`blur(${Math.max(blur,transitionBlur)*7}px)`}}>
      {wallRows.map((row,index)=>{
        const [x,y]=wallPosition(f,index);
        return <div key={row.y} style={{...at(row.x+x,row.y+y),transform:'rotate(-11deg)',transformOrigin:'0 0'}}>
          {row.tiles.map(([left,width,art])=><div key={left} style={{
            ...at(left,0,width,row.h),borderRadius:7,overflow:'hidden',
            background:art==='dark'||art==='index'||art==='code'?'#201e23':art==='quote'?'#e6e0eb':'#f1f0f2',
            boxShadow:'0 2px 4px #07070a38'
          }}><WallFace art={art}/></div>)}
        </div>;
      })}
    </div>
    <AbsoluteFill style={{background:`linear-gradient(180deg,rgba(15,14,18,${.22+blur*.15}),rgba(15,14,18,${.37+blur*.13}) 56%,rgba(15,14,18,${.25+blur*.15}))`}}/>
  </>;
}

const profileRows=[['稿均点赞量','9509.6','+31.36%'],['稿均涨粉量','1013.6','+44.88%'],['稿均分享量','1475.5','+38.43%'],['稿均评论量','198.5','+60.57%']];
function HistoricCard({amount}:{amount:number}){
  return <div style={{...at(1178,196,614,510),background:'#fff',color:P.ink,borderRadius:27,padding:'17px 27px',boxSizing:'border-box',boxShadow:'0 16px 27px #0005',opacity:amount,transform:`translateY(${40*(1-amount)}px) rotate(3.4deg)`}}>
    <div style={{display:'flex',alignItems:'end',justifyContent:'space-between',gap:26}}><div><b style={{fontSize:33}}>FredTalk</b><div style={{color:'#8062c4',fontSize:19}}>原片历史口径｜编辑复排</div></div>{[['粉丝指标','9.4w'],['总获赞量','64.9w'],['总作品数','171']].map(([a,b])=><div key={a}><small style={{display:'block',fontSize:21,color:'#717074'}}>{a}</small><b style={{fontSize:31}}>{b}</b></div>)}</div>
    <div style={{borderTop:'1px solid #efedf1',marginTop:18,padding:'13px 0',fontWeight:900,fontSize:28}}>核心指标 <span style={{float:'right',color:'#666',fontSize:21}}>近30天</span></div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',rowGap:22,paddingTop:9,textAlign:'center'}}>{profileRows.map(([a,b,d])=><div key={a}><div style={{fontSize:20,color:'#78757b'}}>{a}</div><div style={{fontSize:35,lineHeight:1.2}}>{b}</div><div style={{fontSize:18,color:'#a05a65'}}>较上周期 {d}</div></div>)}</div>
  </div>;
}

// The rolling follower count is visible on each source frame from 82 to 109.
const openingGrowthValues=[
  0,1056,6080,10613,14586,17974,20793,23095,24947,26424,27595,28519,29245,29815,
  30260,30606,30873,31077,31232,31348,31432,31492,31534,31561,31578,31587,31592,31593,
];

export function Opening({f}:Props){
  const ask=ease(f,'openingQuestion'), out=ease(f,'openingOut');
  const stats=ease(f,'openingStats'), grow=ease(f,'openingGrowth'), invite=ease(f,'openingInvite');
  const total=cue('openingCount').start, dx=404*(1-st(f,79,17));
  const countFrame=Math.min(openingGrowthValues.length-1,Math.max(0,f-82));
  const plus=openingGrowthValues[countFrame].toLocaleString('en-US');
  const follow=ease(f,'openingFollow');
  const drop=(glyph:string,begin:number,lav=false)=>f<begin?null:<span key={glyph} data-ft-hook-glyph={glyph}
      style={{display:'inline-block',color:lav?P.lav:fill,opacity:1,transform:`translateY(${[-200,-91,-50,-13,0][Math.min(4,f-begin)]}px)`}}>{glyph}</span>;
  return <>
    <FilmWall f={f} blur={Math.max(ask,.55*out)}/>
    {f>=cue('openingTitle').start && out<1 && <div data-ft-opening="outgoing" style={{opacity:1-out}}>
      <div data-ft-opening="head"><Text x={242+dx} y={186} size={57} color="#f4f3ef">{Array.from('这个月，AI 全自动做了').map((g,i)=>{
        const a=st(f,cue('openingTitle').start+i-1,6);
        return a>0&&<span key={i} style={{display:'inline-block',opacity:a,whiteSpace:'pre',transform:`translateY(${10*(1-a)}px)`}}>{g}</span>;
      })}</Text></div>
      {f>=total&&<Text x={93+dx} y={299} size={196} color={fill} display style={{letterSpacing:1}}>{drop('9',total,true)}{drop('0',total+2,true)}{f>=total+6&&<span style={{marginLeft:77}}>{drop('条',total+6)}{drop('视',total+8)}{drop('频',total+10)}</span>}</Text>}
      {stats>0&&<div data-ft-opening="stats"><HistoricCard amount={stats}/></div>}
      {grow>0&&<div data-ft-opening="growth"><Text x={254+dx} y={570} size={130} color={P.lav} display style={{opacity:grow}}><span style={{fontSize:69,color:fill,marginRight:24}}>涨粉</span>+{plus}</Text></div>}
      {follow>0&&<Text x={310} y={744} size={53} color={fill} style={{opacity:follow}}>看完这期，你也可以</Text>}
      {invite>0&&<Chip x={107} y={837} size={44} style={{opacity:invite,transform:`translateY(${19*(1-invite)}px)`,fontFamily:font.title,fontWeight:400,background:'#fff',color:P.ink,padding:'10px 30px',boxShadow:'0 12px 26px #0006'}}>有兴趣的，评论区扣<span style={{color:P.purple}}>FredTalk</span></Chip>}
    </div>}
    {ask>0&&<Text x={0} y={385} w={1920} size={147} color={fill} display style={{textAlign:'center',clipPath:`inset(0 ${100-ask*100}% 0 0)`,opacity:ask}}>什么叫<span style={{color:P.lav}}>全自动</span>剪辑？</Text>}
  </>;
}

const tileKeys=wall.filter(k=>k!=='wideStage');
const miniTile=(i:number,on:boolean,v=1)=> <div key={i} style={{...thumb(tileKeys[(i*7+((i/11)|0)*3)%tileKeys.length]),borderRadius:3,opacity:(on?1:.055)*v}}/>;
export function Quantity({f,c}:Props){
  const fuzzy=ease(f,'qualityCall'), converge=sampled(f,'quantityConverge');
  const a=Math.round(sampled(f,'countOld')), b=Math.round(sampled(f,'countNew'));
  const leftLabel=st(f,cue('countOld').start,8), rightLabel=sampled(f,'quantityNewLabel');
  const check=ease(f,'quantityCheck');
  return <>
  <ImageBarrier keys={tileKeys}/>
  <div style={{willChange:'filter',opacity:lerp(1,.38,fuzzy),filter:`blur(${fuzzy*14}px)`,transform:`scale(${1+fuzzy*.087})`}}>
   <div data-ft-quantity-wall="old" style={{opacity:1-.9*converge}}>
    {leftLabel>0&&<div data-ft-count="old" data-count-value={a}><Text x={170} y={194} size={42} color="#747277" style={{opacity:leftLabel}}>过去 4 个月 <Num color={P.ink} style={{fontSize:116,marginLeft:13}}>{a}</Num> <Num color={P.ink} style={{fontSize:55}}>期</Num></Text></div>}
    {Array.from({length:4},(_,j)=><React.Fragment key={j}>
      <div style={{...at(172+175*j,361,123,395),display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gridTemplateRows:'repeat(10, 1fr)',gap:5}}>{Array.from({length:20},(_,i)=>miniTile(i+20*j,i+20*j<a,Math.max(.3,1-i*.035)))}</div>
      <div style={{...at(172+175*j,772,123,6),background:'#dedde0',borderRadius:10}}/>
    </React.Fragment>)}
   </div>
   <div style={{transform:converge>0?`translate(${-320*converge**1.7}px,${-40*converge}px) scale(${1+.11*converge})`:undefined,transformOrigin:'1010px 361px'}}>
    {rightLabel>0&&<div data-ft-count="new" data-count-value={b}><Text x={1010} y={194} size={42} color={P.purple} style={{opacity:rightLabel}}>最近 1 个月 <Num style={{fontSize:116,marginLeft:15}}>{b}</Num> <Num style={{fontSize:55}}>期</Num></Text></div>}
    <div style={{...at(1010,361,768,395),display:'grid',gridTemplateColumns:'repeat(9, 1fr)',gridTemplateRows:'repeat(10, 1fr)',gap:5}}>{Array.from({length:90},(_,i)=>miniTile(i+80,i<b,Math.max(.24,1-((i/9)|0)*.074)))}</div>
    <div style={{...at(1010,771,768*phase(f,'countNew'),6),background:P.purple,borderRadius:10}}/>
    {b===90&&<Text x={1010} y={805} w={768} size={34} color={P.purple} style={{textAlign:'center'}}>一个月 90 期</Text>}
   </div>
  </div>
  {fuzzy>0&&<Text x={0} y={383} w={1920} size={169} display style={{textAlign:'center'}}>{Array.from('量变堆起质变').map((g,i)=>{
    const a=st(f,cue('qualityCall').start,11,i*3);
    return <span key={i} style={{display:'inline-block',color:i<4?P.ink:P.purple,opacity:a,transform:`translateY(${-26*(1-a)}px)`}}>{g}</span>;
  })}</Text>}
  {check>0&&<div data-ft-quantity="check"><Check x={1500} y={323} size={127} style={{opacity:check,transform:`scale(${.8+check*.2})`}}/></div>}
  <Note x={170} y={877} style={{opacity:st(f,c.start+25,15)*(1-fuzzy)}}>独立样片墙 · 数量为原片口径</Note>
 </>;
}

const comparisonFiles={ep154:staticFile('independent/motion/ep154.mp4'),xg001:staticFile('independent/motion/xg001.mp4')} as const;
function ComparisonExample({name,left}:{name:'ep154'|'xg001';left:number}){
 const mv=cue('compareMotion');
 return <Sequence from={mv.start} durationInFrames={mv.end-mv.start} layout="none"><OffthreadVideo muted src={comparisonFiles[name]} style={{...at(left,201,880,494),objectFit:'cover',borderRadius:24,boxShadow:P.shadow}}/></Sequence>;
}
export function Compare({f,c}:Props){
 const a=ease(f,'compareLeft'), b=ease(f,'compareRight');
 const x=lerp(501,70,ease(f,'compareSlide')), right=lerp(2040,970,b);
 const play=inCue(f,'compareMotion');
 return <>
  {a>0&&<div data-ft-compare="left" data-left={x} style={{opacity:a,transform:`translateY(${22*(1-a)}px)`}}><Chip x={x} y={132}>以前 · 7–8 月的视频</Chip>{play?<ComparisonExample name="ep154" left={x}/>:<Media shadow x={x} y={201} w={880} h={494} r={24} name="doc" position="center 36%"/>}<Note x={x+12} y={649}>{play?'独立样片 · FredTalk 第154期':'独立文档示例 · Typora'}</Note></div>}
  {b>0&&<div data-ft-compare="right" data-left={right} style={{opacity:b}}><Chip x={right} y={132} purple>现在 · AI 全自动</Chip>{play?<ComparisonExample name="xg001" left={right}/>:<Media shadow x={right} y={201} w={880} h={494} r={24} name="finance"/>}<Note x={right+12} y={649}>独立财经样片 xg001 · 非同案实测</Note></div>}
  {['字幕','动画','图表','节奏'].map((name,j)=>{
   const delay=[0,11,31,51][j], t=st(f,cue('compareLabels').start,15,delay), line=st(f,cue('compareLabels').start,13,delay+6);
   return <div key={name} data-ft-compare-label={name} data-highlight={t>0?1:0}><Text x={550+j*222} y={765} size={88} display color={t>0?P.ink:'#e7e7e7'} style={{opacity:.14+.86*t}}>{name}</Text><div style={{...at(551+j*222,849,151*line,8),background:P.purple,borderRadius:5}}/></div>;
  })}
 </>;
}

const cards=['fire','blue','github','chip','pixel','finance','codex','glass','split','steps'] as const;
const center=[560,469], rad=250;
const pt=(d:number,r:number)=>[center[0]+r*Math.sin(d*Math.PI/180),center[1]-r*Math.cos(d*Math.PI/180)];
const arc=(a:number,b:number,r:number)=>`M${pt(a,r).join(' ')} A${r} ${r} 0 0 1 ${pt(b,r).join(' ')}`;
export function Clock({f,c}:Props){
 const ring=phase(f,'clockRing'), slice=ease(f,'clockSlice'), results=ease(f,'clockResult');
 const unlock=cue('clockRing');
 const reject=sampled(f,'clockReject'), rejectCopy=ease(f,'clockRejectCopy')*(1-st(f,1078,8));
 const repeated=st(f,unlock.start-1,12);
 return <>
  <Backdrop kind="city" frame={f-c.start}/>
  <svg width="1920" height="1080" style={at(0,0,1920,1080)}>
   <circle cx={center[0]} cy={center[1]} r={rad} stroke="#fbf7ff32" strokeWidth="42" fill="none"/>
   {reject>0&&<circle data-ft-clock="reject-ring" cx={center[0]} cy={center[1]} r={rad} stroke="#fff" strokeWidth="42" fill="none" style={{opacity:reject}}/>}
   {Array.from({length:8},(_,i)=>{
     const prog=Math.max(0,Math.min(1,ring*8-i)); if(prog===0)return null;
     return <path key={i} d={arc(i*45+1.4,i*45+1.4+42.1*prog,rad)} stroke="#fff" strokeWidth="42" fill="none"/>;
   })}
   {Array.from({length:24},(_,i)=>{
     const a=pt(i*15,213),b=pt(i*15,i%6===0?180:199);
     return <path key={i} d={`M${a.join(' ')} L${b.join(' ')}`} stroke="#fff" opacity={i%6===0?.85:.32} strokeWidth={i%6===0?4:3}/>;
   })}
   <path d={arc(.05,7.5,rad)} stroke={P.lav} strokeWidth="65" fill="none" opacity={slice} />
   <path d="M587 206l15-46h67" stroke={P.lav} strokeWidth="3" fill="none" opacity={slice} />
  </svg>
  <Text x={422} y={396} size={146} color={fill} display>24<span style={{fontFamily:font.body,fontWeight:900,fontSize:57,marginLeft:18}}>小时</span></Text>
  {slice>0&&<div data-ft-clock="slice-label" style={{opacity:slice}}><Text x={680} y={70} size={39} color={P.lav}>我 <Num style={{fontSize:95}}>30</Num> 分钟</Text></div>}
  {rejectCopy>0&&<div data-ft-clock="reject-copy" style={{opacity:rejectCopy}}><Text x={250} y={748} w={620} size={40} color="#cac5c9" style={{textAlign:'center',textDecoration:'line-through',textDecorationColor:'#e05459',textDecorationThickness:4}}>跑一整天才出一期</Text></div>}
  {repeated>0&&<div data-ft-clock="production-copy" style={{opacity:repeated}}><Text x={250} y={748} w={620} size={44} color={fill} style={{textAlign:'center'}}>做完一期，就排下一期</Text></div>}
  {cards.map((key,i)=>{
    const v=st(f,unlock.start,13,i*16);return v>0&&<Media key={key} name={key} x={1060+(i%2)*329} y={110+((i/2)|0)*150+16*(1-v)} w={300} h={137} r={14} style={{opacity:v,boxShadow:'0 12px 20px #0007'}}/>;
  })}
  {results>0&&<Text x={1060} y={886} w={629} color={fill} size={45} style={{textAlign:'center',opacity:results}}>一天 <Num color={P.lav} style={{fontSize:92}}>5–10</Num> 期</Text>}
 </>;
}

function BandText({f,id,title,num}:{f:number;id:string;title:string;num:string}){
 const start=cue(id).start, first=st(f,start,16), resolved=st(f,start,31,.4);
 return <><Text x={0} y={310} w={1920} size={37} color={P.lav} style={{textAlign:'center',opacity:first,fontFamily:font.mono,letterSpacing:2}}>{num}</Text><Text x={0} y={393} w={1920} display size={148} color={fill} style={{textAlign:'center'}}>{Array.from(title).map((s,i)=><span key={i} style={{color:i<title.length*resolved?fill:'#56565a'}}>{i<title.length*resolved?s:'水图组画选配材'[i%7]}</span>)}</Text></>;
}
const bands=[['band01','什么叫全自动剪辑','01'],['band02','一个真实案例','02'],['band03','质量怎么稳住','03'],['band04','适合谁','04']] as const;
export function SectionBand({f}:{f:number}){
 const item=bands.find(([id])=>inCue(f,id)); if(!item)return null;
 const [id,title,num]=item, {start,end}=cue(id);
 let h=1080, alpha=1;
 if(id==='band01') {
   h=sampled(f,'band01Reveal');
 } else if(id==='band03') {
   h=f<cue('band03Reveal').start?1080:sampled(f,'band03Reveal');
 } else if(id==='band02') {
   alpha=1-st(f,cue('newsArticle').start+1,9);
 } else if(id==='band04') h=sampled(f,'band04Reveal');
 return <AbsoluteFill data-ft-band={id} style={{zIndex:10,background:P.black,opacity:alpha,clipPath:`inset(${(1080-h)/2}px 0)`}}><BandText f={f} id={id} title={title} num={num}/>{id==='band02'&&<Note x={835} y={615} onDark>原片自述 · 情节复排</Note>}</AbsoluteFill>;
}
