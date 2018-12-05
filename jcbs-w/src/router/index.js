import Vue from 'vue'
import Router from 'vue-router'

import userCenter from '@/pages/user/userCenter'
import advise from '@/pages/user/advise'
import cityBus from '@/pages/subwayLine/cityBus'
import searchResult from '@/pages/subwayLine/searchResult'
// 省内巴士
import interprovincialBus from '@/pages/subwayLine/interprovincialBus'
//省内巴士详情
import interprovincialBusDetails from '@/pages/subwayLine/interprovincialBusDetails'
//摆渡车
import ferryCar from '@/pages/subwayLine/ferryCar'
//升级
import error from '@/pages/error/error'
//搜索列表+搜索中
import searchList from '@/pages/subwayLine/searchList'
//我的订单
import myOrder from '@/pages/getTickets/myOrder'
//我的订单已完成
import myOrderCompletedList from '@/pages/getTickets/myOrderCompletedList'
//订单详情二维码
import getTicketCode from '@/pages/getTickets/getTicketCode'
//订单详情(已取票)二维码
import gotTicketCode from '@/pages/getTickets/gotTicketCode'
//确认购买
import surePurchase from '@/pages/buyTickets/surePurchase'
//购买去机场
import toAirPurchase from '@/pages/buyTickets/toAir_purchase'
//我的订单待取票
import myOrderWaitList from '@/pages/myOrder/myOrderWaitList'


//以下路由懒加载
// const userCenter = resolve => require(['@/pages/user/userCenter'], resolve);
// const advise = resolve => require(['@/pages/user/advise'], resolve);
// const cityBus = resolve => require(['@/pages/subwayLine/cityBus'], resolve);
// const searchResult = resolve => require(['@/pages/subwayLine/searchResult'], resolve);
// const interprovincialBus = resolve => require(['@/pages/subwayLine/interprovincialBus'], resolve);
// const interprovincialBusDetails = resolve => require(['@/pages/subwayLine/interprovincialBusDetails'], resolve);
// const ferryCar = resolve => require(['@/pages/subwayLine/ferryCar'], resolve);
// const error = resolve => require(['@/pages/error/error'], resolve);
// const searchList = resolve => require(['@/pages/subwayLine/searchList'], resolve);



import { Cell , Toast , Navbar, TabItem,Popup  } from 'mint-ui';
Vue.component(Cell.name, Cell);
Vue.component(Toast.name, Toast);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Popup.name, Popup);
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base:'/jcbs/public/index.html/',
  routes: [
    {
      path: '/',
      name: 'cityBus',
      component: cityBus
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/advise',
      name: 'advise',
      component: advise
    },
    {
      path: '/cityBus',
      name: 'cityBus',
      component: cityBus
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: searchResult
    },
    {
      path: '/interprovincialBus',
      name: 'interprovincialBus',
      component: interprovincialBus
    },
    {
      path: '/interprovincialBusDetails',
      name: 'interprovincialBusDetails',
      component: interprovincialBusDetails
    },
    {
      path: '/ferryCar',
      name: 'ferryCar',
      component: ferryCar
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: searchList
    }
    ,
    {
      path: '/myOrderWaitList',
      name: 'myOrderWaitList',
      component: myOrderWaitList
    }
    ,
    {
      path: '/myOrderCompletedList',
      name: 'myOrderCompletedList',
      component: myOrderCompletedList
    }
    ,
    {
      path: '/getTicketCode',
      name: 'getTicketCode',
      component: getTicketCode
    }
    ,
    {
      path: '/gotTicketCode',
      name: 'gotTicketCode',
      component: gotTicketCode
    }
    ,{
      path: '/surePurchase',
      name: 'surePurchase',
      component: surePurchase
    }
    ,{
      path: '/toAirPurchase',
      name: 'toAirPurchase',
      component: toAirPurchase
    }
    ,{
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    }
    ,
    {
      path: '/error',
      name: 'error',
      component: error
    }
    ,
    {
      path: '*',
      name: 'error',
      component: error
    }
  ]
})
