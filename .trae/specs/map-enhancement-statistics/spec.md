# 地图模式增强与统计功能 Spec

## Why
当前地图功能在省级/市级模式下地区选择逻辑相同，无法区分不同粒度的选择；缺少数据持久化存储；无统计数据展示；需要一套统一的地区图标库提升视觉体验。

## What Changes
- **模式切换逻辑优化**：省级模式限制只能选择省级行政区（含港澳），市级模式可选择到市级行政区
- **数据持久化**：使用 Pinia 分别存储省级和市级的点亮数据，支持状态持久化
- **SVG 图标库**：创建全国 34 个省级行政区的缩写 SVG 图标组件
- **新增统计页面**：底部 TabBar 新增"统计"入口，展示已点亮地区的列表

## Impact
- Affected specs: 无（新功能）
- Affected code:
  - `src/views/home/index.vue` - 模式切换和地区选择逻辑重构
  - `src/store/index.ts` 或新建 store - 新增 Pinia 状态管理
  - `src/components/icons/` - 新建 SVG 图标库目录
  - `src/views/statistics/index.vue` - 新建统计页面
  - `src/views/layout/index.vue` - TabBar 增加统计入口
  - `src/router/root.ts` - 新增路由配置

## ADDED Requirements

### Requirement: 模式切换与地区选择联动
系统 SHALL 根据当前模式（省级/市级）动态调整地区选择器的可选范围：

#### Scenario: 切换到省级模式
- **WHEN** 用户将模式从"市级"切换为"省级"
- **THEN** 地区级联选择器仅显示第一层级选项（省/直辖市/自治区/特别行政区）
- **THEN** 选择器不支持进入第二层级（市级）
- **THEN** 选中的省份直接添加到省级点亮列表

#### Scenario: 切换到市级模式
- **WHEN** 用户将模式从"省级"切换为"市级"
- **THEN** 地区级联选择器恢复完整的三级联动（省→市→区）
- **THEN** 用户可以选择到具体城市
- **THEN** 选中的城市添加到市级点亮列表

### Requirement: 双模式数据独立存储
系统 SHALL 使用 Pinia Store 分别管理省级和市级的点亮数据：

#### Scenario: 数据存储与读取
- **WHEN** 用户在任一模式下点亮地区
- **THEN** 数据自动保存到对应的模式存储中（provinceData / cityData）
- **THEN** 页面刷新后数据不丢失（通过 pinia-plugin-persistedstate）
- **THEN** 切换模式时，地图显示对应模式的点亮数据

### Requirement: 省级行政区 SVG 图标库
系统 SHALL 提供一套包含全国所有省级行政区的 SVG 缩写图标组件：

#### Scenario: 图标展示
- **WHEN** 在统计页面或其他需要展示省份标识的场景
- **THEN** 可通过组件名引用对应省份的缩写图标（如 `<IconBeijing />`, `<IconShanghai />`）
- **THEN** 图标使用柔和的配色方案（避免高饱和度刺眼颜色）
- **THEN** 图标尺寸统一、风格一致

#### 覆盖范围（34 个省级行政区）
| 类型 | 数量 | 示例 |
|------|------|------|
| 省 | 23 | 冀、晋、辽、吉、黑、苏、浙、皖、闽、赣、鲁、豫、鄂、湘、粤、琼、川、贵、云、陕、甘、青、台 |
| 直辖市 | 4 | 京、津、沪、渝 |
| 自治区 | 5 | 内蒙古、桂、藏、宁、新 |
| 特别行政区 | 2 | 港、澳 |

### Requirement: 统计页面
系统 SHALL 提供独立的统计页面，展示用户点亮的地区数据：

#### Scenario: 统计页面展示
- **WHEN** 用户点击底部 TabBar 的"统计"按钮
- **THEN** 显示两个区域："省级点亮" 和 "市级点亮"
- **THEN** 省级列表每条记录前显示对应省份的 SVG 缩写图标
- **THEN** 市级列表显示城市名称及所属省份
- **THEN** 列表为空时显示空状态提示文字

#### Scenario: TabBar 导航
- **WHEN** 用户查看应用布局
- **THEN** 底部 TabBar 包含三个入口：首页、统计、我的
- **THEN** "统计" Tab 使用合适的 Vant 图标（如 `chart-trending-o` 或 `bar-chart-o`）

## MODIFIED Requirements

### Requirement: 首页地图视图
原有的首页地图功能需进行以下修改：
- 移除硬编码的高亮初始数据（`{ name: "杭州市", selected: true }`）
- 高亮数据改为从 Pinia Store 读取
- 模式切换时同步更新级联选择器的配置
- 地图重置功能需同时清除当前模式的 Store 数据

### Requirement: 应用布局
原有的 Layout 组件需进行调整：
- TabBar 从 2 个入口扩展为 3 个（首页、统计、我的）
- 内容区域增加 Statistics 视图的渲染控制

## REMOVED Requirements
无
