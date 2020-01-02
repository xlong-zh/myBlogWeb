<template>
  <div class="content bg-white">
    <div class="info d-flex flex-column ai-center jc-between">
      <div class="avatar mb-15">
        <img class="w-100" :src="image[4]" alt />
      </div>
      <div class="name fs-20 mb-25">XLong-Zh</div>
      <div class="hobby mb-20">Coder</div>
      <div class="contact mb-30 d-flex jc-between">
        <router-link to="/" tag="div">
          <i class="mr-50 fs-24 iconfont icongit pointer"></i>
        </router-link>
        <router-link to="/" tag="div">
          <i class="mr-50 fs-24 iconfont iconmail1 pointer"></i>
        </router-link>
        <router-link to="/" tag="div">
          <i class="fs-24 iconfont iconshezhi pointer"></i>
        </router-link>
      </div>
      <p class="fs-16 text-grey">obsessive,love coding</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/image/list');
      this.image = res.data.map(v => v.img);
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.content {
  .info {
    margin: 0 auto;
    position: relative;
    top: -100px;
    .avatar {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      z-index: 100;
    }
  }
}
</style>
