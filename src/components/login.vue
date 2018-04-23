/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="loginBox">
    <el-form  ref="loginformRef" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="账号" prop="username">
        <el-input
          v-model.trim="form.username"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="form.password"
          clearable></el-input>
      </el-form-item>
      <el-button type="primary" @click="loginClick('loginformRef')">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import cityPicker from '@/components/cityPicker'

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
        form:{
          username:'342225198807221053',
          password:'123456'
        },
        rules:{
          username: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
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
          password:_self.form.password,
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
  .loginBox{
    width: 300px;
    margin: 0 auto;
    margin-top: 100px;
  }
</style>
