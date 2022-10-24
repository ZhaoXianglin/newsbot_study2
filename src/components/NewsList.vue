<template>
  <div class="list">
    <div class="item" v-for="news in newslist" :key="news.id" @click="open_news(news.id)">
      <div class="title">{{ news.title }}</div>
      <div class="image">
        <van-image width="48px" height="48px" fit="cover" :src="news.top_image"></van-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsList",
  props: ["newslist"],
  methods: {
    open_news: function (news_id) {
      this.$emit('news_id', news_id)
    }
  }
}
</script>

<style scoped>
.list {
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 78px;
  border-bottom: 1px solid #c8c9cc;
}

.title {
  font-size: 1.0rem;
  font-weight: 500;
  letter-spacing: .0125em;
  line-height: 1.2rem;
  word-break: break-all;
  margin: 10px 0;
  padding: 0 10px;
}

.image {
  width: 48px;
  height: 48px;
  padding: 10px;
}
</style>