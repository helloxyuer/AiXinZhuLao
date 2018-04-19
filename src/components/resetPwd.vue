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
            clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
          <el-input
            v-model.trim="form.newpwd"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newpwd2">
          <el-input
            v-model.trim="form.newpwd2"
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('resetPwdformRef')">提交</el-button>
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
      return {
        form:{
          oldpwd:'',
          newpwd:'',
          newpwd2:'',
        },
        rules:{
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      submitForm(ref){},
      resetForm(ref){},
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
