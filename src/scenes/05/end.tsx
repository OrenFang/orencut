import React from 'react';
import {AbsoluteFill,Freeze} from 'remotion';
import {Box,Pane,Moving,Still,Shade,Tag,Credit,Violet,PURPLE,LILAC,INK,env,p,rise,lerp,kf} from './visual';

type F={f:number};
export const Domestic:React.FC<F>=({f})=>{
  // The NotebookLM body leads the chapter route by one frame; overlays stay on the global clock.
  if(f===2849) return <Notebook f={f}/>;
  const swap=p(f,2634,2656);const entry=rise(f,2424,2440);const out=p(f,2836,2849);
  const w0=lerp(1156,521,swap), w1=lerp(521,1156,swap), yy=158+95*(1-entry)+428*out;
  const qwen=kf(f,[[2423,2.4],[2513,2.4],[2519,0],[2526,0],[2540,1.7],[2554,2.4]]).toFixed(1);
  // f2691 is the first witnessed 2240 亿 frame; f2688–2690 interpolate from the existing f2687 phase.
  const hy1= f<2682?2240:Math.round(kf(f,[[2682,0],[2687,830],[2691,2240]]));
  const hy2= f<2740?7700:Math.round(kf(f,[[2740,0],[2745,4183],[2758,7700]]));
  return <AbsoluteFill>
    <Pane x={87} y={yy} w={w0} h={684} style={{opacity:entry*(1-out)*lerp(1,.37,swap),border:'2px solid #e3d8f9'}}>
      <Box x={33} y={31} w={w0-60} h={56} style={{fontSize:lerp(40,27,swap),fontWeight:930,display:'flex',justifyContent:'space-between',alignItems:'center',gap:18,whiteSpace:'nowrap',overflow:'hidden'}}><div><Violet>✧</Violet> 阿里 Qwen4-Max</div><span style={{fontSize:21,color:'#68636f'}}>100 万上下文 · 原片口径</span></Box>
      <Pane x={30} y={118} w={w0-60} h={410} radius={18} style={{boxShadow:'none',background:'#f6f5fb'}}><Still media="qwen" fit="contain" style={{transform:`scale(${lerp(1.01,1.10,p(f,2445,2626))})`}}/></Pane>
      <Box x={35} y={538} w={380} h={119} style={{whiteSpace:'nowrap'}}><div style={{fontSize:25,color:'#716d76',fontWeight:820}}>骨干模型参数</div><div style={{fontSize:73,fontWeight:930,lineHeight:1.04,fontVariantNumeric:'tabular-nums'}}>{qwen} <Violet><span style={{fontSize:39}}>万亿</span></Violet></div></Box>
      {f>=2568&&f<2641&&<Box x={w0-383} y={541} w={347} h={110} style={{opacity:env(f,2568,2581,2627,2641)}}><Tag dark style={{padding:'18px 22px',display:'block',textAlign:'left'}}><div><div style={{fontSize:20,color:LILAC}}>Agent Arena · 原片时点</div><div style={{fontSize:34}}>中国模型第一</div></div></Tag></Box>}
    </Pane>
    <Pane x={w0+125} y={yy+70*(1-swap)} w={w1} h={lerp(614,684,swap)} style={{opacity:entry*(1-out)*lerp(.40,1,swap),border:'2px solid #e4d8ff'}}>
      <Box x={33} y={31} w={w1-60} h={56} style={{fontSize:lerp(27,40,swap),fontWeight:930,display:'flex',justifyContent:'space-between',alignItems:'center',gap:14,whiteSpace:'nowrap',overflow:'hidden'}}><div><span style={{color:'#2d73bd'}}>Tencent 腾讯</span> 混元 Hy4</div><span style={{fontSize:21,color:PURPLE}}>旗舰模型全量开源</span></Box>
      <Pane x={30} y={118} w={w1-60} h={lerp(360,410,swap)} radius={18} style={{boxShadow:'none',background:'#f4f2f5'}}>
        {f<2639?<Still media="hy"/>:<Moving media="hy" from={2639} to={2850}/>}
      </Pane>
      <Box x={35} y={lerp(491,548,swap)} w={390} h={118}><div style={{fontSize:24,color:'#66636e',fontWeight:800}}>轻量版 Hy4 Flash</div><div style={{fontSize:67,fontWeight:930,lineHeight:1.05,fontVariantNumeric:'tabular-nums'}}>{hy1} <span style={{fontSize:37}}>亿</span></div></Box>
      {swap>.5&&<Box x={450} y={534} w={673} h={119} style={{borderRadius:18,boxSizing:'border-box',padding:'15px 21px',whiteSpace:'nowrap',backgroundColor:'#19191c',color:'#fff',opacity:f<2740?.25:1}}><div style={{fontSize:22,fontWeight:780,color:'#eeedfa'}}>旗舰版 Hy4 · 全量开源</div><div style={{fontSize:61,fontWeight:910,lineHeight:1.05,fontVariantNumeric:'tabular-nums'}}>{hy2} <span style={{fontSize:35}}>亿</span> <span style={{fontSize:25,color:LILAC}}>1M 上下文</span></div></Box>}
    </Pane>
    {f<2849&&<Credit text={f<2639?'来源：阿里云 Qwen4-Max · 官网企业案例（静图）':'来源：Tencent 混元 Hy4 官方发布视频'}/>}
  </AbsoluteFill>;
};

