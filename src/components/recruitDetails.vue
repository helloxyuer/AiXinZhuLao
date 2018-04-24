<template>
  <div class="mainBox">
    <div class="volTableTitleBox">志愿者详情</div>
    <el-form class="adminTable" label-width="100px">
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

  export default {
    name: 'recruitDetails',
    data () {
      return {
        userData:{
        },
      }
    },
    methods: {
      getDetails(){
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
    },
    created () {
      this.getDetails()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

