<template>
  <div>
    <gaomap :areamsg="areamsg"></gaomap>
  </div>
</template>

<script>
  import gaomap from '@/components/gaomap';

  export default {
    name: 'test',
    data(){
      return {
        areamsg:{
          adcode:330100,
          address:'杭州市',
          lng: 120.662449,
          lat: 29.982132
        }
      }
    },
    components:{
      gaomap
    }
  }
</script>

<style scoped>

</style>
