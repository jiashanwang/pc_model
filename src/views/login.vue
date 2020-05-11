<template>
  <div id="login">
    <p class="registerTitle"></p>
    <div class="logoTitle">
      <img class="logo-icon" src="../assets/images/logo.png" alt="logo" />
      <span class="logo-name ml5">学长Store</span>
    </div>
    <div class="indexPage">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <div class="leftCnt mt30" style="border-right:1px dashed #ccc">
            <p
              style="font-size:36px;color:#333333 ;position:relative;font-family: MicrosoftYaHei-Bold;"
              class="tc mb20"
            >
              Data-Analysis
              <i
                style="font-size:12px;font-family: MicrosoftYaHei-Bold;color:#333333; position:absolute;top:3px;left:417px;"
              >TM</i>
            </p>
            <p style="font-size:18px;color: #333333;" class="tc mb20">数字化运营、管理, 从这里开始 ......</p>
            <p class="tc">
              <img style="width:300px;height:286px;" src="../assets/images/login.png" alt="logo" />
            </p>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="rightCnt">
            <p class="fs16 admin-login">管理员登录</p>
            <div class="input_login">
              <el-input placeholder="请输入管理员帐号" v-model="username">
                <i slot="prefix" class="iconfont icon-yonghuming"></i>
              </el-input>
              <el-input
                placeholder="请输入密码"
                type="password"
                v-model="password"
                @keyup.enter.native="login"
              >
                <i slot="prefix" class="iconfont icon-mima"></i>
              </el-input>
            </div>
            <div class="hidden state_login">
              <p class="fl">
                <!--<span><img src="" alt=""></span>-->
                <span class="fs14 cursor">
                  <i v-if="autoLogin" @click="autoSelect" class="autoLogin">
                    <img src="../assets/images/autoLogin.png" alt="autoLogin" />
                  </i>
                  <i v-else @click="autoSelect" class="autoLogin">
                    <img src="../assets/images/autoLoginOk.png" alt="autoLogin" />
                  </i>
                  记住帐号
                </span>
              </p>
              <p class="fs14 fr" @click="forgetPwd">
                <span class="noneLine cursor">忘记密码</span>
              </p>
            </div>
            <p class="loginTip" v-if="errorInfo">
              <i class="iconfont icon-jinggao" style="top: 2px;"></i>
              {{loginMsg}}
            </p>
            <div class="state_login login-btn">
              <p class="fs16">
                <el-button type="primary" plain style="width:100%;font-size:16px;" @click="login">登录</el-button>
              </p>
            </div>
            <div>
              <p>
                <span class="fs14">&nbsp;</span>
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getLocalStorage, getSessionStorage } from "@/utils/common";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      autoLogin: true,
      Authorization: "",
      userForm: true,
      active: true,
      errorInfo: false,
      loginMsg: "", //登录的相关信息
      /* activeName: "first", */
      loginLoading: false
    };
  },

  created() {
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("class", "bodyBackColor");
    body.style.background = "";
  },
  methods: {
    /*  handleClick(tab, event) {}, */
    // 普通用户登录
    userLogin() {},
    // 管理员登录
    adminLogin() {},
    // 忘记密码
    forgetPwd() {
      this.$router.push({
        name: "Forget",
        params: {
          name: this.username
        }
      });
    },
    // 立即注册
    register() {},
    // 登录
    login() {
      this.$router.push("/adminList");
    },
    // 点击是否自动登录
    autoSelect() {
      console.log(this.autoLogin);
      this.autoLogin = !this.autoLogin;
      var localStrorage = getLocalStorage();
      if (!this.autoLogin) {
        // 选中
        localStrorage.setItem("autoLogin", 1);
      } else {
        //取消选中
        localStrorage.setItem("autoLogin", 0);
      }
    }
  }
};
</script>
<style>
.rightCnt .el-input__inner {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  margin-bottom: 15px;
}
</style>

<style lang="scss" scoped>
#login {
  .indexPage {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    margin-top: 100px;
    .rightCnt {
      .loginTip {
        color: #f74a4a;
        font-size: 14px;
        padding: 8px 12px;
        background: #feecec;
        border-radius: 4px;
        text-align: center;
        margin-top: 20px;
        width: 160px;
        margin-left: 69px;
      }
      .admin-login {
        height: 56px;
        background: #409eff;
        color: #fff;
        font-size: 16px;
        line-height: 56px;
        margin-bottom: 15px;
      }
      // padding:10px 60px 10px 120px;
      .input_login {
        width: 80%;
        margin: 0 auto;
        padding: 20px;
      }
      .state_login {
        width: 80%;
        margin: 0 auto;
        .autoLogin {
          position: relative;
          top: 3px;
          margin-right: 5px;
          img {
            width: 16px;
            height: 16px;
          }
        }
      }
      .login-btn {
        margin-top: 40px;
        margin-bottom: 10px;
      }
      border: 1px solid #e3e7ef;
      width: 360px;
      margin: 50px 0;
      .iconfont {
        position: relative;
        top: 10px;
        font-size: 20px;
      }
    }
  }
  .registerTitle {
    background: #000;
    opacity: 0.3;
    height: 37px;
    margin: 0 auto;
    text-align: left;
    padding: 10px 0 10px 0;
  }
  .logoTitle {
    height: 37px;
    width: 1200px;
    text-align: left;
    margin: 0 auto;
    position: relative;
    top: -45px;
    z-index: 300000;
    display: flex;
    justify-content: left;
    color: #fff;
    .logo-icon {
      width: 37px;
      height: 37px;
    }
    .logo-name {
      height: 37px;
      line-height: 37px;
      letter-spacing: 3px;
    }
  }
}
</style>
