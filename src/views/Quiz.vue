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
  name: "Quiz",
  data: function () {
    return {
      loading: false,
      auth: true,
      q1group: [
        {q: "The layout of this news chatbot makes reading news easy.", t: "ease_of_reading"},
        {q: "The news reading style of this news chatbot is user-friendly.", t: "user_friendliness1"},
        {q: "I intend to use this news chatbot in the future.", t: "intent_to_use"},
        {q: "I can operate this news chatbot for news reading easily.", t: "ease_of_operation"},
        {q: "The news reading style of this news chatbot is easy to use.", t: "ease_to_use"},
        {q:"The news reading style of this news chatbot is flexible.",t: 'user_friendliness2'},
        {q: "I am satisfied with this reading experience in this news chatbot.", t: "satisfaction"},
        {q: "I find reading news articles with this news chatbot to be enjoyable.", t: "enjoyment"},
      ],
      q1groupans: Array(7).fill(null),
    }
  },
  methods: {
    onFailed() {
      this.$toast("You may have missed some items, please fill in.");
    },
    onSubmit: function (values) {
      this.loading = true;
      values['timeLog'] = localStorage.getItem('timeLog');
      values['data'] = JSON.stringify(values);
      values['session_id'] = localStorage.getItem('session_id');
      values['uuid'] = localStorage.getItem('uuid');
      values['sessionET'] = new Date().getTime();
      instance.post('/study2/evaluate', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          if (localStorage.getItem('session_id') === '3') {
            this.$router.replace('/feedback').catch((err) => {
              console.log(err.message)
            });
          } else {
            let route_url = '/session' + (parseInt(localStorage.getItem('session_id'))+1).toString()
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

<style>
.matrix_table {
  justify-content: center;
  flex-wrap: nowrap !important;
  padding: 0 12px;
}

.matrix_table .item {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin-right: 8px !important;
}

.matrix_table .van-radio__label {
  margin-left: 0;
}

@media only screen and (min-width: 425px) {
  .score_left {
    width: 70px !important;
  }

  .score_left_ss {
    width: 39px !important;
  }
}
</style>
