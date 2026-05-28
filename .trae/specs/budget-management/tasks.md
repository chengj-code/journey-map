# Tasks

- [x] Task 1: 扩展类型定义 — 在 `src/types/accounting.ts` 中新增 `Budget` 接口和 `CategoryBudget` 类型
  - [x] 定义 Budget 接口（id, bookId, year, month, totalAmount, categories, createdAt, updatedAt）
  - [x] 定义 CategoryBudgetStatus 辅助类型（用于分类预算状态展示）

- [x] Task 2: 扩展 Store 预算能力 — 在 `src/store/accountingStore.ts` 中增加预算相关 state/getters/actions
  - [x] 新增 `budgets: Budget[]` 到 state
  - [x] 新增 getter: `currentBudget`（根据筛选范围匹配当月预算）
  - [x] 新增 getter: `budgetStatus`（计算已用/剩余/百分比/是否超支）
  - [x] 新增 getter: `categoryBudgetStatuses`（各分类预算状态数组）
  - [x] 新增 action: `setBudget(data)` 创建或更新预算
  - [x] 新增 action: `deleteBudget(year, month)` 删除预算
  - [x] 新增 action: `copyBudget(from, to)` 复制预算

- [x] Task 3: 创建 BudgetCard 组件 — `src/components/accounting/BudgetCard.vue`
  - [x] 无预算时：显示引导卡片 + 设置按钮
  - [x] 有预算时：总预算进度条 + 已用/预算金额 + 百分比 + 剩余提示
  - [x] 进度条颜色：<70% 绿 / 70-90% 橙 / >90% 红
  - [x] 超支时：红色满条 + "超支 XX%" + 负数剩余
  - [x] 点击展开分类预算明细（内嵌折叠面板）
  - [x] 右上角编辑按钮 → 触发 BudgetSetup 弹窗

- [x] Task 4: 创建 BudgetSetup 组件 — `src/components/accounting/BudgetSetup.vue`
  - [x] van-popup 底部弹窗形式
  - [x] 总预算金额输入（van-field type=number）
  - [x] 快捷金额按钮（1000/3000/5000/10000）
  - [x] 可展开的分类预算区域：
    - [x] 列出所有支出分类，每行一个输入框
    - [x] 分类预算之和超总预算时警告提示
  - [x] 确认保存 / 取消按钮
  - [x] props: visible, budget(编辑时传入)
  - [x] emit: confirm(budgetData), cancel

- [x] Task 5: 集成到记账页面 — 修改 `src/views/accounting/index.vue`
  - [x] 在 summary-card 下方引入 BudgetCard 组件
  - [x] 引入 BudgetSetup 弹窗组件
  - [x] 连接 store 的 budgetStatus 数据到 BudgetCard
  - [x] 处理 BudgetCard 的编辑事件打开 BudgetSetup
  - [x] 处理 BudgetSetup 的确认事件调用 store.setBudget

- [x] Task 6: 统计视图集成 — 修改 `src/views/accounting/StatisticsView.vue`
  - [x] 在 overview-card 的 overview-body 中增加"预算进度"行（当有预算时）
  - [x] 显示紧凑型进度条 + 百分比文字

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 1]
- [Task 5] depends on [Task 3] and [Task 4]
- [Task 6] depends on [Task 2] and [Task 5]
