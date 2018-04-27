/**
 * Created by bychen on 2017/5/23.
 */

let config={
  baseUrl:window.location.origin+'/',
  baseName:'app/',
  mapkey:'1ad687828622041a79c5ee76aa4a4fb2',
  userId:"",
  mobile:'',
  userName:'',
  aliyun:{
    endpoint:'http://oss-cn-hangzhou.aliyuncs.com',
    region:'oss-cn-hangzhou',
    bucketName:'zhulao-pro',
    accessKeyId:'LTAIodQqmT91wJBB',
    accessKeySecret:'F5hjfpVvmi6xPhYvc89wh1V4kImN7d'
  }
}

if(sessionStorage.getItem('baseUserId')){
  config.baseuserid = sessionStorage.getItem('baseUserId');
}

export default config;
