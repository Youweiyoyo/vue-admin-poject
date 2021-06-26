<template>
  <div class="assign-role">
    <el-dialog :visible="showRoleDialog" title="分配角色" width="30%" @close="cancel">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="default" @click="cancel">取消</el-button>
            <el-button
              size="small"
              type="primary"
              @click="saveRole"
            >确定</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { assignRoles } from '@/api/employees'
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
export default {
  components: {},
  props: {
    // 控制弹框
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户ID
    userId: {
      type: String,
      default: null,
      require: true
    }
  },
  data() {
    return {
      checkList: [], // 选中角色列表
      list: [] // 本人拥有角色列表
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getRoleList()
    this.getUserDetailById()
  },
  mounted() {},
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.checkList = roleIds
    },
    // 确定
    async saveRole() {
      await assignRoles({ id: this.userId, roleIds: this.checkList })
      this.$message.success('保存用户权限成功')
      this.$emit('update:showRoleDialog', false)
    },
    // 取消
    cancel() {
      this.checkList = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style scoped lang="scss"></style>
