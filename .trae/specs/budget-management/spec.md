# 预算管理功能 Spec

## Why
当前记账本已有完整的收支记录功能，但缺少预算控制能力。用户只能"记流水账"，无法设定消费目标、追踪进度、预警超支。增加预算管理功能可以让记账从"被动记录"升级为"主动控制"，形成完整闭环。

## What Changes
- 新增 `Budget` 类型定义（总预算 + 分类预算）
- 扩展 `accountingStore` 增加预算 CRUD 和预算状态计算（已用/剩余/百分比）
- 新增 `BudgetCard.vue` 组件：在列表模式汇总卡片下方展示预算进度条
- 新增 `BudgetSetup.vue` 弹窗组件：设置/编辑月度预算额度
- 修改 `accounting/index.vue`：集成 BudgetCard 和入口按钮
- 统计视图 StatisticsView 中增加预算完成度对比

## Impact
- Affected specs: accounting-book（扩展）
- Affected code:
  - `src/types/accounting.ts` — 新增 Budget 接口
  - `src/store/accountingStore.ts` — 新增 budget 相关 state/getters/actions
  - `src/components/accounting/BudgetCard.vue` — **新建** 预算进度卡片
  - `src/components/accounting/BudgetSetup.vue` — **新建** 预算设置弹窗
  - `src/views/accounting/index.vue` — 集成预算卡片和设置入口

---

## ADDED Requirements

### Requirement: 预算数据模型
系统 SHALL 提供预算数据结构，支持按月份设定预算。

#### 数据结构
```
Budget {
  id: string              // 预算 ID
  bookId: string           // 所属账本
  year: number             // 年份
  month: number            // 月份 (1-12)
  totalAmount: number      // 总预算金额
  categories: {            // 分类预算（可选）
    [categoryName: string]: number   // 分类 → 预算上限
  }
  createdAt: string
  updatedAt: string
}
```

#### Scenario: 默认预算
- **WHEN** 用户首次进入记账页面且当月无预算
- **THEN** 系统不自动创建预算，BudgetCard 显示"设置本月预算"引导

### Requirement: 预算设置弹窗
系统 SHALL 提供预算设置界面，允许用户配置月度预算。

#### Scenario: 设置总预算
- **WHEN** 用户点击"设置预算"或"编辑预算"
- **THEN** 弹出底部弹窗，包含：
  - 总预算金额输入框（数字键盘）
  - 常用快捷金额按钮（¥1000 / ¥3000 / ¥5000 / ¥10000）
  - 确认/取消按钮

#### Scenario: 设置分类预算
- **WHEN** 用户设置了总预算后，可展开"分类预算"
- **THEN** 显示各支出分类的独立预算输入：
  - 餐饮、交通、购物、居住、医疗、教育、娱乐、人情、数码、旅行
  - 每个分类可单独设额或不设（不设则归入总预算池）
  - 各分类预算之和不应超过总预算（超出时提示警告）

### Requirement: 预算进度展示
系统 SHALL 在列表模式下实时展示预算使用情况。

#### Scenario: 有预算时的展示
- **WHEN** 当月已设预算且有收支记录
- **THEN** BudgetCard 显示：
  - 总预算进度条（圆角矩形进度条）
  - 已用 / 预算 金额文字（如 "¥1,200 / ¥3,000"）
  - 百分比数字（如 "40%"）
  - 进度条颜色：< 70% 绿色 / 70%-90% 橙色 / > 90% 红色
  - 剩余金额提示（如 "还剩 ¥1,800"）

#### Scenario: 超支状态
- **WHEN** 已用金额超过预算
- **THEN** 进度条显示为红色满条，百分比显示 "超支 XX%"
- 金额显示为 "-¥200 / ¥3,000"

#### Scenario: 无预算时
- **WHEN** 当月未设置预算
- **THEN** 显示引导卡片："📋 设置本月预算，轻松掌控支出" + 设置按钮

### Requirement: 分类预算明细
系统 SHALL 展示各分类的预算使用情况。

#### Scenario: 分类预算列表
- **WHEN** 用户设置了分类预算且点击 BudgetCard
- **THEN** 展开/弹出分类预算详情：
  - 每个有预算的分类一行：名称 | 进度条 | 已用/预算
  - 未设预算的分类不显示
  - 点击某行可快速调整该分类预算

### Requirement: Store 预算计算逻辑
系统 SHALL 自动基于当前筛选时间范围的记录计算预算状态。

#### Getters:
- `currentBudget`: 返回当前筛选月份对应的 Budget 对象（无则 null）
- `budgetStatus`: 计算当前预算状态 `{ spent, remaining, percentage, isOver }`
- `categoryBudgetStatus`: 计算各分类预算状态数组

#### Actions:
- `setBudget(data)`: 创建或更新指定月份预算
- `deleteBudget(year, month)`: 删除指定月份预算
- `copyBudget(fromYear, fromMonth, toYear, toMonth)`: 复制预算到其他月份

### Requirement: 预算与筛选联动
系统 SHALL 根据当前筛选的时间范围匹配对应预算。

#### Scenario: 切换筛选范围
- **WHEN** 用户切换筛选到"近三月"
- **THEN** BudgetCard 显示最近一个完整月的预算状态（而非三个月汇总）
- **WHEN** 用户选择自定义日期区间跨多个月
- **THEN** 显示区间起始月的预算状态，并标注"仅显示首月预算"

### Requirement: 统计视图集成
系统 SHALL 在统计视图中增加预算对比维度。

#### Scenario: 统计页预算信息
- **WHEN** 用户切换到统计模式且当月有预算
- **THEN** 在 overview-card 中增加一行"预算进度"
  - 显示进度小条 + 百分比
  - 与收支数据并列展示

---

## MODIFIED Requirements

### Requirement: FilterState 兼容
现有 FilterState 不变。预算计算依赖 startDate/endDate 推断目标月份，无需新增字段。

### Requirement: 数据持久化
预算数据通过 pinia-plugin-persistedstate 与现有数据一起持久化到 localStorage，key 保持 `accounting-store-v2`。
