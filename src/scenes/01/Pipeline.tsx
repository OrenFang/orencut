import React from 'react';
import type {CSSProperties} from 'react';
import {Arrow, Check, Chip, ImageBarrier, Media, Mono, Note, P, Surface, Text, at, font, thumb, wall} from './primitives';
import type {Key} from './primitives';
import {cue,ease,phase,sampled,st} from './timing';
import type {Chapter} from './timing';
import wave from './wave-points.json';

type Props={f:number;c:Chapter};
const steps=['选题','找素材','写稿','配音字幕','剪辑','封面发布'] as const;
export function Tabs({active}:{active:number}) {
 let x=147;
 return <>{steps.map((id,i)=>{
   const on=i===active, w=on?230:213, left=x-(on&&i===0?6:0); x+=w+13;
   return <div key={id} data-ft-tab={on?String(i+1):undefined} style={{...at(left,on?92:94,w,on?76:71),display:'flex',alignItems:'center',justifyContent:'center',columnGap:14,borderRadius:100,boxShadow:on?'0 19px 26px #17141f2d':undefined,background:on?P.ink:'#f0f0f2',color:on?'#fff':'#929095',fontSize:34,fontWeight:900,whiteSpace:'nowrap'}}><Mono color={on?P.lav:'#9b999f'} style={{fontSize:22,letterSpacing:1}}>{`0${i+1}`}</Mono>{id}</div>;
 })}</>;
}
function Heading({children}:{children:React.ReactNode}){return <div style={{height:62,display:'flex',alignItems:'center',padding:'0 32px',background:'#f5f5f7',color:'#747278',fontFamily:font.mono,fontWeight:600,fontSize:25,whiteSpace:'nowrap'}}>{children}</div>;}
function Statistics(){
 return <Surface x={1170} y={234} w={600} h={347} style={{borderRadius:27,padding:'12px 26px',boxSizing:'border-box'}}>
   <div style={{fontSize:24,fontWeight:900}}>核心指标 <span style={{float:'right',fontWeight:500,color:'#5f5b62'}}>近30天</span></div>
   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',rowGap:20,paddingTop:18}}>{[['稿均点赞量','9509.6','31.36'],['稿均涨粉量','1013.6','44.88'],['稿均分享量','1475.5','38.43'],['稿均评论量','198.5','60.57']].map(([name,value,rise])=><div key={name} style={{textAlign:'center'}}><div style={{fontSize:21,color:'#777'}}>{name}</div><div style={{fontSize:29}}>{value}</div><div style={{fontSize:19,color:'#a56e77'}}>较上周期 +{rise}%</div></div>)}</div>
 </Surface>;
}
const topicTitles=['207 一条快 400 万播放的财经视频，没有一帧是我剪的','208 为什么你用 AI 剪的视频看起来很廉价','209 我把整套全自动做视频的流程全部讲出来'];
export function Topic({f,c,mini=false}:Props&{mini?:boolean}){
 const card=mini?1:ease(f,'topicOpen'), list=mini?1:ease(f,'topicList');
 const stats=mini?1:ease(f,'topicStats');
 return <>
  <Tabs active={0}/>
  {card>0&&<div style={{opacity:card,transform:`translateY(${21*(1-card)}px)`}}>
   <Surface x={150} y={246} w={980} h={602} style={{opacity:1-list*.29}}>
    <Heading>低粉爆款_AI剪辑Skill/daily-report.md</Heading>
    <div style={{padding:'23px 41px',lineHeight:1.5}}>
     <div style={{fontSize:38,fontWeight:900,lineHeight:1.17}}>低粉爆款 | AI剪辑 / Skill 赛道（2026-11-09，近 7 天）</div>
     <div style={{fontSize:31,fontWeight:900,margin:'18px 0 7px'}}>结论</div>
     {['赛道是热的，而且低粉也能爆','流量的主引擎是“豆包工作”','低粉爆款最有效的一句话是“免费开源，代替剪映”','用户关心的是“开源剪辑 Skill”，不是 Remotion 本身'].map((t,i)=><div key={t} style={{fontSize:28,color:'#616064'}}>{i+1}. {t}</div>)}
    </div>
   </Surface>
   {stats>0&&<div style={{opacity:stats,transform:`translateY(${18*(1-stats)}px)`}}><Statistics/>
   <Note x={1172} y={599} style={{background:'#f2eaff',fontSize:24,color:P.purple,fontWeight:900}}>我的后台数据 · 原片历史口径</Note></div>}
   {list>0&&topicTitles.map((t,i)=>{
     const a=mini?1:st(f,cue('topicList').start,16,i*7);
     const tick=mini?1:st(f,cue('topicConfirm').start,9,i*3);
     return <div key={t} style={{...at(300,330+i*153,1320,130),background:i===0?P.black:'#fff',color:i===0?'#fff':P.ink,boxSizing:'border-box',borderRadius:24,boxShadow:P.shadow,display:'flex',alignItems:'center',padding:'0 46px',fontSize:42,fontWeight:900,opacity:a,transform:`translateY(${25*(1-a)}px)`,whiteSpace:'nowrap'}}>{t}{tick>0&&<div data-ft-topic-tick={i+1} style={{...at(1212+(i===2?14:0),i===2?43:26,i===2?48:78,i===2?48:78),background:i===0?'#fff':P.black,borderRadius:'50%',color:i===0?P.purple:P.lav,display:'grid',placeItems:'center',fontSize:i===2?30:49,opacity:tick,transform:`scale(${.8+.2*tick})`}}>✓</div>}</div>;
   })}
  </div>}
 </>;
}

