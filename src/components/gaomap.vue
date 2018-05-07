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
      <el-select v-model="areamsg.type" placeholder="请选择签到类型">
        <el-option label="只可签到" value="2"></el-option>
        <el-option label="只可签退" value="3"></el-option>
        <el-option label="可签到/可签退" value="1"></el-option>
      </el-select>
    </div>
    <div class="signBox" v-if="isSgin">
      <span>范围:</span>
      <el-select v-model="areamsg.ranges" placeholder="请选择签到范围">
        <el-option label="100M" value="100"></el-option>
        <el-option label="300M" value="300"></el-option>
        <el-option label="500M" value="500"></el-option>
        <el-option label="1000M" value="1000"></el-option>
        <el-option label="1500M" value="1500"></el-option>
        <el-option label="3000M" value="3000"></el-option>
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
            lat: '',
            ranges:'',
            type:'',
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
          draggable: false
        })
        mapVo.marker = marker

        let circle = new AMap.Circle({
          strokeOpacity: 0.3,
          strokeColor: '#06c1ad',
          fillOpacity: 0.3,
          fillColor: '#06DECA',
          radius: 0
        })
        mapVo.circle = circle

        AMap.plugin('AMap.Geocoder', function () {
          mapVo.geocoder = new AMap.Geocoder()
          let mapCenter = map.getCenter();
          _self.resetMap(mapCenter)
          map.on('click', function (e) {
            _self.resetMap(e.lnglat)
          })
        })

        AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
          if(_self.areamsg.adcode){
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
      resetMap(point,noChageAddress){
        let _self = this
        if(_self.isSgin){
          mapVo.circle.setMap(mapVo.map);
          mapVo.circle.setCenter(point);
          mapVo.circle.setRadius(_self.areamsg.ranges||0);
        }else{
          mapVo.circle.setMap(null);
        }
        _self.areamsg.lng = point.lng;
        _self.areamsg.lat = point.lat;
        mapVo.marker.setPosition(point);
        mapVo.map.setCenter(point);
        if(!noChageAddress){
          mapVo.geocoder.getAddress(point, function (status, result) {
            if (status == 'complete') {
              _self.areamsg.address = result.regeocode.formattedAddress
              _self.areamsg.adcode = result.regeocode.addressComponent.adcode
            }
          })
        }
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
        this.areamsg.address = item.name+'('+item.address+')'
        this.areamsg.lng = item.location.lng
        this.areamsg.lat = item.location.lat
        this.resetMap(item.location,true)
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
            type:_self.areamsg.type,
            ranges:_self.areamsg.ranges,
          })
        }
      },
    },
    mounted () {
      this.newAmap()
    },
    watch: {
      areamsg: {
        handler(newValue, oldValue) {
          let _self = this;
          //点击不同签到地点的时候重设地图的选点
          if(newValue.lng != oldValue.lng){
            if(_self.areamsg.lng){
              let point = new AMap.LngLat(_self.areamsg.lng,_self.areamsg.lat)
              _self.resetMap(point)
            }else{
              let point = mapVo.map.getCenter();
              _self.resetMap(point)
            }
          }
          if(!!newValue.ranges){
            mapVo.circle.setRadius(_self.areamsg.ranges||0);
          }
        },
        deep: true
      },
    }
  }
</script>

<style scoped>
  #gaomap {
    width: 100%;
    height: 300px;
  }
  .inline-input{
    width: 300px;
  }
  .signBox{
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
