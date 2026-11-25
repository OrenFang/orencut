import React from 'react';
import {appearing, type Segment} from './story';
import {progress,type Rect} from './clock';
import {Backdrop,BorderRail,EditorialFocus,Em,GOLD,PartnerBadges,Picture,Quote,Steps,Terminal,Web,xy} from './visual';
import {ModernPair} from './ranking';

const mw='GoogleChrome/modern-web-guidance-src · README.md';
const sh='github.com/we-promise/sure · README';
const ag='github.com/addyosmani/agent-skills · README';
const rv='github.com/alibaba/open-code-review · README';
const quoteBox:Rect=[60,454,960,1];
const px:Rect=[40,392,1000,766];
export const agentIcons = [
 {name:'Claude Code',icon:'claude-logo'}, {name:'Cursor',icon:'cursor-logo'}, {name:'Codex',icon:'codex-logo'}, {name:'Copilot',icon:'copilot-icon'},
] as const;
const browserItems=[
 {name:'Chrome',icon:'chrome-logo',at:689}, {name:'Edge',icon:'edge-logo',at:704}, {name:'Firefox',icon:'firefox-logo',at:717},{name:'MDN',icon:'mdn-logo',at:743},
] as const;
// Native f660–681 glyphs; f659 is the unchanged dark entrance, f682 lands at 262.
const browserFeatureCounts=[0,0,1,3,6,11,18,27,39,56,78,107,139,171,196,215,230,240,248,254,258,260] as const;

