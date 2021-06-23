<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #before>
          <span>总条数{{ page.total }}</span>
        </template>
        <template #after>
          <el-button type="warning" @click="$router.push('/import')">excel导入</el-button>
          <el-button type="danger" @click="exportData">excel导出</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showDialog = true">新增</el-button>
        </template>
      </page-tools>
      <el-card>
        <vxe-table v-loading="loading" align="center" :data="tabList">
          <vxe-table-column type="seq" width="60" title="序号" />
          <vxe-table-column field="username" title="姓名" sortable />
          <vxe-table-column field="workNumber" title="工号" sortable />
          <vxe-table-column field="workNumber" title="头像" width="120px">
            <template v-slot="{row}">
              <img v-imageerror="defaultImg" :src="row.staffPhoto" @click="handleWork(row.staffPhoto)">
            </template>
          </vxe-table-column>
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
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
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
    <el-dialog :visible.sync="isDialog" title="二维码" width="30%">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <assign-role ref="role" :show-role-dialog.sync="showRoleDialog" :user-id="userID" />
  </div>
</template>

<script>
import assignRole from './components/assign-role.vue'
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import addEmployees from './components/add-employess'
import { formatDate } from '@/filters/index'
import QrCode from 'qrcode'
export default {
  components: {
    addEmployees,
    assignRole
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
      showDialog: false,
      isDialog: false,
      showRoleDialog: false,
      userID: null,
      defaultImg: require('@/assets/common/head.jpg')
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
    },
    // excle导出
    exportData() {
      const headers = {
        手机号: 'mobile',
        姓名: 'username',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      // 懒加载的形式调用方法
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.page.total
        })
        const data = this.formatJson(headers, rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工信息表',
          multiHeader, // 复杂表头
          merges // 合并表头
        })
      })
    },
    formatJson(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(keys => {
          if (
            headers[keys] === 'timeOfEntry' ||
            headers[keys] === 'correctionTime'
          ) {
            return formatDate(item[headers[keys]])
          } else if (headers[keys] === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(
              obj => obj.id === item[headers[keys]]
            )
            return obj ? obj.value : '未知'
          }
          return item[headers[keys]]
        })
      })
    },
    // 展示二维码
    handleWork(url) {
      if (url) {
        this.isDialog = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('该用户未上传头像')
      }
    },
    // 角色
    async editRole(id) {
      this.userID = id
      await this.$refs.role.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 10px;
}
</style>
