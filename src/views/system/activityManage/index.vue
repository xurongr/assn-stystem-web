<template>
  <div>
    <div class="search-title">
      <div v-if="type !== 1">
        <p>所属社团：</p>
        <Select v-model="searchAssnValue"  style="width:150px;margin-top: 8px">
          <Option v-for="item in searchAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div><p>活动标题：</p><Input placeholder="关键字模糊搜索" v-model="activityName" style="width: 140px;margin-top: 8px" /></div>
    </div>
    <div class="annouce-manage">
      <Button type="primary" @click="searchActivity">查询</Button>
      <Router-link to="/index/activityManage/addActivity">
        <Button type="primary">创建活动</Button>
      </Router-link>
    </div>
    <Table border ref="selection" :columns="columns4" :data="activityList"></Table>
    <div style="display: flex;justify-content: flex-end;margin-top:10px"><Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" /></div>
    <Modal
      v-model="modal3"
      :title="activityDetail.activityName"
      :footer-hide="true"
    >
      <div class="act-detail">
        <p><span>活动内容：</span>{{activityDetail.content}}</p>
        <p><span>活动地点：</span>{{activityDetail.address}}</p>
        <p><span>活动时间：</span>{{activityDetail.startTime}} ~ {{activityDetail.endTime}}</p>
        <p><span>活动图片：</span>
          <span v-for="(item,index) in imageUser" :key="index">
            <img :src="item">
          </span>
        </p>
      </div>
    </Modal>

    <!--删除活动-->
    <Modal v-model="modalDel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认删除该条活动？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="delDepart">删除</Button>
      </div>
    </Modal>

    <!--活动参与人员-->
    <Modal
      v-model="modal7"
      title="参与活动人员名单"
      >
      <div v-for="(item,index) in actUserAllList" :key="index">
        <p>{{item.name}}</p>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        access: [],
        type: 4,
        activityName: '',
        loginInfo: '',    //用户登录信息
        activityList: [],    //活动列表
        modal3: false,      //是否查看内容
        associationActivityId: null,
        activityDetail: [],
        modalDel: false,
        modal7: false,
        imageUser: [],
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '活动标题',
            key: 'activityName',
          },
          {
            title: '活动内容',
            key: 'content',
          },
          {
            title: '负责人',
            key: 'name',
            width: 80
          },
          {
            title: '活动地点',
            key: 'address'
          },
          {
            title: '活动图片',
            key: 'image',
            align: 'center',
            render: (h,params) =>{
              let images = params.row.image.split(',');
              return h('img',{
                attrs: {
                  src: images[0],style: 'width: 76px;height: 74px; padding-top: 2px;border-radius: 2px;'
                }
              })
            }
          },
          {
            title: '学分',
            key: 'score',
            width: 60,
          },
          {
            title: '所属社团',
            key: 'associationName'
          },
          {
            title: '开始时间',
            key: 'startTime'
          },
          {
            title: '结束时间',
            key: 'endTime'
          },
          {
            title: '参与名单',
            render: (h,params) => {
              return h('div',[
                h('p', {
                  style: {
                    marginRight: '5px',
                    color: 'blue'
                  },
                  on: {
                    click: () => {
                      this.modal7 = true;
                      this.getActUserAll(params.row.id,params.row.associationId);
                    }
                  }
                }, '查看'),
              ])
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.activityDetail = params.row;
                      this.imageUser = this.activityList[0].image.split(',');
                      this.modal3 = true;
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: '/index/activityManage/editActivity',
                        query: {
                          associationActivityId: params.row.id,
                        }
                      })
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.associationActivityId = params.row.id;
                      this.modalDel = true;
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        sortList: [
          {
            value: 'userId',
            label: '负责人'
          },
        ],    //查找条件
        sortValue:'',       //查找值
        total: 0,           //活动总条数
        pageNo:1,
        pageNo3: 1,
        current: 1,
        searchValue: '',     //查找内容
        searchInfo: [],      //选择内容
        pageNo1: 1,          //获取社团列表pageNo1
        associationList: [],  //社团列表
        searchAssnValue: '',
        searchAssnList: [],
        actUserAllList: [],    //某活动参与人员列表
      }
    },

    created() {
      this.access = JSON.parse(localStorage.getItem('access'));
      this.type = parseInt(localStorage.getItem('type'));
      this.loginInfo = JSON.parse(window.localStorage.getItem("loginInfo"));
      if(this.type === 0) {
        this.getAssnList();
      } else if(this.type === 1) {
        this.searchAssnValue = this.access[0].associationId;
        this.getActivityList();
      } else if(this.type === 2) {
        this.searchAssnValue = this.access[0].associationId;
        this.access.map(item => {
          this.searchAssnList.push({
            value: item.associationId,
            label: item.associationName,
          })
        })
      }
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getActivityList();
      },

      searchActivity() {
        this.pageNo = 1;
        this.getActivityList();
      },

      //获取活动列表信息
      getActivityList() {
        let that = this;
        let url = that.BaseConfig + '/selectAssnAAll';
        let params = {
          activityName: that.activityName,
          associationId: that.searchAssnValue,
          pageNo: that.pageNo,
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

      //获取社团列表
      getAssnList() {
        let that = this;
        let url = that.BaseConfig + '/selectAssociationAll';
        let params = {
          pageNo: that.pageNo1,
          pageSize: 10
        };
        let data = null;
        that
          .$http(url, params , data, 'GET')
          .then(res =>{
            data = res.data;
            if(data.retCode === 0) {
              that.associationList = that.associationList.concat(data.data.data);
              that.associationList.map(item =>{
                that.searchAssnList.push({
                  value: item.id,
                  label: item.associationName
                });
              });
              if(that.associationList.length < data.data.total) {
                that.pageNo1++;
                that.getAssnList();
              }
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //获取某活动参与人员
      getActUserAll(activityId, associationId ) {
        let that = this;
        let url = that.BaseConfig + '/selectActivityUserAll';
        let params = {
          activityId: activityId,
          associationId: associationId,
          pageNo: that.pageNo3,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params , data, 'GET')
          .then(res =>{
            if(res.data.retCode === 0) {
              that.actUserAllList = that.actUserAllList.concat(res.data.data.data);
              if(that.actUserAllList< res.data.data.total) {
                that.pageNo3++;
                that.getActUserAll();
              }
            } else {
              that.$Message.error(res.data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //删除活动
      delDepart() {
        let that = this;
        let url = that.BaseConfig + '/deleteAssnA';
        let params = {associationActivityId: that.associationActivityId,};
        that
          .$http(url, params , '', 'GET')
          .then(res =>{
            console.log(res)
            if(res.data.retCode === 0) {
              that.$Message.success('活动删除成功！');
              that.modalDel = false;
              that.getActivityList();
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
  .annouce-manage {
    margin: 10px 0;
    display: flex;
    button {
      margin-right: 15px;
    }
  }
  /deep/ .ivu-table-cell {
    white-space: nowrap;
    /*-webkit-line-clamp: 3;*/
  }
  .act-detail {
    p {
      line-height: 30px;
      span {
        font-weight: 600;
      }
      img {
        width: 450px;
        height: 230px;
      }
    }
  }
</style>
