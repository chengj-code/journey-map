var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
import { ref } from 'vue';
import { IconProvince } from '@/components/icons';
import { useIconStore } from '@/store';
var iconStore = useIconStore();
var iconList = [
    { name: '北京市', label: '北京', shortLabel: '京' },
    { name: '天津市', label: '天津', shortLabel: '津' },
    { name: '上海市', label: '上海', shortLabel: '沪' },
    { name: '重庆市', label: '重庆', shortLabel: '渝' },
    { name: '河北省', label: '河北', shortLabel: '冀' },
    { name: '山西省', label: '山西', shortLabel: '晋' },
    { name: '辽宁省', label: '辽宁', shortLabel: '辽' },
    { name: '吉林省', label: '吉林', shortLabel: '吉' },
    { name: '黑龙江省', label: '黑龙江', shortLabel: '黑' },
    { name: '江苏省', label: '江苏', shortLabel: '苏' },
    { name: '浙江省', label: '浙江', shortLabel: '浙' },
    { name: '安徽省', label: '安徽', shortLabel: '皖' },
    { name: '福建省', label: '福建', shortLabel: '闽' },
    { name: '江西省', label: '江西', shortLabel: '赣' },
    { name: '山东省', label: '山东', shortLabel: '鲁' },
    { name: '河南省', label: '河南', shortLabel: '豫' },
    { name: '湖北省', label: '湖北', shortLabel: '鄂' },
    { name: '湖南省', label: '湖南', shortLabel: '湘' },
    { name: '广东省', label: '广东', shortLabel: '粤' },
    { name: '海南省', label: '海南', shortLabel: '琼' },
    { name: '四川省', label: '四川', shortLabel: '川' },
    { name: '贵州省', label: '贵州', shortLabel: '黔' },
    { name: '云南省', label: '云南', shortLabel: '滇' },
    { name: '陕西省', label: '陕西', shortLabel: '陕' },
    { name: '甘肃省', label: '甘肃', shortLabel: '甘' },
    { name: '青海省', label: '青海', shortLabel: '青' },
    { name: '台湾省', label: '台湾', shortLabel: '台' },
    { name: '内蒙古自治区', label: '内蒙古', shortLabel: '蒙' },
    { name: '广西壮族自治区', label: '广西', shortLabel: '桂' },
    { name: '西藏自治区', label: '西藏', shortLabel: '藏' },
    { name: '宁夏回族自治区', label: '宁夏', shortLabel: '宁' },
    { name: '新疆维吾尔自治区', label: '新疆', shortLabel: '新' },
    { name: '香港特别行政区', label: '香港', shortLabel: '港' },
    { name: '澳门特别行政区', label: '澳门', shortLabel: '澳' },
];
var showPopup = ref(false);
var selectedIcon = ref(null);
var tempBgColor = ref('');
var tempTextColor = ref('');
var presetBgColors = [
    '#A8D8EA',
    '#AA96DA',
    '#FCBAD3',
    '#FFFFD2',
    '#B5EAD7',
    '#E2F0CB',
    '#FFDAC1',
    '#FFB7B2',
    '#C7CEEA',
    '#B5B9FF',
];
var presetTextColors = [
    '#ffffff',
    '#333333',
    '#1a1a1a',
    '#000000',
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#96ceb4',
    '#ffeaa7',
    '#dfe6e9',
];
var getBgColor = function (name) {
    var config = iconStore.getIconColor(name);
    return (config === null || config === void 0 ? void 0 : config.backgroundColor) || undefined;
};
var getTextColor = function (name) {
    var config = iconStore.getIconColor(name);
    return (config === null || config === void 0 ? void 0 : config.textColor) || undefined;
};
var openColorPicker = function (item) {
    selectedIcon.value = item;
    var config = iconStore.getIconColor(item.name);
    tempBgColor.value = (config === null || config === void 0 ? void 0 : config.backgroundColor) || '';
    tempTextColor.value = (config === null || config === void 0 ? void 0 : config.textColor) || '';
    showPopup.value = true;
};
var saveConfig = function () {
    if (selectedIcon.value && tempBgColor.value && tempTextColor.value) {
        iconStore.setIconColor(selectedIcon.value.name, tempBgColor.value, tempTextColor.value);
    }
    showPopup.value = false;
};
var cancelConfig = function () {
    showPopup.value = false;
};
var resetConfig = function () {
    if (selectedIcon.value) {
        iconStore.resetIconColor(selectedIcon.value.name);
        tempBgColor.value = '';
        tempTextColor.value = '';
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "icon-gallery-page" }));
var __VLS_0 = {}.VanNavBar;
/** @type {[typeof __VLS_components.VanNavBar, typeof __VLS_components.vanNavBar, ]} */ ;
// @ts-ignore
VanNavBar;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: "省份图标库",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        title: "省份图标库",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "icon-grid" }));
var _loop_1 = function (item) {
    // @ts-ignore
    [iconList,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.openColorPicker(item);
            // @ts-ignore
            [openColorPicker,];
        } }, { key: (item.name) }), { class: "icon-card" }));
    var __VLS_5 = {}.IconProvince;
    /** @type {[typeof __VLS_components.IconProvince, ]} */ ;
    // @ts-ignore
    IconProvince;
    // @ts-ignore
    var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        provinceName: (item.name),
        label: (item.shortLabel),
        size: (48),
        backgroundColor: (__VLS_ctx.getBgColor(item.name)),
        textColor: (__VLS_ctx.getTextColor(item.name)),
    }));
    var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
            provinceName: (item.name),
            label: (item.shortLabel),
            size: (48),
            backgroundColor: (__VLS_ctx.getBgColor(item.name)),
            textColor: (__VLS_ctx.getTextColor(item.name)),
        }], __VLS_functionalComponentArgsRest(__VLS_6), false));
    // @ts-ignore
    [getBgColor, getTextColor,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "icon-name" }));
    (item.label);
};
for (var _i = 0, _b = __VLS_getVForSourceType((__VLS_ctx.iconList)); _i < _b.length; _i++) {
    var item = _b[_i][0];
    _loop_1(item);
}
var __VLS_10 = {}.VanPopup;
/** @type {[typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, ]} */ ;
// @ts-ignore
VanPopup;
// @ts-ignore
var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10(__assign({ show: (__VLS_ctx.showPopup), position: "bottom", round: true }, { style: ({ height: '60%' }) })));
var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([__assign({ show: (__VLS_ctx.showPopup), position: "bottom", round: true }, { style: ({ height: '60%' }) })], __VLS_functionalComponentArgsRest(__VLS_11), false));
var __VLS_14 = __VLS_13.slots.default;
// @ts-ignore
[showPopup,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "popup-content" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "popup-header" }));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "popup-title" }));
((_a = __VLS_ctx.selectedIcon) === null || _a === void 0 ? void 0 : _a.name);
// @ts-ignore
[selectedIcon,];
var __VLS_15 = {}.VanIcon;
/** @type {[typeof __VLS_components.VanIcon, typeof __VLS_components.vanIcon, ]} */ ;
// @ts-ignore
VanIcon;
// @ts-ignore
var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15(__assign({ 'onClick': {} }, { name: "cross", size: "20" })));
var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { name: "cross", size: "20" })], __VLS_functionalComponentArgsRest(__VLS_16), false));
var __VLS_19;
var __VLS_20;
var __VLS_21 = ({ click: {} },
    { onClick: (__VLS_ctx.cancelConfig) });
