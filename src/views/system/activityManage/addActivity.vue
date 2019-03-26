<template>
    <div>
      <Form :model="formItem" :label-width="80">
        <FormItem label="活动标题：">
          <Input v-model="formItem.activityName" placeholder="输入活动标题" style="width:300px"></Input>
        </FormItem>
        <!--所属社团，负责人为该社团下的成员-->
        <FormItem label="所属社团：">
          <Select v-model="formItem.associationId" style="width:200px">
            <Option v-for="item in searchAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="负责人：">
          <Select v-model="formItem.userId" style="width:200px" @on-open-change="choiceUser">
            <Option v-for="item in userAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="活动内容：">
          <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入内容"></Input>
        </FormItem>
        <FormItem label="活动分数：">
          <Input v-model="formItem.score" ></Input>
        </FormItem>
        <FormItem label="活动地址：">
          <Input v-model="formItem.address" placeholder="输入活动地址"></Input>
        </FormItem>
        <FormItem label="活动图片：">
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
            multiple
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
        <FormItem label="开始时间：">
          <Row>
            <Col span="11">
            <DatePicker type="date" placeholder="选择开始时间" v-model="formItem.startTime"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="结束时间：">
          <Row>
            <Col span="11">
            <DatePicker type="date" placeholder="选择结束时间" v-model="formItem.endTime"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <div class="add-btn">
            <Poptip
              confirm
              title="确认取消创建活动？"
              @on-ok="ok">
              <Button>取消</Button>
            </Poptip>
            <Button type="primary" style="margin: 0 20px" @click="addActivity">创建</Button>
          </div>
        </FormItem>
      </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              formItem: {
                activityName: '',
                address: '',
                date: '',
                time: '',
                content: '',
                associationId: null,
                userId: null,
                score : null,
                startTime: '',
                endTime: '',
              },
              pageNo: 1,
              pageNo1: 1,
              associationList: [],   // 社团列表
              searchAssnList: '',
              userInfo: [],       //社团下的用户列表
              userAssnList: '',

              defaultList: [
                {
                  'name': 'a42bdcc1178e62b4694c830f028db5c0',
                  'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                },
                {
                  'name': 'bc7521e033abdd1e92222d733590f104',
                  'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                }
              ],
              imgName: '',
              visible: false,
              uploadList: []
            }
        },

        created() {
          this.getAssnList();
        },

        methods: {
          //获取社团列表
          getAssnList(done) {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationAll';
            let params = {
              pageNo1: that.pageNo1,
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
                    that.searchAssnList.push({
                      value: item.id,
                      label: item.associationName
                    });
                  });
                  if(that.associationList.length < data.data.total) {
                    that.pageNo1++;
                    that.getAssnList();
                  }
                  that.getInfo();
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

          choiceUser() {
            if(this.formItem.associationId === null) {
              this.$Message.warning('请选择所属社团');
            } else {
              this.getInfo();
            }
          },

          //获取用户列表
          getInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectUsersAll';
            let params = {
              associationId: that.formItem.associationId,
              pageNo: that.pageNo,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode === 0) {
                  that.userInfo = data.data.data;
                  that.userInfo.map(item =>{
                    that.userAssnList.push({
                      value: item.id,
                      label: item.name
                    });
                  });
                  if(that.userInfo < data.data.total) {
                    that.pageNo++;
                    that.getInfo();
                  }
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //创建活动
          addActivity() {
            let that = this;
            let url = that.BaseConfig + '/selectUsersAll';
            let data = that.formItem;
            that
              .$http(url, '', data, 'post')
              .then(res => {
                console.log('--创建活动成功---',res)
                if(res.data.retCode === 0) {
                  that.$Message.success('创建成功');
//                  that.$router.push({
//                    name: 'activityManage'
//                  })
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          ok() {
            this.$router.push({
              name: 'activityManage'
            })
          },

          handleView (name) {
            this.imgName = name;
            this.visible = true;
          },
          handleRemove (file) {
            console.log(file)
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
          },
          handleSuccess (res, file) {
            console.log(res.data)
            file.url = res.data;
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
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
          }

        },
      mounted () {
        this.uploadList = this.$refs.upload.fileList;
      }
    }
</script>

<style lang="less" scoped>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
