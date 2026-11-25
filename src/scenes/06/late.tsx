import React from 'react';
import {Pic,Mark} from './projects';
import {C,F,Chip,Chips,Discs,Foot,Hint,MiniStat,Tech,Window,fmt,faded,panel,rect} from './primitives';
import {anchor,meter,phase,settle,type Scene,type Timeline} from './motion';

type SceneProps={tl:Timeline;f:number;scene:Scene};
const quick=(f:number,scene:Scene)=>settle(f,scene.start,scene.start+12);
const brightPanel:React.CSSProperties={background:'#f3eee2',border:'1px solid #beaa855d',color:'#211d16',borderRadius:8,boxShadow:'0 19px 29px #080605ae'};

const Last:React.FC<SceneProps>=({tl,f,scene})=>{
 const p=quick(f,scene);
 if(scene.id==='last-platforms'){
   const platforms=[['Reddit','真实讨论'],['X','帖子与互动'],['YouTube','评论与播放'],['TikTok','短视频热度'],['Polymarket','预测赔率']];
   return <>
    {platforms.map(([label,sub],i)=>{const x=(i<3?59+324*i:221+324*(i-3)),y=i<3?403:550,a=anchor(tl,'last-platform',i),q=settle(f,a,a+9);return <div key={label} style={{...rect(x,y,312,126),...panel,...faded(f,a,10),padding:'19px 18px',borderColor:q>.8?C.line:'#44382c'}}><Tech size={43}>{label}</Tech><div style={{color:C.gold,fontWeight:900,fontSize:23,marginTop:9}}>{sub}</div></div>;})}
    <div style={{...rect(56,733,968,150),...panel,padding:'21px 24px',...faded(f,anchor(tl,'last-platform',5))}}><span style={{fontSize:21,letterSpacing:'.06em',color:C.muted}}>两类信号 · 真实排序依据</span><div style={{marginTop:9}}><Tech size={41}>真实点赞 <span style={{color:C.gold}}>＋</span> 真实预测赔率</Tech></div></div>
   </>;
 }
 if(scene.id==='last-sample')return <><Window r={6} top={383} height={569} title='last30days · 官方公开样例静帧' zoom={1+.08*phase(f,scene.start,scene.end)} dy={-11*phase(f,scene.start,scene.end)} opacity={p}/><Hint top={1012} f={f} on={scene.start+13}>实际展示为官方样例静帧 · 未执行检索</Hint></>;
 if(scene.id==='last-release')return <div style={{...rect(62,412,956,677),...brightPanel,padding:'26px 31px',opacity:p,overflow:'hidden'}}>
   <div style={{fontFamily:F.mono,fontSize:19,color:'#6e5a44',marginBottom:24}}>mvanhorn/last30days-skill · v4 · 原片更新摘录</div>
   <div style={{fontWeight:900,fontSize:44,lineHeight:1.12,opacity:settle(f,anchor(tl,'last-release'),anchor(tl,'last-release')+9)}}>Patent Secret Signals:<br/><span style={{background:'#efce79'}}>美国当月专利公开信号</span><div style={{fontWeight:500,fontSize:28,marginTop:12}}>对公司新增专利信息进行归纳。</div></div>
   <div style={{borderTop:'1px solid #9f87567f',marginTop:38,paddingTop:26,fontWeight:900,fontSize:44,lineHeight:1.12,opacity:settle(f,anchor(tl,'last-release',1),anchor(tl,'last-release',1)+9)}}>Jobs Page Secret Signals:<br/><span style={{background:'#efce79'}}>公司招聘页变化</span><div style={{fontWeight:500,fontSize:28,marginTop:12}}>关注招聘信息最近出现的变化。</div></div>
  </div>;
 return <>
  <div style={{...rect(58,530,962,238),...panel,background:'#151817',padding:'25px 31px',opacity:p}}><div style={{color:C.muted,fontSize:23,fontFamily:F.mono,marginBottom:16}}>● ● ●　项目文档 · 接入概览（非执行）</div><Tech size={49}>50+ AI 工具</Tech><div style={{fontSize:29,fontWeight:900,color:C.gold,marginTop:16}}>按上游项目文档选择支持的宿主</div></div>
  <Chips tl={tl} id='last-availability' f={f} items={['Claude Code','Codex','更多工具']} top={827}/>
 </>;
};