// @ts-ignore
[cancelConfig,];
var __VLS_18;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "preview-section" }));
if (__VLS_ctx.selectedIcon) {
    // @ts-ignore
    [selectedIcon,];
    var __VLS_23 = {}.IconProvince;
    /** @type {[typeof __VLS_components.IconProvince, ]} */ ;
    // @ts-ignore
    IconProvince;
    // @ts-ignore
    var __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        provinceName: (__VLS_ctx.selectedIcon.name),
        label: (__VLS_ctx.selectedIcon.shortLabel),
        size: (80),
        backgroundColor: (__VLS_ctx.tempBgColor || undefined),
        textColor: (__VLS_ctx.tempTextColor || undefined),
    }));
    var __VLS_25 = __VLS_24.apply(void 0, __spreadArray([{
            provinceName: (__VLS_ctx.selectedIcon.name),
            label: (__VLS_ctx.selectedIcon.shortLabel),
            size: (80),
            backgroundColor: (__VLS_ctx.tempBgColor || undefined),
            textColor: (__VLS_ctx.tempTextColor || undefined),
        }], __VLS_functionalComponentArgsRest(__VLS_24), false));
    // @ts-ignore
    [selectedIcon, selectedIcon, tempBgColor, tempTextColor,];
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "color-section" }));
var __VLS_28 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
var __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "背景色",
}));
var __VLS_30 = __VLS_29.apply(void 0, __spreadArray([{
        label: "背景色",
    }], __VLS_functionalComponentArgsRest(__VLS_29), false));
var __VLS_32 = __VLS_31.slots.default;
{
    var __VLS_33 = __VLS_31.slots.input;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "color-input-wrapper" }));
    __VLS_asFunctionalElement(__VLS_elements.input)(__assign({ type: "color" }, { class: "color-picker" }));
    (__VLS_ctx.tempBgColor);
    // @ts-ignore
    [tempBgColor,];
    __VLS_asFunctionalElement(__VLS_elements.input)(__assign({ type: "text", value: (__VLS_ctx.tempBgColor), placeholder: "#A8D8EA" }, { class: "color-text-input" }));
    // @ts-ignore
    [tempBgColor,];
}
var __VLS_31;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "preset-colors" }));
var _loop_2 = function (color) {
    // @ts-ignore
    [presetBgColors,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.tempBgColor = color;
            // @ts-ignore
            [tempBgColor,];
        } }, { key: (color) }), { class: "preset-color-block" }), { style: ({ backgroundColor: color }) }));
};
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.presetBgColors)); _c < _d.length; _c++) {
    var color = _d[_c][0];
    _loop_2(color);
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "color-section" }));
var __VLS_34 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
var __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    label: "文字色",
}));
var __VLS_36 = __VLS_35.apply(void 0, __spreadArray([{
        label: "文字色",
    }], __VLS_functionalComponentArgsRest(__VLS_35), false));
