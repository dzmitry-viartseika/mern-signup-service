import Vue from 'vue';
import SvgIcon from 'vue-svgicon';
import Meta from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-ssr',
  tagIDKeyName: 'vmid',
});

Vue.use(SvgIcon, {
  tagName: 'svgicon',
});

new Vue({
  router,
  store,
  i18n,
  Meta,
  SvgIcon,
  render: (h) => h(App),
}).$mount('#app');
