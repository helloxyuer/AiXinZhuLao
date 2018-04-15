/**
 * Created by bychen on 2017/6/9.
 */

import axios from 'axios';
import config from './config';
import Qs from 'qs';
import rootVue from '../../main'

let trim = function trim(str,is_global) {
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g,"");
  if(is_global.toLowerCase()=="g")
  {
    result = result.replace(/\s/g,"");
  }
  return result;
}

let axiosBack={
  sucSend(head){
    if(head.method=='get'){
      if(head.params){
        if(typeof (head.params)=='object'){
          head.params.baseEntId = config.baseEntId;
          head.params.baseUserId = config.baseuserid;
        }else if(typeof (head.params)=='string'){
          let objParams = JSON.parse(head.params);
          objParams.baseEntId = config.baseEntId;
          objParams.baseUserId = config.baseuserid;
          head.params = JSON.stringify(objParams);
        }
      }
    }else if(head.method=='post'){
      if(head.data){
        if(typeof (head.data)=='object'){
          head.data.baseEntId = config.baseEntId;
          head.data.baseUserId = config.baseuserid;
        }else if(typeof (head.data)=='string'){
          let objParams = JSON.parse(head.data);
          objParams.baseEntId = config.baseEntId;
          objParams.baseUserId = config.baseuserid;
          head.data = JSON.stringify(objParams);
        }
      }
    }
    return head;
  },
  errSend(err){
    return Promise.reject(err);
  },
  sucBack(res){
    closeLoading();
    if(res.status!='200'){
      showToast('网络请求异常'+res.status+'!');
      return;
    }else{
      if(!res.data.suc){
        if(res.data.errCode=='005'){
          return;
        }
        if(res.data.errCode=='5006'||res.data.errCode=='5002'){
          showToast(res.data.message);
        }else{
          showToast(res.data.message);
        }
      }
      return res.data;
    }

  },
  errBack(err){
    showToast('网络不稳定,请检查网络');
    closeLoading();
    return Promise.reject(err);
  },
}
let showToast = function (msg,time) {
  rootVue.$root.$refs.toast.msg = msg;
  rootVue.$root.$refs.toast.freshMsg();
}

let closeLoading = function () {
  rootVue.$root.$refs.loading.show = false;
}

let openLoading = function (msg,loading) {
  rootVue.$root.$refs.loading.show = true;
  rootVue.$root.$refs.loading.msg = msg;
  rootVue.$root.$refs.loading.loading = loading;
}

let setAxios = function (options,NoUSerEntId) {
  let myAxios = axios.create(options);
  if(!NoUSerEntId){
    myAxios.interceptors.request.use(axiosBack.sucSend,axiosBack.errSend);
  }
  myAxios.interceptors.response.use(axiosBack.sucBack,axiosBack.errBack);
  return myAxios;
};

//普通的请求
let normalAxios = function () {
  let headers = {
    'Content-Type':'application/x-www-form-urlencoded',
    'baseuserid':config.baseuserid,
    'ClientType':config.clientType,
    'ClientSystem':config.clientSystem,
    'Equipment':config.equipment,
  };
  return setAxios({
    baseURL:config.baseUrl+config.baseName,
    headers:headers,
    transformRequest:[
      function (data) {
        data = Qs.stringify(data);
        return data;
      }
    ]
  });
}
//司机端的请求
let autobotsAxios = function () {
  let headers = {
    'Content-Type':'application/x-www-form-urlencoded',
    'baseuserid':config.baseuserid,
    'ClientType':config.clientType,
    'ClientSystem':config.clientSystem,
    'Equipment':config.equipment,
  };
  return setAxios({
    baseURL:config.baseUrl+config.autobotsName,
    headers:headers,
    transformRequest:[
      function (data) {
        data = Qs.stringify(data);
        return data;
      }
    ]
  });
}
//json格式的请求
let submitJson = function () {
  let headers = {
    'Content-Type':'application/json;charset=UTF-8',
    'baseuserid':config.baseuserid,
    'ClientType':config.clientType,
    'ClientSystem':config.clientSystem,
    'Equipment':config.equipment,
  };
  return setAxios({
    baseURL:config.baseUrl+config.baseName,
    timeout:20000,
    headers: headers
  });
}

//unicrion请求提交
let unicronAxios = function(){
  let headers = {
    'Content-Type':'application/json;charset=UTF-8',
    'baseuserid':config.baseuserid,
    'ClientType':config.clientType,
    'ClientSystem':config.clientSystem,
    'Equipment':config.equipment,
  };
  return setAxios({
    baseURL:config.baseUrl+config.unicronName,
    timeout:20000,
    headers: headers
  });
}

