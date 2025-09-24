import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './root.ts';

const baseURL = import.meta.env.VITE_BASE_URL;
//导入生成的路由数据
const router = createRouter({
    history: createWebHashHistory(baseURL),
    routes,
});

router.beforeEach((_to, _from, next) => {
    next();
});

router.afterEach(_to => {});

export default router;
