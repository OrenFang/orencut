import type {FC} from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Canvas, F, Ink, P, ProductMark, at, optionalAsset} from './basics';
import {codexWorkAt, lerp, phaseAt} from './state';

type SceneProps = {frame: number; pose: ReturnType<typeof phaseAt>};
const work = [
  {x:124, w:569, color:'#e1e4e9', copy:'日常开发'},
  {x:696, w:438, color:'#ecebf2', copy:'写自动化脚本'},
  {x:1138,w:367, color:'#e1e4e9', copy:'批量调研'},
  {x:1509,w:203, color:'#eeedf3', copy:'其他运维'},
] as const;

export const ACodex: FC<SceneProps> = ({frame,pose}) => {
  if (!pose.codex) return null;
  const scale = lerp(1,.682,pose.compact);
  const priceScaleX = lerp(1,.733,pose.compact);
  const y = lerp(184,142,pose.compact) + 16*(1-Math.max(pose.codex,pose.compact));
  return <>
    <AbsoluteFill data-a-layer="codex-header" style={{opacity:pose.codex}}>
      <AbsoluteFill style={{
        transform:`translateY(${y-184}px) scale(${scale})`, transformOrigin:'120px 184px',
      }}>
        <ProductMark logo="codex" x={120} y={184} size={85}/>
        <Canvas>
          <Ink x={225+12*pose.compact} y={247} size={57} width={172}>Codex</Ink>
          <Ink x={424+22*pose.compact} y={244} size={31} fill={P.gray} width={456}>查资料 / 搜素材 / 大量日常工作</Ink>
        </Canvas>
      </AbsoluteFill>
      <Canvas style={{transform:`translateY(${y-184}px) scale(${priceScaleX},${scale})`,transformOrigin:'1800px 184px'}}>
        <Ink x={1224} y={245} size={56} width={289} family="display">$200 / 月</Ink>
        {pose.allocation > 0 && <g opacity={pose.allocation} transform={`translate(${15*(1-pose.allocation)} 0)`}>
          <Ink x={1537-20*pose.compact} y={244} size={30} fill={P.purple} width={260+20*pose.compact}>→ 单期分摊约 ¥1</Ink>
        </g>}
      </Canvas>
    </AbsoluteFill>
    {pose.codexDetails > 0 && <Canvas style={{opacity:pose.codexDetails,transform:`translateY(${16*(1-pose.codex)+18*pose.compact}px)`}}>
      <g data-a-layer="codex-work-budget">
        <Ink x={120} y={350} size={28} fill={P.gray} width={685}>平时同时承担开发、脚本、批量调研等大量非视频任务：</Ink>
        <rect x={120} y={375} width={1680} height={108} rx={21} fill="#f0eff5"/>
        {work.map((item,i) => {
          const show = codexWorkAt(frame,i);
          return show > 0 ? <g key={item.copy} opacity={show}>
            <rect x={item.x} y={380} width={item.w} height={98} rx={16} fill={item.color}/>
            <Ink x={item.x+item.w/2} y={439} size={25} fill={P.gray} anchor="middle">{item.copy}</Ink>
          </g> : null;
        })}
      </g>
      {pose.allocation > 0 && <g data-a-layer="codex-yuan" opacity={pose.allocation}>
        <rect x={1718} y={380} width={76} height={98} rx={17} fill={P.purple}/>
        <Ink x={1756} y={438} size={22} fill={P.white} anchor="middle">视频</Ink>
        <g transform={`translate(0 ${20*(1-pose.allocation)})`}>
          <Ink x={1358} y={591} size={31} fill={P.gray} anchor="end" width={383}>分摊到每期视频搜素材部分</Ink>
          <Ink x={1358} y={631} size={24} fill="#a0a0a4" family="mono" anchor="end" width={719}>订阅小计：Claude ¥12.8 + Codex ¥1.0 = ¥13.8 / 期</Ink>
          <rect x={1395} y={509} width={405} height={179} rx={24} fill={P.dark}
            style={{filter:'drop-shadow(0 12px 10px rgba(24,24,26,.18))'}}/>
          <Ink x={1444} y={638} size={30} fill="#d1d1d3">大约</Ink>
          <Ink x={1520} y={653} size={139} fill={P.lavender} width={145}>¥1</Ink>
          <Ink x={1686} y={637} size={35} fill={P.white} width={65}>/ 期</Ink>
        </g>
      </g>}
    </Canvas>}
  </>;
};

const smooth = (v: number) => {
  const t = Math.max(0,Math.min(v,1));
  return t*t*(3-2*t);
};

