<template>
    <div class="webIndex">
      <div class="content">
        <div class="cont-top">
          <div class="imgUrl">
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
          <div class="news">
            <div class="news-title">
              <p>站内热点</p>
              <p><a href="">更多>></a></p>
            </div>
            <div class="news-info">
              <ul>
                <li><p><span>实践活动1</span><span>2019-03-10</span></p></li>
                <li><p><span>计算机协会义务维修</span><span>2019-03-10</span></p></li>
                <li><p><span>实践活动1</span><span>2019-03-10</span></p></li>
                <li><p><span>实践活动1</span><span>2019-03-10</span></p></li>
                <li><p><span>实践活动1</span><span>2019-03-10</span></p></li>
                <li><p><span>实践活动1</span><span>2019-03-10</span></p></li>
                <li><p><span>实践活动1</span><span>2019-03-10</span></p></li>
                <li><p><span>实践活动1</span><span>2019-03-10</span></p></li>
                <li><p><span>实践活动1</span><span>2019-03-10</span></p></li>
                <li><p><span>实践活动1</span><span>2019-03-10</span></p></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="cont-center">
          <div class="c-center">
            <div class="cont-announce">
              <div class="announce-title">
                <p>公告通知</p>
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
            <div class="cont-view">
              <div class="news-title">
                <p>社团风采</p>
                <p><a href="">更多>></a></p>
              </div>
              <div class="views">
                <div class="views-detail">
                  <img src="./img/tu2.jpg" alt="">
                  <p>义务维修</p>
                </div>
                <div class="views-detail">
                  <img src="./img/tu3.jpg" alt="">
                  <p>义务维修</p>
                </div>
                <div class="views-detail">
                  <img src="./img/tu2.jpg" alt="">
                  <p>义务维修</p>
                </div>
                <div class="views-detail">
                  <img src="./img/tu1.jpg" alt="">
                  <p>义务维修</p>
                </div>
                <div class="views-detail">
                  <img src="./img/tu2.jpg" alt="">
                  <p>义务维修</p>
                </div>
                <div class="views-detail">
                  <img src="./img/tu1.jpg" alt="">
                  <p>义务维修</p>
                </div>
              </div>
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
              picNum: 0,   //轮播图片播放索引
            }
        },

        methods: {}
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
    display: flex;
    text-align: left;
    .content {
      width: 100%;
      margin: 0 auto;
      .cont-top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 3px solid #3765FF;
        .imgUrl {
          .box(55%, 370px);
          img {
            .box(100%, 370px);
          }
        }
        .news {
          .box(43%, 370px);
          .news-info {
            width: 100%;
          }
        }
      }
      .cont-center {
        display: flex;
        padding: 12px 0;
        .c-center {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .cont-announce {
            width: 300px;
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
          .cont-view {
            width: 68%;
            .views {
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;
              .views-detail {
                width: 29%;
                margin: 10px;
                text-align: center;
                img {
                  .box(90%, 150px);
                }
                p {
                  text-align: left;
                  padding-left: 15px;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }

  /*公共样式*/
  .news-title {
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #3765FF;
    display: flex;
    justify-content: space-between;
    p {
      &:nth-child(1) {
        font-size: 15px;
        background-color: #3765FF;
        color: #ffff;
        padding: 0 10px;
      }
      &:nth-child(2) {
        margin-right: 10px;
        a {
          color: #3765FF;
        }
      }
    }
  }
  ul {
    list-style: disc;
    li {
      line-height: 30px;
      margin: 0 10px 0 20px;
      list-style: disc;
      border-bottom: 1px dashed #ccc;
      p {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
