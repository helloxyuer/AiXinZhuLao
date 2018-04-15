/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div>
    <div>用户名: <input type="text" v-model.trim="userName"></div>
    <div>密码: <input type="text" v-model.trim="passWord"></div>
    <button>提交</button>
    <router-link :to="{ path: 'register' }">注册</router-link>
    <router-link :to="{ path: 'index' }">主页</router-link>
    <router-link :to="{ path: 'forgetpw' }">忘记密码</router-link>
    <cityPicker></cityPicker>
  </div>
</template>

<script>
  import untils from '../assets/js/untils'
  import cityPicker from '@/components/cityPicker'

  export default {
    name: 'login',
    data () {
      return {
        userName: 'msg',
        passWord: 'msg'
      }
    },
    components:{
      cityPicker
    },
    created(){
      //untils.dialogs.load('load','nihaoa',1000);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
