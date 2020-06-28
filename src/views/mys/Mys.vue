<template>
 <div id="profile">
   <nav-bar class="nav-bar" ><div slot="center">我的档案</div></nav-bar>
   <user-info/>
   <account-info/>
  <normal-list-view :list-data="olderList" />
  <normal-list-view :list-data="serviceList"/>
 </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import UserInfo from "@/views/mys/childComps/UserInfo";
  import AccountInfo from "@/views/mys/childComps/AccountInfo";
  import NormalListView from "@/views/mys/childComps/NormalListView";
  export default {
    name: "Mys",
   components: {NormalListView, AccountInfo, UserInfo, NavBar},
   data(){
     return{
      olderList:[
       {icon:'message.svg',info:'我的消息'},
       {icon:'pointer.svg',info:'积分商城'},
       {icon:'vip.svg',info:'会员卡'},
      ],
      serviceList:[
       {icon:'cart.svg',info:'我的购物车'},
       {icon:'shopping.svg',info:'下载购物app'},
      ]
     }
   }
  }
</script>

<style scoped>
 #profile{
  background-color: #f2f2f2;
 }
 .nav-bar{
  background-color: var(--color-tint);
  color: #ffffff;
 }
</style>