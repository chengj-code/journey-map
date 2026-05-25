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
import { ref } from 'vue';
import Home from '@/views/home/index.vue';
import Statistics from '@/views/statistics/index.vue';
import User from '@/views/user/index.vue';
var active = ref(0);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "content" }));
/** @type {[typeof Home, ]} */ ;
// @ts-ignore
var __VLS_0 = __VLS_asFunctionalComponent(Home, new Home({}));
var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_0), false));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.active === 0) }), null, null);
// @ts-ignore
[active,];
/** @type {[typeof Statistics, ]} */ ;
// @ts-ignore
var __VLS_4 = __VLS_asFunctionalComponent(Statistics, new Statistics({}));
var __VLS_5 = __VLS_4.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_4), false));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.active === 1) }), null, null);
// @ts-ignore
[active,];
/** @type {[typeof User, ]} */ ;
// @ts-ignore
var __VLS_8 = __VLS_asFunctionalComponent(User, new User({}));
var __VLS_9 = __VLS_8.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_8), false));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.active === 2) }), null, null);
// @ts-ignore
[active,];
var __VLS_12 = {}.VanTabbar;
/** @type {[typeof __VLS_components.VanTabbar, typeof __VLS_components.vanTabbar, typeof __VLS_components.VanTabbar, typeof __VLS_components.vanTabbar, ]} */ ;
// @ts-ignore
VanTabbar;
// @ts-ignore
var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.active),
}));
var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.active),
    }], __VLS_functionalComponentArgsRest(__VLS_13), false));
var __VLS_16 = __VLS_15.slots.default;
// @ts-ignore
[active,];
var __VLS_17 = {}.VanTabbarItem;
/** @type {[typeof __VLS_components.VanTabbarItem, typeof __VLS_components.vanTabbarItem, typeof __VLS_components.VanTabbarItem, typeof __VLS_components.vanTabbarItem, ]} */ ;
// @ts-ignore
VanTabbarItem;
// @ts-ignore
var __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    icon: "home-o",
}));
var __VLS_19 = __VLS_18.apply(void 0, __spreadArray([{
        icon: "home-o",
    }], __VLS_functionalComponentArgsRest(__VLS_18), false));
var __VLS_21 = __VLS_20.slots.default;
var __VLS_20;
var __VLS_22 = {}.VanTabbarItem;
/** @type {[typeof __VLS_components.VanTabbarItem, typeof __VLS_components.vanTabbarItem, typeof __VLS_components.VanTabbarItem, typeof __VLS_components.vanTabbarItem, ]} */ ;
// @ts-ignore
VanTabbarItem;
// @ts-ignore
var __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    icon: "chart-trending-o",
}));
var __VLS_24 = __VLS_23.apply(void 0, __spreadArray([{
        icon: "chart-trending-o",
    }], __VLS_functionalComponentArgsRest(__VLS_23), false));
var __VLS_26 = __VLS_25.slots.default;
var __VLS_25;
var __VLS_27 = {}.VanTabbarItem;
/** @type {[typeof __VLS_components.VanTabbarItem, typeof __VLS_components.vanTabbarItem, typeof __VLS_components.VanTabbarItem, typeof __VLS_components.vanTabbarItem, ]} */ ;
// @ts-ignore
VanTabbarItem;
// @ts-ignore
var __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    icon: "friends-o",
}));
var __VLS_29 = __VLS_28.apply(void 0, __spreadArray([{
        icon: "friends-o",
    }], __VLS_functionalComponentArgsRest(__VLS_28), false));
var __VLS_31 = __VLS_30.slots.default;
var __VLS_30;
var __VLS_15;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        Home: Home,
        Statistics: Statistics,
        User: User,
        active: active,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
