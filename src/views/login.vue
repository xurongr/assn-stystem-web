<template>
    <div class="login-box">
      <div class="login">
        <p>登录</p>
        <p>用户名：<Input v-model="userName" placeholder="请输入账号" style="width: 172px" /></p>
        <p>密&nbsp;&nbsp; 码：<Input v-model="pwd" type="password" placeholder="请输入密码" style="width: 172px" /></p>
        <div class="login-btn"><Button type="primary" style="width: 100%" @click="login">登录</Button></div>
        <p><span style="color:blue;" @click="goReSet">忘记密码？</span></p>
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
                console.log(res);
                if(res.data.retCode === 0) {
                  //把登录信息缓存起来localStorage
                  localStorage.setItem('loginInfo', JSON.stringify(res.data.data));
                  let assnBasicList = res.data.data.assnBasicList;
                  let access =[];
                  assnBasicList.map(item => {
                    if(item.identityId === 2) {
                      access.push({
                        identityId: 2,
                        associationName: item.associationName,
                        associationId: item.associationId,
                        job: item.job,
                      })
                    }
                  })
                  if(access.length === 0 && assnBasicList.length === 0) {
                    localStorage.setItem('type', JSON.stringify(0));
                  } else if(access.length === 1){
                    localStorage.setItem('type', JSON.stringify(1));
                  } else if(access.length > 1){
                    localStorage.setItem('type', JSON.stringify(2));
                  } else if(access.length === 0 && assnBasicList.length !== 0) {
                    localStorage.setItem('type', JSON.stringify(3));
                  }
                  localStorage.setItem('access', JSON.stringify(access));
                  if(that.userName === 'admin') {
                    that.$router.push({
                      path: '/index',
                    })
                  } else {
                    that.$router.push({
                      path: '/index/web',
                    })
                  }
                } else {
                  that.$Message.error(res.data.retMsg)
                }
              })
              .catch(err => {
                that.$Message.error('请求错误')
              })
          },

          goReSet() {
            this.$router.push({name: 'resetPwd'})
          },

        }
    }
</script>

<style lang="less" scoped>
  .login-box {
    width: 100%;
    height: 100vh;
    background: url("./web/img/login_bg.jpg");
    background-size: 100% 100%;
    position: relative;
  }
  .login {
    position: absolute;
    left: 38%;
    top: 20%;
    padding: 40px;
    border: 1px solid #fff;
    border-radius: 10px;
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
