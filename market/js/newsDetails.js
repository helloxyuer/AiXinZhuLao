var params = new UrlSearch();
sessionStorage.setItem('token',params.token);
var app = new Vue({
  el: '#app',
  data: {
    news:{},
    iszan:false,
    isfollow:false
  },
  methods:{
    getDetails:function(){
      var self = this;
      passData({
        method:'post',
        type:'json',
        url:'app/news/info',
        data: {
          newsid:params.newsid
        },
        success: function (res) {
          if(res.code==0){
            self.news = res.data.news;
            self.isfollow = !!res.data.isfollow;
            self.iszan = !!res.data.iszan;
          }else{
            showTips(res.msg)
          }
        }
      })
    },
    guanzhu:function () {
      var self = this;
      passData({
        method:'post',
        type:'json',
        url:'app/vol/follow',
        data: {
          aboutid:self.news.uuid,
          operationtype:!self.isfollow?1:2,
          abouttype:6,
          type:2,
        },
        success: function (res) {
          if(res.code==0){
            self.isfollow=!self.isfollow;
          }else{
            showTips(res.msg)
          }
        }
      })
    },
    dianzan:function () {
      var self = this;
      passData({
        method:'post',
        type:'json',
        url:'app/vol/follow',
        data: {
          aboutid:self.news.uuid,
          operationtype:!self.iszan?1:2,
          abouttype:6,
          type:1,
        },
        success: function (res) {
          if(res.code==0){
            self.iszan=!self.iszan;
          }else{
            showTips(res.msg)
          }
        }
      })
    }
  },
  created:function () {
    this.getDetails()

  }
})
