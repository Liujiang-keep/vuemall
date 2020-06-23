<template>
  <div class="tab-control">
    <div class="table-control-item"
         v-for="(item,index) in titles"
         :class="{active:currentIndex===index}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      titles:{
        type:Array,
        default() {
          return ['流行','新款','精选'];
        }
      }
    },
    data(){
      return {
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex=index

      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #ffffff;
  }
  .table-control-item{
    flex: 1;
  }
  .table-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .table-control-item.active span{
    border-bottom: 2px solid var(--color-high-text);
  }

</style>