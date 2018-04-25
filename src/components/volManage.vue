/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="mainBox">
    <div class="volTableTitleBox">志愿者列表</div>
    <div class="searchBar">
      <el-input
        placeholder="姓名"
        class="volName"
        v-model="volName"
        clearable>
      </el-input>
      <el-input
        placeholder="证件号"
        class="volIdCard"
        v-model="volIdCard"
        clearable>
      </el-input>
      <el-input
        placeholder="手机号"
        class="volTel"
        v-model="volTel"
        clearable>
      </el-input>
      <el-button type="success" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="addAct">
      <el-button type="danger" icon="el-icon-plus" @click="gotoAddVol()">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      class="volTable"
      :border="true"
      :resizable="true"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="name"
        label="姓名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="证件号"
        sortable
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="volunteernumber"
        label="志愿者编号"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        sortable
        min-width="180">
        <template slot-scope="scope">
          <span class="volstatus1" v-if="scope.row.status==1">待审核</span>
          <span class="volstatus2" v-if="scope.row.status==2">通过</span>
          <span class="volstatus3" v-if="scope.row.status==3">未通过</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        fixed="right"
        width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详情" placement="top-start">
            <el-button @click="goDetails(scope.row)"><i class="el-icon-view"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button @click="toDelVol(scope.row)"><i class="el-icon-delete"></i></el-button>
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
      title="刪除"
      :visible.sync="delVisible"
      width="30%">
      <span>确认要刪除该志愿者？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="success" @click="submitDelVol()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'

  export default {
    name: 'volManage',
    data() {
      return {
        volName:'',
        volIdCard:'',
        volTel:'',
        tableData: [],
        pageIndex:1,
        pageSize:10,
        pageTotal:0,
        delVisible:false,
        volToDel:{}
      }
    },
    methods: {
      getVolList (status) {
        let _self=this;
        let params ={
          status:status,
          page:_self.pageIndex,
          limit:_self.pageSize,
        }
        untils.JsonAxios().post('manage/org/list',params).then(function (res) {
          if(res.code==0){
            _self.tableData = res.data.list;
            _self.pageTotal = res.data.totalCount;
            console.log(res);
          }
        })
      },
      goDetails(params){
        this.$router.push({name:'volDetails',query:{volId:params.userid }})
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getVolList();
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getVolList();
      },
      gotoAddVol(){
        this.$router.push({name:'addVol'})
      },
      toDelVol(val){
        this.delVisible = true;
        this.volToDel = val
      },
      submitDelVol(){
        this.delVisible = false;
        let _self=this;
        let params ={
          signupOrganizeId:_self.volToDel.signupOrganizeId,
        }
        untils.JsonAxios().post('manage/org/deluser',params).then(function (res) {
          if(res.code==0){
            _self.getVolList()
          }
        })
      }
    },
    created(){
      this.getVolList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .volName{
    width: 200px;
  }
  .volIdCard{
    width: 300px;
  }
  .volTel{
    width: 200px;
  }
</style>
