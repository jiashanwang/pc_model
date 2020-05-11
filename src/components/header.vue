<template>
  <div id="header">
    <div class="fl logo ml50 mt15">
      <img src="../assets/images/logo.png" alt="logo" />
      <span class="ml5">学长Store</span>
    </div>
     <div class="fr userInfo mr50">
        <el-dropdown trigger="hover">
          <ul class="hidden cursor el-dropdown-link" style="color:#fff;">
            <li class="fl">
              <img src="../assets/images/welcome.png" alt="photo">
            </li>
            <li class="fl ml10">
              欢迎您,
            </li>
            <li class="fl ml10">
                <!-- {{userName}} -->
                王家山
            </li>
          </ul>
          <el-dropdown-menu slot="dropdown" class="userdropmenu"  >
            <el-dropdown-item><router-link :to="{path:'/personalCenter',query:{type:1}}" target="_blank">账户设置</router-link></el-dropdown-item>
            <el-dropdown-item ><a href="javascript:void(0)" @click="logout">退出登录</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      title: "header component",
      setListShow: false
    };
  },
  methods: {
    logout() {
      //  清除token
      /*   this.$http({
                method:"post",
                url:this.baseUrl + "user/logout",
              }).then((res)=>{
              })
          this.$router.push("/"); */
    }
  },
  created() {
    var body = document.getElementsByTagName("body")[0];
    body.style.background = "#EFF4FB";
    this.setListShow = false;
  }
};
</script>
<style>
.userdropmenu.el-dropdown-menu{
  width: auto;
  top: 40px!important;
}
.userdropmenu.el-dropdown-menu a{
  text-decoration: none;
    color: #999999;
}
</style>
<style lang="scss" scoped>
#header {
  position: absolute;
  top: 0px;
  width: 100%;
  background: #346dc7;
  height: 63px;
  line-height: 63px;
  .logo {
    display: flex;
    justify-content: left;
    color: #fff;
    img {
      width: 37px;
      height: 37px;
    }
    span {
      height: 37px;
      line-height: 37px;
      letter-spacing: 3px;
    }
  }
  .userInfo {
    img {
      width: 20px;
      height: 20px;
      position: relative;
      top: 3px;
    }
  }
}
</style>
