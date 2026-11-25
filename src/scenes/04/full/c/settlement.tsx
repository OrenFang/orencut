import {Fragment, type FC} from 'react';
import {AbsoluteFill} from 'remotion';
import {at, box, Canvas, DISPLAY, GRAY, Ink, INK, LAVENDER, MONO, PURPLE, rise, settle, SOFT_SHADOW,
  Stamp, TEXT} from './stage';

const RECEIPT_W = 831;
const RECEIPT_H = 807;
const ROWS = [
  {at: 4841, id: '01', title: '账号订阅均摊', note: 'Claude $200÷104 + Codex ¥1', cost: '¥13.8', small: '约 13.8 元'},
  {at: 4895, id: '02', title: '云端渲染 4090', note: '¥2.15/h × 0.5h', cost: '¥1.1', small: '约 1.1 元'},
  {at: 4955, id: '03', title: '声音与字幕', note: '优选转字幕 + 声音复刻', cost: '¥1.5', small: '约 1.5 元'},
  {at: 5002, id: '04', title: '其他杂项均摊', note: '封面 / 素材 / 存储', cost: '¥2.5', small: '2–3 块'},
] as const;

const Receipt: FC<{frame: number}> = ({frame}) => {
  const entry = at(frame, [[4762, 0], [4764, .27], [4767, .57], [4770, .79], [4776, .988], [4780, 1]]);
  const travel = at(frame, [[5050, 0], [5052, .04], [5055, .22], [5058, .53], [5059, .689],
    [5061, .79], [5064, .90], [5067, .967], [5071, .995], [5074, 1]]);
  const sum = at(frame, [[4839, 0], [4841, 0], [4842, 13.8], [4894, 13.8], [4895, 13.8], [4896, 14.9],
    [4954, 14.9], [4955, 14.9], [4956, 16.4], [5001, 16.4], [5004, 18.1], [5007, 18.7], [5010, 18.9]]);
  const approved = settle(frame, 5126, 5135);
  return (
    <div data-c-stage="receipt" data-c-receipt-total={sum.toFixed(1)} style={{
      ...box(544 - 440 * travel, 124 + 56 * (1 - entry), RECEIPT_W, RECEIPT_H), borderRadius: 26,
      background: '#fff', boxShadow: '0 23px 64px rgba(0,0,0,.18)', opacity: entry,
    }}>
      <Canvas width={RECEIPT_W} height={RECEIPT_H}>
        <Ink x={47} y={78} size={36} family={TEXT} weight={900}>AI 视频单期成本小票</Ink>
        <Ink x={47} y={111} size={21} fill="#a1a1a6" family={MONO} weight={600}>3–5 分钟成片 · 近一个月 104 条产量均摊</Ink>
        <path d="M47 138 H785 M47 668 H785" stroke="#dadadd" strokeWidth={1.4} strokeDasharray="5 4" />
        {ROWS.map((row, i) => {
          if (frame < row.at) return null;
          const p = at(frame, [[row.at - 1, 0], [row.at, .16], [row.at + 2, .58], [row.at + 5, .91], [row.at + 9, 1]]);
          return (
            <g key={row.id} data-c-cost-row={row.id} opacity={p} transform={`translate(47 ${160 + i * 126 + 21 * (1 - p)})`}>
              <rect width={738} height={109} rx={20} fill="#f6f6f8" />
              <Ink x={22} y={64} size={22} fill={PURPLE} family={MONO} weight={600}>{row.id}</Ink>
              <Ink x={67} y={50} size={32} family={TEXT} weight={900}>{row.title}</Ink>
              <Ink x={67} y={82} size={21} fill={GRAY} family={MONO} weight={600}>{row.note}</Ink>
              <Ink x={717} y={60} size={46} align="end">{row.cost}</Ink>
              <Ink x={716} y={84} size={21} fill="#99999d" family={TEXT} weight={900} align="end">{row.small}</Ink>
            </g>
          );
        })}
        <Ink x={47} y={750} size={32} fill={GRAY} family={TEXT} weight={900}>四项精确合计</Ink>
        <Ink x={786} y={750} size={65} fill={PURPLE} align="end">{`¥${sum.toFixed(1)} / 期`}</Ink>
      </Canvas>
      {frame >= 5127 ? <Stamp size={84} style={{...box(724, 29, 84, 84), opacity: approved,
        transform: `translateY(${-17 * (1 - approved)}px) scale(${.73 + .27 * approved})`}} /> : null}
    </div>
  );
};

