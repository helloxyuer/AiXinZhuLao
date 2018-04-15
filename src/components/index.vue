/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div>
    <titlebar></titlebar>
    <navbar></navbar>
    <router-view/>
  </div>
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
