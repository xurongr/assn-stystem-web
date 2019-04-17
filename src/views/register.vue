<template>
    <div  class="register-box">
      <div class="register-box-info">
        <p>用户注册</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="学号" prop="userName">
            <Input v-model="formValidate.userName"></Input>
          </FormItem>
          <FormItem label="密码" prop="pwd">
            <Input type="password" v-model="formValidate.pwd"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="pwdCheck">
            <Input type="password" v-model="formValidate.pwdCheck"></Input>
          </FormItem>
          <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name"></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formValidate.sex">
              <Radio label="1">男生</Radio>
              <Radio label="0">女生</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="年级" prop="grade">
            <Input v-model="formValidate.grade"></Input>
          </FormItem>
          <FormItem label="专业" prop="major">
            <Input v-model="formValidate.major" clearable />
          </FormItem>
          <FormItem label="联系电话" prop="telNumber">
            <Input v-model="formValidate.telNumber" clearable />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">注册并登陆</Button>
          </FormItem>
        </Form>
        <p style="text-align: center"><Router-link to="/login" style="color: blue">返回登录页</Router-link></p>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
          const validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.formValidate.pwdCheck !== '') {
                // 对第二个密码框单独验证
                this.$refs.formValidate.validateField('pwdCheck');
              }
              callback();
            }
          };
          const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.formValidate.pwd) {
              callback(new Error('密码不一致，请重新输入!'));
            } else {
              callback();
            }
          };
            return {
              formValidate: {
                userName: '',
                name: '',
                pwd: '',
                pwdCheck: '',
                sex: null,  // 0-女生   1-男生
                grade: null,
                major: '',
                telNumber: null,
                identityId: 3,
                identityName: "普通用户",
              },
              ruleValidate: {
                name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
                userName: [{ required: true, message: '学号不能为空', trigger: 'blur' }],
                pwd: [{ validator: validatePass, required: true, trigger: 'blur' }],
                pwdCheck: [{ validator: validatePassCheck, required: true, trigger: 'blur' }],
                grade: [{ required: true, message: '年级不能为空', trigger: 'blur' }],
                major: [{ required: true, message: '专业不能为空', trigger: 'blur' }],
                telNumber: [{ required: true, message: '电话不能为空', trigger: 'blur' }],
              }
            }
        },

        methods: {
          handleSubmit (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.register();
              } else {
                this.$Message.error('*为必填项!');
              }
            })
          },
          register() {
            let that = this;
            let url = that.BaseConfig + '/insertUser';
            that.formValidate.sex = parseInt(that.formValidate.sex);
            let data = that.formValidate;
            that
              .$http(url,'', data, 'post')
              .then(res => {
                if(res.data.retCode === 0) {
                  that.$Message.success('创建成功');
                  setTimeout(()=> {
                    that.login();
                  },1000)
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },
          login() {
            let that = this;
            let url = that.BaseConfig + '/login';
            let data = {
              userName: that.formValidate.userName,
              pwd: that.formValidate.pwd,
            };
            that
              .$http(url, '', data, 'post')
              .then(res => {
                if(res.data.retCode === 0) {
                  //把登录信息缓存起来localStorage
                  localStorage.setItem('loginInfo', JSON.stringify(res.data.data));
                  that.$router.push({
                    path: '/index/web',
                  })
                } else {
                  that.$Message.error(res.data.retMsg)
                }
              })
              .catch(err => {
                that.$Message.error('请求错误')
              })
          },
        }
    }
</script>

<style lang="less" scoped>
.register-box {
  width: 100%;
  height: 100%;
  background: url("./web/img/login_bg.jpg");
  background-size: 100% 100%;
  position: relative;
  &-info {
    position: absolute;
    left: 32%;
    top: 10%;
    padding: 30px 50px 30px 30px;
    border: 1px solid #fff;
    border-radius: 10px;
    /deep/ .ivu-input {
      border-color: #2d78f4;
      width: 300px;
    }
    /deep/ .ivu-form .ivu-form-item-label {
      font-size: 14px;
      font-weight: 600;
    }
    /deep/ .ivu-form-item {
      margin-bottom: 14px;
    }
    /deep/ .ivu-btn-primary {
      width: 90%;
      margin-top: 10px;
    }
    p {
      margin-top: 12px;
      &:nth-child(1) {
        margin-top: 0;
        font-size: 20px;
        text-align: center;
        font-weight: 600;
        letter-spacing: 2px;
        color: #2d78f4;
      }
    }
  }
}
</style>
