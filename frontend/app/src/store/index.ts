import Vue from 'vue';
import Vuex from 'vuex';

import User from './User/User';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
  },
});
