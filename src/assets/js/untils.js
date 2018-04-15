(function (window) {
  window.layer ={
    load:function (str,time,type) {
      var iconClass = '_layerload';
      switch (type) {
        case 'load':
          iconClass = '_layerload'
          break;
        case 'tips':
          iconClass = '_layerTips'
          break;
        case 'suc':
          iconClass = '_layerSuc'
          break;
        case 'err':
          iconClass = '_layerErr'
          break;
        case 'warn':
          iconClass = '_layerWarn'
          break;
        default:
          iconClass = '_layerload'
          break;
      }
      var alertBox = '<div class="centerBox"><div class="'+iconClass+'"></div><span class="centerBoxStr">'+(str||'加载中...')+'</span></div>';
      if($('.centerBox').length==0){
        $('body').append($(alertBox));
      }else{
        $('.centerBoxStr').text(str);
      }
      if(time){
        setTimeout(function () {
          $('.centerBox').remove();
        },time)
      }

    },
    closeAll:function () {
      $('.centerBox').remove();
    },
    msg:function () {

    }
  }
})(window);