export const Notebook:React.FC<F>=({f})=>{
  const promptStart=2851, resultStart=3021, overlapStart=3020, promptEnd=3024;
  const a=lerp(.88,1,rise(f,2849,2867)), b=p(f,2928,2952), c=rise(f,2946,3013);
  const switchOut=rise(f,overlapStart-1,promptEnd);
  const resultIn=lerp(.82,1,rise(f,overlapStart,3037)), out=p(f,3153,3168);
  const files=[['PDF','行业研究.pdf',110,279],['MD','会议笔记.md',110,567],['CSV','原始数据.csv',1461,383]] as const;
  return <AbsoluteFill>
    {/* The result comes up under the prompt in f3020–3023; preserve its f3021 media origin. */}
    {f>=overlapStart&&<Pane x={121} y={148+60*(1-resultIn)+448*out} w={1678} h={689} radius={28} style={{opacity:resultIn*(1-out),border:'1px solid #dedbe5',background:'#f6f4f7'}}>
      <Freeze frame={resultStart} active={f<resultStart}><Moving media="notebookSite" from={resultStart} to={3169} fit="contain"/></Freeze>
    </Pane>}
    {f<promptEnd&&<>
      <Pane x={476-86*b} y={224+65*(1-a)-11*b} w={970+172*b} h={540+37*b} radius={27} style={{opacity:a*(1-switchOut),border:'1px solid #f0edf2',background:'#f6f5f7'}}>
        <Box x={31} y={23} w={906+172*b} h={71} style={{display:'flex',alignItems:'center',justifyContent:'space-between',whiteSpace:'nowrap',padding:'0 12px',color:'#22212a'}}>
          <div style={{fontSize:43,fontWeight:870}}>◉ NotebookLM · 一键建站</div><div style={{fontSize:21,color:'#77747c',fontWeight:750}}>官方素材现名 Gemini Notebook</div>
        </Box>
        <Pane x={28} y={97} w={914+172*b} h={407} radius={17} style={{boxShadow:'none',border:'1px solid #dddde5',background:'#fff'}}>
          {/* Pre-roll uses actual media frame 0 before the original clip clock starts at f2851. */}
          <Freeze frame={promptStart} active={f<promptStart}><Moving media="notebook" from={promptStart} to={promptEnd} fit="contain"/></Freeze>
        </Pane>
        {c>0&&<Box x={120} y={506} w={690} h={44} style={{fontSize:26,fontWeight:790,color:PURPLE,opacity:c}}>一句提示词　→　可交互网站</Box>}
      </Pane>
      {files.map(([ext,text,x,y],i)=>{
        const inA=rise(f,2852+i*5,2870+i*4);
        return <Pane key={text} x={x+(x<500?220:-230)*b} y={y+70*(1-inA)} w={306} h={114} radius={20} style={{opacity:inA*(1-b),padding:'18px 21px',border:'1px solid #f0eef5'}}><div style={{fontSize:19,fontWeight:850,color:PURPLE}}>{ext} · 示例文件</div><div style={{fontSize:32,fontWeight:860,marginTop:2}}>{text}</div></Pane>;
      })}
    </>}
    {f>=3122&&<Box x={1250} y={845+185*out} w={552} h={66} style={{textAlign:'right',opacity:env(f,3122,3132,3155,3168)}}><Tag dark style={{fontSize:28,color:LILAC}}>✦ 网页版 · 全球免费开放</Tag></Box>}
    <Credit text={f<resultStart?'来源：Google · Gemini Notebook（原 NotebookLM）':'来源：Google · 元素周期表互动网站官方演示'}/>
  </AbsoluteFill>;
};

