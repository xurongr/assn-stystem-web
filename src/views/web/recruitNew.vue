<template>
    <div class="webIndex">
      <div class="recruit-top">
        <div class="left">
          <p class="l-title">招新Top榜</p>
          <p class="l-cont">
            <ul>
              <li><span>!</span>青年志愿者协会</li>
              <li><span>!</span>后山夜校</li>
              <li><span>!</span></li>
              <li><span>!</span></li>
              <li><span>!</span></li>
            </ul>
          </p>
        </div>
        <div class="center">
          <Carousel autoplay v-model="picNum" loop>
            <CarouselItem>
              <div><img src="./img/tu1.jpg" /></div>
            </CarouselItem>
            <CarouselItem>
              <div><img src="./img/tu2.jpg" /></div>
            </CarouselItem>
            <CarouselItem>
              <div><img src="./img/tu3.jpg" /></div>
            </CarouselItem>
          </Carousel>
        </div>
        <div class="right">招新时间段</div>
      </div>
      <div class="recruit-cont">
        <p class="title">如何入团<span>?</span></p>
        <div class="content">
          <div class="cont-step">
            <p>填写申请</p>
            <p>填写社团申请表，包含：个人资料，所要加入的社团等等填写社团申请表，包含：个人资料，所要加入的社团等等
              填写社团申请表，包含：个人资料，所要加入的社团等等v填写社团申请表，包含：个人资料，所要加入的社团等等</p>
          </div>
          <div class="cont-step">
            <p>关注公告</p>
            <p>填写社团申请表，包含：个人资料，所要加入的社团等等填写社团申请表，包含：个人资料，所要加入的社团等等
              填写社团申请表，包含：个人资料，所要加入的社团等等v填写社团申请表，包含：个人资料，所要加入的社团等等</p>
          </div>
          <div class="cont-step">
            <p>线下面试</p>
            <p>填写社团申请表，包含：个人资料，所要加入的社团等等填写社团申请表，包含：个人资料，所要加入的社团等等
              填写社团申请表，包含：个人资料，所要加入的社团等等v填写社团申请表，包含：个人资料，所要加入的社团等等</p>
          </div>
          <div class="cont-step">
            <p>审核通过</p>
            <p>填写社团申请表，包含：个人资料，所要加入的社团等等填写社团申请表，包含：个人资料，所要加入的社团等等
              填写社团申请表，包含：个人资料，所要加入的社团等等v填写社团申请表，包含：个人资料，所要加入的社团等等</p>
          </div>
          <div class="cont-step">
            <p>加入成功</p>
            <p>填写社团申请表，包含：个人资料，所要加入的社团等等填写社团申请表，包含：个人资料，所要加入的社团等等
              填写社团申请表，包含：个人资料，所要加入的社团等等v填写社团申请表，包含：个人资料，所要加入的社团等等</p>
          </div>
        </div>
      </div>
      <Router-link to="/index/web/applyTable" style="color: #000">去申请</Router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              picNum: 0,   //轮播图播放索引
            }
        },

        created() {

        },

        methods: {},
    }
</script>

<style lang="less" scoped>
  .box(@width, @height) {
    width: @width;
    height: @height;
  }
  .webIndex {
    width: 75%;
    margin: 10px auto;
    text-align: left;
    .recruit-top {
      display: flex;
      width: 100%;
      .left {
        width: 15%;
        padding: 12px;
        .l-title {
          padding-top: 7px;
          color: red;
          font-size: 18px;
          letter-spacing: 2px;
          font-weight: 600;
        }
        .l-cont {
          padding-top: 7px;
          font-size: 15px;
          letter-spacing: 1px;
          font-weight: 600;
          span {
            padding-top: 7px;
            font-size: 18px;
            color: red;
            font-family: Arial;
            font-style: italic;
            padding-right: 5px;
          }
        }
      }
      .center {
        width: 65%;
        padding: 0 12px;
        img {
          .box(100%, 380px);
        }
      }
      .right {
        width: 20%;
      }
    }
    .recruit-cont {
      margin-top: 30px;
      width: 100%;
      background: url("./img/re_bg1.png") no-repeat;
      background-size: 100% 25%;
      position: relative;
      .title {
        position: absolute;
        top: 3%;
        left: 8%;
        font-weight: 600;
        font-size: 20px;
        letter-spacing: 2px;
        span {
          color: red;
          font-weight: 800;
          font-size: 30px;
        }
      }
      .content {
        width: 86%;
        margin: 0 auto;
        padding-top: 6%;
        .cont-step {
          font-size: 15px;
          display: flex;
          justify-content: space-between;
          padding: 12px;
          p {
            &:nth-child(1) {
              font-weight: 600;
              color: #fff;
              .box(70px, 70px);
              line-height: 70px;
              border-radius: 50%;
              text-align: center;
              background-color: #38a7f7;
            }
            &:nth-child(2) {
              width: 93%;
              padding: 12px;
            }
          }
        }
      }
    }
  }
</style>
