# 2026年前端开发岗位面试题系统性收集整理

> **整理时间**：2026年6月
> **数据来源**：2025-2026年间发布的高质量技术文章、一线互联网公司面试反馈、技术社区热门讨论
> **覆盖范围**：HTML/CSS基础、JavaScript核心概念、前端框架、工程化实践、性能优化、跨端开发、网络与安全

---

## 目录

1. [一、HTML/CSS 基础](#一htmlcss-基础)
2. [二、JavaScript 核心概念](#二javascript-核心概念)
3. [三、前端框架（React/Vue/Angular）](#三前端框架reactvueangular)
4. [四、工程化实践](#四工程化实践)
5. [五、性能优化](#五性能优化)
6. [六、跨端开发](#六跨端开发)
7. [七、网络与安全](#七网络与安全)
8. [八、AI集成与前沿趋势（2026新增考点）](#八ai集成与前沿趋势2026新增考点)

---

## 一、HTML/CSS 基础

### 1.1 HTML语义化与标签

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 1 | HTML5 新增了哪些语义化标签？`<header>`、`<section>`、`<article>` 等的作用是什么？ | HTML5语义化标签、SEO优化、可访问性 | ⭐ | [CSDN - Web前端面试题(2026年最新版)](https://blog.csdn.net/m0_69257679/article/details/129794885) |
| 2 | `src` 和 `href` 的区别？ | 资源下载 vs 文档关联、浏览器解析行为差异 | ⭐ | [CSDN - Web前端面试题](https://blog.csdn.net/m0_69257679/article/details/129794885) |
| 3 | `title` 与 `h1` 的区别、`b` 与 `strong` 的区别、`i` 与 `em` 的区别？ | 语义化vs表现层、SEO影响、屏幕阅读器兼容 | ⭐ | [CSDN - Web前端面试题](https://blog.csdn.net/m0_69257679/article/details/129794885) |
| 4 | `DOCTYPE` 文档类型的作用？为什么 HTML5 只需写 `<!DOCTYPE HTML>`？ | 浏览器渲染模式（标准模式/怪异模式）、文档类型声明 | ⭐ | [CSDN - Web前端面试题](https://blog.csdn.net/m0_69257679/article/details/129794885) |
| 5 | `img` 标签的 `title` 属性与 `alt` 属性的区别？ | 无障碍访问、SEO、图片加载失败时的降级展示 | ⭐ | [CSDN - Web前端面试题](https://blog.csdn.net/m0_69257679/article/details/129794885) |
| 6 | 什么是语义化 HTML？为什么它很重要？ | 可访问性(A11y)、SEO、代码可维护性、屏幕阅读器 | ⭐⭐ | [Mimo - 43 Real-World Front-End Interview Questions (2026)](https://mimo.org/blog/front-end-developer-interview-questions) |
| 7 | `<meta name="viewport">` 标签为什么对响应式设计至关重要？ | 视口配置、移动端适配、缩放控制 | ⭐⭐ | [Mimo - Front-End Interview Questions](https://mimo.org/blog/front-end-developer-interview-questions) |

### 1.2 CSS 核心概念

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 8 | BFC（块级格式化上下文）是什么？触发条件有哪些？作用是什么？ | 块级格式化上下文、margin折叠清除、浮动包裹 | ⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) / [CSDN](https://blog.csdn.net/dxiang/article/details/161122393) |
| 9 | `link` 与 `@import` 的区别和用法？ | 加载时机、页面渲染阻塞、兼容性差异 | ⭐ | [CSDN - Web前端面试题](https://blog.csdn.net/m0_69257679/article/details/129794885) |
| 10 | `rgba()` 和 `opacity` 的透明效果有什么不同？ | 自身透明vs子元素继承、渲染层合成 | ⭐⭐ | [CSDN - Web前端面试题](https://blog.csdn.net/m0_69257679/article/details/129794885) |
| 11 | `display: none` 与 `visibility: hidden` 的区别？ | DOM占据空间、事件响应、重排重绘影响 | ⭐⭐ | [CSDN - Web前端面试题](https://blog.csdn.net/m0_69257679/article/details/129794885) |
| 12 | CSS 选择器优先级的计算规则？ | !important > 行内 > ID > 类/伪类/属性 > 元素/伪元素 > 通配符 | ⭐⭐ | [Guru99 - Top 40 Front-End Interview Questions (2026)](https://guru99.com/nl/front-end-developer-interview-questions.html) |
| 13 | Flex 布局中 `flex: 1` 的完整含义？ | flex-grow/flex-shrink/flex-basis 三属性简写 | ⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) |
| 14 | Grid 布局如何实现响应式设计？`auto-fit`、`minmax()` 的使用 | CSS Grid自适应、repeat()函数、响应式网格 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试问什么都已经固定了](https://blog.csdn.net/likuolei/article/details/157901011) |
| 15 | 居中方案有哪些？（10+种方案） | 水平居中、垂直居中、水平垂直居中、Flex/Grid方案 | ⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |

### 1.3 响应式设计与移动端适配

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 16 | 移动端 1px 边框问题的解决方案？ | 设备像素比(dpr)、伪元素缩放、viewport单位、border-image | ⭐⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) |
| 17 | 媒体查询（`@media`）与视口（`viewport`）如何配合使用？ | 断点设计、移动端优先策略、viewport meta标签 | ⭐⭐ | [Guru99 - Front-End Interview Questions](https://guru99.com/nl/front-end-developer-interview-questions.html) |
| 18 | REM、VW/VH 适配方案的优缺点对比？ | 相对单位计算、postcss-pxtorem/lib-flexible方案、vw兼容性 | ⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) |
| 19 | CSS 容器查询（`@container`）的实际应用场景？ | 容器相对查询、组件级响应式、2025-2026新特性 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 20 | `:has()`、`:where()`、`if()` 等 CSS 新特性的实战用法？ | CSS选择器增强、CSS嵌套、现代CSS特性 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |

### 1.4 浏览器渲染原理

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 21 | 从输入 URL 到页面显示的完整流程？ | DNS解析→TCP连接→HTTP请求→DOM树构建→渲染树→布局→绘制 | ⭐⭐⭐ | [CSDN - 前端架构师面试真题(2026)](https://dxiang.blog.csdn.net/article/details/161122393) |
| 22 | 重绘（Repaint）和回流（Reflow）的区别？如何优化？ | 渲染管线、触发布局变化的操作、批量读写、GPU加速 | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 23 | 浏览器的完整渲染流程是怎样的？ | 解析→样式计算→布局→分层→绘制→合成→显示 | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |

---

## 二、JavaScript 核心概念

### 2.1 基础语法与数据类型

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 24 | JavaScript 有哪些数据类型？区别是什么？（基础类型7种 + 引用类型） | String/Number/Boolean/Null/Undefined/Symbol/BigInt、栈内存vs堆内存 | ⭐ | [掘金 - JavaScript全维度面试题](https://juejin.cn/post/7584650421124841513) |
| 25 | 如何准确判断 JavaScript 数据类型？`typeof`、`instanceof`、`Object.prototype.toString.call()` 的区别 | 类型判断方法对比、typeof null === 'object'陷阱、原型链判断 | ⭐⭐ | [掘金 - JS全维度面试题](https://juejin.cn/post/7584650421124841513) |
| 26 | `null` 和 `undefined` 的区别？ | 自动赋值vs主动赋值、Number()转换结果、相等性比较 | ⭐ | [掘金 - JS全维度面试题](https://juejin.cn/post/7584650421124841513) |
| 27 | `==` 和 `===` 的区别？什么时候用 `==` 是合理的？ | 类型转换规则、隐式转换陷阱、Object.is() | ⭐⭐ | [Guru99 - Front-End Interview Questions](https://guru99.com/nl/front-end-developer-interview-questions.html) |
| 28 | `var`、`let`、`const` 的区别？ | 暂时性死区(TDZ)、块级作用域、变量提升差异 | ⭐⭐ | [掘金 - JS全维度面试题](https://juejin.cn/post/7584650421124841513) / [Guru99](https://guru99.com/nl/front-end-developer-interview-questions.html) |

### 2.2 闭包与作用域

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 29 | 什么是闭包？它的定义、应用场景、优缺点？ | 词法作用域延伸、模块化/缓存/防抖节流、内存泄漏风险 | ⭐⭐ | [掘金 - JS全维度面试题](https://juejin.cn/post/7584650421124841513) |
| 30 | 闭包导致的内存泄漏如何检测和避免？ | Chrome DevTools Memory面板、WeakMap、主动解除引用(fn = null) | ⭐⭐⭐ | [掘金 - 前端JS面试题汇总(2025版)](https://juejin.cn/post/7479627755849498664) |
| 31 | 作用域和作用域链的原理？ | 全局/函数/块级作用域、词法作用域、变量查找规则(Lexical Scoping) | ⭐⭐ | [掘金 - JS全维度面试题](https://juejin.cn/post/7584650421124841513) |

### 2.3 this 指向与原型链

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 32 | `this` 指向的完整绑定规则？（new > 显式 > 隐式 > 默认 > 箭头函数） | 绑定优先级、call/apply/bind、箭头函数this继承外层 | ⭐⭐⭐ | [掘金 - JS全维度面试题](https://juejin.cn/post/7584650421124841513) / [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) |
| 33 | 手写实现 `call`、`apply`、`bind` 的源码？ | 函数上下文切换、参数处理、bind返回新函数(柯里化) | ⭐⭐⭐ | [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) |
| 34 | 讲讲原型、原型链、`constructor` 的原理？ | __proto__、prototype、原型链查找、继承实现 | ⭐⭐⭐ | [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) |
| 35 | 手写实现 `new` 关键字？ | 创建对象→链接原型→绑定this→返回新对象 | ⭐⭐⭐ | [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) |
| 36 | ES5 vs ES6 继承的实现方式及优缺点？ | 原型链继承、构造函数继承、组合继承、寄生组合继承、class extends | ⭐⭐⭐ | [掘金 - 前端JS面试题汇总(2025版)](https://juejin.cn/post/7479627755849498664) |

### 2.4 异步编程与事件循环

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 37 | 事件循环（Event Loop）的原理？浏览器和 Node.js 的区别？ | 调用栈、宏任务队列(setTimeout/setInterval/I/O)、微任务队列(Promise.then/queueMicrotask/MutationObserver)、执行顺序 | ⭐⭐⭐ | [掘金 - JS全维度面试题](https://juejin.cn/post/7584650421124841513) / [掘金 - web前端精选异步面试题](https://juejin.cn/post/7499050342774587446) |
| 38 | 给出一段包含 async/await、Promise、setTimeout 的代码，分析输出顺序 | 微任务先于宏任务、async函数内部await拆解、then链执行 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) / [CSDN - Vue3/React/跨端面试题](https://blog.csdn.net/weixin_42376192/article/details/160072408) |
| 39 | 微任务和宏任务的详细区别？常见队列分别有哪些？ | Microtask Queue、Macrotask Queue、Node.js的process.nextTick和setImmediate | ⭐⭐⭐ | [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) |
| 40 | Promise 的状态机？手写简易 Promise 实现？ | pending/fulfilled/rejected、then链、错误冒泡、resolvePromise | ⭐⭐⭐ | [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) |
| 41 | 手写 `Promise.all`、`Promise.race`、`Promise.allSettled`？ | 迭代器处理、并发控制、错误处理、竞态条件 | ⭐⭐⭐ | [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) / [掘金 - 前端JS面试题汇总](https://juejin.cn/post/7479627755849498664) |
| 42 | async/await 的实现原理？低版本浏览器如何兼容？ | Generator + 自动执行器、Babel转换(_asyncToGenerator)、yield语法糖 | ⭐⭐⭐ | [掘金 - 前端JS面试题汇总(2025版)](https://juejin.cn/post/7479627755849498664) / [掘金 - 异步面试题](https://juejin.cn/post/7499050342774587446) |
| 43 | async/await 错误处理方案？try/catch vs .catch() vs await-to-js | 错误传播、统一错误处理、to()函数封装 | ⭐⭐ | [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) |
| 44 | JS 异步解决方案的发展历程（回调 → Promise → Generator → async/await）各阶段优缺点？ | 回调地狱解决、链式调用、同步写法异步逻辑、取消操作支持 | ⭐⭐ | [掘金 - web前端精选异步面试题](https://juejin.cn/post/7499050342774587446) |

### 2.5 ES6+ 新特性

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 45 | 箭头函数与普通函数的区别？ | this绑定、arguments对象、constructor属性、不能用Generator | ⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) |
| 46 | Proxy 与 Reflect？使用 Proxy 实现简易 Vue 数据响应？ | 拦截器(get/set/has/deleteProperty)、依赖收集与触发更新、Vue3响应式原理 | ⭐⭐⭐ | [掘金 - 前端JS面试题汇总(2025版)](https://juejin.cn/post/7479627755849498664) |
| 47 | Generator 函数的作用与使用场景？ | function*、yield、next()、异步流程控制(co库)、惰性求值 | ⭐⭐⭐ | [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) |
| 48 | ES2025/ES2026 中新增的 `Temporal` API 解决了 Date 对象的哪些痛点？ | 时区处理、不可变日期对象、Date API设计缺陷、国际化 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 49 | Map 和 WeakMap 的区别？Set 和 WeakSet 的区别？ | 引用计数垃圾回收、key只能是对象、无迭代器、内存管理 | ⭐⭐ | [掘金 - JS全维度面试题](https://juejin.cn/post/7584650421124841513) |

### 2.6 手写代码高频题

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 50 | 深拷贝与浅拷贝的区别？手写"完美"深拷贝（处理循环引用、Symbol、Date等） | 递归拷贝、WeakMap处理循环引用、特殊对象处理(Date/RegExp)、JSON.parse限制 | ⭐⭐⭐ | [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) / [掘金 - JS全维度面试题](https://juejin.cn/post/7584650421124841513) |
| 51 | 手写防抖（Debounce）和节流（Throttle）？业务场景？ | 定时器管理、立即执行选项、取消功能、leading/trailing | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) / [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 52 | 手写函数柯里化（Currying）？支持占位符的柯里化函数？ | Partial Application vs Currying、参数收集、递归、占位符(_)处理 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 53 | 手写 `instanceof`？ | 原型链遍历、左操作数原型是否在右操作数原型链上 | ⭐⭐ | [CSDN - 2026前端中级工程师高频面试题](https://blog.csdn.net/qq_40882017/article/details/161073013) |
| 54 | 实现 LRU 缓存函数 `memoizeWithExpiry`，支持过期时间和最大缓存数量？ | Map数据结构(按插入顺序迭代)、过期清理、容量淘汰策略 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 55 | 实现类型安全的 `deepPick` 函数，给定对象和点分路径字符串，返回对应值且 TypeScript 推断正确类型？ | TypeScript 条件类型、递归类型、路径字符串解析、索引签名 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |

### 2.7 DOM/BOM 与浏览器 API

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 56 | 事件委托（Event Delegation）的原理与优势？ | 事件冒泡机制、动态绑定减少监听器、性能优化 | ⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) |
| 57 | 事件冒泡（Bubbling）和事件捕获（Capturing）的区别？addEventListener 第三个参数？ | DOM事件流三阶段(capture→target→bubble)、stopPropagation/preventDefault | ⭐⭐ | [Guru99 - Front-End Interview Questions](https://guru99.com/nl/front-end-developer-interview-questions.html) |
| 58 | Cookie、LocalStorage、SessionStorage 的区别？ | 存储大小、有效期、作用域、HTTP请求携带、安全性 | ⭐⭐ | [Guru99 - Front-End Interview Questions](https://guru99.com/nl/front-end-developer-interview-questions.html) / [CSDN - Web前端面试题](https://blog.csdn.net/m0_69257679/article/details/129794885) |
| 59 | `requestAnimationFrame` 与 `requestIdleCallback` 的区别？ | 60fps帧同步、主线程空闲时段执行、动画vs后台任务 | ⭐⭐⭐ | [掘金 - 前端JS面试题汇总(2025版)](https://juejin.cn/post/7479627755849498664) |

---

## 三、前端框架（React/Vue/Angular）

### 3.1 React 核心

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 60 | React 虚拟 DOM 的 Diff 算法原理？Fiber 架构？ | 同层比较、key的作用、Fiber节点/双缓存、时间切片、可中断渲染 | ⭐⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) / [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 61 | React Hooks 的优势与限制？为什么必须在组件顶层调用？ | 闭包陷阱、useEffect依赖项、Hooks链表、调用顺序一致性要求 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) / [腾讯云 - 2025新鲜出炉前端面试题](https://cloud.tencent.cn/developer/article/2494846) |
| 62 | 手写 `useState` / `useEffect` 的实现原理？ | Hook链表结构、dispatcher、依赖数组比对、effect执行时机 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 63 | 如何优化 React 组件渲染性能？`React.memo`、`useMemo`、`useCallback` 的使用场景？ | 浅比较、引用稳定性、避免不必要的子组件re-render、渲染瓶颈定位 | ⭐⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) |
| 64 | React 18 新特性：并发模式（Concurrent Mode）、Suspense、自动批处理（Auto-batching）？ | useTransition/startTransition/useDeferredValue、时间切片、startTransition标记非紧急更新 | ⭐⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) / [腾讯云](https://cloud.tencent.cn/developer/article/2494846) |
| 65 | `useEffect` 和 `useLayoutEffect` 的区别？ | 执行时机(异步vs同步)、是否阻塞浏览器绘制、适用场景 | ⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 66 | React 19 中新增的 `use` API 相比传统 `useEffect` 在数据获取场景下的优势？ | 读取Promise/Context而无需hook包装、Server Component中直接读取async值、 Suspense边界集成 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 67 | React Server Components (RSC) 和 SSR 的核心区别？什么场景选 RSC？ | 服务端组件零客户端JS、组件级粒度的SSR、混合架构(Streaming+Selective Hydration) | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 68 | 如何排查 React 应用中的 "Re-render 地狱"？利用 `React.Profiler` 定位具体组件？ | DevTools Profiler面板、渲染次数/耗时分析、React DevTools Highlight updates | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 69 | 请实现自定义 Hook `useDebouncedCallback`，支持取消、立即执行和最大等待时间？ | useRef保存定时器ID、cleanup函数、leading/trailing/maxWait选项 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 70 | React 渲染流程详解？从 JSX 到屏幕的完整过程？ | JSX→React.createElement→Fiber构建→Commit阶段→浏览器绘制 | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |

### 3.2 Vue 核心

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 71 | Vue 2 与 Vue 3 的核心底层差异？（响应式原理、Composition API、性能） | Object.defineProperty vs Proxy、Options API vs Composition API、Tree-shaking支持 | ⭐⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) / [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 72 | Vue 3 响应式原理？（Proxy + Reflect）详解 | Proxy拦截器、Reflect元编程、track/trigger依赖收集与派发、WeakMap存储目标对象 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) / [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 73 | Vue 双向绑定（v-model）的实现原理？ | :value + @input 语法糖、modelOption配置、.sync修饰符(vue2) | ⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) |
| 74 | Vue 3.5 中 props 解构的响应式丢失问题是如何解决的？`defineProps` 与 `withDefaults` 的新写法？ | 响应式解构糖、编译器宏、默认值声明方式变化 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 75 | Vue 的 `<script setup>` 语法糖编译后的产物是什么？为什么比普通 `setup()` 函数性能更好？ | 编译器自动导出、运行时开销减少、无需return暴露、更好的TypeScript推断 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 76 | Vue 生命周期钩子与 React 的对比？ | beforeCreate/created → setup()、mounted→useEffect([],{})、beforeUnmount→useEffect return cleanup | ⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) |
| 77 | Pinia 相比 Vuex 的架构优势？ | 去除mutations、更好的TypeScript支持、更简洁API、Composition API友好 | ⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 78 | Vue Router 的路由守卫应用场景？ | beforeEach/beforeResolve/afterEach、导航守卫、权限控制、数据预取 | ⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) |
| 79 | `computed` 和 `watch` 的区别？选择依据？ | 缓存vs非缓存、懒执行vs立即执行、副作用处理、依赖追踪 | ⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |

### 3.3 框架对比与生态

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 80 | 对比 React、Vue、Angular 的优缺点？适用场景？ | 设计哲学(声明式/响应式/全面)、学习曲线、生态系统、企业采用率 | ⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) |
| 81 | 前端状态管理方案对比：Redux、Vuex、MobX、Pinia、Zustand、Jotai？ | 单向数据流、集中式vs分散式、Boilerplate、DevTools、中间件 | ⭐⭐⭐ | [博客园 - 最新最全的前端面试题](https://www.cnblogs.com/xiaoer-heidou/p/18740506) / [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 82 | Next.js App Router vs Pages Router？Server Components vs Server Actions？ | App Directory嵌套路由、Server Component默认、Server Actions表单提交、Streaming SSR | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 83 | Nuxt 3 特性？（SSR、Nitro、服务器路由、auto-imports） | 全栈框架、Nitro服务器引擎、文件系统路由、混合渲染(SSR/SSG/SPA/SWR) | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 84 | React Query / TanStack Query 原理？服务端状态管理最佳实践？ | 缓存管理、stale-while-revalidate、乐观更新、后台刷新、devtools | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |

---

## 四、工程化实践

### 4.1 构建工具

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 85 | Vite 和 Webpack 的核心区别？开发阶段的性能差异根源是什么？ | ESM原生按需编译 vs 全量打包、esbuild预构建、Rollup生产打包、HMR速度 | ⭐⭐⭐ | [51CTO - vite与webpack优缺点对比](https://blog.51cto.com/u_16213703/14426932) / [掘金 - 前端工程化面试题大全](https://juejin.cn/post/7480734875723268096) / [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 86 | Webpack 完整构建流程？（初始化→编译→输出） | Entry→Dependency Graph→Module→Chunk→Assets→Output、Loader(链式)/Plugin(事件流) | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 87 | Vite 为什么快？HMR 原理？ | 浏览器原生ESM、esbuild(Go编写)预构建依赖、基于ESM的精确模块替换 | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) / [51CTO](https://blog.51cto.com/u_16213703/14426932) |
| 88 | Vite 6.0 中基于 Rolldown 的打包模式相比 Rollup 有哪些性能突破？Rolldown 如何利用 Rust 实现并行解析？ | Rust重写Rollup、并行AST解析、增量构建、OXC替代SWC | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 89 | Rspack 与 Webpack 的核心架构差异？迁移可能遇到哪些兼容性问题？ | Rust内核、Web兼容性(Loader/Plugin兼容)、Module Federation支持、迁移成本 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 90 | Turbopack / Rolldown / esbuild 的区别？各自定位和适用场景？ | Go/Rust编写、增量编译、开发vs生产、生态成熟度 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 91 | CJS（CommonJS）和 ES Module（ESM）的区别？ | require/import加载时机(运行时vs编译时)、__esModule标记、循环引用处理、顶层await | ⭐⭐ | [腾讯云 - 2025新鲜出炉前端面试题](https://cloud.tencent.cn/developer/article/2494846) |

### 4.2 工程化规范与 Monorepo

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 92 | Monorepo 架构优势与使用场景？pnpm workspace 管理？ | 统一版本管理、公共代码复用、原子提交、workspace协议 | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) / [CSDN - 2026前端高级工程师面试题](https://blog.csdn.net/qq_40882017/article/details/161073219) |
| 93 | 如何配置 Monorepo 下的 ESLint 9.x Flat Config？支持 TS 路径别名？ | flat config格式(eslint.config.js)、tsconfig paths集成、overrides按目录配置 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 94 | 团队工程化规范落地方案？ | ESLint/Prettier/Husky/lint-staged/Commitlint、CI/CD集成、Code Review流程 | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 95 | Git Hooks 方案设计：pre-commit 阶段只对变更文件运行 Lint 和类型检查，耗时不超过2秒？ | lint-staged、husky(现代版)、仅diff文件检查、并行执行、缓存加速 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 96 | Webpack 自定义 Loader 与 Plugin 的手写实现？ | Loader(单一职责/链式调用/无状态)、Plugin(apply/tapable/Compiler钩子) | ⭐⭐⭐ | [CSDN - 2026前端高级工程师面试题](https://blog.csdn.net/qq_40882017/article/details/161073219) |
| 97 | 前端分包、性能打包优化方案？ | splitChunks配置、动态import()、vendor分离、commonsChunk、Module Federation | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 98 | 封装组件库如何实现按需引入？babel-plugin-import、sideEffects、Tree Shaking？ | 单组件独立ESM打包、import转换插件、package.json sideEffects字段 | ⭐⭐⭐ | [腾讯云 - 2025新鲜出炉前端面试题](https://cloud.tencent.cn/developer/article/2494846) |

### 4.3 TypeScript 进阶

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 99 | TypeScript 5.x 中 `const` 类型参数和 `satisfies` 运算符解决了什么问题？ | as const收窄字面量类型、satisfies不拓宽类型同时保留类型信息 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 100 | 什么是 "Isolated Declarations"？TS 5.8 如何生成独立的 `.d.ts` 文件以加速构建？ | 隔离声明、减少类型检查依赖、--isolatedDeclarations/--declaration、build性能提升 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |

---

## 五、性能优化

### 5.1 Core Web Vitals 核心指标

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 101 | Core Web Vitals 包含哪些指标？LCP、INP（取代FID）、CLS 的定义、标准和优化方案？ | 最大内容绘制≤2.5s、交互到下一帧≤200ms、累积布局偏移≤0.1；INP在2024年取代FID | ⭐⭐⭐ | [CSDN - 前端性能优化常见面试问题汇总](https://blog.csdn.net/qq_39903567/article/details/156203916) / [掘金 - Core Web Vitals全解](https://juejin.cn/post/7639288005984157739) / [掘金 - 面试题：前端web页面性能如何优化](https://juejin.cn/post/7607598321468948526) |
| 102 | 2026 年 Google 更新后的 LCP 优化指南？推荐图片格式组合策略？`fetchpriority` 属性的使用场景？ | AVIF/WebP/JPG降级、preload关键资源、fetchpriority="high"、SSR/SGS首屏优化 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 103 | INP（Interaction to Next Paint）优化重点？Input Delay + Processing Time + Presentation Delay 三段拆解与优化 | 长任务拆分(requestIdleCallback/scheduler.yield)、Web Worker、第三方脚本优化、事件处理优化 | ⭐⭐⭐ | [掘金 - Core Web Vitals全解](https://juejin.cn/post/7639288005984157739) / [CSDN - 性能优化面试问题汇总](https://blog.csdn.net/qq_39903567/article/details/156203916) |
| 104 | CLS（累积布局偏移）常见原因和优化方案？ | 图片设width/height、字体font-display:swap、动态内容预留空间、transform代替布局属性 | ⭐⭐⭐ | [CSDN - 性能优化面试问题汇总](https://blog.csdn.net/qq_39903567/article/details/156203916) / [掘金 - Core Web Vitals全解](https://juejin.cn/post/7639288005984157739) |

### 5.2 加载与渲染优化

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 105 | 如何减少 HTTP 请求数？合并/内联/雪碧图/Data URL/懒加载/HTTP/2多路复用权衡？ | 资源合并策略、HTTP/2下小文件优势、图片精灵、内联Critical资源 | ⭐⭐⭐ | [CSDN - 性能优化面试问题汇总](https://blog.csdn.net/qq_39903567/article/details/156203916) |
| 106 | 浏览器缓存策略详解？强缓存 vs 协商缓存？Cache-Control、ETag、Last-Modified？ | Cache-Control(max-age/no-cache/no-store/private)、ETag指纹比对、304协商、缓存决策树 | ⭐⭐⭐ | [CSDN - 性能优化面试问题汇总](https://blog.csdn.net/qq_39903567/article/details/156203916) / [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 107 | 首屏加载优化全方案？Tree Shaking、Code Splitting、预加载(preload/prefetch/preconnect)、懒加载、SSR/SSG？ | 打包体积优化、资源优先级控制、路由级代码分割、骨架屏、服务端渲染 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) / [掘金 - 前端web页面性能优化](https://juejin.cn/post/7607598321468948526) |
| 108 | 图片优化全方案？格式选型(AVIF/WebP)、压缩、响应式图片(srcset/sizes/picture)、渐进式加载、CDN按需处理？ | 格式编码原理、有损无损压缩、devicePixelRatio适配、loading="lazy"、image-set | ⭐⭐⭐ | [掘金 - 前端web页面性能优化](https://juejin.cn/post/7607598321468948526) / [掘金 - Core Web Vitals全解](https://juejin.cn/post/7639288005984157739) |
| 109 | 如何减少 reflow 和 repaint？ | 批量读写DOM、DocumentFragment、虚拟滚动、GPU加速(transform/opacity/will-change)、CSS containment | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |

### 5.3 运行时性能优化

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 110 | 长列表虚拟滚动实现原理？React-Window / Vue-Virtual-Scroller？ | 可视区域计算、动态高度估算、固定项高vs动态项高、scroll事件节流+IntersectionObserver | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 111 | "Island Architecture"（岛屿架构）与 "Partial Hydration"（部分水合）的区别？Astro 和 Qwik 分别采用的策略？ | Astro岛屿架构(静态+交互岛)、Qwik Resumability(序列化恢复)、 hydration vs resumption | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 112 | Web Worker 使用场景？Atomics / SharedArrayBuffer 多线程通信？ | CPU密集型任务offload、主线程不被阻塞、SharedArrayBuffer共享内存、Atomics锁机制 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 113 | "Invisible Watermark"（盲水印）技术？Canvas 防截屏水印实现？ | 频域水印(DCT变换)、LSB隐写、Canvas像素操作、性能友好的实现方案 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |

---

## 六、跨端开发

### 6.1 小程序开发

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 114 | 微信小程序的双线程模型？视图层(WebView)和逻辑层(JSCore)如何通信？ | 双线程架构、Native桥接通信、setData性能、线程间序列化开销 | ⭐⭐⭐ | [文档网 - 2026微信小程序面试题](https://m.book118.com/html/2026/0413/5212141312013200.shtm) |
| 115 | 小程序分包加载规则？主包≤2MB，总包≤20MB？分包之间能否相互依赖？ | 分包预下载、独立分包、分包异步、主包公共依赖 | ⭐⭐ | [文档网 - 2026微信小程序面试题](https://m.book118.com/html/2026/0413/5212141312013200.shtm) |
| 116 | 小程序生命周期？onLoad/onShow/onReady/onHide/onUnload 的触发时机和典型用途？ | 页面生命周期vs应用生命周期、参数获取、数据刷新、资源释放 | ⭐⭐ | [文档网 - 2026微信小程序面试题](https://m.book118.com/html/2026/0413/5212141312013200.shtm) |
| 117 | 小程序 rpx 单位的适配规则？ | 以iPhone6为基准(375px)、屏幕宽度自适应换算、设计稿还原 | ⭐⭐ | [文档网 - 2026微信小程序面试题](https://m.book118.com/html/2026/0413/5212141312013200.shtm) |
| 118 | 小程序组件间通信方式？properties/triggerEvent/EventBus/selectComponent？ | 父→子(properties)、子→父(triggerEvent)、跨层级(EventBus/globalData)、selectComponent实例方法 | ⭐⭐ | [文档网 - 2026微信小程序面试题](https://m.book118.com/html/2026/0413/5212141312013200.shtm) |
| 119 | 小程序路由跳转方式对比？navigateTo/redirectTo/switchTab/navigateBack/reLaunch？ | 页面栈管理、TabBar限制、返回能力、参数传递(options/query) | ⭐⭐ | [文档网 - 2026微信小程序面试题](https://m.book118.com/html/2026/0413/5212141312013200.shtm) |
| 120 | 小程序 XSS 防护？为什么禁用 innerHTML？ | 不支持DOM API、wxs过滤、数据绑定自动转义、rich-text组件安全 | ⭐⭐ | [文档网 - 2026微信小程序面试题](https://m.book118.com/html/2026/0413/5212141312013200.shtm) |

### 6.2 跨端框架

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 121 | Taro / uni-app 跨平台小程序开发的兼容性问题？微信 vs 支付宝 vs 百度 平台差异？ | 条件编译(process.env.TARO_ENV)、API差异封装、样式兼容(position fixed等)、路径处理(staticFilesBasePath) | ⭐⭐⭐ | [掘金 - taro项目常见面试问题](https://juejin.cn/post/7493561743152906303) / [CSDN - Vue3/React/跨端面试题](https://blog.csdn.net/weixin_42376192/article/details/160072408) |
| 122 | React Native 与 React 的区别？Bridge vs New Architecture(Fabric+TurboModules+JSI)？ | 原生组件渲染、线程模型(UI/Main/Native)、Bridge序列化瓶颈、JSI直通 | ⭐⭐⭐ | [React Native Jobs - RN Interview Questions](https://reactnative-jobs.com/blog/react-native-interview-questions) |
| 123 | React Native 中 ScrollView vs FlatList？何时使用哪个？ | 全量渲染vs虚拟化列表、内存占用、keyExtractor/getItemLayout性能优化 | ⭐⭐ | [React Native Jobs - RN Interview Questions](https://reactnative-jobs.com/blog/react-native-interview-questions) |
| 124 | Flutter 与 React Native 对比？各自优劣？ | Dart vs JS/TS、Skia渲染引擎vs原生组件、Hot Reload、性能天花板 | ⭐⭐ | [CSDN - Vue3/React/跨端面试题](https://blog.csdn.net/weixin_42376192/article/details/160072408) |
| 125 | 各跨端方案选型考量？Taro/uni-app vs React Native vs Flutter vs 原生？ | 开发效率、性能需求、包体积、原生API调用、团队技术栈、维护成本 | ⭐⭐⭐ | [CSDN - Vue3/React/跨端面试题](https://blog.csdn.net/weixin_42376192/article/details/160072408) |

---

## 七、网络与安全

### 7.1 网络协议

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 126 | HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC) 的核心区别？ | 多路复用、头部压缩(HPACK/QPACK)、服务端推送、QUIC基于UDP(0-RTT/连接迁移) | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) / [掘金 - 浏览器安全机制](https://juejin.cn/post/7612252172991840308) |
| 127 | TCP 三次握手、四次挥手的过程？为什么需要三次而非两次？ | SYN/SYN-ACK/ACK、连接建立可靠性、TIME_WAIT状态、半关闭 | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 128 | HTTPS 的完整握手过程？TLS 1.2 vs TLS 1.3 区别？对称加密+非对称加密结合、证书链验证、TLS 1.3仅需1-RTT、0-RTT resumed | ⭐⭐⭐ | [掘金 - web前端安全面试题](https://juejin.cn/post/7491866188620890127) |
| 129 | DNS 解析过程？DNS 预解析 prefetch/preconnect？ | 递归查询/迭代查询、DNS缓存(浏览器→OS→ISP)、preconnect提前TCP+TLS | ⭐⭐ | [掘金 - 前端web页面性能优化](https://juejin.cn/post/7607598321468948526) |

### 7.2 浏览器安全机制

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 130 | 同源策略（Same-Origin Policy）？什么是同源？限制了哪些操作？ | 协议+域名+端口一致、DOM/Cookie/Storage/AJAX跨域限制、安全基石 | ⭐⭐⭐ | [掘金 - 浏览器安全机制](https://juejin.cn/post/7612252172991840308) / [掘金 - web前端安全面试题](https://juejin.cn/post/7491866188620890127) |
| 131 | CORS（跨域资源共享）工作机制？简单请求 vs 预检请求(OPTIONS)？ | Origin头、Access-Control-Allow-*系列头、credentials、preflight cache | ⭐⭐⭐ | [掘金 - 浏览器安全机制](https://juejin.cn/post/7612252172991840308) / [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |
| 132 | 跨域的终极解决方案选型？CORS vs JSONP vs postMessage vs Nginx反向代理 vs WebSocket？ | 各方案适用场景、JSONP只支持GET、postMessage窗口通信、代理无浏览器限制 | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) |

### 7.3 攻击与防御

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 133 | XSS（跨站脚本攻击）的三种类型？反射型、存储型、DOM 型？攻击原理与防御方案？ | 注入点(URL参数/数据库/DOM操作)、窃取Cookie/Token、输入过滤+输出转义+CSP+HttpOnly | ⭐⭐⭐ | [掘金 - web前端安全面试题](https://juejin.cn/post/7491866188620890127) / [牛客网 - 前端安全防御实战](https://www.nowcoder.com/discuss/823327530860949504) / [CSDN - 网络安全面试高频30题](https://blog.csdn.net/bigbangbangbang1/article/details/154476242) |
| 134 | CSRF（跨站请求伪造）攻击原理？防御方案？Token / SameSite Cookie / Referer验证？ | 利用已登录态伪造请求、GET/POST均可攻击、双重Cookie验证、SameSite=Strict/Lax/None | ⭐⭐⭐ | [掘金 - web前端安全面试题](https://juejin.cn/post/7491866188620890127) / [牛客网 - 前端安全防御实战](https://www.nowcoder.com/discuss/823327530860949504) / [CSDN - 网络安全面试高频30题](https://blog.csdn.net/bigbangbangbang1/article/details/154476242) |
| 135 | XSS 和 CSRF 的核心区别？ | 攻击目标(浏览器vs服务器)、执行方式(注入脚本vs伪造请求)、防御思路差异 | ⭐⭐⭐ | [CSDN - 网络安全面试高频30题](https://blog.csdn.net/bigbangbangbang1/article/details/154476242) / [CSDN - 网络安全面试官喜欢问什么](https://blog.csdn.net/ocean2103/article/details/148748320) |
| 136 | 点击劫持（Clickjacking）防御？X-Frame-Options / CSP frame-ancestors？ | iframe嵌入恶意透明层诱导点击、frame嵌套限制、sandbox属性 | ⭐⭐ | [掘金 - web前端安全面试题](https://juejin.cn/post/7491866188620890127) |
| 137 | CSP（Content-Security-Policy）如何配置？防止数据泄露和外挂资源？ | default-src/script-src/style-src/connect-src/img-src/frame-ancestors、report-uri违规上报 | ⭐⭐⭐ | [掘金 - web前端安全面试题](https://juejin.cn/post/7491866188620890127) / [掘金 - 浏览器安全机制](https://juejin.cn/post/7612252172991840308) |
| 138 | Cookie 安全设置？Secure / HttpOnly / SameSite / Domain / Path？ | 防止XSS窃取(HttpOnly)、防止CSRF携带(SameSite)、HTTPS传输(Secure) | ⭐⭐ | [掘金 - web前端安全面试题](https://juejin.cn/post/7491866188620890127) / [CSDN - 网络安全面试官喜欢问什么](https://blog.csdn.net/ocean2103/article/details/148748320) |
| 139 | HSTS（HTTP Strict Transport Security）的作用？防止 SSL Stripping 攻击？ | 强制HTTPS、max-age预载、includeSubDomains、preload list | ⭐⭐ | [掘金 - web前端安全面试题](https://juejin.cn/post/7491866188620890127) |
| 140 | SQL 注入检测与防御？参数化查询？OWASP Top 10？ | 'or 1=1注入、union联合查询、预编译语句(#{} vs ${})、最小权限原则 | ⭐⭐⭐ | [CSDN - 网络安全面试高频30题](https://blog.csdn.net/bigbangbangbang1/article/details/154476242) |
| 141 | WebSocket 安全？wss://？防御 WebSocket 劫持？ | TLS加密传输、Origin头验证、消息认证Token、敏感数据不在消息中传递 | ⭐⭐ | [掘金 - web前端安全面试题](https://juejin.cn/post/7491866188620890127) |
| 142 | 中间人攻击(MITM)？公钥基础设施(PKI)？证书信任链？ | 证书颁发机构(CA)、证书链验证、证书钉扎(pinning)、HSTS缓解 | ⭐⭐⭐ | [掘金 - 浏览器安全机制](https://juejin.cn/post/7612252172991840308) |

---

## 八、AI集成与前沿趋势（2026新增考点）

> 以下为2025-2026年新兴的高频面试方向，反映了一线互联网公司对前端工程师的新要求。

| # | 题目 | 核心知识点 | 难度 | 来源 |
|---|------|-----------|------|------|
| 143 | 如何在浏览器端直接运行轻量级LLM（如 Gemma 2 2B）？WebGPU 相比 WebGL 在模型推理上的提升？ | WebLLM/WebGPU API、张量并行计算、WebGL vs WebGPU计算着色器差异、推理延迟降低 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 144 | AI驱动的组件生成工作原理？Vercel v0 / Copilot 如何根据设计稿生成 React 代码？ | 视觉理解(LLaVA/GPT-4V)、代码生成(CodeLlama)、设计稿→DSL→代码pipeline、工程化落地方案 | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 145 | AI 辅助编码后如何保证代码质量？代码审查、测试覆盖率、安全扫描？ | AI生成代码审计流程、自动化测试增强、Lint规则强化、Prompt Engineering最佳实践 | ⭐⭐⭐ | [CSDN - Vue3/React/跨端面试题](https://blog.csdn.net/weixin_42376192/article/details/160072408) / [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 146 | Web Components / Shadow DOM / Lit / Stencil？ | Custom Elements、Shadow DOM隔离、Template插槽、Lit reactive properties、Stencil编译输出 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 147 | Tailwind CSS vs UnoCSS vs Panda CSS 对比选型？ | Atomic CSS、JIT编译、Design Tokens系统集成、按需生成、IDE体验 | ⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 148 | 微前端架构？qiankun / single-spa / Module Federation？ | 微前端方案对比、沙箱隔离(js/css)、通信机制、部署独立性、Single-SPA注册体系 | ⭐⭐⭐ | [CSDN - 前端架构师面试真题](https://dxiang.blog.csdn.net/article/details/161122393) / [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |
| 149 | 边缘计算(Edge Computing)在前端的应用？Edge Functions / Edge Middleware？ | CDN边缘节点执行、A/B测试、地理位置路由、认证中间件、Vercel Edge/Cloudflare Workers | ⭐⭐⭐ | [CSDN - 2026前端面试题深度整理](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| 150 | WebAssembly (Wasm) 在前端的应用场景？性能密集型任务？ | 近原生性能、多语言支持(Rust/C++/Go)、图像/视频处理、加密运算、Figma/Photoshop Web案例 | ⭐⭐⭐ | [CSDN - 其实吧web前端开发面试...](https://blog.csdn.net/likuolei/article/details/157901011) |

---

## 附录

### 难度说明

| 星级 | 说明 | 适用人群 |
|------|------|----------|
| ⭐ | 基础概念，初级必掌握 | 初级前端、校招 |
| ⭐⭐ | 进阶原理，需理解内部机制 | 中级前端、1-3年经验 |
| ⭐⭐⭐ | 高频难题/架构级/最新前沿 | 高级/资深前端、大厂面试 |

### 主要参考来源

| 来源 | 特点 | 链接 |
|------|------|------|
| CSDN - 2026前端面试题深度整理 | 最新的2026考点，含AI集成、Rolldown等前沿内容 | [链接](https://blog.csdn.net/qq_39287602/article/details/159978296) |
| CSDN - Web前端面试题(2026最新版) | 10万+阅读量，HTML/CSS/JS/框架全覆盖 | [链接](https://blog.csdn.net/m0_69257679/article/details/129794885) |
| 掘金 - JavaScript全维度面试题 | 含标准答案+考点分析，分类清晰 | [链接](https://juejin.cn/post/7584650421124841513) |
| 掘金 - web前端精选异步面试题 | 异步专题深度解析，含发展历程 | [链接](https://juejin.cn/post/7499050342774587446) |
| CSDN - 前端架构师面试真题(2026超全版) | 架构师级别题目，含标准答案 | [链接](https://dxiang.blog.csdn.net/article/details/161122393) |
| CSDN - 2026前端中级工程师高频面试题 | 手写源码题合集，含可运行代码示例 | [链接](https://blog.csdn.net/qq_40882017/article/details/161073013) |
| CSDN - 其实吧web前端开发面试问什么都已经固定了 | 大厂真实面试反馈，2026新趋势分析 | [链接](https://blog.csdn.net/likuolei/article/details/157901011) |
| Mimo - 43 Real-World Front-End Interview Questions (2026) | 英文来源，国际视角，含 accessibility | [链接](https://mimo.org/blog/front-end-developer-interview-questions) |
| Guru99 - Top 40 Front-End Interview Questions (2026) | 英文来源，入门到进阶全覆盖 | [链接](https://guru99.com/nl/front-end-developer-interview-questions.html) |
| 掘金 - Core Web Vitals 全解 | LCP/INP/CLS逐个击破，附诊断代码 | [链接](https://juejin.cn/post/7639288005984157739) |
| 掘金 - 浏览器安全机制 | 同源策略/CORS/XSS/CSRF完整解析 | [链接](https://juejin.cn/post/7612252172991840308) |
| 掘金 - 前端web页面性能如何优化 | 系统性优化策略，含网络/缓存/渲染/代码层面 | [链接](https://juejin.cn/post/7607598321468948526) |
| 牛客网 - 前端安全防御实战(XSS/CSRF) | 字节/阿里风格，含代码示例 | [链接](https://www.nowcoder.com/discuss/823327530860949504) |
| CSDN - 前端性能优化常见面试问题汇总 | Web Vitals/缓存/网络/图片优化全覆盖 | [链接](https://blog.csdn.net/qq_39903567/article/details/156203916) |
| 掘金 - taro项目常见面试问题 | Taro跨端开发实战问题 | [链接](https://juejin.cn/post/7493561743152906303) |
| React Native Jobs - RN Interview Questions | Junior到Senior分级，含System Design | [链接](https://reactnative-jobs.com/blog/react-native-interview-questions) |
| CSDN - Vue3/React/跨端面试题(2026最新版) | 含字节跳动一面真题 | [链接](https://blog.csdn.net/weixin_42376192/article/details/160072408) |
| 51CTO - Vite与Webpack优缺点对比 | 详细对比表格+高频面试题附答案 | [链接](https://blog.51cto.com/u_16213703/14426932) |
| 腾讯云 - 2025新鲜出炉前端面试题(四) | 实际项目经验类问答 | [链接](https://cloud.tencent.cn/developer/article/2494846) |
| 文档网 - 2026微信小程序面试题 |贴合实际开发的选择题+详细答案 | [链接](https://m.book118.com/html/2026/0413/5212141312013200.shtm) |
| CSDN - 网络安全面试高频30题 | OWASP Top10/XSS/CSRF/SQL注入 | [链接](https://blog.csdn.net/bigbangbangbang1/article/details/154476242) |
| 掘金 - 2025-2026大厂前端经典面试题库 | 京东/字节/华为/荣耀真题汇总 | [链接](https://juejin.cn/post/7618100460149342227) |

---

> **统计摘要**：本文档共收录 **150 道** 2026年前端开发面试题，涵盖 **8 大知识领域**、**50+ 个**细分知识点。所有题目均来自 **2025-2026 年间** 发布的高质量技术文章和一线公司面试反馈，标注了难度等级（⭐~⭐⭐⭐）、核心考察点和原始来源链接。
