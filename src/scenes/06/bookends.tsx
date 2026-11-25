import React from 'react';
import {P,Pic,Mark,ranks,type Rank} from './projects';
import {C,F,Foot,Hint,No,Tech,fmt,panel,rect} from './primitives';
import {active,anchor,cardZoom,meter,mix,phase,settle,type Chapter,type Scene,type Timeline} from './motion';

type Core={tl:Timeline;f:number;scene:Scene};
const namedLight=(r:Rank)=>r===1||r===2||r===7;
const cut=(r:Rank)=>namedLight(r)?'light':r===5?'mobile':'product';
const tile= (r:Rank) => ({x:40+((r-1)%3)*337, y:399+Math.floor((r-1)/3)*289,w:326,h:278});
const plate='#100e0c';
const mediaAlt=(r:Rank)=>r===4?'官方工作台截图':r===6?'官方宣传样例静帧':r===8?'官网示例图':r===5||r===9?'官方产品图':'独立公开页面';
const WallTitle:React.FC<{opacity?:number}>=({opacity=1})=><div style={{...rect(30,280,1020),textAlign:'center',opacity,textShadow:'0 8px 18px #050403',transform:'skewX(-6deg)'}}><Tech size={68}>本月 <span style={{color:C.gold,margin:'0 18px'}}>GitHub</span> 神级项目</Tech></div>;

export const Flash:React.FC<Core>=({tl,f,scene})=>{
 return <>{ranks.map((r,i)=>{
  const k=8-i,at=anchor(tl,'flash-ranks',k),end=anchor(tl,'flash-ranks',k+1,scene.end);if(f<at||f>=end)return null;
  const q=phase(f,at,at+5),cur=f-at,light=tl.whitePageWindows.some(a=>a.start<=f&&f<a.end),desktop=r===8||r===6;
  // The footage cuts, ordinal, title and monthly stat do not arrive together.
  const numeralOn=r===6||r===3?0:1,nameOn=r===6||r===3||r===2?1:2;
  return <React.Fragment key={r}>
   <div style={{...rect(0,0,1080,1920),background:light&&!desktop?'#f7f6f4':P[r].base}}/>
   <div style={{...rect(0,r===5?0:desktop?150:0,1080,r===5?1580:desktop?740:namedLight(r)?1045:1130),overflow:'hidden'}}><Pic r={r} kind={cut(r)} fit={namedLight(r)?'contain':'contain'} pos={namedLight(r)?'center 17%':'center'} style={{transform:`translateY(${-21*q}px) scale(${mix(1.035,1,q)})`}}/></div>
   <div style={{...rect(0,0,1080,1920),background:'linear-gradient(180deg, transparent 15%, #05050525 39%, #0d0d0bc4 69%, #040405 100%)'}}/>
   {cur<3&&[0,1,2,3,4].map(row=><i key={row} style={{...rect(row%2?0:912,180+row*234,168,154),background:row%2?'#16110de3':'#141824e8',opacity:1-q}}/>)}
   {cur>=numeralOn&&<div style={{...rect(54,889+24*(1-q),968),lineHeight:1}}><Tech size={222} style={{color:C.gold,lineHeight:1,textShadow:'0 5px 22px #000'}}>0{r}</Tech></div>}
   {cur>=nameOn&&<div style={{...rect(59,1100+18*(1-q),964),transform:'skewX(-6deg)',textShadow:'0 4px 12px #000'}}><Tech size={r===2?51:76}>{P[r].name}</Tech></div>}
   {cur>=nameOn+1&&<div style={{...rect(61,1193,940),fontSize:29,color:C.gold,fontWeight:900}}>本月 ★ +{fmt(P[r].delta)}</div>}
   <div style={{...rect(58,1468,964,4),background:'#ba93593f',boxShadow:'0 1px 4px #020202'}}><i style={{display:'block',width:964*phase(f,scene.start,scene.end-1),height:4,background:C.gold}}/></div>
  </React.Fragment>;
 })}</>;
};

// Keep one independent catalog surface on the expanding #1 tile, instead of
// swapping in a letterboxed screenshot midway through its landing.
const FreeCatalog:React.FC<{mode:'opening'|'chapter';w:number;h:number}>=({mode,w,h})=>{
 const top=h*(mode==='opening'?.305:.25);
 return <div data-free-catalog={mode} style={{...rect(0,0,w,h),background:'#f7f6f4',overflow:'hidden'}}>
   <div style={{...rect(0,0,w,top),background:'#111',overflow:'hidden'}}><Pic r={1} kind='product' fit='contain' pos='center'/></div>
   <div style={{...rect(0,top,w,h-top),background:'#f7f6f4',overflow:'hidden'}}><Pic r={1} kind='light' fit='contain' pos='center top'/></div>
 </div>;
};

