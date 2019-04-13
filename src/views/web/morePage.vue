<template>
    <div class="webIndex">
      <div class="more-nav">
        <p class="title">xx公告</p>
        <div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        created() {

        },

        methods: {},
    }
</script>

<style lang="less" scoped>
  .box(@width, @height) {
    width: @width;
    height: @height;
  }
  .webIndex {
    width: 75%;
    margin: 10px auto;
    text-align: left;
    display: flex;
    border: 1px solid #000;
    .more-nav {
      width: 20%;
      height: 400px;
      border: 1px solid #000;
    }
  }
</style>
