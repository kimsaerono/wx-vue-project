<template>
  <div class="page-cell">
    <div class="title" v-show="false">意见反馈</div>
    <mt-field label="意见与建议" @blur="blur()" @input="input()" @propertychange="propertychange()" @change="change()" v-model="proposal" class="weui-textarea proposal" type="textarea" maxlength="200" rows="5"></mt-field>
    <div class="weui-textarea-counter"><span class="remark">{{len}}</span>/200</div>
    <mt-field label="联系电话" v-model="contact" class="weui-input contact" placeholder="便于我们与您联系" type="tel" maxlength="11"></mt-field>
    <mt-button v-bind:disabled = "disabled" @click.native="touch" size="large" class="submitBtn" type="primary">提交</mt-button>
  </div>
</template>
<script>
  import {submitAdvise} from '../../main'
//  import { Toast } from '../../index'
  export default {
    data () {
      return {
        proposal:"",
        contact:"",
        disabled:true,
        len:0
      }
    },
    methods:{
      _validateContact(){
        let state = true;
        let tel = this.contact,
          len = tel.length,
          reg = /^(([0-9]+)([-]*))+$/;
        if((len>0&&len<7) || (tel!="" && !reg.test(tel))){
          state = false;
//          Toast('联系电话格式有误');
        }else{
          state = true;
        }
        return state
      },
      _validate(){
        let state = true;
        if(this.proposal == ""){
          if(this.disabled == true){
            this.disabled = false;
          }
          state = false;
          return false
        }else if(this._validateContact()){
//                if(!(btn.hasClass("weui-btn_disabled"))){
//                    btn.addClass("weui-btn_disabled");
//                }
          this.disabled = true;
          state = false;
        }else{
          this.disabled = false;
          state = true;
        }
        return state
      },
      input(){
        let len = this.proposal.length;
        this.len = len;
      },
      propertychange(){

      },
      change(){
        if(!this._validate()){
          return false
        }
      },
      blur(){
        if(!this._validate()){
          return false
        }
      },
      touch(){
        if(this.disabled == false){
          this.disabled = true;
        }
        if(!this._validate(this)){
          return false
        }else{
          let param = {
            proposal:this.proposal,
            contact:this.contact
          }
          submitAdvise(param).then(res=>{
            if(res.state = 2){
//              Toast(res.message);
            }else{
//              Toast(res.message);
              setTimeout(function () {
                location.reload();
              }, 2000);
            }
          })
        }
      }
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
  div.mint-cell-wrapper{
    display: block;
  }
  .weui-textarea-counter{
    text-align: right;
    margin-right:15px;
  }
</style>
