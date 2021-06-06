<!-- 公共路由组件--导入文件组件 -->
<template>
  <div>
    <upload-excel :on-success="success" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
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
    async success({ header, results }) {
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }
      // const newArr = []
      // results.forEach(item => {
      // Object.keys(item) 每一个数组的 key
      // 遍历 key 数组，拿到每一项
      // 让 info 对象中的每一项的key改变为 userRelations[key] 这个数组中文key所对应的val
      // item是results数组中的每一项，keys是 Object.keys(item)保存所有item项的key的数组
      // const info = {}
      // Object.keys(item).forEach(keys => {
      // info[userRelations[keys]] = item[keys]
      // })
      // 将转换为英文名称的对象添加到新的数组中
      // newArr.push(info)
      // })
      const newArr = results.map(item => {
        const info = {}
        Object.keys(item).forEach(keys => {
          if (
            userRelations[keys] === 'timeOfEntry' ||
            userRelations[keys] === 'correctionTime'
          ) {
            info[userRelations[keys]] = new Date(
              this.formatDate(item[keys], '/')
            )
          } else {
            info[userRelations[keys]] = item[keys]
          }
        })
        return info
      })
      await importEmployee(newArr)
      this.$message.success('上传文件成功')
      this.$router.back() // 返回上一个界面
    },
    //  处理excel日期格式问题
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return (
        year +
        (month < 10 ? '0' + month : month) +
        (date < 10 ? '0' + date : date)
      )
    }
  }
}
</script>

<style scoped lang="scss"></style>
