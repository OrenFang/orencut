import {between, localEase, progress, sample, smooth, timeline, type Rect} from './clock';
import type {MediaKey} from './media';

export type Theme = 'warm'|'green'|'slate'|'navy'|'black'|'silver'|'pink'|'paper'|'indigo'|'patch';
type Plan = {name:string;repo:string;hero:Rect;entry:number;land:number;body:number;tagY:number;font:number;statAt:number;tone:Theme;art:MediaKey;badge?:MediaKey;weekly:number;total:string;claim:string;count:readonly (readonly [number,number])[];};
// Consecutive native-frame glyphs from first visibility through the first settled value.
const nativeWeekly=(first:number,values:readonly number[])=>[[first-1,0] as const,...values.map((value,i)=>[first+i,value] as const)];
const univerWeekly=nativeWeekly(935,[435,1257,2003,2664,3238,3726,4134,4471,4746,4970,5152,5298,5417,5511,5587,5648,5696,5734,5763,5786,5804,5817,5827,5834,5839,5842,5843,5844,5845]);
const reviewWeekly=nativeWeekly(2640,[274,790,1259,1675,2036,2343,2599,2811,2984,3125,3239,3331,3406,3465,3513,3551,3581,3605,3624,3638,3649,3657,3664,3668,3671,3673,3674,3675]);
export const rankPlan:Record<number,Plan> = {
  1:{name:'Modern Web Guidance',repo:'GoogleChrome/modern-web-guidance-src',hero:[59,400,962,540],entry:253,land:268,body:374,tagY:822,font:65,statAt:277,tone:'green',art:'modern-hero',badge:'modern-logo',weekly:7015,total:'0.9 万',claim:'Google Chrome 团队出品',count:[[277,0],[284,4472],[291,6501],[300,6982],[305,7013],[307,7015]]},
  2:{name:'Univer',repo:'dream-num/univer',hero:[56,400,968,448],entry:909,land:924,body:1016,tagY:814,font:86,statAt:933,tone:'navy',art:'univer-hero',badge:'univer-logo',weekly:5845,total:'3.0 万',claim:'开源 AI 办公全家桶',count:univerWeekly},
  3:{name:'Sure',repo:'we-promise/sure',hero:[55,392,972,480],entry:1421,land:1438,body:1563,tagY:827,font:90,statAt:1453,tone:'black',art:'sure-hero',badge:'sure-logo',weekly:4786,total:'1.6 万',claim:'开源记账理财 App',count:[[1453,0],[1463,4664],[1470,4777],[1480,4786]]},
  4:{name:'Agent Skills',repo:'addyosmani/agent-skills',hero:[60,392,960,480],entry:1997,land:2014,body:2157,tagY:821,font:85,statAt:2028,tone:'navy',art:'agent-hero',badge:'agent-logo',weekly:3884,total:'11.9 万',claim:'资深工程师的做事流程',count:[[2028,0],[2036,3662],[2040,3810],[2051,3884]]},
  5:{name:'Open Code Review',repo:'alibaba/open-code-review',hero:[56,397,968,475],entry:2614,land:2632,body:2754,tagY:830,font:70,statAt:2639,tone:'black',art:'review-hero',badge:'review-logo',weekly:3675,total:'5.4 万',claim:'阿里内部审查工具开源',count:reviewWeekly},
  6:{name:'Chrome DevTools MCP',repo:'ChromeDevTools/chrome-devtools-mcp',hero:[59,399,962,502],entry:3126,land:3141,body:3309,tagY:819,font:63,statAt:3151,tone:'slate',art:'chrome_hero',badge:'chrome_logo',weekly:2948,total:'5.8 万',claim:'让 AI 自己调试网页',count:[[3151,0],[3152,220],[3154,1010],[3155,1344],[3156,1633],[3157,1879],[3160,2394],[3170,2907],[3180,2948]]},
  7:{name:'Plannotator',repo:'backnotprop/plannotator',hero:[59,400,962,494],entry:3668,land:3685,body:3745,tagY:819,font:85,statAt:3695,tone:'pink',art:'plannotator_hero',badge:'plannotator_mascot',weekly:2926,total:'1.3 万',claim:'给 AI 的计划和代码做批注',count:[[3695,0],[3702,1003],[3714,2430],[3720,2925],[3736,2926]]},
  8:{name:'Humanizer',repo:'blader/humanizer',hero:[58,400,964,506],entry:4202,land:4219,body:4357,tagY:819,font:88,statAt:4229,tone:'paper',art:'humanizer_hero',weekly:2866,total:'7.1 万',claim:'专门去掉 AI 味',count:[[4229,0],[4230,982],[4243,2327],[4260,2866]]},
  9:{name:'ffmpeg-skill',repo:'kajisho5/ffmpeg-skill',hero:[58,400,964,487],entry:4687,land:4704,body:4876,tagY:820,font:84,statAt:4715,tone:'indigo',art:'ffmpeg_skill_tools',badge:'ffmpeg_skill_logo',weekly:2666,total:'0.8 万',claim:'给 AI 配一个剪辑师',count:[[4715,0],[4724,1186],[4738,2540],[4750,2666]]},
 10:{name:'Codex Security',repo:'openai/codex-security',hero:[58,400,964,484],entry:5258,land:5275,body:5387,tagY:819,font:80,statAt:5287,tone:'silver',art:'codex_security_workbench',badge:'openai_logo',weekly:2531,total:'1.4 万',claim:'OpenAI 官方安全扫描',count:[[5287,0],[5305,1950],[5310,2530],[5317,2531]]},
};
export const ranks = [1,2,3,4,5,6,7,8,9,10] as const;
export const countLabel = new Intl.NumberFormat('en-US');
export const starCount = (rank:number,frame:number) => Math.round(sample(frame,rankPlan[rank].count));
export const flashRank = (frame:number) => timeline.events.find(e=>e.type==='flash-card' && e.start!==undefined && e.end!==undefined && e.start<=frame && frame<e.end)?.rank;
export function atWall(rank:number):Rect {
  if(rank===1) return [40,400,1000,300];
  return [40+337*((rank-2)%3),708+184*Math.floor((rank-2)/3),326,rank>=8?174:173];
}
// Single logical card changes geometry from the held board tile into the full-width chapter title media.
// No.1 front card, measured at the right rim (f255–267); the landed card is unchanged.
const leadHeights=[300,310,320,336,361,398,442,479,504,520,530,536,539] as const;
export function cardPose(rank:number,f:number):Rect {
  const d=rankPlan[rank], wall=atWall(rank);
  if(rank===1){
    const height=leadHeights[f-255];
    if(height===undefined) return f<255?wall:d.hero;
    const [left,top,width]=between(wall,d.hero,(height-wall[3])/(d.hero[3]-wall[3]));
    return [left,top,width,height];
  }
  return between(wall,d.hero,smooth(progress(f,d.entry+1,d.land)));
}
export function rankModes(f:number):number[] {
  if(f>=85&&f<153) return [1,5,6,10];
  if(f>=160&&f<228) return [8];
  return [];
}
export type Segment={id:string;rank:number;start:number;end:number;theme:Theme;enter:number;overlap:number};
const seg=(rank:number,id:string,start:number,end:number,theme:Theme='warm',enter=4,overlap=0):Segment=>({rank,id,start,end,theme,enter,overlap});
export const scenes:Segment[] = [
 seg(1,'modern-quote',374,528,'warm',6),seg(1,'modern-demo',528,659,'green',7,5),seg(1,'browser-262',659,789,'warm',6),seg(1,'modern-readme',789,909),
 seg(2,'univer-home',1016,1113),seg(2,'univer-matrix',1113,1214),seg(2,'univer-demo',1214,1421,'navy',4),
 seg(3,'sure-quote',1563,1769),seg(3,'sure-demo',1769,1997),
 seg(4,'agent-install',2157,2260,'warm',5),seg(4,'agent-workflow',2260,2407),seg(4,'agent-readme',2407,2507),seg(4,'agent-agents',2507,2614),
 seg(5,'review-readme',2754,2890),seg(5,'review-terminal',2890,2944,'slate'),seg(5,'review-bench',2944,3024),seg(5,'review-metrics',3024,3126),
 seg(6,'chrome-demo',3309,3490,'silver',4),seg(6,'chrome-features',3490,3586,'warm',0),seg(6,'chrome-agents',3586,3668,'warm',0,2),
 seg(7,'plan-annotate',3745,4007),seg(7,'plan-promo',4007,4094),seg(7,'plan-inbox',4094,4202),
 seg(8,'human-quote',4357,4489),seg(8,'human-example',4489,4576),seg(8,'human-blind',4576,4687,'paper',5),
 seg(9,'ff-tools',4876,4991,'warm',5),seg(9,'ff-local',4991,5086,'indigo',0),seg(9,'ff-audit',5086,5258),
 seg(10,'codex-prompt',5387,5480),seg(10,'codex-defense',5480,5620,'patch',7,4),seg(10,'codex-ci',5620,5676,'warm',1),seg(10,'codex-scan',5676,5745,'warm',2),
];
export const sceneAt = (f:number,rank:number) => scenes.find(s=>s.rank===rank&&s.start<=f&&f<s.end);
export const firstBody = (rank:number) => scenes.find(s=>s.rank===rank);
export const cornerAt = (f:number,chapter:string) => timeline.events.find(e=>e.type==='chapter-corner'&&e.chapter===chapter&&e.start!==undefined&&e.end!==undefined&&e.start<=f&&f<e.end);
export const appearing = (f:number,at:number,over:number=5) => localEase(f,at-1,at+over-1);
