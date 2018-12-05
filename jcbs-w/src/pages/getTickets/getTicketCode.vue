<template>
  <div class="page">
    <div class="title" v-show="false">订单详情</div>
    <!--<div class="swipe">-->
    <!--<mt-swipe :auto="2000">-->
    <!--<mt-swipe-item v-for="item in imgItems" :key="item.id">-->
    <!--<a href="javascript:" rel="external nofollow">-->
    <!--<img :src='item' class="img"/>-->
    <!--<span class="desc"></span>-->
    <!--</a>-->
    <!--</mt-swipe-item>-->
    <!--</mt-swipe>-->
    <!--</div>-->
    <div class="header"><i slot="left" class="iconfont tip">&#xe618;</i><span slot="right">{{linePrompt}}{{lineAnnouncement}}</span></div>
    <div class="tipBar clearfix"><img class="left" src="../../assets/searchResult/startStation.png" alt="">
      <div class="letInfo left">
        <p>{{ startStation }}<i class="arrow"></i>{{ endStation}}</p>
        <div class="clearfix">
          <div class="provinceTip left">
            <span class="province">{{busLine}}</span><span class="time">{{fullTime}}</span>
          </div>
        </div>
      </div>
      <div class="codeStatus">
        <span>{{status}}</span>
      </div>
    </div>
    <div class="CodeInfo">
      <p class="price"><span>￥</span>{{unitPrice}}</p>
      <div class="codeTip is-clearfix">请在乘车点<span class="blue">扫码</span>领取车票
        <p class="dashline"><span class="left semicircle"></span><span class="right semicircle"></span></p>
      </div>
      <div id="qrcode"></div>
      <div class="codeValue"><span>取票码</span>{{ticketNo}}</div>
    </div>

    <div class="ticketDetails">
      <p class="refund" @click="popupVisible = true">申请退款</p>
      <div><label>订单号：</label><span>{{trxExternalNo}}</span></div>
      <div><label>购票时间：</label><span>{{trxCompletedTime}}</span></div>
      <div><label>数量：</label><span>{{quantity}}张</span></div>
      <div><label>支付方式：</label><span>微信</span></div>
      <div><label>实付金额：</label><span>￥{{ amount}}</span></div>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade" class="mint-popup-1">
      <h1>确认申请退款?</h1>
      <ul>
        <li style="text-align: center">
          <mt-button @click="popupVisible = false" size="small">取消</mt-button>
          <span class="separator">|</span>
          <mt-button @click="refund" size="small" style="margin-left: -2px;">确定</mt-button>
        </li>
      </ul>
    </mt-popup>
  </div>
