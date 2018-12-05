# wx-vue-project
基于vue的微信公众号项目,本项目基于vue(2.5.2)-webpack(3.6.0)和mint-ui实现的微信公众号单页面项目，利用脚手架搭起的项目除了默认生成的一些配置之外
，配置了热部署，打包位置和生成规则。
有这么几个功能点：1绘制svg矢量图（矢量图的缩放，平移，节点的点击事件等）[cityBus.vue、searchResult.vue]
                2mint-ui的search、模糊搜索，中英文匹配和picker的二级联动和点击事件 [searchList.vue]
                3基于微信的导航功能openLocation,获取当前位置getLocation及支付功能getBrandWCPayRequest [searchList.vue、cityBus.vue、surePurchase.vue]
                4列表渲染引用了计算属性按时间排序 [myOrder]
                5axios请求数据遇到数据不能渲染时候如果本页面是路由跳转的话的beforeRouteEnter的应用 [beforeRouteEnter.vue]
                6qrcode二维码的生成 [getTicketCode.vue]
                7mint-ui的Indicator、Toast的应用 [getTicketCode.vue]
                8tab页面锚点的定位 [myOrder.vue]
                9css预加载sass的使用
