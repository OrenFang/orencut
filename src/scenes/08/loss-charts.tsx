import React from 'react';
import {Box,Text,Small,Title,Pill,Foot,filingRef,gl,gold,blue,red,ease,linear} from './layers';
import {lossSegments,quarterKeys,quarterLossAt,quarterlyLossYi,marginLayout,operatingMarginPercent} from './finance';

const slopes=['linear-gradient(90deg,#536ea6,#a0cafe)','linear-gradient(90deg,#bd2a20,#f45246)','linear-gradient(180deg,#626b78,#434950)'];
export function LossBridge({t,phase=0}:{t:number;phase?:0|1|2}){
 const width=874, x=162, y=262, h=69;
 const opOn=phase===0?ease(t,5.23,5.65):1;
 const fairOn=phase===0?0:phase===1?ease(t,2.09,2.40):1;
 const reveal=phase===0?ease(t,.16,.53):1;
 const muted=phase===2?1:1-.58*opOn+.58*fairOn;
 return <div data-loss-bridge={phase}><Title cn="一千零四十亿 · 拆开看" en="NET LOSS · 9M 2026 · US$ 100M" t={t+.08}/>
  <Text x={162} y={208} w={601} size={31} align="left">净亏损 <span style={{color:red}}>1,040 亿美元</span></Text>
  <Box x={x} y={y} w={width} h={h} style={{display:'block',overflow:'hidden',width:width*reveal,borderRadius:5,boxShadow:'0 3px 12px #0006'}}>{lossSegments(width).map((s,i)=><Box key={i} x={s.x} y={0} w={s.w} h={h} style={{opacity:i===1?muted:i===2?.77:phase===2?.79:1,background:slopes[i],borderRight:i<2?'1px solid #161a257d':undefined,boxSizing:'border-box'}}/>)}</Box>
  <ChartLabel x={162} w={213} alpha={opOn} color={blue} number="12.6" title="营业亏损" sub="OPERATING LOSS"/>
  <ChartLabel x={416} w={290} alpha={fairOn} color={red} number="943" title="账面亏损" sub="公允价值变动计亏"/>
  {phase===2&&<Pill x={291} y={469} w={617} label="大部分不是现金支出　·　是公司变贵的副作用" t={t-2.42}/>}
  <Foot alpha={.76}>来源：{filingRef} p.28；其他＝净亏损 − 营业亏损 − 公允价值计亏（计算值）</Foot>
 </div>;
}
function ChartLabel({x,w,alpha,number,title,sub,color}:{x:number;w:number;alpha:number;number:string;title:string;sub:string;color:string}){
 return <div style={{opacity:alpha,filter:`blur(${(1-alpha)*6}px)`}}><Text x={x} y={350} w={w} size={38} align="left" color={color}>{number} 亿</Text><Text x={x} y={397} w={w} size={17} align="left">{title}</Text><Small x={x} y={421} w={w} size={9} style={{textAlign:'left'}}>{sub}</Small></div>;
}
export function OperatingMargin({t}:{t:number}){
 const labels=['2025 年 Q3','2026 年 Q3'];
 return <><Title cn="营业利润率 · 第三季度" en="OPERATING MARGIN · % OF REVENUE" t={t} foot={`${filingRef} p.165 · 营业损益 ÷ 当季收入，取整`}/>
  <Box x={973} y={170} w={1} h={310} style={{background:'#dde5e76f'}}/>
  {operatingMarginPercent.map((value,i)=>{const {w}=marginLayout(value), p=ease(t,i===0?2.43:.28,i===0?3.07:.81), x=973-w*p, y=218+i*133;return <React.Fragment key={i}>
   <Text x={98} y={y} w={219} size={23} align="left">{labels[i]}</Text><Small x={98} y={y+35} w={170} style={{textAlign:'left'}}>{i===0?'PRIOR YEAR':'CURRENT'}</Small>
   <Box x={x} y={y} w={w*p} h={26} style={{background:i===0?'linear-gradient(90deg,#613431,#8b4843)':'linear-gradient(90deg,#a5332d,#fc6554)',borderRadius:'4px 0 0 4px'}}/>
   <Text x={x-119} y={y-4} w={105} size={31} alpha={p} align="right" color={i===0?'#e79d95':red}>{Math.round(value*p)}<span style={{fontSize:16}}>%</span></Text>
  </React.Fragment>;})}
  <Pill x={986} y={351} w={90} label="快打平" t={t-6.85}/>
 </>;
}
const q2NoteIn=[{alpha:.27,blur:4.5},{alpha:.57,blur:3.3},{alpha:.79,blur:2},{alpha:.89,blur:1.1},{alpha:.96,blur:.5},{alpha:.98,blur:.2},{alpha:.99},{alpha:1}];
export function QuarterlyLoss({frame,t}:{frame:number;t:number}){
 const {q2,q2Height}=quarterLossAt(frame), floor=518.75;
 const reveal=1-.86*linear(frame,3927,3934);
 const noteFade=frame>=3905&&frame<3920?q2NoteIn[Math.min(frame-3905,q2NoteIn.length-1)]:undefined;
 return <div data-quarterly-loss="true" data-q2={q2} style={{opacity:reveal}}>
  <Title cn="每个季度的净亏损" en="QUARTERLY NET LOSS · US$ 100M" t={t+.02} foot={`${filingRef} p.165 季度表（未经审计） · 亏损绝对额，单位：亿美元`}/>
  <Box x={162.5} y={floor} w={861} h={1} style={{background:'#a099a88e'}}/>
  {quarterKeys.map((k,i)=>{
   const isQ2=i===5, p=isQ2?+(q2>0):ease(t,.30+i*.105,.77+i*.105), x=187.5+i*121.875;
   const height=isQ2?q2Height:quarterlyLossYi[i]/663*352.5*p, color=isQ2?red:'#8b574d';
   return <React.Fragment key={k}>
    <Box x={x} y={floor-height} w={94.25} h={height} style={{opacity:p,background:gl(color),borderRadius:'5px 5px 0 0',boxShadow:isQ2?'0 0 12px #ed564f62':undefined}}/>
    <Text x={x-1} y={floor-height-(isQ2?40:39)} w={97} size={isQ2?32:21} alpha={p} color={isQ2?red:'#b08b84'}>{isQ2?q2:quarterlyLossYi[i]}</Text>
    <Text x={x-1} y={floor+11} w={97} size={16} alpha={isQ2&&p?1:.47}>{k}</Text>
   </React.Fragment>;
  })}
  {frame>=3905&&<Pill x={615} y={153} w={179} label="H 轮后估值暴涨" t={(frame-3911)/30} color={gold} fade={noteFade}/>}
 </div>;
}
