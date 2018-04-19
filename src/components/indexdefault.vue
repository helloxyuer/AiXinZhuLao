<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple">组织人数</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">公益时数</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">招募活动</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">签到活动</div></el-col>
    </el-row>
    <div >
      <div class="volTableTitleBox">待办事项</div>
      <div>待审核招募活动人员</div>
      <div>待审核加入组织人员</div>
    </div>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'

  export default {
    name: 'indexDefault',
    data () {
      return {}
    },
    components: {},
    methods: {},
    created () {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .el-col:last-child {
    margin-bottom: 0;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
