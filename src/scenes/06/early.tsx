import React from 'react';
import {Pic,Mark,type Rank} from './projects';
import {C,F,Chip,Chips,Discs,Hint,MiniStat,Rows,Tech,Window,faded,fmt,panel,rect} from './primitives';
import {active,anchor,meter,phase,settle,type Scene,type Timeline} from './motion';

type SceneProps={tl:Timeline;f:number;scene:Scene};
const dim='#221e17';
const goldbox:React.CSSProperties={...panel,background:'#29231a',padding:'15px 21px'};
const toolLabels=[{icon:'✴',label:'Claude Code'},{icon:'⌘',label:'Codex'},{icon:'◩',label:'Cursor'},{icon:'＋',label:'OpenAI 接口'}];
const fitHint=(f:number,at:number)=>settle(f,at,at+11);
const BigNumber:React.FC<{num:number;label:string;sub:string;top?:number;size?:number}>=({num,label,sub,top=366,size=192})=><div data-count={num} style={{...rect(64,top,950),textAlign:'center',fontVariantNumeric:'tabular-nums'}}><div style={{display:'flex',alignItems:'baseline',justifyContent:'center',gap:25}}><span style={{fontFamily:F.ui,color:C.gold,fontSize:size,fontWeight:900,letterSpacing:'-.06em',lineHeight:1.03,textShadow:'0 8px 25px #0b0905'}}>{fmt(num)}</span><Tech size={56}>{label}</Tech></div><div style={{fontSize:27,color:'#caba9e',fontWeight:800,lineHeight:1.15,marginTop:13}}>{sub}</div></div>;

