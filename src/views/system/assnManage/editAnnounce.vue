<template>
    <div>
      <Form :model="announceInfo" :label-width="80">
        <FormItem label="标题：">
          <Input v-model="announceInfo.title"></Input>
        </FormItem>
        <FormItem label="所属社团：">
          <Select v-model="announceInfo.associationId" style="width:200px" disabled>
            <Option v-for="item in assnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="公告内容：">
          <Input v-model="announceInfo.content" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="输入公告内容..."></Input>
        </FormItem>
        <!--<FormItem label="发布时间：">-->
          <!--<Input v-model="announceInfo.createTime"></Input>-->
        <!--</FormItem>-->
        <FormItem>
          <Button type="primary" @click="editAnounce">修改</Button>
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
        noticeId: null,   //公告id
        announceInfo: '',
        associationList: [],   //社团列表
        assnList: [],          //社团选择框
        pageNo: 1,
      }
    },

    created() {
      this.noticeId = this.$route.query.noticeId;
      this.getInfo();
      this.getAssnList();
    },

    methods: {
      //获取公告信息
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectNoticeById';
        let params = {
          noticeId: that.noticeId,
        };
        let data = null;
        that
          .$http(url, params , data, 'GET')
          .then(res =>{
            data = res.data
            if(data.retCode === 0) {
              that.announceInfo = data.data;
              console.log(that.announceInfo)
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

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

      //修改公告信息
      editAnounce() {
        let that = this;
        let url = that.BaseConfig + '/updateNotice';
        that.announceInfo.createTime = new Date().getTime();
        let data = that.announceInfo;
        that
          .$http(url, '' , data, 'post')
          .then(res =>{
            console.log('修改',res)
            if(res.data.retCode === 0) {
              that.$Message.success('修改成功');
              that.$router.push({
                name: 'announcementManage'
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
          name: 'announcementManage'
        })
      },
    }
  }
</script>

<style scoped>

</style>
