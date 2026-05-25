import { defineStore } from 'pinia';

interface IconColorConfig {
  backgroundColor: string;
  textColor: string;
}

export const useIconStore = defineStore('icon', {
  state: () => ({
    colorConfigs: {} as Record<string, IconColorConfig>,
  }),

  actions: {
    setIconColor(provinceName: string, bgColor: string, textColor: string) {
      this.colorConfigs[provinceName] = {
        backgroundColor: bgColor,
        textColor,
      };
    },

    getIconColor(provinceName: string): IconColorConfig | null {
      return this.colorConfigs[provinceName] ?? null;
    },
  },

  persist: {
    key: 'icon-color-store',
  },
});
