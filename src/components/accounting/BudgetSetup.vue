<template>
  <van-popup
    :show="visible"
    position="bottom"
    round
    :style="{ maxHeight: '85vh' }"
    :lock-scroll="true"
    @update:show="handlePopupClose"
  >
    <div class="budget-setup">
      <div class="setup-header">
        <h3>{{ budget ? '编辑预算' : '设置预算' }}</h3>
        <van-icon name="cross" @click="handleCancel" />
      </div>

      <div class="setup-content">
        <!-- 总预算输入 -->
        <div class="total-budget-section">
          <van-field
            v-model="totalAmount"
            type="digit"
            label="总预算"
            placeholder="输入金额"
            :left-icon="'balance-o'"
          >
            <template #left-icon>
              <span class="currency-prefix">¥</span>
            </template>
          </van-field>

          <div class="quick-amounts">
            <button
              v-for="amount in quickAmounts"
              :key="amount"
              class="quick-btn"
              @click="setQuickAmount(amount)"
            >
              ¥{{ amount }}
            </button>
          </div>
        </div>

        <!-- 分类预算 -->
        <van-collapse v-model="categoryCollapseActive">
          <van-collapse-item title="分类预算（可选）" name="categories">
            <div class="category-budget-list">
              <div v-for="cat in expenseCategories" :key="cat" class="category-row">
                <span class="cat-name">{{ cat }}</span>
                <van-field
                  v-model="categories[cat]"
                  type="digit"
                  placeholder="不限"
                  class="cat-field"
                />
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>

        <!-- 警告提示 -->
        <div v-if="isOverBudget" class="budget-warning">
          ⚠️ 分类预算总和超过总预算
        </div>
      </div>

      <div class="setup-footer">
        <van-button plain type="default" @click="handleCancel">取消</van-button>
        <van-button type="primary" @click="handleConfirm">确认</van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { showToast } from 'vant'
import type { Budget } from '@/types/accounting'

interface Props {
  visible: boolean
  budget?: Budget | null
}

const props = withDefaults(defineProps<Props>(), {
  budget: null,
})

const emit = defineEmits<{
  (e: 'confirm', data: { totalAmount: number; categories: Record<string, number> }): void
  (e: 'cancel'): void
}>()

const expenseCategories = [
  '餐饮', '交通', '购物', '居住', '医疗',
  '教育', '娱乐', '人情', '数码', '旅行',
]

const quickAmounts = [1000, 3000, 5000, 10000]

const totalAmount = ref('')
const categoryCollapseActive = ref<string[]>([])
const categories = reactive<Record<string, number>>({})

const isOverBudget = computed(() => {
  const total = parseFloat(totalAmount.value) || 0
  if (total <= 0) return false
  const catSum = Object.values(categories).reduce((sum, val) => {
    const num = typeof val === 'string' ? parseFloat(val) || 0 : val
    return sum + num
  }, 0)
  return catSum > total
})

watch(() => props.visible, (val) => {
  if (val) {
    initForm()
  }
})

function initForm() {
  if (props.budget) {
    totalAmount.value = String(props.budget.totalAmount)
    const cats: Record<string, number> = {}
    expenseCategories.forEach(cat => {
      if (props.budget && props.budget.categories[cat] !== undefined) {
        cats[cat] = props.budget.categories[cat]
      }
    })
    Object.assign(categories, cats)
  } else {
    totalAmount.value = ''
    expenseCategories.forEach(cat => {
      delete categories[cat]
    })
  }
  categoryCollapseActive.value = []
}

function setQuickAmount(amount: number) {
  totalAmount.value = String(amount)
}

function handleConfirm() {
  const total = parseFloat(totalAmount.value)
  if (!totalAmount.value.trim() || isNaN(total) || total <= 0) {
    showToast('请输入有效的总预算金额')
    return
  }

  const resultCategories: Record<string, number> = {}
  expenseCategories.forEach(cat => {
    const val = categories[cat]
    const num = typeof val === 'string' ? parseFloat(val) || 0 : val
    if (num > 0) {
      resultCategories[cat] = num
    }
  })

  emit('confirm', {
    totalAmount: total,
    categories: resultCategories,
  })
}

function handleCancel() {
  emit('cancel')
}

function handlePopupClose(show: boolean) {
  if (!show) {
    handleCancel()
  }
}
</script>

<style scoped lang="less">
.budget-setup {
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}

.setup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #E2E8F0;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1E293B;
    margin: 0;
  }

  .van-icon {
    font-size: 20px;
    color: #94A3B8;
    cursor: pointer;
    padding: 4px;
  }
}

.setup-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.total-budget-section {
  margin-bottom: 16px;

  .currency-prefix {
    font-size: 16px;
    font-weight: 600;
    color: #1E293B;
  }

  :deep(.van-field__left-icon) {
    display: flex;
    align-items: center;
    margin-right: 6px;
  }

  :deep(.van-field__control) {
    font-size: 15px;
    font-weight: 600;
    color: #1E293B;
  }
}

.quick-amounts {
  display: flex;
  gap: 8px;
  margin-top: 12px;

  .quick-btn {
    flex: 1;
    padding: 10px 0;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    background: #F8FAFC;
    font-size: 13px;
    font-weight: 500;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    -webkit-tap-highlight-color: transparent;

    &:active {
      transform: scale(0.95);
      background: #EFF6FF;
      border-color: #BFDBFE;
      color: #2563EB;
    }
  }
}

.category-budget-list {
  padding: 4px 0;

  .category-row {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #F1F5F9;

    &:last-child {
      border-bottom: none;
    }

    .cat-name {
      width: 60px;
      flex-shrink: 0;
      font-size: 14px;
      font-weight: 500;
      color: #475569;
    }

    .cat-field {
      flex: 1;
      padding: 0;

      :deep(.van-field__body) {
        input {
          text-align: right;
          font-size: 14px;
          color: #1E293B;
          &::placeholder {
            color: #CBD5E1;
            font-weight: 400;
          }
        }
      }

      :deep(.van-cell__value) {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}

:deep(.van-collapse-item__title) {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

:deep(.van-collapse-item__content) {
  padding: 0 16px;
}

.budget-warning {
  margin-top: 12px;
  padding: 10px 14px;
  background: #FEF2F2;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #DC2626;
}

.setup-footer {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #E2E8F0;

  .van-button {
    flex: 1;
    height: 44px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
