<template>
  <div class="mainBox">
    <div class="volTableTitleBox">新增招募活动</div>
    <div></div>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import config from '@/assets/js/config'
  import UE from '@/components/UE';
  import cityPicker from '@/components/cityPicker'
  import gaomap from '@/components/gaomap'
  import OSS from 'ali-oss'

  export default {
    name: 'addVol',
    data(){
      return{
        form:{

        }
      }
    },
    methods:{

    },
    components:{
      UE,
      cityPicker,
      gaomap
    }
  }
</script>

<style scoped>

</style>
