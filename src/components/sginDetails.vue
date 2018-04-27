<template>
  <div class="mainBox">
    <div class="volTableTitleBox">签到活动详情</div>
    <el-form class="adminTable" label-width="130px">
      <el-form-item label="活动名称">
        <span>{{details.name}}</span>
      </el-form-item>
      <el-form-item label="组织名称">
        <span>{{details.organizename}}</span>
      </el-form-item>
      <el-form-item label="开放类型">
        <span v-if="details.opentype==1">全体开放</span>
        <span v-if="details.opentype==2">组织开放</span>
        <span v-if="details.opentype==3">关联活动</span>
      </el-form-item>
      <el-form-item label="签到情况">
        <span>{{details.signnum}}/{{details.num}}</span>
      </el-form-item>
      <el-form-item label="活动类型">
        <span>{{details.servicetype}}</span>
      </el-form-item>
      <el-form-item label="活动地址">
        <span>{{details.address}}</span>
      </el-form-item>
      <el-form-item label="活动进行时间">
        <span>{{details.begintime}} - {{details.endtime}}</span>
      </el-form-item>
      <el-form-item label="活动签到/签退时间">
        <span>{{details.signbegintime}} - {{details.signendtime}}</span>
      </el-form-item>
      <el-form-item label="签到地点">
        <div>
          <div v-for="item in details.range">
            <div>签到地址：{{item.address}}</div>
            <div>签到范围：{{item.ranges}}m</div>
            <div v-if="item.type==1">签到类型：[可签到/可签退]</div>
            <div v-if="item.type==2">签到类型：[只可签到]</div>
            <div v-if="item.type==3">签到类型：[只可签退]</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="联系电话">
        <span>{{details.phone}}</span>
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
    name: 'sginDetails',
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
          signactactid:this.$route.query.sginId
        }
        untils.JsonAxios().post('manage/signact/info',params).then(function (res) {
          if(res.code==0){
            _self.details = res.data;
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

