import React from 'react';
import {Art, Evidence} from './Media';
import {ramp, gold, pale, type} from './Geometry';

const plate='#f6f1e5', ink='#211f19';
const reveal=(f:number,a:number,d=12)=>ramp(f,a,d);
const svgStyle:React.CSSProperties={position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'};
function Ink({x,y,children,size=20,color=pale,anchor='middle',weight=800}:{x:number;y:number;children:React.ReactNode;size?:number;color?:string;anchor?:'start'|'middle'|'end';weight?:number}){
 return <text x={x} y={y} dominantBaseline="central" textAnchor={anchor} fill={color} fontFamily={type} fontWeight={weight} fontSize={size}>{children}</text>;
}
function Badge({x,y,w,h,children,color=ink,bg=plate,size=17}:{x:number;y:number;w:number;h:number;children:React.ReactNode;color?:string;bg?:string;size?:number}){
 return <g><rect x={x} y={y} width={w} height={h} rx={3} fill={bg}/><Ink x={x+w/2} y={y+h/2} color={color} size={size}>{children}</Ink></g>;
}
const licenseIds=new Set(['license-grid','license-proof','license-grid-return','license-grid-final']);
export const isLicense=(id:string)=>licenseIds.has(id);
const licenseRows=[
 [{a:9288,lines:['不能下载']},{a:9351,lines:['闭源']},{a:9401,lines:['只能付钱用']}],
 [{a:9534,lines:['能下载权重']},{a:9676,lines:['自家许可证']},{a:9876,lines:['收入超一定规模','要另签协议']}],
 [{a:10125,lines:['谁都能下载','修改、商用']},{a:10125,lines:['MIT']},{a:10125,lines:['几乎没有','附加条件']}],
];
export function LicenseMatrix({f,id}:{f:number;id:string}){
 const active=f<9460?0:f<10125?1:2;
 const opacity=id==='license-proof'?.32:(.68+.32*reveal(f,9201,14))*(1-.54*reveal(f,10227,38));
 return <svg data-layer="license-matrix" width={648} height={1152} style={svgStyle} opacity={opacity}>
  {[399,537,675].map((y,i)=><Ink key={y} x={111} y={y} anchor="end" color="#cbc4b6">{['能下载吗','许可证','商用条件'][i]}</Ink>)}
  {[209,375,541].map((x,i)=><g key={x}>
   <rect x={x-77} y={204} width={154} height={540} rx={3} fill={i===2?'#b88a3a19':'#b1aa9110'} stroke={i===active?(i===2?gold:'#d9d1bb'):'#796e4c'} strokeOpacity={i===active?.92:.46} strokeWidth={i===active?1.6:1}/>
   {i===active&&i===2&&<rect x={x-81} y={200} width={162} height={548} rx={4} fill="none" stroke={gold} opacity=".65"/>}
   {i===0&&<><Badge x={159} y={234} w={39} h={30} size={9}>OpenAI</Badge><Badge x={201} y={234} w={27} h={30} size={16}>A</Badge><Badge x={231} y={234} w={28} h={30} size={18}>G</Badge></>}
   {i===1&&<><Badge x={310} y={234} w={56} h={30} color="#6347b5" size={14}>Qwen</Badge><Badge x={370} y={234} w={26} h={30} bg="#ece8df" size={16}>K</Badge><Badge x={400} y={234} w={40} h={30} color="#b12e59" size={9}>MiniMax</Badge></>}
   {i===2&&<Badge x={486} y={234} w={110} h={30} size={17}>deepseek</Badge>}
   <Ink x={x} y={288} size={20} color={i===2?gold:pale}>{['海外闭源','国内开放权重','DeepSeek'][i]}</Ink>
   {[330,468,606].map(y=><line key={y} x1={x-77} x2={x+77} y1={y} y2={y} stroke="#ad9c70" opacity=".22"/>)}
   {licenseRows[i].map(({a,lines},j)=>f>=a&&<g key={j} opacity={reveal(f,a,i===2?7:12)}>{lines.map((s,k)=><Ink key={s} x={x} y={399+j*138+24*(k-(lines.length-1)/2)} size={s==='MIT'?51:20} color={i===2?gold:i===0?'#d2ccbc':pale}>{s}</Ink>)}</g>)}
  </g>)}
  {id==='license-proof'&&<rect x="12" y="180" width="624" height="590" fill="#14130f" opacity=".24"/>}
 </svg>;
}

function Wire({d,opacity=1,p=1,w=2.4,arrow=false}:{d:string;opacity?:number;p?:number;w?:number;arrow?:boolean}){
 return <path d={d} fill="none" stroke={gold} strokeWidth={w} opacity={opacity} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-p} markerEnd={arrow&&p>.97?'url(#final-tip)':'none'}/>;
}
function Tip(){return <defs><marker id="final-tip" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0 0L5 2.5 0 5Z" fill={gold}/></marker></defs>;}
function Section({x=35,y,num,children}:{x?:number;y:number;num:number;children:React.ReactNode}){
 return <><Badge x={x} y={y-15} w={29} h={29} bg={gold}>{num}</Badge><Ink x={x+37} y={y} anchor="start" color={gold} size={22}>{children}</Ink></>;
}
const industry=[['CATL 宁德时代','电池','#153476',112],['GEELY','造车','#234d89',112],['Midea','家电','#0089a9',92],['美团','外卖','#302619',80]] as const;
const investors=[['Tencent 腾讯','腾讯','#1457a1',17402],['NetEase','网易','#a53232',17468],['IDG Capital','IDG资本','#a93025',17550],['Legend Capital','君联资本','#176049',17566]] as const;
function DeepSeek({y,w=192,h=62}:{y:number;w?:number;h?:number}){return <Badge x={324-w/2} y={y} w={w} h={h} size={33}>deepseek</Badge>;}
export const isInvestment=(id:string)=>id==='investor-network'||id==='industry-wall';
export function Investment({f}:{f:number}){
 const exit=1-reveal(f,17656,22);
 return <>
  <svg data-layer="investor-map" width={648} height={1152} style={svgStyle} opacity={reveal(f,17346,15)*exit}>
   <Tip/>
   <rect x={202} y={178} width={244} height={42} rx={2} fill="#252117" stroke="#625338"/>
   <Ink x={324} y={198} size={21}>第二轮投资方 · <tspan fill={gold}>据报道</tspan></Ink>
   <Wire d="M175 327L274 376" arrow/><Wire d="M470 327L374 376" arrow/>
   {['M174 496L278 438','M467 496L367 438','M284 562H309V438','M364 562H339V438'].map(d=><Wire key={d} d={d} opacity={.76} arrow/>)}
   {['M103 667H26V408H192','M249 668V633H315V439','M397 668V633H328V439','M545 668H620V628'].map((d,i)=><Wire key={d} d={d} p={reveal(f,investors[i][3],28)} opacity={.94} w={4} arrow={i<3}/>)}
   <Section y={239} num={1}>芯片</Section>
   {[['石溪资本','兆易创新背后','存储芯片'],['中芯聚源','中芯国际旗下','芯片制造']].map(([name,sub,tag],i)=><g key={name} transform={`translate(${i*300} 0)`}>
    <rect x={35} y={260} width={279} height={66} rx={3} fill="#302c24" stroke="#50483a"/>
    <Ink x={53} y={281} anchor="start" size={24}>{name}</Ink><Ink x={53} y={310} anchor="start" size={17} color="#b0a899">{sub}</Ink>
    <Ink x={173} y={342} size={17} color={gold}>{tag}</Ink>
   </g>)}
   <DeepSeek y={377}/>
   <Section y={465} num={2}>产业</Section>
   {industry.map(([name,tag,c,w],i)=>{const x=35+i%2*300,y=493+Math.floor(i/2)*67;return <g key={name}>
    <rect x={x} y={y} width={279} height={55} rx={3} fill="#302c24" stroke="#51493b"/>
    <Badge x={x+13} y={y+9} w={w+27} h={37} color={c} size={18}>{name}</Badge><Ink x={x+177} y={y+27} anchor="start" size={22}>{tag}</Ink>
   </g>})}
   <Section y={641} num={3}>互联网与投资机构</Section>
   {investors.map(([brand,name,c,a],i)=>{const x=35+i*147.5;return f>=a&&<g key={name} opacity={reveal(f,a,14)}>
    <rect x={x} y={670} width={133} height={77} rx={3} fill="#262217" stroke={gold}/>
    <Badge x={x+10} y={675} w={113} h={35} color={c} size={brand.length>12?13:15}>{brand}</Badge><Ink x={x+66.5} y={731} size={19}>{name}</Ink>
   </g>})}
   <Ink x={324} y={895} size={13} color="#aba394" weight={600}>名单据媒体、工商变更报道整理 · 连线不表示直接持股</Ink>
  </svg>
  {f>=17662&&<div data-layer="investor-wall" style={{position:'absolute',left:38,top:240,width:572,height:472,transform:'rotate(-5deg)',overflow:'hidden',opacity:reveal(f,17662,14)}}>
   <Art asset="catl" b={[0,81,572,219]} label="宁德时代官网资料画面" fit="cover" look="field" opacity={reveal(f,17673,20)}/>
   <Evidence id="stcn-investors" b={[40,118,490,152]} f={f} start={17673} compact mode="ink"/>
   <svg width={572} height={472} style={svgStyle}>
    {['中芯国际','兆易创新'].map((name,i)=>{const x=i*288;return <g key={name} opacity={reveal(f,17662+i*5,13)}><rect x={x} y={0} width={284} height={80} fill="#302a1d" stroke="#74603d"/><Ink x={x+142} y={39} color={gold} size={23}>{name}</Ink></g>})}
    {investors.map(([brand,name,c],i)=>{const x=i%2*288,y=300+Math.floor(i/2)*86;return <g key={name} opacity={reveal(f,17711+i*5,20)}><rect x={x} y={y} width={284} height={82} fill="#e7e1d3"/><Ink x={x+142} y={y+33} color={c} size={25}>{brand}</Ink><Ink x={x+142} y={y+61} color={ink} size={15}>{name}</Ink></g>})}
    <rect width="572" height="472" fill="#12100a" opacity={.57*reveal(f,17882,32)}/>
   </svg>
  </div>}
 </>;
}

export const isIndustry=(id:string)=>['compute-tree','deepinfer','industry-grid','industry-media'].includes(id);
export const hasIndustryRibbons=(id:string,f:number)=>id==='industry-media'||id==='industry-grid'&&f>=20588;
export function IndustryChart({id,f}:{id:string;f:number}){
 if(hasIndustryRibbons(id,f))return <div data-layer="industry-ribbons" style={svgStyle}>
  {(['catl-company','自主应用场景','自主应用场景','自主应用场景'] as const).map((file,i)=>{const a=[20576,20601,20687,20755][i],p=reveal(f,a,24),y=174+i*150;return f>=a&&<div key={i} style={{position:'absolute',left:0,top:y,width:648,height:146,overflow:'hidden',opacity:p,clipPath:`inset(0 0 ${100*(1-p)}% 0)`}}>
   <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(116deg,#231e16 0 42px,#282216 42px 84px)',borderBottom:'1px solid #78613b'}}/>
   {i===0&&<Art asset="catl" b={[0,0,648,146]} label="宁德时代官网资料背景" fit="cover" look="dark"/>}
   <svg width={648} height={146} style={svgStyle}>
     <Ink x={40} y={53} size={15} color={gold} anchor="start">0{i+1} / 可能的落地场景</Ink>
     <Badge x={36} y={70} w={i<2?218:152} h={39} color={industry[i][2]} size={i<2?22:19}>{industry[i][0]}</Badge>
     <Ink x={609} y={86} size={33} anchor="end">{['电池研发','汽车','家电','外卖'][i]}</Ink>
   </svg>
  </div>})}
  <svg width={648} height={1152} style={svgStyle}><Ink x={324} y={895} size={13} color="#aba394" weight={600}>示意图 · 不代表已签约、部署或行业排名</Ink></svg>
 </div>;
 const apply=f>=20417;
 const grid=reveal(f,20466,16)*(1-reveal(f,20574,18));
 const fade=1-reveal(f,20402,27);
 const blocked=reveal(f,19863,14)*(1-reveal(f,20196,20));
 return <svg data-layer="industry-chart" width={648} height={1152} style={svgStyle}>
  <Tip/>
  <g opacity={apply?1-.88*reveal(f,20574,18):reveal(f,19743,12)}><DeepSeek y={245}/></g>
  {id==='industry-grid'?<g opacity={grid}>{[0,1,2,3].map(i=>{const x=32+i%2*302,y=331+Math.floor(i/2)*183;return <g key={i}><rect x={x} y={y} width={281} height={162} rx={3} fill="#2c2720" stroke="#5d5036"/><Ink x={x+140} y={y+81} color={gold} size={35}>?</Ink></g>})}</g>:<g opacity={fade}>
   <Ink x={324} y={351} size={19} color={gold}>国产算力链</Ink>
   {([['华为昇腾','芯片',19870],['中芯国际','制造',20041],['兆易创新','存储',20093],['DeepInfer','推理软件',20200]] as const).map(([name,role,a],i)=>{const x=34+i%2*306,y=384+Math.floor(i/2)*74,p=reveal(f,a,15);return <g key={name}>
    <Wire d={`M324 361V${y+25}H${i%2?x:x+274}`} p={p} opacity={p*.72} arrow/>
    <rect x={x} y={y} width={274} height={53} rx={3} fill="#2c2820" stroke={p>.5?'#8c7444':'#514634'}/>
    {p<1&&<g opacity={1-p}><Ink x={x+137} y={y+27} size={25} color="#b09b6a">?</Ink></g>}
    {p>0&&<g opacity={p}><Ink x={x+15} y={y+27} anchor="start" size={24}>{name}</Ink><Ink x={x+255} y={y+27} anchor="end" size={17} color={gold}>{role}</Ink></g>}
   </g>})}
   <g opacity={1-reveal(f,19855,18)}><Ink x={324} y={600} size={37}>把国产算力</Ink><Ink x={324} y={650} size={37} color={gold}>这条路走通</Ink></g>
   <g opacity={blocked}><Badge x={305} y={518} w={38} h={38} bg="#e06350" size={28}>×</Badge><rect x={145} y={556} width={358} height={49} fill="#2c2820" stroke="#5c4c35"/>
    <Ink x={324} y={581} size={24}>英伟达高端芯片</Ink><Ink x={324} y={626} color="#ed7564" size={20}>美国限制对华出口</Ink>
    <g opacity={reveal(f,19942,14)}><Ink x={324} y={669} size={24} color={gold}>→ 那就用昇腾跑模型</Ink></g>
   </g>
   <g opacity={reveal(f,20203,18)*(1-reveal(f,20344,14))}><Badge x={135} y={546} w={391} h={74} size={23}>deepseek-ai / DeepInfer</Badge></g>
   <g opacity={reveal(f,20244,14)}><Ink x={324} y={639} size={18}>10 月开源 · 推理框架</Ink></g>
   <g opacity={reveal(f,20325,20)}><Badge x={129} y={660} w={390} h={45} size={21}>Huawei Ascend 950 NPUs</Badge><Ink x={324} y={727} size={21} color={gold}>官方仓库列为支持硬件</Ink></g>
  </g>}
 </svg>;
}

export const isEnding=(id:string)=>['ban-company','verdict','closing'].includes(id);
function FileIcon({x,y,s=1,tint=gold}:{x:number;y:number;s?:number;tint?:string}){
 return <g transform={`translate(${x} ${y}) scale(${s})`} stroke={tint} strokeWidth={2} strokeLinejoin="round" fill="none"><path d="M-21 28V-28H10L21-17V28Z" fill="#252015"/><path d="M10-28v11h11 M-14 -3h27 M-14 6h28 M-14 15h20"/><path d="M-14-16h12" strokeWidth="4" strokeLinecap="round"/></g>;
}
const endpoints=[[-113,-47],[-87,-22],[-46,30],[-119,-73],[35,-83],[75,-40],[106,-65],[96,13],[121,-11],[82,66],[7,75],[21,117]];
function FileNetwork({x=324,y,s=1,f}:{x?:number;y:number;s?:number;f:number}){
 const drift=f>=24509&&f<24679?Math.sin(Math.PI*(f-24508)/171)**2:0;
 return <g transform={`translate(${x} ${y}) scale(${s})`}>
  <circle r={151} fill="#242018" fillOpacity=".4" stroke="#706044" strokeOpacity=".28" strokeWidth="11"/>
  <circle r={142} fill="#161511" stroke="#8a7448" strokeOpacity=".31"/>
  {Array.from({length:166},(_,i)=>{const a=i*2.399963,r=Math.sqrt((i+.5)/166)*139;return <circle key={i} cx={Math.cos(a)*r} cy={Math.sin(a)*r} r={i%7===0?1.31:.74} fill={i%7===0?pale:gold} opacity={i%7===0?.46:.29}/>})}
  {endpoints.map(([baseU,baseV],i)=>{
   const p=reveal(f,23548+i*3,20), angle=drift*(.10+i%3*.035)*(i%4===0?-.7:1);
   const u=drift?baseU*Math.cos(angle)-baseV*Math.sin(angle):baseU;
   const v=drift?baseV*Math.cos(angle)+baseU*Math.sin(angle):baseV;
   return <g key={i} opacity={p}><Wire d={`M0 0Q${u*.76-v*.25} ${v*.09+u*.16} ${u} ${v}`} w={1.3} p={p} opacity={.88}/><circle cx={u} cy={v} r={3} fill="#e9ca80"/><FileIcon x={u} y={v-10} s={.22+i%3*.035}/></g>;
  })}
  <FileIcon x={0} y={0}/><Ink x={112} y={115} color="#b3a68b" size={11} weight={600}>示意</Ink>
 </g>;
}
export function EndingVisual({f}:{f:number}){
 const split=reveal(f,23572,36),phase=reveal(f,23660,32);
 const stage=f<23874?1-.83*phase:f<24402?.17*(1-reveal(f,23970,218)):reveal(f,24402,29)*.72;
 const y=f>=24402?632:469+140*split;
 return <svg data-layer="ending-mark-and-file-network" width={648} height={1152} style={svgStyle}>
  {f<23909&&<g opacity={split*(1-.87*phase)*(1-reveal(f,23874,35))} transform={`translate(324 ${350-66*split}) scale(${.77+.23*split})`}>
   <circle r={113} fill="#512720" fillOpacity=".19" stroke="#f16451" strokeWidth="3.5" style={{filter:'drop-shadow(0 0 7px #e34a3b88)'}}/>
   <FileIcon x={0} y={-24} s={1.28} tint="#8b7750"/><path d="M-38 2L37-50" stroke="#e0604e" strokeWidth="5" strokeLinecap="round"/>
   <Ink x={0} y={46} size={26} color="#ee6754">联邦系统</Ink>
  </g>}
  <g opacity={stage*reveal(f,23543,24)}><FileNetwork y={y} s={f>=24402?.90:1.42-.42*split} f={f}/></g>
 </svg>;
}

