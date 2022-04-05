<template>
  <div
    class="app"
    :class="{'app--flex': showSidebar}"
  >
    test={{ test }}
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
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AsideTemplate from '@/components/Aside/AsideTemplate.vue';
import Component from 'vue-class-component';
import UsersService from '@/services/Users/UsersService';
import ModalTemplate from '@/components/Modals/ModalTemplate.vue';

@Component({
  components: {
    AsideTemplate,
    ModalTemplate,
  },
})
export default class App extends Vue {
  test: any[] = [];
  get showSidebar(): boolean {
    const token = localStorage.getItem('token');
    return !!(this.$route.path.includes('crm') && token);
  }

  async created(): Promise<any> {
    try {
      const query = `
      query {
        getAllUsers {
          id title done createdAt updatedAt
        }
      }
    `;
      fetch('http://localhost:5000/graphql', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query }),
      })
        .then((res) => res.json())
        .then((response) => {
          this.test = response.data.getAllUsers(query);
        });
    } catch (e) {
      console.error(e);
    }
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
