import React from 'react';

export const W=1440, H=810;
export const DARK='#18181a', INK='#19191c', P='#8554e8', L='#d6beff', GOLD='#ddb363';
export const F={display:'"FT02 Display", "FT02 Text", sans-serif',body:'"FT02 Text", sans-serif',caption:'"FT02 Caption", "FT02 Text", sans-serif',code:'"FT02 Code", monospace'};
export type Style=React.CSSProperties;
export type XY={x:number;y:number;w?:number;h?:number};
export type Rect=Required<XY>;
export type ShotProps={id:string;f:number;start:number;end:number};
export const rect=(x:number,y:number,w?:number,h?:number):Style=>({position:'absolute',left:x,top:y,width:w,height:h});
export const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export const ratio=(f:number,a:number,b:number)=>clamp((f-a)/Math.max(1,b-a));
export const smooth=(f:number,a:number,b:number)=>{const z=ratio(f,a,b);return z*z*(3-2*z);};
export const enter=(f:number,a:number,b:number)=>1-(1-ratio(f,a,b))**3;
export const mix=(a:number,b:number,p:number)=>a+(b-a)*p;
export const interpolateKeys=(f:number,points:readonly (readonly [number,number])[])=>{
  const i=points.findIndex(p=>f<=p[0]);
  if(i<0)return points[points.length-1][1];
  if(i===0)return points[0][1];
  const [a,y]=points[i-1], [b,z]=points[i];
  return mix(y,z,ratio(f,a,b));
};
export const pretty=(n:number)=>Math.round(n).toLocaleString('en-US');
export const B=({x,y,w,h,children,style}:XY&{children?:React.ReactNode;style?:Style})=><div style={{...rect(x,y,w,h),...style}}>{children}</div>;
export const T=({x,y,w,h,children,size=34,color,align='left',face='display',weight,style}:XY&{children:React.ReactNode;size?:number;color?:string;align?:'left'|'right'|'center';face?:keyof typeof F;weight?:number;style?:Style})=>
  <B x={x} y={y} w={w} h={h} style={{fontFamily:F[face],fontWeight:weight??(face==='body'?500:face==='code'?600:400),fontSize:size,lineHeight:1.13,color,textAlign:align,whiteSpace:'nowrap',...style}}>{children}</B>;
export const Mark=({children,dark=false}:React.PropsWithChildren<{dark?:boolean}>)=><span style={{color:dark?L:P}}>{children}</span>;
export const Panel=({x,y,w,h,children,white=false,r=16,style}:Rect&{children?:React.ReactNode;white?:boolean;r?:number;style?:Style})=>
  <B x={x} y={y} w={w} h={h} style={{borderRadius:r,overflow:'hidden',background:white?'#fff':'#232328',color:white?INK:'#fff',boxShadow:white?'0 12px 22px #0003':'12px 16px 25px #0006',...style}}>{children}</B>;
export const Pill=({x,y,w,h,children,white=false,size=34,style}:Rect&{children:React.ReactNode;white?:boolean;size?:number;style?:Style})=>
  <B x={x} y={y} w={w} h={h} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:9,borderRadius:h/2,background:white?'#fff':INK,color:white?INK:'#fff',fontFamily:F.display,fontSize:size,fontWeight:400,whiteSpace:'nowrap',boxShadow:white?'7px 11px 16px #0002':'13px 16px 17px #0005',...style}}><span>{children}</span></B>;
export const In=({f,at=0,d=14,dx=0,dy=18,s=1,children}:React.PropsWithChildren<{f:number;at?:number;d?:number;dx?:number;dy?:number;s?:number}>)=>{
  const u=enter(f,at,at+d);
  return <div style={{position:'absolute',inset:0,opacity:u,transform:`translate(${dx*(1-u)}px,${dy*(1-u)}px) scale(${mix(s,1,u)})`,pointerEvents:'none'}}>{children}</div>;
};
export const Check=({x,y,yes=true,d=45,white=false}:XY&{yes?:boolean;d?:number;white?:boolean})=>
  <B x={x} y={y} w={d} h={d} style={{borderRadius:d,background:white?'#f6f4f4':'#19191e',color:white?INK:'#fff',display:'grid',placeItems:'center',boxShadow:'0 3px 8px #0004'}}><svg viewBox="0 0 32 32" width={d*.7} height={d*.7}><path d={yes?'M7 16l6 6L25 10':'M9 9l14 14M23 9 9 23'} stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></B>;
export const Stroke=({d,progress=1,color=P,width=4,opacity=1}: {d:string;progress?:number;color?:string;width?:number;opacity?:number})=><svg viewBox="0 0 1440 810" width={W} height={H} style={{position:'absolute',inset:0,pointerEvents:'none',opacity}}><path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1-clamp(progress)}/></svg>;
export const GridTexture=({step=56,color='#b6974921'}:{step?:number;color?:string})=><B x={0} y={0} w={W} h={H} style={{pointerEvents:'none',background:`linear-gradient(${color} 1px,transparent 1px),linear-gradient(90deg,${color} 1px,transparent 1px)`,backgroundSize:`${step}px ${step}px`}}/>;
