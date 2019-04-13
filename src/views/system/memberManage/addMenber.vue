<template>
    <div>
      <div class="search-user">
        <div style="display: flex;margin-bottom: 25px">
          <Select v-model="sortValue" style="width:150px">
            <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div style="width: 340px"><Input search enter-button="查找成员" placeholder="输入要查找的内容" v-model="searchValue" @on-enter="searchUser" @on-search="searchUser"/></div>
        </div>
      </div>
      <div class="seach-info">
        <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
      </div>
      <Modal
        v-model="modal6"
        title="Title"
        :loading="loading"
        @on-ok="addUserToAssn">
        <div>
          <Select v-model="departmentId" style="width:150px">
            <Option v-for="item in depList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </Modal>
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
                            console.log('userId',params.row.id)
                            this.userId = params.row.id;
                            this.modal6 = true;
                          }
                        }
                      }, '添加社员')
                    ]);
                  }
                }
              ],
              searchValue:'',
              userInfo:[],
              associationId: '',    //社团id
              modal6: false,
              loading: true,
              userId: null,
              departList: [],
              depList: [],   //部门列表
              pageNo:1,
              departmentId:'',   //部门Id
            }
        },

        created() {
          this.associationId = this.$route.query.associationId;
          this.getDepartList();
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
                pageNo: 1,
                pageSize: 10,
              };
            } else if(that.sortValue === 'userName') {
              params = {
                userName: that.searchValue,
                pageNo: 1,
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

          //获取部门列表
          getDepartList() {
            let that = this;
            let url = that.BaseConfig + '/selectDepartmentAll';
            let params = {
              associationId: that.associationId,
              pageNo: that.pageNo,
              pageSize: 10,
            };
            let data = null;
            console.log(params)
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                console.log(data);
                if(data.retCode ===0) {
                  that.departList = that.departList.concat(data.data.data);
                  if(that.departList < data.data.total) {
                    that.pageNo++;
                    that.getDepartList();
                  }
                  that.departList.map(item => {
                    console.log(item)
                    that.depList.push({
                      value: item.id,
                      label: item.departmentName,
                    })
                  })
                  console.log(that.depList)
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //添加用户进入社团某部门
          addUserToAssn() {
            let that = this;
            let url = that.BaseConfig + '/insertUserToAssociation';
            let params = {
              userId: that.userId,
              associationId: that.associationId,
              departmentId: that.departmentId,
            };
            let data = null;
            that
              .$http(url, params , data, 'get')
              .then(res =>{
               data = res.data;
               if(data.retCode === 0) {
                 that.$Message.success('添加成功');
                 this.modal6 = false;
                 that.$router.push({
                   path: '/index/memberManage',
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
.search-user {

}
</style>
