import App from './App.vue';
import { createApp } from 'vue';
import router from './router';
import piniaStore from './store';
import '@/styles/reset.less';
import '@/styles/index.css';
import "vant/lib/index.css" // 全局引入样式
//vue3的挂载方式
const app = createApp(App);

app.use(router);
app.use(piniaStore);

app.mount('#app');
