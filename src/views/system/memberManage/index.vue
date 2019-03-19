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
    <div style="margin-top:10px; margin-bottom: 10px" v-if="identityId === 0">
      选择社团：
      <Select v-model="sortAssnValue" style="width:150px">
        <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: space-between">
      <div>
        <Button @click="handleSelectAll(true)" type="primary">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
      </div>
      <Page :total="total" :key="total" :current.sync="current" :on-change="pageChange" />
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
                        path: '/index/memberManage/editMember',
                        query: {
                          userInfo: params.row,
                          flag: 1,
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
                        path: '/index/memberManage/editMember',
                        query: {
                          userInfo: params.row,
                          flag: 2,
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
                      this.cancelUser(params.row.id);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        pageNo: 0,
        pageNo1: 0,
        current: 1,
        total:0,           //获取用户列表total
        assnInfo: [],      //社团列表
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
        sortAssnValue:'',
        sortAssnList: [],    //查找社团-管理员
        userId: null,
        associationId: null,
        identityId: null,
      }
    },

    created() {
      this.userId = JSON.parse(window.localStorage.getItem("loginInfo")).id;
      this.identityId = JSON.parse(window.localStorage.getItem("loginInfo")).identityId;
      this.associationId = JSON.parse(window.localStorage.getItem("loginInfo")).assnBasicList[0].associationId;
      this.getInfo();
      this.getAssnInfo();
    },

    methods: {
      //全选
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },

      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },

      //获取社团成员列表
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectAssociationUserAll';
        if(that.sortAssnValue !== '') {
          that.associationId = that.sortAssnValue;
        }
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
                if(item.recruitState === 0) {
                  item.recruitState = '开启'
                } else {
                  item.recruitState = '关闭'
                }
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

      //删除用户-从社团剔除用户
      cancelUser(userId) {
        let that = this;
        let url = that.BaseConfig + '/deleteUserInAssociation';
        let params = {
          userId: userId,
          associationId: that.associationId,
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
