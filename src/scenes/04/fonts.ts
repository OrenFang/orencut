import { demoAsset as staticFile } from '../../demo-media';
import {useLayoutEffect} from 'react';
import {useDelayRender} from 'remotion';

export const FT_FONTS = {
  display: 'system-ui',
  text: 'system-ui',
  caption: 'system-ui',
  mono: 'FT Mono',
} as const;



let loadPromise: Promise<void> | undefined;


/** Safe to call from multiple always-mounted layers: one set of faces per browser page. */
export const useDemoFonts = (): void => {};
