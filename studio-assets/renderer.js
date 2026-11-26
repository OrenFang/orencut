/* The counter timing and paths are adapted from the OrenCut 27 scene. */
(() => {
  'use strict';

  const font = '"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif';
  const positions = ['top', 'middle', 'bottom'];
  const readings = [27,71,114,155,195,234,271,307,342,376,409,440,470,500,528,555,581,606,630,653,675,696,716,735,753,771,787,803,818,832,846,858,870,882,892,902,912,920,928,936,943,949,955,961,966,970,975,978,982,985,987,990,992,993,995,996,997,998,999,999,999];
  const digits = [
    'M6 0H94V82L88 88H0V6ZM22 18V70H72V18Z',
    'M0 8L28 0H49V88H27V21L0 26Z',
    'M0 0H88L94 6V53H22V70H94V88H0V35H72V18H0Z',
    'M0 0H88L94 6V82L88 88H0V70H72V53H12V35H72V18H0Z',
    'M0 0H22V38H72V0H94V88H72V56H0Z',
    'M0 0H94V18H22V35H94V82L88 88H0V70H72V53H0Z',
    'M6 0H94V18H22V35H94V82L88 88H0V6ZM22 53V70H72V53Z',
    'M0 0H94V17L48 88H21L66 18H0Z',
    'M6 0H88L94 6V35L88 44L94 53V82L88 88H6L0 82V53L6 44L0 35V6ZM22 17V35H72V17ZM22 53V71H72V53Z',
    'M6 0H94V82L88 88H0V70H72V53H0V6ZM22 18V35H72V18Z',
  ];
  const unit = 'M0 2H23V106H0ZM36 0H119V20L54 85H112L107 102H38Q28 102 28 94V82L89 19H36Z';
  const sheen = [
    ['#edfdffd9','M0 0H25L14 23 5 27 0 41ZM72 0H103L95 12 81 13 76 22 64 24ZM114 62L139 52V73L130 82 123 101H94L99 87 110 78Z'],
    ['#ffffffb3','M16 9H33L28 20 21 21 17 30H4L13 22ZM88 13H109L102 22H93L90 31H80ZM114 82H128L121 99H100V94Z'],
    ['#8ee1ff99','M35 4H61L51 15 43 29 26 36 30 24ZM0 69L23 63 29 66 14 75 8 88H0ZM49 76L78 65 80 74 66 83 61 104H46L42 94Z'],
  ];

  const boundedText = (value, max) => [...(typeof value === 'string' ? value.trim() : '')].slice(0, max).join('');

  function propsFor(component, values = {}) {
    const title = boundedText(values.title, 80);
    if (component.mode === 'counter') {
      const value = values.endValue ?? 1000;
      if (!Number.isInteger(value) || value < 0 || value > 9999) throw new Error('目标数字须是 0 到 9999 的整数。');
      return {title, endValue: value, unit: boundedText(values.unit, 4), caption: boundedText(values.caption, 42)};
    }
    return {title, position: positions.includes(values.position) ? values.position : 'bottom'};
  }

  const isCustomized = (component, props) => Boolean(props.title ||
    (component.mode === 'counter' && (props.endValue !== 1000 || props.unit || props.caption)));

  function counterValue(frame, end) {
    if (frame < 17) return 0;
    const value = readings[frame - 17] ?? 1000;
    return Math.round(value * end / 1000);
  }

  function counterLayer(ctx, width, height, frame, props) {
    const value = counterValue(frame, props.endValue);
    ctx.save();
    ctx.scale(width / 648, height / 1152);
    ctx.globalAlpha = .65 + .35 * (1 - (1 - Math.min(1, frame / 10)) ** 3);
    if (props.title) {
      const words = props.title.replace(/\s+/g, ' ');
      const rows = [];
      ctx.font = `850 30px ${font}`;
      let line = '';
      for (const char of words) {
        if (line && ctx.measureText(line + char).width > 552) { rows.push(line); line = ''; }
        line += char;
      }
      if (line) rows.push(line);
      const lineHeight = Math.min(37, 128 / rows.length);
      ctx.fillStyle = '#d8b46e';
      ctx.fillRect(36, 212, 8, 8);
      ctx.fillStyle = '#f5efe1';
      ctx.textBaseline = 'middle';
      ctx.font = `850 ${Math.min(30, lineHeight * .84)}px ${font}`;
      rows.forEach((text, i) => ctx.fillText(text, 53, 217 + i * lineHeight, 552));
    }
    if (props.caption) {
      const p = Math.max(0, Math.min(1, (frame - 29) / 18));
      ctx.save();
      ctx.globalAlpha = 1 - (1 - p) ** 3;
      ctx.fillStyle = '#f5efe1';
      ctx.fillRect(36, 605, 545, 48);
      ctx.fillStyle = '#d6aa52';
      ctx.fillRect(36, 605, 12, 48);
      ctx.fillStyle = '#1c1712';
      ctx.textBaseline = 'middle';
      ctx.font = `900 22px ${font}`;
      ctx.fillText(props.caption, 59, 629, 504);
      ctx.restore();
    }
    ctx.translate(0, 377);
    ctx.globalAlpha = 1 - (1 - Math.max(0, Math.min(1, (frame - 4) / 5))) ** 3;
    const row = String(value).split('');
    const unitWidth = props.unit === '亿' ? 123 : [...props.unit].length * 37;
    let x = (648 - (row.reduce((sum, char) => sum + (char === '1' ? 70 : 114), 0) + unitWidth)) / 2 + 10;
    const shapes = new Path2D();
    const skew = new DOMMatrix([1, 0, -Math.tan(Math.PI / 15), 1, 0, 0]);
    for (const char of row) {
      shapes.addPath(new Path2D(digits[Number(char)]), skew.translate(x, 9));
      x += char === '1' ? 70 : 114;
    }
    if (props.unit === '亿') shapes.addPath(new Path2D(unit), skew.translate(x + 3, 3));
    if (props.unit && props.unit !== '亿') {
      ctx.fillStyle = '#d6f5ff';
      ctx.font = `italic 900 37px ${font}`;
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(props.unit, x - 5, 94, unitWidth);
    }
    ctx.clip(shapes, 'evenodd');
    const ice = ctx.createLinearGradient(0, 4, 0, 107);
    for (const [stop, color] of [[0,'#b6eaff'],[.23,'#71c5ed'],[.48,'#579bc5'],[.72,'#7ac9f3'],[1,'#bceaff']]) ice.addColorStop(stop, color);
    ctx.fillStyle = ice;
    ctx.fillRect(0, 0, 648, 114);
    const shift = ((frame - 5) * 1.8 % 139 + 139) % 139;
    for (let left = shift - 139; left < 648; left += 139) {
      for (let top = 0; top < 114; top += 106) {
        ctx.save();
        ctx.translate(left, top);
        for (const [color, path] of sheen) {
          ctx.fillStyle = color;
          ctx.fill(new Path2D(path));
        }
        ctx.restore();
      }
    }
    ctx.restore();
  }

  function titleLayer(ctx, width, height, props) {
    const fontSize = Math.round(width * (height > width ? .063 : .046));
    const max = width * .83;
    const leading = fontSize * 1.28;
    ctx.save();
    ctx.font = `800 ${fontSize}px ${font}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    const lines = [];
    for (const paragraph of props.title.split('\n')) {
      let line = '';
      for (const char of paragraph) {
        if (line && ctx.measureText(line + char).width > max) {
          lines.push(line);
          line = '';
        }
        line += char;
      }
      if (line) lines.push(line);
    }
    const boxWidth = Math.min(width * .94, Math.max(...lines.map(line => ctx.measureText(line).width)) + fontSize * 1.05);
    const boxHeight = leading * lines.length + fontSize * .45;
    const edge = height * .074;
    const y = props.position === 'top' ? edge : props.position === 'middle' ? (height - boxHeight) / 2 : height - edge - boxHeight;
    ctx.fillStyle = '#141222e8';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect((width - boxWidth) / 2, y, boxWidth, boxHeight, fontSize * .28);
    else ctx.rect((width - boxWidth) / 2, y, boxWidth, boxHeight);
    ctx.fill();
    ctx.fillStyle = '#f8f6ff';
    lines.forEach((line, index) => ctx.fillText(line, width / 2, y + fontSize * .225 + leading * (index + .5), max));
    ctx.restore();
  }

  function drawFrame(canvas, source, component, props, frame) {
    const ctx = canvas.getContext('2d', {alpha: false});
    const {width, height} = canvas;
    ctx.drawImage(source, 0, 0, width, height);
    if (component.mode === 'counter') counterLayer(ctx, width, height, frame, props);
    else if (props.title) titleLayer(ctx, width, height, props);
  }

  function videoEvent(video, name) {
    return new Promise((resolve, reject) => {
      const cleanup = () => {
        clearTimeout(timeout);
        video.removeEventListener(name, ready);
        video.removeEventListener('error', failed);
      };
      const ready = () => { cleanup(); resolve(); };
      const failed = () => { cleanup(); reject(new Error('浏览器无法解码此组件的视频。')); };
      const timeout = setTimeout(() => { cleanup(); reject(new Error('等待视频画面超时。')); }, 15000);
      video.addEventListener(name, ready, {once: true});
      video.addEventListener('error', failed, {once: true});
    });
  }

  async function frameAt(video, time) {
    if (Math.abs(video.currentTime - time) < .0001 && video.readyState >= 2) return;
    const ready = videoEvent(video, 'seeked');
    video.currentTime = time;
    await ready;
  }

  async function encode(component, props, blob, progress) {
    const media = globalThis.Mediabunny;
    if (!media || !globalThis.VideoEncoder) throw new Error('请用支持视频编码的新版 Chrome 或 Edge 打开，再导出修改后的 MP4。');
    const {width, height, fps, frames} = component;
    const bitrate = height > width ? 4_800_000 : 5_600_000;
    if (!await media.canEncodeVideo('avc', {width, height, bitrate})) {
      throw new Error('当前浏览器无法编码 MP4。请用支持 H.264 编码的新版 Chrome 或 Edge 打开。');
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const source = new media.CanvasSource(canvas, {codec: 'avc', bitrate});
    const target = new media.BufferTarget();
    const output = new media.Output({format: new media.Mp4OutputFormat({fastStart: 'in-memory'}), target});
    output.addVideoTrack(source, {frameRate: fps});

    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'auto';
    const url = URL.createObjectURL(blob);
    try {
      const ready = videoEvent(video, 'loadeddata');
      video.src = url;
      await ready;
      await output.start();
      for (let frame = 0; frame < frames; frame++) {
        await frameAt(video, (frame + .25) / fps);
        drawFrame(canvas, video, component, props, frame);
        await source.add(frame / fps, 1 / fps);
        if ((frame + 1) % 8 === 0 || frame + 1 === frames) progress((frame + 1) / frames);
      }
      await output.finalize();
      return new Blob([target.buffer], {type: 'video/mp4'});
    } catch (error) {
      await output.cancel().catch(() => {});
      throw error;
    } finally {
      video.removeAttribute('src');
      video.load();
      URL.revokeObjectURL(url);
    }
  }

  globalThis.OrenCutRenderer = {propsFor, isCustomized, drawFrame, encode, counterValue};
})();
