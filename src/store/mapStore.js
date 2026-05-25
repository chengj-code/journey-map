import { defineStore } from 'pinia';
export var useMapStore = defineStore('map', {
    state: function () { return ({
        provinceData: [],
        cityData: [],
        currentMode: 'province',
    }); },
    getters: {
        currentData: function (state) {
            return state.currentMode === 'province' ? state.provinceData : state.cityData;
        },
    },
    actions: {
        addProvince: function (name) {
            var existing = this.provinceData.find(function (item) { return item.name === name; });
            if (existing) {
                existing.selected = true;
            }
            else {
                this.provinceData.push({ name: name, selected: true });
            }
        },
        addCity: function (name, fullName) {
            var existing = this.cityData.find(function (item) { return item.name === name; });
            if (existing) {
                existing.selected = true;
                if (fullName)
                    existing.fullName = fullName;
            }
            else {
                this.cityData.push({ name: name, selected: true, fullName: fullName });
            }
        },
        resetProvince: function () {
            this.provinceData = [];
        },
        resetCity: function () {
            this.cityData = [];
        },
        setCurrentMode: function (mode) {
            this.currentMode = mode;
        },
    },
    persist: {
        key: 'map-store',
    },
});
