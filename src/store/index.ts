import { createPinia } from 'pinia';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export { useMapStore } from './mapStore';
export { useIconStore } from './iconStore';
export { useAccountingStore } from './accountingStore';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