const material:[Key,string,string,string][]=[['release','新闻稿页','GTC 新闻稿','center 10%'],['stage','发布会照片','GTC 舞台照片','center'],['report','官方文件','NVIDIA 财报原页','center 18%'],['chart','数据图表','NVIDIA Blog 图表','center']];
export function Materials({f}:Props){
 const lead=cue('materialReveal').start, cut=ease(f,'materialCuts');
 const file=ease(f,'materialFile');
 return <>
  <Tabs active={1}/>
  {file>0&&<Text x={150} y={226} size={28} color="#666369" style={{fontFamily:font.mono,fontWeight:600,opacity:file}}>021_案例 / 01_输入素材</Text>}
  {material.map(([key,name,note,p],i)=>{
    const a=st(f,lead,9,[0,35,61,88][i]),x=150+i*409; if(a<=0)return null;
    const b=st(f,cue('materialCuts').start,20,i*6);
    return <div key={key} data-ft-material-card={key} style={{opacity:a,transform:`translateY(${21*(1-a)}px)`}}>
       <Media name={key} x={x} y={400} w={380} h={260} shadow position={p}/>
       <Text x={x} y={675} w={380} size={40} style={{textAlign:'center'}}>{name}</Text>
       <Note x={x+75} y={725}>独立示例 · {note}</Note>
       {b>0&&<div style={{...at(x+25,782,330,62),display:'flex',flexWrap:'wrap',gap:7,opacity:b}}>{['原件','备选取景'].map(item=><span key={item} style={{background:'#f0eef2',padding:'3px 13px',fontSize:21,borderRadius:6,color:'#545059'}}>■ {item}</span>)}</div>}
    </div>;
  })}
  {cut>0&&<Text x={1240} y={856} w={514} size={26} color="#64626a" style={{textAlign:'right',opacity:cut}}>这一期拆出 <span style={{color:P.purple,fontFamily:font.title,fontSize:60,fontWeight:400}}>17</span> 个镜头 · 原片口径</Text>}
 </>;
}
const openingCopy='我一个剪辑师都没请，这个月AI全自动帮我做了90条视频，平均每一条点赞将近1万，涨粉1000多。没有一帧是我自己剪的，就连你现在听到的这个声音，都是AI复刻的。';
export function ScriptPage({f}:Props){
 const p=ease(f,'scriptCard'), ink=phase(f,'scriptText'), revise=ease(f,'scriptRevision');
 const i=Math.floor(openingCopy.length*ink);
 return <>
  <Tabs active={2}/>
  {p>0&&<div style={{opacity:p,transform:`translateY(${22*(1-p)}px)`}}><Surface x={248} y={259} w={1424} h={612}>
   <Heading>209_全自动剪辑全流程 / drafts / 口播逐字稿-v3.md</Heading>
   <div style={{padding:'22px 48px',fontSize:35,lineHeight:1.55}}><b>## 正文</b><div style={{fontSize:30}}>### 开头</div><div style={{fontSize:48,wordBreak:'break-all',width:1300,marginTop:16,opacity:1-revise}}><b>{openingCopy.slice(0,Math.min(i,31))}</b>{openingCopy.slice(Math.min(i,31),i)}</div>{revise>0&&<div style={{...at(46,219,1288),opacity:revise,fontSize:43,lineHeight:1.65}}><div style={{color:'#9c929e',textDecoration:'line-through',textDecorationColor:'#dc9aaa'}}>我一个剪辑师都没请，这个月AI全自动帮我做了90条视频。</div><b style={{color:P.purple}}>{'我用AI这个月全自动做了90条视频，涨了3万粉'.slice(0,Math.max(1,Math.ceil(revise*27)))}</b></div>}</div>
  </Surface><Note x={253} y={881} style={{color:P.purple,fontSize:25,background:'#f2eafa'}}>AI 按我的口吻写 · 原片稿件复排</Note></div>}
 </>;
}

