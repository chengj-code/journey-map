import { computed } from 'vue';
var props = withDefaults(defineProps(), {
    size: 32,
});
var DEFAULT_COLORS = {
    '北京市': { bg: '#A8D8EA', text: '#fff' },
    '天津市': { bg: '#FFCDD2', text: '#5D4037' },
    '上海市': { bg: '#E1BEE7', text: '#4A148C' },
    '重庆市': { bg: '#B2EBF2', text: '#006064' },
    '河北省': { bg: '#C8E6C9', text: '#1B5E20' },
    '山西省': { bg: '#FFF9C4', text: '#F57F17' },
    '辽宁省': { bg: '#FFE0B2', text: '#E65100' },
    '吉林省': { bg: '#FFCCBC', text: '#BF360C' },
    '黑龙江省': { bg: '#D7CCC8', text: '#3E2723' },
    '江苏省': { bg: '#F8BBD0', text: '#880E4F' },
    '浙江省': { bg: '#E1BEE7', text: '#4A148C' },
    '安徽省': { bg: '#C5CAE9', text: '#283593' },
    '福建省': { bg: '#BBDEFB', text: '#0D47A1' },
    '江西省': { bg: '#B2DFDB', text: '#006064' },
    '山东省': { bg: '#FFF9C4', text: '#F57F17' },
    '河南省': { bg: '#FFCCBC', text: '#E65100' },
    '湖北省': { bg: '#B3E5FC', text: '#01579B' },
    '湖南省': { bg: '#C8E6C9', text: '#1B5E20' },
    '广东省': { bg: '#FFAB91', text: '#D84315' },
    '海南省': { bg: '#F48FB1', text: '#AD1457' },
    '四川省': { bg: '#B2EBF2', text: '#006064' },
    '贵州省': { bg: '#E1BEE7', text: '#4A148C' },
    '云南省': { bg: '#C5E1A5', text: '#33691E' },
    '陕西省': { bg: '#FFE0B2', text: '#E65100' },
    '甘肃省': { bg: '#F0F4C3', text: '#827717' },
    '青海省': { bg: '#B2DFDB', text: '#004D40' },
    '台湾省': { bg: '#81D4FA', text: '#01579B' },
    '内蒙古自治区': { bg: '#FFE0B2', text: '#E65100' },
    '广西壮族自治区': { bg: '#F8BBD0', text: '#880E4F' },
    '西藏自治区': { bg: '#CFD8DC', text: '#455A64' },
    '宁夏回族自治区': { bg: '#DCEDC8', text: '#33691E' },
    '新疆维吾尔自治区': { bg: '#FFCDD2', text: '#B71C1C' },
    '香港特别行政区': { bg: '#FFAB91', text: '#D84315' },
    '澳门特别行政区': { bg: '#FFF59D', text: '#F57F17' },
};
var finalBgColor = computed(function () {
    var _a;
    return props.backgroundColor || ((_a = DEFAULT_COLORS[props.provinceName]) === null || _a === void 0 ? void 0 : _a.bg) || '#E0E0E0';
});
var finalTextColor = computed(function () {
    var _a;
    return props.textColor || ((_a = DEFAULT_COLORS[props.provinceName]) === null || _a === void 0 ? void 0 : _a.text) || '#333';
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_withDefaultsArg = (function (t) { return t; })({
    size: 32,
});
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
    viewBox: ("0 0 ".concat(__VLS_ctx.size, " ").concat(__VLS_ctx.size)),
    xmlns: "http://www.w3.org/2000/svg",
    width: (__VLS_ctx.size),
    height: (__VLS_ctx.size),
});
// @ts-ignore
[size, size, size, size,];
__VLS_asFunctionalElement(__VLS_elements.rect)({
    width: (__VLS_ctx.size),
    height: (__VLS_ctx.size),
    rx: "6",
    fill: (__VLS_ctx.finalBgColor),
});
// @ts-ignore
[size, size, finalBgColor,];
__VLS_asFunctionalElement(__VLS_elements.text, __VLS_elements.text)({
    x: (__VLS_ctx.size / 2),
    y: (__VLS_ctx.size * 0.65),
    'text-anchor': "middle",
    'font-size': (__VLS_ctx.size * 0.5),
    'font-weight': "bold",
    fill: (__VLS_ctx.finalTextColor),
    'font-family': "Arial, sans-serif",
});
// @ts-ignore
[size, size, size, finalTextColor,];
(__VLS_ctx.label);
// @ts-ignore
[label,];
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        finalBgColor: finalBgColor,
        finalTextColor: finalTextColor,
    }); },
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
