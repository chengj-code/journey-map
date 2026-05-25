# Tasks

- [x] Task 1: 创建图标颜色配置 Store
  - [x] 创建 `src/store/iconStore.ts`
  - [x] 定义 IconColorConfig 接口（backgroundColor, textColor）
  - [x] 实现 state: colorConfigs (Record<string, IconColorConfig>)
  - [x] 实现 action: setIconColor(provinceName, bgColor, textColor)
  - [x] 实现 action: getIconColor(provinceName) -> 返回配置或默认值
  - [x] 实现 action: resetIconColor(provinceName) -> 重置为默认颜色
  - [x] 配置持久化存储 (key: 'icon-color-store')
  - [x] 在 `src/store/index.ts` 中导出

- [x] Task 2: 创建统一省份图标组件
  - [x] 创建 `src/components/icons/IconProvince.vue`
  - [x] 定义 Props 接口：provinceName, label, size, backgroundColor, textColor
  - [x] 内置 34 个省级行政区默认马卡龙配色方案
  - [x] 实现颜色覆盖优先级逻辑
  - [x] 更新 `src/components/icons/index.ts` 导出新组件

- [x] Task 3: 创建图标展示页面
  - [x] 创建 `src/views/icon-gallery/index.vue`
  - [x] 使用 IconProvince 统一组件替代 34 个独立组件导入
  - [x] 实现响应式网格布局（CSS Grid auto-fill）
  - [x] 从 iconStore 读取每个图标的颜色配置并传递给图标组件
  - [x] 实现点击事件处理：打开弹窗并传入当前省份信息

- [x] Task 4: 实现颜色配置弹窗 + 重置功能
  - [x] 集成 van-popup 组件（底部弹出，圆角，60%高度）
  - [x] 弹窗标题显示当前选中的省份名称
  - [x] 大号预览图标（80px）实时显示颜色变化
  - [x] 背景色选择器：原生 color input + 文本输入 + 预设色板
  - [x] 文字色选择器：原生 color input + 文本输入 + 预设色板
  - [x] 底部按钮栏："取消"、"重置"、"保存"三个按钮
  - [x] 本地临时状态管理（编辑中的颜色不立即影响 Store）
  - [x] 实时预览功能正常工作
  - [x] 保存逻辑：调用 iconStore.setIconColor()
  - [x] 取消逻辑：关闭弹窗不保存修改
  - [x] 重置逻辑：调用 iconStore.resetIconColor() 恢复默认

- [x] Task 5: 配置路由与入口
  - [x] 在 `src/router/root.ts` 中添加路由 /icon-gallery
  - [x] 路由名称: iconGallery, meta title: '图标库'

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1, Task 2]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 3]

# Additional Optimizations Completed
- [x] 清理 43 个异常的 .vue.js 垃圾文件（vue-tsc 编译产物误入 src 目录）
- [x] 删除重复的 vite.config.js 文件（保留 vite.config.ts）
- [x] 重构代码架构：从 34 个独立组件简化为 1 个通用 IconProvince 组件
- [x] 添加重置功能：支持将自定义颜色恢复为默认马卡龙配色
