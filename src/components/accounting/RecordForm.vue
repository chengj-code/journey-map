<template>
  <van-popup
    :show="visible"
    position="bottom"
    round
    :style="{ maxHeight: '90%' }"
    @update:show="handlePopupClose"
  >
    <div class="record-form">
      <div class="form-header">
        <h3>{{ editRecord ? '编辑记录' : '记一笔' }}</h3>
        <van-icon name="cross" @click="handleCancel" />
      </div>

      <div class="form-content">
        <!-- 类型切换 -->
        <div class="type-switcher">
          <div
            class="type-option"
            :class="{ active: form.type === 'expense' }"
            @click="form.type = 'expense'"
          >
            支出
          </div>
          <div
            class="type-option"
            :class="{ active: form.type === 'income' }"
            @click="form.type = 'income'"
          >
            收入
          </div>
        </div>

        <!-- 金额输入 -->
        <div class="amount-input-wrapper">
          <span class="amount-prefix">{{ form.type === 'expense' ? '-' : '+' }}</span>
          <van-field
            v-model="amountDisplay"
            type="number"
            placeholder="0.00"
            class="amount-field"
            :formatter="formatAmount"
            format-trigger="onBlur"
            @input="handleAmountInput"
          />
          <span class="currency-symbol">¥</span>
        </div>

        <!-- 分类选择 -->
        <van-cell title="分类" :value="form.category || '请选择'" is-link @click="showCategoryPicker = true" />

        <!-- 日期选择 -->
        <van-cell title="日期" :value="form.date" is-link @click="showDatePicker = true" />

        <!-- 标签选择 -->
        <div class="tag-section">
          <div class="tag-cell">
            <div class="tag-label">标签</div>
            <div class="tag-content">
              <span class="add-tag-inline" @click="showAddTagDialog = true">+ 添加</span>
            </div>
          </div>
          <div class="tag-list">
            <div
              v-for="tag in store.tags"
              :key="tag.id"
              class="tag-chip"
              :class="{ selected: form.tags.includes(tag.id) }"
              :style="{ '--tag-color': tag.color }"
              @click="toggleTag(tag.id)"
            >
              <span class="tag-dot"></span>
              <span class="tag-name">{{ tag.name }}</span>
            </div>
            <div v-if="store.tags.length === 0" class="no-tags">暂无标签，点击添加</div>
          </div>
        </div>

        <!-- 备注输入 -->
        <van-field
          v-model="form.description"
          label="备注"
          type="textarea"
          placeholder="选填，最多100字"
          rows="2"
          :maxlength="100"
          autosize
          show-word-limit
        />
      </div>

      <div class="form-footer">
        <van-button plain type="default" @click="handleCancel">取消</van-button>
        <van-button type="primary" @click="handleSubmit">保存</van-button>
      </div>
    </div>

    <!-- 分类选择器 -->
    <van-popup v-model:show="showCategoryPicker" position="bottom" round>
      <div class="category-picker">
        <div class="picker-header">
          <span @click="showCategoryPicker = false">取消</span>
          <h3>选择分类</h3>
          <span class="confirm-btn" @click="confirmCategory">确定</span>
        </div>

        <div class="custom-category-input" v-if="showCustomCategory">
          <van-field
            v-model="customCategoryName"
            placeholder="输入自定义分类名称"
            maxlength="10"
            clearable
          />
        </div>

        <div class="category-grid">
          <div
            v-for="cat in currentCategories"
            :key="cat.name"
            class="category-item"
            :class="{ selected: tempCategory === cat.name || form.category === cat.name }"
            @click="selectCategory(cat.name)"
          >
            <span class="cat-icon">{{ cat.icon }}</span>
            <span class="cat-name">{{ cat.name }}</span>
          </div>
          <div
            class="category-item custom"
            :class="{ selected: showCustomCategory }"
            @click="showCustomCategory = true"
          >
            <span class="cat-icon">✏️</span>
            <span class="cat-name">自定义</span>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 日期选择器 -->
    <van-popup v-model:show="showDatePicker" position="bottom" round>
      <van-date-picker
        v-model="dateValue"
        title="选择日期"
        :min-date="new Date(2020, 0, 1)"
        :max-date="new Date(2030, 11, 31)"
        @confirm="onDateConfirm"
        @cancel="showDatePicker = false"
      />
    </van-popup>

    <!-- 新建标签弹窗 -->
    <van-dialog
      v-model:show="showAddTagDialog"
      title="新建标签"
      show-cancel-button
      confirm-button-text="创建"
      @confirm="handleCreateTag"
    >
      <div class="add-tag-form">
        <van-field
          v-model="newTagName"
          placeholder="标签名称"
          maxlength="10"
          required
        />
        <div class="color-picker">
          <label class="color-label">颜色</label>
          <div class="color-options">
            <span
              v-for="color in presetColors"
              :key="color"
              class="color-dot"
              :class="{ selected: newTagColor === color }"
              :style="{ backgroundColor: color }"
              @click="newTagColor = color"
            ></span>
          </div>
        </div>
      </div>
    </van-dialog>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import { showToast } from 'vant';
