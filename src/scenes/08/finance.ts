// Anthropic 424B4 (2026-11-18), consolidated statements and quarterly table.
// 单位统一为亿美元；亏损图呈现绝对额，财报原始值为负数。
export const loss={net:1040.39,operating:12.60,fairValue:943.24,rest:84.55} as const;
export const lossSegments=(width:number)=>{
 const a=width*loss.operating/loss.net;
 const b=width*loss.fairValue/loss.net;
 return [{x:0,w:a},{x:a,w:b},{x:a+b,w:width-a-b}];
};
export const quarterlyLossMillions=[6592,6377,12138,16858,14439,66309,23291] as const;
export const quarterlyLossYi=quarterlyLossMillions.map(n=>Math.round(n/100));
export const quarterKeys=['25 Q1','25 Q2','25 Q3','25 Q4','26 Q1','26 Q2','26 Q3'] as const;
export const q2Onset=3887;
export const q2Samples=[345,535,616,647,658,661,663] as const;
export const quarterLossAt=(frame:number)=>{
 const settled=quarterlyLossYi[5];
 const i=frame-q2Onset;
 const q2=i<0?0:i<q2Samples.length?q2Samples[i]:settled;
 return {q2,q3:quarterlyLossYi[6],q2Height:q2/settled*352.5};
};
export const marginLayout=(pct:number)=>{const w=Math.abs(pct)*630/224;return {x:973-w,w};};
export const operatingMarginPercent=[-3089/1382*100,-567/16956*100] as const;
export const q3={revenueYi:169.56,computeYi:98.63} as const;
export const committedYi=9009;
export const expectedBefore2031Yi=4516;
export const baseOfferingBeforeOtherExpensesYi=788.40438875;
export const privatePlacementYi=260;
