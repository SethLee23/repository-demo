var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
var mailreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
const mixin = {
  mounted() {
    // this.$store.commit("setPageName", this.pageName)
    // console.log('全局混合mounted')
  },
  activated() {
    // this.$store.commit("setPageName", this.pageName)
    // console.log('全局混合activated')
  },
  methods: {
    // 检测手机号
    checkPhone(phone) {
      if (myreg.test(phone)) {
        return "";
      } else {
        return "el-icon-warning-outline";
      }
    },
    // 检测登录密码
    checkPassword(password) {
      if (!password) {
        return "el-icon-warning-outline";
      } else {
        return "";
      }
    },
    // 检测验证码
    valCode(code) {
      if (code.length == 6) {
        return "";
      } else {
        return "el-icon-warning-outline";
      }
    },
    // 检测邮箱
    valMail(mail) {
      if (mailreg.test(mail)) {
        return "";
      } else {
        return "el-icon-warning-outline";
      }
    },
    //
    valNickName(nickName) {
      if (!nickName) {
        return "el-icon-warning-outline";
      } else {
        return "";
      }
    },
    //验证password长度
    valPassword(password) {
      if (password.length >= 6 && password.length <= 16) {
        return "";
      } else {
        return "el-icon-warning-outline";
      }
    },

    //验证password是否一致
    valPassword2(password, password1) {
      if (password == password1) {
        return "";
      } else {
        return "el-icon-warning-outline";
      }
    }
    // // 保存kimid
    // saveKimid() {
    //     // 保存 clientnum
    //     this.$api
    //         .userId({ i: localStorage.getItem("client_num") })
    //         .then(response => {
    //             console.log("success22");
    //             var data = response.data;
    //             console.log(response.code);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             //   this.$toast("获取失败");
    //         });
    // },
    // // 登录kim 并保存kimid
    // loginKim() {
    //     this.$store.commit("login");
    //     setTimeout(() => {
    //         // 存储kimid
    //         this.saveKimid();
    //     }, 6000);
    // },
    // // 获取uid，kimid
    // getid() {
    //     console.log("1.获取相关id")
    //     this.$api.getKim().then(res => {
    //         localStorage.setItem("login_uid", res.data.kimid);
    //         localStorage.setItem("appid", res.data.appid);
    //         this.getUserinfo(res.data.kimid);
    //     });
    // },
    // // 获取并存储登录相关信息
    // getUserinfo(uid) {
    //     this.$api.userInfo().then(res => {
    //         console.log("2.获取用户信息")
    //         console.log(res);
    //         let userInfo = res.data
    //         // let {n:user_name,uimg:user_avartar} = res.data
    //         let user_name = res.data.n
    //         let user_avartar = res.data.uimg
    //         this.$store.commit("setUid", uid);
    //         this.$store.commit("setUserinfo", userInfo);
    //         localStorage.setItem("user_name", user_name);
    //         localStorage.setItem("user_avartar", user_avartar);
    //         // 存取 uid == 需优化
    //         let data = { uid, user_name, user_avartar }
    //         this.$store.commit("setLoginInfo", data);
    //         // 登录 kim
    //         this.loginKim();
    //     });
    // },
  }
};
export default mixin;
