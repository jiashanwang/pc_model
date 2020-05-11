<template>
  <div id="personal-center">
    <p class="centerTitle"></p>
    <div class="logoTitle">
        <img src="../assets/images/logo.png" alt="logo" />
        <span class="ml5">学长Store</span>
    </div>
    <div class="userCenter">
      personal-center container
    </div>
  </div>
</template>

<script>
export default {
  name: "personal-center",
  data: function() {
    return {};
  },
  mounted(){
     var body = document.getElementsByTagName("body")[0];
      body.style.background = "#EFF4FB";
  }
};
</script>

<style lang="scss" scoped>
#personal-center {
  .centerTitle {
    background: #386cca;
    height: 37px;
    margin: 0 auto;
    text-align: left;
    padding: 10px 0 10px 0;
  }
   .userCenter{
    width: 1200px;
    margin:0 auto;
    background:#fff;
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
}
</style>