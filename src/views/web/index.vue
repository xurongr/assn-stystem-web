<template>
  <!--首页-->
  <div style="width: 100%;text-align: center;font-size: 20px">
    <div class="banner">banner，放系统名字，，左侧LOGO，，右侧后台管理入口,搜索框</div>
    <div class="nav">导航栏</div>
    <div class="webIndex">
      <div class="left">
        <div class="login">账户登录处(换成站内搜索)</div>
        <div class="announce">系统公告栏</div>
      </div>
      <div class="content">
        <div class="cont-top">
          <div class="imgUrl">图片轮播swiper</div>
          <div class="news">站内热点（）</div>
        </div>
        <div class="cont-center">
          <div class="c-center">
            <div class="cont-c1">内容1</div>
            <div class="cont-c1">内容2</div>
            <div class="cont-c1">内容3</div>
          </div>

        </div>
      </div>
    </div>
    <div class="footer">底部</div>
  </div>

</template>

<script>
    export default {
        data() {
            return {}
        },

        methods: {}
    }
</script>

<style lang="less" scoped>
  .box(@width, @height) {
    width: @width;
    height: @height;
  }
  .banner {
    .box(75%, 150px);
    min-width: 860px;
    margin: 0 auto;
    border: 1px solid #000;
  }
  .nav {
    .box(100%, 50px);
    border: 1px solid red;
  }
  .webIndex {
    width: 75%;
    min-width: 860px;
    margin: 10px auto;
    height: 800px;
    border: 1px solid #000;
    display: flex;
    .left {
      .box(20%, 800px);
      border: 1px solid #000;
      .login {
        .box(100%, 300px);
        margin-bottom: 20px;
        border: 1px solid #000;
      }
      .announce {
        .box(100%, 400px);
        border: 1px solid #000;
      }
    }
    .content {
      width: 80%;
      margin: 0 auto;
      .cont-top {
        display: flex;
        justify-content: space-between; height: 400px;
        border: 1px solid #000;
        padding: 12px;
        .imgUrl {
          .box(60%, 370px);
          border: 1px solid red;
        }
        .news {
          .box(35%, 370px);
          border: 1px solid cadetblue;
        }
      }
      .cont-center {
        display: flex;
        padding: 12px;
        .c-center {
          width: 70%;
          display: flex;
          justify-content: space-around;
          border: 1px solid #000;
          .cont-c1 {
            width: 230px;
            height: 260px;
            border: 1px solid #000;
          }
        }

      }
    }
  }

  .footer {
    .box(100%, 50px);
    border: 1px solid #000;
  }

</style>
