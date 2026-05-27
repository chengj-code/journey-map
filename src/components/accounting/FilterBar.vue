<template>
  <div class="filter-bar">
    <!-- 时间维度筛选 -->
    <div class="time-filter-section">
      <div class="time-selectors">
        <div class="selector-item" @click="showYearPicker = true">
          <span>{{ modelValue.year ? `${modelValue.year}年` : '全部年' }}</span>
          <van-icon name="arrow-down" size="12" />
        </div>

        <div class="selector-item" @click="showMonthPicker = true">
          <span>{{ modelValue.month ? `${modelValue.month}月` : '全部月' }}</span>
          <van-icon name="arrow-down" size="12" />
        </div>

        <div class="selector-item" @click="showDatePicker = true">
          <span>📅 {{ modelValue.date ? modelValue.date : '全部日期' }}</span>
        </div>
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

    <!-- 年份选择器 -->
    <van-popup v-model:show="showYearPicker" position="bottom" round>
      <van-picker
        :columns="yearColumns"
        :default-index="defaultYearIndex"
        title="选择年份"
        @confirm="onYearConfirm"
        @cancel="showYearPicker = false"
      />
    </van-popup>

    <!-- 月份选择器 -->
    <van-popup v-model:show="showMonthPicker" position="bottom" round>
      <van-picker
        :columns="monthColumns"
        :default-index="defaultMonthIndex"
        title="选择月份"
        @confirm="onMonthConfirm"
        @cancel="showMonthPicker = false"
      />
    </van-popup>

    <!-- 日期选择器 -->
    <van-popup v-model:show="showDatePicker" position="bottom" round>
      <div class="date-picker-container">
        <div class="picker-header">
          <span @click="clearDate">清除</span>
          <h3>选择日期</h3>
          <span class="confirm-text" @click="showDatePicker = false">完成</span>
        </div>
        <van-calendar
          ref="calendarRef"
          :poppable="false"
          :show-confirm="false"
          :default-date="defaultCalendarDate"
          :min-date="new Date(2020, 0, 1)"
          :max-date="new Date(2030, 11, 31)"
          @select="onDateSelect"
        />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Tag } from '@/types/accounting';

export interface FilterState {
  year: number | null;
  month: number | null;
  date: string | null;
  selectedTagIds: string[];
}

interface Props {
  modelValue: FilterState;
  tags: Tag[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: FilterState): void;
  (e: 'reset'): void;
}>();

const showYearPicker = ref(false);
const showMonthPicker = ref(false);
const showDatePicker = ref(false);
const calendarRef = ref();

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;

const yearColumns = computed(() => {
  const startYear = currentYear - 5;
  const endYear = currentYear + 1;
  const years = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push({ text: `${y}年`, value: y });
  }
  return years;
});

const monthColumns = [
  { text: '全部', value: null },
  ...Array.from({ length: 12 }, (_, i) => ({
    text: `${i + 1}月`,
    value: i + 1,
  })),
];

const defaultYearIndex = computed(() => {
  if (!props.modelValue.year) return 5;
  const idx = yearColumns.value.findIndex((y) => y.value === props.modelValue.year);
  return idx >= 0 ? idx : 5;
});

const defaultMonthIndex = computed(() => {
  if (!props.modelValue.month) return 0;
  return props.modelValue.month;
});

const defaultCalendarDate = computed(() => {
  if (props.modelValue.date) {
    return new Date(props.modelValue.date);
  }
  return new Date();
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

function onYearConfirm({ selectedValues }: { selectedValues: (number | null)[] }) {
  emitUpdate({
    ...props.modelValue,
    year: selectedValues[0] as number,
  });
  showYearPicker.value = false;
}

function onMonthConfirm({ selectedValues }: { selectedValues: (number | null)[] }) {
  emitUpdate({
    ...props.modelValue,
    month: selectedValues[0] as number | null,
  });
  showMonthPicker.value = false;
}

function onDateSelect(date: Date) {
  const dateStr = formatDate(date);
  emitUpdate({
    ...props.modelValue,
    date: dateStr,
  });
}

function clearDate() {
  emitUpdate({
    ...props.modelValue,
    date: null,
  });
  showDatePicker.value = false;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function handleQuickFilter(type: 'month' | 'lastMonth' | 'threeMonths' | 'year' | 'all') {
  let newState: FilterState;

  switch (type) {
    case 'month':
      newState = {
        year: currentYear,
        month: currentMonth,
        date: null,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    case 'lastMonth': {
      const d = new Date(currentYear, currentMonth - 2);
      newState = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        date: null,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    }
    case 'threeMonths': {
      const threeMonthsAgo = new Date(currentYear, currentMonth - 3);
      newState = {
        year: threeMonthsAgo.getFullYear(),
        month: null,
        date: formatDate(threeMonthsAgo),
        selectedTagIds: [...props.modelValue.selectedTagIds],
        _rangeStart: true,
      };
      break;
    }
    case 'year':
      newState = {
        year: currentYear,
        month: null,
        date: null,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    case 'all':
      newState = {
        year: null,
        month: null,
        date: null,
        selectedTagIds: [],
      };
      break;
  }

  emitUpdate(newState);
}

function isQuickActive(type: string): boolean {
  const s = props.modelValue;

  switch (type) {
    case 'month':
      return s.year === currentYear && s.month === currentMonth && !s.date && !s._rangeStart;
    case 'lastMonth': {
      const lastM = new Date(currentYear, currentMonth - 2);
      return (
        s.year === lastM.getFullYear() &&
        s.month === lastM.getMonth() + 1 &&
        !s.date &&
        !s._rangeStart
      );
    }
    case 'threeMonths': {
      if (!s._rangeStart || !s.date) return false;
      const threeMAgo = new Date(currentYear, currentMonth - 3);
      return s.year === threeMAgo.getFullYear() && s.date <= formatDate(threeMAgo);
    }
    case 'year':
      return s.year === currentYear && !s.month && !s.date && !s._rangeStart;
    case 'all':
      return !s.year && !s.month && !s.date && s.selectedTagIds.length === 0;
    default:
      return false;
  }
}

function handleReset() {
  emit('reset');
}

const filterSummaryText = computed(() => {
  const parts: string[] = [];

  if (props.modelValue.year) {
    parts.push(`${props.modelValue.year}年`);
    if (props.modelValue.month) {
      parts[0] += `${props.modelValue.month}月`;
    }
  } else if (!props.modelValue.year && !props.modelValue.month && !props.modelValue.date) {
    parts.push('全部时间');
  }

  if (props.modelValue.date) {
    parts.push(props.modelValue.date);
  }

  if (props.modelValue.selectedTagIds.length > 0) {
    parts.push(`已选 ${props.modelValue.selectedTagIds.length} 个标签`);
  }

  if (parts.length === 0) {
    return '本月全部记录';
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
  top: 0;
  z-index: 100;
}

.time-filter-section {
  margin-bottom: 12px;
}

.time-selectors {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;

  .selector-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 14px;
    background: #F8FAFC;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid #E2E8F0;

    span {
      font-size: 13px;
      font-weight: 500;
      color: #334155;
      white-space: nowrap;
    }

    .van-icon {
      color: #94A3B8;
    }

    &:active {
      background: #E2E8F0;
      transform: scale(0.97);
    }
  }
}

.quick-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  .van-button {
    height: 28px;
    font-size: 12px;
    padding: 0 14px;
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
        font-weight: 500;
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
