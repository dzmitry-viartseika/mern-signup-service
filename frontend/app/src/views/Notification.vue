<template>
  <div class="app-notification">
    <div class="app-notification-header">
      <h1 class="app__title">
        Notification
      </h1>
      <button
        class="app__btn app__btn--primary"
        @click="acceptSettings"
      >
        Accept
      </button>
    </div>
    <div class="app-notification-content">
      <div class="app-notification-content__item">
        <checkbox
          id="remember-me"
          v-model="isSendNotify"
          name="send-notify"
          :label="'Отключить уведомления действий в системе'"
        />
      </div>
      <div class="app-notification-content__item">
        <select-template
          :options="periods"
          :item.sync="selectedPeriod"
          :label="'Изменить частоту оповещений по электронной почте'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import SelectTemplate from '@/components/Elements/SelectTemplate.vue';
import Checkbox from '@/components/Elements/Checkbox.vue';
import '@/assets/icons/Eye';
import UsersService from '@/services/Users/UsersService';

@Component({
  components: {
    SelectTemplate,
    Checkbox,
  },
  metaInfo() {
    return {
      title: 'Notification',
      meta: [
        {
          name: 'description',
          content: 'App Notification',
        },
      ],
    };
  },
})
export default class Notification extends Vue {
  selectedPeriod: null | string = null;

  isSendNotify: null | boolean = null;

  periods = [
    {
      value: 'NEVER', text: 'Не отправлять письма',
    },
    {
      value: 'INSTANTLY', text: 'Мгновенно',
    },
  ];

  created() {
    const { showNotify = true, emailNotify = 'INSTANTLY' } = this.$store.getters.user;
    this.isSendNotify = showNotify;
    this.selectedPeriod = emailNotify;
  }

  async acceptSettings(): Promise<void> {
    const userData = this.$store.getters.user;
    const updatedUser = {
      ...userData,
      showNotify: this.isSendNotify,
      emailNotify: this.selectedPeriod,
    };
    try {
      const { data } = await UsersService.updateUser(updatedUser);
      await this.$store.dispatch('setUser', data);
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped lang="scss">
  .app-notification {

    &-header {
      display: flex;
      justify-content: space-between;
    }

    &-content {
      margin-top: 30px;

      &__item {
        margin-bottom: 15px;
      }
    }
  }
</style>
