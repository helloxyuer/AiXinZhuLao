/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="mainBox">
    <div class="volTableTitleBox">招募报名人员列表</div>
    <div class="searchBar">
      <el-input
        placeholder="姓名"
        class="actPersonName"
        v-model="actPersonName"
        clearable>
      </el-input>
      <el-input
        placeholder="证件号"
        class="actPersonCard"
        v-model="actPersonCard"
        clearable>
      </el-input>
      <el-button type="success" icon="el-icon-search">搜索</el-button>
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
        prop="idcard"
        label="活动开始时间"
        sortable
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="address"
        sortable
        label="活动结束时间"
        min-width="140"
        :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="招募情况"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="status"
        label="发布人"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="status"
        label="联系电话"
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
        fixed="right"
        width="80">
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
    name: 'recruitListManage',
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
        actPersonName:'',
        actPersonCard:'',
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },

      getVolList (status) {
        let _self=this;
        let params ={
          state:status||'0',
          type:1,
          page:_self.pageIndex,
          limit:_self.pageSize,
        }
        untils.JsonAxios().post('manage/act/list',params).then(function (res) {
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
      }
    },
    created(){
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
