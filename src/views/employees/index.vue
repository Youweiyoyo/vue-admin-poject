<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #before>
          <span>总条数16</span>
        </template>
        <template #after>
          <el-button type="warning">excel导入</el-button>
          <el-button type="danger">excel导出</el-button>
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </template>
      </page-tools>
      <el-card>
        <vxe-table align="center" :data="tableData">
          <vxe-table-column type="seq" width="60" title="序号" />
          <vxe-table-column field="name" title="姓名" sortable />
          <vxe-table-column field="sex" title="工号" sortable />
          <vxe-table-column field="age" title="聘用形式" sortable />
          <vxe-table-column field="age" title="入职时间" sortable />
          <vxe-table-column field="age" title="账户状态" sortable />
          <vxe-table-column field="age" title="操作">
            <template v-slot="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        <vxe-pager
          :layouts="[
            'Sizes',
            'PrevJump',
            'PrevPage',
            'Number',
            'NextPage',
            'NextJump',
            'FullJump',
            'Total'
          ]"
          :current-page="1"
          :page-size="10"
          :total="20"
          @page-change="handlePageChange"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
