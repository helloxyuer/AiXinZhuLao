<template>
  <div class="mainBox">
    <div class="volTableTitleBox">修改密码</div>
    <div class="resetPwdBox">
      <el-form class="resetPwdForm"
               ref="resetPwdformRef"
               :rules="rules"
               :model="form"
               label-position="left"
               label-width="100px">
        <el-form-item label="旧密码" prop="oldpwd">
          <el-input
            v-model.trim="form.oldpwd"
            maxlength="20"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            v-model.trim="form.pass"
            maxlength="20"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input
            v-model.trim="form.checkPass"
            maxlength="20"
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <p>密码必须是8-20个字符，而且同时包含字母和数字。</p>
          <el-button type="success" @click="submitClick('resetPwdformRef')">提交</el-button>
          <el-button @click="resetForm('resetPwdformRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'

  export default {
    name: 'resetPwd',
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
          return
        }
        if (!untils.regExp.password.test(value)) {
          callback(new Error('密码不符合要求'));
          return
        }
        if(this.form.checkPass !== ''){
          this.$refs.resetPwdformRef.validateField('checkPass');
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
          return
        }
        if (!untils.regExp.password.test(value)) {
          callback(new Error('密码不符合要求'));
          return
        }
        if (value !== this.form.pass) {
          callback(new Error('两次输入密码不一致!'));
          return
        }
        callback();
      };
      return {
        form:{
          oldpwd:'',
          pass:'',
          checkPass:'',
        },
        rules:{
          oldpwd: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submitClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitData();
          } else {
            this.$message({
              message:'请输入正确的信息',
              type:'error'
            });
            return false;
          }
        });
      },
      submitData() {
        let _self=this;
        let params ={
          pw:window.md5(_self.form.oldpwd),
          newpw:window.md5(_self.form.pass),
        }
        untils.JsonAxios().post('manage/orguser/uppw',params).then(function (res) {
          if(res.code==0){
            _self.$router.replace({ name: 'indexdefault'})
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .resetPwdBox{
    padding:20px 0 ;
  }
  .resetPwdForm{
    width: 500px;
    margin: 0 auto;
  }
</style>
