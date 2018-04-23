<template>
  <div class="mainBox">
    <div class="volTableTitleBox">
      <span>新增签到活动</span>
    </div>
    <div>
      <el-form
        ref="addRecFormRef"
        :model="form"
        :rules="rules"
        class="adminTable"
        label-width="130px">
        <el-form-item label="活动名称">
          <el-input v-model="form.actname" prop="actname"></el-input>
        </el-form-item>
        <el-form-item label="开放类型" prop="actopen">
          <el-select v-model="form.actopen" placeholder="请选择开放类型">
            <el-option label="全体开放" value="all"></el-option>
            <el-option label="组织开放" value="org"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型" prop="actType">
          <el-select v-model="form.actType" placeholder="请选择活动类型">
            <el-option v-for="x in actType" :key="x.id" :label="x.name" :value="x.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域" prop="cityarea">
          <cityPicker @citypicked="getcity"></cityPicker>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="定时周期">
          <el-select v-model="form.actCycle" placeholder="请选择定时周期">
            <el-option label="每周定时举行" value="week"></el-option>
            <el-option label="每月定时举行" value="mouth"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动进行时间">
          <el-date-picker
            v-model="form.actTime1"
            type="daterange"
            range-separator="至"
            start-placeholder="活动开始日期"
            end-placeholder="活动结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动签到/签退时间">
          <el-date-picker
            v-model="form.actTime2"
            type="daterange"
            range-separator="至"
            start-placeholder="活动签到时间"
            end-placeholder="活动签退时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签到地点">
          <div class="pointArrBox">
            <div v-for="(item,index) in pointArr">
              <div class="pointArr1 moreHide" @click="setThePoint(item,index)">详细地址: {{item.address}}</div>
              <div class="pointArr2" @click="setThePoint(item,index)">
                <span>签到范围:</span>
                <span v-if="item.sginAround">{{item.sginAround+'Km'}}</span>
              </div>
              <div class="pointArr3" @click="setThePoint(item,index)">
                <span>类型:</span>
                <span v-if="item.sginType==1">可签到/可签退</span>
                <span v-if="item.sginType==2">只可签到</span>
                <span v-if="item.sginType==3">只可签退</span>
              </div>
              <button @click="removeSginPoint(index)"><i class="el-icon-remove-outline"></i></button>
            </div>
            <div>
              <button @click="addSginPoint()"><i class="el-icon-circle-plus-outline"></i></button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="活动详情" prop="text">
          <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitClick('addRecFormRef')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :title="'第'+(choicePointIndex+1)+'个签到点'" :visible.sync="mapdialogVisible">
      <gaomap :areamsg="choicePointItem" :isSgin="true" @pointPicked="getPoint"></gaomap>
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
        actType:{},
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
        }],
        choicePointItem:{
          address:'',
          adcode:'',
          lng:'',
          lat:'',
        },
        choicePointIndex:0,
        mapdialogVisible:false,
        form:{
          actname:'',
          actnum:'',
          actopen:'',
          actType:'',
          cityarea:'',
          address:'',
          actTime1:'',
          actTime2:'',
          text:'',
        },
        rules: {
          actname: [
            { required: true, message: '请输入活动名称', trigger: 'change' }
          ],
          actnum: [
            { required: true, message: '请输入活动人数', trigger: 'change' }
          ],
          actTime1: [
            { type: 'date', required: true, message: '请选择招募时间', trigger: 'change' }
          ],
          actTime2: [
            { type: 'date', required: true, message: '请选择进行时间', trigger: 'change' }
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
          text: [
            { required: true, message: '请选择活动内容', trigger: 'change' }
          ]
        }
      }
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
      addSginPoint(){
        if(this.pointArr.length<20){
          this.pointArr.push({
            address:'',
            adcode:'',
            lng:'',
            lat:'',
          })
        }else {
          this.$message('至多20个签到点')
        }

      },
      removeSginPoint(index){
        if(this.pointArr.length>1){
          this.pointArr.splice(index,1)
        }else {
          this.$message('至少有一个签到点')
        }
      },
      setThePoint(item,index){
        this.choicePointIndex = index;
        this.choicePointItem = item;
        this.mapdialogVisible = true;
      },
      getPoint(val){
        console.log(val);
        this.mapdialogVisible = false;
        if(!val.lng){
          this.$message('地点未选择');
          return
        }
        if(!val.sginType){
          this.$message('签到时间未选!');
          return
        }
        if(!val.sginAround){
          this.$message('签到时间未选!');
          return
        }
        this.pointArr[this.choicePointIndex]={
          address:val.address,
          adcode:val.adcode,
          sginAround:val.sginAround,
          sginType:val.sginType,
          lng:val.lng,
          lat:val.lat
        };

      },
      getcity (val) {
        console.log(val)
        if(val.province){
          this.form.cityarea = val.province.adcode;
          this.form.provincecode = val.province.adcode;
          this.form.citycode = val.city.adcode;
          this.form.areacode = val.area.adcode;
          this.form.simpleaddress = val.province.name+'-'+val.city.name+'-'+val.area.name;
        }else{
          this.form.cityarea = '';
          this.form.provincecode = '';
          this.form.citycode = '';
          this.form.areacode = '';
          this.form.simpleaddress = '';
        }
      },
      addSignAct(){
        let _self=this;
        untils.JsonAxios().post('manage/signact/save',{}).then(function (res) {
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
  .pointArrBox{
    width: 700px;
  }
  .pointArr1,.pointArr2,.pointArr3{
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    float: left;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    padding-left:15px;
    margin-right: 10px;
  }
  .pointArr1{
    width: 300px;
  }
  .pointArr2{
    width: 150px;
  }
  .pointArr3{
    width: 170px;
  }

</style>

