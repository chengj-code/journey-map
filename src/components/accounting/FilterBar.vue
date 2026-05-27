<template>
  <div class="filter-bar">
    <div class="filter-row">
      <!-- 日期区间 -->
      <div class="filter-chip date-chip" @click="showRangePicker = true">
        <van-icon name="calendar-o" size="13" />
        <span v-if="modelValue.startDate && modelValue.endDate" class="chip-label">{{ rangeLabel }}</span>
        <span v-else class="chip-label chip-placeholder">选择区间</span>
        <van-icon name="arrow-down" size="10" class="chip-arrow" />
      </div>

      <!-- 快捷筛选 -->
      <div class="filter-chip" :class="{ active: isQuickActive('month') }" @click="handleQuickFilter('month')">本月</div>
      <div class="filter-chip" :class="{ active: isQuickActive('threeMonths') }" @click="handleQuickFilter('threeMonths')">近三月</div>
      <div class="filter-chip" :class="{ active: isQuickActive('year') }" @click="handleQuickFilter('year')">今年</div>

      <!-- 标签筛选 -->
      <div v-if="tags.length > 0" class="filter-chip tag-chip-trigger" :class="{ active: modelValue.selectedTagIds.length > 0 }" @click="showTagPopover = !showTagPopover">
        <van-icon name="label-o" size="13" />
        <span>{{ modelValue.selectedTagIds.length > 0 ? `已选${modelValue.selectedTagIds.length}个` : '标签' }}</span>
        <van-icon name="arrow-down" size="10" class="chip-arrow" />
      </div>

      <!-- 重置 -->
      <div v-if="hasActiveFilter" class="filter-chip reset-chip" @click="handleReset">重置</div>
    </div>

    <!-- 标签浮层 -->
    <div v-if="showTagPopover && tags.length > 0" class="tag-popover">
      <div class="tag-grid">
        <div
          v-for="tag in tags"
          :key="tag.id"
          class="pop-tag-item"
          :class="{ selected: modelValue.selectedTagIds.includes(tag.id) }"
          :style="getTagStyle(tag, modelValue.selectedTagIds.includes(tag.id))"
          @click="toggleTag(tag.id)"
        >
          {{ tag.name }}
        </div>
      </div>
      <div v-if="modelValue.selectedTagIds.length > 0" class="pop-footer">
        <span @click="clearTags">清除标签</span>
      </div>
    </div>

    <!-- 点击外部关闭标签浮层 -->
    <div v-if="showTagPopover" class="popover-mask" @click="showTagPopover = false" />

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
const showTagPopover = ref(false);
const calendarRef = ref();
const tempStartDate = ref<string | null>(null);
const tempEndDate = ref<string | null>(null);

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;

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

const rangeLabel = computed(() => {
  const s = props.modelValue.startDate;
  const e = props.modelValue.endDate;
  if (!s || !e) return '';
  const sd = new Date(s);
  const ed = new Date(e);
  const sy = sd.getFullYear();
  const sm = String(sd.getMonth() + 1).padStart(2, '0');
  const sdd = String(sd.getDate()).padStart(2, '0');
  const ey = ed.getFullYear();
  const em = String(ed.getMonth() + 1).padStart(2, '0');
  const edd = String(ed.getDate()).padStart(2, '0');
  if (sy === ey && sm === em) {
    return `${sm}-${sdd} ~ ${edd}`;
  }
  if (sy === ey) {
    return `${sm}-${sdd} ~ ${em}-${edd}`;
  }
  return `${sy}.${sm}.${sdd} ~ ${ey}.${em}.${edd}`;
});

const hasActiveFilter = computed(() => {
  return !!(props.modelValue.startDate || props.modelValue.endDate || props.modelValue.selectedTagIds.length > 0);
});

function getTagStyle(tag: Tag, isSelected: boolean) {
  if (isSelected) {
    return { backgroundColor: tag.color, color: '#ffffff', borderColor: tag.color };
  }
  return { backgroundColor: '#ffffff', color: '#475569', borderColor: '#E2E8F0' };
}

function toggleTag(tagId: string) {
  const newSelected = [...props.modelValue.selectedTagIds];
  const idx = newSelected.indexOf(tagId);
  if (idx > -1) {
    newSelected.splice(idx, 1);
  } else {
    newSelected.push(tagId);
  }
  emitUpdate({ ...props.modelValue, selectedTagIds: newSelected });
}

function clearTags() {
  emitUpdate({ ...props.modelValue, selectedTagIds: [] });
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
    emitUpdate({ ...props.modelValue, startDate: tempStartDate.value, endDate: tempEndDate.value });
  }
  showRangePicker.value = false;
}

