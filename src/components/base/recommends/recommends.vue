<template>
  <div class="main-container">
    <div class="container-recommend">
      <div class="recommend" v-if="item" v-for="d in item" :key="d.key">
        <recommend :data="d"></recommend>
      </div>
      <loading v-else></loading>
      <div class="isfull">{{isFullTxt}}</div>
    </div>
    <div class="container-category">
      <category :category="category" @setCategory="selectCategory"></category>
    </div>
  </div>
</template>

<script>
import Recommend from "@/components/base/recommend/recommend";
import Loading from "@/components/base/loading/loading";
import {
  getRecommendByTypes,
  getRecommendTypesCount,
  getRecommendsCount
} from "@/api/recommend/recommend";
import Category from "@/components/base/category/category";
import { isBottom, once } from "@/common/js/common";
export default {
  components: {
    Recommend,
    Category,
    Loading
  },
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch("getHomepageData", this.currentPage);
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item() {
      return this.$store.state.recommends;
    },
    category() {
      return this.$store.state.category;
    },
    isFullTxt() {
      return this._checkIsFull() ? "已经到底了，别扯了" : "加载中...";
    },
    recommendsCount() {
      return this.$store.state.count;
    }
  },
  data() {
    return {
      isLogined: false,
      isLoaded: false,
      currentIndex: -1,
      currentPage: 1,
      onceFn: undefined
    };
  },
  methods: {
    selectCategory(c) {
      if (c.cid === this.currentIndex) {
        return;
      }
      this.currentIndex = c.cid;
      this.isLoaded = false;
      this.currentPage = 1;
      this.$store.commit("resetRecommends");
      if (c.cid === -1) {
        this._getRecommendByTypes(-1, this.currentPage);
      } else {
        this.$store.commit('setRecommendsCount', c.count);
        this._getRecommendByTypes(c.cid, this.currentPage);
      }
    },
    _getRecommendByTypes(type, page) {
      if (this._checkIsFull()) {
        return;
      }
      getRecommendByTypes(type, page).then(res => {
        this.$store.commit("appendRecommends", res.data);
        this.isLoaded = true;
        this.currentPage++;
        this.onceFn = once(() => {
          this._getRecommendByTypes(type, this.currentPage);
        });
      });
    },
    _checkIsFull() {
      if (
        this.item.length === this.recommendsCount &&
        this.item.length !== 0
      ) {
        return true;
      }
      return false;
    },
    _checkIsHomePage() {
      return /homepage/.test(this.$route.path)
    }
  },
  mounted() {
    this.onceFn = once(() => {
      this._getRecommendByTypes(-1, ++this.currentPage);
    });
    window.addEventListener("scroll", () => {
      if (isBottom() && this._checkIsHomePage()) {
        this.onceFn();
      }
    });
  }
};
</script>


<style lang="scss" scoped>
@import "~common/style/variable";

.main-container {
  margin: 0 auto;
  display: flex;
  max-width: 1170px;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding-top: 30px;
  .container-recommend {
    width: 75%;
    .isfull {
      width: 92%;
      text-align: center;
    }
  }
  .container-category {
    width: 24%;
  }
}
</style>
