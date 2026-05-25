import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './root.ts';
var baseURL = import.meta.env.VITE_BASE_URL;
//导入生成的路由数据
var router = createRouter({
    history: createWebHashHistory(baseURL),
    routes: routes,
});
router.beforeEach(function (_to, _from, next) {
    next();
});
router.afterEach(function (_to) { });
export default router;
