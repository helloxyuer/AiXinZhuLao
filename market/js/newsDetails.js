var params = new UrlSearch();
params.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMmYwZDI4MDA2OWE0OTUxYjdkN2QzY2Q5ZTI3MjAwYiIsImNsaWVudFR5cGUiOiJJT1MiLCJyZXF1ZXN0VHlwZSI6IkIiLCJpYXQiOjE1MzE3MDg5NzIsImV4cCI6MTUzMzAwNDk3Mn0.Bo_NorUkgiz9zWspMoHH85PKeQHtXLfipwUNObGgkyEBClvCG9WSV7vICr_lKgA4OqYv4a15OD0oVV-MPJrEAQ'
sessionStorage.setItem('token',params.token);
params.newsid = 'd5226e03f05e4204b24dc637cc8090ad'
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
