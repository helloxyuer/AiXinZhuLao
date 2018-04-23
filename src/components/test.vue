<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :headers="headers"
      :data="data"
      :name="name"
      action="http://oss-cn-hangzhou.aliyuncs.com/posts/"
      :auto-upload="false"
      :limit="1"
      list-type="picture">
      <el-button size="small" type="success">点击上传</el-button>
    </el-upload>
    <el-button size="small" @click="submitUpload()" type="success">点击上传</el-button>
  </div>
</template>

<script>
  import config from '@/assets/js/config'
  import OSS from 'ali-oss'

  export default {
    name: 'test',
    data(){
      return {
        headers:{
        },
        data:{
        },
        name:''
      }
    },
    methods:{
      submitUpload() {
        let _self = this;
        console.log(this.$refs.upload.uploadFiles[0])
        /*return*/
        let client = new OSS.Wrapper({
          region: config.aliyun.region,
          accessKeyId: config.aliyun.accessKeyId,
          accessKeySecret: config.aliyun.accessKeySecret,
          bucket: config.aliyun.bucketName
        });
        client.put('file', _self.$refs.upload.uploadFiles[0].raw).then(function (val) {
          console.log(val.res);
          return client.get('object');
        }).then(function (val) {
          console.log(val.res);
          console.log(val.content.toString());
        });
      }
    }
  }
</script>

<style scoped>

</style>
