<template>
  <div class="myOrderWaitList">
    <div class="title" v-show="false">我的订单</div>
    <mt-navbar class="page-part" v-if="showBar" v-model="selected">
      <mt-tab-item id="1">待取票</mt-tab-item>
      <mt-tab-item id="2">已完成</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <!--swipeable-->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="" id="container">
          <div v-if="INITArr.length != 0" v-for="(item ,index) in newINITArr" class="myOrderItem">
            <div class="ticketInfo">
              <p class="lineNo">{{ INITArr[index].busLine }}</p>
              <input type="hidden">
              <h1 class="fromTo">{{ INITArr[index].startStation }}<i class="arrow"></i>{{ INITArr[index].endStation}}</h1>
              <p><span>创建时间：</span>{{ INITArr[index].trxCompletedTime}}</p>
              <p><span>数量：</span>{{ INITArr[index].quantity }}张</p>
              <p><span>合计：</span>￥{{ INITArr[index].amount }}</p>
            </div>
            <div class="getTicketPart">
              <p class="ticketStatus">待出票</p>
              <input type="button" class="getTicketCode" :data-ticketNo="INITArr[index].ticketNo" :data-trxExternalNo="INITArr[index].trxExternalNo" @click="getTicketCode($event)" value="取票码取票">
            </div>
          </div>
          <div  v-if="INITArr.length == 0">
            <div class="noOrderList">暂无订单记录</div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <my-order-completed-list></my-order-completed-list>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import {queryTicketList,queryTicket} from '../../main'
  import myOrderCompletedList from "./myOrderCompletedList"
  //  import { Toast,Indicator } from 'mint-ui';
  export default {
    name: 'myOrderWaitList',
    data () {
      return {
        showBar:true,
        INITArr:[],
        selected: "1",
        direction:1,
        ticketNo:"",
        page:1
      }
    },
    components:{
      myOrderCompletedList,
    },
    beforeRouteEnter (to, from, next){
      var self = this;
      next(vm => {
        // 通过 `vm` 访问组件实例,将值传入oldUrl
        vm.oldUrl = from.name
        vm.selected = from.query.selectedPage || "1";
      })
    },
    mounted(){
      this.scrollBottom();
      var self = this;
      this.$nextTick(()=>{
        // 验证是否获取到了上页的url
        /* eslint-disable no-console */
//        if(this.oldUrl && this.oldUrl == 'interprovincialBusDetails'){
//          this.selected = '2';
//        }else{
//          this.selected = '1';
//        }
      })
      var params = {
        status:"INIT",
        page:this.page++,
        userOpenid: 'oYCN5wczp0sc-KGcuMRhMdsywZko',
      };
      setTimeout(function(){
        queryTicketList(params).then(res => {
          self.INITArr = res;
        });
      },5)
    },
    created(){
//    setTimeout(function(){
//
//    },10)
    },
    methods:{
      getTicketCode(event){
        this.$router.push({path:'/getTicketCode',query:{ticketNo:event.target.getAttribute("data-ticketNo"),trxExternalNo:event.target.getAttribute("data-trxExternalNo"),selectedPage:"1"}});
      },
      scrollBottom(){
        var self = this;
        $(window).scroll(function(){
          var scrollTop = $(this).scrollTop();
          var scrollHeight = $(document).height();
          var windowHeight = $(this).height();
          if(scrollTop + windowHeight == scrollHeight){
            var params = {
              status:"INIT",
              page:self.page++,
            };
            queryTicketList(params).then(res => {
              if(!res.length){
                self.page--;
                return false
              }else{
                self.INITArr = self.INITArr.concat(res);
              }
            });
          }
        });
      }
    },
    computed:{
      newINITArr:function(){
        return this.COMPLETEDArr.sort((a,b)=>{
          let atime = new Date(a.completedTime.replace(/-/g,'/')).getTime();
          let btime = new Date(b.completedTime.replace(/-/g,'/')).getTime();
          return btime - atime;
        });
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../../static/css/common.scss';
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .mint-navbar .mint-tab-item{
    padding:0;
    height:40px;
    line-height: 40px;
  }
  .mint-tab-item .mint-tab-item-label{
    display: inline-block;
    height: 100%;
  }
  .mint-tab-container {
    top:0;
  }
  #container {
    width:100%;
    .myOrderItem {
      display: flex;
      width:100%;
      height:112px;
      background:#fff;
      margin-top: 10px;
      padding:6px 15px 8px 15px;
      justify-content: flex-start;
      div{
        height:100%;
        justify-content: flex-start;
        align-items: center;
      }
      .ticketInfo {
        font-size: 12px;
        text-align: left;
        width:70%;
      }
      .getTicketPart {
        width:30%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
      }
    }
  }
  .arrow{
    width:0.87rem;
    height:0.87rem;
    display: inline-block;
    background: url('../../../src/assets/searchResult/arrowSingle.png')no-repeat center center;
    background-size: contain;
    vertical-align: middle;
    margin:-0.2rem 0.2rem 0 0.2rem;
  }
  .lineNo {
    font-size:13px;
    color:#FDBB17;
  }
  .fromTo {
    line-height: 28px;
    font-size:15px;
    font-weight: 500;
  }
  .ticketStatus {
    font-size:13px;
  }
  .getTicketCode {
    height: 24px;
    line-height:20px;
    border-radius: 2px;
    text-align: center;
    background: #fff;
    color: #03AFFF;
    border: 0.5px solid rgba(3, 175, 255, 1);
  }

  .noOrderList {
    line-height: 124px;
    text-align: center;
    color: #bdbdbd;
  }
</style>

