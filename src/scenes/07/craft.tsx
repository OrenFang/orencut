import React, {createContext,useContext,type CSSProperties,type PropsWithChildren} from 'react';
import {Freeze,Img,OffthreadVideo,Sequence,staticFile} from 'remotion';
import {brandAt,chapterAt,clamp,cue,fitPhase,linear,mediaAt,mix,rise,type Branding,type Caption,type Chapter} from './clock';

export const W=1920,H=1080;
export const GOLD='#f2cb79', BLUE='#b9d3f1', RED='#ff8774', WHITE='#f3f4f8';
export const stageContext=createContext({frame:0,logicOnly:false});
export const useStage=()=>useContext(stageContext);
export const pos=(left:number,top:number,width?:number,height?:number):CSSProperties=>({position:'absolute',left,top,width,height});
export const Fill=({style,children}:PropsWithChildren<{style?:CSSProperties}>)=><div style={{position:'absolute',inset:0,...style}}>{children}</div>;
export const du=(n:number)=>`${n}%`;
export const useMotion=(name:string)=>cue(useStage().frame,name);
export const useChapter=():Chapter=>chapterAt(useStage().frame);


export function Media({lane,left=0,top=0,width=W,height=H,style,mediaStyle,alt='',decorate=false}: {lane:string;left?:number;top?:number;width?:number;height?:number;style?:CSSProperties;mediaStyle?:CSSProperties;alt?:string;decorate?:boolean}) {
  const {frame,logicOnly}=useStage(); const p=mediaAt(lane,frame);
  if(!p) return null;
  const urls:Record<string,string> = {
    "gamesradar-zelnick-title":staticFile("editorial/reporting/gamesradar-zelnick-title.png"),
    "genie3-forest-mammoth":staticFile("editorial/reporting/genie3-forest-mammoth.mp4"),
    "genie3-hinsdale-street":staticFile("editorial/reporting/genie3-hinsdale-street.mp4"),
    "genie3-japan-old-street":staticFile("editorial/reporting/genie3-japan-old-street.mp4"),
    "genie3-silhouette-waterfall":staticFile("editorial/reporting/genie3-silhouette-waterfall.mp4"),
    "genie3-volcano-buggy":staticFile("editorial/reporting/genie3-volcano-buggy.mp4"),
    "genie3-volcano-dark":staticFile("editorial/reporting/genie3-volcano-dark.mp4"),
    "genie3-white-boat-canal":staticFile("editorial/reporting/genie3-white-boat-canal.mp4"),
    "google-mayes-aisle":staticFile("editorial/reporting/google-mayes-aisle.webp"),
    "gtav-character":staticFile("editorial/publisher/gtav-character.jpg"),
    "gtav-vinewood-sunset":staticFile("editorial/publisher/gtav-vinewood-sunset.webp"),
    "gtavi-beach-crowd":staticFile("editorial/publisher/gtavi-beach-crowd.mp4"),
    "gtavi-bench":staticFile("editorial/publisher/gtavi-bench.mp4"),
    "gtavi-bench-still":staticFile("editorial/publisher/gtavi-bench-still.jpg"),
    "gtavi-end-close":staticFile("editorial/publisher/gtavi-end-close.mp4"),
    "gtavi-flamingos":staticFile("editorial/publisher/gtavi-flamingos.mp4"),
    "gtavi-gallery-beach":staticFile("editorial/publisher/gtavi-gallery-beach.jpg"),
    "gtavi-gallery-harbor":staticFile("editorial/publisher/gtavi-gallery-harbor.jpg"),
    "gtavi-gallery-night-car":staticFile("editorial/publisher/gtavi-gallery-night-car.jpg"),
    "gtavi-gallery-night-skyline":staticFile("editorial/publisher/gtavi-gallery-night-skyline.jpg"),
    "gtavi-gallery-nightclub":staticFile("editorial/publisher/gtavi-gallery-nightclub.jpg"),
    "gtavi-gallery-pink-car":staticFile("editorial/publisher/gtavi-gallery-pink-car.jpg"),
    "gtavi-gallery-weights":staticFile("editorial/publisher/gtavi-gallery-weights.jpg"),
    "gtavi-gallery-wetlands":staticFile("editorial/publisher/gtavi-gallery-wetlands.jpg"),
    "gtavi-neon-car":staticFile("editorial/publisher/gtavi-neon-car.mp4"),
    "gtavi-neon-car-still":staticFile("editorial/publisher/gtavi-neon-car-still.jpg"),
    "gtavi-night-aerial":staticFile("editorial/publisher/gtavi-night-aerial.mp4"),
    "gtavi-night-aerial-still":staticFile("editorial/publisher/gtavi-night-aerial-still.jpg"),
    "gtavi-night-street":staticFile("editorial/publisher/gtavi-night-street.mp4"),
    "gtavi-nightclub":staticFile("editorial/publisher/gtavi-nightclub.mp4"),
    "gtavi-nightclub-still":staticFile("editorial/publisher/gtavi-nightclub-still.jpg"),
    "gtavi-pink-street":staticFile("editorial/publisher/gtavi-pink-street.mp4"),
    "gtavi-pink-street-still":staticFile("editorial/publisher/gtavi-pink-street-still.jpg"),
    "gtavi-speedboats":staticFile("editorial/publisher/gtavi-speedboats.mp4"),
    "gtavi-store":staticFile("editorial/publisher/gtavi-store.mp4"),
    "gtavi-store-still":staticFile("editorial/publisher/gtavi-store-still.jpg"),
    "microsoft-ai-gb200-aisle":staticFile("editorial/reporting/microsoft-ai-gb200-aisle.jpg"),
    "microsoft-hot-aisle":staticFile("editorial/reporting/microsoft-hot-aisle.jpg"),

    "ps5-slim-dark":staticFile("editorial/publisher/ps5-slim-dark.jpg"),
    "ps5-slim-hero-motion":staticFile("editorial/publisher/ps5-slim-hero-motion.mp4"),
    "ps5-slim-midnight-black":staticFile("editorial/publisher/ps5-slim-midnight-black.webp"),
    "ps5-slim-white":staticFile("editorial/publisher/ps5-slim-white.webp"),
    "skhynix-ddr5-rdimm":staticFile("editorial/reporting/skhynix-ddr5-rdimm.jpg"),
  };
  const src=urls[p.assetId];
  if (!src) throw new Error(`No FT1007 static file for ${p.assetId}`);
  const local:CSSProperties={display:'block',width:'100%',height:'100%',maxWidth:'none',objectFit:p.fit,objectPosition:p.position,...mediaStyle};
  return <div className={decorate?'media-box':undefined} data-lane={lane} data-asset={p.assetId} data-media-frame={p.localFrame+p.offset} style={{...pos(left,top,width,height),overflow:'hidden',...style}}>
    {p.video?(logicOnly?<span data-audit-video={src}/>:<Sequence key={`${p.group}-${p.start}`} name={`${p.group} · ${p.assetId}`} from={p.start} durationInFrames={p.end-p.start} layout="none"><Freeze frame={p.safeEnd} active={frame-p.start>p.safeEnd}><OffthreadVideo src={src} muted trimBefore={p.offset || undefined} style={local} /></Freeze></Sequence>):(logicOnly?<img src={src} style={local} alt={alt}/>:<Img src={src} style={local} alt={alt}/>)}
  </div>;
}

