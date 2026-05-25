<template>
  <div class="icon-gallery-page">
    <van-nav-bar title="省份图标库" />

    <div class="icon-grid">
      <div
        v-for="item in iconList"
        :key="item.name"
        class="icon-card"
        @click="openColorPicker(item)"
      >
        <component
          :is="item.component"
          :size="48"
          :backgroundColor="getBgColor(item.name)"
          :textColor="getTextColor(item.name)"
        />
        <div class="icon-name">{{ item.label }}</div>
      </div>
    </div>

    <van-popup
      v-model:show="showPopup"
      position="bottom"
      round
      :style="{ height: '60%' }"
    >
      <div class="popup-content">
        <div class="popup-header">
          <span class="popup-title">{{ selectedIcon?.name }} 配置</span>
          <van-icon name="cross" size="20" @click="cancelConfig" />
        </div>

        <div class="preview-section">
          <component
            v-if="selectedIcon"
            :is="selectedIcon.component"
            :size="80"
            :backgroundColor="tempBgColor || undefined"
            :textColor="tempTextColor || undefined"
          />
        </div>

        <div class="color-section">
          <van-field label="背景色">
            <template #input>
              <div class="color-input-wrapper">
                <input
                  type="color"
                  v-model="tempBgColor"
                  class="color-picker"
                />
                <input
                  type="text"
                  v-model="tempBgColor"
                  placeholder="#A8D8EA"
                  class="color-text-input"
                />
              </div>
            </template>
          </van-field>

          <div class="preset-colors">
            <span
              v-for="color in presetBgColors"
              :key="color"
              class="preset-color-block"
              :style="{ backgroundColor: color }"
              @click="tempBgColor = color"
            ></span>
          </div>
        </div>

        <div class="color-section">
          <van-field label="文字色">
            <template #input>
              <div class="color-input-wrapper">
                <input
                  type="color"
                  v-model="tempTextColor"
                  class="color-picker"
                />
                <input
                  type="text"
                  v-model="tempTextColor"
                  placeholder="#ffffff"
                  class="color-text-input"
                />
              </div>
            </template>
          </van-field>

          <div class="preset-colors">
            <span
              v-for="color in presetTextColors"
              :key="color"
              class="preset-color-block"
              :style="{ backgroundColor: color }"
              @click="tempTextColor = color"
            ></span>
          </div>
        </div>

        <div class="popup-actions">
          <van-button plain type="default" @click="cancelConfig">取消</van-button>
          <van-button type="primary" @click="saveConfig">保存</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IconBeijing,
  IconTianjin,
  IconShanghai,
  IconChongqing,
  IconHebei,
  IconShanxi,
  IconLiaoning,
  IconJilin,
  IconHeilongjiang,
  IconJiangsu,
  IconZhejiang,
  IconAnhui,
  IconFujian,
  IconJiangxi,
  IconShandong,
  IconHenan,
  IconHubei,
  IconHunan,
  IconGuangdong,
  IconHainan,
  IconSichuan,
  IconGuizhou,
  IconYunnan,
  IconShaanxi,
  IconGansu,
  IconQinghai,
  IconTaiwan,
  IconInnerMongolia,
  IconGuangxi,
  IconTibet,
  IconNingxia,
  IconXinjiang,
  IconHongKong,
  IconMacau,
} from '@/components/icons'
import { useIconStore } from '@/store'

interface IconItem {
  name: string
  label: string
  component: any
}

const iconStore = useIconStore()

