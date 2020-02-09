<template>
  <div class="artDetail bg-white">
    <h2 class="my-10 fs-30">{{ model.name }}</h2>
    <div class="d-flex ai-center mb-25">
      <div class="img-wrap">
        <img class="w-100 h-100" :src="model.icon" alt="" />
      </div>
      <div v-if="model.category && model.category.length">
        <div class="mb-5">{{ model.title }}</div>
        <div class="d-flex ai-center fs-12 text-grey-1">
          <img width="16" src="@/assets/art.png" alt="" />
          <span class="pl-5"> 分类：{{ model.category.map(v => v.name).join('、') }} </span>
        </div>
      </div>
    </div>
    <div v-html="model.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      model: {}
    };
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.fetch();
    } else {
      this.$router.push({ name: 'blog' });
    }
  },
  methods: {
    //新窗口打开
    goHref(addr) {
      window.open(addr);
    },
    async fetch() {
      const res = await this.$http.getAction(`/article/list/${this.id}`);
      this.model = res.data;
    }
  }
};
</script>
<style lang="scss" scoped>
.artDetail {
  width: 1000px;
  margin: 0 auto;
  padding: 50px 60px;
  line-height: 1.5;
  .img-wrap {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
  }
}
</style>
