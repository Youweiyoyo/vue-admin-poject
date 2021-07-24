<template>
  <div>
    <svg-icon icon-class="fullscreen" @click="changeScreen" />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
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
    changeScreen() {
      if (!ScreenFull.isEnabled) {
        return this.$message.warning('不支持全屏效果')
      }
      ScreenFull.toggle()
    }
  }
}
</script>

<style scoped lang="scss"></style>
