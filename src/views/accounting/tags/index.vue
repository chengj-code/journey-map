<template>
  <div class="tags-page">
    <van-nav-bar
      title="标签管理"
      left-arrow
      @click-left="router.back()"
      fixed
      placeholder
    />

    <div class="tags-content">
      <div class="tags-grid" v-if="tagsWithCount.length > 0">
        <div
          v-for="tag in tagsWithCount"
          :key="tag.id"
          class="tag-card"
          @click="handleEditTag(tag)"
          @touchstart="handleTouchStart($event, tag)"
          @touchend="handleTouchEnd"
          @touchmove="handleTouchMove"
        >
          <div class="tag-color-dot" :style="{ backgroundColor: tag.color }"></div>
          <span class="tag-name">{{ tag.name }}</span>
          <span class="tag-count">{{ tag.count }}次</span>
          <van-icon name="ellipsis" class="tag-more-btn" @click.stop="showActionMenu(tag)" />
        </div>
      </div>

      <div v-else class="empty-state">
        <van-empty description="暂无标签，点击右下角按钮创建" />
      </div>
    </div>

    <van-floating-bubble
      axis="xy"
      icon="plus"
      magnetic="x"
      @click="showEditDialog(null)"
    />

    <van-popup
      v-model:show="dialogVisible"
      position="bottom"
      round
      :style="{ padding: '24px' }"
      safe-area-inset-bottom
    >
      <div class="edit-dialog">
        <h3 class="dialog-title">{{ isEditing ? '编辑标签' : '新建标签' }}</h3>

        <div class="form-item">
          <label class="form-label">标签名称</label>
          <van-field
            v-model="formData.name"
            placeholder="请输入标签名称"
            maxlength="10"
            show-word-limit
            :error-message="nameError"
          />
        </div>

        <div class="form-item">
          <label class="form-label">选择颜色</label>
          <div class="color-picker">
            <div
              v-for="color in presetColors"
              :key="color"
              class="color-option"
              :class="{ active: formData.color === color }"
              :style="{ backgroundColor: color }"
              @click="formData.color = color"
            ></div>
            <div class="color-custom">
              <input
                type="color"
                v-model="formData.color"
                class="color-input"
              />
              <van-icon name="brush-o" class="custom-icon" />
            </div>
          </div>
        </div>

        <div class="form-item">
          <label class="form-label">选择图标（可选）</label>
          <div class="icon-picker">
            <div
              v-for="icon in presetIcons"
              :key="icon"
              class="icon-option"
              :class="{ active: formData.icon === icon }"
              @click="toggleIcon(icon)"
            >
              {{ icon }}
            </div>
            <div
              class="icon-option"
              :class="{ active: !formData.icon }"
              @click="formData.icon = undefined"
            >
              无
            </div>
          </div>
        </div>

        <div class="dialog-actions">
          <van-button plain type="default" size="large" @click="closeDialog">取消</van-button>
          <van-button type="primary" size="large" @click="handleSave">保存</van-button>
        </div>
      </div>
    </van-popup>

    <van-action-sheet
      v-model:show="actionSheetVisible"
      :actions="actionActions"
      cancel-text="取消"
      close-on-click-action
      @select="handleActionSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showDialog, showConfirmDialog } from 'vant'
import { useAccountingStore } from '@/store/accountingStore'
import type { Tag } from '@/types/accounting'

const router = useRouter()
const store = useAccountingStore()

const tagsWithCount = computed(() => store.tagsWithCount)

const dialogVisible = ref(false)
const actionSheetVisible = ref(false)
const isEditing = ref(false)
const currentTag = ref<Tag | null>(null)

let touchStartTime = 0
let touchStartX = 0
let touchStartY = 0
let currentTouchTag = ref<Tag | null>(null)
let longPressTimer: ReturnType<typeof setTimeout> | null = null

const formData = reactive({
  name: '',
  color: '#10B981',
  icon: undefined as string | undefined,
})

const nameError = ref('')

const presetColors = [
  '#EF4444', '#F97316', '#F59E0B', '#84CC16',
  '#10B981', '#14B8A6', '#06B6D4', '#3B82F6',
  '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E',
]

const presetIcons = [
  '🏷️', '📌', '⭐', '💰', '🍜', '🚗',
  '🏠', '💼', '🎮', '📚', '❤️', '🎯',
]

const actionActions = [
  { name: '编辑', icon: 'edit' },
  { name: '删除', icon: 'delete-o', color: '#ee0a24' },
]

function handleTouchStart(event: TouchEvent, tag: Tag) {
  touchStartTime = Date.now()
  touchStartX = event.touches[0].clientX
  touchStartY = event.touches[0].clientY
  currentTouchTag.value = tag

  longPressTimer = setTimeout(() => {
    if (currentTouchTag.value) {
      showActionMenu(currentTouchTag.value)
    }
  }, 500)
}

function handleTouchEnd() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

function handleTouchMove() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

