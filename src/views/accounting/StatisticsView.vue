<template>
  <div class="statistics-view">
    <!-- 月度总览卡片 -->
    <div class="overview-card">
      <div class="overview-header">
        <span class="overview-icon">📊</span>
        <span class="overview-title">{{ dateRangeLabel }} 收支统计</span>
      </div>
      <div class="overview-body">
        <div class="overview-item">
          <span class="overview-label">支出</span>
          <span class="overview-amount expense">-¥{{ totalExpense.toFixed(2) }}</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">收入</span>
          <span class="overview-amount income">+¥{{ totalIncome.toFixed(2) }}</span>
        </div>
      </div>
      <div class="overview-divider"></div>
      <div class="overview-balance">
        <span class="balance-label">结余</span>
        <span :class="['balance-value', balance >= 0 ? 'positive' : 'negative']">
          {{ balance >= 0 ? '+' : '-' }}¥{{ Math.abs(balance).toFixed(2) }}
        </span>
      </div>
    </div>

    <!-- 趋势图表 -->
    <div class="chart-section">
      <div class="section-header">
        <span class="section-title">📈 支出趋势</span>
        <div class="trend-tabs">
          <span
            v-for="tab in trendTabs"
            :key="tab.value"
            :class="['trend-tab', { active: trendMode === tab.value }]"
            @click="trendMode = tab.value"
          >
            {{ tab.label }}
          </span>
        </div>
      </div>
      <div ref="trendChartRef" class="chart-container trend-chart"></div>
    </div>

    <!-- 分类饼图 -->
    <div class="chart-section">
      <div class="section-header">
        <span class="section-title">🏷️ 支出分类占比</span>
      </div>
      <div ref="pieChartRef" class="chart-container pie-chart"></div>
    </div>

    <!-- Top 分类排行 -->
    <div class="ranking-section">
      <div class="section-header">
        <span class="section-title">🏆 支出排行</span>
      </div>
      <div class="ranking-list">
        <div
          v-for="(item, index) in categoryRanking"
          :key="item.name"
          class="ranking-item"
        >
          <div class="ranking-left">
            <span class="rank-badge">{{ rankBadge(index) }}</span>
            <span class="rank-name">{{ item.name }}</span>
          </div>
          <div class="ranking-right">
            <div class="ranking-bar-wrap">
              <div
                class="ranking-bar"
                :style="{ width: item.percent + '%', background: item.color || getCategoryColor(item.name) }"
              ></div>
            </div>
            <span class="rank-amount">¥{{ item.amount.toFixed(0) }}</span>
            <span class="rank-percent">{{ item.percent }}%</span>
          </div>
        </div>
        <van-empty v-if="categoryRanking.length === 0" description="暂无支出数据" image="search" :image-size="80" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import type { AccountingRecord, FilterState } from '@/types/accounting'

interface Props {
  records: AccountingRecord[]
  dateRange: { startDate: string | null; endDate: string | null }
  filterState?: FilterState
}

const props = defineProps<Props>()

const trendChartRef = ref<HTMLDivElement>()
const pieChartRef = ref<HTMLDivElement>()

let trendChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

const trendMode = ref<'day' | 'week' | 'month'>('day')

const trendTabs = [
  { label: '按日', value: 'day' },
  { label: '按周', value: 'week' },
  { label: '按月', value: 'month' },
]

const categoryColors: Record<string, string> = {
  '餐饮': '#EF4444',
  '交通': '#F59E0B',
  '购物': '#8B5CF6',
  '居住': '#3B82F6',
  '医疗': '#EC4899',
  '教育': '#10B981',
  '娱乐': '#F97316',
  '人情': '#EF4444',
  '数码': '#6366F1',
  '旅行': '#14B8A6',
}

function getCategoryColor(category: string): string {
  return categoryColors[category] || '#94A3B8'
}

