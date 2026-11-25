// Neutral placeholder copy for the editable document layout.
export const workflowDocuments = [
  {
    filename: 'storyboard.md', caption: '分镜示例', url: '#L1', sha256: '',
    lines: ['## 分镜', '', '建立主标题与图表的先后关系。', '给两段进入动作留出间隔。', '', '## 画面检查', '在运动开始、中间和结束各停一帧。'],
  },
  {
    filename: 'timing.md', caption: '时序示例', url: '#L10', sha256: '',
    lines: ['## 时序', '', '| 图层 | 进场 |', '| 标题 | 0:00 |', '| 信息卡 | 0:02 |', '| 图表 | 0:04 |', '', '## 检查', '核对进入顺序与切换节拍。'],
  },
  {
    filename: 'review.md', caption: '复核示例', url: '#L20', sha256: '',
    lines: ['## 复核', '', '检查图层、对齐和留白。', '为每次动画切换标记检查位置。', '', '## 输出', '输出静音短片和对应源码。'],
  },
] as const;
