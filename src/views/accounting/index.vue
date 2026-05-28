<template>
  <div class="accounting-page">
    <!-- 导航栏 -->
    <van-nav-bar title="记账本">
      <template #right>
        <van-icon name="label-o" size="20" @click="$router.push('/accounting/tags')" />
      </template>
    </van-nav-bar>

    <!-- 账本切换器 -->
    <BookSwitcher />

    <!-- 筛选栏 -->
    <FilterBar
      v-model="localFilterState"
      :tags="store.tags"
      @reset="handleFilterReset"
    />

    <!-- 模式切换 -->
    <div class="mode-bar">
      <div class="mode-switch">
        <van-button
          :type="viewMode === 'list' ? 'primary' : 'default'"
          size="small"
          round
          @click="viewMode = 'list'"
        >
          列表
        </van-button>
        <van-button
          :type="viewMode === 'stats' ? 'primary' : 'default'"
          size="small"
          round
          @click="viewMode = 'stats'"
        >
          统计
        </van-button>
      </div>
    </div>

    <!-- 月度汇总卡片（仅列表模式） -->
    <div v-if="viewMode === 'list'" class="summary-card">
      <div class="summary-item">
        <span class="label">本月支出</span>
        <span class="amount expense">-¥{{ monthlySummary.totalExpense.toFixed(2) }}</span>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-item">
        <span class="label">本月收入</span>
        <span class="amount income">+¥{{ monthlySummary.totalIncome.toFixed(2) }}</span>
      </div>
    </div>

    <!-- 预算进度卡片（仅列表模式） -->
    <BudgetCard
      v-if="viewMode === 'list'"
      :status="budgetStatus"
      :totalAmount="currentBudget?.totalAmount ?? 0"
      :category-statuses="categoryBudgetStatuses"
      @setup="openBudgetSetup"
    />

    <!-- 列表内容 -->
    <div class="record-list" v-if="viewMode === 'list'">
      <!-- 按日期分组 -->
      <div v-for="group in groupedRecords" :key="group.date" class="date-group">
        <div class="date-header">
          <span class="date-label">{{ group.label }}</span>
          <span class="record-count">{{ group.records.length }}笔</span>
        </div>

        <div v-for="record in group.records" :key="record.id" class="record-card" @click="handleRecordClick(record)">
          <div class="record-left">
            <span class="category-icon">{{ getCategoryIcon(record.category) }}</span>
            <div class="record-info">
              <div class="record-desc">{{ record.description || record.category }}</div>
              <div class="record-meta">
                <span class="record-time">{{ formatTime(record.createdAt) }}</span>
                <template v-for="tagId in record.tags.slice(0, 2)" :key="tagId">
                  <span class="tag-chip" :style="{ background: getTagColor(tagId) }">
                    {{ getTagName(tagId) }}
                  </span>
                </template>
              </div>
            </div>
          </div>
          <div class="record-right">
            <span :class="['amount', record.type]">
              {{ record.type === 'expense' ? '-' : '+' }}¥{{ record.amount.toFixed(2) }}
            </span>
            <van-icon name="ellipsis" @click.stop="showActions(record)" />
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <van-empty
        v-if="filteredRecords.length === 0"
        description="暂无记录，记一笔吧~"
        image="search"
      >
        <van-button type="primary" round class="empty-btn" @click="openAddForm">
          去记账
        </van-button>
      </van-empty>
    </div>

    <!-- 统计模式 -->
    <StatisticsView
      v-else
      :records="filteredRecords"
      :date-range="filterDateRange"
      :filter-state="localFilterState"
      :budget-status="budgetStatus"
    />

    <!-- 浮动添加按钮（固定在右下角，避开 TabBar） -->
    <div class="fab-button" @click="openAddForm">
      <van-icon name="plus" size="24" color="#ffffff" />
    </div>

    <!-- 记账表单弹窗 -->
    <RecordForm
      :visible="showForm"
      :edit-record="editingRecord"
      @submit="handleFormSubmit"
      @cancel="closeForm"
    />

    <!-- 操作菜单 -->
    <van-action-sheet
      v-model:show="showActionSheet"
      :actions="recordActions"
      cancel-text="取消"
      close-on-click-action
      @select="handleActionSelect"
    />

    <!-- 删除确认对话框 -->
    <van-dialog
      v-model:show="showDeleteDialog"
      title="删除记录"
      show-cancel-button
      confirm-button-text="确认删除"
      confirm-button-color="#EE0A24"
      message="确定要删除该条记录吗？此操作不可恢复。"
      @confirm="handleConfirmDelete"
    />

    <!-- 预算设置弹窗 -->
    <BudgetSetup
      :visible="showBudgetSetup"
      :budget="currentBudget"
      @confirm="handleBudgetConfirm"
      @cancel="showBudgetSetup = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { showToast } from 'vant';
