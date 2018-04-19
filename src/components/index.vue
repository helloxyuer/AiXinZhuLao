/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <el-container>
    <el-header>
      <titlebar></titlebar>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <navbar></navbar>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import titlebar from '@/components/titlebar'
  import navbar from '@/components/navbar'

  export default {
    name: 'name',
    data () {
      return {
        msg: 'msg'
      }
    },
    components:{
      titlebar,
      navbar,
    },
    created () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
