<template>
  <div class="index">
    <van-nav-bar title="Introduction"/>
    <div class="content">
      <h3>Welcome to participate in our eye-tracking study!</h3>

      <h4>Task:</h4>
      <ul>
        <li>Use three different interfaces to browse the news stories in the chatbot.</li>
        <li>Fill out a questionnaire to evaluate each interface based on your experience.</li>
        <li>Please follow the instructions of the interviewer.</li>
      </ul>

      <h4>Duration:</h4>
      <p>Approximately 12 minutes.</p>
      <div style="margin: 24px 16px;padding-bottom:48px">
        <van-button round block type="info" :disabled="startStatus" native-type="submit" :loading="loading1"
                    @click="tapStart">Start
        </van-button>
      </div>
    </div>

  </div>
</template>

<script>
import {instance} from '../request';
export default {
  name: "Index",
  components: {},

  data: function () {
    return {
      startStatus: false,
      loading1: false,
      uuid: localStorage.getItem('uuid'),
      finished: localStorage.getItem('finished'),
      show: true,
      checked: false,
      device: navigator.userAgent,
    }
  },
  methods: {
    tapStart: function () {
    this.loading1 = true;
    if (this.uuid) {
      localStorage.removeItem("uuid")
      localStorage.removeItem("finished")
      localStorage.removeItem("step")
      localStorage.removeItem("active")
      localStorage.removeItem("random_view")
      localStorage.removeItem("session_id")
    }
    instance.post('/study2/accept', {
      'accT': new Date().getTime(),
      'device': this.device,
      'feedback2': 'interview'
    }).then((res) => {
      //console.log(res);
      if (res.data.uuid) {
        localStorage.setItem('uuid', res.data.uuid);
        localStorage.setItem('finished', '0');
        localStorage.setItem('random_view', res.data.random_view);
        localStorage.setItem('active', new Date().getTime().toString());
        localStorage.setItem('step', '0');
        localStorage.setItem("active", new Date().getTime().toString());
        this.$router.replace('/calibration').catch((err) => {
          console.log(err.message)
        });
        this.loading1 = false;
      } else {
        console.log(res.data);
        this.loading = false;
        this.$toast('Error,Please Try again later.');
      }
    }).catch(() => {
      this.loading = false;
      this.$toast('Network error,Please Try again later.');
    })
    },

    next: function () {
      this.loading1 = true;
    }
  },
}
</script>

<style scoped>
.content {
  margin: 5px;
  padding: 6px 10px 36px 10px;
  border-radius: 6px;
  background-color: #fff;
  color: #323233;
}

.consent {
  margin: 5px;
  padding: 6px 10px 36px 10px;
  border-radius: 6px;
  background-color: #fff;
  color: #323233;
  font-size: 18px;
}

.consent p {
  text-align: left;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;

}

.content p {
  padding: 0 1px;
  text-indent: 0;
  text-align: left;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}

.content h4 {
  text-decoration: underline;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  font-size: 18px;
}

.consent h5 {
  text-decoration: underline;
  margin-block-start: 0.8em;
  margin-block-end: 0.5em;
  font-size: 16px;
}

.content ul li {
  list-style-type: disc;
  list-style-position: inside;
  padding-bottom: 0.5em;
  text-align: left;
}

.van-image {
  margin: 10px 0;
}

/*li b {*/
/*  font-size: 15px;*/
/*  display: inline-block;*/
/*  text-align: left;*/
/*}*/

.content ol li {
  text-align: left;
  padding-bottom: 0.5em;
  list-style-position: inside;
  list-style-type: upper-roman;
}

.van-count-down {
  display: inline;
  color: white;
}
</style>