const catalogShade='linear-gradient(180deg,transparent 24%,#11111236 34%,#141312c7 51%,#0a0a0af2 74%,#070708 100%)';
export const CardWall:React.FC<Core&{mode:'opening'|'chapter'|'recap';r?:Rank;chapter?:Chapter}>=({tl,f,scene,mode,r,chapter})=>{
 const prog=mode==='chapter'&&chapter?cardZoom(tl,chapter,f):0;
 const chosen=mode==='opening'?active(tl,'intro-select',f):mode==='chapter'&&r?1<<(r-1):0;
 const categories=new Set(tl.events.filter(e=>e.id==='recap-category'&&e.frame!==undefined&&e.frame<=f).map(e=>e.value));
 const front=mode==='chapter'&&r?r:mode==='opening'?1:undefined;
 const expandsFirst=mode==='chapter'&&r===1;
 const firstJoin=expandsFirst?anchor(tl,'rank-1-join'):0;
 return <div style={{...rect(0,0,1080,1920)}}>
  {expandsFirst&&<div style={{...rect(0,0,1080,1920),opacity:.44*(1-prog)}}><FreeCatalog mode='chapter' w={1080} h={1920}/><div style={{...rect(0,0,1080,1920),background:'linear-gradient(180deg,#05050649 5%,#13131250 38%,#141413 100%)'}}/></div>}
  <WallTitle opacity={mode==='chapter'?1-prog:settle(f,scene.start+4,scene.start+19)}/>
  {ranks.map((n,i)=>{
    const b=tile(n),first=n===front;
    const openingAt=anchor(tl,'opening-tile',i,scene.start),intro=mode==='opening'?settle(f,openingAt,openingAt+(n===1?9:12)):mode==='recap'?settle(f,scene.start+i*2,scene.start+12+i*2):1;
    const into=mode==='chapter'&&first?prog:mode==='opening'&&first?1-intro:0;
    const arrived=mode==='chapter'&&first?into:mode==='opening'&&first?intro:1;
    const joinedFirst=expandsFirst&&first;
    const large=mode==='opening'||joinedFirst?{x:0,y:0,w:1080,h:1920}:heroBox(n);
    const x=mix(b.x,large.x,into)+(first?0:(1-intro)*(i%3-1)*137);
    const y=mix(b.y,large.y,into)+(first?0:(1-intro)*(i<3?-145:159));
    const width=mix(b.w,large.w,into),height=mix(b.h,large.h,into);
    const hot=(chosen&(1<<(n-1)))!==0, dull=chosen!==0&&!hot;
    const alpha=mode==='chapter'?(first?1:Math.pow(1-prog,1.48)):first?1:intro;
    const clip=mode==='chapter'&&first&&into>.65?(namedLight(n)?'contain':'contain'):'cover';
    const crossed=mode==='recap'&&categories.has(n);
    const border=hot?`3px solid ${C.gold}`:'1px solid #69583b4f';
    return <div key={n} data-project-tile={n} style={{...rect(x,y,width,height),opacity:alpha,zIndex:first?4:2,overflow:'hidden',borderRadius:mix(6,0,into),border:into>.13?'none':border,boxShadow:into>.1?'none':hot?'0 0 21px #d6ac564a,0 12px 30px #0504039f':'0 9px 25px #050403b0',background:P[n].base,transform:`rotate(${first?0:(1-intro)*(i%2===0?-9:9)}deg)`}}>
      {(mode==='opening'&&first&&into>.25)||(joinedFirst&&into>.25)?<FreeCatalog mode={mode==='opening'?'opening':'chapter'} w={width} h={height}/>:<Pic r={n} kind={cut(n)} fit={clip} pos={n===5?'center 13%':namedLight(n)?'center top':'center'} style={{filter:`brightness(${dull?.48:1})`}}/>}
      {joinedFirst&&<div style={{...rect(0,0,width,height),opacity:phase(f,firstJoin-4,firstJoin),background:catalogShade}}/>}
      {crossed&&<div style={{...rect(0,0,width,height),display:'grid',placeItems:'center',color:'#fff7e2',background:'#17140fc1',boxShadow:'inset 0 0 0 2px #d1a4556b',textShadow:'0 2px 8px #000',fontSize:42,fontWeight:900}}>{P[n].tag}</div>}
      <div style={{position:'absolute',bottom:0,left:0,display:'flex',alignItems:'center',gap:6,background:'#0d0c0be8',padding:'6px 9px 8px',fontFamily:F.ui,fontSize:22,fontWeight:900,lineHeight:1.05,opacity:mode==='chapter'?1-into:Math.min(1,arrived+.65)}}><span style={{color:C.gold,fontSize:25}}>0{n}</span>{P[n].short}</div>
    </div>;
  })}
 </div>;
};

