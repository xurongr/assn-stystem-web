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
      <Router-link to="/index/assnManage/addAssn">
        <Button type="primary">创建社团</Button>
      </Router-link>
    </div>

    <Table border ref="selection" :columns="columns4" :data="assnInfo"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: space-between">
      <div>
        <Button @click="handleSelectAll(true)" type="primary">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
      </div>
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
        <p style="color: red;font-size: 18px;font-weight: 600">确定要解散社团？解散后相关数据将清除！</p>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        assnInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
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
        total: 0,
        pageNo:1,
        current: 1,
        modal1: false,
        associationId: null,
        associationName:'',
        assnDataCount: [],
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
                      this.associationId = params.row.id;
                      this.associationName = params.row.associationName;
                      this.getAssnCount(params.row.id);
                      this.modal1 = true;
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
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },

      //获取社团列表
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectAssociationAll';
        let params = {
          pageNo: that.pageNo,
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