import { useAccountingStore } from '@/store';
import type { FilterState } from '@/types/accounting';
import BookSwitcher from '@/components/accounting/BookSwitcher.vue';
import FilterBar from '@/components/accounting/FilterBar.vue';
import RecordForm from '@/components/accounting/RecordForm.vue';
import StatisticsView from './StatisticsView.vue';
import type { AccountingRecord } from '@/types/accounting';
import BudgetCard from '@/components/accounting/BudgetCard.vue'
import BudgetSetup from '@/components/accounting/BudgetSetup.vue'

const store = useAccountingStore();

const viewMode = ref<'list' | 'stats'>('list');
const showForm = ref(false);
const editingRecord = ref<AccountingRecord | null>(null);
const showActionSheet = ref(false);
const showDeleteDialog = ref(false);
const currentActionRecord = ref<AccountingRecord | null>(null);
const showBudgetSetup = ref(false)

const localFilterState = computed({
  get: () => store.filterState,
  set: (value: FilterState) => store.updateFilter(value),
});

const categoryIcons: Record<string, string> = {
  '餐饮': '🍜',
  '交通': '🚗',
  '购物': '🛒',
  '居住': '🏠',
  '医疗': '💊',
  '教育': '📚',
  '娱乐': '🎮',
  '人情': '❤️',
  '数码': '📱',
  '旅行': '✈️',
  '工资': '💰',
  '奖金': '🎁',
  '投资收益': '📈',
  '兼职': '🎯',
  '红包': '💸',
};

const recordActions = [
  { name: '编辑', icon: 'edit' },
  { name: '删除', icon: 'delete-o', color: '#EE0A24' },
];

const filteredRecords = computed(() => {
  return store.filteredRecords;
});

const monthlySummary = computed(() => {
  return store.monthlySummary;
});

const budgetStatus = computed(() => store.budgetStatus)
const currentBudget = computed(() => store.currentBudget)
const categoryBudgetStatuses = computed(() => store.categoryBudgetStatuses)

const filterDateRange = computed(() => {
  return {
    startDate: store.filterState.startDate,
    endDate: store.filterState.endDate,
  };
});

const groupedRecords = computed(() => {
  const records = filteredRecords.value;
  const groups: { date: string; label: string; records: AccountingRecord[] }[] = [];

  let currentDate = '';
  let currentGroup: typeof groups[0] | null = null;

  for (const record of records) {
    if (record.date !== currentDate) {
      currentDate = record.date;
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      let label = record.date;
      if (record.date === today) {
        label = '今天';
      } else if (record.date === yesterday) {
        label = '昨天';
      } else {
        label = formatDateLabel(record.date);
      }

      currentGroup = { date: record.date, label, records: [] };
      groups.push(currentGroup);
    }
    currentGroup!.records.push(record);
  }

  return groups;
});

onMounted(() => {
  store.initDefaultBook();
});

function getCategoryIcon(category: string): string {
  return categoryIcons[category] || '📝';
}

function getTagName(tagId: string): string {
  const tag = store.tags.find(t => t.id === tagId);
  return tag?.name || '';
}

function getTagColor(tagId: string): string {
  const tag = store.tags.find(t => t.id === tagId);
  if (!tag) return '#E2E8F0';
  return colorMix(tag.color, '#FFFFFF', 0.15);
}

function colorMix(color: string, mixWith: string, ratio: number): string {
  const hex = (c: string) => parseInt(c, 16);
  const r1 = hex(color.slice(1, 3));
  const g1 = hex(color.slice(3, 5));
  const b1 = hex(color.slice(5, 7));
  const r2 = hex(mixWith.slice(1, 3));
  const g2 = hex(mixWith.slice(3, 5));
  const b2 = hex(mixWith.slice(5, 7));

  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}

