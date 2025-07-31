<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input 
            type="text" 
            v-model="loginForm.username" 
            placeholder="用户名"
            required
            @focus="inputFocus = true"
            @blur="inputFocus = false"
            :class="{ 'input-focus': inputFocus }"
          >
        </div>
        <div class="form-group">
          <input 
            type="password" 
            v-model="loginForm.password" 
            placeholder="密码"
            required
            @focus="inputFocus = true"
            @blur="inputFocus = false"
            :class="{ 'input-focus': inputFocus }"
          >
        </div>
        <div class="form-footer">
          <label class="remember-password">
            <input 
              type="checkbox" 
              v-model="rememberMe"
            >
            <span>记住密码</span>
          </label>
          <a href="#" class="forgot-password" @click.prevent="handleForgotPassword">忘记密码？</a>
        </div>
        <button type="submit" :disabled="loading">{{ loading ? '登录中...' : '登录' }}</button>
      </form>
      <div class="register-link">
        还没有账号？<a href="#" @click.prevent="handleRegister">立即注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rememberMe: false,
      loading: false,
      inputFocus: false
    }
  },
  methods: {
    handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$message.error('请输入用户名和密码')
        return
      }

      this.loading = true;
      
      // 模拟登录API请求
      setTimeout(() => {
        // 模拟登录成功
        localStorage.setItem('token', 'dummy-token');
        if (this.rememberMe) {
          localStorage.setItem('username', this.loginForm.username);
        }
        this.loading = false;
        this.$router.push('/dashboard');
      }, 800);
    },
    handleForgotPassword() {
      this.$message.info('忘记密码功能开发中...')
    },
    handleRegister() {
      this.$message.info('注册功能开发中...')
    }
  },
  mounted() {
    // 如果存在记住的用户名
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.loginForm.username = savedUsername;
      this.rememberMe = true;
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom, #42a5f5, #90caf9);
}

.login-box {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
}

h2 {
  text-align: center;
  margin-bottom: 2.5rem;
  color: #42a5f5;
  font-size: 1.8rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e3f2fd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #42a5f5;
  box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.1);
}

button {
  width: 100%;
  padding: 1rem;
  background-color: #42a5f5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #2196f3;
}

button:disabled {
  background-color: #bbdefb;
  cursor: not-allowed;
}

.input-focus {
  border-color: #4CAF50;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.remember-password {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  cursor: pointer;
}

.remember-password input[type="checkbox"] {
  width: auto;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.forgot-password {
  color: #42a5f5;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #2196f3;
  text-decoration: underline;
}

.register-link {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
  color: #666;
}

.register-link a {
  color: #42a5f5;
  text-decoration: none;
  margin-left: 0.5rem;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #2196f3;
  text-decoration: underline;
}

form button {
  margin-top: 1rem;
}
</style> 