<template>
  <div class="addUser">
    <p>个人信息</p>
    <div class="add-selfinfo">
      <Row>
        <Col span="8">用户名：<Input v-model="userInfo.userName" clearable /></Col>
        <Col span="8">密码：<Input v-model="userInfo.pwd" clearable/></Col>
        <Col span="8">确认密码：<Input v-model="userInfo.password" clearable/></Col>
      </Row>
      <Row>
        <Col span="8">姓&nbsp;&nbsp;&nbsp;&nbsp;名：<Input v-model="userInfo.name" clearable /></Col>
        <Col span="8">性别：
          <Select v-model="userInfo.sex" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="8">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：<Input v-model="userInfo.age" clearable /></Col>
      </Row>
      <Row>
        <Col span="8">年&nbsp;&nbsp;&nbsp;&nbsp;级：<Input v-model="userInfo.grade" clearable /></Col>
        <Col span="8">
          <!--<div style="display: flex; line-height: 32px;">-->
            <!--专业：<Cascader :data="majorData" v-model="userInfo.major" style="width:200px;padding-left: 4px;"></Cascader>-->
          <!--</div>-->
          专业：<Input v-model="userInfo.major" clearable />
        </Col>
        <Col span="8">联系方式：<Input v-model="userInfo.telNumber" clearable /></Col>
      </Row>
    </div>
    <p>加入社团1</p>
    <div class="add-selfinfo">
      <Row>
        <Col span="8">社团名称：
          <Select v-model="userInfo.assnBasicList[0].associationName" style="width:200px">
            <Option v-for="item in assoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="8">部门名称：
          <Select v-model="userInfo.assnBasicList[0].departmentBasicList[0].departmentName" style="width:200px">
            <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="8">职务：<Input v-model="userInfo.assnBasicList[0].job" clearable /></Col>
      </Row>
      <Row>
        <Col span="8">身份权限：
          <Select v-model="userInfo.identityName" style="width:200px">
            <Option v-for="item in identityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
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
          // id: 1,
          age: null,
          assnBasicList: [{
            associationId: 1,
            associationName: "",
            departmentBasicList: [
              {
                departmentId: 1,
                departmentName: "",
              }
            ],
            // identityId: 1,
            // identityName: "社团管理员",
            job: "",
          }],
          identityId: 1,
          identityName: "",
          grade: null,
          major: "",
          name: "",
          pwd: "",
          sex: null,   //1-男生  2-女生
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
            value: 2,
            label: '女'
          },
        ],           //select 性别
        assoList: [
          {
            value: '青年志愿者协会',
            label: '青年志愿者协会'
          },
          {
            value: '计算机协会',
            label: '计算机协会'
          }
        ],           //社团选择
        departList: [
          {
            value: '后勤部',
            label: '后勤部'
          },
          {
            value: '办公室',
            label: '办公室'
          }
        ],         //部门选择
        identityList: [
          {
            value: '系统管理员',
            label: '系统管理员'
          },
          {
            value: '社团管理员',
            label: '社团管理员'
          },
          {
            value: '社团成员',
            label: '社团成员'
          }
        ],       //身份选择
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
    methods: {
      //创建用户
      creatUser() {
        // this.addIdentity();
        let that = this;
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
      },

      addIdentity() {
        let that = this;
        let url = that.BaseConfig + '/insertIdentity';
        let data = {
          identityName: "社团管理员",
          level: 1
        }
        that
          .$http(url,'', data, 'post')
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
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
