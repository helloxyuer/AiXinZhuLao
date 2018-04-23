<template>
  <div>
    <div class="signBox">
      <span>签到点:</span>
      <el-autocomplete
        class="inline-input"
        v-model="areamsg.address"
        :fetch-suggestions="querySearchAsync"
        :clearable="true"
        placeholder="请输入关键字"
        @select="handleSelect"
      ></el-autocomplete>
    </div>
    <div class="signBox" v-if="isSgin">
      <span>类型:</span>
      <el-select v-model="sgin.type" placeholder="请选择签到类型">
        <el-option label="只可签到" value="2"></el-option>
        <el-option label="只可签退" value="3"></el-option>
        <el-option label="可签到/可签退" value="1"></el-option>
      </el-select>
    </div>
    <div class="signBox" v-if="isSgin">
      <span>范围:</span>
      <el-select v-model="sgin.around" placeholder="请选择签到范围">
        <el-option label="500M" value="500"></el-option>
        <el-option label="1KM" value="1000"></el-option>
        <el-option label="2KM" value="2000"></el-option>
      </el-select>
    </div>
    <div id="gaomap"></div>
    <el-button type="success" style="margin-top: 20px" @click="submitPoint()">提交</el-button>
  </div>
</template>

<script>
  let mapVo ={};
  export default {
    name: 'gaomap',
    props: {
      areamsg: {
        type: Object,
        default: function () {
          return {
            adcode: '',
            address: '',
            lng: '',
            lat: ''
          }
        }
      },
      isSgin:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        sgin:{
          type:'',
          around:''
        }
      }
    },
    methods: {
      newAmap () {
        let _self = this
        let map = new AMap.Map('gaomap', {
          resizeEnable: true, //自适应大小
          zoom: 13//初始视窗
        })
        mapVo.map = map

        let marker = new AMap.Marker({
          map: map,
          animation: 'AMAP_ANIMATION_DROP',
          draggable: true
        })
        if(_self.areamsg.lng){
          let point = new AMap.LngLat(_self.areamsg.lng,_self.areamsg.lat)
          marker.setPosition(point);
          map.setCenter(point);
        }
        mapVo.marker = marker

        AMap.plugin('AMap.Geocoder', function () {
          let geocoder = new AMap.Geocoder()
          let mapCenter = map.getCenter();
          _self.areamsg.lng = mapCenter.lng;
          _self.areamsg.lat = mapCenter.lat;
          geocoder.getAddress(mapCenter, function (status, result) {
            if (status == 'complete') {
              _self.areamsg.address = result.regeocode.formattedAddress
              _self.areamsg.adcode = result.regeocode.addressComponent.adcode
            }
          })


          map.on('click', function (e) {
            marker.setPosition(e.lnglat);
            map.setCenter(e.lnglat);
            _self.areamsg.lng = e.lnglat.lng;
            _self.areamsg.lat = e.lnglat.lat;
            geocoder.getAddress(e.lnglat, function (status, result) {
              if (status == 'complete') {
                _self.areamsg.address = result.regeocode.formattedAddress
                _self.areamsg.adcode = result.regeocode.addressComponent.adcode
              }
            })
          })
        })

        AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
          if(_self.areamsg.adcode){
            console.log()
            mapVo.autoComplete = new AMap.Autocomplete({
              city:_self.areamsg.adcode,
              citylimit:true,
              datatype:'poi'
            })
          }else{
            mapVo.autoComplete = new AMap.Autocomplete({})
          }
        })

      },
      querySearchAsync (queryString, cb) {
        mapVo.autoComplete.search(queryString, function (status, result) {
          let tips = result.tips?result.tips:[]
          tips.forEach(function (data) {
            data.value = data.name
          })
          cb(tips)
        })
      },
      handleSelect (item) {
        this.areamsg.adcode = item.adcode
        this.areamsg.address = item.address
        this.areamsg.lng = item.location.lng
        this.areamsg.lat = item.location.lat
      },
      submitPoint () {
        let _self = this;
        if(!this.isSgin){
          _self.$emit('pointPicked',{
            adcode:_self.areamsg.adcode,
            address:_self.areamsg.address,
            lng:_self.areamsg.lng,
            lat:_self.areamsg.lat
          })
        }else{
          _self.$emit('pointPicked',{
            adcode:_self.areamsg.adcode,
            address:_self.areamsg.address,
            lng:_self.areamsg.lng,
            lat:_self.areamsg.lat,
            sginType:_self.sgin.type,
            sginAround:_self.sgin.around,
          })
        }
      },
    },
    mounted () {
      this.newAmap()
    }
  }
</script>

<style scoped>
  #gaomap {
    width: 100%;
    height: 300px;
  }
  .signBox{
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
