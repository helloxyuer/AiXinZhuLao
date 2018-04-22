<template>
  <div class="mainBox">
    <div class="volTableTitleBox">新增招募活动</div>
    <div>
      <el-form ref="addRecForm" :model="form" class="adminTable fixFormHead" label-width="100px">
        <el-form-item label="活动图片">
          <el-upload
            class="upload-demo"
            action="http://oss-cn-hangzhou.aliyuncs.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.actname"></el-input>
        </el-form-item>
        <el-form-item label="招募人数">
          <el-input v-model="form.actnum"></el-input>
        </el-form-item>
        <el-form-item label="开放类型">
          <el-select v-model="form.actopen" placeholder="请选择开放类型">
            <el-option label="全体开放" value="all"></el-option>
            <el-option label="组织开放" value="org"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="form.actType" placeholder="请选择活动类型">
            <el-option v-for="x in actType" :key="x.id" :label="x.name" :value="x.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <cityPicker @citypicked="getcity"></cityPicker>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="活动招募时间">
          <el-date-picker
            v-model="form.actStartTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动进行时间">
          <el-date-picker
            v-model="form.actEndTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动详情">
          <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import headImg from './../assets/images/MRman.png'
  import UE from '@/components/UE';
  import cityPicker from '@/components/cityPicker'

  export default {
    name: 'addRecrutAct',
    data () {
      return {
        headImg:headImg,
        imageUrl:'',
        form:{},
        actType:{},
        defaultMsg: '这里是UE测试',
        dialogImageUrl:'',
        dialogVisible:false,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    components: {
      UE,
      cityPicker
    },
    methods: {
      getOrgTypeList(){
        let _self=this;
        untils.JsonAxios().post('sys/serviceTypelist',{}).then(function (res) {
          if(res.code==0){
            _self.actType = res.data;
            console.log(res.data)
          }
        })
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },
      getcity:function (val) {
        console.log(val)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    created () {
      this.getOrgTypeList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .headImg{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .adminTable{
    width: 500px;
    margin-left: 100px;
    padding: 20px 0;
    text-align: left;
  }
</style>

