/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <el-menu
    default-active="1"
    :unique-opened="true"
    :router="true"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>志愿者管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" :route="{name:'volManage'}">志愿者管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="1-2" :route="{name:'volCheck'}">志愿者审核</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="1-3" :route="{name:'volHonorManage'}">荣耀时数管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-view"></i>
        <span>招募管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">活动招募管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-star-on"></i>
        <span>签到管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">活动签到管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>数据统计</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">组织数据统计</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="4-2">活动数据统计</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="4-3">异常数据统计</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-bell"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1">组织管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="5-2">组织审核</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="5-3">管理员管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        msg: 'navbar'
      }
    },
    methods:{
      handleOpen () {

      },
      handleClose () {

      }
    }
  }
</script>

<style scoped>
  .navBarBox{
    background: yellow;
  }
</style>
