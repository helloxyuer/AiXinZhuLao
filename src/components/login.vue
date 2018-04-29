/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="loginPage" :style="bgStyle">
    <div>
      <img class="img-responsive" :src="logo" alt="logo">
    </div>
    <div class="loginBox">
      <div class="welcomeTitle">欢迎登陆组织管理</div>
      <el-form class="loginForm formClass"  ref="loginformRef" :rules="rules" :model="form" label-width="60px">
        <el-form-item label="账号" prop="username">
          <el-input
            v-model.trim="form.username"
            placeholder="请输入账号"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="form.password"
            placeholder="请输入密码"
            clearable></el-input>
        </el-form-item>
        <el-button class="loginBtn" type="success" @click="loginClick('loginformRef')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import cityPicker from '@/components/cityPicker'
  import bg from './../assets/images/showcase-bg.jpg'
  import logo from './../assets/images/logo.png'

  export default {
    name: 'login',
    data () {
      let validateIdcard = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号'));
          return
        }
        if (!untils.regExp.idcard.test(value)) {
          callback(new Error('身份证号不符合要求'));
          return
        }
        callback();
      };
      return {
        logo:logo,
        form:{
          username:'',
          password:''
        },
        rules:{
          username: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
        },
        bgStyle:{
          backgroundImage: 'url('+ bg+ ')',
        }
      }
    },
    components:{
      cityPicker
    },
    methods:{
      loginClick(ref){
        this.$refs[ref].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            this.$message({
              message:'请输入正确的信息',
              type:'error'
            });
            return false;
          }
        });
      },
      login () {
        let _self=this;
        let params ={
          username:_self.form.username,
          password:window.md5(_self.form.password),
          clientType:'Web'
        }
        untils.JsonAxios().post('manage/orguser/login',params).then(function (res) {
          if(res.code==0){
            untils.storageS.set('token',res.data.token);
            _self.$router.replace({ name: 'indexdefault'})
          }
        },function (err) {

        })
      }
    },
    created(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .welcomeTitle{
    color: #fff;
    font-size: 20px;
    line-height: 60px;
    background: rgba(0,0,0,0.4);
    overflow: hidden;
    padding: 0 25px;
    background: #444;
    background: rgba(0, 0, 0, 0.35);
    -moz-border-radius: 4px 4px 0 0;
    -webkit-border-radius: 4px 4px 0 0;
    border-radius: 4px 4px 0 0;
    text-align: left;
  }
  .formClass{
    padding: 20px;
    background: rgba(0,0,0,0.2);
  }
  .loginBox{
    padding-top: 100px;
    width: 400px;
    margin: 0 auto;
  }
  .loginPage{
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    position: relative;
    background-size: cover;
  }
  .formClass label{
    color: #fff !important;
  }
  .loginBtn{
    margin-left: 60px;
    width:110px;
  }
  .img-responsive{
    display: block;
    max-width: 100%;
    height: auto;
  }
</style>
