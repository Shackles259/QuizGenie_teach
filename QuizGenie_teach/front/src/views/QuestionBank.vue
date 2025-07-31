<template>
  <div class="question-bank-container">
    <div class="page-header">
      <h2>题库管理</h2>
      <p class="page-subtitle">管理和创建题目，支持多种题型和难度设置</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-document"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ questions.length }}</div>
          <div class="stat-label">题目总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-edit-outline"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ getQuestionTypeCount('single') }}</div>
          <div class="stat-label">单选题</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-s-check"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ getQuestionTypeCount('multiple') }}</div>
          <div class="stat-label">多选题</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <i class="el-icon-edit"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ getQuestionTypeCount('essay') }}</div>
          <div class="stat-label">问答题</div>
        </div>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="actions-section">
      <div class="search-box">
        <i class="el-icon-search"></i>
        <input 
          v-model="searchQuery" 
          placeholder="搜索题目..."
          @input="handleSearch"
        >
      </div>
      <div class="action-buttons">
        <button class="action-btn primary" @click="handleAdd">
          <i class="el-icon-plus"></i>
          添加题目
        </button>
        <button class="action-btn" @click="handleImport">
          <i class="el-icon-upload"></i>
          导入题目
        </button>
        <button class="action-btn" @click="handleExport">
          <i class="el-icon-download"></i>
          导出题目
        </button>
      </div>
    </div>

    <!-- 题目列表 -->
    <div class="questions-section">
      <div class="section-header">
        <h3>题目列表</h3>
        <div class="filter-tabs">
          <button 
            v-for="type in questionTypes" 
            :key="type.value"
            class="filter-tab"
            :class="{ active: selectedType === type.value }"
            @click="selectedType = type.value"
          >
            {{ type.label }}
          </button>
        </div>
      </div>

      <div class="questions-grid">
        <div 
          v-for="question in filteredQuestions" 
          :key="question.id"
          class="question-card"
        >
          <div class="question-header">
            <span class="question-type" :class="question.type">
              {{ questionTypeLabels[question.type] }}
            </span>
            <div class="question-actions">
              <button class="action-icon" @click="handleEdit(question)" title="编辑">
                <i class="el-icon-edit"></i>
              </button>
              <button class="action-icon delete" @click="handleDelete(question)" title="删除">
                <i class="el-icon-delete"></i>
              </button>
            </div>
          </div>
          
          <div class="question-content">
            <h4>{{ question.content }}</h4>
            <div class="question-meta">
              <span class="difficulty" :class="question.difficulty">
                {{ difficulties[question.difficulty] }}
              </span>
              <span class="create-time">{{ formatDate(question.createTime) }}</span>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="filteredQuestions.length === 0" class="empty-state">
          <i class="el-icon-document"></i>
          <p v-if="searchQuery">未找到匹配的题目</p>
          <p v-else>暂无题目，点击"添加题目"开始创建</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionBank',
  data() {
    return {
      searchQuery: '',
      selectedType: 'all',
      questions: [
        {
          id: 1,
          type: 'single',
          content: '以下哪个不是JavaScript的数据类型？',
          difficulty: 'easy',
          createTime: '2024-01-15'
        },
        {
          id: 2,
          type: 'multiple',
          content: '以下哪些是Vue.js的生命周期钩子？',
          difficulty: 'medium',
          createTime: '2024-01-14'
        },
        {
          id: 3,
          type: 'essay',
          content: '请简述Vue.js的响应式原理',
          difficulty: 'hard',
          createTime: '2024-01-13'
        }
      ],
      questionTypes: [
        { label: '全部', value: 'all' },
        { label: '单选题', value: 'single' },
        { label: '多选题', value: 'multiple' },
        { label: '问答题', value: 'essay' }
      ],
      questionTypeLabels: {
        single: '单选题',
        multiple: '多选题',
        blank: '填空题',
        essay: '问答题'
      },
      difficulties: {
        easy: '简单',
        medium: '中等',
        hard: '困难'
      }
    }
  },
  computed: {
    filteredQuestions() {
      let filtered = this.questions
      
      // 按类型筛选
      if (this.selectedType !== 'all') {
        filtered = filtered.filter(q => q.type === this.selectedType)
      }
      
      // 按搜索关键词筛选
      if (this.searchQuery) {
        filtered = filtered.filter(q => 
          q.content.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      
      return filtered
    }
  },
  methods: {
    getQuestionTypeCount(type) {
      return this.questions.filter(q => q.type === type).length
    },
    handleSearch() {
      // 搜索逻辑已在计算属性中处理
    },
    handleAdd() {
      this.$message.info('添加题目功能开发中...')
    },
    handleEdit(question) {
      this.$message.info(`编辑题目：${question.content}`)
    },
    handleDelete(question) {
      this.$confirm(`确认删除题目"${question.content}"吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.questions.findIndex(q => q.id === question.id)
        if (index > -1) {
          this.questions.splice(index, 1)
        }
        this.$message.success('删除成功！')
      }).catch(() => {})
    },
    handleImport() {
      this.$message.info('导入题目功能开发中...')
    },
    handleExport() {
      this.$message.info('导出题目功能开发中...')
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('zh-CN')
    }
  }
}
</script>

<style scoped>
.question-bank-container {
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

/* 题目列表 */
.questions-section {
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

.questions-grid {
  display: grid;
  gap: 1rem;
}

.question-card {
  border: 1px solid #e3f2fd;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.question-card:hover {
  border-color: #42a5f5;
  box-shadow: 0 2px 8px rgba(66, 165, 245, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.question-type {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.question-type.single {
  background: #e8f5e8;
  color: #4caf50;
}

.question-type.multiple {
  background: #fff3e0;
  color: #ff9800;
}

.question-type.essay {
  background: #e3f2fd;
  color: #2196f3;
}

.question-actions {
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

.question-content h4 {
  color: #333;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.question-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.difficulty {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.difficulty.easy {
  background: #e8f5e8;
  color: #4caf50;
}

.difficulty.medium {
  background: #fff3e0;
  color: #ff9800;
}

.difficulty.hard {
  background: #ffebee;
  color: #f44336;
}

.create-time {
  color: #666;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
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
  .question-bank-container {
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
}
</style> 