<template>
  <div class="Demographic">
    <van-nav-bar title="Questionnaire"/>
    <van-steps :active="0">
      <van-step>Step1</van-step>
      <van-step>Step2</van-step>
      <van-step>Step3</van-step>
      <van-step>Step4</van-step>
      <van-step>Step5</van-step>
    </van-steps>
    <p style="padding-left: 10px;font-weight:bolder">Personal Information：</p>
    <van-form @submit="onSubmit" @failed="onFailed" scroll-to-error validate-trigger="onSubmit">
      <van-field name="gender" label="Gender" required
                 :rules="[{ required: auth, message: 'Please select this item.' }]">
        <template #input>
          <van-radio-group v-model="gender" direction="horizontal">
            <van-radio checked-color="#ee0a24" name="Male"> Male</van-radio>
            <van-radio checked-color="#ee0a24" name="Female"> Female</van-radio>
            <van-radio checked-color="#ee0a24" name="Other"> Other</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          readonly
          clickable
          required
          :rules="[{ required: auth, message: 'Please select this item.' }]"
          name="age"
          :value="age"
          label="Age"
          placeholder="Age Range"
          @click="showPicker1 = true"
      />
      <van-field
          readonly
          clickable
          required
          :rules="[{ required: auth, message: 'Please select this item.' }]"
          name="education"
          :value="education"
          label="Education"
          placeholder="Level of education"
          @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
            show-toolbar
            :columns="age_items"
            @confirm="onConfirm1"
            confirm-button-text="Confirm"
            cancel-button-text="Cancel"
            @cancel="showPicker1 = false"
        />
      </van-popup>
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
            show-toolbar
            :columns="education_items"
            @confirm="onConfirm2"
            confirm-button-text="Confirm"
            cancel-button-text="Cancel"
            @cancel="showPicker2 = false"
        />
      </van-popup>
      <van-field :rules="[{ required: auth, message: 'required' }]" name="type1">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span
                  style="font-weight:600">1. How often do you read news on your mobile device?</span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="q1groupans[0]">
                  <van-radio name="1" checked-color="#ee0a24" class="item">
                    Many times a day
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    Once a day
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    Occasionally
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
      <van-field :rules="[{ required: auth, message: 'required' }]" name="type2">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span
                  style="font-weight:600">2. How much time a day do you spend reading news on your mobile device?</span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="q1groupans[1]">
                  <van-radio name="1" checked-color="#ee0a24" class="item">
                    0-5 minutes
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    5-10 minutes
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    10+ minutes
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
      <van-field :rules="[{ required: auth, message: 'required' }]" name="type3">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span
                  style="font-weight:600">3. How do you look for stories of interest?</span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="q1groupans[2]">
                  <van-radio name="1" checked-color="#ee0a24" class="item">
                    I only look through all sections
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    I only look at particular sections
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    Both browsing strategies
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
      <van-field :rules="[{ required: auth, message: 'required' }]" name="type4">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span
                  style="font-weight:600">4. How do you read a news story?</span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="q1groupans[3]">
                  <van-radio name="1" checked-color="#ee0a24" class="item">
                    Detailed Reading (I read for comprehension)
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    Skimming (I prefer to get the gist of a story without reading everything)
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    Scanning (I look for specific facts or pieces of information)
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
      <van-field :rules="[{ required: auth, message: 'required' }]" name="type5">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span
                  style="font-weight:600">5. Where do you often read news?</span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="q1groupans[4]">
                  <van-radio name="1" checked-color="#ee0a24" class="item">
                    At Home
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    At Work
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    On the go (public transport, bus, etc…)
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
      <van-field :rules="[{ required: auth, message: 'required' }]" name="type6">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span
                  style="font-weight:600">6. What time of day do you usually read the news?</span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="q1groupans[5]">
                  <van-radio name="1" checked-color="#ee0a24" class="item">
                    Morning
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    Afternoon
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    Evening
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>
      <van-field :rules="[{ required: auth, message: 'required' }]" name="type7">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span
                  style="font-weight:600">7. Which of the following would you say you prefer for getting news?</span>
              </van-col>
              <van-col span="24">
                <van-radio-group v-model="q1groupans[6]">
                  <van-radio name="1" checked-color="#ee0a24" class="item">
                    Reading news in a print newspaper, listening to news on the radio or watching news on television.
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    Getting news from a news website or app.
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    Getting news from a social networking site (such as Facebook or Twitter).
                  </van-radio>
                </van-radio-group>
              </van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>

      <p style="padding:0 10px;font-weight:bold;text-align: left">For each statement below, please indicate how much you agree..</p>
      <p style="padding:0 10px;font-weight:normal; text-align: left;font-size: 14px">ranging from “extremely uncharacteristic of me” (1) to “extremely characteristic of me(5)” </p>
      <van-field v-for="(value, key,index) in nfc" :key="key" :name="key"
                 :rules="[{ required: auth, message: 'required' }]">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span style="font-weight:600">{{ index + 1 }}. {{ value }}</span></van-col>
            </van-row>
            <van-row type="flex" align="center" justify="between">
              <van-col span="4" class="score_left_s" style="text-align:right;">extremely uncharacteristic of me</van-col>
              <van-col>
                <van-radio-group v-model="q2groupans[index]" direction="horizontal" class="matrix_table">
                  <van-radio :name="val" v-for="val in 5" :key="val" checked-color="#ee0a24" class="item">
                    {{ val }}
                  </van-radio>
                </van-radio-group>
              </van-col>
              <van-col span="4">extremely characteristic of me</van-col>
            </van-row>
          </van-row>
        </template>
      </van-field>


      <p style="padding:0 10px;font-weight:bold;text-align: left">I see myself as someone who …</p>
      <p style="padding:0 10px;font-weight:normal; text-align: left;font-size: 14px">Disagree strongly(1), Disagree a
        little(2),
        Neither agree nor disagree(3), Agree a little(4), Agree strongly(5)</p>
      <van-field v-for="(value, key,index) in big5" :key="key" :name="key"
                 :rules="[{ required: auth, message: 'required' }]">
        <template #input>
          <van-row style="width: 100%;">
            <van-row type="flex">
              <van-col span="24"><span style="font-weight:600">{{ index + 1 }}. {{ value }}</span></van-col>
            </van-row>
            <van-row type="flex" align="center" justify="between">
              <van-col span="4" class="score_left_s" style="text-align:right;">Disagree strongly</van-col>
              <van-col>
                <van-radio-group v-model="q3groupans[index]" direction="horizontal" class="matrix_table">
                  <van-radio :name="val" v-for="val in 5" :key="val" checked-color="#ee0a24" class="item">
                    {{ val }}
                  </van-radio>
                </van-radio-group>
              </van-col>
              <van-col span="4">Agree strongly</van-col>
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
import {instance} from '@/request';
import {pre_study_questions} from "@/data/questions";

