/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div>
    <div>注册</div>
    <div>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="证件号" prop="idcard">
          <el-input v-model="form.idcard"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <cityPicker @citypicked="getcity"></cityPicker>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="cardtype">
          <el-select v-model="form.cardtype" placeholder="请选择证件类型">
            <el-option label="身份证" value="card1"></el-option>
            <el-option label="党员证" value="card2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否党员"  prop="isparty">
          <el-radio-group v-model="form.isparty">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd2">
          <el-input v-model="form.pwd2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import untils from '@/assets/js/untils'
  import cityPicker from '@/components/cityPicker'

  export default {
    name: 'register',
    data () {
      return {
        form: {
          name: '',
          idcard: '',
          phone: '',
          cardtype: '',
          address:'',
          isparty:'',
          pwd:'',
          pwd2:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          idcard: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          phone: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          cardtype: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          address: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          isparty: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          pwd: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          pwd2: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      onSubmit(){
        let _self = this;
        var params = {
          username:_self.userIdCard,
          password:_self.userPwd,
          name:_self.username,
          phone:_self.username,
          provincecode:_self.username,
          citycode:_self.username,
          areacode:_self.username,
          simpleaddress:_self.username,
          ispartymember:_self.username,
          partymemberurl:_self.username,
          code:_self.username,
          cardtype:_self.username,
        }
        untils.normalAxios().post('vol/register',params).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      getcity:function (val) {
        console.log(val)
      }
    },
    components:{
      cityPicker
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .registerBox>div{
    height: 40px;
    line-height: 40px;
  }
</style>
