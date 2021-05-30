<template>
  <div>
    <el-dialog
      title="新增员工"
      width="40%"
      :visible="showDialog"
      @close="btnCancle"
    >
      <el-form
        ref="addForm"
        label-width="120px"
        :model="formData"
        :rules="formDataRules"
      >
        <el-form-item label="姓名" prop="username">
          <el-input
            v-model="formData.username"
            style="width:50%"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input
            v-model="formData.mobile"
            style="width:50%"
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="formData.timeOfEntry"
            style="width:50%"
            placeholder="请选择入职时间"
          />
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            v-model="formData.formOfEmployment"
            style="width:50%"
            placeholder="请选择"
          >
            <el-option
              v-for="item in EmployessHireType.hireType"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input
            v-model="formData.workNumber"
            style="width:50%"
            placeholder="请输入工号"
          />
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input
            v-model="formData.departmentName"
            style="width:50%"
            placeholder="请选择部门"
            @focus="getDepartments"
          />
          <el-tree
            v-if="showTree"
            v-loading="loading"
            :data="treeData"
            :props="{ label: 'name' }"
            default-expand-all
            @node-click="selectNode"
          />
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="formData.correctionTime"
            style="width:50%"
            placeholder="请选择转正时间"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button type="primary" size="small" @click="btnCancle"
          >取消</el-button
        >
        <el-button type="primary" size="small" @click="btnOk">提交</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addEmployee } from '@/api/employees'
import { getOrganization } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import EmployessHireType from '@/api/constant/employees'
export default {
  components: {},
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployessHireType,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      formDataRules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [],
      showTree: false,
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.defaultformData = JSON.parse(JSON.stringify(this.formData))
  },
  mounted() {},
  methods: {
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getOrganization()
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async btnOk() {
      try {
        await this.$refs.addForm.validate()
        await addEmployee(this.formData)
        this.$emit('getList')
        this.btnCancle()
      } catch (error) {
        console.log(error)
      }
    },
    btnCancle() {
      this.$emit('update:showDialog', false)
      this.$refs.addForm.resetFields()
      this.formData = JSON.parse(JSON.stringify(this.defaultformData))
    }
  }
}
</script>

<style scoped lang="scss"></style>
