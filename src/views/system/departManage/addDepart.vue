<template>
    <div>
      <Form :model="formItem" :label-width="80">
        <FormItem label="部门名称：">
          <Input v-model="formItem.departmentName" ></Input>
        </FormItem>
        <FormItem label="部长：">
          <Input v-model="name" @on-blur="searchUser"></Input>
          <Modal
            v-model="modal2"
            title="选择社团负责人"
            :footer-hide="true"
            :mask-closable="closeM"
          >
            <p>
            <Table border ref="selection" :columns="columns4" :data="searchInfo"></Table>
            </p>
          </Modal>
        </FormItem>
        <FormItem label="部门介绍：">
          <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="在此输入部门简介..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="addDepart">添加</Button>
          <Poptip
            confirm
            title="确认添加此部门？"
            @on-ok="ok"
           >
            <Button style="margin-left: 8px">取消</Button>
          </Poptip>
        </FormItem>
      </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              formItem: {
                associationId: null,
                departmentName: '',
                select: '',
                content: '',
                ministerUserId: null,
              },
              modal2: false,
              columns4: [
                {
                  title: '学号',
                  key: 'userName'
                },
                {
                  title: '姓名',
                  key: 'name'
                },
                {
                  title: '联系方式',
                  key: 'telNumber'
                },
                {
                  title: '操作',
                  key: 'action',
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
                            this.addName(params.row.id)
                          }
                        }
                      }, '确定'),
                    ]);
                  }
                }
              ],
              closeM: false,
              name: '',
              searchInfo: [],
            }
        },

        created() {
          this.formItem.associationId = this.$route.query.associationId;
        },

        methods: {
          //查找是否有次用户
          searchUser() {
            let that = this;
            let url = that.BaseConfig + '/selectUsersAll';
            let params = {
              associationId: that.formItem.associationId,
              name: that.name,
              pageNo: 0,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode === 0) {
                  that.searchInfo = data.data.data;
                  if(that.searchInfo.length >0) {
                    that.modal2 = true;
                  } else {
                    that.$Message.warning('无此用户，请重新输入');
                  }
                  console.log(that.searchInfo)
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          addName(id) {
            this.formItem.ministerUserId = id;
            this.modal2 = false;
          },

          //添加部门
          addDepart() {
            let that = this;
            let url = that.BaseConfig + '/insertDepartment';
            let data = that.formItem;
            that
              .$http(url, '', data, 'post')
              .then(res => {
                console.log('--添加部门成功--',res)
//                if(res.data.retCode === 0) {
//
//                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          ok() {

          },

        },
    }
</script>

<style lang="less" scoped>

</style>
