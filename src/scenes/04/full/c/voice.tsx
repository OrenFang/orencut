import { demoAsset as staticFile } from '../../../../demo-media';
import type {FC} from 'react';
import {AbsoluteFill} from 'remotion';
import {at, box, Canvas, GRAY, Ink, INK, InsetCaption, LAVENDER, MEDIA_SHADOW,
  MONO, Photo, PURPLE, rise, settle, smooth, SOFT_SHADOW, Stamp, TEXT, WEB} from './stage';

const CHROME_W = 1712;
const CHROME_H = 725;
const CHROME_HEADER = 52;

export const Transcription: FC<{frame: number}> = ({frame}) => {
  if (frame < 3703 || frame >= 4172) return null;
  const enter = at(frame, [[3702, 0], [3703, .21], [3705, .60], [3708, .86], [3712, .98], [3719, 1]]);
  const exit = at(frame, [[4156, 0], [4158, .13], [4161, .56], [4165, .86], [4171, 1]]);
  const x = at(frame, [[4157, 104], [4160, 85], [4163, 42], [4165, 8], [4171, -84]]);
  const y = at(frame, [[3703, 196], [3705, 183], [3708, 175], [3714, 170]]);
  const camera = at(frame, [[3703, 1], [3778, 1], [3825, 1.072], [3870, 1.12], [3960, 1.135], [4057, 1.135]]);
  const cameraY = at(frame, [[3703, 0], [3778, 0], [3825, -42], [3870, -61], [3960, -69], [4095, -72]]);
  const note = settle(frame, 3776, 3798);
  const math = settle(frame, 3919, 3933);
  const result = settle(frame, 4051, 4060);
  const priceSwap = settle(frame, 3924, 3933);
  return (
    <div data-c-stage="transcription" style={{...box(x, y, CHROME_W, CHROME_H), backgroundColor: '#1b1f20',
      borderRadius: 26, overflow: 'hidden', boxShadow: MEDIA_SHADOW, opacity: enter * (1 - exit)}}>
      {/* Independent capture only. Chrome and the pricing overlay are editorial, not an app replica. */}
      <div style={{...box(0, CHROME_HEADER, CHROME_W, CHROME_H - CHROME_HEADER), overflow: 'hidden', background: '#1e2020'}}>
        <Photo src={WEB.transcript} alt="独立转录软件公开界面；不展示原作者私有审片台"
          style={{objectFit: 'contain', objectPosition: '50% 0', transform: `translateY(${cameraY}px) scale(${camera})`,
            transformOrigin: '50% 0', filter: 'brightness(.91)'}} />
      </div>
      <div data-c-shot-label style={{...box(0, 0, CHROME_W, CHROME_HEADER), backgroundColor: '#171719'}}>
        <Canvas width={CHROME_W} height={CHROME_HEADER}>
          <circle cx={29} cy={26} r={6} fill="#eeeef3" />
          <circle cx={51} cy={26} r={6} fill="#c1aee3" />
          <circle cx={73} cy={26} r={6} fill="#e0e1e3" />
          <Ink x={103} y={34} size={22} fill="#a6a6ab" family={TEXT}>语音转文字 · 公开软件界面（独立截图）</Ink>
        </Canvas>
      </div>
      {frame >= 3777 ? <div style={{...box(0, 536, CHROME_W, 190), opacity: note,
        background: 'linear-gradient(180deg, transparent, rgba(20,22,22,.82) 55%, #161819 100%)'}} /> : null}
      {frame >= 3777 ? (
        <div data-c-transcript-annotation style={{...box(32, 538, 1648, 160), ...rise(note, 24), borderRadius: 22,
          background: 'linear-gradient(180deg, rgba(20,19,24,.88), #141318 33%)'}}>
          <Canvas width={1648} height={160}>
            <Ink x={44} y={64} size={22} fill={LAVENDER} family={MONO} weight={600}>
              VOICE-TO-TEXT · <tspan fontFamily={TEXT} fontWeight={500}>优选语音转文字</tspan>
            </Ink>
            {priceSwap < 1 ? <g opacity={1 - priceSwap} transform={`translate(0 ${-11 * priceSwap})`}>
              <Ink x={44} y={109} size={32} fill="#fff" family={TEXT} weight={900}>挑选、对比几十个开源 &amp; 闭源模型后效果最好</Ink>
            </g> : null}
            {frame >= 3925 ? <g opacity={priceSwap} transform={`translate(0 ${13 * (1 - priceSwap)})`}>
              <Ink x={44} y={109} size={32} fill="#fff" family={TEXT} weight={900}>按最新计费折算 · 转一小时音频 ≈ ¥0.10</Ink>
            </g> : null}
            {frame >= 3920 ? <g opacity={math}>
              <Ink x={1116} y={66} size={21} fill="#88878d" family={TEXT} align="end">4 分钟视频转一次字幕</Ink>
              <Ink x={1116} y={104} size={26} fill="#e1dfe8" family={MONO} weight={600} align="end">¥0.10 × (4 ÷ 60)h</Ink>
              <path d="M1153 43 V119" stroke="#373541" strokeWidth={2} />
            </g> : null}
            {frame >= 4052 ? <g opacity={result} transform={`translate(0 ${24 * (1 - result)})`}>
              <Ink x={1603} y={93} size={74} fill={LAVENDER} align="end">不到 1 分钱</Ink>
              <Ink x={1603} y={130} size={21} fill="#bdb9c5" align="end" family={MONO} weight={600}>约 ¥0.007 / 期</Ink>
            </g> : null}
          </Canvas>
        </div>
      ) : null}
    </div>
  );
};

