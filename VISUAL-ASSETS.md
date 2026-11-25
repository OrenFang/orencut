# 本地导入画面素材

浏览器预览可直接播放。要在 Remotion Studio 中打开相同画面，先准备这 33 个组件对应的 10 个可编辑工程 ZIP，再安装 Python 3、FFmpeg 和 ffprobe。

```sh
python3 scripts/import-visual-assets.py /本地/可编辑工程目录
npm ci
npm run studio
```

可传入多个目录或单独的 ZIP 路径。导入器按 SHA-256 核对 ZIP，文件名可自定。它会恢复版式使用的原字体、图片和无声视频，并把素材的许可说明保存在本地 `licenses/`。画外音和其他音频轨不会导入。

素材目录随本地工作副本使用，素材仍适用各自的许可。