import { useAccountingStore } from '@/store';
import type { AccountingRecord } from '@/types/accounting';

interface Props {
  visible: boolean;
  editRecord?: AccountingRecord | null;
}

const props = withDefaults(defineProps<Props>(), {
  editRecord: null,
});

const emit = defineEmits<{
  (e: 'submit', record: Omit<AccountingRecord, 'id' | 'createdAt' | 'updatedAt'>): void;
  (e: 'cancel'): void;
}>();

const store = useAccountingStore();

const expenseCategories = [
  { name: '餐饮', icon: '🍜' },
  { name: '交通', icon: '🚗' },
  { name: '购物', icon: '🛒' },
  { name: '居住', icon: '🏠' },
  { name: '医疗', icon: '💊' },
  { name: '教育', icon: '📚' },
  { name: '娱乐', icon: '🎮' },
  { name: '人情', icon: '❤️' },
  { name: '数码', icon: '📱' },
  { name: '旅行', icon: '✈️' },
  { name: '其他', icon: '📝' },
];

const incomeCategories = [
  { name: '工资', icon: '💰' },
  { name: '奖金', icon: '🎁' },
  { name: '投资收益', icon: '📈' },
  { name: '兼职', icon: '🎯' },
  { name: '红包', icon: '💸' },
  { name: '其他', icon: '📝' },
];

const presetColors = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
];

const showCategoryPicker = ref(false);
const showDatePicker = ref(false);
const showAddTagDialog = ref(false);
const showCustomCategory = ref(false);
const customCategoryName = ref('');
const tempCategory = ref('');
const newTagName = ref('');
const newTagColor = ref(presetColors[0]);

const amountDisplay = ref('');
const dateValue = ref([]);

const form = reactive({
  type: 'expense' as 'income' | 'expense',
  amount: 0,
  category: '',
  date: new Date().toISOString().split('T')[0],
  tags: [] as string[],
  description: '',
});

const currentCategories = computed(() => {
  return form.type === 'expense' ? expenseCategories : incomeCategories;
});

watch(() => props.visible, (val) => {
  if (val) {
    if (props.editRecord) {
      initEditForm();
    } else {
      initNewForm();
    }
  }
});

watch(() => form.type, () => {
  form.category = '';
  showCustomCategory.value = false;
  customCategoryName.value = '';
});

function initNewForm() {
  form.type = 'expense';
  form.amount = 0;
  form.category = '';
  form.date = new Date().toISOString().split('T')[0];
  form.tags = [];
  form.description = '';
  amountDisplay.value = '';
  dateValue.value = formatDateArray(form.date);
}

function initEditForm() {
  if (!props.editRecord) return;

  form.type = props.editRecord.type;
  form.amount = props.editRecord.amount;
  form.category = props.editRecord.category;
  form.date = props.editRecord.date;
  form.tags = [...props.editRecord.tags];
  form.description = props.editRecord.description || '';
  amountDisplay.value = String(props.editRecord.amount);
  dateValue.value = formatDateArray(form.date);
}

function formatDateArray(dateStr: string) {
  const parts = dateStr.split('-');
  return parts.map(p => parseInt(p, 10));
}

function formatAmount(value: string): string {
  if (!value) return '';
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  return num.toFixed(2);
}

function handleAmountInput(value: string) {
  const num = parseFloat(value);
  form.amount = isNaN(num) ? 0 : Math.abs(num);
}

function selectCategory(name: string) {
  tempCategory.value = name;
}

function confirmCategory() {
  if (tempCategory.value) {
    form.category = tempCategory.value;
  }
  showCategoryPicker.value = false;
  tempCategory.value = '';
  showCustomCategory.value = false;
  customCategoryName.value = '';
}

function onDateConfirm({ selectedValues }: { selectedValues: string[] }) {
  const [year, month, day] = selectedValues;
  form.date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  showDatePicker.value = false;
}

function toggleTag(tagId: string) {
  const index = form.tags.indexOf(tagId);
  if (index > -1) {
    form.tags.splice(index, 1);
  } else {
    form.tags.push(tagId);
  }
}

