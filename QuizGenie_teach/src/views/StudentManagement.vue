<template>
  <div class="student-management-container">
    <div class="page-header">
      <h2>学生管理</h2>
      <p class="page-subtitle">管理学生信息，查看学习进度和成绩统计</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-user"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ students.length }}</div>
          <div class="stat-label">学生总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-s-data"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ getActiveStudents() }}</div>
          <div class="stat-label">活跃学生</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-s-marketing"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ getAverageScore() }}</div>
          <div class="stat-label">平均成绩</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-s-opportunity"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ getTopStudents() }}</div>
          <div class="stat-label">优秀学生</div>
        </div>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="actions-section">
      <div class="search-box">
        <i class="el-icon-search"></i>
        <input 
          v-model="searchQuery" 
          placeholder="搜索学生姓名或学号..."
          @input="handleSearch"
        >
      </div>
      <div class="action-buttons">
        <button class="action-btn primary" @click="handleAdd">
          <i class="el-icon-plus"></i>
          添加学生
        </button>
        <button class="action-btn" @click="handleImport">
          <i class="el-icon-upload"></i>
          批量导入
        </button>
        <button class="action-btn" @click="handleExport">
          <i class="el-icon-download"></i>
          导出名单
        </button>
      </div>
    </div>

    <!-- 学生列表 -->
    <div class="students-section">
      <div class="section-header">
        <h3>学生列表</h3>
        <div class="filter-tabs">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            class="filter-tab"
            :class="{ active: selectedFilter === filter.value }"
            @click="selectedFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <div class="students-grid">
        <div 
          v-for="student in filteredStudents" 
          :key="student.id"
          class="student-card"
        >
          <div class="student-header">
            <div class="student-avatar">
              <i class="el-icon-user"></i>
            </div>
            <div class="student-info">
              <h4>{{ student.name }}</h4>
              <p class="student-id">{{ student.id }}</p>
            </div>
            <div class="student-actions">
              <button class="action-icon" @click="handleEdit(student)" title="编辑">
                <i class="el-icon-edit"></i>
              </button>
              <button class="action-icon delete" @click="handleDelete(student)" title="删除">
                <i class="el-icon-delete"></i>
              </button>
            </div>
          </div>
          
          <div class="student-details">
            <div class="detail-item">
              <span class="label">班级：</span>
              <span class="value">{{ student.class }}</span>
            </div>
            <div class="detail-item">
              <span class="label">邮箱：</span>
              <span class="value">{{ student.email }}</span>
            </div>
            <div class="detail-item">
              <span class="label">状态：</span>
              <span class="status" :class="student.status">
                {{ getStatusText(student.status) }}
              </span>
            </div>
          </div>

          <div class="student-stats">
            <div class="stat-item">
              <span class="stat-label">答题数</span>
              <span class="stat-value">{{ student.questionCount || 0 }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">正确率</span>
              <span class="stat-value">{{ student.correctRate || 0 }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">平均分</span>
              <span class="stat-value">{{ student.averageScore || 0 }}</span>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="filteredStudents.length === 0" class="empty-state">
          <i class="el-icon-user"></i>
          <p v-if="searchQuery">未找到匹配的学生</p>
          <p v-else>暂无学生信息，点击"添加学生"开始创建</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentManagement',
  data() {
    return {
      searchQuery: '',
      selectedFilter: 'all',
      students: [
        {
          id: '2024001',
          name: '张三',
          class: '计算机科学与技术1班',
          email: 'zhangsan@example.com',
          status: 'active',
          questionCount: 45,
          correctRate: 85,
          averageScore: 88
        },
        {
          id: '2024002',
          name: '李四',
          class: '计算机科学与技术1班',
          email: 'lisi@example.com',
          status: 'active',
          questionCount: 38,
          correctRate: 78,
          averageScore: 82
        },
        {
          id: '2024003',
          name: '王五',
          class: '计算机科学与技术2班',
          email: 'wangwu@example.com',
          status: 'inactive',
          questionCount: 12,
          correctRate: 65,
          averageScore: 72
        }
      ],
      filters: [
        { label: '全部', value: 'all' },
        { label: '活跃', value: 'active' },
        { label: '非活跃', value: 'inactive' }
      ]
    }
  },
  computed: {
    filteredStudents() {
      let filtered = this.students
      
      // 按状态筛选
      if (this.selectedFilter !== 'all') {
        filtered = filtered.filter(s => s.status === this.selectedFilter)
      }
      
      // 按搜索关键词筛选
      if (this.searchQuery) {
        filtered = filtered.filter(s => 
          s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          s.id.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      
      return filtered
    }
  },
  methods: {
    getActiveStudents() {
      return this.students.filter(s => s.status === 'active').length
    },
    getAverageScore() {
      const scores = this.students.map(s => s.averageScore).filter(s => s > 0)
      if (scores.length === 0) return 0
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    },
    getTopStudents() {
      return this.students.filter(s => s.averageScore >= 85).length
    },
    getStatusText(status) {
      return status === 'active' ? '活跃' : '非活跃'
    },
    handleSearch() {
      // 搜索逻辑已在计算属性中处理
    },
    handleAdd() {
      this.$message.info('添加学生功能开发中...')
    },
    handleEdit(student) {
      this.$message.info(`编辑学生：${student.name}`)
    },
    handleDelete(student) {
      this.$confirm(`确认删除学生"${student.name}"吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.students.findIndex(s => s.id === student.id)
        if (index > -1) {
          this.students.splice(index, 1)
        }
        this.$message.success('删除成功！')
      }).catch(() => {})
    },
    handleImport() {
      this.$message.info('批量导入功能开发中...')
    },
    handleExport() {
      this.$message.info('导出名单功能开发中...')
    }
  }
}
</script>

<style scoped>
.student-management-container {
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

/* 统计卡片 */
.stats-section {
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

/* 操作区域 */
.actions-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e3f2fd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #42a5f5;
  box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.1);
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: #42a5f5;
  color: white;
}

.action-btn.primary:hover {
  background: #2196f3;
}

.action-btn:not(.primary) {
  background: white;
  color: #666;
  border: 1px solid #e3f2fd;
}

.action-btn:not(.primary):hover {
  background: #f8f9fa;
  border-color: #42a5f5;
  color: #42a5f5;
}

/* 学生列表 */
.students-section {
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

.filter-tabs {
  display: flex;
  gap: 0.5rem;
}

.filter-tab {
  padding: 0.5rem 1rem;
  border: 1px solid #e3f2fd;
  background: white;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab.active {
  background: #42a5f5;
  color: white;
  border-color: #42a5f5;
}

.filter-tab:hover:not(.active) {
  border-color: #42a5f5;
  color: #42a5f5;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.student-card {
  border: 1px solid #e3f2fd;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.student-card:hover {
  border-color: #42a5f5;
  box-shadow: 0 4px 12px rgba(66, 165, 245, 0.1);
}

.student-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.student-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42a5f5;
  font-size: 1.5rem;
}

.student-info {
  flex: 1;
}

.student-info h4 {
  color: #333;
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
}

.student-id {
  color: #666;
  font-size: 0.9rem;
}

.student-actions {
  display: flex;
  gap: 0.5rem;
}

.action-icon {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-icon:hover {
  background: #f8f9fa;
  color: #42a5f5;
}

.action-icon.delete:hover {
  background: #ffebee;
  color: #f44336;
}

.student-details {
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.detail-item .label {
  color: #666;
}

.detail-item .value {
  color: #333;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status.active {
  background: #e8f5e8;
  color: #4caf50;
}

.status.inactive {
  background: #ffebee;
  color: #f44336;
}

.student-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.stat-item {
  text-align: center;
}

.stat-item .stat-label {
  display: block;
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.stat-item .stat-value {
  display: block;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  grid-column: 1 / -1;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ccc;
}

.empty-state p {
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .student-management-container {
    padding: 1rem;
  }
  
  .stats-section {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .actions-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .filter-tabs {
    justify-content: center;
  }
  
  .students-grid {
    grid-template-columns: 1fr;
  }
}
</style> 