const GLYPHS = [
  {ink: '不', x: 986, from: 5122, drop: 115, color: INK},
  {ink: '到', x: 1151, from: 5124, drop: 138, color: INK},
  {ink: '2', x: 1407, from: 5127, drop: 177, color: PURPLE},
  {ink: '0', x: 1506, from: 5129, drop: 193, color: PURPLE},
  {ink: '块', x: 1691, from: 5131, drop: 178, color: INK},
] as const;

const Conclusion: FC<{frame: number}> = ({frame}) => {
  if (frame < 5056) return null;
  const eyebrow = settle(frame, 5055, 5072);
  const formula = settle(frame, 5125, 5136);
  const total = at(frame, [[5163, 0], [5164, .23], [5166, .75], [5169, .93], [5175, 1]]);
  const tail = settle(frame, 5213, 5225);
  return (
    <AbsoluteFill data-c-stage="conclusion">
      <Canvas>
        <g opacity={eyebrow} transform={`translate(${34 * (1 - eyebrow)} 0)`}>
          <Ink x={985} y={194} size={41} fill={GRAY} family={TEXT} weight={900}>一期 3–5 分钟高质量 AI 视频</Ink>
        </g>
        {frame >= 5123 ? (
          <text aria-label="不到 20 块" y={372} fontSize={166} fontFamily={DISPLAY}>
            {GLYPHS.map(({ink, x, from, drop, color}, i) => {
              if (frame <= from) return null;
              const p = settle(frame, from, from + 11);
              return <Fragment key={ink}>{i === 2 || i === 4 ? ' ' : null}
                <tspan x={x} y={372 - drop * (1 - p)} fill={color} opacity={Math.min(1, .48 + .66 * p)}>{ink}</tspan>
              </Fragment>;
            })}
          </text>
        ) : null}
        {frame >= 5126 ? <g opacity={formula}>
          <Ink x={985} y={443} size={24} fill="#98989d" family={MONO} weight={600}>
            13.8 + 1.1 + 1.5 + 2.5 = ¥18.9 / 期（折合每分钟约 ¥4.7）
          </Ink>
        </g> : null}
      </Canvas>
      {frame >= 5164 ? (
        <div data-c-final-total style={{...box(985, 494, 846, 258), ...rise(total, 40), borderRadius: 26,
          background: INK, boxShadow: SOFT_SHADOW}}>
          <Canvas width={846} height={258}>
            <Ink x={43} y={62} size={27} fill="#bfc0c4" family={TEXT} weight={900}>精确核算单期成本</Ink>
            <Ink x={42} y={134} size={55} fill="#fff">大概 <tspan fill={LAVENDER}>19 块钱</tspan> 左右</Ink>
            <Ink x={806} y={78} size={24} fill="#b1b1b7" family={MONO} weight={600} align="end">精确 ¥18.9 / 期</Ink>
            <Ink x={806} y={115} size={24} fill="#b1b1b7" family={MONO} weight={600} align="end">每分钟约 ¥4.7</Ink>
            {frame >= 5214 ? <g opacity={tail} transform={`translate(0 ${12 * (1 - tail)})`}>
              <path d="M43 165 H804" stroke="#303032" strokeWidth={2} />
              <Ink x={43} y={214} size={31} fill={LAVENDER} family={TEXT} weight={900}>落在 15–20 元区间</Ink>
              <Ink x={806} y={209} size={21} fill="#a6a6ab" family={MONO} weight={600} align="end">Claude / Gemini $200 同价热备</Ink>
            </g> : null}
          </Canvas>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export const Settlement: FC<{frame: number}> = ({frame}) => frame < 4763 ? null : (
  <>
    <Receipt frame={frame} />
    <Conclusion frame={frame} />
  </>
);

export { Receipt, Conclusion };
