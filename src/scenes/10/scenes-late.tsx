import React from 'react';
import {progress, sample, type Rect} from './clock';
import {appearing, type Segment} from './story';
import {BorderRail,EditorialFocus,Em,GOLD,IVORY,PartnerBadges,Picture,Quote,Steps,Terminal,Web,xy} from './visual';
import {agentIcons} from './scenes-early';

const human='github.com/blader/humanizer · README';
const chrome='github.com/ChromeDevTools/chrome-devtools-mcp · README';
const defLabels = ['发现风险','逐个核验','生成修复','复查结果'];
const ffDemos=['ffmpeg_skill_captions','ffmpeg_skill_reframe','ffmpeg_skill_silence','ffmpeg_skill_loudness'] as const;
const ffLabels=['加字幕','改竖屏','剪静音','调音量'];
function DefenseFlow({f}:{f:number}){
 const at=[5486,5511,5547,5588], n=at.filter(v=>f>=v).length;
 return <Web box={[40,424,1000,690]} address="OpenAI Codex Security · 防御流程示意" white>
  <Picture name="codex_security_overview" box={[16,83,968,258]} fit="contain"/>
  <div style={{position:'absolute',left:49,right:49,top:373,height:196,background:'#edf6ef',border:'1px solid #80ab957e',display:'flex',flexDirection:'column',justifyContent:'center',padding:'21px 33px',color:'#273e32'}}>
   <div className="medium" style={{fontSize:29,color:'#527265'}}>防御性修复 · 示意，不展示原补丁或差异</div>
   <div style={{marginTop:17,fontSize:52}}>{n?defLabels[n-1]:'审查当前项目'}</div>
   <div style={{height:5,background:'#d2e5d8',marginTop:18}}><div style={{height:5,width:`${n*25}%`,background:'#629e79'}}/></div>
  </div>
 </Web>;
}
export function LateScenes({s,f,white}:{s:Segment;f:number;white:boolean}){
 switch(s.id){
 case 'chrome-demo': {
  const isDemo=f>=3384;
  return <>
   <Web box={[40,424,1000,579]} asset={isDemo?'chrome_devtools_ui':'chrome_hero'} white={white} tag="Chrome 开发者 · 官方公开示例" zoom={1+.12*progress(f,3424,3471)} fit={isDemo?'cover':'contain'} anchor={[.5,.23]} focus={f<3450?[22,105,437,375]:[493,102,480,382]} focusProgress={appearing(f,3432,6)}/>
   <Steps f={f} stops={[3384,3420,3442,3468]} labels={['打开浏览器','点页面','看报错','查网络请求']} top={1051} size={28}/>
  </>;
 }
 case 'chrome-features': return <Web white={white} box={[40,380,1000,841]} asset="chrome_features" address={chrome} fit="contain" anchor={[.5,.27]} zoom={1+.07*progress(f,3500,3576)} focus={[36,163,926,101]} focusProgress={appearing(f,3499,7)} shade/>;
 case 'chrome-agents': {
  const subset=[{...agentIcons[0],name:'Claude',at:3586},{...agentIcons[1],at:3610},{...agentIcons[3],at:3632}];
  return <PartnerBadges f={f} top={554} items={subset}/>;
 }
 case 'plan-annotate': {
  const note = f<3906?undefined:f<3936?[348,215,480,85] as const:f<3975?[340,301,537,115] as const:[787,98,172,73] as const;
  return <Web box={[40,432,1000,735]} asset="plannotator_annotate" address="Plannotator · Annotate" zoom={1+.27*progress(f,3815,3863)} anchor={[.63,.34]} focus={note} focusProgress={note?appearing(f,f<3936?3906:f<3975?3936:3975,7):0}/>;
 }
 case 'plan-promo': return <Web box={[58,418,964,563]} asset="plannotator_inbox_intro" white={white} zoom={1+.12*progress(f,4020,4074)} anchor={[.42,.43]}/>;
 case 'plan-inbox': {
  const reply=f>=4155;
  return <Web box={[40,446,1000,711]} asset={reply?'plannotator_inbox_reply':'plannotator_inbox'} address="Plannotator · Inbox" zoom={1+.075*progress(f,4110,4190)} anchor={reply?[.86,.47]:[.32,.43]} focus={reply?[471,255,482,343]:[96,99,321,519]} focusProgress={appearing(f,reply?4155:4104,8)}/>;
 }
 case 'human-quote': return <Quote f={f} box={[40,458,1000,1]} address={human} size={41} rows={[
  {at:4357,en:<>Built on Wikipedia’s <Em>Signs of AI writing</Em>, the guide Wikipedia editors use to catch AI-generated text.</>,zh:'基于维基百科编辑的 AI 写作辨识指南。',h:185},
  {at:4437,en:<>Humanizer checks for <Em>26 patterns</Em> in all.</>,zh:'一共检查 26 种典型 AI 腔。'},
 ]}/>;
 case 'human-example': {
  const stamp=appearing(f,4551,7);
  return <Web white={white} box={[55,418,970,467]}>
   <div style={{position:'absolute',left:47,right:46,top:51,color:'#181713'}}>
    <div className="mono" style={{fontSize:26,width:'max-content',background:'#1d2024',borderRadius:3,padding:'8px 16px',color:IVORY}}>Not X but Y</div>
    <div style={{fontSize:59,marginTop:24,lineHeight:1.12}}>“It’s not just a feature, it’s a shift.”</div>
    <div className="medium" style={{fontSize:40,marginTop:21,lineHeight:1.15}}>这不只是一个功能，而是一场变革</div>
    <div className="medium" style={{fontSize:27,marginTop:27,color:'#756b5a'}}>出处：Humanizer README · 官方写作示例</div>
   </div>
   <div style={{position:'absolute',left:318,top:245,width:537*stamp,height:6,background:'#b22c2d',transform:'rotate(-2deg)',opacity:.84}}/>
   <div className="tech" style={{position:'absolute',right:33,bottom:31,border:'6px solid #a82e2c',color:'#a82e2c',fontSize:54,lineHeight:'65px',padding:'4px 21px',transform:`rotate(-10deg) scale(${1.27-.27*stamp})`,opacity:stamp}}>AI 腔</div>
  </Web>;
 }
 case 'human-blind': {
   const count=Math.floor(sample(f,[[4577,0],[4590,10],[4614,16]])); const digits=String(count).padStart(2,'0');
   return <>
   <div className="tech" style={{...xy([38,408,1004,94]),textAlign:'center',fontSize:64,transform:'skewX(-6deg)'}}>盲测</div>
   <div style={{position:'absolute',left:164,top:557,height:360,display:'flex',gap:16,alignItems:'center'}}>
    {[digits[0],digits[1]].map((q,i)=><div key={i} className="digits" style={{width:244,height:322,display:'grid',placeItems:'center',background:'#1d1b17',border:`2px solid ${count===16?'#bb9452':'#423d32'}`,fontSize:269,lineHeight:1,color:IVORY,boxShadow:'0 13px 24px #02020271'}}>{q}</div>)}
    <div className="tech gold" style={{fontSize:113,marginTop:134,transform:'skewX(-6deg)'}}>/16</div>
   </div>
   <div className="medium" style={{...xy([40,984,1000,55]),textAlign:'center',fontSize:37,color:'#d1c7b0',opacity:appearing(f,4607,9)}}>项目方盲测：16 次均选择 Humanizer 改写版</div>
  </>;
 }
 case 'ff-tools': {
  const at=[4878,4899,4921,4940], j=Math.max(0,at.filter(x=>x<=f).length-1);
  return <>{ffDemos.map((asset,i)=>{const p=appearing(f,at[i],7), y=369+i*235;
   return <div key={asset} style={{...xy([40,y,1000,216]),opacity:p*(i===j?1:i<j?.64:.14)}}>
    <span style={{position:'absolute',left:8,top:69,fontSize:43,color:i===j?GOLD:'#c6b9a0'}}>{ffLabels[i]}</span>
    <Picture name={asset} box={[229,0,771,216]} zoom={1.015} style={{borderRadius:5}}/>
    {i===j?<div style={{...xy([229,0,771,216]),border:`3px solid ${GOLD}`,borderRadius:5}}/>:null}
   </div>;})}</>;
 }
 case 'ff-local': return <>
   <Web box={[40,438,1000,456]} asset="ffmpeg_skill_tools" tag="ffmpeg-skill · 官网" fit="contain" zoom={1+.06*progress(f,5000,5080)}/>
   <Steps f={f} stops={[4991,5022,5053]} top={934} labels={['本地运行','无须上传','不用 API Key']}/>
  </>;
 case 'ff-audit': return <>
   <Web box={[40,419,1000,727]} asset="ffmpeg_skill_review_panel" address="ffmpeg-skill · 官方质检界面" fit="contain" zoom={1+.08*progress(f,5093,5164)} focus={f<5156?[733,236,209,337]:[93,491,835,140]} focusProgress={appearing(f,5099,8)}/>
   <Steps f={f} stops={[5134,5155,5188]} labels={['核对时长','核对画面','核对音量']} top={1176}/>
  </>;
 case 'codex-prompt': {
  const request='帮我扫一遍这个项目的安全问题', typed=request.slice(0,Math.floor(progress(f,5430,5472)*request.length));
  return <Web box={[40,420,1000,767]} address="Codex · 防御审查请求示意">
   <div className="medium" style={{...xy([33,585,936,97]),color:'#ddd4c2',background:'#1e1d1a',border:'1px solid #6b665d',padding:'21px 24px',fontSize:34,letterSpacing:2}}>{typed.length?typed:'在自己的项目上发起安全审查'}{typed.length&&typed.length<request.length?<span className="gold">▏</span>:null}</div>
  </Web>;
 }
 case 'codex-defense': return <><DefenseFlow f={f}/><Steps f={f} stops={[5486,5511,5547,5588]} labels={defLabels} top={1158}/></>;
 case 'codex-ci': return <>
   <Web white={white} box={[40,396,1000,819]} asset="codex_security_overview" address="OpenAI · Codex Security 文档" fit="contain" anchor={[.5,.24]}/>
   <BorderRail text="GitHub CI：对自己仓库的变更做安全检查" style={{position:'absolute',left:68,top:976,opacity:appearing(f,5628,9)}}/>
  </>;
 case 'codex-scan': return <Terminal f={f} at={5684} title="Codex Security · 本地变更审查" lines={['$ cs scan --diff origin/main']} box={[40,816,1000,304]}/>;
 default: throw new Error(`Unmapped late scene ${s.id}`);
 }
}
