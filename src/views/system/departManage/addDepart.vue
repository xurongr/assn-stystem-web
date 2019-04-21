<template>
    <div>
      <Form :model="formItem" :label-width="80">
        <FormItem label="部门名称：">
          <Input v-model="formItem.departmentName" ></Input>
        </FormItem>
        <FormItem label="部长学号：">
          <Input v-model="userName" @on-change="searchUser" placeholder="请输入学号，如：2015102210"></Input>
        </FormItem>
        <FormItem label="部长名字：">
          <Input v-model="formItem.ministerUserName" disabled></Input>
        </FormItem>
        <FormItem label="部门介绍：">
          <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="在此输入部门简介..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="addDepart">添加</Button>
          <Poptip
            confirm
            title="确认取消添加此部门？"
            @on-ok="ok"
           >
            <Button style="margin-left: 8px">取消</Button>
          </Poptip>
        </FormItem>
      </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              formItem: {
                associationId: null,
                departmentName: '',
                content: '',
                ministerUserId: null,
                ministerUserName: '',
                createTime: new Date().getTime(),
              },
              closeM: false,
              userName: '',
              searchInfo: [],
            }
        },

        created() {
          this.formItem.associationId = this.$route.query.associationId;
        },

        methods: {
          //查找是否有次用户
          searchUser() {
            let that = this;
            let url = that.BaseConfig + '/selectUsersAll';
            let params = {
              associationId: that.formItem.associationId,
              userName: that.userName,
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
                  that.formItem.ministerUserName = that.searchInfo[0].name;
                  that.formItem.ministerUserId = that.searchInfo[0].id;
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //添加部门
          addDepart() {
            let that = this;
            let url = that.BaseConfig + '/insertDepartment';
            let data = that.formItem;
            console.log(data)
            that
              .$http(url, '', data, 'post')
              .then(res => {
                console.log('--添加部门成功--',res)
               if(res.data.retCode === 0) {
                 that.$Message.success('添加部门成功！');
                 that.$router.push({name: 'departManage'})
               }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          ok() {

          },

        },
    }
</script>

<style lang="less" scoped>

</style>
