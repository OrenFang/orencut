import React from 'react';
import {Art, Deck, Evidence, Product, SourceNote, slide, xy} from './Media';
import {clamp, dim, gold, pale} from './Geometry';

export function Head({children,x=36,y=184,w=576,h=58,size=31,color=pale,f,start}:{children:React.ReactNode;x?:number;y?:number;w?:number;h?:number;size?:number;color?:string;f:number;start:number}) {
  const p=slide(f,start-1,18);
  return <div data-layer="stage-headline" style={{...xy(x,y,w,h),color,fontSize:size,fontWeight:900,lineHeight:1.12,letterSpacing:'.015em',opacity:p,transform:`translateY(${8*(1-p)}px)`,display:'flex',alignItems:'center',overflow:'hidden'}}>{children}</div>;
}
export function Metric({id,children,x=35,y=320,size=111,unit,f,start,color=gold}:{id:string;children:React.ReactNode;x?:number;y?:number;size?:number;unit:string;f:number;start:number;color?:string}){
  const p=slide(f,start-1,13);
  return <div data-metric={id} data-value={String(children)} style={{...xy(x,y,648-2*x,size*1.13),display:'flex',gap:8,justifyContent:'center',alignItems:'baseline',fontSize:size,fontVariantNumeric:'tabular-nums',fontWeight:950,color,lineHeight:1,opacity:p,transform:`translateY(${(1-p)*10}px)`,whiteSpace:'nowrap'}}>{children}<span style={{fontSize:size*.29,color:pale,fontWeight:800}}>{unit}</span></div>;
}
export function Tag({children,x=36,y=156,f,start,alert=false}:{children:React.ReactNode;x?:number;y?:number;f:number;start:number;alert?:boolean}){
  return <div data-layer="editorial-label" style={{position:'absolute',left:x,top:y,display:'inline-flex',alignItems:'center',gap:9,padding:'5px 8px 5px 0',fontSize:15,letterSpacing:'.11em',fontWeight:800,color:alert?'#ff9482':pale,opacity:.65+.35*slide(f,start,10)}}><i style={{background:alert?'#c95b4b':gold,width:8,height:8}}/>{children}</div>;
}
export function Banner({head,body,x=36,y=650,w=576,alert=false}:{head:string;body:string;x?:number;y?:number;w?:number;alert?:boolean}){
  const base=alert?'#9e3f32':'#d6aa52';
  return <div data-layer="news-strip" style={{...xy(x,y,w,48),display:'flex',background:'#f5efe1',color:'#1c1712',fontWeight:900,boxShadow:'0 9px 24px #0008',fontSize:22,borderRadius:2,overflow:'hidden',alignItems:'stretch'}}><b style={{background:base,color:alert?'#fff6e7':undefined,display:'grid',placeItems:'center',padding:'0 12px',whiteSpace:'nowrap',fontSize:17}}>{head}</b><div style={{display:'flex',alignItems:'center',minWidth:0,padding:'0 13px',lineHeight:1.06}}>{body}</div></div>;
}
export function OpeningBanStrip({f}:{f:number}){
  if(f<29||f>=148)return null;
  const redWidth=f<37?[2,4,7,11,17,24,45,74][f-29]:74;
  const stripWidth=74+418*slide(f,36,12);
  const showSource=slide(f,32,6);
  return <div data-layer="opening-ban-strip" style={xy(36,654,492,76)}>
    <div style={{display:'flex',width:stripWidth,height:49,overflow:'hidden',boxShadow:'0 4px 13px #0005'}}>
      <div style={{width:redWidth,overflow:'hidden',flexShrink:0,background:'linear-gradient(120deg,#f34221,#d82712)'}}>
        <div style={{width:74,height:49,display:'grid',placeItems:'center',color:'#fff5eb',fontSize:24,fontWeight:950}}>禁令</div>
      </div>
      {f>=37&&<div style={{width:418,padding:'0 13px',flexShrink:0,display:'flex',alignItems:'center',
        boxSizing:'border-box',whiteSpace:'nowrap',background:'#f8f4ea',color:'#100f0e',fontSize:23,fontWeight:950}}>
        DeepSeek 被写进美国联邦禁令
      </div>}
    </div>
    <div data-layer="source-note" style={{height:24,width:Math.max(74,376*slide(f,36,13)),overflow:'hidden',
      boxSizing:'border-box',whiteSpace:'nowrap',display:'flex',alignItems:'center',padding:'0 8px',
      opacity:showSource,background:'#11100eea',color:'#f3e7d2',fontSize:13,fontWeight:700}}>
      <span style={{width:66,flexShrink:0}}>国土安全</span><span>· 联邦民用机构 · 联邦公报 2026-21447 · 2026-10-20</span>
    </div>
  </div>;
}
const lines=(y:number,w:number)=>({position:'absolute' as const,top:y,left:36,width:w,height:1,background:'#6e5731'});
const first=[['梁文锋',200],['腾讯',100],['宁德时代体系',50],['其他（差额）',160]] as const;
export function FundingRound({f,start,second=false}:{f:number;start:number;second?:boolean}){
  const a=second?16190:15583, p=slide(f,a,second?74:170), value=second?1000:510;
  const shares=first.map(([,n])=>n);
  return <div data-layer="funding-rounds">
    <Tag f={f} start={start} y={190}>{second?'2026 年 10 月 · 第二轮':'2026 年 6 月 · 第一轮'} · 媒体报道</Tag>
    <Metric id={second?'second-round-cny':'first-round-cny'} x={36} y={245} size={111} f={f} start={a} unit="亿元人民币">{`≈${Math.round(value*p)}`}</Metric>
    <div style={lines(367,576)}/>
    {second?<>
      <Head f={f} start={16310} y={409} size={27} color={dim}>投前估值 · 媒体口径</Head>
      <Metric id="round-two-pre-money-cny" f={f} start={16310} y={465} size={76} unit="亿元人民币">{`≈${Math.round(5000*slide(f,16310,51))}`}</Metric>
      <Evidence id="reuters-round2" b={[36,597,576,147]} f={f} start={16205} compact/>
      <SourceNote>本轮约千亿，不是两轮累计、不等于已逐笔到账。</SourceNote>
    </>:<>
      <div style={{...xy(36,400,576,50),background:'#282218',border:'1px solid #6a532e',overflow:'hidden',display:'flex'}}>{first.map(([l,n],j)=><div key={l} style={{width:576*shares[j]/510,background:['#dcb15d','#bb8d42','#99733d','#5f4e33'][j],transformOrigin:'left',transform:`scaleX(${slide(f,[15719,15891,15927,15990][j],36)})`,height:48,borderRight:'1px solid #3c3023'}}/>)}</div>
      {first.map(([l,n],j)=>{const c=slide(f,[15719,15891,15927,15990][j],24);return <div key={l} style={{...xy(37,470+48*j,574,44),display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 12px',background:'#28231a',borderBottom:'1px solid #4d3c22',color:pale,fontWeight:750,fontSize:22,opacity:c,transform:`translateX(${(1-c)*14}px)`}}><span>{l}</span><b style={{color:gold}}>约 {n} 亿</b></div>})}
      <SourceNote>据报道含创始人出资；差额为编辑分类，非已获投票权或到账规模。</SourceNote>
    </>}
  </div>;
}
// Source-clock readings for the rolling graphic, one value per frame from f363.
const openingAmounts=[
  27,71,114,155,195,234,271,307,342,376,409,440,470,500,528,555,581,
  606,630,653,675,696,716,735,753,771,787,803,818,832,846,858,870,882,892,
  902,912,920,928,936,943,949,955,961,966,970,975,978,982,985,987,990,992,
  993,995,996,997,998,999,999,999,
];

const openingDigits: Record<string,string>={
  '0':'M6 0H94V82L88 88H0V6ZM22 18V70H72V18Z',
  '1':'M0 8L28 0H49V88H27V21L0 26Z',
  '2':'M0 0H88L94 6V53H22V70H94V88H0V35H72V18H0Z',
  '3':'M0 0H88L94 6V82L88 88H0V70H72V53H12V35H72V18H0Z',
  '4':'M0 0H22V38H72V0H94V88H72V56H0Z',
  '5':'M0 0H94V18H22V35H94V82L88 88H0V70H72V53H0Z',
  '6':'M6 0H94V18H22V35H94V82L88 88H0V6ZM22 53V70H72V53Z',
  '7':'M0 0H94V17L48 88H21L66 18H0Z',
  '8':'M6 0H88L94 6V35L88 44L94 53V82L88 88H6L0 82V53L6 44L0 35V6ZM22 17V35H72V17ZM22 53V71H72V53Z',
  '9':'M6 0H94V82L88 88H0V70H72V53H0V6ZM22 18V35H72V18Z',
};

function OpeningAmount({value,f}:{value:number;f:number}){
  const chars=String(value).split('');
  // The narrow “1” uses its natural advance so four digits fit without shrinking.
  const width=chars.reduce((sum,character)=>sum+(character==='1'?70:114),0)+123;
  let x=(648-width)/2+10;
  const digits=chars.map((character,index)=>{
    const position=x;
    x+=character==='1'?70:114;
    return <path key={index} d={openingDigits[character]} clipRule="evenodd" transform={`translate(${position} 9)`}/>;
  });
  return <svg data-metric="opening-cny" data-value={value} role="img" aria-label={`${value} 亿`}
    width={648} height={114} style={{...xy(0,377,648,114),opacity:slide(f,350,5)}}>
    <defs>
      <linearGradient id="opening-ice" x1="0" x2="0" y1="4" y2="107" gradientUnits="userSpaceOnUse">
        <stop stopColor="#b6eaff"/><stop offset=".23" stopColor="#71c5ed"/><stop offset=".48" stopColor="#579bc5"/>
        <stop offset=".72" stopColor="#7ac9f3"/><stop offset="1" stopColor="#bceaff"/>
      </linearGradient>
      <pattern id="opening-ice-sheen" width="139" height="106" patternUnits="userSpaceOnUse"
        patternTransform={`translate(${(f-351)*1.8} 0)`}>
        <path fill="#edfdff" opacity=".85" d="M0 0H25L14 23 5 27 0 41ZM72 0H103L95 12 81 13 76 22 64 24ZM114 62L139 52V73L130 82 123 101H94L99 87 110 78Z"/>
        <path fill="#fff" opacity=".7" d="M16 9H33L28 20 21 21 17 30H4L13 22ZM88 13H109L102 22H93L90 31H80ZM114 82H128L121 99H100V94Z"/>
        <path fill="#8ee1ff" opacity=".6" d="M35 4H61L51 15 43 29 26 36 30 24ZM0 69L23 63 29 66 14 75 8 88H0ZM49 76L78 65 80 74 66 83 61 104H46L42 94Z"/>
      </pattern>
      <clipPath id="opening-ice-shapes" transform="skewX(-12)">
        {digits}
        <path d="M0 2H23V106H0ZM36 0H119V20L54 85H112L107 102H38Q28 102 28 94V82L89 19H36Z"
          transform={`translate(${x+3} 3)`}/>
      </clipPath>
    </defs>
    <g clipPath="url(#opening-ice-shapes)">
      <rect width={648} height={114} fill="url(#opening-ice)"/>
      <rect width={648} height={114} fill="url(#opening-ice-sheen)"/>
    </g>
  </svg>;
}

export function FundingHook({f}:{f:number}){
  const n=f<363?0:f<424?openingAmounts[f-363]:1000;
  const quote=slide(f,375,18);
  return <div data-layer="funding-opening">
    <div style={{...xy(0,0,648,1152),background:'linear-gradient(149deg,#243138 0%,#151b20 40%,#100f0f 73%,#100f0f 100%)'}}/>
    <svg width={648} height={1152} style={{position:'absolute',inset:0}} aria-label="抽象市场线条，非真实市场走势">
      <g opacity=".23">{[92,146,206,263,328,397,468,548,625,710,828].map(y=><path key={y} d={`M0 ${y}H648`} stroke="#71848b"/>)}{[54,111,169,226,302,380,458,536,614].map(x=><path key={x} d={`M${x} 59V830`} stroke="#5b717b"/>)}</g>
      <path d="M0 412L31 395L61 468L94 449L128 503L163 466L197 536L235 523L276 627L315 585L362 643L401 580L460 515L495 592L549 526L596 568L648 512" stroke="#83b9c9" strokeWidth="5" fill="none" opacity=".23"/>
    </svg>
    <Tag f={f} start={346} y={200}>据报道 · 新一轮融资</Tag>
    <OpeningAmount value={n} f={f}/>
    <div style={{opacity:quote}}>
      <Banner head="彭博" body="DeepSeek 新一轮融资 约 150 亿美元" y={605} w={545}/>
      <div data-layer="source-note" style={{...xy(36,661,575,26),fontSize:14,fontWeight:600,color:'#d8d0c0'}}>
        Bloomberg 2026-10-22 · 投前估值约 5,000 亿元人民币 · 当时未官宣
      </div>
    </div>
  </div>;
}
export function UsageBars({f,start}:{f:number;start:number}){
  const values=[9.95,3.24,2.51,1.39,.23], names=['ChatGPT','豆包','千问','DeepSeek','Kimi'];
  return <div data-layer="usage-editorial-chart">
    <Head f={f} start={start} y={177}>AI App 全球月活</Head>
    <Tag f={f} start={start} y={240}>原节目图表 · 2026 年 6 月 · 亿</Tag>
    <svg width={648} height={1152} aria-label="节目历史数据示意，未取得独立统计底表" style={{position:'absolute',left:0,top:0}}>
      {[360,432,505,577,649].map((y,i)=><line key={y} x1={36} y1={y} x2={611} y2={y} stroke={i===4?'#826737':'#413728'} opacity={i===4?1:.66}/>)}
      {values.map((v,j)=>{const a=start+16+j*27,p=slide(f,a,39),height=v/9.95*292*p,x=79+j*123,c=j===3?gold:'#bcb3a0';return <g key={names[j]} opacity={p}>
        <rect x={x-25} y={649-height} width={50} height={height} fill={c} opacity=".9"/>
        <text x={x} y={636-height} textAnchor="middle" fontSize="24" fontWeight="800" fill={c}>{v.toFixed(2)}</text>
        <text x={x} y={676} textAnchor="middle" fontSize="21" fontWeight="750" fill={c}>{names[j]}</text>
      </g>})}
    </svg>
    <SourceNote y={741}>沿用原节目所示第三方口径；未取得原始统计表，非本期实测。</SourceNote>
  </div>;
}
export function RouterGrid({f,start}:{f:number;start:number}){
  const shares=[['DeepSeek',31.5],['Z.ai',10.2],['Anthropic',9],['MiniMax',8.5],['OpenAI',8.4],['腾讯',6.6]] as const;
  let running=0;
  const slices=shares.map(([name,value],i)=>{const from=running;running+=value;return {name,value,from,to:running,c:[gold,'#9f8d74','#8f7869','#777164','#71634d','#5e5343'][i]};});
  const total=slide(f,start+26,175)*100;
  return <div data-layer="openrouter-editorial-chart">
    <Head f={f} start={start} y={254} size={31}>OpenRouter · token 用量份额</Head>
    <Tag f={f} start={start} y={314}>原节目 · 2026-10-23 回看七日 · 1 格 = 1%</Tag>
    <svg width={648} height={1152} style={{position:'absolute',inset:0}} aria-label="百格示意，仅为原节目所述平台快照">
      {Array.from({length:100},(_,j)=>{const x=39+j%10*28,y=381+Math.floor(j/10)*28;return <g key={j}><rect x={x} y={y} width={25} height={25} fill="#2a251b" stroke="#544730"/>{slices.map(s=>{const left=clamp(s.from-j),right=clamp(Math.min(total,s.to)-j);return right>left?<rect key={s.name} x={x+25*left} y={y} width={25*(right-left)} height={25} fill={s.c}/>:null;})}</g>;})}
      <g opacity={slide(f,start+112,24)}><text x="345" y="404" fill={gold} fontSize="25" fontWeight="800">DeepSeek</text><text x="341" y="478" fill={gold} fontSize="66" fontWeight="900">31.5%</text></g>
      {shares.slice(1).map(([name,v],j)=><g key={name} opacity={slide(f,start+154+j*12,17)}><text x="345" y={517+j*29} fill={pale} fontSize="19">{name}</text><text x="599" y={517+j*29} textAnchor="end" fill={pale} fontSize="19">{v.toFixed(1)}%</text></g>)}
    </svg>
    <SourceNote y={704}>仅代表该平台特定七日；未重取历史统计，不能解读为全球市场份额。</SourceNote>
  </div>;
}
export function Pricing({f,start}:{f:number;start:number}){
  if(f>=11090&&f<11430)return <>
    <div data-layer="api-output-relation" style={{...xy(36,196,576,218),boxSizing:'border-box',padding:'17px 20px',border:'1px solid #725d36',borderRadius:3,background:'#272117',color:pale}}>
      <div style={{fontSize:15,fontWeight:800,letterSpacing:'.09em',color:'#d8c39a'}}>比较口径示意 · 不含报价</div>
      <div style={{fontSize:35,fontWeight:950,lineHeight:1.16,marginTop:6}}>主力模型 API 输出价</div>
      <div style={{fontSize:25,fontWeight:900,color:gold,marginTop:6}}>每百万输出 token</div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:9,marginTop:18,color:pale,fontSize:20,fontWeight:850,whiteSpace:'nowrap'}}>
        {['同输出量','同币种 · 同时段','再比输出单价'].map((s,i)=>{const opacity=.68+.32*slide(f,11089+i*4,8);return <React.Fragment key={s}>{i>0&&<span aria-hidden style={{color:gold,opacity}}>→</span>}<span style={{flex:1,textAlign:'center',padding:'9px 6px',border:'1px solid #6b5839',borderRadius:3,background:'#33291a',opacity}}>{s}</span></React.Fragment>;})}
      </div>
    </div>
    <div data-layer="official-api-tariff" style={{...xy(36,429,576,329),borderRadius:3,background:'#f4f1e7',color:'#181715',boxShadow:'0 11px 39px #08060494'}}>
      <div style={{...xy(20,26,270,76),fontWeight:900,fontSize:25,lineHeight:1.18}}>DeepSeek<br/>官方 API 价目原页</div>
      <div style={{...xy(20,119,248,115),fontWeight:750,fontSize:19,lineHeight:1.4,color:'#504937'}}>原表分别列输入、输出<br/>及缓存、时段等字段</div>
      <div style={{...xy(20,261,245,48),fontWeight:750,fontSize:15,lineHeight:1.33,color:'#655643'}}>独立抓取的官方原页<br/>非节目历史截图</div>
      <Art asset="pricetable" b={[285,12,275,305]} label="官方定价表原样，保留列名与单位"/>
    </div>
    <SourceNote y={765}>原节目报价未独立核实 · 非实时价目</SourceNote>
  </>;
  return <div data-layer="official-api-tariff">
    <div style={{...xy(36,224,576,498),borderRadius:3,background:'#f4f1e7',color:'#181715',boxShadow:'0 11px 39px #08060494'}}/>
    <div style={{...xy(58,250,532,33),color:'#211c18',fontWeight:900,fontSize:26}}>DeepSeek 官方 API 价目</div>
    <div style={{...xy(58,288,532,25),color:'#504937',fontWeight:700,fontSize:14}}>每百万 tokens · 输入 / 输出 · 缓存与时段按原页字段</div>
    <Art asset="pricetable" b={[61,320,526,370]} label="官方定价表原样，保留列名与单位"/>
    <SourceNote y={749}>独立抓取的官方原页（非节目历史截图）；旁白跨厂比较不作实时价目。</SourceNote>
  </div>;
}
export function APIMap({f,start}:{f:number;start:number}){
  const p=slide(f,start+22,21), q=slide(f,start+48,21);
  return <>
    <Head f={f} start={start} x={76} y={211} w={510} size={45}>那它靠什么赚钱？</Head>
    <Product b={[211,285,226,60]}/>
    {([['模型文件','公开权重 · 自行部署',38,p],['API 服务','按 token 调用计价',347,q]] as const).map(([name,sub,x,b])=><div data-layer="api-route" key={name} style={{...xy(x,381,260,91),textAlign:'center',background:'#292419',border:'1px solid #745b33',color:pale,paddingTop:10,opacity:b}}><b style={{fontSize:32}}>{name}</b><div style={{fontSize:16,color:'#c9b895',marginTop:6}}>{sub}</div></div>)}
    <div style={{opacity:slide(f,start+120,20)}}><Evidence id="deepseek-files" b={[37,542,258,173]} f={f} start={start+120} compact mode="ink"/><Evidence id="deepseek-api" b={[351,542,259,173]} f={f} start={start+136} compact/></div>
  </>;
}
export function GlobeMesh({f,start,fade=1,entryFloor=0}:{f:number;start:number;fade?:number;entryFloor?:number}){
  const p=Math.max(entryFloor,slide(f,start-3,19)), rotation=(f-start)*.16;
  return <svg data-layer="geographic-mesh-illustration" viewBox="0 0 648 1152" width={648} height={1152} style={{position:'absolute',inset:0,opacity:fade*p}}>
    <defs><radialGradient id="equator-field"><stop stopColor="#4a3b24"/><stop offset=".78" stopColor="#272219"/><stop offset="1" stopColor="#181613"/></radialGradient></defs>
    <g transform="translate(324 451)" stroke="#8a7044" fill="none"><circle r="234" fill="url(#equator-field)" strokeWidth="2"/><circle r="224" strokeOpacity=".45"/><circle r="242" strokeOpacity=".31" strokeDasharray="3 6"/>
      <g transform={`rotate(${rotation-12})`} opacity=".5">{[63,115,170,218].map(rx=><ellipse key={rx} rx={rx} ry={225}/>)}{[25,72,123,176].map(ry=><ellipse key={ry} rx={225} ry={ry}/>)}</g>
      {Array.from({length:74},(_,j)=>{const a=j*2.399963, r=17+Math.sqrt((j+.5)/74)*196;return <circle key={j} cx={Math.cos(a)*r} cy={Math.sin(a)*r} r={j%11===0?2.5:1.08} fill={gold} stroke="none" opacity={.35+ .38*slide(f,start+j%9*3,13)}/>})}
    </g>
    <text x="537" y="718" fill="#988974" textAnchor="end" fontSize="13">传播关系示意</text>
  </svg>;
}

export { OpeningAmount };