</template>
<script>
  import {queryTicket, refund, randomString, payQuery} from '../../main'
  import {Toast,Indicator} from 'mint-ui'
  import 'mint-ui/lib/style.css'
  import QRCode from 'qrcodejs2'

  export default {
    name: 'getTicketCode',
    data() {
      return {
        selected: '2',
        imgItems: [],
//        tip: "温馨提示：为了不耽误您的出行，站点发车时间仅供参考，具体发车时间请问询现场工作人员，并请您提前到发车地点等候乘车。,"
        popupVisible: false,
        fullTicketPrice: '',
        fullTime: "",
        ticketNo: this.$route.query.ticketNo,
        trxRequestNo: this.$route.query.trxRequestNo,
        startStation: "",
        endStation: "",
        status: "",
        amount: "",
        trxCompletedTime: "",
        quantity: "",
        unitPrice: "",
        busLine: "",
        qrCode: "",
        trxExternalNo: "",
        linePrompt:"",
        lineAnnouncement:""
      }
    },
    created() {
    },
    mounted() {
//      两个入口
      if (this.$route.query.payRequestNo) {
        this.payQueryFunc(this.$route.query.payRequestNo);
      } else {
        let self = this;
        setTimeout(function () {
          var params = {
            ticketNo: self.$route.query.ticketNo,
            trxExternalNo: self.$route.query.trxExternalNo,
          }
          queryTicket(params).then(res => {
            self.startStation = res.startStation;
            self.endStation = res.endStation;
            self.status = res.status;
            self.amount = res.amount;
            self.trxCompletedTime = res.trxCompletedTime;
            self.quantity = res.quantity;
            self.unitPrice = res.unitPrice;
            self.trxExternalNo = res.trxExternalNo;
            self.busLine = res.busLine;
            self.linePrompt = res.linePrompt;
            self.lineAnnouncement = res.lineAnnouncement;
            self.qrCode = res.qrCode;
            self.qrcode(self.qrCode)
          });
        }, 5);
      }
    },
    methods: {
      qrcode(qrcodeText) {
        let qrcode = new QRCode('qrcode', {
          width: 186,
          height: 186, // 高度
          text: qrcodeText // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
      },
      refund() {

        var self = this;
        self.popupVisible = false;
        if(this.status == "已退款"){
          Toast("已退票，请返回");
          return
        };
        Indicator.open({
          text: '退款中...',
          spinnerType: 'fading-circle'
        });
        var params = {
          requestNo: randomString(3),
          ticketNo: self.$route.query.ticketNo || self.ticketNo,
          trxExternalNo: self.$route.query.trxExternalNo || self.trxExternalNo,
        }
        refund(params).then(res => {
          if (res === true) {
            this.$router.push({path: '/myOrderCompletedList'});
          } else {
            this.$router.push({path: '/error'});
//            Indicator.open({
//              text: '操作有误',
//            });
          }
          Indicator.close();
        });
      },
      payQueryFunc(payRequestNo) {
        var self = this;
        setTimeout(function () {
          var params = {
            requestNo: payRequestNo,
          }
          payQuery(params).then(res => {
            if (res.payStatus == "SUCCESS") {
              self.startStation = res.ticket.startStation;
              self.endStation = res.ticket.endStation;
              self.status = res.ticket.status;
              self.amount = res.ticket.amount;
              self.trxCompletedTime = res.ticket.trxCompletedTime;
              self.quantity = res.ticket.quantity;
              self.unitPrice = res.ticket.unitPrice;
              self.trxExternalNo = res.ticket.trxExternalNo;
              self.busLine = res.ticket.busLine;
              self.linePrompt = res.ticket.linePrompt;
              self.lineAnnouncement = res.ticket.lineAnnouncement;
              self.qrCode = res.ticket.qrCode;
              self.ticketNo = res.ticket.ticketNo;
              self.qrcode(self.qrCode)
              return "SUCCESS";
            }
            return self.payQueryFunc(self.$route.query.payRequestNo);
          });
        }, 50);
      }
    },
    components: {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /*@import '../../../static/css/common.scss';*/
  li {
    display: block;
  }

  .header {
    display: flex;
    background-color: rgba(253, 187, 23, 0.1);
    box-shadow: 0px 1px 0px 0px rgba(253, 187, 23, 0.5);
    align-items: center;
  }

  .header i {
    width: 54px;
    align-self: flex-start;
  }

  .header span {
    text-align: left;
    font-size: 14px;
  }

  /*##########*/
  .mint-popup-1 {
    width: 298px;
    padding-bottom: 5px;
  }

  .mint-popup-1 h1 {
    line-height: 110px;
  }

  .mint-button--small {
    border-top: 1px solid #eee;
    border-radius: 0;
    padding: 0;
    width: 43%;
  }

  .mint-button--default {
    box-shadow: 0 0 0 #fff;
    background: #fff;
    color: #03AFFF;

  }

  .separator {
    color: #efefef;
    line-height: 1.2;
    display: inline-block;
  }

  .tipBar {
    /*display: flex;*/
    text-align: left;
    padding: 0.7rem 0.61rem 0.61rem 0.7rem;
    background: #fff;
    margin-bottom: 10px;

  }

  .tipBar img {
    border: none;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    margin-right: 5px;
    margin-top: 0.2rem;
  }

  .stationIcon {
    width: 3.6vw;
    vertical-align: middle;
    margin-top: 3.5%;
    margin-right: 1%;
  }

  .arrow {
    width: 0.87rem;
    height: 0.87rem;
    display: inline-block;
    background: url('../../../src/assets/searchResult/arrowSingle.png') no-repeat center center;
    background-size: contain;
    vertical-align: middle;
    margin: -0.2rem 0.2rem 0 0.2rem;
  }

  .letInfo {
    display: inline-block;

  }

  .letInfo p {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .province {
    background-color: #ffca14;
    color: rgba(255, 255, 255, 1);
    font-size: 0.8rem;
    font-family: PingFangSC-Medium;
    padding: 1% 2%;
    margin-right: 2%;
  }

  .time {
    font-size: 0.8rem;
    font-family: PingFangSC-Medium;
    margin-top: -0.5rem;
  }

  .provinceTip {
    width: 100%;
  }

  .codeStatus {
    float: right;
    color: #FDBB17;
  }

  .CodeInfo {
    width: 92%;
    height: 373px;
    background: #fff;
    text-align: center;
    margin: 0 auto;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 11px 1px #eeeeee;
  }

  .CodeInfo .price {
    font-size: 36px;
    font-weight: 700;
    line-height: 79px;

  }

  .CodeInfo .price span {
    font-size: 1.7rem;
  }

  .CodeInfo .codeTip {
    width: 100%;
    font-size: 14px;
    margin-top: -10px;
    position: relative;

  }

  .CodeInfo .codeTip .dashline {
    width: 90%;
    position: absolute;
    border-bottom: 1px dashed #D8D8D8;
    left: 5%;
    top: 31px;
  }

  .CodeInfo .codeTip .semicircle {
    background: #f8f8f8;
    display: block;
    position: absolute;
    border-radius: 13px;
    width: 26px;
    height: 26px;
  }

  .CodeInfo .codeTip .left {
    top: -13px;
    left: -31px;
  }

  .CodeInfo .codeTip .right {
    top: -13px;
    right: -31px;
  }

  .CodeInfo #qrcode {
    width: 186px;
    margin: 25px auto 15px
  }

  .CodeInfo #qrcode img {
    display: inline !important;
    height: 186px;

  }

  .CodeInfo .codeValue span {
    margin-left: -4rem;
    margin-right: 24px;
  }

  .ticketDetails {
    width: 92%;
    margin: 0 auto;
    text-align: left;
    font-size: 15px;
    margin-top: 20px;
    position: relative;
  }

  .ticketDetails .refund {
    -webkit-appearance: none;
    width: 62px;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    border-radius: 2px;
    text-align: center;
    background: #fff;
    color: #03AFFF;
    border: 0.5px solid rgba(3, 175, 255, 1);
    position: absolute;
    right: 0;

  }

  /* i */
  @font-face {
    font-family: 'iconfont';
    src: url('../../../static/font/tip/iconfont.eot');
    src: url('../../../static/font/tip/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../../static/font/tip/iconfont.woff') format('woff'),
    url('../../../static/font/tip/iconfont.ttf') format('truetype'),
    url('../../../static/font/tip/iconfont.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .tip {
    color: #FCBB19;
  }
  .blue {
    color:#03AFFF;
  }
  /*##########*/
</style>
