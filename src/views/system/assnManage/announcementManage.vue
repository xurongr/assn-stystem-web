<template>
    <div>
      <div class="annouce-manage">
        <Router-link to="/index/announcementManage/addAnnoucement">
          <Button type="primary">发布公告</Button>
        </Router-link>
        <div style="width: 340px"><Input search enter-button="搜索" placeholder="输入要查找的内容" /></div>
      </div>
      <Table border ref="selection" :columns="columns4" :data="announceInfo.slice(0,10)"></Table>
      <Page :total="announceInfo.length" :key="announceInfo.length" :page-size="10" show-elevator />
    </div>
</template>

<script>
    export default {
        data() {
            return {
              announceInfo: [],
              columns4: [
                // {
                //   type: 'selection',
                //   width: 60,
                //   align: 'center'
                // },
                {
                  title: 'id',
                  key: 'id',
                  width: 60,
                },
                {
                  title: '公告标题',
                  key: 'name',
                },
                {
                  title: '公告内容',
                  key: 'content'
                },
                {
                  title: '发布人',
                  key: 'userName'
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
                            this.$router.push({
                              path: '',
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
                              path: '',
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
                      }, '删除')
                    ]);
                  }
                }
              ],
            }
        },

        created() {
          this.getAnnouceInfo();
        },

        methods: {
          getAnnouceInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectNoticeAll';
            let data = {
              userId: 1,
              type: 0,    //type：0 社团公告，，要根据userId判断type
              pageNo: 0,
              pageSize: 10,
            };
            that
              .$http(url, '' , data, 'post')
              .then(res =>{
                if(res.data.retCode === 0) {
                  console.log(res.data)
                } else {
                  that.$Message.error(res.data.retMsg);
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
</style>
