import React from 'react';
import {Art, Deck, Evidence, Product, SourceNote, slide, xy, type CardKey} from './Media';
import {Banner, Head, Metric, OpeningBanStrip, Tag} from './Charts';
import {gold, pale} from './Geometry';

function Plate({name,body,f,start,x=36,y,w=576}:{name:string;body:string;f:number;start:number;x?:number;y:number;w?:number}){
  const p=slide(f,start-1,16);
  return <div data-layer="editorial-item" style={{...xy(x,y,w,84),boxSizing:'border-box',padding:'10px 14px',border:'1px solid #6c5736',background:'#2b251b',overflow:'hidden',opacity:p,transform:`translateX(${(1-p)*8}px)`}}><b style={{fontSize:24,color:gold,lineHeight:1}}>{name}</b><div style={{fontSize:16,fontWeight:650,color:'#cfc3aa',marginTop:5,lineHeight:1.22}}>{body}</div></div>;
}
export function CostArticle({f,start}:{f:number;start:number}){
  return <Evidence id="deepseek-api" b={[42,226,564,310]} f={f} start={start}/>;
}
export function Readout({id,f,start}:{id:string;f:number;start:number}) {
  switch(id){
  case 'notice':return <>
    <Deck asset="notice" b={[36,181,576,442]} label="美国联邦公报：2026-21447" f={f} start={start} focus={1.035}/>
    <OpeningBanStrip f={f}/>
    {f>=158&&<div style={{opacity:slide(f,158,10)}}>
      <Banner head="移除" body="联邦民用机构：DeepSeek 须移除" y={654} alert/>
    </div>}
    <SourceNote y={740}>联邦公报 · 2026-10-20 刊载 · 不适用于全美国</SourceNote>
  </>;
  case 'removed':return <>
    <Deck asset="removal" b={[36,262,576,212]} label="DHS 真实命令：Required Actions" f={f} start={start} focus={1.03}/>
    <div style={{...xy(153,474,370,84),border:'3px solid #b04a3e',display:'grid',placeItems:'center',color:'#ec715c',fontWeight:900,fontSize:54,transform:`rotate(-8deg) scale(${1.16-.16*slide(f,start+9,18)})`,opacity:slide(f,start+9,17)}}>安装须移除</div>
    <Banner head="联邦民用" body="行政机构的相关 IT 系统／采购" y={681} alert/>
    <SourceNote y={735}>签署命令的适用范围与例外，见 DHS 文件正文。</SourceNote>
  </>;
  case 'town':return <>
    <Head f={f} start={start} y={210} size={58}>广东 · 湛江</Head><Tag f={f} start={start+17} y={278}>吴川 · 梁文锋家乡</Tag>
    <Evidence id="origin-town" f={f} start={start+13} b={[36,356,576,302]}/>
  </>;
  case 'college':return <>
    <Tag f={f} start={start} y={174}>人物档案 · 梁文锋</Tag>
    <Evidence id="zju-edu" b={[36,259,576,263]} f={f} start={start}/>
    <Banner head="本科" body="浙江大学 · 电子信息工程" y={617}/>
  </>;
  case 'thesis':return <>
    <Evidence id="zju-edu" b={[36,246,576,288]} f={f} start={start}/>
    <Banner head="硕士" body="浙江大学 · 信息与通信工程" y={635}/>
  </>;
  case 'vision':return <>
    <Tag f={f} start={start} y={176}>幻方量化 · 算力设施</Tag>
    <Deck asset="highflyer" b={[37,283,574,346]} label="幻方量化官方首页（含萤火算力展示）" f={f} start={start} focus={1.045}/>
    <Banner head="算力" body="量化研发与人工智能计算集群" y={653}/>
  </>;
  case 'r1-news':return <>
    <Evidence id="deepseek-r1" b={[39,269,570,269]} f={f} start={start}/>
    <Product b={[201,563,246,62]}/>
    <Head f={f} start={start+18} x={144} y={665} size={37}>2025.01 · R1 发布</Head>
    <SourceNote>实际 R1 模型仓库记录；不是应用商店历史榜单。</SourceNote>
  </>;
  case 'vc-proof':return <>
    <Evidence id="interview-vc" b={[35,234,578,352]} f={f} start={start}/>
    <Banner head="采访" body="研究优先，资本的退出时钟不同" y={650}/>
  </>;
  case 'license-proof':return <>
    <div style={{...xy(0,190,648,591),background:'#15120e77'}}/>
    <Tag f={f} start={start} y={214}>许可证条款原样 · Kimi K3</Tag>
    <Deck asset="kimilicense" b={[37,253,576,355]} label="GitHub：MoonshotAI/Kimi-K3 LICENSE 原文" f={f} start={start} focus={1.025}/>
    <SourceNote y={642}>本版本有条件另签，不把 K3 的条款泛化到所有开放权重。</SourceNote>
  </>;
  case 'mit':return <>
    <Deck asset="dsmit" b={[35,229,578,336]} label="DeepSeek 模型仓库 MIT 原文" f={f} start={start}/>
    <Head f={f} start={start} x={247} y={625} size={53} color={gold}>MIT</Head>
    <SourceNote y={702}>须保留版权与许可声明；按具体模型发布件。</SourceNote>
  </>;
  case 'revenue':return <>
    <Evidence id="revenue" b={[37,226,574,278]} f={f} start={start}/>
    <Metric id="revenue-first-seven-months" f={f} start={11583} y={551} size={101} unit="亿元">4.75</Metric>
    <Tag f={f} start={11583} x={155} y={663}>2026 年前 7 个月累计 · 据媒体引述</Tag>
    <SourceNote>不是 7 月单月；亏损说法没有公司审计报表作证。</SourceNote>
  </>;
  case 'pdd':return <>
    <CostArticle f={f} start={start}/>
    <Banner head="编辑类比" body="报道以“AI 界的拼多多”形容价格策略" y={620}/>
    <SourceNote>以官方定价页为准；编辑类比不代表组织关系。</SourceNote>
  </>;
  case 'talent-proof':return <Evidence id="interview-talent" b={[36,248,576,353]} f={f} start={start}/>;
  case 'office':return <>
    <Evidence id="interview-talent" b={[36,267,576,279]} f={f} start={start} mode="ink"/>
    <Banner head="团队" body="应届生、在读博士与年轻工程师" y={629}/>
    <SourceNote>采访观点的编辑转述，不使用原片办公室或无授权肖像。</SourceNote>
  </>;
  case 'huawei-proof':return <>
    <Evidence id="ascend-report" b={[37,255,574,229]} f={f} start={start}/>
    <Deck asset="ascend" b={[38,514,572,235]} label="华为昇腾 950 产品新闻原页" f={f} start={start+10}/>
    <SourceNote>媒体采购消息与华为产品新闻是两件事。</SourceNote>
  </>;
  case 'huawei-count':return <>
    <Deck asset="ascend" b={[37,267,574,280]} label="华为官网昇腾 950 新闻" f={f} start={start}/>
    <Metric id="planned-ascend-count" f={f} start={start+12} y={560} size={94} unit="万颗">{`≥${Math.round(16*slide(f,start+12,39))}`}</Metric>
    <Tag f={f} start={start+12} x={121} y={700}>昇腾 950DT · 据媒体称拟部署</Tag>
    <SourceNote>未见采购订单或交付公告；不是已经部署。</SourceNote>
  </>;
  case 'grass':case 'data-center':return <>
    <Tag f={f} start={start} y={201}>内蒙古 · 乌兰察布</Tag>
    <Evidence id="region-ulaan" b={[36,291,576,309]} f={f} start={start} mode={id==='grass'?'ink':'paper'}/>
    <Banner head="地区背景" body="新华网：乌兰察布算力集群" y={653}/>
    <SourceNote>地区产业报道，不是 DeepSeek 该笔采购的设施或交付证明。</SourceNote>
  </>;
  case 'ipo-proof':case 'ipo-broll':return <>
    <Evidence id="ipo-plan" b={[35,250,578,328]} f={f} start={start} mode={id==='ipo-proof'?'paper':'ink'}/>
    <Banner head="筹备" body="据路透报道：中信证券与科创板 IPO" y={645} alert/>
    <SourceNote>未核申报、备案或受理，不使用其他公司敲钟画面。</SourceNote>
  </>;
  case 'ban-original':return <>
    <Deck asset="order" b={[37,298,574,313]} label="DHS 2026-01号命令真实首页" f={f} start={start}/>
    <Banner head="回到开头" body="DHS 第 2026-01 号排除与移除令" y={657}/>
  </>;
  case 'ban-proof':return <>
    <Head f={f} start={start} y={196} size={38}>美国能封掉 DeepSeek 吗？</Head>
    <Deck asset="order" b={[35,293,578,306]} label="DHS 原命令真实标题、日期与适用范围" f={f} start={start}/>
    <Plate name="7 月 24 日" body="DHS 原始发布日期" f={f} start={start+30} x={35} y={624} w={278}/>
    <Plate name="10 月 20 日" body="联邦公报正式刊载" f={f} start={start+83} x={337} y={624} w={276}/>
  </>;
  case 'ban-scope':return <>
    <Head f={f} start={start} y={184} size={39}>命令如何限定范围？</Head>
    <Deck asset="removal" b={[36,281,576,208]} label="Required Actions 原条款及例外" f={f} start={start} focus={1.015}/>
    <Plate name="联邦民用行政机构" body="采购排除、已装移除；按命令规定例外处理" f={f} start={start+35} y={524}/>
    <Plate name="政府采购 / 承包项目" body="按联邦采购、系统与服务范围，不是全美禁用" f={f} start={start+184} y={628}/>
    <SourceNote>没有覆盖普通美国个人与一般私人公司。</SourceNote>
  </>;
  case 'street':return <>
    <Tag f={f} start={start} y={205}>命令范围之外</Tag>
    <Plate name="普通美国个人" body="该命令不是面向消费者的全国禁令" f={f} start={start+8} y={331}/>
    <Plate name="一般私人公司" body="并不由此禁止独立使用公开模型" f={f} start={start+28} y={443}/>
    <Evidence id="us-notice" b={[36,571,576,149]} f={f} start={start} compact mode="ink"/>
  </>;
  case 'fireworks':case 'reach':return <>
    <Deck asset="fireworks" b={[37,289,574,277]} label="Fireworks 官方模型目录：DeepSeek V4.1 Flash 1017" f={f} start={start} focus={1.025}/>
    <Banner head="美国平台" body="Fireworks 官方目录可见该模型" y={627}/>
    <SourceNote y={717}>{id==='reach'?'仅证明模型目录上架；原节目 X 帖、播放量未核。':'当期模型上架，非独立性能测试或原节目演示。'}</SourceNote>
  </>;
  case 'file':return <>
    <Tag f={f} start={start} y={183}>官方仓库 · Files and versions</Tag>
    <Deck asset="files" b={[36,262,576,278]} label="官方模型仓库真实文件列表，保留动态字段原样" f={f} start={start} focus={1.035}/>
    <SourceNote>真实模型文件条目 · 状态为独立抓取时快照</SourceNote>
  </>;
  default:return null;
  }
}
export function MediaWall({f,start}:{f:number;start:number}){
  const ids=['reuters-round2','bloomberg-round2','cnstock-round2','stcn-investors'] as const;
  return <div data-layer="press-citation-wall" style={{position:'absolute',inset:0,transform:'rotate(-.9deg)'}}>
    {ids.map((c,j)=><Evidence key={c} id={c} f={f} start={start+j*6} b={[34+j%2*300,j<2?174:593,280,158]} mode={j<2?'paper':'ink'} compact quiet/>)}
  </div>;
}
export function InvestorTrio({f,start}:{f:number;start:number}){
  return <>
    <Tag f={f} start={start} y={155}>第二轮名单 · 据媒体报道</Tag>
    {([['腾讯','互联网与科技','tencent-company'],['宁德时代体系','动力电池','catl-company'],['石溪资本 / 中芯聚源','芯片相关资本','smic-fund']] as const).map(([name,role,key],j)=>{
      const a=[start,614,704][j],p=slide(f,a-1,18);return <div key={name} style={{opacity:p,transform:`translateY(${(1-p)*11}px)`}}>
        <div style={{...xy(35,204+j*175,578,103),background:j%2?'#282217':'#30291e',border:'1px solid #725a32',borderLeft:'4px solid #c09247',boxSizing:'border-box',padding:'12px 22px',color:pale}}><div style={{fontSize:33,fontWeight:900}}>{name}</div><div style={{fontSize:15,marginTop:3,color:gold}}>{role} · {key==='tencent-company'?'腾讯官网身份识别':key==='catl-company'?'公司身份识别':'公司及报道引证'}</div></div>
      </div>;
    })}
    <SourceNote>行业分类与公司身份不表示各方直接持股或已披露出资额。</SourceNote>
  </>;
}
export function QuoteStage({id,f,start}:{id:'vc-quote'|'liang-quote'|'talent-quote';f:number;start:number}){
  const quote = {
   'vc-quote':{card:'interview-vc',rows:['很多 VC 对研究有顾虑','希望更快商业化','我们优先做研究，很难获这类融资']},
   'liang-quote':{card:'interview-moat',rows:['在颠覆性的技术面前','闭源形成的护城河是短暂的','开源更像文化行为，而非商业行为']},
   'talent-quote':{card:'interview-talent',rows:['没有什么高深莫测的奇才','顶尖高校应届生、在读博士','以及毕业才几年的年轻人']},
  } as const;
  const q=quote[id];
  return <>
    <Evidence id={q.card} mode="ink" b={[37,245,574,161]} f={f} start={start} compact/>
    <Tag f={f} start={start} y={444}>梁文锋 · 采访内容转述</Tag>
    {q.rows.map((v,j)=><Head key={v} f={f} start={start+12+j*31} x={43} y={493+j*62} w={560} h={55} size={j===2?28:32} color={j===2?gold:pale}>{v}</Head>)}
  </>;
}
export function MatrixWall({f,start}:{f:number;start:number}){
  const companies=['宁德时代','吉利','美的','美团'];
  return <>
    <Tag f={f} start={start} y={180}>产业分类 · 名单据报道</Tag>
    {companies.map((name,j)=><Plate key={name} name={name} body={['动力电池','汽车制造','家电','本地生活'][j]} f={f} start={start+j*26} x={35+j%2*299} y={295+Math.floor(j/2)*116} w={279}/>)}
    <Evidence id="stcn-investors" b={[35,566,578,164]} f={f} start={start+49} compact mode="ink"/>
    <SourceNote>这里只介绍行业或产品，未表述四家均已落地部署。</SourceNote>
  </>;
}
export function Control({f,start}:{f:number;start:number}){
  const p=slide(f,start+14,25), q=slide(f,start+86,23), r=slide(f,start+145,20);
  return <>
    <Tag f={f} start={start} y={178}>治理结构 · 据媒体与工商报道</Tag>
    <Product b={[206,347,236,58]}/>
    <svg width="648" height="1152" style={{position:'absolute',inset:0}} aria-label="公司、管理合伙人与出资实体关系示意">
      <path d="M172 304V322H324V347 M474 304V322H324 M324 405V488H172V523 M324 488H474V523" fill="none" stroke={gold} opacity={p} strokeWidth="2"/>
    </svg>
    <Plate name="梁文锋" body="创始人 · 管理链条" f={f} start={start+14} x={35} y={220} w={277}/>
    <Plate name="国家 AI 基金" body="首轮的媒体报道例外" f={f} start={start+58} x={336} y={220} w={277}/>
    <div style={{opacity:q}}><Plate name="杭州程策" body="梁文锋持股 99%（非 DeepSeek 股比）" f={f} start={start+86} x={35} y={521} w={277}/></div>
    <div style={{opacity:r}}><Plate name="杭州程砚" body="有限合伙平台 · 不能等同最终直持" f={f} start={start+145} x={335} y={521} w={278}/></div>
    <Evidence id="caixin-registrar" b={[36,641,576,113]} f={f} start={start+165} compact mode="ink"/>
    <SourceNote>报道说部分投资人不享投票权；未核未公开协议。</SourceNote>
  </>;
}
export function Ledger({f,start}:{f:number;start:number}){
  const dates=[['7.24','DHS 原始发布日期'],['7–10 月','多次发布模型（节目叙述）'],['10.17','V4.1 Flash 1017 更新'],['10.20','联邦公报刊载']];
  return <>
    <Tag f={f} start={start} y={169}>禁令与公开发布 · 各自的时间线</Tag>
    <Deck asset="release" b={[327,264,282,325]} label="DeepSeek 官方 V4.1 Flash 1017 更新公告" f={f} start={start}/>
    {dates.map(([d,v],j)=><div key={d} style={{...xy(139,344+j*55,183,49),color:pale,fontSize:16,fontWeight:720,opacity:slide(f,start+12+j*42,18)}}><b style={{color:gold}}>{d}</b>　{v}</div>)}
    <SourceNote>原始发布日期并不等于公报公开日；模型时间为可见发布记录或节目口径。</SourceNote>
  </>;
}
export function DuoCards({left,right,f,start}:{left:CardKey;right:CardKey;f:number;start:number}){
  return <><Evidence id={left} b={[34,309,278,277]} f={f} start={start}/><Evidence id={right} b={[335,309,278,277]} f={f} start={start+10} mode="ink"/></>;
}
