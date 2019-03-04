<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body, p, input {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  a {
    color: rgba(255,255,255,.7);;
  }
  a:hover,
  a:active {
    color: #ffffff;
  }
#app {
  height: 100vh;
}
</style>