const dateRangeLabel = computed(() => {
  const { startDate, endDate } = props.dateRange
  if (startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const startStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`
    const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}`
    if (startStr === endStr) {
      return startStr
    }
    return `${startStr} ~ ${endStr}`
  }
  return '全部'
})

const expenseRecords = computed(() => {
  return props.records.filter((r) => r.type === 'expense')
})

const incomeRecords = computed(() => {
  return props.records.filter((r) => r.type === 'income')
})

const totalExpense = computed(() => {
  return expenseRecords.value.reduce((sum, r) => sum + r.amount, 0)
})

const totalIncome = computed(() => {
  return incomeRecords.value.reduce((sum, r) => sum + r.amount, 0)
})

const balance = computed(() => {
  return totalIncome.value - totalExpense.value
})

interface TrendDataPoint {
  label: string
  expense: number
  income: number
}

const trendData = computed<TrendDataPoint[]>(() => {
  const records = props.records
  const mode = trendMode.value

  if (mode === 'day') {
    return aggregateByDay(records)
  } else if (mode === 'week') {
    return aggregateByWeek(records)
  } else {
    return aggregateByMonth(records)
  }
})

function aggregateByDay(records: AccountingRecord[]): TrendDataPoint[] {
  const map = new Map<string, { expense: number; income: number }>()
  for (const r of records) {
    const key = r.date
    if (!map.has(key)) {
      map.set(key, { expense: 0, income: 0 })
    }
    const entry = map.get(key)!
    if (r.type === 'expense') {
      entry.expense += r.amount
    } else {
      entry.income += r.amount
    }
  }

  const sortedKeys = Array.from(map.keys()).sort()
  return sortedKeys.map((key) => {
    const d = new Date(key)
    const entry = map.get(key)!
    return {
      label: `${d.getDate()}日`,
      expense: entry.expense,
      income: entry.income,
    }
  })
}

function aggregateByWeek(records: AccountingRecord[]): TrendDataPoint[] {
  const map = new Map<number, { expense: number; income: number }>()
  for (const r of records) {
    const d = new Date(r.date)
    const startOfYear = new Date(d.getFullYear(), 0, 1)
    const weekNum = Math.floor((d.getTime() - startOfYear.getTime()) / (7 * 86400000))
    if (!map.has(weekNum)) {
      map.set(weekNum, { expense: 0, income: 0 })
    }
    const entry = map.get(weekNum)!
    if (r.type === 'expense') {
      entry.expense += r.amount
    } else {
      entry.income += r.amount
    }
  }

  const sortedKeys = Array.from(map.keys()).sort((a, b) => a - b)
  return sortedKeys.map((key) => ({
    label: `第${key + 1}周`,
    expense: map.get(key)!.expense,
    income: map.get(key)!.income,
  }))
}

function aggregateByMonth(records: AccountingRecord[]): TrendDataPoint[] {
  const map = new Map<string, { expense: number; income: number }>()
  for (const r of records) {
    const d = new Date(r.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!map.has(key)) {
      map.set(key, { expense: 0, income: 0 })
    }
    const entry = map.get(key)!
    if (r.type === 'expense') {
      entry.expense += r.amount
    } else {
      entry.income += r.amount
    }
  }

  const sortedKeys = Array.from(map.keys()).sort()
  return sortedKeys.map((key) => {
    const [year, month] = key.split('-')
    return {
      label: `${parseInt(month)}月`,
      expense: map.get(key)!.expense,
      income: map.get(key)!.income,
    }
  })
}

interface CategoryItem {
  name: string
  amount: number
  percent: number
  color?: string
}

const categoryRanking = computed<CategoryItem[]>(() => {
  const expenses = expenseRecords.value
  if (expenses.length === 0) return []

  const map = new Map<string, number>()
  for (const r of expenses) {
    const cat = r.category || '其他'
    map.set(cat, (map.get(cat) || 0) + r.amount)
  }

  const total = totalExpense.value
  const items: CategoryItem[] = Array.from(map.entries())
    .map(([name, amount]) => ({
      name,
      amount,
      percent: total > 0 ? Math.round((amount / total) * 100 * 100) / 100 : 0,
      color: getCategoryColor(name),
    }))
    .sort((a, b) => b.amount - a.amount)

  return items.slice(0, 5)
})

