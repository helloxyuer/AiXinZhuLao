<template>
  <div class="mainBox">
    <div class="volTableTitleBox">
      <span>签到人员列表</span>
      <span v-if="sginName">({{sginName}})</span>
      <span v-if="sginName" class="backbtn" @click="backPage()">返回</span>
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
      <el-button type="success" @click="getVolList()" icon="el-icon-search">搜索</el-button>
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
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="证件号"
        sortable
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="signtime"
        label="签到时间"
        sortable
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="outtime"
        label="签退时间">
      </el-table-column>
      <el-table-column
        prop="duration"
        label="工时">
        <template slot-scope="scope">
          <span>{{scope.row.duration}}</span>
          <span v-if="scope.row.reason">({{scope.row.reason}})</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详情" placement="top-start">
            <el-button @click="goDetails(scope.row)"><i class="el-icon-view"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="修改时长" placement="top-start">
            <el-button @click="changeTime(scope.row)"><i class="el-icon-time"></i></el-button>
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
    <el-dialog title="修改工时" :visible.sync="dialogTableVisible">
      <el-form label-width="100px">
        <el-form-item label="工时修改">
          <el-input-number v-model="duration" class="gongshi" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="修改理由">
          <el-input
            v-model.trim="changeReson"
            maxlength="40"
            clearable></el-input>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="submitTime()">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'

  export default {
    name: 'sginListManage',
    data() {
      return {
        tableData: [],
        pageIndex:1,
        pageSize:10,
        pageTotal:0,
        name:'',
        idcard:'',
        sginName:'',
        sginId:'',
        dialogTableVisible:false,
        duration:0,
        changeReson:'',
        changeTimeMan:{},
      }
    },
    methods: {
      backPage(){
        this.$router.go(-1);
      },
      getVolList () {
        let _self=this;
        let params ={
          orgid:untils.storageS.get('orgId'),
          signactivityid:_self.sginId,
          idcard:_self.idcard,
          name:_self.name,
          page:_self.pageIndex,
          limit:_self.pageSize,
        }
        untils.JsonAxios().post('manage/signact/signlist',params).then(function (res) {
          if(res.code==0){
            _self.tableData = res.data.list;
            _self.pageTotal = res.data.totalCount;
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
      changeTime(val){
        this.dialogTableVisible = true;
        this.changeTimeMan = val;
        this.changeReson = '';
        this.duration = val.duration||0;
      },
      submitTime(){
        let _self=this;
        if(!_self.changeReson){
          _self.$message({
            message:'修改理由为空',
            type:'error'
          })
          return
        }
        let params ={
          reason:this.changeReson,
          signactactid:this.changeTimeMan.uuid,
          upnum:this.duration,
        }
        untils.JsonAxios().post('manage/signact/upsigntime',params).then(function (res) {
          if(res.code==0){
            _self.dialogTableVisible = false;
            _self.getVolList();
          }
        }),function () {
          _self.dialogTableVisible = false;
        }
      },
      goDetails(params){
        this.$router.push({name:'volDetails',query:{volId:params.userid }})
      },
    },
    created(){
      this.sginName = this.$route.query.sginName;
      this.sginId = this.$route.query.sginId;
      this.getVolList();
    },
    watch:{
      $route: {
        handler(newValue, oldValue) {
          this.sginName = this.$route.query.sginName;
          this.sginId = this.$route.query.sginId;
          this.getVolList();
        }
      },
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
  .gongshi{
    float: left;
  }
</style>
