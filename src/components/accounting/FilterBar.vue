<template>
  <div class="filter-bar">
    <!-- 时间维度筛选 - 日期区间 -->
    <div class="time-filter-section">
      <div class="range-selector" @click="showRangePicker = true">
        <div class="range-display">
          <span v-if="modelValue.startDate && modelValue.endDate" class="range-text">
            {{ formatDisplayDate(modelValue.startDate) }} ~ {{ formatDisplayDate(modelValue.endDate) }}
          </span>
          <span v-else class="range-placeholder">选择日期区间</span>
        </div>
        <van-icon name="arrow-down" size="12" />
      </div>

      <!-- 快捷按钮 -->
      <div class="quick-buttons">
        <van-button
          size="small"
          round
          :type="isQuickActive('month') ? 'primary' : 'default'"
          @click="handleQuickFilter('month')"
        >
          本月
        </van-button>
        <van-button
          size="small"
          round
          :type="isQuickActive('lastMonth') ? 'primary' : 'default'"
          @click="handleQuickFilter('lastMonth')"
        >
          上月
        </van-button>
        <van-button
          size="small"
          round
          :type="isQuickActive('threeMonths') ? 'primary' : 'default'"
          @click="handleQuickFilter('threeMonths')"
        >
          近三月
        </van-button>
        <van-button
          size="small"
          round
          :type="isQuickActive('year') ? 'primary' : 'default'"
          @click="handleQuickFilter('year')"
        >
          今年
        </van-button>
        <van-button
          size="small"
          round
          :type="isQuickActive('all') ? 'primary' : 'default'"
          @click="handleQuickFilter('all')"
        >
          全部
        </van-button>
      </div>

      <!-- 已选区间清除 -->
      <div v-if="modelValue.startDate || modelValue.endDate" class="clear-range-row">
        <span class="clear-range-btn" @click="clearRange">✕ 清除日期筛选</span>
      </div>
    </div>

    <!-- 标签维度筛选 -->
    <div v-if="tags.length > 0" class="tag-filter-section">
      <div class="tag-header">
        <span class="tag-label">标签筛选</span>
        <span v-if="modelValue.selectedTagIds.length > 0" class="tag-count">
          已选 {{ modelValue.selectedTagIds.length }} 个
        </span>
        <span v-else class="tag-count tag-count-empty">未选择</span>
        <span class="clear-btn" @click="clearTags">✕ 清除</span>
      </div>

      <div class="tag-chips">
        <div
          v-for="tag in tags"
          :key="tag.id"
          class="tag-chip"
          :class="{ selected: modelValue.selectedTagIds.includes(tag.id) }"
          :style="getTagStyle(tag, modelValue.selectedTagIds.includes(tag.id))"
          @click="toggleTag(tag.id)"
        >
          {{ tag.name }}
        </div>
      </div>
    </div>

    <!-- 筛选状态摘要 -->
    <div class="filter-summary">
      <span class="summary-text">{{ filterSummaryText }}</span>
      <span class="reset-btn" @click="handleReset">重置筛选</span>
    </div>

    <!-- 日期区间选择器 -->
    <van-popup v-model:show="showRangePicker" position="bottom" round :lock-scroll="true" :safe-area-inset-bottom="true">
      <div class="date-picker-container">
        <div class="picker-header">
          <span @click="clearRangeAndClose">清除</span>
          <h3>选择日期区间</h3>
          <span class="confirm-text" @click="confirmRange">完成</span>
        </div>
        <van-calendar
          ref="calendarRef"
          type="range"
          :poppable="false"
          :show-confirm="false"
          :min-date="new Date(2020, 0, 1)"
          :max-date="new Date(2030, 11, 31)"
          :default-date="defaultRangeDate"
          @select="onRangeSelect"
          @confirm="onRangeConfirm"
        />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Tag, FilterState } from '@/types/accounting';

interface Props {
  modelValue: FilterState;
  tags: Tag[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: FilterState): void;
  (e: 'reset'): void;
}>();

