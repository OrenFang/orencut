import raw from './timeline.json';
import provenance from './assets.json';

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const fps = raw.fps;
export const totalFrames = raw.totalFrames;
export type Span = {start:number; end:number};
export type Chapter = Span & {id:string};
export type BrandMode = 'white-outline'|'white'|'purple'|'dark'|'none';
export type Branding = Span & {mode:BrandMode; label?:string; place?:'corner'|'skill'; fade?:number};
export type Caption = Span & {text:string|null; fadeIn?:number; fadeOut?:number; onsetOpacity?:number};
export type Motion = [start:number, length:number];
export type Shot = [start:number,end:number,assetId:string,position?:string,fit?:'cover'|'contain',offset?:number];
export type LocalAsset = {id:string;path:string;width?:number;height?:number;mediaType:string;durationSec?:number;playback?:{durationSec?:number};status?:string};
export type EditorialEvent =
  | (Span & {type:'motion';id:string})
  | (Span & {type:'media';lane:string;assetId:string;position?:string;fit?:'cover'|'contain';offset?:number})
  | {type:'seam';id:string;detail:Record<string,unknown>;frame?:number;start?:number;end?:number};
export type Trace = {chapters:Chapter[];brand:Branding[];captions:Caption[];whitePageWindows:(Span & {mode:string})[];events:EditorialEvent[]};
export const timebase = raw as unknown as Trace;
const motions = Object.fromEntries(timebase.events.filter(e=>e.type==='motion').map(e=>[e.id,[e.start,e.end-e.start] as Motion]));
export const assets = new Map((provenance.assets as LocalAsset[]).map(a=>[a.id,a]));

function locate<T extends Span>(track:readonly T[],frame:number):T|undefined {
  let lo=0,hi=track.length;
  while (lo<hi) {const m=(lo+hi)>>>1; if (track[m].end<=frame) lo=m+1; else hi=m;}
  const cue=track[lo]; return cue&&cue.start<=frame?cue:undefined;
}
const get = <T extends Span>(track:readonly T[], frame:number):T => {
  if (!Number.isInteger(frame)||frame<0||frame>=totalFrames) throw new RangeError(`Source frame ${frame} outside 0..${totalFrames-1}`);
  const s=locate(track,frame); if (!s) throw new Error(`Track hole at source frame ${frame}`); return s;
};
export const chapterAt = (frame:number)=>get(timebase.chapters,frame);
export const brandAt = (frame:number)=>get(timebase.brand,frame);
export const captionAt = (frame:number)=>get(timebase.captions,frame);
export const clamp = (n:number,min=0,max=1)=>Math.max(min,Math.min(max,n));
export const linear = (n:number,t:number,d:number)=>clamp((n-t)/Math.max(1,d));
export const easeOut = (q:number)=>1-(1-clamp(q))**3;
export const easeInOut = (q:number)=>q<.5?4*q**3:1-((-2*q+2)**3)/2;
export const rise = (n:number,t:number,d:number)=>easeOut(linear(n,t,d));
export const mix = (a:number,b:number,p:number)=> a+(b-a)*p;
// Only neighboring measured anchors constrain the interpolation; this is not an observed value between samples.
export function fitPhase(frame:number, anchors:readonly (readonly [number,number])[]) {
  if(frame<=anchors[0][0]) return anchors[0][1];
  for(let i=1;i<anchors.length;i++) {
    const [end,to]=anchors[i], [start,from]=anchors[i-1];
    if(frame<=end) return mix(from,to,linear(frame,start,end-start));
  }
  return anchors[anchors.length-1][1];
}
export const cue = (frame:number,key:string,easing=(q:number)=>easeOut(q))=>{
  const mark=motions[key]; if(!mark) throw new Error(`Unknown motion cue: ${key}`);
  return easing(linear(frame,mark[0],mark[1]));
};

const groups:Record<string,{start:number;end:number;shot:Shot}[]> = Object.create(null);
for (const e of timebase.events) {
  if(e.type!=='media') continue;
  (groups[e.lane]??=[]).push({start:e.start,end:e.end,shot:[e.start,e.end,e.assetId,e.position,e.fit,e.offset]});
}
export const mediaAt = (group:string,frame:number)=>{
  const list = groups[group]; if(!list) throw new Error(`Undefined media group ${group}`);
  const found=locate(list,frame); if(!found) return undefined;
  const [start,end,assetId,position,fit,offset=0]=found.shot;
  const asset=assets.get(assetId); if(!asset) throw new Error(`Missing media: ${assetId}`);
  const video=asset.mediaType.startsWith('video');
  const seconds=asset.durationSec??asset.playback?.durationSec;
  if (video&&(!seconds||!Number.isFinite(seconds))) throw new Error(`Video duration missing: ${assetId}`);
  const safeEnd=video?Math.max(0,Math.floor(seconds!*fps)-2-offset):end-start-1;
  return {group,start,end,assetId,asset,position:position??'50% 50%',fit:fit??'cover',offset,video,safeEnd,localFrame:Math.min(safeEnd,frame-start)};
};
export const mediaPlanAt = (frame:number)=>Object.keys(groups).map(x=>mediaAt(x,frame)).filter(row=>row!==undefined);
