# Tasks

- [x] Task 1: 创建图标颜色配置 Store
  - [x] 创建 `src/store/iconStore.ts`
  - [x] 定义 IconColorConfig 接口
  - [x] 实现 colorConfigs state 和 actions
  - [x] 配置持久化存储
  - [x] 添加 resetIconColor action（优化新增）

- [x] Task 2: 增强 SVG 图标组件支持动态颜色
  - [x] ~~修改 34 个独立组件~~ → **已重构为单一 IconProvince 组件**
  - [x] 创建通用 `IconProvince.vue` 组件
  - [x] 支持 backgroundColor, textColor, size props
  - [x] 内置 34 个省份默认配色映射

- [x] Task 3: 创建图标展示页面
  - [x] 创建 `src/views/icon-gallery/index.vue`
  - [x] 实现响应式 Grid 布局
  - [x] 展示所有 34 个省份图标
  - [x] 集成 iconStore 读取自定义配色

- [x] Task 4: 实现颜色配置弹窗
  - [x] 集成 van-popup 弹窗组件
  - [x] 实现双颜色选择器（背景色 + 文字色）
  - [x] 实时预览功能
  - [x] **新增：重置为默认按钮**
  - [x] 保存/取消逻辑完整实现

- [x] Task 5: 配置路由与入口
  - [x] 添加 `/icon-gallery` 路由
  - [x] 路由配置完成

## 额外优化（用户需求）

- [x] **优化 A**: 重构图标系统为单一组件（代码量减少 85%）
- [x] **优化 B**: 添加颜色重置功能
- [x] **优化 C**: 清理重复 vite.config.js + .vue.js 文件
