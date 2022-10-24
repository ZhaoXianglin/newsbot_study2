<template>
  <div class="card">
    <div class="image">
      <van-image
          width="260px"
          height="180px"
          fit="cover"
          :src="news.top_image"
      />
    </div>
    <div class="card-title">{{ news.title }}</div>
    <div class="card-text">{{ news.summary }}</div>
    <div class="card-action">
      <van-button round block type="info" plain size="small" @click="open_news(news.id)">Read the story</van-button>
      <van-button round block type="info" plain size="small" @click="next_news('next')">Next story</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsCard",
  props: ["news"],
  data: function () {
    return {}
  },
  methods: {
    open_news: function (news_id) {
      console.log(news_id)
      this.$emit('news_id', news_id)
    },
    next_news: function (next) {
      this.$emit('next_news', next)
      console.log(next)
    }
  }
}
</script>

<style scoped>
.card {
  width: 260px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
  border-radius: 4px;
  background-color: #fff;
  color: rgba(0, 0, 0, .87);
  box-sizing: border-box;
}

.image {
  position: relative;
  overflow: hidden;
  flex: 1 0 auto;
  max-width: 100%;
  display: flex;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.card-title {
  width: 240px;
  align-items: center;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: .0125em;
  line-height: 1.3rem;
  word-break: break-all;
  margin: 10px 0;
  padding: 0 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.card-text {
  width: 240px;
  color: rgba(0, 0, 0, .6);
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.3rem;
  letter-spacing: .0071428571em;
  padding: 0 10px;
  margin: 10px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.card-action {
  height: 80px;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  padding: 8px;
}
</style>