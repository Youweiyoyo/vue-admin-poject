<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="false">
        <template #after>
          <el-button type="primary">导入</el-button>
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </template>
      </page-tools>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
