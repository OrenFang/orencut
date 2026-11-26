# 单组件下载接口

从 [catalog.json](https://orenfang.github.io/orencut/catalog.json) 读取 `components`。每项有稳定的两位 `id`、标题、尺寸、帧率、输入定义和以下三个地址。

| 字段 | 用途 |
| --- | --- |
| `studioUrl` | 直接在浏览器打开这个组件 |
| `downloadUrl` | 这个组件自己的 ZIP，解压后打开 `index.html` |
| `previewUrl` | 原始静音 MP4，可直接用作剪辑素材 |

有浏览器自动化时，打开 `studioUrl`，等待 `window.orencutStudio` 可用，再调用以下方法。

```js
await window.orencutStudio.downloadMp4({
  title: '如果今天从 0 开始，30 岁的我会怎么做',
  endValue: 30,
  unit: '岁',
});
```

该示例适用于 27 号。其它组件按自己的 `inputs` 字段设置参数。一般组件可加标题并调整位置，27 号可直接改标题、滚数目标、单位和补充说明。

`renderMp4(inputs)` 只返回 `Blob`，便于嵌入自己的浏览器工作流。修改后的 MP4 使用浏览器的 H.264 编码器，推荐最新版桌面 Chrome 或 Edge。用默认设置导出会直接保存组件内的原始 MP4。
