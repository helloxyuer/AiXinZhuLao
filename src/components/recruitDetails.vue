<template>
  <div class="mainBox">
    <div class="volTableTitleBox">招募活动详情</div>
    <el-form class="adminTable" label-width="100px">
      <el-form-item label="活动名称">
        <span>{{details.name}}</span>
      </el-form-item>
      <el-form-item label="组织名称">
        <span>{{details.cardtype}}</span>
      </el-form-item>
      <el-form-item label="开放类型">
        <span>{{details.idcard}}</span>
      </el-form-item>
      <el-form-item label="签到情况">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="活动类型">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="活动地址">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="活动进行时间">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="活动签到/签退时间">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="签到地点">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="签到范围">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="发布人姓名">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="联系电话">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="活动详情">
        <span>{{details.phone}}</span>
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
        details:{
        },
      }
    },
    methods: {
      getDetails(){
        let _self = this;
        let params = {
          userId:this.$route.query.recId
        }
        untils.JsonAxios().post('manage/orguser/voluserinfo',params).then(function (res) {
          if(res.code==0){
            _self.details = res.data;
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

