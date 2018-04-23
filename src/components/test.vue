<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :headers="headers"
      :data="data"
      :name="name"
      action="http://oss-cn-hangzhou.aliyuncs.com/posts/"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :http-request="uploadImg"
      :auto-upload="true"
      :limit="1"
      list-type="picture">
    </el-upload>
    <el-button size="small" @click="uploadImg()" type="success">点击上传</el-button>
  </div>
</template>

<script>
  import config from '@/assets/js/config'

  export default {
    name: 'test',
    data(){
      return {
        headers:{
          accessKeyId:config.aliyun.accessKeyId,
          accessKeyId:config.aliyun.accessKeyId,
          accessKeyId:config.aliyun.accessKeyId,
          accessKeyId:config.aliyun.accessKeyId,
          accessKeyId:config.aliyun.accessKeyId
        },
        data:{

        },
        name:''
      }
    },
    methods:{
      handleChange(data){
        this.imgData = data;
      },
      handleExceed(data){
        this.imgData = data;
      },
      submitUpload() {
        this.$refs.upload.submit();
      },

    },
    components:{
      gaomap
    }
  }
</script>

<style scoped>

</style>
