# Journey Map - Code Wiki

## 📋 项目概述

**项目名称**: journey-map  
**项目类型**: 移动端 Web 应用  
**核心功能**: 旅行足迹地图可视化应用，支持用户在中国地图上标记和点亮已访问的城市/省份

### 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| **框架** | Vue 3 (Composition API) | ^3.5.21 |
| **语言** | TypeScript | ~5.8.3 |
| **构建工具** | Vite | ^7.1.7 |
| **UI 组件库** | Vant 4 (移动端) | ^4.9.21 |
| **状态管理** | Pinia + 持久化插件 | ^3.0.3 |
| **图表库** | ECharts 6 | ^6.0.0 |
| **CSS 方案** | TailwindCSS 4 + Less | ^4.1.13 |
| **路由** | Vue Router 4 (Hash 模式) | ^4.5.1 |
| **工具库** | VueUse | ^13.9.0 |

---

## 📁 项目结构

```
workspace/
├── src/
│   ├── assets/                 # 静态资源
│   │   ├── images/
│   │   │   └── avator.jfif    # 默认头像
│   │   └── map/               # 地图数据文件
│   │       ├── china.json     # 中国地图 GeoJSON
│   │       ├── 100000.json    # 省级地图数据
│   │       ├── 100000_full.json
│   │       └── 100000_full_city.json
│   ├── router/                # 路由配置
│   │   ├── index.ts           # 路由实例配置
│   │   └── root.ts            # 路由定义表
│   ├── store/                 # 状态管理 (Pinia)
│   │   └── index.ts           # Store 实例
│   ├── styles/                # 全局样式
│   │   ├── index.css          # TailwindCSS 入口
│   │   ├── reset.css          # CSS Reset
│   │   └── reset.less         # Less 样式重置
│   ├── views/                 # 页面组件
│   │   ├── home/              # 首页（地图主界面）
│   │   ├── layout/            # 应用布局（TabBar）
│   │   ├── login/             # 登录相关页面
│   │   └── user/              # 用户中心
│   ├── App.vue                # 根组件
│   └── main.ts                # 应用入口
├── package.json               # 项目依赖配置
├── vite.config.ts             # Vite 构建配置
├── tailwind.config.js         # TailwindCSS 配置
├── postcss.config.js          # PostCSS 配置
├── tsconfig.json              # TypeScript 配置
└── README.md                  # 项目说明文档
```

---

## 🚀 核心模块详解

### 1. 应用入口 ([main.ts](src/main.ts))

```typescript
// 初始化流程
1. 创建 Vue App 实例
2. 注册 Vue Router（路由管理）
3. 注册 Pinia Store（状态管理 + 持久化）
4. 引入全局样式（reset.less, index.css, vant 样式）
5. 挂载到 #app DOM 节点
```

**关键特性**:
- 使用 Hash 路由模式（`createWebHashHistory`）
- Pinia 启用了 `pinia-plugin-persistedstate` 实现状态持久化
- 全局引入 Vant 组件库样式

---

### 2. 路由系统

#### 路由配置 ([router/index.ts](src/router/index.ts))

- **路由模式**: Hash History（兼容性更好）
- **基础路径**: 通过环境变量 `VITE_BASE_URL` 配置
- **导航守卫**: 
  - `beforeEach`: 前置守卫（当前为空实现）
  - `afterEach`: 后置守卫（当前为空实现）

#### 路由定义 ([router/root.ts](src/router/root.ts))

| 路径 | 名称 | 组件 | 说明 |
|------|------|------|------|
| `/login` | index | LoginView | 登录页 |
| `/` | layout | LayoutView | 主布局（含 TabBar） |
| `/` | home | HomeView | 首页（地图） |
| `/` | user | UserView | 用户中心 |
| `/` | rename | RenameView | 重置密码页 |
| `/` | register | RegisterView | 注册页 |

**注意**: 所有子页面（home/user/rename/register）都使用相同的路径 `/`，通过 Layout 组件的 TabBar 切换显示

---

### 3. 状态管理 ([store/index.ts](src/store/index.ts))

**技术选型**: Pinia + pinia-plugin-persistedstate

```typescript
// 配置特点
- 使用 createPinia() 创建实例
- 集成持久化插件，自动将 state 保存到 localStorage
- 支持跨页面刷新保持登录状态等数据
```

---

### 4. 页面组件

#### 4.1 布局组件 ([views/layout/index.vue](src/views/layout/index.vue))

**功能**: 应用主框架，包含底部导航栏

```
结构:
┌─────────────────────────────┐
│                             │
│      <router-view />        │  ← 内容区域
│      (Home / User)          │
│                             │
├─────────────────────────────┤
│  🏠首页        👤我的       │  ← van-tabbar
└─────────────────────────────┘
```

**实现细节**:
- 使用 `v-show` 切换 Home/User 视图（非路由切换）
- TabBar 通过 `v-model="active"` 控制选中项
- 内容区高度: `calc(100vh - 50px)` 减去 TabBar 高度

