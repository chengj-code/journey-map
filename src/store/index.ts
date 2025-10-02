import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import useMapStore from '@/store/modules/map';
export { useMapStore };
const pinia = createPinia();
pinia.use(createPersistedState({ storage: localStorage }));

export default pinia;
