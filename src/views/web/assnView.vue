<template>
    <div class="webIndex">
      <div class="viewImg" >
        <p @click="changeView">风采<Icon type="ios-arrow-down" /></p>
        <Carousel autoplay v-model="value2" loop v-if="openImg">
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
      <div class="assn-view">
        <div class="assn-we">
          <div class="we-title">
            <img src="./img/tu1.jpg">
            <p>计算机协会</p>
          </div>
          <div style="display: flex">
            <div class="we-cont">
              <p>关于我们</p>
              <p>本社团成立于2018年十月20日，初创人本社团成立于2018年十月20日，初创人本社团成立于2018年十月20日，初创人本社团成立于2018年十月20日，初创人本社团成立于2018年十月20日，初创人
                本社团成立于2018年十月20日，初创人本社团成立于2018年十月20日，初创人本社团成立于2018年十月20日，初创人本社团成立于2018年十月20日，初创人本社团成立于2018年十月20日，初创人
                本社团成立于2018年十月20日初创人本社团成立于2018年十月20日，初创人本社团成立于2018年十月20日，初创人</p>
            </div>
          </div>
        </div>
        <div class="assn-announce">
          <div>
            <img src="./img/tu2.jpg" />
          </div>
        </div>
      </div>
      <Progress :percent="100" status="active" />
      <div class="assn-center">
        <div class="c-announce">
          <div class="announce-title">
            <p>社团公告</p>
            <p><a href="">更多>></a></p>
          </div>
          <div class="an_content">
            <div class="content-new">
              <p>最新</p>
              <p>公告标题</p>
            </div>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ul>
          </div>
        </div>
        <div class="c-depart">
          <div class="depart-left"></div>
          <div class="depart-right">
            <p class="depart-title">部门名称/介绍</p>
            <p class="depart-detail">部门职能介绍，部门人数等部门职能介绍，部门人数等部门职能介绍，部门人数等部门职能介绍，部门人数等
              部门职能介绍，部门人数等部门职能介绍，部门人数等部门职能介绍，部门人数等部门职能介绍，部门人数等
              部门职能介绍，部门人数等部门职能介绍，部门人数等部门职能介绍，部门人数等部门职能介绍，部门人数等部门职能介绍，部门人数等部门职能介绍，部门人数等
            </p>
            <div class="depart-sort">
              <p class="one">实践部</p>
              <p class="two">实践部</p>
              <p class="one">实践部</p>
              <p class="two">实践部</p>
              <p class="one">实践部</p>
              <p class="two">实践部</p>
              <p class="one">实践部</p>
            </div>
          </div>
        </div>
      </div>
      <Progress :percent="100" status="active" />
      <div class="assn-activity">
        <div class="act-left"></div>
        <div class="act-right">
          <div class="act-r-header">
            <p>全部活动</p>
            <p>已结束</p>
            <p>进行中</p>
            <p>待开展</p>
          </div>
          <div class="act-detail">
            <div class="det-img"><img src="./img/tu2.jpg" /></div>
            <div class="det-cont">
              <p class="det-cont-title">活动标题</p>
              <div class="det-content">
                <p>活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容
                  活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容
                  活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容</p>
              </div>
              <p><span>开始时间：2019-02-19</span><span style="padding: 0 30px">结束时间：2019-02-22</span><span>地点：求是楼</span></p>
              <p>负责人：某某莫<span style="padding-left: 50px">学分：0.5分/人</span></p>
            </div>
          </div>

          <div class="act-detail">
            <div class="det-img"><img src="./img/tu2.jpg" /></div>
            <div class="det-cont">
              <p class="det-cont-title">活动标题</p>
              <div class="det-content">
                <p>活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容
                  活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容
                  活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容</p>
              </div>
              <p><span>开始时间：2019-02-19</span><span style="padding: 0 30px">结束时间：2019-02-22</span><span>地点：求是楼</span></p>
              <p>负责人：某某莫<span style="padding-left: 50px">学分：0.5分/人</span></p>
            </div>
          </div>
          <div class="act-detail">
            <div class="det-img"><img src="./img/tu2.jpg" /></div>
            <div class="det-cont">
              <p class="det-cont-title">活动标题</p>
              <div class="det-content">
                <p>活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容
                  活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容
                  活动内容活动内容活动内容活动内容活动内容活容活动内容内容活动内容活动内容活动内容容</p>
              </div>
              <p><span>开始时间：2019-02-19</span><span style="padding: 0 30px">结束时间：2019-02-22</span><span>地点：求是楼</span></p>
              <p>负责人：某某莫<span style="padding-left: 50px">学分：0.5分/人</span></p>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              value2: 0,
              openImg: true,
            }
        },

      created() {
          setTimeout(() =>{
            this.openImg = false;
          },3000)
      },

        methods: {
          //顶部图片
          changeView(){
            this.openImg = !this.openImg;
          },
        }
    }
</script>

