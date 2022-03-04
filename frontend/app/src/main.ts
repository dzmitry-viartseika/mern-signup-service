import Vue from 'vue';
import SvgIcon from 'vue-svgicon';
import Meta from 'vue-meta';
import VeeValidate from 'vee-validate';
import VueShortKey from 'vue-shortkey';
import Toasted from 'vue-toasted';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

Vue.use(Toasted);

Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-ssr',
  tagIDKeyName: 'vmid',
});

Vue.use(SvgIcon, {
  tagName: 'svgicon',
});

Vue.use(VueShortKey);

Vue.use(VeeValidate, {
  i18n,
});

new Vue({
  router,
  store,
  i18n,
  Meta,
  VueShortKey,
  VeeValidate,
  SvgIcon,
  Toasted,
  render: (h) => h(App),
}).$mount('#app');
