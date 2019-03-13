<template>
  <div>
    <!--系统管理员创建社团-->
    <div class="assn-manage">
      <Router-link to="/index/assnManage/addAssn">
        <Button type="primary">创建社团</Button>
      </Router-link>
      <div style="width: 340px"><Input search enter-button="搜索" placeholder="输入要查找的内容" /></div>
    </div>

    <Table border ref="selection" :columns="columns4" :data="assnInfo"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: space-between">
      <div>
        <Button @click="handleSelectAll(true)" type="primary">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
      </div>
      <Page :total="assnInfo.length" :key="assnInfo.length" show-elevator />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        assnInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '社团名称',
            key: 'associationName',
          },
          {
            title: '会长',
            key: 'name'
          },
          {
            title: '简介',
            key: 'content'
          },
          {
            title: '招募状态',
            key: 'recruitState',
            filters: [
              {
                label: '开启',
                value: 0
              },
              {
                label: '关闭',
                value: 1
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 0) {
                return row.recruitState === '开启';
              } else if (value === 1) {
                return row.recruitState === '关闭';
              }
            }
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
                        query: {
                          assnInfo: params.row,
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
            data = res.data;
            if(data.retCode ===0) {
              that.assnInfo = data.data.data;
              console.log(that.assnInfo)
              that.assnInfo.map(item =>{
                if(item.recruitState === 0) {
                  item.recruitState = '开启'
                } else {
                  item.recruitState = '关闭'
                }
              })
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
.assn-manage {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
