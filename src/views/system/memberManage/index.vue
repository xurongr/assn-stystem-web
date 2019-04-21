<template>
  <div>
    <Tabs type="card" @on-click="tabChange">
      <TabPane label="社团成员">
        <div class="user-manage">
          <Button type="primary" @click="addAssnUser(1)">添加成员</Button>
          <div style="display: flex">
            <div style="width: 340px"><Input search enter-button="搜索" placeholder="输入要查找的内容" /></div>
          </div>
        </div>
        <!--管理员可以选择社团查看社团成员-->
        <div style="margin-top:10px; margin-bottom: 10px;position: relative" v-if="identityId === 0">
          选择社团：
          <Select v-model="associationId" @on-change="getInfo" style="width:150px">
            <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
        <div style="margin-top: 20px; display: flex;justify-content: flex-end">
          <Page :total="total" :key="total" :current.sync="current" :on-change="pageChange" />
        </div>
      </TabPane>

      <TabPane label="部门成员">
        <div class="user-manage">
          <Button type="primary" @click="addAssnUser(2)">添加部门成员</Button>
          <div style="display: flex">
            <div style="width: 340px"><Input search enter-button="搜索" placeholder="输入要查找的内容" /></div>
          </div>
        </div>
        <!--管理员可以选择社团查看社团成员-->
        <div style="margin-top:10px; margin-bottom: 10px;position: relative" v-if="identityId === 0">
          选择社团：
          <Select v-model="associationId" @on-change="getInfo" style="width:150px">
            <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          &nbsp;&nbsp;&nbsp;选择部门：
          <Select v-model="departId" @on-change="getDepartInfo" style="width:150px">
            <Option v-for="item in departListSel" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
        <div style="margin-top: 20px; display: flex;justify-content: flex-end">
          <Page :total="total" :key="total" :current.sync="current" :on-change="pageChange" />
        </div>
      </TabPane>
    </Tabs>
    <!--&lt;!&ndash;删除活动&ndash;&gt;-->
    <!--<Modal v-model="modalDel" width="360">-->
      <!--<p slot="header" style="color:#f60;text-align:center">-->
        <!--<Icon type="ios-information-circle"></Icon>-->
        <!--<span>删除确认</span>-->
      <!--</p>-->
      <!--<div style="text-align:center">-->
        <!--<p>确认删除该成员？</p>-->
      <!--</div>-->
      <!--<div slot="footer">-->
        <!--<Button type="error" size="large" long @click="delDepart">删除</Button>-->
      <!--</div>-->
    <!--</Modal>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
        pageNo: 1,
        pageNo1: 1,
        pageNo2: 1,
        pageNo3: 3,
        current: 1,
        total:0,           //获取用户列表total
        assnInfo: [],      //社团列表
        departList: [],    //部门列表
        departListSel: [],    //部门列表
        sortList: [
          {
            value: 'userName',
            label: '学号'
          },
          {
            value: 'name',
            label: '姓名'
          },
        ],    //查找条件
        sortValue:'',
        sortAssnList: [],    //查找社团-管理员
        userId: null,
        associationId: null,
        identityId: null,
        departId: null,
        tab: 0,             //0-社团成员  1-部门成员
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '部门',
            key: 'departmentName',
            render: (h,params) => {
              return h('p',params.row.departmentName === null ? '无' : params.row.departmentName)
            }
          },
          {
            title: '职务',
            key: 'job',
            render: (h,params) => {
              return h('p',params.row.job === null ? '无' : params.row.job)
            }
          },
          {
            title: '联系方式',
            key: 'telNumber'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
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
                      console.log(params.row)

                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.cancelUser(params.row.id,params.row.associationId,params.row.departmentId);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
      }
    },

    created() {
      this.userId = this.$store.state.loginInfo.id;
      this.identityId = this.$store.state.loginInfo.identityId;
      if(this.identityId === 0) {
        this.associationId = null;
        this.$Message.warning('请先选择社团');
      } else {
        let assnBasicList = this.$store.state.loginInfo.assnBasicList;
        assnBasicList.map(item => {
          if(item.job === '会长' || item.job === '部长') {
            this.associationId =  item.associationId;
            this.getInfo();
          }
        });
      }
      this.getAssnInfo();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },

      tabChange(name) {
        this.tab = name;
        this.getAssnInfo();
      },

      //进入添加成员页面
      addAssnUser(num) {
        if(this.associationId === null ||this.associationId === 'undefined') {
          this.$Message.warning('请先选择社团');
        } else{
          if(num === 2 && this.departId === null) {
            this.$Message.warning('请选择部门');
            return;
          }
          this.$router.push({
            path: '/index/memberManage/addMenber',
            query: {
              associationId: this.associationId,
              flag: num,
            }
          })
        }
      },

      //获取社团成员列表
      getInfo() {
        let that = this;
        that.getDepartList();
        let url = that.BaseConfig + '/selectAssociationUserAll';
        let params = {
          associationId: that.associationId,
          pageNo: that.pageNo,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              console.log('--部门成员--',data.data);
              that.userInfo = data.data.data;
              that.total = data.data.total;
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //获取社团列表
      getAssnInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectAssociationAll';
        let params = {
          pageNo: that.pageNo1,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            console.log(data)
            if(data.retCode ===0) {
              that.assnInfo = that.assnInfo.concat(data.data.data);
              that.assnInfo.map(item =>{
                that.sortAssnList.push({
                  value: item.id,
                  label: item.associationName,
                });
              })
              console.log(that.sortAssnList)
              if(that.assnInfo.length < data.data.total) {
                that.pageNo1++;
                that.getAssnInfo();
              }
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //获取部门列表
      getDepartList() {
        let that = this;
        if(that.associationId === null) {
          that.$Message.warning('请先选择社团!');
        } else {
          let url = that.BaseConfig + '/selectDepartmentAll';
          let params = {
            associationId: that.associationId,
            pageNo: that.pageNo2,
            pageSize: 10,
          };
          let data = null;
          that
            .$http(url, params, data, 'get')
            .then(res => {
              data = res.data;
              console.log('--获取部门列表--', data);
              if(data.retCode ===0) {
                that.departList = that.departList.concat(data.data.data);
                if(that.departList.length < data.data.total) {
                  that.pageNo2++;
                  that.getDepartList();
                }
                that.departList.map((item,index) => {
                  that.departListSel.push({
                    value: item.id,
                    label: item.departmentName
                  })
                })
              }
            })
            .catch(err => {
              that.$Message.error('请求错误');
            })
        }
      },

      //获取社团部门成员列表
      getDepartInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectAssociationUserAll';
        let params = {
          associationId: that.associationId,
          departmentId: that.departId,
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
              that.userInfo = data.data.data;
              that.total = data.data.total;
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //删除用户-从社团剔除用户
      cancelUser(userId, associationId, departmentId) {
        let that = this;
        let url = that.BaseConfig + '/deleteUserInAssociation';
        let params;
        if(that.tab === 0) {
          params = {
            userId: userId,
            associationId: associationId,
          }
        } else {
          params = {
            userId: userId,
            associationId: associationId,
            departmentId: departmentId
          }
        }
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            console.log(res)
            data = res.data;
            if(data.retCode === 0) {
               that.$Message.success('删除成功!');
               that.getInfo();
               that.getDepartInfo();
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
  .user-manage {
    margin-bottom: 20px;display: flex;justify-content: space-between;
  }
  /deep/ .ivu-select-dropdown {
    top:28px !important;
  }
</style>
