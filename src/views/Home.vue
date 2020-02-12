<template>
  <!-- <div class="home" :style="bgData" v-if="image"> -->
  <div class="home" v-if="image">
    <div class="navtop text-primary4 w-100 py-15 d-flex jc-around">
      <h2 class="zxlname">XLong-Zh's BLOG</h2>
      <h3 class="zxllink pointer d-flex">
        <router-link class="mr-25" to="/" tag="div">HOME</router-link>
        <router-link to="/blog" tag="div">BLOG</router-link>
      </h3>
    </div>
    <div class="bg">
      <img class="w-100 h-100" src="@/assets/home_bg.jpg" alt />
    </div>
    <div class="waiting">
      <transition name="fade">
        <router-view style="box-shadow: 0px 0px 20px #999;"></router-view>
      </transition>
    </div>
    <div class="footer w-100 py-30 d-flex jc-around">
      <div class="link pointer d-flex">
        <router-link class="mr-25" to="/" tag="div">HOME</router-link>
        <router-link to="/blog" tag="div">BLOG</router-link>
      </div>
      <div class="name pointer">
        <span>Powered by</span>
        <span @click="goHref('https://cn.vuejs.org')" class="mx-5 text-grey">Vue</span>|
        <span @click="goHref('http://nodejs.cn')" class="mx-5 text-grey">NodeJs</span>|
        <span @click="goHref('https://www.mongodb.com')" class="mx-5 text-grey">MongoDB</span>
      </div>
    </div>
    <!-- <router-link to="/bar">Goto Bar</router-link>
    <router-link to="/foo">Goto Foo</router-link> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: []
      // bgData: {
      //   backgroundImage: 'url(' + require('@assets/bg-bm.jpg') + ')',
      //   backgroundRepeat: 'repeat'
      // }
    };
  },
  name: 'home',
  components: {},
  methods: {
    //新窗口打开
    goHref(addr) {
      window.open(addr);
    },
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
<style lang="scss" scoped>
.home {
  // background: url('@/assets/bg-bm.jpg') repeat;
  .fade-enter-active {
    transition: all 0.3s;
  }
  .fade-leave-active {
    transition: all 0.3s;
  }
  .fade-enter {
    transform: translateX(150%);
    position: absolute;
  }
  // .fade-leave {
  //   opacity: 1;
  // }
  .fade-leave-to {
    transform: translateX(-150%);
    // opacity: 0;
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
  }
  .footer {
    margin: 0 auto;
    .link {
      margin-right: 300px;
    }
  }
}
</style>
