import timeline from './timeline.json';
export {timeline};
export type BrandMode = 'white-outline'|'white'|'purple'|'dark'|'none';
export const chapterAt = (f: number) => timeline.chapters.find((row) => row.start <= f && f < row.end)!;
export const brandAt = (f: number) => timeline.brand.find((row) => row.start <= f && f < row.end)!;
export const captionAt = (f: number) => timeline.captions.find((row) => row.start <= f && f < row.end)!;
export const whiteAt = (f: number) => timeline.whitePageWindows.find((row) => row.start <= f && f < row.end);
export const stateAt = (f: number) => ({chapter:chapterAt(f),brand:brandAt(f),caption:captionAt(f),white:whiteAt(f)});
export const clamp = (n: number) => Math.max(0,Math.min(1,n));
export const lerp = (a: number,b: number,t: number) => a+(b-a)*t;
export const progress = (f: number,a: number,b: number) => clamp((f-a)/Math.max(1,b-a));
export const smooth = (p: number) => p*p*(3-2*p);
export const easeOut = (p: number) => 1-(1-p)**3;
export const localEase = (f: number,a: number,b: number) => easeOut(progress(f,a,b));
export type Rect = readonly [number,number,number,number];
export function between(a: Rect,b: Rect,t: number): Rect {return [lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t),lerp(a[3],b[3],t)];}
export function sample(f: number,points: readonly (readonly [number,number])[]): number {
  for(let i=1;i<points.length;i++) if(f<=points[i][0]) return lerp(points[i-1][1],points[i][1],progress(f,points[i-1][0],points[i][0]));
  return points.at(-1)?.[1] ?? 0;
}
