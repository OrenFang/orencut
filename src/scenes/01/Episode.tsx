import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Fonts,P,font} from './primitives';
import {timeline,chapterAt,whiteAt,cue,ease,inCue,phase,sampled,st} from './timing';
import {Brand} from './Brand';
import {Captions} from './Captions';
import {Clock,Compare,Opening,Quantity,SectionBand} from './Intro';
import {Assembly,Materials,Publishing,Review,ScriptPage,Tabs,Topic,WavePage} from './Pipeline';
import {Benefits,CaseStudy,TimeCompare} from './CaseStudy';
import {AudienceList,Catalog,Components,Genres,Keys,Labor,OutroTitle,Replay,Rules,SoloAndEditor,Team} from './Later';
import type {Chapter} from './timing';

function BareBand(){return <AbsoluteFill style={{background:P.black}}/>;}
const chapters:Record<string,React.ComponentType<{f:number;c:Chapter}>>={
 opening:Opening,quantity:Quantity,compare:Compare,chapter01:BareBand,clock:Clock,
 topic:Topic,materials:Materials,script:ScriptPage,wave:WavePage,assembly:Assembly,review:Review,publishing:Publishing,timeCompare:TimeCompare,
 chapter02:BareBand,news:CaseStudy,rail:CaseStudy,phone:CaseStudy,benefits:Benefits,chapter03:BareBand,keys:Keys,components:Components,rules:Rules,
 chapter04:BareBand,audienceList:AudienceList,team:Team,labor:Labor,catalog:Catalog,genres:Genres,soloTitle:SoloAndEditor,solo:SoloAndEditor,
 editorTitle:SoloAndEditor,desk:SoloAndEditor,editor:SoloAndEditor,replay:Replay,outro:OutroTitle,
};
export const chapterIds=Object.keys(chapters);
export const SPEC={id:'FT1001',width:1920,height:1080,fps:timeline.fps,durationInFrames:timeline.totalFrames};
const byId = new Map(timeline.chapters.map(c=>[c.id,c]));
const scene = (id:string,f:number) => {
 const Component=chapters[id], c=byId.get(id);
 if(!Component||!c)throw new Error(`Missing native scene for chapter ${id}`);
 return <Component f={f} c={c}/>;
};
const slides=[
 ['topicToMaterials','topic','materials',0,1],['materialsToScript','materials','script',1,2],
 ['scriptToWave','script','wave',2,3],['assemblyToReview','assembly','review',4,4],
 ['reviewToPublish','review','publishing',4,5],
] as const;
function LayeredScene({f,c}:{f:number;c:Chapter}){
 // These chapter routes have no overlapping bridge; dispatch their actual
 // artwork explicitly. Remaining chapter IDs still select the native scenes
 // below, with their original cross-chapter overlay behavior.
 if(c.id==='opening')return <Opening f={f} c={c}/>;
 if(c.id==='quantity')return <Quantity f={f} c={c}/>;
 if(c.id==='compare')return <Compare f={f} c={c}/>;
 if(c.id==='chapter01'&&whiteAt(f))return null; // Stage paper should be visible outside the shrinking band.
 if(c.id==='chapter04'&&sampled(f,'band04Reveal')<1080)return scene('audienceList',f);
 if(inCue(f,'toTopic')){
   const a=sampled(f,'toTopic'), tab=sampled(f,'topicTabs');
   return <><AbsoluteFill>{scene('clock',f)}</AbsoluteFill><AbsoluteFill style={{background:'#fff',opacity:a}}/><AbsoluteFill data-ft-topic-overlay="true" style={{opacity:tab,transform:`translateY(${-32*(1-a)}px)`}}>{scene('topic',f)}</AbsoluteFill></>;
 }
 if(inCue(f,'toTime')){
   const a=phase(f,'toTime');
   return <><AbsoluteFill>{scene('timeCompare',f)}</AbsoluteFill><AbsoluteFill style={{background:'#fff',opacity:(1-a)**2.6}}>{scene('publishing',f)}</AbsoluteFill></>;
 }
 const bridge=slides.find(([id])=>inCue(f,id));
 if(bridge){
   const [id,prev,next,before,after]=bridge, p=phase(f,id), slide=id!=='assemblyToReview', delta=slide?1520:0;
   const mix=p*p*(3-2*p);
   const outgoing=id==='topicToMaterials'?2010:id==='materialsToScript'?1870:delta;
   const switchTab=id==='topicToMaterials'?f>=1499:p>=.49;
   return <>
     <AbsoluteFill style={{clipPath:'inset(180px 0 0 0)',opacity:1-mix,transform:`translateX(${-outgoing*mix}px)`}}>{scene(prev,f)}</AbsoluteFill>
     <AbsoluteFill style={{clipPath:'inset(180px 0 0 0)',opacity:mix,transform:`translateX(${delta*(1-mix)}px)`}}>{scene(next,f)}</AbsoluteFill>
     <Tabs active={switchTab?after:before}/>
   </>;
 }
 if(inCue(f,'teamToLabor')||inCue(f,'laborToCatalog')){
   const a=inCue(f,'teamToLabor'), id=a?'teamToLabor':'laborToCatalog', mix=phase(f,id);
   return <><AbsoluteFill>{scene(a?'team':'labor',f)}</AbsoluteFill><AbsoluteFill style={{opacity:mix}}>{scene(a?'labor':'catalog',f)}</AbsoluteFill></>;
 }
 if(c.id==='replay'&&f>=cue('outroTitle').start){
   return <><OutroTitle f={f}/>{scene('replay',f)}</>;
 }
 return scene(c.id,f);
}
export function Episode(){
 const f=useCurrentFrame();
 const c=chapterAt(f);
 if(!c)throw new Error(`No chapter covers source frame ${f}`);
 const page=whiteAt(f);
 return <AbsoluteFill data-ft-root="FT1001" data-ft-chapter={c.id} data-ft-white={page??'none'} style={{background:page?P.paper:P.black,fontFamily:font.body,fontWeight:500,overflow:'hidden',color:P.ink}}>
   <Fonts/>
   <LayeredScene f={f} c={c}/>
   <SectionBand f={f}/>
   <Brand/>
   <Captions/>
 </AbsoluteFill>;
}
