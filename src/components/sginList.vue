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
        v-model="name"
        clearable>
      </el-input>
      <el-select v-model="state" clearable placeholder="状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="actNameTime"
        type="daterange"
        range-separator="至"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button @click="getVolList()" type="success" icon="el-icon-search">搜索</el-button>
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
        min-width="80">
        <template slot-scope="scope">
          <span class="volstatus5" v-if="scope.row.state==0">草稿</span>
          <span class="volstatus1" v-if="scope.row.state==1">待审核</span>
          <span class="volstatus4" v-if="scope.row.state==2">通过</span>
          <span class="volstatus2" v-if="scope.row.state==3">不通过</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.state!=2" class="item" effect="dark" content="编辑" placement="top-start">
            <el-button @click="endit(scope.row)"><i class="el-icon-edit-outline"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="详情" placement="top-start">
            <el-button @click="goDetails(scope.row)"><i class="el-icon-view"></i></el-button>
          </el-tooltip>
          <el-tooltip v-if="scope.row.state!=2" class="item" effect="dark" content="删除" placement="top-start">
            <el-button @click="opendeleteDialog(scope.row)"><i class="el-icon-delete"></i></el-button>
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
    <el-dialog
      title="删除提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确认要删除该签到活动？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="success" @click="deleteSgin()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'

  export default {
    name: 'sginList',
    data() {
      return {
        options: [{
          value: '0',
          label: '草稿'
        }, {
          value: '1',
          label: '待审核'
        }, {
          value: '2',
          label: '审核通过'
        }, {
          value: '3',
          label: '审核不通过'
        }],
        tableData: [],
        pageIndex:1,
        pageSize:10,
        pageTotal:0,
        state:'',
        actNameTime:[],
        name:'',
        dialogVisible:false,
        RecToDel:{}
      }
    },
    methods: {
      getVolList () {
        let _self=this;
        let params ={
          state:_self.state,
          type:1,
          begintime:_self.actNameTime[0],
          endtime:_self.actNameTime[1],
          name:_self.name,
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
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getVolList();
      },
      gotoSginAct(){
        this.$router.push({name:'addSignAct'})
      },
      //跳人数详情
      gotoSginList(data){
        console.log(data)
        this.$router.push({name:'sginListManage',query:{sginId:data.uuid,sginName:data.name}})
      },
      //打开弹窗
      opendeleteDialog(x){
        this.dialogVisible = true;
        this.RecToDel = x;
      },
      //删除签到
      deleteSgin (x) {
        this.dialogVisible = false;
        let _self=this;
        let params ={
          signActId:_self.RecToDel.uuid,
        }
        untils.JsonAxios().post('manage/signact/delete',params).then(function (res) {
          if(res.code==0){
            _self.getVolList();
          }
        })
      },
      goDetails(params){
        this.$router.push({name:'sginDetails',query:{sginId:params.uuid }})
      },
      endit(params){
        this.$router.push({name:'addSignAct',query:{sginId:params.uuid }})
      },
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
  .signStatus{
    cursor: pointer;
    color: #06c9b5 ;
  }
</style>

