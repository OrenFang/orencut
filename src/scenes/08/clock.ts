import data from './timeline.json';

export type Span={start:number;end:number};
export type BrandMode='white-outline'|'white'|'purple'|'dark'|'none';
export type Chapter=Span&{id:string;stage:'early'|'middle'|'late';label:string;bg:string};
export type Caption=Span&{text:string|null;firstOpacity?:number;fadeFrames?:number;fadeEase?:'out-cubic'};
export type BrandState=Span&{mode:BrandMode};
export const timeline=data as {fps:number;totalFrames:number;chapters:Chapter[];brand:BrandState[];captions:Caption[];whitePageWindows:BrandState[]};
export function at<T extends Span>(rows:readonly T[], frame:number):T {
  if (!Number.isInteger(frame)||frame<0||frame>=timeline.totalFrames) throw new RangeError(`frame ${frame}`);
  let lo=0,hi=rows.length;
  while(lo<hi){const mid=(lo+hi)>>>1;if(rows[mid].end<=frame)lo=mid+1;else hi=mid;}
  const span=rows[lo];
  if (!span||span.start>frame) throw new RangeError(`track does not cover frame ${frame}`);
  return span;
}
export const shotAt=(f:number)=>at(timeline.chapters,f);
export const captionAt=(f:number)=>at(timeline.captions,f);
export const brandAt=(f:number)=>at(timeline.brand,f);
