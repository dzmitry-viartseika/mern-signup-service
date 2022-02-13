import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// Alias `NuxtLink` to `RouterLink`
Vue.component('NuxtLink', Vue.component('RouterLink'))

export const decorators = [(story) => ({
  components: { story },
  template: `<story />`,
  // Without a router instance, RouterLink will fail
  router: new VueRouter()
})];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