export default {
  name: "Demographic",
  data: function () {
    return {
      loading: false,
      auth: true,
      gender: "",
      age: "",
      education: "",
      age_items: ['18–21', '22–25', '26–30', '31–35', '36- 40', '41- 45', '46- 50', '51 and above'],
      education_items: ['High school graduate', 'Completed some college', 'Associate degree', 'Bachelor\'s degree', 'Completed some postgraduate', 'Master\'s degree', 'Ph.D., law or medical degree', 'Others'],
      showPicker1: false,
      showPicker2: false,
      //----demographic
      big5: pre_study_questions['big5'],
      nfc: pre_study_questions['nfc'],

      q1groupans: Array(7).fill(null),
      q2groupans: Array(6).fill(null),
      q3groupans: Array(10).fill(null),
    }
  },
  methods: {
    onConfirm1(value) {
      this.age = value;
      this.showPicker1 = false;
    },
    onConfirm2(value) {
      this.education = value;
      this.showPicker2 = false;
    },
    onSubmit(values) {
      this.loading = true;
      values['uuid'] = localStorage.getItem('uuid');
      values['preT'] = new Date().getTime();
      localStorage.setItem('news_type', this.news_type);
      instance.post('/study2/pre', values).then((res) => {
        //console.log(res)
        if (res.data.status === 1) {
          localStorage.setItem('step', '1');
          localStorage.setItem("active", new Date().getTime().toString());

          this.loading = false;
          this.$router.replace('/session1')
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
.item {
  margin-bottom: 6px;
}
</style>