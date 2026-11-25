import React from 'react';
import {AbsoluteFill, Composition, useCurrentFrame, useDelayRender} from 'remotion';
import timeline from './timeline.json';
import './type.css';
import {Brand,BrandMode} from './Brand';
import {B,DARK,F,H,INK,W,ratio,rect} from './core';
import {Early} from './early';
import {Middle,irisRadius} from './middle';
import {Late} from './late';

const chapterNums={'画面':'01','图表':'02','组件':'03','审美':'04'} as const;
const fontProbes = [
 ['400 44px "system-ui"','财经字体0123456789Demo'],
 ['500 27px "system-ui"','画面图表组件审美'],
 ['900 27px "system-ui"','实拍来源纪录'],
 ['400 35px "system-ui"','字幕，AI剪的'],
 ['600 25px "monospace"','const Frame24.2'],
] as const;
let fontsLoaded:Promise<void>|undefined;
function useTypography(){}
function ChapterInk({id,y=0,squash=1,phase}:{id:string;y?:number;squash?:number;phase?:number}){
 if(id==='none')return null;
 const num=chapterNums[id as keyof typeof chapterNums]??'';
 return <div data-ft-chapter={id} data-ft-chapter-04-phase={phase} style={{...rect(0,y,370,71),display:'flex',gap:8,alignItems:'center',whiteSpace:'nowrap',fontFamily:F.display,color:'#fff',...(squash===1?{}:{transform:`scaleY(${squash})`,transformOrigin:'50% 50%'})}}>
   {num.split('').map((digit,i)=><span key={i} style={{display:'grid',placeItems:'center',background:'#242428',borderRadius:8,width:47,height:71,fontSize:64,lineHeight:1}}>{digit}</span>)}
   <span style={{color:'#fff',fontSize:45,marginLeft:12}}>{id}</span>
 </div>;
}
function Subtitle({text}:{text:string|null}){return null;}
function Picture({frame}:{frame:number}){
 const shot=timeline.shots.find(row=>row.start<=frame && frame<row.end);
 if(!shot)throw new RangeError(`Outside FT1002 picture clock: ${frame}`);
 const Stage=frame<1819?Early:frame<3172?Middle:Late;
 const iris=timeline.events.find(row=>row.id==='contact-iris' && row.start<=frame && frame<row.end);
 const radius:number=iris?irisRadius(frame,iris.start):1800;
 return <div data-ft-shot={shot.id} style={{position:'absolute',inset:0}}>
  {iris?<div data-ft-iris={radius} style={{position:'absolute',inset:0,background:DARK,clipPath:`circle(${radius}px at 720px 405px)`}}><Stage id={shot.id} f={frame} start={shot.start} end={shot.end}/></div>:<Stage id={shot.id} f={frame} start={shot.start} end={shot.end}/>}
 </div>;
}
export function Film(){
 useTypography();
 const frame=useCurrentFrame();
 const chapter=timeline.chapters.find(row=>row.start<=frame && frame<row.end);
 const brand=timeline.brand.find(row=>row.start<=frame && frame<row.end);
 const caption=timeline.captions.find(row=>row.start<=frame && frame<row.end);
 const white=timeline.whitePageWindows.find(row=>row.start<=frame && frame<row.end);
 const roll=timeline.events.find(row=>row.id==='chapter-roll' && row.start<=frame && frame<row.end);
 const iris=timeline.events.find(row=>row.id==='contact-iris' && row.start<=frame && frame<row.end);
 const rim=frame>=909 && frame<916;
 const bg=white||rim||iris?'#fff':DARK;
 const chapter04=frame>=2612&&frame<2620;
 const y=chapter04&&frame>=2615?[50,38,27,16,7][frame-2615]:roll?71*(1-ratio(frame,roll.start-1,roll.end)):0;
 const oldSquash=chapter04&&frame<2615?[.86,.47,.13][frame-2612]:1;
 const chapterRadius:number=iris?irisRadius(frame,iris.start):1800;
 return <AbsoluteFill className="ft1002" style={{background:bg,color:white?INK:'#fff',overflow:'hidden'}}>
  <div style={{position:'absolute',left:0,top:0,width:W,height:H,transformOrigin:'top left',transform:'scale(1.3333333333333333)'}}>
   <Picture frame={frame}/>
   <B x={72} y={43} w={375} h={71} style={{clipPath:`circle(${chapterRadius}px at 648px 362px)`,overflow:'hidden',zIndex:85}}>
    <ChapterInk id={chapter?.id??'none'} y={y} squash={oldSquash} phase={chapter04?frame:undefined}/>
    {roll?.outgoing&&<ChapterInk id={roll.outgoing} y={chapter04?[-56,-61,-64,-67,-69][frame-2615]:y-71}/>}
   </B>
   <Brand mode={(brand?.mode??'none') as BrandMode}/>
   <Subtitle text={caption?.text??null}/>
  </div>
 </AbsoluteFill>;
}
export const Root=()=> <Composition id="FT1002" component={Film} width={1920} height={1080} fps={timeline.fps} durationInFrames={timeline.totalFrames}/>;

