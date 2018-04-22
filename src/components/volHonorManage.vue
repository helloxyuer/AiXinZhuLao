/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="components-container">
    <!--<div class="editor-container">
      <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
    </div>
    <button @click="getUEContent()">获取内容</button>-->
    <gaomap></gaomap>
  </div>
</template>

<script>
  import UE from '@/components/UE';
  import gaomap from '@/components/gaomap';

  export default {
    name: 'volHonorManage',
    data () {
      return {
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
      }
    },
    methods:{
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      }
    },
    components:{
      UE,
      gaomap
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
