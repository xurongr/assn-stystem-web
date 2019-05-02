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
          原社团负责人:<Input v-model="oldName" style="width:150px"></Input>
          ->更换后的负责人：<Input v-model="nowName" @on-blur="searchUser" placeholder="输入名字，如：蓉蓉" style="width:150px"></Input>
          <Button type="primary" @click="changePresident">确认更换该会长</Button>
        </div>
        <div>
          选择部门：
          <Select v-model="departmentId" style="width:150px;margin-bottom: 10px" @on-change="getDepartOldName">
            <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          ->
          原部门负责人:<Input v-model="getDepartName" style="width:150px;"></Input>
          ->更换后的负责人：<Input v-model="nowName" @on-blur="searchUser" placeholder="输入名字，如：蓉蓉" style="width:150px"></Input>
          <Button type="success">确认更换该部长</Button>
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
              oldName: '',
              oldId: null,
              nowName: '',
              getDepartName: '',
              oldDepartId: null,
              assnInfo: [],
              sortAssnList: [],  //社团列表
              associationId: null,
              pageNo: 1,
              departInfo: [],
              departList: [],    //某社团下的部门列表
              departmentId: null,
              pageNo1:1,
              modal2: false,
              closeM: false,
              searchInfo: [],
              userId: null,
              assnHInfo: [],
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
          this.getInfo();
          this.getDepartList();
      },

        methods: {
          getOldName() {   //获取原社团负责人
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

          addName(row) {
            this.userId = row.userId;
            this.nowName = row.name;
            this.modal2 = false;
          },

          //获取部门列表
          getDepartList() {
            let that = this;
            let url = that.BaseConfig + '/selectDepartmentAll';
            let params = {
              associationId: '',
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

          //查找是否有次用户
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

          //更换会长
          changePresident() {
            this.getAssnInfo();   //获取该社团信息
            // this.changeIdentity(this.userId,2);
            // if(this.oldId !== null) {
            //   this.changeIdentity(this.oldId,3);
            // }
            // this.changeJob(this.userId,'会长');
            // if(this.oldDepartId !== null) {
            //   this.changeJob(this.oldDepartId,'社团成员');
            // }
          },

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
            that.assnHInfo.createTime = new Date().getTime();
            let data = that.assnHInfo;
            that
              .$http(url, '', data, 'post')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  this.changeJob(this.userId,'会长');
                  if(this.oldId !== null) {
                    this.changeJob(this.oldId,'社团成员');
                  }
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          changeIdentity(userId,num) {
            let that = this;
            let url = that.BaseConfig + '/updateUserIdentity';
            let params = {
              associationId: that.associationId,
              userId: userId,
              identityId: num
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  this.$Message.success('更换成功!');
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          changeJob(userId,job) {
            let that = this;
            let url = that.BaseConfig + '/updateJob';
            let params = {
              associationId: that.associationId,
              userId: userId,
              job : job
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  this.$Message.success('更换成功');
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