export function WaveGlyph({width,height,values=wave,color='#8554e8',alpha=1}: {width:number;height:number;values?:number[];color?:string;alpha?:number}){
 const n=values.length;
 const points=values.map((v,i)=>`${i*width/(n-1)},${height/2-Math.max(.7,v*height*.47)}`);
 const base=values.map((v,i)=>`${i*width/(n-1)},${height/2+Math.max(.7,v*height*.48)}`).reverse();
 return <svg role="img" aria-label="源混音统计波形" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{display:'block',opacity:alpha}}><path d={`M${points.join(' L')} L${base.join(' L')} Z`} fill={color}/><path d={`M0 ${height/2}H${width}`} stroke={color} strokeWidth="2.5" opacity=".9"/></svg>;
}
export function WavePage({f}:Props){
 const p=ease(f,'waveCard'), dial=phase(f,'waveCursor');
 return <>
  <Tabs active={3}/>
  {p>0&&<Surface x={141} y={234} w={1629} h={563} dark style={{opacity:p,transform:`translateY(${21*(1-p)}px)`,background:'#222224'}}>
   <div style={{height:54,display:'flex',alignItems:'center',padding:'0 20px',background:'#151518',color:'#a5a2a8',fontSize:23,fontFamily:font.mono}}>02_音频 / 209_全自动剪辑 · 波形与字幕对齐（编辑图解）</div>
   <div style={at(41,164,1542,200)}><WaveGlyph width={1542} height={200} color="#833ceb"/><div style={{...at(1541*dial,0,4,200),background:'#f9f4ff'}}/></div>
   <Chip x={44} y={82} purple style={{opacity:ease(f,'waveDetails'),fontSize:25}}>用我的声音复刻 · 我的音色</Chip>
   <Text x={391} y={87} size={28} color="#fff" style={{opacity:ease(f,'waveDetails')}}>字幕跟随自动对齐</Text>
   {['第四步配音和字幕','用的是复刻的我自己的声音','字幕自动对齐','读错的地方自动修掉','我连录音都省了'].map((v,i)=>{
    const a=st(f,cue('waveDetails').start,16,i*8);
    return <div key={v} style={{...at(39+i*318,404,299,91),background:i===Math.min(4,Math.floor(dial*5))?'#322740':'#292a2e',borderRadius:8,padding:'22px 15px',boxSizing:'border-box',color:'#fff',fontSize:22,fontWeight:900,opacity:a}}>{v}</div>;
   })}
  </Surface>}
 </>;
}

const editText=['我用 AI 这个月全自动做了 90 条视频','我过往 4 个月一共才发 80 期视频','你看左边是我几个月前的视频'];
const editAsset:Key[]=['split','steps','doc']; const editRight:Key[]=['fire','chart','resolve'];
export function Assembly({f}:Props){
 return <>
  <Tabs active={4}/>
  {editText.map((s,i)=>{
    const a=st(f,cue('assemblyRows').start,15,i*6), b=st(f,cue('assemblyExtras').start,17,i*6), y=256+i*226;
    return <React.Fragment key={s}>
      {a>0&&<div style={{opacity:a,transform:`translateX(${24*(1-a)}px)`}}><div style={{...at(147,y+59,639,87),display:'flex',alignItems:'center',paddingLeft:25,boxSizing:'border-box',background:'#f2f2f4',borderRadius:12,fontSize:31,fontWeight:900}}>{s}</div><Arrow x={822} y={y+89} w={75}/><Media name={editAsset[i]} x={931} y={y} w={386} h={203} shadow/></div>}
      {b>0&&<Media name={editRight[i]} x={1371} y={y} w={377} h={203} shadow style={{opacity:b,transform:`translateX(${29*(1-b)}px)`}}/>}
    </React.Fragment>;
  })}
 </>;
}
const checkAssets:Key[]=['stage','stage','wideStage','release','chip','finance','chart','portraitOffice','portraitOffice','resolve','kdenlive','wideStage','city','city','split','steps'];
export function EditWall({x,y,w,h,dark=false}: {x:number;y:number;w:number;h:number;dark?:boolean}) {
 return <><ImageBarrier keys={Array.from(new Set(checkAssets))}/><div style={{...at(x,y,w,h),borderRadius:18,overflow:'hidden',boxShadow:dark?'0 14px 28px #0008':P.shadow,background:'#1a1a1b',display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gridTemplateRows:'repeat(4, 1fr)',gap:4}}>{checkAssets.map((key,i)=><div key={i} style={{...thumb(key),filter:i%4===0?'brightness(.88)':undefined}}/>)}</div></>;
}
export function Review({f}:Props){
 return <><Tabs active={4}/><EditWall x={148} y={260} w={1000} h={654}/><Text x={1205} y={264} size={31} color="#606067">出片前自己检查</Text><Note x={1205} y={311}>独立镜头墙 · 检查项目复排</Note>
  {['黑屏','闪帧','文字重叠'].map((s,i)=>{
   const a=st(f,cue('reviewChecks').start,14,i*22), y=400+i*139;
   return <React.Fragment key={s}><Check x={1206} y={y} size={77} style={{opacity:a}}/><Text x={1300} y={y+1} color={a>.12?P.ink:'#d1d0d2'} size={65} display>{s}</Text></React.Fragment>;
  })}
 </>;
}

