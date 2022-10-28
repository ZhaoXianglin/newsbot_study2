<template>
  <div class="card">
    <div class="image">
      <van-image
          width="100%"
          height="240px"
          fit="cover"
          :src="news.top_image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsImage",
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



</style>