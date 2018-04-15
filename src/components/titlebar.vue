/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
    <div class="titleBar">{{msg}}</div>
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
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: #cccccc;
    background: green;
  }
</style>
