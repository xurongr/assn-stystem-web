<template>
  <div class="info-manage">
    <Form :model="formItem" :label-width="100">
      <FormItem label="社团名称：">
        <Input v-model="formItem.associationName"></Input>
      </FormItem>
      <FormItem label="社团负责人：">
        <Input v-model="formItem.name"></Input>
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
          recruitState: 0,   //招募状态  0-招募中  1-未招募
        },
      }
    },

    created() {
      this.formItem = this.$route.query.assnInfo;
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
        let data = that.formItem;
        that
          .$http(url, '', data, 'post')
          .then(res => {
            if(res.data.retCode ===0) {
              that.$router.push({
                path: '/index/assnManage'
              })
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
