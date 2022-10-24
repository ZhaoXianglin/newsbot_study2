<template>
  <div id="step1">
    <van-nav-bar title="Tips"/>
    <van-steps :active="1">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
      <van-step>Step5</van-step>
    </van-steps>
    <div id="main">
      <van-image
          round
          v-animate-css.once="animationInfinite0"
          width="10rem"
          height="10rem"
          :src="require('../assets/images/guide/person2.png')"
      />
      <typical
          class="typicalWrapper"
          :steps="type_content_s"
          v-animate-css.once="animationInfinite0"
          :wrapper="'h2'"
      ></typical>
      <div style="width: 90%;margin:10px auto;padding:1em;border:1px solid silver;border-radius:12px;font-weight: bolder;" v-animate-css.once="animationInfinite1">
        <p style="font-size:1.2em; text-align: left">You will experience three interfaces to read news stories. After each interface, you will answer several questions to provide your evaluation of the interface.</p>
      </div>
      <typical
          class="typicalWrapper"
          :steps="type_content_p"
          v-animate-css.once="animationInfinite2"
          :wrapper="'h2'"
      ></typical>
      <div style="margin: 24px 16px;padding-bottom:48px;z-index: 100">
        <van-button round block v-animate-css.once="animationInfinite3" type="info"
                    native-type="submit"
                    :loading="loading" @click="next">Let's start！
        </van-button>

      </div>
    </div>
  </div>
</template>

<script>
import typical from "vue-typical";
import {instance} from "@/request";

export default {
  name: "Step1",
  components: {
    typical,
  },
  data: function () {
    return {
      loading: false,
      type_content_s: ['', 1500,
        'Hello!', 500,
        'Hello！Welcome to this study about a news chatbot.', 1500,
      ],
      type_content_p: ['', 9500,
        'Are you ready? Let\'s start with the first interface.', 1500,
      ],

      animationInfinite0: {
        classes: 'fadeIn',
        delay: 1000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite1: {
        classes: 'fadeIn',
        delay: 6500,
        duration: 2000,
        iteration: 1
      },
      animationInfinite2: {
        classes: 'fadeIn',
        delay: 9500,
        duration: 1000,
        iteration: 1
      },
      animationInfinite3: {
        classes: 'fadeIn',
        delay: 13000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite4: {
        classes: 'fadeIn',
        delay: 35500,
        duration: 2000,
        iteration: 1
      },
    }
  },

  methods: {
    next: function () {
      this.loading = true;
      localStorage.setItem("session_id", 1);
      instance.post('/study2/session_pre', {
        'uuid': localStorage.getItem("uuid"),
        'session_id': 1,
        'sessionST': new Date().getTime(),
      }).then((res) => {
        if (res.data.status === 1) {
          localStorage.setItem("active", new Date().getTime().toString());
          this.$router.replace('/newsbot').catch((err) => {
            console.log(err.message)
          });
          this.loading = false;
        } else {
          this.loading = false;
          this.$toast("Please refresh this page or accept the informed consent statement first.")
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err.message);
        this.$toast("Network error, please try again later.");
      })
    },
  }
};
</script>

<style scoped>
#main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  padding: 30px 10px 20px 10px;
}

.card {
  text-align: center;
  padding: 20px 10px;
  margin-bottom: 5px;
  font-size: 1.4em;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #2c3e50;
  transition: .3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
