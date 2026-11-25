import React from 'react';
import {AbsoluteFill, Composition, registerRoot, useCurrentFrame} from 'remotion';
import spec from './timeline.json';
import './fonts.css';
import {MapScene,isMap} from './map';
import {Gallery,Weights,hasGallery,ImageMethods} from './galleries';
import {AudioCards,Bars,Metr,Years} from './graphs';
import {Hubs,Interfaces,Loop,ToolRows} from './systems';
import {Feature} from './feature';
import {X} from './kit';

const timeline=spec;
export type Chapter=(typeof timeline.chapters)[number];
export type SceneProps={shot:Chapter; f:number; local:number};
export const compositionId='FT1009';
// All three consumers read the same declared half-open source clock. All picture layers are silent.
function Chapters(){
 const f=useCurrentFrame();
 const chapter=timeline.chapters.find(c=>c.start<=f&&f<c.end);
 return chapter?<Scene route={chapter.id} shot={chapter} f={f}/>:null;
}
function Brand(){
 const f=useCurrentFrame();
 const brand=timeline.brand.find(c=>c.start<=f&&f<c.end);
 const mode=brand?.mode;
 return mode&&mode!=='none'?<X x={778} y={21} w={162} style={{textAlign:'right',font:'900 25px Rui,Mi,sans-serif',color:mode==='purple'?'#48278d':mode==='dark'?'#171522':'white',WebkitTextStroke:mode==='white-outline'?'0.8px #171319':undefined}}>FredTalk AI</X>:null;
}
function Captions(){
 const f=useCurrentFrame();
 const caption=timeline.captions.find(c=>c.start<=f&&f<c.end);
 // 30fps letter-mask cues, including genuine one-frame blanks. No ASR timing offset.
 return caption?.text?<X x={32} y={459} w={896} h={43} style={{display:'grid',placeItems:'center',whiteSpace:'nowrap',textAlign:'center',color:'#fff',fontFamily:'Caption,Mi,sans-serif',fontSize:28,letterSpacing:'.022em',lineHeight:1,opacity:caption.leadFrames?Math.min(1,(f-caption.start+1)/caption.leadFrames):1,textShadow:'0 2px 2px #000,0 1px 6px #000b'}}>{caption.text}</X>:null;
}
function Scene({route,shot,f}:{route:string;shot:Chapter;f:number}){
 const context={shot,f,local:f-shot.start};
 if(isMap(route))return <MapScene {...context}/>;
 if(hasGallery(route))return <Gallery {...context}/>;
 if(route==='weights')return <Weights {...context}/>;
 if(route==='imageMethods')return <ImageMethods {...context}/>;
 if(route==='predict'||route==='ranking'||route==='agentRank')return <Bars {...context}/>;
 if(route==='audio')return <AudioCards {...context}/>;
 if(route==='codeYears')return <Years {...context}/>;
 if(route==='metr')return <Metr {...context}/>;
 if(route==='loop')return <Loop {...context}/>;
 if(route==='interfaces')return <Interfaces {...context}/>;
 if(route==='misread'||route==='swap')return <ToolRows {...context}/>;
 if(route==='hubs')return <Hubs {...context}/>;
 // Dynamic chapter identity also controls the drawn feature branch; never a timeline-only key.
 return <Feature route={route} {...context}/>;
}
export function Episode(){return <AbsoluteFill style={{background:'#080a0e',overflow:'hidden'}}><X w={960} h={540} style={{transformOrigin:'0 0',transform:'scale(2)',font:'600 14px Mi,sans-serif',color:'#eaf1ff',overflow:'hidden'}}><Chapters/><Brand/><Captions/></X></AbsoluteFill>}
export function Root(){return <Composition id="FT1009" component={Episode} width={1920} height={1080} fps={timeline.fps} durationInFrames={timeline.totalFrames}/>}
