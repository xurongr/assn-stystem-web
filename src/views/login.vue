<template>
    <div>
      <div class="login">
        <p>登录</p>
        <p>用户名：<Input v-model="userName" placeholder="请输入账号" style="width: 172px" /></p>
        <p>密&nbsp;&nbsp; 码：<Input v-model="pwd" placeholder="请输入密码" style="width: 172px" /></p>
        <div class="login-btn"><Button type="primary" style="width: 100%" @click="login">登录</Button></div>
        <p><span style="color: #2d78f4">免费注册</span><span>忘记密码？</span></p>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              userName: '',
              pwd: '',
            }
        },

        methods: {
          login() {
            let that = this;
            let url = that.BaseConfig + '/login';
            let data = {
              userName: that.userName,
              pwd: that.pwd,
            };
            that
              .$http(url, '', data, 'post')
              .then(res => {
                console.log(res)
                if(res.data.retCode === 0) {
                  //把登录信息缓存起来localStorage
                  that.$router.push({
                    path: '/index/web',
                  })
                }
              })
              .catch(err => {

              })
          },
        }
    }
</script>

<style lang="less" scoped>
  .login {
    margin: 100px auto;
    width: 230px;
    border: 1px solid #000;
    /deep/ .ivu-input {
      border-color: #2d78f4;
    }
    p {
      margin-top: 15px;
      &:nth-child(1) {
        font-size: 20px;
        text-align: center;
        font-weight: 600;
        letter-spacing: 2px;
        color: #2d78f4;
      }
      &:nth-last-child(1) {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
    }
    .login-btn {
      margin: 15px 0 10px;
    }
  }
</style>
