<template>
  <div id="task-preview">
  <!--   <keep-alive>
      <MainHeader v-if="reloadTEM"></MainHeader>
    </keep-alive> -->
   <!--  <div id="taskNum" class="hidden mt20">
          <div class="running backWhite" style="width:30%;box-shadow: 0 5px 4px -4px black;">
            <div class="taskContent">
                <img src="../../assets/images/geneStatic.png" alt="gene" v-if="runNum == 0" style="position: relative;top:-5px;width:23px;margin-right:10px;">
                <img src="../../assets/images/gene.gif" alt="gene"  v-else style="position: relative;top:-2px;margin-right:10px;width:23px;">
              <span class="mr30" style="position: relative;top:-8px;margin-right:72px;">

                计算中的任务</span>
              <span class="fs40 numStyle">{{runNum}}</span>
            </div>
          </div>
          <div class="completed backWhite" style="width:30%;box-shadow: 0 5px 4px -4px black;">
            <p class="taskContent">
               <span class="mr30" style="margin-right:72px;"><i class="iconfont icon-yiwancheng mr15" style="font-size:24px;position: relative;top:2px;color:#94D87F;"></i>已完成任务数</span>
              <span class="fs40 numStyle">{{completedNum}}</span>
            </p>
          </div>
        <div class="diskInfo backWhite" style="width:30%;box-shadow: 0 5px 4px -4px black;">
          <el-row style="margin-top:24px;font-size: 16px;">
            <el-col :span="18" :offset="4">
              <div class="serverDesc">
                <ul>
                  <li class="mb5 hidden">
                    <p class="fl diskDesc tc">
                      <i class="iconfont icon-08"></i>
                    </p>
                    <p class="fl diskDesc tc">CPU:</p>
                    <p class="fl topInstance" v-if="cpu">{{cpu}}</p>
                    <p class="fl" v-else>正在获取中...</p>
                  </li>
                  <li class="mb5 hidden">
                    <p class="fl diskDesc tc" style="position:relative;top:4px;">
                      <i class="iconfont icon-SDneicunqia"></i>
                    </p>
                    <p class="fl diskDesc tc">内存:</p>
                    <p class="fl" v-if="ram">{{ram}}</p>
                    <p class="fl" v-else>正在获取中...</p>
                  </li>
                  <li class="mb5 hidden">
                    <p class="fl diskDesc tc"  style="position:relative;top:3px;">
                      <i class="iconfont icon-cipanio"></i>
                    </p>
                    <p class="fl diskDesc tc">磁盘:</p>
                    <p class="fl" v-if=" disk">{{disk}}</p>
                    <p class="fl" v-else>正在获取中...</p>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
    </div> -->
    <div id="taskList" class="mt30">
      <el-row>
        <el-col :span="12" class="hidden">
          <div class="selectType fl mt10 pl30 fl">
            <span class="fs18 fsBold commonColor taskTitleFs">任务列表</span>
            <el-select size="small" v-model="taskType" placeholder="请选择" @change="getTaskList($event)"
                       style="width:120px;">
              <el-option
                v-for="item in taskTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="mt10 fl pl10 newAddEle" style="position:relative;">
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" style="width:73px;"
                       @click="newTask">新建
            </el-button>
            <el-button size="small" type="primary"
                       @click="Refresh"><span> <el-tooltip placement="top">
    <div slot="content">点击获取任务列表实时状态</div>
  <i class="iconfont icon-49 mr5" style="font-size:11px;position: relative;top:-1px;"></i>
