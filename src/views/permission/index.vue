<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row type="flex" justify="end">
          <el-button
            type="primary"
            @click="addRoles(1, '0')"
          >添加权限</el-button>
        </el-row>
        <vxe-table
          border
          :data="list"
          align="center"
          :tree-config="{ children: 'children' }"
          :row-key="list.id"
        >
          <vxe-table-column
            field="name"
            title="菜单名称"
            header-align="center"
            align="left"
            tree-node
          />
          <vxe-table-column field="code" title="权限标识" />
          <vxe-table-column field="description" title="描述" />
          <vxe-table-column title="操作">
            <template v-slot="{ row }">
              <el-button
                v-if="row.type === 1"
                type="text"
                @click="addRoles(2, row.id)"
              >添加</el-button>
              <el-button
                type="text"
                @click="editPermisson(row.id)"
              >编辑</el-button>
              <el-button type="text" @click="delte(row.id)">删除</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        <add-or-edit
          ref="addOREdit"
          :show-dialog.sync="showDialog"
          :type1="type"
          :pid1="pid"
          @upDate="upDateState"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'
import addOrEdit from './components/addoredit.vue'
export default {
  components: {
    addOrEdit
  },
  data() {
    return {
      list: [],
      showDialog: false,
      type: null,
      pid: null
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const data = await getPermissionList()
      this.list = tranListToTreeData(data, '0')
    },
    // 添加
    addRoles(type, pid) {
      // 访问权限 type = 1,按钮操作权限 type = 2
      this.showDialog = true
      this.type = type
      this.pid = pid
    },
    // 删除
    async delte(id) {
      try {
        await this.$confirm('确认是否删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        await delPermission(id)
        await this.$message.success('删除权限成功！')
        this.getPermissionList()
      } catch (error) {
        console.log(error)
      }
    },
    upDateState(state) {
      this.showDialog = state
      this.getPermissionList()
    },
    // 编辑
    editPermisson(id) {
      this.showDialog = true
      this.$refs.addOREdit.getPermissionDetail(id)
    }
  }
}
</script>

<style></style>
