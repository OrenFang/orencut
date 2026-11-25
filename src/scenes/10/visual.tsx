import React, {type CSSProperties, type ReactNode} from 'react';
import {Img} from 'remotion';
import {geometry,media,type MediaKey} from './media';
import {localEase,progress,type Rect} from './clock';
import type {Theme} from './story';

export const IVORY='#faf7eb', GOLD='#e6bc65', SHADE='#11100d';
export const xy = ([left,top,width,height]:Rect):CSSProperties => ({position:'absolute',left,top,width,height});
const palettes:Record<Theme,string> = {
 warm:'radial-gradient(ellipse 700px 840px at 49% 46%,#262218 0%,#1c1a15 52%,#161512 100%)',
 green:'radial-gradient(ellipse 1100px 1110px at 49% -10%,#0b8a42 0%,#095d31 33%,transparent 73%),radial-gradient(ellipse 670px 820px at 84% 104%,#163c37 0%,transparent 83%),#030704',
 slate:'radial-gradient(ellipse 540px 1300px at 1% 18%,#4d5455 0%,transparent 78%),linear-gradient(#0a110d 13%,#010202 66%)',
 navy:'radial-gradient(ellipse 640px 480px at 29% 36%,#203745 0%,#0b1820 62%,transparent 100%),radial-gradient(ellipse 590px 270px at 75% 62%,#14232f 0%,transparent 100%),#030506',
 black:'radial-gradient(ellipse 830px 370px at 44% 34%,#191a1c 0%,transparent 83%),linear-gradient(#101012,#020202 63%)',
 silver:'radial-gradient(ellipse 800px 340px at 45% 24%,#858887 0%,#575a58 52%,transparent 100%),linear-gradient(#4a4b49,#303334 36%,#080908 63%)',
 pink:'radial-gradient(ellipse 500px 530px at 35% 22%,#78104e 0%,#594249 46%,transparent 92%),linear-gradient(#555151,#4e4943 25%,#060605 62%)',
 paper:'radial-gradient(ellipse 690px 600px at 62% 24%,#635d55 0%,transparent 77%),linear-gradient(#464541,#292927 48%,#20201e 90%)',
 indigo:'radial-gradient(ellipse 870px 700px at 43% 40%,#131f54 0%,#0b122b 65%,transparent 100%),linear-gradient(#071020,#050918 53%,#040306)',
 patch:'radial-gradient(ellipse 710px 600px at 55% 58%,#234d3d 0%,transparent 95%),linear-gradient(#4b5050,#393b38 79%,#353a39)',
};
export const Backdrop = ({tone,opacity=1}:{tone:Theme;opacity?:number}) => <div style={{position:'absolute',inset:0,opacity,background:palettes[tone]}}>
  {tone==='warm'? <div style={{position:'absolute',inset:0,opacity:.42,backgroundImage:'linear-gradient(#a18a5220 1px,transparent 1px),linear-gradient(90deg,#a18a5220 1px,transparent 1px)',backgroundSize:'85px 85px',maskImage:'radial-gradient(ellipse 620px 660px at 50% 47%,#000 0%,transparent 90%)'}}/>:null}
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 47%,transparent 64%,#0403034d 100%)'}}/>
</div>;

