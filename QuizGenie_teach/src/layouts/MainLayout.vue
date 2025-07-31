<template>
  <div class="main-layout">
    <header class="header">
      <div class="logo" @click="router.push('/dashboard')">
        <span>QuizGenie</span>
      </div>
      <nav class="nav-tabs">
        <router-link 
          v-for="tab in tabs" 
          :key="tab.path"
          :to="tab.path"
          class="tab"
          :class="{ active: isActive(tab.path) }"
        >
          {{ tab.name }}
        </router-link>
      </nav>
      <div class="user-info">
        <span class="username">{{ username }}</span>
        <button class="logout-btn" @click="handleLogout">退出登录</button>
      </div>
    </header>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      username: '教师',
      tabs: [
        { name: '首页', path: '/dashboard' },
        { name: '题库管理', path: '/question-bank' },
        { name: '学生管理', path: '/student-management' },
        { name: '成绩统计', path: '/statistics' }
      ]
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.$router.push('/login')
      this.$message.success('已退出登录')
    },
    isActive(path) {
      return this.$route.path === path
    }
  },
  mounted() {
    // 获取用户名
    const savedUsername = localStorage.getItem('username')
    if (savedUsername) {
      this.username = savedUsername
    }
  }
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  background-color: #f5f6fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.logo span {
  font-size: 1.2rem;
  font-weight: 600;
  color: #42a5f5;
}

.logo:hover span {
  color: #2196f3;
}

.nav-tabs {
  display: flex;
  gap: 2rem;
}

.tab {
  padding: 0.5rem 1rem;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab:hover {
  color: #42a5f5;
}

.tab.active {
  color: #42a5f5;
  border-bottom-color: #42a5f5;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  color: #666;
  font-weight: 500;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid #42a5f5;
  color: #42a5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #42a5f5;
  color: white;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
  overflow-y: auto;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-tabs {
    gap: 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
}
</style> 