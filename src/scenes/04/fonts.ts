import {useLayoutEffect} from 'react';
import {staticFile, useDelayRender} from 'remotion';

export const FT_FONTS = {
  display: 'FT Display',
  text: 'FT Text',
  caption: 'FT Caption',
  mono: 'FT Mono',
} as const;

const faces = [
  [FT_FONTS.display, '400', 'RuiZi.ttf'],
  [FT_FONTS.text, '400', 'MiSans-Regular.otf'],
  [FT_FONTS.text, '500', 'MiSans-Medium.otf'],
  [FT_FONTS.text, '600', 'MiSans-Semibold.otf'],
  [FT_FONTS.text, '900', 'MiSans-Heavy.otf'],
  // The outlines already lean; do not synthesize another slant.
  [FT_FONTS.caption, '400', 'SmileySans-Oblique.ttf'],
  [FT_FONTS.mono, '600', 'SourceCodePro-Semibold.ttf'],
] as const;

let loadPromise: Promise<void> | undefined;
const loadFredFaces = () => {
  const fontSet = document.fonts as FontFaceSet & {add: (face: FontFace) => FontFaceSet};
  loadPromise ??= Promise.all(faces.map(async ([family, weight, name]) => {
    const face = new FontFace(family, `url("${staticFile(`fonts/${name}`)}")`, {weight, style: 'normal'});
    try {
      await face.load();
      fontSet.add(face);
    } catch (cause) {
      throw new Error(`Could not load local FredTalk font: ${name}`, {cause});
    }
  })).then(() => undefined);
  return loadPromise;
};

/** Safe to call from multiple always-mounted layers: one set of faces per browser page. */
export const useFredFonts = (): void => {
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  useLayoutEffect(() => {
    const handle = delayRender('Load FredTalk local typography');
    let pending = true;
    const release = () => {
      if (!pending) return;
      pending = false;
      continueRender(handle);
    };
    loadFredFaces().then(release, (error: Error) => {
      if (pending) cancelRender(error);
    });
    return release;
  }, [cancelRender, continueRender, delayRender]);
};
