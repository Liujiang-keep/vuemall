<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="../../../assets/img/tabbar/home.svg">
      <img slot="item-active-icon"  src="../../../assets/img/tabbar/home_active.svg">
     <span slot="item-text">首页</span>
    </tab-bar-item>
    <tab-bar-item path="/categary">
      <img slot="item-icon" src="../../../assets/img/tabbar/category.svg">
      <img slot="item-active-icon"  src="../../../assets/img/tabbar/category_active.svg">
      <span slot="item-text">分类</span>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="../../../assets/img/tabbar/shopcart.svg">
      <img slot="item-active-icon"  src="../../../assets/img/tabbar/shopcart_active.svg">
      <span slot="item-text">购物车</span>
    </tab-bar-item>
    <tab-bar-item path="mys">
      <img slot="item-icon" src="../../../assets/img/tabbar/profile.svg">
      <img slot="item-active-icon"  src="../../../assets/img/tabbar/profile_active.svg">
      <span slot="item-text">我的</span>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "@/components/common/tabbar/TabBar";
  import TabBarItem from "@/components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components:{
      TabBarItem,
      TabBar
    }
  }
</script>

<style scoped>

</style>