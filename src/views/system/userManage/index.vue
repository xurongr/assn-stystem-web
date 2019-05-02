<template>
  <div>
    <div class="search-title">
      <div><p>学号：</p><Input placeholder="关键字模糊搜索" style="width: 140px;margin-top: 8px" v-model="userName"/></div>
      <div><p>用户名称：</p><Input style="width: 140px;margin-top: 8px" v-model="name"/></div>
    </div>
    <div class="user-manage">
      <Button type="primary" @click="searchUser">查询</Button>
    </div>
    <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNo: 1,
        total:0,
        name: '',
        userName: '',
        current: 1,
        userInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
        oneUserInfo: [],
        columns4: [
          {
            title: '学号',
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
            title: '联系方式',
            key: 'telNumber'
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
                        query: {
                          id: params.row.id,
                        }
                      })
                    }
                  }
                }, '查看'),
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
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },

      //搜索
      searchUser() {
        this.pageNo = 1;
        this.getInfo();
      },

      //获取用户列表
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectUsersAll';
        let params = {
          name: that.name,
          userName: that.userName,
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
              that.$Message.error(data.retMsg || '用户信息获取失败');
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
  margin:15px 0;
  display: flex;
  button {
    margin-right: 10px;
  }
}
</style>
