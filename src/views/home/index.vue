<template>
    <div class="h-[100%] bg-blue-50">
        <div class="w-[50%] mode-select">
            <van-field v-model="modeText" is-link readonly label="模式" placeholder="选择模式"
                @click="showModePopup = true" />
            <van-popup v-model:show="showModePopup" destroy-on-close round position="bottom">
                <van-picker :model-value="modeValue" :columns="columns" @cancel="showModePopup = false"
                    @confirm="modeChangeFn" />
            </van-popup>
        </div>
        <div class="w-[100%] h-[70%] relative">
            <MapComponent ref="mapComponentRef" :highlight="data" />
            <div class="w-[40px] h-[40px] flex justify-center items-center bg-[#eee] rounded-[20px] absolute bottom-[10px] right-[10px]"
                @click="resetMap">
                <van-icon name="revoke" size="24" />
            </div>
        </div>
        <div class="highlight-select">
            <van-field v-model="lightAreaName" is-link readonly label="点亮地区" placeholder="请选择点亮地区"
                @click="showAreaPopup = true" />
            <van-popup v-model:show="showAreaPopup" round position="bottom">
                <van-cascader v-model="lightAreaValue" title="请选择所在地区" :options="options" @close="showAreaPopup = false"
                    @finish="onFinish" />
            </van-popup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCascaderAreaData } from '@vant/area-data';
import { Numeric } from 'vant/lib/utils';
import MapComponent from "@/components/MapComponent.vue"
// 模式选择器
const columns: PickerItem[] = [
    { text: '市级', value: 'city' },
    { text: '省级', value: 'provice' },
];
const modeText = ref('市级');
const showModePopup = ref(false);
const modeValue = ref<Numeric[]>([]);
const modeChangeFn = ({ selectedValues, selectedOptions }) => {
    showModePopup.value = false;
    modeValue.value = selectedValues;
    modeText.value = selectedOptions[0].text;
};
// 点亮地区选择器
const showAreaPopup = ref(false);
const lightAreaName = ref('');
const lightAreaValue = ref('');
const options = useCascaderAreaData();
options.forEach(a => {
    a.children?.forEach(b => {
        // 四个直辖市和两个特别行政区不需要删除children属性
        if (!["北京市", "天津市", "上海市", "重庆市", "香港特别行政区", "澳门特别行政区"].includes(a.text)) {
            delete b.children
        }
    });
})
const onFinish = ({ selectedOptions }) => {
    showAreaPopup.value = false;
    lightAreaName.value = selectedOptions.map(option => option.text).join('/');
    const selectCityName = selectedOptions[selectedOptions.length - 1]?.text;
    data.value.push({
        name: selectCityName,
        selected: true,
    })
};
const mapComponentRef = ref<typeof MapComponent>();
const data = ref([
    { name: "杭州市", selected: true },
]);
const resetMap = () => {
    mapComponentRef.value?.resetMap();
}
</script>

<style scoped lang="less">
:deep(.mode-select .van-field__label) {
    width: 30px;
}

:deep(.highlight-select .van-field__label) {
    width: 60px;
}

:deep(.van-cell) {
    background-color: var(--color-blue-50);
}
</style>
