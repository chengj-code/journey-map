<template>
    <div class="h-[100%]">
        <div class="w-[50%] mode-select">
            <van-field v-model="modeValue" is-link readonly label="模式" placeholder="选择模式" @click="showPicker = true" />
            <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
                <van-picker :model-value="pickerValue" :columns="columns" @cancel="showPicker = false"
                    @confirm="modeChangeFn" />
            </van-popup>
        </div>
        <div class="w-[100%] h-[70%]" id="echarts-container"></div>
        <div class="highlight-select">
            <van-field v-model="fieldValue" is-link readonly label="点亮地区" placeholder="请选择点亮地区" @click="show = true" />
            <van-popup v-model:show="show" round position="bottom">
                <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="show = false"
                    @finish="onFinish" />
            </van-popup>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import chinaMap from "@/assets/map/china.json";
import { computed, onMounted, ref } from 'vue';
import { useCascaderAreaData } from '@vant/area-data';
import { Numeric } from 'vant/lib/utils';
const columns = [
    { text: '市级', value: 'city' },
    { text: '省级', value: 'provice' },
];
const modeValue = ref('市级');
const showPicker = ref(false);
const pickerValue = ref<Numeric[]>([]);
const modeChangeFn = ({ selectedValues, selectedOptions }) => {
    showPicker.value = false;
    pickerValue.value = selectedValues;
    modeValue.value = selectedOptions[0].text;
};

const show = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');
const options = useCascaderAreaData();
options.forEach(a => {
    a.children?.forEach(b => delete b.children);
})
const onFinish = ({ selectedOptions }) => {
    show.value = false;
    fieldValue.value = selectedOptions.map((option) => option.text).join('/');
    let selectCityName = selectedOptions[1].text;
    updateHighlightData(selectCityName);
};

const highLightData = ref([{
    name: "杭州市",
    selected: true
}]);

let option = computed(() => ({
    backgroundColor: '#000',
    series: [{
        type: 'map',
        map: 'china', // 使用已注册的地图名称
        roam: true, // 开启缩放平移
        selectedMode: 'multiple', // 开启多选
        layoutCenter: ['50%', '50%'], //地图位置
        scaleLimit: { // 设置缩放范围
            min: 1.2,
            max: 12
        },
        zoom: 1.2, // 初始缩放级别
        label: {
            show: false
        },
        itemStyle: { // 默认地图区域的多边形 图形样式。
            areaColor: '#171d26',
            borderColor: '#303745'
        },
        emphasis: { // 高亮状态下的多边形和标签样式。
            label: {
                show: false
            },
            itemStyle: {
                areaColor: '#14536c',
                borderColor: '#fff'
            }
        },
        select: { // 选中状态下的多边形和标签样式
            label: {
                show: true,
                color: '#fff',
            },
            itemStyle: {
                areaColor: '#14536c',
                borderColor: '#fff'
            }
        },
        // 如果需要，配置南海诸岛区域样式
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
}));
let myChart = null;
const initCityLevelEcharts = (option: echarts.EChartsOption) => {
    // 基于准备好的dom，初始化echarts实例
    echarts.registerMap("china", chinaMap as any);
    // #171d26 #303745 #14536c

    myChart.setOption(option);
}
const updateHighlightData = (name: string) => {
    highLightData.value.push({
        name,
        selected: true,
    })
    myChart.clear();
    myChart.setOption(option.value);
}
onMounted(() => {
    myChart = echarts.init(document.getElementById('echarts-container'));
    initCityLevelEcharts(option.value);
})
</script>

<style scoped lang="less">
:deep(.mode-select .van-field__label) {
    width: 30px;
}

:deep(.highlight-select .van-field__label) {
    width: 60px;
}
</style>
