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
import { showDialog, showToast } from 'vant';
import { useMapStore } from '@/store/mapStore';
import avatar from '@/assets/images/avator.jfif';
var router = useRouter();
var mapStore = useMapStore();
var totalCount = computed(function () { return mapStore.provinceData.length + mapStore.cityData.length; });
var provinceCount = computed(function () { return mapStore.provinceData.length; });
var cityCount = computed(function () { return mapStore.cityData.length; });
var handleLogout = function () {
    showDialog({
        title: '提示',
        message: '确定要退出登录吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(function () {
        localStorage.removeItem('user-token');
        showToast('已退出登录');
        setTimeout(function () {
            router.push('/login');
        }, 500);
    }).catch(function () {
        // 用户点击了取消
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['van-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['van-cell__left-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['van-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['van-cell__left-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['van-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['van-cell__left-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['van-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['van-cell__left-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['van-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['van-cell__left-icon']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "user-page bg-[#F8FAFC] min-h-screen pb-20" }));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)(__assign({ class: "profile-header" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "header-content" }));
__VLS_asFunctionalElement(__VLS_elements.img)(__assign({ class: "avatar" }, { src: (__VLS_ctx.avatar), alt: "头像" }));
// @ts-ignore
[avatar,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "user-info" }));
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)(__assign({ class: "nickname" }));
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "phone" }));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "edit-link" }));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)(__assign({ class: "stats-section" }));
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)(__assign({ class: "stats-title" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stats-grid" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-card bg-white rounded-2xl p-4 text-center shadow-sm" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-number text-[28px] font-bold text-[#10B981]" }));
(__VLS_ctx.totalCount);
// @ts-ignore
[totalCount,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-label text-[12px] text-[#64748B] mt-1" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-card bg-white rounded-2xl p-4 text-center shadow-sm" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-number text-[28px] font-bold text-[#3B82F6]" }));
(__VLS_ctx.provinceCount);
// @ts-ignore
[provinceCount,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-label text-[12px] text-[#64748B] mt-1" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-card bg-white rounded-2xl p-4 text-center shadow-sm" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-number text-[28px] font-bold text-[#8B5CF6]" }));
(__VLS_ctx.cityCount);
// @ts-ignore
[cityCount,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "stat-label text-[12px] text-[#64748B] mt-1" }));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)(__assign({ class: "menu-list" }));
var __VLS_0 = {}.VanCellGroup;
/** @type {[typeof __VLS_components.VanCellGroup, typeof __VLS_components.vanCellGroup, typeof __VLS_components.VanCellGroup, typeof __VLS_components.vanCellGroup, ]} */ ;
// @ts-ignore
VanCellGroup;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    border: (false),
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        border: (false),
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = __VLS_3.slots.default;
var __VLS_5 = {}.VanCell;
/** @type {[typeof __VLS_components.VanCell, typeof __VLS_components.vanCell, ]} */ ;
// @ts-ignore
VanCell;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    title: "图标设置",
    icon: "brush-o",
    isLink: true,
    to: "/icon-gallery",
    customClass: "menu-item",
}));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
        title: "图标设置",
        icon: "brush-o",
        isLink: true,
        to: "/icon-gallery",
        customClass: "menu-item",
    }], __VLS_functionalComponentArgsRest(__VLS_6), false));
var __VLS_10 = {}.VanCell;
/** @type {[typeof __VLS_components.VanCell, typeof __VLS_components.vanCell, ]} */ ;
// @ts-ignore
VanCell;
// @ts-ignore
var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    title: "点亮历史",
    icon: "chart-trending-o",
    isLink: true,
    to: "/statistics",
    customClass: "menu-item",
}));
var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
        title: "点亮历史",
        icon: "chart-trending-o",
        isLink: true,
        to: "/statistics",
        customClass: "menu-item",
    }], __VLS_functionalComponentArgsRest(__VLS_11), false));
var __VLS_15 = {}.VanCell;
/** @type {[typeof __VLS_components.VanCell, typeof __VLS_components.vanCell, ]} */ ;
// @ts-ignore
VanCell;
// @ts-ignore
var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    title: "应用设置",
    icon: "setting-o",
    isLink: true,
    customClass: "menu-item",
}));
var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([{
        title: "应用设置",
        icon: "setting-o",
        isLink: true,
        customClass: "menu-item",
    }], __VLS_functionalComponentArgsRest(__VLS_16), false));
var __VLS_20 = {}.VanCell;
/** @type {[typeof __VLS_components.VanCell, typeof __VLS_components.vanCell, ]} */ ;
// @ts-ignore
VanCell;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    title: "帮助与反馈",
    icon: "info-o",
    isLink: true,
    customClass: "menu-item",
}));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
        title: "帮助与反馈",
        icon: "info-o",
        isLink: true,
        customClass: "menu-item",
    }], __VLS_functionalComponentArgsRest(__VLS_21), false));
var __VLS_25 = {}.VanCell;
/** @type {[typeof __VLS_components.VanCell, typeof __VLS_components.vanCell, ]} */ ;
// @ts-ignore
VanCell;
// @ts-ignore
var __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    title: "关于我们",
    icon: "description",
    isLink: true,
    customClass: "menu-item",
}));
var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{
        title: "关于我们",
        icon: "description",
        isLink: true,
        customClass: "menu-item",
    }], __VLS_functionalComponentArgsRest(__VLS_26), false));
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)(__assign({ class: "logout-section" }));
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)(__assign({ onClick: (__VLS_ctx.handleLogout) }, { class: "logout-btn" }));
// @ts-ignore
[handleLogout,];
/** @type {__VLS_StyleScopedClasses['user-page']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#F8FAFC]']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-20']} */ ;
/** @type {__VLS_StyleScopedClasses['profile-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['user-info']} */ ;
/** @type {__VLS_StyleScopedClasses['nickname']} */ ;
/** @type {__VLS_StyleScopedClasses['phone']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-link']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-section']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-title']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-number']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[28px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#10B981]']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#64748B]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-number']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[28px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#3B82F6]']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#64748B]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-number']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[28px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#8B5CF6]']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#64748B]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-list']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-section']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-btn']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        avatar: avatar,
        totalCount: totalCount,
        provinceCount: provinceCount,
        cityCount: cityCount,
        handleLogout: handleLogout,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
