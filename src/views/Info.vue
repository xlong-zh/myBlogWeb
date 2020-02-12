<template>
  <div class="content bg-white">
    <div class="info d-flex flex-column ai-center jc-between">
      <div class="avatar mb-20">
        <img class="w-100" src="@/assets/avatar.png" alt />
      </div>
      <div class="name fs-20 mb-25">XLong-Zh</div>
      <div class="hobby mb-20">Coder</div>
      <div class="contact mb-30 d-flex jc-between">
        <div @click="goHref('https://github.com/xlong-zh')">
          <i class="mr-50 fs-24 iconfont icongit pointer"></i>
        </div>
        <div @click="visible = true">
          <i class="mr-50 fs-24 iconfont iconmail1 pointer"></i>
        </div>
        <div @click="goHref('http://zhxil.live/admin/index.html')">
          <i class="fs-24 iconfont iconshezhi pointer"></i>
        </div>
      </div>
      <p class="fs-16 text-grey">co cd coding</p>
    </div>
    <dialogDrag
      class="dialog"
      :title="title"
      width="460"
      :visible.sync="visible"
      @cancel="handleCancel"
      :showOkButton="false"
      canceltext="关闭"
    >
      <div class="info-email">
        <div>
          <span style="display:inline-block;width:80px;text-align: right;padding-right: 2px;color:#333333;"
            >Outlook：</span
          >xlong-Zh@outlook.com
        </div>
        <div>
          <span style="display:inline-block;width:80px;text-align: right;padding-right: 2px;color:#333333;">QQ：</span
          >907737948@qq.com
        </div>
      </div>
    </dialogDrag>
  </div>
</template>

<script>
import dialogDrag from '@comp/drag/dialogDrag';
export default {
  components: {
    dialogDrag
  },
  data() {
    return {
      // image: [],
      title: '邮箱',
      visible: false
    };
  },
  created() {
    // this.fetch();
  },
  methods: {
    //新窗口打开
    goHref(addr) {
      window.open(addr);
    },
    async fetch() {
      const res = await this.$http.getAction('/image/list');
      this.image = res.data.map(v => v.img);
    },
    handleCancel() {
      // this.$emit('close');
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  .info {
    margin: 0 auto;
    position: relative;
    padding: 80px 0 100px;
    .avatar {
      width: 200px;
      height: 200px;
      // border-radius: 50%;
      // overflow: hidden;
      position: absolute;
      top: -150px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
  }
  .info-email {
    font-size: 16px;
    margin-top: 5px;
    line-height: 1.8;
    color: #666666;
    padding-left: 10px;
  }
}
</style>
