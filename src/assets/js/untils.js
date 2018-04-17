import axios from 'axios';
import config from './config';
import Qs from 'qs';

let trim = function trim(str, is_global) {
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g, "");
  if (is_global.toLowerCase() == "g") {
    result = result.replace(/\s/g, "");
  }
  return result;
}

let axiosBack = {
  sucSend(head){
    return head;
  },
  errSend(err){
    return Promise.reject(err);
  },
  sucBack(res){
    if (res.status == '200') {
      return res.data;
    } else {

    }
  },
  errBack(err){
    showToast('网络不稳定,请检查网络');
    return Promise.reject(err);
  },
}

//获取地区码
let getCityJson = function () {
  if(window.cityData){
    return
  }
  axios.get('/static/CityData/districtDist.json')
    .then(function (res) {
      if(res.status==200 && res.data){
        window.cityData = res.data;
      }
    })
}

//普通的请求
let normalAxios = function (noRequestInterceptors, noResonseInterceptors) {
  let myAxios = axios.create({
    baseURL: config.baseUrl + config.baseName,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (data) {
        data = Qs.stringify(data);
        return data;
      }
    ]
  });
  if (!noRequestInterceptors) {
    myAxios.interceptors.request.use(axiosBack.sucSend, axiosBack.errSend);
  }
  if (!noResonseInterceptors) {
    myAxios.interceptors.response.use(axiosBack.sucBack, axiosBack.errBack);
  }
  return myAxios;
}

//json格式的请求
let JsonAxios = function (noRequestInterceptors, noResonseInterceptors) {
  let myAxios = axios.create({
    baseURL: config.baseUrl + config.baseName,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
  if (!noRequestInterceptors) {
    myAxios.interceptors.request.use(axiosBack.sucSend, axiosBack.errSend);
  }
  if (!noResonseInterceptors) {
    myAxios.interceptors.response.use(axiosBack.sucBack, axiosBack.errBack);
  }
  return myAxios;
}

//校验
let  validate = {
  name:function (params) {

  },
  idCard:function ({data='',reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/}) {
    if(reg.test(data) === false) {

      alert("身份证输入不合法");
      return false;
    }else {

    }
  },
  tel:function (params) {

  },
  pwd:function (params) {

  }
}
let dialogs = {
  load(type,str,time){
    let iconClass = '_layerload';
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
    let DomStr = '<div class="centerBox"><div class="' + iconClass + '"></div><span class="centerBoxStr">' + (str || '加载中...') + '</span></div>';
    var div = document.createElement("div");
    div.innerHTML = DomStr;
    if (document.querySelectorAll('.centerBox').length == 0) {
      document.querySelector('body').appendChild(div.childNodes[0]);
    } else {
      document.querySelector('.centerBoxStr').innerText(str);
    }
    if (time) {
      setTimeout(function () {
        let el = document.querySelector('.centerBox');
        el.parentNode.removeChild(el)
      }, time)
    }
  },
  closeAll(){
    let el = document.querySelector('.centerBox');
    el.parentNode.removeChild(el)
  }
}

const common = {
  normalAxios,
  JsonAxios,
  dialogs
};
export default common;