// An independent still is not the source's recorded horse animation. Match the
// viewport and three observed editorial reframings using a native pan/zoom only.
const demoCropAt = (frame: number) => {
  if (frame < 1896) {
    const t = smooth((frame-1848)/36);
    return {scale:lerp(1.12,1.027,t), x:lerp(-13,1,t), y:lerp(9,0,t)};
  }
  if (frame < 1935) {
    const t = smooth((frame-1896)/39);
    return {scale:lerp(1.075,1.042,t), x:lerp(14,4,t), y:lerp(3,-5,t)};
  }
  return {scale:1.015,x:0,y:0};
};

export const ADeepSeek: FC<SceneProps> = ({frame,pose}) => {
  if (!pose.deepseek) return null;
  const media = optionalAsset('test-deepseek.jpg');
  const crop = demoCropAt(frame);
  return <AbsoluteFill data-a-layer="deepseek-alternative" style={{
    opacity:pose.deepseek,transform:`translateY(${24*(1-pose.deepseekIn)}px)`,
  }}>
    <ProductMark logo="deepseek" x={120} y={358} size={94} shadow/>
    <Canvas>
      <Ink x={234} y={373} size={25} fill="#8c72ba" family="mono" width={324}>平替方案 · ALTERNATIVE</Ink>
      <g transform="translate(0 465) scale(1 .82) translate(0 -465)">
        <Ink x={230} y={438} size={82} family="display" width={352}>DeepSeek</Ink>
      </g>
      <Ink x={119} y={539} size={45} width={601}>Codex 查资料、搜素材这部分</Ink>
      <Ink x={119} y={600} size={46} fill={P.purple} width={609}>用 DeepSeek 平替也完全可以</Ink>
      <Ink x={119} y={665} size={25} fill={P.gray} family="mono" width={448}>原片示例：EP70 DeepSeek 真实成片</Ink>
    </Canvas>
    <div data-a-layer="independent-deepseek-example" data-a-asset={media ? 'full-web/test-deepseek.jpg' : 'web/demo-anime.jpg'} style={{
      ...at(840,240,960,540),borderRadius:24,overflow:'hidden',backgroundColor:'#e0dcd9',
      boxShadow:'0 21px 38px rgba(27,26,27,.34)',
    }}>
      {media ? (
        // Editorial two-up treatment of one photograph, not two camera recordings.
        <>
          <div style={{...at(0,0,480,540),overflow:'hidden'}}>
            <Img src={media} alt="独立骑马照片的暖色裁切" style={{
              width:'100%',height:'100%',display:'block',objectFit:'cover',objectPosition:'82% 50%',
              transform:`translate(${crop.x}px,${crop.y}px) scale(${crop.scale})`,
            }} />
          </div>
          <div style={{...at(480,0,480,540),overflow:'hidden'}}>
            <Img src={media} alt="同一独立照片的冷色近景裁切" style={{
              width:'100%',height:'100%',display:'block',objectFit:'cover',objectPosition:'86% 48%',
              transform:`translate(${-crop.x*.65}px,${crop.y*.65}px) scale(${crop.scale+.025})`,
              filter:'hue-rotate(164deg) saturate(.56) brightness(1.16)',
            }} />
          </div>
          <div style={{...at(478,0,4,540),background:'rgba(255,255,255,.63)'}} />
        </>
      ) : <Img src={staticFile('web/demo-anime.jpg')} alt="独立案例替图" style={{
        width:'100%',height:'100%',display:'block',objectFit:'cover',
        transform:`translate(${crop.x}px,${crop.y}px) scale(${crop.scale})`,
      }} />}
      <div style={{
        position:'absolute',left:15,top:13,background:'rgba(24,24,26,.86)',padding:'4px 12px 5px',
        borderRadius:10,color:P.white,fontFamily:F.text,fontWeight:900,fontSize:22,lineHeight:1.12,
      }}>案例画面 · 独立替图</div>
    </div>
  </AbsoluteFill>;
};

