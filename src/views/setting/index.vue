<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理">
            <el-row style="height:60px">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-plus"
                @click="dialogVisible = true"
              >
                新增角色
              </el-button>
            </el-row>
            <vxe-table align="center" :data="tableData" border>
              <vxe-table-column type="seq" width="129" title="序号" />
              <vxe-table-column field="name" title="名称" width="240" />
              <vxe-table-column field="description" title="描述" />
              <vxe-table-column field="age" title="操作">
                <template v-slot="{ row }">
                  <el-button
                    type="success"
                    @click="allocatingRermisson(row.id)"
                  >分配权限</el-button>
                  <el-button
                    type="primary"
                    @click="getRoleDetail(row.id)"
                  >编辑权限</el-button>
                  <el-button
                    type="danger"
                    @click="deleteRole(row.id)"
                  >删除</el-button>
                </template>
              </vxe-table-column>
            </vxe-table>
            <el-row>
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
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              :closable="false"
              show-icon
              type="info"
              title="对公司名称、公司地址、营业执照、公司地区的更新、将使公司资料重新被审核,请谨慎修改"
            />
            <el-form
              label-width="120px"
              style="margin-top:30px"
              :model="formData"
            >
              <el-form-item label="企业名称">
                <el-input
                  v-model="formData.name"
                  type="text"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  type="text"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input
                  v-model="formData.companyPhone"
                  type="text"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  type="text"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 编辑&新增 -->
    <el-dialog
      :title="title"
      width="30%"
      :visible="dialogVisible"
      @close="cancel"
    >
      <el-form
        ref="roleForm"
        label-width="120px"
        :model="RoleData"
        :rules="RoleDataRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="RoleData.name" style="width:300px" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="RoleData.description" style="width:300px" />
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitRoleForm">确 定</el-button>
      </el-row>
    </el-dialog>
    <!-- 分配 -->
    <el-dialog
      :visible="allocatingPermisson"
      title="分配权限"
      width="30%"
      @close="btnClena"
    >
      <el-tree
        ref="treeRef"
        :data="treeList"
        :props="{ label: 'name' }"
        :default-expand-all="true"
        show-checkbox
        :default-checked-keys="userPermissonList"
        node-key="id"
        :check-strictly="true"
      />
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
          <el-button type="defualt" size="small" @click="btnClena">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfo,
  deleteRole,
  getRoleDetail,
  updateRole,
  addRole,
  assignPerm
} from '@/api/setting'
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeName: '',
      tableData: [],
      formData: {},
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      dialogVisible: false,
      RoleData: {
        name: '',
        description: ''
      },
      RoleDataRules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      allocatingPermisson: false,
      treeList: [],
      userPermissonList: [],
      rouleID: null
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    title() {
      return this.RoleData.id ? '编辑' : '新增'
    }
  },
  created() {
    this.getListData()
    this.getCompanyInfo()
    this.dafaultRoleForm = JSON.parse(JSON.stringify(this.RoleData))
  },
  methods: {
    async getListData() {
      const { rows, total } = await getRoleList(this.page)
      this.page.total = total
      this.tableData = rows
    },
    // 分页
    handlePageChange({ currentPage, pageSize }) {
      this.page.page = currentPage
      this.page.pagesize = pageSize
      this.getListData()
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    // 删除
    async deleteRole(id) {
      try {
        await ('确认删除该角色吗？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        await deleteRole(id)
        this.getListData()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 获取角色信息
    async getRoleDetail(id) {
      this.RoleData = await getRoleDetail(id)
      this.dialogVisible = true
      console.log(this.RoleData, '<==')
    },
    // 更新信息提交
    async submitRoleForm() {
      try {
        await this.$refs.roleForm.validate()
        if (this.RoleData.id) {
          await updateRole(this.RoleData)
        } else {
          await addRole(this.RoleData)
        }
        this.getListData()
        this.$message.success('更新成功')
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      this.RoleData = JSON.parse(JSON.stringify(this.dafaultRoleForm))
      this.$refs.roleForm.resetFields()
      this.dialogVisible = false
    },
    // 分配权限
    async allocatingRermisson(id) {
      this.allocatingPermisson = true
      this.rouleID = id
      const data = await getPermissionList()
      this.treeList = tranListToTreeData(data, '0')
      const { permIds } = await getRoleDetail(id)
      this.userPermissonList = permIds
    },
    // 确定
    async btnOK() {
      await assignPerm({
        id: this.rouleID,
        permIds: this.$refs.treeRef.getCheckedKeys()
      })
      this.$message.success('分配权限成功！')
      this.allocatingPermisson = false
    },
    // 取消
    btnClena() {
      this.userPermissonList = []
      this.allocatingPermisson = false
    }
  }
}
</script>

<style></style>
