<template>
    <div class="webIndex">
      <div class="rel-ours">
        <div class="img"><img src="./img/banner2.jpeg"></div>
        <div class="ours-cont">
          <p class="title"><span>关于我们</span></p>
          <p class="content">{{assnDetail.content}}</p>
          <div class="cont-detail">
            <p>舍长：{{assnDetail.name}}</p>
            <p>创社时间：{{assnDetail.createTime}}</p>
            <p>招募状态：{{assnDetail.recruitState === 0 ? '招募中' : '招募未开启'}}</p>
            <p>社团地址：{{assnDetail.address}}</p>
            <p>社团人数：{{assnDataCount}}</p>
          </div>
        </div>
      </div>
      <div class="depart-sort">
        <p class="title"><span>部门分类</span></p>
          <div class="sort-content">
          <Carousel v-model="value1" loop>
            <CarouselItem>
              <div class="demo-carousel depart-loop">
                <div @mouseenter="getDepart(item.id)" @mouseleave="assnShow = false"  v-for="(item,dx) in departList.slice(0,4)" :key="dx">
                  <p class="d-title" v-if="!assnShow">{{item.departmentName}}</p>
                  <div class="d-hover" v-if="assnShow">
                    <p>{{item.departmentName}}</p>
                    <p>人数：{{departNum}}人</p>
                    <p>简介：{{departDetailInfo.content}}</p>
                    <p>创建时间：{{departDetailInfo.createTime}}</p>
                  </div>
                </div>
                <div v-if="departList.length < 4" style="background-image:none;text-align: center;line-height: 220px;font-size: 20px;font-weight: 600">
                  暂无其他部门~
                </div>
              </div>
            </CarouselItem>
            <CarouselItem v-if="departList.length > 4">
              <div class="demo-carousel depart-loop" v-for="(item,dx1) in departList.slice(4,8)" :key="dx1">
                <div @mouseenter="getDepart(item.id)" @mouseleave="assnShow = false">
                  <p class="d-title" v-if="!assnShow">{{item.departmentName}}</p>
                  <div class="d-hover" v-if="assnShow">
                    <p>{{item.departmentName}}</p>
                    <p>人数：{{departNum}}人</p>
                    <p>简介：{{departDetailInfo.content}}</p>
                    <p>创建时间：{{departDetailInfo.createTime}}</p>
                  </div>
                </div>
                <div v-if="departList.length < 8" style="background-image:none;text-align: center;line-height: 220px;font-size: 20px;font-weight: 600">
                  暂无其他部门~
                </div>
              </div>
            </CarouselItem>
          </Carousel>
        </div>
      </div>
      <div class="assn-activity">
        <div class="act-r">
          <p class="title"><span>社团活动</span></p>
          <div class="act-right">
            <Tabs value="0" @on-click="getActivity">
              <TabPane label="全部活动" name="0">
                <div class="act-detail" v-for="(item,idx) in activityEnd" :key="idx" v-if="activityEnd.length !== 0">
                  <div class="det-img"><img :src="item.image" /></div>
                  <div class="det-cont" >
                    <p class="det-cont-title">{{item.activityName}}</p>
                    <div class="det-content">
                      <p>{{item.content}}</p>
                    </div>
                    <p><span>开始时间：{{item.startTime}}</span><span style="padding: 0 30px">结束时间：{{item.endTime}}</span><span>地点：{{item.address}}</span></p>
                    <p>负责人：{{item.name}}<span style="padding-left: 50px">学分：{{item.score}}分/人</span></p>
                  </div>
                </div>
                <div style="text-align: center;font-size: 20px;line-height: 109px;" v-if="activityEnd.length === 0">暂无活动~~</div>
              </TabPane>
              <TabPane label="已结束" name="1">
                <div class="act-detail" v-for="(item,idx) in activityEnd" :key="idx" v-if="activityEnd.length !== 0">
                  <div class="det-img"><img :src="item.image" /></div>
                  <div class="det-cont" >
                    <p class="det-cont-title">{{item.activityName}}</p>
                    <div class="det-content">
                      <p>{{item.content}}</p>
                    </div>
                    <p><span>开始时间：{{item.startTime}}</span><span style="padding: 0 30px">结束时间：{{item.endTime}}</span><span>地点：{{item.address}}</span></p>
                    <p>负责人：{{item.name}}<span style="padding-left: 50px">学分：{{item.score}}分/人</span></p>
                  </div>
                </div>
                <div style="text-align: center;font-size: 20px;line-height: 109px;" v-if="activityEnd.length === 0">暂无活动~~</div>
              </TabPane>
              <TabPane label="进行中" name="2">
                <div class="act-detail" v-for="(item,idx) in activityEnd" :key="idx" v-if="activityEnd.length !== 0">
                  <div class="det-img"><img :src="item.image" /></div>
                  <div class="det-cont" >
                    <p class="det-cont-title">{{item.activityName}}</p>
                    <div class="det-content">
                      <p>{{item.content}}</p>
                    </div>
                    <p><span>开始时间：{{item.startTime}}</span><span style="padding: 0 30px">结束时间：{{item.endTime}}</span><span>地点：{{item.address}}</span></p>
                    <p>负责人：{{item.name}}<span style="padding-left: 50px">学分：{{item.score}}分/人</span></p>
                  </div>
                </div>
                <div style="text-align: center;font-size: 20px;line-height: 109px;" v-if="activityEnd.length === 0">暂无活动~~</div>
              </TabPane>
              <TabPane label="待开展" name="3">
                <div class="act-detail" v-for="(item,idx) in activityEnd" :key="idx" v-if="activityEnd.length !== 0">
                  <div class="det-img"><img :src="item.image" /></div>
                  <div class="det-cont" >
                    <p class="det-cont-title" style="display: flex;justify-content: space-between">
                      <span style="line-height: 28px">{{item.activityName}}</span>
                      <span><Button type="primary" v-if="enjoyAct" @click="joinAct(item.id,item.associationId)">参加</Button></span>
                    </p>
                    <div class="det-content">
                      <p>{{item.content}}</p>
                    </div>
                    <p><span>开始时间：{{item.startTime}}</span><span style="padding: 0 30px">结束时间：{{item.endTime}}</span><span>地点：{{item.address}}</span></p>
                    <p>负责人：{{item.name}}<span style="padding-left: 50px">学分：{{item.score}}分/人</span></p>
                  </div>
                </div>
                <div style="text-align: center;font-size: 20px;line-height: 109px;" v-if="activityEnd.length === 0">暂无活动~~</div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div class="act-announce">
          <p class="title-an"><span>社团公告</span></p>
          <div class="an_content">
            <ul>
              <li v-for="item in announceInfo.slice(0,10)" :key="item.id" @click="goNews(2,item.id,item.associationId)">
                {{item.title}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              value1: 0,
              assnShow: false,
              value2: 0,
              associationId: 0,
              openImg: true,
              assnDetail: [],
              announceInfo: [],
              pageNo1: 1,
              departList: [],
              departDetailInfo: [],
              pageNo2: 1,
              activityList: [],
              activityEnd: [],
              pageNo3: 1,
              userInfo: [],
              assnDataCount: 0,
              departmentId: null,
              departNum: 0,
              pageNo4: 1,
              userDepart: [],
              loginInfo: [],
              enjoyAct: false,
            }
        },

        created() {
          this.departDetailInfo =[];
          this.associationId = this.$route.query.associationId;
          this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
          if(this.loginInfo.assnBasicList.loginInfo !==0) {
            this.loginInfo.assnBasicList.map(item => {
              if(item.associationId === this.associationId) {
                this.enjoyAct = true;
                return;
              }
            })
          }
          this.assnDetailInfo();   //获取社团详情
          this.getAnnouceInfo();   //获取社团公告
          this.getDepartList();
          this.getActivityList(0);
          // this.getAssnInfo();
        },

        methods: {
          assnDetailInfo() {   //获取社团详情
            let that = this;
            let url = that.BaseConfig + '/selectAssociationById';
            let params = {
              associationId: that.associationId,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.assnDetail = data.data;
                  console.log('社团详情',  that.assnDetail)
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取部门列表
          getDepartList() {
            let that = this;
            let url = that.BaseConfig + '/selectDepartmentAll';
            let params = {
              associationId: that.associationId,
              pageNo: that.pageNo1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.departList = that.departList.concat(data.data.data);
                  let total = data.data.total;
                  if(that.departList.length < total) {
                    that.pageNo1++;
                    that.getDepartList();
                  }
                  console.log('--获取部门列表--', that.departList);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取社团成员人数
          getAssnCount() {
            let that = this;
            let url = that.BaseConfig + '/getAssociationInfoCount';
            let params = {associationId: that.associationId};
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.assnDataCount = data.data;
                  console.log(that.assnDataCount)
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          getDepart(id) {
            this.assnShow = true;
            this.departDetail(id);
            this.getDepartNum();
          },

          getActivity(num) {
            this.pageNo2 = 1;
            this.activityList = [];
            this.activityEnd = [];
            num = parseInt(num);
            this.getActivityList(num);
          },

          //获取部门详情
          departDetail(id) {
            let that = this;
            that.departmentId = id;
            let url = that.BaseConfig + '/selectDepartmentById';
            let params = {
              departmentId: id,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.departDetailInfo = data.data;
                  console.log('--部门详情--', that.departDetailInfo);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取该部门人数
          getDepartNum() {
            let that = this;
            let url = that.BaseConfig + '/getDepartmentUserCount';
            let params = {departmentId : that.departmentId,};
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                console.log('--部门人数--',data)
                if(data.retCode === 0) {
                  that.departNum = data.data;
                }
              })
              .catch(err => {
                that.$Message.error('请求错误！');
              })
          },

          //获取社团公告信息
          getAnnouceInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectNoticeAll';
            let params = {
              associationId: that.associationId,
              type: 0,
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
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取活动列表信息
          getActivityList(num) {
            let that = this;
            let url = that.BaseConfig + '/selectAssnAAll';
            let params = {
              associationId: that.associationId,
              pageNo: that.pageNo2,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.activityList = that.activityList.concat(res.data.data.data);
                  console.log(that.activityList)
                  let total = res.data.data.total;
                  if(that.activityList < total) {
                    that.pageNo2++;
                    that.getActivityList();
                  }
                  if(num === 0) {
                    that.activityEnd = that.activityList;
                  } else if(num === 1) {
                    let time = new Date().getTime();
                    that.activityList.map(item => {
                      let data = new Date(item.endTime).getTime();
                      if(data < time) {
                        that.activityEnd.push({
                          id: item.id,
                          associationId: item.associationId,
                          activityName: item.activityName,
                          address: item.address,
                          content: item.content,
                          endTime: item.endTime,
                          image: item.image,
                          name: item.name,
                          score:item.score,
                          startTime: item.startTime
                        })
                      }
                    })
                  } else if(num === 2) {
                    let time = new Date().getTime();
                    that.activityList.map(item => {
                      let data = new Date(item.endTime).getTime();
                      let data1 = new Date(item.startTime).getTime();
                      if(data1 < time && data >= time) {
                        that.activityEnd.push({
                          id: item.id,
                          associationId: item.associationId,
                          activityName: item.activityName,
                          address: item.address,
                          content: item.content,
                          endTime: item.endTime,
                          image: item.image,
                          name: item.name,
                          score:item.score,
                          startTime: item.startTime
                        })
                      }
                    })
                  } else if(num === 3){
                    let time = new Date().getTime();
                    that.activityList.map(item => {
                      let data = new Date(item.startTime).getTime();
                      if(data >= time) {
                        that.activityEnd.push({
                          id: item.id,
                          associationId: item.associationId,
                          activityName: item.activityName,
                          address: item.address,
                          content: item.content,
                          endTime: item.endTime,
                          image: item.image,
                          name: item.name,
                          score:item.score,
                          startTime: item.startTime
                        })
                      }
                    })
                  }
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          goNews(flag, id,assnId) {
            this.$router.push({
              path: '/index/web/news',
              query: {
                flag: flag,
                annouceId: id,
                associationId: assnId
              }
            })
          },

          //参加活动
          joinAct(id,associationId) {
            let that = this;
            let url = that.BaseConfig + '/joinActivity';
            let params = {
              associationId: associationId,
              activityId: id,
              userId: this.loginInfo.id
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.$Message.success('参加活动成功！')
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
.webIndex {
  width: 67%;
  /*!*min-width: 800px;*!   为了不不变形要设置最小宽度*/
  text-align: left;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .rel-ours {
    display: flex;
    justify-content: space-between;
    .img {
      width: 49%;
      height: 300px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ours-cont {
    width: 49%;
    height: 300px;
    position: relative;
    .content {
      font-size: 18px;
      line-height: 30px;
      text-indent: 2em;
    }
    .cont-detail {
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  .depart-sort {
    margin: 30px 0;
    height: 300px;
    .sort-content {
      .depart-loop {
        display: flex;
        margin-top: 10px;
        div {
          position: relative;
          width: 24%;
          margin-right: 10px;
          height: 240px;
          background: url("./img/st.jpg") no-repeat;
          background-size: 100% 100%;
          .d-title {
            height: 40px;
            line-height: 40px;
            background-color: #107df3;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 2px;
            text-align: center;
          }
          .d-hover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: rgba(0,0,0,0.6);
            color: #ffffff;
            p {
              line-height: 30px;
              letter-spacing: 1px;
              &:nth-child(1) {
                font-size: 18px;
              }
            }
          }
        }
      }
    }
  }
  .assn-activity {
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    .act-r {
      width: 77%;
    }
    .act-right {
      width: 100%;
      margin: 0 auto;
      height: 600px;
      overflow: hidden;
      overflow-y: scroll;
      border: 1px solid #ccc;
      padding: 12px;
      .act-detail {
        margin: 18px 5px;
        height: 160px;
        display: flex;
        /*justify-content: space-between;*/
        .det-img {
          width: 140px;
          text-align: center;
          img {
            width: 140px;
            height: 92%;
            margin-top: 5px;
            border-radius: 5px;
          }
        }
        .det-cont {
          padding-left: 10px;
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
    .act-announce {
      width: 20%;
      .title-an {
        color: #107df3;
        letter-spacing: 3px;
        font-weight: 600;
        font-size: 18px;
        line-height: 35px;
        border-bottom: 2px solid #107df3;
        text-align: right;
        span {
          display: inline-block;
          height: 35px;
          border-bottom: 2px solid #f38735;
        }
      }
      .an_content {
        li {
          display: block;
          height: 24px;
          line-height: 24px;
          text-align: right;
        }
      }
    }
  }
}
.title {
   color: #107df3;
   letter-spacing: 3px;
   font-weight: 600;
   font-size: 18px;
   line-height: 35px;
   border-bottom: 2px solid #107df3;
   span {
     display: inline-block;
     height: 35px;
     border-bottom: 2px solid #f38735;
   }
 }
</style>