const FACE_W = 896;
const FACE_H = 504;
const WALL_PHOTOS = [1, 3, 5, 6, 7, 8, 9, 10, 12].map((i) => `web/wall-${`${i}`.padStart(2, '0')}.jpg`);

const TileWall: FC<{recent?: boolean; full: number}> = ({recent = false, full}) => {
  const cols = recent ? 9 : 8;
  const w = recent ? 368 : 318;
  const slots = recent ? 90 : 80;
  return (
    <div style={{...box(recent ? 472 : 68, 166, w, 198), display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: 'repeat(10, 1fr)', gap: recent ? '3px 4px' : '3px 5px'}}>
      {Array.from({length: slots}, (_, index) => {
        const id = recent ? (index * 7 + Math.floor(index / 5)) % WALL_PHOTOS.length : (index * 2 + Math.floor(index / 6)) % WALL_PHOTOS.length;
        return (
          <div key={index} style={{
            background: index < full ? `#eee url("${staticFile(WALL_PHOTOS[id])}") 50% ${32 + index % 4 * 11}% / cover` : '#f6f6f8',
            opacity: index < full ? .96 - (index % 7) * .056 : .6,
            filter: !recent && index % 3 ? 'grayscale(.63)' : undefined,
            borderRadius: 1.8, marginRight: !recent && index % 2 ? 6 : undefined,
          }} />
        );
      })}
    </div>
  );
};

const WALL_REPLAY_IN = 4440;
// Read from the right numeral on every original frame f4440–4465.
const REPLAY_COUNTER = [0, 0, 0, 0, 13, 25, 36, 46, 54, 61, 66, 71, 75,
  78, 81, 83, 84, 85, 87, 87, 88, 89, 89, 89, 89, 90] as const;