//unicrion 不带id 请求提交
let unicronAxiosNoId = function(){
  let headers = {
    'Content-Type':'application/json;charset=UTF-8',
    'baseuserid':config.baseuserid,
    'ClientType':config.clientType,
    'ClientSystem':config.clientSystem,
    'Equipment':config.equipment,
  };
  return setAxios({
    baseURL:config.baseUrl+config.unicronName,
    timeout:20000,
    headers: headers
  },true);
}

//unicrion请求提交
let unicronNomalAxios = function () {
  let headers = {
    'Content-Type':'application/x-www-form-urlencoded',
    'baseuserid':config.baseuserid,
    'ClientType':config.clientType,
    'Equipment':config.equipment,
    'ClientSystem':config.clientSystem,
  };
  return setAxios({
    baseURL:config.baseUrl+config.unicronName,
    timeout:20000,
    headers: headers,
    transformRequest:[
      function (data) {
        data = Qs.stringify(data);
        return data;
      }
    ]
  });
}

//unicrion 不带id 请求提交
let unicronNomalAxiosNoId = function () {
  let headers = {
    'Content-Type':'application/x-www-form-urlencoded',
    'baseuserid':config.baseuserid,
    'ClientType':config.clientType,
    'Equipment':config.equipment,
    'ClientSystem':config.clientSystem,
  };
  return setAxios({
    baseURL:config.baseUrl+config.unicronName,
    timeout:20000,
    headers: headers,
    transformRequest:[
      function (data) {
        data = Qs.stringify(data);
        return data;
      }
    ]
  },true);
}

//阿里云请求提交
let aliyunSubmit = axios.create({
  baseURL:config.aliyunUrl,
  timeout: 15000,
  headers: {
    'Content-Type':false,
  }
})

let Baseinfo = function(){
  var u = navigator.userAgent;
  var name,value;
  var array = [];
  var str = u.substring(u.indexOf('LogibeatXHeader')+15);
  var info = str.substring(str.indexOf("(")+1,str.indexOf(")"));
  info = info.replace(/(^\s+)|(\s+$)/g,"");
  info = info.replace(/\s/g,"");
  array = info.split(';');
  for(var i=0;i<array.length;i++){
    var num = array[i].indexOf('/');
    if(num>0){
      name = array[i].substring(0,num);
      value = array[i].substring(num+1);
      this[name] = value;
    }
  }
};

//时间转换
let turnTime = function (timeParams) {
  let timeArr = timeParams.split(',');//2017-08-8,21:00-21:30
  let theDate = timeArr[0].split('-');
  let theDay = new Date();
  theDay.setFullYear(theDate[0]);
  theDay.setMonth(Number(theDate[1])-1);
  theDay.setDate(theDate[2]);
  if(timeArr[1].split('-').length==1){
    let theHour = timeArr[1].split('-')[0]
    theDay.setHours(theHour.split(':')[0]);
    theDay.setMinutes(theHour.split(':')[1]);
  }else{
    let theHour = timeArr[1].split('-')[1]
    theDay.setHours(theHour.split(':')[0]);
    theDay.setMinutes(theHour.split(':')[1]);
  }
  return theDay;
}

