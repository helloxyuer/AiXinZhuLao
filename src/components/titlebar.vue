/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="titleBar">
    <div class="logoBox">
      <div class="logoImg" v-if="false"><img :src="logo" alt=""></div>
      <div class="entName">后台管理系统</div>
    </div>
    <el-menu
      class="el-menu-my"
      background-color="#06c1ad"
      text-color="#ffffff"
      active-text-color="#ffffff"
      :router="true"
      mode="horizontal">
      <el-menu-item index="6" :route="{name:'systemAdmin'}">
        <i class="chen-wode titleIconColor"></i>
        <span slot="title">我的</span>
      </el-menu-item>
      <el-menu-item index="7" :route="{name:'resetPwd'}">
        <i class="el-icon-setting titleIconColor"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
      <el-menu-item index="" @click="loginOut()">
        <i class="chen-dengchu titleIconColor"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import logo from './../assets/images/logo.png'

  export default {
    name: 'titlebar',
    data () {
      return {
        logo:logo,
        msg: 'titlebar'
      }
    },
    methods:{
      loginOut(){
        sessionStorage.clear();
        this.$router.replace({ name: 'login'})
        console.log('登出')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .titleBar{
    color: #ffffff;
  }
  .logoImg{
    float: left;
    margin-top: 10px;
  }
  .logoBox{
    float: left;
  }
  .entName{
    float: left;
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
