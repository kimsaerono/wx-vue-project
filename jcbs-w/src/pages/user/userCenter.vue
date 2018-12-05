<template>
  <div class="page-cell">
    <div class="title" v-show="false">用户中心</div>
    <mt-cell title="头像">
      <img class="headImg" :src="headImg" alt="">
    </mt-cell>
    <mt-cell title="昵称" v-model="nickname"></mt-cell>
    <mt-cell title="性别" v-model="sex"></mt-cell>
    <mt-cell title="积分" v-model="integral"></mt-cell>
  </div>
</template>
<script>
  import {getUserInfo} from '../../main'
export default {
  data () {
    return {
      headImg:require("../../assets/defaultHead.jpg"),
      nickname:"",
      sex:"",
      integral:""
    }
  },
  created(){
    getUserInfo({}).then(res=>{
      let data = res.data;
      this.headImg = data.headImgUrl;
      this.nickname = data.nickname;
      this.sex = data.sex;
      this.integral = data.integral;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.headImg {
  width: 60px;
  background-size: contain;
}
.mint-cell-wrapper{
  /*display: flex;*/
}
.mint-cell{
  padding:0 5px;
}
.mint-cell-title{
  float: left;
}
.mint-cell-value{
  float: right;
  vertical-align: middle;
  margin-top: 5px;
}
</style>
