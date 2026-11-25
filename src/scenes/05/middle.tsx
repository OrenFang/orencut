import React from 'react';
import {AbsoluteFill, Freeze} from 'remotion';
import {Box,Pane,Moving,Still,Shade,Tag,Credit,Violet,FullTitle,W,H,PURPLE,LILAC,INK,env,p,rise,clamp,lerp,kf} from './visual';
import type {Movie} from './visual';

type F={f:number};
// Enter a readable state at the cut, then reconnect to the original curve.
const reconnectRise=(f:number,first:number,settled:number,rejoin:number,initial:number)=>
  f>=rejoin?rise(f,first,settled):lerp(initial,rise(rejoin,first,settled),rise(f,first,rejoin));

const geminiChips:[Movie,string,string][]=[['hydrogen','Gemini 4 Hydrogen','Google Search · AI Mode 官方案例'],['neon','Gemini 4 Neon','Google Antigravity · Neon Putt 官方案例']];
export const Gemini:React.FC<F>=({f})=>{
  if(f<1274){
    const a=reconnectRise(f,1146,1160,1156,.96);const b=rise(f,1186,1200);const out=p(f,1267,1274);
    return <AbsoluteFill>
      {f<1148&&geminiChips.map(([media,title,sub],i)=>{
        const from=1067+i*3, settled=1080+i*2;
        let a=rise(f,from,settled);
        if(i) a*=p(f,1078,1080); // f1079 is the one unsampled bridge.
        else if(f<1076) a=f<1071?0:lerp(.94,rise(1076,from,settled),rise(f,1071,1076));
        // The twin cards stay in place behind the incoming Mac at f1145–1147.
        const tail=lerp(1,.54,p(f,1138,1145))*(1-p(f,1145,1148));
        return <Pane key={media} x={138+i*849} y={166+98*(1-a)} w={790} h={674} style={{opacity:a*tail}}>
          <Box x={0} y={0} w={790} h={514} style={{background:'#e9eaf2',overflow:'hidden'}}><Moving media={media} from={from} to={1148}/></Box>
          <Box x={32} y={544} w={730} h={105} style={{fontSize:42,fontWeight:890}}><div><Violet>✦</Violet> {title}</div><div style={{fontSize:23,marginTop:11,color:i?PURPLE:'#66636b'}}>{sub}</div></Box>
        </Pane>;
      })}
      {f>=1145&&<Pane x={112-27*b} y={178+80*(1-a)+110*out} w={1144-62*b} h={640-32*b} style={{opacity:f===1145?.48:a*(1-out*.84),background:'#171829'}}>
        <Freeze frame={1146} active={f===1145}><Moving media="geminiMac" from={1146} to={1274}/></Freeze>
      </Pane>}
      {f>=1186&&<Pane x={993+60*(1-b)} y={304+140*out} w={791} h={449} dark radius={21} style={{opacity:b*(1-out*.8)}}><Moving media="geminiMac" from={1186} to={1274} trim={325}/></Pane>}
      <Credit text={f<1146?'来源：Google Search · Google Antigravity':'来源：Gemini for Mac · 官方 Blender 蝴蝶示例'}/>
    </AbsoluteFill>;
  }
  const a=reconnectRise(f,1274,1290,1285,.95);const out=p(f,1399,1417);const shade=p(f,1328,1347);
  return <AbsoluteFill>
    <Pane x={89} y={178+82*(1-a)+444*out} w={1097} h={632} dark style={{opacity:a*(1-out),background:'#141324'}}>
      <Moving media="geminiTasks" from={1274} to={1417} fit="contain"/>
    </Pane>
    <Pane x={1226} y={178+91*(1-a)+503*out} w={576} h={632} style={{opacity:a*(1-out),backgroundColor:f>=1335?'#1b1a1d':'#fff',color:f>=1335?'#fff':INK,padding:'52px 39px'}}>
      <div style={{fontWeight:900,fontSize:43}}>✦ Gemini Tasks</div>
      <div style={{fontSize:27,fontWeight:820,color:f>=1335?LILAC:PURPLE,margin:'15px 0 30px'}}>免费开放六国</div>
      <div style={{display:'flex',gap:9,flexWrap:'wrap',marginBottom:56,maxWidth:466}}>{['美国','日本','韩国','加拿大','澳大利亚','印度'].map(t=><Tag key={t} dark={f>=1335} style={{fontSize:20,backgroundColor:f>=1335?'#343237':'#f3f1f6'}}>{t}</Tag>)}</div>
      <div style={{borderTop:'1px solid #7774',paddingTop:28}}><b style={{fontSize:28}}>Google Duplex · 商家预约</b><div style={{fontSize:18,color:f>=1335?'#bbb9c5':'#72717d',marginTop:8}}>能力示意 · 非通话实录</div>
        <div style={{height:73,display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:16}}>{Array.from({length:25},(_,i)=><span key={i} style={{height:8+shade*(10+Math.abs(Math.sin(i*1.2+f*.25))*60),width:6,borderRadius:5,backgroundColor:f>=1335?'#d6bfff':'#d8cfe9',opacity:.5+(i%3)*.2}}/>)}</div>
      </div>
    </Pane>
    <Credit text="来源：Google · Gemini Tasks 官方预约示例"/>
  </AbsoluteFill>;
};

