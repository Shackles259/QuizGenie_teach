import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import MainLayout from '../layouts/MainLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import QuestionBank from '../views/QuestionBank.vue'
import StudentManagement from '../views/StudentManagement.vue'
import Statistics from '../views/Statistics.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, title: '首页' }
      },
      {
        path: '/question-bank',
        name: 'QuestionBank',
        component: QuestionBank,
        meta: { requiresAuth: true, title: '题库管理' }
      },
      {
        path: '/student-management',
        name: 'StudentManagement',
        component: StudentManagement,
        meta: { requiresAuth: true, title: '学生管理' }
      },
      {
        path: '/statistics',
        name: 'Statistics',
        component: Statistics,
        meta: { requiresAuth: true, title: '成绩统计' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - QuizGenie`
  }

  const isAuthenticated = localStorage.getItem('token')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    // 如果访问的是登录页面，并且已经登录，则重定向到首页
    if (to.path === '/login' && isAuthenticated) {
      next('/dashboard')
    } else {
      next()
    }
  }
})

export default router 