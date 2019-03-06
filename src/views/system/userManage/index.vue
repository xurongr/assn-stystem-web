<template>
  <div>
    <div style="margin-bottom: 10px">
      <Router-link to="/index/userIndex/addUser">
        <Button type="primary">添加用户</Button>
      </Router-link>
    </div>
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
            width: 30,
            align: 'center'
          },
          {
            title: 'id',
            key: 'id',
            width: 60,
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
                      this.$router.push({
                        path: '/index/assnManage/userInfomation',
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
//                      this.remove(params.index)
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