export const AGemini: FC<SceneProps> = ({pose}) => {
  if (!pose.gemini) return null;
  const dim = pose.geminiWarn;
  const focus = pose.geminiSwitch;
  const rightScale = lerp(.947,1,focus);
  const note = pose.geminiNote;
  return <AbsoluteFill data-a-layer="gemini-backup" style={{
    opacity:pose.gemini,transform:`translateY(${26*(1-pose.gemini)}px)`,
  }}>
    <ProductMark logo="gemini" x={131} y={210} size={86}/>
    <Canvas>
      <Ink x={244} y={253} size={57} width={817}>主力备份 · Gemini 防封号平替</Ink>
      <Ink x={245} y={301} size={29} fill={P.gray} width={771}>同为 $200/月主力档 · 目的不是省钱，而是工作流不会断</Ink>
      <Ink x={1421} y={291} size={113} fill={P.purple} family="display">$200</Ink>
      <Ink x={1727} y={291} size={34} fill={P.gray} width={61}>/ 月</Ink>
      <rect x={131} y={376} width={686} height={318} rx={28} fill="#f2f2f5"/>
      {dim > 0 && <rect x={131} y={376} width={686} height={318} rx={28} fill="#f7f7f9" stroke="#e8a4a8" strokeWidth={2.8} opacity={dim} />}
      <g opacity={lerp(1,.62,dim)}>
        <Ink x={258} y={451} size={44} width={265}>Claude Code</Ink>
        <Ink x={258} y={486} size={22} fill={P.gray} family="mono" width={339}>$200 / 月 · ≈ ¥12.8 / 期</Ink>
        <Ink x={171} y={643} size={27} fill={P.gray} width={342}>日常主力 · 写代码 / 编排场景</Ink>
      </g>
      {dim > 0 && <g data-a-layer="gemini-claude-warning" opacity={dim}>
        <rect x={542} y={612} width={235} height={45} rx={12} fill="#faedef"/>
        <Ink x={659.5} y={643} size={23} fill="#d9787d" anchor="middle" width={193}>若账号受限 / 封号</Ink>
      </g>}
      <Ink x={130} y={790} size={27} fill={P.gray} width={1189}>本期账单按单主力计入：Claude（或 Gemini 备份）¥12.8 + Codex 均摊 ¥1.0 = ¥13.8 / 期</Ink>
    </Canvas>
    <AbsoluteFill style={{opacity:lerp(1,.64,dim)}}><ProductMark logo="claude" x={171} y={417} size={68}/></AbsoluteFill>
    <AbsoluteFill data-a-layer="gemini-card" style={{transform:`scale(${rightScale})`,transformOrigin:'1494px 535px'}}>
      <Canvas>
        <rect x={1121} y={376} width={746} height={318} rx={28} fill="#faf9fc" stroke="#ded7e8" strokeWidth={3}/>
        {focus > 0 && <rect x={1121} y={376} width={746} height={318} rx={28} fill={P.pale} stroke="#8a61c9" strokeWidth={2.9}
          opacity={focus} style={{filter:'drop-shadow(0 19px 24px rgba(119,76,212,.14))'}}/>}
      </Canvas>
      <AbsoluteFill style={{opacity:lerp(.26,1,focus)}}>
        <ProductMark logo="gemini" x={1162} y={417} size={66}/>
        <Canvas>
          <Ink x={1247} y={451} size={43} width={237}>Gemini 平替</Ink>
          <Ink x={1247} y={486} size={22} fill="#8e73c1" family="mono" width={400}>同样 $200 / 月 · 额度消耗差不多</Ink>
          <rect x={1660} y={430} width={167} height={43} rx={12} fill={P.white}/>
          <Ink x={1743} y={458} size={21} fill="#8e73c1" family="mono" anchor="middle">≈ ¥12.8/期</Ink>
        </Canvas>
      </AbsoluteFill>
      {note > 0 && <Canvas>
        <g data-a-layer="gemini-workflow-note" opacity={note} transform={`translate(0 ${12*(1-note)})`}>
          <rect x={1161} y={590} width={666} height={68} rx={16} fill={P.purple}/>
          <Ink x={1494} y={635} size={28} fill={P.white} anchor="middle" width={425}>整套流程照样跑 · 工作流不会断</Ink>
        </g>
      </Canvas>}
    </AbsoluteFill>
    {focus > 0 && <Canvas>
      <g data-a-layer="gemini-switch" opacity={focus}>
        <rect x={876} y={472} width={185} height={42} rx={21} fill="#f2eafa"/>
        <Ink x={968.5} y={502} size={23} fill={P.purple} anchor="middle">无缝切换平替</Ink>
        <g transform={`translate(855 544) scale(${focus} 1)`}>
          <path d="M 3 0 H 207" fill="none" stroke={P.purple} strokeWidth={8} strokeLinecap="round"/>
          <path d="M 207 -14 L 231 0 L 207 14 Z" fill={P.purple}/>
        </g>
        <Ink x={969} y={593} size={23} fill={P.gray} family="mono" anchor="middle">同一套 Skill 规则</Ink>
      </g>
    </Canvas>}
  </AbsoluteFill>;
};
