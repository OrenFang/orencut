import React, {useEffect,useState} from 'react';
import {AbsoluteFill, Composition, cancelRender, continueRender, delayRender, useCurrentFrame} from 'remotion';
import {captionAt,progress,smooth,stateAt,whiteAt,type BrandMode} from './clock';
import timeline from './timeline.json';
import {appearing,cornerAt,rankPlan,sceneAt,type Segment} from './story';
import {Backdrop,IVORY} from './visual';
import {Board,EndCard,Flash,Poll,RankIntro,SOURCE_LINE} from './ranking';
import {EarlyScenes} from './scenes-early';
import {LateScenes} from './scenes-late';
import './style.css';


function useLocalFonts(){}
const none={color:'transparent',WebkitTextStroke:'0px transparent'};

function CreatorMark({mode}:{mode:BrandMode}) {return null;}
function Caption({text,f,start}:{text:string|null;f:number;start:number}){return null;}
const foot=(text:string,opacity:number=1)=><div className="medium" style={{position:'absolute',top:1478,left:65,right:65,textAlign:'center',fontSize:21,lineHeight:'27px',color:'#8a8274',opacity}}>{text}</div>;
const chapterFoot=(rank:number,s?:Segment) => {
 const extra=rank===8&&s?.id==='human-blind'?'；16/16 为项目方 README 自述':rank===10?'；画面：OpenAI 公开资料／防御流程示意':rank===9?'；画面：项目官方示例／工具页':rank===6?'；画面：Chrome 官方网页与文档':'；画面：项目官方公开资料';
 return `来源：GitHub Trending 周榜（2026-11-19；增量及总星为原片口径） · ${rankPlan[rank].repo}${extra}`;
};
function CornerTag({f,id,rank}:{f:number;id:string;rank:number}){
 const ev=cornerAt(f,id);
 if(!ev) return null;
 const p=(ev.fade??0)>0?(.22+.78*appearing(f,ev.start!,ev.fade)):1;
 return <div data-layer="chapter-corner" style={{position:'absolute',left:59,top:225,height:46,display:'flex',gap:13,alignItems:'center',whiteSpace:'nowrap',opacity:p,fontSize:31,color:IVORY}}>
   <strong style={{padding:'4px 11px',lineHeight:'35px',borderRadius:2,background:'linear-gradient(115deg,#f2d17c,#daac53)',color:'#17130b'}}>No.{rank}</strong>
   {rankPlan[rank].name}
   <div style={{display:'flex',gap:5,alignItems:'center',marginLeft:2}}>{Array.from({length:10},(_,i)=><span key={i} style={{display:'inline-block',height:7,width:i===rank-1?22:8,background:i<rank?'#e3b95f':'#b2a38e37'}}/>)}</div>
  </div>;
}
function PictureBody({s,f,white}:{s:Segment;f:number;white:boolean}) {
 return s.rank<=5?<EarlyScenes s={s} f={f} white={white}/>:<LateScenes s={s} f={f} white={white}/>;
}
function Chapter({id,f,white}:{id:string;f:number;white:boolean}){
 const rank=Number(id.slice(1)), plan=rankPlan[rank];
 const live=sceneAt(f,rank);
 if(!live) return <>
    <RankIntro rank={rank} f={f}/>
    {f>=plan.land?foot(chapterFoot(rank),appearing(f,plan.land+1,14)*.89):null}
 </>;
 const age=f-live.start;
 // These six witnesses already show the incoming page on the cut, not a fade from empty.
 const hardCut=age<live.enter&&['univer-home','review-readme','review-bench','plan-annotate','plan-inbox','ff-audit'].includes(live.id);
 // Keep the table through f3026. At f5620 hold only the last safe defensive picture.
 const hold=(live.id==='review-metrics'&&age<3)||(live.id==='codex-ci'&&f===5620);
 const body=hold?sceneAt(live.start-1,rank)!:live;
 const bodyFrame=hold?body.end-1:f;
 const overReadme=live.id==='modern-readme';
 const tailOpacity=overReadme?[.88,.62,.34][age]
   :live.id==='univer-matrix'?[.48,.35,.24][age]
   :live.id==='codex-scan'?[.43,.30][age]:undefined;
 const prev=tailOpacity!==undefined||age<live.overlap?sceneAt(live.start-1,rank):undefined;
 const incoming=hold||hardCut?1
   :overReadme&&age<3?[.50,.67,.83][age]
   :live.id==='codex-scan'&&age<2?[.65,.85][age]
   :live.enter?smooth(progress(f,live.start,live.start+live.enter)):prev?progress(f,live.start,live.start+live.overlap):1;
 const tail=prev?<div style={{position:'absolute',inset:0,opacity:tailOpacity??1-incoming}}><PictureBody s={prev} f={prev.end-1} white={!!whiteAt(prev.end-1)}/></div>:null;
 return <>
   <Backdrop tone={body.theme}/>
   {overReadme?null:tail}
   <div data-scene={body.id} style={{position:'absolute',inset:0,opacity:incoming}}><PictureBody s={body} f={bodyFrame} white={hold?!!whiteAt(bodyFrame):white}/></div>
   {overReadme?tail:null}
   <CornerTag f={f} id={id} rank={rank}/>
   {foot(chapterFoot(rank,live),(live.enter?appearing(f,live.start+4,9):1)*.87)}
 </>;
}
function Intro({f}:{f:number}) {
 if(f<60) return <Flash f={f}/>;
 return <><Backdrop tone="warm"/><Backdrop tone="green" opacity={1-smooth(progress(f,64,79))}/><Board f={f} mode="intro"/>{foot(SOURCE_LINE,appearing(f,73,12))}</>;
}
function Recap({f}:{f:number}) {
 return <><Backdrop tone="warm"/>{f>=5746?<Board f={f} mode="recap"/>:null}</>;
}
export function Film(){
 useLocalFonts();
 const f=useCurrentFrame();
 const chapter=timeline.chapters.find(row=>row.start<=f&&f<row.end)!;
 const brand=timeline.brand.find(row=>row.start<=f&&f<row.end)!;
 const caption=timeline.captions.find(row=>row.start<=f&&f<row.end)!;
 const white=whiteAt(f);
 const whitePage=white!==undefined && white.mode===brand.mode;
 return <AbsoluteFill className="ft1010" data-white={whitePage?'white':'no'}>
   {chapter.id==='intro'? <Intro f={f}/> : chapter.id==='recap'? <Recap f={f}/> : chapter.id==='poll'? <Poll f={f}/> : chapter.id==='outro'? <EndCard f={f}/> : <Chapter id={chapter.id} f={f} white={whitePage}/>}
   <CreatorMark mode={brand.mode as BrandMode}/>
   <Caption text={caption.text} start={caption.start} f={f}/>
 </AbsoluteFill>;
}
export {timeline,stateAt};
export const compositionConfig = {id:'FT1010',width:1080,height:1920,fps:timeline.fps,durationInFrames:timeline.totalFrames};
export function Root(){return <Composition id={compositionConfig.id} width={compositionConfig.width} height={compositionConfig.height} fps={compositionConfig.fps} durationInFrames={compositionConfig.durationInFrames} component={Film}/>;}

