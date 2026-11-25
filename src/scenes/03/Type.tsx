import React from 'react';
import labels from './labels.json';
import timeline from './timeline.json';
import {clamp, dim, gold, pale, ramp, red, type} from './Geometry';
import {Product, slide, xy} from './Media';

export type ChapterRow = (typeof timeline.chapters)[number];
export type BrandRow = (typeof timeline.brand)[number];
export type Glyph = readonly [number,number,string,number,number,number,string,number?,number?,number?];
const headingData = labels as unknown as Record<string,readonly Glyph[]>;
const ink:Record<string,string>={white:pale,gold,red,dim,outline:gold,dismissed:'#847767',badge:'#fdf2d7'};
function approx(text:string){return [...text].reduce((n,c)=>n+(/[\s]/.test(c)?.3:/[A-Z0-9]/.test(c)?.64:/[a-z]/.test(c)?.51:/[\u0020-\u007e]/.test(c)?.4:1),0);}
export function Headline({row,t,alpha=1}:{row:Glyph;t:number;alpha?:number}) {
  const [x,y,word,w,h,a,tone,n,d,stop]=row;
  if(t<a||t>=(stop??Infinity))return null;
  const p=ramp(t,a,.24), end=stop===undefined?1:clamp((stop-t)/.14);
  const text=n&&d?`${Math.min(n,Math.round(n*(1-(1-clamp((t-a)/d))**1.44)))}${word.replace(/^\d+/,'')}`:word;
  const bold=h>=44, outset=tone==='outline'||tone==='badge'?0:4;
  const fontSize=Math.min(h,(w-2*outset)/Math.max(1,approx(text))*1.03);
  return <div data-layer="title" style={{...xy(x-w/2,y+(1-p)*9,w,h*1.13),boxSizing:'border-box',display:'grid',placeItems:'center',color:tone==='outline'?'transparent':ink[tone]??pale,background:tone==='badge'?'linear-gradient(171deg,#7d5927,#30281b)':undefined,border:tone==='badge'?'1px solid #ac8241':undefined,borderRadius:2,fontSize,fontWeight:950,whiteSpace:'nowrap',lineHeight:1,fontStyle:bold&&tone!=='outline'?'italic':'normal',letterSpacing:bold?'.018em':'.01em',WebkitTextStroke:tone==='outline'?`1.4px ${gold}`:undefined,textDecoration:tone==='dismissed'?'line-through #a96742':undefined,opacity:p*end*alpha,clipPath:`inset(0 ${(1-p)*22}% 0 0)`,textShadow:tone==='outline'?undefined:'0 3px 6px #08070684'}}>{text}</div>;
}
export function Titles({scene,f}:{scene:ChapterRow;f:number}){
  const id=scene.id,t=(f-scene.start)/timeline.fps;
  const rows=headingData[id]??[];
  return <div data-layer="titles" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
    {rows.map((row,i)=>{
      let r=row;
      let alpha=1;
      if(id==='two-ways'&&f>=13734&&f<13749){
        if(i===1||f>=13746)return null;
        alpha=(i===0?.075:.12)*(1-slide(f,13734,i===0?7:12));
        if(alpha===0)return null;
      }
      if(id==='part-three'&&f>=18601&&f<18665){
        const start=i===0?18620:18600;
        if(f<=start)return null;
        r=[row[0],row[1],row[2],row[3],row[4],(start-scene.start)/timeline.fps,row[6]];
      }
      if(id==='open-door'||id==='chess')r=[324,i===0?396:475,row[2],i===0?550:345,i===0?61:64,id==='open-door'?(i===0?.73:.91):(i===0?.85:1.03),row[6]];
      if(id==='ban-question')r=[324,i===0?380:465,row[2],row[3],row[4],i===0?.01:.17,i===0?'white':'gold'];
      if(id==='ban-company'){if(i===0)return null;r=i===1?[324,356,row[2],550,57,.78,'white']:i===2?[324,472,row[2],540,67,1.66,'gold']:[324,565,row[2],590,66,1.84,'gold'];}
      if(id==='verdict'&&i===1&&f>=24150)r=[row[0],row[1],row[2],row[3],row[4],row[5],'dismissed'];
      if(id==='verdict'&&(i===2||i===3)&&f>=24150&&f<24224)r=[row[0],row[1],row[2],row[3],row[4],(24147-scene.start)/timeline.fps,row[6]];
      if(id==='closing')r=i===0?[324,365,row[2],545,76,.16,'white']:[324,465,row[2],560,78,.48,'gold'];
      return <Headline key={i} row={r} t={t} alpha={alpha}/>;
    })}
  </div>;
}
export function Captions({text,f}:{text:string|null;f:number}){return null;}
export function Brand({mode,f}:{mode:BrandRow['mode']|'white-outline'|'purple'|'dark';f:number}){return null;}
export function Subchapter({id,f}:{id:string;f:number}){
  const cost=f>=13749&&f<14229, talent=f>=14529&&f<15320;
  const open=f>=20910&&f<21010;
  const compute=f>=18891&&f<19626, guess=open||f>=19743&&f<20937&&!['industry-media'].includes(id);
  if(cost||!talent&&!compute&&!guess)return null;
  const items=talent?['人才']:compute?['推算力','准备上市']:['国产算力','走进产业','继续开源'];
  const k=talent?0:compute?(f<19374?0:1):open?2:f<20466?0:1;
  return <div data-layer={open?'open-radar-selection':'subchapter'} style={{...xy(talent?262:35,181,talent?125:578,46),zIndex:8,display:'flex',gap:7,pointerEvents:'none'}}>{items.map((s,i)=><div key={s} style={{flex:1,display:'grid',placeItems:'center',color:i===k?open?'#211908':pale:'#897b63',fontSize:talent?22:19,fontWeight:850,background:i===k?open?gold:'#332a19':'#211d1677',border:`1px solid ${i===k?'#926d2f':'#433922'}`,opacity:ramp(f,talent?14529:compute?18891:19743,14)}}>{talent?2:i+1}  {s}</div>)}</div>;
}
export function CreditedMark({f,start}:{f:number;start:number}){
  return <div style={{opacity:slide(f,start,24)}}><Product b={[208,321,232,60]}/></div>;
}
