<template>
  <div>
    <div class="search-title">
      <div v-if="type !== 1">
        <p>所属社团：</p>
        <Select v-model="associationId"  style="width:150px;margin-top: 8px">
          <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div v-if="type === 1">
        <p>所属社团：</p>
        <Select v-model="associationId"  style="width:150px;margin-top: 8px" disabled>
          <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <div class="assn-manage">
      <Button type="primary" @click="searchDepart" v-if="type !== 1">查询</Button>
      <Button type="primary" @click="addDepart">添加部门</Button>
    </div>
    <Table border ref="selection" :columns="columns4" :data="departList"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>

    <Modal
      v-model="modalMem"
      title="部门成员列表"
     >
      <div>
        <p v-for="item in departMember" :key="item.id">
          {{item.name}}
        </p>
      </div>
    </Modal>

    <!--编辑部门信息-->
    <Modal
      v-model="modal1"
      title="编辑部门信息"
      @on-ok="ok">
      <div>
        <Form :model="formItem" :label-width="80">
          <FormItem label="部门名称：">
            <Input v-model="formItem.departmentName" ></Input>
          </FormItem>
          <FormItem label="部长学号：">
            <Input v-model="userName" @on-change="searchUsers" placeholder="请输入学号，如：2015102210"></Input>
          </FormItem>
          <FormItem label="部长名字：">
            <Input v-model="formItem.ministerUserName" disabled></Input>
          </FormItem>
          <FormItem label="部门介绍：">
            <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="在此输入部门简介..."></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!--删除部门-->
    <Modal v-model="modalDel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>该部门属于<span style="color: red">{{formItem.associationName}}</span>,部门现有<span style="color: red">{{departNum}}</span>人。</p>
        <p>是否确认删除<span style="color: red">{{formItem.departmentName}}</span>?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="delDepart">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNo1:1,
        assnInfo: [],       // 社团列表
        pageNo:1,
        pageNo2: 1,
        total: 0,
        current: 1,
        departList: [],   //部门列表
        formItem: {
          id: null,
          associationId: null,
          departmentName: '',
          content: '',
          ministerUserId: null,
          ministerUserName: '',
          createTime: new Date().getTime(),
        },
        userName: '',
        identityId: null,
        sortAssnList: [],    //查找社团-管理员
        associationId: '',  //社团id
        modal1: false,
        modalDel: false,
        departNum: 0,
        departMember: [],
        modalMem: false,
        access: [],
        type: 4,
        columns4: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
            width: 80,
          },
          {
            title: '部门名称',
            key: 'departmentName',
            align: 'center',
          },
          {
            title: '部长',
            key: 'ministerUserName',
            align: 'center',
          },
          {
            title: '部门简介',
            key: 'content',
            width: 440,
            align: 'center',
          },
          {
            title: '部门成员',
            align: 'center',
            render: (h,params) => {
              return h('div',[
                h('p', {
                  style: {
                    color: 'blue'
                  },
                  on: {
                    click: () => {
                      this.getDepartMem(params.row.id,params.row.associationId);
                    }
                  }
                }, '查看'),
              ])
            }
          },
          {
            title: '操作',
            key: 'action',
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
                      this.modal1 = true;
                      this.formItem.associationId = params.row.associationId;
                      this.formItem.associationName = params.row.associationName;
                      this.formItem.departmentName = params.row.departmentName;
                      this.formItem.content = params.row.content;
                      this.formItem.ministerUserId = params.row.ministerUserId;
                      this.formItem.ministerUserName = params.row.ministerUserName;
                      this.formItem.id = params.row.id;
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.formItem = params.row;
                      this.getDepartNum(params.row.id);
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
      }
    },

    created() {
      this.access = JSON.parse(localStorage.getItem('access'));
      this.type = parseInt(localStorage.getItem('type'));
      if(this.$route.query.id !== undefined) {
        this.associationId = this.$route.query.id ;
        this.getDepartList();
      }
      if(this.type === 1) {
        this.associationId = this.access[0].associationId;
        this.getDepartList();
      } else if(this.type === 0) {
        this.associationId = null;
        this.getAssnInfo();
      } else if(this.type === 2) {
        this.associationId = this.access[0].associationId;
        this.access.map(item => {
          this.sortAssnList.push({
            value: item.associationId,
            label: item.associationName,
          })
        })
        this.getDepartList();
      }
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getDepartList();
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

      searchDepart() {
        this.pageNo = 1;
        this.getDepartList();
      },

      //获取部门列表
      getDepartList() {
        let that = this;
        let url = that.BaseConfig + '/selectDepartmentAll';
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
            console.log('--获取部门列表--', data);
            if(data.retCode ===0) {
              that.departList = data.data.data;
              that.total = data.data.total;
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      getDepartMem(departmentId, associationId) {
        let that = this;
        let url = that.BaseConfig + '/selectDepartmentUserAll';
        let params = {
          associationId: associationId,
          departmentId: departmentId,
          pageNo: that.pageNo2,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.departMember = data.data.data;
              that.modalMem = true;
              let total = data.data.total;
              if(that.departMember.length <total) {
                that.pageNo2++;
                that.getDepartMem();
              }
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //进入-添加部门
      addDepart() {
        console.log(this.associationId)
        if(this.associationId === null ||this.associationId === undefined || this.associationId === '') {
          this.$Message.warning('请先选择社团');
        } else {
          this.$router.push({
            path: '/index/departManage/addDepart',
            query: {
              associationId: this.associationId,
            }
          })
        }
      },

      //编辑部门信息
      ok() {
        let that = this;
        let url = that.BaseConfig + '/updateDepartment';
        let data = that.formItem;
        that
          .$http(url, '', data, 'post')
          .then(res => {
            console.log('--修改部门成功--',res)
               if(res.data.retCode === 0) {
                 that.$Message.success('部门信息修改成功');
                 that.getDepartList();
               } else {
                 that.$Message.warning(res.data.retMsg)
               }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },
      //查找部门是否有次用户
      searchUsers() {
        let that = this;
        let url = that.BaseConfig + '/selectDepartmentUserAll';
        let params = {
          associationId: that.formItem.associationId,
          departmentId: that.formItem.id,
          userName: that.userName,
          pageNo: 1,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.searchInfo = data.data.data;
              console.log(that.searchInfo)
              that.formItem.ministerUserName = that.searchInfo[0].name;
              that.formItem.ministerUserId = that.searchInfo[0].userId;
            }
          })
          .catch(err => {
            that.$Message.error('该社团无此人！');
          })
      },

      //查找是否有次用户
      searchUser() {
        let that = this;
        let url = that.BaseConfig + '/selectUsersAll';
        let params = {
          associationId: that.formItem.associationId,
          userName: that.userName,
          pageNo: 1,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            console.log(data)
            if(data.retCode === 0) {
              that.searchInfo = data.data.data;
              that.formItem.ministerUserName = that.searchInfo[0].name;
              that.formItem.ministerUserId = that.searchInfo[0].id;
            }
          })
          .catch(err => {
            that.$Message.error('该社团无此人！');
          })
      },

      //删除部门前获取该部门人数
      getDepartNum(id) {
        let that = this;
        let url = that.BaseConfig + '/getDepartmentUserCount';
        let params = {departmentId : id,};
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            console.log('--部门人数--',data)
            if(data.retCode === 0) {
              that.departNum = data.data;
              that.modalDel = true;
            }
          })
          .catch(err => {
            that.$Message.error('请求错误！');
          })
      },

      //删除部门
      delDepart() {
        let that = this;
        let url = that.BaseConfig + '/deleteDepartment';
        let params = {departmentId : that.formItem.id};
        that
          .$http(url, params, '', 'get')
          .then(res => {
            if(res.data.retCode === 0) {
              that.$Message.success('部门删除成功！');
              that.modalDel = false;
              that.getDepartList();
            } else {
              that.$Message.warning(res.data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误！');
          })
      },
    },
  }
</script>

<style lang="less" scoped>
  .assn-manage {
    margin: 10px 0;
    display: flex;
    button {
      margin-right: 15px;
    }
  }
</style>
