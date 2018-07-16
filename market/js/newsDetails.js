var params = new UrlSearch();
params.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMmYwZDI4MDA2OWE0OTUxYjdkN2QzY2Q5ZTI3MjAwYiIsImNsaWVudFR5cGUiOiJJT1MiLCJyZXF1ZXN0VHlwZSI6IkIiLCJpYXQiOjE1MzE3MDg5NzIsImV4cCI6MTUzMzAwNDk3Mn0.Bo_NorUkgiz9zWspMoHH85PKeQHtXLfipwUNObGgkyEBClvCG9WSV7vICr_lKgA4OqYv4a15OD0oVV-MPJrEAQ'
sessionStorage.setItem('token',params.token);
params.newsid = 'd5226e03f05e4204b24dc637cc8090ad'
var app = new Vue({
  el: '#app',
  data: {
    news:{},
    iszan:0,
    isfollow:0
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
            self.isfollow = res.data.isfollow;
            self.iszan = res.data.iszan;
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
          operationtype:self.isfollow==0?1:2,
          abouttype:6,
          type:2,
        },
        success: function (res) {
          if(res.code==0){
            self.isfollow==0?self.isfollow=1:self.isfollow=0;
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
          operationtype:self.iszan==0?1:2,
          abouttype:6,
          type:1,
        },
        success: function (res) {
          if(res.code==0){
            self.iszan==0?self.iszan=1:self.iszan=0;
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