</el-tooltip></span>刷新
            </el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="newAndSearch fr mt10 pr30">
            <i class="iconfont icon-suosou searchPos" @click="searchTask"></i>
            <el-input size="small" v-model="searchLC" @keyup.enter.native="searchTask" placeholder="请输入任务或流程名称"
                      style="width:240px;"></el-input>
          </div>
        </el-col>
      </el-row>
      <!--新手指引-->
      <!-- <img v-if="newAddTitle" class="newAddDesc" src="../../assets/images/newAdd.png" alt="logo"> -->
        <div class="table" >
            <el-table
                :data="taskList"
                stripe
                style="width: 100%;min-width:1100px" v-loading="tableLoading">
                <el-table-column   prop="name" width="1">
                  <template slot-scope="scope">
                   <p class="tl" style="position: absolute;right: -193px;z-index: 1;top: 30px;">流程:{{scope.row.flowName}}</p>
                  </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true"  prop="name" label="任务名称" min-width="250" class-name="p55">
                  <template slot-scope="scope">
                    <div class="taskName hidden">
                      <i class="iconfont icon-renwu1  ml10 mr10 pos" style="color:#94D87F;"></i>
                      <div style="margin-left:55px">
                          <!-- <el-tooltip placement="top" v-if="item.name == currTip" class="cursor tkname">
                            <div slot="content">{{tipNameInfo}}</div>
                            <p @mouseover="taskNameHover($event,item,index)"
                              >{{item.name}}</p>
                          </el-tooltip> -->
                          <!-- <div slot="content">{{tipNameInfo}}</div> -->
                          <p class="tkname"><span>{{scope.row.name}}</span></p>
                          <!-- <p class="tl">流程:{{scope.row.flowName}}</p> -->
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true"  prop="createTime" label="创建时间"   min-width="150"></el-table-column>
                <el-table-column :show-overflow-tooltip="true"  prop="state" label="任务状态"   min-width="250">
                    <template slot-scope="scope">
                    <div class="status fl">
                      <!--1,未开始 2.执行中 3.未完成 4.分析完成 5.终止 6.报告完成-->
                      <i
                        :class="{'iconfont icon-jian-copy nostartbg':scope.row.state===1,'iconfont icon-yiwancheng okbg':scope.row.state===4,'iconfont icon-finish':scope.row.state===5,'iconfont icon-shanchuguanbicha errorbg':scope.row.state===3,'fs16,mr5':true}"></i>
                      <i v-if="scope.row.state ==2 " class="el-icon-loading" style="color:#539FF8;"></i>
                      <span v-if="scope.row.state===1" class="fs14">未开始</span>
                      <span v-else-if="scope.row.state===2" class="fs14">运行中</span>
                      <span v-else-if="scope.row.state===3" class="fs14">失败 <SMALL> {{scope.row.endTime}}</SMALL></span>
                      <span v-else-if="scope.row.state===4" class="fs14">分析完成 <SMALL> {{scope.row.endTime}}</SMALL></span>
                      <span v-else-if="scope.row.state===6" class="fs14">报告完成 <SMALL> {{scope.row.endTime}}</SMALL></span>
                      <span v-else class="fs14">已终止 <SMALL> {{scope.row.endTime}}</SMALL></span>
                    </div>
                    <div style="width:60%;top:18px;position:relative;left:10px" v-if="scope.row.state===2 && scope.row.totalJob">
                          <!-- <el-progress :percentage="scope.row.totalJob"></el-progress> -->
                          <el-progress :percentage="percent(scope.row.successJob,scope.row.totalJob)"></el-progress>
                    </div>
                    </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true"  prop="state" label="操作" min-width="430">
                    <template slot-scope="scope">
                      <ul class="tools">
                        <li  v-show="scope.row.state===1">
                          <el-button size="small" type="primary" @click="begin(scope.row.taskId,scope.$index,scope.row.flowId)" :loading="scope.row.runLoading">运行</el-button>
                        </li>
                        <li  v-show="scope.row.state===1">
                          <el-button size="small" type="primary" @click="edit(scope.row.taskId,scope.row.flowId)">编辑</el-button>
                        </li>
                        <li >
                          <el-button size="small" type="primary" @click="look(scope.row)">查看</el-button>
                        </li>
                        <li  v-show="scope.row.state===6">
                          <el-button size="small" type="success" @click="onlineReport(scope.row.taskId)">在线报告</el-button>
                        </li>
                        <li  v-show="scope.row.state===4">
                          <el-button size="small" type="info" class="noHover">在线报告</el-button>
                        </li>
                        <li  v-show="scope.row.state===2">
                          <el-button size="small" type="primary" @click="stop(scope.row.taskId,scope.$index)"  :loading="scope.row.stopLoading">停止</el-button>
                        </li>
                        <li  v-show="scope.row.state===3">
                          <el-button size="small" type="warning" @click="errorInfo(scope.row,scope.row.taskId)">报错信息</el-button>
                        </li>
                        <li >
                          <el-button size="small" type="danger" @click="kill(scope.row,scope.$index)" :loading="scope.row.delLoading">删除</el-button>
                        </li>
                      </ul>
                    </template>
                </el-table-column>
            </el-table>
        </div>
      <!--新手指引-->
  <!--     <p class="oparator" v-if="newAddTitle">
        <img class="mr20 cursor" @click="addPreview" src="../../assets/images/preview.png" alt="preview">
        <img class="mr20 cursor" @click="addAgain" src="../../assets/images/again.png" alt="again">
        <img class="mr20 cursor" @click="addOut" src="../../assets/images/out.png" alt="out">
      </p> -->
      <div class="pagination ml20 mt20 mb20">
        <el-row type="flex">
          <el-col :span="24">
            <el-pagination
              background
              :pager-count = 7
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="nowPageNum"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pagination.pageSize"
              layout="prev, pager, next, jumper,total, sizes"
              :total="total">
            </el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--============== 弹框提示==============-->
   <!--  <div class="serverInfos">
      <el-dialog
        :visible.sync="serverInfo"
        width="40%"
        @close="close"
        :close-on-click-modal=false
      >
        <div>
          <p style="font-size: 18px;color: #333333;font-weight: bold;">登录服务器</p>
          <ul class="hidden mt20" style="height:32px; line-height:32px;">
            <li class="fl serverInfoTip1">服务器帐号：</li>
            <li class="fl hidden serverInfoTip2">
              <p class="fl" style="width:60%;" >{{serverAccount}}</p>
              <p class="fl changeBtn" v-if="delServerCount >= 3 &&  !changeServerType" @click="delServer">重新注册帐号</p>
              <p class="fl changeBtn" v-else-if="bindAccount" @click="changeServer" :class="{isApproval : changeServerType}">更换绑定帐号</p>
            </li>
          </ul>
          <ul class="hidden mt20" style="height:42px; line-height:42px;">
            <li class="fl serverInfoTip1">服务器密码：</li>

            <li class="fl serverInfoTip2">
              <el-input v-model="serverPwd" type="password" placeholder="请输入服务器密码"></el-input>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer tc" style="position:relative">
              <el-button type="primary" size="small" style="width:112px;" @click="logSure" :class="{isApproval : changeServerType}">确定</el-button>
              <el-button size="small" style="width:112px;" @click="logout">退出</el-button>
              <span class="error" v-show="error">连接超时，请重试</span>
            </span>
      </el-dialog>
    </div> -->
  </div>
