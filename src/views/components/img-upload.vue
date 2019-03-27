<template>
  <div class="img-upload">
    <slot>
      <button>点击上传</button>
    </slot>
    <input
      ref="input"
      type="file"
      :accept="accept"
      :disabled="disabled"
      @change="onChange"
      :multiple="multiple"
    >
  </div>
</template>

<script>
export default {
  name: "img-uploader",
//  props: {
//    disabled: Boolean,
//    multiple: {
//      type: Boolean,
//      default: false
//    },
//    accept: {
//      type: String,
//      default: "image/*"
//    },
//    resultType: {
//      type: String,
//      default: "dataUrl"
//    }
//  },
  methods: {
    onChange(event) {
      let { files } = event.target;
      if (this.disabled || !files.length) {
        return;
      }
      let formdata = new FormData();
      this.$emit("uploadStart");
      formdata.append("file", files[0]);
      this.$http({
        url: this.BaseConfig + "/merchant/uploadFiles",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          if (res.data.success) {
//            this.$emit("url", res.data.data.url);
//            this.$emit("uploadSuccess");
          } else {
//            this.$emit("uploadError");
            this.$vux.toast.text("图片上传失败！");
          }
        })
        .catch(e => {
//          this.$emit("uploadError");
          this.$vux.toast.text("图片上传失败！");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.img-upload {
  position: relative;
  display: inline-block;
  input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
