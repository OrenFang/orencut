import React, {useEffect,useState} from 'react';
import {Composition,registerRoot,useCurrentFrame,useDelayRender} from 'remotion';
import {brandAt,captionAt,chapterAt,fps,totalFrames,type Branding,type Caption,type Chapter} from './clock';
import timeline from './timeline.json';
import './styles.css';
import {Atmosphere,Brand,Captions,stageContext} from './craft';
import {Agenda,Benchmarks,CarryParadox,Interview,LaunchReel,OpeningMetric,Paradox,PartOne,PartTwo,PictureFeature,Reputation,Skill,TwoAIs} from './early';
import {Answer,Ending,EntryPrice,Examples,FinalBet,HardwareChain,Ledgers,Limits,PartFour,PartThree,PriceChart,Timeframe,Wallet,WorldGap} from './late';
export {brandAt,captionAt,chapterAt,mediaPlanAt} from './clock';

export const FT1007_CONFIG = {id:'FT1007',width:1920,height:1080,fps,durationInFrames:totalFrames} as const;
function Stage({frame,logicOnly,children}:{frame:number;logicOnly:boolean;children:React.ReactNode}) {
 return <stageContext.Provider value={{frame,logicOnly}}>{children}</stageContext.Provider>;
}
function Scene({id,frame,logicOnly}:{id:string;frame:number;logicOnly:boolean}) {
 if (id==='launch-units') return <Stage frame={frame} logicOnly={logicOnly}><OpeningMetric id="launch-units"/></Stage>;
 if (id==='launch-revenue') return <Stage frame={frame} logicOnly={logicOnly}><OpeningMetric id="launch-revenue"/></Stage>;
 if (id==='launch-rating') return <Stage frame={frame} logicOnly={logicOnly}><OpeningMetric id="launch-rating"/></Stage>;
 if (id==='npc-detail') return <Stage frame={frame} logicOnly={logicOnly}><PictureFeature id="npc-detail"/></Stage>;
 if (id==='zero-gen') return <Stage frame={frame} logicOnly={logicOnly}><OpeningMetric id="zero-gen"/></Stage>;
 if (id==='hardware-tease') return <Stage frame={frame} logicOnly={logicOnly}><OpeningMetric id="hardware-tease"/></Stage>;
 if (id==='paradox') return <Stage frame={frame} logicOnly={logicOnly}><Paradox/></Stage>;
 if (id==='agenda') return <Stage frame={frame} logicOnly={logicOnly}><><CarryParadox/><Agenda/></></Stage>;
 if (id==='skill') return <Stage frame={frame} logicOnly={logicOnly}><Skill/></Stage>;
 if (id==='revenue-counter') return <Stage frame={frame} logicOnly={logicOnly}><LaunchReel/></Stage>;
 if (id==='benchmarks') return <Stage frame={frame} logicOnly={logicOnly}><Benchmarks/></Stage>;
 if (id==='chapter-one') return <Stage frame={frame} logicOnly={logicOnly}><PartOne/></Stage>;
 if (id==='ai-compare') return <Stage frame={frame} logicOnly={logicOnly}><TwoAIs/></Stage>;
 if (id==='interview') return <Stage frame={frame} logicOnly={logicOnly}><Interview/></Stage>;
 if (id==='handcrafted') return <Stage frame={frame} logicOnly={logicOnly}><PictureFeature id="handcrafted"/></Stage>;
 if (id==='reputation') return <Stage frame={frame} logicOnly={logicOnly}><Reputation/></Stage>;
 if (id==='chapter-two') return <Stage frame={frame} logicOnly={logicOnly}><PartTwo/></Stage>;
 if (id==='genie') return <Stage frame={frame} logicOnly={logicOnly}><><PictureFeature id="genie"/><PartTwo carry/></></Stage>;
 if (id==='limits') return <Stage frame={frame} logicOnly={logicOnly}><Limits/></Stage>;
 if (id==='examples') return <Stage frame={frame} logicOnly={logicOnly}><Examples/></Stage>;
 if (id==='world-gap') return <Stage frame={frame} logicOnly={logicOnly}><WorldGap/></Stage>;
 if (id==='chapter-three') return <Stage frame={frame} logicOnly={logicOnly}><PartThree/></Stage>;
 if (id==='wallet') return <Stage frame={frame} logicOnly={logicOnly}><Wallet/></Stage>;
 if (id==='causal-chain') return <Stage frame={frame} logicOnly={logicOnly}><HardwareChain/></Stage>;
 if (id==='ps5-chart') return <Stage frame={frame} logicOnly={logicOnly}><PriceChart/></Stage>;
 if (id==='entry-price') return <Stage frame={frame} logicOnly={logicOnly}><EntryPrice/></Stage>;
 if (id==='chapter-four') return <Stage frame={frame} logicOnly={logicOnly}><PartFour/></Stage>;
 if (id==='answer') return <Stage frame={frame} logicOnly={logicOnly}><Answer/></Stage>;
 if (id==='final-bet') return <Stage frame={frame} logicOnly={logicOnly}><FinalBet/></Stage>;
 if (id==='ledgers') return <Stage frame={frame} logicOnly={logicOnly}><Ledgers/></Stage>;
 if (id==='timeframe') return <Stage frame={frame} logicOnly={logicOnly}><Timeframe/></Stage>;
 if (id==='ending-question') return <Stage frame={frame} logicOnly={logicOnly}><Ending/></Stage>;
 throw new Error(`No native visual route for ${id}`);
}
function FramePicture({frame,chapter,brand,caption,logicOnly=false}:{frame:number;chapter:Chapter;brand:Branding;caption:Caption;logicOnly?:boolean}) {
 return <div className="ft07" data-scene={chapter.id} data-source-frame={frame} style={{position:'absolute',inset:0}}>
  <Stage frame={frame} logicOnly={logicOnly}><Atmosphere id={chapter.id}/></Stage>
  <Scene id={chapter.id} frame={frame} logicOnly={logicOnly}/><Brand place="corner" frame={frame} b={brand}/><Captions frame={frame} c={caption}/>
 </div>;
}
export const Picture=({frame,logicOnly=false}:{frame:number;logicOnly?:boolean})=> <FramePicture frame={frame} chapter={chapterAt(frame)} brand={brandAt(frame)} caption={captionAt(frame)} logicOnly={logicOnly}/>;
function OfflineFonts() {
 const {delayRender,continueRender,cancelRender}=useDelayRender();
 const [handle]=useState(()=>delayRender('FT1007: local bundled CJK + display fonts'));
 useEffect(()=>{
   let gone=false;
   Promise.all([document.fonts.load('760 50px FT07CN','发售 GTA'),document.fonts.load('900 72px FT07Display','GTA6 4,500')]).then(groups=>{
     if(gone) return;
     if(groups.some(g=>g.length===0)) {cancelRender(new Error('FT1007 local font face did not resolve'));return;}
     continueRender(handle);
   }).catch(e=>{if(!gone) cancelRender(e instanceof Error?e:new Error(String(e)));});
   return ()=>{gone=true;continueRender(handle);};
 },[handle,continueRender,cancelRender]);
 return null;
}
const at = <T extends {start:number;end:number}>(rows:readonly T[], frame:number) => rows.find(r=>r.start<=frame && frame<r.end)!;
export const FT1007=()=>{
 const frame=useCurrentFrame();
 const chapter=at(timeline.chapters,frame);
 const brand=at(timeline.brand,frame) as Branding;
 const caption=at(timeline.captions,frame);
 return <><FramePicture frame={frame} chapter={chapter} brand={brand} caption={caption}/><OfflineFonts/></>;
};
const Root=()=> <Composition id="FT1007" component={FT1007} width={1920} height={1080} fps={timeline.fps} durationInFrames={timeline.totalFrames}/>;
