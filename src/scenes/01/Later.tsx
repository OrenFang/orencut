import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop,Check,Chip,ImageBarrier,Media,Note,Num,P,Surface,Text,at,font,thumb} from './primitives';
import type {Key} from './primitives';
import {Assembly,EditWall,Materials,Publishing,ScriptPage,Tabs,Topic,WavePage} from './Pipeline';
import {RailBody} from './CaseStudy';
import {Quantity} from './Intro';
import {cue,ease,lerp,phase,sampled,st} from './timing';
import type {Chapter} from './timing';

type Props={f:number;c:Chapter};
const tags=['工作室和团队','想日更、没团队的博主和老板','AI 时代想转型的剪辑师'] as const;
const word=(t:string,k:number,dark:boolean)=> <><span style={{fontFamily:font.mono,fontWeight:600,fontSize:'.29em',color:dark?P.lav:P.purple,marginRight:19}}>{`0${k+1}`}</span>{t}</>;
export function Keys({f,c}:Props){
 const a=ease(f,'keysItem1'), b=ease(f,'keysItem2');
 return <><Text x={150} y={333} size={125} display style={{clipPath:`inset(0 ${100-a*100}% 0 0)`,opacity:a}}>{word('组件',0,false)}</Text><div data-ft-key="rules" style={{opacity:b}}><Text x={150} y={520} size={125} display style={{clipPath:`inset(0 ${100-b*100}% 0 0)`}}>{word('规则',1,false)}</Text></div></>;
}
export function Components({f,c}:Props){
 const headline=ease(f,'componentsHead'), card=ease(f,'componentsCard'), focus=ease(f,'componentsFocus');
 const add=f>=cue('componentsCount').start?1:0;
 const n=Math.round(sampled(f,'componentsCount'));
 return <>
  <Text x={150} y={235} size={125} display style={{transform:`translateY(${(1-headline)*108}px)`}}>{word('组件',0,false)}</Text>
  <Text x={150} y={584} size={49} color={P.ink} style={{opacity:add}}><Num color={P.purple} style={{fontSize:193,marginRight:14}}>{n}</Num>个组件</Text>
  {card>0&&<div style={{...at(778+(1-card)*201,156-(1-card)*57,1080,604),transform:`perspective(2200px) rotateY(${-12+focus*6}deg) rotateZ(${-.7+focus*.7}deg) scale(${1+.04*focus})`,transformOrigin:'center center',opacity:card}}><Media name="catalog" x={0} y={0} w={1080} h={604} shadow position="center 32%" style={{boxShadow:'0 28px 55px #20192e26'}}/><Note x={14} y={558}>Demo 官网公开组件目录 · 计数为原片自述</Note></div>}
 </>;
}
const rules:[string,string][]=[['11-11','大胶囊一期合计 ≤ 2 处'],['10-28','叮咚音效全部不用'],['11-11','不堆特效：满屏砸字、震屏、闪白都不用']];
const finalRules:[string,string][]=[['11-06','审看方式：直接交完整 1080p 预览'],['11-11','反例用我自己的旧版，好例子用高赞视频'],['11-10','录屏要有头有尾'],['11-06','毛刷高亮：每个场景最多 1 处'],['11-10','一期之内统一用一种章节卡'],['11-03','财经横竖都只用金、红、黑'],['11-11','结尾不把整页缩成小卡']];
export function Rules({f,c}:Props){
 const a=ease(f,'rulesHead'), b=ease(f,'rulesCard'), final=ease(f,'rulesFinish');
 const rows=final>.42?finalRules:rules;
 return <>
  <Text x={120} y={76} size={121} display color="#fff" style={{opacity:a,clipPath:`inset(0 ${100-a*100}% 0 0)`}}>{word('规则',1,true)}</Text>
  {b>0&&<Surface x={898} y={172} w={884} h={698} dark style={{boxShadow:'0 23px 55px #0006',opacity:b,transform:`translateY(${28*(1-b)}px)`}}>
    <div style={{height:84,paddingLeft:30,display:'flex',alignItems:'center',color:'#a2a0a6',fontFamily:font.mono,fontSize:24}}>SKILL.md · 决定表（Demo 说过的最新结论）</div>
    {rows.map(([d,t],i)=>{
     const v=final>.42?st(f,cue('rulesFinish').start+12,19,i*8):st(f,cue('rulesRows').start,18,i*20); const h=final<=.42&&i===Math.min(2,Math.floor(phase(f,'rulesRows')*3));
     return <div key={t} style={{display:'flex',height:74,alignItems:'center',boxSizing:'border-box',paddingLeft:30,gap:31,whiteSpace:'nowrap',background:h?'#32323a':'transparent',opacity:v}}><span style={{fontFamily:font.mono,fontSize:21,color:P.lav}}>{d}</span><b style={{fontSize:31,color:'#fff'}}>{t}</b></div>;
    })}
  </Surface>}
  {final>.2&&<><Text x={120} y={638} size={36} color="#bcb8bf" style={{opacity:final}}>两本手册里的规则</Text><Text x={116} y={694} size={213} display color={P.lav} style={{opacity:final}}>{Math.round(56*final)}<span style={{color:'#fff',fontFamily:font.body,fontWeight:900,fontSize:55,marginLeft:13}}>条</span></Text><Check x={1713} y={122} size={113} style={{opacity:st(f,cue('rulesFinish').end-20,17)}}/></>}
 </>;
}
function AudienceTitle({k,f,c,full=false}:{k:number;f:number;c:Chapter;full?:boolean}){
 const p=full?st(f,c.start,18):1;
 return <Text x={full?0:131} y={full?410:75} w={full?1920:1540} size={full?114:57} display color="#fff" style={{textAlign:full?'center':'left',clipPath:`inset(0 ${100-p*100}% 0 0)`,opacity:p}}>{word(tags[k],k,true)}</Text>;
}
export function AudienceList({f,c}:Props){
 const shift=ease(f,'audienceFocus');
 return <><Backdrop kind="studio" frame={f-c.start}/>
  {([tags[0],tags[1],'想转型的剪辑师']).map((t,i)=>{
   const a=st(f,cue('audienceList').start,16,i*12), x=i===0?lerp(218,131,shift):218,y=i===0?lerp(244,75,shift):244+i*167, size=i===0?lerp(105,57,shift):105;
   return <Text key={t} x={x} y={y} size={size} color="#fff" display style={{clipPath:`inset(0 ${100-a*100}% 0 0)`,opacity:a*(i===0?1:1-shift)}}>{word(t,i,true)}</Text>;
  })}
 </>;
}
function PriceCard({x,y,w,h,employee=false,p}:{x:number;y:number;w:number;h:number;employee?:boolean;p:number}){
 return <Surface x={x} y={y} w={w} h={h} style={{borderRadius:25,opacity:p,transform:`translateY(${23*(1-p)}px)`,padding:'44px 47px',boxSizing:'border-box',boxShadow:'0 20px 43px #0006'}}>
  <div style={{fontSize:27,color:'#656369',marginBottom:20}}>{employee?'剪辑师 · 月薪':'常规剪辑 · 按分钟'}</div>
  <div style={{display:'grid',gridTemplateColumns:'122px 1fr',rowGap:13}}>{(employee?[['月薪','8000 元 / 月'],['范围','剪辑工作'],['口径','原片自述']]:[['价格','150 元 / 分钟'],['做什么','字幕、配乐、简单动画'],['数量','约 70 分钟'],['交付时间','一期约 48 小时']]).map(([a,b],i)=><React.Fragment key={a}><small style={{color:'#78757a',fontSize:23}}>{a}</small><b style={{fontSize:i===0?36:25,color:P.ink,whiteSpace:'nowrap'}}>{b}</b></React.Fragment>)}</div>
  <div style={{marginTop:22,fontSize:19,color:'#80768a'}}>原片价格口径 · 非当前报价</div>
 </Surface>;
}
export function Team({f,c}:Props){
 const a=ease(f,'teamRate'), b=ease(f,'teamHire');
 return <><Backdrop kind="studio" frame={f-c.start}/><AudienceTitle k={0} f={f} c={c}/>
  {a>0&&<PriceCard x={147} y={253} w={680} h={477} p={a*(1-b*.23)}/>}
  {a>0&&<div style={{opacity:a,transform:`translateY(${-b*59}px)`}}><Text x={894} y={303} size={39} color="#e0e2e1">外包剪辑</Text><Text x={886} y={349} display size={173} color="#fff">150–200 <span style={{fontFamily:font.body,fontWeight:900,fontSize:48}}>元 / 分钟</span></Text></div>}
  {b>0&&<div style={{opacity:b}}><Text x={894} y={549} size={39} color="#e0e2e1">自己招剪辑师</Text><Text x={891} y={599} display size={165} color={P.lav}>8000 <span style={{fontFamily:font.body,fontWeight:900,fontSize:48,color:'#fff'}}>元 / 月</span></Text></div>}
  <Text x={148} y={754} size={24} color="#ccc7cf" style={{fontFamily:font.mono,fontWeight:600,opacity:a}}>demo-fu.com / video-editing</Text>
 </>;
}
const workers:Key[]=['studio','resolve','kdenlive','key','codex','portraitOffice'];
export function Labor({f,c}:Props){
 const b=ease(f,'teamSave');
 return <><Backdrop kind="studio" frame={f-c.start}/><AudienceTitle k={0} f={f} c={c}/>
  {workers.map((k,i)=>{
   const a=st(f,cue('teamTiles').start,20,i*8);
   return a>0&&<Media key={k} name={k} x={221+i*243} y={231+(1-a)*41} w={226} h={285} r={19} position="center 45%" style={{opacity:a,boxShadow:'0 12px 23px #0008'}}/>;
  })}
  <Text x={0} y={646} w={1920} size={54} color="#fff" style={{textAlign:'center',opacity:b}}>同样的产出，至少省 <Num color={P.lav} style={{fontSize:128}}>一半</Num> 人力</Text>
 </>;
}
export function Catalog({f,c}:Props){
 const a=st(f,c.start,19);
 return <><Backdrop kind="studio" frame={f-c.start}/><AudienceTitle k={0} f={f} c={c}/><Media name="catalog" x={359} y={197+28*(1-a)} w={1202} h={681} r={26} position="center 35%" style={{opacity:a,boxShadow:'0 20px 52px #0007'}}/><Chip x={359} y={895} purple size={24} style={{opacity:a}}>Skill + 400 多个组件</Chip><Note x={1331} y={891} onDark style={{opacity:a}}>官网公开组件目录</Note></>;
}
const genres:[Key,string][]=[['portraitFinance','财经'],['portraitOffice','职场'],['portraitVlog','Vlog'],['portraitFood','吃播']];
export function Genres({f,c}:Props){
 const shown=genres.filter((_,i)=>f>=cue(`genre${i+1}`).start).length;
 return <><Backdrop kind="studio" frame={f-c.start}/><AudienceTitle k={0} f={f} c={c}/>
  <Text x={0} y={150} w={1920} size={61} display color="#fff" style={{textAlign:'center',opacity:st(f,c.start,16)}}>一整套<span style={{color:P.lav}}>复刻方法</span></Text>
  {genres.map(([k,t],i)=>{
    const a=ease(f,`genre${i+1}`);if(a<=0)return null;
    const x=(1920-Math.max(1,shown)*367)/2+i*367+17;
    return <React.Fragment key={t}><Media name={k} x={x} y={251+32*(1-a)} w={311} h={551} r={25} style={{opacity:a,boxShadow:'0 12px 45px #0007'}}/><Text x={x} y={819} w={311} display size={56} color="#fff" style={{textAlign:'center',opacity:a}}>{t}</Text></React.Fragment>;
  })}
 </>;
}
export function SoloAndEditor({f,c}:Props){
 const editor=c.id==='editorTitle' || c.id==='desk' || c.id==='editor', k=editor?2:1, full=c.id.endsWith('Title'), image=editor?'edit':'studio';
 const result=ease(f,'soloResult');
 return <><Backdrop kind={image} frame={f-c.start}/><AudienceTitle k={k} f={f} c={c} full={full}/>
  {!full&&!editor&&<>
    {['自己不会剪','找人剪费劲','质量一般','纯口播没人看'].map((s,i)=>{
      const fourth=i===3;
      // The fourth card first arrives readable on f5071, then settles in place.
      const p=cue('soloItem4').start;
      const a=fourth?(f<p?0:f===p ? .94 : 1):ease(f,`soloItem${i+1}`);
      if(fourth&&(a===0||result===1))return null;
      const bump=fourth?(f===p?25:f===p+1?6:0):29*(1-a);
      return <div key={s} data-ft-solo-card={fourth?'4':undefined} style={{...at(190+i*400,380+bump,360,220),borderRadius:24,border:'2px solid #ffffff29',display:'grid',placeItems:'center',color:'#fff',background:'#84838b30',boxShadow:'0 6px 22px #0002',fontFamily:font.title,fontSize:fourth?56:60,opacity:a*(1-result),...(fourth?{boxSizing:'border-box',padding:'0 10px',whiteSpace:'nowrap'}:{})}}>{s}</div>;
    })}
    {result>0&&<div style={{opacity:result}}>{['选题','找素材','写稿','配音字幕','剪辑','封面发布'].map((t,i)=><Chip key={t} x={189+i*254} y={423} size={27} style={{width:230,padding:'13px 0',justifyContent:'center',background:i===5?'white':'#ffffff24',color:i===5?P.ink:'#c6c3c8'}}><span style={{fontFamily:font.mono,fontSize:17,color:P.purple,marginRight:11}}>0{i+1}</span>{t}</Chip>)}{(['fire','codex','github','blue'] as Key[]).map((key,i)=><Media key={key} name={key} x={193+i*365} y={559} w={340} h={195} r={20} style={{border:'3px solid #fff'}}/>)}<Note x={1459} y={387}>选题 3 · 独立样片</Note></div>}
  </>}
  {!full&&editor&&<EditorStage f={f}/>}
 </>;
}
const editorTiles:Key[]=['fire','split','github','chip','blue','codex'];
function EditorStage({f}:{f:number}){
 const a=ease(f,'editorDesk'), b=ease(f,'editorWall'), change=ease(f,'editorNotes');
 return <>
  {a>0&&<Media name="kdenlive" x={131} y={199+27*(1-a)} w={761} h={423} r={20} style={{opacity:a*(1-b*.52),filter:`saturate(${1-b*.82})`,boxShadow:'0 20px 33px #0008'}}/>}
  <Text x={130} y={647} size={43} color="#fff" style={{opacity:a*(1-b*.59)}}>以前 · 一期要 <Num style={{fontSize:137,marginLeft:11}}>7–8</Num> 小时</Text>
  {b>0&&<div style={{opacity:b,transform:`translateX(${37*(1-b)}px)`}}>
    {change<1&&<div style={{opacity:1-change}}><ImageBarrier keys={editorTiles}/><div style={{...at(1000,177,765,536),display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gridTemplateRows:'repeat(3, 1fr)',gap:9}}>{editorTiles.map((k,i)=><div key={k} style={{...thumb(k),borderRadius:11,opacity:st(f,cue('editorWall').start,15,i*5)}}/>)}</div></div>}
    {change>0&&<div style={{opacity:change}}><EditWall x={1000} y={181} w={765} h={557} dark/></div>}
    <Text x={1000} y={773} w={765} size={58} display color="#fff" style={{textAlign:'center',opacity:1-change}}>现在 · 一天 <span style={{color:P.lav}}>5–10</span> 期</Text><Text x={1000} y={774} w={765} size={64} display color="#fff" style={{textAlign:'center',opacity:change}}>你只负责<span style={{color:P.lav}}>看片提意见</span></Text></div>}
 </>;
}

