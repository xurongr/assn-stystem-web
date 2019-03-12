<template>
  <div>
    <!--系统管理员创建社团-->
    <div class="assn-manage">
      <Router-link to="/index/assnManage/addAssn">
        <Button type="primary">创建社团</Button>
      </Router-link>
      <div style="width: 340px"><Input search enter-button="搜索" placeholder="输入要查找的内容" /></div>
    </div>

    <Table border ref="selection" :columns="columns4" :data="userInfo.slice(0,8)"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: space-between">
      <div>
        <Button @click="handleSelectAll(true)" type="primary">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
      </div>
      <Page :total="userInfo.length" :key="userInfo.length" show-elevator />
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
            title: 'id',
            key: 'id',
            width: 60,
          },
          {
            title: '社团名称',
            key: 'associationName',
          },
          {
            title: '会长',
            key: 'userName'
          },
          {
            title: '简介',
            key: 'content'
          },
          {
            title: '招募状态',
            key: 'status'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
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
                      this.$router.push({
                        path: '/index/assnManage/infoManage',
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
                }, '解散')
              ]);
            }
          }
        ],
      }
    },

    created() {
      this.getInfo();
    },

    methods: {
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectAssociationAll';
        let params = {
          pageNo: 0,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            that.$Message.error('请求错误');
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
