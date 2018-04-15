/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
    <div class="navBarBox">
      <router-link :to="{ path: 'register' }" tag="div">志愿者管理</router-link>
      <router-link :to="{ path: 'register' }" tag="div">招募管理</router-link>
      <router-link :to="{ path: 'register' }" tag="div">签到管理</router-link>
      <router-link :to="{ path: 'register' }" tag="div">数据统计</router-link>
      <router-link :to="{ path: 'register' }" tag="div">系统管理</router-link>
    </div>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        msg: 'navbar'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navBarBox{
    width: 100px;
    height: calc(100vh - 80px);
    float: left;
    background: yellow;
  }
</style>
