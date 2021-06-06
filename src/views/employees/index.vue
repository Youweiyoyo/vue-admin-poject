<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #before>
          <span>总条数{{ page.total }}</span>
        </template>
        <template #after>
          <el-button type="warning" @click="$router.push('/import')">excel导入</el-button>
          <el-button type="danger">excel导出</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="showDialog = true"
          >新增</el-button>
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
            :formatter="formatter"
          />
          <vxe-table-column field="departmentName" title="部门" sortable />
          <vxe-table-column field="timeOfEntry" title="入职时间" sortable>
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </vxe-table-column>
          <vxe-table-column field="enableState" title="账户状态" sortable>
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </vxe-table-column>
          <vxe-table-column title="操作" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
              >删除</el-button>
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
    <add-employees :show-dialog.sync="showDialog" @getList="getEmployeeList" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import addEmployees from './components/add-employess'
export default {
  components: {
    addEmployees
  },
  data() {
    return {
      tabList: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取数据
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
    },
    // 格式化聘用形式
    formatter({ cellValue, row, column }) {
      const obj = EmployeeEnum.hireType.find(item => {
        return cellValue === item.id
      })
      if (obj) {
        return obj.value
      } else {
        return '未知的形式'
      }
      // return obj.id ? obj.value : '未知的形式'
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('确认删除该员工？', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除成功!')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
