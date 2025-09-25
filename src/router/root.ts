export default [
    {
        path: '/login',
        name: 'index',
        meta: {
            title: '首页',
        },
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout/index.vue'),
        meta: {
            title: '布局',
        },
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页',
        },
    },
    {
        path: '/',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: {
            title: '我的',
        },
    },
    {
        path: '/',
        name: 'rename',
        component: () => import('@/views/login/rename.vue'),
        meta: {
            title: '重命名',
        },
    },
    {
        path: '/',
        name: 'register',
        component: () => import('@/views/login/register.vue'),
        meta: {
            title: '注册',
        },
    },
];
