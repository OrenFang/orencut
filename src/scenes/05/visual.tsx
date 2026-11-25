import React from 'react';
import type {CSSProperties, PropsWithChildren} from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile} from 'remotion';

export const W=1920,H=1080,PURPLE='#8253e2',LILAC='#d6bfff',INK='#19191c';
export const FONT='"FT05 Head", "PingFang SC", Arial, sans-serif';
export const CAPFONT='"FT05 Caption", "FT05 Head", "PingFang SC", sans-serif';
export const clamp=(x:number)=>Math.max(0,Math.min(1,x));
export const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
export const smooth=(t:number)=>{const p=clamp(t);return p*p*(3-2*p);};
export const ease=(t:number)=>1-(1-clamp(t))**3;
export const p=(f:number,start:number,end:number)=>smooth((f-start)/Math.max(1,end-start));
export const rise=(f:number,start:number,end:number)=>ease((f-start)/Math.max(1,end-start));
export const env=(f:number,inStart:number,inEnd:number,outStart:number,outEnd:number)=>rise(f,inStart,inEnd)*(1-p(f,outStart,outEnd));
export const kf=(f:number,points:readonly (readonly [number,number])[])=>{
  const i=points.findIndex(k=>f<=k[0]);
  if(i===0) return points[0][1];
  if(i===-1) return points[points.length-1][1];
  const [a,x]=points[i-1], [b,y]=points[i]; return lerp(x,y,(f-a)/(b-a));
};

const STILL={
  genie:staticFile('media/genie.jpg'),groot:staticFile('media/groot.jpg'),grootSort:staticFile('media/grootSort.jpg'),robotics:staticFile('media/robotics.jpg'),
  hydrogen:staticFile('media/hydrogen.jpg'),neon:staticFile('media/neon.jpg'),geminiMac:staticFile('media/geminiMac.jpg'),geminiTasks:staticFile('media/geminiTasks.jpg'),
  space:staticFile('media/space.jpg'),spaceShare:staticFile('media/spaceShare.jpg'),klingType:staticFile('media/klingType.jpg'),klingSeries:staticFile('media/klingSeries.jpg'),klingBallet:staticFile('media/klingBallet.jpg'),
  sunoCrochet:staticFile('media/sunoCrochet.jpg'),sunoDisco:staticFile('media/sunoDisco.jpg'),sunoCake:staticFile('media/sunoCake.jpg'),sunoPink:staticFile('media/sunoPink.jpg'),sunoDiamond:staticFile('media/sunoDiamond.jpg'),
  qwen:staticFile('media/qwen.jpg'),hy:staticFile('media/hy.jpg'),notebook:staticFile('media/notebook.jpg'),notebookSite:staticFile('media/notebookSite.jpg'),claudeLaptop:staticFile('media/claudeLaptop.jpg'),claudePaper:staticFile('media/claudePaper.jpg'),
};
const MOTION={
  genie:staticFile('media/genie.mp4'),groot:staticFile('media/groot.mp4'),grootSort:staticFile('media/grootSort.mp4'),robotics:staticFile('media/robotics.mp4'),
  hydrogen:staticFile('media/hydrogen.mp4'),neon:staticFile('media/neon.mp4'),geminiMac:staticFile('media/geminiMac.mp4'),geminiTasks:staticFile('media/geminiTasks.mp4'),
  space:staticFile('media/space.mp4'),spaceShare:staticFile('media/spaceShare.mp4'),klingBallet:staticFile('media/klingBallet.mp4'),
  sunoCrochet:staticFile('media/sunoCrochet.mp4'),sunoDisco:staticFile('media/sunoDisco.mp4'),sunoCake:staticFile('media/sunoCake.mp4'),sunoPink:staticFile('media/sunoPink.mp4'),sunoDiamond:staticFile('media/sunoDiamond.mp4'),
  hy:staticFile('media/hy.mp4'),notebook:staticFile('media/notebook.mp4'),notebookSite:staticFile('media/notebookSite.mp4'),claudeLaptop:staticFile('media/claudeLaptop.mp4'),
};
export type Media=keyof typeof STILL;
export type Movie=keyof typeof MOTION;
export const Still: React.FC<{media:Media;fit?:CSSProperties['objectFit'];style?:CSSProperties}> = ({media,fit='cover',style}) => <Img src={STILL[media]} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block',objectFit:fit,...style}}/>;
export const Moving: React.FC<{media:Movie;from:number;to:number;fit?:CSSProperties['objectFit'];trim?:number;rate?:number;style?:CSSProperties}> = ({media,from,to,fit='cover',trim=0,rate=1,style}) => (
  <Sequence from={from} durationInFrames={to-from} layout="none" name={media}>
    <OffthreadVideo src={MOTION[media]} muted trimBefore={trim} playbackRate={rate} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block',objectFit:fit,...style}}/>
  </Sequence>
);

