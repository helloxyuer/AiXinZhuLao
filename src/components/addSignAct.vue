<template>
  <div class="mainBox">
    <div class="volTableTitleBox">
      <span>{{sginId?'修改签到活动':'新增签到活动'}}</span>
      <span class="backbtn" @click="backPage()">返回</span>
    </div>
    <div>
      <el-form
        ref="addRecFormRef"
        :model="form"
        :rules="rules"
        class="adminTable fixSgintable"
        label-width="150px">
        <el-form-item label="活动名称" prop="actname">
          <el-input v-model="form.actname"></el-input>
        </el-form-item>
        <el-form-item label="招募人数" prop="actnum">
          <el-input v-model="form.actnum" type="number" prop="actnum"></el-input>
        </el-form-item>
        <el-form-item label="开放类型" prop="actopen">
          <el-select v-model="form.actopen" placeholder="请选择开放类型">
            <el-option label="全体开放" :value="1"></el-option>
            <el-option label="组织开放" :value="2"></el-option>
            <el-option label="关联签到活动" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联活动" prop="relationid" v-if="form.actopen==3">
          <el-select v-model="form.relationid" placeholder="请选择关联活动">
            <el-option v-for="x in relationAct" :key="x.uuid" :label="x.name" :value="x.uuid"></el-option>
          </el-select>
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
          <el-input class="addressinput" v-model="form.address"></el-input>
          <span class="pickaddrBtn" @click="showMap()">选点</span>
        </el-form-item>
        <el-form-item label="活动进行时间" prop="actTime1">
          <el-date-picker
            v-model="form.actTime1"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="活动开始日期"
            end-placeholder="活动结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动签到/签退时间" prop="delHour1">
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
            placeholder="活动签到时间">
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
            placeholder="活动签退时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="签到地点">
          <div class="pointArrBox">
            <div class="pointArrUnit" v-for="(item,index) in pointArr">
              <!--<div class="pointArr1 moreHide" @click="setThePoint(item,index)">详细地址: {{item.address}}</div>-->
              <el-input
                class="addressInput"
                v-model="item.address"
                placeholder="请选择签到地址"></el-input>
              <el-select class="addressSelelct" v-model="item.type" placeholder="请选择签到类型">
                <el-option label="只可签到" :value="2"></el-option>
                <el-option label="只可签退" :value="3"></el-option>
                <el-option label="可签到/可签退" :value="1"></el-option>
              </el-select>
              <el-select class="addressSelelct" v-model="item.ranges" placeholder="请选择签到范围">
                <el-option label="100M" :value="100"></el-option>
                <el-option label="300M" :value="300"></el-option>
                <el-option label="500M" :value="500"></el-option>
                <el-option label="1000M" :value="1000"></el-option>
                <el-option label="1500M" :value="1500"></el-option>
                <el-option label="3000M" :value="3000"></el-option>
              </el-select>
              <span class="pickaddrBtn" @click="setThePoint(item,index)">选点</span>
              <!--<div class="pointArr2">
                <span>签到范围:</span>
                <span v-if="item.ranges">{{item.ranges+'m'}}</span>
              </div>
              <div class="pointArr3">
                <span>类型:</span>
                <span v-if="item.type==1">可签到/可签退</span>
                <span v-if="item.type==2">只可签到</span>
                <span v-if="item.type==3">只可签退</span>
              </div>-->
              <button @click.prevent="removeSginPoint(index)"><i class="el-icon-remove-outline"></i></button>
            </div>
            <div class="addBox">
              <button @click.prevent="addSginPoint()"><i class="el-icon-circle-plus-outline"></i></button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="活动详情" prop="details">
          <!--<UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>-->
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8}"
            placeholder="请输入活动详情"
            v-model.trim="form.details">
          </el-input>
        </el-form-item>
        <el-form-item v-if="!sginId">
          <el-button @click="submitClick('addRecFormRef',0)">草稿</el-button>
          <el-button type="success" @click="submitClick('addRecFormRef',1)">提交</el-button>
        </el-form-item>
        <el-form-item v-if="sginId">
          <el-button @click="submitClick('addRecFormRef',0)">修改草稿</el-button>
          <el-button type="success" @click="submitClick('addRecFormRef',1)">修改提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :title="isSgin?('第'+(choicePointIndex+1)+'个签到点'):'详细地址'" :visible.sync="mapdialogVisible">
      <gaomap :areamsg="choicePointItem" :isSgin="isSgin" @pointPicked="getPoint"></gaomap>
    </el-dialog>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import UE from '@/components/UE';
  import cityPicker from '@/components/cityPicker'
  import gaomap from '@/components/gaomap'

  export default {
    name: 'addSignAct',
    components: {
      UE,
      cityPicker,
      gaomap
    },
    data () {
      return {
        sginId:'',
        actType:[],
        relationAct:[],
        defaultMsg: '<p><span style="font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px;">招募要求：</span></p><p style="word-wrap: break-word; font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px; white-space: normal;">招募范围：</p><p style="word-wrap: break-word; font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px; white-space: normal;">活动内容：</p><p style="word-wrap: break-word; font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px; white-space: normal;">活动具体时间：</p><p><br/></p>',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        pointArr:[{
          address:'',
          adcode:'',
          lng:'',
          lat:'',
          ranges:'',
          type:'',
        }],
        choicePointItem:{
          address:'',
          adcode:'',
          lng:'',
          lat:'',
          ranges:'',
          type:'',
        },
        choicePointIndex:0,
        mapdialogVisible:false,
        isSgin:false,//是否为选签到点
        form:{
          actname:'',
          actnum:'',
          actopen:'',
          actType:'',
          simpleaddress:'',
          address:'',
          lng:'',
          lat:'',
          actTime1:'',
          relationid:'',
          delHour1:'',
          delHour2:'',
          state:0
        },
        rules: {
          actname: [
            { required: true, message: '请输入活动名称', trigger: 'change' }
          ],
          actnum: [
            { required: true, message: '请输入活动人数', trigger: 'change' }
          ],
          actTime1: [
            { required: true, message: '请选择招募时间', trigger: 'change' }
          ],
          delHour1: [
            { required: true, message: '请选择进行时间', trigger: 'change' }
          ],
          actopen: [
            { required: true, message: '请选择开放类型', trigger: 'change' }
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
      backPage(){
        this.$router.go(-1);
      },
      getDetails(){
        let _self = this;
        this.sginId = this.$route.query.sginId;
        if(this.sginId){
          let params = {
            signactactid:this.$route.query.sginId
          }
          untils.JsonAxios().post('manage/signact/info',params).then(function (res) {
            if(res.code==0){
              _self.form.picurl = res.data.picurl;
              _self.form.actname = res.data.name;
              _self.form.actnum = res.data.num;
              _self.form.actopen = res.data.opentype;
              _self.form.actType = res.data.servicetype;
              _self.form.address = res.data.address;
              _self.form.provincecode = res.data.provincecode;
              _self.form.citycode = res.data.citycode;
              _self.form.areacode = res.data.areacode;
              _self.form.simpleaddress = res.data.simpleaddress;
              _self.form.relationid = res.data.relationactivityid;
              _self.form.actTime1 = [
                res.data.begintime,
                res.data.endtime];
              _self.pointArr = res.data.range
              _self.form.delHour1 = res.data.signbegintime;
              _self.form.delHour2 = res.data.signendtime;
              _self.form.details = res.data.details;
              // _self.defaultMsg = res.data.details;
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
      getRelationAct(){
        let _self=this;
        untils.JsonAxios().post('manage/act/signlisttosign',{}).then(function (res) {
          if(res.code==0){
            _self.relationAct = res.data.actlist;
          }
        })
      },
      addSginPoint(){
        if(this.pointArr.length<20){
          this.pointArr.push({
            address:'',
            adcode:'',
            lng:'',
            lat:'',
            ranges:'',
            type:'',
          })
        }else {
          this.$message({
            message:'至多20个签到点',
            type:'error'
          })
        }
      },
      removeSginPoint(index){
        if(this.pointArr.length>1){
          this.pointArr.splice(index,1)
        }else {
          this.$message({
            message:'至少有一个签到点',
            type:'error'
          })
        }
      },
      setThePoint(item,index){
        this.mapdialogVisible = true;
        this.isSgin = true;
        this.choicePointIndex = index;
        this.choicePointItem = item;
      },
      showMap(){
        this.mapdialogVisible = true;
        this.isSgin = false;
        this.choicePointItem = {
          lng:this.form.lng,
          lat:this.form.lat,
          address:this.form.address,
        };

      },
      getPoint(val){
        this.mapdialogVisible = false;
        if(this.isSgin){
          if(!val.lng){
            this.$message({
              message:'地点未选择',
              type:'error'
            });
            return
          }
          if(!val.type){
            this.$message({
              message:'签到时间未选',
              type:'error'
            });
            return
          }
          if(!val.ranges){
            this.$message({
              message:'签到时间未选',
              type:'error'
            });
            return
          }
          this.pointArr[this.choicePointIndex]={
            address:val.address,
            adcode:val.adcode,
            ranges:val.ranges,
            type:val.type,
            lng:val.lng,
            lat:val.lat
          };
        }else{
          if(!val.lng){
            this.$message({
              message:'地点未选择',
              type:'error'
            });
          }else {
            this.form.lng = val.lng;
            this.form.lat = val.lat;
            this.form.address = val.address;
          }
        }
      },
      getcity (val) {
        if(val.province){
          this.form.provincecode = val.province.adcode;
          this.form.citycode = val.city.adcode;
          this.form.areacode = val.area.adcode;
          this.form.simpleaddress = val.province.name+val.city.name+val.area.name;
        }else{
          this.form.provincecode = '';
          this.form.citycode = '';
          this.form.areacode = '';
          this.form.simpleaddress = '';
        }
        this.$refs['addRecFormRef'].fields[4].clearValidate();
      },
      checkPointArr(){
        for(let i=0;i<this.pointArr.length;i++){
          if(!this.pointArr[i].lng ||!this.pointArr[i].lat ||!this.pointArr[i].ranges ||!this.pointArr[i].type){
            this.$message({
              message:'第'+i+'个签到点有未填选项',
              type:'error'
            });
            return false;
          }
        }
        return true;
      },
      submitClick(formName,state) {
        let _self = this;
        //_self.form.details = _self.$refs.ue.getUEContent();
        _self.$refs[formName].validate((valid) => {
          if (valid) {
            let rightPointArr = _self.checkPointArr();
            if(_self.form.actopen==3 && !_self.form.relationid){
              _self.$message({
                message:'请选择关联活动',
                type:'error'
              });
              return
            }
            if(!rightPointArr){
              return
            }
            _self.addSignAct(state)
          } else {
            _self.$message({
              message:'请输入正确的信息',
              type:'error'
            });
            return false;
          }
        })
      },
      addSignAct(state){
        let _self=this;
        let params = {
          name:this.form.actname,
          num:this.form.actnum,
          servicetype:this.form.actType,
          opentype:this.form.actopen,
          simpleaddress:this.form.simpleaddress,
          address:this.form.address,
          provincecode:this.form.provincecode,
          citycode:this.form.citycode,
          areacode:this.form.areacode,
          begintime:this.form.actTime1[0],
          endtime:this.form.actTime1[1],
          signbegintime:this.form.delHour1,
          signendtime:this.form.delHour2,
          details:this.form.details,
          num:this.form.actnum,
          lng:this.form.lng,
          lat:this.form.lat,
          state:state,
          range:this.pointArr
        };
        if(params.opentype==3){
          params.relationactivityid = this.form.relationid
        }
        if(_self.sginId){
          params.uuid = _self.sginId;
          untils.JsonAxios().post('manage/signact/update',params).then(function (res) {
            if(res.code==0){
              _self.$router.push({name:'sginList'})
            }
          })
        }else{
          untils.JsonAxios().post('manage/signact/save',params).then(function (res) {
            if(res.code==0){
              _self.$router.push({name:'sginList'})
            }
          })
        }

      }
    },
    created () {
      this.getOrgTypeList();
      this.getRelationAct();
      this.getDetails();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pointArrBox{
    width: 700px;
  }
  .pointArrUnit{
    padding: 2px 0;
  }
  .fixSgintable{
    width: 550px;
  }
  .hourpicker1{
    float: left;
    width:165px;
  }
  .hourpicker2{
    float: left;
    margin-left: 20px;
    width:165px;
  }
  .addressInput{
    width:280px;
    float: left;
    margin-right: 10px;
  }
  .addBox{
    clear: both;
  }
  .pickaddrBtn{
    background: #06c1ad;
    border-color: #06c1ad;
    color: #fff;
    padding: 5px 5px;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 6px;
  }
  .addressSelelct{
    width: 150px;
    margin-right: 6px;
  }
  .addressinput{
    width: 350px;
  }
</style>

