<template>
<div class="finish">
  <van-nav-bar title="Feedback"/>
  <van-row>
   <h5>{{ type }}</h5>
  </van-row>
</div>
</template>

<script>
export default {
  name: "Finish",
  data: function () {
    return{
     type: localStorage.getItem("reader")
    }
  }
}
</script>

<style scoped>

</style>