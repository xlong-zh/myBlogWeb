<template>
  <div class="blog py-50 bg-white">
    <div v-for="(item, i) in model" :key="i">
      <Art :essay="item"></Art>
      <div class="border-bottom" style="width:630px;margin:0 auto;"></div>
    </div>
  </div>
</template>

<script>
import Art from '@comp/Art.vue';
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
      const res = await this.$http.getAction('/article/list');
      this.model = res.data;
      // console.log(this.model);
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss" scoped></style>
