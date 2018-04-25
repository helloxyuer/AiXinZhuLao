<template>
  <div class="mainBox">
    <div class="volTableTitleBox">新增招募活动</div>
    <div>
      <el-form
        ref="addVolFormRef"
        :model="form"
        :rules="rules"
        class="adminTable"
        label-width="110px">
        <el-form-item label="活动图片" prop="picurl">
          <el-upload
            class="upload-demo"
            action="http://oss-cn-hangzhou.aliyuncs.com/posts/"
            ref="upload"
            :on-preview="handlePreview"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="success">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名 " prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="cardType">
          <el-select v-model="form.cardType" placeholder="请选择证件类型">
            <el-option label="身份证" value="1"></el-option>
            <el-option label="护照" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="idNum">
          <el-input v-model="form.idNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="form.tel" type="number"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="isParty">
          <el-select v-model="form.cardType" placeholder="请选择证件类型">
            <el-option label="身份证" value="1"></el-option>
            <el-option label="护照" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居住地" prop="address">
          <cityPicker @citypicked="getcity"></cityPicker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitClick('addVolFormRef')">提交</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import config from '@/assets/js/config'
  import UE from '@/components/UE';
  import cityPicker from '@/components/cityPicker'
  import gaomap from '@/components/gaomap'
  import OSS from 'ali-oss'

  export default {
    name: 'addVol',
    data(){
      return{
        form:{
          picurl:'',
          name:'',
          cardType:'',
          idNum:'',
          tel:'',
          isParty:'',
          address:'',
        },
        dialogVisible:false,
        dialogImageUrl:''
      }
    },
    methods:{
      handleExceed(file, fileList) {
        this.$message({
          message:'图片只能上传一张',
          type:'error'
        });
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      submitClick(ref){

      },
      getcity(e){
        console.log(val)
        if(val.province){
          this.form.cityarea = val.province.adcode;
          this.form.provincecode = val.province.adcode;
          this.form.citycode = val.city.adcode;
          this.form.areacode = val.area.adcode;
          this.form.simpleaddress = val.province.name+'-'+val.city.name+'-'+val.area.name;
          this.areamsg.adcode = val.area.adcode;
        }else{
          this.form.cityarea = '';
          this.form.provincecode = '';
          this.form.citycode = '';
          this.form.areacode = '';
          this.form.simpleaddress = '';
          this.areamsg.adcode = '';
        }
      }
    },
    components:{
      UE,
      cityPicker,
      gaomap
    }
  }
</script>

<style scoped>

</style>
