<template>
  <div class="addUser">
    <p>个人信息</p>
    <div class="add-selfinfo">
      <Row>
        <Col span="8">学号：<Input v-model="userInfo.userName" clearable /></Col>
        <Col span="8">密码：<Input v-model="userInfo.pwd" clearable/></Col>
        <Col span="8">确认密码：<Input v-model="userInfo.password" clearable/></Col>
      </Row>
      <Row>
    
        <Col span="8">姓名：<Input v-model="userInfo.name" clearable /></Col>
        <Col span="8">性别：
          <Select v-model="userInfo.sex" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="8">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：<Input v-model="userInfo.age" clearable /></Col>
      </Row>
      <Row>
      
        <Col span="8">年级：<Input v-model="userInfo.grade" clearable /></Col>
        <Col span="8">
          专业：<Input v-model="userInfo.major" clearable />
        </Col>
        <Col span="8">联系方式：<Input v-model="userInfo.telNumber" clearable /></Col>
      </Row>
    </div>

    <div class="add-btn">
      <Poptip
        confirm
        title="确认取消添加用户？"
        @on-ok="ok"
        @on-cancel="cancel">
        <Button>取消</Button>
      </Poptip>
      <Button type="primary" style="margin: 0 20px" @click="creatUser">确认</Button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: {
          age: null,
          identityId: 3,
          identityName: "普通用户",
          grade: null,
          major: "",
          name: "",
          pwd: "",
          sex: null,   //1-男生  0-女生
          telNumber: null,
          userImg: "",
          userName: ""
        },
        cityList: [
          {
            value: 1,
            label: '男'
          },
          {
            value: 0,
            label: '女'
          },
        ],           //select 性别
        pageNo: 1,
        majorData: [{
          value: '信息与机电工程学院',
          label: '信息与机电工程学院',
          children: [
            {
              value: '计算机科学与技术',
              label: '计算机科学与技术'
            },
            {
              value: '电子信息工程',
              label: '电子信息工程'
            }
          ]
        }],     //专业级联选择框
      }
    },

    created() {

    },

    methods: {
      //创建用户
      creatUser() {
        let that = this;
        if(that.userInfo.userName === '') {
          this.$Message.warning('学号不能为空');
        } else if(that.userInfo.name === '') {
          this.$Message.warning('姓名不能为空');
        } else if(that.userInfo.pwd === '') {
          this.$Message.warning('密码不能为空');
        } else {
          let url = that.BaseConfig + '/insertUser';
          let data = that.userInfo;
          that
            .$http(url,'', data, 'post')
            .then(res => {
              console.log(res);
              if(res.data.retCode === 0) {
                that.$Message.success('创建成功');
                that.$router.push({
                  path: '/index/userIndex',
                })
              } else {
                that.$Message.error(res.data.retMsg);
              }
            })
            .catch(err => {
              that.$Message.error('请求错误');
            })
        }
      },

      ok() {
        this.$router.push({
          path: '/index/userIndex'
        })
      },
      cancel() {},
    },

  }
</script>

<style lang="less" scoped>
  .boxSize(@width, @height) {
    width: @width;
    height: @height;
  }
  .addUser {
    p {
      font-size: 16px;
      font-weight: 600;
    }
    .add-selfinfo {
      width: 100%;
      border: 1px solid #a2a2a2;
      margin: 5px auto 16px;
      padding: 12px;
      border-radius: 5px;
      .ivu-row {
        margin: 12px 0;
      }
      .ivu-input-wrapper {
        width: 200px;
      }
    }
    .add-checked {
      .boxSize(100%,43px);
      border: 1px solid #a2a2a2;
      margin: 5px auto 16px;
      padding: 12px;
      border-radius: 5px;
      .ivu-radio-group {
        font-size: 16px;
        vertical-align: middle;
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
      .ivu-radio-wrapper {
        font-size: 14px;
      }
    }
    .add-btn {
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
