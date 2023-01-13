<template>
  <div class="newsbot">
    <van-nav-bar title="NewsBot" class="title"/>
    <BotUi></BotUi>
    <van-popup
        v-model="show_news_dialog"
        position="bottom"
        round
        :close-on-click-overlay="false"
        :style="{ height: '90%',width:'100%' }"
    >
      <div class="news_content" v-if="interface_id">
        <h3>{{ current_news.title }}</h3>
        <h6>By: {{ current_news.author }} <br> {{ current_news.publish_date }}</h6>
        <p class="abstract">{{ current_news.summary }}</p>
        <van-image class="news_top_image" fit="contain"
                   :src="current_news.top_image"></van-image>
        <p class="paragraph" v-for="(item,i) in current_news.content" :key="i">
          {{ item }}
        </p>
        <div>
          <van-button type="info" size="small" plain round block @click="evaluation">Finish reading</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>

// 对象引入
import {botui} from '@/components/BotUi';
import BotUi from "../components/BotUi";
import {news_stories} from "@/data/news";

export default {
  name: "Newsbot",
  components: {
    BotUi,
  },
  data: function () {
    return {
      time_log: [],
      init_order: [],
      interface_id: 0,
      current_session: 1,
      current_news: {},
      current_news_button: {},
      //当前新闻的段落长度
      current_news_para_len: 0,
      //当前展示的新闻段落序号
      current_news_para: 0,
      current_news_qabutton: [],
      click_news_id: 0,
      show_news_dialog: false,
      news_id: -1,
      news_list: [],
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function () {
      this.news_id = localStorage.getItem("news_id")
      this.init_order = localStorage.getItem("random_view").split(',')
      this.current_session = parseInt(localStorage.getItem("session_id"))
      this.news_list = news_stories['group' + this.current_session]
      this.interface_id = this.init_order[this.current_session - 1]
      this.current_news = this.news_list[parseInt(this.news_id)]
      this.current_news_para_len = this.current_news.content.length
      this.current_news_button = {
        text: this.current_news.title,
        value: this.current_news.title
      }
      this.current_news_qabutton = this.current_news['buttons']
      this.bot("Hi! This is <b>NewsBot</b>.").then(() => {
        return this.bot("Here's your feed of today's top story about health.")
      }).then(() => {
        return this.bot(`Please tap the <b> "Read"</b> button to read this news story.`)
      }).then(() => {
        botui.action.button({
          addMessage: true,
          action: [{'text': 'Read', value: "Read"}]
        }).then(() => {
          this.addTimeLog();
          switch (this.interface_id) {
            case '1':
              this.show_news_dialog = true;
              break;
            case '2':
              this.reading2_init()
              break;
            case '3':
              botui.message.bot({
                loading: true,
                delay: 1000,
                type: 'newscontent',
                content: this.current_news
              }).then(() => {
                this.button_reading()
              });
          }
        })
      });
    },
    evaluation: function () {
      this.addTimeLog();
      localStorage.setItem('timeLog', JSON.stringify(this.time_log))
      this.$router.replace('/evaluate').catch((err) => {
        console.log(err.message)
      });
    },
    //默认对话
    bot: function (msg, second = 1000) {
      return botui.message.bot({
        type: 'html',
        loading: true,
        delay: second,
        content: msg
      })
    },
    addTimeLog: function () {
      this.time_log.push(new Date().getTime())
    },
    delButton: function (value) {
      //console.log(value)
      if (this.current_news_qabutton.length === 0) {
        return
      }
      this.current_news_qabutton.find((o, i) => {
        if (o.text === value) {
          this.current_news_qabutton.splice(i, 1);
          return true;
        }
      })
    },

    bot_next: function () {
      if (this.current_news_para === this.current_news_para_len - 1) {
        this.bot(this.current_news['content'][this.current_news_para], 10).then(() => {
          botui.action.button(
              {
                addMessage: false,
                loading: true,
                delay: 1600,
                action: [{"text": 'Finish reading', value: 'Finish reading'}]
              }).then(() => {
            this.addTimeLog();
            localStorage.setItem('timeLog', JSON.stringify(this.time_log))
            this.$router.replace('/evaluate').catch((err) => {
              console.log(err.message)
            });
          })
        })
      } else {
        this.bot(this.current_news['content'][this.current_news_para], 10).then(() => {
          botui.action.button(
              {
                addMessage: false,
                action: [{"text": 'Next', value: 'Next'}]
              }).then(() => {
            this.current_news_para += 1
            this.addTimeLog();
            this.bot_next()
          })
        })
      }
    },

    button_reading: function () {
      botui.action.button({
        addMessage: true,
        action: this.current_news_qabutton,
        loading: true,
        delay: 1000,
      }).then((res) => {
        this.addTimeLog();
        this.bot(this.current_news['button_ans'][res.value]).then(() => {
          this.delButton(res.text)
          if (this.current_news_qabutton.length === 0) {
            botui.action.button(
                {
                  addMessage: false,
                  loading: true,
                  delay: 1600,
                  action: [{"text": 'Finish reading', value: 'Finish reading'}]
                }).then(() => {
              this.addTimeLog()
              localStorage.setItem('timeLog', JSON.stringify(this.time_log))
              this.$router.replace('/evaluate').catch((err) => {
                console.log(err.message)
              });
            })
          } else {
            this.button_reading()
          }
        })
      })
    },

    reading2_init: function () {
      this.bot(`The news title is: <b>${this.current_news.title}.</b>`).then(() => {
        return botui.message.bot({
          type: 'image',
          content: this.current_news
        })
      }).then(() => {
        return this.bot(`It is reported by <b>${this.current_news.author}</b> on <b>${this.current_news.publish_date}</b>`)
      }).then(() => {
        return this.bot(`This story is about: <b>${this.current_news.summary}</b>`)
      }).then(() => {
        this.addTimeLog()
        this.bot_next()
      })
    }
  }
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
.newsbot{
  height: 2000px;
}
.newsbot::after {
  content: "";
  display: block;
  clear: both;
}
</style>