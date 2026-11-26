---
name: orencut
description: Find, download, preview, and export one of 33 silent OrenCut video effects. Use when the user names OrenCut, requests a component by number, or asks to adapt one of its catalog effects.
---

# OrenCut

1. Read [catalog.json](catalog.json) or the [public catalog](https://orenfang.github.io/orencut/catalog.json). Match the requested component by `id` first, then `title` or `keywords` if no number was given.
2. Provide `downloadUrl` for that one ZIP. To use it, open `studioUrl` or extract the ZIP and open `index.html` in desktop Chrome or Edge. Both open the selected component with its media included.
3. Apply the fields declared in `inputs`. Most components accept an overlaid title and position. Component 27 accepts a title, target number, unit, and caption as editable layers.
4. Click **导出 MP4** or call `window.orencutStudio.downloadMp4(inputs)` from the loaded Studio when browser automation is available. Use `previewUrl` if the user wants the unchanged native clip. Confirm the downloaded file before reporting an export as complete.
