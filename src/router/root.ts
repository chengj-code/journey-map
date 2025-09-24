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
        name: 'home',
        redirect: '/login',
        meta: {
            title: '首页',
        },
    },
];
