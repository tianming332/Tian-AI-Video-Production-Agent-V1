(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text !== undefined) node.textContent = text; return node; };

  const PROJECT = { status: '本轮已完成', elapsed: '59:47', files: 31 };
  const PROMPT = '想做一条 YanShi 矿泉水的夏日竖屏广告。先帮我梳理脚本和需要的素材，确认后再开始制作。';

  const STAGES = [
    ['需求与脚本', '定故事节奏、分镜序列、台词与声音分层，产出帧精确时间轴。', '主线'],
    ['人物定妆', '依品牌形象参考生成人物锚定图，锁定后续所有镜头是同一个人。', '主线'],
    ['场景与关键帧', '按脚本逐镜出图，过 11 条出图自查后定稿关键帧。', '主线'],
    ['动态镜头生成', '关键帧作首帧图生视频，过收片三条致命项。', '主线'],
    ['音频设计与混音', '环境声、音效、BGM、旁白四层，混到 −20 LUFS。', '主线'],
    ['帧精确合成', '按时间轴逐帧对齐镜头、音效与品牌卡，输出成片。', '主线'],
    ['质检与交付', '逐镜采样过片，校验人物一致性、产品完整与响度。', '主线'],
    ['R1 加镜头与重做', '补 4 个特写，并重做取瓶方向与开盖两个问题镜头。', '迭代'],
    ['R2 删镜提速与新片尾', '删取瓶镜头、画面提速、片尾换成水面动态与矢量 Logo。', '迭代'],
    ['R3 品牌 Logo 贴标', '为 7 个产品镜头补 YanShi 字标，逐版审核后定稿。', '迭代']
  ];

  const ATTACHMENTS = [
    ['文件夹', 'YANSHI 演示项目文件夹'],
    ['文档', '工作流程文档'],
    ['文档', '视觉画面提示词'],
    ['图片', 'YanShi-品牌资源.jpg']
  ];

  const LOOKS = [['assets/img/p02_look_L1.jpg', '人物锚定 L1 · 近景脸肩'], ['assets/img/p02_look_L2.jpg', '人物锚定 L2 · 全身站姿']];
  const KEYFRAMES = Array.from({ length: 10 }, (_, i) => [`assets/img/p02_kf_S${i + 1}.jpg`, `关键帧 S${i + 1}`]);
  const CUT_FRAMES = [1, 2, 3, 4].map(i => [`assets/img/p03_kf_C${i}.jpg`, `特写关键帧 C${i}`]);
  const LOGO_STILLS = [['assets/img/logo_sample_S04.jpg', '贴标样稿 · S04 瓶身大特写'], ['assets/img/logo_sample_S07.jpg', '贴标样稿 · S07 饮水近景'], ['assets/img/logo_sample_S13.jpg', '贴标样稿 · S13 海边远景'], ['assets/img/logo_wordmark_v2.png', '字标参考 · YanShi wordmark v2']];
  const LOGO_KEYFRAMES = [['assets/img/logo_kf_S4.png', 'logo 版关键帧 S4'], ['assets/img/logo_kf_S6.png', 'logo 版关键帧 S6'], ['assets/img/logo_kf_C2.png', 'logo 版关键帧 C2'], ['assets/img/logo_kf_C3.png', 'logo 版关键帧 C3']];
  const LOGO_SHOTS = [['assets/vid/logo_shot_S04.mp4', '贴标镜头 S04'], ['assets/vid/logo_shot_S07.mp4', '贴标镜头 S07'], ['assets/vid/logo_shot_S13.mp4', '贴标镜头 S13'], ['assets/vid/logo_S4.mp4', 'logo 版镜头 S4'], ['assets/vid/logo_C2.mp4', 'logo 版镜头 C2']];
  const LOGO_REVIEWS = [['assets/vid/logo_review_v1.mp4', 'V1 动态贴标审核版'], ['assets/vid/logo_review_v2.mp4', 'V2 前三镜固定审核版']];
  const LOGO_FINAL = [['assets/vid/p04_final_preview.mp4', '最终成片 · P04 定稿版'], ['assets/vid/p04_logo_final_v2.mp4', 'logo 版 v2'], ['assets/vid/p04_BRAND.mp4', '动态品牌片尾']];

  const COMPARES = [
    ['V1 动态贴标 / V2 前三镜固定', ['assets/vid/logo_review_v1.mp4', 'V1 动态贴标审核版'], ['assets/vid/logo_review_v2.mp4', 'V2 前三镜固定审核版']],
    ['P03 修订版 / P04 提速版', ['assets/vid/p03_final.mp4', 'P03 · 52 秒'], ['assets/vid/p04_final.mp4', 'P04 · 41.2 秒']],
    ['贴标前 / 贴标后', ['assets/vid/p04_final.mp4', 'P04 贴标前'], ['assets/vid/p04_final_preview.mp4', 'P04 定稿版']]
  ];
  const SHOTS = Array.from({ length: 6 }, (_, i) => [`assets/vid/p02_S${i + 1}.mp4`, `镜头 S${i + 1}`]);
  const CUT_SHOTS = [1, 2, 3, 4].map(i => [`assets/vid/p03_C${i}.mp4`, `特写镜头 C${i}`]);
  const FINAL_02 = [['assets/vid/p02_final.mp4', 'P02 成片 · 46 秒']];
  const FINAL_03 = [['assets/vid/p03_final.mp4', 'P03 成片 · 52 秒'], ['assets/vid/p03_C1.mp4', '新增特写 C1']];
  const FINAL_04 = [['assets/vid/p04_final.mp4', 'P04 成片 · 41.2 秒'], ['assets/vid/p04_BRAND.mp4', '动态品牌片尾']];

  const ARTIFACTS = [
    ['video', '最终成片 · P04 定稿版', 'assets/vid/p04_final_preview.mp4'],
    ['video', 'logo 版 v2', 'assets/vid/p04_logo_final_v2.mp4'],
    ['video', '品牌贴标 V1 成片', 'assets/vid/p04_logo_v1_final.mp4'],
    ['video', 'V1 动态贴标审核版', 'assets/vid/logo_review_v1.mp4'],
    ['video', 'V2 前三镜固定审核版', 'assets/vid/logo_review_v2.mp4'],
    ['video', '贴标镜头 S04', 'assets/vid/logo_shot_S04.mp4'],
    ['video', '贴标镜头 S07', 'assets/vid/logo_shot_S07.mp4'],
    ['video', '贴标镜头 S13', 'assets/vid/logo_shot_S13.mp4'],
    ['video', 'P02 成片 · 46 秒', 'assets/vid/p02_final.mp4'],
    ['video', 'P03 成片 · 52 秒', 'assets/vid/p03_final.mp4'],
    ['video', 'P04 成片 · 41.2 秒', 'assets/vid/p04_final.mp4'],
    ['video', 'P01 成片 · 30 秒', 'assets/vid/p01_final.mp4'],
    ['video', '动态品牌片尾 BRAND', 'assets/vid/p04_BRAND.mp4'],
    ['video', 'P02 镜头 S1', 'assets/vid/p02_S1.mp4'],
    ['video', 'P03 特写 C1', 'assets/vid/p03_C1.mp4'],
    ['image', '贴标样稿 · S04', 'assets/img/logo_sample_S04.jpg'],
    ['image', '贴标样稿 · S07', 'assets/img/logo_sample_S07.jpg'],
    ['image', '贴标样稿 · S13', 'assets/img/logo_sample_S13.jpg'],
    ['image', '字标参考 · wordmark v2', 'assets/img/logo_wordmark_v2.png'],
    ['image', 'logo 版关键帧 S4', 'assets/img/logo_kf_S4.png'],
    ['image', 'logo 版关键帧 C2', 'assets/img/logo_kf_C2.png'],
    ['image', '人物锚定 L1 · 近景脸肩', 'assets/img/p02_look_L1.jpg'],
    ['image', '人物锚定 L2 · 全身站姿', 'assets/img/p02_look_L2.jpg'],
    ['image', 'P02 关键帧 S1', 'assets/img/p02_kf_S1.jpg'],
    ['image', 'P03 特写关键帧 C2', 'assets/img/p03_kf_C2.jpg'],
    ['image', '品牌字标参考', 'assets/img/YanShi-品牌资源.jpg'],
    ['audio', '旁白 N1', 'assets/aud/p02_N1.mp3'],
    ['audio', '旁白 N2', 'assets/aud/p02_N2.mp3'],
    ['audio', 'BGM', 'assets/aud/p02_BGM.mp3'],
    ['audio', '音效 SFX', 'assets/aud/p03_SFX.mp3'],
    ['script', '脚本与帧精确时间轴', '10 个镜头 · 两段旁白 · 四层声音设计'],
    ['script', '出图自查记录', '11 条自查：人物、服装、光向、构图、产品'],
    ['script', '收片检查记录', '三条致命项：张嘴 / 瓶身字母 / 脸部漂移'],
    ['script', 'R1 加镜头记录', '新增 C1–C4 · 重做 S3 取瓶与 S6 开盖'],
    ['script', 'R2 剪辑变更记录', '删取瓶 · 1.2 倍提速 · 动态片尾替换'],
    ['script', '贴标方案与逐镜方案', '7 个产品镜头 · 逐镜贴标方案'],
    ['script', '贴标时间轴', 'S04 / S05 / S06 / S07 / S08 / S09 / S13'],
    ['script', '版本审核记录', 'V1 动态贴标选用 · V2 前三镜固定保留未选用'],
    ['script', '响度与混音记录', '−20.0 LUFS · P03 补偿 +2.80dB'],
    ['script', '质检采样记录', '逐镜 4 帧拼表过片'],
    ['script', '流程经验文档', '工具入口、质检机制、工程踩坑与未闭环项'],
    ['script', '交付说明', '最终成片 P04 logo 版 v2 · 1080×1920 · 30fps']
  ];

  const HISTORY = [
    ['YanShi P04 logo 版 v2', '最终交付 · 品牌贴标定稿 · 静态记录'],
    ['YanShi P04 瓶身贴标', 'V1 / V2 审核与合成 · 静态记录'],
    ['YanShi P04 提速剪辑版', '删镜提速与动态片尾 · 41.2 秒 · 静态记录'],
    ['YanShi P03 加特写修订版', '加镜头与重做 · 52 秒 · 静态记录'],
    ['YanShi P02 夏天经过的时候', '完整链路 · 46 秒 · 静态记录'],
    ['YanShi P01 全链路验证', '首次跑通 · 30 秒 · 静态记录']
  ];

  const state = { tab: 'work', started: false, busy: false, index: 0, progress: 0, tasksDone: -1, turns: 0, filter: 'all', compare: 0, requests: [] };
  const activity = [];
  const TOTAL_SECONDS = 3587;

  const REPLAY = [
    { stage: 0, text: '已读工作流程与视觉提示词。这条片子按夏日日常展开：骑车、贴脸颊、开盖、第一口、海边收尾。我先出脚本、分镜序列、台词与声音分层，帧精确时间轴一并给你。', activity: '完成脚本、分镜序列与帧精确时间轴', request: ['脚本定稿确认', '10 个镜头 · 两段日文旁白 · 四层声音设计'] },
    { role: 'user', text: '脚本可以，人物按品牌形象来。' },
    { stage: 1, text: '按品牌形象参考出了两张人物锚定图：L1 近景脸肩锁脸，L2 全身站姿锁服装、体型与光向。后续每个镜头都挂这两张，保证是同一个人。', activity: '产出人物锚定图 L1 / L2', images: LOOKS, task: 0, request: ['人物锚定确认', '同一个人 · 真人胶片质感 · 服装配色一致'] },
    { role: 'user', text: '人物没问题，出关键帧。' },
    { stage: 2, text: '10 个镜头的第一版关键帧已出，逐张过了 11 条自查：同一个人、真人胶片、长发不变短、瓶身零字母、手脚结构、无多余人物、竖幅不裁切。落选版本留在备选。', activity: '完成 10 张关键帧并通过出图自查', images: KEYFRAMES, task: 1, request: ['关键帧过审', '10 张定稿 · 逐张过 11 条自查'] },
    { role: 'user', text: '关键帧通过，开始生视频。' },
    { stage: 3, text: '以关键帧作首帧开始生成动态镜头，音轨关闭，每条比窗口多留 1.5–2 秒。先跑前三镜：原景空镜、骑车、停车。', activity: '生成 S1–S3 动态镜头', videos: SHOTS.slice(0, 3), task: 2 },
    { stage: 3, text: 'S4–S6 已出：贴脸颊、电车通过、开盖。S6 第一版开盖动作不到位，已重跑一次。', activity: '生成 S4–S6 并重跑 S6 开盖', videos: SHOTS },
    { stage: 3, text: 'S7–S10 完成：喝水、绿浪、推车、海边。10 个镜头收片按三条致命项过：人物不张嘴、瓶身无字母、脸不漂成另一人。', activity: '完成 10 个镜头生成与收片检查' },
    { stage: 4, text: '开始铺声音：蝉鸣与海浪垫底、电车通过、拧盖尖点、踏水点，四层环境与音效先对齐时间轴。', activity: '铺环境声与音效四层' },
    { stage: 4, text: '两段日文旁白与钢琴 BGM 已叠入，人声零混入，整体混到 −20 LUFS。', activity: '完成旁白、BGM 与 −20 LUFS 混音', task: 3 },
    { stage: 5, text: '按时间轴逐帧对齐镜头与音效，接点逐个核对，再叠片尾卡。', activity: '逐帧对齐镜头、音效与片尾卡' },
    { stage: 5, text: '输出 46 秒竖屏成片，1080×1920、30fps。', activity: '输出 P02 成片', videos: FINAL_02, task: 4 },
    { stage: 6, text: '逐镜 4 帧采样拼表过片：人物一致、产品完整、响度达标。P02 定版。', activity: '完成质检采样与定版', task: 5, request: ['P02 交付确认', '46 秒 · 1080×1920 · 30fps · −20.0 LUFS'] },
    { role: 'user', text: '整体太平了，加几个特写。另外取瓶那一下方向不对，开盖也没真开。' },
    { stage: 7, text: '收到。补 4 个特写：口渴、瓶身冷凝水珠、第一口吞咽、赤脚踏水；同时重做取瓶方向与开盖动作两个问题镜头。旧素材保留不覆盖。', activity: 'R1：新增 4 个特写关键帧并重做两个问题镜头', images: CUT_FRAMES, task: 6, request: ['加镜头确认', '新增 C1–C4 特写 · 重做 S3 取瓶与 S6 开盖'] },
    { role: 'user', text: '按这个改，音频不用重做。' },
    { stage: 7, text: '特写镜头已生成并接入，音频复用 P02 已验收素材，响度按新镜次重新量，补偿 +2.80dB。P03 成片 52 秒，14 个镜头。', activity: 'R1：完成 P03 合成与响度重量', videos: FINAL_03, task: 7 },
    { role: 'user', text: '节奏还是慢，删掉取瓶镜头，整体提速，片尾换成动态的。' },
    { stage: 8, text: '已删除取瓶镜头，画面 1.2 倍提速，调整贴脸颊与开盖顺序；片尾从静态蓝卡换成水面动态与矢量 Logo。P04 成片 41.2 秒。P03 与 P04 已放入版本对比。', activity: 'R2：删镜提速并替换动态品牌片尾', videos: FINAL_04, compare: 1, task: 8, request: ['P04 剪辑确认', '删取瓶 · 1.2 倍提速 · 动态片尾'] },
    { role: 'user', text: '为产品出现的画面贴上 YanShi logo 字样，logo 参考品牌资产图。' },
    { stage: 9, text: '规格已核实：41.2 秒、1080×1920、30fps。品牌图里的标准字标是「YanShi」混合大小写、白字配上下弧线，与全大写写法有差别，这次按品牌图定稿。', activity: 'R3：核实规格与品牌字标写法' },
    { stage: 9, text: '原片 14 个镜头，其中 7 个是产品镜头需要贴标。逐镜时间轴已整理，请确认后再进入制作。', activity: 'R3：完成镜头分析与贴标时间轴', request: ['贴标时间轴确认', '7 个产品镜头 · 逐镜时间轴'] },
    { role: 'user', text: '按这 7 个镜头继续。' },
    { stage: 9, text: '3 张静帧样稿已出：S04 瓶身大特写、S07 饮水近景、S13 海边远景，字标按 wordmark v2 定稿，重点看大小、方向、明暗和贴合。', activity: 'R3：产出 3 张静帧贴标样稿', images: LOGO_STILLS, request: ['静帧样稿审核', 'S04 / S07 / S13 · 大小 · 方向 · 明暗 · 贴合'] },
    { role: 'user', text: '静帧可以，继续做动态。' },
    { stage: 9, text: 'OpenCV 无法打开截取后的 MP4，已改用 FFmpeg 读帧，跟踪方案保持不变。7 个产品镜头逐镜贴标完成，已检查旋转、遮挡与漂移。', activity: 'R3：改用 FFmpeg 读帧并完成 7 镜逐镜贴标', videos: LOGO_SHOTS, images: LOGO_KEYFRAMES },
    { role: 'user', text: '前三个镜头改成固定贴标，不要跟踪。' },
    { stage: 9, text: '已保留 V1 动态审核版，另做 V2：前三镜固定、后四镜保持动态。需要说明第二镜瓶身有位移，固定文字会产生相对位移。两版已放在版本对比里，可以并排看。', activity: 'R3：产出 V2 审核版并标注第二镜位移风险', videos: LOGO_REVIEWS, compare: 0, request: ['版本选择', 'V1 动态贴标 / V2 前三镜固定'] },
    { role: 'user', text: '还是用第一版动态贴标，合成成片。' },
    { stage: 9, text: '已恢复 V1 并完成合成，37 秒处切换品牌动态结尾，原音轨逐位保留，接点与音画检查通过。最终定稿为 P04 定稿版。', activity: 'R3：完成 V1 合成并定稿', videos: LOGO_FINAL, compare: 2 },
    { role: 'user', text: '成片没问题，项目可以收了。' },
    { stage: 9, text: '已记录最终验收：最终成片为 P04 logo 版 v2，V1 成片与 V1/V2 审核版、逐镜贴标素材、样稿与字标参考全部保留，流程经验文档整理完成，项目关闭。', activity: 'R3：记录最终验收并关闭项目', task: 9, done: true }
  ];

  function renderInputs() {
    $('input-summary').textContent = ATTACHMENTS.map(([kind, name]) => `${kind} · ${name}`).join('　|　');
  }

  function renderStage(index) {
    if (index === undefined || index < 0) {
      $('stage-title').textContent = '等待需求';
      $('stage-step').textContent = '— / 10';
      $('stage-note').textContent = '发送需求后，从脚本开始展示完整制作链路。';
      return;
    }
    const [title, note, group] = STAGES[index];
    $('stage-title').textContent = title;
    $('stage-step').textContent = `${group} · ${String(index + 1).padStart(2, '0')} / 10`;
    $('stage-note').textContent = note;
  }

  function renderTasks() {
    const box = $('tasks');
    box.innerHTML = '';
    if (!state.started) { box.append(el('p', 'empty', '先发送需求，再展开这次制作的计划。')); return; }
    STAGES.forEach(([title, , group], i) => {
      const done = i <= state.tasksDone;
      const row = el('div', `task ${i === state.tasksDone + 1 ? 'current' : ''}`);
      row.append(el('i', `task-dot ${done ? 'completed' : 'pending'}`));
      row.append(el('span', 'task-number', String(i + 1).padStart(2, '0')));
      const body = el('div');
      body.append(el('strong', null, title));
      body.append(el('span', null, done ? '已完成' : '待展开'));
      row.append(body);
      row.append(el('time', null, group));
      box.append(row);
    });
  }

  function renderRequests() {
    const box = $('requests');
    box.innerHTML = '';
    state.requests.slice(-3).reverse().forEach(([title, note]) => {
      const card = el('div', 'review-card');
      card.append(el('h3', null, title));
      card.append(el('p', null, note));
      card.append(el('span', 'review-mark', '历史记录 · 已确认'));
      box.append(card);
    });
  }

  function renderActivity() {
    const box = $('activity');
    box.innerHTML = '';
    if (!activity.length) { box.append(el('p', 'empty', '暂无进展记录。')); return; }
    activity.slice(-6).reverse().forEach(text => {
      const row = el('div', 'activity-row');
      row.append(el('i', 'activity-dot'));
      row.append(el('span', null, text));
      box.append(row);
    });
  }

  function renderImages(list) {
    const box = $('image-gallery');
    box.innerHTML = '';
    list.forEach(([src, label]) => {
      const button = el('button', 'thumb');
      button.type = 'button';
      const img = el('img');
      img.src = src;
      img.alt = label;
      button.append(img);
      button.append(el('span', null, label));
      button.addEventListener('click', () => openImage(src, label));
      box.append(button);
    });
    $('image-count').textContent = list.length;
    $('process-images').hidden = false;
  }

  function setVideo(src, label) {
    const player = $('preview-video');
    player.pause();
    player.src = src;
    $('video-title').textContent = label;
    document.querySelectorAll('[data-video]').forEach(b => b.classList.toggle('active', b.dataset.video === src));
  }

  function renderVideos(list) {
    const box = $('video-options');
    box.innerHTML = '';
    list.forEach(([src, label]) => {
      const button = el('button', 'media-option');
      button.type = 'button';
      button.dataset.video = src;
      button.append(el('b', null, '▶'));
      button.append(el('span', null, label));
      button.addEventListener('click', () => setVideo(src, label));
      box.append(button);
    });
    $('video-count').textContent = list.length;
    $('process-videos').hidden = false;
    setVideo(list[0][0], list[0][1]);
  }

  function setCompare(index) {
    const [label, a, b] = COMPARES[index];
    state.compare = index;
    $('compare-a').src = a[0];
    $('compare-a-label').textContent = a[1];
    $('compare-b').src = b[0];
    $('compare-b-label').textContent = b[1];
    document.querySelectorAll('[data-compare]').forEach(btn => btn.classList.toggle('active', Number(btn.dataset.compare) === index));
    $('compare-section').hidden = false;
    return label;
  }

  function renderCompareTabs() {
    const box = $('compare-tabs');
    box.innerHTML = '';
    COMPARES.forEach(([label], i) => {
      const button = el('button', 'compare-tab', label);
      button.type = 'button';
      button.dataset.compare = String(i);
      button.addEventListener('click', () => setCompare(i));
      box.append(button);
    });
  }

  function renderArtifacts() {
    const box = $('files');
    box.innerHTML = '';
    const list = ARTIFACTS.filter(a => state.filter === 'all' || a[0] === state.filter || (state.filter === 'video' && a[0] === 'audio'));
    $('artifact-count').textContent = `${list.length} 个文件 · 共 ${ARTIFACTS.length} 个`;
    list.forEach(([kind, label, src]) => {
      const card = el('button', 'artifact-card');
      card.type = 'button';
      if (kind === 'image') { const img = el('img'); img.src = src; img.alt = label; card.append(img); }
      else card.append(el('span', 'artifact-icon', kind === 'script' ? '▤' : kind === 'audio' ? '♫' : '▶'));
      card.append(el('strong', null, label));
      card.append(el('small', null, kind === 'script' ? src : '点击预览'));
      card.addEventListener('click', () => kind === 'image' ? openImage(src, label) : openArtifact(kind, label, src));
      box.append(card);
    });
    document.querySelectorAll('[data-artifact-filter]').forEach(b => b.classList.toggle('active', b.dataset.artifactFilter === state.filter));
  }

  function renderHistory() {
    const box = $('history-list');
    box.innerHTML = '';
    HISTORY.forEach(([title, meta]) => {
      const row = el('div', 'history-row');
      const body = el('div');
      body.append(el('strong', null, title));
      body.append(el('small', null, meta));
      row.append(body);
      row.append(el('span', 'history-mark', '静态记录'));
      box.append(row);
    });
  }

  function openImage(src, label) {
    $('image-title').textContent = label;
    const img = $('preview-image');
    img.src = src;
    img.alt = label;
    $('image-location').textContent = src;
    $('image-dialog').showModal();
  }

  function openArtifact(kind, label, src) {
    $('artifact-dialog-kind').textContent = kind === 'script' ? 'SCRIPT / RECORD' : 'MEDIA PREVIEW';
    $('artifact-dialog-title').textContent = label;
    const box = $('artifact-preview');
    box.innerHTML = '';
    if (kind === 'script') box.append(el('p', 'preview-copy', src));
    else if (src.endsWith('.mp3')) { const audio = el('audio'); audio.src = src; audio.controls = true; box.append(audio); }
    else { const video = el('video'); video.src = src; video.controls = true; video.preload = 'metadata'; box.append(video); }
    $('artifact-location').textContent = kind === 'script' ? '静态记录 · 无媒体文件' : src;
    $('artifact-dialog').showModal();
  }

  function addMessage(role, text) {
    const wrap = el('div', `message ${role}`);
    wrap.append(el('small', null, role === 'user' ? '你' : 'T剪辑Agent'));
    wrap.append(el('p', 'message-body', text));
    $('messages').append(wrap);
    $('messages').scrollTop = $('messages').scrollHeight;
  }

  function formatElapsed(seconds) {
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  }

  function applyStep(step) {
    addMessage(step.role || 'agent', step.text);
    state.progress += 1;
    $('elapsed').textContent = step.done ? PROJECT.elapsed : formatElapsed(Math.round(TOTAL_SECONDS * state.progress / REPLAY.length));
    if (typeof step.stage === 'number') renderStage(step.stage);
    if (step.activity) { activity.push(step.activity); renderActivity(); }
    if (typeof step.task === 'number' && step.task > state.tasksDone) { state.tasksDone = step.task; renderTasks(); }
    if (step.request) { state.requests.push(step.request); renderRequests(); }
    if (step.images) renderImages(step.images);
    if (step.videos) renderVideos(step.videos);
    if (typeof step.compare === 'number') setCompare(step.compare);
    $('status').textContent = step.done ? PROJECT.status : '回放中';
    if (step.done) $('file-count').textContent = PROJECT.files;
  }

  function setBusy(percent) {
    $('busy-pct').textContent = `${percent}%`;
    $('busy-fill').style.width = `${percent}%`;
  }

  function advance() {
    if (state.index >= REPLAY.length) { addMessage('agent', '历史回放已结束。这是已完成项目的静态记录，不会继续执行任务。'); return; }
    let pending = 0;
    for (let i = state.index; i < REPLAY.length && REPLAY[i].role !== 'user'; i += 1) pending += 1;
    const ticksPerStep = 20;
    const totalTicks = Math.max(ticksPerStep, pending * ticksPerStep);
    let tick = 0;
    state.busy = true;
    setBusy(0);
    $('busy').hidden = false;
    const timer = setInterval(() => {
      tick += 1;
      setBusy(Math.min(100, Math.round(tick / totalTicks * 100)));
      if (tick % ticksPerStep === 0 && state.index < REPLAY.length && REPLAY[state.index].role !== 'user') {
        applyStep(REPLAY[state.index]);
        state.index += 1;
      }
      if (tick < totalTicks) return;
      clearInterval(timer);
      setBusy(100);
      setTimeout(() => {
        $('busy').hidden = true;
        state.busy = false;
        if (state.index < REPLAY.length && REPLAY[state.index].role === 'user') {
          $('prompt').value = REPLAY[state.index].text;
          state.index += 1;
        }
      }, 320);
    }, 90);
  }

  function switchTab(tab) {
    state.tab = tab;
    document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    $('work-panel').hidden = tab !== 'work';
    $('files-panel').hidden = tab !== 'files';
    if (tab === 'files') renderArtifacts();
  }

  function reset() {
    state.started = false;
    state.busy = false;
    state.index = 0;
    state.progress = 0;
    state.tasksDone = -1;
    state.turns = 0;
    state.requests = [];
    activity.length = 0;
    $('messages').innerHTML = '';
    $('busy').hidden = true;
    setBusy(0);
    $('layout').classList.add('welcome');
    $('process-images').hidden = true;
    $('process-videos').hidden = true;
    $('compare-section').hidden = true;
    $('compare-a').removeAttribute('src');
    $('compare-b').removeAttribute('src');
    $('preview-video').removeAttribute('src');
    $('video-title').textContent = '';
    $('status').textContent = '尚未开始';
    $('elapsed').textContent = '00:00';
    $('file-count').textContent = '0';
    $('turn-count').textContent = '0';
    $('prompt').value = PROMPT;
    renderInputs();
    renderStage(-1);
    renderTasks();
    renderRequests();
    renderActivity();
    switchTab('work');
  }

  function setupSettings() {
    const themeNames = { white: '白', gray: '灰', black: '黑' };
    const languageNames = { 'zh-hans': '简体', 'zh-hant': '繁體', en: 'English' };
    const settings = el('div', 'settings-dock');
    settings.innerHTML = `
      <button class="settings-toggle" type="button" data-settings-toggle aria-label="收起右上角设置" aria-expanded="true">
        <span aria-hidden="true">&gt;</span><span class="visually-hidden">收起右上角设置</span>
      </button>
      <div class="settings-content">
        <div class="language-control">
          <span class="settings-label">语言 / LANGUAGE</span>
          <div class="language-options">
            <button type="button" data-language-choice="zh-hans">简体</button>
            <button type="button" data-language-choice="zh-hant">繁體</button>
            <button type="button" data-language-choice="en">English</button>
          </div>
        </div>
        <div class="theme-control">
          <span class="settings-label">页面配色 / THEME</span>
          <div class="theme-options">
            <button type="button" data-theme-choice="white"><i></i><span>白</span></button>
            <button type="button" data-theme-choice="gray"><i></i><span>灰</span></button>
            <button type="button" data-theme-choice="black"><i></i><span>黑</span></button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(settings);

    const settingsToggle = settings.querySelector('[data-settings-toggle]');

    function applyTheme(theme) {
      const next = themeNames[theme] ? theme : 'white';
      document.body.dataset.theme = next;
      document.querySelectorAll('[data-theme-choice]').forEach(button => {
        const active = button.dataset.themeChoice === next;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      const themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) themeMeta.content = next === 'black' ? '#101319' : (next === 'gray' ? '#d2d5d8' : '#edf1f6');
      try { localStorage.setItem('tjm-theme', next); } catch (error) { /* no-op */ }
    }

    function applyLanguage(language) {
      const next = languageNames[language] ? language : 'zh-hans';
      document.documentElement.lang = next === 'en' ? 'en' : (next === 'zh-hant' ? 'zh-Hant' : 'zh-CN');
      document.body.dataset.language = next;
      document.querySelectorAll('[data-language-choice]').forEach(button => {
        const active = button.dataset.languageChoice === next;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      const labels = settings.querySelectorAll('.settings-label');
      labels[0].textContent = next === 'en' ? 'LANGUAGE' : (next === 'zh-hant' ? '語言 / LANGUAGE' : '语言 / LANGUAGE');
      labels[1].textContent = next === 'en' ? 'THEME' : (next === 'zh-hant' ? '頁面配色 / THEME' : '页面配色 / THEME');
      const translatedThemes = next === 'en' ? ['White', 'Gray', 'Black'] : ['白', '灰', '黑'];
      settings.querySelectorAll('[data-theme-choice] span').forEach((label, index) => { label.textContent = translatedThemes[index]; });
      try { localStorage.setItem('tjm-language-v2', next); } catch (error) { /* no-op */ }
    }

    function setSettingsCollapsed(collapsed) {
      settings.classList.toggle('settings-collapsed', collapsed);
      settingsToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      settingsToggle.setAttribute('aria-label', collapsed ? '展开右上角设置' : '收起右上角设置');
      settingsToggle.querySelector('[aria-hidden]').textContent = collapsed ? '<' : '>';
      settingsToggle.querySelector('.visually-hidden').textContent = collapsed ? '展开右上角设置' : '收起右上角设置';
      try { localStorage.setItem('tjm-settings-dock', collapsed ? 'collapsed' : 'open'); } catch (error) { /* no-op */ }
    }

    settings.addEventListener('click', event => {
      const toggle = event.target.closest('[data-settings-toggle]');
      if (toggle) {
        setSettingsCollapsed(!settings.classList.contains('settings-collapsed'));
        return;
      }
      const language = event.target.closest('[data-language-choice]');
      const theme = event.target.closest('[data-theme-choice]');
      if (language) applyLanguage(language.dataset.languageChoice);
      if (theme) applyTheme(theme.dataset.themeChoice);
    });

    let savedTheme = 'white';
    let savedLanguage = 'zh-hans';
    let savedCollapsed = false;
    try {
      const query = new URLSearchParams(location.search);
      savedTheme = query.get('theme') || localStorage.getItem('tjm-theme') || 'white';
      savedLanguage = query.get('lang') || localStorage.getItem('tjm-language-v2') || 'zh-hans';
      savedCollapsed = localStorage.getItem('tjm-settings-dock') === 'collapsed';
    } catch (error) { /* no-op */ }
    applyTheme(savedTheme);
    applyLanguage(savedLanguage);
    setSettingsCollapsed(savedCollapsed);
  }

  document.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
  document.querySelectorAll('[data-artifact-filter]').forEach(b => b.addEventListener('click', () => { state.filter = b.dataset.artifactFilter; renderArtifacts(); }));
  document.querySelectorAll('[data-starter]').forEach(b => b.addEventListener('click', () => { $('prompt').value = b.dataset.starter; $('prompt').focus(); }));

  $('composer').addEventListener('submit', event => {
    event.preventDefault();
    if (state.busy) return;
    const input = $('prompt');
    const text = input.value.trim() || PROMPT;
    if (!state.started) { state.started = true; $('layout').classList.remove('welcome'); renderTasks(); }
    addMessage('user', text);
    state.turns += 1;
    $('turn-count').textContent = state.turns;
    input.value = '';
    advance();
  });

  $('prompt').addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') $('composer').requestSubmit(); });
  $('new-chat').addEventListener('click', reset);
  $('history-button').addEventListener('click', () => { renderHistory(); $('history-dialog').showModal(); });
  $('close-history').addEventListener('click', () => $('history-dialog').close());
  $('add-demo-folder').addEventListener('click', () => { $('attach-menu').open = false; renderInputs(); $('prompt').focus(); });
  $('show-inputs').addEventListener('click', () => { $('attach-menu').open = false; switchTab('work'); $('input-summary').scrollIntoView({ block: 'nearest' }); });
  $('close-image').addEventListener('click', () => { $('image-dialog').close(); $('preview-image').removeAttribute('src'); });
  $('close-artifact').addEventListener('click', () => { $('artifact-dialog').close(); $('artifact-preview').innerHTML = ''; });

  setupSettings();
  renderCompareTabs();
  reset();
})();