const showRangePicker = ref(false);
const calendarRef = ref();
const tempStartDate = ref<string | null>(null);
const tempEndDate = ref<string | null>(null);

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const defaultRangeDate = computed(() => {
  if (props.modelValue.startDate && props.modelValue.endDate) {
    return [new Date(props.modelValue.startDate), new Date(props.modelValue.endDate)] as [Date, Date];
  }
  return undefined;
});

function getTagStyle(tag: Tag, isSelected: boolean) {
  if (isSelected) {
    return {
      backgroundColor: tag.color,
      color: '#ffffff',
      borderColor: tag.color,
    };
  }
  return {
    backgroundColor: '#ffffff',
    color: '#475569',
    borderColor: '#E2E8F0',
  };
}

function toggleTag(tagId: string) {
  const newSelected = [...props.modelValue.selectedTagIds];
  const index = newSelected.indexOf(tagId);

  if (index > -1) {
    newSelected.splice(index, 1);
  } else {
    newSelected.push(tagId);
  }

  emitUpdate({
    ...props.modelValue,
    selectedTagIds: newSelected,
  });
}

function clearTags() {
  emitUpdate({
    ...props.modelValue,
    selectedTagIds: [],
  });
}

function onRangeSelect(dates: [Date, Date]) {
  tempStartDate.value = formatDate(dates[0]);
  tempEndDate.value = formatDate(dates[1]);
}

function onRangeConfirm(dates: [Date, Date]) {
  emitUpdate({
    ...props.modelValue,
    startDate: formatDate(dates[0]),
    endDate: formatDate(dates[1]),
  });
  showRangePicker.value = false;
}

function confirmRange() {
  if (tempStartDate.value && tempEndDate.value) {
    emitUpdate({
      ...props.modelValue,
      startDate: tempStartDate.value,
      endDate: tempEndDate.value,
    });
  }
  showRangePicker.value = false;
}

function clearRange() {
  emitUpdate({
    ...props.modelValue,
    startDate: null,
    endDate: null,
  });
}

function clearRangeAndClose() {
  emitUpdate({
    ...props.modelValue,
    startDate: null,
    endDate: null,
  });
  showRangePicker.value = false;
}

