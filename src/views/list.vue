<!-- 新闻资讯 -->
<template>
  <div class="news">
    <!-- 左侧tab -->
    <div class="bg_fff pd-tp30">
      <div class="banner flex1">
        <div class="newsLeft">
          <div class="tabList flex">
            <div class="mg-rt10">
              <img src="@/assets/images/news/news.png" class="block" alt />
            </div>
            <div
              v-for="(item, index) in catalog"
              :key="item.id"
              @click="chooseTab(index, item.id)"
              :class="
                curIndex == index ? 'tabList_item_active' : 'tabList_item'
              "
              class="catalogs"
            >
              {{ item.title }}
            </div>
          </div>
          <div v-if="catalogoContent.length">
            <div v-for="(item, index) in catalogoContent" :key="index + 100">
              <router-link
                :to="{
                  name: 'newsDetail',
                  params: { id: item.id, categary: choosenTabId }
                }"
                class="tabContent pd-tp20 pd-bt20 flex1 pointer"
              >
                <div class="tabContent_img1">
                  <img :src="item.pic" alt class="tabContent_img2" />
                </div>
                <div class="text-left tabContent_content">
                  <p class="newTrenda_word1 mult_line">{{ item.title }}</p>
                  <!-- <p class="newTrenda_word2 ft-14 color-666 mult_line">{{item.summary}}</p> -->
                  <p class="data ft-12 color-999">
                    <span>{{ item.create_time }}</span>
                    <span class="mg-lt20">{{ item.type_title }}</span>
                  </p>
                </div>
              </router-link>
            </div>
          </div>
          <div v-else class="ft-30 mg-tp100 mg-bt30 text-center">
            未找到相关资讯~
          </div>
          <!-- 底部分页布局开始 -->
          <div class="text-center mg-tp60" v-show="catalogoContent.length">
            <el-pagination
              layout="prev, pager, next"
              :total="allLength"
              :page-size="10"
              :background="true"
              @current-change="getNowCourse"
              :current-page.sync="currentPage"
            ></el-pagination>
          </div>
          <!-- 底部分页布局结束 -->
        </div>
      </div>
    </div>
    <!-- <v-footer /> -->
    <!-- <BackToTop /> -->
  </div>
</template>

