<template>
  <div class="Empty">
    <div class="empty text-center">
      <!-- <img src="../../../assets/images/empty/empty01.png" /> -->
      <p class="ft-26 color-b6b6b6">{{ title }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Empty",
  props: {
    title: {
      type: String,
      default: "未找到相关内容"
    }
  }
};
</script>
<style lang="less" scoped>
.Empty {
  .empty {
    padding-top: 0.3rem;
    img {
      width: 3rem;
      // height: 40vw;
    }
  }
}
</style>
