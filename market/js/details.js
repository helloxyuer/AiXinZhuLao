var params = new UrlSearch();
var app = new Vue({
  el: '#app',
  data: {
    goods:{},
    voluser:{},
    buyNum:1,
    buyerTel:'',
    buyerName:'',
    buyerAddress:'',
    buyerRemarks:'',
    showPopup:false
  },
  methods:{
    addGoods:function () {
      if(this.buyNum>=this.goods.num){
        return
      }else{
        this.buyNum++
      }
    },
    removeGoods:function () {
      if(this.buyNum<=0){
        return
      }else{
        this.buyNum--
      }
    },
    getDetails:function(){
      var self = this;
      passData({
        method:'post',
        type:'json',
        url:'app/ordergoods/goodinfo/'+params.id,
        success: function (res) {
          if(res.code==0){
            self.goods = res.data.goods;
            self.voluser = res.data.voluser;
            self.buyerTel = res.data.voluser.phone;
          }else{
            showTips(res.msg)
          }
        }
      })
    },
    submit:function () {
      var self = this;
      if(this.buyNum<=0){
        showTips('购买数量不能为0!')
        return
      }
      if(this.buyNum>this.goods.num){
        showTips('剩余商品不足!')
        return
      }
      if(!this.buyerTel ||this.buyerTel.length!=11){
        showTips('电话号码有误!')
        return
      }
      if(this.buyNum*this.goods.integralnum>this.voluser.publiccoin){
        showTips('剩余积分不足!')
        return
      }
      if(this.goods.classify==1){
        if(!this.buyerAddress||!this.buyerName){
          showTips('联系人方式有误!')
          return
        }
      }
      passData({
        method:'post',
        type:'json',
        url:'app/ordergoods/saveorder',
        data: {
          goodid:this.goods.uuid,
          num:this.buyNum,
          content:this.buyerName,
          phone:this.buyerTel,
          address:this.buyerAddress,
          remarks:this.buyerRemarks,
        },
        success: function (res) {
          if(res.code==0){
            showTips('兑换成功!');
            self.getDetails();
            self.showPopup = false;
          }else{
            showTips(res.msg)
          }
        }
      })
    }
  },
  created:function () {
    console.log('123')
    this.getDetails()
  }
})