export const Claude:React.FC<F>=({f})=>{
  // Encoded glyph tops differ by ~62 px at the witnessed title frames. Fit one hold across
  // f3289–3301 and ease back before the year line; the in-between hold is not measured.
  const titleY=270-62*p(f,3283,3289)*(1-p(f,3301,3307));
  const years=Math.round(kf(f,[[3307,0],[3312,0],[3322,79],[3330,150],[3346,167]]));
  const countLean=kf(f,[[3410,0],[3420,3.3],[3430,12.1],[3454,17.5]]).toFixed(1);
  const countLines=Math.round(kf(f,[[3494,0],[3505,530],[3510,1245],[3536,1737]]));
  // Only the envelopes overlap: the f3390 article and the original count clocks keep their meaning.
  const paperIn=lerp(.88,1,rise(f,3390,3400));
  const leanIn=lerp(.44,1,rise(f,3390,3402)), linesIn=lerp(.36,1,rise(f,3390,3404));
  const statsOut=1-p(f,3564,3570);
  // Start the compilation lead while the counts exit. Gate the dim pending card on that intro;
  // from f3587 the original opacity, review ramp and closing boundary are unchanged.
  const statusStart=3569, statusIntro=rise(f,statusStart,3587), reviewIn=rise(f,3629,3650);
  const compileIn=lerp(.86,1,statusIntro), reviewOpacity=lerp(.36,.74,reviewIn)*lerp(.45,1,statusIntro);
  const statusOut=1-.22*p(f,3694,3706);
  return <AbsoluteFill style={{background:'#5a5150'}}>
    <Moving media="claudeLaptop" from={3169} to={3728} rate={.74} style={{filter:'saturate(.84)',objectPosition:'54% 50%'}}/>
    <Shade value={.49}/>
    {f>=3224&&f<3390&&<Box x={244} y={titleY} w={1432} h={92} style={{textAlign:'center',opacity:env(f,3224,3252,3381,3390),color:'#fff',fontSize:42,fontWeight:900,textShadow:'0 4px 19px #0009'}}><Violet dark>AI</Violet> × Lean　{f>=3271&&'·　合作六周 · 黎曼猜想'}</Box>}
    {f>=3307&&f<3392&&<Box x={172} y={407} w={1576} h={223} style={{opacity:env(f,3307,3323,3383,3392),textShadow:'0 4px 15px #14131c88',color:'#fff'}}>
      <Box x={0} y={51} w={1576} h={4} style={{background:'#e6d4ff'}}/>
      <Box x={0} y={90} w={225} h={104}><b style={{fontSize:55}}>1859</b><div style={{fontSize:23,color:'#d3ccd9'}}>猜想提出</div></Box>
      <Box x={1352} y={90} w={225} h={104} style={{textAlign:'right'}}><b style={{fontSize:55}}>2026</b><div style={{fontSize:23,color:'#d3ccd9'}}>形式化验证进展</div></Box>
      <Box x={531} y={-18} w={523} h={151} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,fontWeight:900}}><span style={{fontSize:125,lineHeight:1,color:LILAC,letterSpacing:-6,fontVariantNumeric:'tabular-nums'}}>{years}</span><span style={{fontSize:42}}>年未解</span></Box>
    </Box>}
    {f>=3390&&f<3570&&<>
      <Pane x={109} y={145+55*(1-paperIn)} w={590} h={687} radius={26} style={{backgroundColor:'#fff',opacity:paperIn*(1-p(f,3560,3570))}}><Still media="claudePaper" fit="contain"/><Box x={32} y={623} w={526} h={40} style={{textAlign:'center',background:'#fffffff2',fontSize:21,fontWeight:760,color:'#626067'}}>Alpöge 公开研究说明 · 第 1 页</Box></Pane>
      <Pane x={737} y={149} w={1093} h={309} dark radius={24} style={{opacity:leanIn*statsOut*.92,padding:'54px 52px'}}>
        <div style={{fontSize:26,fontWeight:760,color:'#ccc8d4'}}>没有传统论文 · 公开 Lean 文件（原片口径）</div>
        <div style={{fontSize:116,lineHeight:1.04,fontWeight:920,letterSpacing:-4,marginTop:23,fontVariantNumeric:'tabular-nums'}}>{countLean}<Violet dark><span style={{fontSize:50,letterSpacing:0}}> 万个 Lean 文件</span></Violet></div>
      </Pane>
      <Pane x={737} y={491} w={1093} h={310} dark radius={24} style={{opacity:linesIn*statsOut*lerp(.42,.92,rise(f,3490,3508)),padding:'51px 52px'}}>
        <div style={{fontSize:26,fontWeight:760,color:'#c9c4d0'}}>机器可核验的形式化代码（原片口径）</div>
        <div style={{fontSize:116,lineHeight:1,fontWeight:930,color:LILAC,letterSpacing:-3,marginTop:24,fontVariantNumeric:'tabular-nums'}}>{countLines}<span style={{fontSize:50,letterSpacing:0,color:'#fff'}}> 万行验证代码</span></div>
      </Pane>
    </>}
    {f>=statusStart&&f<3705&&<>
      <Pane x={128} y={427+53*(1-compileIn)} w={775} h={233} dark radius={25} style={{opacity:compileIn*statusOut,backgroundColor:'#1c1a24e8',padding:'26px 36px',border:'1px solid #a09aaf46'}}><div style={{color:LILAC,fontSize:26,fontWeight:850}}>●　步骤 1 · 已完成</div><div style={{fontSize:49,fontWeight:900,marginTop:18}}>MIT 数学家初步编译通过</div><div style={{color:'#ada7bc',fontSize:23,fontWeight:735,marginTop:12}}>形式化核验进展 · 原片报道时点</div></Pane>
      <Box x={920} y={498} w={98} h={77} style={{opacity:compileIn,color:'#cfc9dca0',fontSize:62,textAlign:'center'}}>→</Box>
      <Pane x={1023} y={427+34*(1-reviewIn)} w={769} h={233} dark radius={25} style={{opacity:reviewOpacity*statusOut,backgroundColor:'#1c1a24db',padding:'26px 36px',border:'1px solid #d8d3df53'}}><div style={{color:'#d7cced',fontSize:26,fontWeight:840}}>⊙　步骤 2 · 进行中</div><div style={{fontSize:49,fontWeight:900,marginTop:18}}>严格人工同行复核</div><div style={{color:'#c8c2d1',fontSize:23,fontWeight:735,marginTop:12}}>机器验证不等于同行评审</div></Pane>
    </>}
    {f>=3170&&<Credit text="来源：Alpöge · Lean/Mathlib · 笔记本为 Mixkit 示意" dark onVideo/>}
  </AbsoluteFill>;
};
