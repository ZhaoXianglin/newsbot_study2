<template>
  <div class="botui botui-container" v-botui-container>
    <div class="botui-messages-container">
      <div v-for="(msg,index) in messages" :key="index" class="botui-message"
           :class="msg.cssClass" v-botui-scroll v-bind="msg.attributes">
        <transition name="slide-fade">
          <div v-if="msg.visible">
            <div v-if="msg.photo && !msg.loading"
                 :class="['profil', 'profile', {human: msg.human,'agent': !msg.human}]">
              <img :src="msg.photo" :class="[{human: msg.human, 'agent':!msg.human}]">
            </div>
            <!--     news card       -->
            <NewsCard v-if="msg.type==='card'" :news="msg.content" @news_id="click_detail"
                      @next_news="click_next"></NewsCard>
            <CardCarousel v-if="msg.type==='cardlist'" :newslist="msg.content" @news_id="click_detail"></CardCarousel>
            <NewsList v-if="msg.type==='list'" :newslist="msg.content" @news_id="click_detail"></NewsList>
            <NewsContent v-if="msg.type==='newscontent'" :news="msg.content"></NewsContent>
            <NewsImage v-if="msg.type==='image'" :news="msg.content"></NewsImage>

            <div :class="[{human: msg.human, 'botui-message-content': true}, msg.type]"
                 v-if="['text','html','embed'].includes(msg.type)">
              <span v-if="msg.type==='text'" v-text="msg.content" v-botui-markdown></span>
              <span v-if="msg.type==='html'" v-html="msg.content"></span>
              <iframe v-if="msg.type==='embed'" :src="msg.content" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
        </transition>
        <div v-if="msg.photo && msg.loading && !msg.human"
             :class="['profil', 'profile', {human: msg.human,'agent': !msg.human}]">
          <img :src="msg.photo" :class="[{human: msg.human, 'agent':!msg.human}]">
        </div>
        <div v-if="msg.loading" class="botui-message-content loading">
          <i class="dot"></i>
          <i class="dot"></i>
          <i class="dot"></i>
        </div>
      </div>
    </div>
    <div class="botui-actions-container">
      <transition name="slide-fade">
        <div v-if="action.show">
          <form v-if="action.type==='text'" class="botui-actions-text"
                @submit.prevent="handle_action_text()" :class="action.cssClass">
            {{ action }}
            <i v-if="action.text.icon" class="botui-icon botui-action-text-icon fa"
               :class="'fa-' + action.text.icon"></i>
            <input ref="input" :type="action.text.sub_type"
                   v-model="action.text.value" class="botui-actions-text-input"
                   :placeholder="action.text.placeholder" :size="action.text.size" :value="action.text.value"
                   :class="action.text.cssClass" required v-focus/>
            <button type="submit" :class="{'botui-actions-buttons-button':
						!!action.text.button, 'botui-actions-text-submit': !action.text.button}">
              <i v-if="action.text.button && action.text.button.icon" class="botui-icon
							botui-action-button-icon fa" :class="'fa-' + action.text.button.icon"></i>
              <span>{{ (action.text.button && action.text.button.label) || 'Go' }}</span>
            </button>
          </form>
          <form v-if="action.type==='select'" class="botui-actions-select" @submit.prevent="handle_action_select()"
                :class="action.cssClass">
            <i v-if="action.select.icon"
               class="botui-icon botui-action-select-icon fa"
               :class="'fa-' + action.select.icon"></i>
            <v-select v-if="action.select.searchselect && !action.select.multipleselect"
                      v-model="action.select.value" :value="action.select.value"
                      :placeholder="action.select.placeholder" class="botui-actions-text-searchselect"
                      :label="action.select.label" :options="action.select.options"></v-select>
            <v-select v-else-if="action.select.searchselect && action.select.multipleselect" multiple
                      v-model="action.select.value" :value="action.select.value"
                      :placeholder="action.select.placeholder" class="botui-actions-text-searchselect"
                      :label="action.select.label" :options="action.select.options"></v-select>
            <select v-else v-model="action.select.value" class="botui-actions-text-select"
                    :placeholder="action.select.placeholder" :size="action.select.size"
                    :class="action.select.cssClass" required v-focus>
              <option v-for="(option,index) in action.select.options" :key="index" :class="action.select.optionClass"
                      v-bind:value="option.value" :disabled="(option.value=='')?true:false"
                      :selected="(action.select.value==option.value)?'selected':''"> {{ option.text }}
              </option>
            </select>
            <button type="submit" :class="{'botui-actions-buttons-button':
						!!action.select.button, 'botui-actions-select-submit': !action.select.button}">
              <i v-if="action.select.button && action.select.button.icon" class="botui-icon
							botui-action-button-icon fa" :class="'fa-' + action.select.button.icon"></i>
              <span>{{ (action.select.button && action.select.button.label) || 'Ok' }}</span>
            </button>
          </form>
          <div v-if="action.type==='button'" class="botui-actions-buttons" :class="action.cssClass">
            <button type="button" :class="button.cssClass" class="botui-actions-buttons-button"
                     v-for="(button,index) in action.button.buttons" :key="index"
                    @click="handle_action_button(button)"><i v-if="button.icon" class="botui-icon
							botui-action-button-icon fa" :class="'fa-' + button.icon"></i> {{ button.text }}
            </button>
          </div>
          <form v-if="action.type==='buttontext'" class="botui-actions-text"
                @submit.prevent="handle_action_text()" :class="action.cssClass">
            <i v-if="action.text.icon" class="botui-icon botui-action-text-icon fa"
               :class="'fa-' + action.text.icon"></i>
            <input
                type="text" ref="input" v-model="action.text.value"
                class="botui-actions-text-input" :placeholder="action.text.placeholder"
                :size="action.text.size" :class="action.text.cssClass" required
                v-focus/>
            <button type="submit" :class="{'botui-actions-buttons-button':
						!!action.text.button, 'botui-actions-text-submit': !action.text.button}">
              <i v-if="action.text.button && action.text.button.icon" class="botui-icon
							botui-action-button-icon fa" :class="'fa-' + action.text.button.icon"></i>
              <span>{{ (action.text.button && action.text.button.label) || 'Go' }}</span>
            </button>
            <div class="botui-actions-buttons" :class="action.cssClass">
              <button type="button" :class="button.cssClass"
                      class="botui-actions-buttons-button" v-for="(button,index) in
							action.button.buttons" :key="index" @click="handle_action_button(button)" autofocus>
                <i v-if="button.icon" class="botui-icon botui-action-button-icon fa" :class="'fa-' +
								button.icon"></i>
                {{ button.text }}
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>