function heroBox(r:Rank) {
 if(P[r].full)return r===5?{x:0,y:0,w:1080,h:1370}:r===1?{x:0,y:162,w:1080,h:780}:r===9?{x:0,y:68,w:1080,h:770}:{x:0,y:0,w:1080,h:854};
 return {x:60,y:397,w:960,h:r===8?498:542};
}

export const RankOpen:React.FC<Core&{r:Rank;chapter:Chapter}>=({tl,f,scene,r,chapter})=>{
 const p=P[r];const join=anchor(tl,`rank-${r}-join`,0,chapter.start),ready=f>=join;
 const yn=p.full?756:818;
 const at=anchor(tl,`rank-${r}-line`,0,join+9),titleP=phase(f,join+1,join+17),line=settle(f,at,at+11), blurb=anchor(tl,`rank-${r}-callout`,0,scene.end);
 const count=meter(tl,`rank-${r}-stars`,f),countOpacity=settle(f,join+7,join+16);
 const box=heroBox(r),bgAlpha=p.full?1:.64;
 const off=(f-join)/Math.max(1,scene.end-join);
 const badgeP=settle(f,join,join+6);
 const firstBadge=r===1?Math.max(.66,badgeP):r===2?Math.max(.32,badgeP):badgeP;
 return <div style={{...rect(0,0,1080,1920),background:'#09080a'}}>
   <div style={{...rect(0,0,1080,1100),background:p.base,opacity:bgAlpha}}/>
   {p.full&&<div style={{...rect(0,0,1080,1120),opacity:ready?0:.52,overflow:'hidden'}}><Pic r={r} kind={cut(r)} fit='cover' pos='center top'/></div>}
   {!ready?<CardWall mode='chapter' tl={tl} scene={scene} f={f} r={r} chapter={chapter}/>:<>
    {r===1?<FreeCatalog mode='chapter' w={1080} h={1920}/>:<div style={{...rect(box.x,box.y,box.w,box.h),background:r===4?'#071020':p.base,borderRadius:p.full?0:8,overflow:'hidden'}}>
      <Pic r={r} kind={cut(r)} fit={r===5?'cover':'contain'} pos={r===5?'center 7%':namedLight(r)?'center top':'center'} style={{transform:`translateY(${p.full?(-23*off):0}px) scale(${mix(1.02,1.075,off)})`}}/>
    </div>}
    <div style={{...rect(p.full?0:60,p.full?0:248,p.full?1080:960,p.full?148:140),overflow:'hidden',opacity:(p.full?.89:.67)*(1-settle(f,join+34,join+83)),zIndex:1}}><Pic r={r} kind='repo' fit='cover' pos='left center'/></div>
    {r===9&&<div style={{...rect(671,492,235,434),opacity:.51,transform:'rotate(-8deg)'}}><Pic r={9} kind='mobile' fit='contain'/></div>}
   </>}
   <div style={{...rect(0,0,1080,1920),pointerEvents:'none',opacity:ready?1:.65,background:r===1?catalogShade:p.full?'linear-gradient(180deg,#12111122 0%,transparent 24%,#0c0b0d16 34%,#0d0b0bc7 50%,#0a0a0af2 74%,#070708 100%)':'linear-gradient(180deg,#03040644,transparent 29%,#0d0b0c20 34%,#09090aea 53%,#050505 100%)'}}/>
   {ready&&<>
    <div style={{...rect(60,yn,930,59),display:'flex',alignItems:'center',gap:17,opacity:firstBadge,fontSize:32,color:'#ddd0ba',fontWeight:900,textShadow:'0 2px 5px #211c16'}}><No r={r} large/>第{p.ordinal}名</div>
    <div style={{...rect(58,yn+81,1017,125),overflow:'hidden',clipPath:`inset(0 ${(1-titleP)*100}% 0 0)`,textShadow:'1px 6px 12px #121010,#000 0 1px 3px'}}><Tech size={p.size} style={{display:'inline-block',transformOrigin:'left center',transform:'scaleX(1.12)',letterSpacing:'.056em'}}>{p.name}</Tech></div>
    <div style={{...rect(60,yn+(r===2?157:219),220*line,8),background:'linear-gradient(90deg,#f1cb7b,#dba44e)',boxShadow:'0 4px 11px #5a381e82'}}/>
    <div style={{...rect(60,yn+(r===2?184:245),960,82),opacity:countOpacity,display:'flex',gap:12,alignItems:'center',fontVariantNumeric:'tabular-nums',fontSize:35,fontWeight:900,color:'#d7cbb6'}}>
      <span>本月</span><span style={{color:C.gold,fontSize:43}}>★</span><span style={{fontSize:76,lineHeight:1,color:C.gold,letterSpacing:'-.046em'}}>+{fmt(count)}</span><span style={{fontSize:29}}>总 {p.total}</span>
    </div>
    <div style={{...rect(60,yn+(r===2?294:351),960,41),opacity:settle(f,join+9,join+24),display:'flex',alignItems:'center',gap:11,color:'#d8d1c3',fontFamily:F.mono,fontSize:29}}><span style={{color:C.paper,fontSize:30}}>◉</span>{p.slug}</div>
    <Hint f={f} on={blurb} top={yn+(r===2?352:412)}>{p.callout}</Hint>
   </>}
   <Foot opacity={settle(f,join+4,join+26)} text={`来源：月增：GitHub Trending 月榜（2026-11-21 采样） · ${p.slug} · ${mediaAlt(r)}`}/>
 </div>;
};