const iconList: IconItem[] = [
  { name: '北京市', label: '北京', component: IconBeijing },
  { name: '天津市', label: '天津', component: IconTianjin },
  { name: '上海市', label: '上海', component: IconShanghai },
  { name: '重庆市', label: '重庆', component: IconChongqing },
  { name: '河北省', label: '河北', component: IconHebei },
  { name: '山西省', label: '山西', component: IconShanxi },
  { name: '辽宁省', label: '辽宁', component: IconLiaoning },
  { name: '吉林省', label: '吉林', component: IconJilin },
  { name: '黑龙江省', label: '黑龙江', component: IconHeilongjiang },
  { name: '江苏省', label: '江苏', component: IconJiangsu },
  { name: '浙江省', label: '浙江', component: IconZhejiang },
  { name: '安徽省', label: '安徽', component: IconAnhui },
  { name: '福建省', label: '福建', component: IconFujian },
  { name: '江西省', label: '江西', component: IconJiangxi },
  { name: '山东省', label: '山东', component: IconShandong },
  { name: '河南省', label: '河南', component: IconHenan },
  { name: '湖北省', label: '湖北', component: IconHubei },
  { name: '湖南省', label: '湖南', component: IconHunan },
  { name: '广东省', label: '广东', component: IconGuangdong },
  { name: '海南省', label: '海南', component: IconHainan },
  { name: '四川省', label: '四川', component: IconSichuan },
  { name: '贵州省', label: '贵州', component: IconGuizhou },
  { name: '云南省', label: '云南', component: IconYunnan },
  { name: '陕西省', label: '陕西', component: IconShaanxi },
  { name: '甘肃省', label: '甘肃', component: IconGansu },
  { name: '青海省', label: '青海', component: IconQinghai },
  { name: '台湾省', label: '台湾', component: IconTaiwan },
  { name: '内蒙古自治区', label: '内蒙古', component: IconInnerMongolia },
  { name: '广西壮族自治区', label: '广西', component: IconGuangxi },
  { name: '西藏自治区', label: '西藏', component: IconTibet },
  { name: '宁夏回族自治区', label: '宁夏', component: IconNingxia },
  { name: '新疆维吾尔自治区', label: '新疆', component: IconXinjiang },
  { name: '香港特别行政区', label: '香港', component: IconHongKong },
  { name: '澳门特别行政区', label: '澳门', component: IconMacau },
]

const showPopup = ref(false)
const selectedIcon = ref<IconItem | null>(null)
const tempBgColor = ref('')
const tempTextColor = ref('')

const presetBgColors = [
  '#A8D8EA',
  '#AA96DA',
  '#FCBAD3',
  '#FFFFD2',
  '#B5EAD7',
  '#E2F0CB',
  '#FFDAC1',
  '#FFB7B2',
  '#C7CEEA',
  '#B5B9FF',
]

const presetTextColors = [
  '#ffffff',
  '#333333',
  '#1a1a1a',
  '#000000',
  '#ff6b6b',
  '#4ecdc4',
  '#45b7d1',
  '#96ceb4',
  '#ffeaa7',
  '#dfe6e9',
]

const getBgColor = (name: string) => {
  const config = iconStore.getIconColor(name)
  return config?.backgroundColor || undefined
}

const getTextColor = (name: string) => {
  const config = iconStore.getIconColor(name)
  return config?.textColor || undefined
}

const openColorPicker = (item: IconItem) => {
  selectedIcon.value = item
  const config = iconStore.getIconColor(item.name)
  tempBgColor.value = config?.backgroundColor || ''
  tempTextColor.value = config?.textColor || ''
  showPopup.value = true
}

const saveConfig = () => {
  if (selectedIcon.value && tempBgColor.value && tempTextColor.value) {
    iconStore.setIconColor(
      selectedIcon.value.name,
      tempBgColor.value,
      tempTextColor.value
    )
  }
  showPopup.value = false
}

const cancelConfig = () => {
  showPopup.value = false
}
</script>

<style scoped lang="less">
.icon-gallery-page {
  height: 100%;
  background-color: #f7f8fa;
  display: flex;
  flex-direction: column;

  :deep(.van-nav-bar) {
    background-color: #fff;
  }

  :deep(.van-nav-bar__title) {
    color: #323233;
    font-weight: 600;
  }
}

.icon-grid {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 16px;
  align-content: start;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:active {
    transform: scale(0.96);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }
}

.icon-name {
  margin-top: 8px;
  font-size: 12px;
  color: #646566;
  text-align: center;
  line-height: 1.4;
}

.popup-content {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.popup-title {
  font-size: 18px;
  font-weight: 600;
  color: #323233;
}

.preview-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
  background-color: #f7f8fa;
  border-radius: 12px;
  margin-bottom: 24px;
}

.color-section {
  margin-bottom: 16px;
}

.color-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.color-picker {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
  overflow: hidden;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: 2px solid #ebedf0;
    border-radius: 6px;
  }
}

.color-text-input {
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #ebedf0;
  border-radius: 8px;
  font-size: 14px;
  color: #323233;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #1989fa;
  }

  &::placeholder {
    color: #c8c9cc;
  }
}

.preset-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
  padding-left: 72px;
}

.preset-color-block {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.15s ease;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.popup-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
  padding-top: 20px;

  .van-button {
    flex: 1;
    height: 44px;
    border-radius: 22px;
    font-size: 16px;
  }
}
</style>
