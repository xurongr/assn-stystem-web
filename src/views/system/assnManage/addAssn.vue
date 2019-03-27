<template>
    <div class="addAssn">
      <Form :model="formItem" :label-width="100">
        <FormItem label="社团名称：">
          <Input v-model="formItem.associationName"></Input>
        </FormItem>
        <FormItem label="社团负责人：">
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
        <FormItem label="社团地址：">
          <Input v-model="formItem.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="社团地址..."></Input>
        </FormItem>
        <FormItem label="招募状态：">
          <RadioGroup v-model="formItem.recruitState">
            <Radio label="0">开启</Radio>
            <Radio label="1">关闭</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="社团简介：">
          <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="社团简介..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="addAssn">创建</Button>
          <Poptip
            confirm
            title="确认取消添加用户？"
            @on-ok="ok"
            @on-cancel="cancel">
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
              loginInfo: '',   //用户登录信息
              name: '',   //负责人名字，通过userId绑定负责人，写负责人名字时搜索是否有此用户，有获取userid
              formItem: {
                associationName: '',
                address: '',
                content: "",
                recruitState: null,   //招募状态  0-招募中  1-未招募
                userId: null
              },
              searchInfo: [],   //查找负责人列表   有可能重名
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
            }
        },

        created() {
          this.loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
          this.formItem.userId = this.loginInfo.id;
          this.formItem.name = this.loginInfo.name;
          console.log(this.formItem);
        },

        methods: {
          //查找是否有次用户
          searchUser() {
            let that = this;
            let url = that.BaseConfig + '/selectUsersAll';
            let params = {
              name: that.name,
              pageNo: 1,
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

          //创建社团
          addAssn() {
            let that = this;
            let url = that.BaseConfig + '/insertAssociation';
            let data = that.formItem;
            that
              .$http(url, '' , data, 'post')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.$router.push({
                    path: '/index/assnManage'
                  })
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          addName(id) {
            this.formItem.userId = id;
            this.modal2 = false;
          },

          ok() {
            this.$router.push({
              path: '/index/assnManage'
            })
          },
          cancel() {},

        },
    }
</script>

<style lang="less" scoped>
.addAssn {
  /deep/.ivu-input {
    &:nth-child(1) {
      width: 50%;
    }
    &:nth-child(2) {
      width: 30%;
    }
  }
  /deep/.ivu-date-picker-rel {
    width: 400px;
  }
  /deep/.ivu-input-icon {
    left: 125px;
  }
}
</style>
