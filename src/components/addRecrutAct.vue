<template>
  <div class="mainBox">
    <div class="volTableTitleBox">新增招募活动</div>
    <div>
      <el-form
        ref="addRecFormRef"
        :model="form"
        :rules="rules"
        class="adminTable fixFormHead"
        label-width="110px">
        <el-form-item label="活动图片" prop="actImgUrl">
          <el-upload
            class="upload-demo"
            action="http://oss-cn-hangzhou.aliyuncs.com/posts/"
            :on-preview="handlePreview"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="success">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="活动名称" prop="actname">
          <el-input v-model="form.actname"></el-input>
        </el-form-item>
        <el-form-item label="招募人数" prop="actnum">
          <el-input v-model="form.actnum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="开放类型" prop="actopen">
          <el-select v-model="form.actopen" placeholder="请选择开放类型">
            <el-option label="全体开放" value="all"></el-option>
            <el-option label="组织开放" value="org"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型" prop="actType">
          <el-select v-model="form.actType" placeholder="请选择活动类型">
            <el-option v-for="x in actType" :key="x.id" :label="x.name" :value="x.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域" prop="cityarea">
          <cityPicker @citypicked="getcity"></cityPicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" @focus="showMap()"></el-input>
        </el-form-item>
        <el-form-item label="活动招募时间" prop="actTime1">
          <el-date-picker
            v-model="form.actTime1"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="招募开始日期"
            end-placeholder="招募结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动进行时间" prop="actTime2">
          <el-date-picker
            v-model="form.actTime2"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="活动开始时间"
            end-placeholder="活动结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动详情" prop="details">
          <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitClick('addRecFormRef')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="地图选点" :visible.sync="mapdialogVisible">
      <gaomap :areamsg="areamsg" @pointPicked="getPoint"></gaomap>
    </el-dialog>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import headImg from './../assets/images/MRman.png'
  import UE from '@/components/UE';
  import cityPicker from '@/components/cityPicker'
  import gaomap from '@/components/gaomap'

  export default {
    name: 'addRecrutAct',
    data () {
      return {
        headImg:headImg,
        imageUrl:'',
        actType:{},
        defaultMsg: '<p><span style="font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px;">招募要求：</span></p><p style="word-wrap: break-word; font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px; white-space: normal;">招募范围：</p><p style="word-wrap: break-word; font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px; white-space: normal;">活动内容：</p><p style="word-wrap: break-word; font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px; white-space: normal;">活动具体时间：</p><p><br/></p>',
        dialogImageUrl:'',
        dialogVisible:false,
        mapdialogVisible:false,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        areamsg:{
          address:'',
          adcode:'',
          lng:'',
          lat:''
        },//默认签到地点
        form:{
          actImgUrl:'',
          actname:'',
          actnum:'',
          actopen:'',
          actType:'',
          cityarea:'',
          address:'',
          actTime1:'',
          actTime2:'',
          details:'',
        },
        rules: {
          actImgUrl: [
            { required: true, message: '请选择活动图片', trigger: 'blur' },
          ],
          actname: [
            { required: true, message: '请输入活动名称', trigger: 'change' }
          ],
          actnum: [
            { required: true, message: '请输入活动人数', trigger: 'change' }
          ],
          actTime1: [
            { required: true, message: '请选择招募时间', trigger: 'change' }
          ],
          actTime2: [
            { required: true, message: '请选择进行时间', trigger: 'change' }
          ],
          actopen: [
            { required: true, message: '请选择开放类型', trigger: 'change' }
          ],
          actType: [
            { required: true, message: '请选择活动类型', trigger: 'change' }
          ],
          cityarea: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请选择活动地址', trigger: 'change' }
          ],
          details: [
            { required: true, message: '请选择活动内容', trigger: 'change' }
          ]
        }
      }
    },
    components: {
      UE,
      cityPicker,
      gaomap
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
        console.log(content)
      },
      getcity (val) {
        console.log(val)
        if(val.province){
          this.form.cityarea = val.province.adcode;
          this.form.provincecode = val.province.adcode;
          this.form.citycode = val.city.adcode;
          this.form.areacode = val.area.adcode;
          this.form.simpleaddress = val.province.name+'-'+val.city.name+'-'+val.area.name;
          this.areamsg.adcode = val.area.adcode;
          this.$refs.addRecFormRef.fields[5].showMessage=false;
        }else{
          this.form.cityarea = '';
          this.form.provincecode = '';
          this.form.citycode = '';
          this.form.areacode = '';
          this.form.simpleaddress = '';
          this.areamsg.adcode = '';
          this.$refs.addRecFormRef.fields[5].showMessage=true;
        }
      },
      getPoint(val){
        this.mapdialogVisible = false;
        console.log(val);
        if(!val.lng){
          this.$message('地点未选择');
        }else{
          this.form.lng = val.lng;
          this.form.lat = val.lat;
          this.form.address = val.address;
        }
      },
      handleChange(file, fileList) {
        console.log('232323s');
        this.actImgUrl ='121212'
        console.log(file, fileList);
      },
      handleExceed(file, fileList) {
        this.$message('图片只能上传一张！');
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      submitClick(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.form)
          return
          if (valid) {
            this.addRecAct();
          } else {
            this.$message('请输入正确的信息');
            return false;
          }
        });
      },
      showMap(){
        this.mapdialogVisible = true;
      },
      addRecAct(){
        let _self=this;
        let params = {
          name:'',
          servicetype:'',
          simpleaddress:'',
          address:'',
          provincecode:'',
          citycode:'',
          areacode:'',
          restarttime:'',
          reendtime:'',
          acbegintime:'',
          acendtime:'',
          details:'',
          num:'',
          lng:'120.108478',
          lat:'30.220671',
          state
        };
        untils.JsonAxios().post('manage/signact/save',params).then(function (res) {
          if(res.code==0){
            _self.actType = res.data;
            console.log(res.data)
          }
        })
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
</style>

