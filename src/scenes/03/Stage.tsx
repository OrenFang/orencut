import React from 'react';
import {AbsoluteFill} from 'remotion';
import timeline from './timeline.json';
import {Geometry, clamp, gold, pale, ramp} from './Geometry';
import {Art, Deck, Evidence, PhotoField, Product, SourceNote, slide, xy} from './Media';
import {APIMap, Banner, FundingHook, FundingRound, GlobeMesh, Head, Metric, OpeningBanStrip, Pricing, RouterGrid, Tag, UsageBars} from './Charts';
import {Control, CostArticle, DuoCards, InvestorTrio, Ledger, MatrixWall, MediaWall, QuoteStage, Readout} from './Editorial';
import {EndingVisual, IndustryChart, Investment, isEnding, isIndustry, isInvestment, isLicense, LicenseMatrix} from './FinalReview';
import {CostComparison, hasManagement, Management} from './R3Visual';
import {openaiSwap, RepairType} from './Repair';
import {Headline, Titles, type ChapterRow} from './Type';

const kindGeometry=new Set(['rail-horizontal','rail','bar','funding','network','stamp','document','chapter','agenda','quote']);
export const routes = {
  readout: ['notice','removed','town','college','thesis','vision','r1-news','vc-proof','license-proof','mit','revenue','pdd','talent-proof','office','huawei-proof','huawei-count','grass','data-center','ipo-proof','ipo-broll','ban-original','ban-proof','ban-scope','street','fireworks','reach','file'],
  pure: ['two-days','part-one','gpu-claim','why-different','earn-question','dont-hide','two-ways','talent-rule','part-two','cash','steering','part-three','next-two','guesses','biggest-chip','ban-company','verdict','closing'],
  native: ['capitol','funding-hook','investor-trio','press-wall','giving','founders','red-packet','three-traits','agenda','quant-timeline','quant-1000','gpu-money','origin-rail','nvidia','origin-recap','funding-map','openai','anthropic','funding-map-two','parents','funding-map-three','minimax','funding-map-cross','vc-quote','funding-map-final','open-door','license-grid','license-grid-return','license-grid-final','network','api-tree','api-bars','liang-quote','chess','subsidy','no-subsidy','appstore','mau','low-cost','price-follows','talent-quote','first-round','second-round','source-investors','factories','investor-network','industry-wall','control','compute-tree','deepinfer','industry-grid','industry-media','open-radar','globe','tokens','ban-question','ban-rail','globe-return'],
};
const isReadout=new Set(routes.readout);
const byId = Object.fromEntries(timeline.chapters.map(s=>[s.id,s]));

