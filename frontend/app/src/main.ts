import Vue from 'vue';
import VueTelInput from 'vue-tel-input';
import SvgIcon from 'vue-svgicon';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Meta from 'vue-meta';
import VeeValidate from 'vee-validate';
import VueShortKey from 'vue-shortkey';
import Toasted from 'vue-toasted';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import PortalVue from 'portal-vue';
import 'vue-tel-input/dist/vue-tel-input.css';
import 'vue-search-select/dist/VueSearchSelect.css';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import typeDefs from '@/graphql/typeDefs';

Vue.config.productionTip = false;

Vue.use(Toasted);
Vue.use(VueTelInput);
Vue.use(VueShortKey);
Vue.use(VueApollo);

Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-ssr',
  tagIDKeyName: 'vmid',
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/api/graphql',
  typeDefs,
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

Vue.use(SvgIcon, {
  tagName: 'svgicon',
});

Vue.use(VueShortKey);
Vue.use(PortalVue);

Vue.use(VeeValidate, {
  i18n,
});

new Vue({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Meta,
  router,
  store,
  i18n,
  VueShortKey,
  VeeValidate,
  PortalVue,
  SvgIcon,
  Toasted,
  provide: apolloProvider.provide(),
  render: (h) => h(App),
}).$mount('#app');
