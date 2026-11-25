import React from 'react';
import timeline from './timeline.json';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import './style.css';
import {C,Bed,Head,Foot,rect} from './primitives';
import {P,type Rank} from './projects';
import {anchor,sceneAt,type Timeline} from './motion';
import {CardWall,Credits,Flash,Poll,RankOpen} from './bookends';
import {Early} from './early';
import {Late} from './late';

const Brand:React.FC<{mode:string}>=({mode})=> null;
export const Episode:React.FC=()=>{
 const f=useCurrentFrame();
 const chapter=timeline.chapters.find(row=>row.start<=f&&f<row.end)!;
 const brand=timeline.brand.find(row=>row.start<=f&&f<row.end)!;
 const caption=timeline.captions.find(row=>row.start<=f&&f<row.end)!;
 const tl:Timeline=timeline;
 const scene=sceneAt(tl,f);
 const rank=chapter.rank as Rank|undefined;
 const handoffWall=scene.id==='rank-1'&&f<anchor(tl,'rank-1-join');
 const openingWall=scene.id==='opening-wall';
 const white=timeline.whitePageWindows.some(row=>row.start<=f&&f<row.end);
 const count=caption.text?.split('').reduce((n,ch)=>n+(ch.charCodeAt(0)>255?1:.55),0)??0;
 const fontSize=count>23?44:count>19?47:50;
 return <AbsoluteFill className="ft1006-root" data-chapter={chapter.id} data-scene={scene.id}>
  <Bed/>
  {scene.id==='flash'?<Flash tl={tl} f={f} scene={scene}/>:null}
  {openingWall||handoffWall?<><CardWall mode={openingWall?'opening':'chapter'} r={handoffWall?1:undefined} chapter={chapter} tl={tl} f={f} scene={scene}/>{openingWall&&<Foot text="来源：GitHub Trending 月榜（2026-11-21 采样） · 项目官网 / 项目仓库"/>}</>:null}
  {scene.id==='recap-wall'?<CardWall mode='recap' tl={tl} f={f} scene={scene}/>:null}
  {scene.id==='recap-poll'?<Poll tl={tl} f={f} scene={scene}/>:null}
  {chapter.id==='outro'?<Credits tl={tl} f={f} scene={scene}/>:null}
  {rank&&scene.id.startsWith('rank-')&&!handoffWall?<RankOpen tl={tl} f={f} scene={scene} r={rank} chapter={chapter}/>:null}
  {rank&&!scene.id.startsWith('rank-')?<>
    {rank<=5?<Early tl={tl} f={f} scene={scene}/>:<Late tl={tl} f={f} scene={scene}/>}
    <Head tl={tl} r={rank} frame={f} start={scene.start} end={scene.end} holdAcrossCut={scene.id==='free-tokens'}/>
    <Foot text={rank===7?'来源：NVIDIA / SkillSpector · README 公开防御研究与原片历史数字':`来源：${P[rank].slug} · 公开项目页面与原片编辑信息`}/>
  </>:null}
  <Brand mode={brand.mode}/>
  {caption.text!==null?<div className="ft1006-caption" data-captions="present" data-white={white?'1':'0'} style={{fontSize,opacity:caption.opacity}}>{caption.text}</div>:null}
 </AbsoluteFill>;
};
