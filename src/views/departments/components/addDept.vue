<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <el-form
      ref="dptForm"
      :rules="formDataRule"
      label-width="120px"
      :model="formData"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width:80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" plain size="small" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="small" @click="btnOk">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  getOrganization,
  addDepartments,
  getDepartDetail
} from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  name: 'AddDept',
  components: {},
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 寻找同级部门下，是否存有重复的部门
    const checkNameRepeat = async(rule, value, callBack) => {
      const { depts } = await getOrganization()
      // 寻找某一部门下的子部门
      const isRepeat = depts
        .fiter(item => item.pid === this.treeNode.id)
        .some(item => item.name === value)
      isRepeat
        ? callBack(new Error(`同级部门下${value}编码已经存在`))
        : callBack()
    }
    const checkCodeRepeat = async(rule, value, callBack) => {
      const { depts } = await getOrganization()
      const isRepeat = depts.some(item => item.pid === value && value)
      isRepeat
        ? callBack(new Error(`同级部门下${value}ID已经存在`))
        : callBack()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formDataRule: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur'
          },
          { trigger: 'blur', validate: checkNameRepeat }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: 'blur'
          },
          { trigger: 'blur', validate: checkCodeRepeat }
        ],
        manager: [
          { required: true, message: '部门管理者不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            min: 1,
            max: 300,
            message: '部门介绍要求1-50个字符'
          }
        ]
      },
      peoples: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 获取员工简单列表数据
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    btnOk() {
      this.$refs.dptForm.validate(async isOk => {
        if (isOk) {
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
          this.$emit('addDepts')
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$emit('update:showDialog', false)
      this.$refs.dptForm.resetFields()
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style scoped lang="sass"></style>
