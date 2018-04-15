/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
    <div>
      <router-link :to="{ path: 'register' }">志愿者管理</router-link>
      <router-link :to="{ path: 'register' }">招募管理</router-link>
      <router-link :to="{ path: 'register' }">签到管理</router-link>
      <router-link :to="{ path: 'register' }">数据统计</router-link>
      <router-link :to="{ path: 'register' }">系统管理</router-link>
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

</style>
