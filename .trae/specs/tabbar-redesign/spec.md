# 底部 Tab 栏重新设计 Spec

## Why
当前应用使用 Vant 默认的 TabBar 组件，样式较为普通，缺乏现代感和品牌特色。需要重新设计底部导航栏，使其与已实现的首页仪表盘和个人中心的现代化设计风格保持一致，提升整体视觉体验和用户交互感受。

## What Changes
- **自定义 TabBar 组件**：替换 Vant 默认 TabBar 为自定义实现
- **现代化视觉设计**：采用圆角、渐变、图标动画等现代设计元素
- **增强交互反馈**：添加选中状态动画、点击效果等微交互
- **保持功能不变**：保留首页、统计、我的三个入口及路由切换逻辑

## Impact
- Affected specs: ui-redesign (需保持设计语言一致)
- Affected code:
  - `src/views/layout/index.vue` - 完全重写 TabBar 实现
  - `src/styles/` - 可能新增 TabBar 相关样式变量

## ADDED Requirements

### Requirement: 自定义底部导航栏
系统 SHALL 提供一个现代化的自定义底部导航栏组件：

#### Scenario: 导航栏加载
- **WHEN** 用户访问应用任意页面
- **THEN** 底部显示自定义导航栏，包含三个入口（从左到右）：

```
┌─────────────────────────────────────┐
│  🏠      📊      👤               │
│ 首页     统计     我的              │
│ [●]                              │
└─────────────────────────────────────┘
```

**1. 容器样式**
- 固定定位在页面底部（position: fixed; bottom: 0）
- 高度：60-65px（比默认稍高，提升触控体验）
- 背景：白色或毛玻璃效果（backdrop-filter: blur）
- 顶部边框：细线分隔（1px solid #E2E8F0）
- 圆角：顶部左右圆角 16-20px（可选，营造浮动卡片感）
- 安全区域适配：padding-bottom: env(safe-area-inset-bottom)

**2. Tab 项布局**
- 等宽三列布局（flex: 1）
- 垂直居中对齐（图标 + 文字纵向排列）
- 点击区域：至少 44x44px（符合移动端触控标准）

**3. 图标设计**
- 未选中状态：
  - 图标颜色：#94A3B8（灰色）
  - 尺寸：24-26px
  - 使用 SVG 图标或 Emoji（🏠 📊 👤）
- 选中状态：
  - 图标颜色：#10B981（品牌绿色）或渐变色
  - 尺寸：28-30px（略微放大）
  - 可选：添加轻微弹跳动画（scale: 1.1）
- 过渡动画：color 0.3s ease, transform 0.2s ease

**4. 文字标签**
- 未选中状态：
  - 字体大小：11-12px
  - 颜色：#64748B（次要文字色）
  - 字重：400（常规）
- 选中状态：
  - 字体大小：12-13px（略微放大）
  - 颜色：#10B981（品牌色）或 #0F172A（深色）
  - 字重：600（半粗体）
- 过渡动画：all 0.3s ease

**5. 选中指示器**
- 方案 A（推荐）：底部小圆点或短横线
  - 宽度：20-24px
  - 高度：3-4px
  - 颜色：#10B981
  - 圆角：2px
  - 位置：文字下方 2-3px
- 方案 B：背景高亮
  - 选中项背景：浅色圆形（rgba(16, 185, 129, 0.1)）
  - 圆形尺寸：40x40px 或胶囊形

#### Scenario: Tab 切换交互
- **WHEN** 用户点击某个 Tab 项
- **THEN** 对应项立即显示选中状态（图标变色 + 放大 + 指示器出现）
- **THEN** 其他项恢复未选中状态（平滑过渡动画）
- **THEN** 页面内容切换到对应视图（Home/Statistics/User）
- **THEN** 可选：点击时添加轻微反馈动画（ripple 效果或按压缩放）

#### Scenario: 特殊状态处理
- **WHEN** 页面滚动时
- **THEN** TabBar 保持固定在底部（不随页面滚动）
- **可选**：滚动超过阈值后添加阴影效果（box-shadow）

### Requirement: 设计规范一致性
TabBar 设计 SHALL 与首页和个人中心保持视觉统一：

#### 配色方案
```css
/* TabBar 专用 */
--tabbar-bg: rgba(255, 255, 255, 0.95);  /* 半透明白色 */
--tabbar-border: #E2E8F0;                 /* 边框色 */
--tabbar-active: #10B981;                 /* 选中态主色 */
--tabbar-inactive-icon: #94A3B8;         /* 未选中图标 */
--tabbar-inactive-text: #64748B;         /* 未选中文字 */
```

#### 动画规范
```css
/* 过渡时间 */
--transition-fast: 0.2s ease;            /* 图标缩放 */
--transition-normal: 0.3s ease;          /* 颜色变化 */
```

## MODIFIED Requirements

### Requirement: 应用布局结构调整
原有的 Layout 组件需进行以下修改：

**修改前**:
```vue
<van-tabbar v-model="active">
  <van-tabbar-item icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item icon="chart-trending-o">统计</van-tabbar-item>
  <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
</van-tabbar>
```

**修改后**:
```vue
<div class="custom-tabbar">
  <div 
    v-for="(item, index) in tabs" 
    :class="['tab-item', { active: active === index }]"
    @click="active = index"
  >
    <span class="tab-icon">{{ item.icon }}</span>
    <span class="tab-label">{{ item.label }}</span>
    <div v-if="active === index" class="tab-indicator" />
  </div>
</div>
```

**具体改动**:
1. 移除 `<van-tabbar>` 和 `<van-tabbar-item>` 组件
2. 新增自定义 HTML 结构和 CSS 样式
3. 使用 Vue 响应式数据控制选中状态
4. 添加过渡动画类（Vue Transition 或 CSS animation）

## REMOVED Requirements
无（所有功能保留，仅 UI 重构）
