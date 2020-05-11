<!--划分三层结构 header content footer-->
<template>
    <div id="index-root">
      <Header></Header>
      <div class="index-content hidden">
        <div id="leftSlide" ref="leftSlide">
          <div id="slidebar-wrapper" class="fl">
              <Slidebar></Slidebar>
          </div>
        </div>
        <div id="rightContent" ref="rightContent">
          <div id="content-primary" class="fl">
            <router-view></router-view>
          </div>
        </div>
        <p class="clear"></p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return {
            isShow :false
          }
      },
      created(){
      /*   if(this.$store.getters.titleBox){
          this.isShow = true;
        }
        this.$store.dispatch("changeTitleBox", false);
      if(this.userType == 1){
        // 管理员进来
        this.managerUser = true;
      }else if(this.userType == 2){
        // 普通用户进来
        this.managerUser = false;
      } */
      },
      mounted(){
        var _this = this;
        this.$refs.leftSlide.style.height = (document.documentElement.clientHeight - 68 ) + "px";
        this.$refs.rightContent.style.height = (document.documentElement.clientHeight - 88 ) + "px";
        window.onresize=function(){
          _this.$refs.leftSlide.style.height = (document.documentElement.clientHeight - 68 ) + "px";
          _this.$refs.rightContent.style.height = (document.documentElement.clientHeight - 88 ) + "px";
        } 
      },
    methods:{
      /* isHide(){
        this.isShow = false;
      } */
    }
    }
    
</script>

<style lang="scss" scoped>
  #index-root{
    position: relative;
    #leftSlide{
      width:12%;
      float:left;
      background:#fff;
    }
    #rightContent{
      width:86%;
      float:right;
      margin-top:20px;
      margin-right:15px;
      background:#fff;
      overflow-y:auto;
      overflow-x: hidden;
    }
    .index-content{
      width:100%;
      height:100%;
      padding-top:63px;
    }
    #content-primary{
      width:100%;
      background:#fff;
    }
    #slidebar-wrapper{
      width:100%;
    }
  }

</style>