const board=['benchmarks','ai-compare','interview','reputation','limits','examples','world-gap','causal-chain','ps5-chart','ledgers','timeframe'];
const shop=['npc-detail','handcrafted','genie','skill'];
const grille=['chapter-three','wallet'];
export function Atmosphere({id}:{id:string}) {
  const {frame}=useStage();
  const heavy=board.includes(id); const float=shop.includes(id); const hero=grille.includes(id);
  const chapter4Edge=id==='chapter-four'||(id==='answer'&&frame<7902);
  const blur=chapter4Edge?fitPhase(frame,[[7831,36],[7841,21],[7897,21],[7902,0]]):heavy?24:float?23:id==='entry-price'?9:id==='revenue-counter'?14:id==='chapter-one'?9:0;
  const bright=chapter4Edge?fitPhase(frame,[[7831,.34],[7841,.47],[7897,.47],[7902,.75]]):heavy?.4:float?.43:hero?.56:id==='final-bet'?.95:id==='ending-question'?.82:.75;
  const opacity=id==='zero-gen'&&frame<582?fitPhase(frame,[[575,.37],[576,.54],[582,1]]):frame<8?linear(frame,0,8):1;
  const shade=heavy?.82:float?.75:hero?.57:id==='final-bet'?.45:.52;
  const sepia=chapter4Edge?` sepia(${fitPhase(frame,[[7831,.5],[7840,.13],[7897,.13],[7902,0]])})`:'';
  const tint=hero?'linear-gradient(113deg,#14234155,transparent 55%),':chapter4Edge?`radial-gradient(ellipse at 43% 40%,rgba(88,47,26,${.31*linear(7902-frame,0,6)}),transparent 68%),`:'';
  return <Fill style={{backgroundColor:'#090a0d'}}>
     <Media lane="bg" style={{opacity,transform:blur?'scale(1.045)':undefined,filter:`blur(${blur}px) brightness(${bright}) saturate(${hero?.38:heavy?.70:.89})${sepia}`}}/>
     <Fill style={{background:`${tint}radial-gradient(ellipse at ${hero?'50% 47%':'50% 36%'}, rgba(10,10,13,${heavy?.14:.07}) 16%, rgba(6,6,9,${shade}) 100%),linear-gradient(0deg,#08080ce8 2%,#0a0a0b10 29%,transparent 71%,#08081146 100%)`}}/>
  </Fill>;
}

