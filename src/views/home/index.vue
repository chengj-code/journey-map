<template>
    <div class="h-[100%] bg-blue-50">
        <van-tabs class="w-[100%] h-[100%]" v-model:active="activeName">
            <van-tab title="地图" name="map">
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
                        <van-cascader v-model="lightAreaValue" title="请选择所在地区" :options="options"
                            @close="showAreaPopup = false" @finish="onFinish" />
                    </van-popup>
                </div>
            </van-tab>
            <van-tab title="列表" name="list">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <div class="d-flex items-center p-['10px 5px']" v-for="item in highlightAreaData"
                            :key="item.name">
                            <van-swipe-cell :right-width="80" :left-width="0" :before-close="() => beforeClose(item)">
                                <template #left>
                                    <van-icon name="location-o" />
                                </template>
                                <div class="pl-[10px] h-[32px] leading-[32px]">{{ item.name }}</div>
                                <template #right>
                                    <van-button square type="danger" size="small" text="取消点亮" />
                                    <!-- <van-button square type="primary" text="收藏" /> -->
                                </template>
                            </van-swipe-cell>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCascaderAreaData } from '@vant/area-data';
import { Numeric } from 'vant/lib/utils';
import MapComponent from "@/components/MapComponent.vue"
import { useMapStore } from '@/store';
import { storeToRefs } from 'pinia';
import { showConfirmDialog } from 'vant';
const mapStore = useMapStore();
const { highlightAreaData } = storeToRefs(mapStore);
const data = highlightAreaData;
const activeName = ref('a');
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
const resetMap = () => {
    mapComponentRef.value?.resetMap();
}

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
    setTimeout(() => {
        if (refreshing.value) {
            list.value = [];
            refreshing.value = false;
        }

        for (let i = 0; i < 10; i++) {
            list.value.push(list.value.length + 1);
        }
        loading.value = false;

        if (list.value.length >= 40) {
            finished.value = true;
        }
    }, 1000);
};

const onRefresh = () => {
    // 清空列表数据
    finished.value = false;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    onLoad();
};
const handleClick = (item, flag: boolean) => {
    // item.selected = flag;
    showConfirmDialog({
        title: '提示',
        message: flag ? '您确定点亮该地区吗？' : '您确定取消点亮该地区吗？',
    }).then(() => {
        if (!flag) {
            let index = highlightAreaData.value.findIndex(h => h.name === item.name);
            highlightAreaData.value.splice(index, 1);
        }
        // on confirm
    }).catch(() => {
        // on cancel
    });
}
const beforeClose = (item) => {
    return new Promise((resolve) => {
        showConfirmDialog({
            title: '您确定取消点亮该地区吗？',
        }).then(() => {
            let index = highlightAreaData.value.findIndex(h => h.name === item.name);
            highlightAreaData.value.splice(index, 1);
            resolve(true)
        }).catch(() => resolve(false));
    });
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

:deep(.van-tabs) {
    .van-tabs__content {
        height: calc(100% - 44px);

    }

    .van-tab__panel {
        height: 100%;
    }
}

:deep(.van-list) {
    .van-swipe-cell {
        padding: 10px 0 10px 15px;

        .van-swipe-cell__left {
            display: flex;
            align-items: center;
        }
    }
}
</style>
