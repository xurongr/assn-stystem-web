<template>
    <div>
      <div class="annouce-manage">
        <div style="display: flex">
          <Select v-model="sortValue" style="width:150px">
            <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div style="width: 270px;margin-left: 3px"><Input search enter-button="搜索" placeholder="输入要查找的内容"/></div>
        </div>
        <Router-link to="/index/announcementManage/addAnnoucement">
          <Button type="primary">发布公告</Button>
        </Router-link>
      </div>
      <Table border ref="selection" :columns="columns4" :data="announceInfo"></Table>
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
      <Modal
        v-model="modal3"
        title="公告内容"
        :footer-hide="true"
      >
        <p>{{anContent}}</p>
      </Modal>

      <Modal
        v-model="modal4"
        @on-ok="delAnnounce"
      >
        <p style="text-align: center;font-size: 18px;letter-spacing: 1px">确定删除该公告?</p>
      </Modal>

    </div>
</template>

<script>
    export default {
        data() {
            return {
              announceInfo: [],
              modal3: false,
              anContent:'',
              columns4: [
                {
                  type: 'selection',
                  width: 60,
                  align: 'center'
                },
                {
                  title: '公告标题',
                  key: 'title',
                },
                {
                  title: '公告内容',
                  key: 'content',
                  width: 310
                },
                {
                  title: '发布人',
                  key: 'name'
                },
                {
                  title: '所属社团',
                  key: 'associationName'
                },
                {
                  title: '发布时间',
                  key: 'createTime'
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 180,
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
                            this.anContent = params.row.content;
                            this.modal3 = true;
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
                              path: '/index/announceManage/editAnnounce',
                              query: {
                                noticeId: params.row.id,
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
                            this.modal4 = true;
                            this.noticeId  = params.row.id;
                          }
                        }
                      }, '删除')
                    ]);
                  }
                }
              ],
              sortList: [
                {
                  value: 'associationName',
                  label: '公告'
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
              modal4: false,
              noticeId: null
            }
        },

        created() {
          this.getAnnouceInfo();
        },

        methods: {
          //改变页数
          pageChange(val) {
            this.pageNo = val;
            this.getAnnouceInfo();
          },

          //获取公告信息
          getAnnouceInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectNoticeAll';
            let params = {
              type: 0,    //type：0 社团公告，，要根据userId判断type
              pageNo: that.pageNo,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.announceInfo = res.data.data.data;
                  console.log(that.announceInfo)
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          delAnnounce() {  //删除公告
            let that = this;
            let url = that.BaseConfig + '/deleteNotice';
            let params = {noticeId: that.noticeId };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.$Message.success('公告删除成功');
                  that.getAnnouceInfo();
                } else {
                  that.$Message.warning(res.data.retMsg);
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
  .annouce-manage {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  /deep/ .ivu-table-cell {
    white-space: nowrap;
    /*-webkit-line-clamp: 3;*/
  }
</style>