var __VLS_38 = __VLS_37.slots.default;
{
    var __VLS_39 = __VLS_37.slots.input;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "color-input-wrapper" }));
    __VLS_asFunctionalElement(__VLS_elements.input)(__assign({ type: "color" }, { class: "color-picker" }));
    (__VLS_ctx.tempTextColor);
    // @ts-ignore
    [tempTextColor,];
    __VLS_asFunctionalElement(__VLS_elements.input)(__assign({ type: "text", value: (__VLS_ctx.tempTextColor), placeholder: "#ffffff" }, { class: "color-text-input" }));
    // @ts-ignore
    [tempTextColor,];
}
var __VLS_37;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "preset-colors" }));
var _loop_3 = function (color) {
    // @ts-ignore
    [presetTextColors,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.tempTextColor = color;
            // @ts-ignore
            [tempTextColor,];
        } }, { key: (color) }), { class: "preset-color-block" }), { style: ({ backgroundColor: color }) }));
};
for (var _e = 0, _f = __VLS_getVForSourceType((__VLS_ctx.presetTextColors)); _e < _f.length; _e++) {
    var color = _f[_e][0];
    _loop_3(color);
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "popup-actions" }));
var __VLS_40 = {}.VanButton;
/** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
// @ts-ignore
VanButton;
// @ts-ignore
var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40(__assign({ 'onClick': {} }, { plain: true, type: "default" })));
var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { plain: true, type: "default" })], __VLS_functionalComponentArgsRest(__VLS_41), false));
var __VLS_44;
var __VLS_45;
var __VLS_46 = ({ click: {} },
    { onClick: (__VLS_ctx.cancelConfig) });
var __VLS_47 = __VLS_43.slots.default;
// @ts-ignore
[cancelConfig,];
var __VLS_43;
var __VLS_48 = {}.VanButton;
/** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
// @ts-ignore
VanButton;
// @ts-ignore
var __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48(__assign({ 'onClick': {} }, { plain: true, type: "warning" })));
var __VLS_50 = __VLS_49.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { plain: true, type: "warning" })], __VLS_functionalComponentArgsRest(__VLS_49), false));
var __VLS_52;
var __VLS_53;
var __VLS_54 = ({ click: {} },
    { onClick: (__VLS_ctx.resetConfig) });
var __VLS_55 = __VLS_51.slots.default;
// @ts-ignore
[resetConfig,];
var __VLS_51;
var __VLS_56 = {}.VanButton;
/** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
// @ts-ignore
VanButton;
// @ts-ignore
var __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56(__assign({ 'onClick': {} }, { type: "primary" })));
var __VLS_58 = __VLS_57.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "primary" })], __VLS_functionalComponentArgsRest(__VLS_57), false));
var __VLS_60;
var __VLS_61;
var __VLS_62 = ({ click: {} },
    { onClick: (__VLS_ctx.saveConfig) });
var __VLS_63 = __VLS_59.slots.default;
// @ts-ignore
[saveConfig,];
var __VLS_59;
var __VLS_13;
/** @type {__VLS_StyleScopedClasses['icon-gallery-page']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-card']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-name']} */ ;
/** @type {__VLS_StyleScopedClasses['popup-content']} */ ;
/** @type {__VLS_StyleScopedClasses['popup-header']} */ ;
/** @type {__VLS_StyleScopedClasses['popup-title']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-section']} */ ;
/** @type {__VLS_StyleScopedClasses['color-section']} */ ;
/** @type {__VLS_StyleScopedClasses['color-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['color-picker']} */ ;
/** @type {__VLS_StyleScopedClasses['color-text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['preset-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['preset-color-block']} */ ;
/** @type {__VLS_StyleScopedClasses['color-section']} */ ;
/** @type {__VLS_StyleScopedClasses['color-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['color-picker']} */ ;
/** @type {__VLS_StyleScopedClasses['color-text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['preset-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['preset-color-block']} */ ;
/** @type {__VLS_StyleScopedClasses['popup-actions']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        IconProvince: IconProvince,
        iconList: iconList,
        showPopup: showPopup,
        selectedIcon: selectedIcon,
        tempBgColor: tempBgColor,
        tempTextColor: tempTextColor,
        presetBgColors: presetBgColors,
        presetTextColors: presetTextColors,
        getBgColor: getBgColor,
        getTextColor: getTextColor,
        openColorPicker: openColorPicker,
        saveConfig: saveConfig,
        cancelConfig: cancelConfig,
        resetConfig: resetConfig,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
