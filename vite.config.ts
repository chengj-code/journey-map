import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers'; // 引入 Vant 的解析器
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
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
        // 可选：配置开发服务器
        port: 3000, // 设置服务端口号
        open: true, // 服务启动后自动打开浏览器
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true, // 开启 JavaScript 支持，例如使用 mixins
            },
        },
    },
});
