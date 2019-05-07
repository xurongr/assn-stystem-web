<template>
    
</template>

<script>
    export default {
      data() {
        return{

       }
      },
      created() {
          let associationId = this.$route.query.associationId;
          this.$router.push({
            path:'/index/web/assnViews',
            query: {
              associationId: associationId,
            }
          })
      },
    }
</script>

<style scoped>

</style>
