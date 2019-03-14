<template>
  <!--首页-->
  <div style="width: 100%;text-align: center; min-width: 860px;">
    <div class="banner">
      <!--banner，放系统名字，，左侧LOGO，，右侧后台管理入口,搜索框-->
      <div class="banner-icon">
        <img src="./img/icon.png">
        <img src="./img/banner_name.png">
        <span @click="goSystem">后台管理入口</span>
      </div>
      <div class="banner-right">
        <img src="" alt="">
        <p>用户名</p>
        <p style="padding-left: 10px">退出</p>
      </div>
    </div>
    <!--导航栏-->
    <div class="nav">
      <div class="nav-cont">
        <ul>
          <li><Router-link to="/index/web">首页</Router-link></li>
          <li><Router-link to="/index/web/assnView">社团风采</Router-link></li>
          <li>社团招新</li>
          <li>创社申请</li>
          <li>关于我们</li>
        </ul>
      </div>
    </div>
    <!--内容-->
    <div>
      <router-view/>
    </div>
    <!--底部-->
    <div class="footer">底部</div>
  </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },

        methods: {
          //进入后台管理
          goSystem() {
            this.$router.push({
              path: '/index',
            })
          },

        }
    }
</script>

<style lang="less" scoped>
  .box(@width, @height) {
    width: @width;
    height: @height;
  }
  .banner {
    .box(100%, 140px);
    padding: 10px 20px 10px 12%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .banner-icon {
      padding-top: 20px;
      padding-left: 10px;
      img:nth-child(1) {
        width: 80px;
        height: 80px;
      }
      img:nth-child(2) {
        width: 73%;
        height: 91px;
      }
      span {
        padding-left: 20px;
      }
    }
    .banner-right {
      line-height: 40px;
      display: flex;
      img {
        .box(40px, 40px);
        border-radius: 50%;
        border: 1px solid #000;
        margin-right: 10px;
      }
    }
  }

  .nav {
    .box(100%, 40px);
    background-color: #3765FF;
    .nav-cont {
      .box(75%, 40px);
      margin: 0 auto;
      ul {
        display: flex;
        li {
          height: 40px;
          line-height: 40px;
          padding: 0 40px;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 1px;
          &:hover{
            background-color: blue;
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
