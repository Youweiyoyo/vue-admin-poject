<template>
  <div>
    <el-upload
      list-type="picture-card"
      :class="{ isShow: fileComponent }"
      :limit="1"
      action="#"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-preview="preview"
      :on-change="handleChange"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="isDialog" title="预览图片">
      <img :src="imgUrl" alt="图片文件" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      fileList: [
        {
          url:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.ws.126.net%2FtX0g2%3D7S%3DjaYm9qOoN75qxzva%3DRaOg3kd%3DwbQdb47WfrG1553483457714compressflag.jpg&refer=http%3A%2F%2Fdingyue.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626763018&t=32541dcbbfd741a024de0de29eea1f49'
        }
      ],
      imgUrl: '',
      isDialog: false
    }
  },
  computed: {
    // 动态类绑定的属性值
    fileComponent() {
      return this.fileList.length === 1
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 上传图片的预览事件
    preview(file) {
      console.log(file)
      this.imgUrl = file.url
      this.isDialog = true
    },
    // 删除图片事件
    // file是要删除的文件
    // fileList是删除后的文件
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 上传文件状态改变的事件
    handleChange(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    // 上传文件之前检查文件类型和大小
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      const maxSize = 5 * 1024 * 1024
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      } else if (file.size > maxSize) {
        this.$message.error('文件大小不能超过5KB')
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.isShow {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