type BoxProps=PropsWithChildren<{x:number;y:number;w:number;h:number;style?:CSSProperties}>;
export const Box:React.FC<BoxProps>=({x,y,w,h,children,style})=><div style={{position:'absolute',left:x,top:y,width:w,height:h,boxSizing:'border-box',...style}}>{children}</div>;
export const Pane:React.FC<BoxProps & {dark?:boolean; radius?:number}>=({x,y,w,h,children,style,dark=false,radius=27})=><Box x={x} y={y} w={w} h={h} style={{borderRadius:radius,backgroundColor:dark?'#19191c':'#fff',boxShadow:dark?'0 12px 32px #0003':'0 9px 17px #1b19201c, 0 1px 4px #16161e17',color:dark?'#fff':INK,overflow:'hidden',...style}}>{children}</Box>;
export const Credit: React.FC<{text:string;dark?:boolean;onVideo?:boolean;style?:CSSProperties}>=({text,dark,onVideo,style})=><div style={{position:'absolute',left:58,bottom:24,fontSize:19,color:dark?'#fff':'#6c6b70',fontWeight:700,lineHeight:1.28,zIndex:7,maxWidth:480,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',backgroundColor:onVideo?'#101012b8':undefined,borderRadius:10,padding:onVideo?'5px 9px':0,...style}}>{text}</div>;
export const Tag: React.FC<PropsWithChildren<{dark?:boolean;color?:string;style?:CSSProperties}>>=({dark,color,style,children})=><div style={{display:'inline-flex',alignItems:'center',padding:'8px 15px',backgroundColor:dark?'#1a1a1eea':'#f4f3f7',borderRadius:11,fontWeight:760,fontSize:22,color:color??(dark?'#fff':'#505058'),whiteSpace:'nowrap',...style}}>{children}</div>;
export const Violet:React.FC<PropsWithChildren<{dark?:boolean}>>=({children,dark})=><span style={{color:dark?LILAC:PURPLE}}>{children}</span>;
export const Shade: React.FC<{value:number;direction?:'bottom'|'solid'}>=({value,direction='solid'})=><AbsoluteFill style={{background:direction==='bottom'?`linear-gradient(0deg, rgba(0,0,0,${value}),transparent 65%)`:`rgba(0,0,0,${value})`,pointerEvents:'none'}}/>;
export const FullTitle: React.FC<PropsWithChildren<{opacity?:number;size?:number;y?:number;s?:number}>>=({children,opacity=1,size=146,y=435,s=1})=><Box x={75} y={y} w={1770} h={184} style={{display:'grid',placeItems:'center',textAlign:'center',fontSize:size,lineHeight:1.05,color:'#fff',fontWeight:900,textShadow:'0 8px 22px #090812aa',letterSpacing:'-0.035em',opacity,transform:`scale(${s})`,pointerEvents:'none'}}><div>{children}</div></Box>;
