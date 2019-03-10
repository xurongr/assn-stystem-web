<template>
    <div>
      <Form :model="formItem" :label-width="80">
        <FormItem label="标题：">
          <Input v-model="formItem.name"></Input>
        </FormItem>
        <FormItem label="所属社团：">
          <Select v-model="formItem.associationName">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <!--//公告类型，只有系统管理员可选，判断userId的身份-->
        <FormItem label="公告类型：">
          <RadioGroup v-model="formItem.type">
            <Radio label="0">社团公告</Radio>
            <Radio label="1">系统公告</Radio>
          </RadioGroup>
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
                name: '',
                type: '0',
                content: '',
                userId: 1,
                // associationName: '',
              }
            }
        },

        methods: {
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
