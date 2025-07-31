<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  overflow-x: hidden;
  overflow-y: auto;
}

#app {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

/* 卡片统一样式 */
.el-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05) !important;
  margin-bottom: 20px;
  overflow: hidden;
}

.el-card__header {
  padding: 15px 20px;
  font-weight: 500;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.el-card__body {
  padding: 20px;
}

/* 确保全局的按钮样式一致 */
.el-button--primary {
  background-color: #409EFF;
  border-color: #409EFF;
}

.el-button--primary:hover,
.el-button--primary:focus {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

/* 修复表格样式 */
.el-table th {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: 500;
  padding: 12px 0;
}

.el-table td {
  padding: 12px 0;
}

/* 修复下拉菜单样式 */
.el-dropdown-menu {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-dropdown-menu__item {
  padding: 10px 20px;
  font-size: 14px;
}
</style>
