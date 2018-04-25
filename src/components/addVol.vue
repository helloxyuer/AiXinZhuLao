<template>
  <div class="mainBox">
    <div class="volTableTitleBox">新增志愿者</div>
    <div>
      <el-form
        ref="addVolFormRef"
        :model="form"
        :rules="rules"
        class="adminTable"
        label-width="110px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="cardType">
          <el-select v-model="form.cardType" placeholder="请选择证件类型">
            <el-option label="身份证" value="1"></el-option>
            <el-option label="护照" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="idNum">
          <el-input v-model.trim="form.idNum" placeholder="请输入证件号"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model.trim="form.tel" maxlength="11" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="partyType">
          <el-select v-model="form.partyType" placeholder="请选择政治面貌">
            <el-option v-for="x in partyArr" :key="x.value" :label="x.name" :value="x.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居住地" prop="address">
          <cityPicker @citypicked="getcity"></cityPicker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitClick('addVolFormRef')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import cityPicker from '@/components/cityPicker'

  export default {
    name: 'addVol',
    data(){
      let validateIdCard = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入证件号'));
          return
        }
        if (!untils.regExp.numAndWord.test(value)) {
          callback(new Error('证件号只能包含数字字母'));
          return
        }
        callback();
      };
      let validateTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
          return
        }
        if (!untils.regExp.tel.test(value)) {
          callback(new Error('手机号格式有误'));
          return
        }
        callback();
      };
      return{
        form:{
          name:'',
          cardType:'',
          idNum:'',
          tel:'',
          address:'',
          partyType:'',
          provincecode:'',
          citycode:'',
          areacode:'',
          loading:''
        },
        rules: {
          name: [
            { required: true, message: '请输入名字', trigger: 'change' }
          ],
          cardType: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          idNum: [
            { required: true, validator: validateIdCard, trigger: 'change' }
          ],
          tel: [
            { required: true, validator: validateTel, trigger: 'change' }
          ],
          partyType: [
            { required: true, message: '请选择政治面貌', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请选择地址', trigger: 'change' }
          ]
        },
        partyArr:[
          {value:1,name:"中国共产党党员"},
          {value:2,name:"中国共产党预备党员"},
          {value:3,name:"中国共产主义青年团团员"},
          {value:4,name:"中国国民党革命委员会委员"},
          {value:5,name:"中国民主同盟盟员"},
          {value:6,name:"中国民主促进会会员"},
          {value:7,name:"中国民主建国会会员"},
          {value:8,name:"中国农工民主党党员"},
          {value:9,name:"中国致公党党员"},
          {value:10,name:"中国九三学社社员"},
          {value:11,name:"台湾民主自治同盟盟员"},
          {value:12,name:"无党派民主人士"},
          {value:13,name:"群众"}
        ]
      }
    },
    methods:{
      submitClick(formName){
        let _self = this;
        _self.$refs[formName].validate((valid) => {
          console.log(_self.form)
          console.log(valid)
          if (valid) {
            _self.checkVol()
          } else {
            _self.$message({
              message:'请输入正确的信息',
              type:'error'
            });
            return false;
          }
        });
      },
      getcity(val){
        console.log(val)
        if(val.province){
          this.form.provincecode = val.province.adcode;
          this.form.citycode = val.city.adcode;
          this.form.areacode = val.area.adcode;
          this.form.address = val.province.name+'-'+val.city.name+'-'+val.area.name;
        }else{
          this.form.provincecode = '';
          this.form.citycode = '';
          this.form.areacode = '';
          this.form.address = '';
        }
        this.$refs['addVolFormRef'].fields[5].clearValidate();
      },
      checkVol(){
        let _self=this;
        let params={
          username:_self.form.idNum
        }
        untils.JsonAxios().post('manage/org/checkorguser',params).then(function (res) {
          console.log(res);
          if(res.code==0){
          }
        },function () {
        })
      },
      addVol(){
        let _self=this;
        let params = {
          username:this.form.idNum,
          name:this.form.name,
          phone:this.form.tel,
          provincecode:this.form.provincecode,
          citycode:this.form.citycode,
          areacode:this.form.areacode,
          simpleaddress:this.form.address,
          politicaloutlook:this.form.partyType,
          cardtype:this.form.cardType,
        };
        untils.JsonAxios().post('manage/org/adduser',params).then(function (res) {
          if(res.code==0){
          }
        },function () {
        })
      },
      addToOrg(id){
        let params={
          userid:id
        }
        untils.JsonAxios().post('manage/org/signuser',params).then(function (res) {
          if(res.code==0){
          }
        },function () {
        })
      },
      showLoad(){
        this.loading = this.$loading({
          lock: true,
          text: '信息提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        });
      }
    },
    components:{
      cityPicker
    }
  }
</script>

<style scoped>

</style>
