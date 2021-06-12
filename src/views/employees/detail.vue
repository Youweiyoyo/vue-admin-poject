<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form
              ref="userForm"
              :model="userInfo"
              :rules="userInfoRules"
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
            >
              <el-form-item label="用户名">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  v-model="userInfo.password2"
                  type="password"
                  style="width:300px"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <div :is="UserInfoComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <div :is="JobInfoComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  props: {},
  data() {
    return {
      UserInfoComponent: 'UserInfo',
      JobInfoComponent: 'JobInfo',
      userID: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      userInfoRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUserDetailById()
  },
  mounted() {},
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userID)
    },
    save() {
      this.$refs.userForm.validate().then(async() => {
        await saveUserDetailById({
          ...this.userInfo,
          password: this.userInfo.password2
        })
        this.$message.success('修改用户信息成功！')
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
