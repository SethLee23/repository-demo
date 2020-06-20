<template>
  <div id="app">
    <router-view :key="key" />
  </div>
</template>
<script>
import router from "./router/index";
export default {
  name: "App",
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  },
  methods: {
    checkPlatForm() {
      /iphone|ipod|ipad/i.test(navigator.appVersion) &&
        document.addEventListener(
          "blur",
          event => {
            // 当页面没出现滚动条时才执行，因为有滚动条时，不会出现这问题
            // input textarea 标签才执行，因为 a 等标签也会触发 blur 事件
            if (
              document.documentElement.offsetHeight <=
                document.documentElement.clientHeight &&
              ["input", "textarea", "div"].includes(event.target.localName)
            ) {
              document.body.scrollIntoView(); // 回顶部
            }
          },
          true
        );
      var u = navigator.userAgent;
      // alert(u)
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        //安卓手机
        localStorage.setItem("platform", "Android");
      } else if (
        u.indexOf("iPhone") > -1 ||
        u.indexOf("IOS") > -1 ||
        u.indexOf("Apple") > -1
      ) {
        //苹果手机
        localStorage.setItem("platform", "IOS");
      } else if (u.indexOf("Windows Phone") > -1) {
        localStorage.setItem("platform", "WP");
      }
    },
  },
  created() {
  },
  mounted() {
  }
};
</script>

<style lang="less">
// @color:  @theme-color;
html {
  font-size: calc(100vw / 750 * 100);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
