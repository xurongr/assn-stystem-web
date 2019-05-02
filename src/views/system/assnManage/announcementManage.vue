<template>
    <div>
      <div class="search-title">
        <!--所属社团系统管理员才有-->
        <div v-if="type !== 1">
          <p>所属社团：</p>
          <Select v-model="associationId"  style="width:200px;margin-top: 8px">
            <Option v-for="item in assnSeclect" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="annouce-manage">
        <Button type="primary" @click="searchAnnoun">查询</Button>
        <Router-link to="/index/announcementManage/addAnnoucement">
          <Button type="primary">发布公告</Button>
        </Router-link>
      </div>
      <Table border ref="selection" :columns="columns4" :data="announceInfo"></Table>
      <div style="display: flex;justify-content: flex-end;margin-top: 10px">
        <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange"/>
      </div>
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
              associationId: 0,
              access: [],
              type: 4,
              announceInfo: [],
              modal3: false,
              anContent:'',
              columns4: [
                {
                  title: '序号',
                  type: 'index',
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
              noticeId: null,
              assnSeclect: [],
              pageNo3:1,
              assnInfo: [],
            }
        },

        created() {
          this.access = JSON.parse(localStorage.getItem('access'));
          this.type = parseInt(localStorage.getItem('type'));
          if(this.type === 1) {
            this.associationId = this.access[0].associationId;
          } else if(this.type === 0) {
            this.associationId = 0;
            this.getInfo();
          } else if(this.type === 2) {
            this.associationId = this.access[0].associationId;
            this.access.map(item=> {
              this.assnSeclect.push({
                value: item.associationId,
                label: item.associationName,
              })
            })
          }
          this.getAnnouceInfo();
        },

        methods: {
          //改变页数
          pageChange(val) {
            this.pageNo = val;
            this.getAnnouceInfo();
          },

          searchAnnoun() {
            this.pageNo = 1;
            this.getAnnouceInfo();
          },

          //获取公告信息
          getAnnouceInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectNoticeAll';
            let associationId;
            that.associationId === 0 ? associationId ='' : associationId = that.associationId;
            let params = {
              associationId: associationId,
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

          //获取社团列表
          getInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationAll';
            let params = {
              pageNo: that.pageNo3,
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
                    that.assnSeclect.push({
                      value: item.id,
                      label: item.associationName,
                    });
                  })
                  if(that.assnInfo.length < data.data.total) {
                    that.pageNo3++;
                    that.getInfo();
                  }
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
    margin: 10px 0;
    display: flex;
    button {
      margin-right: 15px;
    }
  }
  /deep/ .ivu-table-cell {
    white-space: nowrap;
    /*-webkit-line-clamp: 3;*/
  }
</style>
