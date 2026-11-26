# OrenCut

**OrenCut Studio 有 33 个静音视频动效。** 按编号挑选组件，直接在浏览器预览、改标题或导出 MP4。

[打开 Studio](https://orenfang.github.io/orencut/studio.html) · [下载 27 号试用](https://github.com/OrenFang/orencut/releases/download/studio-v0.2.0/orencut-27.zip) · [下载接口](STUDIO-API.md) · [安装到 Codex](#在-codex-中使用)

![OrenCut 动效演示](docs/orencut-showcase.gif)

<details>
<summary>查看六张组件截图</summary>

![OrenCut 组件截图](docs/orencut-gallery.jpg)

</details>

## 动效一览

| 分类 | 数量 | 看片段 |
| --- | ---: | --- |
| 缩略图墙与选中卡移动 | 5 | [23 · 斜向缩略图墙分排滑动，标题逐字落下](previews/23.mp4) |
| 章节落版与双行大字 | 6 | [05 · 黑栏推进、紫色大章节号落下、白页标题揭示](previews/05.mp4) |
| 滚数、环形进度与图表 | 11 | [27 · 竖屏蓝白斜体大数字滚到 1000，黄签补入](previews/27.mp4) |
| 素材缩窗、文件聚焦与空间定位 | 6 | [19 · 地图固定，楼层与 L3 金签逐层定位](previews/19.mp4) |
| 列表、引文与投票逐项揭示 | 5 | [29 · 竖屏流程卡依次打勾，红章落下](previews/29.mp4) |

在 Studio 选中组件后，可下载单个 ZIP。解压后用新版桌面 Chrome 或 Edge 打开 `index.html`，组件画面和导出工具已随包提供。

## 在 Codex 中使用

下载或克隆仓库，将整个文件夹命名为 `orencut`。放到项目的 `.agents/skills/orencut/`，或放到 `~/.agents/skills/orencut/` 供所有项目使用。技能入口是 [SKILL.md](SKILL.md)。

> 用 $orencut 的 27 号滚数动效做一个竖屏片段。数字滚到 256，保留蓝白渐变，换成我的标题，输出静音 MP4。

## 在 Studio 使用

1. 搜索组件编号或按分类浏览，播放原始动效。
2. 填写自己的标题。一般组件可选择标题位置，27 号可改滚数目标、单位和补充说明。
3. 点 **导出 MP4**。用默认设置会直接保存原始静音 MP4。修改后由浏览器本地编码。

AI 可以读取 [组件目录 JSON](https://orenfang.github.io/orencut/catalog.json)，按 `id` 使用 `studioUrl`、`downloadUrl` 或 `previewUrl`。浏览器自动化方法见 [Studio 下载接口](STUDIO-API.md)。

## 开发原场景

原场景在 `src/scenes/`。已有完整工程素材的维护者可按 [原素材导入说明](VISUAL-ASSETS.md) 打开原工程。

## 许可证

项目代码采用 [MIT](LICENSE)。本地导入的字体和第三方画面适用各自的许可证。
