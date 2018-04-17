/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div>
    <div>注册</div>
    <div class="registerBox">
      <div>
        <span>姓名:</span>
        <input type="text" v-model="username">
      </div>
      <div>
        <span>证件号:</span>
        <input type="text" v-model="userIdCard">
      </div>
      <div>
        <span>手机号:</span>
        <input type="text" v-model="userPhoneNum">
      </div>
      <div>
        <span>地区:</span>
        <cityPicker @citypicked="getcity"></cityPicker>
      </div>
      <div>
        <span>密码:</span>
        <input type="text" v-model="userPwd">
      </div>
      <div>
        <span>是否党员:</span>
        <input name="isparty" id="isparty" type="radio" value="0"><label for="isparty">是</label>
        <input name="isparty" id="noparty" type="radio" value="0"><label for="noparty">否</label>
      </div>
      <div>
        <span>地址:</span>
        <input type="text" v-model="userAddress">
      </div>
      <div>
        <span>证件类型:</span>
        <input type="text" v-model="cardtype">
      </div>
      <div>
        <input type="button" v-on:click="register()" value="提交">
      </div>
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
        username: '',
        userIdCard: '',
        userPhoneNum: '',
        msg: '',
        userPwd: '',
        cardtype: '',
        userAddress: '',
      }
    },
    methods:{
      register(){
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
