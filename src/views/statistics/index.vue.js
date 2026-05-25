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
import { computed } from 'vue';
import { useMapStore } from '@/store';
import { IconBeijing, IconTianjin, IconShanghai, IconChongqing, IconHebei, IconShanxi, IconLiaoning, IconJilin, IconHeilongjiang, IconJiangsu, IconZhejiang, IconAnhui, IconFujian, IconJiangxi, IconShandong, IconHenan, IconHubei, IconHunan, IconGuangdong, IconHainan, IconSichuan, IconGuizhou, IconYunnan, IconShaanxi, IconGansu, IconQinghai, IconTaiwan, IconInnerMongolia, IconGuangxi, IconTibet, IconNingxia, IconXinjiang, IconHongKong, IconMacau, } from '@/components/icons';
var mapStore = useMapStore();
var provinceData = computed(function () { return mapStore.provinceData.filter(function (item) { return item.selected; }); });
var cityData = computed(function () { return mapStore.cityData.filter(function (item) { return item.selected; }); });
var provinceCount = computed(function () { return provinceData.value.length; });
var cityCount = computed(function () { return cityData.value.length; });
var provinceIconMap = {
    '北京市': IconBeijing,
    '天津市': IconTianjin,
    '上海市': IconShanghai,
    '重庆市': IconChongqing,
    '河北省': IconHebei,
    '山西省': IconShanxi,
    '辽宁省': IconLiaoning,
    '吉林省': IconJilin,
    '黑龙江省': IconHeilongjiang,
    '江苏省': IconJiangsu,
    '浙江省': IconZhejiang,
    '安徽省': IconAnhui,
    '福建省': IconFujian,
    '江西省': IconJiangxi,
    '山东省': IconShandong,
    '河南省': IconHenan,
    '湖北省': IconHubei,
    '湖南省': IconHunan,
    '广东省': IconGuangdong,
    '海南省': IconHainan,
    '四川省': IconSichuan,
    '贵州省': IconGuizhou,
    '云南省': IconYunnan,
    '陕西省': IconShaanxi,
    '甘肃省': IconGansu,
    '青海省': IconQinghai,
    '台湾省': IconTaiwan,
    '内蒙古自治区': IconInnerMongolia,
    '广西壮族自治区': IconGuangxi,
    '西藏自治区': IconTibet,
    '宁夏回族自治区': IconNingxia,
    '新疆维吾尔自治区': IconXinjiang,
    '香港特别行政区': IconHongKong,
    '澳门特别行政区': IconMacau,
};
var getProvinceIcon = function (name) {
    return provinceIconMap[name] || IconBeijing;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "statistics-page bg-[#f5f5f5] h-[100%] overflow-y-auto" }));
