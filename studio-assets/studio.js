(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const engine = globalThis.OrenCutRenderer;
  const packed = globalThis.OrenCutPackage;
  const video = $('video');
  const canvas = $('preview');
  const media = new Map();
  const settings = new Map();
  let catalog = [];
  let selected;
  let currentSource = '';
  let resumeAt = 0;
  let rendering = false;
  let animation;

  function fromBase64(encoded, type) {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], {type});
  }

  function packedMedia(kind) {
    const key = `local:${kind}`;
    if (!media.has(key)) {
      const type = kind === 'poster' ? 'image/jpeg' : 'video/mp4';
      const blob = fromBase64(packed[kind], type);
      media.set(key, {blob, url: URL.createObjectURL(blob)});
    }
    return media.get(key);
  }

  function urlFor(item, kind) {
    if (packed) return packedMedia(kind).url;
    return item[`${kind}Path`];
  }

  async function videoBlob(item, kind) {
    if (packed) return packedMedia(kind).blob;
    const url = urlFor(item, kind);
    const reply = await fetch(url);
    if (!reply.ok) throw new Error(`组件视频加载失败（${reply.status}）。请重试或下载这个组件 ZIP。`);
    return reply.blob();
  }

  function info(message) { $('status').textContent = message; }

  function readProps() {
    const counter = $('counter').value.trim();
    return engine.propsFor(selected, {
      title: $('title').value,
      position: $('position').value,
      endValue: counter === '' ? 1000 : Number(counter),
      unit: $('unit').value,
      caption: $('caption').value,
    });
  }

  function writeProps(props) {
    $('title').value = props.title;
    $('position').value = props.position || 'bottom';
    $('counter').value = props.endValue ?? 1000;
    $('unit').value = props.unit || '';
    $('caption').value = props.caption || '';
  }

  function frameIndex() {
    return Math.min(selected.frames - 1, Math.max(0, Math.floor(video.currentTime * selected.fps + .0001)));
  }

  function paint() {
    if (!selected || video.readyState < 2) return;
    const props = readProps();
    const frame = frameIndex();
    const custom = engine.isCustomized(selected, props);
    if (custom) engine.drawFrame(canvas, video, selected, props, frame);
    canvas.hidden = !custom;
    video.hidden = custom;
    $('timeline').value = frame;
    $('clock').textContent = `${(frame / selected.fps).toFixed(2)} / ${(selected.frames / selected.fps).toFixed(2)}`;
    $('play').innerHTML = video.paused ? '▶ <span>播放</span>' : 'Ⅱ <span>暂停</span>';
  }

  function animate() {
    try { paint(); } catch (error) { info(error.message); }
    if (!video.paused) animation = requestAnimationFrame(animate);
  }

  function setSource(props) {
    const edited = selected.mode === 'counter' && engine.isCustomized(selected, props);
    const kind = edited ? 'edit' : 'preview';
    const url = urlFor(selected, kind);
    if (url !== currentSource) {
      resumeAt = video.currentTime;
      currentSource = url;
      video.poster = urlFor(selected, 'poster');
      video.src = url;
      video.load();
    }
  }

  function formChange() {
    if (!selected) return;
    try {
      const props = readProps();
      settings.set(selected.id, props);
      setSource(props);
      paint();
      info('');
    } catch (error) { info(error.message); }
  }

  function drawList() {
    const search = $('search').value.trim().toLocaleLowerCase().replace(/^#/, '');
    const group = $('group').value;
    const results = catalog.filter(item => (!group || item.group === group) &&
      (!search || [item.id, String(Number(item.id)), item.title, item.group, ...item.keywords].some(value => value.toLocaleLowerCase().includes(search))));
    $('components').replaceChildren(...results.map(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'component';
      button.dataset.id = item.id;
      button.setAttribute('aria-pressed', String(item.id === selected?.id));
      const image = document.createElement('img');
      image.className = 'thumb';
      image.src = item.posterPath;
      image.alt = '';
      image.loading = 'lazy';
      const words = document.createElement('span');
      words.className = 'component-copy';
      for (const [className, value] of [['component-id', item.id], ['component-name', item.title]]) {
        const span = document.createElement('span');
        span.className = className;
        span.textContent = value;
        words.append(span);
      }
      button.append(image, words);
      button.addEventListener('click', () => select(item.id));
      return button;
    }));
    $('count').textContent = `${results.length} / ${catalog.length}`;
    $('empty').hidden = results.length > 0;
  }

  function select(id) {
    if (rendering) throw new Error('请等当前导出完成后再切换组件。');
    const item = catalog.find(entry => entry.id === String(id).padStart(2, '0'));
    if (!item) throw new Error(`没有找到组件 ${id}。`);
    video.pause();
    currentSource = '';
    resumeAt = 0;
    selected = item;
    const props = settings.get(item.id) ?? engine.propsFor(item);
    writeProps(props);
    $('name').textContent = `${item.id} · ${item.title}`;
    $('category').textContent = item.group;
    $('spec').textContent = `${item.width}×${item.height} · ${item.fps} fps`;
    $('mode').textContent = item.mode === 'counter' ? '可填写自己的标题、滚数目标和说明。' : '保留原片段，可加自己的标题。';
    $('placement').hidden = item.mode === 'counter';
    $('counter-field').hidden = item.mode !== 'counter';
    $('timeline').max = item.frames - 1;
    $('timeline').value = 0;
    $('clock').textContent = `0.00 / ${(item.frames / item.fps).toFixed(2)}`;
    canvas.width = item.width;
    canvas.height = item.height;
    canvas.hidden = true;
    video.hidden = false;
    if (video.readyState >= 2) video.currentTime = 0;
    setSource(props);
    const download = $('download');
    download.href = item.downloadUrl;
    download.hidden = Boolean(packed);
    $('copy-text').hidden = true;
    for (const name of ['play','timeline','export','title','position','counter','unit','caption','copy','reset']) $(name).disabled = false;
    if (!packed) {
      const url = new URL(location.href);
      url.searchParams.set('id', item.id);
      history.replaceState(null, '', url);
      drawList();
    }
    info('');
    return item;
  }

  async function renderMp4(values, onProgress = () => {}) {
    if (!selected) throw new Error('请先选择组件。');
    if (rendering) throw new Error('已有一份导出正在运行。');
    const current = selected;
    const props = values === undefined ? readProps() : engine.propsFor(current, values);
    rendering = true;
    for (const name of ['export', 'title', 'position', 'counter', 'unit', 'caption', 'reset']) $(name).disabled = true;
    $('library').inert = true;
    try {
      video.pause();
      if (!engine.isCustomized(current, props)) return await videoBlob(current, 'preview');
      const blob = await videoBlob(current, current.mode === 'counter' ? 'edit' : 'preview');
      return await engine.encode(current, props, blob, onProgress);
    } finally {
      rendering = false;
      $('library').inert = false;
      for (const name of ['export', 'title', 'position', 'counter', 'unit', 'caption', 'reset']) $(name).disabled = false;
    }
  }

  async function downloadMp4(values) {
    const id = selected.id;
    info('正在准备 MP4…');
    const blob = await renderMp4(values, progress => info(`正在导出 ${Math.round(progress * 100)}%`));
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orencut-${id}.mp4`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    info(`已导出 orencut-${id}.mp4`);
    return blob;
  }

  async function copyInstructions() {
    const props = readProps();
    const lines = [
      `使用 OrenCut ${selected.id} 号组件（${selected.title}）。`,
      `在线 Studio：${selected.studioUrl}`, `单组件 ZIP：${selected.downloadUrl}`,
      '选一个入口。离线时解压 ZIP 后打开 index.html。',
      `设置 ${JSON.stringify(props)}，然后导出静音 MP4。`,
    ];
    const text = lines.join('\n');
    try {
      await navigator.clipboard.writeText(text);
      info('已复制给 AI 的用法。');
    } catch {
      const output = $('copy-text');
      output.hidden = false;
      output.value = text;
      output.focus();
      output.select();
      info('已选中用法，可复制。');
    }
  }

  async function init() {
    if (packed) {
      catalog = [packed.component];
      document.body.classList.add('single');
      $('library').hidden = true;
      $('offline-note').textContent = '此组件已包含画面和导出工具，可离线使用。';
    } else {
      const result = await fetch('catalog.json');
      if (!result.ok) throw new Error('暂时读不到组件目录，请刷新重试。');
      catalog = (await result.json()).components;
      for (const group of new Set(catalog.map(item => item.group))) $('group').add(new Option(group, group));
      $('search').addEventListener('input', drawList);
      $('group').addEventListener('change', drawList);
    }
    const id = new URL(location.href).searchParams.get('id')?.padStart(2, '0');
    select(packed?.component.id ?? (catalog.some(item => item.id === id) ? id : '27'));
    globalThis.orencutStudio = Object.freeze({
      select,
      getComponent: () => structuredClone(selected),
      setInputs(values) { writeProps(engine.propsFor(selected, values)); formChange(); },
      renderMp4,
      downloadMp4,
    });
  }

  for (const name of ['title', 'position', 'counter', 'unit', 'caption']) $(name).addEventListener('input', formChange);
  $('play').addEventListener('click', async () => {
    if (!video.paused) video.pause();
    else {
      if (video.ended) video.currentTime = 0;
      await video.play().catch(error => info(error.message));
    }
  });
  $('timeline').addEventListener('input', () => {
    if (selected && video.readyState >= 2) video.currentTime = (Number($('timeline').value) + .25) / selected.fps;
  });
  $('reset').addEventListener('click', () => { writeProps(engine.propsFor(selected)); formChange(); });
  $('export').addEventListener('click', () => downloadMp4().catch(error => info(error.message)));
  $('copy').addEventListener('click', () => copyInstructions().catch(error => info(error.message)));
  video.addEventListener('loadeddata', () => {
    if (resumeAt > 0) video.currentTime = Math.min(resumeAt, video.duration - .01);
    resumeAt = 0;
    try { paint(); } catch (error) { info(error.message); }
  });
  video.addEventListener('seeked', () => { try { paint(); } catch (error) { info(error.message); } });
  video.addEventListener('play', () => { cancelAnimationFrame(animation); animate(); });
  video.addEventListener('pause', () => { cancelAnimationFrame(animation); if (selected) animate(); });
  video.addEventListener('error', () => info('预览加载失败。请重新打开组件，或试试最新版 Chrome / Edge。'));
  init().catch(error => { $('name').textContent = '组件未加载'; info(error.message); });
})();
