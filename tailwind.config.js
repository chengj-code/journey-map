/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}", // 确保包含你的 Vue/TS 文件
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        // 禁用Preflight，避免与你的reset.less冲突
        preflight: false,
    },
}