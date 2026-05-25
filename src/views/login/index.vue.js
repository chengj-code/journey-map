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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { useRouter } from 'vue-router';
import { showLoadingToast } from 'vant';
var username = ref('chengj');
var password = ref('123456');
// 密码是长度6-12位的大小写字母（a-z, A-Z）、数字（0-9）和下划线（_）
var pattern = /^[a-zA-Z0-9_]{6,12}$/;
var router = useRouter();
var onSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        showLoadingToast({
            message: '登录中', overlay: true, onClose: function () {
                router.replace({ name: 'layout' });
            }
        });
        console.log('username', username.value);
        console.log('password', password.value);
        return [2 /*return*/];
    });
}); };
var toRegister = function () {
    router.push({ name: 'register' });
};
var toRename = function () {
    router.push({ name: 'rename' });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "h-[100%] bg-blue-100" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "logo h-[200px] flex justify-center items-center" }));
var __VLS_0 = {}.VanForm;
/** @type {[typeof __VLS_components.VanForm, typeof __VLS_components.vanForm, typeof __VLS_components.VanForm, typeof __VLS_components.vanForm, ]} */ ;
// @ts-ignore
VanForm;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ 'onSubmit': {} })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ 'onSubmit': {} })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4;
var __VLS_5;
var __VLS_6 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.onSubmit) });
var __VLS_7 = __VLS_3.slots.default;
// @ts-ignore
[onSubmit,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "mt h-[200px]" }));
var __VLS_8 = {}.VanCellGroup;
/** @type {[typeof __VLS_components.VanCellGroup, typeof __VLS_components.vanCellGroup, typeof __VLS_components.VanCellGroup, typeof __VLS_components.vanCellGroup, ]} */ ;
// @ts-ignore
VanCellGroup;
// @ts-ignore
var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    inset: true,
}));
var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([{
        inset: true,
    }], __VLS_functionalComponentArgsRest(__VLS_9), false));
var __VLS_12 = __VLS_11.slots.default;
var __VLS_13 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
var __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    modelValue: (__VLS_ctx.username),
    name: "username",
    label: "用户名",
    placeholder: "用户名",
    rules: ([{ required: true, message: '请填写用户名' }]),
}));
var __VLS_15 = __VLS_14.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.username),
        name: "username",
        label: "用户名",
        placeholder: "用户名",
        rules: ([{ required: true, message: '请填写用户名' }]),
    }], __VLS_functionalComponentArgsRest(__VLS_14), false));
// @ts-ignore
[username,];
var __VLS_18 = {}.VanField;
/** @type {[typeof __VLS_components.VanField, typeof __VLS_components.vanField, ]} */ ;
// @ts-ignore
VanField;
// @ts-ignore
var __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    modelValue: (__VLS_ctx.password),
    type: "password",
    name: "password",
    label: "密码",
    placeholder: "密码",
    rules: ([{ pattern: __VLS_ctx.pattern, required: true, message: '请填写密码' }]),
}));
var __VLS_20 = __VLS_19.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.password),
        type: "password",
        name: "password",
        label: "密码",
        placeholder: "密码",
        rules: ([{ pattern: __VLS_ctx.pattern, required: true, message: '请填写密码' }]),
    }], __VLS_functionalComponentArgsRest(__VLS_19), false));
// @ts-ignore
[password, pattern,];
var __VLS_11;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "tip text-xs flex justify-between" }));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ onClick: (__VLS_ctx.toRegister) }));
// @ts-ignore
[toRegister,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ onClick: (__VLS_ctx.toRename) }));
// @ts-ignore
[toRename,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ style: {} }));
var __VLS_23 = {}.VanButton;
/** @type {[typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, typeof __VLS_components.VanButton, typeof __VLS_components.vanButton, ]} */ ;
// @ts-ignore
VanButton;
// @ts-ignore
var __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    round: true,
    block: true,
    type: "primary",
    nativeType: "submit",
}));
var __VLS_25 = __VLS_24.apply(void 0, __spreadArray([{
        round: true,
        block: true,
        type: "primary",
        nativeType: "submit",
    }], __VLS_functionalComponentArgsRest(__VLS_24), false));
var __VLS_27 = __VLS_26.slots.default;
var __VLS_26;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['h-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-100']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['tip']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        username: username,
        password: password,
        pattern: pattern,
        onSubmit: onSubmit,
        toRegister: toRegister,
        toRename: toRename,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
