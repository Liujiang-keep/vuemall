<template>
  <swiper>
    <swiper-item v-for="(item, index) in images"
                 :key="index" class="swiper-item">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

	export default {
		name: "DetailSwiper",
    components: {
			Swiper,
      SwiperItem
    },
    props: {
			images:{
			  type:Array
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
  .swiper-item {
    height: 300px;
  }
</style>