const pieChartData = computed(() => {
  const expenses = expenseRecords.value
  if (expenses.length === 0) return []

  const map = new Map<string, number>()
  for (const r of expenses) {
    const cat = r.category || '其他'
    map.set(cat, (map.get(cat) || 0) + r.amount)
  }

  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    value,
    itemStyle: { color: getCategoryColor(name) },
  })).sort((a, b) => b.value - a.value)
})

function getTrendOption() {
  const data = trendData.value
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter(params: unknown) {
        const items = params as Array<{ seriesName: string; value: number; marker: string }>
        let html = `<div style="font-weight:600;margin-bottom:4px">${items[0]?.axisValue}</div>`
        for (const p of items) {
          const color = p.seriesName === '支出' ? '#EF4444' : '#10B981'
          html += `<div>${p.marker}${p.seriesName}: <b style="color:${color}">¥${p.value?.toFixed(2)}</b></div>`
        }
        return html
      },
    },
    legend: {
      data: ['支出', '收入'],
      top: 0,
      right: 0,
      textStyle: { fontSize: 12, color: '#64748B' },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 16,
    },
    grid: {
      top: 40,
      left: 12,
      right: 12,
      bottom: 24,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.label),
      axisLabel: {
        fontSize: 11,
        color: '#94A3B8',
        interval: data.length > 15 ? 'auto' : 0,
        rotate: data.length > 15 ? 45 : 0,
      },
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 11,
        color: '#94A3B8',
        formatter: (val: number) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : String(val)),
      },
      splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' as const } },
    },
    series: [
      {
        name: '支出',
        type: 'bar',
        data: data.map((d) => d.expense),
        barMaxWidth: 20,
        barGap: '10%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FCA5A5' },
            { offset: 1, color: '#EF4444' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: '收入',
        type: 'bar',
        data: data.map((d) => d.income),
        barMaxWidth: 20,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#6EE7B7' },
            { offset: 1, color: '#10B981' },
          ]),
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  } as echarts.EChartsOption
}

function getPieOption() {
  const data = pieChartData.value
  const centerText = `¥${totalExpense.value.toFixed(0)}`
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: ¥{c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { fontSize: 12, color: '#64748B' },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 12,
      formatter: (name: string) => {
        const item = data.find((d) => d.name === name)
        const percent = item ? ((item.value / totalExpense.value) * 100).toFixed(0) : 0
        return `${name} ${percent}%`
      },
    },
    graphic: data.length > 0
      ? {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: centerText,
            textAlign: 'center',
            fill: '#1E293B',
            fontSize: 18,
            fontWeight: 700,
          },
        }
      : undefined,
    series: [
      {
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['38%', '50%'],
        avoidLabelOverlap: true,
        padAngle: 2,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 13,
            fontWeight: 600,
            formatter: '{b}\n{d}%',
          },
        },
        labelLine: { show: false },
        data: data,
      },
    ],
  } as echarts.EChartsOption
}

function initTrendChart() {
  if (!trendChartRef.value) return
  trendChart = echarts.init(trendChartRef.value)
  trendChart.setOption(getTrendOption())
}

function initPieChart() {
  if (!pieChartRef.value) return
  pieChart = echarts.init(pieChartRef.value)
  pieChart.setOption(getPieOption())
}

function updateCharts() {
  nextTick(() => {
    if (trendChart) {
      trendChart.setOption(getTrendOption(), true)
    }
    if (pieChart) {
      pieChart.setOption(getPieOption(), false)
    }
  })
}

function handleResize() {
  trendChart?.resize()
  pieChart?.resize()
}

function rankBadge(index: number): string {
  if (index === 0) return '🥇'
  if (index === 1) return '🥈'
  if (index === 2) return '🥉'
  return `${index + 1}`
}

