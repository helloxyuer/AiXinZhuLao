/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <el-menu
    default-active="1"
    :unique-opened="true"
    :router="true"
    active-text-color="#06c1ad"
    @open="handleOpen"
    @close="handleClose">
    <el-menu-item index="1" :route="{name:'indexdefault'}">
      <i class="chen-chenhome"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="chen-chenqizi"></i>
        <span>招募管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" :route="{name:'recruitList'}">活动列表</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="2-2" :route="{name:'recruitListManage'}">报名人员列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>签到管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" :route="{name:'sginList'}">活动列表</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="3-2" :route="{name:'sginListManage'}">签到人员列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="chen-chenrenshu"></i>
        <span>志愿者管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" :route="{name:'volManage'}">志愿者列表</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="4-2" :route="{name:'volCheck'}">志愿者审核</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="4-3" :route="{name:'volHonorManage'}">富文本编辑器</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1" :route="{name:'systemOrg'}">组织详情</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="5-2" :route="{name:'systemAdmin'}">管理员详情</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!--<el-submenu index="4">
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
    </el-submenu>-->
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
