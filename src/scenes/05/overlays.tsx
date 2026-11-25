import React, {useEffect, useState} from 'react';
import {useCurrentFrame, useDelayRender} from 'remotion';
import timeline from './timeline.json';
import {CAPFONT, clamp, lerp} from './visual';

export const FontGate: React.FC = () => {
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [handle] = useState(() => delayRender('FT1005 local Chinese fonts'));
  useEffect(() => {
    Promise.all([document.fonts.load('800 50px "FT05 Head"', '本周机器人猜想'),document.fonts.load('400 48px "FT05 Caption"', '字幕谷歌 FredTalk')])
      .then(() => continueRender(handle)).catch(cancelRender);
  }, [handle, continueRender, cancelRender]);
  return null;
};

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const text = timeline.captions.find((r) => r.start <= frame && frame < r.end)!.text;
  return text === null ? null : <div style={{position:'absolute',zIndex:60,left:'50%',bottom:24,transform:'translateX(-50%)',height:103,padding:'0 24px',borderRadius:16,backgroundColor:'#000',color:'#fff',fontFamily:CAPFONT,fontWeight:400,fontSize:49,lineHeight:'103px',whiteSpace:'nowrap',maxWidth:1690,textAlign:'center',pointerEvents:'none'}}>{text}</div>;
};

const badgeWidth: Record<number,number>={1:338,2:360,3:354,4:504,5:465,6:432,7:334,8:384,9:504};
export const ChapterBadges: React.FC = () => {
  const f=useCurrentFrame();
  return <>{timeline.events.filter(e=>e.kind==='badge'&&e.start<=f&&f<e.end).map(e=>{
    const n=e.number!; const width=badgeWidth[n];
    const age=f-e.start; const remaining=e.end-f;
    const xIn=e.enter==='slide'? ([ -width*.87,-width*.59,-105,-40,0][Math.min(4,age)]):0;
    const oIn=e.enter==='slide'? (age===0?.58:1):[.55,.92,1][Math.min(2,age)];
    const xOut=e.exit!=='cut'&&remaining<=4 ? [0,-20,-92,-188,-352][5-remaining] : 0;
    const oOut=e.exit!=='cut'&&remaining<=4 ? [1,.89,.63,.29,.068][5-remaining] : 1;
    const size=e.enter==='pop'?lerp(.84,1,clamp((age+1)/4)):1;
    return <div key={e.start} style={{position:'absolute',zIndex:50,left:70+xIn+xOut,top:46,width,height:92,display:'flex',alignItems:'center',gap:16,paddingLeft:14,boxSizing:'border-box',borderRadius:54,backgroundColor:'#181819',color:'#fff',boxShadow:'13px 16px 30px #0006',fontWeight:850,fontSize:40,lineHeight:1,whiteSpace:'nowrap',opacity:oIn*oOut,transform:`scale(${size})`,transformOrigin:'left center'}}>
      <span style={{flex:'0 0 64px',height:64,borderRadius:64,display:'grid',placeItems:'center',backgroundColor:'#fff',color:'#181819',fontSize:38,fontWeight:900}}>{n}</span>{e.label}
    </div>;
  })}</>;
};
