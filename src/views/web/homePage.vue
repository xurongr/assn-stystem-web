<template>
    <div class="webIndex">
      <div class="content">
        <div class="cont-top">
          <div class="imgUrl">
            <Carousel autoplay v-model="picNum" loop>
              <CarouselItem>
                <div><img src="./img/tu1.jpg" alt=""></div>
              </CarouselItem>
              <CarouselItem>
                <div><img src="./img/tu2.jpg" alt=""></div>
              </CarouselItem>
              <CarouselItem>
                <div><img src="./img/tu3.jpg" alt=""></div>
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
                <li><p><span>实践活动1</span><span>时间</span></p></li>
                <li>山东省决定2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li><p><span>实践活动1</span><span>时间</span></p></li>
                <li>山东省决定2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li><p><span>实践活动1</span><span>时间</span></p></li>
                <li>山东省决定2</li>
                <li><p><span>实践活动1</span><span>时间</span></p></li>
              </ul>
            </div>
          </div>
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
    height: 800px;
    display: flex;
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
          .news-info {
            width: 100%;
            text-align: left;
            ul {
              list-style: disc;
              li {
                line-height: 25px;
                margin: 0 10px 0 20px;
                list-style: disc;
                p {
                  display: flex;
                  justify-content: space-between;
                }
              }
            }
          }
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

</style>