function Cost({f}:F){
  const entry=f<1420?0:reconnectRise(f,1420,1431,1428,.96);
  const prev=Math.round(kf(f,[[1425,0],[1431,36],[1437,89],[1440,96],[1448,100]]));
  const current=Math.round(kf(f,[[1460,0],[1474,13],[1485,30],[1494,33]]));
  return <AbsoluteFill>
    <Pane x={200} y={206+92*(1-entry)} w={1520} h={588} radius={38} style={{opacity:entry,border:'1px solid #e9e7ea',fontVariantNumeric:'tabular-nums'}}>
      <Box x={72} y={46} w={1102} h={73} style={{fontSize:45,fontWeight:900}}>◎ OpenAI GPT-6.2 · 单任务推理成本</Box>
      <Box x={1177} y={57} w={300} h={49} style={{fontSize:29,fontWeight:760,color:'#77767b'}}>相对上一代 GPT-6</Box>
      <Box x={72} y={170} w={290} h={82} style={{fontSize:45,fontWeight:860,color:'#7a797e',display:'flex',alignItems:'center'}}>上一代 GPT-6</Box>
      <Box x={361} y={168} w={889*prev/100} h={84} style={{borderRadius:90,background:'#19191b'}}/>
      <Box x={361+889*prev/100+24} y={171} w={176} h={75} style={{fontSize:56,lineHeight:1.2,fontWeight:870,color:'#6d6c70',opacity:prev>0?1:0}}>{prev}%</Box>
      <Box x={72} y={311} w={290} h={82} style={{fontSize:45,fontWeight:900,display:'flex',alignItems:'center'}}>GPT-6.2</Box>
      <Box x={361} y={309} w={889*current/100} h={84} style={{borderRadius:90,background:PURPLE}}/>
      <Box x={361+889*current/100+25} y={312} w={445} h={80} style={{fontSize:59,fontWeight:900,color:PURPLE,opacity:current>0?1:0,display:'flex',gap:15,alignItems:'center'}}>{current}% {f>=1495&&<span style={{fontSize:33,color:INK,opacity:f<1499?lerp(.18,1,rise(f,1495,1499)):undefined}}>砍到三分之一</span>}</Box>
    </Pane>
    <Credit text="来源：OpenAI 官方发布 · 口播原片比较口径"/>
  </AbsoluteFill>;
}
export const Space:React.FC<F>=({f})=>{
  if(f<1544)return <Cost f={f}/>;
  const entry=reconnectRise(f,1545,1559,1555,.96), exit=p(f,1777,1791);
  return <AbsoluteFill>
    <Pane x={196} y={140+60*(1-entry)+404*exit} w={1528} h={686} style={{opacity:entry*(1-exit),background:'#f7f7fb',border:'1px solid #d7d8e4'}}>
      <Freeze frame={1545} active={f===1544}><Moving media="space" from={1545} to={1743} fit="contain"/></Freeze>
      <Moving media="spaceShare" from={1743} to={1792} trim={45} fit="contain"/>
    </Pane>
    {['文档','幻灯片','图片','交互图表'].map((t,i)=>{const on=f>=1624+i*23;return <Pane key={t} x={196+i*386} y={844+300*exit} w={366} h={68} radius={13} style={{display:'grid',placeItems:'center',fontSize:25,fontWeight:800,opacity:entry*(1-exit),backgroundColor:on?'#19191c':'#f6f5f7',color:on?'#fff':'#7d7b84',boxShadow:'none'}}>● {t}</Pane>;})}
    <Credit text={f<1743?'来源：ChatGPT Space 官方品牌指南示例':'来源：ChatGPT Space 官方旧金山页面共享示例'}/>
  </AbsoluteFill>;
};

