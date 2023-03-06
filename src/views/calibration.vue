<template>
  <div style="height: 100%">
    <van-dialog v-model="show" title="Questionnaire" show-cancel-button style="text-align: center"
                confirmButtonText="Yes" :showCancelButton="false" >
      <vue-qr :text="url"></vue-qr>
    </van-dialog>
    <van-nav-bar title="Calibration" left-text="QR Code" right-text="Next" @click-right="onClickRight" @click-left="show=!show"/>

    <div class="calibration">
      <div class="top">
        <van-row type="flex" justify="space-between">
          <van-col span="4">
            <div class="number">X</div>
          </van-col>
          <van-col span="4">
            <div class="number">X</div>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-between">
          <van-col span="4">
            <div class="label">1</div>
          </van-col>
          <van-col span="4">
            <div class="label">3</div>
          </van-col>
        </van-row>
      </div>
      <div class="middle">
        <van-row type="flex" justify="center">
          <van-col span="4">
            <div class="number">X</div>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="4">
            <div class="label">5</div>
          </van-col>
        </van-row>
      </div>
      <div class="bottom">
        <van-row type="flex" justify="space-between">
          <van-col span="4">
            <div class="label">4</div>
          </van-col>
          <van-col span="4">
            <div class="label">2</div>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-between">
          <van-col span="4">
            <div class="number">X</div>
          </van-col>
          <van-col span="4">
            <div class="number">X</div>
          </van-col>
        </van-row>

      </div>
    </div>

  </div>
</template>

<script>
import VueQr from 'vue-qr'

export default {
  components: {
    VueQr
  },
  name: "calibration",
  data: function () {
    return {
      show: true,
      url: "https://newsbot3.vercel.app/#/info/uuid/" + localStorage.getItem("uuid")
    }
  },
  methods: {
    onClickRight: function () {
      this.$router.push('/session1').catch((err) => {
        console.log(err.message)
      });
    }
  }
}
</script>

<style scoped>
html, body {
  width: 100%;
  height: 100%;
}

.calibration {
  width: 100%;
  height: 790px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.number {
  width: 36px;
  height: 36px;
  line-height: 36px;
  font-size: 36px;
  margin: 10px auto 0 auto;
  text-align: center;
  border: 1px #2c3e50 solid;
  border-radius: 50%;
  color: #B24040;
}

.label {
  width: 36px;
  text-align: center;
  margin: 10px auto;
}
</style>