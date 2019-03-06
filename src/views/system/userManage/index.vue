<template>
  <div>
    <div style="margin-bottom: 10px">
      <Router-link to="/index/userIndex/addUser">
        <Button type="primary">添加用户</Button>
      </Router-link>
    </div>
    <Button type="primary" @click="getInfo">添加</Button>
    <Table border ref="selection" :columns="columns4" :data="userInfo.slice(0,10)"></Table>
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
            title: '用户名',
            key: 'author_name',
            filters: [
              {
                label: '贺平',
                value: 1
              },
              {
                label: '江洋',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.name === '贺平';
              } else if (value === 2) {
                return row.name === '江洋';
              }
            }
          },
          {
            title: 'date',
            key: 'date'
          },
          {
            title: 'title',
            key: 'title'
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
                      this.show(params.index)
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
      }
    },

    created() {
      this.getU();
    },

    methods: {
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/insertUser';
        let user = {
          id: 1,
          age: 18,
          associationId: 1,
          associationName: "计算机协会",
          departmentId: 2,
          departmentName: "外联部",
          grade: 2015,
          identityId: 1,
          identityName: "徐徐",
          job: "会长",
          major: "阿",
          name: "B2015102210",
          pwd: "123456",
          sex: 1,
          telNumber: 17705032963,
          userImg: "",
          userName: "B2015102210"
        }
        that
          .$http(url,'',user, 'post')
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },

      getU() {
        let that = this;
        let url = that.BaseConfig + '/selectIdentityList';
        that
          .$http(url,'','', 'get')
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      },

    },
  }
</script>

<style lang="less" scoped>

</style>
