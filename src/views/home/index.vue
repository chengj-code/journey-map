<template>
  <div class="home-page bg-[#F8FAFC] min-h-screen pb-6">
    <header class="nav-bar">
      <div class="nav-content">
        <h1 class="nav-title">
          <span class="nav-icon">🗺️</span>
          足迹地图
        </h1>
        <div class="nav-actions">
          <button class="nav-btn" @click="handleSearch">
            <span class="action-icon">🔍</span>
          </button>
          <button class="nav-btn" @click="handleNotification">
            <span class="action-icon">🔔</span>
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <section class="hero-card" @click="goToMap">
        <div class="hero-header">
          <span class="hero-title">📍 我的足迹</span>
        </div>
        <div class="hero-stats">
          <div class="stat-number">{{ totalVisited }}</div>
          <div class="stat-subtitle">省级 {{ provinceCount }} · 市级 {{ cityCount }}</div>
        </div>
        <button class="cta-button">
          查看地图 →
        </button>
      </section>

      <section class="quick-actions">
        <div
          v-for="action in quickActions"
          :key="action.name"
          class="action-card"
          @click="navigateTo(action.path)"
        >
          <div class="action-icon-wrapper">
            <span class="action-icon-large">{{ action.icon }}</span>
          </div>
          <span class="action-name">{{ action.name }}</span>
        </div>
      </section>

      <section class="recent-section">
        <div class="section-header">
          <h2 class="section-title">最近点亮</h2>
          <span class="view-all" @click="goToStatistics">查看全部 ></span>
        </div>

        <div v-if="recentItems.length > 0" class="recent-list">
          <div
            v-for="(item, index) in recentItems"
            :key="index"
            class="recent-item"
          >
            <IconProvince
              :province-name="item.name"
              :label="item.label"
              :size="32"
            />
            <div class="item-info">
              <span class="item-name">{{ item.displayName || item.name }}</span>
            </div>
            <span class="item-date">{{ item.date }}</span>
          </div>
        </div>

        <div v-else class="empty-state">
          <span class="empty-icon">🌍</span>
          <p class="empty-text">暂无点亮记录，快去探索吧！</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMapStore } from '@/store';
import { IconProvince } from '@/components/icons';

const router = useRouter();
const mapStore = useMapStore();

const quickActions = [
  { icon: '🗺️', name: '地图', path: '/map' },
  { icon: '📊', name: '统计', path: '/statistics' },
  { icon: '🎨', name: '图标库', path: '/icon-gallery' },
  { icon: '⭐', name: '收藏', path: '#' },
];

const provinceCount = computed(() => mapStore.provinceData.length);
const cityCount = computed(() => mapStore.cityData.length);
const totalVisited = computed(() => provinceCount.value + cityCount.value);

const recentItems = computed(() => {
  const allItems = [
    ...mapStore.provinceData.map(item => ({
      ...item,
      label: item.name.slice(0, 2),
      date: formatDate(item.name),
    })),
    ...mapStore.cityData.map(item => ({
      ...item,
      label: (item.fullName || item.name)?.slice(0, 2) || '??',
      displayName: item.fullName || item.name,
      date: formatDate(item.name),
    })),
  ];
  return allItems.slice(-5).reverse();
});

function formatDate(_name: string): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}

function goToMap() {
  router.push('/map');
}

function goToStatistics() {
  router.push('/statistics');
}

function navigateTo(path: string) {
  if (path !== '#') {
    router.push(path);
  }
}

function handleSearch() {
  console.log('搜索功能');
}

function handleNotification() {
  console.log('通知功能');
}
</script>

<style scoped lang="less">
.home-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 56px;
  background: #ffffff;
  border-bottom: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 16px;
}

.nav-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.nav-icon {
  font-size: 22px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: #F1F5F9;
  }

  &:active {
    background: #E2E8F0;
  }
}

.action-icon {
  font-size: 20px;
}

.main-content {
  padding-top: 0;
}

.hero-card {
  margin: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #134E4A 100%);
  border-radius: 20px;
  color: white;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
}

.hero-header {
  margin-bottom: 16px;
}

.hero-title {
  font-size: 16px;
  font-weight: 600;
  opacity: 0.95;
}

.hero-stats {
  margin-bottom: 20px;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #10B981;
  line-height: 1.2;
  margin-bottom: 8px;
}

.stat-subtitle {
  font-size: 14px;
  opacity: 0.8;
  font-weight: 400;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  &:active {
    background: rgba(255, 255, 255, 0.1);
  }
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 0 16px;
  margin-top: 24px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 12px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(-1px);
  }
}

.action-icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ECFDF5;
  border-radius: 12px;
}

.action-icon-large {
  font-size: 22px;
  color: #10B981;
}

.action-name {
  font-size: 14px;
  color: #1E293B;
  font-weight: 500;
}

.recent-section {
  padding: 0 16px;
  margin-top: 28px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
}

.view-all {
  font-size: 14px;
  color: #10B981;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #059669;
  }

  &:active {
    opacity: 0.7;
  }
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  }
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 16px;
  font-weight: 500;
  color: #1E293B;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-date {
  font-size: 12px;
  color: #94A3B8;
  flex-shrink: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.6;
}

.empty-text {
  font-size: 14px;
  color: #94A3B8;
  margin: 0;
  text-align: center;
}
</style>
