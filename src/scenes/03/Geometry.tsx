import React from 'react';
export const gold='#dcb15d', pale='#f3eee0', dim='#a8a08d', red='#cc5146';
export const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export const ramp=(t:number,a:number,d=.34)=>1-(1-clamp((t-a)/d))**3;
export const type='"PingFang SC", "Noto Sans CJK SC", "Heiti SC", sans-serif';
export function Geometry({id,kind,t}:{id:string;kind:string;t:number}){
 const seg=(x:number,y:number,X:number,Y:number,a=0,c=gold,w=2,o=1)=><line x1={x} y1={y} x2={x+(X-x)*ramp(t,a,.48)} y2={y+(Y-y)*ramp(t,a,.48)} stroke={c} strokeWidth={w} opacity={o*ramp(t,a,.12)}/>;
 const box=(x:number,y:number,w:number,h:number,a=0,o=.7,fill='#27231a',stroke='#6c562f',r=3)=><rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} opacity={ramp(t,a)*o}/>;
 const text=(word:string,x:number,y:number,size:number,a=0,c=pale,align:'middle'|'start'='middle',o=1)=><text x={x} y={y+size*.34+7*(1-ramp(t,a))} fontFamily={type} fontWeight={size>30?800:700} textAnchor={align} fontSize={size} fill={c} opacity={ramp(t,a)*o}>{word}</text>;
 const node=(x:number,y:number,a:number,active:boolean)=><g>{box(x-12,y-12,24,24,a,1,active?gold:'#211e16',gold,3)}{active&&<rect x={x-11} y={y-11} width={22} height={22} rx={3} fill={gold} opacity={.42*ramp(t,a)} style={{filter:'blur(8px)'}}/>}</g>;
 const arrow=(x:number,y:number,X:number,Y:number,a:number,o=1)=><g>{seg(x,y,X,Y,a,gold,2,o)}<path d={`M${X-10} ${Y-5} L${X} ${Y} L${X-10} ${Y+5}`} fill="none" stroke={gold} opacity={ramp(t,a+.29)*o} transform={`rotate(${Math.atan2(Y-y,X-x)*180/Math.PI} ${X} ${Y})`}/></g>;
 const code=(x:number,y:number,w:number,h:number,a:number)=><>{box(x,y,w,h,a,.96,'#f3f0e7','#f3f0e7',4)}{text('deepseek',x+w/2,y+h/2,Math.min(32,h*.52),a,'#25211a')}</>;
 const pattern=(cx:number,cy:number,n:number,a:number)=>Array.from({length:n},(_,i)=>{
   const th=i*2.399963+t*.075, rad=18+Math.sqrt(i/n)*202;
   return <circle key={i} cx={cx+Math.cos(th)*rad} cy={cy+Math.sin(th)*rad} r={i%9===0?2.15:.85} fill={i%5===0?pale:gold} opacity={(i%9===0?.69:.32)*ramp(t,a+(i%13)*.045)}/>;
 });
 let view:React.ReactNode=null;
 if(kind==='rail-horizontal'){
  view=<>{seg(113,362,542,362,0,gold,2,.7)}{[135,324,512].map((x,i)=><g key={x}>{node(x,362,[0,4.9,10.4][i],t>=[0,4.9,10.4][i]&&t<([4.9,10.4,99][i]))}</g>)}{t>=5.8&&<g opacity={ramp(t,5.8)*(1-.72*ramp(t,10.4))}>{[565,600,638,676].map(y=><g key={y}>{seg(31,y,614,y,5.8,'#433927',1,.68)}</g>)}<path d="M65 605 C130 545 179 611 223 610 S292 649 332 617 S392 608 432 619 S501 544 568 603" fill="none" stroke={gold} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1-ramp(t,6.15,2.1)}/>{[[135,588,red],[229,612,'#65bf9f'],[328,616,red],[420,623,'#65bf9f'],[529,582,red]].map(([x,y,c],i)=><circle key={i} cx={x} cy={y} r="9" fill={String(c)} opacity={ramp(t,6.4+i*.48)}/>)}</g>}</>;
 }
 if(kind==='rail'){
  if(id==='origin-rail'){view=<>{seg(237,112,237,751,0,gold,2,.75)}{[202,364,528,665].map((y,i)=><g key={y}>{node(237,y,i===0?0:i*1.35,t>=i*1.35&&t<(i+1)*1.35)}</g>)}</>;}
  if(id==='origin-recap'){view=<>{seg(237,170,237,652,0,gold,2,.76)}{[185,238,284,337,407,470,543].map((y,i)=><g key={y}>{node(237,y,i*.07,i===6)}</g>)}{seg(185,181,185,371,1.78,gold,2,.75)}{seg(209,290,209,391,3.5,gold,2,.75)}</>;}
  if(id==='ban-rail'){view=<>{seg(120,354,120,745,.65,gold,2,.69)}{[377,430,486,542,598,654].map((y,i)=><g key={y}>{node(120,y,[1.4,4.1,4.7,5.4,6.05,7.4][i],i===0||i===5)}</g>)}</>;}
 }
 if(kind==='bar'){
  if(id==='gpu-money')view=<>{seg(65,146,65,452,0,gold,2,.70)}{t>7.5&&<rect x="233" y={705-181*ramp(t,7.7,1.85)} width="182" height={181*ramp(t,7.7,1.85)} fill={gold} opacity=".36"/>}</>;
  if(id==='low-cost')view=<>{box(83,162,179,44,.3,.75)}{box(47,627,550,55,3.05,.65,'#231f17','#524a39')}{<rect x="47" y="627" width={550*ramp(t,3.25,1.92)} height="54" fill="#b2a58e" opacity=".62"/>}</>;
 }
 if(kind==='funding'){
  const rows=['OpenAI · Anthropic','千问 · 豆包','Kimi · MiniMax','DeepSeek'];
  let active=id==='funding-map'?0:id==='funding-map-two'?1:id==='funding-map-three'?3:4;
  view=<>{rows.map((word,i)=>{const y=182+i*114;return <g key={word} opacity={i===active-1||i===3?1:.65}>{box(380,y,229,93,.03+i*.13,.93,'#27251e',i===3&&active===4?gold:'#474030')}{text(word,492,y+64,i===0?22:25,.12+i*.13,i===3?gold:pale)}{i<active&&i<3?arrow(162,y+31,371,y+31,.2+i*.24):<g opacity={ramp(t,.05+i*.14)}><circle cx="114" cy={y+44} r="35" fill="none" stroke="#6e6245"/>{text('?',114,y+44,33,.07+i*.14,dim)}</g>}</g>})}{active===4&&arrow(209,559,371,559,1.13)}</>;
 }
 if(kind==='comparison'){
  const main=id.startsWith('license');const active=id.endsWith('final')?2:id.endsWith('return')?2:ramp(t,5)>0?1:0;
  view=main?<>{[127,294,459].map((x,i)=><g key={x}>{box(x,126,151,551,i*.10,.65,i===2?'#2d2517':'#1c1c17',i===active?gold:'#63583d',2)}{[246,388,529].map(y=><g key={y}>{seg(x+8,y,x+143,y,0,'#77654a',1,.38)}</g>)}</g>)}</>:<>{code(218,228,217,62,0)}{[0,1,2,3].map(i=><g key={i}>{box(46+i%2*291,330+Math.floor(i/2)*145,266,119,.16+i*.06,.68)}{text('?',179+i%2*291,391+Math.floor(i/2)*145,38,.26+i*.06,gold)}</g>)}</>;
 }
 if(kind==='tree'){
  const compute=id==='compute-tree'||id==='deepinfer', invest=id==='source-investors'||id==='investor-network'||id==='control';
  if(compute||invest){
    const y=compute?236:id==='control'?330:373, rowY=compute?395:213;
    view=<>{code(219,y-28,210,57,0)}{[0,1,2,3].map(i=>{const x=42+i%2*290, yy=rowY+(compute?Math.floor(i/2)*67:Math.floor(i/2)*365);const a=id==='deepinfer'?i*.1:id==='compute-tree'?[1.15,3.35,5.55,7.7][i]:id==='investor-network'?[.1,.35,.6,.92][i]:id==='control'?[6,6,2.0,1.4][i]:[3.55,5.7,12,12][i]; return <g key={i}>{box(x,yy,273,49,a,.78,'#2a251a',gold)}{seg(324,y+(yy>y?29:-29),x+136,yy+(yy>y?0:50),a-.08,gold,2,.86)}</g>})}{compute&&t>=1.05&&id!=='deepinfer'&&<g>{box(309,511,30,30,1.05,1,red,red)}{text('×',324,526,31,1.05,'#292119')}</g>}</>;
  } else if(id==='api-tree') view=<>{arrow(293,321,171,375,.36)}{arrow(355,321,478,375,.66)}{box(35,373,252,82,.42)}{box(350,373,252,82,.67)}{[52,111,166,223,277].map((x,i)=><g key={x}>{seg(161,458,x,533,1.25+i*.08,gold,2,.65)}<circle cx={x} cy="550" r="12" fill={gold} opacity={ramp(t,1.4+i*.09)*.72}/></g>)}</>;
  else view=<>{arrow(324,319,324,383,.35)}{seg(324,383,154,430,.5)}{seg(324,383,492,430,.62)}{arrow(154,499,154,570,.9)}{arrow(492,499,492,570,1.1)}</>;
 }
 if(kind==='network'){
  const center=id==='network'?[324,426]:[324,441];const [x,y]=center; const orbit=[104,156,214];
  view=<>{pattern(x,y,id==='network'?174:120,.1)}{orbit.map((r,i)=><circle key={r} cx={x} cy={y} r={r} fill="none" stroke={gold} opacity={ramp(t,i*.17)*(.21-i*.04)} strokeDasharray={i===0?'2 5':'none'}/>)}{Array.from({length:id==='network'?5:8},(_,i)=>{let a=.45+i*.99, xx=x+Math.cos(a)*205, yy=y+Math.sin(a)*189;return <g key={i}>{seg(x,y,xx,yy,.36+i*.16,gold,1.5,id==='network'?.75:.3)}<circle cx={xx} cy={yy} r={i%2?2.6:3.4} fill={gold} opacity={ramp(t,.62+i*.16)}/></g>})}{id==='network'&&<circle cx={x} cy={y} r={40*ramp(t,.2)} fill={pale}/>}</>;
 }
 if(kind==='stamp'){view=<>{[117,147,178].map((r,i)=><circle key={r} cx="324" cy="625" r={r*(1.18-.18*ramp(t,.48+i*.13))} fill={i===0?'#552a1b':'none'} fillOpacity=".43" stroke={red} strokeWidth={i===0?3:1} strokeDasharray={i===1?'2 6':undefined} opacity={ramp(t,.48+i*.13)*(.83-i*.25)}/>)}</>;}
 if(kind==='document'){view=<g opacity={ramp(t,.12,.55)} transform={`translate(324 ${393+20*(1-ramp(t,.12,.55))}) scale(${.82+.18*ramp(t,.12,.55)})`}><path d="M-47 60V-66h63l31 31v95z M16 -66v31h31 M-31 -14h62 M-31 5h51 M-31 23h43" fill="#2a2010" stroke={gold} strokeWidth="3" strokeLinejoin="round"/><path d="M-31 -43h28" stroke={gold} strokeWidth="8"/><circle r="123" fill="none" stroke="#8a6e3a" opacity=".34"/></g>;}
 if(kind==='quote'){view=<>{box(34,264,580,id==='talent-quote'?295:358,.07,.87,'#2b261d','#433b2e',2)}{text('“',98,313,88,.2,gold,'middle',.32)}</>;}
 if(kind==='chapter'||kind==='agenda'){view=<>{(kind==='chapter'?[321,560]:[367,507,644]).map((y,i)=><g key={y}>{seg(kind==='chapter'?212:47,y,kind==='chapter'?437:603,y,i*.22,gold,1,.32)}</g>)}</>;}
 if(!view)return null;
 return <svg aria-label={`${kind} geometry`} width="648" height="1152" style={{position:'absolute',inset:0,overflow:'hidden'}}>{view}</svg>;
}
