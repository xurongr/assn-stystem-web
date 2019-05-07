<template>
  <div class="reset-box">
    <div class="reset">
      <p>找回密码</p>
      <Form ref="editPwd" :model="editPwd" :rules="ruleCustom" :label-width="80">
        <FormItem label="学号" prop="userName">
          <Input v-model="editPwd.userName" @on-blur="searchUser"></Input>
        </FormItem>
        <FormItem label="身份证号" prop="idCard">
          <Input type="password" v-model="editPwd.idCard" />
        </FormItem>
        <FormItem label="新密码" prop="newPwd">
          <Input type="password" v-model="editPwd.newPwd" />
        </FormItem>
        <FormItem label="确认密码" prop="newPwdCheck">
          <Input type="password" v-model="editPwd.newPwdCheck" />
        </FormItem>
        <div style="text-align: center;">
          <Button type="primary" @click="handleSubmit('editPwd')" style="margin-right: 10px">提交</Button>
          <Button type="primary" @click="goLogin">返回登录页</Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        } else {
          if (this.editPwd.newPwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.editPwd.validateField('newPwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again'));
        } else if (value !== this.editPwd.newPwd) {
          callback(new Error('The two input passwords do not match!'));
        } else {
          callback();
        }
      };
      return {
        userInfo: [],
        idCard: '',
        userId: null,
        editPwd: {
          userName: '',
          oldPwd: '',
          idCard: '',
          newPwd: '',
          newPwdCheck: '',
        },
        ruleCustom: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          idCard: [
            {required: true, message: '证件号不能为空', trigger: 'blur' }
          ],
          newPwd: [
            {required: true, validator: validatePass, trigger: 'blur' }
          ],
          newPwdCheck: [
            {required: true, validator: validatePassCheck, trigger: 'blur' }
          ]
        }
      }
    },

    methods: {
      searchUser() {
        let that = this;
        let url = that.BaseConfig + '/selectUsersAll';
        let params = {
          userName: that.editPwd.userName,
          pageNo: 1,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode ===0) {
              that.userInfo = data.data.data[0];
              that.idCard = that.userInfo.idCard;
            } else {
              that.$Message.warning(data.retMsg)
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.editPwd.idCard !== this.idCard) {
              this.$Message.success('用户名与证件号不匹配！');
              return;
            } else {
              this.userId = this.userInfo.id;
              this.editSubmit();
            }
          } else {
            this.$Message.error('信息填写不完整!');
          }
        })
      },
      editSubmit() {
        let that = this;
        let url = that.BaseConfig + '/updatePwdById';
        let params = {
          userId: that.userId,
          pwd: that.pwd,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode ===0) {
              that.$Message.success('密码修改成功,请返回登录界面！');
            } else {
              that.$Message.warning(data.retMsg)
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      goLogin() {
        this.$router.push({name: 'login'})
      },
    }
  }
</script>

<style lang="less" scoped>
  .reset-box {
    width: 100%;
    height: 100vh;
    background: url("./web/img/login_bg.jpg");
    background-size: 100% 100%;
    position: relative;
  }
  .reset {
    position: absolute;
    left: 38%;
    top: 20%;
    padding: 40px;
    border: 1px solid #fff;
    border-radius: 10px;
    /deep/ .ivu-input {
      border-color: #2d78f4;
    }
    p {
      margin-bottom: 20px;
      &:nth-child(1) {
        font-size: 20px;
        text-align: center;
        font-weight: 600;
        letter-spacing: 2px;
        color: #2d78f4;
      }
    }
  }
</style>
