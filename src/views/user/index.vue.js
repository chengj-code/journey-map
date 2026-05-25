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
import { useRouter } from 'vue-router';
import avatar from '@/assets/images/avator.jfif';
var router = useRouter();
var toLogin = function () {
    router.push('/login');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "bg-[#f5f5f5] h-[100%]" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "p-[10px] flex justify-between" }));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ onClick: (__VLS_ctx.toLogin) }));
// @ts-ignore
[toLogin,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ onClick: (__VLS_ctx.toLogin) }));
// @ts-ignore
[toLogin,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "card flex" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "w-[100px] h-[100px] shrink-[0]" }));
__VLS_asFunctionalElement(__VLS_elements.img)(__assign({ class: "w-[100%] h-[100%]" }, { src: (__VLS_ctx.avatar), alt: "" }));
// @ts-ignore
[avatar,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "flex-1 shrink-[0] p-[10px]" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "h-[30px] text-[20px] font-bold mb-[20px]" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "h-[30px] text-[16px] text-[#999]" }));
/** @type {__VLS_StyleScopedClasses['bg-[#f5f5f5]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[100px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[100px]']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-[0]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-[0]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[30px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[20px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-[20px]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[30px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#999]']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        avatar: avatar,
        toLogin: toLogin,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
