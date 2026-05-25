/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
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
import * as echarts from 'echarts';
import chinaMap from "@/assets/map/china.json";
import { computed, onMounted, ref } from 'vue';
import { useCascaderAreaData } from '@vant/area-data';
import { useMapStore } from '@/store';
var mapStore = useMapStore();
// 模式选择器
var columns = [
    { text: '市级', value: 'city' },
    { text: '省级', value: 'province' },
];
var modeValue = ref('市级');
var showPicker = ref(false);
var pickerValue = ref([]);
var modeChangeFn = function (_a) {
    var selectedValues = _a.selectedValues, selectedOptions = _a.selectedOptions;
    showPicker.value = false;
    pickerValue.value = selectedValues;
    modeValue.value = selectedOptions[0].text;
    mapStore.setCurrentMode(selectedValues[0]);
};
// 点亮地区选择器
var show = ref(false);
var fieldValue = ref('');
var cascaderValue = ref('');
var rawOptions = useCascaderAreaData();
rawOptions.forEach(function (a) {
    var _a;
    (_a = a.children) === null || _a === void 0 ? void 0 : _a.forEach(function (b) {
        // 四个直辖市和两个特别行政区不需要删除children属性
        if (!["北京市", "天津市", "上海市", "重庆市", "香港特别行政区", "澳门特别行政区"].includes(a.text)) {
            delete b.children;
        }
    });
});
var cascaderOptions = computed(function () {
    if (mapStore.currentMode === 'province') {
        // 省级模式：返回仅包含第一层级的 options，移除所有 children
        return rawOptions.map(function (item) { return (__assign(__assign({}, item), { children: undefined })); });
    }
    // 市级模式：返回完整的三级联动数据（保留原有的特殊处理逻辑）
    return rawOptions;
});
var onFinish = function (_a) {
    var _b;
    var selectedOptions = _a.selectedOptions;
    show.value = false;
    fieldValue.value = selectedOptions.map(function (option) { return option.text; }).join('/');
    var selectName = (_b = selectedOptions[selectedOptions.length - 1]) === null || _b === void 0 ? void 0 : _b.text;
    // 获取完整路径（省+市），用于统计页面展示
    var fullName = fieldValue.value;
    if (mapStore.currentMode === 'province') {
        mapStore.addProvince(selectName);
    }
    else {
        mapStore.addCity(selectName, fullName);
    }
    updateHighlightMap();
};
echarts.registerMap("china", chinaMap);
var highLightData = computed(function () { return mapStore.currentData; });
var mapOptions = ref({
    backgroundColor: '#000',
    mapType: 'china',
    roam: true,
    selectedMode: 'multiple',
    zoom: 1.2,
    silent: true,
});
var option = computed(function () { return ({
    backgroundColor: mapOptions.value.backgroundColor,
    series: [{
            type: 'map',
            map: mapOptions.value.mapType, // 使用已注册的地图名称
            roam: mapOptions.value.roam, // 是否开启缩放平移
            selectedMode: mapOptions.value.selectedMode, // 是否开启多选
            silent: mapOptions.value.silent, // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
            layoutCenter: ['50%', '50%'], //地图位置
            scaleLimit: {
                min: 1.2,
                max: 20
            },
            zoom: mapOptions.value.zoom, // 初始缩放级别
            label: {
                show: false
            },
            itemStyle: {
                areaColor: '#171d26',
                borderColor: '#303745'
            },
            emphasis: {
                label: {
                    show: false
                },
                itemStyle: {
                    areaColor: '#14536c',
                    borderColor: '#fff'
                }
            },
            select: {
                label: {
                    show: true,
                    color: '#fff',
                },
                itemStyle: {
                    areaColor: '#14536c',
                    borderColor: '#fff'
                }
            },
            // 如果需要，配置南海诸岛区域样式
            regions: [{
                    name: '南海诸岛',
                    itemStyle: {
                        areaColor: 'transparent',
                        borderColor: 'transparent'
                    },
                    label: {
                        show: false
                    }
                }],
            data: highLightData.value,
        }]
}); });
var myChart = null;
var initCityLevelEcharts = function (option) {
    // 基于准备好的dom，初始化echarts实例
    // #171d26 #303745 #14536c
    myChart.setOption(option);
};
/**
 * 更新高亮地图
 */
var updateHighlightMap = function () {
    myChart.clear();
    myChart.setOption(option.value);
};
/**重置地图大小 */
var resetMap = function () {
    if (mapStore.currentMode === 'province') {
        mapStore.resetProvince();
    }
    else {
        mapStore.resetCity();
    }
    updateHighlightMap();
};
onMounted(function () {
    myChart = echarts.init(document.getElementById('echarts-container'));
    initCityLevelEcharts(option.value);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['van-field__label']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "h-[100%] bg-blue-50" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "w-[50%] mode-select" }));
var __VLS_0 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ 'onClick': {} }, { modelValue: (__VLS_ctx.modeValue), isLink: true, readonly: true, label: "模式", placeholder: "选择模式" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { modelValue: (__VLS_ctx.modeValue), isLink: true, readonly: true, label: "模式", placeholder: "选择模式" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4;
var __VLS_5;
var __VLS_6 = ({ click: {} },
    { onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.showPicker = true;
            // @ts-ignore
            [modeValue, showPicker,];
        } });
var __VLS_3;
var __VLS_8 = {}.VanPopup;
/** @type {[typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, ]} */ ;
// @ts-ignore
VanPopup;
// @ts-ignore
var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    show: (__VLS_ctx.showPicker),
    destroyOnClose: true,
    round: true,
    position: "bottom",
}));
var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([{
        show: (__VLS_ctx.showPicker),
        destroyOnClose: true,
        round: true,
        position: "bottom",
    }], __VLS_functionalComponentArgsRest(__VLS_9), false));
