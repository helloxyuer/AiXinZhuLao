/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
    <div class="navBarBox">'
      <div>
        <div>志愿者管理</div>
        <div>
          <router-link :to="{name:'volManage'}" tag="div">志愿者管理</router-link>
          <router-link :to="{name:'volCheck'}" tag="div">志愿者审核</router-link>
          <router-link :to="{name:'volHonorManage'}" tag="div">荣耀时数管理</router-link>
        </div>
      </div>
      <div>
        <div>招募管理</div>
        <div>
          <router-link :to="{ path: 'register' }" tag="div">活动招募管理</router-link>
        </div>
      </div>
      <div>
        <div>签到管理</div>
        <div>
          <router-link :to="{ path: 'register' }" tag="div">活动签到管理</router-link>
        </div>
      </div>
      <div>
        <div>数据统计</div>
        <div>
          <router-link :to="{ path: 'register' }" tag="div">组织数据统计</router-link>
          <router-link :to="{ path: 'register' }" tag="div">活动数据统计</router-link>
          <router-link :to="{ path: 'register' }" tag="div">异常数据统计</router-link>
        </div>
      </div>
      <div>
        <div>系统管理</div>
        <div>
          <router-link :to="{ path: 'register' }" tag="div">组织管理</router-link>
          <router-link :to="{ path: 'register' }" tag="div">组织审核</router-link>
          <router-link :to="{ path: 'register' }" tag="div">管理员管理</router-link>
        </div>
      </div>
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
