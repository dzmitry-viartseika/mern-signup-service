<template>
  <div class="app">
    <modal-template
      v-if="!isAgreePolicy"
    >
      <div slot="content" class="app-modal__content">
        Мы используем файлы cookie, чтобы обеспечивать правильную работу нашего веб-сайта,
        персонализировать рекламные объявления и другие материалы, обеспечивать работу функций
        социальных сетей и анализировать сетевой трафик. Мы также предоставляем информацию об
        использовании вами нашего веб-сайта своим партнерам по социальным сетям, рекламе и
        аналитическим системам.
        <button
          class="app__btn app__btn--primary"
          @click="agreePolicy"
        >Согласен</button>
      </div>
    </modal-template>
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
import ModalTemplate from '@/components/Modals/ModalTemplate.vue';

@Component({
  components: {
    AsideTemplate,
    ModalTemplate,
  },
})
export default class App extends Vue {
  isAgreePolicy: boolean | null = null;

  get showSidebar(): boolean {
    const token = localStorage.getItem('token');
    console.log('this.$route.path.includes(\'crm\')', this.$route.path.includes('crm'));
    console.log('token', token);
    return !!(this.$route.path.includes('crm') && token);
  }

  agreePolicy(): void {
    this.isAgreePolicy = !this.isAgreePolicy;
    localStorage.setItem('isAgreePolicy', 'true');
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
