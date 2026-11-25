import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Box, Pane, Tag, Shade, FullTitle, Credit, Moving, Still, Violet, H,W, PURPLE, LILAC, INK, clamp, lerp,p,rise,env,kf} from './visual';
import type {Media,Movie} from './visual';

type F={f:number};
const flash: {start:number;end:number;media:Media;title:string}[]=[
  {start:0,end:7,media:'groot',title:'GR00T 2'},
  {start:7,end:13,media:'robotics',title:'Gemini 机械臂'},
  {start:13,end:20,media:'space',title:'ChatGPT Space'},
  {start:20,end:26,media:'klingType',title:'可灵 Image 4.0'},
  {start:26,end:33,media:'notebookSite',title:'NotebookLM'},
  {start:33,end:39,media:'sunoDiamond',title:'Suno Visuals'},
];
const tiles:{media:Media;title:string}[]=[
  {media:'genie',title:'Genie 4'}, {media:'groot',title:'AI 机器人'}, {media:'hydrogen',title:'Gemini 4'},
  {media:'space',title:'GPT-6.2 · Space'}, {media:'klingType',title:'可灵 Image 4.0'}, {media:'sunoCrochet',title:'Suno Visuals'},
  {media:'qwen',title:'国产双雄'}, {media:'notebookSite',title:'NotebookLM'}, {media:'claudeLaptop',title:'Claude 黎曼猜想'},
];
const fan=[[1042,163,576,324],[301,165,577,324],[192,377,582,325],[1154,379,571,323],[301,592,580,325],[480,271,960,540],[671,637,573,316],[671,127,578,326],[1041,592,575,324]];
const spread=[[912,16,968,545],[-80,22,970,550],[-485,-340,590,332],[925,589,940,529],[-550,400,515,300],[-56,587,945,560],[691,1120,579,326],[-370,40,440,248],[1990,610,510,286]];
export const Opening:React.FC<F>=({f})=>{
  if(f<39){
    const q=flash.find(o=>o.start<=f&&f<o.end)!;
    const a=f===7?.48:rise(f,q.start,q.start+4);
    const incoming=q.start>0&&f===q.start&&q.start!==7&&q.start!==33;
    const prior=flash.find(o=>o.end===q.start);
    return <AbsoluteFill style={{background:'#19191c'}}>
      {q.media==='groot'||q.media==='robotics'||q.media==='space'||q.media==='notebookSite'||q.media==='sunoDiamond'
        ? <Moving media={q.media} from={q.start} to={q.end} trim={23}/>:<Still media={q.media}/>}
      <Shade value={f===0?.09:.24}/>
      {incoming&&prior&&<FullTitle size={162} opacity={.56} y={405}>{prior.title}</FullTitle>}
      <FullTitle size={q.title.length>13?146:166} opacity={a} y={405} s={lerp(.91,1.015,a)}>{q.title}</FullTitle>
    </AbsoluteFill>;
  }
  const expand=p(f,49,74), fill=p(f,74,84);
  const sunoHandoff=p(f,39,45);
  return <AbsoluteFill style={{background:'#fff'}}>{tiles.map((t,i)=>{
    const onset=rise(f,39+(i===0?1:(i+3)%7),47+(i+3)%7);
    const xy=fan[i], b=spread[i];
    const dims=xy.map((a,j)=>lerp(a,b[j],expand));
    const [fx,fy,fw,fh]=i===0?[lerp(dims[0],0,fill),lerp(dims[1],0,fill),lerp(dims[2],W,fill),lerp(dims[3],H,fill)]:dims;
    return <Pane key={t.title} x={fx} y={fy+32*(1-onset)} w={fw} h={fh} radius={lerp(16,0,fill)} style={{zIndex:i===0?30:i===5?20:i===8?10:8,opacity:onset*(i===0?1:1-fill),backgroundColor:'#1d1e21'}}>
      {i===0&&f>=70?<Moving media="genie" from={70} to={459} rate={.60}/>:<Still media={t.media}/>}
      {i===0&&f>=74&&<Shade value={.28*fill}/>}
    </Pane>;
  })}{f<45&&<Box x={480*sunoHandoff} y={271*sunoHandoff} w={lerp(W,960,sunoHandoff)} h={lerp(H,540,sunoHandoff)} style={{zIndex:31,backgroundColor:'#19191c',borderRadius:16*sunoHandoff,overflow:'hidden',opacity:1-sunoHandoff}}>
    <Moving media="sunoDiamond" from={33} to={45} trim={23}/>
    <Shade value={.24}/>
    <Box x={0} y={0} w={W} h={H} style={{transformOrigin:'top left',transform:`scale(${lerp(1,.5,sunoHandoff)})`}}>
      <FullTitle y={405} size={166} opacity={lerp(.78,.36,sunoHandoff)}>Suno Visuals</FullTitle>
    </Box>
  </Box>}</AbsoluteFill>;
};

