<template>
  <div class="dashboard-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <div class="welcome-text">
        <h2>欢迎使用 <span class="highlight">QuizGenie</span></h2>
        <p class="subtitle">智能出题系统·教师端，助力高效教学</p>
      </div>
      <div class="welcome-stats">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="el-icon-document"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalQuestions }}</div>
            <div class="stat-label">题目总数</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="el-icon-edit-outline"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalPapers }}</div>
            <div class="stat-label">试卷总数</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="el-icon-user"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalStudents }}</div>
            <div class="stat-label">学生总数</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="el-icon-s-data"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalExams }}</div>
            <div class="stat-label">考试场次</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能介绍 -->
    <div class="intro-section">
      <h3>QuizGenie 智能教学系统</h3>
      <div class="intro-cards">
        <div class="intro-card">
          <div class="intro-icon">
            <i class="el-icon-robot"></i>
          </div>
          <h4>AI 智能出题</h4>
          <p>基于人工智能技术，根据知识点自动生成高质量题目，覆盖多种题型和难度。</p>
        </div>
        
        <div class="intro-card">
          <div class="intro-icon">
            <i class="el-icon-data-analysis"></i>
          </div>
          <h4>学习分析</h4>
          <p>全面分析学生学习数据，追踪学习进度，科学评估知识掌握程度。</p>
        </div>
        
        <div class="intro-card">
          <div class="intro-icon">
            <i class="el-icon-s-management"></i>
          </div>
          <h4>智能管理</h4>
          <p>高效管理题库、学生信息和考试成绩，提供便捷的教学管理工具。</p>
        </div>
        
        <div class="intro-card">
          <div class="intro-icon">
            <i class="el-icon-s-marketing"></i>
          </div>
          <h4>成绩统计</h4>
          <p>可视化展示考试成绩分布，提供详细的学习分析和教学建议。</p>
        </div>
      </div>
    </div>

    <!-- 快速开始 -->
    <div class="feature-section">
      <h3>快速开始</h3>
      <div class="feature-cards">
        <div class="feature-card" @click="$router.push('/question-bank')">
          <div class="card-icon">
            <i class="el-icon-document"></i>
          </div>
          <h4>题库管理</h4>
          <p>管理和创建题目</p>
          <button class="action-btn">进入管理</button>
        </div>
        
        <div class="feature-card" @click="$router.push('/student-management')">
          <div class="card-icon">
            <div class="card-icon">
              <i class="el-icon-user"></i>
            </div>
          </div>
          <h4>学生管理</h4>
          <p>管理学生信息</p>
          <button class="action-btn">查看学生</button>
        </div>
        
        <div class="feature-card" @click="$router.push('/statistics')">
          <div class="card-icon">
            <i class="el-icon-s-data"></i>
          </div>
          <h4>成绩统计</h4>
          <p>查看成绩分析</p>
          <button class="action-btn">查看统计</button>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="dashboard-sections">
      <div class="dashboard-section recent-activity">
        <h3>最近活动</h3>
        <div class="activity-timeline">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in recentActivities"
              :key="index"
              :timestamp="activity.time"
              :type="activity.type"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      
      <div class="dashboard-section study-recommendation">
        <h3>教学建议</h3>
        <div class="recommendation-list">
          <div 
            v-for="(rec, index) in recommendations" 
            :key="index"
            class="recommendation-item"
          >
            <div class="rec-icon">
              <i :class="rec.icon"></i>
            </div>
            <div class="rec-content">
              <h4>{{ rec.title }}</h4>
              <p>{{ rec.description }}</p>
              <button class="rec-btn" @click="handleRecommendation(rec)">
                {{ rec.actionText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      stats: {
        totalQuestions: 120,
        totalPapers: 15,
        totalStudents: 86,
        totalExams: 32
      },
      recentActivities: [
        { 
          time: '2024-01-15 14:30', 
          content: '创建了"高等数学"题目集，共25道题', 
          type: 'success' 
        },
        { 
          time: '2024-01-14 10:15', 
          content: '学生张三完成了期中考试，得分85分', 
          type: 'primary' 
        },
        { 
          time: '2024-01-13 16:45', 
          content: '导入了"线性代数"题目集', 
          type: 'info' 
        },
        { 
          time: '2024-01-12 09:30', 
          content: '生成了期末试卷，包含30道题目', 
          type: 'success' 
        }
      ],
      recommendations: [
        {
          icon: 'el-icon-warning',
          title: '薄弱知识点',
          description: '学生在线性代数方面的掌握度较低，建议加强练习。',
          actionText: '查看详情',
          action: 'view',
          target: { subject: 'linear-algebra' }
        },
        {
          icon: 'el-icon-s-data',
          title: '成绩分析',
          description: '期中考试成绩已统计完成，建议查看详细分析报告。',
          actionText: '查看报告',
          action: 'report',
          target: { exam: 'midterm' }
        },
        {
          icon: 'el-icon-edit-outline',
          title: '题目更新',
          description: '建议更新题库中的部分题目，保持内容的时效性。',
          actionText: '更新题库',
          action: 'update',
          target: { type: 'question-bank' }
        }
      ]
    }
  },
  methods: {
    handleRecommendation(rec) {
      if (rec.action === 'view') {
        this.$router.push('/statistics')
      } else if (rec.action === 'report') {
        this.$router.push('/statistics')
      } else if (rec.action === 'update') {
        this.$router.push('/question-bank')
      }
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 1.5rem;
  min-height: 100%;
  overflow-y: auto;
}

h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

h3 {
  color: #42a5f5;
  margin-bottom: 1.5rem;
  font-weight: 500;
  font-size: 1.4rem;
}

h4 {
  color: #333;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.highlight {
  color: #42a5f5;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

/* 欢迎区域 */
.welcome-section {
  background: linear-gradient(135deg, #f5f7fa, #e4e7eb);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.welcome-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 1.25rem;
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

/* 功能介绍 */
.intro-section {
  margin-bottom: 2rem;
}

.intro-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.intro-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.intro-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.intro-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #42a5f5;
  font-size: 1.5rem;
}

.intro-card h4 {
  margin-bottom: 0.75rem;
  color: #333;
}

.intro-card p {
  color: #666;
  line-height: 1.5;
}

/* 快速开始 */
.feature-section {
  margin-bottom: 2rem;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #42a5f5;
  font-size: 1.5rem;
}

.feature-card h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

.feature-card p {
  color: #666;
  margin-bottom: 1rem;
}

.action-btn {
  background: #42a5f5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-btn:hover {
  background: #2196f3;
}

/* 仪表盘部分 */
.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.dashboard-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dashboard-section h3 {
  margin-bottom: 1rem;
  color: #333;
}

.recommendation-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recommendation-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.recommendation-item:hover {
  background: #e3f2fd;
}

.rec-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #42a5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
}

.rec-content {
  flex: 1;
}

.rec-content h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

.rec-content p {
  color: #666;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.rec-btn {
  background: transparent;
  border: 1px solid #42a5f5;
  color: #42a5f5;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.rec-btn:hover {
  background: #42a5f5;
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }
  
  .welcome-stats {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .intro-cards,
  .feature-cards {
    grid-template-columns: 1fr;
  }
  
  .dashboard-sections {
    grid-template-columns: 1fr;
  }
}
</style> 