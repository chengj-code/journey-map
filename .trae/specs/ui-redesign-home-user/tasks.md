# Tasks

- [ ] Task 1: 创建新首页组件（仪表盘式设计）
  - [ ] 创建 `src/views/home/index.vue`（完全重写）
  - [ ] 实现顶部导航区（Logo + 搜索 + 通知图标）
  - [ ] 实现 Hero Card 主视觉卡片：
    - 深色渐变背景
    - 统计数据展示（已点亮地区数、省级/市级分布）
    - CTA 按钮"查看地图"，点击跳转到 /map
  - [ ] 实现快捷功能网格（2x2 或 3x2）：
    - 地图入口、统计、图标库、收藏（预留）
    - 圆角卡片 + 图标 + 文字
  - [ ] 实现最近点亮列表（最近 3-5 条记录）
  - [ ] 应用全局样式变量和设计规范
  - [ ] 从 mapStore 读取数据驱动展示

- [ ] Task 2: 创建独立地图页面
  - [ ] 创建 `src/views/map/index.vue`
  - [ ] 将原 `src/views/home/index.vue` 的地图代码迁移到此文件
  - [ ] 添加页面级导航栏（标题"足迹地图"+ 返回按钮）
  - [ ] 确保所有地图功能正常（模式切换、地区选择、ECharts 渲染）

- [ ] Task 3: 重设计个人中心页面
  - [ ] 重写 `src/views/user/index.vue`
  - [ ] 实现用户信息头部（头像、昵称、手机号、编辑资料）
  - [ ] 实现数据统计卡片区（总计/省级/市级）
  - [ ] 实现功能菜单列表（图标设置、历史、设置等）
  - [ ] 实现退出登录按钮

- [ ] Task 4: 更新路由配置
  - [ ] 在 `src/router/root.ts` 中添加 `/map` 路由（指向新地图页）
  - [ ] 修改原有 `/home` 路由指向新的仪表盘首页
  - [ ] 确保路由名称和路径正确

- [ ] Task 5: 全局样式优化（可选）
  - [ ] 在 `src/styles/` 中定义 CSS 变量（配色、圆角、阴影）
  - [ ] 更新 TailwindCSS 配置扩展主题色
  - [ ] 统一组件库（Vant）主题定制

# Task Dependencies
- [Task 2] depends on [] (可与 Task 1 并行)
- [Task 3] depends on []
- [Task 4] depends on [Task 1, Task 2]
- [Task 5] depends on [] (可与任何任务并行)
