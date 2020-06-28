<template>
  <div id="detail">
    <detail-nav-bar @titleClick="selectIndex" :current-index="currentIndex"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
            :data="[topImages, goods, shop, detailInfo, paramInfo, goodsList]">
      <detail-swiper :images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="goodsList"/>
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
    <toast ref="toast" />
  </div>
</template>

<script>
  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "@/network/detail";
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import Scroll from "@/components/common/scroll/Scroll";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import GoodsList from "@/components/content/goods/GoodsList";
  import BackTop from "@/components/content/backTop/BackTop";
  import {backTopMixin} from "@/common/mixin";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

  import Toast from "@/components/common/toast/Toast";
  import {mapActions} from 'vuex'
  export default {
    name: "Detail",
    components: {
      Toast,
      DetailBottomBar,
      BackTop,
      GoodsList,
      DetailCommentInfo,
      DetailGoodsInfo, DetailParamInfo, DetailShopInfo, DetailBaseInfo, DetailSwiper, Scroll, DetailNavBar},
    mixins:[backTopMixin],
    data(){
      return{
        iid: '',
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        goodsList:[],
        themeTops:[],
        currentIndex:0
      }
    },
    created(){
      this.iid=this.$route.query.iid
      //发送商品请求
      this._getDetail(this.iid)
      //拿到推荐数据
      this._getRecommend()
    },
    methods:{
      ...mapActions({
        addCart:'addToCart'
      }),
      addToCart(){
        // 2.将商品信息添加到Store中
        const obj = {}
        obj.iid = this.iid
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc
        obj.price = this.goods.realPrice
        // this.$store.dispatch('addToCart', obj).then(() => {
        //  this.$toast({message: '加入购物车成功'})
        // })
        this.addCart(obj).then(() => {
          this.$toast({message: '加入购物车成功'})
        })
      },
      imageLoad(){
        this.$refs.scroll.refresh()
        // 获取对应的offsetTop
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      selectIndex(index){
        this.$refs.scroll.scrollTo(0,-this.themeTops[index],500)
      },
      contentScroll(position){
        // 决定backTop按钮是否显示
        this.showBackTop = position.y <= -1000
        // 监听滚动到某个主题
        this._listenScrollTheme(-position.y)
      },
      _listenScrollTheme(position){
        let length = this.themeTops.length;
        for (let i = 0; i < length; i++) {
          let iPos = this.themeTops[i];
          /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
           * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
           */
          if (position >= iPos && position < this.themeTops[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
            }
            break;
          }
        }
      },
      _getDetail(iid){
        getDetail(iid).then(res =>{
          //拿到数据
          const data = res.result
          // console.log(data);

          //拿到顶部轮播图片
          this.topImages = data.itemInfo.topImages
          // console.log(this.topImages);

          //拿到商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

          //拿到店铺信息
          this.shop = new Shop(data.shopInfo)

          //获取商品详细信息
          this.detailInfo = data.detailInfo

          //保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

          //保存评论数据
          if (data.rate.list){
            this.commentInfo =data.rate.list[0]
          }

        })
      },
      _getRecommend(){
        getRecommend().then(res =>{
          this.goodsList = res.data.list
          // console.log(this.goodsList);
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #ffffff;;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>