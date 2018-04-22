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
        <div class="orgName">{{orgName}}</div>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import untils from '@/assets/js/untils'
  import titlebar from '@/components/titlebar'
  import navbar from '@/components/navbar'

  export default {
    name: 'index',
    data () {
      return {
        orgName: ''
      }
    },
    components:{
      titlebar,
      navbar,
    },
    methods:{
      getIndex () {
        let _self=this;
        untils.JsonAxios().post('manage/sys/indexweb',{}).then(function (res) {
          if(res.code==0){
            _self.orgName = res.data.orginfo.name;
            untils.storageS.set('orgId',res.data.orginfo.uuid)
            untils.storageS.set('orgName',res.data.orginfo.name)
          }
        })
      },
    },
    created () {
      this.getIndex()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .orgName{
    font-size: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
</style>
