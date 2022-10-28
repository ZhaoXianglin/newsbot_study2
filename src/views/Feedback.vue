<template>
  <div class="feedback">
    <van-nav-bar title="Feedback"/>
    <van-steps :active="4">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
      <van-step>Step5</van-step>
    </van-steps>
    <van-form @submit="onSubmit" scroll-to-error @failed="onFailed" validate-trigger="onSubmit">
      <van-image src="https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/imgs/study2.png"></van-image>
      <van-field :rules="[{ required: auth, message: 'required' }]" name="feedback1">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span
                  style="font-weight:600">1. Which interface do you prefer regarding the selection of a news story?</span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="feedback1">
                  <van-radio name="pop-up webview" checked-color="#ee0a24" class="item">
                    Mostly A (pop-up webview)
                  </van-radio>
                  <van-radio name="in conversation" checked-color="#ee0a24" class="item">
                    Mostly B (in conversation)
                  </van-radio>
                  <van-radio name="question driven" checked-color="#ee0a24" class="item">
                    Mostly C (question driven)
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
      <p style="padding:0 10px;font-weight:bold;text-align: left">2. Why do you prefer <span style="color: #1989fa">'{{feedback1}}'</span> to other interfaces?</p>
      <van-field
          name="feedback2"
          v-model="feedback2"
          rows="4"
          autosize
          type="textarea"
          placeholder="please enter"
          :rules="[{ required: auth, message: 'required' }]"
      />
      <van-divider></van-divider>
      <van-field :rules="[{ required: auth, message: 'required' }]" name="feedback3">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span
                  style="font-weight:600">3. Which of the following statements better describes your news reading behaviours? </span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="feedback3" class="item_span">
                  <van-radio name="Tracker" checked-color="#ee0a24" class="item">
                    I am a person who likes to be informed about <b>the latest stories and any updates to stories I follow</b>, usually reading the news for <b>up to 10 minutes at a time and several times a day</b> at intervals. And I prefer to <b>extract the important bits of a story</b> (i.e. reading by skimming).
                  </van-radio>
                  <van-radio name="Reviewer" checked-color="#ee0a24" class="item">
                    I am a person who likes to catch up on <b>the day’s news and a variety of topics</b> and usually reads the news <b>once a day</b>, spending <b>more than 10 minutes</b> to get through all the stories of interest. And I like an in-depth analysis of the stories and will <b>read at length to fully understand the story</b> (i.e. a detailed reading).
                  </van-radio>
                  <van-radio name="Dipper" checked-color="#ee0a24" class="item">
                    I am a person with a <b>casual interest in the news</b> but likes to read news on <b>specific topics</b> such as sport. I always know what I am looking for so do not <b>spend more than 5 minutes</b> accessing the news. I like to browse particular sections to find stories and looks for <b>specific facts or pieces of information without reading everything.</b> (i.e. reading by scanning).
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
      <p style="padding:0 10px;font-weight:bold;text-align: left">4. Please provide your email.</p>
      <van-field
          ref="email"
          v-model="email"
          name="email"
          label="E-mail"
          :rules="[{ required: true }]"
      />
      <div style="margin: 36px;">
        <van-button round block type="info" native-type="submit" :loading="loading">Submit</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {instance} from "@/request";

export default {
  name: "Feedback",
  data: function () {
    return {
      feedback1: '',
      feedback2: '',
      feedback3: '',
      email: '',
    }
  },
  methods: {
    onSubmit(values) {
      this.loading = true;
      values['uuid'] = localStorage.getItem('uuid');
      values['endT'] = new Date().getTime();
      instance.post('/study2/feedback', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '1');
          localStorage.setItem("active", new Date().getTime().toString());
          this.loading = false;
          this.$router.replace('/success')
        } else {
          this.loading = false;
          this.$toast("Please read and accept the informed consent first.")
        }
      }).catch((err) => {
        console.log(err.message);
        this.loading = false;
        this.$toast("Network error, please try again.");
      })
    },
    onFailed() {
      this.$toast("You may have missed some items, please fill in.");
    },

  }
}
</script>

<style scoped>
.item_span div{
  margin-bottom: 10px;
}
</style>