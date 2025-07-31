<template>
  <div class="statistics-container">
    <div class="page-header">
      <h2>成绩统计</h2>
      <p class="page-subtitle">分析学生学习成绩，提供详细的数据洞察</p>
    </div>

    <!-- 统计概览 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ totalStudents }}</div>
          <div class="stat-label">参与学生</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-s-marketing"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ averageScore }}</div>
          <div class="stat-label">平均分</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-s-opportunity"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ passRate }}%</div>
          <div class="stat-label">及格率</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-trophy"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ excellentRate }}%</div>
          <div class="stat-label">优秀率</div>
        </div>
      </div>
    </div>

    <!-- 考试选择 -->
    <div class="exam-selector">
      <div class="selector-header">
        <h3>选择考试</h3>
        <div class="selector-controls">
          <button class="control-btn" @click="refreshData">
            <i class="el-icon-refresh"></i>
            刷新数据
          </button>
        </div>
      </div>
      <div class="exam-tabs">
        <button 
          v-for="exam in exams" 
          :key="exam.id"
          class="exam-tab"
          :class="{ active: currentExam === exam.id }"
          @click="selectExam(exam.id)"
        >
          <span class="exam-name">{{ exam.name }}</span>
          <span class="exam-date">{{ exam.date }}</span>
        </button>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-section">
      <div class="chart-row">
        <div class="chart-card">
          <div class="chart-header">
            <h4>分数分布</h4>
            <div class="chart-legend">
              <span class="legend-item">
                <span class="legend-color" style="background: #42a5f5"></span>
                学生人数
              </span>
            </div>
          </div>
          <div class="chart-container" ref="scoreDistribution"></div>
        </div>
        
        <div class="chart-card">
          <div class="chart-header">
            <h4>及格率统计</h4>
            <div class="chart-legend">
              <span class="legend-item">
                <span class="legend-color" style="background: #4caf50"></span>
                及格
              </span>
              <span class="legend-item">
                <span class="legend-color" style="background: #f44336"></span>
                不及格
              </span>
            </div>
          </div>
          <div class="chart-container" ref="passRate"></div>
        </div>
      </div>
    </div>

    <!-- 成绩排名 -->
    <div class="ranking-section">
      <div class="section-header">
        <h3>成绩排名</h3>
        <div class="ranking-controls">
          <button class="control-btn" @click="exportRanking">
            <i class="el-icon-download"></i>
            导出排名
          </button>
        </div>
      </div>
      
      <div class="ranking-table">
        <div class="table-header">
          <div class="header-cell">排名</div>
          <div class="header-cell">学号</div>
          <div class="header-cell">姓名</div>
          <div class="header-cell">班级</div>
          <div class="header-cell">分数</div>
          <div class="header-cell">状态</div>
        </div>
        
        <div 
          v-for="(score, index) in scores" 
          :key="score.studentId"
          class="table-row"
          :class="{ 'top-three': index < 3 }"
        >
          <div class="table-cell rank">
            <span class="rank-number">{{ score.rank }}</span>
            <i v-if="index < 3" class="rank-icon el-icon-trophy"></i>
          </div>
          <div class="table-cell">{{ score.studentId }}</div>
          <div class="table-cell">{{ score.name }}</div>
          <div class="table-cell">{{ score.class }}</div>
          <div class="table-cell score" :class="{ 'fail': score.score < 60 }">
            {{ score.score }}
          </div>
          <div class="table-cell">
            <span class="status-badge" :class="getScoreStatus(score.score)">
              {{ getScoreStatusText(score.score) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Statistics',
  data() {
    return {
      currentExam: 1,
      totalStudents: 86,
      averageScore: 78,
      passRate: 85,
      excellentRate: 25,
      exams: [
        { id: 1, name: '期中考试', date: '2024-01-15' },
        { id: 2, name: '期末考试', date: '2024-01-30' }
      ],
      scores: [
        { rank: 1, studentId: '2024001', name: '张三', class: '计算机科学与技术1班', score: 95 },
        { rank: 2, studentId: '2024002', name: '李四', class: '计算机科学与技术1班', score: 88 },
        { rank: 3, studentId: '2024003', name: '王五', class: '计算机科学与技术1班', score: 85 },
        { rank: 4, studentId: '2024004', name: '赵六', class: '计算机科学与技术2班', score: 82 },
        { rank: 5, studentId: '2024005', name: '钱七', class: '计算机科学与技术2班', score: 78 },
        { rank: 6, studentId: '2024006', name: '孙八', class: '计算机科学与技术1班', score: 45 }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts()
      window.addEventListener('resize', this.handleResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.scoreChart) {
      this.scoreChart.dispose()
    }
    if (this.passChart) {
      this.passChart.dispose()
    }
  },
  methods: {
    selectExam(examId) {
      this.currentExam = examId
      this.updateCharts()
    },
    refreshData() {
      this.$message.success('数据已刷新')
      this.updateCharts()
    },
    exportRanking() {
      this.$message.info('导出排名功能开发中...')
    },
    getScoreStatus(score) {
      if (score >= 90) return 'excellent'
      if (score >= 80) return 'good'
      if (score >= 60) return 'pass'
      return 'fail'
    },
    getScoreStatusText(score) {
      if (score >= 90) return '优秀'
      if (score >= 80) return '良好'
      if (score >= 60) return '及格'
      return '不及格'
    },
    initCharts() {
      this.initScoreDistribution()
      this.initPassRate()
    },
    initScoreDistribution() {
      if (!this.$refs.scoreDistribution) return
      
      this.scoreChart = echarts.init(this.$refs.scoreDistribution)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['0-60', '60-70', '70-80', '80-90', '90-100'],
          axisLine: { lineStyle: { color: '#ddd' } },
          axisLabel: { color: '#666' }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: '#666' },
          splitLine: { lineStyle: { color: '#eee' } }
        },
        series: [{
          name: '学生人数',
          type: 'bar',
          data: [5, 12, 25, 30, 14],
          itemStyle: { color: '#42a5f5' },
          barWidth: '60%'
        }]
      }
      this.scoreChart.setOption(option)
    },
    initPassRate() {
      if (!this.$refs.passRate) return
      
      this.passChart = echarts.init(this.$refs.passRate)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [{
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: { show: false },
          data: [
            { value: 73, name: '及格', itemStyle: { color: '#4caf50' } },
            { value: 13, name: '不及格', itemStyle: { color: '#f44336' } }
          ]
        }]
      }
      this.passChart.setOption(option)
    },
    updateCharts() {
      // 根据选择的考试更新图表数据
      if (this.scoreChart) {
        this.scoreChart.resize()
      }
      if (this.passChart) {
        this.passChart.resize()
      }
    },
    handleResize() {
      if (this.scoreChart) {
        this.scoreChart.resize()
      }
      if (this.passChart) {
        this.passChart.resize()
      }
    }
  }
}
</script>

