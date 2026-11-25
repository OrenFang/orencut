import React from 'react';
import {AbsoluteFill} from 'remotion';
import {captionAt,brandAt,shotAt,timeline} from './clock';
import type {Chapter} from './clock';
import {Background,ease,linear} from './layers';
import {Early} from './early';
import {Middle} from './middle';
import {Late} from './late';

const warm=new Set(['profit','teardown','chapters','part2','lossA','lossB','lossC','funding','safe','matrix','part4','coffee']);
const clear:Record<string,number>={opening:.87,ipo:.87,paradox:.81,teardown:.87,part2:.67,part3a:.81,part3b:.85,outro:.82};
const wash:Record<string,number>={filing:.54,profit:.54,ranking:.56,demo:.74,part1:.84,ownership:.61,control:.49,lossA:.57,lossB:.57,lossC:.57};
const blurSettings:Record<string,number>={opening:.8,ipo:1.1,paradox:1.5,teardown:.85,lost:7,lossA:9,lossB:9,lossC:9,part1:7,part2:14,part3a:1,part3b:1,outro:.8,quarters:9};
const overlaps:Record<string,{prior:string;first:number;end:number}>={
 revenue:{prior:'part1',first:1173,end:1176},lossA:{prior:'part2',first:2567,end:2572},ownership:{prior:'part4',first:6022,end:6026},
};
const tailWash:Record<string,number>={chapters:11,demo:8,lossA:9,margin:9,claim:5,contracts:7,when:6,compute:8,control:7,summary:8,watch:7};
function Caption({frame}:{frame:number}){return null;}
function Brand({frame}:{frame:number}){return null;}
function VisualScene({cut,frame}:{cut:Chapter;frame:number}){
 const t=(frame-cut.start)/timeline.fps, id=cut.id;
 const opacity=id==='opening'?linear(frame,0,13)
  :id==='outro'&&frame>=7778&&frame<7783?[.97,.875,.742,.58,.42][frame-7778]
  :id==='quoteA'&&frame>=4058&&frame<4064?[.91,.79,.64,.48,.32,.15][frame-4058]:1;
 const tail=tailWash[id]; const artAlpha=tail?1-.69*linear(frame,cut.end-tail,cut.end):1;
 const mode=warm.has(id)?'warm':'cool';
 const bg=id==='ipo'&&frame>=49?(frame<93?'tower':'listing'):id==='part3b'&&frame>=4412?'campus':cut.bg;
 const Stage=cut.stage==='early'?Early:cut.stage==='middle'?Middle:Late;
 return <AbsoluteFill style={{opacity}}>
  <Background id={bg} t={t} visibility={clear[id]??wash[id]??.58} blur={blurSettings[id]??11} animate tone={mode}/>
  {id==='quarters'&&frame>=3928&&frame<3934&&<AbsoluteFill style={{background:'#020203',opacity:[.12,.25,.39,.53,.66,.79][frame-3928],pointerEvents:'none'}}/>}
  <AbsoluteFill style={{opacity:artAlpha}}><Stage id={id} t={t} frame={frame}/></AbsoluteFill>
 </AbsoluteFill>;
}
export function EpisodeFrame({frame}:{frame:number}){
 const current=shotAt(frame); const prior=overlaps[current.id];
 return <AbsoluteFill style={{background:'#020203',overflow:'hidden'}}>
  <div style={{width:1200,height:675,transform:'scale(1.6)',transformOrigin:'top left',position:'absolute',overflow:'hidden',isolation:'isolate'}}>
   <div data-scene={current.id} style={{position:'absolute',inset:0}}><VisualScene cut={current} frame={frame}/></div>
   {prior&&frame>=prior.first&&frame<prior.end&&<div data-overlap={prior.prior} style={{position:'absolute',inset:0,opacity:1-linear(frame,prior.first-1,prior.end),pointerEvents:'none'}}><VisualScene cut={shotAt(prior.first-1)} frame={prior.first-1}/></div>}
   <Brand frame={frame}/><Caption frame={frame}/>
  </div>
 </AbsoluteFill>;
}

export { VisualScene };
