import { defineStore } from 'pinia';
export var useIconStore = defineStore('icon', {
    state: function () { return ({
        colorConfigs: {},
    }); },
    actions: {
        setIconColor: function (provinceName, bgColor, textColor) {
            this.colorConfigs[provinceName] = {
                backgroundColor: bgColor,
                textColor: textColor,
            };
        },
        getIconColor: function (provinceName) {
            var _a;
            return (_a = this.colorConfigs[provinceName]) !== null && _a !== void 0 ? _a : null;
        },
        resetIconColor: function (provinceName) {
            delete this.colorConfigs[provinceName];
        },
    },
    persist: {
        key: 'icon-color-store',
    },
});
