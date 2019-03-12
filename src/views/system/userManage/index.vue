<template>
  <div>
    <div class="user-manage">
      <Router-link to="/index/userIndex/addUser">
        <Button type="primary">添加用户</Button>
      </Router-link>
      <div style="width: 340px"><Input search enter-button="搜索" placeholder="输入要查找的内容" /></div>
    </div>
    <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: space-between">
      <div>
        <Button @click="handleSelectAll(true)" type="primary">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
      </div>
      <Page :total="userInfo.length" :key="userInfo.length" :page-size="10" show-elevator />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'userName'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '年级',
            key: 'grade'
          },
          {
            title: '专业',
            key: 'major'
          },
          {
            title: '参与社团',
            key: 'assnName'
          },
          {
            title: '联系方式',
            key: 'tel'
          },
          {
            title: '用户权限',
            key: 'identity'
          },
          {
            title: '操作',
            key: 'action',
            width: 170,
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
                      // console.log(params.row)
                      this.$router.push({
                        path: '/index/assnManage/userInfomation',
                        query: {
                          userInfo: params.row,
                        }
                      })
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
                        path: '/index/assnManage/userInfomation',
                        query: {
                          userInfo: this.userInfo,
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
                      this.cancelUser(userId);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        pageNo: 0,
      }
    },

    created() {
      this.getInfo();
    },

    methods: {
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },

      //获取用户列表
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectUsersAll';
        let params = {
          pageNo: 0,
          pageSize: 99,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              console.log(data.data);
              that.userInfo = data.data.data;
            }
          })
          .catch(err => {
            console.log(err);
          })
      },

      //删除用户
      cancelUser(userId) {
        let that = this;
        let url = that.BaseConfig + '/deleteUser';
        let params = {
          UserId: userId,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            console.log(res)
            // data = res.data;
            // if(data.retCode === 0) {
            //    that.$Message.success('删除成功');
            //    that.getInfo();
            // }
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
  margin-bottom: 20px;display: flex;justify-content: space-between
}
</style>
