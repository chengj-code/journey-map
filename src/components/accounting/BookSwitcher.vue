<template>
  <div class="book-switcher">
    <div class="book-switcher-header" @click="showBookList = true">
      <span class="book-icon">{{ currentBook?.icon || '📒' }}</span>
      <span class="book-name">{{ currentBook?.name || '选择账本' }}</span>
      <van-icon name="arrow-down" :class="{ 'arrow-up': showBookList }" />
    </div>

    <van-popup
      v-model:show="showBookList"
      position="bottom"
      round
      :style="{ maxHeight: '70%' }"
    >
      <div class="book-list-container">
        <div class="book-list-header">
          <h3>切换账本</h3>
          <van-icon name="cross" @click="showBookList = false" />
        </div>

        <div class="book-list">
          <div
            v-for="book in books"
            :key="book.id"
            class="book-item"
            :class="{ 'is-current': book.id === currentBookId }"
            @click="handleSelectBook(book)"
            @touchstart="handleTouchStart(book, $event)"
            @touchend="handleTouchEnd"
            @touchcancel="handleTouchEnd"
          >
            <div class="book-item-left">
              <span class="book-item-icon">{{ book.icon || '📒' }}</span>
              <span class="book-item-name">{{ book.name }}</span>
            </div>
            <van-icon v-if="book.id === currentBookId" name="success" color="#10B981" />
          </div>
        </div>

        <div class="book-list-footer">
          <van-button
            type="primary"
            block
            icon="plus"
            @click="handleAddBook"
          >
            新建账本
          </van-button>
        </div>
      </div>
    </van-popup>

    <van-action-sheet
      v-model:show="showActionSheet"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="handleActionSelect"
    />

    <van-dialog
      v-model:show="showEditDialog"
      :title="editingBook ? '编辑账本' : '新建账本'"
      show-cancel-button
      confirm-button-text="保存"
      @confirm="handleSaveBook"
    >
      <div class="edit-form">
        <van-field
          v-model="formData.name"
          label="名称"
          placeholder="请输入账本名称"
          :maxlength="20"
          required
        />

        <div class="form-section">
          <label class="form-label">图标</label>
          <div class="icon-grid">
            <span
              v-for="icon in iconOptions"
              :key="icon"
              class="icon-option"
              :class="{ 'is-selected': formData.icon === icon }"
              @click="formData.icon = icon"
            >
              {{ icon }}
            </span>
          </div>
        </div>

        <van-field
          v-model="formData.description"
          label="描述"
          placeholder="可选，添加账本描述"
          type="textarea"
          rows="2"
          :maxlength="100"
          autosize
        />
      </div>
    </van-dialog>

    <van-dialog
      v-model:show="showDeleteDialog"
      title="删除账本"
      show-cancel-button
      confirm-button-text="确认删除"
      confirm-button-color="#EE0A24"
      @confirm="handleConfirmDelete"
    >
      <div class="delete-content">
        <p>{{ deleteMessage }}</p>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { showToast } from 'vant';
import { useAccountingStore } from '@/store';
import type { AccountingBook } from '@/types/accounting';

const store = useAccountingStore();

const showBookList = ref(false);
const showActionSheet = ref(false);
const showEditDialog = ref(false);
const showDeleteDialog = ref(false);
const editingBook = ref<AccountingBook | null>(null);
const deletingBookId = ref('');

const iconOptions = ['📒', '💼', '🏠', '💰', '🎯', '⭐', '🌟', '💎', '📊', '🎨'];

const formData = reactive({
  name: '',
  icon: '📒',
  description: '',
});

let longPressTimer: ReturnType<typeof setTimeout> | null = null;

const books = computed(() => store.books);
const currentBookId = computed(() => store.currentBookId);
const currentBook = computed(() => store.currentBook);

const actions = computed(() => [
  { name: '编辑', icon: 'edit' },
  { name: '删除', icon: 'delete-o', color: '#EE0A24' },
]);

