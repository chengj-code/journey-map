import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        Components({
            resolvers: [VantResolver()],
            // 禁止生成 .vue.js 文件
            dts: false,
        }),
    ],
    
    // 构建输出配置 - 确保只输出到 dist 目录
    build: {
        outDir: 'dist',
        // 清理旧的构建产物
        emptyOutDir: true,
    },
    
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        // 强制解析扩展名，优先使用 .ts
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    
    server: {
        host: '0.0.0.0',
        port: 5173,
        open: false,
        allowedHosts: true,
        
        // 开发服务器优化
        fs: {
            // 限制访问范围，防止访问不应该的文件
            strict: true,
        },
        
        // 使用 polling 模式避免 ENOSPC 错误
        watch: {
            usePolling: true,
            interval: 1000,
        },
    },
    
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    
    // 优化依赖预构建
    optimizeDeps: {
        // 排除不需要预构建的包
        exclude: [],
    },
    
    // ESBuild 配置
    esbuild: {
        // 确保 JSX/TSX 转换正确
        jsx: 'transform',
    },
});