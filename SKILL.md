---
name: orencut
description: Build or adapt silent Remotion motion scenes using 33 editable examples for thumbnail walls, animated titles, numerical charts, spatial indicators, and list reveals. Use when a video motion design calls for one of these effects or the user asks to use the OrenCut library.
---

# OrenCut

Use [the preview gallery](index.html) to match the requested movement and layout. Use [the catalog](src/catalog.json) to find the clip ID, orientation, frame rate, duration in frames, and scene function. Read the selected TSX source when changing the markup, animation, or timing.

- For the entire effect, import `MotionClip` from `src/library.tsx`. Use a parent Remotion composition at the catalog frame rate and the matching size of 1920×1080 landscape or 1080×1920 portrait. Use `frames` for the length of its sequence. `MotionClip` maps the local timeline to the source window, so the effect starts at its correct animation state.
- For one layer, use the catalog's source entry to locate the exported component. Check its props and whether it expects the local or source frame before moving it into another composition.
- Scene media and fonts use the assets listed in each scene. A source-only checkout needs the matching local editable archives before running Studio or rendering. Follow the asset import command in README.md, and use the existing silent previews when browsing the catalog.

For installation, Studio, and render commands, see [README.md](README.md). Check the opening, key transitions, and end of the relevant preview after adapting it.
