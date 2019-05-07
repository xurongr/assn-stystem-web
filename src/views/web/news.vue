<template>
    <div class="news">
      <div class="img"><img src="./img/4.jpg" alt=""></div>
      <div class="news-cont">
        <div class="news-cont-left">
          <div class="title">{{flag === 1 ? '社团活动':'社团公告'}}</div>
          <div class="cont">
            <ul v-if="flag === 1">
              <li v-for="item in activityList" :key="item.id">
                <span @click="getActInfo(item.id)">{{item.activityName}}</span>
              </li>
            </ul>
            <ul v-if="flag === 2">
              <li v-for="item in AnnouceList" :key="item.id">
                <span @click="getAnnounDetail(item.id)">{{item.title}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!--/社团活动-->
        <div class="news-cont-right" v-if="flag === 1">
          <p style="font-size: 22px;font-weight: 600;letter-spacing: 1px;line-height: 40px">{{actInfo.activityName}}</p>
          <div class="cont-content">
            <div style="width: 60%">
              <p>{{actInfo.content}}</p>
              <p><span>学分：</span>{{actInfo.score}}</p>
              <p><span>负责人：</span>{{actInfo.name}}</p>
              <p><span style="font-weight: 600">地址：</span>{{actInfo.address}}</p>
              <p><span style="font-weight: 600">活动时间：</span>{{actInfo.startTime}} ~ {{actInfo.endTime}}</p>
            </div>
            <div style="width: 40%">
              <img :src="actInfo.image" alt="">
            </div>
          </div>
        </div>

        <!--社团公告-->
        <div class="news-cont-right" v-if="flag === 2">
          <p style="font-size: 22px;font-weight: 600;letter-spacing: 1px;line-height: 40px">{{annouceDetailInfo.title}}</p>
          <div class="cont-content">
            <div style="width: 60%">
              <p>{{annouceDetailInfo.content}}</p>
              <p><span>发布人：</span>{{annouceDetailInfo.name}}</p>
              <p><span>所属社团：</span>{{annouceDetailInfo.associationName}}</p>
              <p><span style="font-weight: 600">发布时间：</span>{{annouceDetailInfo.createTime}}</p>
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
              activityList: [],
              flag: 1,     //1-活动
              activityId: null,
              actInfo: [],
              AnnouceList: [],
              annouceDetailInfo: [],
            }
        },

        created() {
          this.flag = this.$route.query.flag;
          if(this.flag === 1) {   //社团活动
            this.getActivityList();
            if(this.$route.query.activityId !== null && this.$route.query.activityId !== undefined) {
              this.getActInfo(this.$route.query.activityId);
            }
          }
          if(this.flag === 2) {   //社团公告
            this.getAnnouceInfo(this.$route.query.associationId);
            if(this.$route.query.annouceId !== null && this.$route.query.annouceId !== undefined) {
              this.getAnnounDetail(this.$route.query.annouceId);
            }
          }
        },

        methods: {
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
                  console.log('--活动列表--',that.activityList);
                  this.getActInfo(that.activityList[0].id);
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取单个活动信息
          getActInfo(id) {
            let that = this;
            let url = that.BaseConfig + '/selectAssnAById';
            let params = {
              associationActivityId: id,
            };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.actInfo = res.data.data;
                  console.log('--活动列表1--',that.actInfo)
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取社团公告列表
          getAnnouceInfo(id) {
            let that = this;
            let url = that.BaseConfig + '/selectNoticeAll';
            let params = {
              associationId: id,
              type: 0,
              pageNo: 1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.AnnouceList = res.data.data.data;
                  // this.getAnnounInfo(that.activityList[0].id);
                  console.log(that.AnnouceList)
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取单个公告详情
          getAnnounDetail(id) {
            let that = this;
            let url = that.BaseConfig + '/selectNoticeById';
            let params = {
              noticeId: id,
            };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.annouceDetailInfo = res.data.data;
                  console.log('--公告列表1--',that.annouceDetailInfo)
                } else {
                  that.$Message.error(res.data.retMsg);
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
.news {
  width: 80%;
  margin: 0 auto;
  .img {
    img {
      width: 100%;
      height: 200px;
    }
  }
  .news-cont {
    position: relative;
    height: 385px;
    width: 85%;
    margin: 0 auto;
    &-left {
      position: absolute;
      top: -30px;
      left: 0;
      width: 240px;
      height: 400px;
      background-color: #2b81f3;
      .title {
        line-height: 60px;
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 1px;
        text-align: center;
        color: #ffffff;
      }
      .cont {
        width: 94%;
        background-color: #fff;
        margin-left: 6%;
        height: 340px;
        li {
          line-height: 35px;
          border-bottom: 1px dashed #ccc;
        }
      }
    }
    &-right {
      text-align: left;
      margin-left: 250px;
      margin-top: 20px;
      padding-left: 12px;
      .cont-content {
        display: flex;
        justify-content: space-between;
        p {
          line-height: 30px;
          letter-spacing: 1px;
         &:nth-child(1) {
           font-size: 17px;
           font-weight: 400;
           margin: 10px 0 15px;
         }
        }
        img {
          width: 100%;
          height: 300px;
        }
      }
    }
  }
}
</style>
