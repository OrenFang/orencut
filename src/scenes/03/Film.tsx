import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ramp, type} from './Geometry';
import timeline from './timeline.json';
import {Brand, Captions, Subchapter} from './Type';
import {SceneStage} from './Stage';

export const Film = () => {
  const frame=useCurrentFrame();
  const chapter=timeline.chapters.find(row=>row.start<=frame&&frame<row.end)!;
  const brand=timeline.brand.find(row=>row.start<=frame&&frame<row.end)!;
  const caption=timeline.captions.find(row=>row.start<=frame&&frame<row.end)!;
  const violet=chapter.id==='part-three';
  return <AbsoluteFill style={{background:'#191813',fontFamily:type,overflow:'hidden'}}>
    <div style={{position:'absolute',left:0,top:0,width:648,height:1152,transform:'scale(1.6666666666666667)',transformOrigin:'0 0',overflow:'hidden',background:violet?'radial-gradient(ellipse at 50% 41%,#2b2030, #181517 74%)':'radial-gradient(ellipse at 50% 41%,#211e16,#181713 74%)'}}>
      <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(90deg,transparent 0 48px,#f6e9bb08 49px 50px),repeating-linear-gradient(0deg,transparent 0 48px,#f6e9bb07 49px 50px)',maskImage:'radial-gradient(ellipse at center,#000 0%,transparent 71%)',pointerEvents:'none'}}/>
      {caption.text!==null&&<Captions text={caption.text} f={frame}/>}
      {brand.mode!=='none'&&<Brand mode={brand.mode} f={frame}/>}
      <Subchapter id={chapter.id} f={frame}/>
      <SceneStage s={chapter} f={frame}/>
    </div>
    {frame>=24678&&<AbsoluteFill style={{background:'#000',opacity:ramp(frame,24678,95),pointerEvents:'none'}}/>}
  </AbsoluteFill>;
};
