<template>
  <div class="app">
    <template v-if="showSidebar">
      <aside-template />
    </template>
    <div class="app-main"
         :class="[
        {'admin-main': showSidebar},
      ]"
    >
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AsideTemplate from '@/components/Aside/AsideTemplate.vue';
import Component from 'vue-class-component';

@Component({
  components: {
    AsideTemplate,
  },
})
export default class App extends Vue {
  get showSidebar(): boolean {
    const token = localStorage.getItem('token');
    console.log('this.$route.path.includes(\'crm\')', this.$route.path.includes('crm'));
    console.log('token', token);
    return !!(this.$route.path.includes('crm') && token);
  }

  created() {
    this.isAgreePolicy = !!(localStorage.getItem('isAgreePolicy') || '');
    const language = window.navigator ? (window.navigator.language
      || window.navigator.systemLanguage
      || window.navigator.userLanguage) : 'ru';
    console.log('language', language);
    const systemLanguage = language ? language.substr(0, 2).toLowerCase() : 'ru';
    if (systemLanguage !== 'ru') {
      this.$i18n.locale = 'en';
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
