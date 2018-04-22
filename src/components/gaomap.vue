<template>
  <div>
    <div id="gaomap">
      <div id="tip">
        <input type="text" id="keyword" v-model="address" placeholder="请输入关键字：(选定后搜索)"/>
      </div>
    </div>
    <el-button type="success" style="margin-top: 20px" @click="choiceMapMarker()">提交</el-button>
  </div>
</template>

<script>
    export default {
      name: "gaomap",
      data() {
        return{
          map:{},
          marker:{},
          address:''
        }
      },
      methods:{
        newAmap(){
          let _self = this;
          let map = new AMap.Map('gaomap', {
            resizeEnable: true, //自适应大小
            zoom: 13//初始视窗
          });
          this.map = map;

          let marker = new AMap.Marker({
            map:map,
            animation:'AMAP_ANIMATION_DROP',
            draggable:true
          })
          this.marker = marker;

          AMap.plugin('AMap.Geocoder',function(){
            var geocoder = new AMap.Geocoder();
            map.on('click',function(e){
              marker.setPosition(e.lnglat);
              geocoder.getAddress(e.lnglat,function(status,result){
                if(status=='complete'){
                  _self.address = result.regeocode.formattedAddress;
                }
              })
            })
          });

          AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
            let autocomplete= new AMap.Autocomplete({
              city: "", //城市，默认全国
              input: "keyword"//使用联想输入的input的id
            });
            var placeSearch = new AMap.PlaceSearch({
              city:''
            });
            AMap.event.addListener(autocomplete, "select", function(e){
              marker.setPosition(e.poi.location);
              map.setCenter(marker.getPosition())
              console.log(e.poi)
              _self.address = result.regeocode.formattedAddress;
            });
          });

        },
        choiceMapMarker(){
          this.marker.getPosition();

        }
      },
      mounted(){
        this.newAmap()
      }
    }
</script>

<style scoped>
  #gaomap{
    width: 100%;
    height: 300px;
  }


</style>