watch(trendMode, () => {
  updateCharts()
})

watch(
  () => props.records,
  () => {
    updateCharts()
  },
  { deep: true }
)

onMounted(() => {
  nextTick(() => {
    initTrendChart()
    initPieChart()

    if (trendChartRef.value || pieChartRef.value) {
      resizeObserver = new ResizeObserver(handleResize)
      if (trendChartRef.value) resizeObserver.observe(trendChartRef.value)
      if (pieChartRef.value) resizeObserver.observe(pieChartRef.value)
    }
  })
})

onBeforeUnmount(() => {
  trendChart?.dispose()
  pieChart?.dispose()
  resizeObserver?.disconnect()
})
</script>

<style scoped lang="less">
.statistics-view {
  min-height: 100vh;
  background: #F8FAFC;
  padding-bottom: 24px;
}

// 月度总览卡片
.overview-card {
  margin: 12px 16px;
  padding: 24px 20px;
  background: linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #06B6D4 100%);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.25);
  color: #ffffff;

  .overview-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;

    .overview-icon {
      font-size: 20px;
    }

    .overview-title {
      font-size: 17px;
      font-weight: 600;
      opacity: 0.95;
    }
  }

  .overview-body {
    display: flex;
    justify-content: space-around;
    margin-bottom: 16px;
  }

  .overview-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    .overview-label {
      font-size: 13px;
      opacity: 0.8;
    }

    .overview-amount {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.5px;

      &.expense {
        text-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
      }

      &.income {
        text-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
      }
    }
  }

  .overview-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin-bottom: 16px;
  }

  .overview-balance {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .balance-label {
      font-size: 14px;
      opacity: 0.85;
    }

    .balance-value {
      font-size: 22px;
      font-weight: 700;

      &.positive {
        color: #A7F3D0;
        text-shadow: 0 2px 6px rgba(16, 185, 129, 0.25);
      }

      &.negative {
        color: #FECACA;
        text-shadow: 0 2px 6px rgba(239, 68, 68, 0.25);
      }
    }
  }
}

// 图表区域通用样式
.chart-section {
  margin: 16px 16px 0;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .section-title {
      font-size: 15px;
      font-weight: 600;
      color: #1E293B;
    }
  }

  .chart-container {
    width: 100%;
  }

  .trend-chart {
    height: 300px;
  }

  .pie-chart {
    height: 280px;
  }
}

// 趋势切换标签
.trend-tabs {
  display: flex;
  gap: 4px;
  background: #F1F5F9;
  border-radius: 8px;
  padding: 2px;

  .trend-tab {
    padding: 4px 12px;
    font-size: 12px;
    color: #64748B;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;

    &:active {
      transform: scale(0.95);
    }

    &.active {
      background: #ffffff;
      color: #7C3AED;
      font-weight: 600;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }
  }
}

// 排行区域
.ranking-section {
  margin: 16px 16px 0;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .section-header {
    margin-bottom: 12px;

    .section-title {
      font-size: 15px;
      font-weight: 600;
      color: #1E293B;
    }
  }

  .ranking-list {
    .ranking-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #F1F5F9;

      &:last-child {
        border-bottom: none;
      }

      .ranking-left {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;

        .rank-badge {
          font-size: 16px;
          width: 28px;
          text-align: center;
          font-weight: 600;
          color: #64748B;
        }

        .rank-name {
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          max-width: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .ranking-right {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        justify-content: flex-end;

        .ranking-bar-wrap {
          width: 72px;
          height: 6px;
          background: #E2E8F0;
          border-radius: 3px;
          overflow: hidden;

          .ranking-bar {
            height: 100%;
            border-radius: 3px;
            transition: width 0.4s ease;
          }
        }

        .rank-amount {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          min-width: 52px;
          text-align: right;
        }

        .rank-percent {
          font-size: 12px;
          color: #94A3B8;
          min-width: 36px;
          text-align: right;
        }
      }
    }
  }
}
</style>
