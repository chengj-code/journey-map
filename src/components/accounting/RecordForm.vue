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
    <van-popup
      v-model:show="showAddTagDialog"
      position="center"
      round
      :style="{ width: '85%', maxWidth: '360px' }"
      :lock-scroll="true"
      :close-on-click-overlay="true"
    >
      <div class="add-tag-dialog">
        <div class="dialog-header">
          <h3>新建标签</h3>
          <van-icon name="cross" size="18" color="#94A3B8" @click="showAddTagDialog = false" />
        </div>

        <div class="dialog-body">
          <div class="input-section">
            <label class="input-label">标签名称</label>
            <div class="input-wrapper" :class="{ focused: nameFocused }">
              <van-icon name="label-o" size="18" :color="nameFocused ? '#10B981' : '#CBD5E1'" />
              <input
                v-model="newTagName"
                placeholder="输入标签名称..."
                maxlength="10"
                class="tag-input"
                @focus="nameFocused = true"
                @blur="nameFocused = false"
                ref="tagInputRef"
              />
              <span class="char-count">{{ newTagName.length }}/10</span>
            </div>
          </div>

          <div class="color-section">
            <label class="section-label">选择颜色</label>
            <div class="color-grid">
              <div
                v-for="(color, index) in presetColors"
                :key="color"
                class="color-item"
                :class="{ selected: newTagColor === color }"
                :style="{ '--dot-color': color, '--index': index }"
                @click="newTagColor = color"
              >
                <div class="color-dot"></div>
                <div v-if="newTagColor === color" class="check-icon">✓</div>
              </div>
            </div>
          </div>

          <div class="preview-section">
            <label class="section-label">预览效果</label>
            <div class="preview-chip" :style="{ background: previewBgColor, borderColor: newTagColor }">
              <span class="preview-dot" :style="{ backgroundColor: newTagColor }"></span>
              <span class="preview-name" :style="{ color: newTagColor }">{{ newTagName || '标签名称' }}</span>
            </div>
          </div>
        </div>

        <div class="dialog-footer">
          <button class="btn-cancel" @click="showAddTagDialog = false">取消</button>
          <button class="btn-confirm" :disabled="!newTagName.trim()" @click="handleCreateTag">
            创建标签
          </button>
        </div>
      </div>
    </van-popup>
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

const previewBgColor = computed(() => {
  return newTagColor.value ? `color-mix(in srgb, ${newTagColor.value} 12%, white)` : '#F1F5F9';
});

const showCategoryPicker = ref(false);
const showDatePicker = ref(false);
const showAddTagDialog = ref(false);
const nameFocused = ref(false);
const tagInputRef = ref();
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

.add-tag-dialog {
  background: #ffffff;
  overflow: hidden;

  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 16px;

    h3 {
      font-size: 18px;
      font-weight: 700;
      color: #1E293B;
      margin: 0;
      letter-spacing: -0.3px;
    }

    .van-icon {
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
      transition: background 0.2s;

      &:active {
        background: #F1F5F9;
      }
    }
  }

  .dialog-body {
    padding: 0 24px 20px;
  }

  .input-section {
    margin-bottom: 24px;

    .input-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #64748B;
      margin-bottom: 8px;
      letter-spacing: 0.3px;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: #F8FAFC;
      border: 2px solid transparent;
      border-radius: 12px;
      transition: all 0.25s ease;

      &.focused {
        background: #ffffff;
        border-color: #10B981;
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
      }

      .tag-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 15px;
        font-weight: 500;
        color: #1E293B;
        background: transparent;

        &::placeholder {
          color: #94A3B8;
          font-weight: 400;
        }
      }

      .char-count {
        font-size: 12px;
        color: #94A3B8;
        flex-shrink: 0;
        min-width: 28px;
        text-align: right;
      }
    }
  }

  .color-section {
    margin-bottom: 22px;

    .section-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #64748B;
      margin-bottom: 12px;
      letter-spacing: 0.3px;
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }

    .color-item {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: popIn 0.3s ease backwards;
      animation-delay: calc(var(--index) * 40ms);

      @keyframes popIn {
        from {
          opacity: 0;
          transform: scale(0.5);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      &:active {
        transform: scale(0.88);
      }

      &.selected {
        transform: scale(1.08);
        box-shadow: 0 4px 12px color-mix(in srgb, var(--dot-color) 45%, transparent);

        .color-dot {
          width: 22px;
          height: 22px;
          border: 2.5px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .check-icon {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 18px;
          height: 18px;
          background: #1E293B;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: white;
          font-weight: 700;
          animation: checkPop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

          @keyframes checkPop {
            from { transform: scale(0); }
            to { transform: scale(1); }
          }
        }
      }

      .color-dot {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--dot-color);
        transition: all 0.25s ease;
        box-shadow: inset 0 -2px 4px rgba(0,0,0,0.12);
      }
    }
  }

  .preview-section {
    .section-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #64748B;
      margin-bottom: 10px;
      letter-spacing: 0.3px;
    }

    .preview-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 20px;
      border: 2px solid;
      transition: all 0.3s ease;

      .preview-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .preview-name {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.2px;
      }
    }
  }

  .dialog-footer {
    display: flex;
    gap: 12px;
    padding: 16px 24px 20px;

    button {
      flex: 1;
      height: 46px;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
      letter-spacing: 0.2px;
    }

    .btn-cancel {
      background: #F1F5F9;
      color: #475569;

      &:active {
        background: #E2E8F0;
        transform: scale(0.97);
      }
    }

    .btn-confirm {
      background: linear-gradient(135deg, #10B981, #059669);
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);

      &:active:not(:disabled) {
        transform: scale(0.97);
        box-shadow: 0 2px 6px rgba(16, 185, 129, 0.25);
      }

      &:disabled {
        background: linear-gradient(135deg, #CBD5E1, #94A3B8);
        box-shadow: none;
        cursor: not-allowed;
      }
    }
  }
}
</style>