<style lang="less" scoped>
  .box(@width, @height) {
    width: @width;
    height: @height;
  }
  .webIndex {
    width: 75%;
    /*!*min-width: 800px;*!   为了不不变形要设置最小宽度*/
    text-align: left;
    margin: 10px auto;
    position: relative;
    overflow: hidden;
    .viewImg {
      width: 100%;
      img {
        .box(100%, 280px);
      }
      p {
        background-color: #ff671a;
        color: #fff;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        line-height: 35px;
        position: absolute;
        text-align: center;
        top:0;
        left: 0;
        z-index: 100;
      }
    }
    .assn-view {
      width: 100%;
      display: flex;
      justify-content: space-between;
      background-color: #f6f6f6;
      border-radius: 5px;
      margin-bottom: 10px;
      .assn-we {
        width: 50%;
        height: 400px;
        padding: 20px;
        .we-title {
          display: flex;
          padding-left: 30px;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          p{
            padding-left: 10px;
            font-size: 35px;
            letter-spacing: 4px;
            font-weight: 600;
            color: orangered;
            text-shadow:#f3f3f3 2px 2px 0, #b2b2b2 1px 2px 0;
          }
        }
        .we-cont {
          margin-top: 10px;
          p {
            width: 100%;
            line-height: 30px;
            &:nth-child(1) {
              font-size: 20px;
              font-weight: 600;
              letter-spacing: 2px;
              color: orangered;
              text-align: center;
              padding-top: 10px;
            }
            &:nth-child(2) {
              text-indent: 2em;
              text-align: left;
              font-size: 15px;
              letter-spacing: 1px;
            }
          }
        }
      }
      .assn-announce {
        width: 50%;
        height: 400px;
        position: relative;
        overflow: hidden;
        div {
          position: absolute;
          top: -34px;
          right: -30px;
          width: 100%;
          height: 100%;
          background: url("./img/icon_1.png") no-repeat;
          background-size: 100% 100%;
          img {
            position: absolute;
            top: 137px;
            left: 59px;
            width: 70%;
            height: 58%;
            -webkit-transform: rotate(8deg);
            transform: rotate(6deg);
            border-radius: 5px;
          }
        }
      }
    }
    .assn-center {
      margin: 15px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .c-announce {
        width: 26%;
        .announce-title {
          height: 35px;
          line-height: 35px;
          border-bottom: 1px solid #ff061d;
          display: flex;
          justify-content: space-between;
          p {
            &:nth-child(1) {
              padding: 0 10px;
              background-color: #ff061d;
              color: #fff;
              font-size: 15px;
            }
            &:nth-child(2) {
              a {
                color: #ff061d;
              }
            }
          }
        }
        .an_content {
          .content-new {
            .box(90%, 150px);
            margin: 10px auto;
            border: 1px dashed #f10f19;
            border-radius: 5px;
            padding: 10px;
            position: relative;
            overflow: hidden;
            p {
              &:nth-child(1) {
                .box(50px, 50px);
                font-size: 16px;
                position: absolute;
                right: -7px;
                top: -15px;
                border-radius: 50%;
                background-color: #f10f19;
                color: #fff;
                font-weight: 600;
                text-align: center;
                padding-top: 16px;
                letter-spacing: 1px;
              }
              &:nth-child(2) {
                text-align: center;
                font-weight: 600;
                font-size: 16px;
              }
            }
          }
        }
      }
      .c-depart {
        width: 71%;
        display: flex;
        background-color: #f6f6f6;
        .depart-left {
          width: 35%;
          border: 1px solid #000;
        }
        .depart-right {
          width: 65%;
          padding: 15px;
          .depart-title {
            font-size: 25px;
            letter-spacing: 4px;
            font-weight: 600;
            color: orangered;
            text-shadow:#f3f3f3 2px 2px 0, #b2b2b2 1px 2px 0;
            text-align: center;
          }
          .depart-detail {
            width: 85%;
            margin: 0 auto;
            padding-top: 20px;
            text-indent: 2em;
            font-size: 15px;
            letter-spacing: 1px;
            line-height: 25px;
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:7;
          }
          .depart-sort {
            width: 100%;
            margin: 10px auto;
            display: flex;
            p {
              .box(80px, 80px);
              line-height: 80px;
              text-align: center;
              background: url("./img/icon_2.jpg") no-repeat;
              background-size: 100% 100%;
              color: orangered;
              font-size: 18px;
              font-weight: 600;
              text-shadow:#f3f3f3 1px 1px 0, #b2b2b2 1px 2px 0;
              margin: 0 4px;
            }
            .one {
              margin-top: 5px;
            }
            .two {
              margin-top: 20px;
            }
          }
        }
      }
    }
    .assn-activity {
      margin: 15px 0;
      display: flex;
      .act-left {
        width: 26%;
        border: 1px solid #000;
      }
      .act-right {
        width: 74%;
        border: 1px solid #000;
        padding: 12px;
        .act-r-header {
          height: 40px;
          line-height: 40px;
          font-size: 15px;
          display: flex;
          border-bottom: 1px dashed #ff061d;
          p {
            padding: 0 15px;
            color: #ff061d;
            margin-right: 10px;
            &:nth-child(1) {
              background-color: #ff061d;
              color: #fff;
            }
          }
        }
        .act-detail {
          margin: 18px 5px;
          height: 150px;
          display: flex;
          justify-content: space-between;
          .det-img {
            width: 15%;
            text-align: center;
            img {
              .box(90%, 90%);
              margin-top: 5px;
              border-radius: 5px;
            }
          }
          .det-cont {
            width: 84%;
            p {
              line-height: 20px;
              letter-spacing: 1px;
            }
            .det-cont-title {
              font-size: 16px;
              font-weight: 600;
              padding-top: 5px;
            }
            .det-content {
              height:75px;
              p {
                margin: 5px 0;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:3;
              }
            }
          }
        }
      }
    }
  }
</style>
