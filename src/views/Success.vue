<template>
  <div class="Thanks">
    <van-nav-bar title="Thanks"/>
    <div class="content">
      <van-image
          width="200px"
          :src="require('../assets/imgs/finish.png')"
      />
      <h3>Thank you for completing this experiment.</h3>
      Completion code:
      <h3 style="padding: 10px;display:inline-block; background-color: #c8c9cc;border: 1px solid black">{{code.substring(26)}}</h3>
      <h3>Now let's start the interview. </h3>
      <vue-qr :text="url"></vue-qr>
    </div>

  </div>
</template>

<script>

import VueQr from "vue-qr";
export default {
  name: "Success",
  components: {
    VueQr
  },
  data: function () {
    return {
      code: localStorage.getItem("uuid"),
      url: "https://newsbot3.vercel.app/#/info/uuid/" + localStorage.getItem("uuid")
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