</template>
<script>
  /* import {requestTaskList, getDefaultDirList} from "@/utils/moduleRely"
  import {getDefaultParmas, backMainPage} from "@/utils/addColumns"
  import {getLocalStorage,getSessionStorage} from "@/utils/common" */
  export default {
    name: "task-preview",
    data() {
      return {
        taskType: 0,
        searchLC: "", // 任务列表搜索关键字
        pagination: {
          pageSize: 10,
          pageNo: 1,
        },
        currTip:"",
        tipNameInfo:"" ,// 浮框显示的内容
        serverInfo:false, // 是否显示输入服务器密码弹框
        bindAccount:true, // 更换服务器帐号 按钮是否显示
        serverPwd:"",// 弹框里面的服务器密码
        serverAccount:"", // 服务器帐号
        colseType:false,
        delServerCount:0, //更换服务器帐号次数
        changeServerType:false, //当前更换服务器帐号状态
        reloadTEM:true, //mainHeader 判断是否显示
        error:false,
        tableLoading:false,
        nowPageNum:1,//当前页标
      }
    },

    computed: {
      // 判断用户是不是第一次登录，从而判读是否显示蒙层
      loginCount() {
       /*  return this.$store.getters.loginCount */
      },
      runNum:{
        get: function () {
          /* return this.$store.getters.runNum */
        },
        set: function (newValue) {
         /*  this.$store.dispatch("changeRunNum", newValue) */
        }
      },

      newTaskName() {
       /*  return this.$store.getters.newTaskName */
      },
      completedNum:{
        get: function () {
         /*  return this.$store.getters.completedNum */
        },
        set: function (newValue) {
          /* this.$store.dispatch("changeCompletedNum", newValue) */
        }
      },
      cpu() {
       /*  return this.$store.getters.cpu */
      },
      ram() {
       /*  return this.$store.getters.ram */
      },
      disk() {
        /* return this.$store.getters.disk */
      },
      serverId:{
        get: function () {
        /*   return this.$store.getters.serverId */
        },
        set: function (newValue) {

          /* this.$store.dispatch("changeServerId", newValue) */
        }
      },
      userId() {
        /* return this.$store.getters.userId */
      },
      taskTypes() {
        /* return this.$store.getters.taskTypes */
      },
      baseUrl() {
        return this.$store.getters.baseUrl
      },
      beginTime() {
       /*  return this.$store.getters.beginTime */
      },
      taskList() {
       /*  return this.$store.getters.taskList */
      },
      taskConfig() {
       /*  return this.$store.getters.taskConfig */
      },
      newAddTitle() {
        /* return this.$store.getters.newAddTitle */
      },
      total: {
        get: function () {
         /*  return this.$store.getters.total */
        },
        set: function (newValue) {
          /* this.$store.dispatch("changeTotal", newValue) */
        }
      },
    },
    methods: {
      percent(val1,val2){
        /* if(!val1){return 1}
        if(val1 >= val2){return 99.9}
        return Math.round((val1/val2)*10000)/100 */
      },
      close(){
       /*  if(!this.colseType){
          this.$router.replace("/");
        } */
      },
      changeServer(){
        /* this.$router.replace("/serverName"); */
      },
      delServer(){
        /*  this.$confirm("是否重新注册帐号？此操作会删除当前用户", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$http({
                method:"delete",
                url:this.baseUrl + "user",
              }).then((res)=>{
                    this.$router.replace("/register");
              })
          }) .catch(action => {}); */
      },
      // 弹框的确认按钮
      logSure(){
        /* this.changeServerType = true;
        var self = this;
        var loginCount = this.$store.getters.loginCount;
        var baseUrl = this.$store.getters.baseUrl;
        this.$http({
          method:"post",
          url:baseUrl + "sys/test/auth",
          data:{
            serverAccount:this.serverAccount,
            serverKey:this.serverPwd,
            accountType:1,
            isBinding : window.localStorage.getItem("isBinding") == 1 ? true : false
          },
        }).then((res)=>{
          if(res.data.code == 0){
              if(window.localStorage.hasOwnProperty('serverType')){//去掉localstorge服务器判断参数
                     window.localStorage.removeItem('serverType');
              }
            // window.location.reload();
            // self.$store.dispatch("changeUserLoginStatus",100);

            self.$store.dispatch("changeIsLoadingIndex",true);
            if(loginCount ==1){
              self.$store.dispatch("changeTitleBox",true);
              self.$store.dispatch("changeLookTitle",true);
            }else {
              self.$store.dispatch("changeTitleBox",false);
              self.$store.dispatch("changeLookTitle",false);
            }
            // self.$router.replace("/taskPreview");
            this.colseType =true;
            window.localStorage.setItem("isServerInfo","1");
            self.serverInfo = false;
            this.$store.dispatch("changeUserLoginStatus",4);
            this.reloadTEM = true;
          }else if(res.data.code == -26){
            this.$message(res.data.msg);
          }else if(res.data.code == -100){
            this.error = true;
          }
          this.changeServerType = false;
        }).catch((err)=>{
          this.changeServerType = false;
          console.log(err);
        }) */
      },
      // 弹框的退出按钮
      logout(){
       /*  this.serverInfo = false;
        this.$router.replace("/"); */
      },

      Refresh(){
        // 初始化获取任务列表
        /* this.nowPageNum = 1;
        let data = {
          state: 0,
          keyWord: "",
          page: {
            pageNo: 1,
            pageSize: 10,
          },
          serverId: this.serverId,
          userId: this.userId
        };
        requestTaskList(this, data); */
      },
      // 任务名称鼠标hover 事件
      taskNameHover(event,item,index){
        /* var content = event.target.innerText;
        var eleWidth = event.target.offsetWidth;
        var span = document.createElement("span");
        span.setAttribute("id","visibleTest");
        var baseTitle = document.getElementsByClassName("newAddEle")[0];
        baseTitle.parentNode.insertBefore(span,baseTitle);
        var visibleTest = document.getElementById("visibleTest");
        visibleTest.innerText = content;
        var innerWidth = visibleTest.offsetWidth;
        if (innerWidth > eleWidth) {
          this.currTip = event.target.innerText;
          this.tipNameInfo = item.name;
        };
        visibleTest.parentNode.removeChild(visibleTest); */
      },
      // addPreview() {
      //   // 新手提示 上一步
      //   this.$store.dispatch("changeLookTitle", true);
      //   this.$store.dispatch("changeNewAddTitle", false);

      // },
      // addAgain() {
      //   //新手提示 继续
      //   backMainPage(this, 'changeTaskNameState', true, false)
      //   this.$store.dispatch("changeBaseTitle", true);
      //   this.$router.replace("/newTask")
      // },
      // //新手提示 退出
      // addOut() {
      //   backMainPage(this, '', false, true)
      // },
      // 页面跳转到新建任务页面
      newTask() {
        /* this.$store.dispatch("changeNavIndex", 2);
        this.$router.replace("/newTask");
        let beginTime = new Date().format("yyyy-MM-dd hh:mm");
        this.$store.dispatch("changeBeginTime", beginTime);
        this.$store.dispatch("changeServerCreatTime",false);
        this.$store.dispatch("changeTaskTitle","新建分析任务");
        this.taskConfig.createTime = this.beginTime;
        this.taskConfig.taskName = this.newTaskName;
        var name = "测试新建任务名称" + "(" + this.total + ")";
        this.$store.dispatch("changeNewTaskName", name);
        this.$store.dispatch("changeTextarea", '');
        this.$store.dispatch("changeTaskConfig", this.taskConfig); */
      },

      // 任务类型筛选框
      getTaskList(val) {

        /* let data = {
          state: val, // 任务状态
          keyWord: this.searchLC,
          page: {
            pageNo: 1,
            pageSize: 10,
          },
          serverId: this.serverId,
          userId: this.userId,
        };
        requestTaskList(this, data); */
      },

      // pageSize 选择事件
      handleSizeChange(val) {
        /* this.pagination.pageSize = val;
        let data = {
          state: this.taskType,
          keyWord: this.searchLC,
          page: {
            pageNo: this.pagination.pageNo,
            pageSize: val,
          },
          serverId: this.serverId,
          userId: this.userId
        };
        requestTaskList(this, data); */
      },

      // 分页查询，选中页
      handleCurrentChange(val) {

       /*  this.pagination.pageNo = val;
        let data = {
          state: this.taskType,
          keyWord: this.searchLC,
          page: {
            pageNo: val,
            pageSize: this.pagination.pageSize,
          },
          serverId: this.serverId,
          userId: this.userId
        };
        requestTaskList(this, data); */
      },

      // 输入框模糊搜索任务列表
      searchTask() {
       /*  let data = {
          state: this.taskType,
          keyWord: this.searchLC,
          page: {
            pageNo: 1,
            pageSize: this.pagination.pageSize,
          },
          serverId: this.serverId,
          userId: this.userId
        };
        this.nowPageNum = 1;
        requestTaskList(this, data); */
      },
      // 获取任务状态
      // getTaskStatus(){

      //   var self = this;
      //   // 获取服务器任务数的相关状态
      //   self.$http({
      //     method:"post",
      //     url:self.baseUrl + "task/getTaskStatus",
      //     timeout: 0 ,
      //     data:{
      //       serverId:self.$store.getters.serverId,
      //       userId:self.$store.getters.userId
      //     },
      //   }).then((res)=>{
      //     if(res.data.code == 0){
      //       if(res.data.data.running){
      //         this.$store.dispatch("changeRunNum",res.data.data.running);
      //       }else {
      //         this.$store.dispatch("changeRunNum",0);
      //       }
      //       if(res.data.data.complete){
      //         this.$store.dispatch("changeCompletedNum",res.data.data.complete);
      //       }else {
      //         this.$store.dispatch("changeCompletedNum",0);
      //       }
      //     }
      //   }).catch((err)=>{
      //     console.log(err);
      //   })
      // },
      // 任务开始
      begin(id,index,flowId) {
        // if(flowId == 2){
        // this.$alert('dna运行流程正在测试中！', '提示', {
        //   confirmButtonText: '确定',
        // });
        //     return;
        // }
       /*  var self = this;
         this.$confirm("是否开始任务?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$set( this.taskList[index],'runLoading',true);
              this.$http({
                method: "post",
                url: this.baseUrl + "task/exec",
                data: {
                  taskId: id
                },
              }).then((res) => {
                self.taskList[index].runLoading = false;
                if (res.data.code == 0) {
                  // 开始任务启动成功 ==》 重新渲染叶脉你
                  let data = {
                    state: self.taskType,
                    keyWord: self.searchLC,
                    page: {
                      pageNo: self.pagination.pageNo,
                      pageSize: self.pagination.pageSize,
                    },
                    serverId: self.serverId,
                    userId: self.userId
                  };
                  requestTaskList(self, data);
                  // this.getTaskStatus();

                } else {
                  self.$message({
                    message:"任务运行失败,请稍后再试!",
                    duration: 3000
                  });
                  return;
                }
              })
                .catch((err) => {
                  self.taskList[index].runLoading = false;
                  console.log(err);
                })
          }) .catch(action => {}); */

      },
      subEdit(data,id,type) {

/*         this.taskConfig.base.sampleInfo = data.base.sampleInfo;
        this.taskConfig.base.groupInfo = data.base.groupInfo;
        this.taskConfig.oldModules = data.oldModules;
        // this.$store.dispatch("changeOldHighModules",data.oldModules);
        this.$store.dispatch("changeOldHighModules",data.modules);
        this.$store.dispatch("changeEditHighModules",data.modules); // 专门用来存编辑进来的数据

        this.$store.dispatch("changeTaskConfig",this.taskConfig);

        var refSpecies = data.base.speciesKey;
        var refGenomeVersion = data.base.speciesVersion;
        this.$store.dispatch("changeRefSpecies", refSpecies);
        this.$store.dispatch("changeRefGenome", refGenomeVersion);
        if(type == 2){
          this.$store.dispatch("changeCurrFlowName",2);
          this.$router.push({path: '/newTask',query: {taskId: id}})
        }else{
          if (data.base.comparisonInfo) {
          this.taskConfig.base.comparisonInfo = data.base.comparisonInfo;
          this.$store.dispatch("changeTaskConfig",this.taskConfig);
          var compareGroupList = data.base.comparisonInfo.comparisonIds;
          var compareArr = [];
          for (var i = 0; i < compareGroupList.length; i++) {
            var currArr = [];
            var currGroup = compareGroupList[i].split("_vs_");
            currArr.push(currGroup[0]);
            currArr.push(currGroup[1]);
            compareArr.push(currArr);
          }
          this.$store.dispatch("changeTransferToGroup", compareArr);
        }
        else {
          this.$store.dispatch("changeTransferToGroup", []);
        }
        // this.$router.replace("/newTask");
          this.$router.push({path: '/newTask',query: {rnaId: id}})
        } */
      },
      // 编辑任务
      edit(id,type) {
        // 1.先获取当前任务详细信息
     /*    this.$store.dispatch("changeIsUpdate", true);
        this.$store.dispatch("changeIsCopy",false);
        this.$store.dispatch("changeTaskId", id);
        this.$http({
          method: "post",
          url: this.baseUrl + "task/get",
          data: {
            taskId: id
          },
        }).then((res) => {
          if (res.data.code == 0) {
            // 成功
            var currTaskConfig = res.data.data;
            // var createdTime = currTaskConfig.createTime;
            var createdTime =new Date().format("yyyy-MM-dd hh:mm");

            // mainHeader
            this.$store.dispatch('changeTaskId', currTaskConfig.taskId);
            this.$store.dispatch("changeServerCreatTime",true);
            this.$store.dispatch('changeTaskDesc', currTaskConfig.taskDesc);
            this.$store.dispatch("changeSampleInfoDatas",currTaskConfig.base.sampleInfo);
            this.$store.dispatch('changeNavName', "编辑任务");
            this.$store.dispatch('nextDesc', true)
            // taskTitle
            this.$store.dispatch("changeTaskTitle", "编辑分析任务");
            this.$store.dispatch("changeGenomeArr",currTaskConfig.base.genome);
            this.$store.dispatch("changeNewTaskName", currTaskConfig.taskName);
            if(currTaskConfig.base.comparisonInfo){
              this.$store.dispatch("changeTransferToGroup",currTaskConfig.base.comparisonInfo.comparisonIds);
            }else {
              this.$store.dispatch("changeTransferToGroup",[]);
            }
            this.taskConfig.taskName = currTaskConfig.taskName;
            this.taskConfig.base.speciesKey = currTaskConfig.base.speciesKey;
            this.taskConfig.base.speciesVersion = currTaskConfig.base.speciesVersion;
            this.taskConfig.base.speciesVersion = currTaskConfig.base.speciesVersion;
            if(type == 1){
            this.taskConfig.base.externals = currTaskConfig.base.externals;
            this.$store.dispatch("changeFqlist", currTaskConfig.base.externals);
            }
            this.$store.dispatch("changeTaskConfig", this.taskConfig);
            this.$store.dispatch("changeTaskConfigDna",this.taskConfig);
            this.$store.dispatch("changeCreated", "任务创建时间");
            this.$store.dispatch("changeTextarea", currTaskConfig.taskDesc);
            // this.$store.dispatch("changeProcessName", currTaskConfig.processName);
            this.$store.dispatch("changeProcessName",currTaskConfig.flowId);
            this.$store.dispatch("changeBeginTime", createdTime);
            if(currTaskConfig.base.sampleAnnotion){
              this.$store.dispatch("changeNewAddListHead",currTaskConfig.base.sampleAnnotion[0]);
            }
            // this.$store.dispatch("changeRefGenome", currTaskConfig.base.speciesVersion);
            // this.$store.dispatch("changeRefSpecies", currTaskConfig.base.speciesKey);
            this.subEdit(currTaskConfig,id,type)

          } else {
            // 失败
            this.$message({
              message:"查看任务失败,请稍后再试!",
              duration: 3000
            });
            return;
          }
        }).catch((err) => {
          console.log(err);
        }) */
      },
      // 查看任务
      look(item) {
/* 
        this.$store.dispatch("changeTaskId", item.taskId);
        let flowType = item.flowId; // flowId 为1，是rna ,flowId 为2 ，是dna
        this.$http({
          method: "post",
          url: this.baseUrl + "task/get",
          data: {
            taskId: item.taskId
          },
        }).then((res) => {
          if (res.data.code == 0) {
            // 任务描述信息

            this.$store.dispatch("changeLookName", res.data.data.taskName);
            this.$store.dispatch("changeProcessLc", res.data.data.flowName);
            this.$store.dispatch("changeLookPath", res.data.data.outputPath);
            this.$store.dispatch("changeGenomeArr", res.data.data.base.genome);
            this.$store.dispatch("changeServerCreatTime",true);
            var runState;
            switch (res.data.data.state) {
              case 1:
                runState = "未开始";
                break;
              case 2:
                runState = "执行中" +"&&" + res.data.data.sampleFileState;
                break;
              case 3:
                runState = "未完成";
                break;
              case 4:
                runState = "分析完成";
                break;
              case 5:
                runState = "终止";
                break;
              case 6:
                runState = "报告完成";
                break;
            }
            this.$store.dispatch("changeLookStatus", runState);
            this.$store.dispatch("changeLookTaskDesc", res.data.data.taskDesc);


            var currTaskConfig = res.data.data;
            var createdTime = currTaskConfig.createTime;
            // this.$store.dispatch("changeLookTask", currTaskConfig)
              switch (flowType){
                case 1:
                  this.$router.replace("/viewPage");
                  this.$store.dispatch("changeLookTask", currTaskConfig)
                  break;
                case 2:
                  // this.$router.replace("/viewPageDna");
                  this.$router.push({path: '/viewPageDna',query: {taskId: item.taskId}})
                  this.$store.dispatch("changeLookTaskDna", currTaskConfig)
                  break;
              }
            // mainHeader
            this.$store.dispatch('changeNavName', "查看任务");
            this.$store.dispatch('nextDesc', true)
            // taskTitle
            this.$store.dispatch("changeTaskTitle", "查看分析任务");
            this.$store.dispatch("changeCreated", "任务创建时间");
            this.$store.dispatch("changeBeginTime", createdTime);

          } else {
            // 失败
            this.$message({
              message:"查看任务失败,请稍后再试!",
              duration: 3000
            });
            return;
          }
        }).catch((err) => {
          console.log(err);
        }) */
      },
      // onlineReport(id) {
      //   this.$http({
      //     method: "post",
      //     url: this.baseUrl + "task/report/token?taskId="+id+"&userId="+this.userId,
      //   }).then((res) => {
      //     var token = res.data.data;
      //     var loginUrl = "http://172.168.1.203:86/ps/login/login.html";
      //     var a = document.createElement("a");
      //     a.setAttribute("href", loginUrl+"?LCID="+id+"&Token="+token);
      //     a.setAttribute("target", "_blank");
      //     a.setAttribute("id", id);
      //     // 防止反复添加
      //     if(!document.getElementById(id)) {
      //       document.body.appendChild(a);
      //     }
      //     a.click();
      //     // if(document.getElementById(id)) {
      //     //  var rma = document.getElementById(id);
      //     //  rma.parentNode.removeChild(rma);
      //     // }
      //     }).catch((err) => {
      //     console.log(err);
      //   })
      // },
      onlineReport(id) {
  /*         var newPage = window.open();//新开页面
          this.$http({
            method: "post",
            url:
              this.baseUrl +
              "task/report/token?taskId=" +
              id +
              "&userId=" +
              this.userId
          })
            .then(res => {
              var token = res.data.data;
              var loginUrl = "http://172.168.1.210:180/ps/login/login.html";
              // 返回成功进入新开页面
              newPage.location = loginUrl + "?LCID=" + id + "&Token=" + token;
            })
            .catch(err => {
              newPage.close();//失败时候关闭新建页面
              console.log(err);
            }); */
        },
      stop(id,type,item) {

     /*    var self = this;
        if(type === "del"){
          this.$http({
            method: "post",
            url: this.baseUrl + "task/stop",
            data: {
              taskId: id
            },
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message:"成功终止了本条任务!",
                duration: 3000
              });
              // 重新刷新列表
              var data = {
                state: this.taskType,
                keyWord: this.searchLC,
                page: {
                  pageNo: this.pagination.pageNo,
                  pageSize: this.pagination.pageSize,
                },
                serverId: this.serverId,
                userId: this.userId
              };
              this.$http({
                method: "post",
                url: this.baseUrl + "task/delete?_method=delete",
                data: {
                  taskId: item.taskId
                },
              }).then((res) => {
                if (res.data.code == 0) {
                  this.$message({
                    message:"删除成功!",
                    duration: 3000
                  });
                  requestTaskList(this, data);
                  // self.getTaskStatus();
                } else {
                  this.$message({
                    message:"删除失败!",
                    duration: 3000
                  });
                }
              })
                .catch((err) => {
                  console.log(err);
                })
            } else {
              this.$message({
                message:"任务终止失败!",
                duration: 3000
              });
            }
          }).catch((err) => {
              console.log(err);
            })
        }else{
          this.$confirm("是否停止任务?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
               this.$set( this.taskList[type],'stopLoading',true);
                this.$http({
                method: "post",
                url: this.baseUrl + "task/stop",
                data: {
                  taskId: id
                },
              }).then((res) => {
                this.taskList[type].stopLoading = false;
                if (res.data.code == 0) {
                  this.$message({
                    message:"成功终止了本条任务!",
                    duration: 3000
                  });
                  // 重新刷新列表
                  var data = {
                    state: this.taskType,
                    keyWord: this.searchLC,
                    page: {
                      pageNo: this.pagination.pageNo,
                      pageSize: this.pagination.pageSize,
                    },
                    serverId: this.serverId,
                    userId: this.userId
                  };
                  //  self.getTaskStatus();
                  requestTaskList(this, data);
                } else {
                  this.$message({
                    message:"任务终止失败!",
                    duration: 3000
                  });
                }
              }).catch((err) => {
                this.taskList[type].stopLoading = false;
                  console.log(err);
                })
          }) .catch(action => {});
        } */
      },
      errorInfo(item,id) {
    /*     this.$http({
          method: "post",
          url: this.baseUrl + "task/getErrorInfo",
          data: {
            taskId: id,
            serverId: this.serverId,
            hash:item.hash
          }
        }).then((res) => {
          if (res.data.code == 0) {
            this.$store.dispatch("changeLookName", res.data.data.name);
            this.$store.dispatch("changeProcessLc", res.data.data.flowName);
            this.$store.dispatch("changeLookPath", res.data.data.outputPath);
            var runState;
            switch (res.data.data.state) {
              case 1:
                runState = "未开始";
                break;
              case 2:
                runState = "执行中";
                break;
              case 3:
                runState = "未完成";
                break;
              case 4:
                runState = "已完成";
                break;
              case 5:
                runState = "终止";
                break;
            }
            this.$store.dispatch("changeLookStatus", runState);
            this.$store.dispatch("changeLookTaskDesc", res.data.data.desc);

            this.$store.dispatch("changeErrorInfos", res.data.data.errorInfo);
            this.$store.dispatch("changeTaskTitle", "查看任务报错信息");
            this.$store.dispatch("changeCreated", "信息创建时间");
            this.$store.dispatch("changeBeginTime", res.data.data.createTime);
            this.$router.replace("/errorPage");
          } else {
            this.$message({
              message:"任务终查看报错信息失败,请稍后重试止失败!",
              duration: 3000
            });
          }

        }).catch((err) => {
            console.log(err)
          }
        ); */
      },
      kill(item,index) {
/*          this.$confirm("是否删除任务?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.taskList[index].delLoading = true;
            // 删除一个任务时，如果有停止按钮，需要先停止任务，然后才能删除
              if(item.state == 2){
                this.stop(item.taskId,"del",item);
              }else {
                var self = this;
                // 初始化获取任务列表
                var data = {
                  state: this.taskType,
                  keyWord: this.searchLC,
                  page: {
                    pageNo: this.pagination.pageNo,
                    pageSize: this.pagination.pageSize,
                  },
                  serverId: this.serverId,
                  userId: this.userId
                };
                this.$http({
                  method: "post",
                  url: this.baseUrl + "task/delete?_method=delete",
                  data: {
                    taskId: item.taskId
                  },
                }).then((res) => {
                  this.taskList[index].delLoading = false;
                  if (res.data.code == 0) {
                    this.$message({
                      message:"删除成功!",
                      duration: 3000
                    });
                    requestTaskList(this, data);
                    // self.getTaskStatus();
                  } else {
                    this.$message({
                      message:"删除失败!",
                      duration: 3000
                    });
                  }
                })
                  .catch((err) => {
                    this.taskList[index].delLoading = false;
                    console.log(err);
                  })
              }

          }) .catch(action => {}); */

      },
      getALL(){
/*         this.$http({
            method: "post",
            url: this.baseUrl + "flow/getAll",
            data: {
              userId: 10
            },
          }).then((res) => {
            if(res.data.code == 0){
              this.$store.dispatch("changeProcessList",res.data.data.flowList);
              this.getRefGenes();
            }
      }) */
      },
        getRefGenes() {
/*         var self = this;
        var serverId = this.$store.getters.serverId;
        var flowId = this.$store.getters.taskConfig.flowId;
        this.$http({
          method: "post",
          url: this.baseUrl + "species/getSpeciesesOfOwn",
          data: {
            serverId: serverId,
            flowId:flowId,
          },
          }).then((res) =>{

            self.$store.dispatch("changeSpecies", res.data.data) // 真实数据
          }).catch((err) => {xf
          console.log(err);
        }) */
      },
    },
    mounted(){
      var body = document.getElementsByTagName("body")[0];
      body.setAttribute("class", "");
      var rightContent = document.getElementById("rightContent");
      rightContent.style.background = "#EFF4FB";
/*       console.log(this.runNum);
      // this.$store.dispatch("changeProcessName","1");
      this.$store.dispatch("changeCurrFlowName",1);
      var body = document.getElementsByTagName("body")[0];
      body.setAttribute("class", "");
      var rightContent = document.getElementById("rightContent");
      rightContent.style.background = "#EFF4FB";

      var userStatus = this.$store.getters.userLoginStatus;
      // 1. 公共帐号登录成功  2，个人帐号第一次登录，3，个人帐号非第一次登录，但是密码与帐号不匹配  ,4,个人帐号非第一次登录,直接登录成功
      if(userStatus == 2){
        this.serverInfo = true;
      }else if(userStatus == 3){
        this.serverInfo = true;
        this.bindAccount = false;
      }else if (userStatus == 1){
        // 普通用户登录成功，显示普通用户的个人中心

      }

      //验证服务器密码后刷新不显示弹框事件
      if(window.localStorage.hasOwnProperty("isServerInfo")){
        if(window.localStorage.getItem("isServerInfo") === "1"){
          this.serverInfo = false;
        }
      }
      if(window.localStorage.hasOwnProperty("serverType")){
        let serverType = JSON.parse( window.localStorage.getItem("serverType"));
        this.delServerCount = serverType.exchangeCount;
        this.changeServerType = serverType.isApplying;
      } */
    },
    created() {
/*       let statue = this.$store.getters.userLoginStatus;
        if(statue === 3 || statue === 2){
          this.reloadTEM = false;
         }
      this.$store.dispatch("changeIsCopy", false);
      this.$store.dispatch("changeIsUpdate", false);
      this.$store.dispatch("changeNavIndex", 1)
      this.$store.dispatch("changeTaskId", null);
      var sessionStorage = getSessionStorage();
      this.serverAccount = sessionStorage.getItem("serverAccount");
      // // 初始化获取任务列表
      let data = {
        state: 0,
        keyWord: "",
        page: {
          pageNo: 1,
          pageSize: 10,
        },
        serverId: this.serverId,
        userId: this.userId
      };
      var abc = window.localStorage.getItem("Authorization");
      requestTaskList(this, data);
      this.getALL(); */
    },
  }