const pollTitles:Partial<Record<Rank,string>>={4:'video-shotcraft'};
const pollDetails:Partial<Record<Rank,string>>={2:'AI 做游戏',3:'开源剪辑',4:'AI 宣传片',5:'开源健身',8:'AI 员工台',9:'操控手机Mac'};
export const Poll:React.FC<Core>=({tl,f,scene})=><>
 <div style={{...rect(56,340,950),transform:'skewX(-5deg)'}}><Tech size={70}>你最想先试<br/><span style={{color:C.gold}}>哪</span>一个？</Tech></div>
 {ranks.map((r,i)=>{const row=i===0?0:1+Math.floor((i-1)/2),at=anchor(tl,'poll-row',row,scene.start),p=settle(f,at,at+10),x=i>0&&i%2===0?547:54;return <div key={r} style={{...rect(x,586+row*99,i===0?972:479,i===0?78:88),...panel,borderColor:i===0?C.gold:C.line,display:'flex',alignItems:'center',gap:14,padding:'8px 15px',opacity:p,transform:`translateY(${(1-p)*24}px)`}}><span style={{fontSize:33,fontWeight:900,color:C.gold}}>0{r}</span><Mark r={r} size={42}/><div><Tech size={r===1?38:33}>{pollTitles[r]??P[r].short}</Tech>{r>1&&<div style={{fontSize:18,color:C.muted,marginTop:3}}>{pollDetails[r]??P[r].tag}</div>}</div>{r===1&&<span style={{marginLeft:'auto',color:C.gold,fontSize:28}}>87 家免费模型聚合</span>}</div>;})}
 <div style={{...rect(54,1191,974),textAlign:'center',color:C.gold,fontSize:30,fontWeight:900,opacity:settle(f,anchor(tl,'poll-row',5),anchor(tl,'poll-row',5)+11)}}>评论区告诉我</div>
</>;

const OutroTitle:React.FC<{sub:number;build?:boolean}>=({sub,build=false})=><div style={{...rect(60,354,980),transform:'skewX(-4deg)'}}><div style={{fontSize:29,letterSpacing:'.26em',color:'#bfb6a7',fontWeight:800}}>本期视频由</div><div style={{marginTop:13}}><Tech size={89}>Demo <span style={{color:C.gold}}>Skill</span></Tech></div>{sub>0&&<div data-outro-output={build?'visible':undefined} style={{marginTop:18,opacity:sub}}><Tech size={53} style={{color:'#c8bcaa'}}>全自动剪辑输出</Tech></div>}</div>;

