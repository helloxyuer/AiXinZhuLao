<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="6">
        <div class="grid-content">
          <i class="chen-chenrenshu st-red"></i>
          <div class="index_cot">
            <div class="index_cot_1">{{org.num}}</div>
            <div class="index_cot_2">组织人数</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <i class="chen-chenshizhong st-violet"></i>
          <div class="index_cot">
            <div class="index_cot_1">{{org.duration}}</div>
            <div class="index_cot_2">公益时数</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <i class="chen-chenqizi st-blue"></i>
          <div class="index_cot">
            <div class="index_cot_1">{{count.actnum}}</div>
            <div class="index_cot_2">招募活动</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <i class="el-icon-location st-green"></i>
          <div class="index_cot">
            <div class="index_cot_1">{{count.signact}}</div>
            <div class="index_cot_2">签到活动</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="todoList">
      <div class="volTableTitleBox">待办事项</div>
      <div class="task-content">
        <ul class="task-list">
          <li>
            <el-badge :value="count.waitactsign" :max="99" class="item">
              <span class="elSpan">待审核招募活动人员</span>
            </el-badge>
          </li>
          <li>
            <el-badge :value="count.waitorgsign" :max="99" class="item">
              <span class="elSpan">待审核加入组织人员</span>
            </el-badge>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'

  export default {
    name: 'indexDefault',
    data () {
      return {
        count:{
          actnum:0,
          signact:0,
          waitactsign:0,
          waitorgsign:0
        },
        org:{
          num:0,
          duration:0
        }
      }
    },
    components: {},
    methods: {
      getIndex () {
        let _self=this;
        untils.JsonAxios().post('manage/sys/indexweb',{}).then(function (res) {
          if(res.code==0){
            console.log(res);
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
  .el-row {
    margin: 20px 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .el-col:last-child {
    margin-bottom: 0;
  }
  .grid-content {
    border-radius: 4px;
    background: #ffffff;
    padding: 10px;
  }
  .grid-content i{
    width: 60px;
    height: 60px;
    display: inline-block;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    float: left;
    margin-right: 10px;
    color: #fff;
  }
  .grid-content:after{
    display: block;
    content: '';
    clear: both;
  }
  .st-red {
    background-color: #F05050;
  }
  .st-violet {
    background-color: #7266ba;
  }
  .st-blue {
    background-color: #23b7e5;
  }
  .st-green {
    background-color: #27C24C;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .index_cot{
    float: left;
    height:60px;
  }
  .index_cot_1{
    font-size: 24px;
    font-weight: 600;
  }
  .index_cot_2{
    font-size: 14px;
    padding-top: 2px;
  }
  .todoList{
    background: #ffffff;
    padding-bottom: 10px;
  }
  .task-content .task-list > li {
    position: relative;
    padding: 10px 5px;
    border-bottom: 1px dashed #eaeaea;
    text-align: left;
    margin: 0 10px;
  }
  .elSpan{
    padding-right: 20px;
  }
</style>
