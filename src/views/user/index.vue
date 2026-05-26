<template>
  <div class="user-page bg-[#F8FAFC] min-h-screen pb-20">
    <!-- 用户信息头部 -->
    <section class="profile-header">
      <div class="header-content">
        <img class="avatar" :src="avatar" alt="头像">
        <div class="user-info">
          <h2 class="nickname">布布</h2>
          <p class="phone">198****0822</p>
          <span class="edit-link">编辑资料 ></span>
        </div>
      </div>
    </section>

    <!-- 数据统计卡片区 -->
    <section class="stats-section">
      <h3 class="stats-title">我的足迹</h3>
      <div class="stats-grid">
        <div class="stat-card bg-white rounded-2xl p-4 text-center shadow-sm">
          <div class="stat-number text-[28px] font-bold text-[#10B981]">{{ totalCount }}</div>
          <div class="stat-label text-[12px] text-[#64748B] mt-1">总计</div>
        </div>
        <div class="stat-card bg-white rounded-2xl p-4 text-center shadow-sm">
          <div class="stat-number text-[28px] font-bold text-[#3B82F6]">{{ provinceCount }}</div>
          <div class="stat-label text-[12px] text-[#64748B] mt-1">省级</div>
        </div>
        <div class="stat-card bg-white rounded-2xl p-4 text-center shadow-sm">
          <div class="stat-number text-[28px] font-bold text-[#8B5CF6]">{{ cityCount }}</div>
          <div class="stat-label text-[12px] text-[#64748B] mt-1">市级</div>
        </div>
      </div>
    </section>

    <!-- 功能菜单列表 -->
    <section class="menu-list">
      <van-cell-group :border="false">
        <van-cell
          title="图标设置"
          icon="brush-o"
          is-link
          to="/icon-gallery"
          custom-class="menu-item"
        />
        <van-cell
          title="点亮历史"
          icon="chart-trending-o"
          is-link
          to="/statistics"
          custom-class="menu-item"
        />
        <van-cell
          title="应用设置"
          icon="setting-o"
          is-link
          custom-class="menu-item"
        />
        <van-cell
          title="帮助与反馈"
          icon="info-o"
          is-link
          custom-class="menu-item"
        />
        <van-cell
          title="关于我们"
          icon="description"
          is-link
          custom-class="menu-item"
        />
      </van-cell-group>
    </section>

    <!-- 退出登录按钮 -->
    <section class="logout-section">
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showDialog, showToast } from 'vant'
import { useMapStore } from '@/store/mapStore'
import avatar from '@/assets/images/avator.jfif'

const router = useRouter()
const mapStore = useMapStore()

const totalCount = computed(() => mapStore.provinceData.length + mapStore.cityData.length)
const provinceCount = computed(() => mapStore.provinceData.length)
const cityCount = computed(() => mapStore.cityData.length)

const handleLogout = () => {
  showDialog({
    title: '提示',
    message: '确定要退出登录吗？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    localStorage.removeItem('user-token')
    showToast('已退出登录')
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }).catch(() => {
    // 用户点击了取消
  })
}
</script>

<style scoped lang="less">
.user-page {
  background-color: #F8FAFC;
}

.profile-header {
  background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%);
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;

  .header-content {
    display: flex;
    align-items: center;
    gap: 20px;

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 3px solid #FFFFFF;
      object-fit: cover;
      flex-shrink: 0;
    }

    .user-info {
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .nickname {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
        line-height: 1.3;
      }

      .phone {
        font-size: 14px;
        opacity: 0.7;
        margin: 0;
        line-height: 1.3;
      }

      .edit-link {
        font-size: 12px;
        opacity: 0.5;
        margin-top: 4px;
        cursor: pointer;
        
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}

.stats-section {
  margin-top: -40px;
  padding: 0 16px;
  position: relative;
  z-index: 10;

  .stats-title {
    font-size: 18px;
    font-weight: 600;
    color: #1E293B;
    margin: 16px 0;
    padding-left: 4px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    .stat-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:active {
        transform: scale(0.98);
      }
    }
  }
}

.menu-list {
  margin: 24px 16px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  :deep(.van-cell) {
    height: 56px;
    align-items: center;
    padding: 0 16px;
    
    &::after {
      left: 44px;
      right: 16px;
      border-color: #F1F5F9;
    }

    &:last-child::after {
      display: none;
    }

    .van-cell__left-icon {
      font-size: 20px;
      color: #10B981;
      margin-right: 12px;
      
      &:nth-child(2) {
        color: #3B82F6;
      }
      
      &:nth-child(3) {
        color: #64748B;
      }
    }

    .van-cell__title {
      font-size: 16px;
      color: #1E293B;
      font-weight: 400;
    }

    .van-cell__right-icon {
      color: #CBD5E1;
      font-size: 16px;
    }
  }

  // 特定菜单项图标颜色
  :deep(.van-cell:nth-child(1) .van-cell__left-icon) {
    color: #10B981; // 图标设置 - 绿色
  }

  :deep(.van-cell:nth-child(2) .van-cell__left-icon) {
    color: #3B82F6; // 点亮历史 - 蓝色
  }

  :deep(.van-cell:nth-child(3) .van-cell__left-icon),
  :deep(.van-cell:nth-child(4) .van-cell__left-icon),
  :deep(.van-cell:nth-child(5) .van-cell__left-icon) {
    color: #64748B; // 其他菜单项 - 灰色
  }
}

.logout-section {
  margin: 32px 16px;

  .logout-btn {
    width: 100%;
    height: 48px;
    background: white;
    border: 1px solid #FEE2E2;
    border-radius: 12px;
    color: #EF4444;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;

    &:active {
      background: #FEF2F2;
      transform: scale(0.99);
    }

    &:hover {
      border-color: #FCA5A5;
    }
  }
}
</style>
