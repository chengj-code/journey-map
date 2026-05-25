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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
import { useCascaderAreaData } from '@vant/area-data';
import { useMapStore } from '@/store';
import chinaJson from '@/assets/map/china.json';
var router = useRouter();
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
var areaData = useCascaderAreaData();
var cascaderOptions = computed(function () {
    if (mapStore.currentMode === 'province') {
        return areaData.map(function (item) { return ({
            text: item.text,
            value: item.value,
            children: undefined
        }); });
    }
    var cityModeOptions = JSON.parse(JSON.stringify(areaData));
    cityModeOptions.forEach(function (province) {
        var _a;
        if (["北京市", "天津市", "上海市", "重庆市", "香港特别行政区", "澳门特别行政区"].includes(province.text)) {
            return;
        }
        (_a = province.children) === null || _a === void 0 ? void 0 : _a.forEach(function (city) {
            delete city.children;
        });
    });
    return cityModeOptions;
});
var onFinish = function (_a) {
    var _b;
    var selectedOptions = _a.selectedOptions;
    show.value = false;
    fieldValue.value = selectedOptions.map(function (option) { return option.text; }).join('/');
    var selectName = (_b = selectedOptions[selectedOptions.length - 1]) === null || _b === void 0 ? void 0 : _b.text;
    var fullName = fieldValue.value;
    if (mapStore.currentMode === 'province') {
        mapStore.addProvince(selectName);
    }
    else {
        mapStore.addCity(selectName, fullName);
    }
    updateHighlightMap();
};
echarts.registerMap("china", chinaJson);
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
            map: mapOptions.value.mapType,
            roam: mapOptions.value.roam,
            selectedMode: mapOptions.value.selectedMode,
            silent: mapOptions.value.silent,
            layoutCenter: ['50%', '50%'],
            scaleLimit: {
                min: 1.2,
                max: 20
            },
            zoom: mapOptions.value.zoom,
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
    myChart.setOption(option);
};
var updateHighlightMap = function () {
    myChart.clear();
    myChart.setOption(option.value);
};
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
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "map-page" }));
var __VLS_0 = {}.VanNavBar;
/** @type {[typeof __VLS_components.VanNavBar, typeof __VLS_components.vanNavBar, ]} */ ;
// @ts-ignore
VanNavBar;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ 'onClickLeft': {} }, { title: "足迹地图", leftArrow: true })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ 'onClickLeft': {} }, { title: "足迹地图", leftArrow: true })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4;
var __VLS_5;
var __VLS_6 = ({ clickLeft: {} },
    { onClickLeft: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.router.back();
            // @ts-ignore
            [router,];
        } });
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "map-content" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "w-[50%] mode-select" }));
var __VLS_8 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(__assign({ 'onClick': {} }, { modelValue: (__VLS_ctx.modeValue), isLink: true, readonly: true, label: "模式", placeholder: "选择模式" })));
var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { modelValue: (__VLS_ctx.modeValue), isLink: true, readonly: true, label: "模式", placeholder: "选择模式" })], __VLS_functionalComponentArgsRest(__VLS_9), false));
var __VLS_12;
var __VLS_13;
var __VLS_14 = ({ click: {} },
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
var __VLS_11;
var __VLS_16 = {}.VanPopup;
/** @type {[typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, ]} */ ;
// @ts-ignore
VanPopup;
// @ts-ignore
var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    show: (__VLS_ctx.showPicker),
    destroyOnClose: true,
    round: true,
    position: "bottom",
}));
var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([{
        show: (__VLS_ctx.showPicker),
        destroyOnClose: true,
        round: true,
        position: "bottom",
    }], __VLS_functionalComponentArgsRest(__VLS_17), false));
