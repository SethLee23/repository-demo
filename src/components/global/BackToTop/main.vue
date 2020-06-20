<template>
  <div class="BackToTop">
    <div class="fixed">
      <!-- <img @click="BackToTop" v-show="backToTop" src="@/assets/images/icons/backTop.png" alt /> -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
function throttle(fn, delay = 300) {
  var timer;
  return function() {
    var _this = this;
    var args = arguments;
    if (timer) {
      return;
    }
    timer = setTimeout(function() {
      fn.apply(_this, args);
      timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
    }, delay);
  };
}
export default {
  name: "BackToTop",
  data() {
    return {
      backToTop: false,
      el: "",
      containerScroll: ""
    };
  },
  props: {
    scrollType: {
      type: String,
      default: "window"
    }
  },
  methods: {
    scrollToTop() {
      var that = this;
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var browserHeight = window.outerHeight;
      if (scrollTop > browserHeight) {
        that.backToTop = true;
      } else {
        that.backToTop = false;
      }
      window.localStorage.setItem("scorllHeight", scrollTop);
    },
    BackToTop() {
      if (this.scrollType == "container") {
        $(".wrap-pull").animate({ scrollTop: 0 }, 500, "swing");
      } else {
        let back = setInterval(() => {
          if (document.body.scrollTop || document.documentElement.scrollTop) {
            document.body.scrollTop -= 50;
            document.documentElement.scrollTop -= 50;
          } else {
            clearInterval(back);
          }
        });
      }
    }
  },
  mounted() {
    var that = this;
    if (this.scrollType == "container") {
      this.el = $("#chatListScool")[0];
      this.containerScroll = throttle(() => {
        if (this.el.scrollTop > 350) {
          this.backToTop = true;
        } else {
          this.backToTop = false;
        }
      });
      this.el.addEventListener("scroll", that.containerScroll);
    } else {
      window.addEventListener("scroll", that.scrollToTop);
    }
  },
  destroyed() {
    var that = this;
    // if (this.scrollType == "container") {
    //   this.el = $("#chatListScool")[0];
    //   this.el.removeEventListener("scroll", that.containerScroll);
    // }
    // window.removeEventListener("scroll", that.scrollToTop);
  }
};
</script>

<style scoped>
.fixed {
  position: fixed;
  bottom: 1.5rem;
  right: 0.3rem;
  z-index: 99;
}
.fixed img {
  width: 0.6rem;
  height: 0.6rem;
}
</style>