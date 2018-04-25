<template>
  <div class="mainBox">
    <div class="volTableTitleBox">{{recId?'修改招募活动':'新增招募活动'}}</div>
    <div>
      <el-form
        ref="addRecFormRef"
        :model="form"
        :rules="rules"
        class="adminTable fixFormHead"
        label-width="110px">
        <el-form-item label="活动图片" prop="picurl">
          <el-upload
            class="upload-demo"
            action="http://oss-cn-hangzhou.aliyuncs.com/posts/"
            ref="upload"
            :on-preview="handlePreview"
            :on-exceed="handleExceed"
            :on-change="changeImg"
            :auto-upload="false"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="success">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="旧头像" v-if="form.picurl">
          <img class="oldimg" @click="showBigImg()" :src="form.picurl" alt="">
        </el-form-item>
        <el-form-item label="活动名称" prop="actname">
          <el-input v-model="form.actname"></el-input>
        </el-form-item>
        <el-form-item label="招募人数" prop="actnum">
          <el-input v-model="form.actnum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="活动类型" prop="actType">
          <el-select v-model="form.actType" placeholder="请选择活动类型">
            <el-option v-for="x in actType" :key="x.id" :label="x.name" :value="x.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域" prop="simpleaddress">
          <cityPicker :showText="form.simpleaddress" @citypicked="getcity"></cityPicker>
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
        <el-form-item v-if="!recId">
          <el-button @click="submitClick('addRecFormRef',0)">草稿</el-button>
          <el-button type="success" @click="submitClick('addRecFormRef',1)">提交</el-button>
        </el-form-item>
        <el-form-item v-if="recId">
          <el-button @click="submitClick('addRecFormRef',0)">修改草稿</el-button>
          <el-button type="success" @click="submitClick('addRecFormRef',1)">修改提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="地图选点" :visible.sync="mapdialogVisible">
      <gaomap :areamsg="areamsg" @pointPicked="getPoint"></gaomap>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
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
    name: 'addRecrutAct',
    components: {
      UE,
      cityPicker,
      gaomap
    },
    data () {
      return {
        recId:'',
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
          picurl:'',
          actname:'',
          actnum:'',
          actType:'',
          simpleaddress:'',
          address:'',
          actTime1:'',
          actTime2:'',
          details:'',
          provincecode:'',
          citycode:'',
          areacode:'',
          lng:'',
          lat:'',
        },
        rules: {
          picurl: [
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
          actType: [
            { required: true, message: '请选择活动类型', trigger: 'change' }
          ],
          simpleaddress: [
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
    methods: {
      getDetails(){
        let _self = this;
        this.recId = this.$route.query.recId;
        if(this.recId){
          let params = {
            actid:this.$route.query.recId
          }
          untils.JsonAxios().post('manage/act/info',params).then(function (res) {
            if(res.code==0){
              _self.form.picurl = res.data.picurl;
              _self.form.actname = res.data.name;
              _self.form.actnum = res.data.num;
              _self.form.actType = res.data.servicetype;
              _self.form.address = res.data.address;
              _self.form.simpleaddress = res.data.simpleaddress;
              _self.form.provincecode = res.data.provincecode;
              _self.form.citycode = res.data.citycode;
              _self.form.areacode = res.data.areacode;
              _self.form.lng = res.data.lng;
              _self.form.lat = res.data.lat;
              _self.form.actTime1 = [
                res.data.restarttime,
                res.data.reendtime];
              _self.form.actTime2 = [
                res.data.acbegintime,
                res.data.acendtime];
              _self.form.details = res.data.details;
              _self.defaultMsg = res.data.details;
              _self.areamsg.address = res.data.address;
              _self.areamsg.adcode = res.data.adcode;
              _self.areamsg.lng = res.data.lng;
              _self.areamsg.lat = res.data.lat;
            }
          })
        }
      },
      getOrgTypeList(){
        let _self=this;
        untils.JsonAxios().post('sys/serviceTypelist',{}).then(function (res) {
          if(res.code==0){
            _self.actType = res.data;
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
          this.form.provincecode = val.province.adcode;
          this.form.citycode = val.city.adcode;
          this.form.areacode = val.area.adcode;
          this.form.simpleaddress = val.province.name+val.city.name+val.area.name;
          this.areamsg.adcode = val.area.adcode;
        }else{
          this.form.provincecode = '';
          this.form.citycode = '';
          this.form.areacode = '';
          this.form.simpleaddress = '';
          this.areamsg.adcode = '';
        }
        this.$refs['addRecFormRef'].fields[5].clearValidate();
      },
      getPoint(val){
        this.mapdialogVisible = false;
        console.log(val);
        if(!val.lng){
          this.$message({
            message:'地点未选择',
            type:'error'
          });
        }else{
          this.form.lng = val.lng;
          this.form.lat = val.lat;
          this.form.address = val.address;
        }
      },
      submitUpload(cb) {
        let _self = this;
        let imgData = this.$refs.upload.uploadFiles[0];
        if(!imgData){
          _self.$message({
            message:'请选择图片',
            type:'error'
          });
          return
        }
        let client = new OSS.Wrapper({
          region: config.aliyun.region,
          accessKeyId: config.aliyun.accessKeyId,
          accessKeySecret: config.aliyun.accessKeySecret,
          bucket: config.aliyun.bucketName
        });
        let imgName = '/WEB/'+imgData.uid+'-'+new Date().getTime()
        client.put(imgName, _self.$refs.upload.uploadFiles[0].raw).then(function (val) {
          _self.form.picurl = val.res.requestUrls[0];
          if(cb){
            cb()
          }
        });
      },
      handleExceed(file, fileList) {
        this.$message({
          message:'图片只能上传一张',
          type:'error'
        });
      },
      changeImg(){
        let img = this.$refs.upload.uploadFiles[0];
        this.$refs['addRecFormRef'].fields[0].clearValidate();
      },
      showBigImg(){
        this.dialogImageUrl = this.form.picurl;
        this.dialogVisible = true;
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      submitClick(formName,state) {
        let _self = this;
        _self.form.details = _self.$refs.ue.getUEContent();
        //修改 且 不更换图片
        if(_self.recId && !this.$refs.upload.uploadFiles[0]){
          _self.$refs[formName].validate((valid) => {
            console.log(_self.form)
            console.log(valid)
            if (valid) {
              _self.addRecAct(state)
            } else {
              _self.$message({
                message:'请输入正确的信息',
                type:'error'
              });
              return false;
            }
          });


        }else{
          _self.submitUpload(function () {
            _self.$refs[formName].validate((valid) => {
              console.log(_self.form)
              console.log(valid)
              if (valid) {
                _self.addRecAct(state)
              } else {
                _self.$message({
                  message:'请输入正确的信息',
                  type:'error'
                });
                return false;
              }
            });
          })
        }
      },
      showMap(){
        this.mapdialogVisible = true;
      },
      addRecAct(state){
        const loading = this.$loading({
          lock: true,
          text: '信息提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        });
        let _self=this;
        let params = {
          name:this.form.actname,
          picurl:this.form.picurl,
          servicetype:this.form.actType,
          simpleaddress:this.form.simpleaddress,
          address:this.form.address,
          provincecode:this.form.provincecode,
          citycode:this.form.citycode,
          areacode:this.form.areacode,
          restarttime:this.form.actTime1[0],
          reendtime:this.form.actTime1[1],
          acbegintime:this.form.actTime2[0],
          acendtime:this.form.actTime2[1],
          details:this.form.details,
          num:this.form.actnum,
          lng:this.form.lng,
          lat:this.form.lat,
          state:state
        };
        if(_self.recId){
          params.uuid = _self.recId;
          untils.JsonAxios().post('manage/act/update',params).then(function (res) {
            loading.close();
            if(res.code==0){
              _self.$router.push({name:'recruitList'})
            }
          },function () {
            loading.close();
          })
        }else {
          untils.JsonAxios().post('manage/act/save',params).then(function (res) {
            loading.close();
            if(res.code==0){
              _self.$router.push({name:'recruitList'})
            }
          },function () {
            loading.close();
          })
        }

      }
    },
    created () {
      this.getOrgTypeList();
      this.getDetails();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .oldimg{
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
</style>