export const Credits:React.FC<Core>=({tl,scene,f})=>{
 if(scene.id==='credits-build') {
  const text=['月榜选题','写口播稿','配音','对齐字幕','做画面','云端出片'];
  const stampAt=anchor(tl,'credits-build',7),stamp=f>=stampAt?1:0;
  return <><OutroTitle build sub={settle(f,anchor(tl,'credits-build',5),stampAt)}/>
    {text.map((v,i)=>{const onset=anchor(tl,'credits-build',i,scene.end),p=settle(f,onset,onset+6),checked=f>=onset;if(f<onset-3)return null;return <div key={v} style={{...rect(58,637+100*i,474,89),...panel,borderRadius:0,borderColor:checked?C.gold:'#4e4536',opacity:checked?.65+.35*p:.30,padding:'12px 20px',display:'flex',alignItems:'center',gap:19,fontSize:34,fontWeight:900}}><span style={{display:'grid',placeItems:'center',width:40,height:40,borderRadius:21,border:`1px solid ${C.gold}`,background:checked?C.gold:'transparent',color:C.ink,fontSize:23}}>{checked?'✓':null}</span>{v}</div>;})}
    <div style={{...rect(637,578,360,570),filter:'drop-shadow(0 12px 15px #0009)',opacity:settle(f,scene.start,scene.start+13)}}>
     {([2,1,8] as Rank[]).map((r,i)=><div key={r} style={{...rect(14*i,15+143*i,355,171),border:'3px solid #4a4134',background:'#f7f6f4',overflow:'hidden',boxShadow:'0 6px 14px #0009'}}><Pic r={r} kind={cut(r)} fit='cover' pos='top center'/></div>)}
     <span style={{...rect(85,stamp===1?-22:469,280),textAlign:'center',background:C.gold,color:C.ink,fontSize:20,fontWeight:900}}>独立项目画面示例</span>
    </div>
    <span style={{...rect(533,997,465),textAlign:'center',opacity:stamp,transform:`rotate(-9deg) scale(${mix(1.2,1,stamp)})`,color:'#fc654d',border:'6px solid #c95343',fontSize:54,fontWeight:900,background:'#241813',boxShadow:'0 11px 25px #0009',textShadow:'0 2px 5px #231010',padding:'13px 10px 17px'}}>手动剪辑 ×0</span>
  </>;
 }
 const typeAt=anchor(tl,'credits-comment',1),sendAt=anchor(tl,'credits-comment',3),fixed=anchor(tl,'credits-comment',4),typed='Demo'.slice(0,Math.floor(5*phase(f,typeAt,anchor(tl,'credits-comment',2))));
 const done=f>=fixed, send=settle(f,sendAt,fixed),call=settle(f,typeAt+2,typeAt+18),box=settle(f,scene.start,scene.start+9);
 return <><OutroTitle sub={1}/>
  <div style={{...rect(88,659,904,done?366:261),...panel,padding:'31px 36px',opacity:box,background:'#211b13',transform:`translateY(${(1-box)*19}px)`}}>
   <div style={{color:'#cfc4b1',fontSize:36,fontWeight:900}}>评论区</div>
   {done&&<div style={{display:'flex',alignItems:'center',height:115,gap:22,marginBottom:11}}><span style={{background:C.gold,color:C.ink,borderRadius:90,width:74,height:74,display:'grid',placeItems:'center',fontSize:37,fontWeight:900}}>我</span><Tech size={54}>Demo</Tech><span style={{marginLeft:'auto',color:'#a09585',fontSize:29}}>刚刚</span></div>}
   <div style={{height:103,background:'#0f0d0b',border:'1px solid #3b3225',marginTop:18,padding:'15px 16px 16px 18px',display:'flex',alignItems:'center',gap:10}}>
    <span style={{color:done||typed?C.paper:'#7e766a',marginRight:'auto'}}>{done?'':typed?<Tech size={50}>{typed}</Tech>:<span style={{fontSize:29}}>写评论…</span>}</span>
    <span style={{background:!done&&typed.length===4?'#e5b95e':'#322b22',color:!done&&typed.length===4?C.ink:'#988e80',fontWeight:900,padding:'7px 18px',fontSize:32,transform:`scale(${1-.15*send*(1-send)})`}}>发送</span>
   </div>
  </div>
  <div style={{...rect(54,done?1103:1012,978),textAlign:'center',opacity:call,transform:'skewX(-5deg)'}}><Tech size={105}>评论区扣 <span style={{color:C.gold,marginLeft:28}}>Demo</span></Tech></div>
 </>;
};
