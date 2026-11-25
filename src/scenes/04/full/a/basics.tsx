import {useId} from 'react';
import type {CSSProperties, FC, ReactNode} from 'react';
import {getStaticFiles, Img} from 'remotion';

export const W = 1920;
export const H = 1080;
export const P = {
  white: '#ffffff', dark: '#18181a', gray: '#68686f', grayLight: '#9b9ba2',
  purple: '#8554e8', lavender: '#d6bfff', pale: '#f3f0fb',
} as const;
export const F = {
  display: '"FT Display", "PingFang SC", sans-serif',
  text: '"FT Text", "PingFang SC", sans-serif',
  mono: '"FT Mono", "FT Text", "PingFang SC", monospace',
} as const;

export const at = (left: number, top: number, width: number, height: number): CSSProperties =>
  ({position:'absolute',left,top,width,height});

export const Canvas: FC<{children: ReactNode; style?: CSSProperties}> = ({children, style}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true"
    style={{...at(0,0,W,H), display:'block', overflow:'visible', ...style}}>{children}</svg>
);

type InkProps = Readonly<{
  x: number; y: number; size: number; children: ReactNode;
  fill?: string; family?: keyof typeof F; weight?: 400|500|600|900; anchor?: 'start'|'middle'|'end'; width?: number;
}>;
export const Ink: FC<InkProps> = ({x,y,size,children,fill=P.dark,family='text',weight=900,anchor='start',width}) => (
  <text x={x} y={y} fill={fill} fontFamily={F[family]} fontWeight={family === 'display' ? 400 : family === 'mono' ? 600 : weight}
    fontSize={size} textAnchor={anchor} textLength={width} lengthAdjust={width ? 'spacingAndGlyphs' : undefined}>
    {children}
  </text>
);

// Only bundle-manifest files are used. SVG fallbacks are native marks and avoid an
// HTTP 404 or rendering deadlock when this layer is auditioned before asset assembly.
export const optionalAsset = (name: string) =>
  typeof window === 'undefined' ? undefined : (getStaticFiles() ?? []).find(asset => asset.name === `full-web/${name}` && asset.sizeInBytes > 0)?.src;

type Logo = 'claude'|'codex'|'deepseek'|'gemini';
const LogoVector: FC<{logo: Logo}> = ({logo}) => {
  const id = useId();
  if (logo === 'claude') {
    const rays = [36, 34, 32, 37, 31, 38, 32, 34, 38, 30, 37, 34];
    return <svg width="100%" height="100%" viewBox="0 0 100 100">
      {rays.map((r, i) => (
        <path key={i} d={`M ${47 + (i % 3)} 52 L ${49 + r} ${49 + (i % 3)}`} stroke="#fff8ed" strokeWidth={i % 4 === 2 ? 5.4 : 4.1}
          strokeLinecap="round" fill="none" transform={`rotate(${i * 30 + (i % 3) * 2} 50 50)`} />
      ))}
    </svg>;
  }
  if (logo === 'codex') return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <defs><linearGradient id={id} x1="19%" y1="1%" x2="81%" y2="94%">
        <stop stopColor="#aaa6fe"/><stop offset=".37" stopColor="#6c8ffb"/><stop offset=".72" stopColor="#5a69f1"/><stop offset="1" stopColor="#3125de"/>
      </linearGradient></defs>
      <path d="M49 5c9 0 15 4 19 9 15-1 24 9 24 22 0 4-1 8-2 10 7 7 11 16 8 25-3 9-8 16-19 17-7 9-15 12-24 11-7 0-13-3-17-7-13 3-26-2-30-11-4-6-6-14-3-23-4-6-5-12-4-18 1-11 7-18 17-22C24 8 34 3 49 5Z" fill={`url(#${id})`} />
      <path d="M27 39l9 12-9 13m24 2h20" stroke="#e4edf9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
  if (logo === 'deepseek') return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <path d="M91 25c-4-4-8 0-10 4-2 3-4 7-7 9-5-6-9-11-16-15-13-7-38-9-49 4C-1 39 4 62 16 73c8 9 18 13 28 13 11 0 20-4 24-10-8 0-12-6-15-11 9 2 20 1 27-5 6-7 8-14 8-21 1-4 4-9 3-14ZM22 44c13-9 30 4 41 14-10 4-21 6-28 1 4 7 11 11 18 13-4 5-13 7-22 1-9-6-16-20-9-29Z" fill="#4866eb" fillRule="evenodd"/>
      <circle cx="37" cy="43" r="3.4" fill="#fff"/>
    </svg>
  );
  return <svg width="100%" height="100%" viewBox="0 0 100 100">
    <defs><linearGradient id={id} x1="0%" y1="100%" x2="94%" y2="10%"><stop stopColor="#9d82ba"/><stop offset="1" stopColor="#7965a2"/></linearGradient></defs>
    <path d="M50 0C54 27 75 47 100 50 74 54 54 74 50 100 46 74 26 54 0 50 26 46 46 26 50 0Z" fill={`url(#${id})`}/>
  </svg>;
};

export const ProductMark: FC<{logo: Logo; x: number; y: number; size: number; shadow?: boolean}> = ({logo,x,y,size,shadow}) => {
  const logoSrc = optionalAsset(`${logo}.svg`);
  const tile = logo === 'claude' || logo === 'deepseek';
  const align = logo === 'deepseek' ? '64%' : logo === 'claude' && logoSrc ? '77%' : '100%';
  // Keep the source film's tinted story-card treatment, not the vended logos' raw RGB.
  const mask: CSSProperties = logoSrc ? {
    ...at(0,0,size,size),background:'linear-gradient(43deg,#9979b4,#7762a0)',
    maskImage:`url("${logoSrc}")`,maskRepeat:'no-repeat',maskSize:'108%',maskPosition:'center',
  } : {};
  return (
    <div data-a-mark={logo} data-a-asset={logoSrc ? `full-web/${logo}.svg` : 'inline-vector'} style={{
      ...at(x,y,size,size), display:'grid',placeItems:'center',
      borderRadius: tile ? size*.22 : undefined,overflow:logo === 'codex' ? 'hidden' : undefined,
      background:logo === 'claude' ? 'linear-gradient(135deg,#da815e,#d57550)' : logo === 'deepseek' ? '#f4f6f8' : undefined,
      boxShadow:shadow ? '0 13px 22px rgba(24,24,26,.15)' : undefined,
    }}>
      <div style={{width:align,height:align}}>
        {logoSrc ? <>
          <Img src={logoSrc} alt="" style={{width:'100%',height:'100%',display:'block',objectFit:'contain',
            opacity:logo === 'gemini' ? 0 : 1,filter:logo === 'claude' ? 'brightness(0) invert(.985)' : undefined,
            transform:logo === 'codex' ? 'scale(1.28)' : undefined,
          }} />
          {logo === 'gemini' && <div style={mask} />}
        </> : <LogoVector logo={logo} />}
      </div>
    </div>
  );
};
