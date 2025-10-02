import { defineStore } from 'pinia';
import { highlightData } from './types/type';
import { ref } from 'vue';

const useMapStore = defineStore(
    'highlightArea',
    () => {
        const highlightAreaData = ref([] as highlightData[]);
        return { highlightAreaData };
    },
    {
        persist: true,
    }
);
export default useMapStore;
