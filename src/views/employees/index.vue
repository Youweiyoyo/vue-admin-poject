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
        <vxe-table v-loading="loading" align="center" :data="tabList">
          <vxe-table-column type="seq" width="60" title="序号" />
          <vxe-table-column field="username" title="姓名" sortable />
          <vxe-table-column field="workNumber" title="工号" sortable />
          <vxe-table-column
            field="formOfEmployment"
            title="聘用形式"
            sortable
          />
          <vxe-table-column field="departmentName" title="部门" sortable />
          <vxe-table-column field="timeOfEntry" title="入职时间" sortable />
          <vxe-table-column field="enableState" title="账户状态" sortable />
          <vxe-table-column title="操作" fixed="right" width="280">
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
          :current-page="page.page"
          :page-size="page.pagesize"
          :total="page.total"
          @page-change="handlePageChange"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
export default {
  data() {
    return {
      tabList: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { rows, total } = await getEmployeeList(this.page)
      this.page.total = total
      this.tabList = rows
      this.loading = false
    },
    // 分页
    handlePageChange({ currentPage, pageSize }) {
      this.page.page = currentPage
      this.page.pagesize = pageSize
      this.getEmployeeList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
