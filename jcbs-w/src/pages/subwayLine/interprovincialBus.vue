<template>
  <div class="page">
    <div class="title" v-show="false">线路查询</div>
      <div class="swipe">
        <!--<mt-swipe :auto="2000">-->
          <!--<mt-swipe-item v-for="item in imgItems" :key="item.id">-->
            <!--<a href="javascript:;" rel="external nofollow">-->
              <!--<img :src=item class="img"/>-->
              <!--<span class="desc"></span>-->
            <!--</a>-->
          <!--</mt-swipe-item>-->
        <!--</mt-swipe>-->
        <img :src="interprovincialBusImg" class="ferryCarImg">
      </div>
      <div class="tipBar">
        <div class="clearfix">
          <img class="left" src="../../assets/searchResult/light.png" alt="">
          <p class="left">温馨提示：{{ tip }}</p>
        </div>
      </div>
      <div class="placeBox">
        <div class="contain">
          <div v-for="(item, index) in placeItems" :key="item.id" track-by="$index"
                class="placeInner">
            <img :src="item.thumbnailAttach" alt="">
            <router-link :to="{path:'interprovincialBusDetails', query:{id:item.associateId}}">
              <p class="directionName">{{ item.directionName }}</p><br/>
              <p class="price"><span>{{ item.fullTicketPrice }}</span>元/人</p>
            </router-link>
          </div>
          <div class="placeInner more"><p>更多线路</p><p>敬请期待</p></div>
        </div>
      </div>
      <footer>咨询热线：<a :href="'tel:' + phoneNum" class="phoneNo">{{phoneNum}}</a></footer>
  </div>
</template>
<script>
  import {queryProvincialOverview} from '../../main'
  import {Swipe, SwipeItem} from 'mint-ui'
  import 'mint-ui/lib/style.css'

  export default {
    name: 'interprovincialBus',
    data() {
      return {
        imgItems: [],
        tip: "为了不耽误您的出行，站点发车时间仅供参考，具体发车时间请问询现场工作人员，并请您提前到发车地点等候乘车。",
        placeItems: [],
        phoneNum: "",
        interprovincialBusImg:require("../../../src/assets/ferryCar/interprovincialBusImg.png")
      }
    },
    mounted(){
      var self = this;
      setTimeout(function(){
        queryProvincialOverview({}).then(res=>{
          self.imgItems = res.attachmentList;
          self.tip = res.announcement;
          self.phoneNum = res.contactInfo;
          self.placeItems = res.provincialList;
        })
      },5)
    },
    methods: {
//      changeTab(event) {
//        if (event.target.classList.contains("cityBus")) {
//          this.$router.push("cityBus")
//        } else if (event.target.classList.contains("interprovincialBus")) {
//          this.$router.push("interprovincialBus")
//        } else if (event.target.classList.contains("ferryCar")) {
//          this.$router.push("ferryCar")
//        }
//      },
      getTip() {
        this.$axios.post("/jcbs/public/member/get").then(function (res) {
          this.tip = res.data.state

          console.log(this.tip)
        }.bind(this));
      },
    },
    components: {
      Swipe,
      SwipeItem
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../../static/css/common.scss';
  /*##########*/

  .swipe {
    img {
      max-width: 100%;
      max-height:100%;
    }
    .mint-swipe {
      width: 100%;
      height: 200px;
    }
    .desc {
      display: none;
      font-weight: 600;
      opacity: .9;
      padding: 5px;
      height: 20px;
      line-height: 20px;
      width: 100%;
      color: #fff;
      background-color: gray;
      position: absolute;
      bottom: 0;
    }
  }


  .tipBar {
    display: flex;
    text-align: left;
    /*padding: 10px 15px 13px 15px;*/
    background: #fff;
    margin-bottom: 10px;
    div{
      width:92%;
      margin:0.5rem auto;
      img {
        width: 3.3%;
        display: inline-block;
        margin-right: 5px;
        margin-bottom:-0.5rem;
        margin-top: 0.2rem;
      }
      p{
        display: inline-block;
        width:95%;
        font-size:12px;
        color: #999;
      }
    }
  }


.placeBox {
    background: #fff;
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    /*width: 22rem;*/
    height: auto;
    flex-wrap: wrap;
   div.contain{
     width: 96%;
     margin:auto;
     padding-left:2%;
    }
  }

  .placeInner {
    color: #fff;
    padding-top: 17px;
    font-size: 0;
    width: 31%;
    height: 5.5rem;
    border: 1px solid #eee;
    margin-top: 10px;
    margin-left: 0!important;
    margin-right:2%;
    background-size: contain;
    float:left;
    position: relative;
    img{
      position:absolute;
      left:0px;
      top:0px;
      z-index:0;
      width:100%!important;
      height:100%!important;
    }
    a {
      font-size: 17px;
      color: #fff;
      display: inline-block;
      position: relative;
    }
    p {
      font-size: 13px;
      margin-top: 0px;
      display: inline-block;
    }
    p.price{
      background-color: rgba(0,0,0,0.3);
    }
    .directionName {
      font-size: 17px;
      font-weight: 600;
    }
  }
  .more {
    background: #D8D8D8;
    p{
      font-size:15px;
    }
  }

  footer {
    font-size: 15px;
    height: 74px;
    line-height: 74px;
    background: #fff;
  }

  @media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
    .placeInner {
      width: 90px;
      height: 67px;
    }
  }

  /*6*/
  @media (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
  }

  /*6+*/
  @media (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
    .placeInner {
      margin-left: 22px;
    }
  }

  /*魅族*/
  @media only screen and (min-device-width: 1080px) and (-webkit-min-device-pixel-ratio: 2.5) {
  }

  /*mate7*/
  @media only screen and (min-device-width: 1080px) and (-webkit-min-device-pixel-ratio: 3) {
  }

  /*4 4s*/
  @media only screen and (device-height: 480px) and (-webkit-device-pixel-ratio: 2) {
  }

  @media screen and (min-width: 320px) and (max-width: 480px) {
  }

  /* 平板之类的宽度 1024 以下设备 */
  @media only screen and (min-width: 321px) and (max-width: 1024px) {
    body {
      background: blue;
    }
  }

  /* PC客户端或大屏幕设备: 1028px 至更大 */
  @media only screen and (min-width: 1029px) {

  }

  /* 竖屏 */
  @media screen and (orientation: portrait) and (max-width: 720px) {
  }

  /* 横屏 */
  @media screen and (orientation: landscape) {
  }
.phoneNo{
  color:#03AFFF;
}
  /*##########*/


</style>