export function GraphicCover({x,y,w,h,r=14,rotate=0,style}:{x:number;y:number;w:number;h:number;r?:number;rotate?:number;style?:CSSProperties}){
 return <div style={{...at(x,y,w,h),transform:`rotate(${rotate}deg)`,border:'4px solid #fff',background:'#171719',boxSizing:'border-box',borderRadius:r,boxShadow:'0 12px 30px #09050c55',overflow:'hidden',...style}}>
   <Media name="jensen" x={-2} y={0} w={w} h={h} r={0} position="29% center" style={{filter:'saturate(.62) brightness(.76)'}}/>
   <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#16151a00 35%,#111014f2 100%)'}}/>
   <Text x={w*.075} y={h*.62} size={Math.max(19,w*.098)} color="#faf7ee" display>黄仁勋 · AI 主题</Text>
   <Text x={w*.075} y={h*.77} size={Math.max(17,w*.096)} color="#f7d951" display>AI未来在哪里？</Text>
 </div>;
}
const publishingRows=[
 {platform:'抖音',field:'标题',copy:'黄仁勋与 AI 的未来？'},
 {platform:'B 站',field:'标题',copy:'黄仁勋与 AI 的未来？｜AI 主题讨论'},
 {platform:'视频号',field:'短标题',copy:'黄仁勋与 AI 的未来'},
 {platform:'小红书',field:'标题',copy:'黄仁勋与 AI 的未来？'},
] as const;
export function Publishing({f}:Props){
 const p=ease(f,'coverFan'), body=ease(f,'publishDoc'), check=ease(f,'publishCheck');
 return <>
  <Tabs active={5}/>
  {[[-9,149,326,394,307],[-3,378,417,330,323],[8,597,506,291,386]].map(([r,x,y,w,h],i)=>{
   const a=st(f,cue('coverFan').start,19,i*9);
   return a>0&&<GraphicCover key={i} x={x+(1-a)*32} y={y+(1-a)*33} w={w} h={h} rotate={r+(1-a)*7} style={{opacity:a}}/>;
  })}
  <Note x={144} y={879} style={{background:'#efe7ff',color:P.purple,opacity:p}}>一次出 3 个比例 · 独立肖像替图</Note>
  {body>0&&<Surface x={997} y={234} w={780} h={631} style={{opacity:body,transform:`translateY(${26*(1-body)}px)`}}>
    <Heading>021 / 发布文案_v2.md <span style={{position:'absolute',right:30,fontFamily:font.body,fontSize:19,color:'#6d587e'}}>拟文示例 · 非发布记录</span></Heading>
    <div style={{padding:'19px 32px'}}>{publishingRows.map(({platform,field,copy},i)=>{
      const alpha=i<2?st(f,cue('publishDoc').start,14,i*8):sampled(f,i===2?'publishVideoRow':'publishSocialRow');
      if(alpha===0)return null;
      return <div key={platform} data-ft-publish-row={platform} style={{height:130,opacity:alpha,transform:`translateY(${12*(1-alpha)}px)`}}><b style={{fontSize:34}}>## {platform}</b><div style={{fontSize:24,color:'#616066',marginTop:5}}>{field}：{copy}</div></div>;
    })}</div>
  </Surface>}
  <Check x={1658} y={193} size={112} style={{opacity:check,transform:`scale(${.8+check*.2})`}}/>
  {check>0&&<Chip x={1001} y={886} purple size={24} style={{opacity:check}}>我看一遍，点发布</Chip>}
 </>;
}

export const materialKeys = material.map(a=>a[0]);
export const coverKeys = [...wall];
