<template>
    <div class="webIndex">
      <div class="assn-view">
        <div class="assn-we">
          <div class="we-title">
            <img src="./img/tu1.jpg">
            <p>{{assnDetail.associationName}}</p>
          </div>
          <div style="display: flex">
            <div class="we-cont">
              <p>关于我们</p>
              <p>{{assnDetail.content}}</p>
            </div>
          </div>
        </div>
        <div class="assn-announce">
          <div class="assn-announce-bgUrl">
            <div>
              <p>舍长：{{assnDetail.name}}</p>
              <p>创社时间：{{assnDetail.createTime}}</p>
              <p>招募状态：{{assnDetail.recruitState === 0 ? '招募中' : '招募未开启'}}</p>
              <p>社团地址：{{assnDetail.address}}</p>
              <p>社团人数：{{assnDataCount}}</p>
            </div>
          </div>
        </div>
      </div>
      <Progress :percent="100" status="active" />
      <div class="assn-center" v-if="announceInfo.length !== 0">
        <div class="c-announce">
          <div class="announce-title">
            <p>社团公告</p>
          </div>
          <div class="an_content">
            <ul>
              <li v-for="item in announceInfo.slice(1,10)" :key="item.id">
                {{item.title}}
              </li>
            </ul>
          </div>
        </div>
        <div class="c-depart">
          <div class="content-new">
            <p>最新</p>
            <p>{{announceInfo[0].title}}</p>
            <p>{{announceInfo[0].content}}</p>
            <p >{{announceInfo[0].createTime}}</p>
          </div>
        </div>
      </div>
      <div class="assn-center" v-if="announceInfo.length === 0" style="font-size: 25px;line-height: 100px;justify-content: center">暂无公告~</div>
      <Progress :percent="100" status="active" />
      <div class="depart-cont">
        <div class="depart-cont-left">
          <Card style="width:330px;height: 330px; background: #f6f6f6;">
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              部门分类
            </p>
            <div class="depart-name">
              <p v-for="(item,dx) in departList" :key="dx" @click="getDepart(item.id)">
                <span>{{item.departmentName}}</span>
                <a>更多>></a>
              </p>
            </div>
          </Card>
        </div>
        <Card style="width:350px; height: 330px;background: #f6f6f6;">
          <div class="depart-detail" v-if="departmentId === null">
              <p style="text-align: center;font-size: 20px;font-weight: 600;padding-top: 20px">请选择部门，查看详情</p>
          </div>
          <div class="depart-detail" v-if="departmentId !== null">
            <p>{{departDetailInfo.departmentName}}
              <span>{{departNum}}人</span></p>
            <p><span style="color: #000">简介：</span>{{departDetailInfo.content}}</p>
            <p><span style="color: #000">部长：</span>{{departDetailInfo.ministerUserName}}</p>
            <p><span style="color: #000">创建时间：</span>{{departDetailInfo.createTime}}</p>
          </div>
        </Card>
        <Card style="width:350px;height: 330px; background: #f6f6f6;">
          <div class="depart-detail" v-if="departmentId === null">
            <p style="text-align: center;font-size: 20px;font-weight: 600;padding-top: 20px">该部门暂无成员~~</p>
          </div>
          <div class="depart-detail" v-if="departmentId !== null" style="text-align: center">
            <p>成员名单</p>
            <p v-for="(item, index1) in userDepart" :key="index1">{{item.name}}</p>
          </div>
        </Card>
      </div>
      <Progress :percent="100" status="active" />
      <div class="assn-activity">
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
                <div class="det-img"><img src="./img/tu2.jpg" /></div>
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
          </Tabs>
        </div>
      </div>
    </div>
</template>

