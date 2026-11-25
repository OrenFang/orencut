import React from 'react';
import {Evidence} from './Media';
import {clamp, gold, pale, ramp, type} from './Geometry';

export const hasManagement = (f:number) => f >= 3887 && f < 4119;
export const hasCost = (id:string) => id === 'low-cost';
const svg:React.CSSProperties={position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const p=(f:number,a:number,d:number)=>ramp(f,a,d);
const center=(f:number,a:number,b:number)=>clamp((f-a)/(b-a));

function T({x,y,children,size,color=pale,align='start',weight=800,italic=false}:{x:number;y:number;children:React.ReactNode;size:number;color?:string;align?:'start'|'middle'|'end';weight?:number;italic?:boolean}){
 return <text x={x} y={y} fill={color} textAnchor={align} fontFamily={type} fontWeight={weight} fontSize={size} fontStyle={italic?'italic':undefined}>{children}</text>;
}
function GoldFill({name}:{name:string}){
 return <linearGradient id={name} x1="0" x2="0" y1="0" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="#eac46e"/><stop offset="1" stopColor="#9c6e2b"/></linearGradient>;
}

export function Management({f}:{f:number}){
 const value=f>=3900?1000:Math.min(999,995+Math.floor((f-3887)*4/3));
 const article=p(f,3902,21), badge=p(f,3980,16);
 const edge=f-4106;
 const numberAlpha=[.83,.69,.47,.27,.12,.072,.035][edge];
 const paperAlpha=[.88,.76,.55,.38,.21,.13,.07][edge]??1;
 return <>
  <Evidence id="hf-aum" b={[52,515,544,183]} f={f} start={3902} compact quiet={article===0} opacityScale={paperAlpha}/>
  <svg data-layer="management-number-and-banner" width="648" height="1152" style={svg} opacity={numberAlpha}>
   <defs><GoldFill name="r3-management-gold"/></defs>
   <T x={324} y={258} size={20} color="#b9b1a2" align="middle">2021 · 幻方管理规模曾超 · 据报道</T>
   <T x={value<1000?148:111} y={376} size={134} color={gold} weight={950}>{value}</T>
   <T x={value<1000?398:435} y={373} size={49} weight={900}>亿元</T>
   {badge>0&&<g data-layer="management-banner" opacity={badge} transform={`translate(0 ${(1-badge)*6})`}>
    <rect x="134" y="418" width="380" height="51" rx="4" fill="url(#r3-management-gold)"/>
    <T x={324} y={454} size={27} align="middle" color="#fff7e8">国内最头部的量化私募之一</T>
   </g>}
   <T x={324} y={900} size={12} color="#a29a8a" align="middle" weight={600}>来源：21世纪经济报道 2026-01-14</T>
  </svg>
 </>;
}

export function CostComparison({f}:{f:number}){
 const pivot=p(f,13765,30), raise=p(f,13909,55);
 const chipX=mix(124,232,pivot), chipY=mix(405,187,pivot), chipW=mix(398,184,pivot), chipH=mix(123,58,pivot);
 const x=mix(13,47,raise), y=mix(493,336,raise), scale=mix(1,.89,raise);
 const vram=p(f,13864,14)*(1-p(f,13906,12));
 const price=p(f,13917,22), compare=p(f,13979,18), bar=p(f,14085,37), ratio=p(f,14123,28);
 // Keep the logo below the architecture chips throughout their upward move.
 const priceOffset=Math.max(0,y+119*scale+11-460)+7*(1-price);
 return <svg data-layer="cost-comparison" width="648" height="1152" style={svg}>
  <defs><GoldFill name="r3-cost-gold"/><linearGradient id="r3-turbo-bar"><stop stopColor="#6f675b"/><stop offset="1" stopColor="#a49a89"/></linearGradient></defs>
  <g data-part="cost-tab">
   <rect x={chipX} y={chipY} width={chipW} height={chipH} rx="2" stroke="#bc9a51" strokeWidth="1.3" fill="#30291b" style={{filter:'drop-shadow(0 0 5px #b98b394e)'}}/>
   <rect x={chipX+mix(25,11,pivot)} y={chipY+mix(31,15,pivot)} width={mix(56,27,pivot)} height={mix(56,27,pivot)} rx="3" fill={gold}/>
   <T x={chipX+mix(53,24,pivot)} y={chipY+mix(73,35,pivot)} size={mix(35,17,pivot)} color="#282018" align="middle">1</T>
   <T x={chipX+mix(99,46,pivot)} y={chipY+mix(86,42,pivot)} size={mix(65,29,pivot)} weight={900} italic>降成本</T>
  </g>
  <g data-part="cost-architecture" opacity={p(f,13777,14)} transform={`translate(${x} ${y}) scale(${scale})`}>
   <T x={0} y={0} size={92} color={gold} weight={950}>2024</T>
   <g opacity={p(f,13791,15)}><T x={0} y={53} size={35}>模型架构改进</T></g>
   {([{x:0,w:185,text:'MLA 注意力',a:13840},{x:198,w:235,text:'DeepSeekMoE',a:13851}]).map(chip=><g key={chip.text} opacity={p(f,chip.a,15)}>
    <rect x={chip.x} y="74" width={chip.w} height="45" rx="4" fill="url(#r3-cost-gold)"/>
    <T x={chip.x+chip.w/2} y={106} size={28} align="middle">{chip.text}</T>
   </g>)}
  </g>
  <g data-part="cost-memory" opacity={vram}>
   <T x={105} y={664} size={25}>显存占用降到原来的</T>
   <T x={365} y={666} size={42} color={gold} weight={900}>5%–13%</T>
  </g>
  <g data-part="cost-deepseek-price" opacity={price} transform={`translate(0 ${priceOffset})`}>
   <rect x="47" y="460" width="153" height="49" rx="4" fill="#f4efdf" stroke="#ccb583"/>
   <T x={123.5} y={492} size={22} align="middle" color="#191813">deepseek</T>
   <rect x="48" y="521" width="8" height="51" rx="3" fill={gold} style={{filter:'drop-shadow(0 0 7px #dcb15d8c)'}}/>
   <T x={77} y={564} size={50} color={gold} weight={950}>¥1</T>
   <T x={138} y={563} size={22}>/ 每百万 token</T>
  </g>
  <g data-part="cost-turbo-comparison" opacity={compare}>
   <T x={47} y={652} size={33}>GPT-4 Turbo</T>
   <rect x="48" y="677" width="552" height="50" rx="2" fill="#191813" stroke="#64594a" strokeOpacity=".56"/>
   {bar>0&&<rect x="48" y="677" width={552*bar} height="50" rx="2" fill="url(#r3-turbo-bar)"/>}
   <g opacity={ratio}>
    <T x={597} y={654} size={82} color={gold} weight={950} align="end">≈1/70</T>
    <T x={582} y={713} size={26} color="#f5f0e4" align="end">约 70 倍</T>
   </g>
   <T x={599} y={753} size={14} color="#9c9281" align="end" weight={600}>原节目历史示意 · 非实时、非同口径价目</T>
  </g>
 </svg>;
}
