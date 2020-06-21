import Vue from "vue";
import { ImagePreview } from "vant";

Vue.use(ImagePreview);
function getVideoImage(path, callback, secs = 1) {
  console.log("callback", callback);
  var me = this;
  let video = document.createElement("video");
  video.onloadedmetadata = function() {
    if ("function" === typeof secs) {
      secs = secs(this.duration);
    }
    console.log("this.duration", this.duration);
    console.log("secs", secs);
    this.currentTime = Math.min(
      Math.max(0, (secs < 0 ? this.duration : 0) + secs),
      this.duration
    );
  };
  video.onseeked = function(e) {
    var canvas = document.createElement("canvas");
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = canvas.toDataURL();
    callback.call(me, img, this.currentTime, e);
  };
  video.onerror = function(e) {
    callback.call(me, undefined, undefined, e);
  };
  video.src = path;
}
// 网络视频
function getVideoBlob(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.responseType = "blob";
  xhr.onload = function() {
    if (this.status == 200) {
      // 获取视频文件大小
      console.log(this.response.size / 1000000 + "MB");
      spiderVideoResponse = this.response;
      // 将response赋值为Video的src 或者也可以使用preView转换为base64的格式
      // 截取第一帧的图片方法跟第一种情况一样，而且还解决了获取图片时跨域的问题 一举两得
      getVideoImage(
        URL.createObjectURL(this.response),
        (img, time) => {
          document.body.appendChild(img);
          console.log(img, time);
        },
        10
      );
    }
  };
  xhr.send();
}
function preView(url) {
  let reader = new FileReader();
  getVideoBlob(url, function(blob) {
    reader.readAsDataURL(blob);
  });
  reader.onload = function(e) {
    console.log(e.loaded);
  };
}
const mixin = {
  data() {
    return {
      isAndroid: false,
      isiOS: false,
      avatarList: "", //用户头像
      herdImg: require("../assets/images/bigImgs/avatar.jpg"), //默认
      names: "", //名称
      phone: "", //电话
      contacts: "", //联系人
      radio: "0",
      i: false, //男
      n: false, //女
      isCropper: false, //裁剪框是否显示，true:显示，
      option: {
        img: "static/images/bigImg/train_img.png", //图片裁剪地址
        size: 1,
        full: false, //输出原图比例截图 props名full
        outputType: "jpg", //裁剪生成的图片格式
        autoCrop: true, //是否默认生成截图框
        fixed: false, //是否开启截图框宽高固定比例
        fixedNumber: [100, 100], //是否开启截图框宽高固定比例
        canMove: false //上传图片是否可以移动
      },
      fileList: [], //上传图片列表
      imgList: [], //后台获取的图片及相关信息
      videoSrc: "", //播放视频链接
      videoList: [], //上传视频列表
      showVideo: false, //是否展示video
      videoMaxNum: 1, //最多可以上传视频数量
      imgMaxNum: 9,
      ids: [], //上传图片的id
      flag: false //个人资料是否有更改
    };
  },
  created() {},
  mounted() {
    this.checkMobile();
    // 拉取渲染页面数据
    this.setUserPage();
  },
  computed: {
    userInfo() {
      return this.$store.state.userinfo;
    },
    // 页面展示头像
    defaultImg() {
      let userInfo = this.$store.state.userinfo;
      if (userInfo.uimg) {
        return userInfo.uimg;
      } else {
        return this.herdImg;
      }
    }
  },
  methods: {
    // 检查手机型号
    checkMobile() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      console.log(isAndroid);
      console.log(isiOS);
      if (isAndroid) {
        this.isAndroid = true;
      } else if (isiOS) {
        this.isiOS = true;
      }
      console.log("this.isAndroid", this.isAndroid);
      console.log("this.isiOS = true;", this.isiOS);
    },
    // 预览图片
    preview(index) {
      console.log(this.imgList);
      let imgList = [];
      this.imgList.forEach(item => {
        imgList.push(item.img);
      });
      ImagePreview({ images: imgList, startPosition: index });
    },
    checkImg(file) {
      var maxsize = 10 * 1024 * 1024; //10M
      let len = this.imgList.length + this.fileList.length;
      if (len >= 9) {
        this.$toast("图片最多上传九张");
        return;
      }
      if (!/(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(file.type)) {
        this.$toast("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种", "middle");
        return false;
      }
      if (file.size > maxsize) {
        this.$toast("单张图片不能大于10M", "middle");
        return false;
      }
      return true;
    },
    /**
     * t: 1用户图像 2用户相关图片 3用户视频 4企业营业执照
     * d: 媒体资源的数据
     *  */
    // 上传视频/头像到后台
    uploadFile(t, d) {
      this.$api
        .imageUpload({ t, d })
        .then(res => {
          this.$toast.clear();
          if (res.code == 1) {
            if (t == 3) {
              // 视频列表添加地址
              this.videoList.push({ i: res.data.id, img: res.data.src });
              console.log("this.videoUrl", this.videoList);
              this.$toast("上传成功");
            }
          } else {
            this.$toast("上传失败");
          }
        })
        .catch(err => {
          this.$toast.clear();
          console.log(err);
          this.$toast("上传失败err");
        });
    },
    // 删除相关图片/视频
    deleteRelated(id, index, type) {
      this.$toast.loading({
        message: "删除中...",
        duration: 0, // 持续展示 toast
        forbidClick: true
      });
      this.$api
        .imageDel({ id })
        .then(res => {
          this.$toast.clear();
          if (res.code == 1) {
            this.$toast("删除成功");
            if (type.t == 2) {
              // 删除图片
              this.imgList.splice(index, 1);
            } else {
              // 删除视频
              this.videoList.splice(index, 1);
            }
          } else {
            this.$toast("删除失败");
          }
        })
        .catch(err => {
          this.$toast.clear();
          this.$toast("删除失败");
        });
    },
    // 上传视频
    uploadVideoFile(event) {
      var that = this;
      this.$toast.loading({
        message: "上传中...",
        duration: 0, // 持续展示 toast
        forbidClick: true
      });
      that.percent = "已上传0%";
      var video = event.target.files[0]; //选择的文件
      var size = video.size;
      var maxsize = 50 * 1024 * 1024; //50M
      if (!/\.(mp4)$/.test(event.target.value)) {
        that.$vux.toast.text("图片类型必须是.mp4中的一种", "middle");
        return false;
      }
      if (size > maxsize) {
        this.$vux.toast.text("上传视频不能大于50M", "middle");
        return false;
      }
      console.log("进来了");
      var reader = new FileReader();
      var rs = reader.readAsDataURL(video);
      reader.onload = function(e) {
        var videoUrl = e.target.result; //result是你读取到的文件内容，此属性读取完成才能使用
        console.log(videoUrl);
        let t = 3;
        //上传视频到后台
        that.uploadFile(t, videoUrl);
        getVideoImage(videoUrl, (img, time) => {
          // document.body.appendChild(img)
          console.log("img", img.src, "time:", time);
          console.log("that.videoList");
          // that.videoList[0].img = img.src
        });
        // getVideoBase64(
        //     videoUrl
        // ).then(res => {
        //     console.log('videoUrl',videoUrl)
        //     console.log('resresresresresresresres', res);
        // });
      };
    },

    // 关闭视频
    close() {
      this.showVideo = false;
      this.videoSrc = "";
    },
    // 播放视频
    playVideo(item) {
      this.showVideo = true;
      this.videoSrc = item.img;
      // "https://im.devapi.kissneck.com.cn/storage/133_video/20200211/c9049f9778336ac83155790e9d6336fe.mp4";
    },
    // 拉取渲染页面数据
    setUserPage() {
      this.names = this.userInfo.n;
      this.phone = this.userInfo.tel;
      this.contacts = this.userInfo.tp;
      this.imgList = this.userInfo.imgList;
      this.videoList = this.userInfo.v;
      console.log("this.userInfo.v");
      console.log(this.userInfo);
      // preView(this.userInfo.v[0].img)
    },
    // 获取用户信息并清除当前数据
    getUserinfo() {
      this.$api.userInfo().then(res => {
        this.flag = false;
        if (res.code == 1) {
          this.$store.commit("setUserinfo", res.data);
          this.setUserPage();
          // this.avatarList = ''
          this.fileList = [];
        } else {
          this.$toast("获取用户信息失败，请检查网络是否正常");
        }
      });
    },
    // 上传头像
    async uploadAvatarImg() {
      let t = 1;
      let d = this.avatarList;
      await this.uploadFile(t, d);
    },
    // 上传相关图片
    async uploadRelated() {
      let t = 2;
      let d = this.fileList;
      for (let i = 0; i < this.fileList.length; i++) {
        await this.$api
          .imageUpload({ t, d: this.fileList[i].content })
          .then(res => {
            this.ids.push(res.data.id);
            // this.imgList.push({img:res.data.img,i:res.data.id})
          });
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    selse() {
      this.i = !this.i;
      this.n = false;
    },
    selse1() {
      this.n = !this.n;
      this.i = false;
    },
    //子组件传值给父组件
    image: function(msg) {
      //console.log(msg)  //裁剪后的图片地址
      var that = this;
      this.avatarList = msg;
      that.isCropper = false; //上传后将裁剪的弹窗隐藏掉
    },
    //上传头像
    uploadAvatar: function(e) {
      this.isCropper = true;
      var file = e.target.files[0];
      var size = file.size;
      var maxsize = 10 * 1024 * 1024; //10M
      if (size > maxsize) {
        this.$vux.toast.text("单张图片不能大于10M", "middle");
        return false;
      }
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.option.img = data;
        //console.log(data)
      };
      reader.readAsArrayBuffer(file);
    }
  }
};
export default mixin;