const DemoAside:React.FC<F>=({f})=>{
  const exit=p(f,595,610);
  const shown=rise(f,470,479)*(1-exit);
  const labels=[['热点抓取与写稿','自动核验一手来源'],['声音复刻对齐','词级时间戳精修'],['全自动剪辑出片','Skill + 组件库渲染']];
  return <AbsoluteFill>
    <Box x={265} y={127} w={1390} h={115} style={{display:'grid',placeItems:'center',fontWeight:900,fontSize:64,letterSpacing:-1,opacity:shown,transform:`translateY(${lerp(40,0,shown)}px)`}}><div>本期视频由 <Violet>Demo</Violet> 全自动剪辑输出</div></Box>
    {[0,1].map(i=><Box key={i} x={625+i*566} y={402+65*exit} w={99*rise(f,490+i*12,501+i*12)} h={5} style={{backgroundColor:PURPLE,opacity:1-exit}}/>)}
    {labels.map(([title,sub],i)=>{
      const a=rise(f,473+i*12,489+i*12);
      const dark=i===2;
      return <Pane key={title} x={160+i*565} y={300+100*(1-a)+65*exit} w={472} h={210} dark={dark} style={{opacity:a*(1-exit),padding:'27px 36px',border:dark?undefined:'2px solid #b79dde'}}>
        <div style={{fontWeight:790,color:dark?LILAC:PURPLE,fontSize:28,marginBottom:14}}>{String(i+1).padStart(2,'0')}</div><div style={{fontWeight:900,fontSize:37}}>{title}</div><div style={{fontWeight:640,fontSize:25,color:dark?'#c5c3cb':'#75747c',marginTop:5}}>{sub}</div>
        <div style={{position:'absolute',right:36,top:31,background:dark?LILAC:PURPLE,color:dark?INK:'#fff',fontSize:26,fontWeight:850,width:36,height:36,borderRadius:25,display:'grid',placeItems:'center'}}>✓</div>
      </Pane>;
    })}
    {f>=518&&<Pane x={459} y={604+45*exit} w={1002} h={180} radius={37} style={{opacity:env(f,518,531,595,610),padding:'28px 35px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div><div style={{fontSize:25,fontWeight:690,color:'#6b6971'}}>想拿这套全自动剪辑工作流？</div><div style={{fontSize:40,fontWeight:890,marginTop:9,display:'flex',alignItems:'center',gap:19}}>评论区扣 <Tag style={{height:50,minWidth:179,fontSize:30,border:'1px solid #dfdbe6'}}><Violet>{'Demo'.slice(0,Math.round(kf(f,[[540,0],[562,4]])))}</Violet></Tag></div></div>
      <Tag dark style={{backgroundColor:f<570?PURPLE:'#19191c',color:'#fff',borderRadius:22,fontSize:33,padding:'16px 45px'}}>{f<570?'发送':'Demo'}</Tag>
    </Pane>}
  </AbsoluteFill>;
};

export const Genie:React.FC<F>=({f})=>{
  if(f>=466) return <DemoAside f={f}/>;
  const onWhite=f>=407;
  const shot=rise(f,407,432), exit=p(f,454,465);
  const beforeSettle=f>=404&&f<420, dropping=f>454;
  // The source has two independent planes: the world clears the white stage
  // before the purple mark, while the API card goes from translucent to opaque.
  const toOld=p(f,412,420);
  const fit=(a:number,b:number)=>lerp(a,b,toOld);
  const sx=lerp(0,175,shot), sy=lerp(0,246,shot);
  const sw=lerp(W,794,shot), sh=lerp(H,448,shot);
  const drop=kf(f,[[454,0],[459,.22],[462,.61],[464,.88],[465,1]]);
  const movieBox= beforeSettle ? {
    x:fit(kf(f,[[404,24],[405,22],[406,24],[407,52],[408,64],[412,67]]),sx),
    y:fit(kf(f,[[404,12],[405,22],[406,112],[407,162],[408,166],[412,168]]),sy),
    w:fit(kf(f,[[404,1740],[405,1640],[406,1368],[407,1100],[408,1080],[412,1040]]),sw),
    h:fit(kf(f,[[404,979],[405,923],[406,770],[407,619],[408,608],[412,585]]),sh),
  } : dropping ? {x:kf(f,[[454,175],[463,75],[464,72],[465,128]]),y:kf(f,[[454,246],[459,350],[462,521],[463,610],[464,735],[465,1030]]),w:lerp(sw,922,drop),h:lerp(sh,519,drop)} : {x:sx,y:sy+550*exit,w:sw,h:sh};
  const apiAlpha=beforeSettle?fit(kf(f,[[404,0],[405,0],[406,.46],[407,.97],[408,1]]),shot):1;
  const showApi=(f>=406&&f<465);
  const apiX=beforeSettle?fit(kf(f,[[406,1125],[407,1093],[408,1080],[412,1060]]),1002):1002;
  const apiY=beforeSettle?fit(kf(f,[[406,190],[407,195],[408,199],[412,203]]),257):dropping?kf(f,[[454,257],[459,365],[462,537],[463,625],[464,735]]):257;
  const black=env(f,86,112,183,196)*.35;
  return <AbsoluteFill style={{backgroundColor:'#fff'}}>
    <Box {...movieBox} style={{borderRadius:lerp(0,20,shot),overflow:'hidden',opacity:dropping?1:1-exit,boxShadow:onWhite?'0 9px 28px #0002':undefined}}>
      <Still media="genie"/><Moving media="genie" from={70} to={dropping?466:462} rate={.60}/><Shade value={black}/>
    </Box>
    {!onWhite&&<>
      {f>=107&&f<197&&<Box x={320} y={380-34*rise(f,156,169)} w={1280} h={80} style={{textAlign:'center',color:'#fff',fontSize:43,fontWeight:760,textShadow:'0 3px 16px #0008',opacity:env(f,108,131,182,195)}}>Google DeepMind</Box>}
      {f>=157&&f<195&&<FullTitle opacity={env(f,157,161,184,195)} size={kf(f,[[157,132],[159,160],[180,160],[195,132]])} y={414}>Genie <Violet dark>4</Violet></FullTitle>}
      {f>=200&&f<305&&<Box x={65} y={735} w={535} h={117} style={{display:'flex',gap:16,alignItems:'center'}}>
        {[['720p',200],['24 fps',246],['48 kHz',253]].map(([t,at])=><Tag key={t} dark style={{fontSize:34,opacity:rise(f,Number(at),Number(at)+6),padding:'16px 18px'}}>{t}</Tag>)}
      </Box>}
      {f>=305&&f<381&&<Box x={630} y={824} w={660} h={74} style={{textAlign:'center',opacity:env(f,305,315,372,381)}}><Tag dark>{f<336?'W　A　S　D':'世界内事件 · 官方山地替代示例'}</Tag></Box>}
    </>}
    {showApi&&<Pane x={apiX} y={apiY} w={680} h={426} style={{padding:'61px 55px',opacity:dropping?1:beforeSettle?apiAlpha:shot*(1-exit)}}>
      <div style={{fontSize:39,fontWeight:880}}>✦　Gemini API</div>
      <div style={{fontSize:67,fontWeight:900,marginTop:48}}>现已<Violet>正式上线</Violet></div>
      <div style={{borderTop:'2px solid #f0eef3',marginTop:46,paddingTop:22,color:'#626168',fontSize:25,fontWeight:680}}>Project Genie · Google DeepMind</div>
    </Pane>}
    {f>=99&&f<465&&<Credit text={onWhite?'来源：Google · Google DeepMind':'来源：Project Genie · 官方山地替代例'} dark={!onWhite} onVideo={!onWhite}/>}
    {f===465&&<DemoAside f={f}/>}
  </AbsoluteFill>;
};

function Ring({f}:{f:number}){
  const pct=Math.round(kf(f,[[826,0],[863,0],[885,0],[897,11],[899,17],[900,21],[914,68],[937,96]]));
  const circumference=2*Math.PI*147;
  return <Box x={88} y={152} w={339} h={339} style={{fontVariantNumeric:'tabular-nums'}}>
    <svg width="339" height="339" viewBox="0 0 339 339"><circle cx="169.5" cy="169.5" r="147" fill="none" stroke="#eee9fa" strokeWidth="18"/><circle cx="169.5" cy="169.5" r="147" fill="none" stroke={PURPLE} strokeWidth="18" strokeLinecap="round" strokeDasharray={`${circumference*pct/100} ${circumference}`} opacity={pct===0?0:1} transform="rotate(-90 169.5 169.5)"/></svg>
    <div style={{position:'absolute',inset:0,display:'grid',alignContent:'center',justifyContent:'center',textAlign:'center'}}>
      <div style={{fontSize:102,letterSpacing:-5,fontWeight:940,lineHeight:1.05}}>{pct}<span style={{fontSize:46,letterSpacing:-1}}>%</span></div><div style={{fontSize:24,color:'#6b6971',fontWeight:720}}>产线试点成功率</div>
    </div>
  </Box>;
}

export const Robots:React.FC<F>=({f})=>{
  if(f<823){
    const detail=f>=729;
    return <AbsoluteFill style={{background:'#1a1716'}}>
      <Moving media="groot" from={612} to={729} style={{filter:'brightness(.91) saturate(.95)'}}/>
      <Moving media="groot" from={729} to={823} trim={118} style={{filter:'brightness(.91) saturate(.95)',transform:'scale(1.09)',transformOrigin:'56% 63%'}}/>
      <Shade value={.39} direction="bottom"/>
      <Box x={58} y={742} w={690} h={110} style={{color:'#fff',fontWeight:860,opacity:rise(f,663,676)}}><div style={{fontSize:54}}>GR00T <Violet dark>2</Violet> 开源</div><div style={{fontSize:23,marginTop:8,color:'#eae8ee'}}>NVIDIA 官方演示 · Dexter {detail?'标签操作细节':'打包标签制作'}</div></Box>
      <Credit text="来源：NVIDIA Research · GR00T 2 官方演示" dark onVideo/>
    </AbsoluteFill>;
  }
  if(f<826) return <AbsoluteFill style={{background:'#fff'}}/>;
  if(f<980){
    const entry=rise(f,826,840);
    return <AbsoluteFill>
      <Pane x={85} y={171+48*(1-entry)} w={1097} h={662} radius={23} style={{backgroundColor:'#171717',opacity:entry}}><Moving media="robotics" from={826} to={980}/></Pane>
      <Pane x={1248} y={171+53*(1-entry)} w={499} h={662} style={{opacity:entry}}><Box x={37} y={62} w={437} h={75} style={{fontSize:36,fontWeight:860,textAlign:'center'}}>✦ Gemini Robotics 2.5</Box><Ring f={f}/><Box x={20} y={557} w={459} h={62} style={{color:'#77747b',fontSize:25,textAlign:'center',fontWeight:780}}>奔驰产线 · Apptronik Apollo</Box></Pane>
      <Credit text="来源：Google DeepMind · Gemini Robotics"/>
    </AbsoluteFill>;
  }
  const out=p(f,1048,1064), on=rise(f,980,990);
  const items=['01 白板部署','02 MuJoCo 仿真','03 实机分拣 · 约 1 小时'];
  return <AbsoluteFill>
    <Pane x={125} y={167+630*out+55*(1-on)} w={1668} h={594} dark radius={25} style={{opacity:on*(1-out)}}><Moving media="robotics" from={980} to={1008} trim={158}/><Moving media="grootSort" from={1008} to={1065} trim={43}/><Box x={30} y={504} w={768} h={64}><Tag dark>{f<1008?'Apptronik 奔驰试点 · 官方示例':'NVIDIA YAM 分拣 · 替代示例'}</Tag></Box></Pane>
    {items.map((text,i)=>{const active=f>=980+i*14; return <Pane key={text} x={125+i*570} y={777+490*out} w={530} h={86} radius={16} style={{display:'grid',placeItems:'center',fontWeight:820,fontSize:32,opacity:on*(1-out)*(active?1:.42),backgroundColor:i===2&&active?'#1a191d':'#fff',color:i===2&&active?'#fff':INK}}>{text}</Pane>;})}
    <Credit text={f<1008?'来源：Google DeepMind · Gemini Robotics':'来源：NVIDIA Research · YAM 分拣（替代例）'}/>
  </AbsoluteFill>;
};

export const Closing:React.FC<F>=({f})=>{
  // Same laptop clip throughout the handoff. Fit the moving rectangle from
  // full-bleed to the lower-right thumbnail, not through the bottom edge.
  const x=kf(f,[[3710,0],[3711,12],[3712,500],[3713,762],[3714,916],[3715,1060],[3716,1194]]);
  const y=kf(f,[[3710,0],[3711,176],[3712,306],[3713,426],[3714,529],[3715,638],[3716,692]]);
  const w=kf(f,[[3710,W],[3711,1875],[3712,1230],[3713,936],[3714,707],[3715,530],[3716,372]]);
  return <AbsoluteFill style={{backgroundColor:'#fff'}}>
    {tiles.map((t,i)=>{
      const row=Math.floor(i/3);
      const a=rise(f,3710+row+(i%3===1?0:1),3714+row);
      return <Box key={t.title} x={354+(i%3)*420} y={108+Math.floor(i/3)*292+lerp(42,0,a)} w={372} h={265} style={{opacity:a,transform:`scale(${lerp(.95,1,a)})`}}>
        <Pane x={0} y={0} w={372} h={209} radius={18} style={{border:'1px solid #1b182118'}}><Still media={t.media}/></Pane>
        <div style={{position:'absolute',top:216,left:0,right:0,textAlign:'center',fontSize:35,fontWeight:900,lineHeight:1.12,whiteSpace:'nowrap'}}>{t.title}</div>
      </Box>;
    })}
    {f<3716&&<Box x={x} y={y} w={w} h={w*H/W} style={{backgroundColor:'#eee',overflow:'hidden',borderRadius:18*p(f,3710,3716),boxShadow:f>3710?'0 8px 24px #0004':undefined,zIndex:16}}><Moving media="claudeLaptop" from={3169} to={3716} rate={.74} style={{filter:'saturate(.84)',objectPosition:'54% 50%'}}/></Box>}
  </AbsoluteFill>;
};

export { Ring };