var __VLS_12 = __VLS_11.slots.default;
// @ts-ignore
[showPicker,];
var __VLS_13 = {}.VanPicker;
/** @type {[typeof __VLS_components.VanPicker, typeof __VLS_components.vanPicker, ]} */ ;
// @ts-ignore
VanPicker;
// @ts-ignore
var __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13(__assign(__assign({ 'onCancel': {} }, { 'onConfirm': {} }), { modelValue: (__VLS_ctx.pickerValue), columns: (__VLS_ctx.columns) })));
var __VLS_15 = __VLS_14.apply(void 0, __spreadArray([__assign(__assign({ 'onCancel': {} }, { 'onConfirm': {} }), { modelValue: (__VLS_ctx.pickerValue), columns: (__VLS_ctx.columns) })], __VLS_functionalComponentArgsRest(__VLS_14), false));
var __VLS_17;
var __VLS_18;
var __VLS_19 = ({ cancel: {} },
    { onCancel: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.showPicker = false;
            // @ts-ignore
            [showPicker, pickerValue, columns,];
        } });
var __VLS_20 = ({ confirm: {} },
    { onConfirm: (__VLS_ctx.modeChangeFn) });
// @ts-ignore
[modeChangeFn,];
var __VLS_16;
var __VLS_11;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "w-[100%] h-[70%] relative" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "w-[100%] h-[100%]" }, { id: "echarts-container" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ onClick: (__VLS_ctx.resetMap) }, { class: "reset-btn w-[40px] h-[40px] flex justify-center items-center bg-[#eee] rounded-[20px] absolute bottom-[10px] right-[10px]" }));
// @ts-ignore
[resetMap,];
var __VLS_22 = {}.VanIcon;
/** @type {[typeof __VLS_components.VanIcon, typeof __VLS_components.vanIcon, ]} */ ;
// @ts-ignore
VanIcon;
// @ts-ignore
var __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    name: "revoke",
    size: "24",
}));
var __VLS_24 = __VLS_23.apply(void 0, __spreadArray([{
        name: "revoke",
        size: "24",
    }], __VLS_functionalComponentArgsRest(__VLS_23), false));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "highlight-select" }));
var __VLS_27 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
var __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27(__assign({ 'onClick': {} }, { modelValue: (__VLS_ctx.fieldValue), isLink: true, readonly: true, label: "点亮地区", placeholder: "请选择点亮地区" })));
var __VLS_29 = __VLS_28.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { modelValue: (__VLS_ctx.fieldValue), isLink: true, readonly: true, label: "点亮地区", placeholder: "请选择点亮地区" })], __VLS_functionalComponentArgsRest(__VLS_28), false));
var __VLS_31;
var __VLS_32;
var __VLS_33 = ({ click: {} },
    { onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.show = true;
            // @ts-ignore
            [fieldValue, show,];
        } });
var __VLS_30;
var __VLS_35 = {}.VanPopup;
/** @type {[typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, ]} */ ;
// @ts-ignore
VanPopup;
// @ts-ignore
var __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    show: (__VLS_ctx.show),
    round: true,
    position: "bottom",
}));
var __VLS_37 = __VLS_36.apply(void 0, __spreadArray([{
        show: (__VLS_ctx.show),
        round: true,
        position: "bottom",
    }], __VLS_functionalComponentArgsRest(__VLS_36), false));
var __VLS_39 = __VLS_38.slots.default;
// @ts-ignore
[show,];
var __VLS_40 = {}.VanCascader;
/** @type {[typeof __VLS_components.VanCascader, typeof __VLS_components.vanCascader, ]} */ ;
// @ts-ignore
VanCascader;
// @ts-ignore
var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40(__assign(__assign({ 'onClose': {} }, { 'onFinish': {} }), { modelValue: (__VLS_ctx.cascaderValue), title: "请选择所在地区", options: (__VLS_ctx.cascaderOptions) })));
var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([__assign(__assign({ 'onClose': {} }, { 'onFinish': {} }), { modelValue: (__VLS_ctx.cascaderValue), title: "请选择所在地区", options: (__VLS_ctx.cascaderOptions) })], __VLS_functionalComponentArgsRest(__VLS_41), false));
var __VLS_44;
var __VLS_45;
var __VLS_46 = ({ close: {} },
    { onClose: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.show = false;
            // @ts-ignore
            [show, cascaderValue, cascaderOptions,];
        } });
var __VLS_47 = ({ finish: {} },
    { onFinish: (__VLS_ctx.onFinish) });
// @ts-ignore
[onFinish,];
var __VLS_43;
var __VLS_38;
/** @type {__VLS_StyleScopedClasses['h-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-50']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[50%]']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-select']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[70%]']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['reset-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[40px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[40px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#eee]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[20px]']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['right-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight-select']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        columns: columns,
        modeValue: modeValue,
        showPicker: showPicker,
        pickerValue: pickerValue,
        modeChangeFn: modeChangeFn,
        show: show,
        fieldValue: fieldValue,
        cascaderValue: cascaderValue,
        cascaderOptions: cascaderOptions,
        onFinish: onFinish,
        resetMap: resetMap,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
