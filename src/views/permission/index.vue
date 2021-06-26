<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row type="flex" justify="flex-end">
          <el-button type="primary">添加权限</el-button>
        </el-row>
        <vxe-table border>
          <vxe-table-column title="菜单名称" />
          <vxe-table-column title="权限标识" />
          <vxe-table-column title="描述" />
          <vxe-table-column title="操作">
            <template v-slot="{ row }">
              <el-button type="text">添加权限点</el-button>
              <el-button type="text">查看APi权限</el-button>
              <el-button type="text">查看</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
