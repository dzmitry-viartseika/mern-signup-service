<template>
  <div class="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    const language = window.navigator ? (window.navigator.language
      || window.navigator.systemLanguage
      || window.navigator.userLanguage) : 'ru';
    console.log('language', language);
    const systemLanguage = language ? language.substr(0, 2).toLowerCase() : 'ru';
    if (systemLanguage !== 'ru') {
      this.$i18n.locale = 'en';
    }
  },
};
</script>

<style lang="scss">
@import "assets/scss/core";
</style>
