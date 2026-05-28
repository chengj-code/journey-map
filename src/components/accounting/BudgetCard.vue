<template>
  <div class="budget-card">
    <!-- 状态一：无预算引导 -->
    <div v-if="!status" class="guide-card">
      <span class="guide-icon">📋</span>
      <span class="guide-text">设置本月预算，轻松掌控支出</span>
      <button class="guide-btn" @click.stop="emit('setup')">去设置</button>
    </div>

    <!-- 状态二：有预算 -->
    <template v-else>
      <div class="card-body" @click="emit('toggleDetail')">
        <!-- 顶部行 -->
        <div class="header-row">
          <div class="header-label"><span class="label-emoji">📊</span> 预算</div>
          <van-icon name="edit" size="16" color="#94A3B8" class="edit-icon" @click.stop="emit('setup')" />
        </div>

        <!-- 进度条 -->
        <div class="progress-track">
          <div
            class="progress-fill"
            :style="{ width: progressWidth + '%' }"
            :class="progressColorClass"
          />
        </div>

        <!-- 金额信息行 -->
        <div class="amount-row">{{ fmtAmount(status.spent) }} / {{ fmtAmount(totalAmount) }}</div>

        <!-- 百分比和剩余 -->
        <div class="status-row">
          <span class="percentage-text" :class="{ over: status.isOver }">{{ percentageLabel }}</span>
          <span class="remaining-text" :class="{ over: status.isOver }">{{ remainingLabel }}</span>
        </div>
      </div>

      <!-- 分类预算明细（可展开） -->
      <div v-if="showDetail && filteredCategories.length > 0" class="category-detail">
        <div
          v-for="(cat, idx) in filteredCategories"
          :key="idx"
          class="category-item"
        >
          <span class="cat-name">{{ cat.category }}</span>
          <div class="cat-progress-track">
            <div
              class="cat-progress-fill"
              :style="{ width: (cat.isOver ? 100 : Math.min(cat.percentage, 100)) + '%' }"
              :class="getCategoryProgressClass(cat)"
            />
          </div>
          <span class="cat-amount">{{ fmtAmount(cat.spent) }}/{{ fmtAmount(cat.budget) }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BudgetStatus, CategoryBudgetStatus } from '@/types/accounting'

interface Props {
  status: BudgetStatus | null
  totalAmount: number
  categoryStatuses?: CategoryBudgetStatus[]
}

const props = withDefaults(defineProps<Props>(), {
  categoryStatuses: () => [],
})

const emit = defineEmits<{
  (e: 'setup'): void
  (e: 'toggleDetail'): void
}>()

const showDetail = ref(false)

function fmtAmount(val: number): string {
  const abs = Math.abs(val)
  const formatted = abs.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  return val < 0 ? '-¥' + formatted : '¥' + formatted
}

const progressWidth = computed(() => {
  if (!props.status) return 0
  if (props.status.isOver) return 100
  return Math.min(props.status.percentage, 100)
})

const progressColorClass = computed(() => {
  if (!props.status) return ''
  if (props.status.isOver || props.status.percentage >= 90) return 'color-red'
  if (props.status.percentage >= 70) return 'color-orange'
  return 'color-green'
})

const percentageLabel = computed(() => {
  if (!props.status) return ''
  if (props.status.isOver) return '超支 ' + Math.abs(props.status.percentage - 100).toFixed(0) + '%'
  return props.status.percentage.toFixed(0) + '%'
})

const remainingLabel = computed(() => {
  if (!props.status) return ''
  if (props.status.isOver) return '超支 ¥' + Math.abs(props.status.remaining).toLocaleString('zh-CN', { maximumFractionDigits: 0 })
  return '还剩 ¥' + props.status.remaining.toLocaleString('zh-CN', { maximumFractionDigits: 0 })
})

const filteredCategories = computed(() => {
  return (props.categoryStatuses || []).filter(c => c.budget > 0)
})

function getCategoryProgressClass(cat: CategoryBudgetStatus): string {
  if (cat.isOver || cat.percentage >= 90) return 'color-red'
  if (cat.percentage >= 70) return 'color-orange'
  return 'color-green'
}
</script>

<style scoped lang="less">
.budget-card {
  margin: 0 16px 12px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

// ====== 引导卡片 ======
.guide-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 16px;
  background: #F8FAFC;
  border: 1.5px dashed #CBD5E1;
  border-radius: 12px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  .guide-icon {
    font-size: 22px;
    flex-shrink: 0;
  }

  .guide-text {
    flex: 1;
    font-size: 14px;
    color: #64748B;
    font-weight: 500;
  }

  .guide-btn {
    flex-shrink: 0;
    padding: 7px 16px;
    font-size: 13px;
    font-weight: 600;
    color: #ffffff;
    background: #2563EB;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.2s ease;
    -webkit-tap-highlight-color: transparent;

    &:active {
      background: #1D4ED8;
    }
  }
}

// ====== 有预算卡片主体 ======
.card-body {
  padding: 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  .header-label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 15px;
    font-weight: 600;
    color: #1E293B;

    .label-emoji {
      font-size: 16px;
    }
  }

  .edit-icon {
    cursor: pointer;
    padding: 4px;
    transition: color 0.2s ease;

    &:active {
      color: #2563EB;
    }
  }
}

// 进度条
.progress-track {
  width: 100%;
  height: 12px;
  background: #E2E8F0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.3s ease;

  &.color-green {
    background: #10B981;
  }

  &.color-orange {
    background: #F59E0B;
  }

  &.color-red {
    background: #EF4444;
  }
}

// 金额信息行
.amount-row {
  font-size: 15px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 8px;
}

// 百分比和剩余
.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;

  .percentage-text {
    color: #64748B;
    font-weight: 500;

    &.over {
      color: #EF4444;
      font-weight: 600;
    }
  }

  .remaining-text {
    color: #10B981;
    font-weight: 500;

    &.over {
      color: #EF4444;
      font-weight: 600;
    }
  }
}

// ====== 分类明细 ======
.category-detail {
  padding: 0 16px 14px;
  animation: slideDown 0.25s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;

  .cat-name {
    width: 56px;
    flex-shrink: 0;
    font-size: 12px;
    color: #64748B;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cat-progress-track {
    flex: 1;
    height: 6px;
    background: #F1F5F9;
    border-radius: 3px;
    overflow: hidden;
  }

  .cat-progress-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s ease;

    &.color-green {
      background: #10B981;
    }

    &.color-orange {
      background: #F59E0B;
    }

    &.color-red {
      background: #EF4444;
    }
  }

  .cat-amount {
    flex-shrink: 0;
    width: 80px;
    text-align: right;
    font-size: 11px;
    color: #94A3B8;
  }
}
</style>
