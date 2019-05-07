<template>
    <div class="webIndex">
      <div class="content">
        <div class="cont-top">
          <div class="imgUrl">
            <Carousel autoplay v-model="picNum" loop>
              <CarouselItem>
                <div><img src="./img/18.jpg" /></div>
              </CarouselItem>
              <CarouselItem>
                <div><img src="./img/19.jpg" /></div>
              </CarouselItem>
              <CarouselItem>
                <div><img src="./img/20.jpg" /></div>
              </CarouselItem>
            </Carousel>
          </div>
        </div>

        <div class="cont-center">
          <div class="c-center">
            <div class="cont-announce">
              <div class="announce-title">
                <p>公告通知</p>
                <!--<p><a href="">更多>></a></p>-->
              </div>
              <div class="an_content">
                <div class="content-new">
                  <p>最新</p>
                  <p>{{announceInfo[0].title}}</p>
                  <p>{{announceInfo[0].content}}</p>
                </div>
                <ul>
                  <li v-for="i in announceInfo.slice(1,10)">{{i.title}}</li>
                  <li style="color: blue">更多精彩>></li>
                </ul>
              </div>
            </div>
            <div class="news">
              <div class="news-title">
                <p>社团活动</p>
                <p><a href="javascript:(0)" @click="goNews(1,null)">更多>></a></p>
              </div>
              <div class="news-info">
                <ul>
                  <li v-for="item in activityList.slice(0,10)" :key="item.id">
                    <p @click="goNews(1,item.id)"><span>{{item.activityName}}</span><span>{{item.startTime}}</span></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="cont-views">
          <div class="cont-view">
            <div class="cont-view-title">
              <p>社团风采</p>
              <p><Router-link to="/index/web/morePage">更多>></Router-link></p>
            </div>
            <div class="views">
              <div class="views-detail" v-for="item in activityList.slice(0,6)" :key="item.id" @click="goNews(1,item.id,item.associationId)">
                <span v-if="item.image"><img :src="item.image"></span>
                <span v-if="!item.image"><img src="./img/banner3.jpg"></span>
                <p>{{item.activityName}}</p>
              </div>
            </div>
          </div>
          <div class="cont-tool">
            <div class="cont-tool-title">
              <p>常用链接</p>
            </div>
            <div class="cont-tool-cont">
              <p>入团申请</p>
              <p>咨询创社</p>
              <p>联系管理员</p>
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
              announceInfo: [],
              activityList: [],
            }
        },

      created() {
          this.getAnnouceInfo();
          this.getActivityList();
      },

        methods: {
          //获取公告信息
          getAnnouceInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectNoticeAll';
            let params = {
              type: 0,    //type：0 社团公告，，要根据userId判断type
              pageNo: 1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.announceInfo = res.data.data.data;
                  console.log(that.announceInfo)
                  console.log(that.announceInfo.slice(1,10))
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取活动列表信息
          getActivityList() {
            let that = this;
            let url = that.BaseConfig + '/selectAssnAAll';
            let params = {
              pageNo: 1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.activityList = res.data.data.data;
                  console.log('--活动列表--',that.activityList)
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          goNews(flag, id) {
            this.$router.push({
              path: '/index/web/news',
              query: {
                flag: flag,
                activityId: id,
              }
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
  .webIndex {
    width: 75%;
    margin: 0 auto;
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
        border-radius: 10px;
        .imgUrl {
          .box(100%, 370px);
          border-radius: 10px;
          img {
            .box(100%, 370px);
            border-radius: 10px;
          }
        }
      }
      .cont-center {
        display: flex;
        padding: 12px 0;
        .c-center {
          width: 90%;
          display: flex;
          margin: 0 auto;
          justify-content: space-between;
          .cont-announce {
            width: 345px;
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
          .news {
            .box(60%, 370px);
            .news-info {
              width: 100%;
            }
          }
        }
      }
    }
    .cont-views {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .cont-tool {
        width: 30%;
        &-title {
          height: 35px;
          line-height: 35px;
          color: #444;
          margin-top: -13px;
          border-bottom: 4px solid #081bf3;
          text-align: right;
          p {
            font-weight: 600;
            font-size: 22px;
          }
        }
        &-cont {
          text-align: right;
          p {
            font-size: 30px;
            font-weight: 600;
            padding: 10px 0;
            color: #2b81f3;
            border-bottom: 2px dashed #ccc;
          }
        }
      }
      .cont-view {
        width: 65%;
        &-title {
          height: 35px;
          line-height: 35px;
          color: #444;
          margin-top: -13px;
          border-bottom: 4px solid #f36909;
          p {
            font-weight: 600;
            font-size: 22px;
          }p {
             font-weight: 600;
             font-size: 22px;
           }
        }
        .views {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .views-detail {
            width: 30%;
            margin: 10px 0;
            text-align: center;
            position: relative;
            img {
              .box(100%, 170px);
              border-radius: 5px;
            }
            p {
              width: 90%;
              height: 29px;
              line-height: 29px;
              background: rgba(0, 0, 0, 0.5);
              color: #fff;
              position: absolute;
              bottom: 6px;
              left: 14px;
              text-align: left;
              padding-left: 15px;
              font-size: 14px;
              border-radius: 0 0 5px 5px;
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
          &:hover {
            color: darkblue;
            font-weight: 600;
          }
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
