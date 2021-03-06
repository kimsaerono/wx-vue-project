// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import apiConfig from '../config/api.config'

//import资源
// import Vue from 'vue'
// import axios from 'axios';
import Mint from 'mint-ui';
//cdn:
const Vue = require('vue')
const axios = require('axios')
// const Mint = require('mint-ui')
  
import App from './App.vue'
import router from './router'
import Mint from 'mint-ui';
import { MessageBox } from 'mint-ui';
// axios.defaults.baseURL = apiConfig.baseUrl
Vue.use(Mint);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// var app = new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app');
function _fetch(options) {
  //resolve ：当Prmise对象状态从未成功变为成功的时候   可以通过他的异步操怍的结果，作为参数传递出去。
  //reject  ：当Promise对象状态从未完成变为失败   在异步操作失败时调用，并将异步操作的错误，作为参数传递出去
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // baseURL: '', //通过env环境变量切换api地址,
    });
    instance(options).then(response => {
      const res = response.data;
      if (res.state === 2) {
        resolve(res.data);
      } else {
        this.$router.push({path:'/error'})
        // if (res.resultCode == 401) {
        //     app.$router.push('/Login');
        // } else {
        // MessageBox.error(response.message)
        // }
      }
    }).catch(error => {
    });
  });
}



export const randomString  = len =>  {
  len = len || 16;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var requestNo = '';
  for (var i = 0; i < len; i++) {
    requestNo += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  var timestamp = new Date().getTime();
  requestNo += timestamp;
  return requestNo;
}
//api   发布版本
//''  开发版本
let api = '/jcbs';
// 直销商户基本信息
export const getUserInfo = params => {
  return _fetch({url: api+'/public/member/get', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};
export const submitAdvise = params => {
  return _fetch({url: api+'/public/proposal/add', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};
//获取市内巴士票价
export const queryCityTicketPrice = params => {
  return _fetch({url: api+'/public/bus/queryCityTicketPrice', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};
//市内巴士定位离我最近
export const getNearStation = params => {
  return _fetch({url: api+'/public/bus/getNearStation', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};
//获取摆渡车明细
export const getShuttleDetail = params => {
  return _fetch({url: api+'/public/bus/getShuttleDetail', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};
//获取省际巴士概览
export const queryProvincialOverview = params => {
  return _fetch({url: api+'/public/bus/queryProvincialOverview', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};
//获取省际巴士明细
export const getLineDetail = params => {
  return _fetch({url: api+'/public/bus/getLineDetail', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};
//获取JSToken
export const getJSToken = params => {
  return _fetch({url: api+'/wx/getJSToken', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};
//创建业务订单
export const createTrxOrder = params => {
  return _fetch({url: api+'/public/ticket/createTrxOrder', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};

//确认支付
export const pay = params => {
  return _fetch({url: api+'/public/ticket/pay', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};
//支付结果查询
export const payQuery = params => {
  return _fetch({url: api+'/public/ticket/payQuery', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};
//查询单个票据
export const queryTicket = params => {
  return _fetch({url: api+'/public/ticket/queryTicket', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};

//查询票据列表
export const queryTicketList = params => {
  return _fetch({url: api+'/public/ticket/queryTicketList', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};

//申请退款
export const refund = params => {
  return _fetch({url: api+'/public/ticket/refund', method: 'post',params : params,contentType:'application/x-www-form-urlencoded'}).then(res => res);
};




