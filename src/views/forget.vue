<template>
  <div id="forget">
    <p class="registerTitle"></p>
    <div class="logoTitle">
      <img class="logo-icon" src="../assets/images/logo.png" alt="logo" />
      <span class="logo-name ml5">学长Store</span>
    </div>
    <div class="forgetCnt">
      <div class="line-split">
        <p class="ml15 cursor return-tip" @click="backLogin" style="color:rgb(56, 108, 202);">
          <i class="iconfont icon-iconfontback"></i>
          返回
        </p>
        <div class="fs18">找回密码</div>
      </div>
      <el-row>
        <el-col :span="16" :offset="5" class="mt10">
          <div>
            <el-row class="mt30">
              <el-col :span="3" :offset="3">
                <p class="inputDesc">用户名:</p>
              </el-col>
              <el-col :span="10">
                <el-input class="fl" placeholder="请输入用户名" v-model="username" @blur="nameBlur"></el-input>
              </el-col>
              <el-col :span="8" class="tl">
                <p v-if="errorUsername" class="errorEmail tl ml10">用户名不存在</p>
              </el-col>
            </el-row>
            <el-row class="mt30">
              <el-col :span="3" :offset="3">
                <p class="inputDesc">邮箱:</p>
              </el-col>
              <el-col :span="10">
                <el-input
                  class="fl"
                  placeholder="请输入注册邮箱"
                  v-model="email"
                  @blur="newEmailBlur"
                  @keyup.enter.native="changeNewPwd"
                ></el-input>
              </el-col>
              <el-col :span="8" class="tl">
                <p v-if="errorEmail" class="errorEmail tl ml10">邮箱格式输入有误</p>
                <span v-if="notRegisterEmail" class="errorEmail ml10">邮件不是注册邮箱!</span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="mt30">
        <el-col :span="8" :offset="8" class="mt10">
          <el-button type="primary" @click="changeNewPwd">提交</el-button>
        </el-col>
      </el-row>
    </div>
    <!--============== 弹框提示==============-->
    <el-dialog :visible.sync="gobackPwd" width="40%">
      <div>
        <p>
          <i class="iconfont icon-check-circle" style="font-size:50px;color:#72C040;"></i>
        </p>
        <p class="commitSuccess">提交成功</p>
        <p class="mt24 commitCnt">邮件已发送到您的邮箱中，邮件有效期为24小时。请及时登录邮箱，按照邮件提示进行后续操作。</p>
      </div>
      <span slot="footer" class="dialog-footer tc">
        <el-button type="primary" size="small" @click="returnIndex">返回首页</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "forget",
  data() {
    return {
      email: "",
      username: "",
      errorEmail: false,
      notRegisterEmail: false,
      errorUsername: false, // 判断用户名是否存在
      gobackPwd: false // 找回密码成功的弹出界面
    };
  },
  methods: {
    returnIndex() {
      this.$router.replace("/");
      this.dialogSucess = false;
    },
    // 判断用户名是否存在
    nameBlur() {
      /* var domain =  this.$store.getters.domain;
          var self = this;
          var name = this.username;
          var params = new URLSearchParams();
          params.append("domain",domain);
          params.append("username",this.username);
          this.$http({
            method:"post",
            url:this.baseUrl + "user/check/username",
            data:params
          }).then((res)=>{
            if(res.data.code == 0){
              if(res.data.data.exist == 0){
                self.errorUsername = true;
              }else {
                self.errorUsername = false;
              }
            }
          }).catch((err)=>{
            console.log(err)
          }) */
    },
    newEmailBlur() {
      var email = this.email;
      var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (!reg.test(email)) {
        this.errorEmail = true;
        this.notRegisterEmail = false;
      } else {
        this.errorEmail = false;
      }
    },
    // 提交
    changeNewPwd() {
      /*    var self = this;
          var baseUrl = this.$store.getters.baseUrl;
          var data = {
            username:this.username,
            email:this.email
          }
          if(!this.errorEmail){
            this.$http({
              method:"post",
              url:baseUrl + "user/retrieve",
              data:data,
            }).then((res)=>{

              if(res.data.code == 0){
                // this.$confirm('新密码修改成功,请到注册邮箱查看新密码!', '温馨提示', {
                //   confirmButtonText: '确定',
                //   cancelButtonText: '取消',
                //   type: 'success'
                // }).then(() => {
                //   self.$router.replace("/");
                // }).catch(() => {
                //
                // });
                this.gobackPwd = true;

              }else {
                var msg = this.data.msg;
                self.notRegisterEmail = true;
                // this.$message({
                //   message:msg,
                //   duration: 1000
                // });
              }
            }).catch((err)=>{
              var msg = err.response.data.msg;
              self.notRegisterEmail = true;
              // this.$message({
              //   message:msg,
              //   duration: 1000
              // });
            })
          }else {
            this.$message({
              message:"邮箱不能为空!",
              duration: 3000
            });
            return ;
          } */
    },
    backLogin() {
      this.$router.replace("/");
    }
  },
  created() {
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("class", "bodyBackColor");
    this.username = this.$route.params.name;
  }
};
</script>

<style lang="scss" scoped>
#forget {
  .commitSuccess {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    margin-top: 12px;
  }
  .commitCnt {
    font-size: 14px;
    color: #838d9f;
  }
  .forgetCnt {
    width: 1200px;
    margin: 0 auto;
    margin-top: 100px;
    background: #fff;
    padding-bottom: 30px;
    .errorEmail {
      position: relative;
      top: 9px;
      color: #ff0000;
    }
    .inputDesc {
      position: relative;
      top: 8px;
      width: 100px;
      text-align: right;
      left: -15px;
    }
    .line-split {
      border-bottom: 1px solid #ccc;
      height: 80px;
      line-height: 80px;
      text-align: center;
      margin: 0 auto;
      position: relative;
      .return-tip {
        position: absolute;
      }
    }
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
  .registerTitle {
    background: #000;
    opacity: 0.3;
    height: 37px;
    margin: 0 auto;
    text-align: left;
    padding: 10px 0 10px 0;
  }
}
</style>