const Skill:React.FC<SceneProps>=({tl,f,scene})=>{
 const p=quick(f,scene);
 if(scene.id==='skill-readme')return <Window r={7} kind='light' mode='white' top={380} height={815} title='NVIDIA / SkillSpector · README · 安装前防御扫描' zoom={1+.032*phase(f,scene.start,scene.end)} dy={-10*phase(f,scene.start,scene.end)} opacity={Math.max(.96,p)}/>;
 if(scene.id==='skill-study'){
  const onA=anchor(tl,'skill-vuln'),onB=anchor(tl,'skill-malicious'), nA=meter(tl,'skill-vuln',f),nB=meter(tl,'skill-malicious',f);
  return <>
   <div style={{...rect(57,385,966,217),...panel,borderLeft:`4px solid ${C.green}`,background:'#1d2118',opacity:p,padding:'24px 28px'}}><div style={{fontSize:26,fontWeight:900,color:C.green}}>NVIDIA 安全研究样本</div><div style={{fontWeight:900,fontSize:88,lineHeight:1.13,letterSpacing:'-.045em',fontVariantNumeric:'tabular-nums'}}>{fmt(meter(tl,'skill-samples',f))} <span style={{fontSize:38,letterSpacing:0,color:C.muted}}>个 Agent Skill</span></div></div>
   {[{label:'存在安全漏洞',v:nA,on:onA,color:C.gold,max:26.1,w:.70},{label:'疑似恶意意图',v:nB,on:onB,color:C.red,max:5.2,w:.24}].map(({label,v,on,color,max,w},i)=>f<on?null:<div key={label} style={{...rect(57,624+211*i,966,183),...panel,opacity:.5+.5*settle(f,on,on+8),borderColor:color+'70',background:i===1?'#2e1c18':'#262218',padding:'26px 25px'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',fontSize:32,fontWeight:900}}>{label}<span style={{color,fontSize:66,fontWeight:900,fontVariantNumeric:'tabular-nums'}}>{v.toFixed(1)}%</span></div><div style={{height:15,marginTop:19,background:'#6b60453d'}}><i style={{display:'block',height:'100%',width:`${100*w*v/max}%`,background:color,borderRadius:2}}/></div>
   </div>)}
  </>;
 }
 return <>
  <MiniStat x={54} y={379} w={470} h={230} num={fmt(meter(tl,'skill-rules',f))} label="种漏洞规则" sub="安装前防御扫描" f={f} on={scene.start}/>
  <MiniStat x={545} y={379} w={478} h={230} num={`0–${fmt(meter(tl,'skill-score',f))}`} label="风险评分范围" sub="研究与风险评估" color={C.green} f={f} on={scene.start}/>
  <Discs tl={tl} id='skill-tools' f={f} top={760} items={[{icon:'✴',label:'Claude Code'},{icon:'⌘',label:'Codex'},{icon:'◉',label:'Git / Zip'},{icon:'◇',label:'MCP Skill'}]}/>
 </>;
};

const Open:React.FC<SceneProps>=({tl,f,scene})=>{
 const p=quick(f,scene);
 if(scene.id==='open-workspace')return <>
  <div style={{...rect(0,0,1080,1228),background:'linear-gradient(180deg,#5b5a5a,#484649 62%,#28251e)',opacity:p*.86}}/>
  <Window r={8} top={377} height={632} title='CopilotKit · OpenBot 官方工作台示例' zoom={1+.15*phase(f,scene.start,scene.end)} dy={4-19*p} opacity={p}/>
  <Chips tl={tl} id='open-workspace' f={f} startIx={1} items={['自由选模型','接入自有 Agent','数据与基础设施自管']} top={1069}/>
 </>;
 if(scene.id==='open-install'){
  const cut=settle(f,anchor(tl,'open-install',1),anchor(tl,'open-install',1)+10);
  return <>
   <div style={{...rect(59,463,962,103),...panel,color:C.muted,fontSize:34,fontWeight:900,padding:'24px 28px',opacity:p}}>终端安装或容器构建 <i style={{...rect(23,47,405*cut,4),background:C.red,transform:'rotate(-2deg)'}}/><span style={{float:'right',color:C.gold,opacity:cut}}>不用碰终端</span></div>
   {['macOS','Windows'].map((v,i)=><div key={v} style={{...rect(57+i*492,604,474,200),...panel,...faded(f,anchor(tl,'open-install',2+i)),padding:'19px 25px',background:i===0?'#2d2419':'#24221d'}}><Tech size={58}>{v}</Tech><div style={{marginTop:18,fontSize:31,fontWeight:900,color:C.gold}}>官方网站安装包</div><div style={{marginTop:6,fontSize:20,color:C.muted}}>获取方式 · 原片介绍</div></div>)}
  </>;
 }
 return <><Window r={8} top={380} height={644} title='OpenBot · 官方界面示例，非本地运行' zoom={1.02+.17*phase(f,scene.start,scene.end)} dx={-26*phase(f,scene.start,scene.end)} dy={-34*phase(f,scene.start,scene.end)} opacity={p}/><Chips tl={tl} id='open-sample' f={f} items={['浏览器','工具','Agent 工作台']} top={1094}/></>;
};

const Phone:React.FC<{f:number;on:number;x:number;y:number;width:number;height:number;tilt?:number;zoom?:number}>=({f,on,x,y,width,height,tilt=0,zoom=1})=>{
 const p=settle(f,on,on+11);
 return <div style={{...rect(x,y,width,height),background:'#0c0b10',border:'2px solid #716970',borderRadius:33,overflow:'hidden',padding:7,opacity:p,transform:`translateY(${(1-p)*29}px) rotate(${tilt}deg)`,boxShadow:'0 29px 42px #040403b8'}}><Pic r={9} kind='mobile' fit='contain' style={{transform:`scale(${zoom})`}}/></div>;
};
const Andee:React.FC<SceneProps>=({tl,f,scene})=>{
 const p=quick(f,scene);
 if(scene.id==='andee-mobile')return <>
  <Phone f={f} on={scene.start} x={350} y={316} width={381} height={759} zoom={1.03+.10*phase(f,scene.start,scene.end)}/>
  <Chips tl={tl} id='andee-mobile' f={f} items={['无需 Root','看屏幕','点按钮','打字与操作 App']} top={1104}/>
  <span style={{...rect(48,1182,984),textAlign:'center',color:C.muted,fontSize:19,opacity:p}}>官方产品示例静帧 · 不是本次设备操作</span>
 </>;
 if(scene.id==='andee-relay'){
  const q=settle(f,anchor(tl,'andee-relay',1),anchor(tl,'andee-relay',1)+13),back=settle(f,anchor(tl,'andee-relay',3),anchor(tl,'andee-relay',3)+13);
  return <>
   <Phone f={f} on={scene.start-2} x={250-151*q} y={333} width={262} height={646} tilt={-4*q}/>
   <Window r={9} top={474} left={458} width={562} height={393} title='Andee · 官方产品页' zoom={1.04} opacity={q}/>
   <div style={{...rect(396,660,86,15),opacity:q*(1-back),background:C.gold,clipPath:'polygon(0 27%, 74% 27%, 74% 0, 100% 50%, 74% 100%, 74% 73%, 0 73%)'}}/>
   <div style={{...rect(396,687,86,15),opacity:back,background:C.green,transform:'rotate(180deg)',clipPath:'polygon(0 27%, 74% 27%, 74% 0, 100% 50%, 74% 100%, 74% 73%, 0 73%)'}}/>
   <Hint f={f} on={anchor(tl,'andee-relay',2)} top={1048} center>{back>.1?'任务做完 · 文件送回手机':'耗时长活 · 交给 Mac 后台跑'}</Hint>
  </>;
 }
 return <>
  <div style={{...rect(59,378,961,223),...panel,padding:'21px 20px',opacity:p}}>
    <div style={{fontSize:27,fontWeight:900,display:'flex',justifyContent:'space-between'}}><span>留在你的本地设备</span><span style={{color:C.green,fontFamily:F.mono,fontSize:20}}>ON-DEVICE</span></div>
    <div style={{display:'flex',gap:13,marginTop:17}}>{['笔记','记忆','密码'].map((x,i)=><div key={x} style={{...panel,...faded(f,anchor(tl,'andee-private',1+i),9),width:294,padding:'14px 18px',fontSize:31,fontWeight:900,color:C.gold}}>{x}<div style={{fontSize:19,color:C.muted,marginTop:4}}>设备本地保存</div></div>)}</div>
  </div>
  <div style={{...rect(59,635,961,122),...panel,padding:'18px 24px',...faded(f,anchor(tl,'andee-private',4))}}><div style={{letterSpacing:'.12em',color:C.gold,fontFamily:F.mono,fontSize:18}}>BACKGROUND TIMELINE · 能力概述</div><div style={{fontSize:33,fontWeight:900,marginTop:7}}>闲下来继续把答应的事做完</div></div>
  <Window r={9} top={845} height={365} title='heyandee.com · 官方产品图' opacity={settle(f,anchor(tl,'andee-private',2),anchor(tl,'andee-private',2)+9)}/>
 </>;
};

export const Late:React.FC<SceneProps>=args=>{
 if(args.scene.id.startsWith('last-'))return <Last {...args}/>;
 if(args.scene.id.startsWith('skill-'))return <Skill {...args}/>;
 if(args.scene.id.startsWith('open-'))return <Open {...args}/>;
 if(args.scene.id.startsWith('andee-'))return <Andee {...args}/>;
 return null;
};
