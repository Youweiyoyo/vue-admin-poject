<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form
              :model="formData"
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
            >
              <el-form-item label="用户名">
                <el-input v-model="formData.uname" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  v-model="formData.password"
                  type="password"
                  style="width:300px"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">用户管理</el-tab-pane>
          <el-tab-pane label="岗位信息">用户管理</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      formData: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss"></style>
