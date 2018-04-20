<template>
  <div class="mainBox">
    <div class="volTableTitleBox">志愿者详情</div>
    <el-form class="adminTable" label-width="100px">
      <el-form-item label="头像">
        <img class="headImg" :src="userData.hdportrait||headImg" alt="">
      </el-form-item>
      <el-form-item label="姓名">
        <span>{{userData.name}}</span>
      </el-form-item>
      <el-form-item label="证件类型">
        <span>{{userData.cardtype==1?'身份证':'护照'}}</span>
      </el-form-item>
      <el-form-item label="证件号码">
        <span>{{userData.idcard}}</span>
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{userData.phone}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import headImg from './../assets/images/MRman.png'

  export default {
    name: 'volDetails',
    data () {
      return {
        userData:{
        },
        headImg:headImg
      }
    },
    components: {},
    methods: {},
    created () {
      let _self = this;
      let params = {
        userId:this.$route.query.volId
      }
      untils.JsonAxios().post('manage/orguser/voluserinfo',params).then(function (res) {
        if(res.code==0){
          _self.userData = res.data;
          console.log(res);
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .headImg{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .adminTable{
    width: 500px;
    margin-left: 100px;
    padding: 20px 0;
    text-align: left;
  }
</style>
