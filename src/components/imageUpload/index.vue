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
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="isDialog" title="预览图片">
      <img :src="imgUrl" alt="图片文件" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云 COS 包
const cos = new COS({
  SecretId: 'AKIDzmKbbKmyVlk7IEuLWS8ZkfLlwrXyA5j6', // 腾讯云身份ID
  SecretKey: 'GPM3VigPuBDzUigNnwoQlpdDWZNxJQHt' // 腾讯云身份密钥
})
export default {
  components: {},
  props: {},
  data() {
    return {
      fileList: [],
      imgUrl: '',
      isDialog: false,
      currentFileUid: null // 当前上传成功文件的 uid
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
        this.currentFileUid = file.uid
        return true
      }
    },
    // 自定义上传事件
    upload(params) {
      if (params.file) {
        cos.putObject(
          {
            Bucket: 'youwei-001-1306271652', // 存储桶名称
            Region: 'ap-beijing', // 存储桶所在地域
            Key: params.file.name, // 存储文件的名称
            StorageClass: 'STANDARD',
            Body: params.file // 上传的 File 文件对象
          },
          (err, data) => {
            console.log(data, 'XXX')
            if (!err && data.statusCode === 200) {
              // 如果 fileList中的item的uid=上传成功的文件的uid就给这个文件更换线上的地址，并返回新的 fileList
              // upload: true 表示上传完毕,根据upload去判断是否保存
              this.fileList = this.fileList.map(item => {
                if (item.uid === this.currentFileUid) {
                  return { url: 'http://' + data.Location, upload: true }
                } else {
                  return item
                }
              })
            }
          }
        )
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
