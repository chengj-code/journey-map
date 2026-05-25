export default [
    {
        path: '/login',
        name: 'index',
        meta: {
            title: '首页',
        },
        component: function () { return import('@/views/login/index.vue'); },
    },
    {
        path: '/',
        name: 'layout',
        component: function () { return import('@/views/layout/index.vue'); },
        meta: {
            title: '布局',
        },
    },
    {
        path: '/',
        name: 'home',
        component: function () { return import('@/views/home/index.vue'); },
        meta: {
            title: '首页',
        },
    },
    {
        path: '/',
        name: 'user',
        component: function () { return import('@/views/user/index.vue'); },
        meta: {
            title: '我的',
        },
    },
    {
        path: '/',
        name: 'statistics',
        component: function () { return import('@/views/statistics/index.vue'); },
        meta: {
            title: '点亮统计',
        },
    },
    {
        path: '/',
        name: 'rename',
        component: function () { return import('@/views/login/rename.vue'); },
        meta: {
            title: '重命名',
        },
    },
    {
        path: '/',
        name: 'register',
        component: function () { return import('@/views/login/register.vue'); },
        meta: {
            title: '注册',
        },
    },
    {
        path: '/icon-gallery',
        name: 'iconGallery',
        component: function () { return import('@/views/icon-gallery/index.vue'); },
        meta: {
            title: '图标库',
        },
    },
];
