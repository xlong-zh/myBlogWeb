<template>
  <div class="blog py-50 bg-white">
    <div v-for="(item,i) in model" :key="i">
      <Art :essay="item">666777</Art>
      <div class="border-bottom" style="width:500px;margin:0 auto;"></div>
    </div>
  </div>
</template>

<script>
import Art from "../components/Art.vue";
export default {
  data() {
    return {
      model: []
    };
  },
  components: {
    Art
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/article/list");
      this.model = res.data;
      // console.log(this.model);
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang='scss'>
</style>
