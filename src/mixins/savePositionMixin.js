// 统一管理页面距离顶部缓存
const mixin = {
    activated: function () {
        this.scrollWatch = true;
        document
            .getElementById("chatListScool")
            .addEventListener("scroll", this.handleScroll);
        this.$nextTick(function () {
            var routeName = this.$route.name;
            console.log(sessionStorage.getItem(routeName + "Y"));
            document.getElementById(
                "chatListScool"
            ).scrollTop = sessionStorage.getItem(routeName + "Y");
        });
    },
    beforeRouteLeave(to, from, next) {
        document
            .getElementById("chatListScool")
            .removeEventListener("scroll", this.handleScroll);
        next();
    },
    methods: {
        //监听滚动判断帖子导航条位置
        handleScroll() {
            // var that = this;
            // if (that.scrollWatch) {
            //     //当前滚动条高度
            //     var scrollTop =
            //         document.getElementById("chatListScool").pageYOffset ||
            //         document.getElementById("chatListScool").scrollTop ||
            //         document.getElementById("chatListScool").scrollTop;
            //     //判断帖子类型是否到达顶部
            //     // console.log(scrollTop);
            // }
        }
    }
}
export default mixin