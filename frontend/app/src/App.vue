<template>
  <div class="app"
       :class="{'app--flex': showSidebar}"
  >
    <template v-if="showSidebar">
      <aside-template />
    </template>
    <main class="app-main"
         :class="[
        {'admin-main': showSidebar},
      ]"
    >
<!--      //  "husky": {-->
<!--      //    "hooks": {-->
<!--      //      "pre-commit": "npm run lint",-->
<!--      //      "pre-push": "npm run lint"-->
<!--      //    }-->
<!--      //  }-->
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AsideTemplate from '@/components/Aside/AsideTemplate.vue';
import Component from 'vue-class-component';
import UsersService from '@/services/Users/UsersService';

@Component({
  components: {
    AsideTemplate,
  },
})
export default class App extends Vue {

  get showSidebar(): boolean {
    const token = localStorage.getItem('token');
    return !!(this.$route.path.includes('crm') && token);
  }

  async created() {
    const lang = localStorage.getItem('language');
    const token = localStorage.getItem('token');

    if (lang) {
      this.$i18n.locale = lang;
    } else {
      const language = window.navigator ? window.navigator.language : 'ru';
      const systemLanguage = language ? language.substr(0, 2).toLowerCase() : 'ru';
      if (systemLanguage !== 'ru') {
        this.$i18n.locale = 'en';
      }
    }
    if (token) {
      try {
        const response = await UsersService.getCurrentUser();
        this.$store.dispatch('setUser', response.data);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/core';

.admin-main {
  background: $color-alabaster;
  flex-grow: 1;
  padding: 20px;
}
</style>