<script>
// import backToTop from '@/components/backToTop.vue'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: "news",
  components: {
    // "v-footer": footer,
    // BackToTop: backToTop
  },
  data() {
    // 这里存放数据
    return {
      otherBanner: "@/assets/images/news/news-banner.jpg",
      curIndex: 0,
      news: [], // 新闻
      trends: [],
      information: [], // 资讯
      recruit: [], // 招聘
      allLength: 1, // 所有订单长度
      currentPage: 1, // 当前页
      page: 1, // 切换tab时默认页数
      tabIndex: "", // tab栏下标
      catalog: [],
      catalogoContent: [], // 分类详情
      choosenTabId: ""
    };
  },
  // 方法集合
  methods: {
    // 获取新闻列表
    getArticleList() {
      console.log(1212121);
      var data = {
        type: this.choosenTabId,
        pages: this.page,
        limit: 10
      };

      this.$api.articleList(data).then(res => {
        if (res.code === 1) {
          let extra = res.total % 10 > 0 ? 1 : 0;
          this.allLength = (parseInt(res.total / 10) + extra) * 10;
          this.catalogoContent = res.data;
          console.log("catalogoContent", this.catalogoContent);
          if (res.data.length < 10) {
            this.hasMore = false;
            this.scrollWatch = false;
          } else {
            this.hasMore = true;
          }
        } else {
          this.hasMore = false;
        }
        setTimeout(() => {}, 500);
      });
    },
    getLabel() {
      var that = this;
      return new Promise((resolve, reject) => {
        that.$api.articleCat().then(res => {
          if (res.code === 1) {
            that.catalog = res.data;
            that.choosenTabId = res.data[0].id;
          } else {
            that.$toast(res.msg);
          }
          resolve();
        });
      });
    },

    chooseTab(i, id) {
      var that = this;
      that.curIndex = i;
      this.choosenTabId = id;
      this.currentPage = 1;
      console.log(this.currentPage);
      this.page = 1;
      that.getArticleList();
      // if (that.curIndex == 0) {

      // } else if (that.curIndex == 1) {
      //   // that.allLength = that.trends.length;
      //   // that.allOrderLists = that.trends;
      //   that.getArticleList()
      // }
    },

    // 获取当前页面
    getNowCourse(page) {
      var that = this;
      that.page = page;
      that.getArticleList();
    },

    toPage() {
      window.open("https://market.cloud.tencent.com/channel/fresh#/");
    },
    setWidth() {
      var that = this;
      var nowWidth = document.body.clientWidth;
      console.log(nowWidth);
      if (nowWidth > 765) {
        that.otherBanner = "@/assets/images/news/news-banner.jpg";
      } else {
        that.otherBanner = "@/assets/images/news/news-banner-phone.png";
      }
    }

    // 生命周期 - 挂载完成（可以访问DOM元素）
  },
  async created() {
    await this.getLabel();
    await this.getArticleList();
  }
};
</script>
<style scoped>
@import "../assets/css/common.css";
/* @import "../assets/CSS/yzStyle.css"; */
/* 移动端 */
@media screen and (max-width: 765px) {
  .newsLeft {
    width: 100%;
    margin: 0 20px;
  }
  .newsRight {
    width: 100%;
    margin: 0 20px;
    padding-top: 20px;
  }
  .tabContent_img1 {
    width: 35%;
    height: 100%;
  }
  .tabContent_content {
    width: 60%;
    margin-left: 10px;
  }
  .newTrenda_word {
    width: 70%;
    /* height: 175px; */
    padding: 175px 20px 20px 40px;
    box-sizing: border-box;
    text-align: left;
    border: 1px solid #00a4ff;
    margin: 30px 30px 0 50px;
    box-shadow: 5px 7px 30px 5px rgba(159, 172, 180, 0.6);
  }
  .shadow_img {
    display: none;
  }
  .newTrenda_word1 {
    font-size: 16px;
    color: #000;
    margin-bottom: 8px;
  }
  .newTrenda_img {
    /* top:-32px;
        left:-30px;
        z-index: 100;
        width: 80%;
        height: 38%;
        box-shadow: 4px 7px 4px 0px rgba(159,172,180,.2); */
    top: 29px;
    /* left: -30px; */
    /* z-index: 100; */
    width: 75%;
    height: 17%;
    -webkit-box-shadow: 4px 7px 4px 0px rgba(159, 172, 180, 0.2);
    box-shadow: 4px 7px 4px 0px rgba(159, 172, 180, 0.2);
  }

  .tabList_item {
    font-size: 20px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
    width: 25%;
  }
  .line {
    height: 20px;
    background: #000;
    width: 2px;
    margin: 0 2%;
  }
}
@media screen and (min-width: 765px) and (max-width: 1060px) {
  .newsLeft {
    width: 100%;
    margin: 0 20px;
  }
  .newsRight {
    width: 100%;
    margin: 0 20px;
    padding-top: 20px;
  }
  .tabContent_content {
    width: 70%;
    margin-left: 20px;
  }
  .tabContent_img1 {
    width: 25%;
  }
  .newTrenda_word1 {
    font-size: 16px;
    color: #000;
    margin-bottom: 8px;
  }

  .shadow_img {
    display: none;
  }
  .newTrenda_img {
    top: -32px;
    left: -30px;
    z-index: 100;
    width: 340px;
    height: 180px;
    box-shadow: 4px 7px 4px 0px rgba(159, 172, 180, 0.2);
  }
  .newTrenda_word {
    width: 70%;
    /* height: 175px; */
    padding: 175px 20px 20px 40px;
    box-sizing: border-box;
    text-align: left;
    border: 1px solid #00a4ff;
    margin: 30px 30px 0 50px;
    box-shadow: 4px 7px 4px 0px rgba(159, 172, 180, 0.6);
  }
  .tabList_item {
    font-size: 20px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
    /* width: 25%; */
  }
  .line {
    height: 20px;
    background: #000;
    width: 2px;
    margin: 0 10px;
  }
}
/* pc端 */
@media screen and (min-width: 1060px) {
  .newsLeft {
    width: 100%;
    /* margin: 0 20px 0 10px; */
    margin: 0 15%;
  }
  .newsRight {
    width: 28.3%;
    margin: 0 10px 0 20px;
  }
  .tabContent_img1 {
    width: 180px;
    height: 114px;
  }
  .tabContent_content {
    width: 74%;
    margin-left: 20px;
  }
  .newTrenda_word1 {
    font-size: 20px;
    color: #000;
    margin-bottom: 8px;
  }

  .newTrenda_word {
    width: 93%;
    /* height: 175px; */
    padding: 20px 20px 20px 340px;
    box-sizing: border-box;
    text-align: left;
    border: 1px solid #00a4ff;
    margin: 32px 30px 0 50px;
    /* background: url(../../static/images/news/border-blue-shadow.png) center no-repeat;
        background-size: cover;
        background-position: center; */
    /* box-shadow: 4px 7px 4px 0px rgba(159,172,180,.6); */
    /* box-shadow: 5px 5px 10px gray inset; */
  }
  .shadow_img {
    position: absolute;
    left: -10px;
    top: 0;
  }
  .newTrenda_img {
    top: -32px;
    left: -30px;
    z-index: 100;
    width: 340px;
    height: 180px;
    box-shadow: 4px 7px 4px 0px rgba(159, 172, 180, 0.2);
  }
  .tabList_item {
    font-size: 20px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
    /* width: 25%; */
  }
  .line {
    height: 20px;
    background: #000;
    width: 2px;
    margin: 0 10px;
  }
}
div.catalogs:not(:nth-last-child(1)) {
  border-right: 2px solid #000;
  padding-right: 10px;
  margin-right: 10px;
}
.news >>> .footer {
  margin-top: auto;
}
.news {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
/* 最新动态 */
.newTrenda {
  overflow: hidden;
}

.newTrenda_img div {
  /* background: url(@/assets/images/news/Newest.jpg) center no-repeat; */
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  /* object-fit: contain; */
}

.newTrenda_word2 {
  line-height: 24px;
}
.newTrenda_word3 {
  line-height: 20px;
  margin-top: 30px;
}
.flex {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
/* 新闻页面下面左侧tab */
.flex1 {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
}

.tabList {
  height: 48px;
  border-bottom: 1px solid #e5e5e5;
}

.tabList_item_active {
  font-size: 20px;
  color: #00a4ff;
  font-weight: 700;
  cursor: pointer;
}

.tabContent {
  border-bottom: 1px solid #e5e5e5;
}
.tabContent:hover {
  background: #f7f8fa;
}

.tabContent_img2 {
  width: 100%;
  height: 100%;
}

.data {
  line-height: 20px;
  margin-top: 12px;
}
/* 右侧招聘 */

.informBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}
.inform_title1 {
  font-size: 18px;
  color: #000;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 8px;
}
.inform_title2 {
  font-size: 14px;
  color: #666;
  line-height: 24px;
}
.inform_right {
  font-size: 24px;
  color: #ff7201;
  font-weight: 700;
}
.email {
  color: #00a4ff;
  font-size: 18px;
  line-height: 28px;
  font-weight: 700;
}
</style>
