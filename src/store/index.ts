import { createPinia } from 'pinia';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export { useMapStore } from './mapStore';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
