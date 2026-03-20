/**
 * 侧边栏配置
 *
 * 每个 section 对应侧边栏中的一个折叠分组。
 * 你可以自由增删、调整顺序、修改图标和标题。
 *
 * - contentPath: 对应 content/ 下的子目录，用于 queryContent 查询
 * - title: 侧边栏中显示的分组标题
 * - icon: 分组标题前的图标（emoji 或文字）
 * - titleSuffix: 从文章 title 中自动去除的后缀（可选）
 * - showStatus: 是否在链接旁显示状态小圆点，默认 true
 */

export interface SidebarSectionConfig {
  /** content/ 下的子目录路径，如 '/games' */
  contentPath: string
  /** 侧边栏显示的分组标题 */
  title: string
  /** 标题前的图标 */
  icon: string
  /** 从文章 title 中自动去除的后缀文字（可选） */
  titleSuffix?: string
  /** 是否显示状态指示器，默认 true */
  showStatus?: boolean
  /** 首页卡片的简短描述（可选） */
  homeDescription?: string
}

/**
 * 侧边栏分组配置列表
 * 按数组顺序渲染，调整顺序即可改变侧边栏中的显示顺序
 */
export const sidebarSections: SidebarSectionConfig[] = [
  {
    contentPath: '/games',
    title: '游戏分析',
    icon: '🎮',
    titleSuffix: ' - 相机系统分析',
    showStatus: false,
    homeDescription: '逐款拆解主流动作游戏的相机设计',
  },
  {
    contentPath: '/aitest',
    title: 'AI迭代测试',
    icon: '🤖',
    showStatus: false,
    homeDescription: 'AI 辅助生成的分析迭代测试',
  },
  /*
  {
    contentPath: '/topics',
    title: '专题对比',
    icon: '📊',
    titleSuffix: ' - 相机系统分析',
    showStatus: false,
    homeDescription: '跨游戏的相机特性横向对比',
  },
  {
    contentPath: '/notes',
    title: '笔记',
    icon: '📝',
    showStatus: false,
    homeDescription: '灵感记录与随笔',
  },
  */
]
