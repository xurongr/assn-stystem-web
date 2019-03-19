<template>
  <div class="breadcumb">
    <div class="breadcumb-list">
      <div v-for="(item, i) in breadcumb.list" :key="i" class="breadcumb-link" :class="{last: i == breadcumb.list.length -1}">
        <router-link :to="{path: item.path}">{{item.name}}</router-link>
        <span v-if="i < breadcumb.list.length - 1"> ></span>
      </div>

    </div>
    <span class="breadcumb-title">
      {{breadcumb.active}}
    </span>
  </div>
</template>
<script>
  export default{
    data(){
      return {
      }
    },
    props:{
      breadcumb:{
        type: Object
      }
    }
  }
</script>
<style lang="less" scoped>
  .breadcumb{
    height: .6rem;
    line-height: .6rem;
    padding: 0 .4rem;
    overflow: hidden;
    .breadcumb-title{
      float: left;
      font-size: .16rem;
      color: #333;
    }
    .breadcumb-list {
      float: right;
      .breadcumb-link{
        display: inline;
        a{
          color: #666;
          font-size: .12rem;
        }
        span{
          padding: 0 .05rem;
        }
        &.last{
          a{

          }
        }
      }
    }
  }
</style>
