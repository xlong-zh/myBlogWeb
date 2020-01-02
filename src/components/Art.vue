<template>
  <div class="art px-15 py-20 d-flex jc-center">
    <div class="a-img">
      <img class="w-100 h-100" :src="essay.icon" alt />
    </div>
    <div class="a-text">
      <router-link to="/" tag="h1" class="pointer">{{essay.name}}</router-link>
      <div class="fs-20">{{essay.category.map(v=>v.name).join('/')}}</div>
      <div class="fs-20">{{essay.title}}</div>
      <div>{{essay.content}}</div>
      <div>666</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    essay: {
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang='scss'>
.art {
  width: 1000px;
  margin: 0 auto 30px auto;
  // border: 1px solid red;
  .a-img {
    width: 400px;
    height: 260px;
  }
  .a-text {
    width: 400px;
    height: 260px;
    line-height: 1.8;
    overflow: hidden;
  }
}
</style>