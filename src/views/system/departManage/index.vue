<template>
  <div>
    <!--系统管理员创建社团-->
    <div class="assn-manage">
      <div style="display: flex">
        <Select v-model="sortValue" style="width:150px">
          <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div style="width: 270px;margin-left: 3px"><Input search enter-button="搜索" placeholder="输入要查找的内容"/></div>
      </div>
      <!--<Router-link to="/index/departManage/addDepart">-->
        <Button type="primary" @click="addDepart">添加部门</Button>
      <!--</Router-link>-->
    </div>
    <div v-if="identityId === 0">
      选择社团：
      <Select v-model="associationId" style="width:150px;margin-bottom: 10px">
        <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <br>
      <!--选择部门：-->
      <!--<Select v-model="sortValue" style="width:150px;margin-bottom: 10px">-->
        <!--<Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
      <!--</Select>-->
    </div>

    <Table border ref="selection" :columns="columns4" :data="assnInfo"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: space-between">
      <div>
        <Button @click="handleSelectAll(true)" type="primary">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
      </div>
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNo1:1,
        assnInfo: [],       // 社团列表
        pageNo:1,
        total: 0,
        current: 1,
        getDepartList: [],   //部门列表
        columns4: [
          {
            title: '部门名称',
            key: 'departmentName',
          },
          {
            title: '部长',
            key: 'ministerUserName'
          },
          {
            title: '部门简介',
            key: 'content',
            width: 440,
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
        sortList: [
          {
            value: 'associationName',
            label: '社团名称'
          },
          {
            value: 'recruitState',
            label: '招募状态'
          },
        ],    //查找条件
        sortValue:'',
        identityId: null,
        sortAssnList: [],    //查找社团-管理员
        associationId: null,  //社团id
      }
    },

    created() {
      this.identityId = JSON.parse(this.$store.state.loginInfo).identityId;
      this.associationId =  JSON.parse(this.$store.state.loginInfo).associationId;
      this.getDepartList();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getDepartList();
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

      //获取部门列表
      getDepartList() {
        let that = this;
        let url = that.BaseConfig + '/selectDepartmentAll';
        let params = {
          pageNo: that.pageNo,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            console.log('--获取部门列表--', data);
            if(data.retCode ===0) {
              that.getDepartList = data.data.data;
              that.total = data.data.total;
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //进入-添加部门
      addDepart() {
        if(associationId === null) {
          this.$Message.warning('请先选择社团');
        } else {
          this.$router.push({
            path: '/index/departManage/addDepart',
            query: {
              associationId: this.associationId,
            }
          })
        }
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
