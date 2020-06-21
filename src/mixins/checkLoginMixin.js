/*
 * @Author: your name
 * @Date: 2020-04-29 14:28:39
 * @LastEditTime: 2020-05-06 16:13:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dyd-h5web\src\mixins\checkLoginMixin.js
 */
import { createNamespacedHelpers } from "vuex";
const {
  mapActions,
  mapState,
  mapMutations,
  mapGetters
} = createNamespacedHelpers("main");
import cookie from "@/utils/cookie";
const mixin = {
  data() {
    return {
      user: {
        userGray: require("../static/image-li/live/ren-black.png"),
        userRed: require("../static/image-li/live/ren-red.png")
      },
      dialoguePop: {
        0: {
          title: "退出提醒",
          message: "您确定要退出登录嘛？"
        },
        1: {
          title: "登录",
          message: "您还未登录，立即登录？"
        }
      }
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.account.isLogin,
      nickname: state => state.account.nickname,
      avatar: state => state.account.avatar
    })
  },
  methods: {
    ...mapMutations({
      setAccount: "account/setAccount",
      setToken: "account/setToken",
      LOGOUT: "account/LOGOUT",
      setLoginInfo: "kim/setLoginInfo"
    }),
    ...mapActions({
      kimLoginOut: "kim/kimLoginOut"
    }),

    showToast() {
      let { isLogin, dialoguePop } = this;
      let that = this;
      let dialogueInfo = isLogin ? dialoguePop[0] : dialoguePop[1];
      this.$dialog
        .confirm({
          title: dialogueInfo.title,
          message: dialogueInfo.message
        })
        .then(() => {
          // on confirm
          if (isLogin) {
            console.log(12, isLogin);
            // kim 登出 初始化store数据
            that["kimLoginOut"]();

            localStorage.clear();
            that["setLoginInfo"]();
            // 初始化store 中 account数据
            this["LOGOUT"]();
            cookie.clearCookie();
          }
          this.$router.push({
            name: "login"
          });
        })
        .catch(e => {
          console.log(e);
          // on cancel
        });
    }
  }
};
export default mixin;
