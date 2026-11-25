import React from 'react';
import {between,localEase,progress,smooth,type Rect} from './clock';
import {appearing,atWall,cardPose,countLabel,flashRank,rankModes,rankPlan,ranks,starCount} from './story';
import {Backdrop,BorderRail,GOLD,IVORY,Picture,xy} from './visual';

export function ModernPair({box,zoom=1}:{box:Rect;zoom?:number}) {
 const [,,w,h]=box;
 const label=Math.max(10,w*.018), top=h*.143, ph=h*.703, pw=w*.426;
 return <div style={{...xy(box),overflow:'hidden',background:'linear-gradient(105deg,#0dcd54 0%,#05ba6b 44%,#6bcaef 100%)'}} data-layout="true-public-examples">
   <div style={{...xy([w*.056,top,pw,ph]),borderRadius:Math.max(7,w*.018),background:'#111516',overflow:'hidden'}}>
    <Picture name="modern-paired" box={[pw*.15,ph*.35,pw*.7,ph*.45]} crop={[30,174,696,355]} zoom={zoom} fit="contain"/>
   </div>
   <div style={{...xy([w*.517,top,pw,ph]),borderRadius:Math.max(7,w*.018),background:'#f8f8fa',overflow:'hidden'}}>
    <Picture name="modern-demo" box={[pw*.21,ph*.22,pw*.58,ph*.58]} zoom={zoom} fit="contain"/>
   </div>
   <div className="medium" style={{...xy([w*.058,h*.053,pw,top]),fontSize:label,textAlign:'center'}}>官方 A/B 评测 · Without</div>
   <div className="medium" style={{...xy([w*.52,h*.053,pw,top]),fontSize:label,textAlign:'center'}}>示例 · Auto-Sizing Form</div>
 </div>;
}
function RankArt({rank,box,f}:{rank:number;box:Rect;f:number}) {
 const [,,w,h]=box;
 if(rank===1) return <ModernPair box={box} zoom={f>292?1+progress(f,292,362)*.09:1}/>;
 if(rank===6) return <div style={{...xy(box),background:'#080c0b',overflow:'hidden'}}>
   <div style={{...xy([0,0,w*.425,h]),background:'#f5f6f8'}}><Picture name="chrome_hero" box={[0,0,w*.425,h]} crop={[264,124,934,570]} fit="contain" anchor={[.5,.23]}/></div>
   <Picture name="chrome_mcp_demo" box={[w*.425,0,w*.575,h]} crop={[0,40,948,889]} fit="contain" anchor={[.44,.14]}/>
 </div>;
 if(rank===5) return <div style={{...xy(box),background:'#eeece7',overflow:'hidden'}}>
   <Picture name="review-hero" box={[w*.061,h*.062,w*.878,h*.862]} crop={[615,152,652,457]} fit="contain" style={{background:'#111214',borderRadius:Math.max(4,w*.008)}}/>
 </div>;
 if(rank===10) return <div style={{...xy(box),background:'#fafbfc',overflow:'hidden'}}>
   <Picture name={f>=5338&&f<5387?'codex_security_overview':'codex_security_workbench'} box={[w*.04,h*.035,w*.92,h*.94]} fit="contain" />
 </div>;
 if(rank===9) return <div style={{...xy(box),background:'#0e1226',overflow:'hidden'}}>
   <Picture name={f>=4817&&f<4876?'ffmpeg_skill_hero':'ffmpeg_skill_tools'} box={[0,h*.04,w,h*.9]} fit="contain" />
 </div>;
 const art=rankPlan[rank].art;
 return <Picture name={art} box={box} anchor={[.5,rank===7?.28:.44]} zoom={1+(.041*progress(f,rankPlan[rank].land,rankPlan[rank].body))}/>;
}
const entries = [0,6,12,19,24,30,37,43,48,54];
export function Flash({f}:{f:number}) {
 const rank=flashRank(f)!;
 const start=entries[10-rank], k=f-start;
 const p=localEase(k,0,3), text=progress(k,1,3);
 const d=rankPlan[rank];
 const glitch=k<=1;
 const box:Rect=[glitch?-21+11*k:0,310+(rank%4)*7-(glitch?16:0),1080+(glitch?34:0),617];
 return <>
  <Backdrop tone={d.tone}/>
  <RankArt rank={rank} box={box} f={f}/>
  {glitch?<>
   <div style={{position:'absolute',left:-39,right:0,top:0,bottom:0,clipPath:'polygon(0 15%,100% 15%,100% 19%,88% 19%,88% 27%,100% 27%,100% 33%,0 33%,0 29%,14% 29%,14% 23%,0 23%)'}}><RankArt rank={rank} box={box} f={f}/></div>
   <div style={{...xy([0,434,93-k*26,289]),background:'linear-gradient(90deg,#140e10,#080d14)'}}/>
   <div style={{...xy([1000+k*18,0,80,315]),background:'#09151f'}}/>
   <div style={{...xy([1000,718,80,226]),background:'#09151f'}}/>
   <div style={{...xy([0,953,118-k*22,296]),background:'#130c0b'}}/>
  </>:null}
  <div className="digits" style={{position:'absolute',fontSize:257,lineHeight:'240px',left:57,top:933,opacity:p,color:GOLD,transform:`translateX(${(1-p)*(-39)}px)`}}>{String(rank).padStart(2,'0')}</div>
  <div className="tech" style={{position:'absolute',fontSize:rank===1||rank===6||rank===5?77:86,whiteSpace:'nowrap',left:58,top:1180,opacity:text,color:IVORY,textShadow:'1px 3px #030302',transform:`translateX(${(1-text)*(-39)}px) skewX(-6deg) scaleX(1.12)`,transformOrigin:'left'}}>{d.name}</div>
  <div className="gold" style={{position:'absolute',fontSize:40,lineHeight:'55px',top:1281,left:58,opacity:text}}>★ <small style={{fontSize:24,color:'#b3aa9b'}}>本周</small> +{countLabel.format(d.weekly)}</div>
  <div style={{...xy([58,1485,970,5]),background:'#b29b7064'}}><div style={{width:970*progress(f,0,59),height:5,background:GOLD}}/></div>
 </>;
}
const glide = [60,64,65,66,68,69,70,72,73,74];
const roles = ['Google','办公','记账','技能','阿里','Google','批注','去AI味','剪视频','OpenAI'];
const roleAt = [5770,5880,5894,5921,5819,5792,5947,5963,5984,5838];
const colors=['#e8bd62','#e8bd62','#e8bd62','#e8bd62'];
export const SOURCE_LINE = '来源：周增：GitHub Trending 周榜（总榜 + 13 个语言榜合并），2026-11-19 采样';
// No.1 old tiles are gone at f260; the original title still enlarges and fades through f263.
const leadTiles=[.89,.78,.49,.20] as const;
const leadTitle=[.96,.94,.85,.75,.53,.32,.15,.045] as const;
const leadTitleSpread=[1.02,1.05,1.09,1.13] as const;
const leadTitleBlur=[.35,1.2,2.5,5] as const;
export function Board({f,mode,rank}:{f:number;mode:'intro'|'entry'|'recap';rank?:number}){
 const intro=mode==='intro', wrap=mode==='entry'&&rank!==undefined;
 const active=wrap ? [rank] as number[] : intro ? rankModes(f) : [];
 const phase=wrap?rankPlan[rank!]:undefined;
 const x=phase?progress(f,phase.entry+2,phase.land-2):0;
 const recap=mode==='recap';
 const recapOpacity=recap?appearing(f,5746,5):1;
 const leadEntry=wrap&&rank===1;
 const tileP=leadEntry?(f<256?1:leadTiles[f-256]??0):phase?1-smooth(x):1;
 const titleP=leadEntry?(f<256?1:leadTitle[f-256]??0):intro?appearing(f,62,7):phase?1-smooth(progress(f,phase.entry+5,phase.land+2)):1;
 const spread=leadEntry?leadTitleSpread[f-260]:undefined;
 const blur=leadEntry?leadTitleBlur[f-260]:undefined;
 return <div data-layer="ranking-board" style={{position:'absolute',inset:0,opacity:recapOpacity}}>
  <div className="tech" style={{...xy([39,270,1002,101]),textAlign:'center',color:IVORY,fontSize:65,lineHeight:'94px',transform:spread?`skewX(-6deg) scale(${spread*1.12},${spread})`:'skewX(-6deg) scaleX(1.12)',opacity:titleP,textShadow:'0 5px 13px #030303b6',filter:blur?`blur(${blur}px)`:undefined}}>
    本周 <span className="gold">GitHub</span> 神级项目
  </div>
  {!leadEntry||tileP>0?ranks.filter(n=>!wrap||n!==rank).map(n=>{
   const fin=atWall(n), i=n-1, p= intro?appearing(f,glide[i],n===1?10:12):1;
   const disp= intro?(n===1?between([58,400,964,534],fin,smooth(progress(f,59,68))):between([fin[0]+(n%3===2?510:-480),fin[1]+(n<5?-248:n<8?115:430),fin[2],fin[3]],fin,p)):fin;
   const target=active.includes(n), r=recap?appearing(f,roleAt[i],7):0;
   const focusOpacity=intro&&active.length?appearing(f,active.length===4?85:160,4):1;
   const brightness=active.length===0||target?1:(1-(wrap?.64:.56)*focusOpacity);
   const tagHeight=n===1?42:34;
   return <div key={n} style={{...xy(disp),opacity:(n===1?1:p)*tileP,borderRadius:5,overflow:'hidden',boxShadow:'0 5px 12px #0008',transform:`rotate(${intro&&n>1?(1-p)*(n%2?13:-13):0}deg)`}}>
    <div style={{position:'absolute',inset:0,opacity:brightness*(1-r*.69)}}><RankArt rank={n} box={[0,0,disp[2],disp[3]]} f={f}/></div>
    <div style={{position:'absolute',bottom:0,left:0,fontSize:n===1?25:n===6?19:22,lineHeight:`${tagHeight-5}px`,padding:'3px 8px',whiteSpace:'nowrap',color:IVORY,background:'#14120dec',opacity:active.length&&!target?.59:1}}><b className="gold">{String(n).padStart(2,'0')}</b> {rankPlan[n].name}{n===1?<b className="gold" style={{fontSize:22}}> +7,015</b>:null}</div>
    {target?<div style={{position:'absolute',inset:0,border:`4px solid ${colors[n%4]}`,boxShadow:'inset 0 0 14px #fbd87f88',opacity:focusOpacity}}/>:null}
    {r>0?<div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',fontSize:n===1?84:n===6?36:40,opacity:r,background:'#0807061c',textShadow:'0 4px 7px #000'}}>{roles[i]}</div>:null}
   </div>;
  }):null}
 </div>;
}
const reveals:Record<number,number>={1:268,2:920,3:1438,4:2014,5:2629,6:3140,7:3683,8:4217,9:4702,10:5273};
const ordinal='一二三四五六七八九十';
const weeklyFade=[.18,.44,.65,.80,.91,.97] as const;
const leadEcho=[.08,.17,.26,.43,.54,.67,.78,.88,.90,.88] as const; // f257–266
const leadReveal=[.012,.036,.079,.15,.27,.445,.657,.806,.899,.953,.988] as const; // f268–278
export function RankIntro({rank,f}:{rank:number;f:number}) {
 const d=rankPlan[rank]; const tagAt=reveals[rank];
 const land=cardPose(rank,f), q=progress(f,d.entry+2,d.land);
 const boardRemain=f<(rank===1?264:d.land+2);
 const echo=rank===1?leadEcho[f-257]??0:appearing(f,d.entry+3,8)*(1-smooth(progress(f,d.land-5,d.land+1)))*.74;
 const tagP=appearing(f,tagAt,4);
 const titleP=rank===1?(f<tagAt?0:leadReveal[f-tagAt]??1):smooth(progress(f,tagAt-1,d.statAt-2));
 const statP=appearing(f,d.statAt,6), claimP=appearing(f,Math.min(d.body-20,d.statAt+59),10);
 const weeklyAt=rank===2?935:rank===5?2640:undefined;
 const counterP=weeklyAt===undefined?statP:f<weeklyAt?0:weeklyFade[f-weeklyAt]??1;
 const fade=appearing(f,tagAt,11);
 const titleH=d.font+19, titleY=d.tagY+64, ruleY=titleY+titleH+7, statY=ruleY+18;
 const underlay=echo>0?<div data-layer="shared-card-echo" style={{position:'absolute',inset:0,opacity:echo}}><RankArt rank={rank} box={d.hero} f={f}/></div>:null;
 return <>
  <Backdrop tone={d.tone}/>
  {rank===1?underlay:null}
  {boardRemain?<Board f={f} mode="entry" rank={rank}/>:null}
  {rank!==1?underlay:null}
  <div data-layer="selected-card" data-card={rank} style={{...xy(land),overflow:'hidden',borderRadius:5,boxShadow:f<d.land?'0 13px 26px #0009':'none'}}>
   <RankArt rank={rank} box={[0,0,land[2],land[3]]} f={f}/>
   {f<tagAt?<div style={{position:'absolute',bottom:0,left:0,padding:'4px 8px',background:'#12100deb',fontSize:Math.min(28,Math.max(20,land[2]*.024)),opacity:rank===1?1:1-progress(f,tagAt-2,tagAt+1)}}><b className="gold">{String(rank).padStart(2,'0')}</b> {d.name} <b className="gold">+{countLabel.format(d.weekly)}</b></div>:null}
   {f<d.land-2&&rank!==1?<div style={{position:'absolute',inset:0,border:`4px solid ${GOLD}`,opacity:1-q}}/>:null}
   <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 48%,#03040361 73%,#030403e3 100%)',opacity:fade}}/>
  </div>
  <div style={{position:'absolute',left:59,top:d.tagY,display:'flex',height:58,alignItems:'center',gap:15,opacity:tagP,fontSize:35,color:'#c1b9a8'}}>
   <span style={{padding:'4px 12px',background:'linear-gradient(115deg,#f4d581,#d7aa51)',color:'#171208',fontSize:41,borderRadius:2,lineHeight:'49px'}}>No.{rank}</span>第{ordinal[rank-1]}名
  </div>
  <div className="tech" style={{position:'absolute',left:59,top:titleY,color:IVORY,fontSize:d.font,lineHeight:`${titleH}px`,whiteSpace:'nowrap',width:'max-content',transform:'skewX(-5deg) scaleX(1.13)',transformOrigin:'left center',clipPath:`inset(0 ${100*(1-titleP)}% 0 0)`,textShadow:'2px 3px #030302'}}>{d.name}</div>
  <div style={{...xy([60,ruleY,219*appearing(f,tagAt+4,13),7]),background:GOLD,boxShadow:'1px 0 15px #b89d4938'}}/>
  <div data-layer="rank-counter" data-count={starCount(rank,f)} style={{position:'absolute',left:59,top:statY,display:'flex',height:76,alignItems:'center',gap:14,opacity:counterP,color:'#bfb9aa',whiteSpace:'nowrap',fontSize:32}}>
   <span>本周</span><span className="gold" style={{fontSize:45}}>★</span><span className="digits gold" style={{lineHeight:'74px',fontSize:71}}>+{countLabel.format(starCount(rank,f))}</span><span>总 {d.total}</span>
  </div>
  <div className="mono" style={{position:'absolute',left:60,top:statY+84,color:'#b6b0a1',fontSize:26,paddingLeft:39,opacity:statP}}><Picture name="github-logo" box={[0,3,26,26]} fit="contain" style={{filter:'brightness(0) invert(.74)'}}/>{d.repo}</div>
  <BorderRail text={d.claim} style={{position:'absolute',left:60,top:statY+134,opacity:claimP}}/>
 </>;
}
const pollOpeningLabels=['网页开发','AI 办公','记账理财','工程技能','代码评审','浏览器调试','计划批注','去掉 AI 味','本地剪辑','安全审查'];
export const labels=['新网页写法','AI 办公','记账理财','工程技能','代码审查','网页调试','批注计划','去 AI 味','剪视频','安全扫描'];
const pollEntries=[6018,6020,6023,6025,6028,6030,6032,6035,6037,6040] as const;
const pollNameSize=[24,36,36,35,27,24,35,35,35,29] as const;
// Five source-sampled fractional phases, repeated by the second group on the other side.
// Pairs are alpha and horizontal distance from the final position in source pixels.
const pollSlide=[
 [[.12,47],[.40,30],[.61,17],[.78,10],[.86,6],[.93,3],[.96,1],[.98,1]],
 [[.03,56],[.29,36],[.58,22],[.70,13],[.85,7],[.91,4],[.96,2],[.98,1],[.99,1]],
 [[.20,43],[.50,27],[.66,16],[.80,9],[.88,5],[.93,3],[.97,1]],
 [[.07,51],[.32,33],[.57,20],[.76,11],[.83,6],[.90,3],[.96,2],[.98,1]],
 [[.27,39],[.52,24],[.71,14],[.81,8],[.88,4],[.93,2],[.97,1]],
] as const;
export function Poll({f}:{f:number}){
 const opening=f===6017; // Preserve the exact pre-card JSX (the entry seam is already accepted).
 const glyphW=opening?45:62, glyphH=opening?46:62;
 return <>
  <Backdrop tone="warm"/>
  <div className="tech" style={{position:'absolute',left:58,top:opening?305:298,fontSize:68,transform:'skewX(-6deg)',lineHeight:opening?1.12:'94px',opacity:opening?appearing(f,6017,3):1}}>你最想先试<br/><span className="gold">{opening?'哪':'哪一个'}</span>{opening?'一个？':'？'}</div>
  {ranks.map(r=>{
   const i=r-1, col=i%2, row=Math.floor(i/2), d=rankPlan[r];
   const age=f-pollEntries[i];
   const [alpha,travel]=age<0?[0,0]:pollSlide[i%5][age]??[1,0];
   return <div key={r} style={opening?{...xy([55+489*col,590+91*row,470,78]),opacity:0,transform:'translateY(16px)',borderRadius:4,border:'1px solid #9c7e4b58',background:'#272217',boxShadow:'0 5px 13px #0005',display:'flex',padding:'5px 12px',alignItems:'center',gap:13}:
    {...xy([48+500*col,558+134*row,484,122]),opacity:alpha,transform:`translateX(${(col===0?-1:1)*travel}px)`,borderRadius:8,border:'1px solid #9c7e4b66',background:'#221e17',boxShadow:'0 5px 13px #0005',display:'flex',padding:'0 17px 0 19px',alignItems:'center',gap:16}}>
   <b className="gold" style={opening?{fontSize:25}:{fontSize:36,lineHeight:'42px',flex:'0 0 40px'}}>{String(r).padStart(2,'0')}</b>
   <div style={{position:'relative',width:glyphW,height:glyphH,background:'#eee8da',borderRadius:opening?8:12,overflow:'hidden',flex:opening?undefined:'0 0 62px'}}><Picture name={d.badge??d.art} box={[0,0,glyphW,glyphH]} fit={d.badge?'contain':'cover'}/></div>
   {opening?<div className="tech" style={{whiteSpace:'nowrap',fontSize:r===1||r===6?24:28}}>{d.name}<div className="medium" style={{fontSize:20,lineHeight:'20px',letterSpacing:0,color:'#a69c8b'}}>{pollOpeningLabels[i]}</div></div>:
    <div style={{whiteSpace:'nowrap',minWidth:0}}><div className="tech" style={{fontSize:pollNameSize[i],lineHeight:'40px',letterSpacing:r===1||r===6?'.014em':'.025em',transform:'skewX(-6deg)',transformOrigin:'left center'}}>{d.name}</div><div style={{fontSize:28,lineHeight:'36px',color:'#c5bcaa'}}>{labels[i]}</div></div>}
  </div>;})}
  <div className="tech gold" style={{...xy([45,opening?1137:1244,990,56]),textAlign:'center',fontSize:42,opacity:appearing(f,6055,7),lineHeight:opening?undefined:'57px'}}>评论区告诉我</div>
 </>;
}
const endLabels=['脚本成稿','气口字幕','配音','素材入库','剪辑合成','1080p 成片'];
const galleryKeys = ['agent-hero','univer-dashboard-charts','chrome_features','modern-paired','review-metrics','plannotator_annotate'] as const;
export function EndCard({f}:{f:number}){
 const a=appearing(f,6093,7), b=appearing(f,6118,9), c=appearing(f,6190,6);
 const submitted = f>=6229;
 const text='Demo'.slice(0,Math.floor(progress(f,6208,6224)*4+.001));
 return <div data-layer="cta" style={{position:'absolute',inset:0}}>
  <Backdrop tone="warm"/>
  <div style={{position:'absolute',left:60,top:347,opacity:a}}>
    <div style={{fontSize:28,lineHeight:'57px',letterSpacing:6,color:'#bdb5a5'}}>本期视频由</div>
    <div className="tech" style={{fontSize:83,lineHeight:'100px',transform:'skewX(-5deg) scaleX(1.1)',transformOrigin:'left center'}}><span>Demo</span> <span className="gold">Skill</span></div>
    <div className="tech" style={{fontSize:49,lineHeight:'83px',opacity:b,color:'#bfb7a7',transform:'skewX(-6deg)'}}>全自动剪辑输出</div>
  </div>
  {f>=6115&&f<6193?<div style={{position:'absolute',inset:0,opacity:1-c}}>
    <div style={{...xy([62,656,492,603])}}>{endLabels.map((label,i)=>{const m=appearing(f,6115+i*7,5);return <div key={label} style={{position:'absolute',height:62,top:i*73,width:'100%',color:m>.5?IVORY:'#7d7460',background:'#282317b5',opacity:.25+.75*m,border:'1px solid #bc925044',fontSize:32,display:'flex',alignItems:'center',gap:13,padding:'0 15px'}}><span className="gold">{m>.97?'●':'○'}</span>{label}</div>;})}</div>
    <div style={{...xy([580,642,434,580]),opacity:appearing(f,6116,6),background:'#11100d',boxShadow:'0 11px 25px #0009',overflow:'hidden'}}>
     {galleryKeys.map((key,i)=><Picture key={key} name={galleryKeys[(i+Math.floor((f-6115)/12))%galleryKeys.length <0?i:(i+Math.floor((f-6115)/12))%galleryKeys.length]} box={[i%2*217,Math.floor(i/2)*173,213,169]} style={{borderRadius:1}}/>)}
     <b style={{position:'absolute',right:0,bottom:0,background:GOLD,padding:'6px 12px',color:'#1b1308',fontSize:23}}>示例 · 1080p 成片</b>
    </div>
    {f>=6165?<div className="tech" style={{position:'absolute',left:553,top:961,transform:'rotate(-8deg)',border:'5px solid #b54431',background:'#1b110e',color:'#e66148',padding:'10px 18px',fontSize:37,opacity:appearing(f,6165,7)}}>手动剪辑 ×0</div>:null}
  </div>:null}
  {f>=6190?<div style={{position:'absolute',inset:0,opacity:c}}>
   <div style={{...xy([88,658,904,submitted?366:244]),border:'2px solid #a7834e5e',background:'#211d15',padding:'27px 32px',boxShadow:'0 15px 35px #0005'}}>
    <div style={{fontSize:33,color:'#c7bead'}}>评论区</div>
    {submitted?<div style={{height:111,display:'flex',alignItems:'center',gap:23}}><div style={{width:76,height:76,display:'grid',placeItems:'center',background:GOLD,color:'#201808',borderRadius:'50%',fontSize:36}}>我</div><div className="tech" style={{fontSize:51,transform:'skewX(-5deg)'}}>Demo</div><div className="medium" style={{marginLeft:'auto',color:'#857d71',fontSize:24}}>刚刚</div></div>:null}
    <div style={{position:'absolute',left:32,right:32,bottom:32,height:107,border:'1px solid #685e4f',background:'#12100d',display:'flex',alignItems:'center',gap:8,padding:'10px 12px'}}>
     {!submitted?<span className="tech" style={{fontSize:50,paddingLeft:10,transform:'skewX(-5deg)'}}>{text}{f>=6207&&Math.floor(f/5)%2===0?'▏':''}</span>:null}
     <div style={{marginLeft:'auto',background:!submitted&&text==='Demo'?GOLD:'#332e26',color:!submitted&&text==='Demo'?'#22170c':'#898273',fontSize:30,padding:'15px 29px'}}>发送</div>
    </div>
   </div>
   <div className="tech" style={{position:'absolute',left:117,top:submitted?1093:1042,fontSize:100,letterSpacing:'.055em',transform:'skewX(-5deg) scaleX(1.06)',transformOrigin:'left'}}>评论区扣 <span className="gold">Demo</span></div>
  </div>:null}
 </div>;
}
