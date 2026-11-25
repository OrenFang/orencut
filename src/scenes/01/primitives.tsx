import { demoAsset as staticFile } from '../../demo-media';
import React, {useLayoutEffect} from 'react';
import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, Img, useDelayRender} from 'remotion';
import './fonts.css';

export const P = {black:'#19191b',ink:'#18181a',paper:'#fff',purple:'#8554e8',lav:'#d7bef9',muted:'#77767b',shadow:'0 19px 45px #1e182024'} as const;
export const font = {body:'system-ui, sans-serif',title:'system-ui, system-ui, sans-serif',sub:'system-ui, system-ui, sans-serif',mono:'monospace, monospace'} as const;
export const at=(left:number,top:number,width?:number,height?:number):CSSProperties=>({position:'absolute',left,top,width,height});
const fontQueries = [
  '500 48px "system-ui"','900 48px "system-ui"','400 48px "system-ui"',
  '400 48px "system-ui"','600 48px "monospace"',
] as const;
let fontPromise: Promise<void> | undefined;
export function Fonts() {return null;}

type TextProps={x:number;y:number;w?:number;size?:number;color?:string;display?:boolean;children:ReactNode;style?:CSSProperties};
export const Text=({x,y,w,size=36,color=P.ink,display=false,children,style}:TextProps)=><div style={{...at(x,y,w),fontFamily:display?font.title:font.body,fontWeight:display?400:900,color,fontSize:size,lineHeight:1.13,whiteSpace:'nowrap',...style}}>{children}</div>;
export const Num=({children,color,style}:{children:ReactNode;color?:string;style?:CSSProperties})=><span style={{fontFamily:font.title,fontWeight:400,color,fontVariantNumeric:'tabular-nums',...style}}>{children}</span>;
export const Mono=({children,color,style}:{children:ReactNode;color?:string;style?:CSSProperties})=><span style={{fontFamily:font.mono,fontWeight:600,color,...style}}>{children}</span>;
export const Surface=({x,y,w,h,children,dark=false,style}: {x:number;y:number;w:number;h:number;children:ReactNode;dark?:boolean;style?:CSSProperties})=><div style={{...at(x,y,w,h),borderRadius:20,background:dark?'#25252a':'#fff',boxShadow:dark?'0 18px 35px #0008':P.shadow,overflow:'hidden',...style}}>{children}</div>;
export const Chip=({x,y,children,purple=false,size=27,style}: {x:number;y:number;children:ReactNode;purple?:boolean;size?:number;style?:CSSProperties})=><div style={{...at(x,y),display:'inline-flex',alignItems:'center',padding:'6px 17px',borderRadius:100,whiteSpace:'nowrap',fontSize:size,fontWeight:900,color:'#fff',background:purple?P.purple:P.black,...style}}>{children}</div>;
export const Note=({x,y,children,onDark=false,style}: {x:number;y:number;children:ReactNode;onDark?:boolean;style?:CSSProperties})=><div style={{...at(x,y),fontSize:19,lineHeight:1.24,color:onDark?'#f3edf9':'#645676',background:onDark?'#151417ba':'#ffffffd9',borderRadius:9,padding:'3px 8px',whiteSpace:'nowrap',fontWeight:500,...style}}>{children}</div>;
export const Check=({x,y,size=58,style}:{x:number;y:number;size?:number;style?:CSSProperties})=><svg viewBox="0 0 60 60" style={{...at(x,y,size,size),filter:'drop-shadow(0 7px 10px #1913213b)',...style}}><circle cx="30" cy="30" r="28" fill={P.black}/><path d="m18 30 8 8 16-17" stroke={P.lav} strokeWidth="4.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>;
export const Arrow=({x,y,w=82,color=P.ink,style}:{x:number;y:number;w?:number;color?:string;style?:CSSProperties})=><svg viewBox="0 0 80 32" style={{...at(x,y,w,w*.4),...style}}><path d="M3 16h70m-11-8 11 8-11 8" stroke={color} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>;