---

#### 4.2 首页 - 地图视图 ([views/home/index.vue](src/views/home/index.vue)) ⭐ 核心功能

**功能**: 中国地图可视化，支持标记已访问城市

##### 核心特性:

1. **ECharts 地图渲染**
   - 使用中国地图 GeoJSON 数据 (`china.json`)
   - 支持缩放和平移 (`roam: true`)
   - 多选模式 (`selectedMode: 'multiple'`)
   - 自定义深色主题配色

2. **模式切换**
   ```typescript
   // 支持两种粒度
   - 市级 (city): 可选择具体城市
   - 省级 (province): 选择省级区域
   ```

3. **地区选择器**
   - 使用 Vant Cascader 级联选择器
   - 集成 `@vant/area-data` 省市区数据
   - 特殊处理：直辖市和特别行政区保留 children 属性

4. **交互功能**
   - 点击地区 → 高亮显示并添加到已访问列表
   - 右下角重置按钮 → 清除所有高亮
   - 选中区域显示白色标签

##### 关键代码逻辑:

```typescript
// 更新高亮数据
const updateHighlightData = (name: string) => {
    highLightData.value.push({ name, selected: true })
    myChart.clear()
    myChart.setOption(option.value)
}

// 地图初始化
onMounted(() => {
    myChart = echarts.init(document.getElementById('echarts-container'))
    initCityLevelEcharts(option.value)
})
```

##### 样式配置:

```javascript
// 地图主题色
backgroundColor: '#000'        // 背景色
areaColor: '#171d26'           // 区域填充色（深蓝黑）
borderColor: '#303745'         // 边框色
emphasis.areaColor: '#14536c'  // 高亮色（青蓝）
select.areaColor: '#14536c'    // 选中色
```

---

#### 4.3 登录页 ([views/login/index.vue](src/views/login/index.vue))

**功能**: 用户身份验证

**表单字段**:
- 用户名 (`username`): 必填
- 密码 (`password`): 必填，正则校验 `/^[a-zA-Z0-9_]{6,12}$/`（6-12位字母数字下划线）

**交互逻辑**:
1. 提交表单 → 显示 Loading Toast
2. 模拟登录成功 → 跳转到 Layout 页面 (`router.replace`)
3. 导航链接:
   - "没有账号？去注册" → 注册页
   - "忘记密码？" → 重置密码页

**默认值** (测试用):
- 用户名: `chengj`
- 密码: `123456`

---

#### 4.4 注册页 ([views/login/register.vue](src/views/login/register.vue))

**状态**: 占位页面（待实现）

---

#### 4.5 用户中心 ([views/user/index.vue](src/views/user/index.vue))

**功能**: 展示用户信息和操作入口

**UI 结构**:
```
┌────────────────────────────┐
│ [用户信息]     [退出登录]   │  ← 操作栏
├────────────────────────────┤
│  ┌────┐                    │
│  │头像│  布布              │  ← 用户卡片
│  └────┘  198****0822       │
└────────────────────────────┘
```

**数据展示**:
- 头像: 默认使用 `@/assets/images/avator.jfif`
- 昵称: 布布（硬编码）
- 手机号: 198****0822（脱敏显示）

**操作**:
- 点击"用户信息"/"退出登录" → 返回登录页

---

## 🔧 构建与开发配置

### Vite 配置 ([vite.config.ts](vite.config.ts))

```typescript
// 关键配置项
plugins: [
    vue(),                              // Vue SFC 支持
    tailwindcss(),                      // TailwindCSS 4
    Components({                        // 组件自动导入
        resolvers: [VantResolver()]     // Vant 按需导入
    })
]

resolve.alias: {
    '@': './src'                       // 路径别名
}

server.open: true                       // 自动打开浏览器
css.preprocessorOptions.less: { javascriptEnabled: true }
```

### 开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览生产构建 |

---

## 🎨 样式方案

### 多层 CSS 架构:

1. **TailwindCSS 4** (原子化 CSS)
   - 用于快速布局和间距
   - 示例: `h-[100%]`, `bg-blue-50`, `flex justify-center`

2. **Less** (预处理器)
   - 用于组件 scoped 样式
   - 支持嵌套规则和变量

3. **Vant 主题变量**
   - 使用 CSS 变量: `var(--color-bg-1)`, `var(--color-blue-50)`
   - 便于主题定制

4. **全局样式**
   - `reset.less`: 样式重置
   - `index.css`: TailwindCSS 入口

---

## 📦 关键依赖说明

### 运行时依赖

| 包名 | 用途 |
|------|------|
| `vue` | 核心框架 |
| `vue-router` | 路由管理 |
| `pinia` | 状态管理 |
| `vant` | 移动端 UI 组件 |
| `echarts` | 图表/地图渲染 |
| `@vant/area-data` | 中国省市区数据 |
| `@vueuse/core` | Vue 组合式 API 工具集 |
| `pinia-plugin-persistedstate` | Pinia 状态持久化 |