</script>
<style>
th.p55 .cell{
      padding-left: 65px!important;
}
#taskList .el-pagination__sizes {
    margin: 0 20px 0 20px;
}
#taskList .el-pagination__total {
    margin-left: 20px;
}
.serverInfos .el-input__inner{
  height: 35px;
  line-height: 35px;
}
.error{
  color: red;
  text-align: center;
  display: block;
  margin: 10px 0 0 -125px;
}
.noHover{
  cursor: no-drop;
}
.noHover:hover{
  background: #909399;
}
#task-preview .table .el-table td {
    padding: 6px 0;
    text-align: left;
}
#task-preview .table .el-table th {
  text-align: left!important;
  background: #F5F8FC;
  font-weight: normal;
}
#task-preview .table .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #F5F8FC;
}
.tools li{
  float: left;
  margin-right: 20px;
}
.tools .el-button{
  width: 80px;
}
.tools .el-button--small, .tools .el-button--small.is-round {
    padding: 9px 9px;
}
</style>

<style lang="scss" scoped>
  #task-preview {
    .numStyle{
      display:inline-block;
      width:10px;
      margin:0 auto;
    }
    .changeBtn{
      width:100px;
      background: #77DA6C;
      border-radius: 2px;
      text-align:center;
      height:32px;
      line-height:32px;
      cursor:pointer;
    }
    .serverInfoTip1{
      width:30%;
      text-align:right;
    }
    .serverInfoTip2{
      width:50%;
      text-align:left;
    }
    .taskTitleFs{
      margin-right:48px;
      display:inline-block;
      position: relative;
      top: 2px;
      font-weight:bold;
    }
    .taskContent{
      height:40px;
      line-height:40px;
      margin-top:44px;
      span:nth-child(1){
        position: relative;
        top: -8px;
        /*margin-right:72px;*/
      }
    }

    #visibleTest {
      visibility: hidden;
      color:transparent;
    }
    .bgcTitle{
      padding:10px 0;
    }
    .topInstance{
      position:relative;
      top:0px;
    }
    .newAddDesc {
      width: 800px;
      position: absolute;
      left: 219px;
      top: -20px;
      z-index: 30000;
    }

    .diskDesc {
      width: 40px;
    }
    #taskNum {
      /*overflow:hidden;*/
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      justify-content:space-between;
      .running, .completed{
        height: 128px;
        font-size: 18px;
        line-height: 128px;
        border-right: 1px solid #F3F3F3;
      }
      .serverDesc {
        height: 80px;
      }
    }
    #taskList {
      background:#fff;
      min-height: 300px;
      position: relative;
      .oparator {
        position: absolute;
        top: 218px;
        left: 380px;
        z-index: 30000;
        img {
          width: 100px;
        }

      }
      .nostartbg {
        color: #A6AFBF;
      }
      .runningbg {
        color: #5C8CE5;
        font-size: 20px;
      }
      .errorbg {
        color: #F74A4A;
      }
      .okbg {
        color: #5CE58A;
      }

      border: 1px solid #F3F3F3;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      .bgc {
        background: #F5F8FC;
        border: 1px solid #ECECEC;
        border-right: 0;
        /*height: 40px;*/
        /*line-height: 40px;*/
      }
      .bgc1 {
        background: #F5F8FC;
      }
      .tkname, .lcName {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // width: 190px;
      }
      .tkname {
        font-size: 16px;
        color: #333;
        text-align: left;
        margin-top: 2px;
        margin-bottom: 3px;
      }
      .lcname {
        font-size: 12px;
        color: #666;
        text-align: left;
      }
      .pos {
        font-size: 28px;
        position: absolute;
        top: 20px;
        left: 15px;
      }
      .taskName, .startTime, .status, .operat {
        height: 50px;
      }
      .startTime, .status, .operat {
        line-height: 50px;
      }
      .nostart {
        color: #C1C6D1;
      }
      .pagination {
        text-align: left;
      }

      .searchPos {
        position: relative;
        right: -238px;
        z-index: 100;
        font-size: 20px;
        color: #999;
        top: 5px;
        cursor: pointer;
      }

    }
    .isApproval{
      pointer-events: none;
      background: #ccc;
      border-color: #ccc;
    }
  }
.table {
    border: 1px solid #f0f1f5;
    margin: 20px;
}

</style>
