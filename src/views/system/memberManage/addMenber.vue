<template>
    <div>
      <div class="search-user">
        <div style="display: flex;margin-bottom: 25px">
          <Select v-model="sortValue" style="width:150px">
            <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div style="width: 340px"><Input search enter-button="查找" placeholder="输入要查找的内容" v-model="searchValue" @click="searchUser"/></div>
        </div>
      </div>
      <div class="seach-info">
        <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              sortList: [
                {
                  value: 'name',
                  label: '姓名'
                },
                {
                  value: 'userName',
                  label: '学号'
                },
              ],    //查找条件
              sortValue: '',
              columns4: [
                {
                  title: '用户名',
                  key: 'userName'
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
                  width: 200,
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.addUserToAssn(params.row.id);
                          }
                        }
                      }, '添加社员')
                    ]);
                  }
                }
              ],
              searchValue:'',
              userInfo:[],
              total:0,
              loginInfo: '',    //用户登录信息
            }
        },

        created() {
          this.loginInfo = JSON.parse(window.localStorage.getItem("loginInfo"));
        },

        methods: {
          //搜索用户(学号、姓名)
          searchUser() {
            let that = this;
            let url = that.BaseConfig + '/selectUsersAll';
            let params;
            if(that.sortValue === 'name') {
              params = {
                name: that.searchValue,
                pageNo: 0,
                pageSize: 10,
              };
            } else if(that.sortValue === 'userName') {
              params = {
                userName: that.searchValue,
                pageNo: 0,
                pageSize: 10,
              };
            }
            let data = null;
            that
              .$http(url, params , data, 'get')
              .then(res =>{
                console.log(res)
                data = res.data;
                if(data.retCode === 0) {
                  that.userInfo = data.data.data;
                  that.total = data.data.total;
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //添加用户进入社团
          addUserToAssn(id) {
            let that = this;
            let url = that.BaseConfig + '/insertUserToAssociation';
            let params = {
              userId: id,
              associationId: that.loginInfo.assnBasicList[0].associationId,
            };
            let data = null;
            that
              .$http(url, params , data, 'get')
              .then(res =>{
                console.log(res);
//                data = res.data;
//                if(data.retCode === 0) {
//                  that.$Message.success('添加成功');
//                  that.$router.push({
//                    name: 'memberManage'
//                  })
//                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

        },
    }
</script>

<style lang="less" scoped>
.search-user {

}
</style>
