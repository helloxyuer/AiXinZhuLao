<template>
  <div class="mainBox">
    <div class="volTableTitleBox">
      <span>{{recId?'修改服务需求':'新增服务需求'}}</span>
      <span class="backbtn" @click="backPage()">返回</span>
    </div>
    <div>
      <el-form
        ref="addRecFormRef"
        :model="form"
        :rules="rules"
        class="adminTable fixFormHead"
        label-width="110px">
        <el-form-item label="服务图片" prop="picurl">
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
        <el-form-item label="旧服务图片" v-if="form.picurl && recId">
          <img class="oldimg" @click="showBigImg()" :src="form.picurl" alt="">
        </el-form-item>
        <el-form-item label="服务内容" prop="actname">
          <el-input v-model="form.actname"></el-input>
        </el-form-item>
        <el-form-item label="需求人数" prop="actnum">
          <el-input v-model="form.actnum" min="1" type="number"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" prop="actType">
          <el-cascader
            expand-trigger="hover"
            :props="cascprops"
            :options="actTypeArr"
            v-model="form.actType"
            @change="cascaderChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="服务区域" prop="simpleaddress">
          <cityPicker :showText="form.simpleaddress" @citypicked="getcity"></cityPicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input class="addressinput" v-model="form.address"></el-input>
          <span class="pickaddrBtn" @click="showMap()">选点</span>
        </el-form-item>
        <el-form-item label="服务发布时间" prop="actTime1">
          <el-date-picker
            v-model="form.actTime1"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="服务进行时间" prop="actTime2">
          <el-date-picker
            v-model="form.actTime2"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="活动开始时间"
            end-placeholder="活动结束时间">
          </el-date-picker>
          <el-time-select
            class="hourpicker1"
            v-model="form.delHour1"
            value-format="HH-mm"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '23:30'
            }"
            :clearable="false"
            placeholder="活动开始时分">
          </el-time-select>
          <el-time-select
            class="hourpicker2"
            v-model="form.delHour2"
            value-format="HH-mm"
            :picker-options="{
              start: '00:00',
              step: '00:30',
              end: '23:30'
            }"
            :clearable="false"
            placeholder="活动结束时分">
          </el-time-select>
        </el-form-item>
        <el-form-item label="服务内容详情" prop="details">
          <!--<UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>-->
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8}"
            placeholder="请输入服务内容详情"
            v-model.trim="form.details">
          </el-input>
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
      <p class="tipsP">*不知道怎么发?让客服帮助您。<i class="el-icon-phone"></i>4001151120</p>
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
        actTypeArr:[],
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
          actType:[],
          childService:{},
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
          delHour1:'',
          delHour2:'',
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
        },
        cascprops:{
          value:'servicetypename',
          label:'servicetypename',
          children:'typeList'
        }
      }
    },
    methods: {
      backPage(){
        this.$router.go(-1);
      },
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
              _self.form.actType = [res.data.servicetype,(res.data.subServiceName||'')];
              _self.form.childService.name = res.data.subServiceName;
              _self.form.childService.id = res.data.servicePointId;
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
              _self.form.delHour1 = res.data.acbeginhourmin;
              _self.form.delHour2 = res.data.acendhourmin;
              _self.form.details = res.data.details;
              /*_self.defaultMsg = res.data.details;*/
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
        untils.JsonAxios().post('sys/serviceTypeList',{}).then(function (res) {
          if(res.code==0){
            _self.actTypeArr = res.data;
          }
        })
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
      },
      getcity (val) {
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
        this.$refs['addRecFormRef'].fields[4].clearValidate();
      },
      getPoint(val){
        this.mapdialogVisible = false;
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
        let imgName = '/WEB/'+imgData.uid+'-'+new Date().getTime()+'.'+imgData.raw.type.split('/')[1];
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
        //_self.form.details = _self.$refs.ue.getUEContent();
        //修改 且 不更换图片
        if(_self.recId && !this.$refs.upload.uploadFiles[0]){
          if(!_self.form.lng){
            this.$message({
              message:'地点未选择',
              type:'error'
            });
            return
          }
          if(!this.form.actType[0]||!this.form.actType[1]){
            this.$message({
              message:'服务类型不正确',
              type:'error'
            });
            return
          }
          _self.$refs[formName].validate((valid) => {
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
          if(!_self.form.lng){
            this.$message({
              message:'地点未选择',
              type:'error'
            });
            return
          }
          _self.submitUpload(function () {
            _self.$refs[formName].validate((valid) => {
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
          servicetype:this.form.actType[0],
          subServiceName:this.form.childService.name,
          servicePointId:this.form.childService.id,
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
        if(this.form.delHour1){
          params.acbeginhourmin = this.form.delHour1
        }
        if(this.form.delHour2){
          params.acendhourmin = this.form.delHour2
        }
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
      },
      cascaderChange () {
        for(let i=0,length = this.actTypeArr.length;i<length;i++){
          if(this.form.actType[0]==this.actTypeArr[i].servicetypename){
            let childArr = this.actTypeArr[i].typeList;
            for(let j=0,childLen = childArr.length;j<childLen;j++){
              if(this.form.actType[1]==childArr[j].servicetypename){
                console.log(childArr[j]);
                this.form.childService={
                  name:childArr[j].servicetypename,
                  id:childArr[j].servicetypeid,
                }
                break;
              }
            }
            break;
          }
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
  .addressinput{
    width: 350px;
  }
  .pickaddrBtn{
    background: #06c1ad;
    border-color: #06c1ad;
    color: #fff;
    padding: 5px 5px;
    border-radius: 3px;
    cursor: pointer;
  }
  .hourpicker1{
    float: left;
    margin-top: 10px;
    width:165px;
  }
  .hourpicker2{
    float: left;
    margin-top: 10px;
    margin-left: 20px;
    width:165px;
  }
  .tipsP{
    text-align: left;
    margin-left: 160px;
    color: #f86464;
  }
</style>