<style scoped>
.statistics-container {
  padding: 1.5rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.page-subtitle {
  color: #666;
  font-size: 1rem;
}

/* 统计概览 */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42a5f5;
  font-size: 1.25rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

/* 考试选择器 */
.exam-selector {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.selector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.selector-header h3 {
  color: #333;
  font-size: 1.2rem;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e3f2fd;
  background: white;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  border-color: #42a5f5;
  color: #42a5f5;
}

.exam-tabs {
  display: flex;
  gap: 1rem;
}

.exam-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e3f2fd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.exam-tab.active {
  border-color: #42a5f5;
  background: #e3f2fd;
}

.exam-tab:hover:not(.active) {
  border-color: #42a5f5;
}

.exam-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
}

.exam-date {
  font-size: 0.8rem;
  color: #666;
}

/* 图表区域 */
.charts-section {
  margin-bottom: 2rem;
}

.chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-header h4 {
  color: #333;
  font-size: 1.1rem;
}

.chart-legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.chart-container {
  height: 300px;
}

/* 成绩排名 */
.ranking-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h3 {
  color: #333;
  font-size: 1.2rem;
}

.ranking-table {
  border: 1px solid #e3f2fd;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 120px 120px 1fr 100px 100px;
  background: #f8f9fa;
  padding: 1rem;
  font-weight: 500;
  color: #333;
}

.header-cell {
  text-align: center;
}

.table-row {
  display: grid;
  grid-template-columns: 80px 120px 120px 1fr 100px 100px;
  padding: 1rem;
  border-bottom: 1px solid #e3f2fd;
  transition: background-color 0.3s ease;
}

.table-row:hover {
  background: #f8f9fa;
}

.table-row.top-three {
  background: #fff8e1;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.rank {
  position: relative;
}

.rank-number {
  font-weight: 600;
  color: #333;
}

.rank-icon {
  position: absolute;
  top: -8px;
  right: -8px;
  color: #ff9800;
  font-size: 0.8rem;
}

.score {
  font-weight: 600;
  color: #333;
}

.score.fail {
  color: #f44336;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.excellent {
  background: #e8f5e8;
  color: #4caf50;
}

.status-badge.good {
  background: #e3f2fd;
  color: #2196f3;
}

.status-badge.pass {
  background: #fff3e0;
  color: #ff9800;
}

.status-badge.fail {
  background: #ffebee;
  color: #f44336;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .statistics-container {
    padding: 1rem;
  }
  
  .stats-overview {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .chart-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .exam-tabs {
    flex-direction: column;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 60px 80px 80px 1fr 60px 80px;
    font-size: 0.9rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
}
</style> 