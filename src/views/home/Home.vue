<template>
  <div id="home">
    <nav-bar class="home-nav" ><div slot="center">购物街</div></nav-bar>

    <scroll :probe-type="3"
            class="content"
            ref="scroll">
      <home-carousel ref="hSwiper" :banners="banners"></home-carousel>
      <recommend-view :recommends="recommends"></recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeCarousel from "@/views/home/childcommens/HomeCarousel";
  import HomeFeatureView from "@/views/home/childcommens/HomeFeatureView";
  import RecommendView from "@/views/home/childcommens/RecommendView";
  import {getMultiData,getProductData} from "@/network/home";
  import Scroll from "@/components/common/scroll/Scroll";
  import TabControl from "@/components/content/tabControl/TabControl";
  import {POP,NEW,SELL} from "@/common/const";
  import GoodsList from "@/components/content/goods/GoodsList";

  export default {
    name: "Home",
    components:{
      GoodsList,
      TabControl,
      Scroll,
      NavBar,
      HomeFeatureView,
      HomeCarousel,
      RecommendView,
    },
    data() {
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page: 1,list: []},
          'new':{page: 1,list: []},
          'sell':{page: 1,list: []}
        },
        currentType:POP
      }
    },
    computed:{
      showGoodsList(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求轮播数据
      this._getMultiData()

      //请求商品数据
      this._getProductData(POP)
      this._getProductData(NEW)
      this._getProductData(SELL)
    },
    methods:{
      _getMultiData(){
        getMultiData().then(res=>{
          this.banners = res.data.banner.list
          // console.log(res.data);
          this.recommends= res.data.recommend.list
          // console.log(this.recommends);
        })
      },
      _getProductData(type) {
        // 获取页码
        const page = this.goods[type].page
        // console.log(page);
        getProductData(type, page).then(res => {
          const newList = res.data.list
          // console.log(res.data)

          this.goods[type].list.push(...newList)
          this.goods[type].page += 1

          // 完成加载更多数据
          this.$refs.scroll.finishedPullUp()
        })
      },
      //事件监听
        tabClick(index){
          // console.log(index)
          switch (index) {
            case 0:
              this.currentType=POP
              break
            case 1:
              this.currentType=NEW
              break
            case 2:
              this.currentType=SELL
          }
        }
      }

  }
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }
  .content{
    width: 100%;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>