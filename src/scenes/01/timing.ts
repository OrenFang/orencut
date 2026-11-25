import raw from './timeline.json';

export type Interval = {start: number; end: number};
export type BrandMode = 'white-outline' | 'white' | 'purple' | 'dark' | 'none';
export type Chapter = Interval & {id: string};
export type Mark = Interval & {mode: BrandMode};
export type Caption = Interval & {text: string | null};
export type WhitePage = Interval & {mode: BrandMode; pageStyle: 'white' | 'white-reveal' | 'white-rail'};
export type EventRow = Interval & {id: string; points?: [number,number][]};
export const timeline = raw as {
  fps: number; totalFrames: number; chapters: Chapter[]; brand: Mark[];
  captions: Caption[]; whitePageWindows: WhitePage[]; events: EventRow[];
};

export function atFrame<T extends Interval>(rows: readonly T[], frame: number): T | undefined {
  let lo=0, hi=rows.length;
  while (lo<hi) {
    const m=(lo+hi)>>>1;
    if (frame<rows[m].start) hi=m;
    else if (frame>=rows[m].end) lo=m+1;
    else return rows[m];
  }
  return undefined;
}

export const chapterAt = (f: number) => atFrame(timeline.chapters,f);
export const markAt = (f: number) => atFrame(timeline.brand,f)?.mode ?? 'none';
export const captionAt = (f: number) => atFrame(timeline.captions,f)?.text ?? null;
export const whiteAt = (f: number) => atFrame(timeline.whitePageWindows,f)?.pageStyle;
const eventsById = new Map(timeline.events.map(row=>[row.id,row]));
export const cue = (id: string): EventRow => {
  const e=eventsById.get(id);
  if (!e) throw new Error(`Unknown source-clock event: ${id}`);
  return e;
};
export const inCue = (frame: number,id: string) => frame>=cue(id).start && frame<cue(id).end;
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const lin = (v: number,a: number,b: number) => clamp((v-a)/Math.max(1,b-a));
export const out = (v: number) => 1-(1-v)**3;
export const smooth = (v: number) => v*v*(3-2*v);
export const lerp = (x: number,y: number,t: number) => x+(y-x)*t;
export const phase = (frame: number,id: string) => {
  const {start,end}=cue(id);
  return lin(frame,start,end);
};
export const ease = (frame: number,id: string) => out(phase(frame,id));
export const st = (frame: number, start: number, duration: number, delay=0) => out(lin(frame,start+delay,start+delay+duration));
export const piecewise = (frame: number, points: ReadonlyArray<readonly [number,number]>) => {
  let value=points[0][1];
  for (let i=1;i<points.length;i++) {
    const [f1,y1]=points[i], [f0,y0]=points[i-1];
    if (frame<f1) return lerp(y0,y1,smooth(lin(frame,f0,f1)));
    value=y1;
  }
  return value;
};
export const sampled = (frame:number,id:string) => {
  const e=cue(id);
  if(!e.points?.length)throw new Error(`Missing measured points for ${id}`);
  return piecewise(frame,e.points);
};
