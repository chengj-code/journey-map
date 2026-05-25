<template>
  <div class="map-page">
    <van-nav-bar
      title="足迹地图"
      left-arrow
      @click-left="router.back()"
    />
    
    <div class="map-wrapper">
      <div class="map-container" id="echarts-container"></div>
      
      <div class="float-panel float-top">
        <div class="mode-chip" @click="showPicker = true">
          <span class="chip-label">模式</span>
          <span class="chip-value">{{ modeValue }}</span>
          <van-icon name="arrow-down" size="12" />
        </div>
        <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
          <van-picker :model-value="pickerValue" :columns="columns" @cancel="showPicker = false"
            @confirm="modeChangeFn" />
        </van-popup>
      </div>

      <div class="float-panel float-bottom">
        <div class="area-select-card" @click="show = true">
          <van-icon name="location-o" size="18" color="#60a5fa" />
          <span class="area-text">{{ fieldValue || '选择点亮地区' }}</span>
          <van-icon name="arrow" size="14" color="#9ca3af" />
        </div>
        <van-popup v-model:show="show" round position="bottom">
          <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="cascaderOptions" @close="show = false"
            @finish="onFinish" />
        </van-popup>
      </div>

      <div class="reset-btn" @click="resetMap">
        <van-icon name="revoke" size="20" color="#374151" />
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
  
  .map-wrapper {
    position: relative;
    width: 100%;
    height: calc(100vh - 46px);
  }

  .map-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .float-panel {
    position: absolute;
    left: 12px;

    > * {
      pointer-events: auto;
    }
  }

  .float-top {
    top: 12px;
  }

  .float-bottom {
    bottom: 16px;
  }

  .mode-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    background: rgba(17, 24, 39, 0.9);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    .chip-label {
      font-size: 13px;
      color: #9ca3af;
    }

    .chip-value {
      font-size: 14px;
      color: #f3f4f6;
      font-weight: 500;
    }
  }

  .area-select-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: rgba(17, 24, 39, 0.92);
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);

    .area-text {
      flex: 1;
      font-size: 14px;
      color: #d1d5db;
    }
  }

  .reset-btn {
    position: absolute;
    bottom: 80px;
    right: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:active {
      transform: scale(0.92);
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
