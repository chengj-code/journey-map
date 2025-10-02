<template>
    <div class="w-[100%] h-[100%]" ref="echartsContainer"></div>
</template>
<script lang="ts" setup name="Person">
import { ref, onMounted, defineProps, watch, PropType, computed, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import chinaMap from "@/assets/map/china.json";
import { highlightData } from '@/store/modules/types/type';
const props = defineProps({
    highlight: {
        type: Array as PropType<highlightData[]>,
        default: () => [],
    }
})

// 注册中国地图
echarts.registerMap("china", chinaMap as any);
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
            max: 30
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
        data: props.highlight,
    }]
}));
const echartsContainer = ref(null);
let myChart = null;
let resizeObserver = null
/**重置地图大小 */
const resetMap = () => {
    myChart.clear();
    myChart.setOption(option.value);
}
watch(() => props.highlight, () => {
    resetMap();
}, { deep: true })
onMounted(() => {
    resizeObserver = new ResizeObserver(() => {
        if (myChart) {
            myChart.resize()
        }
    })
    resizeObserver.observe(echartsContainer.value)
    nextTick(() => {
        myChart = echarts.init(echartsContainer.value);
        myChart.setOption(option.value);
    })
})
onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
    if (myChart) {
        myChart.dispose()
    }
})
defineExpose({
    resetMap,
})
</script>

<style scoped lang="less">
:deep(#echarts-container) {
    div {
        width: 100% !important;
        height: 100% !important;
    }
}
</style>