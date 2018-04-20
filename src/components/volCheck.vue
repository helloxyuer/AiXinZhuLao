/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="mainBox">
    <div class="volTableTitleBox">志愿者审核</div>
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
        prop="volcode"
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
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        fixed="right"
        width="180">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详情" placement="top-start">
            <el-button v-on:click="checkDetails(scope.row)"><i class="el-icon-view"></i></el-button>
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
    name: 'volCheck',
    data() {
      return {
        tableData: [],
        pageIndex:1,
        pageSize:10,
        pageTotal:0,
      }
    },
    methods: {
      getVolList (status) {
        let _self=this;
        let params ={
          status:status||'1',
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
      checkDetails(params){
        this.$router.push({name:'volDetails',query:{volId:params.userid }})
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getVolList();
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getVolList();
      }
    },
    created(){
      this.getVolList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

