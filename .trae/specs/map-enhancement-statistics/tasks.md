# Tasks

- [x] Task 1: 创建 Pinia Store 管理地图数据
  - [x] 创建 `src/store/mapStore.ts`，定义 MapStore
  - [x] 实现 provinceData（省级点亮数据）和 cityData（市级点亮数据）两个 state
  - [x] 实现 addProvince(name) 和 addCity(name) 两个 action
  - [x] 实现 resetProvince() 和 resetCity() 重置方法
  - [x] 配置持久化存储（persist plugin）
  - [x] 导出 store 实例并在 main.ts 中注册

- [x] Task 2: 重构首页模式切换与地区选择逻辑
  - [x] 引入 MapStore 替代本地 ref 状态管理
  - [x] 实现模式切换时动态配置 Cascader options：
    - 省级模式：过滤 options 仅保留第一层级，移除 children
    - 市级模式：恢复完整的三级联动数据
  - [x] 修改 onFinish 回调，根据当前模式调用对应的 Store action
  - [x] 修改 updateHighlightData 方法，从 Store 读取数据驱动地图渲染
  - [x] 修改 resetMap 方法，清除当前模式的 Store 数据
  - [x] 移除硬编码的初始高亮数据

- [x] Task 3: 创建省级行政区 SVG 图标库
  - [x] 创建 `src/components/icons/` 目录
  - [x] 设计统一的图标规范（尺寸、配色、字体、圆角等）
  - [x] 创建 34 个省级行政区的 SVG 图标组件：
    - 4 个直辖市：IconBeijing、IconTianjin、IconShanghai、IconChongqing
    - 23 个省份：IconHebei、IconShanxi、IconLiaoning、IconJilin、IconHeilongjiang、IconJiangsu、IconZhejiang、IconAnhui、IconFujian、IconJiangxi、IconShandong、IconHenan、IconHubei、IconHunan、IconGuangdong、IconHainan、IconSichuan、IconGuizhou、IconYunnan、IconShaanxi、IconGansu、IconQinghai、IconTaiwan
    - 5 个自治区：IconInnerMongolia、IconGuangxi、IconTibet、IconNingxia、IconXinjiang
    - 2 个特别行政区：IconHongKong、IconMacau
  - [x] 创建统一导出文件 `src/components/icons/index.ts`

- [x] Task 4: 新建统计页面
  - [x] 创建 `src/views/statistics/index.vue`
  - [x] 实现页面布局：标题 + 两个列表区域（省级/市级）
  - [x] 从 MapStore 读取 provinceData 和 cityData
  - [x] 省级列表：每条记录前显示对应 SVG 图标 + 省份名称
  - [x] 市级列表：显示城市名称，可附加所属省份信息
  - [x] 实现空状态展示（使用 Vant 的 Empty 组件）

- [x] Task 5: 更新路由与布局配置
  - [x] 在 `src/router/root.ts` 中添加统计页路由配置
  - [x] 修改 `src/views/layout/index.vue`：
    - TabBar 增加第三个入口"统计"
    - 内容区域增加 Statistics 视图的 v-show 控制
    - 调整 active ref 的范围

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 4] depends on [Task 1, Task 3]
- [Task 5] depends on [Task 4]
