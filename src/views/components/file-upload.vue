<template>
    <div>
      <Upload
        :action="upUrl"
        :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline">上传附件</Button>
      </Upload>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              upUrl: this.BaseConfig + '/fileUpload',     // 上传文件传入地址
              studentFileUrl: '',
            }
        },

        methods: {
          //上传文件成功回调传回地址
          handleSuccess (res, file) {
            this.studentFileUrl = res.data;
            console.log(res.data)
          },
        }
    }
</script>

<style scoped>

</style>