//阿里云提交用到的公共方法
function aliYun () {
  let chrsz = 8;
  let b64pad = "=";
  let Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {

      let output = "";
      let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      let i = 0;

      input = Base64._utf8_encode(input);

      while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output +
          this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

      }

      return output;
    },

    // public method for decoding
    decode: function (input) {
      let output = "";
      let chr1, chr2, chr3;
      let enc1, enc2, enc3, enc4;
      let i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {

        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }

      }

      output = Base64._utf8_decode(output);

      return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
      string = string.replace(/\r\n/g, "\n");
      let utftext = "";

      for (let n = 0; n < string.length; n++) {

        let c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }

      }

      return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
      let string = "";
      let i = 0;
      let c = c1 = c2 = 0;

      while (i < utftext.length) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        }
        else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        }
        else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }

      }

      return string;
    }

  };
  let b64_hmac_sha1 = function b64_hmac_sha1(key, data) {
    return binb2b64(core_hmac_sha1(key, data));
  }
  let core_hmac_sha1 = function core_hmac_sha1(key, data) {
    let bkey = str2binb(key);
    if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

    let ipad = Array(16), opad = Array(16);
    for (let i = 0; i < 16; i++) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    let hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 512 + 160);
  }
  let binb2b64 = function binb2b64(binarray) {
    let tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let str = "";
    for (let i = 0; i < binarray.length * 4; i += 3) {
      let triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16)
        | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8 )
        | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
      for (let j = 0; j < 4; j++) {
        if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
        else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
      }
    }
    return str;
  }
  let str2binb = function str2binb(str) {
    let bin = Array();
    let mask = (1 << chrsz) - 1;
    for (let i = 0; i < str.length * chrsz; i += chrsz)
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
    return bin;
  }
  let core_sha1 = function core_sha1(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;

    let w = Array(80);
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    let e = -1009589776;

    for (let i = 0; i < x.length; i += 16) {
      let olda = a;
      let oldb = b;
      let oldc = c;
      let oldd = d;
      let olde = e;

      for (let j = 0; j < 80; j++) {
        if (j < 16) w[j] = x[i + j];
        else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
        let t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
          safe_add(safe_add(e, w[j]), sha1_kt(j)));
        e = d;
        d = c;
        c = rol(b, 30);
        b = a;
        a = t;
      }

      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
      e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);

  }
  let safe_add = function safe_add(x, y) {
    let lsw = (x & 0xFFFF) + (y & 0xFFFF);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
  let rol = function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  let sha1_ft = function sha1_ft(t, b, c, d) {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
  }
  let sha1_kt = function sha1_kt(t) {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
      (t < 60) ? -1894007588 : -899497514;
  }
  let base64 = function () {
    return Base64;
  }

  return {
    base64: base64,
    b64_hmac_sha1: b64_hmac_sha1,
    core_hmac_sha1: core_hmac_sha1,
    binb2b64: binb2b64,
    str2binb: str2binb,
    core_sha1: core_sha1,
    safe_add: safe_add,
    rol: rol,
    sha1_ft: sha1_ft,
    sha1_kt: sha1_kt,
  }
}

function getDict(type) {
  let promise = new Promise(function(resolve, reject) {
    var dict = localStorage.getItem('Dicts');
    if(dict){
      if(type){
        var needArray=[];
        JSON.parse(dict).forEach(function (thisdata) {
          if(thisdata.dictType==type){
            needArray.push(thisdata)
          }
        })
        resolve(needArray)
      }else{
        resolve(JSON.parse(dict))
      }
    }else{
      unicronNomalAxios().get('common/Bs/api/BasicData/GetDictData.htm')
        .then(function (res) {
          if(res.suc){
            localStorage.setItem('Dicts',JSON.stringify(res.data));
            if(type){
              var needArray=[];
              res.data.forEach(function (thisdata) {
                if(thisdata.dictType==type){
                  needArray.push(thisdata)
                }
              })
              resolve(needArray)
            }else{
              resolve(res.data)
            }
          }else{
            reject(err)
          }
        })
        .catch(function (err) {
          reject(err)
        })
    }
  })
  return promise
}

function saveInEntList(id){
  let entListAsked = localStorage.getItem('entListAsked');
  if(!!entListAsked){
    entListAsked = JSON.parse(entListAsked)
  }else{
    entListAsked = {};
  }
  entListAsked[id] = true;
  localStorage.setItem('entListAsked',JSON.stringify(entListAsked))
  }

function isInEntList(id){
  let entListAsked = localStorage.getItem('entListAsked');
  if(!!entListAsked){
    entListAsked = JSON.parse(entListAsked)
  }else{
    entListAsked = {};
  }
  return !!entListAsked[id];
}

function closeTimeToast() {
  if(document.querySelector(".closeBox")){
    var event = document.createEvent('Events');
    event.initEvent('touchstart', true, true);
    document.querySelector(".closeBox").dispatchEvent(event);
  }
}

const common = {
  showToast,
  closeLoading,
  openLoading,
  //获取userAgent参数
  Baseinfo(){
    var u = navigator.userAgent;
    var name,value;
    var array = [];
    var str = u.substring(u.indexOf('LogibeatXHeader')+15);
    var info = str.substring(str.indexOf("(")+1,str.indexOf(")"));
    info = trim(info,'g');
    array = info.split(';');
    for(var i=0;i<array.length;i++){
      var num = array[i].indexOf('/');
      if(num>0){
        name = array[i].substring(0,num);
        value = array[i].substring(num+1);
        this[name] = value;
      }
    }
  },

  normalAxios,//普通请求
  submitJson,//json格式提交
  unicronAxios,//unicron请求
  unicronNomalAxios,
  unicronAxiosNoId,
  unicronNomalAxiosNoId,
  autobotsAxios,//司机端接口请求
  aliyunSubmit,//阿里云请求
  aliYun,
  getDict,
  turnTime,
  saveInEntList,
  isInEntList,
  closeTimeToast,
};
export default common;

