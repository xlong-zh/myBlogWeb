<template>
  <div class="art px-15 py-20 d-flex jc-center">
    <!-- <div class="a-img"> -->
    <div @click="toArtDetail" class="a-img pointer"><img class="w-100 h-100" :src="essay.icon" alt /></div>
    <!-- </div> -->
    <div class="a-text">
      <h1 @click="toArtDetail" class="pointer fs-30">{{ essay.name }}</h1>
      <div class="fs-18 mb-15">{{ essay.category.map(v => v.name).join('/') }}</div>
      <div class="fs-20">{{ essay.title }}</div>
      <!-- <div>{{ essay.content }}</div> -->
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
  },
  methods: {
    toArtDetail() {
      this.$router.push({
        name: 'ArtDetail',
        params: {
          id: this.essay._id
        }
      });
    }
  }
};
</script>
<style lang="scss" socped>
.art {
  width: 1000px;
  margin: 0 auto 30px auto;
  // border: 1px solid red;
  .a-img {
    width: 480px;
    height: 260px;
    margin-right: 60px;
  }
  .a-text {
    width: 400px;
    height: 260px;
    line-height: 1.5;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