<script>
  // var echarts = require('echarts');
  import slider from 'vue-concise-slider'
    export default {
      components: {
        slider
      },
        data() {
            return {
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
            }
        },

      created() {
          this.departDetailInfo =[];
          this.associationId = this.$route.query.associationId;
          this.assnDetailInfo();   //获取社团详情
          this.getAnnouceInfo();   //获取社团公告
          this.getDepartList();
          this.getActivityList(0);
          this.getAssnInfo();
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
            this.departDetail(id);
            this.getDepartNum();
            this.getInfo();
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

          getActivity(num) {
            this.pageNo2 = 1;
            this.activityList = [];
            this.activityEnd = [];
            num = parseInt(num);
            this.getActivityList(num);
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

          //获取社团成员列表
          getAssnInfo() {
          let that = this;
          let url = that.BaseConfig + '/selectAssociationUserAll';
          let params = {
            associationId: that.associationId,
            pageNo: that.pageNo3,
            pageSize: 10,
          };
          let data = null;
          that
            .$http(url, params, data, 'get')
            .then(res => {
              data = res.data;
              if(data.retCode === 0) {
                console.log('--部门成员--',data.data);
                that.userInfo = that.userInfo.concat(data.data.data);
                let total = data.data.total;
                if(that.userInfo.length < total) {
                  that.pageNo3++;
                  that.getDepartInfo();
                }
              } else {
                that.$Message.error(data.retMsg);
              }
            })
            .catch(err => {
              that.$Message.error('请求错误');
            })
        },

        //获取部门成员列表
        getInfo() {
          let that = this;
          let url = that.BaseConfig + '/selectDepartmentUserAll';
          let params = {
            associationId: that.associationId,
            departmentId: that.departmentId,
            pageNo: that.pageNo4,
            pageSize: 10,
          };
          let data = null;
          that
            .$http(url, params, data, 'get')
            .then(res => {
              data = res.data;
              if(data.retCode === 0) {
                that.userDepart = that.userDepart.concat(data.data.data);
                let total = data.data.total;
                if(that.userDepart.length < total) {
                  that.pageNo4++;
                  that.getInfo();
                }
                console.log('--部门成员--',that.userDepart);
              } else {
                that.$Message.error(data.retMsg);
              }
            })
            .catch(err => {
              that.$Message.error('请求错误');
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
    /*!*min-width: 800px;*!   为了不不变形要设置最小宽度*/
    text-align: left;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    .viewImg {
      width: 100%;
      border-radius: 10px;
      img {
        border-radius: 10px;
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
        height: 380px;
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
        height: 380px;
        position: relative;
        overflow: hidden;
        &-bgUrl {
          position: absolute;
          top: -34px;
          right: -30px;
          width: 100%;
          height: 100%;
          background: url("./img/icon_1.png") no-repeat;
          background-size: 100% 100%;
          div {
            position: absolute;
            top: 42%;
            left: 12%;
            width: 70%;
            height: 58%;
            -webkit-transform: rotate(8deg);
            /* transform: rotate(6deg); */
            border-radius: 5px;
            p {
              line-height: 30px;
            }

          }
        }
      }
    }
    .assn-center {
      margin: 15px 0;
      width: 100%;
      height: 200px;
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
      }
      .c-depart {
        width: 71%;
        display: flex;
        /*background-color: #f6f6f6;*/
        .depart-right {
          width: 100%;
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
            padding-bottom: 20px;
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
            justify-content: space-around;
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
              &:nth-child(n) {
                margin-top: 5px;
              }
              &:nth-child(n+1) {
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
    .assn-activity {
      margin: 15px auto;
      display: flex;
      .act-right {
        width: 97.5%;
        margin: 0 auto;
        height: 768px;
        overflow: hidden;
        overflow-y: scroll;
        border: 1px solid #ccc;
        padding: 12px;
        .act-detail {
          margin: 18px 5px;
          height: 150px;
          display: flex;
          /*justify-content: space-between;*/
          .det-img {
            width: 140px;
            text-align: center;
            img {
              .box(140px, 90%);
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
    }
  }
  .inner-container {
    animation: myMove 5s linear infinite;
    animation-fill-mode: forwards;
    text-align: center;
  }
  /*文字无缝滚动*/
  @keyframes myMove {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-150px);
    }
  }

  .depart-cont {
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
    color: #000;
    &-left {
      .depart-name {
        p {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed #ccc;
          line-height: 30px;
          font-size: 15px;
          a {
            color: blue;
          }
        }
      }
    } .depart-detail {
        width: 85%;
        margin: 0 auto;
        font-size: 15px;
        letter-spacing: 1px;
        line-height: 30px;
        overflow:hidden;
        overflow-y: scroll;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:5;
    p {
      line-height: 30px;
      padding-bottom: 10px;
      &:nth-child(1) {
        font-size: 18px;
        text-align: center;
        color: #000;
        font-weight: 600;
        span {
          padding-left: 10px;
          font-size: 15px;
          color: #444;
        }
      }
    }
      }

    &-right {

    }
  }

  .content-new {
    .box(90%, 200px);
    margin: 10px auto;
    border: 1px dashed #f10f19;
    border-radius: 5px;
    padding: 10px;
    position: relative;
    overflow: hidden;
    font-size: 15px;
    line-height: 30px;
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
</style>