export const media = {
  codex:staticFile('independent/official/cover-wall-codex.jpg'),
  fire:staticFile('independent/official/cover-wall-pixel-red.jpg'),
  split:staticFile('independent/official/cover-wall-split.jpg'),
  api:staticFile('independent/official/cover-wall-api.jpg'),
  pixel:staticFile('independent/official/cover-wall-pixel-light.jpg'),
  blue:staticFile('independent/official/cover-wall-pixel-blue.jpg'),
  github:staticFile('independent/official/cover-wall-github.jpg'),
  chip:staticFile('independent/official/cover-wall-chip.jpg'),
  steps:staticFile('independent/official/cover-repo-t03e.jpg'),
  glass:staticFile('independent/official/cover-repo-t08i.jpg'),
  finance:staticFile('independent/official/demo-demo-finance-frame.jpg'),
  city:staticFile('independent/official/bg-night-city.jpg'),
  key:staticFile('independent/official/bg-keyboard.jpg'),
  studio:staticFile('independent/official/bg-editing-green.jpg'),
  doc:staticFile('independent/official/ui-typora-han-3.png'),
  dash:staticFile('independent/official/demo-grafana-dashboard.jpg'),
  release:staticFile('independent/official/nvidia-gtc-press-p1.png'),
  stage:staticFile('independent/official/nvidia-huang-stage.jpg'),
  wideStage:staticFile('independent/official/nvidia-huang-stage-alt.jpg'),
  report:staticFile('independent/official/nvidia-q3-fy26-release-p1.png'),
  chart:staticFile('independent/official/nvidia-inferencemax-chart.png'),
  writer:staticFile('independent/official/ui-typora-han-4.png'),
  audacity:staticFile('independent/official/ui-audacity-wave.png'),
  whisper:staticFile('independent/official/ui-macwhisper-transcript.jpg'),
  kdenlive:staticFile('independent/official/ui-kdenlive-editor.png'),
  resolve:staticFile('independent/official/ui-davinci-timeline-cn.jpg'),
  jensen:staticFile('independent/official/nvidia-huang-portrait.png'),
  mobileEdit:staticFile('independent/official/mobile-vn-zh.png'),
  phone:staticFile('independent/official/mobile-tradingview-zh.jpg'),
  portraitFinance:staticFile('independent/official/vertical-finance.jpg'),
  portraitOffice:staticFile('independent/official/vertical-office.jpg'),
  portraitVlog:staticFile('independent/official/vertical-vlog.jpg'),
  portraitFood:staticFile('independent/official/vertical-food.jpg'),
  catalog:staticFile('independent/official/demo-component-catalog.jpg'),
} as const;
export type Key=keyof typeof media;
export const wall:Key[]=['doc','split','fire','api','pixel','wideStage','glass','finance','chip','blue','codex','steps','github'];
export const Media=({name,x,y,w,h,r=16,style,fit='cover',position='center',shadow=false}: {name:Key;x:number;y:number;w:number;h:number;r?:number;style?:CSSProperties;fit?:CSSProperties['objectFit'];position?:string;shadow?:boolean})=><Img src={media[name]} alt="" draggable={false} style={{...at(x,y,w,h),objectFit:fit,objectPosition:position,borderRadius:r,overflow:'hidden',boxShadow:shadow?P.shadow:undefined,...style}}/>;
export function Backdrop({kind,frame=0}:{kind:'city'|'key'|'studio'|'edit';frame?:number}) {
  const image=kind==='edit'?'studio':kind;
  const key=kind==='key', studio=kind==='studio', city=kind==='city';
  return <><div style={{...at(-42,-38,2004,1156),transform:`scale(${1+Math.min(1,frame/580)*.021})`}}><Media name={image} x={0} y={0} w={2004} h={1156} r={0} style={{filter: key?'blur(16px) brightness(.6) saturate(.76)':city?'blur(13px) brightness(.65) saturate(.70)':studio?'blur(13px) brightness(.82) saturate(.86)':'blur(19px) brightness(.46) saturate(.70)'}}/></div><AbsoluteFill style={{background:key?'linear-gradient(100deg,#1c1915a8,#0f2f33a6 68%,#19263077)':city?'linear-gradient(180deg,#151517a8,#17171945 66%,#171719b8)':studio?'radial-gradient(ellipse at 56% 33%,#14847620,#17171976 94%)':'linear-gradient(120deg,#21190fa6,#17171965 66%,#171719b8)'}}/></>;
}

// Keep CSS tile pixels unchanged; native local Img handles the shared URL
// load barrier. This inert load-only layer is outside the visible artwork.
export function ImageBarrier({keys}:{keys:readonly Key[]}) {
  return <div data-ft-preload="thumbnails" aria-hidden="true" style={{position:'absolute',left:0,top:0,width:1,height:1,overflow:'hidden',opacity:0,pointerEvents:'none'}}>{keys.map(k=><Img key={k} src={media[k]} alt="" />)}</div>;
}
export const thumb=(name:Key):CSSProperties=>({backgroundImage:`url("${media[name]}")`,backgroundSize:'cover',backgroundPosition:'center'});
