;(function (global) {
  // 转义字符
  function params(data) {
    var arr = [];
    for (var i in data) {
      arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
    }
    return arr.join("&");
  }

  global.showTips = function (str,time) {
    time = time||'1000'
    var DomStr = '<div class="centerBox"><span class="centerBoxStr">' + (str || '提交中...') + '</span></div>';
    var div = document.createElement("div");
    div.innerHTML = DomStr;
    document.querySelector('body').appendChild(div.childNodes[0]);
    setTimeout(function () {
      var el = document.querySelector('.centerBox');
      el.parentNode.removeChild(el)
    }, time)
  }

  global.passData = function (obj) {
    obj.url = window.location.origin + '/zhulao/' + obj.url;
    var xhr = new XMLHttpRequest();
    if (obj.method == "get") {
      obj.url += "?" + params(obj.data);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          obj.success(JSON.parse(xhr.responseText));
        } else {
          global.showTips("请求错误:" + xhr.status );
        }
      }
    }
    xhr.open(obj.method, obj.url);
    xhr.setRequestHeader("token",sessionStorage.getItem('token'));
    if (obj.method == "post" && obj.type == "json") {
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.send(JSON.stringify(obj.data));
    }else if(obj.method == "post" && obj.type != "json"){
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(obj.data);
    } else {
      xhr.send(null);
    }
  }

  global.UrlSearch = function () {
    var name,value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?")
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
      num=arr[i].indexOf("=");
      if(num>0){
        name=arr[i].substring(0,num);
        value=arr[i].substr(num+1);
        this[name]=value;
      }
    }
  }
})(window)