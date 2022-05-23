<template>
  <div
    class="app"
    :class="{'app--flex': showSidebar}"
  >
    <portal-target name="popup" />
    <template
      v-if="showSidebar"
    >
      <aside-template />
    </template>
    <main
      class="app-main"
      :class="[
        {'admin-main': showSidebar},
      ]"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
      <chat
        v-if="showSidebar"
        :open-chat.sync="openChat"
        @click="openChat = true"
      />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AsideTemplate from '@/components/Aside/AsideTemplate.vue';
import Component from 'vue-class-component';
import UsersService from '@/services/Users/UsersService';
import ModalTemplate from '@/components/Modals/ModalTemplate.vue';
import Chat from '@/components/Chat/Chat.vue';

@Component({
  components: {
    AsideTemplate,
    ModalTemplate,
    Chat,
  },
})
export default class App extends Vue {
  test: any[] = [];
  openChat: boolean = false;
  get showSidebar(): boolean {
    const token = localStorage.getItem('token');
    return !!(this.$route.path.includes('crm') && token);
  }

  async created(): Promise<any> {
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
        await this.$store.dispatch('setUser', response.data);
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
  height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
