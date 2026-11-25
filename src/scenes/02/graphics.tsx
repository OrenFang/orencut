import React from 'react';
import {B,F,GOLD,INK,Rect,T,Style,enter,interpolateKeys,mix,pretty,smooth} from './core';
import {FilmClip,Photo,PhotoId} from './media';
import publicData from './publicData.json';

const C=720,D=405;
const WARM='#211e17', SOFT='#f5e9bf', MUTED='#aaa28f';
const safeLabels=['城市实景','产业空间','数据中心','能源基础设施','市场观察','硅片制造','生产线','市场交易'];
const cardPhotos:PhotoId[]=['city','factory','datacenter','energy','trading','lab','industrial','trading','landscape','press','speaker'];
export type GraphicKind='gold'|'yield'|'tracks'|'cash'|'rank'|'map'|'network'|'capital'|'price';
export type TileKind=GraphicKind|PhotoId;
type MotionUnderlay={start:number;end:number;trim:number};

const gridStyle:Style={backgroundImage:'linear-gradient(#e8c07210 1px,transparent 1px),linear-gradient(90deg,#e8c07210 1px,transparent 1px)',backgroundSize:'28px 28px'};
type MarginBill = {profit:number;framing:number;phase:number};
function Field({x,y,w,h,r=10,children,style}:Rect&{r?:number;children:React.ReactNode;style?:Style}){
 return <B x={x} y={y} w={w} h={h} style={{background:WARM,borderRadius:r,overflow:'hidden',...style}}><B x={0} y={0} w={C} h={D} style={{transformOrigin:'0 0',transform:`scale(${w/C},${h/D})`,color:'#fff4dc'}}>{children}</B></B>;
}
function TopLine({topic='这笔钱，先落到了谁手里？',tag='原片图解复述 · 非实时数据'}:{topic?:string;tag?:string}){
 return <><B x={0} y={0} w={C} h={46} style={{background:'linear-gradient(90deg,#1d1d1cdb,#3d38357a)',borderLeft:`4px solid ${GOLD}`}}/><T x={17} y={8} size={19} weight={900} face="body">{topic}</T><T x={17} y={30} color="#cfbd9c" size={9} face="body">{tag}</T></>;
}
function GoldBlock({x,top,base,w=105,f,at=0,muted=false}:{x:number;top:number;base:number;w?:number;f:number;at?:number;muted?:boolean}){
 const h=(base-top)*enter(f,at,at+20);
 return <B x={x} y={base-h} w={w} h={h} style={{background:muted?'linear-gradient(110deg,#615c4a,#887b5b)':'linear-gradient(106deg,#c99d4c,#eac777 47%,#d5a94a)',boxShadow:muted?'inset 0 0 0 1px #94898587':'inset 0 0 0 1px #f6d185ad,0 0 35px #9e732c49'}}><div style={{width:'100%',height:'100%',...gridStyle}}/></B>;
}
function MapArt({f,drill=false}:{f:number;drill:boolean}){
 const v=drill?smooth(f,12,68):0;
 const s=mix(1,2.7,v), tx=mix(0,-822,v),ty=mix(0,-142,v);

 const pinX=603,pinY=151;
 return <svg viewBox="0 0 720 405" width={C} height={D} style={{background:'#080d1b',position:'absolute'}}>
  <defs><linearGradient id="ft1002-map-land" x2="75%" y2="90%"><stop stopColor="#222d53"/><stop offset="65%" stopColor="#101933"/><stop offset="100%" stopColor="#3a3551"/></linearGradient></defs>
  <g transform={`translate(${tx} ${ty}) scale(${s})`}>
   {[65,128,191,254,317,380].map(n=><path key={n} d={`M0 ${n}H720`} stroke="#272e4d" strokeWidth=".65"/>)}
   {[72,144,216,288,360,432,504,576,648].map(n=><path key={n} d={`M${n} 0V405`} stroke="#272e4d" strokeWidth=".65"/>)}
   <path d={publicData.mapPath} fill="url(#ft1002-map-land)" stroke="#6a719456" strokeWidth=".55"/>
   {[[150,99],[205,122],[201,95],[162,105],[68,109],[294,259],[261,272],[363,82],[377,89],[388,106],[415,146],[448,146],[505,141],[511,159],[562,155],[575,172],[600,143],[621,116],[635,140],[648,320],[359,155],[381,255],[586,132]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={5+(i%3)} fill="#bcac5933"/><circle cx={x} cy={y} r={.75+(i%3)*.25} fill="#eee2a5"/></g>)}
   {drill&&<g opacity={enter(f,10,33)}><circle cx={pinX} cy={pinY} r={20-10*v} fill="none" stroke="#d9b45c" strokeWidth={.8}/><circle cx={pinX} cy={pinY} r={7} fill="#d9b45c57"/><circle cx={pinX} cy={pinY} r={2.4} fill="#ffe9ae"/><text x={pinX+7} y={pinY+3} fill="#fff2c5" fontSize={9} fontFamily={F.body}>台北</text></g>}
  </g>
 </svg>;
}
function YieldArt({f}:{f:number}){
 const y0=316,lo=4,hi=4.9;
 const points=publicData.yields.map(([_,v],i)=>[66+i*4.86,y0-(Number(v)-lo)/(hi-lo)*207]);
 const path='M'+points.map(([x,y])=>`${x.toFixed(2)},${y.toFixed(2)}`).join('L');
 return <><B x={0} y={0} w={720} h={405} style={{background:'linear-gradient(118deg,#242523,#101212 77%)'}}/><TopLine topic="美国 10 年期国债收益率" tag="Federal Reserve / FRED · DGS10 · 2025 年 1–6 月"/>
 <svg width={720} height={405} viewBox="0 0 720 405" style={{position:'absolute',inset:0}}>
  {[4,4.2,4.4,4.6,4.8].map(v=>{const y=y0-(v-lo)/(hi-lo)*207;return <g key={v}><line x1="66" y1={y} x2="663" y2={y} stroke="#a8acac30"/><text x="27" y={y+4} fill="#b5b2a9" fontSize="12" fontFamily={F.code}>{v.toFixed(1)}%</text></g>;})}
  <path d={`${path}L${points[points.length-1][0]} ${y0}H66Z`} fill="#79be6d16"/>
  <path d={path} pathLength="1" stroke="#b7db87" strokeDasharray="1" strokeDashoffset={1-enter(f,0,24)} fill="none" strokeWidth="2.3"/>
  {['01','02','03','04','05','06'].map((m,i)=><text key={m} x={66+i*109} y="344" fill="#a8a79f" fontSize="12" fontFamily={F.code}>2025-{m}</text>)}
 </svg><T x={65} y={371} size={12} face="body" color="#c8c3b7">原始观测值（%），空白交易日不填补</T></>;
}
function NetworkArt({f,capital=false,hook=false}:{f:number;capital?:boolean;hook?:boolean}){
 const v=enter(f,4,26), labels=capital?['资金','人才','算力']:['幻方','研究','开源'];
 const nodes=hook?[[105,91],[614,87],[103,310],[615,315],[352,64],[369,348]]:[[190,133],[534,91],[570,267]];
 return <><B x={0} y={0} w={C} h={D} style={{background:'radial-gradient(ellipse at 50% 45%,#2f291e,#141410 75%)',...gridStyle}}/>
 <T x={0} y={30} w={C} align="center" size={24} face="body" weight={900} color={GOLD}>{capital?'资金从哪里来':hook?'技术、资本与产业':'人物关系网'}</T>
 <svg width={C} height={D} viewBox="0 0 720 405" style={{position:'absolute',inset:0}}>{nodes.map(([x,y],i)=><path key={i} d={`M${x} ${y}Q${(x+360)/2} ${y+(i%2?-64:48)} 360 211`} stroke={i%2?'#a8946d':'#dec180'} strokeWidth={i%2?1.3:2} opacity={v} fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-enter(f,7+i*4,20+i*4)}/>)}</svg>
 {nodes.map(([x,y],i)=><B key={i} x={x-44} y={y-17} w={88} h={34} style={{display:'grid',placeItems:'center',borderRadius:22,border:'1px solid #9d865a82',background:'#2a251a',fontFamily:F.body,fontSize:17,color:SOFT,opacity:enter(f,3+i*4,14+i*4)}}>{hook?['算力','产业','资金','硬件','落地','人才'][i]:labels[i]}</B>)}
 <B x={309} y={160} w={102} h={102} style={{borderRadius:52,border:`2px solid ${GOLD}`,background:'radial-gradient(at 30% 0%,#3d365c,#131222)',boxShadow:'0 0 20px #c4a77539',display:'grid',placeItems:'center',fontFamily:F.display,fontSize:capital?29:37,color:'#f8f4ff'}}>{capital?'DS':'梁'}</B>
 <T x={258} y={267} w={204} align="center" color={GOLD} size={24} face="body" weight={900}>{capital?'DeepSeek':hook?'产业结构':'梁文锋'}</T><T x={24} y={371} size={13} face="body" color={MUTED}>关系图解 · 非完整关系或资产披露</T></>;
}
function MarginBillArt({profit,framing,phase}:MarginBill){
 // Reference retains the full 100 through f1738, then starts the split at f1739.
 const paid=phase>=1739, progress=profit*interpolateKeys(phase,[[1738,0],[1740,1]]);
 const costW=140*progress, goldY=162-4*progress;
 const goldX=mix(246+costW,373,framing), goldW=mix(420-19*progress,295,framing);
 const costX=mix(246,275,framing), costEnd=Math.max(0,goldX-costX);
 // The parent field also clips at C; goldW alone overstates the space for the amount.
 const visibleGoldW=Math.min(goldW,C-goldX), amountW=176;
 const amountX=mix(visibleGoldW-amountW-12,(goldW-110)/2-40,framing);
 const fullAmount=paid&&phase<1817;
 const costSize=phase<1817?Math.min(26,Math.floor((costEnd-8)/3.7)):26;
 // Put the grain and the actual gold ramp in a single background-image stack.
 // Spreading gridStyle after a background shorthand silently overrides its ramp.
 const ramp='linear-gradient(#e8c07228 1px,transparent 1px),linear-gradient(90deg,#e8c07228 1px,transparent 1px),linear-gradient(165deg,#f8e0a0,#d9a655 62%,#b8853d)';
 return <div data-ft-bill-gold="segmented" style={{position:'absolute',inset:0}}>
  <B x={0} y={0} w={C} h={D} style={{...gridStyle,backgroundColor:'#242019'}}/>
  <svg viewBox="0 0 720 405" width={C} height={D} style={{position:'absolute',inset:0,opacity:.17}}>{Array.from({length:19},(_,i)=><ellipse key={i} cx={507} cy={256} rx={159+i*3} ry={96+i*2.6} fill="none" stroke="#ebcf7c" strokeWidth="1.2" transform="rotate(-24 507 256)"/>)}<path d="M-10 354L510 -80 M86 420L620 -20" stroke="#a88450" strokeWidth="4"/></svg>
  <TopLine topic="卖 100 块，扣掉成本还剩多少" tag="示例口径 · 数字图解，不代表实际报价或利润预测"/>
  <T x={30} y={177} size={32} color="#fff1c9" face="body" weight={900}>{paid?'英伟达':'你卖的一件货'}</T>
  {paid&&<T x={32} y={219} color={GOLD} size={24} face="body" weight={900} style={{opacity:Math.min(1,progress*3)}}>毛利率 75%</T>}
  {costEnd>0&&<B x={costX} y={170} w={costEnd} h={53} style={{background:'linear-gradient(180deg,#766957,#4d4437)',borderRight:'1px solid #b48c53',overflow:'hidden'}}>{phase>=1740&&<T x={0} y={12} w={costEnd} align="center" size={costSize} face="body" weight={900} style={{opacity:Math.min(1,progress*2)}}>成本 25</T>}</B>}
  <B x={goldX} y={goldY} w={goldW} h={62} style={{backgroundImage:ramp,backgroundSize:'27px 27px,27px 27px,100% 100%',backgroundColor:'#ddb363',boxShadow:'0 4px 14px #0008,inset 0 1px 0 #f9e4a9',overflow:'hidden'}}>
   {fullAmount?<T x={amountX} y={11} w={amountW} align="center" size={34} color="#35250e" face="body" weight={900} style={phase===1739?{opacity:.48}:undefined}>剩余 75 元</T>:
    <T x={paid?mix(310,(goldW-110)/2,framing):16} y={9} size={38} color="#35250e" face="body" weight={900}>{paid?'剩 75':'100 元'}</T>}
  </B>
  {phase>=1710&&phase<1755&&<B x={mix(402,goldX,progress)} y={136} w={0} h={121} style={{borderLeft:'3px dashed #c6594e',opacity:1-progress}}/>}
  <T x={16} y={371} size={13} color={SOFT} face="body">{paid?'原片举例 · 保留成本／剩余关系':'示例 · 单件标价'}</T>
 </div>;
}
function BillArt({f,label='100 元',state=0,price=false,marginBill}: {f:number;label?:string;state?:number;price?:boolean;marginBill?:MarginBill}){
 if(marginBill)return <MarginBillArt {...marginBill}/>;
 const u=enter(f,0,17), cost=state>0?mix(0,158,u):0;
 return <><B x={0} y={0} w={C} h={D} style={{background:'radial-gradient(ellipse at 83% 27%,#55452a,#161813)',...gridStyle}}/>
 <svg viewBox="0 0 720 405" width={C} height={D} style={{position:'absolute',inset:0,opacity:.16}}>{Array.from({length:21},(_,i)=><ellipse key={i} cx={507} cy={256} rx={159+i*3} ry={96+i*2.6} fill="none" stroke="#ebcf7c" strokeWidth="1.2" transform="rotate(-24 507 256)"/>)}<path d="M-10 354L510 -80 M86 420L620 -20" stroke="#a88450" strokeWidth="4"/></svg>
 <TopLine topic={price?'卖 100 块，扣掉成本还剩多少':'卖 100 块，扣掉成本还剩多少'} tag="示例口径 · 数字图解，不代表实际报价或利润预测"/>
 <T x={30} y={184} size={32} color="#fff1c9" face="body" weight={900}>{state===1?'英伟达':state===2?'常见应用':'你卖的一件货'}</T>
 {state>0&&<T x={32} y={224} color={GOLD} size={23} face="body" weight={900}>{state===1?'毛利率 75%':'对照结构'}</T>}
 <B x={242} y={158} w={431} h={68} style={{background:'linear-gradient(180deg,#e9ca7b,#b98b48)',boxShadow:'0 5px 15px #0008',...gridStyle,overflow:'hidden'}}>
  {cost>0&&<B x={0} y={0} w={cost} h={68} style={{background:'#594f3e',borderRight:'1px solid #766043'}}><T x={9} y={18} w={cost-12} align="center" size={25} face="body" weight={900} style={{opacity:u}}>成本 25</T></B>}
  <T x={cost+16} y={10} size={38} color="#2f2515" face="body" weight={900}>{label}</T>
  {state===0&&<T x={294} y={8} size={12} color="#4a3520" face="body">卖出 · 一件货</T>}
 </B><T x={16} y={371} size={13} color={SOFT} face="body">{state?'原片举例 · 保留成本／剩余关系':'示例 · 单件标价'}</T></>;
}
function BarsArt({kind,f,footage}:{kind:'gold'|'tracks'|'rank';f:number;footage?:MotionUnderlay}){
 const rank=kind==='rank', station=kind==='tracks';
 if(rank){const vals=[80,62,55,38,22];return <><B x={0} y={0} w={C} h={D} style={{background:'radial-gradient(ellipse at 75% 40%,#292519,#171710 77%)',...gridStyle}}/><T x={31} y={45} size={34}>排名赛跑</T><T x={31} y={85} size={13} face="body" color={MUTED}>组件示意 · 不代表实际公司排名</T><T x={583} y={35} color={GOLD} size={49} face="body" weight={900}>2024</T>{vals.map((val,i)=>{const p=enter(f,i*3,17+i*3);return <React.Fragment key={val}><T x={33} y={124+i*46} size={15} face="body">{['A 公司','B 公司','C 公司','本期','D 公司'][i]}</T><B x={32} y={145+i*46} w={val*4.1*p} h={13} style={{background:i===3?GOLD:'#807660',boxShadow:'0 3px 10px #0004'}}/><T x={35+val*4.1*p} y={139+i*46} color={SOFT} size={25} face="body" weight={900}>{pretty(val*p)}</T></React.Fragment>})}</>}
 const base=312;
 return <>{footage?<FilmClip id="factory" start={footage.start} end={footage.end} trim={footage.trim} x={0} y={0} w={720} h={405} r={0} tint={.63}/>:<Photo id={station?'industrial':'datacenter'} x={0} y={0} w={720} h={405} r={0} tint={.6}/>}<B x={0} y={51} w={720} h={354} style={{background:'linear-gradient(5deg,#161610bf,#1f1b1600 64%)'}}/>
  <TopLine topic={station?'全球数据中心一年用电':'这笔钱，先落到了谁手里？'} tag="原片举例数值 · 背景为独立配图"/>
  <T x={24} y={65} size={24} color="#fff4d9" face="body" weight={900}>{station?'全球数据中心一年用电':'SK 海力士营业利润'}</T>
  <B x={32} y={base} w={650} h={1} style={{background:'#c1ae7c66'}}/>
  {station?<><GoldBlock x={165} top={229} base={base} f={f} muted w={86}/><GoldBlock x={329} top={135} base={base} f={f} at={7} w={86}/><T x={148} y={197} w={120} align="center" color={SOFT} size={26} face="body" weight={900}>约 4150</T><T x={312} y={102} w={120} align="center" color={GOLD} size={26} face="body" weight={900}>约 9450</T><T x={145} y={326} w={125} align="center" size={21} face="body" weight={900}>2024 年</T><T x={309} y={326} w={125} align="center" size={21} face="body" weight={900}>2030 年</T></>:<><GoldBlock x={423} top={136} base={base} f={f} w={93}/><T x={387} y={97} w={166} align="center" color={GOLD} size={38} face="body" weight={900}>+83.3</T><T x={365} y={322} w={200} align="center" size={19} face="body" weight={900}>2026 Q3 单季</T></>}
  <T x={21} y={375} size={12} color={SOFT} face="body">{station?'引述为原片图例 · 仅展示比较关系':'引用原片可见标注 · 非当前业绩数据'}</T></>;
}
export function Graphic({kind,x,y,w,h,f=90,r=10,style,drill=false,variant=0,footage,marginBill}:Rect&{kind:GraphicKind;f?:number;r?:number;style?:Style;drill?:boolean;variant?:number;footage?:MotionUnderlay;marginBill?:MarginBill}){
 return <Field x={x} y={y} w={w} h={h} r={r} style={style}>{kind==='map'?<MapArt f={f} drill={drill}/>:kind==='yield'?<YieldArt f={f}/>:kind==='network'||kind==='capital'?<NetworkArt f={f} capital={kind==='capital'} hook={variant===3}/>:kind==='cash'||kind==='price'?<BillArt f={f} state={variant} label={variant===1?'剩余 75 元':'100 元'} price={kind==='price'} marginBill={marginBill}/>:<BarsArt kind={kind} f={f} footage={footage}/>}</Field>;
}
const photosOnly = new Set<TileKind>(['city','factory','speaker','energy','datacenter','lab','landscape','press','industrial','trading']);
export function Tile({kind,x,y,w,h,style,r=8,f=90}:Rect&{kind:TileKind;style?:Style;r?:number;f?:number}){
 return photosOnly.has(kind)?<Photo id={kind as PhotoId} x={x} y={y} w={w} h={h} style={style} r={r}/>:<Graphic kind={kind as GraphicKind} x={x} y={y} w={w} h={h} style={style} r={r} f={f}/>;
}
export function Poster({n,x,y,w,h,style,frame=90,r=8}:Rect&{n:number;style?:Style;frame?:number;r?:number}){
 const j=n%cardPhotos.length, ai=n%5===0, caption=safeLabels[j%safeLabels.length];
 const pic=cardPhotos[j];
 return <Field x={x} y={y} w={w} h={h} r={r} style={style}>
  {ai?<Graphic kind={(['cash','rank','capital','yield','tracks'] as const)[Math.floor(n/5)%5]} x={0} y={0} w={C} h={D} f={frame} r={0}/>:<><Photo id={pic} x={0} y={0} w={C} h={D} r={0} tint={pic==='press'?.09:.18}/><B x={0} y={187} w={C} h={218} style={{background:'linear-gradient(transparent,#080807dc 92%)'}}/>
  <T x={30} y={251} size={27} color={GOLD} face="body" weight={900}>独立配图</T><T x={25} y={287} size={56} face="body" weight={900}>{caption}</T><B x={28} y={367} w={59} h={3} style={{background:GOLD}}/></>}
 </Field>;
}
export function ThumbnailWall({x,y,count=15,cols=5,w,h,gap=10,style,f=999,stagger=1,outlined=false}:Rect&{count?:number;cols?:number;gap?:number;style?:Style;f?:number;stagger?:number;outlined?:boolean}){
 return <B x={x} y={y} w={cols*(w+gap)-gap} h={Math.ceil(count/cols)*(h+gap)-gap} style={style}>{Array.from({length:count},(_,i)=>{const u=enter(f,i*stagger,i*stagger+12);return <Poster key={i} n={i} x={i%cols*(w+gap)} y={Math.floor(i/cols)*(h+gap)} w={w} h={h} style={{opacity:u,transform:`translateY(${(1-u)*11}px)`,boxShadow:outlined?'0 0 0 2px #f4e7bb, 0 4px 10px #0808089a':undefined}}/>;})}</B>;
}
export function VersionArt({v,x,y,w,h,style}:Rect&{v:number;style?:Style}){
 const chart=['cash','yield','tracks'] as const;
 if(v===3)return <Photo id="landscape" x={x} y={y} w={w} h={h} style={style} tint={.15}/>;
 if(v===1)return <Field x={x} y={y} w={w} h={h} style={style}><Graphic kind="rank" x={0} y={18} w={362} h={377}/><Graphic kind="yield" x={367} y={25} w={353} h={369}/><TopLine topic="组件试排 · 本片独立替换" tag="版本排布示意 · 不对应原视频样片"/></Field>;
 return <Graphic kind={chart[v]} x={x} y={y} w={w} h={h} style={style} variant={v===0?1:0}/>;
}

export const playValues=[0,514129,990763,1424420,1811454,2150577,2442889,2691441,2900546,3075080,3219940,3339696,3438414,3519604,3586239,3640808,3685378,3721663,3751082,3774811,3793829,3808947,3820845,3830093,3837169,3842477,3846359,3849103,3850957,3852131,3852805,3853133,3853248,3853264] as const;
export const playbackValue=(f:number)=>playValues[Math.max(0,Math.min(playValues.length-1,f))];
