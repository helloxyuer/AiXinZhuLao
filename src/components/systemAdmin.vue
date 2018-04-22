<template>
  <div class="mainBox">
    <div class="volTableTitleBox">管理员详情</div>
    <el-form class="adminTable fixFormHead" label-width="100px">
      <el-form-item label="头像">
        <img class="headImg" :src="adminData.hdportrait||headImg" alt="">
      </el-form-item>
      <el-form-item label="姓名">
        <span>{{adminData.name}}</span>
      </el-form-item>
      <el-form-item label="证件类型">
        <span>{{adminData.cardtype==1?'身份证':'护照'}}</span>
      </el-form-item>
      <el-form-item label="证件号码">
        <span>{{adminData.idcard}}</span>
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{adminData.phone}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import headImg from './../assets/images/MRman.png'

  export default {
    name: 'systemAdmin',
    data () {
      return {
        adminData:{
        },
        headImg:headImg
      }
    },
    components: {},
    methods: {
      getAdminInfo () {
        let _self = this;
        untils.JsonAxios().post('manage/orguser/volInfo',{}).then(function (res) {
          if(res.code==0){
            _self.adminData = res.data;
            console.log(res);
          }
        })
      },
    },
    created () {
      this.getAdminInfo()
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
</style>
