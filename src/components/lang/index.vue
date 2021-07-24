<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <!-- 这里必须加一个div -->
    <div>
      <svg-icon icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="'zh' === $i18n.locale">中文<el-dropdown-item>
        <el-dropdown-item command="en" :disabled="'en' === $i18n.locale">en</el-dropdown-item>
      </el-dropdown-item></el-dropdown-item></el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    changeLanguage(type) {
      Cookie.set('language', type) // 写入 Cookie 缓存
      this.$i18n.locale = type // 将当前语言切换成相应的类型
      this.$message.success('切换多语言成功')
    }
  }
}
</script>

<style scoped lang="scss"></style>