function handleQuickFilter(type: 'month' | 'lastMonth' | 'threeMonths' | 'year' | 'all') {
  let newState: FilterState;

  switch (type) {
    case 'month': {
      newState = {
        startDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`,
        endDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate().toString().padStart(2, '0')}`,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    }
    case 'lastMonth': {
      const d = new Date(currentYear, currentMonth - 1, 0);
      const ly = d.getFullYear();
      const lm = d.getMonth() + 1;
      newState = {
        startDate: `${ly}-${String(lm).padStart(2, '0')}-01`,
        endDate: `${ly}-${String(lm).padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    }
    case 'threeMonths': {
      const start = new Date(currentYear, currentMonth - 3, 1);
      const sy = start.getFullYear();
      const sm = start.getMonth() + 1;
      newState = {
        startDate: `${sy}-${String(sm).padStart(2, '0')}-01`,
        endDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate().toString().padStart(2, '0')}`,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    }
    case 'year': {
      newState = {
        startDate: `${currentYear}-01-01`,
        endDate: `${currentYear}-12-31`,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    }
    case 'all':
      newState = {
        startDate: null,
        endDate: null,
        selectedTagIds: [],
      };
      break;
  }

  emitUpdate(newState);
}

function isQuickActive(type: string): boolean {
  const s = props.modelValue;

  switch (type) {
    case 'month': {
      if (!s.startDate || !s.endDate) return false;
      const start = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
      const end = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate().toString().padStart(2, '0')}`;
      return s.startDate === start && s.endDate === end;
    }
    case 'lastMonth': {
      if (!s.startDate || !s.endDate) return false;
      const d = new Date(currentYear, currentMonth - 1, 0);
      const ly = d.getFullYear();
      const lm = d.getMonth() + 1;
      const start = `${ly}-${String(lm).padStart(2, '0')}-01`;
      const end = `${ly}-${String(lm).padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
      return s.startDate === start && s.endDate === end;
    }
    case 'threeMonths': {
      if (!s.startDate || !s.endDate) return false;
      const rangeStart = new Date(currentYear, currentMonth - 3, 1);
      const sy = rangeStart.getFullYear();
      const sm = rangeStart.getMonth() + 1;
      const start = `${sy}-${String(sm).padStart(2, '0')}-01`;
      const end = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate().toString().padStart(2, '0')}`;
      return s.startDate === start && s.endDate === end;
    }
    case 'year': {
      if (!s.startDate || !s.endDate) return false;
      return s.startDate === `${currentYear}-01-01` && s.endDate === `${currentYear}-12-31`;
    }
    case 'all':
      return !s.startDate && !s.endDate && s.selectedTagIds.length === 0;
    default:
      return false;
  }
}

function handleReset() {
  emit('reset');
}

const filterSummaryText = computed(() => {
  const parts: string[] = [];

  if (props.modelValue.startDate && props.modelValue.endDate) {
    parts.push(`${formatDisplayDate(props.modelValue.startDate)} ~ ${formatDisplayDate(props.modelValue.endDate)}`);
  } else if (!props.modelValue.startDate && !props.modelValue.endDate) {
    parts.push('全部时间');
  }

  if (props.modelValue.selectedTagIds.length > 0) {
    parts.push(`已选 ${props.modelValue.selectedTagIds.length} 个标签`);
  }

  if (parts.length === 0) {
    return '全部记录';
  }

  return parts.join(' · ');
});

function emitUpdate(value: FilterState) {
  emit('update:modelValue', value);
}
</script>

<style scoped lang="less">
.filter-bar {
  background: #ffffff;
  border-bottom: 1px solid #E2E8F0;
  padding: 12px 16px;
  position: sticky;
  top: 46px;
  z-index: 10;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.time-filter-section {
  margin-bottom: 12px;
}

.range-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #F8FAFC;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid #E2E8F0;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  min-height: 42px;

  .range-display {
    flex: 1;
    text-align: center;

    .range-text {
      font-size: 14px;
      font-weight: 600;
      color: #1E293B;
      letter-spacing: 0.5px;
    }

    .range-placeholder {
      font-size: 13px;
      font-weight: 500;
      color: #94A3B8;
    }
  }

  .van-icon {
    color: #94A3B8;
    flex-shrink: 0;
  }

  &:active {
    background: #E2E8F0;
    transform: scale(0.98);
  }
}

.quick-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;

  .van-button {
    height: 28px;
    font-size: 12px;
    padding: 0 14px;
  }
}

.clear-range-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;

  .clear-range-btn {
    font-size: 12px;
    color: #94A3B8;
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 10px;
    transition: all 0.2s;

    &:active {
      color: #EF4444;
      background: #FEF2F2;
    }
  }
}

.tag-filter-section {
  padding-top: 12px;
  border-top: 1px solid #F1F5F9;
  margin-bottom: 12px;
}

.tag-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  .tag-label {
    font-size: 13px;
    font-weight: 600;
    color: #334155;
  }

  .tag-count {
    font-size: 12px;
    color: #3B82F6;
    font-weight: 500;

    &.tag-count-empty {
      color: #94A3B8;
    }
  }

  .clear-btn {
    margin-left: auto;
    font-size: 12px;
    color: #94A3B8;
    cursor: pointer;
    padding: 2px 6px;

    &:hover {
      color: #EF4444;
    }
  }
}

.tag-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-chip {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid;
  user-select: none;

  &:active {
    transform: scale(0.95);
  }

  &.selected {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
}

.filter-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #F1F5F9;

  .summary-text {
    font-size: 12px;
    color: #64748B;
    font-weight: 500;
  }

  .reset-btn {
    font-size: 12px;
    color: #3B82F6;
    cursor: pointer;
    font-weight: 500;
    padding: 4px 8px;

    &:active {
      opacity: 0.7;
    }
  }
}

.date-picker-container {
  .picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #E2E8F0;

    span {
      font-size: 14px;
      color: #64748B;
      cursor: pointer;

      &.confirm-text {
        color: #3B82F6;
        font-weight: 600;
        font-size: 15px;
      }
    }

    h3 {
      font-size: 17px;
      font-weight: 600;
      color: #1E293B;
      margin: 0;
    }
  }
}
</style>