</template>

<script>
/*eslint no-useless-escape: "off"*/
import NewsCard from "@/components/NewsCard";
import CardCarousel from "@/components/CardCarousel";
import NewsList from "@/components/NewsList";
import NewsContent from "@/components/NewsContent";
import NewsImage from "@/components/NewsImage";

var _instance, // current vue instance.
    _options = {
      debug: false,
      fontawesome: true,
      searchselect: true
    },
    _container, // the outermost Element. Needed to scroll to bottom, for now.
    _interface = {}, // methods returned by a BotUI() instance.
    _actionResolve,
    _markDownRegex = {
      icon: /!\(([^\)]+)\)/igm, // !(icon)
      image: /!\[(.*?)\]\((.*?)\)/igm, // ![aleternate text](src)
      link: /\[([^\[]+)\]\(([^\)]+)\)(\^?)/igm // [text](link) ^ can be added at end to set the target as 'blank'
    },
    _fontAwesome = 'https://use.fontawesome.com/ea731dcb6f.js';
//_esPromisePollyfill = 'https://cdn.jsdelivr.net/es6-promise/4.1.0/es6-promise.min.js', // mostly for IE
//_searchselect =  "https://unpkg.com/vue-select@2.4.0/dist/vue-select.js";


function _linkReplacer(match, $1, $2, $3) {
  var _target = $3 ? 'blank' : ''; // check if '^' sign is present with link syntax
  return "<a class='botui-message-content-link' target='" + _target + "' href='" + $2 + "'>" + $1 + "</a>";
}

function _parseMarkDown(text) {
  return text
      .replace(_markDownRegex.image, "<img class='botui-message-content-image' src='$2' alt='$1' />")
      .replace(_markDownRegex.icon, "<i class='botui-icon botui-message-content-icon fa fa-$1'></i>")
      .replace(_markDownRegex.link, _linkReplacer);
}

function loadScript(src, cb) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;

  if (cb) {
    script.onload = cb;
  }

  document.body.appendChild(script);
}

