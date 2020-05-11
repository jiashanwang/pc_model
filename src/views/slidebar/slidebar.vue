<template>
  <div id="slidebar-root">
    <div class="nav-menu">
      <ul class="menu-list">
        <li :class="{'activeted':navIndex==1}" @click="jump(1)" style="position:relative;">
          <i class="iconfont icon-guanliyuan" style="font-size:20px;position:relative;top:2px;"></i>
          <span>楼长总览&emsp;</span>
        </li>
        <li :class="{'activeted':navIndex==2}" @click="jump(2)">
          <i class="iconfont icon-dataAnalysis-copy" style="font-size:20px;"></i>
          <span>数据分析&emsp;</span>
        </li>
        <li :class="{'activeted':navIndex==3}" @click="jump(3)">
          <i class="iconfont icon-cangkuguanli" style="font-size:20px;position:relative;top:2px;"></i>
          <span>仓库管理&emsp;</span>
        </li>
        <li :class="{'activeted':navIndex==4}" @click="jump(4)">
          <i class="iconfont icon-caiwu" style="font-size:20px;position:relative;top:2px;"></i>
          <span>财务中心&emsp;</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slidebar",
  data() {
    return {
      navIndex: 1
    };
  },
  methods: {
    jump(index) {
      switch (index) {
        case 1:
          this.$router.replace("/adminList");
          this.navIndex =1;
          console.log(this.navIndex)
          break;
        case 2:
          this.$router.replace("/dataAnalysis");
          console.log(this.navIndex)
          this.navIndex =2;
          break;
        case 3:
          this.$router.replace("/warehouse");
          console.log(this.navIndex);
          this.navIndex =3;
          break;
        case 4:
          this.$router.replace("/moneyCenter");
          console.log(this.navIndex);
          this.navIndex =4;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#slidebar-root {
  width: 100%;
  .nav-menu {
    position: relative;
    .menu-list {
      .activeted {
        background: #d8e2f2;
        color: #3d6fc1;
        font-weight: bold;
      }
      .icon-guanliyuan {
        color: #3e96d5;
      }
      .icon-dataAnalysis-copy {
        color: #1296db;
      }
      .icon-cangkuguanli {
        color: #55c7e9;
      }
      .icon-caiwu {
        color: #86d97d;
      }
      span {
        font-size: 16px;
      }
      li {
        height: 55px;
        line-height: 55px;
        cursor: pointer;
      }
      .activeted {
        background: #d8e2f2;
        color: #3d6fc1;
        font-weight: bold;
      }
    }
  }
}
</style>
