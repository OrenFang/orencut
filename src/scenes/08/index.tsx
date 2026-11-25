import React,{useEffect,useState} from 'react';
import {Composition,registerRoot,useCurrentFrame,delayRender,continueRender,cancelRender} from 'remotion';
import {timeline} from './clock';
import {EpisodeFrame} from './visual';
import './fonts.css';

function FontGate(){
 const [handle]=useState(()=>typeof document==='undefined'?null:delayRender('FT1008 local typography'));
 useEffect(()=>{
  if(handle===null)return;
  let settled=false;
  Promise.all([document.fonts.load('32px FredHead','财报 IPO'),document.fonts.load('38px FredSub','中文字幕 亏损'),document.fonts.load('16px FT08Mi','来源')]).then(result=>{
   if(settled)return;
   if(result.some(x=>x.length===0)){settled=true;cancelRender(new Error('FT1008 local typeface unavailable'));return;}
   settled=true;continueRender(handle);
  }).catch((error)=>{if(!settled){settled=true;cancelRender(error);}});
  return ()=>{if(!settled){settled=true;continueRender(handle);}};
 },[handle]);
 return null;
}
export function Movie(){const frame=useCurrentFrame();return <><FontGate/><EpisodeFrame frame={frame}/></>;}
export function Root(){return <Composition id="FT1008" component={Movie} width={1920} height={1080} fps={timeline.fps} durationInFrames={timeline.totalFrames}/>;}