function _handleAction(text) {
  if (_instance.action.addMessage) {
    _interface.message.human({
      delay: 100,
      content: text
    });
  }
  _instance.action.show = !_instance.action.autoHide;
}

export default {
  name: 'BotUi',
  components: {NewsImage, NewsList, CardCarousel, NewsCard, NewsContent},
  data: function () {
    return {
      action: {
        text: {
          size: 30,
          placeholder: 'Write here ..'
        },
        button: {},
        show: false,
        type: 'text',
        autoHide: true,
        addMessage: true
      },
      messages: [],
    };
  },
  computed: {
    showed_phones: function () {
      return this.$store.state.showed_phones
    }
  },
  methods: {
    click_detail: function (id) {
      this.$emit('clicked_url', id);
    },
    click_next: function () {
      this.$emit('click_next');
      //this.$store.commit('addToCart', id);
    },
    handle_action_button: function (button) {
      for (var i = 0; i < this.action.button.buttons.length; i++) {
        if (this.action.button.buttons[i].value == button.value && typeof (this.action.button.buttons[i].event) == 'function') {
          this.action.button.buttons[i].event(button);
          if (this.action.button.buttons[i].actionStop) return false;
          break;
        }
      }

      _handleAction(button.text);

      var defaultActionObj = {
        type: 'button',
        text: button.text,
        value: button.value
      };

      for (var eachProperty in button) {
        if (Object.prototype.hasOwnProperty.call(button, eachProperty)) {
          if (eachProperty !== 'type' && eachProperty !== 'text' && eachProperty !== 'value') {
            defaultActionObj[eachProperty] = button[eachProperty];
          }
        }
      }

      _actionResolve(defaultActionObj);
    },
    handle_action_text: function () {
      if (!this.action.text.value) return;
      _handleAction(this.action.text.value);
      _actionResolve({
        type: 'text',
        value: this.action.text.value
      });
      this.action.text.value = '';
    },
    handle_action_select: function () {
      if (this.action.select.searchselect && !this.action.select.multipleselect) {
        if (!this.action.select.value.value) return;
        _handleAction(this.action.select.value[this.action.select.label]);
        _actionResolve({
          type: 'text',
          value: this.action.select.value.value,
          text: this.action.select.value.text,
          obj: this.action.select.value
        });
      }
      if (this.action.select.searchselect && this.action.select.multipleselect) {
        if (!this.action.select.value) return;
        var values = new Array();
        var labels = new Array();
        for (var i = 0; i < this.action.select.value.length; i++) {
          values.push(this.action.select.value[i].value);
          labels.push(this.action.select.value[i][this.action.select.label]);
        }
        _handleAction(labels.join(', '));
        _actionResolve({
          type: 'text',
          value: values.join(', '),
          text: labels.join(', '),
          obj: this.action.select.value
        });
      } else {
        if (!this.action.select.value) return;
        for (var it = 0; it < this.action.select.options.length; it++) { // Find select title
          if (this.action.select.options[it].value == this.action.select.value) {
            _handleAction(this.action.select.options[it].text);
            _actionResolve({
              type: 'text',
              value: this.action.select.value,
              text: this.action.select.options[it].text
            });
          }
        }
      }
    }
  },
  directives: {
    'botui-markdown': function (el, binding) {
      if (binding.value == 'false') return; // v-botui-markdown="false"
      el.innerHTML = _parseMarkDown(el.textContent);
    },
    'botui-scroll': {
      inserted: function (el) {
        _container.scrollTop = _container.scrollHeight;
        el.scrollIntoView(true);
      }
    },
    'focus': {
      inserted: function (el) {
        el.focus();
      }
    },
    'botui-container': {
      inserted: function (el) {
        _container = el;
      }
    }
  },
  created: function () {
    _instance = this;
  }
}

function _addMessage(_msg) {

  if (!_msg.loading && !_msg.content) {
    throw Error('BotUI: "content" is required in a non-loading message object.');
  }

  _msg.type = _msg.type || 'text';
  _msg.visible = (_msg.delay || _msg.loading) ? false : true;
  var _index = _instance.messages.push(_msg) - 1;

  return new Promise(function (resolve) {
    setTimeout(function () {
      if (_msg.delay) {
        _msg.visible = true;

        if (_msg.loading) {
          _msg.loading = false;
        }
      }
      resolve(_index);
    }, _msg.delay || 0);
  });
}