const CountingTiles: FC<{frame: number}> = ({frame}) => {
  const replay = frame >= WALL_REPLAY_IN;
  const counter = Math.round(replay
    ? REPLAY_COUNTER[Math.min(frame - WALL_REPLAY_IN, REPLAY_COUNTER.length - 1)]
    : at(frame, [[4156, 0], [4161, 61], [4165, 78], [4174, 89], [4180, 90]]));
  const tileCount = Math.round(replay
    ? at(frame, [[4443, 0], [4444, 1], [4455, 27], [4472, 79], [4478, 90]])
    : at(frame, [[4157, 0], [4161, 16], [4165, 24], [4179, 81], [4184, 90]]));
  const focus = replay ? smooth(frame, 4508, 4522) : smooth(frame, 4220, 4242);
  const blur = replay ? 0 : smooth(frame, 4299, 4313);
  return (
    <div data-c-volume-graphic style={{...box(0, 0, FACE_W, FACE_H),
      transform: `translateX(${-105 * focus}px) scale(${1 + .21 * focus})`, transformOrigin: '55% 48%',
      filter: blur ? `blur(${6 * blur}px)` : undefined, opacity: 1 - .69 * blur}}>
      {WALL_PHOTOS.map(src => <Photo key={src} src={src} alt="" style={{width: 1, height: 1, opacity: 0}} />)}
      <Canvas width={FACE_W} height={FACE_H}>
        <g opacity={1 - .38 * focus}>
          <Ink x={68} y={139} size={22} fill={GRAY} family={TEXT} weight={900}>过往 4 个月</Ink>
          <Ink x={190} y={141} size={52}>80</Ink>
          <Ink x={261} y={143} size={24}>期</Ink>
          {[0, 1, 2, 3].map(i => <path key={i} d={`M${68 + 82 * i} 368 h61`} stroke="#dddde2" strokeWidth={1.7} />)}
        </g>
        <Ink x={472} y={139} size={22} family={TEXT} weight={900} fill={PURPLE}>最近 1 个月</Ink>
        <Ink x={591} y={141} size={52} fill={PURPLE}>{counter}</Ink>
        <Ink x={659} y={143} size={24} fill={PURPLE}>期</Ink>
        <path d="M472 368 H840" stroke={PURPLE} strokeWidth={2.7} />
        <Ink x={656} y={395} size={18} align="middle" family={TEXT} weight={900} fill={PURPLE}>一个月 90 期</Ink>
        <Ink x={840} y={408} size={12} align="end" family={TEXT} fill="#9a9a9f">示例封面</Ink>
      </Canvas>
      <div style={{opacity: 1 - .58 * focus}}><TileWall full={80} /></div>
      <TileWall recent full={tileCount} />
    </div>
  );
};

const VoiceCase: FC<{frame: number; entry: number}> = ({frame, entry}) => {
  const replay = frame >= WALL_REPLAY_IN;
  const oldCut = frame >= 4402 && !replay;
  const slogan = frame >= 4302 && frame < 4407;
  const sloganIn = at(frame, [[4301, 0], [4304, .19], [4308, .75], [4313, 1], [4399, 1], [4403, .49], [4407, 0]]);
  const mark = settle(frame, 4345, 4355);
  const dataAlpha = oldCut ? 1 - settle(frame, 4401, 4409) : 1;
  const mediaAlpha = oldCut ? settle(frame, 4401, 4409) : 0;
  const sampleCaption = oldCut ? '示例画面切换' : slogan ? '字幕高亮示例' :
    (frame >= 4218 && !replay) || frame >= 4520 ? '预览动效已就绪' : '缩略图逐项进场';
  return (
    <div style={{...box(104, 184, FACE_W, FACE_H), borderRadius: 26, background: '#fff',
      boxShadow: MEDIA_SHADOW, overflow: 'hidden', opacity: entry}}>
      {!oldCut || dataAlpha > 0 ? <div style={{opacity: dataAlpha}}><CountingTiles frame={frame} /></div> : null}
      {oldCut ? (
        <div data-c-old-output style={{...box(166, 73, 564, 312), borderRadius: 7, overflow: 'hidden',
          boxShadow: '0 14px 33px rgba(25,25,27,.30)', opacity: mediaAlpha}}>
          <Photo src={WEB.output} alt="Demo 官网独立公开视频，聊天记忆实际演示页"
            style={{filter: 'brightness(.87) saturate(.55)', objectPosition: '50% 44%'}} />
        </div>
      ) : null}
      <div data-c-case-tag style={{...box(14, 15, 303, 36), borderRadius: 7, background: '#373739',
        display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff',
        font: `900 21px/1 ${TEXT}`, letterSpacing: '.15px'}}>优选声音复刻 · 真实成片输出</div>
      {slogan ? (
        <Canvas width={FACE_W} height={FACE_H} style={rise(sloganIn, 34)}>
          <Ink x={448} y={265} size={81} align="middle">量变堆起<tspan fill={PURPLE}>质变</tspan></Ink>
        </Canvas>
      ) : null}
      {slogan && mark > 0 ? <Stamp size={58} style={{...box(708, 144, 58, 58),
        opacity: sloganIn * mark, transform: `scale(${.76 + .24 * mark})`}} /> : null}
      <InsetCaption text={sampleCaption} width={FACE_W} top={448} size={26} />
    </div>
  );
};