export const Panel=({left,top,width,height,tone='',style,orn=true,children}: PropsWithChildren<{left:number;top:number;width:number;height:number;tone?:'blue'|'red'|'neutral'|'';style?:CSSProperties;orn?:boolean}>) => <div className={`panel ${tone}`} style={{...pos(left,top,width,height),...style}}>{children}{orn&&<span className="orn" style={{color:tone==='blue'?'#bbd9ff':'#fde5aa'}}/>}</div>;
export const Pill=({tone='',font=22,style,children}: PropsWithChildren<{tone?:string;font?:number;style?:CSSProperties}>)=><span className={`pill ${tone}`} style={{fontSize:font,...style}}>{children}</span>;
export const Foot=({children,style}:PropsWithChildren<{style?:CSSProperties}>)=><div className="foot" style={style}>{children}</div>;
export const Glyph=({children,style,fill='',gradient=false,as='div'}:PropsWithChildren<{style?:CSSProperties;fill?:'gold'|'red'|'blue'|'silver'|'';gradient?:boolean;as?:'div'|'span'|'h1'|'h2'}>)=>React.createElement(as,{className:`disp ${fill?`${fill}-text`:''} ${gradient?'gradient-text':''}`,style},children);
export function Flourish({color='#aeb3bc',w=156}:{color?:string;w?:number}) {
  return <svg viewBox="0 0 156 20" width={w} height={16} aria-hidden="true" style={{display:'block',margin:'0 auto',color,opacity:.58}}><path d="M0 10H65l5-4 6 4-6 4-5-4M156 10H90l-5-4-6 4 6 4 5-4M77.5 3v14" stroke="currentColor" strokeWidth="1.25" fill="none"/></svg>;
}
export function Header({title,sub,p=1,top=35,size=48,orn=true}:{title:string;sub?:string;p?:number;top?:number;size?:number;orn?:boolean}) {
 return <div className="section-head" style={{...pos(0,top,W),textAlign:'center',opacity:p,transform:`translateY(${(1-p)*-12}px)`,filter:`blur(${(1-p)*5}px)`}}>
   {orn&&<Flourish/>}<Glyph as="h2" style={{fontSize:size,margin:'13px auto 11px',maxWidth:1760}}>{title}</Glyph>{sub&&<div className="subhead">{sub}</div>}
 </div>;
}
export function HeroText({a,b,sub,x=95,y=300,width=1730,size=88,p1=1,p2=1,color='gold',scale=1,revealFirst=p1,revealSecond=p2,lineGap=18}:{a:string;b?:string;sub?:string;x?:number;y?:number;width?:number;size?:number;p1?:number;p2?:number;color?:'gold'|'red'|'silver';scale?:number;revealFirst?:number;revealSecond?:number;lineGap?:number}) {
 return <div style={{...pos(x,y,width),textAlign:'center',transform:`scale(${scale})`}}>
  <div style={{opacity:p1,clipPath:`inset(0 ${100-100*revealFirst}% 0 0)`,transform:`translateY(${(1-p1)*8}px)`}}><Glyph style={{fontSize:size}}>{a}</Glyph></div>
  {b&&<div style={{opacity:p2,clipPath:`inset(0 ${100-100*revealSecond}% 0 0)`,marginTop:lineGap,transform:`translateY(${(1-p2)*8}px)`}}><Glyph fill={color} gradient={color!=='silver'} style={{fontSize:size}}>{b}</Glyph></div>}
  {sub&&<div className="subhead" style={{marginTop:28,opacity:p2}}>{sub}</div>}
 </div>;
}
export function Brand({frame,b,place='corner'}:{frame:number;b:Branding;place?:'corner'|'skill'}) {

 if(b.mode==='none') return place==='corner'?<div data-brand={b.mode} aria-hidden/>:null;
 const on=b.place===place;
 const opacity=b.fade?mix(.20,1,rise(frame,b.start,b.fade)):1;
 if(!on) return place==='corner'?<div data-brand={b.mode} aria-hidden/>:null;
 if(place==='corner') return <div className="corner-tag" data-brand={b.mode} style={{opacity,background:b.mode==='dark'?'#eee9db':undefined,color:b.mode==='dark'?'#171719':undefined}}><Glyph as="span">{b.label}</Glyph></div>;
 return <div data-brand={b.mode} style={{display:'inline-flex',position:'relative',alignItems:'center',gap:8,margin:'auto',fontSize:42,opacity}}>
   <svg width="36" height="32" viewBox="0 0 36 32" aria-hidden style={{position:'absolute',left:-17,top:-8,color:GOLD}}><path d="M9 13 3 8M13 10 11 1M7 20 1 18M3 29l8-5" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" fill="none"/></svg>
   <span style={{position:'relative',fontFamily:'Georgia,FT07Display',fontWeight:900,fontStyle:'italic',letterSpacing:'-.055em',transform:'rotate(-4deg)',textShadow:'0 3px 6px #000',lineHeight:1,padding:'0 3px 8px'}}>FredTalk<svg width="100%" height="10" viewBox="0 0 130 12" preserveAspectRatio="none" style={{position:'absolute',bottom:0,left:0}}><path d="M4 10Q66 0 126 4" stroke="#ebbc5a" strokeWidth="3.5" fill="none" strokeLinecap="round"/></svg></span>
   <span style={{transform:'skewX(-12deg)',background:'linear-gradient(130deg,#5b28cb,#371486)',borderRadius:10,fontFamily:'FT07Display',fontWeight:900,padding:'2px 10px 4px',boxShadow:'0 0 12px #592bd78a'}}>AI</span>
 </div>;
}
export function SkillBrand() {
 const {frame}=useStage();
 return <Brand place="skill" frame={frame} b={brandAt(frame)}/>;
}
export function Captions({frame,c}:{frame:number;c:Caption}) {
 if(c.text===null) return <div data-caption-visible="0" aria-hidden/>;
 const hi=c.fadeIn?mix(c.onsetOpacity??.18,1,linear(frame,c.start,c.fadeIn)):1;
 const lo=c.fadeOut?mix(.33,1,clamp((c.end-frame)/c.fadeOut)):1;
 return <div className="caption" data-caption-visible="1" data-caption-frame={c.start} style={{opacity:hi*lo}}>{c.text}</div>;
}
export const SourceTag=({text,left=24,top=23,tone='gold-solid',font=20}:{text:string;left?:number;top?:number;tone?:string;font?:number})=><div style={pos(left,top)}><Pill tone={tone} font={font}>{text}</Pill></div>;
export function BigValue({value,color='gold',p=1,y=381,font=155,reveal=p,blur}: {value:string;color?:'gold'|'red'|'silver';p?:number;y?:number;font?:number;reveal?:number;blur?:number}) {
  return <div style={{...pos(130,y,1660,215),textAlign:'center',opacity:p,transform:`translateY(${(1-p)*20}px)`,clipPath:`inset(0 0 ${100-100*reveal}% 0)`,filter:blur?`blur(${blur}px)`:undefined}}><span className={`big-number gradient-text ${color}-text`} style={{fontSize:font,display:'inline-block'}}>{value}</span></div>;
}
export function Reel({value,keys,rollHeight,style,positions}: {value:string;keys:string[];rollHeight:number;style?:CSSProperties;positions?:readonly number[]}) {
  const {frame}=useStage(); let n=0;
  let digitIndex=0;
  const face=positions?value.replace(/\d/g,()=>String(Math.round(positions[digitIndex++])%10)):value;
  return <div className="roll-number" aria-label={face} data-value={value} style={{display:'inline-flex',margin:'0 auto',alignItems:'baseline',height:rollHeight+10,fontSize:rollHeight*.91,...style}}>{Array.from(value).map((char,i)=>{
    if(!/^\d$/.test(char)) return <span key={i} style={{height:rollHeight,lineHeight:`${rollHeight}px`,width:char==='.'?35:40}}>{char}</span>;
    const iDigit=n++, p=cue(frame,keys[iDigit]), d=Number(char);
    const travel=positions?.[iDigit]??(10+d)*p;
    if(!positions&&p===1) return <span key={i} style={{height:rollHeight,lineHeight:`${rollHeight}px`,display:'inline-block',width:rollHeight*.60}}>{char}</span>;
    const stripLength=positions?Math.ceil(travel)+1:10+d+1;
    return <span key={i} style={{position:'relative',display:'inline-block',height:rollHeight,width:rollHeight*.60,verticalAlign:'top',overflow:'hidden'}}><span style={{position:'absolute',top:0,left:0,right:0,transform:`translateY(${-travel*rollHeight}px)`}}>{Array.from({length:stripLength},(_,j)=><span key={j} style={{display:'block',height:rollHeight,lineHeight:`${rollHeight}px`}}>{j%10}</span>)}</span></span>;
  })}</div>;
}
export function CutVeil({amount=0,color='#0b0a0c'}:{amount?:number;color?:string}) {
 return amount<=0?null:<div className="section-sweep" style={{background:color,opacity:amount}}/>;
}
