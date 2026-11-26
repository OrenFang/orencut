# 本地导入画面素材

这套流程供维护原场景的开发者使用。客户可直接打开 [OrenCut Studio](https://orenfang.github.io/orencut/studio.html)，使用已经随组件发布的画面。

要打开旧场景的完整 Remotion 工程，准备 10 个原工程 ZIP 和 Python 3、FFmpeg、ffprobe。

```sh
python3 scripts/import-visual-assets.py /本地/可编辑工程目录
npm ci
npm run studio:original
```

可传入多个目录或单独的 ZIP 路径。导入器按 SHA-256 核对 ZIP，文件名可自定。它会恢复版式使用的原字体、图片和无声视频，并把素材的许可说明保存在本地 `licenses/`。画外音和其他音频轨不会导入。

素材目录随本地工作副本使用，素材仍适用各自的许可。
