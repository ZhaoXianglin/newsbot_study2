<template>
  <div class="quiz">
    <van-nav-bar title="Feedback"/>
    <van-form @submit="onSubmit" scroll-to-error @failed="onFailed" validate-trigger="onSubmit">
      <p style="padding:0 10px;font-weight:bold;text-align: left">How much do you agree or disagree with the following
        statements?</p>
      <p style="padding:0 10px;font-weight:normal; text-align: left;font-size: 14px">Strongly disagree(1), Disagree(2),
        Somewhat
        disagree(3), Neutral(4), Somewhat agree(5), Agree(6), Strongly agree(7)</p>
      <van-field v-for="(item, index) in q1group" :key="item.t" :name="item.t"
                 :rules="[{ required: auth, message: 'required' }]">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span style="font-weight:600">{{ index + 1 }}. {{ item.q }}</span></van-col>
            </van-row>
            <van-row type="flex" align="center" justify="between">
              <van-col span="4" class="score_left_s" style="text-align:right;">Strongly disagree</van-col>
              <van-col>
                <van-radio-group v-model="q1groupans[index]" direction="horizontal" class="matrix_table">
                  <van-radio :name="val" v-for="val in 7" :key="val" checked-color="#ee0a24" class="item">
                    {{ val }}
                  </van-radio>
                </van-radio-group>
              </van-col>
              <van-col span="4">Strongly agree</van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
      <div style="margin: 36px;">
        <van-button round block type="info" native-type="submit" :loading="loading">Continue</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {instance} from "@/request";

export default {
  name: "Quiz1",
  data: function () {
    return {
      loading: false,
      auth: true,
      q1group: [
        {q: "This browsing style allows me to select a news article easily.", t: "ease_of_use"},
        {q: "The browsing style of this news chatbot is user-friendly.", t: "user_friendliness"},
        {q: "I intend to use this news chatbot in the future.", t: "intent_to_use"},
        {q: "I can operate this news chatbot for news browsing easily.", t: "ease_of_operation"},
        {q: "It is easy to navigate between news stories in this news chatbot.", t: "ease_of_navigation"},
        {q: "I am satisfied with this browsing experience in this news chatbot.", t: "satisfaction"},
        {q: "I find browsing news articles with this news chatbot to be enjoyable.", t: "enjoyment"},
        {q: "I can judge which news articles fit my interests easily with this browsing style.", t: "ease_of_selection"},
      ],
      q1groupans: Array(8).fill(null),
    }
  },
  methods: {
    onFailed() {
      this.$toast("You may have missed some items, please fill in.");
    },
    onSubmit: function (values) {
      this.loading = true;
      values['data'] = JSON.stringify(values);
      values['session_id'] = localStorage.getItem('session_id');
      values['uuid'] = localStorage.getItem('uuid');
      values['sessionET'] = new Date().getTime();
      instance.post('/study1/evaluate', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          if (localStorage.getItem('session_id') === '3') {
            this.$router.replace('/success').catch((err) => {
              console.log(err.message)
            });
          } else {
            let route_url = '/session' + (parseInt(localStorage.getItem('session_id'))+4).toString()
            this.$router.replace(route_url).catch((err) => {
              console.log(err.message)
            });
          }


        } else {
          this.loading = false;
          this.$toast("Please read and accept the informed consent first.")
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err.message);
        this.$toast("Network error, please try again.");
      })
    },
  }
}
</script>

<style scoped>

</style>