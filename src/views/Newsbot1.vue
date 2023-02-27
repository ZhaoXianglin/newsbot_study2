<template>
  <div class="newsbot">
    <van-nav-bar title="NewsBot"/>
    <div class="chatbot-send">
      <van-button type="info" v-if="btn_show" size="small" plain round block to="/evaluate1">Provide Feedback
      </van-button>
    </div>
    <div class="chatbot-content">
      <BotUi @clicked_url="show_news" @click_next="show_next"></BotUi>
    </div>
    <van-popup
        v-model="show_news_dialog"
        closeable
        close-icon="close"
        position="bottom"
        round
        :style="{ height: '90%',width:'100%' }"
    >
      <div class="news_content" v-if="interface_id">
        <h3>{{ news_group[click_news_id].title }}</h3>
        <h6>By: {{ news_group[click_news_id].author }} <br> {{ news_group[click_news_id].publish_date }}</h6>
        <p class="abstract">{{ news_group[click_news_id].summary }}</p>
        <van-image class="news_top_image" fit="contain"
                   :src="news_group[click_news_id].top_image"></van-image>
        <p class="paragraph" v-for="(item,i) in news_group[click_news_id].content" :key="i">
          {{ item }}
        </p>
      </div>
    </van-popup>
  </div>
</template>

<script>

// 对象引入
import {botui} from '@/components/BotUi';
import BotUi from "../components/BotUi";
import {News_stories} from "@/data/news1";

export default {
  name: "Newsbot",
  components: {
    BotUi,
  },
  data: function () {
    return {
      btn_show: false,
      init_order: [],
      interface_id: 0,
      current_session: 1,
      news_group: [],
      current_news_id: 0,
      click_news_id: 0,
      show_news_dialog: false,
      news_type: "",
      news_list: {},
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function () {
      this.news_type = localStorage.getItem("news_type");
      this.news_list = News_stories[this.news_type];
      let key = 'group' + localStorage.getItem("session_id")
      this.news_group = this.news_list[key]
      this.init_order = localStorage.getItem("random_view").split(',')
      this.current_session = parseInt(localStorage.getItem("session_id"))
      this.interface_id = this.init_order[this.current_session - 1]
      switch (this.interface_id) {
        case '1':
          this.news_card_init();
          break
        case '2':
          this.news_list_init();
          break
        case '3':
          this.news_carousal_init();
          break
      }
    },
    //默认对话
    bot: function (msg) {
      return botui.message.bot({
        type: 'html',
        loading: true,
        delay: 1600,
        content: msg
      })
    },

    show_news: function (id) {
      this.click_news_id = id - 1;
      this.show_news_dialog = true;
      console.log(this.click_news_id)
    },
    show_next: function () {
      if (this.current_news_id !== 2) {
        this.current_news_id += 1
        botui.message.human({
          content: "Next",
        }).then(() => {
          botui.message.bot({
            loading: true,
            delay: 1600,
            type: 'card',
            content: this.news_group[this.current_news_id]
          }).then(() => {
            if (this.current_news_id === 2) {
              this.btn_show = true;
            }
          })
        })
      } else {
        this.$toast('This is the last news story!');
      }
      console.log("show_next")
    },

    news_list_init: function () {
      this.bot("Hi! This is <b>NewsBot</b>.").then(() => {
        return this.bot("Here's your feed of recent news stories about " +this.news_type +'.')
      }).then(() => {
        return botui.message.bot({
          loading: true,
          delay: 1600,
          type: 'list',
          content: this.news_group
        }).then(() => {
          this.btn_show = true;
        })
      });
    },

    news_carousal_init: function () {
      this.bot("Hi! This is <b>NewsBot</b>.").then(() => {
        return this.bot("Here's your feed of recent news stories about "+this.news_type +'.')
      }).then(() => {
        return botui.message.bot({
          loading: true,
          delay: 1600,
          type: 'cardlist',
          content: this.news_group,
        }).then(() => {
          this.btn_show = true;
        })
      });
    },

    news_card_init: function () {
      this.bot("Hi! This is <b>NewsBot</b>.").then(() => {
        return this.bot("Here's your feed of recent news stories about " +this.news_type +'.')
      }).then(() => {
        return this.bot("Tap <b>'Next story'</b> to skip to next story.")
      }).then(() => {
        return botui.message.bot({
          loading: true,
          delay: 1600,
          type: 'card',
          content: this.news_group[this.current_news_id],
        })
      });
    },

  },

}
</script>

<style scoped>
.news_content {
  padding: 20px 10px;
  margin-top: 12px;
  overflow: auto;
  height: 90%;
}

.news_top_image {
  width: 100%;
  height: 240px;
}

.paragraph {
  padding: 0 10px;
  color: rgba(0, 0, 0, .7);
}

.abstract {
  padding: 0 10px;
  color: rgba(0, 0, 0, .6);
  font-style: italic;
}

h3, h6 {
  padding: 0 10px;
}

h6 {
  margin: 10px 0;
}
</style>