export const Kling:React.FC<F>=({f})=>{
  if(f<1904){
    const sw=rise(f,1846,1855);
    return <AbsoluteFill style={{background:'#1b1819'}}>
      <Still media={f<1850?'klingType':'klingSeries'} style={{transform:`scale(${1.03+(f<1850?f-1792:f-1850)*.0018})`,filter:'saturate(.86)'}}/>
      <Shade value={lerp(.42,.62,sw)}/>
      {f>=1848&&<Pane x={1242} y={118} w={398} h={740} radius={18} dark style={{opacity:sw,transform:`translateX(${lerp(45,0,sw)}px)`}}><Moving media="klingBallet" from={1848} to={1904}/></Pane>}
      <FullTitle size={136} y={415}>原生 <Violet dark>8K</Violet> 直出</FullTitle>
      <Credit text={f<1848?'来源：可灵 Image 4.0 官方示例':'来源：可灵官网 · 芭蕾细节宣传（片源非 8K）'} dark onVideo/>
    </AbsoluteFill>;
  }
  if(f<1955){
    const a=reconnectRise(f,1905,1918,1914,.96);
    return <AbsoluteFill>
      <Still media="klingType" style={{transform:`scale(${1.02+Math.max(0,f-1905)*.0015})`}}/><Shade value={.35}/>
      <Pane x={302} y={230+55*(1-a)} w={1316} h={517} dark radius={36} style={{opacity:a,backgroundColor:'#19181bed',padding:'70px 67px'}}>
        <div style={{color:LILAC,fontSize:32,fontWeight:840}}>高级文字排版能力</div><div style={{fontSize:132,fontWeight:920,lineHeight:1.05,letterSpacing:-4,marginTop:13}}>2000 <b style={{fontSize:57,letterSpacing:0}}>字 / 单图</b></div><div style={{fontSize:28,marginTop:28,color:'#c8c4ce',fontWeight:720}}>中英文长文本 · 复杂版式与风格</div>
        <Pane x={890} y={75} w={352} h={352} dark radius={176} style={{outline:'2px solid #fff4'}}><Still media="klingBallet" style={{objectPosition:'center 56%'}}/></Pane>
      </Pane>
      <Credit text="来源：可灵 Image 4.0 · 官网长文本案例" dark onVideo/>
    </AbsoluteFill>;
  }
  if(f<1958)return <AbsoluteFill style={{background:'#fff'}}/>;
  const slide=lerp(36,-393,p(f,2019,2104));const out=p(f,2112,2124);
  const heading=reconnectRise(f,1958,1971,1967,.96)*(1-p(f,2115,2124));
  return <AbsoluteFill>
    <Box x={74} y={163} w={1530} h={78} style={{fontSize:47,fontWeight:910,opacity:heading}}>✦ 一次生成 <Violet>10 张</Violet> 风格一致组图</Box>
    {[0,1,2,3].map(i=>{const a=reconnectRise(f,1958+i*2,1976+i*2,1970+i*2,.95);
      return <Pane key={i} x={99+i*493+slide} y={269+60*(1-a)+360*out} w={458} h={366} radius={25} style={{opacity:a*(1-out),background:'#191a1d'}}>
        <Still media="klingSeries" fit="fill" style={{left:-(i%2)*458,top:-Math.floor(i/2)*366,width:916,height:732}}/>
        <Box x={15} y={303} w={225} h={47}><Tag dark style={{fontSize:18}}>官网组图 · {String(i+1).padStart(2,'0')}</Tag></Box>
      </Pane>;
    })}
    <Pane x={133} y={715+140*(1-rise(f,2026,2044))+360*out} w={1660} h={191} style={{opacity:env(f,2026,2044,2112,2124),padding:'34px 39px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div><div style={{fontSize:24,fontWeight:700,color:'#66636d'}}>Artificial Analysis · 原片时点口径</div><div style={{fontSize:45,fontWeight:920,marginTop:9}}>Kling Image 4.0 冲进 <Violet>全球第 6</Violet></div></div>
      <div style={{display:'flex',gap:10}}>{[1,2,3,4,5,6,7,8].map(n=><div key={n} style={{padding:'13px 15px',borderRadius:13,fontSize:31,fontWeight:880,color:n===6?'#fff':'#8b878f',background:n===6?PURPLE:'#f6f5f7',boxShadow:n===6?'0 4px 14px #8253e24c':undefined}}>#{n}</div>)}</div>
    </Pane>
    <Credit text="来源：可灵官方组图 · Artificial Analysis（原片时点）"/>
  </AbsoluteFill>;
};

const visuals:[Movie,number,number][]=[['sunoDiamond',2127,2195],['sunoCrochet',2195,2270],['sunoPink',2270,2310],['sunoCake',2310,2367],['sunoDisco',2367,2423]];
export const Suno:React.FC<F>=({f})=>{
  const selected=Math.max(0,visuals.findIndex(([,a,b])=>a<=f&&f<b));
  const idx=selected===0?0:lerp(selected-1,selected,p(f,visuals[selected][1]-2,visuals[selected][1]+13));
  const a=rise(f,2126,2140);
  const wings=rise(f,2193,2210), bars=env(f,2197,2211,2415,2423);
  const progress=clamp((f-2266)/(2395-2266));
  const showForeground=f<2421; // Source-only neighbors show the cleared dark stage at f2421–2422.
  return <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 46%, #35323f 0%, #24232b 35%, #18181a 68%)'}}>
    <Box x={1670} y={42} w={200} h={48} style={{display:'flex',alignItems:'center',gap:13,color:LILAC,fontSize:33,fontWeight:880}}><svg width="47" height="40" viewBox="0 0 47 40"><path d="M4 20C11 21 14 38 21 30C25 25 24 9 32 7C37 6 39 14 41 18" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round"/></svg>Visuals</Box>
    {showForeground&&visuals.map(([media,start,end],i)=>{
      const d=i-idx;
      const scale=lerp(1,.78,clamp(Math.abs(d))), alpha=(i===0?1:wings)*a*lerp(1,.38,clamp(Math.abs(d)));
      return Math.abs(d)<1.95&&<Pane key={media} x={960-208+d*462} y={124+50*(1-a)} w={416} h={749} dark radius={28} style={{opacity:alpha,transform:`scale(${scale})`,zIndex:i===selected?8:6,outline:i===selected?'2px solid #e8d3ff4d':undefined}}>
        {f>=start&&f<end?<Moving media={media} from={start} to={end}/>:<Still media={media}/>}
        {(i!==selected||f<2127)&&<Shade value={i!==selected?.17:.2}/>}
      </Pane>;
    })}
    {showForeground&&[42,1671].map((x,side)=><Box key={x} x={x} y={389} w={207} h={287} style={{zIndex:9,opacity:bars,display:'flex',alignItems:'center',justifyContent:'space-around'}}>{Array.from({length:13},(_,i)=>{
      const h=24+Math.abs(Math.sin(i*1.26+f*.18+side*.67))*(110+(i%4)*34);
      return <i key={i} style={{width:i%3===0?9:6,height:h,backgroundColor:i%3===0?'#d8bfff':'#eee6ff',opacity:.58+(i%4)*.12,borderRadius:9}}/>;
    })}</Box>)}
    {showForeground&&f>=2267&&<Pane x={454} y={890} w={1012} h={44} dark radius={18} style={{background:'#26242b',opacity:env(f,2267,2282,2416,2423),padding:'5px 18px',display:'flex',gap:24,alignItems:'center',boxShadow:'none'}}><div style={{fontSize:18,color:'#bbb4c6',fontWeight:750}}>片段长度</div><div style={{position:'relative',flex:'1 1 auto',height:10,background:'#51475e',borderRadius:10}}><div style={{height:'100%',width:`${progress*100}%`,minWidth:3,borderRadius:10,backgroundColor:LILAC}}/></div><div style={{fontSize:19,color:LILAC,fontWeight:820}}>15 秒 · 可继续延长</div></Pane>}
    {f>=2127&&<Credit text="来源：Suno Visuals · 官方竖幅示例（静音）" dark onVideo/>}
  </AbsoluteFill>;
};

export { Cost };