function clearRange() {
  emitUpdate({ ...props.modelValue, startDate: null, endDate: null });
}

function clearRangeAndClose() {
  emitUpdate({ ...props.modelValue, startDate: null, endDate: null });
  showRangePicker.value = false;
}

function handleQuickFilter(type: 'month' | 'lastMonth' | 'threeMonths' | 'year' | 'all') {
  let newState: FilterState;

  switch (type) {
    case 'month':
      newState = {
        startDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`,
        endDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate().toString().padStart(2, '0')}`,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    case 'lastMonth': {
      const d = new Date(currentYear, currentMonth - 1, 0);
      newState = {
        startDate: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`,
        endDate: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    }
    case 'threeMonths': {
      const start = new Date(currentYear, currentMonth - 3, 1);
      newState = {
        startDate: `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-01`,
        endDate: `${currentYear}-${String(currentMonth).padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate().toString().padStart(2, '0')}`,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    case 'year':
      newState = {
        startDate: `${currentYear}-01-01`,
        endDate: `${currentYear}-12-31`,
        selectedTagIds: [...props.modelValue.selectedTagIds],
      };
      break;
    case 'all':
      newState = { startDate: null, endDate: null, selectedTagIds: [] };
      break;
  }

  emitUpdate(newState);
}

function isQuickActive(type: string): boolean {
  const s = props.modelValue;
  if (!s.startDate || !s.endDate) return false;

  switch (type) {
    case 'month': {
      const start = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
      const end = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate().toString().padStart(2, '0')}`;
      return s.startDate === start && s.endDate === end;
    }
    case 'threeMonths': {
      const rs = new Date(currentYear, currentMonth - 3, 1);
      const start = `${rs.getFullYear()}-${String(rs.getMonth() + 1).padStart(2, '0')}-01`;
      const end = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${new Date(currentYear, currentMonth, 0).getDate().toString().padStart(2, '0')}`;
      return s.startDate === start && s.endDate === end;
    }
    case 'year':
      return s.startDate === `${currentYear}-01-01` && s.endDate === `${currentYear}-12-31`;
    default:
      return false;
  }
}

function handleReset() {
  emit('reset');
  showTagPopover.value = false;
}

function emitUpdate(value: FilterState) {
  emit('update:modelValue', value);
}
</script>

<style scoped lang="less">
.filter-bar {
  background: #ffffff;
  border-bottom: 1px solid #E2E8F0;
  padding: 8px 12px;
  position: sticky;
  top: 46px;
  z-index: 20;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 5px 10px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: #F1F5F9;
  color: #64748B;
  border: 1px solid transparent;

  &:active {
    transform: scale(0.95);
  }

  &.active {
    background: #EFF6FF;
    color: #2563EB;
    border-color: #BFDBFE;
  }

  .chip-label {
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chip-placeholder {
    color: #94A3B8;
  }

  .chip-arrow {
    color: #94A3B8;
    flex-shrink: 0;
  }
}

.date-chip {
  min-width: 100px;
  justify-content: center;

  &:active {
    background: #E2E8F0;
  }

  &.active,
  &:has(.chip-label:not(.chip-placeholder)) {
    background: #EFF6FF;
    color: #2563EB;
    border-color: #BFDBFE;
  }

  .van-icon:first-child {
    color: #94A3B8;
    flex-shrink: 0;
  }
}

.tag-chip-trigger {
  min-width: 56px;

  .van-icon:first-child {
    color: #94A3B8;
    flex-shrink: 0;
  }
}

.reset-chip {
  margin-left: auto;
  color: #94A3B8;
  flex-shrink: 0;

  &:active {
    color: #EF4444;
    background: #FEF2F2;
  }
}

.tag-popover {
  position: absolute;
  left: 12px;
  right: 12px;
  top: calc(100% + 4px);
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 30;
  padding: 10px 12px;
  animation: popIn 0.15s ease;
}

@keyframes popIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.tag-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pop-tag-item {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1.5px solid;
  user-select: none;

  &:active {
    transform: scale(0.93);
  }

  &.selected {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  }
}

.pop-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  padding-top: 6px;
  border-top: 1px solid #F1F5F9;

  span {
    font-size: 12px;
    color: #94A3B8;
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 8px;

    &:active {
      color: #EF4444;
      background: #FEF2F2;
    }
  }
}

.popover-mask {
  position: fixed;
  inset: 0;
  z-index: 25;
}

.date-picker-container {
  .picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
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
      font-size: 16px;
      font-weight: 600;
      color: #1E293B;
      margin: 0;
    }
  }
}
</style>
