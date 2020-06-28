<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"/>
      <scroll id="tab-content"
              ref="scroll"
              :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory" />
          <tab-control :titles="['综合','新品','销量'] " @itemclick="tabClick"></tab-control>
          <goods-list :goods = "showCategoryDetail" />
        </div>

      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import TabMenu from "@/views/categary/childComps/TabMenu";
  import {getCategory, getCategoryDetail, getSubcategory} from "@/network/category";
  import Scroll from "@/components/common/scroll/Scroll";
  import {POP,NEW,SELL} from "@/common/const";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import {tabControlMixin} from "@/common/mixin";
  import TabContentCategory from "@/views/categary/childComps/TabContentCategory";

  export default {
    name: "Categary",
    components: { TabContentCategory, GoodsList, TabControl, Scroll, TabMenu, NavBar},
    mixins :[tabControlMixin],
    data(){
      return{
        categories:[],
        categoryData:{},
        currentIndex:-1
      }
    },
    created(){
      //拿到分类数据
      this._getCategory()

      //监听图片加载完成
      this.$bus.$on('imgLoad',()=>{
        this.$refs.scroll.refresh()
      })
    },
    computed:{
      showSubcategory(){
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail(){
        if (this.currentIndex===-1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]

      }
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list
          // console.log(res);
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
        // console.log(index)
      }
    }
  }
</script>

<style scoped>
  #category{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #ffffff;
  }
  .content{
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content{
    height: 100%;
    flex: 1;
  }
</style>