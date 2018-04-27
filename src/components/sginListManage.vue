<template>
  <div class="mainBox">
    <div class="volTableTitleBox">
      <span>签到人员列表</span>
      <span v-if="sginName">({{sginName}})</span>
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
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="证件号"
        sortable
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="signTime1"
        label="签到时间"
        sortable
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="signTime2"
        label="签退时间">
      </el-table-column>
      <el-table-column
        prop="alltime"
        label="工时">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详情" placement="top-start">
            <el-button><i class="el-icon-view"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="修改时长" placement="top-start">
            <el-button @click="changeTime(scope.row)"><i class="el-icon-time"></i></el-button>
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
    <el-dialog title="修改工时" :visible.sync="dialogTableVisible">
      <el-form label-width="100px">
        <el-form-item label="工时修改">
          <el-input-number v-model="duration" class="gongshi" :step="1"></el-input-number>
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
        duration:1,
        changeReson:'',
        changeTimeMan:{},
      }
    },
    methods: {
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
      changeTime(val){
        this.dialogTableVisible = true;
        this.changeTimeMan = val;
        this.duration = val.duration;
      },
      submitTime(){
        let _self=this;
        let params ={
          reason:this.changeReson,
          signactactid:this.changeTimeMan.uuid,
          upnum:this.duration,
        }
        untils.JsonAxios().post('manage/signact/upsigntime',params).then(function (res) {
          if(res.code==0){
            _self.getVolList();
          }
        })
      }
    },
    created(){
      this.sginName = this.$route.query.sginName;
      this.sginId = this.$route.query.sginId;
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
  .gongshi{
    float: left;
  }
</style>
