<template>
  <div>
    <!--系统管理员创建社团-->
    <div class="assn-manage">
      <div style="display: flex">
        <div v-if="identityId === 0">
          选择社团：
          <Select v-model="associationId" style="width:150px;margin-bottom: 10px" @on-change="getDepartList">
            <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <!--选择部门：-->
          <!--<Select v-model="sortValue" style="width:150px;margin-bottom: 10px">-->
          <!--<Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
          <!--</Select>-->
        </div>
      </div>
      <Button type="primary" @click="addDepart">添加部门</Button>
    </div>
    <Table border ref="selection" :columns="columns4" :data="departList"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>

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
            <Input v-model="userName" @on-change="searchUser" placeholder="请输入学号，如：2015102210"></Input>
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
        columns4: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
          },
          {
            title: '部门名称',
            key: 'departmentName',
          },
          {
            title: '部长',
            key: 'ministerUserName'
          },
          {
            title: '部门简介',
            key: 'content',
            width: 440,
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
      this.identityId = this.$store.state.loginInfo.identityId;
      if(this.identityId === 0) {
        this.associationId = null;
      } else {
        let assnBasicList = this.$store.state.loginInfo.assnBasicList;
        assnBasicList.map(item => {
          if(item.job === '会长' || item.job === '部长') {
            this.associationId =  item.associationId;
            this.getDepartList();
          }
        });
      }
      this.getAssnInfo();
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

      //获取部门列表
      getDepartList() {
        let that = this;
        let url = that.BaseConfig + '/selectDepartmentAll';
        let params = {
          associationId: that.associationId,
          pageNo: that.pageNo,
          pageSize: 10,
        };
        console.log(params)
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

      //进入-添加部门
      addDepart() {
        if(this.associationId === null ||this.associationId === 'undefined') {
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
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
</style>
