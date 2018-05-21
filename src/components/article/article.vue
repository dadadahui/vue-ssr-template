<template>
<div class="art_container">
  <div v-if="isLoading" class="article">
    <div class="title">{{article.title}}</div>
    <div class="status">
      <div class="author">{{article.author}}</div>
      <div class="create_dt">{{mongoTimeFormat(article.create_dt)}}</div>
    </div>
    <hr/>
    <div class="content" v-html="article.content"></div>
  </div>
  <loading v-else></loading>
</div>
</template>

<script>
import { getRecommend } from "@/api/recommend/recommend";
import { mongoTimeFormat } from "@/common/js/common";
import Loading from "@/components/base/loading/loading";
export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: true
    };
  },
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch("getRecommend", route.params.id);
  },
  computed: {
    article() {
      return this.$store.state.recommend
    }
  },
  methods: {
    mongoTimeFormat
  }
};
</script>

<style lang="scss" scoped>
.art_container {
  margin: 0 auto;
  max-width: 1170px;
  display: flex;
  padding: 0 20px;
  box-sizing: border-box;
  flex-flow: row nowrap;
  margin-top: 20px;
  .article {
    width: 100%;
    .title {
      font-size: 30px;
      color: #065883;
      font-weight: 800;
      padding: 30px 5px;
      line-height: 40px;
      text-align: center;
    }
    .status {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
  }
}
</style>