function handleCreateTag() {
  if (!newTagName.value.trim()) {
    showToast('请输入标签名称');
    return;
  }

  const exists = store.tags.some(t => t.name === newTagName.value.trim());
  if (exists) {
    showToast('标签名称已存在');
    return;
  }

  store.addTag({
    name: newTagName.value.trim(),
    color: newTagColor.value,
  });

  showToast('标签创建成功');
  newTagName.value = '';
  newTagColor.value = presetColors[0];
  showAddTagDialog.value = false;
}

function validateForm(): boolean {
  if (form.amount <= 0) {
    showToast('请输入有效金额');
    return false;
  }

  if (!form.category && !customCategoryName.value.trim()) {
    showToast('请选择或输入分类');
    return false;
  }

  if (!form.date) {
    showToast('请选择日期');
    return false;
  }

  return true;
}

function handleSubmit() {
  if (customCategoryName.value.trim()) {
    form.category = customCategoryName.value.trim();
  }

  if (!validateForm()) return;

  emit('submit', {
    bookId: store.currentBookId || '',
    type: form.type,
    amount: form.amount,
    category: form.category,
    description: form.description,
    tags: [...form.tags],
    date: form.date,
  });
}

function handleCancel() {
  emit('cancel');
}

function handlePopupClose(show: boolean) {
  if (!show) {
    handleCancel();
  }
}
</script>

<style scoped lang="less">
.record-form {
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.form-header {
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

.form-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.type-switcher {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background: #F1F5F9;
  border-radius: 10px;
  padding: 4px;

  .type-option {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 15px;
    font-weight: 500;
    color: #64748B;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      background: #ffffff;
      color: #1E293B;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }
  }
}

.amount-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 28px;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 12px;

  .amount-prefix {
    font-size: 32px;
    font-weight: 600;
    color: #1E293B;
  }

  .amount-field {
    flex: 1;
    text-align: center;

    :deep(.van-field__control) {
      font-size: 36px;
      font-weight: 700;
      color: #1E293B;
      text-align: center;
    }

    :deep(.van-field__body) {
      input::-webkit-inner-spin-button,
      input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  .currency-symbol {
    font-size: 24px;
    color: #94A3B8;
    font-weight: 500;
  }
}

.tag-section {
  margin-bottom: 16px;
  padding: var(--van-cell-padding, 10px) var(--van-cell-padding-x, 16px);
  background: #fff;

  .tag-cell {
    display: flex;
    align-items: center;

    .tag-label {
      width: var(--van-cell-label-width, 90px);
      flex-shrink: 0;
      font-size: var(--van-cell-font-size, 14px);
      line-height: var(--van-cell-line-height, 24px);
      color: var(--van-cell-text-color, #323233);
      margin-right: var(--van-padding-xs, 8px);
    }

    .tag-content {
      flex: 1;
      color: var(--van-cell-value-color, #969799);
      font-size: var(--van-cell-font-size, 14px);
      line-height: var(--van-cell-line-height, 24px);

      .add-tag-inline {
        color: #3B82F6;
        font-size: 13px;
        cursor: pointer;
        padding: 2px 0;
      }
    }
  }

  .tag-list {
    margin-top: 10px;
    margin-left: calc(var(--van-cell-label-width, 90px) + var(--van-padding-xs, 8px));
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 32px;
  }

  .tag-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #F1F5F9;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;

    &:active {
      transform: scale(0.95);
    }

    &.selected {
      background: color-mix(in srgb, var(--tag-color) 15%, white);
      border-color: var(--tag-color);

      .tag-name {
        color: var(--tag-color);
        font-weight: 500;
      }
    }

    .tag-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--tag-color);
    }

    .tag-name {
      font-size: 13px;
      color: #64748B;
    }
  }

  .no-tags {
    font-size: 13px;
    color: #94A3B8;
    line-height: 40px;
  }
}

.form-footer {
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

.category-picker {
  padding: 16px;
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  span {
    font-size: 14px;
    color: #64748B;
    cursor: pointer;

    &.confirm-btn {
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

.custom-category-input {
  margin-bottom: 16px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  background: #F8FAFC;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;

  &:active {
    transform: scale(0.95);
  }

  &.selected {
    background: #EFF6FF;
    border-color: #3B82F6;
  }

  &.custom {
    background: #FFFBEB;
    border-color: #EAB308;

    &.selected {
      background: #FEF3C7;
    }
  }

  .cat-icon {
    font-size: 24px;
  }

  .cat-name {
    font-size: 12px;
    color: #475569;
  }
}

.add-tag-form {
  padding: 8px 0;
}

.color-picker {
  margin-top: 16px;

  .color-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #475569;
    margin-bottom: 12px;
  }

  .color-options {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .color-dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 3px solid transparent;

    &:active {
      transform: scale(0.9);
    }

    &.selected {
      border-color: #1E293B;
      transform: scale(1.1);
    }
  }
}
</style>
