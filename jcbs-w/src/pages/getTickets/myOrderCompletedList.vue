<template>
  <div class="myOrderCompletedList">
    <div class="" id="container">
      <div  v-if="COMPLETEDArr.length != 0" v-for="(item ,index) in newCOMPLETEDArr" class="myOrderItem">
        <div class="ticketInfo">
          <p class="lineNo">{{ COMPLETEDArr[index].busLine }}</p>
          <h1 class="fromTo">{{ COMPLETEDArr[index].startStation }}<i class="arrow"></i>{{ COMPLETEDArr[index].endStation}}</h1>
          <p><span>时间：</span>{{ (COMPLETEDArr[index].completedTime)}}</p>
          <p><span>数量：</span>{{ COMPLETEDArr[index].quantity }}张</p>
          <p><span>合计：</span>￥{{ COMPLETEDArr[index].amount }}</p>
        </div>
        <div class="getTicketPart">
          <p class="ticketStatus">{{COMPLETEDArr[index].ticketStatus}}</p>
          <input type="button" class="getTicketCode" @click="getTicketCode($event)" :data-ticketNo="COMPLETEDArr[index].ticketNo" :data-trxExternalNo="COMPLETEDArr[index].trxExternalNo"  value="查看详情">
        </div>
      </div>
      <div  v-if="COMPLETEDArr.length == 0">
        <div class="noOrderList">暂无订单记录</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryTicketList} from '../../main'
  import { Toast,Indicator } from 'mint-ui';
  export default {
    name: 'myOrderCompletedList',
    data () {
      return {
        COMPLETEDArr:[],
        selected: '2',
        direction:1,
        ticketNo :"12",
        ticketStatus:"",
        page:1,
      }
    },
    components:{
    },
    beforeRouteEnter (to, from, next){
      next(vm => {
        // 通过 `vm` 访问组件实例,将值传入oldUrl
        vm.oldUrl = from.name
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
        status:"COMPLETED",
        page:this.page++,
      };
      setTimeout(function(){
        queryTicketList(params).then(res => {
          self.COMPLETEDArr = res
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
        this.$router.push({path:'/gotTicketCode',query:{ticketNo:event.target.getAttribute("data-ticketNo"),trxExternalNo:event.target.getAttribute("data-trxExternalNo"),selectedPage:"2"}});
      },
      scrollBottom(){
        var self = this;
        $(window).scroll(function(){
          var scrollTop = $(this).scrollTop();
          var scrollHeight = $(document).height();
          var windowHeight = $(this).height();
          if(scrollTop + windowHeight == scrollHeight){
            setTimeout(function () {
              var params = {
                status:"COMPLETED",
                page:self.page++,
              };
              queryTicketList(params).then(res => {
                if(!res.length){
                  self.page--;
                  return false;
                }else{
                  self.COMPLETEDArr = self.COMPLETEDArr.concat(res);
                }
              });
            },1000)
          }
        });
      },
    },
    computed:{
      newCOMPLETEDArr:function(){
        return this.COMPLETEDArr.sort((a,b)=>{
          let atime = new Date(a.completedTime.replace(/-/g,'/')).getTime();
          let btime = new Date(b.completedTime.replace(/-/g,'/')).getTime();
          return btime - atime;
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../../static/css/common';
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
    background: url('../../assets/searchResult/arrowSingle.png')no-repeat center center;
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
