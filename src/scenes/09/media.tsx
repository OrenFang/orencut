import React from 'react';
import {Freeze, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {X,En} from './kit';
const pictures={
  image0:staticFile('independent/image0-openai-images-2-6.webp'),
  image1:staticFile('independent/image1-google-nano-banana-2-1.jpg'),
  image2:staticFile('independent/image2-bytedance-seedream-5-5.png'),
  image3:staticFile('independent/image3-minimax-h3-image.jpg'),
  codex:staticFile('independent/codex-openai-desktop.webp'),
  claude:staticFile('independent/claude-code-review-desktop.png'),
  rack:staticFile('independent/rack-nvidia-gb200-nvl72.png'),
 };
const movies={
  video0:staticFile('independent/video0-bytedance-seedance-2-5.mp4'),
  video1:staticFile('independent/video1-minimax-h3-poster-in-motion.mp4'),
  video2:staticFile('independent/video2-kuaishou-kling-4-omni-reference.mp4'),
  video3:staticFile('independent/video3-google-gemini-omni-1-2-flash.mp4'),
  atlas:staticFile('independent/atlas-world-labs-film-vfx.mp4'),
  robot:staticFile('independent/robot-google-deepmind-robotics-2-5.mp4'),
  platform0:staticFile('independent/platform0-xiaoyunque-smart-preview.mp4'),
  platform1:staticFile('independent/platform1-libtv-canvas.mp4'),
  platform2:staticFile('independent/platform2-flova-agent-workflow.mp4'),
  libtvDemo:staticFile('independent/libtvDemo-official-film-showcase.mp4'),
 };
const clipFrames={
  video0:179,
  video1:224,
  video2:209,
  video3:222,
  atlas:233,
  robot:220,
  platform0:111,
  platform1:167,
  platform2:212,
  libtvDemo:155,
 };
export type PictureId=keyof typeof pictures;
export type MovieId=keyof typeof movies;
const fill:React.CSSProperties={position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',display:'block'};
export function Pic({name,style,alt}:{name:PictureId;style?:React.CSSProperties;alt?:string}){return <Img src={pictures[name]} alt={alt??name} style={{...fill,...style}}/>;}
function ClipPlayback({name,style}:{name:MovieId;style?:React.CSSProperties}){
 const frame=useCurrentFrame(), tail=clipFrames[name]-1;
 return <Freeze frame={tail} active={frame>=tail}><OffthreadVideo src={movies[name]} muted style={{...fill,...style}}/></Freeze>;
}
export function Clip({name,from=0,style}:{name:MovieId;from?:number;style?:React.CSSProperties}){
 return <Sequence from={from} name={'官方独立样片 · '+name} layout="none"><ClipPlayback name={name} style={style}/></Sequence>;
}
export function MediaNote({children,x=9,y=5}:{children:React.ReactNode;x?:number;y?:number}){return <X x={x} y={y} style={{borderRadius:3,background:'#0d1420e8',padding:'3px 6px',boxShadow:'0 1px 4px #0008'}}><En size={9} color="#e8edf6" style={{margin:0,letterSpacing:'.04em'}}>{children}</En></X>;}
