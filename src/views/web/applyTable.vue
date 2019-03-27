<template>
    <div class="webIndex">
      <table border="1" cellpadding="0" cellspacing="0">
        <tr>
          <th colspan="4"> 申请表格</th>
        </tr>
        <tr>
          <td>姓名</td>
          <td> <Input v-model="name" style="width: 100px" /></td>
          <td>性别</td>
          <td> <Input  style="width: 100px" /></td>
        </tr>
      </table>
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
}
</style>
