import React,{useEffect,useState} from 'react';
import {Composition, useCurrentFrame, delayRender, continueRender, cancelRender} from 'remotion';
import {timeline} from './clock';
import {EpisodeFrame} from './visual';
import './fonts.css';

function FontGate(){return null;}
function Movie(){const frame=useCurrentFrame();return <><FontGate/><EpisodeFrame frame={frame}/></>;}
export function Root(){return <Composition id="FT1008" component={Movie} width={1920} height={1080} fps={timeline.fps} durationInFrames={timeline.totalFrames}/>;}


export { Movie };
