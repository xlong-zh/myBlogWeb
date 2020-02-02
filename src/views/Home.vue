<template>
  <div class="home" v-if="image">
    <div class="navtop text-primary4 w-100 py-15 d-flex jc-around">
      <h2 class="zxlname pointer">XLong-Zh's BLOG</h2>
      <h3 class="zxllink pointer d-flex">
        <router-link class="mr-25" to="/" tag="div">HOME</router-link>
        <router-link to="/blog" tag="div">BLOG</router-link>
      </h3>
    </div>
    <div class="bg">
      <img class="w-100 h-100" :src="image[2]" alt />
    </div>
    <div class="waiting">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <div class="footer w-100 py-30 d-flex jc-around">
      <div class="link pointer d-flex">
        <router-link class="mr-25" to="/" tag="div">HOME</router-link>
        <router-link to="/blog" tag="div">BLOG</router-link>
      </div>
      <div class="name pointer">
        <span>Powered by</span>
        <router-link to="/" tag="span" class="mx-5 text-grey">Vue</router-link>|
        <router-link to="/" tag="span" class="mx-5 text-grey">NodeJs</router-link>|
        <router-link to="/" tag="span" class="mx-5 text-grey">MongoDB</router-link>
      </div>
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
  name: 'home',
  components: {},
  methods: {
    async fetch() {
      const res = await this.$http.getAction('/image/list');
      this.image = res.data.map(v => v.img);
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.home {
  .fade-enter-active {
    transition: all 0.3s;
  }
  .fade-leave-active {
    transition: all 0.3s;
  }
  .fade-enter {
    transform: translateX(100%);
    position: absolute;
  }
  .fade-leave-to {
    transform: translateX(-100%);
    position: absolute;
  }
  .navtop {
    margin: 0 auto;
    position: fixed;
    top: 0;
    z-index: 999;
    .zxlname {
      margin-right: 500px;
    }
  }
  .bg {
    height: 500px;
  }
  .waiting {
    position: relative;
    top: -130px;
    width: 1300px;
    min-height: 300px;
    margin: 0 auto -130px auto;
    box-shadow: 0px 0px 20px #999;
  }
  .footer {
    margin: 0 auto;
    .link {
      margin-right: 300px;
    }
  }
}
</style>