var __VLS_0 = {}.VanNavBar;
/** @type {[typeof __VLS_components.VanNavBar, typeof __VLS_components.vanNavBar, ]} */ ;
// @ts-ignore
VanNavBar;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: "点亮统计",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        title: "点亮统计",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "section-title" }));
(__VLS_ctx.provinceCount);
// @ts-ignore
[provinceCount,];
if (__VLS_ctx.provinceData.length > 0) {
    // @ts-ignore
    [provinceData,];
    var __VLS_5 = {}.VanCellGroup;
    /** @type {[typeof __VLS_components.VanCellGroup, typeof __VLS_components.vanCellGroup, typeof __VLS_components.VanCellGroup, typeof __VLS_components.vanCellGroup, ]} */ ;
    // @ts-ignore
    VanCellGroup;
    // @ts-ignore
    var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        inset: true,
    }));
    var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
            inset: true,
        }], __VLS_functionalComponentArgsRest(__VLS_6), false));
    var __VLS_9 = __VLS_8.slots.default;
    for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.provinceData)); _i < _a.length; _i++) {
        var _b = _a[_i], item = _b[0], index = _b[1];
        // @ts-ignore
        [provinceData,];
        var __VLS_10 = {}.VanCell;
        /** @type {[typeof __VLS_components.VanCell, typeof __VLS_components.vanCell, typeof __VLS_components.VanCell, typeof __VLS_components.vanCell, ]} */ ;
        // @ts-ignore
        VanCell;
        // @ts-ignore
        var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
            key: (index),
            title: (item.name),
        }));
        var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
                key: (index),
                title: (item.name),
            }], __VLS_functionalComponentArgsRest(__VLS_11), false));
        var __VLS_14 = __VLS_13.slots.default;
        {
            var __VLS_15 = __VLS_13.slots.icon;
            var __VLS_16 = ((__VLS_ctx.getProvinceIcon(item.name)));
            // @ts-ignore
            var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(__assign({ class: "icon" })));
            var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([__assign({ class: "icon" })], __VLS_functionalComponentArgsRest(__VLS_17), false));
            // @ts-ignore
            [getProvinceIcon,];
        }
        var __VLS_13;
    }
    var __VLS_8;
}
else {
    var __VLS_21 = {}.VanEmpty;
    /** @type {[typeof __VLS_components.VanEmpty, typeof __VLS_components.vanEmpty, ]} */ ;
    // @ts-ignore
    VanEmpty;
    // @ts-ignore
    var __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        description: "暂无省级点亮数据",
    }));
    var __VLS_23 = __VLS_22.apply(void 0, __spreadArray([{
            description: "暂无省级点亮数据",
        }], __VLS_functionalComponentArgsRest(__VLS_22), false));
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "section" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "section-title" }));
(__VLS_ctx.cityCount);
// @ts-ignore
[cityCount,];
if (__VLS_ctx.cityData.length > 0) {
    // @ts-ignore
    [cityData,];
    var __VLS_26 = {}.VanCellGroup;
    /** @type {[typeof __VLS_components.VanCellGroup, typeof __VLS_components.vanCellGroup, typeof __VLS_components.VanCellGroup, typeof __VLS_components.vanCellGroup, ]} */ ;
    // @ts-ignore
    VanCellGroup;
    // @ts-ignore
    var __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        inset: true,
    }));
    var __VLS_28 = __VLS_27.apply(void 0, __spreadArray([{
            inset: true,
        }], __VLS_functionalComponentArgsRest(__VLS_27), false));
    var __VLS_30 = __VLS_29.slots.default;
    for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.cityData)); _c < _d.length; _c++) {
        var _e = _d[_c], item = _e[0], index = _e[1];
        // @ts-ignore
        [cityData,];
        var __VLS_31 = {}.VanCell;
        /** @type {[typeof __VLS_components.VanCell, typeof __VLS_components.vanCell, ]} */ ;
        // @ts-ignore
        VanCell;
        // @ts-ignore
        var __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
            key: (index),
            title: (item.fullName || item.name),
        }));
        var __VLS_33 = __VLS_32.apply(void 0, __spreadArray([{
                key: (index),
                title: (item.fullName || item.name),
            }], __VLS_functionalComponentArgsRest(__VLS_32), false));
    }
    var __VLS_29;
}
else {
    var __VLS_36 = {}.VanEmpty;
    /** @type {[typeof __VLS_components.VanEmpty, typeof __VLS_components.vanEmpty, ]} */ ;
    // @ts-ignore
    VanEmpty;
    // @ts-ignore
    var __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        description: "暂无市级点亮数据",
    }));
    var __VLS_38 = __VLS_37.apply(void 0, __spreadArray([{
            description: "暂无市级点亮数据",
        }], __VLS_functionalComponentArgsRest(__VLS_37), false));
}
/** @type {__VLS_StyleScopedClasses['statistics-page']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#f5f5f5]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        provinceData: provinceData,
        cityData: cityData,
        provinceCount: provinceCount,
        cityCount: cityCount,
        getProvinceIcon: getProvinceIcon,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
