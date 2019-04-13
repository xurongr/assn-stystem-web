<template>
    <div class="webIndex">
      <p style="text-align: center;font-size: 25px; font-weight: 600;padding: 8px">入团申请表</p>
      <table border="1" cellpadding="0" cellspacing="0">
        <tr>
          <td>姓名</td>
          <td> <Input v-model="name" /></td>
          <td>性别</td>
          <td> <Input  /></td>
          <td rowspan="4"></td>
        </tr>
        <tr>
          <td>手机</td>
          <td> <Input v-model="name" /></td>
          <td>籍贯</td>
          <td> <Input /></td>
        </tr>
        <tr>
          <td>系别</td>
          <td> <Input v-model="name" /></td>
          <td>QQ</td>
          <td><Input  /></td>
        </tr>
        <tr>
          <td>社团</td>
          <td> <Input v-model="name" /></td>
          <td>部门</td>
          <td><Input  /></td>
        </tr>
        <tr>
          <td>自我介绍</td>
          <td colspan="4">
            <Input type="textarea" :autosize="{minRows: 7,maxRows: 4}" ></Input>
          </td>
        </tr>
        <tr>
          <td>申请理由</td>
          <td colspan="4">
            <Input type="textarea" :autosize="{minRows: 10,maxRows: 4}" ></Input>
          </td>
        </tr>
      </table>
      <div class="apply-btn">
        <a href="http://localhost:8082/upload_tmp/2019-04-14/doc/1555177635244-社团报名表.doc" style="padding-left: 10px">
          <Button type="info">点此下载申请表格</Button>
        </a>
        <Button type="success">提交申请</Button>
        <Router-link to="/index/web/recruitNew"><Button type="warning">取消申请</Button></Router-link>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              name:''
            }
        },

        created() {

        },

        methods: {},
    }
</script>

<style lang="less" scoped>
.webIndex {
  width: 75%;
  margin: 10px auto;
  text-align: left;
  table {
    width: 100%;
    text-align: center;
    font-size: 16px;
    tr{
      td{
        &:nth-child(1),
        &:nth-child(3) {
          width: 8%;
        }
        &:nth-child(5) {
          width: 15%;
        }
        input {
          width: 100%;
        }
        /deep/.ivu-input {
          height: 46px;
        }
      }
    }
  }
  .apply-btn {
    text-align: center;
    button {
      margin: 12px;
      font-size: 16px;
    }
  }
}
</style>
