<template>
    <div class="apply-page">
      <div class="apply-form">
        <Card>
          <p slot="title" style="text-align: center;font-size: 20px">入团申请</p>
          <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
              <FormItem label="申请人" prop="name">
                <Input v-model="formValidate.name" disabled></Input>
              </FormItem>
              <FormItem label="申请社团" prop="associationId">
                <Select v-model="formValidate.associationId" @on-change="getDepartList" style="width:150px;margin-top: 8px">
                  <Option v-for="item in assnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="申请部门" prop="departmentId">
                <Select v-model="formValidate.departmentId"  style="width:150px;margin-top: 8px">
                  <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="申请理由" prop="content">
                <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="至少输入20个汉字，如：我喜欢摄影，所以想加入摄影协会"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">申请</Button>
                <Button @click="exitBack" style="margin-left: 8px">退出</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
          return {
            pageNo: 1,pageNo1:1,
            loginInfo: [],
            assnInfo: [],
            assnList: [],
            departInfo: [],
            departList: [],
            formValidate: {
              name: '',
              userId: 0,
              associationId: 0,
              departmentId: 0,
              content: '',
              type: 0,
              state: 0,
              identityId: 3
            },
            ruleValidate: {
              name: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
              ],
              associationId: [
                { required: true}
              ],
              departmentId: [
                { required: true}
              ],
              content: [
                { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                { type: 'string', min: 20, message: '至少输入20个字', trigger: 'blur' }
              ]
            }
          }
        },

      created() {
          this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
          this.formValidate.name = this.loginInfo.name;
          this.formValidate.userId = this.loginInfo.id;
          this.getInfo();
      },

      methods: {
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
                that.assnInfo = that.assnInfo.concat(data.data.data);
                let total = data.data.total;
                if(that.assnInfo < total) {
                  that.pageNo++;
                  that.getInfo();
                }
                that.assnInfo.map(item => {
                  that.assnList.push({
                    value: item.id,
                    label: item.associationName
                  })
                })
              }
            })
            .catch(err => {
              that.$Message.error('请求错误');
            })
        },

        getDepartList() {
          this.pageNo1 =1;
          this.departInfo = [];
          this.departList =[];
          this.getDeparts();
        },

        //获取部门列表
        getDeparts() {
          let that = this;
          let url = that.BaseConfig + '/selectDepartmentAll';
          let params = {
            associationId: that.formValidate.associationId,
            pageNo: that.pageNo1,
            pageSize: 10,
          };
          let data = null;
          that
            .$http(url, params, data, 'get')
            .then(res => {
              data = res.data;
              if(data.retCode ===0) {
                that.departInfo = that.departInfo.concat(data.data.data);
                let total = data.data.total;
                if(that.departInfo < total) {
                  that.pageNo1++;
                  that.getDepartList();
                }
                that.departInfo.map(item => {
                  console.log(item)
                  that.departList.push({
                    value: item.id,
                    label: item.departmentName
                  })
                })
              }
            })
            .catch(err => {
              that.$Message.error('请求错误');
            })
        },

        handleSubmit (name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              if(this.formValidate.associationId === 0 || this.formValidate.departmentId === 0) {
                this.$Message.error('信息填写不完整!');
              } else {
                this.getEnterAssn();
              }
            } else {
              this.$Message.error('信息填写不完整!');
            }
          })
        },

        //检查用户是否已经是该社团成员
        getEnterAssn() {
          let that = this;
          let url = that.BaseConfig + '/selectAssociationAllByUserId';
          let params = {
            userId : that.formValidate.userId,
            pageNo: 1,
            pageSize: 10,
          };
          let data = null;
          that
            .$http(url, params, data, 'get')
            .then(res => {
              data = res.data;
              if(data.retCode ===0) {
                if(data.data.total === 0) {
                  this.submitApply();
                } else {
                  let enjoyAssn = data.data.data;
                  let flag = 0;
                  enjoyAssn.map(item =>{
                    if(item.associationId === that.formValidate.associationId) {
                      flag = 1;
                      return;
                    } else {flag = 2;}
                  })
                  if(flag === 1) {
                    that.$Message.warning('亲爱的用户，您已经是该社团成员，请勿重新申请！');
                  } else {
                    this.submitApply();
                  }
                }
              }
            })
            .catch(err => {
              that.$Message.error('请求错误');
            })
        },

        submitApply() {
          let that = this;
          let url = that.BaseConfig + '/insertApply';
          let data = that.formValidate;
          that
            .$http(url, '', data, 'post')
            .then(res => {
              data = res.data;
              if(data.retCode ===0) {
                that.$Message.success('提交申请成功！');
                that.formValidate.associationId = 0;
                that.formValidate.departmentId = 0;
                that.formValidate.content = '';
              } else {
                that.$Message.warning('提交申请失败，请检查填写事项！');
              }
            })
            .catch(err => {
              that.$Message.error('请求错误');
            })
        },

        exitBack () {
          this.$router.push({name: 'recruitNew'})
        }
      },
    }
</script>

<style lang="less" scoped>
.apply-page {
  height: 100vh;
  width: 100%;
  background: url("./img/bg_apply.jpg") no-repeat;
  background-size: 100% 100%;
  .apply-form {
    width: 550px;
    margin: 0 auto;
    padding-top: 5%;
    color: #ffffff;
    .ivu-card {
      color: #fff;
      background-color: #fff0;
    }
    .ivu-card-head p, .ivu-card-head-inner,
    /deep/.ivu-form .ivu-form-item-label {
      color: #fff;
      font-size: 15px;
    }
    /deep/ .ivu-input[disabled], fieldset[disabled] .ivu-input {
      color: #000;
    }
    /deep/.ivu-card-bordered {
      border: 2px solid #e8eaec;
      border-radius: 10px;
    }
  }
}
</style>
