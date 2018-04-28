/**
* Created by 伯禹 on 2018/4/15.
*/

<template>
  <div class="_address_div">
    <input
      class="_drAddrinput"
      :style="bgStyle"
      v-bind:placeholder="drplaceholder"
      v-model="showText1"
      readonly="readonly"
      v-on:click="showPancel()">
    <a class="_draddrclearX" v-if="!!showText1" v-on:click="_clearx()"></a>
    <div class="_areaBox" v-if="showAreaBox">
      <ul class="_citypicker_ul">
        <li v-for="x in proobj" v-on:click="choiceProvince(x)" v-bind:class="{'_checked':x.checked}">{{x.name}}</li>
      </ul>
      <ul class="_citypicker_ul">
        <li v-for="x in choicedProvince.regionEntitys" v-on:click="choiceCity(x)" v-bind:class="{'_checked':x.checked}">{{x.name}}</li>
      </ul>
      <ul class="_citypicker_ul" v-if="level=='county'">
        <li v-for="x in choicedCity.regionEntitys" v-on:click="choiceArea(x)" v-bind:class="{'_checked':x.checked}">{{x.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import select from './../assets/images/select.png'

  export default {
    name: 'cityPicker',
    props:{
      level:{
        type:String,
        default:'county'
      },
      showText:{
        type:String,
        default:''
      }
    },
    data () {
      return {
        showAreaBox:false,//是否展示城市选择框
        drplaceholder:'请选择地址',
        proobj:[],
        choicedProvince:{},
        showText1: this.showText,
        choicedCity:{},
        choicedArea:{},
        bgStyle:{
          backgroundImage: 'url('+ select+ ')'
        }
      }
    },
    methods:{
      showPancel(){
        this.showAreaBox = true;
      },
      choiceProvince(province){
        let _self = this;
        _self.choicedProvince.checked = false;
        _self.choicedCity.checked = false;
        _self.choicedArea.checked = false;
        province.checked = true;
        _self.choicedProvince = province;
        _self.choicedCity = [];
        _self.choicedArea = [];
        _self.showText1 =_self.choicedProvince.name;
      },
      choiceCity(city){
        let _self = this;
        _self.choicedCity.checked = false;
        _self.choicedArea.checked = false;
        city.checked = true;
        _self.choicedCity = city;
        _self.choicedArea = [];
        _self.showText1 =_self.choicedProvince.name+_self.choicedCity.name;
        if(_self.level=='city'){
          _self.showAreaBox = false;
          let result ={
            province:{
              name:_self.choicedProvince.name,
              adcode:_self.choicedProvince.code,
            },
            city:{
              name:_self.choicedCity.name,
              adcode:_self.choicedCity.code,
            }
          }
          _self.$emit('cityPicked',result)
        }
      },
      choiceArea(area){
        let _self = this;
        _self.choicedArea.checked = false;
        area.checked = true;
        _self.choicedArea = area;
        _self.showText1 =_self.choicedProvince.name+_self.choicedCity.name+_self.choicedArea.name;
        _self.showAreaBox = false;
        _self.choicedProvince.checked = false;
        _self.choicedCity.checked = false;
        _self.choicedArea.checked = false;
        var result ={
          province:{
            name:_self.choicedProvince.name,
            adcode:_self.choicedProvince.code,
          },
          city:{
            name:_self.choicedCity.name,
            adcode:_self.choicedCity.code,
          },
          area:{
            name:_self.choicedArea.name,
            adcode:_self.choicedArea.code,
          }
        }
        _self.$emit('citypicked',result)
      },
      _clearx(){
        let _self = this;
        _self.choicedProvince.checked = false;
        _self.choicedCity.checked = false;
        _self.choicedArea.checked = false;
        _self.choicedProvince = {};
        _self.choicedCity = {};
        _self.choicedArea = {};
        _self.showText1 = '';
        _self.showAreaBox = false;
      }
    },
    created(){
      let _self = this;
      if(window.cityData){
        _self.proobj = window.cityData;
      }else{
        axios.get('./static/CityData/areaall.json')
          .then(function (res) {
            if(res.status==200 && res.data){
              window.cityData = res.data;
              _self.proobj = res.data;
            }
          })
      }
    },
    watch: {
      showText: {
        handler(newValue, oldValue) {
          this.showText1 = this.showText
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ._address_div {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 34px;
    line-height: 34px;
    background: #ffffff;
  }

  ._citypicker_ul{
    flex: 1;
    height: 100%;
    float: left;
    overflow-y: auto;
    border-right: 1px solid #beceeb;
    background: #ffffff;
  }

  ._citypicker_ul li {
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }

  ._citypicker_ul li:hover{
    color: #222;
    background: #dfecff;
  }

  ._citypicker_ul li:checked{
    background: #3e84e9;
  }

  ._areaBox {
    width: 261px;
    height: 250px;
    display: flex;
    position: absolute;
    z-index: 1100;
    left: 0px;
    padding: 3px 0px;
    top: 38px;
    border: 1px solid #dcdfe6;
    background: #ffffff;
    box-shadow: 0px 0px 3px #beceeb;
  }

  ._citypicker_ul::-webkit-scrollbar-thumb {
    background-color: #adbccb;
    height: 50px;
    outline-offset: -2px;
    outline: 2px solid #fff;
    -webkit-border-radius: 4px;
    border: 2px solid #fff;
  }

  /*---鼠标点击滚动条显示样式--*/
  ._citypicker_ul::-webkit-scrollbar-thumb:hover {
    background-color: #dfecff;
    height: 50px;
    -webkit-border-radius: 4px;
  }

  /*---滚动条大小--*/
  ._citypicker_ul::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /*---滚动框背景样式--*/
  ._citypicker_ul::-webkit-scrollbar-track-piece {
    background-color: #fff;
    -webkit-border-radius: 0;
  }

  ._drAddrinput {
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    line-height: 34px;
    padding: 5px 20px 5px 15px;
    margin: 0;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    background-repeat: no-repeat;
    background-position: calc(100% - 10px) 50%;
  }

  ._drAddrinput:hover {
    border: 1px solid;
    border-color: #3e84e9;
    box-shadow: 0px 0px 3px #3e84e9;
  }
  ._checked{
    color: #ffffff;
    background: #3e84e9;
  }
  ._draddrclearX{
    position: absolute;
    width: 16px;
    height: 16px;
    background: url(../assets/images/del1.png) no-repeat;
    outline: none;
    right: 5px;
    top: 9px;
  }
  ._drAddrinput::-webkit-input-placeholder{
    color:#cdcdce;
  }
  ._drAddrinput::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#cdcdce;
  }
  ._drAddrinput:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#cdcdce;
  }
  ._drAddrinput:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#cdcdce;
  }
</style>
