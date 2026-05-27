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
        name: 'statistics',
        component: () => import('@/views/statistics/index.vue'),
        meta: {
            title: '点亮统计',
        },
    },
    {
        path: '/accounting',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'accounting',
                component: () => import('@/views/accounting/index.vue'),
                meta: {
                    title: '记账本',
                },
            },
            {
                path: 'tags',
                name: 'accounting-tags',
                component: () => import('@/views/accounting/tags/index.vue'),
                meta: {
                    title: '标签管理',
                },
            },
        ],
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
    {
        path: '/map',
        name: 'map',
        component: () => import('@/views/map/index.vue'),
        meta: {
            title: '足迹地图',
        },
    },
    {
        path: '/icon-gallery',
        name: 'iconGallery',
        component: () => import('@/views/icon-gallery/index.vue'),
        meta: {
            title: '图标库',
        },
    },
];
