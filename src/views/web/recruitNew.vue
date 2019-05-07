<template>
    <div class="webIndex">
      <div class="recruit-top">
        <div class="left">
          <p class="l-title">招新Top榜</p>
          <p class="l-cont">
            <ul>
              <li v-for="item in assnInfo" :key="item.id">
                <span>!</span>
                {{item.associationName}}
              </li>
            </ul>
          </p>
        </div>
        <div class="center">
          <Carousel autoplay v-model="picNum" loop>
            <CarouselItem>
              <div><img src="./img/11.jpg" /></div>
            </CarouselItem>
            <!--<CarouselItem>-->
              <!--<div><img src="./img/banner2.jpeg" /></div>-->
            <!--</CarouselItem>-->
            <CarouselItem>
              <div><img src="./img/13.jpg" /></div>
            </CarouselItem>
          </Carousel>
        </div>
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
          <div class="cont-step">
            <p>去申请</p>
            <p class="img_icon"><Router-link to="/index/web/applyPage"><img src="./img/icon_enter.png" ></Router-link></p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              picNum: 0,   //轮播图播放索引
              pageNo: 1,
              assnInfo:[],
            }
        },

        created() {
          this.getInfo();
        },

        methods: {
          //获取社团列表
          getInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationAll';
            let params = {
              pageNo: that.pageNo,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.assnInfo = that.assnInfo.concat(data.data.data);
                  let total = data.data.total;
                  if(that.assnInfo < total) {
                    that.pageNo++;
                    that.getInfo();
                  }
                  console.log('社团列表',  that.assnInfo)
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },
        },
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
        width: 30%;
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
        width: 70%;
        padding: 0 12px;
        img {
          .box(100%, 380px);
        }
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
  .img_icon {
    button {
      font-size: 16px;
      font-weight: 600;
    }
    img{
      width: 334px;
      padding-left: 15px;
    }
  }
</style>
