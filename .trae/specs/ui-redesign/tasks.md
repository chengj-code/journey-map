# Tasks

- [x] Task 1: 创建新首页组件（仪表盘式设计）
  - [x] 创建 `src/views/home/index.vue`（完全重写）
  - [x] 实现顶部导航区（Logo + 搜索 + 通知图标）
  - [x] 实现 Hero Card 主视觉卡片：
    - 深色渐变背景
    - 统计数据展示（已点亮地区数、省级/市级分布）
    - CTA 按钮"查看地图"，点击跳转到 /map
  - [x] 实现快捷功能网格（4 列布局）：
    - 地图入口、统计、图标库、收藏（预留）
    - 圆角卡片 + 图标 + 文字
  - [x] 实现最近点亮列表（最近 5 条记录）
  - [x] 应用全局样式变量和设计规范
  - [x] 从 mapStore 读取数据驱动展示

- [x] Task 2: 创建独立地图页面
  - [x] 创建 `src/views/map/index.vue`
  - [x] 将原 `src/views/home/index.vue` 的地图代码迁移到此文件
  - [x] 添加页面级导航栏（标题"足迹地图"+ 返回按钮）
  - [x] 确保所有地图功能正常（模式切换、地区选择、ECharts 渲染）

- [x] Task 3: 重设计个人中心页面
  - [x] 重写 `src/views/user/index.vue`
  - [x] 实现用户信息头部（头像、昵称、手机号、编辑资料）
  - [x] 实现数据统计卡片区（总计/省级/市级）
  - [x] 实现功能菜单列表（图标设置、历史、设置等）
  - [x] 实现退出登录按钮

- [x] Task 4: 更新路由配置
  - [x] 在 `src/router/root.ts` 中添加 `/map` 路由（指向新地图页）
  - [x] 确认 `/home` 路由指向新的仪表盘首页
  - [x] 确保路由名称和路径正确

- [x] Task 5: 全局样式优化（集成在组件中）
  - [x] 配色方案应用（深墨色 + 强调绿 + 浅灰背景）
  - [x] 圆角规范应用（8px/12px/16px/20px）
  - [x] 阴影系统应用（三级层次）
  - [x] 字体层级清晰（标题/数字/正文/辅助）

- [x] Task 6: 统计页面现代化重设计
  - [x] 重写 `src/views/statistics/index.vue`
  - [x] 添加页面导航栏（返回按钮 + 标题"点亮统计"）
  - [x] 实现统计概览卡片（深色渐变背景 + 总数 + 省市分布）
  - [x] 实现可折叠面板（van-collapse + van-collapse-item）
  - [x] 省级点亮面板：默认收起，点击展开显示列表
  - [x] 市级点亮面板：默认收起，点击展开显示列表
  - [x] 省级列表项使用 IconProvince 组件显示 SVG 图标
  - [x] 市级列表项从 fullName 解析省份名 → IconProvince 图标
  - [x] 市级显示完整路径（省/市）而非仅市名
  - [x] 清理旧的 34 个独立 icon 组件 import，统一用 IconProvince
  - [x] 空状态处理（van-empty 提示）

# Task Dependencies
- [Task 2] depends on [] (可与 Task 1 并行) ✅
- [Task 3] depends on [] ✅
- [Task 4] depends on [Task 1, Task 2] ✅
- [Task 5] depends on [] (可与任何任务并行) ✅
- [Task 6] depends on [] ✅
