<template>
    <div>
      <div class="search-title">
        <div v-if="type !== 1">
          <p>选择社团：</p>
          <Select v-model="apply.associationId" @on-change="getDepartLists" style="width:150px;margin-top: 8px">
            <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div v-if="type.job !== '部长'">
          <p>选择部门：</p>
          <Select v-model="apply.departmentId" style="width:150px;margin-top: 8px">
            <Option v-for="item in departListSel" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div>
          <p>申请状态：</p>
          <Select v-model="apply.state" style="width:150px;margin-top: 8px">
            <Option v-for="item in applyState" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div style="margin: 10px 0">
        <Button type="primary" @click="searchUser">查询</Button>
      </div>
      <div>
        <Table border ref="selection" :columns="columns4" :data="applyList"></Table>
      </div>
      <div style="margin-top: 20px; display: flex;justify-content: flex-end">
        <Page :total="total" :key="total" :current.sync="current" :on-change="pageChange" />
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              access: [],
              type: 4,
              total:0,
              current: 1,
              userId: null,
              pageNo1: 1,
              pageNo2:1,
              pageNo: 1,
              assnInfo: [],
              sortAssnList: [
                {
                  value: 0,
                  label: '全部'
                }
              ],
              departList: [],           //部门列表
              departListSel: [
                {
                  value: 0,
                  label: '全部'
                }
              ],
              applyState: [
                {
                  value: -1,
                  label: '全部'
                },
                {
                  value: 0,
                  label: '申请中'
                },
                {
                  value: 1,
                  label: '通过'
                },
                {
                  value: 2,
                  label: '未通过'
                },
              ],
              apply: {
                associationId: 0,
                departmentId: 0,
                state: -1,
                type: 0,
              },
              applyList: [],
              columns4: [
                {
                  type: 'index',
                  title: '序号',
                  width: 80,
                  align: 'center'
                },
                {
                  title: '申请人',
                  key: 'name',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '意向社团',
                  key: 'associationName',
                  align: 'center',
                },
                {
                  title: '意向部门',
                  align: 'center',
                  key: 'departmentName',
                  width: 110,
                },
                {
                  title: '申请理由',
                  align: 'center',
                  key: 'content',
                  width: 500
                },
                {
                  title: '申请状态',
                  align: 'center',
                  render: (h,params) => {
                    return h('div', [
                      h('p', {
                        style: {
                          color:  params.row.state === 2 ? 'red' : '#444',
                          fontSize: '13px'
                        },
                      }, params.row.state === 0? '待审批':(params.row.state === 1? '通过': '未通过')),
                    ]);
                  }
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 200,
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small',
                          disabled: params.row.state === 0 ?false:'true'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.getEnterAssn(params.row.userId,params.row.id,params.row.associationId,params.row.departmentId,1)
                          }
                        }
                      }, '通过'),
                      h('Button', {
                        props: {
                          type: 'success',
                          size: 'small',
                          disabled: params.row.state === 0 ?false:'true'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.getEnterAssn(params.row.userId,params.row.id,params.row.associationId,params.row.departmentId,2)
                          }
                        }
                      }, '不通过'),
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.cancelApply(params.row.id);
                          }
                        }
                      }, '删除')
                    ]);
                  }
                }
              ],
            }
        },

        created() {
          this.access = JSON.parse(localStorage.getItem('access'));
          this.type = parseInt(localStorage.getItem('type'));
          this.userId = JSON.parse(localStorage.getItem('loginInfo')).id;
          if(this.type !== 1) {
            this.getAssnInfo();
            this.getApplyList();
          } else {
            this.apply.associationId = this.access[0].associationId;
            this.getApplyList();
          }
        },

        methods: {
          //改变页数
          pageChange(val) {
            this.pageNo = val;
            this.getApplyList();
          },

          //检查用户是否已经是该社团成员
          getEnterAssn(userId,id,assnId,departId,num) {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationAllByUserId';
            let params = {
              userId : userId,
              pageNo: 1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  if(data.data.total === 0) {
                    this.applyChange(id,userId,assnId,departId,num);
                  } else {
                    let enjoyAssn = data.data.data;
                    let flag = 0;
                    enjoyAssn.map(item =>{
                      if(item.associationId === assnId) {
                        flag = 1;
                        return;
                      } else {flag = 2;}
                    })
                    if(flag === 1) {
                      that.$Message.warning('此用户已是该社团成员！');
                    } else {
                      this.applyChange(id,userId,assnId,departId,num);
                    }
                  }
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          applyChange(id,userId,assnId,departId,num){
            let that = this;
            let url = that.BaseConfig + '/updateApplyState';
            let params = {
              applyId : id,
              state : num,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                console.log(data)
                if(data.retCode ===0) {
                  that.addUserToDepart(userId,assnId,departId);
                } else {
                  that.$Message.warning(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //添加用户进入社团某部门
          addUserToDepart(userId,assnId,departId) {
            let that = this;
            let url = that.BaseConfig + '/insertUserToDepartment';
            let params = {
              userId: userId,
              associationId: assnId,
              departmentId: departId,
            };
            let data = null;
            that
              .$http(url, params , data, 'get')
              .then(res =>{
                data = res.data;
                if(data.retCode === 0) {
                  that.$Message.success('处理完成！');
                  that.getApplyList();
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          searchUser() {  //查询
            this.pageNo = 1;
            this.getApplyList();
          },

          //获取申请列表
          getApplyList() {
            let that = this;
            let url = that.BaseConfig + '/selectApplyAll';
            if(that.apply.associationId === 0) {that.apply.associationId = ''}
            if(that.apply.departmentId === 0) {that.apply.departmentId = ''}
            if(that.apply.state === -1) {that.apply.state = ''}
            let params = {
              associationId:that.apply.associationId,
              departmentId:that.apply.departmentId,
              state: that.apply.state,
              type: 0,
              pageNo: that.pageNo,
              pageSize:10
            };
            that
              .$http(url, params, '', 'get')
              .then(res => {
                if (res.data.retCode === 0) {
                  that.applyList = res.data.data.data;
                  that.total = res.data.data.total;
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取社团列表
          getAssnInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationAll';
            let params = {
              pageNo: that.pageNo1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.assnInfo = that.assnInfo.concat(data.data.data);
                  that.assnInfo.map(item =>{
                    that.sortAssnList.push({
                      value: item.id,
                      label: item.associationName,
                    });
                  })
                  if(that.assnInfo.length < data.data.total) {
                    that.pageNo1++;
                    that.getAssnInfo();
                  }
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          getDepartLists() {
            this.pageNo2 = 1;
            this.departList = [];
            this.departListSel = [
              {
                value: 0,
                label: '全部'
              }
            ];
            this.getDepartList();
          },

          //获取部门列表
          getDepartList() {
            let that = this;
            if(that.apply.associationId === null || that.apply.associationId === undefined) {
              that.$Message.warning('请先选择社团!');
            } else {
              let url = that.BaseConfig + '/selectDepartmentAll';
              let params = {
                associationId: that.apply.associationId,
                pageNo: that.pageNo2,
                pageSize: 10,
              };
              let data = null;
              that
                .$http(url, params, data, 'get')
                .then(res => {
                  data = res.data;
                  if(data.retCode ===0) {
                    that.departList = that.departList.concat(data.data.data);
                    if(that.departList.length < data.data.total) {
                      that.pageNo2++;
                      that.getDepartList();
                    }
                    that.departList.map((item,index) => {
                      that.departListSel.push({
                        value: item.id,
                        label: item.departmentName
                      })
                    })
                  }
                })
                .catch(err => {
                  that.$Message.error('请求错误');
                })
            }
          },

          //删除申请
          cancelApply(id) {
            let that = this;
            let url = that.BaseConfig + '/deleteApply';
            let params = {
              applyId : id,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.$Message.success('删除成功！');
                  that.getApplyList();
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },
        },
    }
</script>

<style lang="less" scoped>

</style>