export function EarlyScenes({s,f,white}:{s:Segment;f:number;white:boolean}){
 switch(s.id){
 case 'modern-quote': return <Quote f={f} box={quoteBox} address={mw} rows={[
  {at:374,en:<>Coding agents often default to <Em>older patterns</Em></>,zh:'编程 AI 常常默认用老写法',h:239},
  {at:452,en:<>because LLM training data contains vast amounts of <Em>legacy code.</Em></>,zh:'因为大模型的训练数据里充满了旧代码。',h:184},
 ]}/>;
 case 'modern-demo': {
  const swap=appearing(f,558,7);
  return <>
   <div style={{position:'absolute',inset:0,opacity:1-swap}}><ModernPair box={[40,441,1000,600]}/></div>
   <div style={{position:'absolute',inset:0,opacity:swap}}>
    <Backdrop tone="paper"/>
    <Web white={white} asset="modern-demo" box={[40,442,1000,595]} anchor={[.5,.32]} zoom={1+progress(f,570,632)*.17}/>
   </div>
   <div style={{...xy([55,431,520,43]),width:'auto',padding:'5px 12px',background:'#101313',fontSize:25}}>Chrome for Developers 官方示例</div>
   <div className="mono gold" style={{...xy([40,1094,1000,51]),textAlign:'center',fontSize:29,opacity:appearing(f,585,9)}}>npx modern-web-guidance@latest install</div>
  </>;
 }
 case 'browser-262': {
  const n=browserFeatureCounts[f-660]??(f<660?0:262);
  return <>
   <div style={{...xy([40,478,1000,222]),display:'flex',alignItems:'baseline',justifyContent:'center',gap:27}}>
    <div className="digits gold" style={{fontSize:221,lineHeight:1.03}}>{n}</div><div className="tech" style={{fontSize:67,transform:'skewX(-4deg)'}}>个新功能</div>
   </div>
   <div className="medium" style={{...xy([40,696,1000,48]),textAlign:'center',fontSize:30,color:'#c9bb9c',opacity:appearing(f,681,6)}}>CSS 布局 · 性能 · 表单 · 无障碍 · 内置 AI</div>
   {f>=684?<PartnerBadges f={f} top={803} items={browserItems}/>:null}
  </>;
 }
 case 'modern-readme': return <Web white={white} asset="modern-readme" address={mw} box={[40,381,1000,852]} crop={[106,84,905,730]} zoom={1+progress(f,807,873)*.055} anchor={[.38,.26]} focus={[39,126,836,116]} focusProgress={appearing(f,837,7)} shade/>;
 case 'univer-home': return <Web white={white} asset="univer-home" address="univer.ai · Univer Office SDK" box={[40,379,1000,839]} crop={[94,6,1240,792]} fit="contain" zoom={1+progress(f,1070,1110)*.12} anchor={[.5,.39]} focus={[51,259,887,205]} focusProgress={appearing(f,1062,8)} shade/>;
 case 'univer-matrix': {
  const ids=['univer-sheet','univer-doc','univer-formula','univer-collaboration'] as const, names=['表格','文档','公式','多人协作'];
  const i=f<1132?0:f<1155?1:f<1178?2:3;
  return <>{ids.map((key,j)=>{const left=40+j%2*508, top=385+Math.floor(j/2)*461;return <div key={key} style={{...xy([left,top,491,437]),opacity:i===j?1:.45}}>
   <Web box={[0,0,491,369]} asset={key} white fit="contain"/>
   <div style={{position:'absolute',left:6,top:373,fontSize:34,color:i===j?GOLD:'#c0b9a7'}}>{names[j]}</div>
  </div>;})}</>;
 }
 case 'univer-demo': {
  const chart = appearing(f,1362,14);
  return <>
   <Web box={[38,393,1004,680]} tag="Univer 官方示例" asset="univer-hero" zoom={1+progress(f,1230,1319)*.15} anchor={[.47,.4]} focus={[64,208,667,118]} focusProgress={f<1362?appearing(f,1318,8):0}/>
   {f>=1362?<div style={{position:'absolute',inset:0,opacity:chart}}><Web box={[38,393,1004,680]} tag="Univer 官方图表示例" asset="univer-dashboard-charts" fit="contain" focus={[519,218,412,319]} focusProgress={appearing(f,1373,7)}/></div>:null}
   <Steps f={f} stops={[1317,1348,1377]} labels={['改单元格','算公式','存文件']} top={1100}/>
  </>;
 }
 case 'sure-quote': return <Quote f={f} box={quoteBox} address={sh} size={43} rows={[
  {at:1563,en:<>A community fork of the now-abandoned <Em>Maybe Finance</Em> project.</>,zh:'已搁置的 Maybe Finance 项目的社区分支。'},
  {at:1613,en:<>After spending <Em>nearly $1 million</Em> on development … the team open-sourced the app.</>,zh:'花了将近 100 万美元开发，随后团队开源了应用。',h:164},
  {at:1708,en:<>A <Em>community-maintained</Em> fork to keep the codebase alive.</>,zh:'现在由社区继续维护。'},
 ]}/>;
 case 'sure-demo': {
  const ai=appearing(f,1848,7);
  return <>
   <div style={{position:'absolute',inset:0,opacity:1-ai}}><Web white={white} box={[40,388,1000,756]} asset="sure-graph" address="sure.am · 官方样例" anchor={[.22,.28]} zoom={1+progress(f,1784,1814)*.09} focus={[36,209,648,359]} focusProgress={appearing(f,1792,8)} shade/></div>
   {f>=1848?<div style={{position:'absolute',inset:0,opacity:ai}}><Web white={white} box={[40,388,1000,756]} asset="sure-graph" crop={[1664,35,849,1248]} address="sure.am · 官方样例 / AI 助手" fit="contain" focus={[231,179,540,468]} focusProgress={appearing(f,1877,8)} shade/></div>:null}
   <Steps f={f} stops={[1913,1931,1963]} labels={['Docker 自部署','电脑：浏览器 / Mac','手机 App']} top={1175} size={28}/>
  </>;
 }
 case 'agent-install': return <Terminal title="Terminal · 参考当期安装示例" at={2166} f={f} box={[40,863,1000,275]} lines={['$ npx skills add addyosmani/agent-skills','# Install all 25 skills']}/>;
 case 'agent-workflow': {
  const k=f<2280?-1:f<2297?1:f<2315?2:f<2330?3:f<2341?4:5;
  const commands=f>=2367;
  const focus:Rect=commands?[20,166,960,363]:[56+Math.max(0,k)*154,404,115,101];
  return <>
   <Web box={[40,439,1000,660]} asset={commands?'agent-commands':'agent-workflow'} address="skills.addy.ie · 当前官方工作流" fit="contain" focus={focus} focusProgress={k>=0?appearing(f,commands?2367:2280,6):0}/>
   {commands?<BorderRail text="官页当前列 8 个命令；口播保留参考期口径" style={{position:'absolute',left:50,top:1124,fontSize:26,opacity:appearing(f,2374,8)}}/>:null}
  </>;
 }
 case 'agent-readme': return <Web white={white} box={[40,404,1000,848]} asset="agent-readme" address={ag} fit="contain" zoom={1+.06*progress(f,2426,2465)} focus={f<2456?[39,195,905,137]:[41,348,910,190]} focusProgress={appearing(f,2425,8)} shade/>;
 case 'agent-agents': return <>
   <PartnerBadges f={f} top={745} items={[...agentIcons.map((x,i)=>({...x,at:2516+i*14})),{name:'更多工具',initial:'70+',at:2572}]}/>
   <div className="mono gold" style={{...xy([40,1096,1000,56]),fontSize:30,textAlign:'center'}}>npx skills add addyosmani/agent-skills</div>
  </>;
 case 'review-readme': return <Web white={white} box={[40,380,1000,835]} asset="review-readme" address={rv} fit="contain" zoom={1+.043*progress(f,2767,2885)} focus={[46,f<2832?133:213,897,105]} focusProgress={appearing(f,2771,9)} shade/>;
 case 'review-terminal': return <Web white={white} box={[40,397,1000,638]} asset="review-hero" crop={[589,164,711,518]} fit="contain" tag="Open Code Review · 官方演示" zoom={1.03}/>;
 case 'review-bench': {
  const first=f<2988;
  return <>
   <Web box={[40,402,1000,773]} asset="review-benchmark" address="open-codereview.ai · 官方 AACR-Bench" fit="contain" anchor={[.5,0]} focus={first?[32,79,932,49]:[35,451,929,50]} focusProgress={appearing(f,first?2950:2988,8)}/>
   <div style={{...xy([38,1193,1004,50]),fontSize:33,textAlign:'center'}}>Claude Opus 4.6 <span className="gold">+</span> {first?'Open Code Review':'Claude Code'}</div>
  </>;
 }
 case 'review-metrics': return <Web box={[40,397,1000,768]} asset="review-metrics" address="open-codereview.ai · 官方页面" fit="contain" anchor={[.5,.25]} zoom={1+.13*progress(f,3061,3112)} focus={[627,119,155,141]} focusProgress={appearing(f,3061,9)} shade/>;
 default: throw new Error(`Unmapped early scene ${s.id}`);
 }
}
