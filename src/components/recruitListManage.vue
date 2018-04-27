/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="mainBox">
    <div class="volTableTitleBox">
      <span>招募人员列表</span>
      <span v-if="recName">({{recName}})</span>
    </div>
    <div class="searchBar">
      <el-input
        placeholder="姓名"
        class="actPersonName"
        v-model="name"
        clearable>
      </el-input>
      <el-input
        placeholder="证件号"
        class="actPersonCard"
        v-model="idcard"
        clearable>
      </el-input>
      <el-button @click="getVolList()" type="success" icon="el-icon-search">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      :border="true"
      :resizable="true"
      class="volTable"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="username"
        label="姓名"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="证件号"
        sortable
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="activityname"
        label="活动名称"
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="activityname"
        label="活动时间"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="报名时间"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.status==1" class="item" effect="dark" content="通过" placement="top-start">
            <el-button v-on:click="passVol(scope.row)"><i class="el-icon-check"></i></el-button>
          </el-tooltip>
          <el-tooltip v-if="scope.row.status==1" class="item" effect="dark" content="拒绝" placement="top-start">
            <el-button v-on:click="unpassVol(scope.row)"><i class="el-icon-close"></i></el-button>
          </el-tooltip>
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
    <el-dialog
      title="通过"
      :visible.sync="passVisible"
      width="30%">
      <span>确认要通过该志愿者？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passVisible = false">取 消</el-button>
        <el-button type="success" @click="submitpassVol()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="拒绝"
      :visible.sync="unpassVisible"
      width="30%">
      <span>确认要拒绝该志愿者？</span>
      <div class="reasonDiv">
        <span class="reasonSpan">拒绝理由(必填):</span>
        <el-input class='reasonInput' v-model.trim="unpassReason" placeholder="请输入拒绝理由" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unpassVisible = false">取 消</el-button>
        <el-button type="success" @click="submitunpassVol()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'

  export default {
    name: 'recruitListManage',
    data() {
      return {
        tableData: [],
        pageIndex:1,
        pageSize:10,
        pageTotal:0,
        recName:'',
        idcard:'',
        name:'',
        recId:'',
        passVisible:false,
        unpassVisible:false,
        unpassReason:'',
        checkedMan:{}
      }
    },
    methods: {
      getVolList () {
        let _self=this;
        let params ={
          activityid: _self.recId,
          name: _self.name,
          idcard: _self.idcard,
          page:_self.pageIndex,
          limit:_self.pageSize,
        }
        untils.JsonAxios().post('manage/act/signlist',params).then(function (res) {
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
      passVol(vol){
        this.checkedMan = vol;
        this.passVisible = true;

      },
      submitpassVol(){
        this.passVisible = false;
        let _self=this;
        let params ={
          type:'1',
          signupOrganizeId:_self.checkedMan.signupOrganizeId,
        }
        untils.JsonAxios().post('manage/act/examine',params).then(function (res) {
          if(res.code==0){
            _self.getVolList();
          }
        })
      },
      unpassVol(vol){
        this.checkedMan = vol;
        this.unpassVisible = true;
      },
      submitunpassVol(){
        let _self=this;
        if(!_self.unpassReason){
          _self.$message({
            message:'拒绝理由为空',
            type:'error'
          })
          return
        }
        this.unpassVisible = false;
        let params ={
          type:'2',
          reason:_self.unpassReason,
          actsignupId:_self.checkedMan.uuid,
        }
        untils.JsonAxios().post('manage/act/examine',params).then(function (res) {
          if(res.code==0){
            _self.getVolList();
          }
        })
      },
    },
    created(){
      this.recName = this.$route.query.recName;
      this.recId = this.$route.query.recId;
      this.getVolList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .actPersonName{
    width: 200px;
  }
  .actPersonCard{
    width: 300px;
  }
</style>
