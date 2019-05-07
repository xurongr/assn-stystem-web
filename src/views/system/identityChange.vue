<template>
    <div>
      <!--加一个选择，更换会长还是更换部长-->
      <div class="ident-change">
        更换社团负责人
      </div>
      <div>
        <div style="margin-bottom: 20px">
          选择社团：
          <Select v-model="associationId" @on-change="getOldName" style="width:150px;">
            <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          ->
          原社团负责人:<Input v-model="oldName" disabled style="width:150px"></Input>
          ->更换后的负责人：<Input v-model="nowName" placeholder="输入名字，如：蓉蓉" style="width:150px"></Input>
          <Button type="primary" @click="changePresident">确认更换该会长</Button>
        </div>
        <div>
          选择社团：
          <Select v-model="associationId1" @on-change="getDepartList" style="width:150px;">
            <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
           ->
          选择部门：
          <Select v-model="departmentId" style="width:150px" @on-change="getDepartOldName">
            <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
            ->
          原部门负责人:<Input v-model="getDepartName" style="width:150px;"></Input>
            ->更换后的负责人：<Input v-model="nowDepartName" placeholder="输入名字，如：蓉蓉" style="width:150px"></Input>
          <Button type="success" @click="changeMinister">确认更换该部长</Button>
        </div>
      </div>
      <Modal
        v-model="modal2"
        title="选择社团负责人"
        :footer-hide="true"
        :mask-closable="closeM"
      >
        <Table border ref="selection" :columns="columns4" :data="searchInfo"></Table>
      </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              level: null,
              oldName: '',
              oldId: null,
              nowName: '',
              getDepartName: '',
              nowDepartName: '',
              oldDepartId: null,
              assnInfo: [],
              sortAssnList: [],  //社团列表
              associationId: null,
              pageNo: 1,
              departInfo: [],
              departList: [],    //某社团下的部门列表
              departmentId: null,
              associationId1: null,
              flag: 1,
              pageNo1:1,
              modal2: false,
              closeM: false,
              searchInfo: [],
              userId: null,
              assnHInfo: [],
              assnBInfo: [],
              departmentName: '',
              columns4: [
                {
                  title: '姓名',
                  key: 'name'
                },
                {
                  title: '操作',
                  key: 'action',
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.addName(params.row)
                          }
                        }
                      }, '确定'),
                    ]);
                  }
                }
              ],
            }
        },

      created() {
          this.level = parseInt(localStorage.getItem('type'));
          if(this.level === 0) {
            this.getInfo();
          } else if(this.level === 2) {
            let userId = JSON.parse(localStorage.getItem('loginInfo')).id
            this.getUserInfo(userId);
          } else {
            this.access = JSON.parse(localStorage.getItem('access'));
            this.associationId = this.access[0].associationId;
            this.associationId1 = this.access[0].associationId;
            this.sortAssnList.push({
              value: this.access[0].associationId,
              label: this.access[0].associationName
            })
            this.getOldName();
            this.getDepartList();
          }

      },

        methods: {
          getOldName() {   //获取原社团负责人
            let that = this;
            this.flag = 1;
            let url = that.BaseConfig + '/selectAssociationById';
            let params = {
              associationId: that.associationId,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.oldName = data.data.name;
                  that.oldId = data.data.userId;
                } else {
                  that.$Message.error(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          getDepartOldName() {
            let that = this;
            let url = that.BaseConfig + '/selectDepartmentById';
            let params = {
              departmentId : that.departmentId,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.getDepartName = data.data.ministerUserName;
                  that.oldDepartId = data.data.ministerUserId;
                  that.departmentName = data.data.departmentName;
                } else {
                  that.$Message.error(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
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
                  if(that.assnInfo.length < data.data.total) {
                    that.pageNo++;
                    that.getInfo();
                  }
                  that.assnInfo.map(item => {
                    that.sortAssnList.push({
                      value: item.id,
                      label: item.associationName,
                    })
                  })
                } else {
                  that.$Message.error(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          getUserInfo(id) {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationAll';
            let params = {
              userId: id,
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
                  if(that.assnInfo.length < data.data.total) {
                    that.pageNo++;
                    that.getInfo();
                  }
                  that.assnInfo.map(item => {
                    that.sortAssnList.push({
                      value: item.id,
                      label: item.associationName,
                    })
                  })
                } else {
                  that.$Message.error(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取部门列表
          getDepartList() {
            let that = this;
            this.flag = 2;
            let url = that.BaseConfig + '/selectDepartmentAll';
            let params = {
              associationId: that.associationId1,
              pageNo: that.pageNo1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                console.log('--获取部门列表--', data);
                if(data.retCode ===0) {
                  that.departInfo =that.departInfo.concat(data.data.data);
                  if(that.departInfo <data.data.total) {
                    that.pageNo1++;
                    that.getDepartList();
                  }
                  that.departInfo.map(item=> {
                    that.departList.push({
                      value: item.id,
                      label: item.departmentName,
                    })
                  })
                } else {
                  that.$Message.error(data.retsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //更换会长
          changePresident() {
            this.searchUser();
          },

          //更换部长（可以跨部门）
          changeMinister() {
            if(this.flag === 1) {
              this.searchUser();
            } else {
              this.searchUser1();
            }
          },

          //查找社团是否有次用户
          searchUser() {
            if(this.associationId === null) {
              this.$Message.warning('请先选择社团');
              return;
            }
            let that = this;
            let url = that.BaseConfig + '/selectAssociationUserAll';
            let params = {
              name: that.nowName,
              associationId: that.associationId,
              pageNo: 1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode === 0) {
                  that.searchInfo = data.data.data;
                  if(that.searchInfo.length >0) {
                    that.modal2 = true;
                  } else {
                    that.$Message.warning('无此用户，请重新输入');
                  }
                  console.log(that.searchInfo);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          searchUser1() {
            if(this.associationId1 === null) {
              this.$Message.warning('请先选择社团');
              return;
            }
            let that = this;
            let url = that.BaseConfig + '/selectAssociationUserAll';
            let params = {
              name: that.nowDepartName,
              associationId: that.associationId1,
              pageNo: 1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode === 0) {
                  that.searchInfo = data.data.data;
                  if(that.searchInfo.length >0) {
                    that.modal2 = true;
                  } else {
                    that.$Message.warning('无此用户，请重新输入');
                  }
                  console.log(that.searchInfo);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          addName(row) {
            if(this.flag === 1) {
              this.userId = row.userId;
              this.nowName = row.name;
              this.modal2 = false;
              this.getAssnInfo();
            } else {
              this.nowDepartName = row.name;
              this.userId = row.userId;
              this.modal2 = false;
              this.getDeInfo();
            }
          },
          //修改社团的负责人
          getAssnInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationById';
            let params = {
              associationId: that.associationId,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.assnHInfo = data.data;
                  this.changeAssnH();
                } else {
                  that.$Message.error(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },
          changeAssnH() {
            let that = this;
            let url = that.BaseConfig + '/updateAssociation';
            that.assnHInfo.userId = that.userId;
            that.assnHInfo.createTime = new Date(that.assnHInfo.createTime).getTime();
            let data = that.assnHInfo;
            that
              .$http(url, '', data, 'post')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  this.changeIdentityJ();
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //修改旧社长的社团身份
          changeIdentityJ() {
            let that = this;
            let url = that.BaseConfig + '/updateUserIdentity';
            let params = {
              associationId: that.associationId,
              userId: that.oldId,
              identityId: 3  //会长退休后变成普通用户
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  this.changeJobJ();
                  this.moveUser();
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          moveUser() {
            let that = this;
            let url = that.BaseConfig + '/deleteUserInAssociation';
            let params = {
              associationId: that.associationId,
              userId: that.oldId,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //将旧负责人的职位进行更改
          changeJobJ() {
            let that = this;
            let url = that.BaseConfig + '/updateJob';
            let params = {
              associationId: that.associationId,
              userId: that.oldId,
              job : '普通成员'
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.changeIdentity();
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //修改新社长的社团身份
          changeIdentity() {
            let that = this;
            let url = that.BaseConfig + '/updateUserIdentity';
            let params = {
              associationId: that.associationId,
              userId: that.userId,
              identityId: 2
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  this.changeJob();
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //将新负责人的职位进行更改
          changeJob() {
            let that = this;
            let url = that.BaseConfig + '/updateJob';
            let params;
            if(this.flag === 1) {
              params = {
                associationId: that.associationId,
                userId: that.userId,
                job : '会长'
              };
            } else {
              params = {
                associationId: that.associationId,
                userId: that.userId,
                job : '部长'
              };
            }
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.$Message.success('修改成功！')
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取部门信息
          getDeInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectDepartmentAll';
            let params = {
              associationId: that.associationId1,
              departmentName: that.departmentName,
              pageNo: 1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.assnBInfo = data.data.data[0];
                  this.changeDepartH();
                } else {
                  that.$Message.error(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },
          changeDepartH() {
            let that = this;
            let url = that.BaseConfig + '/updateDepartment';
            that.assnBInfo.ministerUserId = that.userId;
            that.assnBInfo.createTime = new Date(that.assnBInfo.createTime).getTime();
            let data = that.assnBInfo;
            that
              .$http(url, '', data, 'post')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  this.changeIdentityD();
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //修改旧部长的身份
          changeIdentityD() {
            let that = this;
            let url = that.BaseConfig + '/updateUserIdentity';
            if(that.oldDepartId === null) {
              that.changeDdentity();
            } else  {
              let params = {
                associationId: that.associationId1,
                userId: that.oldDepartId,
                identityId: 3  //部长变成社团成员
              };
              let data = null;
              that
                .$http(url, params, data, 'get')
                .then(res => {
                  data = res.data;
                  if(data.retCode ===0) {
                    this.changeJobD();
                  }
                })
                .catch(err => {
                  that.$Message.error('请求错误');
                })
            }
          },

          changeJobD() {
            let that = this;
            let url = that.BaseConfig + '/updateJob';
            let params = {
              associationId: that.associationId1,
              userId: that.oldDepartId,
              job : '社团成员'
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.changeDdentity();
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //修改新部长的身份
          changeDdentity() {
            let that = this;
            let url = that.BaseConfig + '/updateUserIdentity';
            let params = {
              associationId: that.associationId1,
              userId: that.userId,
              identityId: 2
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  this.changeDJob();
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          changeDJob() {
            let that = this;
            let url = that.BaseConfig + '/updateJob';
            let params = {
              associationId: that.associationId1,
              userId: that.userId,
              job : '部长'
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.$Message.success('修改成功！')
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
.ident-change {
  font-size: 25px;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
</style>
