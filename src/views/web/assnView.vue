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
        <div class="assn-nav">
          
        </div>
        <div class="assn-cont"></div>
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
    margin: 10px auto;
    position: relative;
    overflow: hidden;
    .viewImg {
      width: 100%;
      img {
        .box(100%, 280px);
      }
      p {
        background-color: #3765FF;
        color: #fff;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        line-height: 60px;
        padding-left: 16px;
        padding-top: 5px;
        position: absolute;
        top: -17px;
        left: -13px;
        z-index: 100;
      }
    }
    .assn-view {
      height: 600px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .assn-nav {
        width: 25%;
        height: 400px;
        border: 1px solid #000;
      }
      .assn-cont {
        width: 73%;
        height: 600px;
        border: 1px solid #000;
      }
    }
  }
</style>
