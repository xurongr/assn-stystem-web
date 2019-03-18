<template>
  <div class="addUser">
    <p>成员信息</p>
    <div class="add-selfinfo">
      <Row>
        <Col span="8">用户名：<Input v-model="userInfo.userName" readonly /></Col>
        <Col span="8">密码：<Input v-model="userInfo.pwd" readonly/></Col>
        <Col span="8">确认密码：<Input v-model="userInfo.pwd" readonly/></Col>
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
    <div v-if="userInfo.assnBasicList.length !== 0">
      <div v-for="(item,index) in userInfo.assnBasicList" :key="index">
        <p>加入社团{{index}}</p>
        <div class="add-selfinfo" >
          <Row>
            <Col span="8">社团名称：
            <Select v-model="item.associationName" style="width:200px">
              <Option v-for="item in assoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col span="8">部门名称：
            <Select v-model="item.departmentBasicList[0].departmentName" style="width:200px">
              <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col span="8">职务：<Input v-model="item.job" readonly /></Col>
          </Row>
          <Row>
            <Col span="8">身份权限：
            <Input v-model="item.identityName" readonly />
            </Col>
          </Row>
        </div>
      </div>
    </div>


    <div class="add-btn" v-if="flag === 1">
      <Poptip
        confirm
        title="确认取消修改用户信息？"
        @on-ok="ok"
        @on-cancel="cancel">
        <Button>取消</Button>
      </Poptip>
      <Button type="primary" style="margin: 0 20px">确认</Button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        userInfo: '',
        userId: '',
        flag: null,     //1-查看，2-编辑
      }
    },
    created() {
      this.userInfo = this.$route.query.userInfo;
      this.flag = this.$route.query.flag;
      console.log(this.userInfo,this.userInfo.assnBasicList.length)
    },

    methods: {
      ok() {},
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
