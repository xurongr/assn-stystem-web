<template>
    <div>
      <Form :model="formItem" :label-width="80">
        <FormItem label="活动标题：">
          <Input v-model="formItem.activityName" placeholder="输入活动标题" style="width:300px"></Input>
        </FormItem>
        <!--所属社团，负责人为该社团下的成员-->
        <FormItem label="所属社团：">
          <Select v-model="formItem.associationId" style="width:200px" @on-open-change="choiceUser">
            <Option v-for="item in searchAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="负责人：">
          <Select v-model="formItem.userId" style="width:200px">
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
              <DatePicker type="date" :options="options3" placeholder="Select date" v-model="sDate"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <TimePicker type="time" placeholder="Select time" v-model="sTime"></TimePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="结束时间：">
          <Row>
            <Col span="11">
              <DatePicker type="date" :options="options3" placeholder="Select date" v-model="eDate"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <TimePicker type="time" placeholder="Select time" v-model="eTime"></TimePicker>
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
              options3: {
                disabledDate (date) {
                  return date && date.valueOf() < Date.now() - 86400000;
                }
              },
              sDate:'',
              sTime: '',
              eDate: '',
              eTime: '',
              formItem: {
                activityName: '',
                address: '',
                content: '',
                image: '',
                associationId: null,
                userId: null,
                score : null,
                startTime: '',
                endTime: '',
              },
              pageNo: 1,
              pageNo1: 1,
              associationList: [],   // 社团列表
              searchAssnList: [],
              userInfo: [],       //社团下的用户列表
              userAssnList: [],
              defaultList: [],
              imgName: [],
              visible: false,
              uploadList: []
            }
        },

        created() {
          this.getAssnList();
        },

        methods: {
          //获取社团列表
          getAssnList() {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationAll';
            let params = {
              pageNo: that.pageNo1,
              pageSize: 10
            };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                data = res.data;
                console.log(data)
                if(data.retCode === 0) {
                  that.associationList = that.associationList.concat(data.data.data);
                  if(that.associationList.length < data.data.total) {
                    that.pageNo1++;
                    that.getAssnList();
                  }
                  that.associationList.map(item =>{
                    that.searchAssnList.push({
                      value: item.id,
                      label: item.associationName
                    });
                  });
                } else {
                  that.$Message.error(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          choiceUser() {
            if(this.formItem.associationId === null) {
              this.$Message.warning('请选择所属社团');
            } else {
              this.pageNo = 1;
              this.userInfo = [];
              this.userAssnList = [];
              this.getInfo();
            }
          },

          //获取用户列表
          getInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationUserAll';
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
                  that.userInfo = that.userInfo.concat(data.data.data);
                  if(that.userInfo < data.data.total) {
                    that.pageNo++;
                    that.getInfo();
                  }
                  that.userInfo.map((item,index) =>{
                    that.userAssnList.push({
                      value: item.id,
                      label: item.name
                    });
                  });
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //创建活动
          addActivity() {
            let that = this;
            let url = that.BaseConfig + '/insertAssnA';
            let date = that.sDate.getFullYear() + '-' + (that.sDate.getMonth() + 1) + '-' + that.sDate.getDate()+ ' ' + that.sTime;
            that.formItem.startTime = new Date(date).getTime();
            let endDate = that.eDate.getFullYear() + '-' + (that.eDate.getMonth() + 1) + '-' + that.eDate.getDate()+ ' ' + that.eTime;
            that.formItem.endTime = new Date(endDate).getTime();
            if(that.formItem.endTime < that.formItem.startTime) {
              that.$Message.warning('活动结束时间必须在开始时间之后！');
              return;
            }
            let data = that.formItem;
            console.log(data)
            that
              .$http(url, '', data, 'post')
              .then(res => {
                if(res.data.retCode === 0) {
                  that.$Message.success('创建成功');
                 that.$router.push({
                   name: 'activityManage'
                 })
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

          //图片上传
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
            this.formItem.image = image.join(',');
            console.log(this.formItem.image)
          },
          handleSuccess (res, file, fileList) {
            file.url = res.data;
            file.name = this.formItem.activityName;
            let image = [];
            fileList.map((item,index) => {
              image[index] = item.url
            })
            this.formItem.image = image.join(',');
            console.log(fileList,this.formItem.image)
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
