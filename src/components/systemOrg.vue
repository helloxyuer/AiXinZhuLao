<template>
  <div class="mainBox">
    <div class="volTableTitleBox">组织详情</div>
    <el-form class="adminTable fixFormHead" label-width="100px">
      <el-form-item label="组织头像">
        <img class="headImg" :src="orgData.hdportrait||headImg" alt="">
      </el-form-item>
      <el-form-item label="组织名称">
        <span>{{orgData.name}}</span>
      </el-form-item>
      <el-form-item label="组织分类">
        <span>{{orgData.type}}</span>
      </el-form-item>
      <el-form-item label="开放展示">
        <span>{{orgData.isshow==0?'否':'是'}}</span>
      </el-form-item>
      <el-form-item label="所在地区">
        <span>{{orgData.simpleaddress}}</span>
      </el-form-item>
      <el-form-item label="公益宣言">
        <span>{{orgData.autograph}}</span>
      </el-form-item>
      <el-form-item label="组织介绍">
        <span>{{orgData.autograph}}</span>
      </el-form-item>
      <el-form-item label="详细地址">
        <span>{{orgData.address}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import headImg from './../assets/images/MRman.png'

  export default {
    name: 'systemOrg',
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
