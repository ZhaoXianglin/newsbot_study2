<template>
  <div class="Thanks">
    <van-nav-bar title="Thanks"/>
    <div class="content">
      <van-image
          width="200px"
          :src="require('../assets/imgs/finish.png')"
      />
      <h3>Thank you for completing this survey.</h3>
      Completion code:
      <h3 style="padding: 10px;display:inline-block; background-color: #c8c9cc;border: 1px solid black">CYY6NSN8</h3>
      <h3>Now you can close this page.</h3>
    </div>

  </div>
</template>

<script>
export default {
  name: "Success",
  data: function () {
    return {
      code: ""
    }
  },
  mounted: function () {
    if (localStorage.getItem('step') === '5' || localStorage.getItem('step') === '6') {
      this.code = localStorage.getItem("code");
      localStorage.setItem('finished', "1")
      localStorage.setItem("active", new Date().getTime().toString());
    }
  }
}
</script>

<style scoped>
.content {
  padding-top: 36px;
  text-align: center;
}

h3 {
  text-align: center;
}
</style>