// Crop and focus are in the original still's coordinate space. Never stretch or paint over native statistics.
export function Picture({name,box,crop,fit='cover',anchor=[.5,.5],zoom=1,veil=1,style}:{name:MediaKey;box:Rect;crop?:Rect;fit?:'cover'|'contain';anchor?:readonly [number,number];zoom?:number;veil?:number;style?:CSSProperties}){
  const src = media[name];
  const {native}=geometry[name];
  const [x,y,w,h]=crop??geometry[name].crop;
  const [, , dw,dh]=box;
  const kx=dw/w,ky=dh/h,base=(fit==='cover'?Math.max(kx,ky):Math.min(kx,ky))*zoom;
  const localx=(dw-w*base)*anchor[0],localy=(dh-h*base)*anchor[1];
  return <div data-picture={name} style={{...xy(box),overflow:'hidden',opacity:veil,...style}}>
    <div style={{position:'absolute',left:localx,top:localy,width:w*base,height:h*base,overflow:'hidden'}}>
      <Img src={src} alt="" style={{position:'absolute',display:'block',left:-x*base,top:-y*base,width:native[0]*base,height:native[1]*base}} />
    </div>
  </div>;
}
export function BorderRail({text,active=true,style}:{text:string;active?:boolean;style?:CSSProperties}) {
 return <div style={{display:'inline-flex',alignItems:'center',color:active?IVORY:'#afa99d',background:'#15120dd9',borderLeft:`5px solid ${active?GOLD:'#7b6f59'}`,fontSize:31,lineHeight:'42px',padding:'3px 14px',...style}}>{text}</div>;
}
function BrowserBar({address,white}:{address:string;white:boolean}) {
  const dots=['#f16858','#edbe51','#58c662'];
  return <div style={{position:'absolute',zIndex:2,left:0,right:0,top:0,height:43,display:'flex',alignItems:'center',gap:9,background:white?'#ece9e1':'#21242b',padding:'0px 16px',borderBottom:white?'1px solid #d8d3c9':'1px solid #ffffff12'}}>
   {dots.map(c=><b key={c} style={{display:'block',width:12,height:12,borderRadius:12,background:c}} />)}
   <div className="mono" style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',flex:1,padding:'3px 12px',marginLeft:8,borderRadius:5,background:white?'#fffef9':'#151720',color:white?'#383633':'#e9e6de',fontSize:22,lineHeight:'27px'}}>{address}</div>
  </div>;
}
export function EditorialFocus({rect,p,mask=false}:{rect:Rect;p:number;mask?:boolean}) {
 if(p<=0) return null;
 return <div style={{...xy(rect),pointerEvents:'none',borderRadius:5,opacity:Math.min(1,p*2.6),boxShadow:mask?'0 0 0 1500px #0006':'none'}}>
  <div style={{position:'absolute',inset:0,border:`3px solid ${GOLD}`,borderRadius:5,clipPath:`inset(0 ${100*(1-p)}% 0 0)`}} />
 </div>;
}
export function Web({box,asset,address,tag,white=false,crop,fit='cover',zoom=1,anchor,focus,focusProgress=0,shade=false,children}:{box:Rect;asset?:MediaKey;address?:string;tag?:string;white?:boolean;crop?:Rect;fit?:'cover'|'contain';zoom?:number;anchor?:readonly [number,number];focus?:Rect;focusProgress?:number;shade?:boolean;children?:ReactNode}) {
 const [, ,w,h]=box, bar=address?43:0;
 return <div style={{...xy(box),overflow:'hidden',borderRadius:12,background:white?'#fffef9':'#101216',boxShadow:'0 19px 34px #0008',border:white?'1px solid #beb7a9':'1px solid #ffffff0c'}}>
   {asset?<Picture name={asset} box={[0,bar,w,h-bar]} crop={crop} fit={fit} anchor={anchor} zoom={zoom}/>:null}
   {children}
   {focus?<EditorialFocus rect={focus} p={focusProgress} mask={shade}/>:null}
   {address?<BrowserBar address={address} white={white}/>:null}
   {tag?<div style={{position:'absolute',top:0,left:0,zIndex:3,color:IVORY,background:'#0c0c0a',fontSize:23,padding:'6px 13px',lineHeight:'26px'}}>{tag}</div>:null}
 </div>;
}
export function Steps({f,stops,labels,top,size=29}:{f:number;stops:readonly number[];labels:readonly string[];top:number;size?:number}){
 const n=stops.filter(at=>f>=at).length;
 if(n===0) return <></>;
 return <div style={{position:'absolute',left:40,right:40,top,display:'flex',justifyContent:'center',gap:9}}>
  {labels.map((label,i)=><div key={label} style={{border:'1px solid #d2ae5850',boxShadow:'0 6px 12px #0005',background:i===n-1?'#ebc565':'#211f1a',color:i===n-1?'#21130c':i<n?'#f6efdd':'#968875',whiteSpace:'nowrap',fontSize:size,lineHeight:1.15,padding:'8px 13px'}}>{i<n-1?'✓ ':null}{label}</div>)}
 </div>;
}
export function PartnerBadges({f,top,items}:{f:number;top:number;items:readonly {name:string;icon?:MediaKey;at:number;initial?:string}[]}) {
 const w=items.length===5?165:items.length===4?194:196;
 return <div style={{position:'absolute',display:'flex',justifyContent:items.length===3?'space-between':'space-around',left:44,right:44,top,gap:11}}>
  {items.map(it=>{const p=localEase(f,it.at-1,it.at+9); const iconBox:Rect=[(w-102)/2,(w-102)/2,102,102]; return <div key={it.name} style={{width:w+8,textAlign:'center',opacity:.32+.68*p}}>
   <div style={{position:'relative',width:w,height:w,margin:'0 auto 13px',borderRadius:'50%',display:'grid',placeItems:'center',background:'#27231b',border:`4px solid ${p>.04?GOLD:'#5d5241'}`,boxShadow:p>.04?'0 0 23px #e6ba5738':'none'}}>
    {it.icon?<Picture name={it.icon} box={iconBox} fit="contain" style={{filter:'grayscale(1)',borderRadius:14}}/>:<span className="digits gold" style={{fontSize:53}}>{it.initial}</span>}
   </div>
   <div style={{whiteSpace:'nowrap',fontSize:items.length===5?30:37}}>{it.name}</div>
  </div>;})}
 </div>;
}
export function Quote({f,box,address,rows,size=47}:{f:number;box:Rect;address:string;rows:readonly {at:number;en:ReactNode;zh?:string;h?:number}[];size?:number}){
 const p=rows.filter(r=>f>=r.at);
 const height=p.reduce((acc,row)=>acc+(row.h??(row.zh?174:104)),69);
 return <div style={{...xy([box[0],box[1],box[2],height]),overflow:'hidden',background:'#f2efe4',border:'1px solid #d4cebc',borderRadius:9,boxShadow:'0 14px 25px #0008'}}>
  <div className="mono" style={{position:'absolute',left:0,right:0,top:0,height:60,display:'flex',alignItems:'center',gap:12,padding:'0 22px',background:'#e6e2d8',borderBottom:'1px solid #d4cec0',color:'#403c34',fontSize:23}}><span style={{display:'grid',placeItems:'center',width:25,height:28,border:'2px solid #5f5a50',borderRadius:2,lineHeight:'18px'}}>≡</span>{address}</div>
  <section style={{position:'absolute',left:39,right:35,top:97,bottom:5,color:'#25231c',fontSize:size,lineHeight:1.15}}>
   {p.map((r,i)=><div key={r.at} style={{minHeight:r.h??(r.zh?174:104),opacity:Math.min(1,(f-r.at+2)/5),borderTop:i?'1px solid #bcb7ab88':undefined,paddingTop:i?13:0}}>
    {r.en}{r.zh?<div className="medium" style={{fontSize:27,color:'#554d41',marginTop:6}}>{r.zh}</div>:null}
   </div>)}
  </section>
 </div>;
}
export const Em = ({children}:{children:ReactNode}) => <span style={{background:'#f3d9878f',boxDecorationBreak:'clone'}}>{children}</span>;

export function Terminal({f,at,title,lines,box}:{f:number;at:number;title:string;lines:readonly string[];box:Rect}){
 return <Web box={box} address={title}>
  <div className="mono" style={{position:'absolute',top:78,left:27,right:22,color:IVORY,fontSize:34,whiteSpace:'nowrap',lineHeight:1.57}}>
   {lines.map((line,i)=>{const cur=f-at-i*34, n=Math.floor(progress(cur,0,Math.max(14,line.length*.66))*line.length);return <div key={line} style={{minHeight:47,color:i===0?IVORY:'#a0a99a'}}>{cur>=0?line.slice(0,n):' '}{cur>=0&&n<line.length?<span style={{opacity:Math.floor(f/8)%2 ? .35 : 1,color:GOLD}}>▍</span>:null}</div>;})}
  </div>
 </Web>;
}
