<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row type="flex" justify="space-between">
          <el-col>
            <span>JavaScript高级程序设计</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span>
                    下拉菜单
                    <i class="el-icon-bottom" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
