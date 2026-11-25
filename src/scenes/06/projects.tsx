import { demoAsset as staticFile } from '../../demo-media';
import React from 'react';
import {Img} from 'remotion';

export type Rank=1|2|3|4|5|6|7|8|9;
export const ranks: Rank[]=[1,2,3,4,5,6,7,8,9];
export const P={
  1:{name:'FreeLLMAPI',short:'FreeLLMAPI',slug:'tashfeenahmed/freellmapi',total:'5.6 万',delta:17878,callout:'87 家免费大模型聚合入口',tag:'免费模型',ordinal:'一',base:'#151515',size:115,full:true},
  2:{name:'Claude Code Game Studios',short:'Game Studios',slug:'Donchitos/Claude-Code-Game-Studios',total:'4.0 万',delta:13612,callout:'AI 完整游戏开发工作室',tag:'做游戏',ordinal:'二',base:'#f6f5f6',size:63,full:true},
  3:{name:'Concat',short:'Concat',slug:'jub0t/Concat',total:'1.9 万',delta:9554,callout:'免费开源 · 本地运行剪辑器',tag:'剪辑',ordinal:'三',base:'#080a0e',size:120,full:true},
  4:{name:'video-shotcraft',short:'shotcraft',slug:'Vincentwei1021/video-shotcraft',total:'2.2 万',delta:9286,callout:'150 个电影感动效 · 可导剪映',tag:'宣传片',ordinal:'四',base:'#060c17',size:90,full:false},
  5:{name:'openGym',short:'openGym',slug:'DuarteSantos8/openGym',total:'2.3 万',delta:9049,callout:'开源健身与体重记录 App',tag:'健身',ordinal:'五',base:'#0e1110',size:113,full:true},
  6:{name:'last30days',short:'last30days',slug:'mvanhorn/last30days-skill',total:'7.1 万',delta:6698,callout:'全网近 30 天真实讨论调研 Skill',tag:'全网调研',ordinal:'六',base:'#333238',size:113,full:false},
  7:{name:'SkillSpector',short:'SkillSpector',slug:'NVIDIA/SkillSpector',total:'2.7 万',delta:6433,callout:'英伟达 NVIDIA 官方出品',tag:'Skill 安全',ordinal:'七',base:'#f5f5f4',size:105,full:true},
  8:{name:'OpenBot',short:'OpenBot',slug:'CopilotKit/OpenBot',total:'1.3 万',delta:6425,callout:'CopilotKit 团队开源',tag:'AI 员工',ordinal:'八',base:'#575557',size:119,full:false},
  9:{name:'Andee',short:'Andee',slug:'kuafuai/andee',total:'6,163',delta:5089,callout:'住进手机和 Mac 的个人 AI',tag:'操控手机',ordinal:'九',base:'#100e12',size:114,full:true},
} as const;
const repos={
  1:staticFile('repo/freellmapi/repo.png'), 2:staticFile('repo/claude-code-game-studios/repo.png'),3:staticFile('repo/concat/repo.png'),
  4:staticFile('repo/video-shotcraft/repo.png'),5:staticFile('repo/opengym/repo.png'),6:staticFile('repo/last30days/repo.png'),
  7:staticFile('repo/skillspector/repo.png'),8:staticFile('repo/openbot/repo.png'),9:staticFile('repo/andee/repo.png'),
};
const products={
  1:staticFile('repo/freellmapi/product.webp'),2:staticFile('repo/claude-code-game-studios/product.webp'),3:staticFile('repo/concat/product.webp'),
  4:staticFile('repo/video-shotcraft/product.webp'),5:staticFile('repo/opengym/product.webp'),6:staticFile('repo/last30days/product.webp'),
  7:staticFile('repo/skillspector/product.webp'),8:staticFile('repo/openbot/product.webp'),9:staticFile('repo/andee/product.webp'),
};
const logos={
  1:staticFile('repo/freellmapi/logo.png'),3:staticFile('repo/concat/logo.png'),4:staticFile('repo/video-shotcraft/logo.png'),5:staticFile('repo/opengym/logo.png'),
  8:staticFile('repo/openbot/logo.png'),9:staticFile('repo/andee/logo.png'),
};
const phones={5:staticFile('repo/opengym/mobile.webp'),9:staticFile('repo/andee/mobile.webp')};
const light={1:staticFile('repo/freellmapi/catalog.webp'),2:staticFile('repo/claude-code-game-studios/readme.webp'),7:staticFile('repo/skillspector/readme.webp')};
const hasLogo=(r:Rank):r is keyof typeof logos=>r===1||r===3||r===4||r===5||r===8||r===9;
export const Mark:React.FC<{r:Rank;size?:number}>=({r,size=34})=>hasLogo(r)
  ? <Img src={logos[r]} alt={`${P[r].short} 标记`} style={{width:size,height:size,objectFit:'contain',borderRadius:size*.20,verticalAlign:'middle',flexShrink:0}}/>
  : <span style={{width:size,height:size,display:'inline-flex',alignItems:'center',justifyContent:'center',background:'#3d3526',color:'#e5bd72',borderRadius:6,fontSize:size*.57,fontWeight:900,flexShrink:0}}>{r===2?'G':r===6?'30':'◆'}</span>;

type PicProps={r:Rank;kind?:'product'|'repo'|'light'|'mobile';fit?:'cover'|'contain'|'fill';pos?:string;style?:React.CSSProperties;};
export const Pic:React.FC<PicProps>=({r,kind='product',fit='contain',pos='center',style})=>{
  const format:React.CSSProperties={display:'block',width:'100%',height:'100%',objectFit:fit,objectPosition:pos,...style};
  const alt=`${P[r].name} · 独立公开素材`;
  if(kind==='repo')return <Img src={repos[r]} data-ft-asset={repos[r]} alt={alt} style={format}/>;
  if(kind==='light'&&(r===1||r===2||r===7))return <Img src={light[r]} alt={alt} style={format}/>;
  if(kind==='mobile'&&(r===5||r===9))return <Img src={phones[r]} alt={alt} style={format}/>;
  return <Img src={products[r]} alt={alt} style={format}/>;
};
