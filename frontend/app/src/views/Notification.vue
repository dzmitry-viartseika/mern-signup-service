<template>
  <div class="app-notification">
    <div class="app-notification-header">
      <h1 class="app__title">
        Notification
      </h1>
    </div>
    <div class="app-notification-content">
      <div class="app-notification-content__item">
        <checkbox
          id="remember-me"
          v-model="isSendNotify"
          name="send-notify"
          @changeCheckBox="changeCheckBox($event)"
          :label="'Отключить уведомления действий в системе'"
        />
      </div>
      <div class="app-notification-content__item">
        <select-template
          :style="{'width': '400px'}"
          :options="periods"
          @onSelect="onSelect"
          :item.sync="selectedPeriod"
          :label="'Изменить частоту оповещений по электронной почте'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelectTemplate from '@/components/Elements/SelectTemplate.vue';
import Checkbox from '@/components/Elements/Checkbox.vue';
import '@/assets/icons/Eye';
import UsersService from '@/services/Users/UsersService';
import NotificationPeriods from '@/model/enums/NotificationPeriods';
import ISelectItem from '@/model/elements/ISelectItem';

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

  periods: ISelectItem[] = [
    {
      value: NotificationPeriods.NEVER, text: 'Не отправлять письма',
    },
    {
      value: NotificationPeriods.INSTANTLY, text: 'Мгновенно',
    },
  ];

  created(): void {
    const { showNotify = true, emailNotify = NotificationPeriods.INSTANTLY } = this.$store.getters.user;
    this.isSendNotify = showNotify;
    this.selectedPeriod = emailNotify;
  }

  async changeCheckBox(): Promise<void> {
    this.isSendNotify = !this.isSendNotify;
    await this.updateUser();
  }

  async onSelect(): Promise<void> {
    await this.updateUser();
  }

  async updateUser(): Promise<void> {
    const userData = this.$store.getters.user;
    const updatedUser = {
      ...userData,
      showNotify: this.isSendNotify,
      emailNotify: this.selectedPeriod,
    };
    try {
      const { data } = await UsersService.updateUser(updatedUser);
      await this.$store.dispatch('setUser', data);
      if (userData.showNotify) {
        this.$toasted.show('Настройки уведомлений успешно изменены', {
          theme: 'bubble',
          position: 'top-right',
          duration: 3000,
        });
      }
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
