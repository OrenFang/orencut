import React from 'react';
import {Composition} from 'remotion';
import {Episode,SPEC} from './Episode';
export {Episode,SPEC,chapterIds} from './Episode';
export const Root=()=> <Composition {...SPEC} component={Episode}/>;

