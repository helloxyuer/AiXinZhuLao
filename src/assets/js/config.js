/**
 * Created by bychen on 2017/5/23.
 */

let config={
  baseUrl:window.location.origin+'/',
  baseName:'app/',
  mapkey:'1ad687828622041a79c5ee76aa4a4fb2',
  userId:"",
  mobile:'',
  userName:''
}

if(sessionStorage.getItem('baseUserId')){
  config.baseuserid = sessionStorage.getItem('baseUserId');
}

export default config;