var __VLS_20 = __VLS_19.slots.default;
// @ts-ignore
[showPicker,];
var __VLS_21 = {}.VanPicker;
/** @type {[typeof __VLS_components.VanPicker, typeof __VLS_components.vanPicker, ]} */ ;
// @ts-ignore
VanPicker;
// @ts-ignore
var __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21(__assign(__assign({ 'onCancel': {} }, { 'onConfirm': {} }), { modelValue: (__VLS_ctx.pickerValue), columns: (__VLS_ctx.columns) })));
var __VLS_23 = __VLS_22.apply(void 0, __spreadArray([__assign(__assign({ 'onCancel': {} }, { 'onConfirm': {} }), { modelValue: (__VLS_ctx.pickerValue), columns: (__VLS_ctx.columns) })], __VLS_functionalComponentArgsRest(__VLS_22), false));
var __VLS_25;
var __VLS_26;
var __VLS_27 = ({ cancel: {} },
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
var __VLS_28 = ({ confirm: {} },
    { onConfirm: (__VLS_ctx.modeChangeFn) });
// @ts-ignore
[modeChangeFn,];
var __VLS_24;
var __VLS_19;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "w-[100%] map-container" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "w-[100%] h-[100%]" }, { id: "echarts-container" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ onClick: (__VLS_ctx.resetMap) }, { class: "reset-btn w-[40px] h-[40px] flex justify-center items-center bg-[#eee] rounded-[20px] absolute bottom-[10px] right-[10px]" }));
// @ts-ignore
[resetMap,];
var __VLS_30 = {}.VanIcon;
/** @type {[typeof __VLS_components.VanIcon, typeof __VLS_components.vanIcon, ]} */ ;
// @ts-ignore
VanIcon;
// @ts-ignore
var __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    name: "revoke",
    size: "24",
}));
var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([{
        name: "revoke",
        size: "24",
    }], __VLS_functionalComponentArgsRest(__VLS_31), false));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "highlight-select" }));
var __VLS_35 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
var __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35(__assign({ 'onClick': {} }, { modelValue: (__VLS_ctx.fieldValue), isLink: true, readonly: true, label: "点亮地区", placeholder: "请选择点亮地区" })));
var __VLS_37 = __VLS_36.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { modelValue: (__VLS_ctx.fieldValue), isLink: true, readonly: true, label: "点亮地区", placeholder: "请选择点亮地区" })], __VLS_functionalComponentArgsRest(__VLS_36), false));
var __VLS_39;
var __VLS_40;
var __VLS_41 = ({ click: {} },
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
var __VLS_38;
var __VLS_43 = {}.VanPopup;
/** @type {[typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, typeof __VLS_components.VanPopup, typeof __VLS_components.vanPopup, ]} */ ;
// @ts-ignore
VanPopup;
// @ts-ignore
var __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    show: (__VLS_ctx.show),
    round: true,
    position: "bottom",
}));
var __VLS_45 = __VLS_44.apply(void 0, __spreadArray([{
        show: (__VLS_ctx.show),
        round: true,
        position: "bottom",
    }], __VLS_functionalComponentArgsRest(__VLS_44), false));
var __VLS_47 = __VLS_46.slots.default;
// @ts-ignore
[show,];
var __VLS_48 = {}.VanCascader;
/** @type {[typeof __VLS_components.VanCascader, typeof __VLS_components.vanCascader, ]} */ ;
// @ts-ignore
VanCascader;
// @ts-ignore
var __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48(__assign(__assign({ 'onClose': {} }, { 'onFinish': {} }), { modelValue: (__VLS_ctx.cascaderValue), title: "请选择所在地区", options: (__VLS_ctx.cascaderOptions) })));
var __VLS_50 = __VLS_49.apply(void 0, __spreadArray([__assign(__assign({ 'onClose': {} }, { 'onFinish': {} }), { modelValue: (__VLS_ctx.cascaderValue), title: "请选择所在地区", options: (__VLS_ctx.cascaderOptions) })], __VLS_functionalComponentArgsRest(__VLS_49), false));
var __VLS_52;
var __VLS_53;
var __VLS_54 = ({ close: {} },
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
var __VLS_55 = ({ finish: {} },
    { onFinish: (__VLS_ctx.onFinish) });
// @ts-ignore
[onFinish,];
var __VLS_51;
var __VLS_46;
/** @type {__VLS_StyleScopedClasses['map-page']} */ ;
/** @type {__VLS_StyleScopedClasses['map-content']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[50%]']} */ ;
/** @type {__VLS_StyleScopedClasses['mode-select']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['map-container']} */ ;
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
        router: router,
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
