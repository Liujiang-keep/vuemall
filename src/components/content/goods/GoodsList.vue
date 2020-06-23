<template>
  <div class="goods-list">
    <goods-list-item
     v-for="item in goods"
     class="item"
     :goods-item="item">
    </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "@/components/content/goods/GoodsListItem";
  export default {
    name: "GoodsList",
    components: {GoodsListItem},
    props:{
      goods: {
        type:Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list{

  }
  .goods-list .item{
    width: 48%;
  }
</style>