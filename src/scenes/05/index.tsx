import React from 'react';
import {AbsoluteFill, Composition, useCurrentFrame} from 'remotion';
import timeline from './timeline.json';
import {Brand, Captions, ChapterBadges, FontGate} from './overlays';
import {Closing, Opening, Genie, Robots} from './front';
import {Gemini, Space, Kling, Suno} from './middle';
import {Domestic, Notebook, Claude} from './end';
import {FONT} from './visual';
import './fonts.css';

export const Episode: React.FC = () => {
  const frame = useCurrentFrame();
  const row = timeline.chapters.find((r) => r.start <= frame && frame < r.end)!;
  const id = row.id;
  const scene = id === 'open' ? <Opening f={frame}/> :
    id === 'genie' ? <Genie f={frame}/> :
    id === 'robots' ? <Robots f={frame}/> :
    id === 'gemini' ? <Gemini f={frame}/> :
    id === 'space' ? <Space f={frame}/> :
    id === 'kling' ? <Kling f={frame}/> :
    id === 'suno' ? <Suno f={frame}/> :
    id === 'domestic' ? <Domestic f={frame}/> :
    id === 'notebook' ? <Notebook f={frame}/> :
    id === 'claude' ? <Claude f={frame}/> : <Closing f={frame}/>;
  return <AbsoluteFill style={{backgroundColor:'#fff',color:'#19191c',fontFamily:FONT,overflow:'hidden',isolation:'isolate'}}>
    <FontGate />
    {scene}
    <ChapterBadges />
    <Brand />
    <Captions />
  </AbsoluteFill>;
};
const Root: React.FC = () => <Composition id="FT1005" component={Episode} width={1920} height={1080} fps={timeline.fps} durationInFrames={timeline.totalFrames} />;