export const VoiceCloning: FC<{frame: number}> = ({frame}) => {
  if (frame < 4157 || frame >= 4522) return null;
  const entry = at(frame, [[4156, 0], [4158, .22], [4161, .65], [4165, .96], [4171, 1]]);
  const offset = at(frame, [[4157, 112], [4161, 60], [4165, 11], [4170, 0]]);
  const exit = at(frame, [[4507, 0], [4511, .06], [4515, .13], [4518, .29], [4521, .55]]);
  const input = settle(frame, 4221, 4235);
  const price = settle(frame, 4315, 4330);
  const fee = at(frame, [[4404, 0], [4405, .24], [4407, .93], [4411, 1]]);
  return (
    <AbsoluteFill data-c-stage="voice-cloning" style={{
      transform: `translateX(${offset - 79 * exit}px) scale(${1 - .027 * exit})`, opacity: 1 - exit,
    }}>
      <VoiceCase frame={frame} entry={entry} />
      <Canvas style={{opacity: entry}}>
        <Ink x={1054} y={214} size={25} fill={PURPLE} family={MONO} weight={600}>VOICE CLONING · <tspan fontFamily={TEXT} fontWeight={500}>优选声音复刻</tspan></Ink>
        <Ink x={1060} y={340} size={120}>¥8</Ink>
        <Ink x={1233} y={338} size={38} fill={GRAY} family={TEXT} weight={900}>/ 万字</Ink>
        {frame >= 4222 ? <g opacity={input} transform={`translate(0 ${20 * (1 - input)})`}>
          <path d="M1057 413 V515" fill="none" strokeWidth={3.5} stroke={INK} />
          <Ink x={1086} y={438} size={27} fill={GRAY} family={TEXT} weight={900}>一期 3–5 分钟口播（含偶尔补录）</Ink>
          <Ink x={1096} y={500} size={54}>x</Ink>
          <Ink x={1167} y={500} size={54}>1,500 – 2,000 字</Ink>
        </g> : null}
        {frame >= 4316 ? <g opacity={price} transform={`translate(0 ${25 * (1 - price)})`}>
          <path d="M1056 561 H1817" stroke="#dedee4" strokeWidth={1} strokeDasharray="4 4" />
          <Ink x={1055} y={667} size={32} fill={GRAY} family={TEXT} weight={900}>单期配音费</Ink>
          <Ink x={1814} y={668} size={88} fill={PURPLE} align="end">¥1.2–1.6</Ink>
        </g> : null}
      </Canvas>
      {frame >= 4405 ? (
        <div data-c-audio-total style={{...box(104, 730, 1712, 142), ...rise(fee, 19), background: INK,
          borderRadius: 25, boxShadow: SOFT_SHADOW}}>
          <Canvas width={1712} height={142}>
            <Ink x={57} y={83} size={33} fill="#fff" family={TEXT} weight={900}>语音转文字（&lt;¥0.01） + 声音复刻（≈¥1.5）</Ink>
            <Ink x={935} y={102} size={32} family={TEXT} weight={900} fill="#c9c9cc">整期声音成本</Ink>
            <Ink x={1658} y={106} size={93} fill={LAVENDER} align="end">不到 2 块钱</Ink>
          </Canvas>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export { TileWall };
