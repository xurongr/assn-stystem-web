<template>
  <div>
    <div class="user-manage">
      <Button type="primary" @click="modal1 = true">添加身份</Button>
    </div>
    <Table border ref="selection" :columns="columns4" :data="identityInfo"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>
    <!--添加身份-->
    <Modal
      v-model="modal1"
      title="添加身份"
      @on-ok="addIdentity">
      <div>
        <p>身份名称： <Input v-model="identityName" style="width: 300px" /></p>
        <p style="margin-top: 15px">身份权限：<Input v-model="level" style="width: 300px" /></p>
      </div>
    </Modal>
    <!--添加身份-->
    <Modal
      v-model="modal2"
      title="修改身份"
      @on-ok="editIdentity">
      <div>
        <p>身份名称： <Input v-model="identityName" style="width: 300px" /></p>
        <p style="margin-top: 15px">身份权限：<Input v-model="level" style="width: 300px" /></p>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: 1,
        identityInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
        columns4: [
          {
            title: '序号',
            type: 'index',
            width: 100,
          },
          {
            title: '身份',
            key: 'identityName'
          },
          {
            title: '身份权限',
            key: 'level'
          },
          // {
          //   title: '操作',
          //   key: 'action',
          //   width: 170,
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'primary',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px'
          //         },
          //         on: {
          //           click: () => {
          //             this.identityName = params.row.identityName;
          //             this.level = params.row.level;
          //             this.id = params.row.id;
          //             this.modal2 = true;
          //           }
          //         }
          //       }, '修改'),
          //     ]);
          //   }
          // }
        ],
        pageNo: 1,
        total: 0,
        modal1: false,
        modal2:false,
        id: null,
        identityName: '',
        level: null,
      }
    },

    created() {
      //获取用户个人信息
      this.getIdentityInfo();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getIdentityInfo();
      },

      //获取身份列表
      getIdentityInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectIdentityList';
        let params = {
          pageNo: that.pageNo,
          pageSize: 10,
        };
        that
          .$http(url, params, '', 'get')
          .then(res => {
            if(res.data.retCode === 0) {
              that.identityInfo = res.data.data;
              that.total = res.data.data.length;
            } else {
              that.$Message.error(res.data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      addIdentity() {
        let that = this;
        let url = that.BaseConfig + '/insertIdentity';
        let data = {
          identityName: that.identityName,
          level: that.level,
        }
        that
          .$http(url, '', data, 'post')
          .then(res => {
            if(res.data.retCode === 0) {
              that.$Message.success('身份添加成功！');
              that.identityName = '';
              that.level = null;
              that.getIdentityInfo();
            } else {
              that.$Message.warning(res.data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      editIdentity() {
        let that = this;
        let url = that.BaseConfig + '/updateIdentity';
        let data = {
          id: that.id,
          identityName: that.identityName,
          level: that.level,
        }
        that
          .$http(url, '', data, 'post')
          .then(res => {
            if(res.data.retCode === 0) {
              that.$Message.success('身份修改成功！');
              that.identityName = '';
              that.level = null;
              that.id = null;
              that.getIdentityInfo();
            } else {
              that.$Message.warning(res.data.retMsg);
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
    margin-bottom: 20px;display: flex;justify-content: flex-end;
  }
</style>