export function OutroTitle({f}:{f:number}){
 const e=cue('outroTitle'), cap=ease(f,'outroCta');
 const letters=Array.from('Demo 全自动剪辑 Skill');
 return <>
  <div data-ft-outro-title="Demo 全自动剪辑 Skill" style={{...at(154,336,1612,140),display:'flex',justifyContent:'center',columnGap:0,fontFamily:font.title,fontSize:114,whiteSpace:'pre',lineHeight:1.15}}>{letters.map((g,i)=>{
    const a=st(f,e.start,9,i*.88);
    return <span key={i} style={{whiteSpace:'pre',color:i>=9&&i<=13?P.purple:P.ink,opacity:a,margin:g===' '?'0 12px':0,transform:`translateY(${-76*(1-a)}px)`}}>{g}</span>;
  })}</div>
  {cap>0&&<div style={{...at(512,568+20*(1-cap),896,145),borderRadius:110,background:P.black,color:'#fff',boxShadow:'16px 19px 23px #0006',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:font.title,fontSize:84,opacity:cap,transform:`scale(${.94+.06*cap})`,whiteSpace:'nowrap'}}>评论区扣<span style={{color:P.lav}}>Demo</span></div>}
 </>;
}
const replayComponents=[Topic,Materials,ScriptPage,WavePage,Assembly,Publishing] as const;
const replaySample=['topicList','materialCuts','scriptText','waveDetails','assemblyExtras','publishCheck'] as const;
export function Replay({f,c}:Props){
 const index=Math.max(0,Array.from({length:6},(_,i)=>i).reverse().find(i=>f>=cue(`replayStep${i+1}`).start)??0);
 const first=cue('replayStep1').start, tween=st(f,cue(`replayStep${index+1}`).start,9), fade=ease(f,'replayFade'), entry=st(f,first-1,6), tab=index===2?2:index===3?3:index>=4?4:0;
 const nav=(f===first ? .66 : entry)*(1-fade), panel=f===first?0:entry*(1-fade);
 const countEnd=cue('countNew').end;
 const compactQuantity=f<cue('replayTopic').start;
 const finalRail=f>=cue('replayStep6').start;
 const Inner=replayComponents[index]; const innerF=cue(replaySample[index]).end+16;
 return <>
  <AbsoluteFill data-ft-replay="nav" style={{opacity:nav}}><Tabs active={tab}/></AbsoluteFill>
  {panel>0&&<AbsoluteFill data-ft-replay="panel" style={{opacity:panel}}><Surface x={347} y={253+(1-tween)*19} w={1226} h={689} style={{boxShadow:'0 23px 58px #0003',background:finalRail?'#1b1b1d':'#fff'}}>
   <div style={{...at(0,0,1920,1080),transform:'scale(.63854)',transformOrigin:'0 0'}}>
    {compactQuantity?<Quantity f={countEnd+1} c={{...c,start:countEnd-26}}/>:finalRail?<RailBody f={cue('railFinish').end} limit={4} inset/>:<Inner f={innerF} c={c} mini={index===0}/>}
    </div>
    </Surface></AbsoluteFill>}
 </>;
}