function _checkOpts(_opts) {
  if (typeof _opts === 'string') {
    _opts = {
      content: _opts
    };
  }
  return _opts || {};
}

_interface.message = {
  add: function (addOpts) {
    return _addMessage(_checkOpts(addOpts));
  },
  bot: function (addOpts) {
    addOpts = _checkOpts(addOpts);
    return _addMessage(addOpts);
  },
  human: function (addOpts) {
    addOpts = _checkOpts(addOpts);
    addOpts.human = true;
    return _addMessage(addOpts);
  },
  get: function (index) {
    return Promise.resolve(_instance.messages[index]);
  },
  remove: function (index) {
    _instance.messages.splice(index, 1);
    return Promise.resolve();
  },
  update: function (index, msg) { // only content can be updated, not the message type.
    var _msg = _instance.messages[index];
    _msg.content = msg.content;
    _msg.visible = !msg.loading;
    _msg.loading = !!msg.loading;
    return Promise.resolve(msg.content);
  },
  removeAll: function () {
    _instance.messages.splice(0, _instance.messages.length);
    return Promise.resolve();
  }
};

function mergeAtoB(objA, objB) {
  for (var prop in objA) {
    if (!objB.hasOwnProperty.call(objB, prop)) {
      objB[prop] = objA[prop];
    }
  }
}

function _checkAction(_opts) {
  if (!_opts.action && !_opts.actionButton && !_opts.actionText) {
    throw Error('BotUI: "action" property is required.');
  }
}

function _showActions(_opts) {
  _checkAction(_opts);
  mergeAtoB({
    type: 'text',
    cssClass: '',
    attributes: {},
    autoHide: true,
    addMessage: true
  }, _opts);

  _instance.action.type = _opts.type;
  _instance.action.cssClass = _opts.cssClass;
  _instance.action.attributes = _opts.attributes;
  _instance.action.autoHide = _opts.autoHide;
  _instance.action.addMessage = _opts.addMessage;

  return new Promise(function (resolve) {
    _actionResolve = resolve; // resolved when action is performed, i.e: button clicked, text submitted, etc.
    setTimeout(function () {
      _instance.action.show = true;
    }, _opts.delay || 0);
  });
}

_interface.action = {
  show: _showActions,
  hide: function () {
    _instance.action.show = false;
    return Promise.resolve();
  },
  text: function (_opts) {
    _checkAction(_opts);
    _instance.action.text = _opts.action;
    return _showActions(_opts);
  },
  button: function (_opts) {
    _checkAction(_opts);
    _opts.type = 'button';
    _instance.action.button.buttons = _opts.action;
    return _showActions(_opts);
  },
  select: function (_opts) {
    _checkAction(_opts);
    _opts.type = 'select';
    _opts.action.label = _opts.action.label || 'text';
    _opts.action.value = _opts.action.value || '';
    _opts.action.searchselect = typeof _opts.action.searchselect !== 'undefined' ? _opts.action.searchselect : _options.searchselect;
    _opts.action.multipleselect = _opts.action.multipleselect || false;
    if (_opts.action.searchselect && typeof (_opts.action.value) == 'string') {
      if (!_opts.action.multipleselect) {
        for (var i = 0; i < _opts.action.options.length; i++) { // Find object
          if (_opts.action.options[i].value == _opts.action.value) {
            _opts.action.value = _opts.action.options[i]
          }
        }
      } else {
        var vals = _opts.action.value.split(',');
        _opts.action.value = new Array();
        for (var it = 0; it < _opts.action.options.length; it++) { // Find object
          for (var j = 0; j < vals.length; j++) { // Search values
            if (_opts.action.options[it].value == vals[j]) {
              _opts.action.value.push(_opts.action.options[it]);
            }
          }
        }
      }
    }
    if (!_opts.action.searchselect) {
      _opts.action.options.unshift({value: '', text: _opts.action.placeholder});
    }
    _instance.action.button = _opts.action.button;
    _instance.action.select = _opts.action;
    return _showActions(_opts);
  },
  buttontext: function (_opts) {
    _checkAction(_opts);
    _opts.type = 'buttontext';
    _instance.action.button.buttons = _opts.actionButton;
    _instance.action.text = _opts.actionText;
    return _showActions(_opts);
  }
};

