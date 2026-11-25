import { DemoImage as OffthreadVideo, demoAsset as staticFile } from '../../demo-media';
import React from 'react';
import {Img, Sequence} from 'remotion';
import {B, Rect, Style, T} from './core';

const photos={
 city:staticFile('independent/city-still.jpg'),factory:staticFile('independent/factory-still.jpg'),
 speaker:staticFile('independent/speaker.jpg'),energy:staticFile('independent/energy.jpg'),datacenter:staticFile('independent/datacenter.jpg'),lab:staticFile('independent/lab.jpg'),
 landscape:staticFile('independent/landscape.jpg'),press:staticFile('independent/press.jpg'),industrial:staticFile('independent/industrial.jpg'),trading:staticFile('independent/trading.jpg'),
};
const clips={city:staticFile('independent/city.mp4'),factory:staticFile('independent/factory.mp4')};
export type PhotoId=keyof typeof photos;
export type ClipId=keyof typeof clips;
export const Photo=({id,x,y,w,h,r=9,style,focus='50% 50%',tint=0}:Rect&{id:PhotoId;r?:number;style?:Style;focus?:string;tint?:number})=>
  <B x={x} y={y} w={w} h={h} style={{borderRadius:r,overflow:'hidden',...style}}><Img src={photos[id]} style={{width:'100%',height:'100%',display:'block',objectFit:'cover',objectPosition:focus}}/>{tint>0&&<B x={0} y={0} w={w} h={h} style={{background:'#070705',opacity:tint}}/>}</B>;
export const FilmClip=({id,start,end,trim=0,x,y,w,h,r=9,style,focus='center',tint=0}:Rect&{id:ClipId;start:number;end:number;trim?:number;r?:number;style?:Style;focus?:string;tint?:number})=>
  <Sequence from={start} durationInFrames={end-start} layout="none" name={`独立实拍 · ${id}`}><B x={x} y={y} w={w} h={h} style={{borderRadius:r,overflow:'hidden',...style}}><OffthreadVideo src={clips[id]} muted trimBefore={trim} style={{width:'100%',height:'100%',display:'block',objectFit:'cover',objectPosition:focus}}/>{tint>0&&<B x={0} y={0} w={w} h={h} style={{background:'#070705',opacity:tint}}/>}</B></Sequence>;
export const SourceTag=({x,y,w,text='独立素材 · 非原样片',dark=true,size=16}:Pick<Rect,'x'|'y'|'w'>&{text?:string;dark?:boolean;size?:number})=>
 <T x={x} y={y} w={w} size={size} face="body" color={dark?'#f7f5f0':'#53535a'} style={{textShadow:dark?'0px 1px 4px #000,0 1px 3px #000':undefined,padding:'3px 6px',borderRadius:2,background:dark?'#141414a6':'#fffffff0'}}>{text}</T>;
