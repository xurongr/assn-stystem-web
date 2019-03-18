<template>
  <div>
    <div class="annouce-manage">
      <div style="display: flex">
        <Select v-model="sortValue" style="width:150px">
          <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <!--<div style="width: 270px;margin-left: 3px"><Input search enter-button="搜索" placeholder="输入要查找的内容" v-model="searchValue" @click="searchAct"/></div>-->
        <Select v-model="searchValue" style="width:200px">
          <Option v-for="item in searchInfo" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="primary" @click="searchAct">搜索</Button>
      </div>
      <Router-link to="/index/activityManage/addActivity">
        <Button type="primary">创建活动</Button>
      </Router-link>
    </div>
    <!--<div style="margin: 25px 0 10px" v-if="loginInfo.identityId === 0">-->
      <!--所属社团：-->
      <!--<Select v-model="searchAssnValue" style="width:200px">-->
        <!--<Option v-for="item in searchAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
      <!--</Select>-->
    <!--</div>-->
    <Table border ref="selection" :columns="columns4" :data="activityList"></Table>
    <Modal
      v-model="modal3"
      title="活动内容"
      :footer-hide="true"
    >
      <p>{{anContent}}</p>
    </Modal>
    <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginInfo: '',    //用户登录信息
        activityList: [],    //活动列表
        modal3: false,      //是否查看内容
        anContent:'',        //活动内容详情
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
            width: 310
          },
          {
            title: '负责人',
            key: 'name'
          },
          {
            title: '活动地点',
            key: 'address'
          },
          {
            title: '活动图片',
            key: 'image'
          },
          {
            title: '学分/人',
            key: 'score'
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
                      this.anContent = params.row.content;
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
                      this.remove(params.index)
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
        pageNo:0,
        current: 1,
        searchValue: '',     //查找内容
        searchInfo: [],      //选择内容
        pageNo1: 0,          //获取社团列表pageNo1
        associationList: [],  //社团列表
        searchAssnValue: '',
        searchAssnList: [],
      }
    },

    created() {
      this.loginInfo = JSON.parse(window.localStorage.getItem("loginInfo"));
      this.getActivityList();
      this.getAssnList();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },

      //获取活动列表信息
      getActivityList() {
        let that = this;
        let url = that.BaseConfig + '/selectAssnAAll';
        let params = {
          pageNo: that.pageNo,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params , data, 'GET')
          .then(res =>{
            if(res.data.retCode === 0) {
              that.activityList = res.data.data.data;
              console.log(that.activityList)
            } else {
              that.$Message.error(res.data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //搜索活动(活动标题、负责人)
      searchAct() {
        let that = this;
        let url = that.BaseConfig + '/selectAssnAAll';
        let params;
        if(that.sortValue === 'associationId') {
////             获取社团列表
//          that.getAssnList();
//          params = {
//            associationId: that.searchValue,
//            pageNo: that.pageNo,
//            pageSize: 10
//          }
        } else if(that.sortValue === 'userId') {
//          获取用户列表
        }
        let data = null;
//        that
//          .$http(url, params , data, 'get')
//          .then(res =>{
//            console.log(res)
//            data = res.data;
//            if(data.retCode === 0) {
//              that.userInfo = data.data.data;
//              that.total = data.data.total;
//            }
//          })
//          .catch(err => {
//            that.$Message.error('请求错误');
//          })
      },

      //获取社团列表
      getAssnList(done) {
        let that = this;
        let url = that.BaseConfig + '/selectAssociationAll';
        let params = {
          pageNo1: that.pageNo1,
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
            done?done():null;
          })
          .catch(err => {
            that.$Message.error('请求错误');
            done?done():null;
          })
      },

    },
  }
</script>

<style lang="less" scoped>
  .annouce-manage {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  /deep/ .ivu-table-cell {
    white-space: nowrap;
    /*-webkit-line-clamp: 3;*/
  }
</style>
