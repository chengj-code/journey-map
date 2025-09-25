<template>
    <div class="h-[100%] bg-blue-100">
        <div class="logo h-[200px] flex justify-center items-center">
            Logo区域
        </div>
        <van-form @submit="onSubmit">
            <div class="mt h-[200px]">
                <van-cell-group inset>
                    <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]" />
                    <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                        :rules="[{ pattern, required: true, message: '请填写密码' }]" />
                </van-cell-group>
            </div>
            <div class="tip text-xs flex justify-between">
                <span @click="toRegister"> 没有账号？去注册 </span>
                <span @click="toRename"> 忘记密码？ </span>
            </div>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showLoadingToast } from 'vant'
const username = ref('chengj')
const password = ref('123456')
// 密码是长度6-12位的大小写字母（a-z, A-Z）、数字（0-9）和下划线（_）
const pattern = /^[a-zA-Z0-9_]{6,12}$/
const onSubmit = async () => {
    showLoadingToast({ message: '登录中', overlay: true, });
    console.log('username', username.value)
    console.log('password', password.value)
}
const router = useRouter()
const toRegister = () => {
    router.push({ name: 'register' })
}
const toRename = () => {
    router.push({ name: 'rename' })
}
</script>

<style scoped lang="less">
// .van-cell {
//     height: 68px;
// }

.logo {
    padding: 10px 20px;
}

.tip {
    padding: 0px 16px;
}
</style>
