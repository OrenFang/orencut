import React from 'react';
import {clamp,pale,gold,ramp} from './Geometry';

type Keys=readonly (readonly [number,number])[];
export const repairData = {
 fireOne:[[4458,0],[4468,1],[4480,2]],
 fireTwo:[[4645,0],[4660,4],[4672,9],[4683,10]],
 nvidia:[[5905,0],[5920,4533],[5930,5530],[5946,5892],[5960,5900]],
 openai:[[7023,0],[7030,375],[7062,1205],[7070,1219],[7080,1220]],
 anthropic:[[7129,0],[7150,538],[7160,621],[7190,650]],
} as const;
export const nvidiaSwap=5888;
export const openaiSwap=7118;
export const read=(f:number,keys:Keys)=>{
 const i=keys.findIndex(k=>k[0]>f);
 if(i===-1)return keys[keys.length-1][1]; if(i===0)return keys[0][1];
 const [a,v]=keys[i-1], [b,w]=keys[i]; return Math.round(v+(w-v)*clamp((f-a)/(b-a)));
};
const label=(text:string,x:number,y:number,size:number,style:React.CSSProperties={})=><div data-layer="repair-editable" style={{position:'absolute',left:x,top:y,fontSize:size,whiteSpace:'nowrap',fontWeight:800,lineHeight:1,color:pale,...style}}>{text}</div>;
function Count({x,base,keys,f,size,prefix,unit,color=gold,center=false,fade=12,id}:{x:number;base:number;keys:Keys;f:number;size:number;prefix?:string;unit:string;color?:string;center?:boolean;fade?:number;id:string}){
 if(f<keys[0][0])return null;
 const value=read(f,keys);
 return <div data-metric={id} data-value={value} style={{position:'absolute',left:x,top:base,transform:center?'translate(-50%,-100%)':'translateY(-100%)',display:'flex',alignItems:'baseline',gap:9,whiteSpace:'nowrap',fontWeight:900,opacity:ramp(f,keys[0][0]-1,fade),lineHeight:1,color:pale}}>
 {prefix&&<span style={{fontSize:33}}>{prefix}</span>}<span style={{fontSize:size,color,fontFamily:'Arial, sans-serif',fontWeight:900,fontVariantNumeric:'tabular-nums'}}>{value}</span><span style={{fontSize:unit==='%'?42:id.startsWith('fire')?33:30}}>{unit}</span></div>;
}
export function RepairType({id,f}:{id:string;f:number}){
 if(id==='gpu-money'){
  const opacity=1-.94*ramp(f,4902,43);
  return <div style={{position:'absolute',inset:0,opacity}}>
   <div style={{position:'absolute',left:59,top:204,width:1.5,height:144,background:'linear-gradient(#d2a854,#746343)'}}/>
   {label('2020 · 萤火一号投用',84,218,27,{color:'#cac2ae'})}
   <Count id="fire-one" x={84} base={352} prefix="近" unit="亿元" keys={repairData.fireOne} f={f} size={99}/>
   {f>=4575&&<><div style={{position:'absolute',left:59,top:361,width:1.5,height:144,background:'linear-gradient(#d2a854,#746343)',opacity:ramp(f,4575,12)}}/>{label('2021 · 大模型还没火',84,372,27,{color:'#cac2ae',opacity:ramp(f,4575,12)})}</>}
   <Count id="fire-two" x={84} base={507} prefix="萤火二号" unit="亿元" keys={repairData.fireTwo} f={f} size={99}/>
   {f>=4774&&label(`约 ${read(f,[[4774,0],[4800,3691],[4840,9133],[4880,9940],[4920,10000]])} 张英伟达 A100`,324,718,25,{transform:'translateX(-50%)',opacity:ramp(f,4774,20)})}
   {f>=4774&&label('2023 年采访报道 · 示意：一格一卡',324,746,14,{transform:'translateX(-50%)',color:'#a89b81',opacity:ramp(f,4774,20)})}
  </div>;
 }
 if(id==='nvidia')return <>
  {label('英伟达 · 1月27日单日',324,550,20,{transform:'translateX(-50%)',color:'#bcaf94'})}
  <Count id="nvidia-percent" x={324} base={661} unit="%" keys={[[5822,-17]]} size={102} color="#e85a4b" f={f} center fade={9}/>
  {f>=5909&&label('市值蒸发约',324,677,21,{transform:'translateX(-50%)',color:'#bcaf94',opacity:ramp(f,5909,11)})}
  <Count id="nvidia-loss" x={324} base={758} unit="亿美元" keys={repairData.nvidia} size={67} f={f} center/>

 </>;
 const showAnthropic=id==='anthropic'||(id==='openai'&&f>=openaiSwap);
 if(showAnthropic)return <>
  {f>=7129&&label('Anthropic · Series H（公司公告）',324,582,22,{transform:'translateX(-50%)',color:'#c5b699',opacity:ramp(f,7129,18)})}
  <Count id="anthropic" x={324} base={689} unit="亿美元" keys={repairData.anthropic} size={91} f={f} center fade={22}/>
 </>;
 if(id==='openai')return <>

  {f>=7023&&label('OpenAI · 承诺资本（2026-03-31 公告）',324,576,22,{transform:'translateX(-50%)',color:'#c5b699',opacity:ramp(f,7023,17)})}
  <Count id="openai" x={324} base={688} unit="亿美元" keys={repairData.openai} size={91} f={f} center fade={23}/>
 </>;
 return null;
}
