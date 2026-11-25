import React from 'react';
import {useCurrentFrame} from 'remotion';
import {captionAt} from './timing';
import {font} from './primitives';

/** Source-visible subtitle clock, not audio-start/ASR timing. */
export function Captions(){
  const f=useCurrentFrame();
  const text=captionAt(f);
  if(text===null)return null;
  return <div data-ft-caption={text} style={{position:'absolute',left:0,right:0,top:953,height:102,display:'flex',justifyContent:'center',zIndex:920,pointerEvents:'none'}}><div style={{display:'flex',alignItems:'center',justifyContent:'center',height:102,boxSizing:'border-box',whiteSpace:'nowrap',fontFamily:font.sub,fontSize:47.5,color:'#fff',background:'#030303',fontWeight:400,lineHeight:1.05,padding:'0 23px 4px',borderRadius:17}}>{text}</div></div>;
}
