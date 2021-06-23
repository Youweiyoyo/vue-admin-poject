<template>
  <div class="assign-role">
    <el-dialog :visible="showRoleDialog" title="分配角色" width="30%">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="default">取消</el-button>
            <el-button size="small" type="primary">确定</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style scoped lang="scss"></style>