const deleteMessage = computed(() => {
  if (!deletingBookId.value) return '';
  const recordCount = store.records.filter(r => r.bookId === deletingBookId.value).length;
  if (recordCount === 0) {
    return '确定要删除该空账本吗？';
  }
  return `将同时删除 ${recordCount} 条记录，确定要删除吗？`;
});

function handleSelectBook(book: AccountingBook) {
  if (book.id !== currentBookId.value) {
    store.switchBook(book.id);
    showToast(`已切换到 ${book.name}`);
  }
  showBookList.value = false;
}

function handleTouchStart(book: AccountingBook) {
  longPressTimer = setTimeout(() => {
    editingBook.value = book;
    showActionSheet.value = true;
  }, 500);
}

function handleTouchEnd() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
}

function handleAddBook() {
  showBookList.value = false;
  editingBook.value = null;
  resetForm();
  showEditDialog.value = true;
}

function handleActionSelect(action: { name: string }) {
  if (!editingBook.value) return;

  if (action.name === '编辑') {
    showActionSheet.value = false;
    formData.name = editingBook.value.name || '';
    formData.icon = editingBook.value.icon || '📒';
    formData.description = editingBook.value.description || '';
    showEditDialog.value = true;
  } else if (action.name === '删除') {
    showActionSheet.value = false;
    deletingBookId.value = editingBook.value.id;
    showDeleteDialog.value = true;
  }
}

function handleSaveBook() {
  if (!formData.name.trim()) {
    showToast('请输入账本名称');
    return;
  }

  if (editingBook.value) {
    store.updateBook(editingBook.value.id, {
      name: formData.name.trim(),
      icon: formData.icon,
      description: formData.description.trim(),
    });
    showToast('修改成功');
  } else {
    store.addBook({
      name: formData.name.trim(),
      icon: formData.icon,
      description: formData.description.trim(),
    });
    showToast('创建成功');
  }

  showEditDialog.value = false;
  resetForm();
}

function handleConfirmDelete() {
  if (deletingBookId.value) {
    store.deleteBook(deletingBookId.value);
    showToast('删除成功');
    deletingBookId.value = '';
  }
}

function resetForm() {
  formData.name = '';
  formData.icon = '📒';
  formData.description = '';
}
</script>

<style scoped lang="less">
.book-switcher {
  padding: 12px 16px;
  background: #ffffff;
  border-bottom: 1px solid #E2E8F0;
}

.book-switcher-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    background: #E2E8F0;
    transform: scale(0.98);
  }

  .book-icon {
    font-size: 20px;
  }

  .book-name {
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    color: #1E293B;
  }

  :deep(.van-icon) {
    font-size: 16px;
    color: #94A3B8;
    transition: transform 0.2s ease;

    &.arrow-up {
      transform: rotate(180deg);
    }
  }
}

.book-list-container {
  padding: 16px;
}

.book-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1E293B;
    margin: 0;
  }

  :deep(.van-icon) {
    font-size: 20px;
    color: #94A3B8;
    cursor: pointer;
    padding: 8px;
  }
}

.book-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.book-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    background: #E2E8F0;
  }

  &.is-current {
    background: #ECFDF5;
    border: 1px solid #10B981;
  }

  .book-item-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .book-item-icon {
    font-size: 24px;
  }

  .book-item-name {
    font-size: 16px;
    color: #1E293B;
    font-weight: 500;
  }
}

.book-list-footer {
  :deep(.van-button) {
    border-radius: 12px;
    height: 44px;
    font-size: 16px;
  }
}

.edit-form {
  padding: 8px 0;
}

.form-section {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 12px;
}

.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.icon-option {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: #F8FAFC;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }

  &.is-selected {
    background: #ECFDF5;
    border: 2px solid #10B981;
  }
}

.delete-content {
  p {
    font-size: 14px;
    color: #64748B;
    line-height: 1.6;
    margin: 0;
  }
}
</style>
