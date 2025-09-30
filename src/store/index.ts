import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import useMapStore from '@/store/modules/map'
export { useMapStore }
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