const FreeQuote:React.FC<SceneProps>=({tl,f,scene})=>{
 const appear=settle(f,anchor(tl,'free-quote'),anchor(tl,'free-quote',1)),more=settle(f,anchor(tl,'free-quote',2),anchor(tl,'free-quote',3)),switchAt=anchor(tl,'free-provider',0);
 const leaving=phase(f,scene.end-9,scene.end),first=f>=switchAt;
 return <>
  <div style={{...rect(59,433-13*leaving,964,290+157*more),background:'#f0eadc',color:'#201b15',padding:'25px 34px',borderRadius:8,opacity:appear*(1-.8*leaving),boxShadow:'0 26px 44px #040403b3',overflow:'hidden'}}>
   <div style={{fontFamily:F.mono,fontSize:19,color:'#726957',marginBottom:21}}>◉ 项目 README · 原片引文 · 编辑摘录</div>
   <div style={{fontWeight:900,fontSize:41,lineHeight:1.15,letterSpacing:'-.009em'}}>Every serious AI lab now offers a <span style={{background:'#efd17a'}}>free tier</span> — on its own each tier is a toy.</div>
   <div style={{fontSize:29,fontWeight:700,marginTop:11}}>各家模型都有免费额度，一个额度并不总够用。</div>
   <div style={{marginTop:25,borderTop:'1px solid #8b775864',paddingTop:19,opacity:more,fontSize:35,fontWeight:900,transform:`translateY(${(1-more)*17}px)`}}>多来源聚合，统一接口。<div style={{fontSize:26,fontWeight:600,color:'#5c4f40',marginTop:9}}>原片用此说明分开接入、维护的成本。</div></div>
  </div>
  {first&&<BigNumber num={Math.round(meter(tl,'free-provider',f))} label="家免费提供商" sub="公开目录 · 原片历史口径"/>}
 </>;
};
const FreeNumbers:React.FC<SceneProps>=({tl,f,scene})=>{
 const prior=scene.id==='free-providers',shift=anchor(tl,'free-token',1),tokens=!prior||f>=shift;
 const provide=anchor(tl,'provider-labels',0,scene.start),models=anchor(tl,'provider-labels',1,scene.start),endpoint=anchor(tl,'provider-labels',2,scene.start);
 const count=Math.round(meter(tl,tokens?'free-token':'free-provider',f));
 const p=settle(f,scene.start,scene.start+16);
 return <>
  <BigNumber num={count} label={tokens?'亿 Token':'家免费提供商'} sub={tokens?'每月免费额度合计 · 原片历史口径':f<models?'多来源聚合 · 原片历史口径':f<endpoint?'1,313 个免费模型 · 原片历史口径':'1,313 个免费模型 · 统一 OpenAI 兼容接口'}/>
  {prior?<Window r={1} kind='light' mode='white' top={743} height={520} title='freellmapi.co · 公开模型目录' zoom={1+.05*phase(f,provide,scene.end)} dy={-17*phase(f,provide,scene.end)} opacity={.48+.52*p}/>
   :<><div data-token-summary={f===scene.start?'onset':undefined} style={{...rect(47,760,986,457),...panel,background:'linear-gradient(160deg,#081318,#102227 46%,#0d1419)',opacity:Math.max(p,.24),borderColor:'#304749'}}>
      <div style={{padding:'28px 33px',color:'#72938d',fontFamily:F.mono,fontSize:20,letterSpacing:'.06em'}}>FreeLLMAPI · 原片历史统计图解</div>
      <div style={{textAlign:'center',marginTop:11,color:'#7ee1cd',fontSize:99,fontWeight:900,letterSpacing:'-.05em'}}>~10.1B tokens</div>
      <div style={{textAlign:'center',color:'#afc3bf',fontSize:23,marginTop:4}}>每月免费额度合计 · 不是当前账户用量</div>
      <div style={{display:'flex',gap:4,margin:'41px 29px 24px'}}>{['#41c6ba','#77c7ad','#63cbbb','#e4bb67','#e6b35f','#e68173','#7b83c6','#72a9d8'].map((c,i)=><i key={i} style={{width:`${[23,20,15,12,9,8,7,6][i]}%`,height:7,background:c,transformOrigin:'left',transform:`scaleX(${phase(f,scene.start+i*2,scene.start+18+i*2)})`}}/>)}</div>
      <div style={{display:'flex',justifyContent:'space-around',fontSize:38,color:'#80d5ca',fontFamily:F.mono}}>{['87','1,313','约 101 亿'].map((x,i)=><b key={x} style={{color:i===2?C.gold:undefined}}>{x}</b>)}</div>
    </div></>}
 </>;
};
const FreeRouting:React.FC<SceneProps>=({tl,f,scene})=>{
 const step=active(tl,'route-active',f,-1);
 const before=step<1;
 return <>
   <div style={{...rect(56,378,968,111),...goldbox,opacity:fitHint(f,scene.start+4),display:'flex',alignItems:'center',justifyContent:'space-between'}}><div><Tech size={36}>统一模型接口</Tech><div style={{fontSize:21,color:C.muted,marginTop:7}}>OpenAI 兼容 · 服务切换图解</div></div><Chip text={before?'接口入口':'切换到可用服务'} color={before?C.gold:C.green}/></div>
   {['提供商 A','提供商 B','提供商 C'].map((s,i)=>{const lit=before?i===0:i===1,color=i===0?C.red:C.green;return <div key={s} style={{...rect(56+i*326,504,313,199),...panel,borderColor:lit?color:'#504531',background:lit&&i===0?'#371f19':lit?'#152b23':dim,padding:'20px 18px',opacity:.38+.62*fitHint(f,scene.start+i*3+13)}}><Tech size={32}>{s}</Tech><div style={{fontSize:24,color:C.muted,margin:'13px 0 22px'}}>服务可用性</div><Chip text={i===0?'限流':i===1&&step>=1?'可用':'备用'} lit={lit?1:0} color={color}/></div>;})}
   <Discs tl={tl} id="route-active" f={f} items={toolLabels} top={815} startIx={2}/>
 </>;
};

