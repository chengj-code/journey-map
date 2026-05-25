import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers'; // 引入 Vant 的解析器
import tailwindcss from '@tailwindcss/vite' // 导入插件
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        Components({
            resolvers: [VantResolver()], // 使用 Vant 的解析器
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // 将 '@' 指向 src 目录
        },
    },
    server: {
        host: '0.0.0.0', // 监听所有网络接口
        port: 5173,       // 设置服务端口号
        open: false,      // 禁止自动打开浏览器（避免 CI 环境错误）
        allowedHosts: true, // 允许所有主机访问
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true, // 开启 JavaScript 支持，例如使用 mixins
            },
        },
    },
});
