<template>
  <div>
    <div class="user-manage">
      <div style="display: flex">
        <Select v-model="sortValue" style="width:150px">
          <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div style="width: 340px"><Input search enter-button="搜索" placeholder="输入要查找的内容" /></div>
      </div>
      <Router-link to="/index/memberManage/addMenber">
        <Button type="primary">添加社员</Button>
      </Router-link>
    </div>
    <!--管理员可以选择社团查看社团成员-->
    <!--<div>-->
      <!--<Select v-model="sortValue" style="width:150px">-->
        <!--<Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
      <!--</Select>-->
    <!--</div>-->
    <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: space-between">
      <div>
        <Button @click="handleSelectAll(true)" type="primary">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
      </div>
      <Page :total="total" :current.sync="current" :on-change="pageChange" />
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
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '部门',
            key: 'departmentName'
          },
          {
            title: '职务',
            key: 'job'
          },
          {
            title: '联系方式',
            key: 'telNumber'
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
//                      this.cancelUser(userId);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        pageNo: 0,
        current: 1,
        total:0,
        sortList: [
          {
            value: 'userName',
            label: '学号'
          },
          {
            value: 'name',
            label: '姓名'
          },
        ],    //查找条件
        sortValue:'',
        userId: '',
      }
    },

    created() {
      this.userId = JSON.parse(window.localStorage.getItem("loginInfo")).id;
      this.getInfo();
    },

    methods: {
      //全选
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },

      //改变页数
      pageChange(val) {
        this.pageNo = val - 1;
        this.getInfo();
      },

      //获取用户列表
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectAssociationUserAll';
        let params = {
          userId: that.userId,
          pageNo: that.pageNo,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              console.log(data.data);
              that.userInfo = data.data.data;
              that.total = data.data.total;
              console.log(that.total)
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //删除用户-从社团剔除用户
      cancelUser(userId, associationId) {
        let that = this;
        let url = that.BaseConfig + '/deleteUserInAssociation';
        let params = {
          userId: userId,
          associationId: associationId,
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
    margin-bottom: 20px;display: flex;justify-content: space-between;
  }
</style>