const GameRoles:React.FC<SceneProps>=({tl,f,scene})=>{
 const roles=['主策划','叙事','程序','美术','音频','QA'];const a=anchor(tl,'game-roles',0,scene.start);
 return <>
  {f<scene.start+8&&<Window r={2} kind='light' mode='white' top={382} height={811} opacity={1-phase(f,scene.start,scene.start+8)}/>}
  <MiniStat x={55} y={380} w={475} h={217} num={Math.round(meter(tl,'game-agent',f))} label="个 AI 角色" sub="AI Agents" f={f} on={scene.start}/>
  <MiniStat x={550} y={380} w={475} h={217} num={Math.round(meter(tl,'game-workflow',f))} label="套工作流" sub="Workflow Skills" f={f} on={scene.start+2}/>
  <div style={{...rect(55,658,971),display:'grid',gridTemplateColumns:'repeat(3, 1fr)',rowGap:15,columnGap:13,opacity:settle(f,a,a+8)}}>{roles.map((v,i)=>{const k=anchor(tl,'game-roles',i,scene.end);return <div key={v} style={{...panel,...faded(f,k),padding:'18px 13px',display:'flex',gap:14,alignItems:'center',fontSize:31,fontWeight:900}}><span style={{fontFamily:F.mono,color:C.gold,fontSize:25}}>0{i+1}</span>{v}</div>;})}</div>
 </>;
};
const GameFlow:React.FC<SceneProps>=({tl,f,scene})=> <>
 <div style={{...rect(60,378,959,92),...panel,color:'#d4c39f',fontFamily:F.mono,fontSize:24,padding:'20px 26px',opacity:fitHint(f,anchor(tl,'game-steps'))}}><span style={{color:C.gold}}>prototype</span> · 做一个浏览器小游戏 <span style={{color:C.muted,fontFamily:F.ui,fontSize:19,marginLeft:12}}>流程示意</span></div>
 <Rows tl={tl} id="game-steps" f={f} startIx={1} top={495} step={137} items={[
   {label:'先问几个关键问题',sub:'Clarify the gameplay'}, {label:'写一页游戏企划',sub:'One-page brief'},
   {label:'做出双击可玩的浏览器游戏',sub:'Playable browser prototype'},{label:'打开浏览器测试、截图并修 Bug',sub:'Test & iterate'}]}/>
 </>;

const Concat:React.FC<SceneProps>=({tl,f,scene})=>{
 const p=settle(f,scene.start,scene.start+12);
 if(scene.id==='concat-ui')return <Window r={3} top={381} height={637} title='Concat · 官方编辑器截图' zoom={1+.10*phase(f,scene.start,scene.end)} dy={8*phase(f,scene.start,scene.end)} opacity={p}/>;
 if(scene.id==='concat-perks')return <><Window r={3} top={381} height={637} opacity={.18*(1-phase(f,scene.start,scene.end))}/><Rows tl={tl} id="concat-perks" f={f} top={385} step={199} disc items={[{icon:'◫',label:'没有水印',sub:'No watermark',strike:true},{icon:'●',label:'不用登录',sub:'No login required',strike:true}]}/></>;
 if(scene.id==='concat-platforms')return <Discs tl={tl} id="concat-os" f={f} top={431} items={[{icon:'●',label:'macOS'},{icon:'⊞',label:'Windows'},{icon:'◇',label:'Linux'},{icon:'▯',label:'手机'}]}/>;
 if(scene.id==='concat-ai')return <>
  {['自动字幕','人声分离','克隆声音','智能抠图'].map((x,i)=>{const k=anchor(tl,'concat-ai',i);return <div key={x} style={{...rect(58+i%2*488,389+Math.floor(i/2)*210,467,187),...goldbox,...faded(f,k),display:'grid',placeContent:'center',borderColor:C.line}}><div style={{color:C.gold,fontFamily:F.mono,fontSize:19,marginBottom:10}}>AI · 0{i+1}</div><Tech size={51}>{x}</Tech></div>;})}
  <Hint f={f} on={anchor(tl,'concat-ai',4)} top={823} center>全在本地 · 可离线处理</Hint>
 </>;
 return <div style={{...rect(59,650,960,420),...panel,background:'#131617',padding:'24px 29px',opacity:p}}>
   <div style={{fontFamily:F.mono,fontSize:22,color:'#c8b99c',borderBottom:'1px solid #5d5036',paddingBottom:18}}>● ● ●　Concat · MCP 剪辑流程示意</div>
   {['读取剪辑素材','选择需要的编辑动作','组合时间线','交给编辑器输出'].map((x,i)=>{const a=anchor(tl,'concat-mcp',i);return <div key={x} style={{...faded(f,a,8),marginTop:18,fontSize:33,fontFamily:F.ui,fontWeight:900,color:i===2?C.gold:'#eae2d4'}}><span style={{color:C.muted,fontFamily:F.mono,fontSize:26,marginRight:16}}>0{i+1}</span>{x}</div>;})}
 </div>;
};

