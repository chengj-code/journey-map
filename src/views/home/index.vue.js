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
import { useRouter } from 'vue-router';
import { useMapStore } from '@/store';
import { IconProvince } from '@/components/icons';
var router = useRouter();
var mapStore = useMapStore();
var quickActions = [
    { icon: '🗺️', name: '地图', path: '/map' },
    { icon: '📊', name: '统计', path: '/statistics' },
    { icon: '🎨', name: '图标库', path: '/icon-gallery' },
    { icon: '⭐', name: '收藏', path: '#' },
];
var provinceCount = computed(function () { return mapStore.provinceData.length; });
var cityCount = computed(function () { return mapStore.cityData.length; });
var totalVisited = computed(function () { return provinceCount.value + cityCount.value; });
var recentItems = computed(function () {
    var allItems = __spreadArray(__spreadArray([], mapStore.provinceData.map(function (item) { return (__assign(__assign({}, item), { label: item.name.slice(0, 2), date: formatDate(item.name) })); }), true), mapStore.cityData.map(function (item) {
        var _a;
        return (__assign(__assign({}, item), { label: ((_a = item.name) === null || _a === void 0 ? void 0 : _a.slice(0, 2)) || '??', date: formatDate(item.name) }));
    }), true);
    return allItems.slice(-5).reverse();
});
function formatDate(name) {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return "".concat(month, "-").concat(day);
}
function goToMap() {
    router.push('/map');
}
function goToStatistics() {
    router.push('/statistics');
}
function navigateTo(path) {
    if (path !== '#') {
        router.push(path);
    }
}
function handleSearch() {
    console.log('搜索功能');
}
function handleNotification() {
    console.log('通知功能');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "home-page bg-[#F8FAFC] min-h-screen pb-6" }));
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)(__assign({ class: "nav-bar" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "nav-content" }));
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)(__assign({ class: "nav-title" }));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "nav-icon" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "nav-actions" }));
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)(__assign({ onClick: (__VLS_ctx.handleSearch) }, { class: "nav-btn" }));
// @ts-ignore
[handleSearch,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "action-icon" }));
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)(__assign({ onClick: (__VLS_ctx.handleNotification) }, { class: "nav-btn" }));
// @ts-ignore
[handleNotification,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "action-icon" }));
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)(__assign({ class: "main-content" }));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)(__assign({ onClick: (__VLS_ctx.goToMap) }, { class: "hero-card" }));
// @ts-ignore
[goToMap,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "hero-header" }));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "hero-title" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "hero-stats" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-number" }));
(__VLS_ctx.totalVisited);
// @ts-ignore
[totalVisited,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-subtitle" }));
(__VLS_ctx.provinceCount);
(__VLS_ctx.cityCount);
// @ts-ignore
[provinceCount, cityCount,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)(__assign({ class: "cta-button" }));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)(__assign({ class: "quick-actions" }));
var _loop_1 = function (action) {
    // @ts-ignore
    [quickActions,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.navigateTo(action.path);
            // @ts-ignore
            [navigateTo,];
        } }, { key: (action.name) }), { class: "action-card" }));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "action-icon-wrapper" }));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "action-icon-large" }));
    (action.icon);
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "action-name" }));
    (action.name);
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.quickActions)); _i < _a.length; _i++) {
    var action = _a[_i][0];
    _loop_1(action);
}
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)(__assign({ class: "recent-section" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "section-header" }));
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)(__assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ onClick: (__VLS_ctx.goToStatistics) }, { class: "view-all" }));
// @ts-ignore
[goToStatistics,];
if (__VLS_ctx.recentItems.length > 0) {
    // @ts-ignore
    [recentItems,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "recent-list" }));
    for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.recentItems)); _b < _c.length; _b++) {
        var _d = _c[_b], item = _d[0], index = _d[1];
        // @ts-ignore
        [recentItems,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ key: (index) }, { class: "recent-item" }));
        var __VLS_0 = {}.IconProvince;
        /** @type {[typeof __VLS_components.IconProvince, ]} */ ;
        // @ts-ignore
        IconProvince;
        // @ts-ignore
        var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            provinceName: (item.name),
            label: (item.label),
            size: (32),
        }));
        var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
                provinceName: (item.name),
                label: (item.label),
                size: (32),
            }], __VLS_functionalComponentArgsRest(__VLS_1), false));
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "item-info" }));
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "item-name" }));
        (item.name);
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "item-date" }));
        (item.date);
    }
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "empty-state" }));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "empty-icon" }));
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "empty-text" }));
}
/** @type {__VLS_StyleScopedClasses['home-page']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#F8FAFC]']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-content']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-title']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['action-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['action-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-card']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-header']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-stats']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-number']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-button']} */ ;
/** @type {__VLS_StyleScopedClasses['quick-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['action-card']} */ ;
/** @type {__VLS_StyleScopedClasses['action-icon-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['action-icon-large']} */ ;
/** @type {__VLS_StyleScopedClasses['action-name']} */ ;
/** @type {__VLS_StyleScopedClasses['recent-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['view-all']} */ ;
/** @type {__VLS_StyleScopedClasses['recent-list']} */ ;
/** @type {__VLS_StyleScopedClasses['recent-item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-info']} */ ;
/** @type {__VLS_StyleScopedClasses['item-name']} */ ;
/** @type {__VLS_StyleScopedClasses['item-date']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-text']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        IconProvince: IconProvince,
        quickActions: quickActions,
        provinceCount: provinceCount,
        cityCount: cityCount,
        totalVisited: totalVisited,
        recentItems: recentItems,
        goToMap: goToMap,
        goToStatistics: goToStatistics,
        navigateTo: navigateTo,
        handleSearch: handleSearch,
        handleNotification: handleNotification,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
