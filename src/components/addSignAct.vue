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
            <el-option v-for="x in actType" :key="x.id" :label="x.name" :value="x.id"></el-option>
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
          <div>

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
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import headImg from './../assets/images/MRman.png'
  import UE from '@/components/UE';
  import cityPicker from '@/components/cityPicker'

  export default {
    name: 'addSignAct',
    data () {
      return {
        actType:{},
        defaultMsg: '<p><span style="font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px;">招募要求：</span></p><p style="word-wrap: break-word; font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px; white-space: normal;">招募范围：</p><p style="word-wrap: break-word; font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px; white-space: normal;">活动内容：</p><p style="word-wrap: break-word; font-family: &quot;sans serif&quot;, tahoma, verdana, helvetica; font-size: 12px; white-space: normal;">活动具体时间：</p><p><br/></p>',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        headImg:headImg,
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
          text:'',
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
            { required: true, message: '请选择活动资源', trigger: 'change' }
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
      getcity:function (val) {
        this.form.cityarea = val;
        console.log(val)
      },
      addSignAct(){
        let _self=this;
        untils.JsonAxios().post('manage/act/save',{}).then(function (res) {
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

