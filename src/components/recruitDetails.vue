<template>
  <div class="mainBox">
    <div class="volTableTitleBox">招募活动详情</div>
    <el-form class="adminTable" label-width="100px">
      <el-form-item label="活动名称">
        <span>{{details.name}}</span>
      </el-form-item>
      <el-form-item label="组织名称">
        <span>{{details.organizename}}</span>
      </el-form-item>
      <el-form-item label="招募情况">
        <span>{{details.signnum}}/{{details.num}}</span>
      </el-form-item>
      <el-form-item label="活动类型">
        <span>{{details.servicetype}}</span>
      </el-form-item>
      <el-form-item label="活动地址">
        <span>{{details.address}}</span>
      </el-form-item>
      <el-form-item label="活动招募时间">
        <span>{{details.restarttime}} - {{details.reendtime}}</span>
      </el-form-item>
      <el-form-item label="活动进行时间">
        <span>{{details.acbegintime}} - {{details.acendtime}}</span>
      </el-form-item>
      <el-form-item label="发布人姓名">
        <span>{{details.phone}}</span>
      </el-form-item>
      <el-form-item label="联系电话">
        <span>{{details.content}}</span>
      </el-form-item>
      <el-form-item label="活动详情">
        <span v-html="details.details"></span>
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
          actid:this.$route.query.recId
        }
        untils.JsonAxios().post('manage/act/info',params).then(function (res) {
          if(res.code==0){
            _self.details = res.data.activity;
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

