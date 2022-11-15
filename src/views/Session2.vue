<template>
  <div id="step1">
    <van-nav-bar title="Tips"/>
    <van-steps :active="2">
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
      <div v-animate-css.once="animationInfinite1">
        <p style="text-align: left;font-weight: bold">Please select one of the following news stories that you may want to read.</p>
        <van-radio-group v-model="news_id">
          <van-cell-group>
            <van-cell v-for="news in news_list" :key="news.id" :title="news.title" clickable @click="news_id = news.id">
              <template #title>
                <p style="text-align: left;font-weight: bolder;padding-right: 2px">
                  <van-radio :name="news.id" style="display: inline-block"/>
                  {{ news.title }}
                </p>
              </template>
              <template #right-icon>
                <van-image :src="news.top_image" width="48px" height="48px" fit="cover"
                           style="margin: auto 0"></van-image>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>

      </div>

      <div style="margin: 24px 16px;padding-bottom:48px;z-index: 100" v-animate-css.once="animationInfinite2">
        <van-button round block type="info" native-type="submit" :loading="loading" :disabled="disabled" @click="next">
          Let's start！
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import typical from "vue-typical";
import {instance} from "@/request";
import {news_stories} from "@/data/news";

export default {
  name: "Step1",
  components: {
    typical,
  },
  data: function () {
    return {
      lang: localStorage.getItem("lang"),
      loading: false,
      news_id: -1,
      news_list: [],
      type_content_s: ['', 1500,
        'Awesome!', 500,
        'Please explore the next interface and compare it with the previous interface.', 1500,
      ],
      animationInfinite0: {
        classes: 'fadeIn',
        delay: 1000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite1: {
        classes: 'fadeIn',
        delay: 9000,
        duration: 1000,
        iteration: 1
      },
      animationInfinite2: {
        classes: 'fadeIn',
        delay: 10000,
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
        delay: 7500,
        duration: 2000,
        iteration: 1
      },
    }
  },
  computed: {
    disabled: function () {
      return this.news_id <= -1;
    }
  },
  mounted() {
    this.news_list = news_stories['group2']
  },
  methods: {
    next: function () {
      this.loading = true;
      localStorage.setItem("session_id", 2);
      localStorage.setItem("news_id", this.news_id);

      instance.post('/study2/session_pre', {
        'uuid': localStorage.getItem("uuid"),
        'session_id': 2,
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

.typicalWrapper::after {
  content: "|";
  animation: blink 1s infinite step-start;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
