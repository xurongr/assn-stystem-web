<template>
  <div class="info-manage">
    <Form :model="formItem" :label-width="100">
      <FormItem label="社团名称：">
        <Input v-model="formItem.associationName"></Input>
      </FormItem>
      <FormItem label="社团负责人：">
        <Input v-model="name" disabled></Input>
        <RouterLink to="/index/identityChange" style="color: blue;font-size: 14px">->变更社团负责人</RouterLink>
        <!--<Input v-model="name" @on-blur="searchUser"></Input>-->
        <!--<Modal-->
          <!--v-model="modal2"-->
          <!--title="选择社团负责人"-->
          <!--:footer-hide="true"-->
        <!--&gt;-->
          <!--<p>-->
          <!--<Table border ref="selection" :columns="columns4" :data="searchInfo"></Table>-->
          <!--</p>-->
        <!--</Modal>-->
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
        <Button type="primary" @click="updateAssnInfo">修改</Button>
        <Poptip
          confirm
          title="确认取消修改社团信息？"
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
          associationName: '',
          address: '',
          name: '',
          content: "",
          recruitState: null,   //招募状态  0-招募中  1-未招募
          userId:null
        },
        name: '',
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
                      this.formItem.userId = params.row.id;
                      this.modal2 = false;
                    }
                  }
                }, '确定'),
              ]);
            }
          }
        ],
      }
    },

    created() {
      this.formItem = this.$route.query.assnInfo;
      this.name = this.formItem.name;
      if(this.formItem.recruitState === '开启') {
        this.formItem.recruitState = "0"
      } else {
        this.formItem.recruitState = "1"
      }
    },

    methods: {
      //确认修改
      updateAssnInfo() {
        let that = this;
        let url = that.BaseConfig + '/updateAssociation';
        that.formItem.createTime = new Date().getTime();
        let association = that.formItem;
        that
          .$http(url, '', association, 'post')
          .then(res => {
            if(res.data.retCode ===0) {
              that.$Message.success('修改成功');
              that.$router.push({
                path: '/index/assnManage'
              })
            } else {
              that.$Message.error(res.data.retMsg)
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

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
              that.modal2 = true;
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //取消修改
      ok() {
        this.$router.push({
          path: '/index/assnManage'
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .info-manage {
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
