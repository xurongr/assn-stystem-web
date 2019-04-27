<template>
  <div class="addUser">
    <p>个人信息</p>
    <div class="add-selfinfo">
      <Row>
        <Col span="8">学号：<Input v-model="userInfo.userName" readonly /></Col>
        <Col span="8">学号：<Input v-model="userInfo.pwd" readonly /></Col>
      </Row>
      <Row>
        <Col span="8">姓名：<Input v-model="userInfo.name" clearable /></Col>
        <Col span="8">性别：
          <Select v-model="userInfo.sex" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="8">年龄：<Input v-model="userInfo.age" clearable /></Col>
      </Row>
      <Row>
        <Col span="8">年级：<Input v-model="userInfo.grade" clearable /></Col>
        <Col span="8">
          专业：<Input v-model="userInfo.major" clearable />
        </Col>
        <Col span="8">联系方式：<Input v-model="userInfo.telNumber" clearable /></Col>
      </Row>
    </div>
    <div v-if="userInfo.assnBasicList.length !== 0">
      <div v-for="(item,index) in userInfo.assnBasicList" :key="index">
        <p>加入社团{{index+1}}</p>
        <div class="add-selfinfo" >
          <Row>
            <Col span="8">社团名称：
              <Input v-model="item.associationName" readonly />
            </Col>
            <Col span="8" v-if="item.departmentBasicList.length !== 0">部门名称：
              <Input v-model="item.departmentBasicList[0].departmentName" readonly />
            </Col>
            <Col span="8" v-if="item.departmentBasicList.length === 0">部门名称：
              <Input readonly />
            </Col>
            <Col span="8" v-if="item.job !== null">职务：<Input v-model="item.job" readonly /></Col>
            <Col span="8" v-if="item.job === null">职务：<Input v-model="userInfo.identityName" readonly /></Col>
          </Row>
          <Row>
            <Col span="8">身份权限：
              <Input v-model="userInfo.identityName" readonly />
              <Router-link to="" style="color: blue">->修改身份权限</Router-link>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div v-if="userInfo.assnBasicList.length === 0" style="border: 1px solid #ccc;line-height: 40px;
    border-radius: 5px;ont-size: 18px;text-align: center;">
      暂未加入社团~~
    </div>
    <div class="add-btn">
      <Button type="primary" style="margin: 0 20px" @click="goBack">返回</Button>
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
        userInfo: [],
        userId: '',
      }
    },
    created() {
      this.getOneInfo(this.$route.query.id)
    },

    methods: {
      //获取用户个人信息
      getOneInfo(id) {
        let that = this;
        let url = that.BaseConfig + '/selectByUserId';
        let params = { UserId: id };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.userInfo = data.data;
              console.log(that.userInfo)
            } else {
              that.$Message.error(data.retMsg || '用户信息获取失败');
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      goBack() {
        this.$router.push({
          name: 'userIndex'
        })
      },
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
      text-align: center;
      margin-top: 20px;
      /deep/.ivu-poptip-confirm .ivu-poptip-body {
        text-align: left;
      }
    }
  }
</style>
