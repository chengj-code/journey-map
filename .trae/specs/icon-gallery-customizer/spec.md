# 省份图标展示与自定义颜色功能 Spec

## Why
当前项目已创建 34 个省级行政区 SVG 图标组件，但缺少统一的展示页面和自定义配色功能；用户希望能够预览所有图标并实时调整图标配色，提升视觉定制体验。

## What Changes
- **新增图标展示页面**：以网格布局展示所有 34 个省份 SVG 图标
- **交互式弹窗**：点击任意图标弹出配置弹窗
- **双颜色选择器**：分别控制背景色和文字色
- **实时预览与保存**：修改后可即时预览效果，支持保存到本地存储
- **路由集成**：将示例页面添加到应用导航中

## Impact
- Affected specs: 无（新功能）
- Affected code:
  - `src/views/icon-gallery/index.vue` - 新建图标展示页
  - `src/store/iconStore.ts` - 新建图标颜色配置 Store
  - `src/router/root.ts` - 添加新路由
  - `src/components/icons/*.vue` - 可能需要修改为支持动态颜色（通过 props）

## ADDED Requirements

### Requirement: 图标网格展示
系统 SHALL 提供一个页面，以响应式网格布局展示所有 34 个省级行政区 SVG 图标：

#### Scenario: 页面加载展示
- **WHEN** 用户访问图标展示页面
- **THEN** 页面显示标题"省份图标库"
- **THEN** 所有 34 个图标以网格形式排列（建议 4-6 列）
- **THEN** 每个图标下方显示对应省份名称
- **THEN** 图标使用当前保存的配色方案（或默认配色）

#### Scenario: 响应式布局
- **WHEN** 在不同屏幕尺寸下查看
- **THEN** 移动端显示 3-4 列，平板 5-6 列，桌面端可以更多列
- **THEN** 使用 CSS Grid 或 Flexbox 实现自适应

### Requirement: 点击图标弹出配置弹窗
系统 SHALL 支持点击图标触发配置弹窗：

#### Scenario: 打开弹窗
- **WHEN** 用户点击任意图标
- **THEN** 弹出 Vant Popup 弹窗（居中显示）
- **THEN** 弹窗标题显示当前选中的省份名称
- **THEN** 弹窗中央放大显示该图标的预览

#### Scenario: 弹窗内容
- **WHEN** 弹窗打开时
- **THEN** 显示两个颜色选择器：
  1. **背景颜色选择器**：标签"背景色"，用于设置图标背景填充色
  2. **文字颜色选择器**：标签"文字色"，用于设置缩写文字颜色
- **THEN** 每个选择器使用 Vant 的颜色选择器组件（van-field + 颜色输入/拾取器）
- **THEN** 显示当前颜色的预览圆点或色块
- **THEN** 底部提供"取消"和"保存"按钮

### Requirement: 实时颜色预览
系统 SHALL 在用户调整颜色时即时更新图标显示：

#### Scenario: 调整背景色
- **WHEN** 用户在背景色选择器中选择或输入新颜色值
- **THEN** 弹窗中的图标预览立即更新背景色
- **THEN** 不影响主列表中的图标（未保存前）

#### Scenario: 调整文字色
- **WHEN** 用户在文字色选择器中选择或输入新颜色值
- **THEN** 弹窗中的图标预览立即更新文字颜色
- **THEN** 文字颜色应与背景色有足够对比度（可选提示）

### Requirement: 保存颜色配置
系统 SHALL 允许用户保存自定义的颜色配置：

#### Scenario: 保存配置
- **WHEN** 用户点击"保存"按钮
- **THEN** 当前选择的颜色配置保存到 Pinia Store
- **THEN** Store 自动持久化到 localStorage
- **THEN** 主列表中对应的图标立即更新为新配色
- **THEN** 弹窗关闭

#### Scenario: 取消编辑
- **WHEN** 用户点击"取消"按钮或点击遮罩层关闭弹窗
- **THEN** 弹窗关闭
- **THEN** 颜色更改不保存
- **THEN** 图标恢复为之前的配色

### Requirement: 颜色数据持久化
系统 SHALL 将用户的颜色自定义配置持久化存储：

#### Scenario: 数据存储结构
- **WHEN** 保存颜色配置时
- **THEN** 数据结构如下：
```typescript
interface IconColorConfig {
  [provinceName: string]: {
    backgroundColor: string; // 如 '#A8D8EA'
    textColor: string;       // 如 '#ffffff'
  }
}
```
- **THEN** 默认值为空对象（使用图标内置默认色）
- **THEN** 通过 pinia-plugin-persistedstate 自动持久化

#### Scenario: 页面刷新后
- **WHEN** 用户刷新页面或重新访问
- **THEN** 从 localStorage 读取已保存的配置
- **THEN** 图标使用保存的配色显示

## MODIFIED Requirements

### Requirement: SVG 图标组件增强
现有的 34 个 SVG 图标组件需支持动态颜色：

#### Scenario: Props 支持
- **WHEN** 父组件传递 backgroundColor 和 textColor props
- **THEN** 图标使用传入的颜色而非硬编码的默认色
- **THEN** 未传 props 时使用默认柔和马卡龙色系

**注意**: 此项修改涉及 34 个图标组件，需统一更新模板中的 fill 绑定。

### Requirement: 应用导航扩展（可选）
如需在主界面访问此功能：

#### Scenario: 入口位置
- **WHEN** 用户查看应用
- **THEN** 可考虑以下入口方式之一：
  1. 在"我的"页面添加"图标设置"入口
  2. 在首页添加浮动按钮
  3. 作为独立页面通过 URL 访问

## REMOVED Requirements
无
