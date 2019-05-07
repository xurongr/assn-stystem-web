<template>
  <div>
    <div class="search-title">
      <div v-if="type === 0"><p>社团名称：</p><Input placeholder="关键字模糊搜索" style="width: 140px;margin-top: 8px" v-model="selectAssnName"/></div>
      <div v-if="type === 2">
        <p>社团名称：</p>
        <Select v-model="selectAssnName" style="width:200px;margin-top: 8px">
          <Option v-for="item in assnSeclect" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div v-if="type === 0">
        <p>招募状态：</p>
        <Select v-model="recruitState" style="width:200px;margin-top: 8px">
          <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <!--系统管理员创建社团-->
    <div class="assn-manage">
      <Button type="primary" @click="searchAssn">查询</Button>
      <Router-link to="/index/assnManage/addAssn" v-if="type === 0">
        <Button type="primary">创建社团</Button>
      </Router-link>
    </div>

    <Table border ref="selection" :columns="columns4" :data="assnInfo"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>

    <Modal
      v-model="modal1"
      :title= associationName
      @on-ok="ok">
      <div>
        <p>社团成员总数：{{assnDataCount.userCount}}</p>
        <p>社团部门总数：{{assnDataCount.departmentCount}}</p>
        <p>社团公告总数：{{assnDataCount.noticeCount}}</p>
        <p>社团活动总数：{{assnDataCount.userCount}}</p>
        <p v-if="type === 0" style="color: red;font-size: 18px;font-weight: 600">确定要解散社团？解散后相关数据将清除！</p>
        <p v-if="type !== 0" style="color: red;font-size: 18px;font-weight: 600">确定要申请解散社团？解散后相关数据将清除！</p>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        access: [],
        userId: 0,
        loginInfo: [],
        type: 4,
        selectAssnName:'',
        associationName: '',
        disable: false,
        recruitState: 2,
        sortList: [
          {
            value: 2,
            label: '全部'
          },
          {
            value: 0,
            label: '招募中'
          },
          {
            value: 1,
            label: '招募未开启'
          },
        ],    //查找条件
        assnInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
        sortValue:'',
        total: 0,
        pageNo:1,
        current: 1,
        modal1: false,
        associationId: null,
        assnDataCount: [],
        assnSeclect: [],
        columns4: [
          {
            title: '序号',
            type: 'index',
            width: 80,
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
            key: 'content',
            width: 440,
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
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
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
                    size: 'small',
                    // disabled: this.disable
                  },
                  on: {
                    click: () => {
                      this.associationId = params.row.id;
                      this.associationName = params.row.associationName;
                      this.getAssnCount(params.row.id);
                      this.modal1 = true;
                      console.log(params.row)
                    }
                  }
                }, this.type === 0? '解散': '解散申请')
              ]);
            }
          }
        ],
      }
    },

    created() {
      this.access = JSON.parse(localStorage.getItem('access'));
      this.type = parseInt(localStorage.getItem('type'));
      this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
      this.userId = this.loginInfo.id;
      if(this.type === 1) {
        this.associationId = this.access[0].associationId;
        this.selectAssnName = this.access[0].associationName;
      } else if(this.type === 0) {
        this.associationId = null;
        this.selectAssnName = '';
      } else if(this.type === 2) {
        this.access.map(item=> {
          this.selectAssnName = this.access[0].associationName;
          this.assnSeclect.push({
            label: item.associationName,
            value: item.associationName,
          })
        })
      }
      this.getInfo();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },

      searchAssn() {   //搜索
        this.pageNo = 1;
        this.getInfo();
      },

      //获取社团列表
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectAssociationAll';
        let recruitState;
        that.recruitState === 2 ? recruitState = '' : recruitState = that.recruitState;
        let params = {
          pageNo: that.pageNo,
          associationName: that.selectAssnName,
          recruitState: recruitState,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode ===0) {
              that.assnInfo = data.data.data;
              that.total = data.data.total;
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

      //获取社团成员人数
      getAssnCount(id) {
        let that = this;
        let url = that.BaseConfig + '/getAssociationInfoCount';
        let params = {associationId: id};
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode ===0) {
              that.assnDataCount = data.data;
              console.log(that.assnDataCount)
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //解散社团
      ok() {
       if(this.type === 0) {
         this.dismissAssn();
       } else {
         this.dismissApply();
       }
      },

      dismissAssn() {
        let that = this;
        let url = that.BaseConfig + '/deleteAssociation';
        let params = {associationId: that.associationId};
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode ===0) {
              that.$Message.success('社团已解散');
              that.getInfo();
            } else {
              that.$Message.warning(data.retMsg)
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      dismissApply() {
        let that = this;
        let url = that.BaseConfig + '/insertApply';
        let data = {
          userId: that.userId,
          associationId: that.associationId,
          type: 1,
          state: 0,
          identityId: 2
        };
        that
          .$http(url, '', data, 'post')
          .then(res => {
            data = res.data;
            if(data.retCode ===0) {
              that.$Message.success('提交申请成功！');
              that.disable = true;
            } else {
              that.$Message.warning(data.retMsg || '提交申请失败！');
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
  margin: 10px 0;
  display: flex;
  button {
    margin-right: 15px;
  }
}
</style>
