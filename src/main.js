import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import router from './router';
import VAnimateCss from 'v-animate-css';
import Vuex from 'vuex'

import 'vant/lib/index.css';
import '@vant/touch-emulator';

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(VAnimateCss);
Vue.use(Vuex)


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
