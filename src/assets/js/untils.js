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


let load = function (str, time, type) {
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
  var alertBox = '<div class="centerBox"><div class="' + iconClass + '"></div><span class="centerBoxStr">' + (str || '加载中...') + '</span></div>';
  if ($('.centerBox').length == 0) {
    $('body').append($(alertBox));
  } else {
    $('.centerBoxStr').text(str);
  }
  if (time) {
    setTimeout(function () {
      $('.centerBox').remove();
    }, time)
  }

};
let closeAll = function () {
  $('.centerBox').remove();
}

const common = {
  normalAxios,
  JsonAxios
};
export default common;