function formatTime(isoDate?: string): string {
  if (!isoDate) return '';
  try {
    const timePart = isoDate.split('T')[1] || isoDate.split(' ')[1] || '';
    return timePart.substring(0, 5);
  } catch {
    return '';
  }
}

function openAddForm() {
  editingRecord.value = null;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  editingRecord.value = null;
}

function handleFormSubmit(recordData: Omit<AccountingRecord, 'id' | 'createdAt' | 'updatedAt'>) {
  if (editingRecord.value) {
    store.updateRecord(editingRecord.value.id, recordData);
    showToast('修改成功');
  } else {
    store.addRecord(recordData);
    showToast('保存成功');
  }
  closeForm();
}

function handleRecordClick(record: AccountingRecord) {
  // 可以扩展为查看详情或直接编辑
  editingRecord.value = record;
  showForm.value = true;
}

function showActions(record: AccountingRecord) {
  currentActionRecord.value = record;
  showActionSheet.value = true;
}

function handleActionSelect(action: { name: string }) {
  if (!currentActionRecord.value) return;

  if (action.name === '编辑') {
    editingRecord.value = currentActionRecord.value;
    showForm.value = true;
  } else if (action.name === '删除') {
    showDeleteDialog.value = true;
  }
}

function handleConfirmDelete() {
  if (currentActionRecord.value) {
    store.deleteRecord(currentActionRecord.value.id);
    showToast('删除成功');
    currentActionRecord.value = null;
  }
}

function handleFilterReset() {
  store.resetFilter();
  showToast('已重置筛选条件');
}

function openBudgetSetup() {
  showBudgetSetup.value = true
}

function handleBudgetConfirm(data: { totalAmount: number; categories: Record<string, number> }) {
  const n = new Date()
  const y = n.getFullYear()
  const m = n.getMonth() + 1
  store.setBudget({
    bookId: store.currentBookId!,
    year: y,
    month: m,
    totalAmount: data.totalAmount,
    categories: data.categories,
  })
  showBudgetSetup.value = false
  showToast('预算已保存')
}
</script>

<style scoped lang="less">
.accounting-page {
  min-height: 100vh;
  background: #F8FAFC;
  padding-bottom: 80px;
}

.fab-button {
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981, #059669);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:active {
    transform: scale(0.9);
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }
}

.mode-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background: #ffffff;

  .mode-switch {
    display: flex;
    gap: 8px;

    .van-button {
      height: 30px;
      font-size: 13px;
      padding: 0 16px;
    }
  }
}

.summary-card {
  margin: 12px 16px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  .summary-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .label {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.85);
    }

    .amount {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;

      &.expense {
        text-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
      }

      &.income {
        text-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
      }
    }
  }

  .summary-divider {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.25);
  }
}

.record-list {
  padding: 0 16px;
}

.date-group {
  margin-bottom: 16px;

  .date-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 4px 8px;

    .date-label {
      font-size: 15px;
      font-weight: 600;
      color: #1E293B;
    }

    .record-count {
      font-size: 12px;
      color: #94A3B8;
    }
  }
}

.record-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #ffffff;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  cursor: pointer;

  &:active {
    transform: scale(0.98);
    background: #F8FAFC;
  }

  .record-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;

    .category-icon {
      font-size: 28px;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F1F5F9;
      border-radius: 12px;
      flex-shrink: 0;
    }

    .record-info {
      flex: 1;
      min-width: 0;

      .record-desc {
        font-size: 15px;
        font-weight: 500;
        color: #1E293B;
        margin-bottom: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .record-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;

        .record-time {
          font-size: 12px;
          color: #94A3B8;
        }

        .tag-chip {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          color: #475569;
          font-weight: 500;
        }
      }
    }
  }

  .record-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    flex-shrink: 0;
    margin-left: 12px;

    .amount {
      font-size: 17px;
      font-weight: 600;
      white-space: nowrap;

      &.expense {
        color: #EF4444;
      }

      &.income {
        color: #10B981;
      }
    }

    .van-icon {
      font-size: 18px;
      color: #CBD5E1;
      padding: 4px;
      cursor: pointer;

      &:active {
        color: #94A3B8;
      }
    }
  }
}

.stats-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.empty-btn {
  margin-top: 16px;
  border-radius: 20px;
  padding: 0 32px;
  height: 40px;
}
</style>
