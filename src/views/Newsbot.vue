<template>
  <div class="newsbot">
    <van-nav-bar title="NewsBot"/>

    <div class="chatbot-content">
      <BotUi></BotUi>
    </div>
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
      news_list: [
        {
          "id": 0,
          "topic": "mental",
          "title": "Host of genes and genetic variants linked to dyslexia identified",
          "summary": "Research sheds light on hereditary aspect of disorder in largest such study to date",
          "publish_date": "Thu 20 Oct 2022 16.06 BST",
          "author": "NicolaKS Davis",
          "top_image": "https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/imgs/202210241148220.png",
          "buttons": [{
            'text': "What the causes of dyslexia?",
            'value': 0
          }, {
            'text': 'How do Luciano and colleagues process the study?',
            'value': 1
          }, {'text': 'What are the findings from other studies?', 'value': 2}],
          "button_ans": ["<p>A host of genetic variants associated with dyslexia have been identified by researchers, shedding light on the hereditary aspect of the disorder.</p> <p>It is estimated that about 10% of the UK population, about 6.3 million people, are dyslexic. Previous research has suggested it has a heritable component, with studies suggesting genetics account for somewhere between 40% and 80% of the average differences between those with dyslexia and general population.</p><p>However, pinpointing specific genetic variants that may play a role has proved challenging. Now researchers say they have identified about 170 genes and 42 specific genetic variants significantly associated with dyslexia in the largest such study to date.</p> <p> While 15 of these variants have previously been linked to cognitive ability and educational attainment, the remaining 27 are newly identified \u2013 meaning they have not previously been linked to traits associated with dyslexia.</p> <p> \u201cAt the moment, there are no direct implications for people with dyslexia, although it helps them understand that the condition has very complex causes,\u201d said the lead researcher, Dr Michelle Luciano, of the University of Edinburgh.</p> <p> But Luciano said the results did offer insights into the biology underlying dyslexia. \u201cWe can follow up the significant genes to see what their function is and how it might relate to the cognitive processes involved in reading and spelling,\u201d she said.", "Writing in the journal Nature Genetics, Luciano and colleagues report how they analysed the genomes of 51,800 adults with a self-reported diagnosis of dyslexia, as well as those of 1,087,070 adults who said they did not have such a diagnosis. All of the participants are involved in research with the personal genetics company 23andMe.</p> <p> The team add that several of the newly identified variants were subsequently found to be significantly associated with dyslexia in data analysed by the team that was collected in other genomic studies of people of European ancestry, as well as in data from people of Chinese ancestry.</p> <p> The team found some genetic variants previously thought to be associated with dyslexia were not flagged up in the latest work.</p> <p> \u201cOur study was much more powerful than these previous ones, so the results are more reliable,\u201d said Luciano.</p>", "<p> Using results from other studies, the team found genetic correlations between dyslexia and a number of other traits. These included having ADHD, having equal use of right and left hands, and greater reporting of pain.</p> <p> Luciano added there were some surprises, including a lack of genetic overlap between dyslexia and brain imaging measures. That, she said, was unexpected given various brain regions and networks have been linked to reading skill. \u201cThis suggests that the relationship is influenced by the environment,\u201d she said.</p> <p> Dr Helen Ross, a trustee of the British Dyslexia Association, said: \u201cWe welcome any insight into biological origins of dyslexia; it provides further and robust evidence that dyslexia is a discrete difference, which has biological roots, but social implications. Any insight which will help us to identify people who may have dyslexia will be helpful in providing early intervention to bypass the potential of years of academic challenge and associated difficulties.\u201d</p>"],
          "content": ["A host of genetic variants associated with dyslexia have been identified by researchers, shedding light on the hereditary aspect of the disorder.\n", "It is estimated that about 10% of the UK population, about 6.3 million people, are dyslexic. Previous research has suggested it has a heritable component, with studies suggesting genetics account for somewhere between 40% and 80% of the average differences between those with dyslexia and general population.", "However, pinpointing specific genetic variants that may play a role has proved challenging. Now researchers say they have identified about 170 genes and 42 specific genetic variants significantly associated with dyslexia in the largest such study to date.", "While 15 of these variants have previously been linked to cognitive ability and educational attainment, the remaining 27 are newly identified \u2013 meaning they have not previously been linked to traits associated with dyslexia.", "\u201cAt the moment, there are no direct implications for people with dyslexia, although it helps them understand that the condition has very complex causes,\u201d said the lead researcher, Dr Michelle Luciano, of the University of Edinburgh.", "But Luciano said the results did offer insights into the biology underlying dyslexia. \u201cWe can follow up the significant genes to see what their function is and how it might relate to the cognitive processes involved in reading and spelling,\u201d she said.", "Writing in the journal Nature Genetics, Luciano and colleagues report how they analysed the genomes of 51,800 adults with a self-reported diagnosis of dyslexia, as well as those of 1,087,070 adults who said they did not have such a diagnosis. All of the participants are involved in research with the personal genetics company 23andMe.", "The team add that several of the newly identified variants were subsequently found to be significantly associated with dyslexia in data analysed by the team that was collected in other genomic studies of people of European ancestry, as well as in data from people of Chinese ancestry.", "The team found some genetic variants previously thought to be associated with dyslexia were not flagged up in the latest work.", "\u201cOur study was much more powerful than these previous ones, so the results are more reliable,\u201d said Luciano.", "Using results from other studies, the team found genetic correlations between dyslexia and a number of other traits. These included having ADHD, having equal use of right and left hands, and greater reporting of pain.", "Luciano added there were some surprises, including a lack of genetic overlap between dyslexia and brain imaging measures. That, she said, was unexpected given various brain regions and networks have been linked to reading skill. \u201cThis suggests that the relationship is influenced by the environment,\u201d she said.", "Dr Helen Ross, a trustee of the British Dyslexia Association, said: \u201cWe welcome any insight into biological origins of dyslexia; it provides further and robust evidence that dyslexia is a discrete difference, which has biological roots, but social implications. Any insight which will help us to identify people who may have dyslexia will be helpful in providing early intervention to bypass the potential of years of academic challenge and associated difficulties.\u201d "]
        },
        {
          "id": 1,
          "topic": "body",
          "title": "Chemical attraction: some people really are ‘mosquito magnets’, study finds",
          "summary": "Researchers discover some humans produce certain chemicals tied to smell that mosquitoes find attractive",
          "publish_date": "Wed 19 Oct 2022 14.11 BST",
          "author": "Sam Rice",
          "top_image": "https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/imgs/202210241207567.png",
          "buttons": [{
            'text': "Why is someone called \"mosquito magnets\"?",
            'value': 0
          }, {
            'text': 'How does the study prove skin smells attract mosquitoes?',
            value: 1
          }, {'text': 'What is the secret of the skin of mosquito magnets?', value: 2}],
          "button_ans": ["<p>A new study finds that some people really are \u201cmosquito magnets\u201d and it probably has to do with the way they smell.\n The researchers found that people who are most attractive to mosquitoes produce a lot of certain chemicals on their skin that are tied to smell. And bad news for mosquito magnets: they stay loyal to their favorites over time.</p> <p>\u201cIf you have high levels of this stuff on your skin, you\u2019re going to be the one at the picnic getting all the bites,\u201d said study author Leslie Vosshall, a neurobiologist at Rockefeller University in New York.</p><p> There is folklore about who gets bitten more, but many claims are not backed up with strong evidence, said Vosshall.</p>", "<p>The researchers designed an experiment pitting people\u2019s scents against each other, explained study author Maria Elena De Obaldia. Their findings were published Tuesday in the journal Cell.</p> <p>They asked 64 volunteers from the university and nearby to wear nylon stockings around their forearms to pick up their skin smells. The stockings were put in separate traps at the end of a long tube, then dozens of mosquitos were released.</p> <p>\u201cThey would basically swarm to the most attractive subjects,\u201d De Obaldia said. \u201cIt became very obvious right away.\u201d</p>", "<p>Scientists held a round-robin tournament and ended up with a striking gap: the biggest mosquito magnet was around 100 times more attractive to the mosquitoes than the last place finisher.</p> <p>The experiment used the Aedes aegypti mosquito that spreads diseases like yellow fever, Zika and dengue. Vosshall said she\u2019d expect similar results from other kinds, but would need more research to confirm.</p><p>By testing the same people over multiple years, the study showed that these big differences stick around, said Matt DeGennaro, a neurogeneticist at Florida International University who was not involved with the research.</p> <p>\u201cMosquito magnets seem to remain mosquito magnets,\u201d DeGennaro said.</p> ", "<p>Out of the favorites, the researchers found a common factor: mosquito magnets had high levels of certain acids on their skin. These \u201cgreasy molecules\u201d are part of the skin\u2019s natural moisturizing layer, and people produce them in different amounts, Vosshall said. The healthy bacteria that live on the skin eat up these acids and produce part of our skin\u2019s odor profile, she said.</p> <p>You cannot get rid of these acids without damaging your skin health too, said Vosshall, who is paid by the Howard Hughes Medical Institute and serves as its chief scientific officer. The institute also supports the Associated Press\u2019s Health and Science Department.</p> <p>But the research could help find new methods to repel mosquitoes, said Jeff Riffell, a neurobiologist at the University of Washington who was not involved with the study. There may be ways to tinker with skin bacteria and change humans\u2019 tantalizing smells, he said.</p><p> Still, figuring out ways to fight off mosquitoes isn\u2019t easy, Riffell said, since mosquitoes have evolved to be \u201clean, mean biting machines\u201d.</p><p> The study proved this point: researchers also did the experiment with mosquitoes whose genes were edited to damage their sense of smell. They still flocked to the same mosquito magnets.</p> <p>Mosquitoes are resilient,\u201d Vosshall said. \u201cThey have many backup plans to be able to find us and bite us.\u201d</p>"],
          "content": ["A new study finds that some people really are \u201cmosquito magnets\u201d and it probably has to do with the way they smell.", "The researchers found that people who are most attractive to mosquitoes produce a lot of certain chemicals on their skin that are tied to smell. And bad news for mosquito magnets: they stay loyal to their favorites over time.", "\u201cIf you have high levels of this stuff on your skin, you\u2019re going to be the one at the picnic getting all the bites,\u201d said study author Leslie Vosshall, a neurobiologist at Rockefeller University in New York.", "There is folklore about who gets bitten more, but many claims are not backed up with strong evidence, said Vosshall.", "The researchers designed an experiment pitting people\u2019s scents against each other, explained study author Maria Elena De Obaldia. Their findings were published Tuesday in the journal Cell.", "They asked 64 volunteers from the university and nearby to wear nylon stockings around their forearms to pick up their skin smells. The stockings were put in separate traps at the end of a long tube, then dozens of mosquitos were released.", "\u201cThey would basically swarm to the most attractive subjects,\u201d De Obaldia said. \u201cIt became very obvious right away.\u201d", "Scientists held a round-robin tournament and ended up with a striking gap: the biggest mosquito magnet was around 100 times more attractive to the mosquitoes than the last place finisher.", "The experiment used the Aedes aegypti mosquito that spreads diseases like yellow fever, Zika and dengue. Vosshall said she\u2019d expect similar results from other kinds, but would need more research to confirm.", "By testing the same people over multiple years, the study showed that these big differences stick around, said Matt DeGennaro, a neurogeneticist at Florida International University who was not involved with the research.", "\u201cMosquito magnets seem to remain mosquito magnets,\u201d DeGennaro said.", "Out of the favorites, the researchers found a common factor: mosquito magnets had high levels of certain acids on their skin. These \u201cgreasy molecules\u201d are part of the skin\u2019s natural moisturizing layer, and people produce them in different amounts, Vosshall said. The healthy bacteria that live on the skin eat up these acids and produce part of our skin\u2019s odor profile, she said.", "You cannot get rid of these acids without damaging your skin health too, said Vosshall, who is paid by the Howard Hughes Medical Institute and serves as its chief scientific officer. The institute also supports the Associated Press\u2019s Health and Science Department.", "But the research could help find new methods to repel mosquitoes, said Jeff Riffell, a neurobiologist at the University of Washington who was not involved with the study. There may be ways to tinker with skin bacteria and change humans\u2019 tantalizing smells, he said.", "Still, figuring out ways to fight off mosquitoes isn\u2019t easy, Riffell said, since mosquitoes have evolved to be \u201clean, mean biting machines\u201d.", "The study proved this point: researchers also did the experiment with mosquitoes whose genes were edited to damage their sense of smell. They still flocked to the same mosquito magnets.", "\u201cMosquitoes are resilient,\u201d Vosshall said. \u201cThey have many backup plans to be able to find us and bite us.\u201d"]
        },
        {
          "id": 2,
          "topic": "diet",
          "title": "Inaction over lack of exercise will cost £24bn a year globally by 2030, WHO warns",
          "summary": "Exercise could help prevent 500m new cases of diseases such as diabetes, cancer and stroke – but government policies are lagging behind",
          "publish_date": "Wed 19 Oct 2022 07.15 BST",
          "author": "Lizzy Davies",
          "top_image": "https://obsidian-1251052535.cos.ap-hongkong.myqcloud.com/imgs/202210241212780.png",
          "buttons": [{
            'text': "What is the consequence if governments take no action to encourage exercise?",
            'value': 0
          }, {
            'text': 'What is the prediction from the report if the situation remains?',
            value: 1
          }, {'text': 'What are appeals from the experts?', value: 2}],
          "button_ans": ["<p>Nearly 500m new cases of diseases such as type 2 diabetes, high blood pressure and dementia will occur globally by 2030 if governments do not take urgent action to encourage more people to take regular exercise, a report has found.</p> <p> In a stark warning to countries where health services are already creaking, the World Health Organization said the cost of failing to get people moving more would be about $27bn (\u00a324bn) a year.</p> <p> \u201cThere are few areas in public health \u2026 where evidence on required action is so convincing, cost effective and practical,\u201d according to the WHO\u2019s first global report on physical activity, noting that regular exercise reduces the risk of premature death by 20-30%.</p> <p> Yet, despite the clear benefits, implementation of policies aimed at encouraging more exercise has been \u201cslow and uneven\u201d, resulting in \u201clittle progress\u201d, the report found.</p> <p> \u201cA consequence of this \u2018inaction\u2019 is that already stretched health systems are burdened with preventable disease today and even more so in the future, and communities fail to benefit from the wider social, environmental and economic benefits associated with more people being more active,\u201d it added.</p>", "If the situation does not change, the WHO predicts that by 2030 there will be 499,208m new cases of preventable non-communicable diseases (NCDs) and mental health conditions such as type 2 diabetes, stroke, dementia, depression and some cancers. More than 40% of these will occur in lower middle-income countries such as Kenya, India and Bangladesh.</p> <p> Nearly half of those new cases of NCDs would result from hypertension (high blood pressure), and 43% from depression, said the report, published on Tuesday.</p> <p> The WHO has said that about 7-8% of all cases of cardiovascular disease, depression and dementia could be prevented if people were more active.</p> <p> Examining data from 194 countries, the report found that fewer than half of them had a national policy on physical activity, of which under 40% were operational. Exercise levels in young children were a particular gap, it found, with less than 30% of countries monitoring physical activity in children under five.</p>", "<p>Dr Tedros Adhanom Ghebreyesus, WHO director general, called on governments to implement policies to step up physical activity and thereby reduce the pressure on healthcare systems.</p> <p> \u201cWe need more countries to scale up implementation of policies to support people to be more active through walking, cycling, sport and other physical activity. The benefits are huge, not only for the physical and mental health of individuals, but also for societies, environments and economies,\u201d he said.</p>"],
          "content": ["Nearly 500m new cases of diseases such as type 2 diabetes, high blood pressure and dementia will occur globally by 2030 if governments do not take urgent action to encourage more people to take regular exercise, a report has found.", "In a stark warning to countries where health services are already creaking, the World Health Organization said the cost of failing to get people moving more would be about $27bn (\u00a324bn) a year.", "\u201cThere are few areas in public health \u2026 where evidence on required action is so convincing, cost effective and practical,\u201d according to the WHO\u2019s first global report on physical activity, noting that regular exercise reduces the risk of premature death by 20-30%.", "Yet, despite the clear benefits, implementation of policies aimed at encouraging more exercise has been \u201cslow and uneven\u201d, resulting in \u201clittle progress\u201d, the report found.", "\u201cA consequence of this \u2018inaction\u2019 is that already stretched health systems are burdened with preventable disease today and even more so in the future, and communities fail to benefit from the wider social, environmental and economic benefits associated with more people being more active,\u201d it added.", "If the situation does not change, the WHO predicts that by 2030 there will be 499,208m new cases of preventable non-communicable diseases (NCDs) and mental health conditions such as type 2 diabetes, stroke, dementia, depression and some cancers. More than 40% of these will occur in lower middle-income countries such as Kenya, India and Bangladesh.", "Nearly half of those new cases of NCDs would result from hypertension (high blood pressure), and 43% from depression, said the report, published on Tuesday.", "The WHO has said that about 7-8% of all cases of cardiovascular disease, depression and dementia could be prevented if people were more active.", "Examining data from 194 countries, the report found that fewer than half of them had a national policy on physical activity, of which under 40% were operational. Exercise levels in young children were a particular gap, it found, with less than 30% of countries monitoring physical activity in children under five.", "Dr Tedros Adhanom Ghebreyesus, WHO director general, called on governments to implement policies to step up physical activity and thereby reduce the pressure on healthcare systems.", "\u201cWe need more countries to scale up implementation of policies to support people to be more active through walking, cycling, sport and other physical activity. The benefits are huge, not only for the physical and mental health of individuals, but also for societies, environments and economies,\u201d he said."]
        }
      ],
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function () {
      this.init_order = localStorage.getItem("random_view").split(',')
      this.current_session = parseInt(localStorage.getItem("session_id"))
      this.interface_id = this.init_order[this.current_session - 1]
      this.current_news = this.news_list[this.current_session - 1]
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
        return this.bot(`This story is about: <b>${this.current_news.summary}</b>.`)
      }).then(()=>{
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
</style>