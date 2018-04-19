/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="mainBox">
    <div class="volTableTitleBox">招募列表</div>
    <el-table
      :data="tableData"
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="志愿者编号"
        :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="180">
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
    name: 'recruitLis',
    data() {
      return {
        tableData: [],
        pageIndex:1,
        pageSize:10,
        pageTotal:0,
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

</style>
