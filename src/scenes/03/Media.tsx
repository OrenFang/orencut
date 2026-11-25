import React from 'react';
import {Img, staticFile} from 'remotion';
import citationTable from './citations.json';
import {clamp, gold, pale, ramp} from './Geometry';

// Closed asset table: exact local URLs, no runtime fetches or original picture.
const art = {
  capitol: staticFile('independent/capitol-loc.jpg'), capitolAlternate: staticFile('independent/capitol-nps.jpg'),
  notice: staticFile('independent/us-gpo-notice.png'), order: staticFile('independent/us-dhs-order-cover.png'), removal: staticFile('independent/us-dhs-order-removal.png'),
  logo: staticFile('independent/deepseek-logo.svg'), whale: staticFile('independent/deepseek-whale-blue.svg'),
  highflyer: staticFile('independent/high-flyer-site.png'), files: staticFile('independent/deepseek-model-files.png'),
  dsmit: staticFile('independent/deepseek-mit.png'), kimilicense: staticFile('independent/kimi-k3-license.png'),
  pricetable: staticFile('independent/deepseek-api-table.png'), pricing: staticFile('independent/deepseek-api-pricing.png'),
  release: staticFile('independent/deepseek-release.png'), ascend: staticFile('independent/huawei-atlas.png'),
  deepinfer: staticFile('independent/deepinfer-site.png'), fireworks: staticFile('independent/fireworks-site.png'),
  filing: staticFile('independent/korrun-filing-deepseek.png'), catl: staticFile('independent/catl-site.png'),
  alibaba: staticFile('independent/alibaba-logo.png'), smic: staticFile('independent/smic-fund-logo.png'),
  idg: staticFile('independent/idg-logo.svg'), legend: staticFile('independent/legend-logo.png'),
};
export type ArtId = keyof typeof art;
export type Box = readonly [number,number,number,number];
export const xy = (x:number,y:number,w:number,h:number):React.CSSProperties => ({position:'absolute',left:x,top:y,width:w,height:h});
export const boxStyle=(b:Box)=>xy(...b);
export const slide=(f:number,start:number,d=22)=>ramp(f,start,d);

export function Art({asset,b,fit='contain',position='center',opacity=1,scale=1,y=0,look='plain',label}:{asset:ArtId;b:Box;fit?:'cover'|'contain';position?:string;opacity?:number;scale?:number;y?:number;look?:'plain'|'field'|'paper'|'dark';label:string}) {
  return <div data-asset-id={asset} data-local-art={art[asset]} style={{...boxStyle(b),overflow:'hidden',opacity,borderRadius:look==='paper'?3:0,background:look==='paper'?'#faf7ef':undefined,boxShadow:look==='paper'?'0 14px 37px #080705a8':undefined}}>
    <Img src={art[asset]} alt={label} style={{width:'100%',height:'100%',display:'block',objectFit:fit,objectPosition:position,transform:`translateY(${y}px) scale(${scale})`,filter:look==='field'?'brightness(.6) saturate(.78)':look==='dark'?'brightness(.28) saturate(.58)':undefined}}/>
  </div>;
}

export function Deck({asset,b,label,f,start,focus=1,fit='contain'}:{asset:ArtId;b:Box;label:string;f:number;start:number;focus?:number;fit?:'cover'|'contain'}){
  const p=slide(f,start,15), drift=slide(f,start+14,120);
  return <div data-layer="document-plane" style={{...boxStyle(b),opacity:.55+.45*p,transform:`translateY(${12*(1-p)}px)`,overflow:'hidden',borderRadius:3,background:'#f8f6ee',border:'1px solid #a99976',boxShadow:'0 12px 38px #0b0907a8'}}>
    <Art asset={asset} b={[0,0,b[2],b[3]]} label={label} fit={fit} scale={1+(focus-1)*drift}/>
  </div>;
}

