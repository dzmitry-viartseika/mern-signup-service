export const types = {
  SET_USER: 'setUser',
};

const state = {
  user: {},
};

const getters = {
  user: (state) => state.user,
};

const actions = {
  setUser({ commit }, data) {
    commit(types.SET_USER, data);
  },
};

const mutations = {
  [types.SET_USER](state, data) {
    state.user = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