function RailWords({id,f,start}:{id:string;f:number;start:number}){
  const recap=id==='origin-recap';
  const dates=recap?['2008','2015','2020','2021','2023.04','2023.07','2025.01']:['2021','2021','2023.04','2023.07'];
  const values=recap?['读研遇金融危机','创办幻方量化','萤火一号','幻方规模曾超 1000 亿','宣布研究 AGI','成立 DeepSeek','R1 发布']:['幻方规模曾超千亿元','萤火二号 · 媒体称约十亿元','幻方宣布研究 AGI','成立 DeepSeek'];
  const ys=recap?[185,238,284,337,407,470,543]:[202,364,528,665];
  return <>{dates.map((d,i)=><React.Fragment key={`${d}${i}`}>
    <Head f={f} start={start+i*(recap?9:52)} x={37} y={ys[i]-20} h={39} w={180} size={recap?27:39} color={gold}>{d}</Head>
    <Head f={f} start={start+4+i*(recap?9:52)} x={267} y={ys[i]-18} h={36} w={339} size={recap?24:26}>{values[i]}</Head>
  </React.Fragment>)}{recap&&<Tag f={f} start={start+174} x={259} y={620}>先有资金和算力，再有模型</Tag>}
  <SourceNote>历史事件与金额分类按来源；管理规模不是投入现金。</SourceNote></>;
}
function Quant({f,start}:{f:number;start:number}){
  return <>
    <Tag f={f} start={start} y={192}>早期路径 · 资金与算力</Tag>
    {([['2008','机器学习与交易'],['2015','创办幻方量化'],['2021','管理规模增长']] as const).map(([n,s],j)=><div key={n} style={{...xy(59+188*j,263,155,94),textAlign:'center',opacity:slide(f,start+[0,232,490][j],25),color:pale}}><b style={{fontSize:40,color:gold}}>{n}</b><div style={{fontSize:18,fontWeight:700}}>{s}</div></div>)}
    {f<3580&&<div style={{opacity:1-slide(f,3490,43)}}><Evidence id="hf-site" b={[39,440,570,155]} f={f} start={start+22} compact mode="ink"/></div>}
    {f>=3540&&f<3887&&<SourceNote y={710}>曲线为编辑示意，不是基金收益率或 AUM 实测。</SourceNote>}
  </>;
}
function FundingMap({id,f,start}:{id:string;f:number;start:number}){
  const states=id==='funding-map'?1:id==='funding-map-two'?2:id==='funding-map-three'?3:4;
  const left=['公开披露融资','母公司支持','多轮融资','早期自有资金'];
  return <>
    <Tag f={f} start={start} y={176}>资本路径 · 对照示意</Tag>
    {left.map((n,j)=> <div key={n} style={{...xy(36,200+j*114,290,67),color:j<states?pale:'#817465',fontWeight:800,fontSize:23,display:'flex',alignItems:'center',opacity:j<states?slide(f,start-9+j*7,15):.4}}>{j<states?n:'待讨论'}</div>)}
    {states===4&&<SourceNote>早期自有与当前外部融资是不同阶段；图中不表示行业唯一模式。</SourceNote>}
  </>;
}
function SymbolField({f,start,kind}:{f:number;start:number;kind:'door'|'chess'|'compute'|'capital'|'steering'}){
  const p=slide(f,start,40);
  const common={position:'absolute' as const,inset:0,opacity:.25+.55*p};
  if(kind==='door')return <svg width={648} height={1152} style={common} aria-label="原生开门类比">
    <defs><linearGradient id="door-light"><stop stopColor="#f2cf82" stopOpacity=".8"/><stop offset="1" stopColor="#937139" stopOpacity=".03"/></linearGradient></defs>
    <path d="M183 677V284H472V676" fill="#2e2517" stroke="#8b6a39" strokeWidth="2"/>
    <path d={`M188 290L${188+190*p} ${290-50*p}V${679+41*p}L188 677Z`} fill="#2a2116" stroke="#c09552" strokeOpacity=".76" strokeWidth="2"/>
    <path d={`M${192+189*p} ${290-49*p}L490 221V742L${192+191*p} ${677+40*p}Z`} fill="url(#door-light)" opacity={.34*p}/>
  </svg>;
  if(kind==='chess')return <svg width={648} height={1152} style={common} aria-label="原生棋盘类比">
    {Array.from({length:72},(_,j)=>{const r=Math.floor(j/9),c=j%9;return <path key={j} d={`M${17+c*66+r*11} ${503+r*39}l66 0 11 39 -66 0Z`} fill={j%2?'#48391f':'#282319'} stroke="#5a492e" strokeOpacity=".46"/>;})}
    <path d="M303 563h58l-9-16h-42l7-18 5-27-10-15 10-15 14-1 16 19-9 14 4 25 8 18h-44" fill="#ac8950" opacity=".49"/>
  </svg>;
  if(kind==='compute')return <svg width={648} height={1152} style={common} aria-label="自绘机柜示意，不表示实体机房">
    {Array.from({length:8},(_,i)=>{const x=17+79*i;return <g key={i}><rect x={x} y="239" width="67" height="469" rx="2" stroke="#4f493d" fill="#25231e"/>{Array.from({length:12},(_,j)=><g key={j}><rect x={x+6} y={262+j*34} width="55" height="26" fill="#333432" stroke="#84785f" strokeOpacity=".46"/><circle cx={x+49} cy={275+j*34} r="1.8" fill={j%3?'#8d9c78':gold}/></g>)}</g>})}
  </svg>;
  if(kind==='steering')return <svg width={648} height={1152} style={common} aria-label="方向盘控制权类比"><g transform={`translate(324 513) rotate(${(1-p)*-29})`} fill="none" stroke="#947443" opacity=".5"><circle r="196" strokeWidth="32"/><circle r="144" strokeWidth="3"/><path d="M-180 -24L-48 9H48L180 -24 M0 45V179" strokeWidth="23"/><circle r="52" fill="#221c16" strokeWidth="6"/></g></svg>;
  return <svg width={648} height={1152} style={common} aria-label="资金形状示意">{Array.from({length:16},(_,j)=><rect key={j} x={60+j%4*132} y={284+Math.floor(j/4)*103} width="115" height="61" rx="4" transform={`rotate(${(j%4-1.5)*6} ${115+j%4*132} ${315+Math.floor(j/4)*103})`} fill={j%4===0?'#504029':'#362e20'} stroke="#78603b" opacity=".57"/>)}</svg>;
}
function Support({s,f}:{s:ChapterRow;f:number}){
  const id=s.id,start=s.start;
  if(isReadout.has(id))return <Readout id={id} f={f} start={start}/>;
  if(id==='capitol')return <>
    <PhotoField asset="capitol" f={f} start={start} label="美国国会大厦资料照（Library of Congress）" position="50% center"/>
    <div data-layer="editorial-label" style={{...xy(36,201,370,29),display:'flex',alignItems:'center',gap:8,
      opacity:slide(f,9,7),color:'#fff7ec',fontSize:15,letterSpacing:'.16em',fontWeight:900}}>
      <i style={{width:8,height:8,background:'#d34e36'}}/>BREAKING · 美国联邦公报
    </div>
    <OpeningBanStrip f={f}/>
    <SourceNote y={888}>国会山资料照 · 非事件现场</SourceNote>
  </>;
  if(id==='funding-hook')return <FundingHook f={f}/>;
  if(id==='investor-trio')return <InvestorTrio f={f} start={start}/>;
  if(id==='press-wall')return <MediaWall f={f} start={start}/>;
  if(id==='giving'||id==='three-traits'||id==='no-subsidy')return <>
    <Product b={id==='giving'?[190,254,268,73]:id==='three-traits'?[183,342,282,65]:[183,331,282,70]}/>
    {id==='three-traits'&&<Tag f={f} start={start} y={452}>原节目观察</Tag>}
  </>;
  if(id==='founders'||id==='red-packet'||id==='parents'||id==='subsidy')return <>
    {(id==='founders'||id==='parents'||id==='subsidy')&&<Head f={f} start={start} y={212} size={38}>{id==='founders'?'同样做大模型':id==='parents'?'母公司 · 模型品牌':'大厂触达用户的方式'}</Head>}
    <DuoCards f={f} start={start} left={id==='founders'?'openai-round':'alibaba-qwen'} right={id==='founders'?'anthropic-round':'bytedance-doubao'}/>
    {id==='parents'&&<Product b={[35,613,275,60]} asset="alibaba"/>}
    {id==='red-packet'&&<Banner head="行业对照" body="原节目以春节营销比较拉新打法" y={627}/>}
    {id==='subsidy'&&<SourceNote>品牌归属见官网；原节目提到的补贴金额未独立核验。</SourceNote>}
  </>;
  if(id==='agenda')return <>
    <Tag f={f} start={start+60} x={66} y={397}>经历与不同路线</Tag><Tag f={f} start={start+113} x={66} y={530}>据报道的第二轮投资方</Tag><Tag f={f} start={start+151} x={66} y={661}>算力、产业、开源和联邦命令</Tag>
  </>;
  if(id==='quant-timeline')return <Quant f={f} start={start}/>;
  if(id==='gpu-money')return <>
    <div style={{opacity:.46+.28*slide(f,4347,19)}}><Art asset="highflyer" b={[37,524,574,169]} label="幻方官网真实算力介绍，其图片不是金额凭证" fit="cover" look="field"/></div>
    <SourceNote>金额为历史媒体口径；算力图片是幻方官网资料。</SourceNote>
  </>;
  if(id==='origin-rail'||id==='origin-recap')return <RailWords id={id} f={f} start={start}/>;
  if(id==='nvidia')return <><Tag f={f} start={start} y={223}>2025 年 1 月 27 日 · 节目回顾</Tag><SymbolField f={f} start={start} kind="compute"/><SourceNote>单日股价与市值变化为当期统计口径；不代表对走势的推断。</SourceNote></>;
  if(s.kind==='funding')return <FundingMap id={id} f={f} start={start}/>;
  if(id==='openai'||id==='anthropic')return <Evidence id={id==='anthropic'||f>=openaiSwap?'anthropic-round':'openai-round'} b={[35,269,578,256]} f={f} start={id==='openai'&&f>=openaiSwap?openaiSwap:start}/>;
  if(id==='minimax')return <>
    <Tag f={f} start={start} y={217}>公开资本市场</Tag><Head f={f} start={start+11} y={332} size={62}>MiniMax</Head>
    <Banner head="港股上市" body="2026 年 1 月 · 香港交易所" y={488}/>
    <Evidence id="minimax-hkex" b={[36,569,576,141]} f={f} start={start+12} compact mode="ink"/>
    <SourceNote>公司证券上市，只说明融资路径，不代表估值或募资总额。</SourceNote>
  </>;
  if(id==='vc-quote'||id==='liang-quote'||id==='talent-quote')return <QuoteStage id={id} f={f} start={start}/>;
  if(id==='open-door'||id==='chess')return <SymbolField kind={id==='open-door'?'door':'chess'} f={f} start={id==='open-door'?9112:12480}/>;
  if(id==='network'||id==='open-radar')return <>
    <Head f={f} start={start} y={id==='open-radar'?236:194} size={32}>{id==='network'?'公开权重 · 衍生模型':'继续开源 · 传播节点'}</Head>
    <Product b={id==='network'?[242,396,164,62]:[227,406,194,61]}/>
    <Evidence id="deepseek-files" b={[40,675,568,100]} f={f} start={start+36} compact mode="ink"/>
    <SourceNote>关系示意，实际仓库文件见来源；原节目历史衍生模型数量未重验。</SourceNote>
  </>;
  if(id==='api-tree')return <APIMap f={f} start={start}/>;
  if(id==='api-bars')return <Pricing f={f} start={start}/>;
  if(id==='appstore')return <>
    <Evidence id="deepseek-site" b={[36,274,576,265]} f={f} start={start}/>
    <Product b={[211,571,226,62]}/><SourceNote>产品与模型身份可核；不显示尚未核实的历史应用商店截图。</SourceNote>
  </>;
  if(id==='mau')return <UsageBars f={f} start={start}/>;
  if(id==='low-cost')return <CostComparison f={f}/>;
  if(id==='price-follows')return <>
    <Product b={[201,254,246,53]}/><Head f={f} start={start} x={177} y={332} w={324} size={34} color={gold}>先把价格打下来</Head>
    {['字节 · 豆包','阿里 · 千问','腾讯'].map((s,i)=><div key={s} style={{...xy(36+i*193,556,178,93),display:'grid',placeItems:'center',background:'#2e271a',border:'1px solid #75603b',color:pale,fontWeight:850,fontSize:20,opacity:slide(f,start+36+i*16,20)}}>{s}</div>)}
    <SourceNote>跟进降价是原节目归纳，未把公司官方页改成对比实测。</SourceNote>
  </>;
  if(id==='cash'||id==='steering')return <SymbolField kind={id==='cash'?'capital':'steering'} f={f} start={start}/>;
  if(id==='first-round'||id==='second-round')return <FundingRound f={f} start={start} second={id==='second-round'}/>;
  if(id==='source-investors')return <>
    <Tag f={f} start={start} y={186}>第二轮投资方 · 芯片方向</Tag>
    <DuoCards f={f} start={start} left="giga" right="smic-fund"/>
    <Product asset="smic" b={[349,618,247,69]}/>
    <Evidence id="cls-investor-platform" b={[36,709,576,82]} f={f} start={start+37} mode="ink" compact/>
    <SourceNote>石溪资本关联兆易创新；中芯聚源为独立显示的投资平台。</SourceNote>
  </>;
  if(id==='factories')return <MatrixWall f={f} start={start}/>;
  if(id==='control')return <Control f={f} start={start}/>;
  if(id==='globe'||id==='globe-return')return <>
    <GlobeMesh f={f} start={start} fade={id==='globe-return'?1-slide(f,23543,34):1}/>
    {id==='globe'&&<Tag f={f} start={start} x={37} y={185}>全球公开传播 · 关系示意</Tag>}
  </>;
  if(id==='tokens')return <RouterGrid f={f} start={start}/>;
  if(id==='ban-question')return <><PhotoField asset="capitolAlternate" f={f} start={start} label="美国国会大厦公开资料照" dim={.79}/><div style={{...xy(0,0,648,1152),background:'#0f0e0b55'}}/><SourceNote>国会山资料照 · 非签署现场</SourceNote></>;
  if(id==='ban-rail')return <Ledger f={f} start={start}/>;
  return null;
}
function CarryTitle({f}:{f:number}){
  return <><Headline row={[194,411,'你封你的，',230,46,-.45,'white',0,0,.78]} t={(f-23622)/60}/><Headline row={[449,411,'我开源我的',267,46,-.43,'gold',0,0,.78]} t={(f-23622)/60}/></>;
}
function View({s,f}:{s:ChapterRow;f:number}){
  const id=s.id,t=(f-s.start)/timeline.fps;
  const mg=hasManagement(f);
  const license=isLicense(id), industry=isIndustry(id), investing=isInvestment(id), ending=isEnding(id);
  const geom=kindGeometry.has(s.kind)||['price-follows','api-tree'].includes(id);
  const alpha=s.transition==='warm-lift'?ramp(t,-.08,.62):1;
  const priceSeam=id==='low-cost'&&f>=14222&&f<14229;
  const articleMix=priceSeam?[.21,.35,.51,.7,.81,.91,.97][f-14222]:0;
  return <AbsoluteFill data-scene={id} style={{opacity:alpha}}>
    {geom&&!mg&&!industry&&!investing&&!ending&&id!=='low-cost'&&!['api-bars'].includes(id)&&<Geometry id={id} kind={s.kind} t={t}/>}
    {license&&<LicenseMatrix f={f} id={id}/>}
    {id==='pdd'&&f<14253&&<div style={{position:'absolute',inset:0,opacity:.43*(1-slide(f,14229,24)),filter:'blur(4px)'}}><CostComparison f={f}/></div>}
    {id==='tokens'&&f<21216&&<GlobeMesh f={f} start={21075} fade={1-slide(f,21201,15)}/>}
    {!mg&&(priceSeam?<>
      <AbsoluteFill style={{opacity:1-.57*articleMix,filter:`blur(${4*articleMix}px)`}}><CostComparison f={f}/></AbsoluteFill>
      <AbsoluteFill data-layer="incoming-cost-article" style={{opacity:articleMix}}><CostArticle f={14229} start={14229}/></AbsoluteFill>
    </>:<Support s={s} f={f}/>)}
    {id==='two-ways'&&f>=13734&&f<13749&&<CostComparison f={f}/>}
    {id==='vc-proof'&&f>=8380&&<div style={{opacity:slide(f,8380,27)}}><Deck asset="filing" b={[34,642,578,151]} label="开润股份真实披露，如后文所述，为特定间接投资记录" f={f} start={8380}/></div>}
    {id==='deepinfer'&&f>=20285&&f<20344&&<div style={{opacity:slide(f,20285,14)*(1-slide(f,20329,15))}}><Deck asset="deepinfer" b={[39,543,569,203]} label="DeepInfer 官方 GitHub 仓库原页" f={f} start={20285}/></div>}
    {mg&&<Management f={f}/>}
    {industry&&<IndustryChart f={f} id={id}/>}
    {investing&&<Investment f={f}/>}
    {(ending||id==='globe-return'&&f>=23543)&&<EndingVisual f={f}/>}
    {['gpu-money','nvidia','openai','anthropic'].includes(id)&&<RepairType f={f} id={id}/>}
    {(!mg)&&<Titles scene={s} f={f}/>}
    {(id==='ban-company'||id==='globe-return'&&f>=23585)&&<CarryTitle f={f}/>}
  </AbsoluteFill>;
}
export function SceneStage({s,f}:{s:ChapterRow;f:number}){
  const id=s.id;
  const handoff=id==='open-door'&&f<9112?{s:byId['funding-map-final'],f:9065}:id==='chess'&&f<12480?{s:byId['dont-hide'],f:12428}:null;
  if(handoff)return <View s={handoff.s} f={handoff.f}/>;
  if(f>=305&&f<307)return <>
    <AbsoluteFill data-overlap="stamp-out" style={{opacity:f===305?1:.63}}><View s={byId.removed} f={304}/></AbsoluteFill>
    <View s={s} f={f}/>
  </>;
  if(f>=346&&f<351)return <View s={byId['two-days']} f={f}/>;
  if(f>=351&&f<355)return <>
    <AbsoluteFill data-overlap="funding-in" style={{opacity:[.24,.48,.72,.92][f-351]}}><View s={s} f={f}/></AbsoluteFill>
    <AbsoluteFill data-overlap="two-days-out" style={{opacity:[.92,.64,.34,.11][f-351]}}><View s={byId['two-days']} f={f}/></AbsoluteFill>
  </>;
  if(f>=915&&f<917)return <View s={byId['press-wall']} f={914}/>;
  if(f>=1960&&f<1973)return <AbsoluteFill data-layer="question-hold">
    <div style={{...xy(35,389,578,100),display:'flex',justifyContent:'center',alignItems:'center',color:pale,fontSize:82,fontWeight:950,fontStyle:'italic',whiteSpace:'nowrap',textShadow:'0 4px 12px #080706'}}>
      它<span style={{color:gold}}>凭什么</span>？
    </div>
  </AbsoluteFill>;
  if(f>=4113&&f<4118)return <AbsoluteFill data-overlap="compute-in" style={{opacity:[.52,.74,.87,.95,.99][f-4113]}}><View s={byId.vision} f={4119}/></AbsoluteFill>;
  if(f===4118)return <View s={byId.vision} f={4119}/>;
  if(f>=20910&&f<21010)return <View s={{...byId['open-radar'],start:20870}} f={f}/>;
  if(f>=21010&&f<21075)return <AbsoluteFill data-scene="globe">
    <GlobeMesh f={f} start={21075} entryFloor={.36+.04*slide(f,21010,51)}/>
  </AbsoluteFill>;
  return <>
    <View s={s} f={f}/>
    {id==='investor-trio'&&f<538&&<div data-overlap="funding-hold" style={{position:'absolute',inset:0,opacity:f<=530?1:1-clamp((f-530)/8)}}><FundingHook f={f}/></div>}
    {id==='part-two'&&f<15320&&<div data-overlap="previous-title" style={{position:'absolute',inset:0,opacity:.62*(1-slide(f,15311,9))}}><View s={byId['talent-rule']} f={15311}/></div>}
    {id==='part-three'&&f<18610&&<div data-overlap="control-linger" style={{position:'absolute',inset:0,opacity:.64*(1-slide(f,18580,30))}}><View s={byId.control} f={18581}/></div>}
  </>;
}
