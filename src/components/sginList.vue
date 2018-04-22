/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="mainBox">
    <div class="volTableTitleBox">签到活动列表</div>
    <div class="searchBar">
      <el-input
        placeholder="活动名称"
        class="actName"
        v-model="actName"
        clearable>
      </el-input>
      <el-select v-model="actNameStatus" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="actNameTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="success" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="addAct">
      <el-button type="danger" icon="el-icon-plus" @click="gotoSginAct()">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      :border="true"
      :resizable="true"
      class="volTable"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="name"
        label="活动名称"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="organizename"
        label="所属机构"
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="signStatus"
        label="签到情况">
        <template slot-scope="scope">
          <span class="signStatus" @click="gotoSginList(scope.row)">{{scope.row.signnum}}</span> /
          <span>{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="发布人"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="发布时间"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        sortable
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        min-width="180">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详情" placement="top-start">
            <el-button><i class="el-icon-view"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button><i class="el-icon-delete"></i></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="mypagination"
      :background="true"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'

  export default {
    name: 'sginList',
    data() {
      return {
        options: [{
          value: '1',
          label: '草稿'
        }, {
          value: '2',
          label: '待审核'
        }, {
          value: '3',
          label: '审核通过'
        }, {
          value: '4',
          label: '审核不通过'
        }],
        tableData: [],
        pageIndex:1,
        pageSize:10,
        pageTotal:0,
        actName:'',
        actNameStatus:'',
        actNameTime:'',
      }
    },
    methods: {
      getVolList (status) {
        let _self=this;
        let params ={
          state:status,
          type:1,
          page:_self.pageIndex,
          limit:_self.pageSize,
        }
        untils.JsonAxios().post('manage/signact/list',params).then(function (res) {
          if(res.code==0){
            _self.tableData = res.data.list;
            _self.pageTotal = res.data.totalCount;
            console.log(res);
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getVolList();
        console.log(`每页 ${val} 条`);
        console.log(this.pageSize);
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getVolList();
        console.log(`当前页: ${val}`);
        console.log(this.pageIndex);
      },
      gotoSginAct(){
        this.$router.push({name:'addSignAct'})
      },
      //跳人数详情
      gotoSginList(data){
        console.log(data)
        this.$router.push({name:'sginListManage',query:{sginId:data.uuid,sginName:data.name}})
      }
    },
    created(){
      this.getVolList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .actName{
    width: 200px;
  }
  .addAct{
    padding: 10px;
    text-align: left;
  }
  .signStatus{
    cursor: pointer;
    color: #06c9b5 ;
  }
</style>

