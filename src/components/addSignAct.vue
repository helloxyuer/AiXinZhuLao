<template>
  <div class="mainBox">
    <div class="volTableTitleBox">新增签到活动</div>
    <div>
      <el-form class="adminTable fixFormHead" label-width="100px">
        <el-form-item label="活动名称">
        </el-form-item>
        <el-form-item label="所属组织">
        </el-form-item>
        <el-form-item label="开放类型">
        </el-form-item>
        <el-form-item label="活动类型">
        </el-form-item>
        <el-form-item label="活动地址">
        </el-form-item>
        <el-form-item label="详细地址">
        </el-form-item>
        <el-form-item label="定时周期">
        </el-form-item>
        <el-form-item label="活动进行时间">
        </el-form-item>
        <el-form-item label="活动签到/签退时间">
        </el-form-item>
        <el-form-item label="签到地点">
        </el-form-item>
        <el-form-item label="签到范围">
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import headImg from './../assets/images/MRman.png'

  export default {
    name: 'addSignAct',
    data () {
      return {
        orgData:{},
        headImg:headImg
      }
    },
    components: {},
    methods: {
      getOrgInfo () {
        let _self=this;
        untils.JsonAxios().post('manage/sys/indexweb',{}).then(function (res) {
          if(res.code==0){
            _self.orgData = res.data.orginfo
          }
        })
      },
    },
    created () {
      this.getOrgInfo();
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