function showActionMenu(tag: Tag) {
  currentTag.value = tag
  actionSheetVisible.value = true
}

function handleEditTag(tag: Tag & { count: number }) {
  isEditing.value = true
  currentTag.value = tag as Tag
  formData.name = tag.name
  formData.color = tag.color
  formData.icon = tag.icon
  dialogVisible.value = true
}

function showEditDialog(tag: Tag | null) {
  if (tag) {
    isEditing.value = true
    currentTag.value = tag
    formData.name = tag.name
    formData.color = tag.color
    formData.icon = tag.icon
  } else {
    isEditing.value = false
    currentTag.value = null
    formData.name = ''
    formData.color = '#10B981'
    formData.icon = undefined
  }
  nameError.value = ''
  dialogVisible.value = true
}

function closeDialog() {
  dialogVisible.value = false
  nameError.value = ''
}

function toggleIcon(icon: string) {
  if (formData.icon === icon) {
    formData.icon = undefined
  } else {
    formData.icon = icon
  }
}

async function handleSave() {
  nameError.value = ''

  if (!formData.name.trim()) {
    nameError.value = '请输入标签名称'
    return
  }

  const duplicateTag = store.tags.find(
    (t) => t.name.trim().toLowerCase() === formData.name.trim().toLowerCase() && t.id !== currentTag.value?.id
  )
  if (duplicateTag) {
    nameError.value = '标签名称已存在'
    return
  }

  try {
    if (isEditing.value && currentTag.value) {
      store.updateTag(currentTag.value.id, {
        name: formData.name.trim(),
        color: formData.color,
        icon: formData.icon,
      })
      showToast('更新成功')
    } else {
      store.addTag({
        name: formData.name.trim(),
        color: formData.color,
        icon: formData.icon,
      })
      showToast('创建成功')
    }
    closeDialog()
  } catch (e) {
    showToast('操作失败，请重试')
  }
}

async function handleActionSelect(action: { name: string; icon?: string; color?: string }) {
  if (!currentTag.value) return

  if (action.name === '编辑') {
    const tagWithCount = tagsWithCount.value.find((t) => t.id === currentTag.value!.id)
    if (tagWithCount) {
      handleEditTag(tagWithCount)
    }
  } else if (action.name === '删除') {
    await handleDeleteTag(currentTag.value)
  }
}

async function handleDeleteTag(tag: Tag) {
  const relatedRecords = store.records.filter((record) => record.tags.includes(tag.id))

  if (relatedRecords.length > 0) {
    await showDialog({
      title: '删除确认',
      message: `${relatedRecords.length} 条记录使用了此标签`,
      confirmButtonText: '仅删除标签',
      cancelButtonText: '同时移除引用',
      showCancelButton: true,
      beforeClose: async (action: string) => {
        if (action === 'confirm') {
          store.deleteTag(tag.id)
          showToast('已删除标签')
        } else if (action === 'cancel') {
          for (const record of relatedRecords) {
            const newTags = record.tags.filter((tid) => tid !== tag.id)
            store.updateRecord(record.id, { tags: newTags })
          }
          store.deleteTag(tag.id)
          showToast('已删除标签并移除引用')
        }
        return true
      },
    })
  } else {
    await showConfirmDialog({
      title: '删除确认',
      message: `确定要删除标签"${tag.name}"吗？`,
    }).then(() => {
      store.deleteTag(tag.id)
      showToast('已删除标签')
    }).catch(() => {})
  }
}
</script>

<style scoped lang="less">
.tags-page {
  min-height: 100vh;
  background: #F8FAFC;
  padding-bottom: 100px;
}

.tags-content {
  padding: 72px 16px 24px;
}

.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.tag-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }
}

.tag-color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
}

.tag-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag-count {
  font-size: 12px;
  color: #94A3B8;
  flex-shrink: 0;
}

.tag-more-btn {
  font-size: 18px;
  color: #CBD5E1;
  padding: 4px;
  flex-shrink: 0;

  &:hover {
    color: #64748B;
  }
}

.empty-state {
  padding: 60px 24px;
}

.edit-dialog {
  .dialog-title {
    font-size: 18px;
    font-weight: 600;
    color: #1E293B;
    margin: 0 0 24px;
    text-align: center;
  }

  .form-item {
    margin-bottom: 20px;
  }

  .form-label {
    font-size: 14px;
    font-weight: 500;
    color: #475569;
    margin-bottom: 10px;
    display: block;
  }

  .color-picker {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .color-option {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease;
    border: 3px solid transparent;

    &.active {
      border-color: #1E293B;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .color-custom {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px dashed #CBD5E1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    .color-input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }

    .custom-icon {
      font-size: 16px;
      color: #94A3B8;
    }
  }

  .icon-picker {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .icon-option {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background: #F1F5F9;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;

    &.active {
      background: #ECFDF5;
      border-color: #10B981;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .dialog-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;

    :deep(.van-button) {
      flex: 1;
      height: 44px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>