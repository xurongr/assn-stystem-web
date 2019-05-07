<template>
    <div class="me">
      <div class="me-left">
        <div class="me-left-title">关于Me</div>
        <div class="me-left-cont">
          <ul>
            <li @click="getMyAssn">我的社团</li>
            <li>我的活动</li>
            <li>我的申请</li>
          </ul>
        </div>
      </div>
      <div class="me-right">
        <Card :bordered="false">
          <p slot="title" class="r-title">我的社团</p>
          <p v-for="(item,index1) in assnCount" :key="index1">
            社团{{index1+1}}：{{item.associationName}}
          </p>
        </Card>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              loginInfo:[],
              assnCount:[],
            }
        },

        created() {
          this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
          this.getMyAssn();
        },

        methods: {
          //获取我参加的所有社团
          getMyAssn() {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationAllByUserId';
            let params = {
              userId: that.loginInfo.id,
              pageNo: 1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params , data, 'GET')
              .then(res =>{
                if(res.data.retCode === 0) {
                  that.assnCount = res.data.data.data;
                  console.log(that.assnCount)
                } else {
                  that.$Message.error(res.data.retMsg);
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
.me {
  width: 70%;
  display: flex;
  margin: 0 auto;
  &-left {
    background-color: #2b81f3;
    width: 240px;
    height: 400px;
    &-title {
      line-height: 60px;
      color: #ffffff;
      font-size: 22px;
      text-align: center;
    }
    &-cont {
      background-color: white;
      width: 220px;
      margin-left: 20px;
      height: 340px;
      li {
        line-height: 40px;
        border-bottom: 1px dashed #ccc;
      }
    }
  }
  &-right {
    margin: 25px;
    padding-left: 20px;
    border-left: 2px solid #f36909;
    border-bottom: 2px solid #f36909;
    /deep/ .ivu-card-head p, .ivu-card-head-inner {
      height: 33px;
    }
    /deep/ .ivu-card {
      width: 600px;
    }
    .r-title {
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 1px;
      line-height: 40px;
    }
    p{
      text-align: left;
      line-height: 35px;
      font-size: 18px;
    }
  }
}
</style>