const Shotcraft:React.FC<SceneProps>=({tl,f,scene})=>{
 const p=settle(f,scene.start,scene.start+13);
 if(scene.id==='shot-tools')return <Discs tl={tl} id="shot-tools" f={f} top={436} items={[{icon:'✴',label:'Claude Code'},{icon:'⌘',label:'Codex'},{icon:'▤',label:'Skill'}]}/>;
 if(scene.id==='shot-recipes'){
  const step=f>=anchor(tl,'shot-effects'),value=Math.round(meter(tl,step?'shot-effects':'shot-recipes',f));
  return <>
   {[-1,0,1].map((n,i)=><div key={n} style={{...rect(104+i*257,263+i*81,393,909),borderRadius:4,background:'#2a281a',overflow:'hidden',opacity:[.36,.65,.34][i]*p,transform:`translateY(${(1-p)*110-36*p*i}px) rotate(${-17+n*3}deg)`,boxShadow:'0 22px 40px #120e08',border:'1px solid #575044'}}><Pic r={4} kind='product' fit='cover' pos={n===-1?'left center':n===0?'center':'right center'} style={{filter:'saturate(.58) brightness(.7)'}}/></div>)}
   <div style={{...rect(0,269,1080,938),background:'radial-gradient(ellipse,#171512c0,#1b181363 47%,#15130ec0 79%)'}}/>
   <div style={{...rect(44,460,992),textAlign:'center',textShadow:'0 4px 18px #120f08'}}><Tech size={220} style={{color:C.gold}}>{value}+</Tech><div><Tech size={83}>{step?'调好动效':'镜头配方卡'}</Tech></div><div style={{fontSize:23,marginTop:12,color:C.muted,fontWeight:900}}>原片介绍 · 公开工作台截图背景</div></div>
  </>;
 }
 if(scene.id==='shot-examples')return <>
  {['真实网页截图','Remotion 代码动画','配乐卡点与音效','产品宣传片输出'].map((x,i)=>{const a=anchor(tl,'shot-examples',i);return <div key={x} style={{...rect(37+506*(i%2),379+345*Math.floor(i/2),490,316),...faded(f,a,10)}}>
   <div style={{height:258,background:'#111111',border:`2px solid ${C.line}`,borderRadius:7,overflow:'hidden'}}><Pic r={4} kind={i===0?'repo':'product'} fit={i===0?'contain':'cover'} pos={i===1?'30% 30%':i===2?'center bottom':'center'}/></div><div style={{textAlign:'center',fontSize:28,fontWeight:900,marginTop:10}}>{x}</div>
  </div>;})}
  <div style={{...rect(55,1084,969),color:C.muted,fontSize:22,fontWeight:600}}>独立官网素材局部 · 不是四次独立运行</div>
 </>;
 return <><Window r={4} top={375} height={640} title='Motion Workbench · 官方界面截图' zoom={1+.115*phase(f,scene.start,scene.end)} dy={-8*phase(f,scene.start,scene.end)} opacity={p}/><Hint f={f} on={anchor(tl,'shot-workbench',2)} top={1050}>支持一键导出剪映草稿（JianYing Pro）</Hint></>;
};

