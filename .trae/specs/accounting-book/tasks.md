# Tasks

- [x] Task 1: 创建项目基础架构
  - [x] 创建 `src/views/accounting/` 目录结构
  - [x] 创建 `src/store/accountingStore.ts` 状态管理文件（账本、记录、标签的 CRUD）
  - [x] 定义 TypeScript 类型接口（AccountingBook, AccountingRecord, Tag）
  - [x] 配置路由 `src/router/root.ts`（/accounting 及子路由）

- [x] Task 2: 实现标签管理系统
  - [x] 创建标签管理页面 `src/views/accounting/tags/index.vue`
  - [x] 实现标签列表展示（网格布局，显示颜色+名称+使用次数）
  - [x] 实现新建/编辑标签弹窗（名称、颜色选择器、图标选择）
  - [x] 实现删除标签功能（含关联记录检测提示）
  - [x] 实现标签数据持久化（Pinia + localStorage）

- [x] Task 3: 实现账本管理系统
  - [x] 创建账本切换组件 `src/components/accounting/BookSwitcher.vue`
  - [x] 实现账本列表展示和切换逻辑
  - [x] 实现新建/编辑/删除账本功能
  - [x] 默认创建"日常账本"
  - [x] 实现账本数据持久化

- [x] Task 4: 实现收支记录 CRUD
  - [x] 创建记账表单组件 `src/components/accounting/RecordForm.vue`
  - [x] 实现快速录入界面（类型、金额、分类、日期、标签、备注）
  - [x] 实现金额输入优化（数字键盘、自动格式化）
  - [x] 实现分类预设（餐饮、交通、购物、工资等常用分类）
  - [x] 实现记录保存/编辑/删除功能
  - [x] 实现记录数据持久化

- [x] Task 5: 实现列表模式页面
  - [x] 创建主页面 `src/views/accounting/index.vue`
  - [x] 实现顶部筛选栏（年/月/日选择器 + 快捷选项）
  - [x] 实现按日期分组倒序列表（今天、昨天、更早）
  - [x] 实现记录卡片样式（图标、描述、金额、标签 Chip）
  - [x] 支出红色/收入绿色颜色区分
  - [x] 实现编辑/删除操作菜单
  - [x] 实现浮动添加按钮

- [x] Task 6: 实现统计模式页面
  - [x] 创建统计视图组件 `src/views/accounting/StatisticsView.vue`
  - [x] 实现月度总览卡片（支出/收入总额对比）
  - [x] 集成 ECharts 实现趋势图表（柱状图，支持按日/周/月聚合）
  - [x] 集成 ECharts 实现分类饼图/环形图
  - [x] 实现 Top 分类排行列表
  - [x] 支持按标签维度聚合展示
  - [x] 图表交互：点击图例筛选数据 + 响应式自适应

- [x] Task 7: 实现多维度筛选功能
  - [x] 实现时间筛选组件（年份下拉、月份下拉、日期选择器）
  - [x] 实现快捷时间选项（本月、上月、近三月、今年、全部）
  - [x] 实现标签筛选栏（多选 Chip，支持搜索）
  - [x] 筛选状态实时响应（列表/图表联动更新）
  - [x] 实现筛选条件重置功能
  - [x] 新增 FilterBar.vue 组件和 Store filterState

- [x] Task 8: 集成到应用导航
  - [x] 更新 `src/views/layout/index.vue` TabBar（4 个入口）
  - [x] 添加"记账"Tab 项（💰 图标，index=1）
  - [x] 调整 active 索引映射（Home=0, Accounting=1, Statistics=2, User=3）
  - [x] 统一样式风格与现有 TabBar 一致

- [x] Task 9: 测试与优化
  - [x] 验证完整流程：创建账本 → 添加记录 → 切换模式 → 筛选 → 查看
  - [x] 验证标签完整生命周期（增删改查 → 关联记录 → 统计展示）
  - [x] 测试数据持久化（刷新后数据不丢失）
  - [x] 移动端适配测试（响应式布局）
  - [x] 性能优化（ECharts 响应式处理）

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 2, Task 3]
- [Task 5] depends on [Task 4]
- [Task 6] depends on [Task 4]
- [Task 7] depends on [Task 5, Task 6]
- [Task 8] depends on [Task 5] (至少列表模式可用)
- [Task 9] depends on [Task 5, Task 6, Task 7, Task 8]

## 并行执行建议
- ✅ Task 2 和 Task 3 已并行开发完成
- ✅ Task 5 和 Task 6 已并行开发完成
- ✅ Task 6 和 Task 8 已并行开发完成
