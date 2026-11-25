import React from 'react';
import {Composition} from 'remotion';
import timeline from './timeline.json';
import {Episode} from './episode';

const Root:React.FC=()=> <Composition id="FT1006" component={Episode} width={1080} height={1920} fps={timeline.fps} durationInFrames={timeline.totalFrames}/>;

