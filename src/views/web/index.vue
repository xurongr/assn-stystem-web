<template>
  <!--首页-->
  <div style="width: 100%;text-align: center; min-width: 860px;">
    <div class="banner">
      <!--banner，放系统名字，，左侧LOGO，，右侧后台管理入口,搜索框-->
      <div class="banner-icon">
        <img src="./img/icon.png">
        <img src="./img/banner_name.png">
      </div>
      <div class="banner-right">
        <img src="" alt="">
        <span>
              <Dropdown>
                <a href="javascript:void(0)" class="user-top">
                  {{loginInfo.name}}
                  <Icon type="ios-arrow-down"></Icon>
                 </a>
                  <DropdownMenu slot="list">
                     <DropdownItem><span @click="editModal = true">我的信息</span></DropdownItem>
                     <DropdownItem>修改密码</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
            </span>
        <p style="padding-left: 10px">退出</p>
      </div>
    </div>
    <!--导航栏-->
    <div class="nav">
      <div class="nav-cont">
        <ul>
          <li><Router-link to="/index/web">首页</Router-link></li>
          <li class="views-nav">
            <Dropdown>
              <a href="javascript:void(0)">
                我的社团
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem v-for="item in assnInfo" :key="item.id">
                  <span @click="goAssnDetail(item.id)">{{item.associationName}}</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <!--<li><Router-link to="/index/web/assnView">社团风采</Router-link></li>-->
          <li><Router-link to="/index/web/recruitNew">社团招新</Router-link></li>
          <li><Router-link to="/index/web/createAssnApply">创社申请</Router-link></li>
          <!--<li>关于我们</li>-->
          <li @click="goSystem">后台管理</li>
        </ul>
      </div>
    </div>
    <!--内容-->
    <div>
      <router-view/>
    </div>
    <!--底部-->
    <div class="footer">底部</div>
    <Modal
      v-model="editModal"
      title="个人信息"
      @on-ok="ok">
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="学号" prop="userName">
            <Input v-model="formValidate.userName"></Input>
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
          <!--<FormItem label="用户头像" prop="telNumber">-->
            <!--<Input type="hidden" v-model="formValidate.userImg" clearable />-->

          <!--</FormItem>-->
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">注册并登陆</Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              loginInfo: '',
              pageNo: 1,
              assnInfo: [],
              editModal: false,
              formValidate: {
                userName: '',
                name: '',
                sex: null,  // 0-女生   1-男生
                grade: null,
                major: '',
                telNumber: null,
                identityId: 2,
                identityName: "社团管理员",
                userImg: '',
              },
            }
        },

      created() {
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        this.formValidate = this.loginInfo;
        console.log(this.formValidate)
        this.getInfo();
      },

        methods: {
          //进入后台管理
          goSystem() {
            this.$router.push({
              path: '/index',
            })
          },

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
                  console.log('社团t列表',  that.assnInfo)
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //跳转社团详情
          goAssnDetail(id) {
            this.$router.push({
              path:'/index/web/assnView',
              query: {
                associationId: id,
              }
            })
          },

          ok() {
            let that = this;
            let url = that.BaseConfig + '/updateUser';
            // that.formValidate.identityId = 2;
            let data = that.formValidate;
            that
              .$http(url, '', data, 'post')
              .then(res => {
                console.log(res)
                if(res.data.retCode ===0) {

                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

        }
    }
</script>

<style lang="less" scoped>
  .box(@width, @height) {
    width: @width;
    height: @height;
  }
  .banner {
    .box(100%, 140px);
    padding: 10px 20px 10px 12%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .banner-icon {
      padding-top: 20px;
      padding-left: 10px;
      img:nth-child(1) {
        width: 80px;
        height: 80px;
      }
      img:nth-child(2) {
        width: 73%;
        height: 91px;
      }
      span {
        padding-left: 20px;
      }
    }
    .banner-right {
      line-height: 40px;
      display: flex;
      a {
        color: #444;
      }
      a:hover {
        color: #1205ff;
      }
      img {
        .box(40px, 40px);
        border-radius: 50%;
        border: 1px solid #000;
        margin-right: 10px;
      }
    }
  }

  .nav {
    .box(100%, 40px);
    background-color: #3765FF;
    .nav-cont {
      .box(75%, 40px);
      margin: 0 auto;
      ul {
        display: flex;
        li {
          height: 40px;
          line-height: 40px;
          padding: 0 30px;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 1px;
          &:hover{
            background-color: blue;
          }
          /deep/ .ivu-dropdown-menu {
            display: block;
          }
          /deep/ .ivu-dropdown-item {
            color: #3765FF;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    }
  }

  .footer {
    .box(100%, 50px);
    border: 1px solid #000;
  }

</style>
