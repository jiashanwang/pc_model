var getLocalStorage = function (){
  if(window.localStorage){
    var localStorage = window.localStorage;
    return localStorage;
  }else{
    this.$message('This browser does NOT support localStorage');
  }
}
var getSessionStorage = function (){
  if(window.sessionStorage){
    var sessionStorage = window.sessionStorage;
    return sessionStorage;
  }else{
    this.$message('This browser does NOT support sessionStorage');
  }
}
export {getLocalStorage,getSessionStorage};
