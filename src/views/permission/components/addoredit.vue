<template>
  <div>
    <el-dialog :visible="showDialog" :title="showTitle" @close="cancle">
      <el-form
        ref="perForm"
        :model="formData"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
          <el-button size="small" @click="cancle">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionDetail,
  addPermission,
  updatePermission
} from '@/api/permisson'
export default {
  components: {},
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    type1: {
      type: Number,
      default: null
    },
    pid1: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      formData: {
        name: '', // 名称
        code: '', // 标识
        type: '',
        pid: '',
        description: '', // 描述
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  watch: {},
  created() {
    this.getPermissionDetail()
    this.defaultFormData = JSON.parse(JSON.stringify(this.formData))
  },
  mounted() {},
  methods: {
    // 获取数据
    async getPermissionDetail(id) {
      const data = await getPermissionDetail(id)
      this.formData = data
    },
    // 确定按钮
    btnOk() {
      this.$refs.perForm.validate(async isOk => {
        // 将传入的数据，利用结构的方式添加进去
        if (isOk) {
          if (!this.formData.id) {
            await addPermission({
              ...this.formData,
              type: this.type1,
              pid: this.pid1
            })
          } else {
            await updatePermission(this.formData)
          }
          await this.$message.success('新增权限成功')
          this.$emit('upDate', false)
        } else {
          return false
        }
      })
    },
    // 取消
    cancle() {
      this.formData = JSON.parse(JSON.stringify(this.defaultFormData))
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped lang="scss"></style>
