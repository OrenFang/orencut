export interface Span {start: number; end: number;}
export interface Chapter extends Span {id: string; kind: string; rank?: number;}
export interface BrandSpan extends Span {mode: string;}
export interface CaptionSpan extends Span {text: string|null; visible?: boolean;}
export interface Event {id:string;track:string;start?:number;end?:number;frame?:number;value?:number;}
export interface Timeline {fps:number;totalFrames:number;chapters:Chapter[];brand:BrandSpan[];captions:CaptionSpan[];whitePageWindows:BrandSpan[];events:Event[];}
export interface Scene extends Span {id:string;track:'scene';}
export const clamp=(n:number,a=0,b=1)=>Math.min(b,Math.max(a,n));
export const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
export const phase=(f:number,start:number,end:number)=>clamp((f-start)/Math.max(1,end-start));
export const ease=(t:number)=>1-(1-clamp(t))**3;
export const settle=(f:number,start:number,end:number)=>ease(phase(f,start,end));
export const rangeAt=<T extends Span>(rows:readonly T[],frame:number):T|undefined=>rows.find(row=>row.start<=frame&&frame<row.end);
export const sceneAt=(t:Timeline,f:number)=>rangeAt(t.events.filter((e):e is Scene=>e.track==='scene'&&e.start!==undefined&&e.end!==undefined),f)!;
export function valueAt(f:number,p:readonly (readonly [number,number])[]) {
  if(!p.length)return 0;
  for(let i=1;i<p.length;i++){const b=p[i],a=p[i-1]; if(f<b[0])return mix(a[1],b[1],phase(f,a[0],b[0]));}
  return p[p.length-1][1];
}
const cache=new WeakMap<Timeline,Map<string,Event[]>>();
function grouped(t:Timeline) {
  const saved=cache.get(t); if(saved)return saved;
  const m=new Map<string,Event[]>();
  for(const row of t.events)if(row.frame!==undefined) {const seq=m.get(row.id)||[];seq.push(row);m.set(row.id,seq);}
  cache.set(t,m);return m;
}
export const marks=(t:Timeline,id:string)=>grouped(t).get(id)??[];
export const times=(t:Timeline,id:string)=>marks(t,id).map(e=>e.frame!);
export const anchor=(t:Timeline,id:string,index=0,fallback=0)=>marks(t,id)[index]?.frame??fallback;
export const meter=(t:Timeline,id:string,f:number)=>valueAt(f,marks(t,id).filter(e=>e.value!==undefined).map(e=>[e.frame!,e.value!]));
export const active=(t:Timeline,id:string,f:number,fallback=0)=>marks(t,id).reduce((v,e)=>e.frame!<=f?(e.value??v):v,fallback);
export const cardZoom=(t:Timeline,c:Chapter,f:number)=>c.rank?settle(f,c.start,anchor(t,`rank-${c.rank}-join`,0,c.start)):1;
export function layoutAt(t:Timeline,f:number) {
  const chapter=rangeAt(t.chapters,f),caption=rangeAt(t.captions,f),brand=rangeAt(t.brand,f),scene=sceneAt(t,f);
  if(!chapter||!caption||!brand||!scene)throw Error(`Undefined master frame ${f}`);
  return {chapter,caption,brand,scene,cardZoom:cardZoom(t,chapter,f)};
}
