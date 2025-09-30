import { defineStore } from 'pinia'
import { highlightData } from './types/type';

const useMapStore = defineStore('storeId', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            highlight: [] as highlightData[],
        }
    },
    getters: {
        getHighlight: (state) => state.highlight,
    }
})
export default useMapStore