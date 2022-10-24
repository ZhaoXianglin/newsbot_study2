<template>
  <div class="card">
    <div class="card-title">{{ news.title }}</div>
    <div class="image">
      <van-image
          width="100%"
          height="180px"
          fit="cover"
          :src="news.top_image"
      />
    </div>
    <h6 class="card-author">By: {{ news.author }} {{ news.publish_date }}</h6>
    <div class="card-text">{{ news.summary }}</div>
  </div>
</template>

<script>
export default {
  name: "NewsContent",
  props: ["news"],
}
</script>

<style scoped>
.card {
  width: 90%;
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
}

.card-title {
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: .0125em;
  line-height: 1.3rem;
  word-break: break-all;
  margin: 10px 0;
  padding: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.card-author {
  width: 100%;
  box-sizing: border-box;
  color: rgba(0, 0, 0, .9);
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

.card-text {
  width: 100%;
  box-sizing: border-box;
  color: rgba(0, 0, 0, .6);
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.3rem;
  letter-spacing: .0071428571em;
  padding: 0 10px 20px 10px;
  margin: 10px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

</style>