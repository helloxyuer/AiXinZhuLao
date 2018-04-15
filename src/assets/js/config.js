/**
 * Created by bychen on 2017/5/23.
 */

let config={
  baseUrl:window.location.origin+'/',
  baseName:'app/',
  userId:"",
  mobile:'',
  userName:''
}

if(sessionStorage.getItem('baseUserId')){
  config.baseuserid = sessionStorage.getItem('baseUserId');
}

export default config;
