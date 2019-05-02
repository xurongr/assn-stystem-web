<template>
  <div>
    <div class="search-title">
      <div v-if="type !== 1">
        <p>选择社团：</p>
        <Select v-model="associationId" @on-change="getDepartLists" style="width:150px;margin-top: 8px">
          <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div v-if="type.job !== '部长'">
        <p>选择部门：</p>
        <Select v-model="departmentId" style="width:150px;margin-top: 8px">
          <Option v-for="item in departListSel" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div><p>学号：</p><Input placeholder="关键字模糊搜索" style="width: 140px;margin-top: 8px" v-model="userName"/></div>
      <div><p>用户名称：</p><Input style="width: 140px;margin-top: 8px" v-model="name"/></div>
      <!--<div>-->
        <!--<p>身份状态：</p>-->
        <!--<Select v-model="identityId" style="width:200px;margin-top: 8px">-->
          <!--<Option v-for="item in identityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        <!--</Select>-->
      <!--</div>-->
    </div>
    <div class="user-manage">
      <Button type="primary" @click="searchUser">查询</Button>
      <Button type="primary" @click="addAssnUser(1)">添加成员</Button>
      <!--<Button type="error" @click="cancelUser">移出社团</Button>-->
      <!--<Button type="error" @click="cancelUser">移出部门</Button>-->
    </div>
    <Table border ref="selection" :columns="columns4" :data="userInfo" @on-row-click="theInfo" :highlight-row="true"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" :on-change="pageChange" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        access: [],
        type: 4,
        name: '',
        userName: '',
        userInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
        pageNo: 1, pageNo1: 1, pageNo2: 1, pageNo3: 3,
        current: 1,
        total:0,           //获取用户列表total
        associationId: 0,
        assnInfo: [],      //社团列表
        sortAssnList: [
          {
            value: 0,
            label: '全部'
          }
        ],
        departmentId: 0,
        departList: [],           //部门列表
        departListSel: [
          {
            value: 0,
            label: '全部'
          }
        ],
        userId: null,
        delUserId: null,
        departId: null,
        columns4: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '职务',
            key: 'job',
            align: 'center',
            render: (h,params) => {
              return h('p',params.row.job === null ? '社团成员' : params.row.job)
            }
          },
          {
            title: '成员资料',
            align: 'center',
            render: (h,params) => {
              return h('div', [
                h('p', {
                  style: {
                    color: 'blue'
                  },
                  on: {
                    click: () => {
                      console.log(params.row)
                    }
                  }
                }, '查看'),
              ]);
            }
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
                      this.cancelUser(params.row.userId,params.row.associationId,params.row.departmentId);
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
      this.access = JSON.parse(localStorage.getItem('access'));
      this.type = parseInt(localStorage.getItem('type'));
      this.userId = JSON.parse(localStorage.getItem('loginInfo')).id;
      if(this.type === 0) {
        this.associationId = null;
        this.$Message.warning('请先选择社团');
        this.getAssnInfo();
      } else if(this.type === 1){
        this.associationId = this.access[0].associationId;
        this.getDepartLists();
        this.getInfo();
      } else if(this.type === 2) {
        this.associationId = this.access[0].associationId;
        this.getInfo();
        this.access.map(item => {
          this.sortAssnList.push({
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
        this.getInfo();
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

      searchUser() {  //查询
        this.pageNo = 1;
        if(this.departmentId === 0) {
          this.getInfo();
        } else {
          this.getDepartInfo();
        }
      },

      //获取成员列表
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectAssociationUserAll';
        if(0 === that.associationId || null == that.associationId || undefined === that.associationId) {
          that.$Message.warning('请先选择社团');
          return;
        }
        let associationId;
        that.associationId === 0? associationId = '' : associationId = that.associationId;
        let params = {
          name: that.name,
          userName: that.userName,
          associationId: associationId,
          pageNo: that.pageNo,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
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

      //获取社团部门成员列表
      getDepartInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectDepartmentUserAll';
        if(0 === that.associationId || null == that.associationId || undefined == that.associationId) {
          that.$Message.warning('请先选择社团');
          return;
        }
        let departmentId;
        that.departmentId === 0 ? departmentId = '' : departmentId = that.departmentId;
        that.departmentId === undefined ? departmentId = '' : departmentId = that.departmentId;
        let params = {
          associationId: that.associationId,
          departmentId: departmentId,
          pageNo: that.pageNo,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
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
            if(data.retCode ===0) {
              that.assnInfo = that.assnInfo.concat(data.data.data);
              that.assnInfo.map(item =>{
                that.sortAssnList.push({
                  value: item.id,
                  label: item.associationName,
                });
              })
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

      getDepartLists() {
        this.pageNo2 = 1;
        this.departList = [];
        this.departListSel = [
          {
            value: 0,
            label: '全部'
          }
        ];
        this.getDepartList();
      },

      //获取部门列表
      getDepartList() {
        let that = this;
        if(that.associationId === null || that.associationId === undefined) {
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

      theInfo(info) {
        this.delUserId = info.userId;
      },

      //删除用户-从社团剔除用户
      cancelUser(userId,associationId) {
        let that = this;
        let url = that.BaseConfig + '/deleteUserInAssociation';
        let params = {
          userId: userId,
          associationId: associationId,
        }
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
               that.$Message.success('成功移出!');
               that.pageNo = 1;
               if(that.departmentId === 0 ) {
                 that.getInfo();
               } else {
                 that.getDepartInfo();
               }
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
    margin: 10px 0 15px;display: flex;
    button {
      margin-right: 15px;
    }
  }
</style>