### 开发依赖

| 包名 | 用途 |
|------|------|
| `vite` | 构建工具 |
| `typescript` | 类型系统 |
| `tailwindcss` | 原子化 CSS |
| `less` | CSS 预处理器 |
| `unplugin-vue-components` | 组件自动导入 |
| `@vitejs/plugin-vue` | Vue SFC 编译 |
| `vue-tsc` | Vue TypeScript 类型检查 |

---

## 🔍 代码规范与约定

### 1. 组件编写风格
- ✅ 使用 `<script setup lang="ts">` 语法
- ✅ 组合式 API (Composition API)
- ✅ 响应式 API: `ref`, `computed`, `onMounted`

### 2. 命名规范
- **文件**: kebab-case (`user-info.vue`)
- **组件**: PascalCase (`UserInfo`)
- **变量**: camelCase (`userName`)
- **常量**: UPPER_SNAKE_CASE (未使用)

### 3. 路径别名
- `@/` → `src/`
- 示例: `import Home from '@/views/home/index.vue'`

### 4. 样式作用域
- 所有组件使用 `scoped` 样式
- 深度选择器使用 `:deep()` (Less)

---

## 🌟 功能亮点

### 1. 地图可视化系统
- 基于 ECharts 的中国地图渲染
- 支持市级/省级双粒度切换
- 深色主题设计，视觉效果优秀
- 流畅的缩放平移体验

### 2. 地区选择优化
- 级联选择器支持省→市→区三级联动
- 特殊处理直辖市逻辑（无市级层级）
- 即时反馈：选择后立即高亮地图

### 3. 移动端适配
- 使用 Vant 移动端组件库
- 底部 TabBar 导航
- 触摸友好的交互设计

---

## ⚠️ 待完善项

### 功能层面
- [ ] 注册页面完整实现
- [ ] 找回密码页面实现
- [ ] 用户信息编辑功能
- [ ] 后端 API 对接（目前为前端 Mock）
- [ ] 数据持久化到服务端
- [ ] 多用户数据隔离

### 技术层面
- [ ] 路由懒加载错误处理
- [ ] 全局异常捕获机制
- [ ] 表单验证增强（确认密码等）
- [ ] 单元测试覆盖
- [ ] E2E 测试
- [ ] 性能优化（地图大数据量场景）

### 用户体验
- [ ] 加载状态优化（骨架屏）
- [ ] 离线缓存策略
- [ ] PWA 支持
- [ ] 国际化 (i18n)
- [ ] 无障碍访问 (a11y)

---

## 🔄 数据流示意

```
用户操作 → 组件事件 → 更新 ref 状态 → 触发 computed → ECharts 重绘
                                                    ↓
                                            localStorage (Pinia persist)
```

**示例**: 点亮城市流程
```
Cascader 选择城市 
    ↓
onFinish 回调获取城市名称
    ↓
updateHighlightData(name) 
    ↓
highLightData.value.push({ name, selected: true })
    ↓
option computed 重新计算
    ↓
myChart.setOption(option.value) 
    ↓
地图更新高亮区域
```

---

## 🛠️ 本地开发指南

### 环境要求
- Node.js >= 18
- npm >= 9

### 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 调试技巧
1. **Vue Devtools**: 安装浏览器扩展调试组件
2. **Vite HMR**: 修改代码后即时热更新
3. **ECharts 调试**: 使用 Chrome DevTools 查看 Canvas 层级

---

## 📊 项目统计

| 指标 | 数值 |
|------|------|
| 总文件数 | ~20 |
| Vue 组件数 | 6 |
| 路由数量 | 6 |
| 第三方依赖 | 11 (runtime) + 13 (dev) |
| 代码行数 (估算) | ~600 行 |
| 主要语言 | TypeScript (80%), Vue (15%), CSS (5%) |

---

## 📝 更新日志

### v0.0.0 (Initial Version)
- ✅ 项目初始化 (Vue 3 + Vite + TS)
- ✅ 基础路由搭建
- ✅ 登录页面实现
- ✅ 地图核心功能（ECharts）
- ✅ 市级/省级模式切换
- ✅ 地区级联选择器
- ✅ 用户中心页面
- ✅ TabBar 布局
- ✅ 移动端适配

---

## 📚 相关资源

- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 中文文档](https://cn.vitejs.dev/)
- [Vant 4 组件库](https://vant-ui.github.io/vant/#/zh-CN)
- [ECharts 文档](https://echarts.apache.org/zh/index.html)
- [Pinia 状态管理](https://pinia.vuejs.org/zh/)
- [TailwindCSS 4 文档](https://tailwindcss.com/)

---

**文档生成时间**: 2026-05-25  
**文档版本**: 1.0.0  
**维护者**: Journey Map Team
