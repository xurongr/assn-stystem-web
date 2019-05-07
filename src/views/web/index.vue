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
        <img :src="loginInfo.userImg" alt="">
        <span>
              <Dropdown>
                <a href="javascript:void(0)" class="user-top">
                  {{loginInfo.name}}
                  <Icon type="ios-arrow-down"></Icon>
                 </a>
                  <DropdownMenu slot="list">
                     <DropdownItem><span @click="editModal = true">我的信息</span></DropdownItem>
                     <DropdownItem><span @click="modal1 = true">修改密码</span></DropdownItem>
                  </DropdownMenu>
              </Dropdown>
            </span>
        <p style="padding-left: 10px" @click="exitSystem">退出</p>
      </div>
    </div>
    <!--导航栏-->
    <div class="nav">
      <div class="nav-cont">
        <ul>
          <Router-link to="/index/web"><li>首页</li></Router-link>
          <li class="views-nav" @mouseenter="assnShow = true" @mouseleave="assnShow = false">我的社团
            <div  class="assn-list" v-if="assnShow">
              <div class="scroll" >
                <p @click="goAssnDetail(item.id)" v-for="item in assnInfo" :key="item.id">{{item.associationName}}</p>
              </div>
            </div>
          </li>
          <Router-link to="/index/web/recruitNew"><li>社团招新</li></Router-link>
          <Router-link to="/index/web/createAssnApply"><li>创社须知</li></Router-link>
          <Router-link to="/index/web/readMe"><li>关于Me</li></Router-link>
          <li @click="goSystem" v-if="type === 1">后台管理</li>
          <li @click="goSystem" v-if="type === 2">后台管理</li>
        </ul>
      </div>
    </div>
    <!--内容-->
    <div>
      <router-view/>
    </div>
    <!--底部-->
    <div class="footer">
      <div class="footer-cont">
        <img src="./img/icon.png" alt="">
        <p>&nbsp;&nbsp; &copy; 2015 宁德师范学院学生社团 &nbsp;&nbsp;地址：福建省宁德市东侨开发区宁德师范学院</p>
      </div>
    </div>

    <Modal
      v-model="modal1"
      title="修改密码"
      @on-ok="editSubmit">
      <div class="edit-info">
        <Form ref="editPwd" :model="editPwd" :label-width="80">
          <FormItem label="学号" prop="userName">
            <Input v-model="editPwd.userName" disabled></Input>
          </FormItem>
          <FormItem label="旧密码" prop="oldPwd">
            <Input type="password" v-model="editPwd.oldPwd"></Input>
          </FormItem>
          <FormItem label="身份证号" prop="idCard">
            <Input type="password" v-model="editPwd.idCard" @on-change="yanzhen" />
          </FormItem>
          <FormItem label="新密码" prop="newPwd">
            <Input type="password" v-model="editPwd.newPwd" />
          </FormItem>
        </Form>
      </div>
    </Modal>

    <Modal
      v-model="editModal"
      title="个人信息"
      @on-ok="ok">
      <div class="edit-info">
        <Form ref="formValidate" :model="formValidate" :label-width="80">
          <FormItem label="学号" prop="userName">
            <Input v-model="formValidate.userName" disabled></Input>
          </FormItem>
          <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" disabled></Input>
          </FormItem>
          <FormItem label="年级" prop="grade">
            <Input v-model="formValidate.grade" disabled></Input>
          </FormItem>
          <FormItem label="专业" prop="major">
            <Input v-model="formValidate.major" clearable />
          </FormItem>
          <FormItem label="联系电话" prop="telNumber">
            <Input v-model="formValidate.telNumber" clearable />
          </FormItem>
          <FormItem label="用户头像" prop="telNumber">
            <div class="demo-upload-list" v-for="item in uploadList">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag"
              action="http://localhost:8082/fileUpload"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
              <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>
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
              assnShow: false,
              loginInfo: '',
              access: [],
              type: 4,
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
                userImg: '',
              },
              editPwd: {
                userName: JSON.parse(localStorage.getItem('loginInfo')).userName,
                oldPwd: '',
                idCard: '',
                newPwd: '',
              },
              visible: false,
              uploadList: [],
              defaultList: [],
              imgName: '',
              modal1: false,
            }
        },
      mounted () {
        this.uploadList = this.$refs.upload.fileList;
      },

      created() {
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
        this.formValidate = this.loginInfo;
        this.access = JSON.parse(localStorage.getItem('access'));
        this.type = parseInt(localStorage.getItem('type'));
        this.getInfo();
      },

        methods: {
          //进入后台管理
          goSystem() {
            this.$router.push({
              path: '/index',
            })
          },

          yanzhen() {

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
              path:'/blank',
              query: {
                associationId: id,
              }
            })
          },

          ok() {
            let that = this;
            let url = that.BaseConfig + '/updateUser';
            let data = {
              grade: that.formValidate.grade,
              id:  that.formValidate.id,
              idCard:  that.formValidate.idCard,
              major: that.formValidate.major,
              name:  that.formValidate.name,
              pwd:  that.formValidate.pwd,
              sex:  that.formValidate.sex,
              telNumber:  that.formValidate.telNumber,
              userImg:  that.formValidate.userImg,
              userName: that.formValidate.userName,
              age:  that.formValidate.age,
            };
            that
              .$http(url, '', data, 'post')
              .then(res => {
                if(res.data.retCode ===0) {
                  console.log('修改成功')
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          exitSystem() {
            localStorage.removeItem('loginInfo');
            localStorage.removeItem('access');
            localStorage.removeItem('type');
            this.$router.push({name: 'login'})
          },

          handleView (name) {
            this.imgName = name;
            this.visible = true;
          },

          handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            let image = [];
            fileList.map((item,index) => {
              image[index] = item.url
            })
            this.formValidate.userImg = image.join(',');
          },

          handleSuccess (res, file, fileList) {
            file.url = res.data;
            let image = [];
            console.log(fileList)
            fileList.map((item,index) => {
              image[index] = item.url
            })
            this.formValidate.userImg = image.join(',');
          },

          handleFormatError (file) {
            this.$Notice.warning({
              title: 'The file format is incorrect',
              desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
          },
          handleMaxSize (file) {
            this.$Notice.warning({
              title: 'Exceeding file size limit',
              desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
          },
          handleBeforeUpload () {
            const check = this.uploadList.length < 5;
            if (!check) {
              this.$Notice.warning({
                title: 'Up to five pictures can be uploaded.'
              });
            }
            return check;
          },

          editSubmit() {
            let that = this;
            let url = that.BaseConfig + '/updatePwd';
            let params = that.editPwd;
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.$Message.success('密码修改成功,请退出系统，重新登录');
                  this.modal1 = false;
                  that. editPwd = {
                      userName: JSON.parse(localStorage.getItem('loginInfo')).userName,
                      oldPwd: '',
                      idCard: '',
                      newPwd: '',
                  };
                } else {
                  that.$Message.warning(data.retMsg)
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
    background: linear-gradient(0deg, #fff 0%, #57a3f3 100%);
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
      margin-right: 13%;
      a {
        color: #444;
      }
      a:hover {
        color: #1205ff;
      }
      img {
        .box(40px, 40px);
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

  .nav {
    .box(75%, 50px);
    margin: 0 auto;
    background-color: #fff;
    .nav-cont {
      .box(91%, 50px);
      margin: 0 auto;
      ul {
        display: flex;
        li {
          height: 50px;
          line-height: 50px;
          padding: 0 30px;
          font-size: 15px;
          font-weight: 600;
          color: #444;
          letter-spacing: 1px;
          &:hover{
            background-color: #2b81f3;
            color: #fff;
          }
          /deep/ .ivu-dropdown-menu {
            display: block;
          }
          /deep/ .ivu-dropdown-item {
            color: #444;
            &:hover {
              color: #fff;
              background-color: #2b81f3;
            }
          }
        }
      }
    }
    /deep/ .ivu-select-dropdown {
      height: 300px;
      overflow: hidden;
      overflow-y: scroll;
    }
    /deep/ .ivu-dropdown-rel {
      a {
        color: #444;
        &:hover {
          color: #fff;
        }
      }
    }
  }

  .views-nav {
    position: relative;
    .assn-list {
      position: absolute;
      top: 50px;
      left: 0px;
      background-color: #2b81f3;
      color: #fff;
      z-index: 1000;
      width: 150px;
      height: 260px;
      overflow: hidden;
      .scroll {
        width: 172px;
        height: 260px;
        overflow-y: scroll;
      }
      p {
        &:hover {
          background-color: #081bf3;
          color: #fff;
        }
      }
    }
  }

    .footer {
      margin-top: 10px;
      .box(100%, 130px);
      background-color: #1552a2;
      &-cont {
        color: #fff;
        justify-content: center;
        align-content: center;
        padding-top: 35px;
        display: flex;
        img {
          width: 50px;
          height: 50px;
        }
        p {
          line-height: 50px;
          font-size: 20px;
          letter-spacing: 1px;
        }
      }

    }

    .edit-info {
      .ivu-form-item {
        margin-bottom: 10px;
      }
      /deep/ .ivu-input {
        width: 84%;
      }
      img {
        .box(40px, 40px);
        border-radius: 50%;
      }
    }

</style>
