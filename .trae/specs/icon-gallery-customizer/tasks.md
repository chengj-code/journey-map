# Tasks

- [ ] Task 1: 创建图标颜色配置 Store
  - [ ] 创建 `src/store/iconStore.ts`
  - [ ] 定义 IconColorConfig 接口（backgroundColor, textColor）
  - [ ] 实现 state: colorConfigs (Record<string, IconColorConfig>)
  - [ ] 实现 action: setIconColor(provinceName, bgColor, textColor)
  - [ ] 实现 action: getIconColor(provinceName) -> 返回配置或默认值
  - [ ] 配置持久化存储 (key: 'icon-color-store')
  - [ ] 在 `src/store/index.ts` 中导出

- [ ] Task 2: 增强 SVG 图标组件支持动态颜色
  - [ ] 修改所有 34 个图标组件的 props 定义：
    - 添加 `backgroundColor?: string` prop（可选，有默认值）
    - 添加 `textColor?: string` prop（可选，有默认值）
    - 添加 `size?: number` prop（保留现有）
  - [ ] 更新模板中的 fill 绑定：
    - 背景矩形：`:fill="backgroundColor"` 替代硬编码色值
    - 文字元素：`:fill="textColor"` 替代硬编码色值
  - [ ] 确保默认值与原有马卡龙配色一致

- [ ] Task 3: 创建图标展示页面
  - [ ] 创建 `src/views/icon-gallery/index.vue`
  - [ ] 实现页面结构：
    - van-nav-bar 标题"省份图标库"
    - 响应式网格容器（CSS Grid）
    - 34 个图标卡片（图标 + 省份名称）
  - [ ] 从 iconStore 读取每个图标的颜色配置并传递给图标组件
  - [ ] 实现点击事件处理：打开弹窗并传入当前省份信息
  - [ ] 实现空状态/加载状态（如需要）

- [ ] Task 4: 实现颜色配置弹窗
  - [ ] 在 icon-gallery 页面中集成 van-popup 组件
  - [ ] 弹窗内容包含：
    - 标题：当前选中的省份名称
    - 大号预览图标（使用选中状态的颜色）
    - 背景色选择器区域：
      - 标签"背景色"
      - 颜色输入框（支持 hex 值输入）
      - 可选：预设颜色快捷选项（常用柔和色系）
    - 文字色选择器区域：
      - 标签"文字色"
      - 颜色输入框
      - 可选：预设颜色（白色、深灰、黑色等）
    - 底部按钮栏："取消"和"保存"
  - [ ] 实现本地临时状态管理（编辑中的颜色，未保存前不影响 Store）
  - [ ] 实时预览：颜色变化时更新弹窗内的图标显示
  - [ ] 保存逻辑：调用 iconStore.setIconColor()
  - [ ] 取消逻辑：关闭弹窗不保存

- [ ] Task 5: 配置路由与入口
  - [ ] 在 `src/router/root.ts` 中添加路由：
    ```
    path: '/icon-gallery'
    name: 'iconGallery'
    component: () => import('@/views/icon-gallery/index.vue')
    meta: { title: '图标库' }
    ```
  - [ ] （可选）在"我的"页面或首页添加入口链接

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1, Task 2]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 3]
