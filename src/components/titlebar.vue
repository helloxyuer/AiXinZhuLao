/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="titleBar">
    <div class="logoBox">
      <div class="entLog"></div>
      <div class="entName">试试水啦</div>
    </div>
    <el-menu
      class="el-menu-my"
      background-color="#06c1ad"
      text-color="#ffffff"
      active-text-color="#ffffff"
      mode="horizontal">
      <el-menu-item index="1">
        <i class="el-icon-setting titleIconColor"></i>
        <span slot="title">我的</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting titleIconColor"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting titleIconColor"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'titlebar',
    data () {
      return {
        msg: 'titlebar'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .titleBar{
    color: #ffffff;
  }
  .logoBox{
    float: left;
  }
  .entName{
    font-size: 24px;
    font-weight: 500;
    padding-left: 20px;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    border-left: 2px #fff solid;
  }
  .el-menu-my{
    float: right;
  }
  .titleIconColor{
    color: #ffffff;
    margin-right: 0px;
  }
</style>
