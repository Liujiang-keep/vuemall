<template>
  <div class="goods-list">

  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default() {
          return {};
        }
      }
    },
    computed:{
      showImage(){

      }
    }
  }
</script>

<style scoped>

</style>