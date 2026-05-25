import { defineStore } from 'pinia';

interface MapItem {
  name: string;
  selected: boolean;
  fullName?: string; // 完整路径，如"河北省/秦皇岛市"
}

type MapMode = 'city' | 'province';

export const useMapStore = defineStore('map', {
  state: () => ({
    provinceData: [] as MapItem[],
    cityData: [] as MapItem[],
    currentMode: 'province' as MapMode,
  }),

  getters: {
    currentData(state): MapItem[] {
      return state.currentMode === 'province' ? state.provinceData : state.cityData;
    },
  },

  actions: {
    addProvince(name: string) {
      const existing = this.provinceData.find((item) => item.name === name);
      if (existing) {
        existing.selected = true;
      } else {
        this.provinceData.push({ name, selected: true });
      }
    },

    addCity(name: string, fullName?: string) {
      const existing = this.cityData.find((item) => item.name === name);
      if (existing) {
        existing.selected = true;
        if (fullName) existing.fullName = fullName;
      } else {
        this.cityData.push({ name, selected: true, fullName });
      }
    },

    resetProvince() {
      this.provinceData = [];
    },

    resetCity() {
      this.cityData = [];
    },

    setCurrentMode(mode: MapMode) {
      this.currentMode = mode;
    },
  },

  persist: {
    key: 'map-store',
  },
});
