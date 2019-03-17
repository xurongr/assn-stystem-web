<template>
    <div>
      <Form :model="formItem" :label-width="80">
        <FormItem label="标题：">
          <Input v-model="formItem.name"></Input>
        </FormItem>
        <FormItem label="所属社团：">
          <Select v-model="formItem.associationId" style="width:200px">
            <Option v-for="item in assnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="公告内容：">
          <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="输入公告内容..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="addAnounce">发布</Button>
          <Poptip
            confirm
            title="确认取消添加用户？"
            @on-ok="ok">
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
                associationId: 0,
                associationName: "",
                content: "",
                name: "",
                type: 0,   //0-社团公告，1-系统公告
                userId: null,
              },
              associationList: [],   //社团列表
              assnList: [],          //社团选择框
              pageNo: 0,
            }
        },

      created() {
        //获取用户个人信息
        this.formItem.userId = JSON.parse(window.localStorage.getItem("loginInfo")).id;
        this.getAssnList();
      },

        methods: {
          //获取社团列表
          getAssnList(done) {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationAll';
            let params = {
              pageNo: that.pageNo,
              pageSize: 10
            };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                data = res.data;
                if(data.retCode === 0) {
                  that.associationList = that.associationList.concat(data.data.data);
                  that.associationList.map(item =>{
                    that.assnList.push({
                      value: item.id,
                      label: item.associationName
                    });
                  });
                  if(that.associationList.length < data.data.total) {
                    that.pageNo++;
                    that.getAssnList();
                  }
                  console.log(that.associationList,that.pageNo)
                } else {
                  that.$Message.error(data.retMsg);
                }
                done?done():null;
              })
              .catch(err => {
                that.$Message.error('请求错误');
                done?done():null;
              })
          },

          //创建社团
          addAnounce() {
            let that = this;
            let url = that.BaseConfig + '/insertNotice';
            let data = that.formItem;
            that
              .$http(url, '' , data, 'post')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.$Message.success('创建成功');
                  that.$router.push({
                    path: '/index/announcementManage',
                  })
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          ok() {
            this.$router.push({
              path: '/index/announcementManage',
            })
          },
        }
    }
</script>

<style scoped>

</style>
