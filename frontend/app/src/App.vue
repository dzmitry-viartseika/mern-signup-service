<template>
  <div class="app">
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
import AuthService from '@/services/Auth/AuthService';

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
    if (lang) {
      this.$i18n.locale = lang;
    } else {
      const language = window.navigator ? (window.navigator.language
        || window.navigator.userLanguage) : 'ru';
      const systemLanguage = language ? language.substr(0, 2).toLowerCase() : 'ru';
      if (systemLanguage !== 'ru') {
        this.$i18n.locale = 'en';
      }
    }
  }
}
</script>

<style lang="scss">
@import "assets/scss/core";

.app {
  display: flex;
}

.admin-main {
  background: $color-alabaster;
  flex-grow: 1;
  //padding: 16px 24px;
}
</style>
