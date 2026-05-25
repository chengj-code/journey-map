<template>
  <div class="map-page">
    <van-nav-bar
      title="足迹地图"
      left-arrow
      @click-left="router.back()"
    />
    
    <div class="map-content">
        <div class="w-[50%] mode-select">
            <van-field v-model="modeValue" is-link readonly label="模式" placeholder="选择模式" @click="showPicker = true" />
            <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
                <van-picker :model-value="pickerValue" :columns="columns" @cancel="showPicker = false"
                    @confirm="modeChangeFn" />
            </van-popup>
        </div>
        <div class="w-[100%] map-container">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { useCascaderAreaData } from '@vant/area-data'
import { showToast } from 'vant'
import { useMapStore } from '@/store'
import chinaJson from '@/assets/map/china.json'

const router = useRouter()
const mapStore = useMapStore()

// 模式选择器
const columns = [
    { text: '市级', value: 'city' },
    { text: '省级', value: 'province' },
];
const modeValue = ref('市级');
const showPicker = ref(false);
const pickerValue = ref<number[]>([]);
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
const areaData = useCascaderAreaData();

const cascaderOptions = computed(() => {
  if (mapStore.currentMode === 'province') {
    return areaData.map(item => ({
      text: item.text,
      value: item.value,
      children: undefined
    }))
  }

  const cityModeOptions = JSON.parse(JSON.stringify(areaData)) as typeof areaData;

  cityModeOptions.forEach(province => {
    if (["北京市", "天津市", "上海市", "重庆市", "香港特别行政区", "澳门特别行政区"].includes(province.text)) {
      return;
    }

    province.children?.forEach(city => {
      delete city.children;
    });
  });

  return cityModeOptions;
})

const onFinish = ({ selectedOptions }) => {
    show.value = false;
    fieldValue.value = selectedOptions.map((option) => option.text).join('/');
    const selectName = selectedOptions[selectedOptions.length - 1]?.text;
    const fullName = fieldValue.value;

    if (mapStore.currentMode === 'province') {
      mapStore.addProvince(selectName);
    } else {
      mapStore.addCity(selectName, fullName);
    }

    updateHighlightMap();
};

echarts.registerMap("china", chinaJson as any);
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
        map: mapOptions.value.mapType,
        roam: mapOptions.value.roam,
        selectedMode: mapOptions.value.selectedMode,
        silent: mapOptions.value.silent,
        layoutCenter: ['50%', '50%'],
        scaleLimit: {
            min: 1.2,
            max: 20
        },
        zoom: mapOptions.value.zoom,
        label: {
            show: false
        },
        itemStyle: {
            areaColor: '#171d26',
            borderColor: '#303745'
        },
        emphasis: {
            label: {
                show: false
            },
            itemStyle: {
                areaColor: '#14536c',
                borderColor: '#fff'
            }
        },
        select: {
            label: {
                show: true,
                color: '#fff',
            },
            itemStyle: {
                areaColor: '#14536c',
                borderColor: '#fff'
            }
        },
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
    myChart.setOption(option);
}

const updateHighlightMap = () => {
    myChart.clear();
    myChart.setOption(option.value);
}

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
.map-page {
  width: 100%;
  height: 100vh;
  background-color: #000;
  
  .map-content {
    height: calc(100vh - 46px);
    display: flex;
    flex-direction: column;
    
    .map-container {
      flex: 1;
      position: relative;
    }
  }
}

:deep(.mode-select .van-field__label) {
    width: 30px;
}

:deep(.highlight-select .van-field__label) {
    width: 60px;
}

:deep(.van-cell) {
    background-color: #000;
}
</style>
