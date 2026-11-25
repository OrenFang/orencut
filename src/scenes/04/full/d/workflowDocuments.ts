/*
MIT License

Copyright (c) 2026 FredTalk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// FredTalk 2.5 public document excerpts, in left-to-right display order.
// sha256 is for the complete upstream UTF-8 file; url points to the exact excerpt.
export const workflowDocuments = [
  {
    filename: "SKILL.md",
    caption: "剪辑规则（公开节选）",
    url: "https://github.com/njrhts2kvv-star/FredTalk/blob/59b9e9957957dc9f3fd94ab78f95cec33c29e915/skills/fred-remotion-output/SKILL.md#L16-L79",
    sha256: "65acc98fba444e140d1a9e8367c22c6838503322157da3e8e7a068d3de590418",
    lines: [
      "## 先验收组件，再交付建议或关键帧",
      "",
      "**2026-10-03 Fred确认：Remotion画面只能准确复用已认可组件，或基于已认可组件二创。默认禁止脱离组件库原创。** 只有当次明确授权原创才可例外；“直接输出”“不用等我确认”不等于原创授权。此规则覆盖历史资料中“没有合适参考可原创”的旧默认。",
      "",
      "**2026-10-13 Fred确认：默认允许“场景级定制”。** 113、114 期能做到 90–95 分，靠的是为本期内容重写场景，而不是把组件原样串起来。“二创”的范围据此明确为：",
      "- **默认允许**：每段场景代码为本期重写；把已认可组件拆开，只取它的动作、对象关系或几何，改时序、删掉它自带的开场和收尾，为接缝重新衔接；多个组件的动作组合成一段。底层（kit 的字体、颜色、阴影、缓动、光标、字幕、角标、音效、坐标映射）必须照用，不手写近似值。每个场景文件第一行注释写明动作来自哪个组件。",
      "- **仍然禁止**：纯大字页、通用模板、找不到任何来源动作的新视觉风格、违反 DESIGN.md 的写法。这些仍需当次授权。",
      "- **公共组件入库仍需 Fred 认可**。本期场景只服务本期；同类需求再次出现，才按[新做组件流程](references/new-component-workflow.md)提炼成公共组件。",
      "- 怎样做出这种质量见[整期编排](references/episode-assembly.md)第 0 节。",
      "",
      "给出逐段建议前、交付真实关键帧前，必须分别通过[组件库交付门禁](references/library-delivery-gate.md)。先检索并看准确参考，再选型和实现；不先写通用模板、后补参考编号。二创要保留可辨认的核心构图、对象关系或动作逻辑，不能只借字体/颜色/圆角。没有合适组件就报告“待选组件”及缺口，不擅自退成原创文字页。",
      "",
      "验收由助手内部完成，不新增Fred审批。建议检查真实候选和表达匹配；关键帧另检查来源源码→本期函数→真实调用→输出画面。两阶段均记录具体审看结论与当前文件证据；技术可用不替代视觉验收。`library_gate.py`未PASS不得交付对应建议或关键帧；公共生成器自动拦截，自定义前端和聊天建议也必须运行同一门禁。真实录屏/图片/已有视频、B-roll独立流程、固定字幕角标及明确录屏占位不受原创限制，但不能用这些类别掩盖新Remotion设计。旧成片不追溯改造；今后重新出建议/关键帧时按当前实际范围验收，不刷新旧认可。",
      "",
      "把逐字稿讲清楚，延续 Fred 已认可的动画质量。先判断当前阶段，只读该阶段与当前场景资料；完整说明和历史规则留到审计/维护时看。",
      "",
      "正文组件/正文文字动效、项目Remotion技术参考与旧Deck总编排已收为[内部模块](references/internal-modules.md)，不再作为独立日常制作入口。只用一份当前Manifest和同一前端；复刻、云端渲染保持独立。视觉库与制作检索共用[六类制作用途](references/visual-usage.md)、多用途标签和独立来源筛选。`references.py --use explain --source ep107` 可按任务与来源检索；单场景包带出实际输入、动作、原片时长与适配范围。前端默认先看视觉库；[字体与字阶](references/typography.md)绑定真实字体与职责。先核对准确视频、接口及依赖，再保留本期需要的完整动作。",
      "",
      "## 每段先看候选，再定画面",
      "",
      "Codex/助手常见问题是只用熟悉的两三个组件、或直接写大字页。每个需要画面的段落按下面顺序做，不跳步：",
      "",
      "1. 在 Manifest 写 `componentPlan.query`：本段画面里**看得见的对象和动作**（例如“两个工具价格并排对比、数字落定”），不是照抄旁白。",
      "2. 运行 `scene.py --manifest <path> --scene-id <id> --candidates-only`：给出按画面描述检索的 5 个候选，以及按旁白检索的 `narrationCandidates`。同类型不足时会跨类型补位并标注 `sameSceneType`。",
      "3. 逐个看候选的准确视频或核心帧（`references.py --id <id> --full`），再按内容决定。前 3 个候选必须在 `componentPlan.candidates` 记录 `selected/rejected` 和具体理由；`library_gate.py --stage suggestion` 会重算并拦截漏记。原创授权段也要先比较。",
      "4. 候选都不合适：先换个说法再查（拆成对象＋动作、换 `--use`），仍没有就报告缺口，不退成纯大字页。",
      "",
      "按内容先查哪里（起点，不是固定搭配）：",
      "",
      "| 口播在讲 | 先试 |",
      "| --- | --- |",
      "| 一句结论、关键词 | `--query 关键词 一句话`；多篇新闻反复出现同一个词用 NMC01 |",
      "| 列举几个要点、能力 | `--query 要点 列表`、`--query 卡片 分类` |",
      "| 步骤、流程、因果、架构 | `--query 流程 步骤`、`--query 分支 关系` |",
      "| 两者对比、以前和现在 | `--query 对比 区别`、`--query 版本` |",
      "| 输入提示词、聊天、回复 | INT03（Codex 操作）、INT04（可编辑微信）、CAM04；`--query 输入 发送` |",
      "| 截图或文章里的某句话 | INT01（荧光笔）、INT02（蒙版聚焦）；`--use recording-focus` |",
      "| 真实录屏操作 | CAM01–CAM05、`--use video-entry`；全屏播放用默认大播放组件 |",
      "| 作品、多图、结果图 | `--use images` |",
      "| 数字、价格、图表 | `--use data`、`--query 数据 增长`；这类组件很少，没有合适的就如实报告缺口 |",
      "| 章节、转场、下一段 | `--use handoff`、`--query 转场` |",
      "",
      "## 默认协作顺序",
      "",
      "**稿件/可选录音 → 助手逐段图文建议 → Fred选方向 → 真实组件关键帧 → Fred提意见并确认 → 助手内部检查动态 → 完整视频 → 按意见局部返修。**",
      "",
      "- 第一版页面就给有内容的建议：这句准备怎样讲、为什么适合、参考图片或可播放片段。能用准确库组件表达时先展示真实效果；需要新构图才生分镜图，不把空白设计任务交回 Fred。",
      "- 方向确定后先实现足以渲染的真实组件，用本期文字/媒体和适用的角标/字幕出关键帧。关键帧用于改排版、主次、尺度、可读性和遮挡；随后内部看短动画、声音与接缝，再出完整视频。默认不额外等待一轮用户动态样片批准。",
      "- 同一前端持续展示建议、关键帧与视频，保留版本和意见。默认用[公共审看模板](references/segment-review.md#公共模板默认)的初始化/更新/启动脚本，只换本期Manifest和媒体；音频模块沿用音频Skill公共台，不逐期重写页面。`assets/review-example-ep108/START.py`可直接打开108前7段61.47秒真实内容示例，含口播、字幕、关键帧及视频；它是可替换的示例数据，非固定每期画面方案。数量由内容决定，不固定九宫格、140张、组件配额或切镜频率。完整工作方式和字段见[路线、关键帧与确认](references/route-and-storyboard-review.md)。",
      "- 已有明确方向/关键帧确认不重复问；局部返修只处理受影响内容。当前直出授权可覆盖用户审看步骤，记录真实来源与未审看范围；内部技术检查和必要动态检查仍执行，不把输出授权写成样片认可。出关键帧还是直接出片，按 Fred 当次要求执行，不额外提醒或劝阻（2026-10-12 Fred 明确）；没有说明时按上面的默认顺序先出关键帧。",
      "- **把组件串成整期**（分段工程、录屏包装、段间交接表、全片去重、强调方式、渲染前动态自检）按[整期编排](references/episode-assembly.md)执行。给写分段代码的子任务的简报必须带上它的第2–7节和本期交接表。工程结构直接用[整期骨架](templates/episode-skeleton/README.md)（时间轴、段外壳、交接几何、分块渲染、音频和 BGM、推前端）；交付前按整期编排第 12 节检查。",
      "",
      "## 做一整期视频：最短路径",
      "",
      "Fred 说“直接做视频”“直接出片”时，按下面这条路做。它是把 116–121 期的做法整理出来的（成对样例、`readability_audit` 和骨架里的 episode-kit 是 2026-10-15 才补上的）。开头“先验收组件”一节的门禁照常执行，一步都不省；但门禁只证明来源合规，**不证明画面好**，质量要靠第 1、3、5、6 步：",
      "",
      "1. **先看[好坏成对样例](references/paired-examples.md)**：同一句口播做对和做错各长什么样。",
      "2. **工程从[整期骨架](templates/episode-skeleton/README.md)拷**，共享件直接用骨架的 `src/components/episode-kit/`（真实比例 Codex 框、黑胶囊、毛玻璃、章节头与章节过渡、大播放窗片段），只换本期常量。",
      "3. **写整期简报**：按[简报模板](templates/episode-assembly-brief.md)逐句填动作表（对象 → 变化 → 证据在哪 → 观众看哪 → 交给谁）和交接表，过完五条自查再写代码。整期简报（分段方案、交接表、全片规则）的范例：[120 期](templates/examples/brief-ep120.md)、[121 期](templates/examples/brief-ep121.md)。",
      "4. **逐段选组件并过门禁**：按上面“每段先看候选，再定画面”写 `componentPlan`，跑 `scene.py --candidates-only`，`library_gate.py` 在建议阶段和关键帧阶段都必须 PASS。",
      "5. **场景为本期重写**：拆已认可组件的动作，每个场景第一行注释写动作来源；范例场景在 `templates/examples/scene-*.tsx`（只供阅读）。",
      "6. **先做一段对照，再铺全片**；每段出关键帧和中间态，**自己逐张看图**，问题写到段号和秒数。",
      "7. **1080p 预览后跑 `motion_audit.py` 和 `readability_audit.py`**，接缝每 4 帧拼一张图看；视觉验收和技术验收分开写。",
      "8. 按[整期编排](references/episode-assembly.md)第 12 节做交付前检查，再出 4K60。",
    ],
  },
  {
    filename: "production-gates.md",
    caption: "制作检查清单（公开节选）",
    url: "https://github.com/njrhts2kvv-star/FredTalk/blob/59b9e9957957dc9f3fd94ab78f95cec33c29e915/skills/fred-remotion-output/references/production-gates.md#L7-L32",
    sha256: "691531099489f11348fafd54692aedd685795966f9519f602593c960ef0fe07b",
    lines: [
      "## 强制和建议的边界",
      "",
      "| 项目 | 级别 | 规则 |",
      "| --- | --- | --- |",
      "| 每个场景选择实现模式 | 强制 | `reference`、`adapted`、`original`、`preserved-media`、`talk-only` 五选一 |",
      "| 每个场景有案例归因或原创说明 | 强制 | 有代码借用用 `referenceChoices`；没有代码借用用 `referenceDisposition`，不能留空 |",
      "| 原创视觉场景的风格合同 | 强制 | 要有锚点或明确 `styleTrack`、`styleContract`、`newElements`、`risks`，并 `reviewRequired: true` |",
      "| 真实录屏/图片的来源 | 强制 | `mediaContract` 记录路径、角色，进入实现门时记录 hash |",
      "| 动态/阅读静止声明 | 强制 | `dynamicContract.mode` 必须是 `dynamic`、`mixed` 或 `stable-reading`；静止必须有理由 |",
      "| 案例数量 | 建议 | 通常选择 1–3 个最接近的锚点；不要求每个镜头使用案例，也不要求把所有案例做一遍 |",
      "| 新原创组件进入公共库 | 建议后置 | 先标 `episode-original`；跨期复用并通过维护审查后再升为 `candidate`/`approved` |",
      "| 用户审看范围 | 按当前工作方式 | `fred-video-v2`默认确认真实关键帧后由助手内部检查动态，不再等用户动态样片批准；明确`direct-output`可覆盖用户等待，内部代表镜头和技术门禁仍执行 |",
      "",
      "## 四种内容实现路线",
      "",
      "### `reference` / `adapted`",
      "",
      "`reference` 是准确复用，`adapted` 是保留动作关系后替换内容、媒体、数量或时序。两者都必须在实现门记录：",
      "",
      "- `reason`：本段为什么需要这个关系；",
      "- `preserve`：实际保留的可观察动作；",
      "- `change`：本期真正改动的内容；",
      "- `useScope`：本期使用区间；",
      "- `source`、`implementation`、`callSite`：准确路径、hash、symbol。",
      "",
      "不能用一个无关编号给原创代码背书。",
    ],
  },
  {
    filename: "README.md",
    caption: "工作流说明（公开节选）",
    url: "https://github.com/njrhts2kvv-star/FredTalk/blob/59b9e9957957dc9f3fd94ab78f95cec33c29e915/README.md#L126-L134",
    sha256: "05558ca68271dd39cde0ff8f59af714153e7132c26ac185e3c37968f252e546a",
    lines: [
      "## 使用 Skill",
      "",
      "在下载好的仓库中，让 Codex 或其他编程 Agent 读取 [`skills/fred-remotion-output/SKILL.md`](skills/fred-remotion-output/SKILL.md)。保留仓库目录结构，方便 Agent 找到组件、素材和工具。",
      "",
      "可以从这句话开始：",
      "",
      "> 请读取 `skills/fred-remotion-output/SKILL.md`。这是我的口播稿、录音和素材。请根据每段内容，从视觉库选择合适的组件，展示参考并说明理由。方向确定后，生成真实内容关键帧供我检查，再继续制作视频。",
      "",
      "音频和字幕处理入口：[`audio-subtitle-roughcut`](skills/audio-subtitle-roughcut/SKILL.md)。",
    ],
  },
] as const;
