<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item,index) in banners" >
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoaded">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "@/components/common/swiper";

  export default {
    name: "HomeCarousel",
    components:{
      SwiperItem,Swiper
    },
    props: {
      banners: {
        type: Array,
        required: true
      }
    },

    data(){
      return {
        isLoaded:false
      }
    },
    methods:{
      startTimer() {
        this.$refs.swiper && this.$refs.swiper.startTimer()
      },
      stopTimer(){
        this.$refs.swiper && this.$refs.swiper.stopTimer()
      },
      imageLoaded(){

      },
    }
  }
</script>

<style scoped>

</style>