if (_options.fontawesome) {
  loadScript(_fontAwesome);
}

export var botui = _interface;

</script>

<style lang="scss">
a.botui-message-content-link:focus {
  outline: thin dotted;

  &:active,
  &:hover {
    outline: 0;
  }
}

form.botui-actions-text {
  margin: 0;
}

button.botui-actions-buttons-button,
input.botui-actions-text-input {
  margin: 0;
  font-size: 100%;
  line-height: normal;
  *vertical-align: middle;
  vertical-align: baseline;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
}

button.botui-actions-buttons-button {
  cursor: pointer;
  *overflow: visible;
  -webkit-appearance: button;
}

.botui-app-container {
  width: 100%; // mobile-first
  height: 100%;
  line-height: 1;

  @media (min-width: 400px) {
    width: 400px;
    height: 500px;
    margin: 0 auto;
  }
}

.botui-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.botui-message {
  margin: 10px 0;
  min-height: 20px;

  &:after {
    display: block;
    content: "";
    clear: both;
  }
}

.human .botui-message-content {
  float: right;
}

.botui-message-content {
  width: auto;
  max-width: 85%;
  display: inline-block;

  &.human {
    float: right;
  }

  iframe {
    width: 100%;
    height: 100%;
  }
}

.botui-message-content-image {
  margin: 5px 0;
  display: block;
  max-width: 200px;
  max-height: 200px;
}

.botui-message-content-link {
  text-decoration: underline;
}

button.botui-actions-buttons-button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 90%;
  //&:not(:last-child) {
  //  margin-right: 10px;
  //}
}

.botui-actions-text-submit {
  @media (min-width: 400px) {
    display: none;
  }
}

.botui-action-button-icon.fa {
  background-size: contain;
  display: block;
}

.botui-actions-buttons-button-icon {
  background: none;
  box-shadow: none;
}

.van-checkbox--horizontal {
  margin-bottom: 6px;
}

.chatbot-header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  height: 46px;
}

.chatbot-send {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
}

.chatbot-content {
  position: absolute;
  top: 46px;
  bottom: 54px;
  left: 0;
  right: 0;
  overflow: auto;
}

.help {
  box-sizing: border-box;
}

.help p {
  font-size: 18px;
  text-align: justify;
}

.botui-container {
  background: #F1F1F1;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', miui, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
}

.botui-messages-container {
  padding: 10px;
}

.botui-message-content {
  background-color: #FFF;
  color: #000;
  width: auto;
  max-width: 77%;
  display: inline-block;
  padding: 13px 10px;
}

.botui-message-content.loading {
  background-color: #fff;
}

.botui-message-content.text {
  line-height: 1.4
}

.botui-message-content.human {
  background-color: #1989fa;
  color: white;
}

.error-card .botui-message-content.html {
  box-sizing: border-box;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
  font-weight: 500;
  max-width: 87.5%;
}

.error-card .botui-message-content.html span {
  display: flex;
  align-items: center;
}

.summary-card .botui-message-content.html {
  box-sizing: border-box;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
  max-width: 87.5%;
}

.botui-message-content.html span div.icon {
  flex: 0 0 32px;
  height: 32px;
  margin-right: 6px;
}

button.botui-actions-buttons-button {
  margin-top: 6px;
  margin-bottom: 6px;
  border-radius: 4px;
  border: 1px solid #1989fa;
  font-weight: normal;
  text-align: left;
  background-color: transparent;
  transition-duration: .28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  color: #1989fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', miui, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%)
}

.botui-actions-container {
  margin-top: -20px;
  padding: 9px 10px 9px 19px;
}

.v-bottom-sheet.v-dialog {
  overflow: auto !important;
}

.profil.agent {
  float: left;
  margin-right: 4px;
}

.profil {
  width: 43px;
  height: 43px;
  position: relative;
  background-repeat: no-repeat;
}

.profil > img.agent {
  border-radius: 0;
}

.profil > img {
  width: 43px;
  height: 43px;
  /*border: 2px solid #e8e8e8;*/
}


.html span p {
  margin-top: 0;
  margin-bottom: 0.5em;
}

.html span p:last-child {
  margin-top: 0;
  margin-bottom: 0;
}

@keyframes avatar {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -688px, 0;
  }
}

.van-popup__close-icon {
  color: #1989fa !important;
}

</style>
