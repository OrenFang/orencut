import React, {useId} from 'react';
import {useCurrentFrame} from 'remotion';
import {useDemoFonts} from './fonts';

export {FT_FONTS, useDemoFonts} from './fonts';

/** The original brand changes on the white flash, before the next caption. */
export const BRAND_LIGHT_START = 866;
export const brandIsLightAtFrame = (frame: number, light?: boolean): boolean =>
  light ?? frame >= BRAND_LIGHT_START;

// Fitted SVG outlines, not the creator's original vector. See docs/type-brand.md.










export type BrandProps = Readonly<{light?: boolean}>;

/** Mount on the global composition clock, outside any local Sequence. */
export const Brand: React.FC<BrandProps> = ({light}) => {return null;};
