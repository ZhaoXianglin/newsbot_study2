<template>
  <div class="horizontal-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <div class="scroll-item">
          <div class="card" v-for=" news in newslist" :key="news.id">
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
              <van-button round block type="info" plain size="small" @click="open_news(news.id)">Read the story
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  name: "CardCarousel",
  props: ["newslist"],
  data: function () {
    return {
      // news: {
      //   'title': '‘I thought controlling diabetes was about sugar – but exercise became more important than ever’',
      //   'summary': "From Midlife Fitness Files: The Telegraph health series, where we glean advice from midlifers as they talk us through their weekly regime",
      //   'top_image': "https://www.telegraph.co.uk/content/dam/health-fitness/2022/07/14/TELEMMGLPICT000302846411_trans_NvBQzQNjv4Bq650fPriS1eaPGT3alxUCDzK__nsI-RFirNxNxiNjkxY.jpeg?imwidth=680",
      //   'id': "10",
      // },
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.bs.destroy()
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3 // listening scroll event
      })
    },
    open_news: function (news_id) {
      this.$emit('news_id', news_id)
      console.log("hello")
    }
  }
}
</script>

<style scoped>
.scroll-wrapper {
  position: relative;
  width: 100%;
  height: 416px;
  white-space: nowrap;
  border-radius: 4px;
  overflow: hidden
}

.scroll-content {
  display: inline-block;
}

.scroll-item {
  display: flex;
}

.card {
  width: 260px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
  border-radius: 4px;
  background-color: #fff;
  color: rgba(0, 0, 0, .87);
  box-sizing: border-box;
  white-space: normal;
  margin: 0 6px;
  position: relative;
  box-sizing: border-box;
  height: 395px;
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
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: absolute;
  bottom: 5px;
}
</style>