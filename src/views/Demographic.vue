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
                    Many times
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    Once
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
                    0-5 min
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    5-10 min
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    10+ min
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
                    All
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    Particular
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    Both
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
                    Detailed
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    Skimming
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    Scanning
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
                    Home
                  </van-radio>
                  <van-radio name="2" checked-color="#ee0a24" class="item">
                    Work
                  </van-radio>
                  <van-radio name="3" checked-color="#ee0a24" class="item">
                    Public Transport
                  </van-radio>
                </van-radio-group>
              </van-col>
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

export default {
  name: "Demographic",
  data: function () {
    return {
      loading: false,
      auth: true,
      gender: "",
      age: "",
      age_items: ['18–21', '22–25', '26–30', '31–35', '36- 40', '41- 45', '46- 50', '51 and above'],
      showPicker1: false,
      showPicker2: false,
      q1groupans: Array(5).fill(null),
    }
  },
  methods: {
    onConfirm1(value) {
      this.age = value;
      this.showPicker1 = false;
    },
    onSubmit(values) {
      this.loading = true;
      values['uuid'] = localStorage.getItem('uuid');
      values['preT'] = new Date().getTime();
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

</style>