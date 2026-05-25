<template>
    <div class="h-[100%] bg-blue-50">
        <div class="w-[50%] mode-select">
            <van-field v-model="modeValue" is-link readonly label="模式" placeholder="选择模式" @click="showPicker = true" />
            <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
                <van-picker :model-value="pickerValue" :columns="columns" @cancel="showPicker = false"
                    @confirm="modeChangeFn" />
            </van-popup>
        </div>
        <div class="w-[100%] h-[70%] relative">
            <div class="w-[100%] h-[100%]" id="echarts-container"></div>
            <div class="reset-btn w-[40px] h-[40px] flex justify-center items-center bg-[#eee] rounded-[20px] absolute bottom-[10px] right-[10px]"
                @click="resetMap">
                <van-icon name="revoke" size="24" />
            </div>
        </div>
        <div class="highlight-select">
            <van-field v-model="fieldValue" is-link readonly label="点亮地区" placeholder="请选择点亮地区" @click="show = true" />
            <van-popup v-model:show="show" round position="bottom">
                <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="cascaderOptions" @close="show = false"
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
import { useMapStore } from '@/store';

const mapStore = useMapStore();
// 模式选择器
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
    mapStore.setCurrentMode(selectedValues[0]);
};
// 点亮地区选择器
const show = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');
const rawOptions = useCascaderAreaData();
rawOptions.forEach(a => {
    a.children?.forEach(b => {
        // 四个直辖市和两个特别行政区不需要删除children属性
        if (!["北京市", "天津市", "上海市", "重庆市", "香港特别行政区", "澳门特别行政区"].includes(a.text)) {
            delete b.children
        }
    });
})
const cascaderOptions = computed(() => {
  if (mapStore.currentMode === 'province') {
    // 省级模式：返回仅包含第一层级的 options，移除所有 children
    return rawOptions.map(item => ({
      ...item,
      children: undefined
    }))
  }
  // 市级模式：返回完整的三级联动数据（保留原有的特殊处理逻辑）
  return rawOptions
})
const onFinish = ({ selectedOptions }) => {
    show.value = false;
    fieldValue.value = selectedOptions.map((option) => option.text).join('/');
    const selectName = selectedOptions[selectedOptions.length - 1]?.text;
    
    if (mapStore.currentMode === 'province') {
      mapStore.addProvince(selectName);
    } else {
      mapStore.addCity(selectName);
    }
    
    updateHighlightMap();
};

echarts.registerMap("china", chinaMap as any);
const highLightData = computed(() => mapStore.currentData);
const mapOptions = ref({
    backgroundColor: '#000',
    mapType: 'china',
    roam: true,
    selectedMode: 'multiple',
    zoom: 1.2,
    silent: true,
});
let option = computed(() => ({
    backgroundColor: mapOptions.value.backgroundColor,
    series: [{
        type: 'map',
        map: mapOptions.value.mapType, // 使用已注册的地图名称
        roam: mapOptions.value.roam, // 是否开启缩放平移
        selectedMode: mapOptions.value.selectedMode, // 是否开启多选
        silent: mapOptions.value.silent, // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
        layoutCenter: ['50%', '50%'], //地图位置
        scaleLimit: { // 设置缩放范围
            min: 1.2,
            max: 20
        },
        zoom: mapOptions.value.zoom, // 初始缩放级别
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
const initCityLevelEcharts = (option) => {
    // 基于准备好的dom，初始化echarts实例
    // #171d26 #303745 #14536c
    myChart.setOption(option);
}
/**
 * 更新高亮地图
 */
const updateHighlightMap = () => {
    myChart.clear();
    myChart.setOption(option.value);
}
/**重置地图大小 */
const resetMap = () => {
    if (mapStore.currentMode === 'province') {
      mapStore.resetProvince();
    } else {
      mapStore.resetCity();
    }
    updateHighlightMap();
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

:deep(.van-cell) {
    background-color: var(--color-blue-50);
}
</style>