const citations = Object.fromEntries(citationTable.cards.map(c=>[c.id,c]));
export type CardKey = keyof typeof citations;
export function card(k:CardKey) {
  const c=citations[k];
  if (!c) throw new Error(`Unregistered citation ${k}`);
  return c;
}
function domain(url:string){return new URL(url).hostname.replace(/^www\./,'');}
const ellipses:React.CSSProperties={overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'};
const lines=(l:number):React.CSSProperties=>({display:'-webkit-box',WebkitLineClamp:l,WebkitBoxOrient:'vertical',overflow:'hidden'});
export function Evidence({id,b=[35,250,578,270],f,start,mode='paper',compact=false,quiet=false,opacityScale=1}:{id:CardKey;b?:Box;f:number;start:number;mode?:'paper'|'ink';compact?:boolean;quiet?:boolean;opacityScale?:number}){
  const c=card(id), p=slide(f,start,17), light=mode==='paper', h=b[3];
  const copy=c.editorialText ?? c.title;
  return <article data-layer="citation-card" data-claim={c.claimId??''} data-card={id} style={{...boxStyle(b),boxSizing:'border-box',background:light?'#f3eee3':'#262219',border:`1px solid ${light?'#d9c7a1':'#6b5736'}`,borderLeft:`${light?4:3}px solid ${light?'#b88436':gold}`,borderRadius:3,color:light?'#1d1b17':pale,boxShadow:'0 10px 29px #09080675',padding:compact?'14px 16px':'21px 25px',opacity:(quiet?.32:1)*(.58+.42*p)*opacityScale,transform:`translateY(${(1-p)*12}px)`,overflow:'hidden'}}>
    <div style={{...ellipses,color:light?'#7f5d31':gold,fontWeight:800,letterSpacing:'.065em',fontSize:compact?13:17}}>{c.publisher}{c.date?`  ·  ${c.date}`:''}</div>
    <div style={{...lines(compact?2:3),fontSize:compact?22:31,fontWeight:850,lineHeight:1.2,marginTop:compact?8:12,wordBreak:'break-word'}}>{copy}</div>
    {!compact&&h>=215&&copy!==c.title&&<div style={{...lines(h>260?3:2),fontSize:16,fontWeight:600,lineHeight:1.32,marginTop:14,color:light?'#5a5246':'#c1b49b',wordBreak:'break-word'}}>{c.title}</div>}
    <div style={{...ellipses,position:'absolute',left:compact?16:25,right:compact?16:25,bottom:compact?10:16,color:light?'#675c4e':'#ac9f88',fontSize:compact?11:13}}>引证 · {domain(c.url)}</div>
  </article>;
}
export function SourceNote({children,y=887}:{children:React.ReactNode;y?:number}){
  return <div data-layer="source-note" style={{...xy(30,y,588,24),textAlign:'center',fontSize:13,fontWeight:600,lineHeight:1.25,color:'#b9ae98',overflow:'hidden'}}>{children}</div>;
}
export function PhotoField({asset,label,f,start,position='center',dim=.55}:{asset:ArtId;label:string;f:number;start:number;position?:string;dim?:number}){
  const p=clamp((f-start)/220);
  return <>
    <Art asset={asset} b={[0,0,648,1152]} label={label} fit="cover" position={position} scale={1.02+.048*p} look="field"/>
    <div style={{...xy(0,0,648,1152),background:`linear-gradient(180deg,rgba(18,17,14,.1) 0%,rgba(18,17,14,${dim}) 61%,#12110e 96%)`}}/>
  </>;
}
export function Product({b=[216,245,216,57],asset='logo'}:{b?:Box;asset?:ArtId}){
  return <div data-layer="brand-identity-plate" style={{...boxStyle(b),background:'#f7f2e7',border:'1px solid #ab9466',borderRadius:4,boxShadow:'0 5px 17px #0007'}}>
    <Art asset={asset} b={[11,7,b[2]-22,b[3]-14]} label={asset==='logo'?'DeepSeek 官方字标':asset}/>
  </div>;
}