const Gym:React.FC<SceneProps>=({tl,f,scene})=>{
 const p=settle(f,scene.start,scene.start+13);
 if(scene.id==='gym-count')return <div style={{...rect(45,446,990),textAlign:'center',opacity:p,fontVariantNumeric:'tabular-nums'}}>
  <div style={{fontFamily:F.mono,color:C.muted,fontSize:23,fontWeight:700,letterSpacing:'.21em',marginBottom:15}}>BUILT-IN EXERCISE LIBRARY</div>
  <div style={{color:C.gold,fontSize:265,fontFamily:F.ui,fontWeight:900,letterSpacing:'-.05em',lineHeight:1.02}}>{Math.round(meter(tl,'gym-count',f))}</div>
  <div style={{transform:'skewX(-7deg)',marginTop:9}}><Tech size={116}>动作库</Tech></div><i style={{display:'block',width:140,height:4,background:C.gold,margin:'27px auto'}}/><div style={{fontSize:28,fontWeight:900,color:C.muted}}>全部附动画演示 · 可按肌群筛选</div>
 </div>;
 if(scene.id==='gym-app')return <><Window r={5} top={376} height={624} title='openGym · 官网 / 官方手机界面' zoom={1+.27*phase(f,scene.start,scene.end)} dx={-66*phase(f,scene.start,scene.end)} dy={-15*phase(f,scene.start,scene.end)} opacity={p}/><Hint f={f} on={anchor(tl,'gym-app',1)} top={1028}>按人体肌肉图筛选 · 练到哪里一眼看清</Hint></>;
 if(scene.id==='gym-privacy')return <Rows tl={tl} id="gym-private" f={f} disc top={381} step={269} items={[
   {icon:'♟',label:'没有订阅',sub:'No subscription · 开源免费',strike:true}, {icon:'◎',label:'没有广告',sub:'No ads · No telemetry',strike:true}, {icon:'▤',label:'数据归自己',sub:'本地保存 · 可用 Docker 自托管同步',strike:true}]}/>;
 return <><Discs tl={tl} id="gym-platform" f={f} top={459} items={[{icon:'●',label:'iPhone / Watch'},{icon:'▣',label:'Android APK'},{icon:'◇',label:'Docker 自托管'}]}/><Hint f={f} on={anchor(tl,'gym-platform',1)} top={857} center>App Store 已上架 · 支持 Apple Watch</Hint></>;
};

export const Early:React.FC<SceneProps>=args=>{
 const {tl,f,scene}=args;
 if(scene.id==='free-quote')return <FreeQuote {...args}/>;
 if(scene.id==='free-providers'||scene.id==='free-tokens')return <FreeNumbers {...args}/>;
 if(scene.id==='free-routing')return <FreeRouting {...args}/>;
 if(scene.id==='game-readme')return <Window r={2} kind='light' mode='white' top={379} height={801} title='GitHub README · 公开仓库' crop='contain' zoom={1+.07*phase(f,scene.start,scene.end)} opacity={Math.max(.96,settle(f,scene.start,scene.start+10))}/>;
 if(scene.id==='game-roles')return <GameRoles {...args}/>;
 if(scene.id==='game-flow')return <GameFlow {...args}/>;
 if(scene.id.startsWith('concat-'))return <Concat {...args}/>;
 if(scene.id.startsWith('shot-'))return <Shotcraft {...args}/>;
 if(scene.id.startsWith('gym-'))return <Gym {...args}/>;
 return null;
};

export { GameRoles };
