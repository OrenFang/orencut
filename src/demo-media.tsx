import React from 'react';
import { Img, staticFile } from 'remotion';

export function demoAsset(path: string) {
  const purpose = path.toLowerCase();
  const themes: ReadonlyArray<readonly [RegExp, string]> = [
    [/phone|mobile|vertical|portrait|appstore/, 'phone'],
    [/map|globe|world|location/, 'map'],
    [/timeline|kdenlive|davinci|wave|audacity|editing/, 'timeline'],
    [/code|typed|console|cursor|screenshot/, 'code'],
    [/\.mp4$|photo|street|capitol|city|portrait|scene|office|landscape|stage|building|wallpaper/, 'photo'],
    [/release|notice|prospectus|paper|filing|article|typora|document|press|legal|report|pdf/, 'document'],
    [/ranking|financial|dark|night|graph/, 'data-dark'],
    [/chart|dashboard|stats|metric|board|repo/, 'dashboard'],
    [/cover|poster|thumb|background|bg-|wall/, 'cover'],
  ];
  const selected = themes.find(([test]) => test.test(purpose));
  return staticFile(`illustrations/${selected?.[1] ?? 'app'}.svg`);
}

export function DemoImage({ src, style, className, id, alt }: {
  src: string;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  alt?: string;
  [unusedProp: string]: unknown;
}) {
  return <Img src={src} style={style} className={className} id={id} alt={alt ?? ''} />;
}
